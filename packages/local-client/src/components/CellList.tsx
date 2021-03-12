import './CellList.css';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellAdder from './CellAdder';
import CellListItem from './CellListItem';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <CellAdder previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <CellAdder forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
