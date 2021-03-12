import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Direction, MoveCellAction, UpdateCellAction, DeleteCellAction, InsertCellAfterAction, Action } from '../actions';
import { Cell, CellType } from '../cell';
import { RootState } from '../reducers';

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id: id,
      direction: direction,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: id,
      content: content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (id: string | null, cellType: CellType): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id: id,
      type: cellType,
    },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');
      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (error) {
      dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
    }
  };
};
