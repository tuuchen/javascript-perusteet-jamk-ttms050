import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ChartBanner from './components/ChartBanner'
import ChartForm from './components/ChartForm'
import axios from 'axios'
import Chart from './components/Chart'
import Chartjs from 'chart.js'
import { worldChart, countryChart } from './utils/chartConfig'

const App = () => {
  const worldChartContainer = useRef(null)
  const [worldChartInstance, setworldChartInstance] = useState(null)
  const [worldMortality, setWorldMortality] = useState(null)
  const [worldData, setWorldData] = useState({
    confirmed: null,
    recovered: null,
    critical: null,
    deaths: null,
  })

  const countryChartContainer = useRef(null)
  const [countryChartInstance, setcountryChartInstance] = useState(null)
  const [countryMortality, setCountryMortality] = useState(null)
  const [countryData, setCountrydData] = useState({
    confirmed: null,
    recovered: null,
    critical: null,
    deaths: null,
  })

  const [data, setData] = useState(null)
  const [country, setCountry] = useState(null)

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

    setWorldData({
      confirmed: result.data[0].confirmed,
      recovered: result.data[0].recovered,
      critical: result.data[0].critical,
      deaths: result.data[0].deaths,
    })

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

      setCountrydData({
        confirmed: result.data[0].confirmed,
        recovered: result.data[0].recovered,
        critical: result.data[0].critical,
        deaths: result.data[0].deaths,
      })

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
      alert(`No data found for "${country}"`)
    }
  }

  const updateWorldChart = (datasetIndex, newData) => {
    worldChartInstance.data.datasets[datasetIndex].data = newData
    worldChartInstance.update()
  }

  const updateCountryChart = (datasetIndex, newData) => {
    countryChartInstance.data.datasets[datasetIndex].data = newData
    countryChartInstance.update()
  }

  return (
    <div className="container mt-4">
      <Tabs
        fill
        className="mb-5 justify-content-center"
        defaultActiveKey="world"
      >
        <Tab eventKey="world" title="World">
          <div className="jumbotron mt-4">
            <ChartBanner text="World Covid-19 data" />
            <Chart
              confirmed={worldData.confirmed}
              recovered={worldData.recovered}
              critical={worldData.critical}
              deaths={worldData.deaths}
              mortality={worldMortality}
              country=""
              chartContainer={worldChartContainer}
            />
          </div>
        </Tab>
        <Tab eventKey="countries" title="Countries">
          <div className="jumbotron mt-4">
            <ChartForm handleSubmit={handleSubmit} />
            <Chart
              confirmed={countryData.confirmed}
              recovered={countryData.recovered}
              critical={countryData.critical}
              deaths={countryData.deaths}
              mortality={countryMortality}
              country={country}
              chartContainer={countryChartContainer}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
