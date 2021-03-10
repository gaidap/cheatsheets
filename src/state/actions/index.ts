import { ActionType, Direction } from '../action-types';
import { CellType } from '../cell';

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE
  payload: {
    id: string;
    type: CellType;
  };
}

export type Action = MoveCellAction | UpdateCellAction | DeleteCellAction | InsertCellBeforeAction;

