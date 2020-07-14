const { useState, useEffect } = React;

const Calculator = ({ luku1, luku2, tulos, handleFirst, handleSecond }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Luku1:</td>
            <td>
              <input type="text" value={luku1} onChange={handleFirst} />
            </td>
          </tr>
          <tr>
            <td>Luku2:</td>
            <td>
              <input type="text" value={luku2} onChange={handleSecond} />
            </td>
          </tr>
          <tr>
            <td>Tulos:</td>
            <td>
              <input type="text" readOnly value={tulos} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [tulos, setTulos] = useState('');

  useEffect(() => {
    luku1 > 0 && luku2 > 0
      ? setTulos(Number(luku1) + Number(luku2))
      : setTulos(0);
  }, [luku1, luku2]);

  const handleFirstNumber = (e) => {
    setLuku1(e.target.value);
  };

  const handleSecondNumber = (e) => {
    setLuku2(e.target.value);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="lead-4 text-center mb-4">React yhteenlaskin</h1>
        <div className="d-flex justify-content-center">
          <Calculator
            luku1={luku1}
            luku2={luku2}
            tulos={tulos}
            handleFirst={handleFirstNumber}
            handleSecond={handleSecondNumber}
          />
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
