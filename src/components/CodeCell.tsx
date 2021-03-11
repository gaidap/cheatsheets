import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable, { Direction } from './Resizable';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [bundlingStatus, setBundlingStatus] = useState('');
  const {  updateCell  } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundleOutput = await bundle(cell.content);
      setCode(bundleOutput.code);
      setBundlingStatus(bundleOutput.error);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [cell.content]);

  return (
    <Resizable direction={Direction.VERTICAL}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction={Direction.HORIZONTAL}>
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        <Preview code={code} bundlingStatus={bundlingStatus} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
