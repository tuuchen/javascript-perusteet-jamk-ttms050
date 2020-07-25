import React from 'react'

const Chart = ({ chartContainer, country, mortality }) => {
  let styleObject
  country === null
    ? (styleObject = { display: 'none' })
    : (styleObject = { display: 'block' })

  return (
    <div style={styleObject}>
      <div className="row">
        <div className="col">
          <h5 className="form-text text-muted text-center">{country}</h5>
        </div>
        <div className="col">
          <h6 className="form-text text-muted text-center">
            Mortality {mortality}
          </h6>
        </div>
      </div>
      <canvas ref={chartContainer} />
    </div>
  )
}

export default Chart
