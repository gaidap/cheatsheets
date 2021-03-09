import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import React from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  // Register a listener on editor startup to hook into change events to update our model state
  const editorDidMount: EditorDidMount = (getValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onClickFormat = () => {
    
  };

  return (
    <div>
      <button onClick={onClickFormat}>Format</button>
      <MonacoEditor
          editorDidMount={editorDidMount}
          value={initialValue}
          theme="dark"
          language="javascript"
          height="500px"
          options={{
            wordWrap: 'on',
            useTabStops: false,
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
                    }}
      />
    </div>
  );
};

export default CodeEditor;
