import React, { useState, useMemo } from 'react';
import { 
  Users, 
  BookOpen, 
  FlaskConical, 
  Calendar, 
  ChevronRight, 
  Mail, 
  ExternalLink,
  Menu, 
  X,
  Lightbulb,
  Globe,
  Award,
  ArrowLeft,
  Search,
  Box,
  PlayCircle,
  Type,
  Image as ImageIcon
} from 'lucide-react';
import { PROJECTS } from './projects';
import { PUBLICATIONS } from './publications';
// import { MEMBERS } from './members';

/**
 * ASSET PATH HELPER
 * Resolves paths for the 'public' folder.
 * Uses Vite's import.meta.env.BASE_URL safely.
 */
const getAssetPath = (path) => {
  // Vite defines BASE_URL in the import.meta.env object.
  // We check if it exists to avoid the "import.meta" error in non-Vite environments.
  let base = '/';
  try {
    // @ts-ignore - Ignore potential compiler warnings about import.meta
    if (import.meta && import.meta.env && import.meta.env.BASE_URL) {
      base = import.meta.env.BASE_URL;
    }
  } catch (e) {
    // Fallback to root if import.meta is not supported by the current environment
    base = '/';
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const separator = base.endsWith('/') ? '' : '/';
  
  return `${base}${separator}${cleanPath}`;
};


// --- Data Structures ---

const LABS = [
  { 
    id: 'ai', 
    name: 'DMF:AI', 
    title: 'Artificial Intelligence', 
    description: 'Exploring human-centered AI, explainability, and collaborative intelligence systems.', 
    color: 'bg-blue-600', 
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop"
  },
  { 
    id: 'tech', 
    name: 'DMF:Tech', 
    title: 'Design Technologies', 
    description: 'Designing the design tools and technologies, spanning spatial computing, CAD, metrology, and prototyping. Our focus lies on giving technical designers the tools to do more with less, make better decisions, and work faster.', 
    color: 'bg-purple-600', 
    icon: <Globe className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=400&fit=crop"
  },
  { 
    id: 'additive', 
    name: 'DMF:Additive', 
    title: 'Additive Manufacture', 
    description: 'Investigating materials and processes for production-ready additive manufacture across metal and polymer.', 
    color: 'bg-emerald-600', 
    icon: <Award className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1642969164999-979483e21601?w=1200&h=400&fit=crop"
  },
  { 
    id: 'quantum', 
    name: 'DMF:Quantum', 
    title: 'Quantum Computing', 
    description: 'Lorem Ipsum, We do Quantum', 
    color: 'bg-amber-500', 
    icon: <FlaskConical className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop"
  }
];

const MEMBERS = [
  { id: 1, name: "Prof. Ben Hicks", role: "Faculty", labs: ["DMF:AI", "DMF:Tech"], image: getAssetPath("/images/people/headshot_hicks.jpg"), bio: "Director of Research Lab. Expert in Human-AI collaboration and trust in automated systems.", interests: ["Human-AI Interaction", "Ethics", "Explainable AI"] },
  { id: 2, name: "Dr Chris Snider", role: "Faculty", lab: "DMF:Tech", image: getAssetPath("/images/people/headshot_snider.jpg"), bio: "Leading spatial computing and haptic feedback research.", interests: ["VR Locomotion", "Haptics", "Spatial UI"] },
  { id: 3, name: "Dr James Gopsill", role: "Researcher", lab: "Lab::Health", image: getAssetPath("/images/people/headshot_gopsill.png"), bio: "Post-doctoral fellow focusing on wearable medical devices.", interests: ["Digital Health", "Wearables", "Care Work"] },
  { id: 4, name: "Dr Mark Goudswaard", role: "Researcher", lab: "DMF:Additive", image: getAssetPath("/images/people/headshot_goudswaard.jpg"), bio: "Research associate focusing on NLP and user agency.", interests: ["NLP", "User Agency", "AI Safety"] },
  { id: 5, name: "Aisha Khan", role: "Student", lab: "Lab::Tech", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop", bio: "PhD candidate exploring 3D printed electronics.", interests: ["Fabrication", "Smart Materials"] },
  { id: 7, name: "Dr. Priya Patel", role: "Researcher", lab: "Lab::Health", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop", bio: "Reader in Digital Health Design.", interests: ["Inclusion", "Neurodiversity"] }
];

const PLACEHOLDER = 'https://placehold.co/600x400/1a1a1a/666666?text=DMF:DML+Project';

// --- Specialized Components ---

const NarrativeRenderer = ({ content }) => {
  if (!content || content.length === 0) return null;
  return (
    <div className="space-y-12 mb-20">
      {content.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={idx} className="text-2xl font-black text-slate-300 uppercase tracking-tight pt-4">{block.value}</h3>;
          case 'text':
            return <p key={idx} className="text-lg text-slate-400 leading-relaxed font-light">{block.value}</p>;
          case 'image':
            return (
              <figure key={idx} className="my-12">
                <img src={block.value || PLACEHOLDER} 
                alt="Content" 
                className="w-full rounded-lg shadow-sm" 
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loops if placeholder fails
                  e.target.src = PLACEHOLDER;
                }}/>
                {block.caption && <figcaption className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">{block.caption}</figcaption>}
              </figure>
            );
          case 'video':
            return (
              <div key={idx} className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe className="w-full h-full" src={block.value} title="Video" frameBorder="0" allowFullScreen></iframe>
              </div>
            );
          default: return null;
        }
      })}
    </div>
  );
};

