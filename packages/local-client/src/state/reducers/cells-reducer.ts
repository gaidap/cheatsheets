import produce from 'immer';
import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  InsertCellAfterAction,
  MoveCellAction,
  SaveCellsErrorAction,
  UpdateCellAction,
} from '../actions';
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
      case ActionType.INSERT_CELL_AFTER:
        insertCellAfter(state, action);
        return state;
      case ActionType.FETCH_CELLS:
        fetchCells(state, action);
        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        fetchCellsComplete(state, action);
        return state;
      case ActionType.FETCH_CELLS_ERROR:
        fetchCellsError(state, action);
        return state;
      case ActionType.SAVE_CELLS_ERROR:
        saveCellsError(state, action);
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

const findIndexByPayloadId = (state: CellState, action: MoveCellAction | InsertCellAfterAction): number => {
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

const insertCellAfter = (state: CellState, action: InsertCellAfterAction) => {
  const newCell: Cell = {
    id: generateRandomId(),
    type: action.payload.type,
    content: '',
  };
  state.data[newCell.id] = newCell;

  const index = findIndexByPayloadId(state, action);
  if (index < 0) {
    // place new cell at top if index is first element
    state.order.unshift(newCell.id);
  } else {
    state.order.splice(index + 1, 0, newCell.id);
  }
};

const fetchCells = (state: CellState, action: FetchCellsAction): void => {
  state.loading = true;
  state.error = null;
};

const fetchCellsComplete = (state: CellState, action: FetchCellsCompleteAction): void => {
  state.order = action.payload.map((cell) => cell.id);
  state.data = action.payload.reduce((accumulator, cell) => {
    accumulator[cell.id] = cell;
    return accumulator;
  }, {} as CellState['data']); // This empty object is here to make TypeScript happy
};

const fetchCellsError = (state: CellState, action: FetchCellsErrorAction): void => {
  state.loading = false;
  state.error = action.payload;
};

const saveCellsError = (state: CellState, action: SaveCellsErrorAction): void => {
  state.loading = false;
  state.error = action.payload;
};

export default reducer;