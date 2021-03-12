import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import bundle from '../../bundler';

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id: id,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id: id,
        bundle: result,
      },
    });
  };
};
