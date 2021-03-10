import './MarkdownEditor.css';
import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const clickInsideEditor =
        divRef.current &&
        event.target &&
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
      <div className="markdown-editor" ref={divRef}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div className="markdown-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Start writing your Markdown'} />
    </div>
  );
};

export default TextEditor;
