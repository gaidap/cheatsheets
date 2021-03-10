import './Resizable.css';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const ninetyPercentOfWindowHeight = window.innerHeight * 0.9;
  return (
    // Infinity for width works analog to "100%"
    <ResizableBox
      maxConstraints={[Infinity, ninetyPercentOfWindowHeight]}
      minConstraints={[Infinity, 35]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
