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

const InputGroup = ({ luku1, luku2, tulos, handleFirst, handleSecond }) => {
  return (
    <div className="d-flex justify-content-center">
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
  const [bgColor1, setBgColor1] = useState('#0275d8');
  const [bgColor2, setBgColor2] = useState('#0275d8');
  const [bgColor3, setBgColor3] = useState('#0275d8');
  const [bgColor4, setBgColor4] = useState('#0275d8');
  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [luku3, setLuku3] = useState(0);
  const [tulos, setTulos] = useState(0);

  useEffect(() => {
    setTulos(luku3);
  }, [luku3]);

  const handleFirstNumber = (e) => {
    setLuku1(e.target.value);
  };

  const handleSecondNumber = (e) => {
    setLuku2(e.target.value);
  };

  const sum = () => {
    defaultColors();
    setBgColor1('#5cb85c');
    setLuku3(Number(luku1) + Number(luku2));
  };

  const subtract = () => {
    defaultColors();
    setBgColor2('#5cb85c');
    setLuku3(Number(luku1) - Number(luku2));
  };

  const multiply = () => {
    defaultColors();
    setBgColor3('#5cb85c');
    setLuku3(Number(luku1) * Number(luku2));
  };

  const divide = () => {
    defaultColors();
    setBgColor4('#5cb85c');
    if (luku1 && luku2) {
      setLuku3(Number(luku1) / Number(luku2));
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
        <InputGroup
          luku1={luku1}
          luku2={luku2}
          tulos={tulos}
          handleFirst={handleFirstNumber}
          handleSecond={handleSecondNumber}
        />
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
