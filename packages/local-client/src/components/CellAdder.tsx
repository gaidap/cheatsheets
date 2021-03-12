import './CellAdder.css';
import { useActions } from '../hooks/use-actions';
import { CellType } from '../state';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const CellAdder: React.FC<AddCellProps> = ({ previousCellId: nextCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`cell-adder ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(nextCellId, CellType.CODE)}>
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(nextCellId, CellType.MARKDOWN)}>
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Markdown</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default CellAdder;
