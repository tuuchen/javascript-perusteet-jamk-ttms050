const { useState, useEffect } = React;

const Button = ({ handleClick, bgColor, text }) => {
  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="mr-2 btn"
        style={{ backgroundColor: bgColor }}
      >
        <span style={{ color: 'white' }}>{text}</span>
      </button>
    </div>
  );
};

const InputGroup = ({ num1, num2, result, handleFirst, handleSecond }) => {
  return (
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
  );
};

const App = () => {
  const [bgColor1, setBgColor1] = useState('#0275d8');
  const [bgColor2, setBgColor2] = useState('#0275d8');
  const [bgColor3, setBgColor3] = useState('#0275d8');
  const [bgColor4, setBgColor4] = useState('#0275d8');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(num3);
  }, [num3]);

  const handleFirstNumber = (e) => {
    setNum1(e.target.value);
  };

  const handleSecondNumber = (e) => {
    setNum2(e.target.value);
  };

  const sum = () => {
    defaultColors();
    setBgColor1('#5cb85c');
    setNum3(Number(num1) + Number(num2));
  };

  const subtract = () => {
    defaultColors();
    setBgColor2('#5cb85c');
    setNum3(Number(num1) - Number(num2));
  };

  const multiply = () => {
    defaultColors();
    setBgColor3('#5cb85c');
    setNum3(Number(num1) * Number(num2));
  };

  const divide = () => {
    defaultColors();
    setBgColor4('#5cb85c');
    if (num1 && num2) {
      setNum3(Number(num1) / Number(num2));
    }
  };

  const defaultColors = () => {
    setBgColor1('#0275d8');
    setBgColor2('#0275d8');
    setBgColor3('#0275d8');
    setBgColor4('#0275d8');
  };

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="lead-4 text-center mb-4">React nelilaskin</h1>
        <div className="d-flex justify-content-center">
          <InputGroup
            num1={num1}
            num2={num2}
            result={result}
            handleFirst={handleFirstNumber}
            handleSecond={handleSecondNumber}
          />
        </div>
        <div className="mt-1 text-center">
          <div className="btn-group" role="group">
            <div className="mr-4">Laske</div>
            <Button bgColor={bgColor1} handleClick={sum} text="+" />
            <Button bgColor={bgColor2} handleClick={subtract} text="-" />
            <Button bgColor={bgColor3} handleClick={multiply} text="*" />
            <Button bgColor={bgColor4} handleClick={divide} text="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
