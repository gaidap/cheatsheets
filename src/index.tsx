import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

const App = () => {
  return <Provider store={store}></Provider>;
};

ReactDOM.render(<App/>, document.querySelector('#root'));