import produce from 'immer';
import { ActionType } from '../action-types';
import { Action, DeleteCellAction, Direction, InsertCellBeforeAction, MoveCellAction, UpdateCellAction } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        moveCell(state, action);
        return state;
      case ActionType.UPDATE_CELL:
        updateCell(state, action);
        return state;
      case ActionType.DELETE_CELL:
        deleteCell(state, action);
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        insertCellBefore(state, action);
        return state;
      default:
        return state;
    }
  }
);

const moveCell = (state: CellState, action: MoveCellAction): void => {
  const { direction } = action.payload;
  const currentIndex = findIndexByPayloadId(state, action);
  const newIndex = direction === Direction.UP ? currentIndex - 1 : currentIndex + 1;

  const indexOutOfBounds = newIndex < 0 || newIndex >= state.order.length;
  if(indexOutOfBounds) {
    return;
  } 

  state.order[currentIndex] = state.order[newIndex];
  state.order[newIndex] = action.payload.id;
};

const findIndexByPayloadId = (state: CellState, action: MoveCellAction | InsertCellBeforeAction): number => {
 return state.order.findIndex((id) => id === action.payload.id);
};

const updateCell =(state: CellState, action: UpdateCellAction): void => {
  const { id, content } = action.payload;
  state.data[id].content = content;
};

const deleteCell = (state: CellState, action: DeleteCellAction): void => {
  delete state.data[action.payload];
  state.order = state.order.filter(id => id !== action.payload);
};

const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 5);
};

const insertCellBefore = (state: CellState, action: InsertCellBeforeAction) => {
  const newCell: Cell = {
    id: generateRandomId(),
    type: action.payload.type,
    content: ''
  };
  state.data[newCell.id] = newCell;
  
  const index = findIndexByPayloadId(state, action);
  if (index < 0) { // place new cell at top if index is first element
    state.order.push(newCell.id);
  } else {
    state.order.splice(index, 0, newCell.id);
  }
}

export default reducer;