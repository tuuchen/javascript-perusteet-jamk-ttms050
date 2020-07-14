const { useState } = React;

const Button = ({ handleClick, text, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

const Paragraph = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

const App = () => {
  const [message, setMessage] = useState(
    'Mieleni minun tekevi, aivoni ajattelevi'
  );
  return (
    <div>
      <Button text='Nappi' className="button" />
      <Paragraph text={message} />
    </div>
  );
};

const rootElement = document.getElementById('ratkaisu');
ReactDOM.render(<App />, rootElement);
