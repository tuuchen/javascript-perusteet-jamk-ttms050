const { useState } = React;

const arr = ['Arska', 'Basso', 'Mixu'];

const Table = ({ names }) => {
  return (
    <div>
      <h1 className="display-4 text-center mb-4">React table component</h1>
      <ul className="list-group">
        {names.map((name, i) => (
          <li className="list-group-item" key={i}>
            Terve {name}!
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [names, setName] = useState(arr);
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <Table names={names} />
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
