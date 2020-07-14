const { useState } = React;

const BoxComponent = ({ handleClick, btntext, ptext, className }) => {
  return (
    <div>
      <button className={className} onClick={handleClick}>
        {btntext}
      </button>
      <p>{ptext}</p>
    </div>
  );
};

const App = () => {
  const [message, setMessage] = useState(
    'Mieleni minun tekevi, aivoni ajattelevi'
  );
  return (
    <div>
      <BoxComponent ptext={message} btntext="Nappi" className="button" />
    </div>
  );
};

const rootElement = document.getElementById('ratkaisu');
ReactDOM.render(<App />, rootElement);
