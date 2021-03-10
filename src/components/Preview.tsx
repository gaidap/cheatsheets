import './Preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

// Generate html document locally to prevent an unnecessary request to fetch the html for the iFrame
const htmlContent = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'; 
          console.error(error); // bubble up error to console.
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  
  useEffect(() => {
    // reset the iFrame properly before exexuting user code
    iframeRef.current.srcdoc = htmlContent;
    // update content in iFrame
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  // set sandbox to empty string as workaround to isolate code execution in the iFrame
  // the downside is that the user code cannot use local storage or cookies etc.
  // the upside is it is fast and extremly simple since we do not need more infrastructure
  return (
    <div className="preview-wrapper">
      <iframe
            ref={iframeRef}
            title="code-sandbox-preview"
            sandbox="allow-scripts"
            srcDoc={htmlContent}
      />
    </div>
  );
};

export default Preview;
