import { useState } from 'react';
import { Folder, FileCode2, FileJson, FileType2, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

export default function FileTree({ structure, path = "", selectedFile, onSelectFile }) {
  return (
    <ul className="space-y-0.5">
      {structure.map((item, index) => (
        <FileTreeNode 
          key={index} 
          item={item} 
          path={path} 
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />
      ))}
    </ul>
  );
}

function FileTreeNode({ item, path, selectedFile, onSelectFile }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = item.type === 'folder';
  const fullPath = path ? `${path}/${item.name}` : item.name;
  const isSelected = selectedFile === fullPath;

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelectFile(fullPath);
    }
  };

  const getFileIcon = (name) => {
    if (name.endsWith('.js') || name.endsWith('.jsx')) return <FileCode2 className="w-4 h-4 text-yellow-400" />;
    if (name.endsWith('.json')) return <FileJson className="w-4 h-4 text-green-400" />;
    if (name.endsWith('.css')) return <FileType2 className="w-4 h-4 text-blue-400" />;
    return <FileCode2 className="w-4 h-4 text-orange-400" />; // default HTML
  };

  return (
    <li className="select-none">
      <div 
        className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-brand-500/20 text-brand-300' : 'text-gray-300 hover:bg-gray-800'}`}
        onClick={handleToggle}
      >
        <span className="w-4 h-4 mr-1 flex items-center justify-center text-gray-400">
          {isFolder && (isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />)}
        </span>
        
        {isFolder ? (
           isOpen ? <FolderOpen className="w-4 h-4 text-blue-400 mr-2" /> : <Folder className="w-4 h-4 text-blue-400 mr-2" />
        ) : (
           <span className="mr-2">{getFileIcon(item.name)}</span>
        )}
        
        <span className="text-sm font-medium">{item.name}</span>
      </div>

      {isFolder && isOpen && (
        <div className="pl-4 border-l border-gray-800 ml-3">
          <FileTree 
            structure={item.children} 
            path={fullPath} 
            selectedFile={selectedFile}
            onSelectFile={onSelectFile}
          />
        </div>
      )}
    </li>
  );
}
