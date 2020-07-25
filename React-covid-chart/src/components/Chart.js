import React from 'react'

const Chart = ({ chartContainer, country }) => {
  let styleObject
  country === null
    ? (styleObject = { display: 'none' })
    : (styleObject = { display: 'block' })

  return (
    <div style={styleObject}>
      <h5 class="form-text text-muted text-center">{country}</h5>
      <canvas ref={chartContainer} />
    </div>
  )
}

export default Chart
