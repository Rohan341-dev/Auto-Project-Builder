import { useState } from 'react';
import PromptInput from './components/PromptInput';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  const [projectData, setProjectData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt) => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.error('Failed to generate project:', error);
      alert('Error connecting to AI backend.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setProjectData(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-brand-500 selection:text-white">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-bold animate-pulse text-brand-100">AI is building your project...</h2>
          <p className="text-gray-400 mt-2">Writing code, generating styles, and setting up files!</p>
        </div>
      ) : projectData ? (
        <ProjectDashboard data={projectData} onReset={handleReset} />
      ) : (
        <PromptInput onGenerate={handleGenerate} />
      )}
    </div>
  );
}

export default App;
