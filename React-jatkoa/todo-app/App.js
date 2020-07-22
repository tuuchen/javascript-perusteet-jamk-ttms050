const { useState, useEffect } = React

const Todobanner = ({ text }) => {
  return <h1 className="text-center mb-5">{text}</h1>
}

const TodoList = ({ items, handleClick }) => {
  if (!items) return null

  return (
    <ul className="container">
      {items.map((item, i) => (
        <li className="list-group-item limit" key={i}>
          {item}
          <button className="close" onClick={() => handleClick(i)}>
            X
          </button>
        </li>
      ))}
    </ul>
  )
}

const TodoForm = ({ handleSubmit, input, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Compose a new note.."
          value={input}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </div>
    </form>
  )
}

const App = () => {
  const [item, setItem] = useState([
    'Learn React By Examples',
    'Have a Nice Day',
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input) return
    setItem(item.concat(input))
    setInput('')
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const removeitem = (index) => {
    setItem(item.slice(0, index).concat(item.slice(index + 1, item.length)))
  }

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <Todobanner text="Todo Example with React" />
        <TodoForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          input={input}
        />
        <TodoList items={item} handleClick={removeitem} />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
