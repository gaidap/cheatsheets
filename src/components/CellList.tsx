import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellAdder from './CellAdder';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <CellAdder previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <CellAdder forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
