import React from 'react'

const ChartForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <small className="form-text text-muted mb-1">
        Form will find all available countries for you
      </small>
      <div className="input-group">
        <input
          id="myInput"
          type="text"
          className="form-control"
          placeholder="Start typing.."
        />
        <div className="input-group-append mb-4">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChartForm
