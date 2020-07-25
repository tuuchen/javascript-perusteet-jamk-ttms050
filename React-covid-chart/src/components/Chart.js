import React from 'react'
import Statistics from './Statistics'

const Chart = ({
  chartContainer,
  country,
  mortality,
  confirmed,
  recovered,
  critical,
  deaths,
}) => {
  let styleObject
  country === null
    ? (styleObject = { display: 'none' })
    : (styleObject = { display: 'block' })

  return (
    <div style={styleObject}>
      <Statistics
        country={country}
        mortality={mortality}
        confirmed={confirmed}
        recovered={recovered}
        critical={critical}
        deaths={deaths}
      />
      <canvas ref={chartContainer} />
    </div>
  )
}

export default Chart
