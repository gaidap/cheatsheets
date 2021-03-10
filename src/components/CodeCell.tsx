import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable, { Direction } from './Resizable';
import bundle from '../bundler';

const CodeCell: React.FC = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [bundlingStatus, setBundlingStatus] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundleOutput = await bundle(input);
      setCode(bundleOutput.code);
      setBundlingStatus(bundleOutput.error);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [input]);

  return (
    <Resizable direction={Direction.VERTICAL}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction={Direction.HORIZONTAL}>
          <CodeEditor initialValue='// Start by typing some code' onChange={(value) => setInput(value)} />
        </Resizable>
        <Preview code={code} bundlingStatus={bundlingStatus} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
