const { useState, useEffect } = React;

const Autolaskuri = ({ handleClick, src, text, count }) => {
  return (
    <div>
      <p>
        {text} {count}
      </p>
      <img
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        src={src}
        className="img-fluid"
        alt="Responsive image"
      />
    </div>
  );
};

const App = () => {
  const [ferrari, setFerrari] = useState('');
  const [lamborghini, setLamborghini] = useState('');

  const handleFerrari = (e) => {
    setFerrari(Number(ferrari) + 1);
  };

  const handleLamborghini = (e) => {
    setLamborghini(Number(lamborghini) + 1);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <h1 className="lead-4 text-center mb-4">Autolaskuri</h1>
        <p className="lead text-center">Klikkaa mieleistä auton kuvaa</p>
        <hr className="my-4"></hr>
        <div className="row text-center">
          <div className="col">
            <Autolaskuri
              handleClick={handleFerrari}
              text="Ferrari"
              src="./img/ferrari.jpg"
              count={ferrari}
            />
          </div>
          <div className="col">
            <Autolaskuri
              handleClick={handleLamborghini}
              text="Lamborghini"
              src="./img/lamborghini.jpg"
              count={lamborghini}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
