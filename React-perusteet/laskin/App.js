const { useState, useEffect } = React;

const Calculator = ({ num1, num2, result, handleFirst, handleSecond }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Luku 1:</td>
            <td>
              <input type="text" value={num1} onChange={handleFirst} />
            </td>
          </tr>
          <tr>
            <td>Luku 2:</td>
            <td>
              <input type="text" value={num2} onChange={handleSecond} />
            </td>
          </tr>
          <tr>
            <td>Tulos:</td>
            <td>
              <input type="text" readOnly value={result} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    num1 > 0 && num2 > 0
      ? setResult(Number(num1) + Number(num2))
      : setResult(0);
  }, [num1, num2]);

  const handleFirstNumber = (e) => {
    setNum1(e.target.value);
  };

  const handleSecondNumber = (e) => {
    setNum2(e.target.value);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="lead-4 text-center mb-4">React yhteenlaskin</h1>
        <div className="d-flex justify-content-center">
          <Calculator
            num1={num1}
            num2={num2}
            result={result}
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
