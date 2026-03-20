import { useState } from 'react';
import { Sparkles, Code2, LayoutTemplate, Coffee } from 'lucide-react';

export default function PromptInput({ onGenerate }) {
  const [prompt, setPrompt] = useState('');

  const suggestions = [
    "A portfolio website with dark mode and a contact form",
    "A simple blog layout with a sidebar and grid posts",
    "A landing page for a coffee shop with a hero section",
    "A documentation template with a left navigation menu"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-3xl w-full text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-brand-500/20 p-4 rounded-2xl">
            <Sparkles className="w-12 h-12 text-brand-500" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Auto Project Builder</h1>
        <p className="text-xl text-gray-400">
          Describe the website you want to build, and our AI will generate a complete starter project for you in seconds.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 rounded-3xl p-2 pl-6 pr-2 mb-8 shadow-2xl flex items-center border border-gray-700/50 hover:border-brand-500/50 transition-colors focus-within:border-brand-500">
        <textarea
          className="w-full bg-transparent border-none text-white focus:ring-0 resize-none h-14 pt-4 pb-0 text-lg placeholder-gray-500 outline-none"
          placeholder="e.g. I want a portfolio website with dark mode..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (prompt.trim()) onGenerate(prompt);
            }
          }}
        />
        <button
          onClick={() => { if (prompt.trim()) onGenerate(prompt) }}
          disabled={!prompt.trim()}
          className="ml-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-semibold transition-all flex items-center shadow-lg"
        >
          <Code2 className="w-5 h-5 mr-2" />
          Generate
        </button>
      </div>

      <div className="max-w-4xl w-full text-left">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">Or try a template</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setPrompt(s)}
              className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 p-4 rounded-xl text-left transition-all hover:scale-[1.02] flex items-start"
            >
              <LayoutTemplate className="w-5 h-5 mt-1 mr-3 text-brand-400 shrink-0" />
              <span className="text-gray-300">{s}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
