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
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);
  return (
    <iframe
      ref={iframeRef}
      title="code-sandbox-preview"
      sandbox="allow-scripts"
      srcDoc={htmlContent}
    />
  );
};

export default Preview;
