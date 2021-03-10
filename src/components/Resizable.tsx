import './Resizable.css';
import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const createResizableProps = (
  direction: string,
  innerHeight: number,
  innerWidth: number
): ResizableBoxProps => {
  const fivePercentOfWindowHeight = innerHeight * 0.05;
  const ninetyPercentOfWindowHeight = innerHeight * 0.9;
  const twentyPercentOfWindowWidth = innerWidth * 0.2;
  const seventyFivePercentOfWindowWidth = innerWidth * 0.75;

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
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);

    // return clean up funcion to deregister from event after work is done
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const resizableProps = createResizableProps(
    direction,
    innerHeight,
    innerWidth
  );
  return (
    // Infinity for width works analog to "100%"
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};

export default Resizable;


