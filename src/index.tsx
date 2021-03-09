import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { fetchPkgPlugin } from './plugins/fetchpkg-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const ref = useRef<any>(); // reference hook to get a reference to any component
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []); // Add an empty Array as 2nd argument to signal useEffect to run only once.

  const onChangeTA = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onClickSubmit = async () => {
    if (!ref.current) {
      // Do nothing if service not ready
      return;
    }
    const result = await ref.current.build({
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPkgPlugin(input)],
    });
    setCode(result.outputFiles[0].text);
    try {
      eval(result.outputFiles[0].text);
    } catch (error) {
      console.error(error);
    }
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