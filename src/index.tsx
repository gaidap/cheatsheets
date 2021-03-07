import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onChangeTA = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onClickSubmit = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea value={input} onChange={onChangeTA}></textarea>
      <div>
        <button onClick={onClickSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(
  <App/>, document.querySelector('#root')
);