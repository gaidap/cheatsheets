import './Resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const createResizableProps = (direction: string): ResizableBoxProps => {
  const fivePercentOfWindowHeight = window.innerHeight * 0.05;
  const ninetyPercentOfWindowHeight = window.innerHeight * 0.9;
  const twentyPercentOfWindowWidth = window.innerWidth * 0.2;
  const seventyFivePercentOfWindowWidth = window.innerWidth * 0.75;

  let result: ResizableBoxProps;
  if (direction === 'horizontal') {
    result = {
      className: 'resize-horizontal',
      minConstraints: [twentyPercentOfWindowWidth, Infinity],
      maxConstraints: [seventyFivePercentOfWindowWidth, Infinity],
      height: Infinity,
      width: seventyFivePercentOfWindowWidth,
      resizeHandles: ['e'],
    };
  } else {
    result = {
      minConstraints: [Infinity, fivePercentOfWindowHeight],
      maxConstraints: [Infinity, ninetyPercentOfWindowHeight],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return result;
};

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const resizableProps = createResizableProps(direction);
  return (
    // Infinity for width works analog to "100%"
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};

export default Resizable;


