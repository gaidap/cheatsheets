import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import bundle from './bundler';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClickSubmit = async () => {
    const bundleOutput = await bundle(input);
    setCode(bundleOutput);
  };

  // set sandbox to empty string as workaround to isolate code execution in the iFrame
  // the downside is that the user code cannot use local storage or cookies etc.
  // the upside is it is fast and extremly simple since we do not need more infrastructure
  return (
    <div>
      <CodeEditor
        initialValue="const helloWorld = (name) => console.log(`Hello ${name}!`);"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClickSubmit}>Submit</button>
      </div>
      <Preview code={code}/>
    </div>
  );
};

ReactDOM.render(
  <App/>, document.querySelector('#root')
);