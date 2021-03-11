import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { CellType } from './cell';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: CellType.CODE,
  },
});

const id = store.getState().cells.order[0];
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: id,
    type: CellType.MARKDOWN,
  },
});

console.log(store.getState());
