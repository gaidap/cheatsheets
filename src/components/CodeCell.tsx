import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';

const CodeCell: React.FC = () => {
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

export default CodeCell;