const Navbar = ({ activeTab, setActiveTab }) => (
  <nav className="sticky top-0 z-50 bg-slate-900 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-8 bg-blue-600 flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-sm">DMF</span>
          </div>
          <span className="text-white font-bold tracking-tight text-gray-900">Design & Manufacturing Futures</span>
        </div>
        <div className="flex space-x-8 text-[11px] font-black uppercase tracking-widest">
          {['Home', 'Projects', 'Members', 'Publications'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`hover:text-blue-600 transition-colors ${activeTab === item.toLowerCase() ? 'text-blue-600' : 'text-gray-400'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

// --- Sub-Pages ---

const MemberProfile = ({ member, onBack, onNavigateLab, onNavigateProject }) => {
  const lab = LABS.find(l => l.name === member.lab);
  const projects = PROJECTS.filter(p => p.memberIds.includes(member.id));
  const pubs = PUBLICATIONS.filter(p => p.memberIds.includes(member.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <button onClick={onBack} className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <img src={member.image || PLACEHOLDER} 
          alt={member.name} 
          className="w-full aspect-square object-cover rounded-xl mb-6" 
          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loops if placeholder fails
                            e.target.src = PLACEHOLDER;
                          }}/>
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Associated Labs
              </h4>
              <div className="flex flex-wrap gap-2">
                {(member.labs || [member.lab]).map(labName => {
                  const labData = LABS.find(l => l.name === labName);
                  return (
                    <button 
                      key={labName}
                      onClick={() => onNavigateLab(labData)} 
                      className="text-sm text-white font-bold uppercase hover:text-blue-600 transition-colors bg-slate-900 border border-slate-800 px-3 py-1 rounded"
                    >
                      {labName}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {member.interests.map(i => <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase rounded">{i}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-8">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{member.role}</span>
          <h1 className="text-5xl text-white font-black uppercase tracking-tighter mb-8">{member.name}</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">{member.bio}</p>
          
          <div className="space-y-12">
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Active Research
              </h3>
              {/* Updated Grid: 1 column on mobile, 2 on small screens, 3 on medium+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => onNavigateProject(p)} 
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden rounded-xl relative border border-slate-800">
                      <img 
                        src={p.image || PLACEHOLDER} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        alt={p.title}
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loops if placeholder fails
                            e.target.src = PLACEHOLDER;
                          }}
                      />
                      
                      {/* Title Overlay logic identical to Projects page */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 pt-8">
                        <h4 className="text-[11px] font-black text-white uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                          {p.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [memberFilter, setMemberFilter] = useState('All');
  const [projectLabFilter, setProjectLabFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // --- Filter Logic ---
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      // 1. Handle Search
      const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
                            p.description.toLowerCase().includes(projectSearch.toLowerCase());
      
      // 2. Handle Lab Filtering
      if (projectLabFilter === 'All') return matchesSearch;

      // Find the lab object that matches the name in the filter (e.g., "DMF:AI")
      const labData = LABS.find(l => l.name === projectLabFilter);
      if (!labData) return matchesSearch;

      // Check both the singular labId and the new plural labIds array
      const matchesSingular = p.labId === labData.id;
      const matchesPlural = p.labIds && p.labIds.includes(labData.id);
      
      return matchesSearch && (matchesSingular || matchesPlural);
    });
  }, [projectSearch, projectLabFilter]);

  const filteredMembers = useMemo(() => {
  const subset = memberFilter === 'All' 
    ? MEMBERS 
    : MEMBERS.filter(m => {
        // Check if the filter matches the old 'lab' string 
        // OR is present in the new 'labs' array
        return m.lab === memberFilter || (m.labs && m.labs.includes(memberFilter));
      });
      
  return {
    Faculty: subset.filter(m => m.role === 'Faculty'),
    Researchers: subset.filter(m => m.role === 'Researcher'),
    Students: subset.filter(m => m.role === 'Student')
  };
  }, [memberFilter]);

// --- 1. FILTER STATE ---
  // These hooks store the current UI selections for the research portal.
  const [pubLabFilter, setPubLabFilter] = useState('All');
  const [pubAuthorFilter, setPubAuthorFilter] = useState('All');
  const [yearRange, setYearRange] = useState(2020);

  // --- 2. FILTERING LOGIC ---
  // We use useMemo to ensure these calculations only run when a filter actually changes,
  // preventing unnecessary overhead during re-renders.
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter(pub => {
      // Check if the publication belongs to the selected lab
      const matchesLab = pubLabFilter === 'All' || pub.labId === pubLabFilter;
      
      // Check if the selected member ID is present in the publication's memberIds array
      const matchesAuthor = pubAuthorFilter === 'All' || 
        (pub.memberIds && pub.memberIds.includes(parseInt(pubAuthorFilter)));
      
      // Filter by the minimum year threshold
      const matchesYear = pub.year >= yearRange;

      return matchesLab && matchesAuthor && matchesYear;
    });
  }, [pubLabFilter, pubAuthorFilter, yearRange]);

  // --- 3. GROUPING LOGIC ---
  // This transforms the flat filtered array into a structured format for the UI.
  // It creates an object where keys are years and values are arrays of papers.
  const groupedByYear = useMemo(() => {
    const groups = filteredPublications.reduce((acc, pub) => {
      const year = pub.year || "Undated";
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    }, {});
    
    // We return an array of [year, papers] pairs sorted by year in descending order.
    return Object.entries(groups).sort(([yearA], [yearB]) => yearB - yearA);
  }, [filteredPublications]);

  // --- View Logic ---

  if (activeTab === 'profile' && selectedMember) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MemberProfile 
          member={selectedMember} 
          onBack={() => setActiveTab('members')} 
          onNavigateLab={(l) => { setSelectedLab(l); setActiveTab('lab'); }}
          onNavigateProject={(p) => { setSelectedProject(p); setActiveTab('project_page'); }}
        />
      </div>
    );
  }

  if (activeTab === 'project_page' && selectedProject) {
    // 1. Identify if this is a Programme and find its sub-projects
    const isProgramme = selectedProject.type === "Programme";
    const subProjects = PROJECTS.filter(p => p.parentProgrammeId === selectedProject.id);

    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          
          {/* Back Button */}
          <button 
            onClick={() => setActiveTab('projects')} 
            className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
          </button>

          {/* Conditional Rendering based on Type */}
          {isProgramme ? (
            /* --- PROGRAMME PROFILE LAYOUT --- */
            <div className="animate-in fade-in duration-700">
              {/* Cinematic Hero Image */}
              <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-slate-900 mb-16 shadow-2xl">
                <img src={selectedProject.image || PLACEHOLDER} 
                className="w-full h-full object-cover" 
                alt={selectedProject.title} 
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loops if placeholder fails
                  e.target.src = PLACEHOLDER;
                }}/>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Column: Content */}
                <div className="lg:col-span-2">
                  <span className="px-2 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm mb-4 inline-block">
                    Research Programme
                  </span>
                  <h1 className="text-6xl text-white font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                    {selectedProject.title}
                  </h1>
                  <div className="space-y-8">
                    <p className="text-2xl text-slate-300 font-light italic border-l-4 border-emerald-500 pl-8 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    {/* If programmes have additional long-form text, it renders here */}
                    <div className="text-slate-400 font-light leading-loose text-lg">
                       <NarrativeRenderer content={selectedProject.content} />
                    </div>
                  </div>
                </div>

                {/* Right Column: Associated Projects Grid */}
                <aside className="space-y-8">
                  <div className="sticky top-24">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 border-b border-slate-800 pb-2">
                      Associated Projects
                    </h3>
                    <div className="flex flex-col gap-4">
                      {subProjects.map(p => (
                        <div 
                          key={p.id} 
                          onClick={() => { setSelectedProject(p); window.scrollTo(0,0); }}
                          className="group cursor-pointer flex gap-4 items-center bg-slate-900/40 p-3 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all"
                        >
                          <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                            <img 
                              src={p.image || PLACEHOLDER} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                              alt={p.title} 
                              onError={(e) => { e.target.src = PLACEHOLDER; }} 
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="text-[11px] font-black text-white uppercase leading-tight group-hover:text-blue-400 transition-colors">
                              {p.title}
                            </h4>
                            <p className="text-[9px] text-blue-600 uppercase tracking-widest mt-1.5 font-black opacity-0 group-hover:opacity-100 transition-opacity">
                              Explore →
                            </p>
                          </div>
                        </div>
                      ))}
                      {subProjects.length === 0 && (
                        <div className="p-6 border border-dashed border-slate-800 rounded-2xl text-center">
                          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">No sub-projects linked</p>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            /* --- EXISTING PROJECT NARRATIVE LAYOUT --- */
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <img src={selectedProject.image || PLACEHOLDER} className="w-full h-[50vh] object-cover rounded-2xl mb-16 shadow-lg grayscale hover:grayscale-0 transition-all duration-700" alt={selectedProject.title} onError={(e) => {
                e.target.onerror = null; // Prevent infinite loops if placeholder fails
                e.target.src = PLACEHOLDER;
              }} />
              <div className="max-w-4xl mx-auto">
                <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm mb-4 inline-block">
                  {selectedProject.type}
                </span>
                <h1 className="text-6xl text-white font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                  {selectedProject.title}
                </h1>
                <p className="text-2xl text-slate-300 font-light italic mb-16 border-l-4 border-gray-100 pl-8 leading-relaxed">
                  {selectedProject.description}
                </p>
                <NarrativeRenderer content={selectedProject.content} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === 'lab' && selectedLab) {
  // 1. Fix: Use .includes() to support the new many-to-many labIds structure
  const labProjects = PROJECTS.filter(p => 
    (p.labIds && p.labIds.includes(selectedLab.id)) || p.labId === selectedLab.id
  );

  const labMembers = MEMBERS.filter(m => 
    m.lab === selectedLab.name || (m.labs && m.labs.includes(selectedLab.name))
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Navigation / Header */}
        <button 
          onClick={() => setActiveTab('home')} 
          className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Labs
        </button>

        <div className="mb-20 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">
            {selectedLab.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
            {selectedLab.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Main Content: Projects Grid */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 border-b border-slate-900 pb-2">
              Research Portfolio
            </h3>
            
            {labProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {labProjects.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => { setSelectedProject(p); setActiveTab('project_page'); }} 
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden rounded-xl mb-4 relative border border-slate-900 shadow-xl">
                      <img 
                        src={p.image || PLACEHOLDER} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                        alt={p.title} 
                        onError={(e) => { e.target.src = PLACEHOLDER; }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-0.5 backdrop-blur text-[8px] font-black uppercase tracking-widest rounded shadow-sm ${p.type === 'Programme' ? 'bg-emerald-500/90 text-white' : 'bg-white/90 text-slate-900'}`}>
                          {p.type}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 pt-12">
                        <h4 className="text-md font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-gray-200 text-xs font-light italic line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-600 uppercase text-[10px] font-black tracking-widest">No active projects in this sector</p>
              </div>
            )}
          </div>

          {/* Sidebar: Members */}
          <aside>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 border-b border-slate-900 pb-2">
              Lab Members
            </h3>
            <div className="space-y-3">
              {labMembers.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => { setSelectedMember(m); setActiveTab('profile'); }} 
                  className="flex items-center space-x-3 p-3 bg-slate-900/30 border border-slate-800/50 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-900 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-800 grayscale group-hover:grayscale-0 transition-all">
                    <img 
                      src={m.image || PLACEHOLDER} 
                      className="w-full h-full object-cover" 
                      alt={m.name}
                      onError={(e) => { e.target.src = PLACEHOLDER; }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-black uppercase tracking-tight">{m.name}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">{m.role || 'Researcher'}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        {activeTab === 'home' && (
          <>
            <section className="py-40 bg-slate-950">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase">
                  WE ARE <span className="text-blue-600">DMF</span>
                </h1>
                <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                  Cross-disciplinary research defining the design and manufacturing technologies of tomorrow.
                </p>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-40 ">
              <div className="max-w-7xl mx-auto px-4 text-left">
                <h2 className="text-3xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase">
                  LABS
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {LABS.map(lab => (
                  <div 
                    key={lab.id} 
                    onClick={() => { setSelectedLab(lab); setActiveTab('lab'); }}
                    className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer bg-gray-900 transition-all hover:shadow-2xl"
                  >
                    <img src={lab.image || PLACEHOLDER} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt={lab.name} onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loops if placeholder fails
                      e.target.src = PLACEHOLDER;
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      {/* <div className={`${lab.color} w-10 h-10 rounded flex items-center justify-center mb-4 transform group-hover:-translate-y-2 transition-transform`}>{lab.icon}</div> */} 
                      <h3 className="text-white font-black text-xl uppercase tracking-tighter leading-tight">{lab.title}</h3>
                      <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase mt-2">{lab.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h1 className="text-6xl text-white font-black uppercase tracking-tighter mb-8">DMF Projects</h1>
                <div className="flex flex-wrap gap-4">
                  {['All', 'DMF:AI', 'DMF:Tech', 'DMF:Additive', 'DMF:Quantum'].map(lab => (
                    <button 
                      key={lab} 
                      onClick={() => setProjectLabFilter(lab)}
                      className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border transition-all ${projectLabFilter === lab ? 'bg-slate-700 text-white border-white' : 'border-gray-200 text-gray-400 hover:border-white hover:text-white'}`}
                    >
                      {lab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="SEARCH Projects..." 
                  className="w-full bg-slate-950 text-white border rounded-full py-4 pl-12 text-xs border-white font-black uppercase tracking-widest focus:ring-2 ring-blue-500"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
              {filteredProjects.map(p => (
                <div key={p.id} onClick={() => { setSelectedProject(p); setActiveTab('project_page'); }} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4 relative border border-slate-800">
                    <img 
                      src={p.image || PLACEHOLDER} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      alt={p.title}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loops if placeholder fails
                        e.target.src = PLACEHOLDER;
                      }}
                    />
                    
                    {/* Tag Overlay (Top) */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-white/90 backdrop-blur text-[8px] font-black uppercase tracking-widest rounded shadow-sm text-slate-900">
                        {p.type}
                      </span>
                    </div>

                    {/* Title Overlay (Bottom) */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 pt-12">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Uncomment to add a description below project image.
                  <p className="text-gray-400 text-sm font-light italic leading-snug line-clamp-2">
                    {p.description}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="mb-20">
              <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-8">People</h1>
              <div className="flex flex-wrap gap-4">
                {['All', 'DMF:AI', 'DMF:Tech', 'DMF:Additive', 'DMF:Quantum'].map(lab => (
                  <button 
                    key={lab} 
                    onClick={() => setMemberFilter(lab)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border transition-all ${memberFilter === lab ? 'bg-slate-700 text-white border-white' : 'border-gray-200 text-gray-400 hover:border-white hover:text-white'}`}
                  >
                    {lab}
                  </button>
                ))}
              </div>
            </div>

            {Object.entries(filteredMembers).map(([role, list]) => (
              list.length > 0 && (
                <section key={role} className="mb-24">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-10 flex items-center">
                    {role} <div className="ml-6 flex-grow h-px bg-gray-100" />
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {list.map(m => (
                      <div key={m.id} onClick={() => { setSelectedMember(m); setActiveTab('profile'); }} className="group cursor-pointer">
                        <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                          <img src={m.image || PLACEHOLDER} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          alt={m.name} 
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loops if placeholder fails
                            e.target.src = PLACEHOLDER;
                          }}/>
                        </div>
                        <h4 className="font-black text-white text-sm uppercase tracking-tight group-hover:text-blue-600">{m.name}</h4>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{m.labs ? m.labs.join(' || ') : (m.lab || '')}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="max-w-5xl mx-auto px-4 py-20 animate-in fade-in duration-700">
            <div className="mb-16">
              <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Publications
              </h1>
              
              {/* FILTER BAR UI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-900/40 border border-slate-800/60 rounded-3xl backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Research Lab</label>
                  <select 
                    value={pubLabFilter}
                    onChange={(e) => setPubLabFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-white text-[11px] font-bold py-2.5 px-3 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="All">All Sectors</option>
                    {LABS.map(lab => <option key={lab.id} value={lab.id}>{lab.name}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Lead Author</label>
                  <select 
                    value={pubAuthorFilter}
                    onChange={(e) => setPubAuthorFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-white text-[11px] font-bold py-2.5 px-3 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="All">All Members</option>
                    {MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Year Threshold</label>
                    <span className="text-[10px] font-bold text-blue-500 tabular-nums">{yearRange} — 2025</span>
                  </div>
                  <input 
                    type="range" min="2020" max="2025" value={yearRange}
                    onChange={(e) => setYearRange(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 my-auto"
                  />
                </div>
              </div>
            </div>

            {/* LIST RENDERER WITH GROUPING */}
            <div className="space-y-20">
              {Object.entries(
                filteredPublications.reduce((groups, pub) => {
                  const year = pub.year || "Undated";
                  if (!groups[year]) groups[year] = [];
                  groups[year].push(pub);
                  return groups;
                }, {})
              )
              .sort(([yearA], [yearB]) => yearB - yearA)
              .map(([year, pubs]) => (
                <div key={year} className="relative">
                  <div className="sticky top-16 z-10 py-4 bg-slate-950/90 backdrop-blur-md mb-8 border-b border-slate-900 flex items-center justify-between">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">{year}</h2>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">{pubs.length} Papers</span>
                  </div>
                  
                  <div className="divide-y divide-slate-900">
                    {pubs.map(pub => (
                      <div key={pub.id} className="group py-8 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-6">
                         <div className="flex-grow max-w-3xl">
                           <div className="flex items-center gap-3 mb-3">
                             <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-widest">{pub.venue}</span>
                           </div>
                           <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors leading-tight mb-2">
                             {pub.title}
                           </h3>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em]">{pub.authors}</p>
                         </div>
                         
                         <div className="flex items-center">
                          <a 
                            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-blue-500 transition-all group-hover:bg-slate-800"
                          >
                            Scholar <ExternalLink className="w-3 h-3" />
                          </a>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-slate-950 border-t border-slate-800 py-32 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-12 h-10 bg-black flex items-center justify-center rounded-sm mb-6">
             <span className="text-white font-bold">DMF</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">DMF — 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default App;