import { useState, useEffect } from 'react';

export default function LivePreview({ filesMap }) {
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Very basic compilation logic to inject CSS/JS into HTML for live preview.
      let htmlContent = filesMap['index.html']?.content || '<html><body>No index.html found.</body></html>';
      
      // Inject CSS
      if (filesMap['css/style.css']) {
         const styleTag = `<style>${filesMap['css/style.css'].content}</style>`;
         htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
      }

      // Inject JS
      if (filesMap['js/main.js']) {
         const scriptTag = `<script>${filesMap['js/main.js'].content}</script>`;
         htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
      }

      setSrcDoc(htmlContent);
    }, 500); // Debounce to prevent lag during rapid typing

    return () => clearTimeout(timeout);
  }, [filesMap]);

  return (
    <iframe 
      srcDoc={srcDoc}
      title="Live Preview"
      className="w-full h-full border-none"
      sandbox="allow-scripts allow-downloads"
    />
  );
}
