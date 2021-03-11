import { useTypedSelector } from '../hooks/use-typed-selector';
import CellAdder from './CellAdder';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map((cell) => (
    <>
      <CellAdder nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </>
  ));

  return (
    <div>
      {renderedCells} <CellAdder nextCellId={null} />
    </div>
  );
};

export default CellList;
