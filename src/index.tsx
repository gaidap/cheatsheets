import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';
import MarkdownEditor from './components/MarkdownEditor';

const App = () => {
  return (
    <div>
      <MarkdownEditor />
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App/>, document.querySelector('#root'));