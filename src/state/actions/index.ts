import { ActionType } from '../action-types';
import { CellType } from '../cell';

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export type Action = MoveCellAction | UpdateCellAction | DeleteCellAction | InsertCellAfterAction | BundleStartAction | BundleCompleteAction;

