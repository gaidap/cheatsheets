import { CellType } from '../state';
import { useTypedSelector } from './use-typed-selector';

// Add build in preview function to help user render stuff to the preview area
const previewFn = `
import __React__ from 'react';
import __ReactDOM__ from 'react-dom';
var preview = (value) => {
  const root = document.querySelector('#root');
  if(value && value.$$typeof && value.props) {
    __ReactDOM__.render(value, root);
  } else if(typeof value === 'object') {
    root.innerHTML = JSON.stringify(value, null, 2);
  } else {
    root.innerHTML = value;
  }
};
`;
// Override the preview funtion with no-op version to prevent calls in subsequent cells
const previewFnNoOp = 'var preview = () => {};';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const result = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === CellType.CODE) {
        if (currentCell.id === cellId) {
          result.push(previewFn);
        } else {
          result.push(previewFnNoOp);
        }
        result.push(currentCell.content);
      }
      if (currentCell.id === cellId) {
        break;
      }
    }
    return result;
  }).join('\n');
};
