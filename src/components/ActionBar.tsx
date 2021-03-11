import './ActionBar.css';
import { useActions } from '../hooks/use-actions';
import { Direction } from '../state/actions';
import ActionButton from './ActionButton';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action-bar'>
      <ActionButton icon='fas fa-arrow-up' actionFn={() => moveCell(id, Direction.UP)} />
      <ActionButton icon='fas fa-arrow-down' actionFn={() => moveCell(id, Direction.DOWN)} />
      <ActionButton icon='fas fa-times' actionFn={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
