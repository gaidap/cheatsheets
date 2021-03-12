import { Component } from 'react';
import { IProps } from '../../utils';
import './index.less';
export interface IDragBarProps extends IProps {
    height: number;
    maxHeight: number;
    minHeight: number;
    onChange: (value: number) => void;
}
export default class DragBar extends Component<IDragBarProps> {
    drag?: {
        height: number;
        dragY: number;
    };
    private handleMouseMove;
    private handleMouseUp;
    private handleMouseDown;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
