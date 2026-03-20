import React, { useState, useEffect } from 'react';
import { Github, Globe, Code, ArrowRight, ExternalLink, Moon, Sun } from 'lucide-react';

/**
 * Updated "Midnight" Theme Home Page
 * Uses Slate-950 for the background and emerald/blue gradients for depth.
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
      icon: <Code className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "GitHub Hosted",
      description: "Deployed directly via GitHub Pages with automated CI/CD workflows.",
      icon: <Github className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Responsive Design",
      description: "Fluid layouts that adapt perfectly to mobile, tablet, and desktop screens.",
      icon: <Globe className="w-6 h-6 text-indigo-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="p-6 max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950">D</div>
          <span className="text-white">DMFDML</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">Research</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Design</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
        <button className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-400 transition-all active:scale-95">
          Consultation
        </button>
      </nav>

      {/* Hero Section */}
      <main className={`max-w-6xl mx-auto px-6 pt-20 pb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Technical Design</span> with Precision.
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Bridging the gap between academic research and digital deployment. Fully responsive, highly optimized, and hosted on GitHub.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
              Launch Project <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
              Documentation
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} DMFDML. Technical Design & Research.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;