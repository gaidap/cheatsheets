import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CodeCell from './components/CodeCell';
import MarkdownEditor from './components/MarkdownEditor';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <MarkdownEditor />
      </div>
    </Provider>
   );
};

ReactDOM.render(<App/>, document.querySelector('#root'));