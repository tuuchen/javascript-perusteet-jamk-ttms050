const { useState, useEffect } = React

const highscoreData = [
  { id: 1, name: 'Jason', score: 4000 },
  { id: 2, name: 'Make', score: 3000 },
  { id: 3, name: 'Bill', score: 2000 },
  { id: 4, name: 'Liza', score: 1000 },
]

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

  useEffect(() => {
    getHighscores()
  }, [])

  const getHighscores = () => {
    setScores(null)
    setTimeout(() => {
      setScores(highscoreData)
    }, 3000)
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
