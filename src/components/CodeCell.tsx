import './CodeCell.css';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable, { Direction } from './Resizable';
import { Cell, CellType } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    // Add build in preview function to help user render stuff to the preview area
    const previewFn = `
        import __React__ from 'react';
        import __ReactDOM__ from 'react-dom';
        var preview = (value) => {
          const root = document.querySelector('#root');
          if(value && value.$$typeof && value.props) {
            __ReactDOM__.render(value, root);
          } else if(typeof value === 'object') {
            root.innerHTML = JSON.stringify(value, null, 2);
          } else {
            root.innerHTML = value;
          }
        };
    `;
    // Override the preview funtion with no-op version to prevent calls in subsequent cells
    const previewFnNoOp = 'var preview = () => {};';
    const result = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === CellType.CODE) {
        if (currentCell.id === cell.id) {
          result.push(previewFn);
        } else {
          result.push(previewFnNoOp);
        }
        result.push(currentCell.content);
      }
      if (currentCell.id === cell.id) {
        break;
      }
    }
    return result;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // disabled warning: adding bundle will lead to an infinite loop so it cannot be placed in the array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);

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
