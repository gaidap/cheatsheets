import './MarkdownEditor.css';
import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState('# Start writing your Markdown');

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const clickInsideEditor =
        event.target &&
        divRef.current &&
        divRef.current.contains(event.target as Node);

      if (clickInsideEditor) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', clickListener, { capture: true });

    const keyListener = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setEditing(false);
      }
    };
    document.addEventListener('keyup', keyListener, { capture: true });

    return () => {
      document.removeEventListener('click', clickListener, { capture: true });
      document.removeEventListener('keyup', keyListener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='markdown-editor' ref={divRef}>
        <MDEditor
          value={content}
          onChange={(content) => {
            setContent(content || '');
          }}
        />
      </div>
    );
  }
  return (
    <div className='markdown-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};

export default TextEditor;
