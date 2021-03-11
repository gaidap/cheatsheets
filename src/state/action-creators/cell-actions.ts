import { ActionType } from '../action-types';
import { Direction, MoveCellAction, UpdateCellAction, DeleteCellAction, InsertCellAfterAction } from '../actions';
import { CellType } from '../cell';

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
