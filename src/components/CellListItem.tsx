import { Cell, CellType } from '../state';
import CodeCell from './CodeCell';
import MarkdownEditor from './MarkdownEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === CellType.CODE) {
    child = <CodeCell cell={cell}/>;
  } else {
    child = <MarkdownEditor cell={cell}/>;
  }
  return <div>{child}</div>;
};

export default CellListItem;
