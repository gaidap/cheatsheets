import './CellAdder.css';
import { useActions } from '../hooks/use-actions';
import { CellType } from '../state';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const CellAdder: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`cell-adder ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(nextCellId, CellType.CODE)}>
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button className='button is-rounded is-primary is-small' onClick={() => insertCellBefore(nextCellId, CellType.MARKDOWN)}>
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
