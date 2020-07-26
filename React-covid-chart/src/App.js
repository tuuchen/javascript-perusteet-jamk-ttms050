import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { worldChart, countryChart } from './utils/chartConfig'
import axios from 'axios'
import Chartjs from 'chart.js'
import ChartBanner from './components/ChartBanner'
import ChartForm from './components/ChartForm'
import Chart from './components/Chart'
import Container from 'react-bootstrap/Container'
import ErrorModal from './components/ErrorModal'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const App = () => {
  const worldChartContainer = useRef(null)
  const [worldChartInstance, setworldChartInstance] = useState(null)
  const [worldMortality, setWorldMortality] = useState(null)

  const countryChartContainer = useRef(null)
  const [countryChartInstance, setcountryChartInstance] = useState(null)
  const [countryMortality, setCountryMortality] = useState(null)

  const [data, setData] = useState(null)
  const [country, setCountry] = useState(null)

  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (worldChartContainer && worldChartContainer.current) {
      const newChartInstance = new Chartjs(
        worldChartContainer.current,
        worldChart
      )
      setworldChartInstance(newChartInstance)
    }
  }, [worldChartContainer])

  useEffect(() => {
    if (countryChartContainer && countryChartContainer.current) {
      const newChartInstance = new Chartjs(
        countryChartContainer.current,
        countryChart
      )
      setcountryChartInstance(newChartInstance)
    }
  }, [countryChartContainer])

  useEffect(() => {
    getWorldData()
  }, [])

  useEffect(() => {
    if (data) {
      updateWorldChart(0, data)
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!e.target[0].value) return
    getCountryData(e.target[0].value)
    e.target[0].value = ''
  }

  const getWorldData = async () => {
    const result = await axios.get(`api/totals`)

    const newData = [
      result.data[0].confirmed,
      result.data[0].recovered,
      result.data[0].critical,
      result.data[0].deaths,
    ]

    const mortality = `${(
      (result.data[0].deaths / result.data[0].confirmed) *
      100
    ).toFixed(2)}%`
    setWorldMortality(mortality)
    setData(newData)
  }

  const getCountryData = async (country) => {
    try {
      country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
      const result = await axios.get(`api/data/${country}`)

      const newData = [
        result.data[0].confirmed,
        result.data[0].recovered,
        result.data[0].critical,
        result.data[0].deaths,
      ]

      const calculatedMortality = (
        (result.data[0].deaths / result.data[0].confirmed) *
        100
      ).toFixed(2)

      const mortality = `${
        isNaN(calculatedMortality) ? 0 : calculatedMortality
      }%`

      setCountryMortality(mortality)
      setCountry(country)
      updateCountryChart(0, newData)
    } catch (err) {
      console.log('error ', err.response)
      showErrorModal(`No data found for "${country}"`)
    }
  }

  const updateWorldChart = (datasetIndex, newData) => {
    const labels = [
      'Confirmed ' + newData[0],
      'Recovered ' + newData[1],
      'Critical ' + newData[2],
      'Deaths ' + newData[3],
    ]

    worldChartInstance.data.datasets[datasetIndex].data = newData
    worldChartInstance.data.labels = labels
    worldChartInstance.update()
  }

  const updateCountryChart = (datasetIndex, newData) => {
    const labels = [
      'Confirmed ' + newData[0],
      'Recovered ' + newData[1],
      'Critical ' + newData[2],
      'Deaths ' + newData[3],
    ]

    countryChartInstance.data.datasets[datasetIndex].data = newData
    countryChartInstance.data.labels = labels
    countryChartInstance.update()
  }

  const handleClose = () => setShow(false)

  const showErrorModal = (error) => {
    setError(error)
    setShow(true)
    setTimeout(() => {
      setShow(false)
      setError(null)
    }, 4000)
  }

  return (
    <Container className="mt-4">
      <ErrorModal error={error} show={show} handleClose={handleClose} />
      <Tabs
        fill
        className="mb-5 justify-content-center"
        defaultActiveKey="world"
      >
        <Tab eventKey="world" title="World">
          <Jumbotron className="mt-4">
            <ChartBanner text="World Covid-19 data" />
            <Chart
              mortality={worldMortality}
              country=""
              chartContainer={worldChartContainer}
            />
          </Jumbotron>
        </Tab>
        <Tab eventKey="countries" title="Countries">
          <Jumbotron className="jumbotron mt-4">
            <ChartForm handleSubmit={handleSubmit} />
            <Chart
              mortality={countryMortality}
              country={country}
              chartContainer={countryChartContainer}
            />
          </Jumbotron>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default App
