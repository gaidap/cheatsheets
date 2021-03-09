import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { fetchPkgPlugin } from './plugins/fetchpkg-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import CodeEditor from './components/CodeEditor';

const App = () => {
  const serviceRef = useRef<any>();
  const iFrameRef = useRef<any>();
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

  const onChangeTA = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const onClickSubmit = async () => {
    if (!serviceRef.current) {
      // Do nothing if service not ready
      return;
    }

    // reset the iFrame properly before exexuting user code
    iFrameRef.current.srcdoc = htmlContent;

    const result = await serviceRef.current.build({
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPkgPlugin(input)],
    });

    iFrameRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };

  // Generate html document locally to prevent an unnecessary request to fetch the html for the iFrame
  const htmlContent = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (error) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'; 
              console.error(error); // bubble up error to console.
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  // set sandbox to empty string as workaround to isolate code execution in the iFrame
  // the downside is that the user code cannot use local storage or cookies etc.
  // the upside is it is fast and extremly simple since we do not need more infrastructure
  return (
    <div>
      <CodeEditor
        initialValue="const helloWorld = (name) => console.log(`Hello ${name}!`);"
        onChange={(value) => setInput(value)}
      />
      <textarea value={input} onChange={onChangeTA}></textarea>
      <div>
        <button onClick={onClickSubmit}>Submit</button>
      </div>
      <iframe
        ref={iFrameRef}
        title="code-sandbox-preview"
        sandbox="allow-scripts"
        srcDoc={htmlContent}
      />
    </div>
  );
};

ReactDOM.render(
  <App/>, document.querySelector('#root')
);