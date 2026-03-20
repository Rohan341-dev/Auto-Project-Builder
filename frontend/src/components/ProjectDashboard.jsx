import { useState, useEffect } from 'react';
import { Save, Download, Play, Home, Terminal, Info, ChevronLeft } from 'lucide-react';
import Editor from "@monaco-editor/react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FileTree from './FileTree';
import LivePreview from './LivePreview';

export default function ProjectDashboard({ data, onReset }) {
  // Flatten file structure for easy access
  const buildFileMap = (structure, path = "") => {
    let map = {};
    for (const item of structure) {
      const fullPath = path ? `${path}/${item.name}` : item.name;
      if (item.type === 'file') {
        map[fullPath] = item;
      } else if (item.type === 'folder') {
        map = { ...map, ...buildFileMap(item.children, fullPath) };
      }
    }
    return map;
  };

  const [filesMap, setFilesMap] = useState(buildFileMap(data.structure));
  const [selectedFile, setSelectedFile] = useState("index.html");
  const [viewMode, setViewMode] = useState('split'); // 'editor', 'preview', 'split'

  const handleEditorChange = (value) => {
    setFilesMap(prev => ({
      ...prev,
      [selectedFile]: { ...prev[selectedFile], content: value }
    }));
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    Object.entries(filesMap).forEach(([path, fileObj]) => {
      zip.file(path, fileObj.content);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${data.name}.zip`);
  };

  const getLanguage = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.json')) return 'json';
    return 'html';
  };

  return (
    <div className="h-screen flex flex-col pt-3 pb-3 px-3 bg-[#0f111a]">
      {/* Header */}
      <header className="flex items-center justify-between mb-3 bg-gray-900 border border-gray-800 rounded-xl p-3 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={onReset} className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-semibold text-sm">Back</span>
          </button>
          <div className="h-5 w-px bg-gray-700"></div>
          <h1 className="font-bold text-lg text-white font-mono flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-brand-500" />
            {data.name}
          </h1>
        </div>
        
        <div className="flex bg-gray-800 p-1 rounded-lg">
           <button onClick={() => setViewMode('editor')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'editor' ? 'bg-brand-600 shadow' : 'text-gray-400 hover:text-white'}`}>Editor</button>
           <button onClick={() => setViewMode('split')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'split' ? 'bg-brand-600 shadow' : 'text-gray-400 hover:text-white'}`}>Split</button>
           <button onClick={() => setViewMode('preview')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'preview' ? 'bg-brand-600 shadow' : 'text-gray-400 hover:text-white'}`}>Preview</button>
        </div>

        <button 
          onClick={handleDownload}
          className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-gray-700 shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download ZIP
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex space-x-3 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col space-y-3">
          {/* File Explorer */}
          <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-black/20">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 file-tree-container">
              <FileTree 
                structure={data.structure} 
                selectedFile={selectedFile} 
                onSelectFile={setSelectedFile} 
              />
            </div>
          </div>

          {/* Teacher Bot / Tips */}
          <div className="h-48 bg-brand-900/40 border border-brand-500/30 rounded-xl overflow-hidden flex flex-col relative group">
            <div className="absolute top-0 left-0 w-1 bg-brand-500 h-full"></div>
            <div className="p-3 border-b border-brand-500/20 flex items-center bg-brand-500/10">
              <Info className="w-4 h-4 text-brand-400 mr-2" />
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Teacher Bot Tips</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-brand-100/80 space-y-3">
              {data.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 mr-2 shrink-0"></div>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor & Preview Area */}
        <main className="flex-1 flex space-x-3 overflow-hidden">
          {/* Code Editor */}
          {(viewMode === 'editor' || viewMode === 'split') && (
             <div className="flex-1 bg-[#1e1e1e] border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-inner">
               <div className="h-10 bg-[#252526] flex items-center px-4 border-b border-[#3c3c3c]">
                 <span className="text-[#9cdcfe] text-sm font-mono flex items-center">
                    <Code2 className="w-4 h-4 mr-2" />
                    {selectedFile}
                 </span>
               </div>
               <div className="flex-1 relative">
                 <Editor
                    height="100%"
                    language={getLanguage(selectedFile)}
                    theme="vs-dark"
                    value={filesMap[selectedFile]?.content || ''}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      padding: { top: 16 }
                    }}
                 />
               </div>
             </div>
          )}

          {/* Live Preview */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="flex-1 bg-white border border-gray-800 rounded-xl overflow-hidden flex flex-col relative text-black shadow-lg">
               <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium px-4 py-1 bg-gray-200 rounded-full flex items-center">
                    <Play className="w-3 h-3 mr-1" />
                    Live Output
                  </span>
               </div>
               <div className="flex-1 h-full w-full">
                 <LivePreview filesMap={filesMap} />
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
