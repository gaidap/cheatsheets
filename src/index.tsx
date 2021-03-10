import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import MarkdownEditor from './components/MarkdownEditor';

const App = () => {
  return (
    <div>
      <MarkdownEditor />
    </div>
  );
};

ReactDOM.render(<App/>, document.querySelector('#root'));