import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>(); // reference hook to get a reference to any component
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []); // Add an empty Array as 2nd argument to signal useEffect to run only once.

  const onChangeTA = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onClickSubmit = () => {
    if   (!ref.current) { // Do nothing if service not ready
      return;
    }
    console.log(ref.current);
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
};;;;;;;;

ReactDOM.render(
  <App/>, document.querySelector('#root')
);