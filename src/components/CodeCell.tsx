import './CodeCell.css';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable, { Direction } from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if  (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // disabled warning: adding bundle will lead to an infinite loop so it cannot be placed in the array 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction={Direction.VERTICAL}>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction={Direction.HORIZONTAL}>
          <CodeEditor
            initialValue={cell.content || '// Start writing some code and have fun!'}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          { !bundle || bundle.loading ? (
              <div className='progress-bar'>
                <progress className='progress is-small is-primary' max='100'>
                  Loading
                </progress>
              </div>     
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
