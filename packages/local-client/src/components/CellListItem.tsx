import './CellListItem.css';
import { Cell, CellType } from '../state';
import ActionBar from './ActionBar';
import CodeCell from './CodeCell';
import MarkdownEditor from './MarkdownEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === CellType.CODE) {
    
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <MarkdownEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
    
  }
  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
