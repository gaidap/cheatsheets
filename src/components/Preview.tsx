import './Preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

// Generate html document locally to prevent an unnecessary request to fetch the html for the iFrame
const htmlContent = `
<html>
  <head>
    <style>html { background-color: antiquewhite; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;">' + error + '</div>';
        console.error(error); // bubble up error to console
      };
      
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });  

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    // reset the iFrame properly before exexuting user code
    iframeRef.current.srcdoc = htmlContent;

    // Prevent flickering of iFrame if user is tempering with the innerHTML of the iFrame
    // Otherwise the users input would not be displayed on the preview
    setTimeout(() => {
      // update content in iFrame
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
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
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
