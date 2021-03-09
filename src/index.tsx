import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
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

  return (
    <div>
      <CodeEditor
        initialValue="const helloWorld = () => console.log('Hello World!');"
        onChange={(value) => setInput(value)}    
      />
      <div>
        <button onClick={onClickSubmit}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(
  <App/>, document.querySelector('#root')
);