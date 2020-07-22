const { useState, useEffect } = React

const Button = ({ handleClick, text, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  )
}

const Table = ({ scores }) => {
  if (!scores)
    return (
      <div>
        <h1 className="display-4 text-center mb-4">Highscores</h1>
        <ul className="list-group">
          <li className="list-group-item text-center">Loading...</li>
        </ul>
      </div>
    )

  return (
    <div>
      <h1 className="display-4 text-center mb-4">Highscores</h1>
      <ul className="list-group">
        {scores.map((score) => (
          <li className="list-group-item text-center" key={score.id}>
            {score.name}, score: {score.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const [scores, setScores] = useState('')

  const localUrl = './db.json'
  const pasteBin = 'https://api.jsonbin.io/b/5f18ab61c58dc34bf5d8cc76'

  useEffect(() => {
    getHighscores()
  }, [])

  const getHighscores = () => {
    setScores(null)
    fetch(localUrl)
      .then((response) => {
        response.json().then((data) => {
          console.log(data)
          setScores(data)
        })
      })
      .catch((err) => {
        console.log('error ', err)
      })
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <Table scores={scores} />
        <Button
          handleClick={getHighscores}
          text="Load again"
          className="btn btn-primary mt-3"
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
