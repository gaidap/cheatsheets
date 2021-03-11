import './CellAdder.css';
import { useActions } from '../hooks/use-actions';
import { CellType } from '../state';

interface AddCellProps {
  nextCellId: string | null;
}

const CellAdder: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, CellType.CODE)}>Code</button>
      <button onClick={() => insertCellBefore(nextCellId, CellType.MARKDOWN)}>Markdown</button>
    </div>
  );
};

export default CellAdder;
