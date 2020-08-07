require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const express = require('express')
const axios = require('axios')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  })
)

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/api/countries', async (req, res) => {
  const countries = await getListOfCountries()
  res.send(countries)
})

app.get('/api/totals', async (req, res) => {
  const totals = await getLatestTotals()
  res.send(totals)
})

app.get('/api/data/:country', async (req, res) => {
  const country = req.params.country
  const data = await getLatestCountryDataByName(country)
  data.length === 0 ? res.status(400).send() : res.send(data)
})

const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  'x-rapidapi-key': process.env.API_KEY,
  useQueryString: true,
}

const getListOfCountries = async () => {
  const response = await axios({
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/help/countries',
    headers: headers,
    params: {
      format: 'json',
    },
  })
  return response.data
}

const getLatestTotals = async () => {
  const response = await axios({
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: headers,
    params: {
      format: 'json',
    },
  })
  return response.data
}

const getLatestCountryDataByName = async (countryName) => {
  const response = await axios({
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    headers: headers,
    params: {
      format: 'json',
      name: countryName,
    },
  })
  return response.data
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
