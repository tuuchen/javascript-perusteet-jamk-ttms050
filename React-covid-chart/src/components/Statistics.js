import React from 'react'

const Statistics = ({
  country,
  mortality,
  confirmed,
  recovered,
  critical,
  deaths,
}) => {
  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h5 className="form-text text-muted text-center">{country}</h5>
        </div>
        <div className="col">
          <h6 className="form-text text-muted text-center">
            Mortality {mortality}
          </h6>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <small className="form-text text-muted text-center">
            Confirmed {confirmed}
          </small>
        </div>
        <div className="col">
          <small className="form-text text-muted text-center">
            Recovered {recovered}
          </small>
        </div>
        <div className="col">
          <small className="form-text text-muted text-center">
            Critical {critical}
          </small>
        </div>
        <div className="col">
          <small className="form-text text-muted text-center">
            Deaths {deaths}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Statistics
