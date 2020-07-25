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
  const [input, setInput] = useState('')

  const worldChartContainer = useRef(null)
  const [worldChartInstance, setworldChartInstance] = useState(null)

  const countryChartContainer = useRef(null)
  const [countryChartInstance, setcountryChartInstance] = useState(null)

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
    setInput(e.target[0].value)
    getCountryData(e.target[0].value)
    e.target[0].value = ''
  }

  const getCountryData = async (country) => {
    try {
      const data = await axios.get(`api/data/${country}`)

      const newData = [
        data.data[0].confirmed,
        data.data[0].recovered,
        data.data[0].critical,
        data.data[0].deaths,
      ]

      setCountry(country)
      updateCountryChart(0, newData)
    } catch (err) {
      console.log('error ', err.response)
      setCountry(`No data found from "${country}"`)
    }
  }

  const getWorldData = async () => {
    const data = await axios.get(`api/totals`)

    const newData = [
      data.data[0].confirmed,
      data.data[0].recovered,
      data.data[0].critical,
      data.data[0].deaths,
    ]

    setData(newData)
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
            <Chart country="" chartContainer={worldChartContainer} />
          </div>
        </Tab>
        <Tab eventKey="countries" title="Countries">
          <div className="jumbotron mt-4">
            <ChartForm handleSubmit={handleSubmit} input={input} />
            <Chart country={country} chartContainer={countryChartContainer} />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
