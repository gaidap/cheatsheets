import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CellType } from './cell';
import { ActionType } from './action-types';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: CellType.CODE,
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: store.getState().cells.order[0],
    type: CellType.MARKDOWN,
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: CellType.CODE,
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: store.getState().cells.order[1],
    type: CellType.MARKDOWN,
  },
});