import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { fetchPkgPlugin } from './plugins/fetchpkg-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import { resourceLimits } from 'worker_threads';

const App = () => {
  const serviceRef = useRef<any>();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []); // Add an empty Array as 2nd argument to signal useEffect to run only once.

  const onClickSubmit = async () => {
    if (!serviceRef.current) {
      // Do nothing if service not ready
      return;
    }
    
    const result = await serviceRef.current.build({
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPkgPlugin(input)],
    });

    setCode(result.outputFiles[0].text);
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