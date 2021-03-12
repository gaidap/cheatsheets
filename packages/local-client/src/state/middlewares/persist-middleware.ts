import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

const modifyCellActions = [ActionType.MOVE_CELL, ActionType.UPDATE_CELL, ActionType.INSERT_CELL_AFTER, ActionType.DELETE_CELL];

export const persistMiddleware = ({ dispatch, getState }: { dispatch: Dispatch<Action>; getState: () => RootState }) => {
  let timer: any;
  return (next: (actio: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (modifyCellActions.includes(action.type)) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};
