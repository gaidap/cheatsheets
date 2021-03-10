import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import bundle from '../bundler';

const CodeCell: React.FC = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundleOutput = await bundle(input);
      setCode(bundleOutput);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [input]);

  return (
    <Resizable direction="vertical">  
    <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
    <Resizable direction="horizontal">  
      <CodeEditor
        initialValue="const helloWorld = () => console.log('Hello World!');"
        onChange={(value) => setInput(value)}
      />
    </Resizable>
    <Preview code={code} />
    </div>
    </Resizable>
  );
};

export default CodeCell;
