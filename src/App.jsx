import React, { useState, useEffect } from 'react';
import { Github, Globe, Code, ArrowRight, ExternalLink } from 'lucide-react';

/**
 * A minimalist, responsive home page designed for 
 * a professional personal site or project landing page.
 */
const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Fast Performance",
      description: "Built with Vite and React for near-instant loading and smooth transitions.",
      icon: <Code className="w-6 h-6 text-blue-500" />
    },
    {
      title: "GitHub Hosted",
      description: "Deployed directly via GitHub Pages with automated CI/CD workflows.",
      icon: <Github className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Responsive Design",
      description: "Fluid layouts that adapt perfectly to mobile, tablet, and desktop screens.",
      icon: <Globe className="w-6 h-6 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="p-6 max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">V</div>
          <span>ViteProject</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Projects</a>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all active:scale-95">
          Get in Touch
        </button>
      </nav>

      {/* Hero Section */}
      <main className={`max-w-6xl mx-auto px-6 pt-20 pb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Deploying <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">React</span> to the world.
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            A lightweight, static home page built to showcase how easily you can move from local development to a live GitHub-hosted site.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
              Start Project <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
              View Documentation
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Your Name. Built with React & Vite.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;