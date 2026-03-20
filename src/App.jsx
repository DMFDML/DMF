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
    name: 'Lab::AI', 
    title: 'Interactive Artificial Intelligence', 
    description: 'Exploring human-centered AI, explainability, and collaborative intelligence systems. We focus on how transparency in algorithmic decision-making affects user trust and long-term adoption.', 
    color: 'bg-blue-600', 
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=400&fit=crop"
  },
  { 
    id: 'immerse', 
    name: 'Lab::Immerse', 
    title: 'Immersive Technologies', 
    description: 'Designing the future of VR, AR, and spatial computing for work and play. Our research looks at physiological responses to immersion and novel locomotion techniques in infinite virtual spaces.', 
    color: 'bg-purple-600', 
    icon: <Globe className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=400&fit=crop"
  },
  { 
    id: 'health', 
    name: 'Lab::Health', 
    title: 'Everyday Health & Care', 
    description: 'Investigating how technology supports wellbeing and chronic condition management. We partner with healthcare providers to design systems that fit seamlessly into the "messy" reality of daily life.', 
    color: 'bg-emerald-600', 
    icon: <Award className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop"
  },
  { 
    id: 'tech', 
    name: 'Lab::Tech', 
    title: 'Interactive Materials', 
    description: 'Prototyping novel physical interfaces and computational fabrication techniques. We bridge the gap between digital design and physical matter through smart textiles and responsive surfaces.', 
    color: 'bg-amber-500', 
    icon: <FlaskConical className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop"
  }
];

const MEMBERS = [
  { id: 1, name: "Prof. Ben Hicks", role: "Faculty", lab: "Lab::AI", image: getAssetPath("/images/people/headshot_hicks.jpg"), bio: "Director of Research Lab. Expert in Human-AI collaboration and trust in automated systems.", interests: ["Human-AI Interaction", "Ethics", "Explainable AI"] },
  { id: 2, name: "Dr Chris Snider", role: "Faculty", lab: "Lab::Immerse", image: getAssetPath("/images/people/headshot_snider.jpg"), bio: "Leading spatial computing and haptic feedback research.", interests: ["VR Locomotion", "Haptics", "Spatial UI"] },
  { id: 3, name: "Dr James Gopsill", role: "Researcher", lab: "Lab::Health", image: getAssetPath("/images/people/headshot_gopsill.png"), bio: "Post-doctoral fellow focusing on wearable medical devices.", interests: ["Digital Health", "Wearables", "Care Work"] },
  { id: 4, name: "Dr Mark Goudswaard", role: "Researcher", lab: "Lab::AI", image: getAssetPath("/images/people/headshot_goudswaard.jpg"), bio: "Research associate focusing on NLP and user agency.", interests: ["NLP", "User Agency", "AI Safety"] },
  { id: 5, name: "Aisha Khan", role: "Student", lab: "Lab::Tech", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop", bio: "PhD candidate exploring 3D printed electronics.", interests: ["Fabrication", "Smart Materials"] },
  { id: 7, name: "Dr. Priya Patel", role: "Researcher", lab: "Lab::Health", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop", bio: "Reader in Digital Health Design.", interests: ["Inclusion", "Neurodiversity"] }
];

const PROJECTS = [
  { 
    id: 'p1', 
    type: 'Programme', 
    title: 'Future of Embodied AI', 
    labId: 'ai', 
    description: 'A multi-year research programme investigating how physical embodiment affects the way humans perceive and trust AI-driven agents.', 
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    memberIds: [1, 4],
    pubIds: [103],
    content: [
      { type: 'heading', value: 'The Core Challenge' },
      { type: 'text', value: 'Current AI systems often lack a physical presence. In this project, we explore how the form factor of an AI changes the psychological contract.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=1200&q=80', caption: 'Initial prototyping phase.' },
      { type: 'heading', value: 'Video Demonstration' },
      { type: 'video', value: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  },
  { 
    id: 'p2', 
    type: 'Project', 
    title: 'Conversational Touchpoints', 
    parentProgrammeId: 'p1', 
    labId: 'ai', 
    description: 'A sub-project under Embodied AI focusing on localized voice interactions in shared workspaces.', 
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=600&fit=crop',
    memberIds: [1, 4],
    pubIds: [],
    content: [{ type: 'text', value: 'Exploring the nuance of proximity in voice UI.' }]
  },
  { 
    id: 'p3', 
    type: 'Programme', 
    title: 'Neurodivergent Design Lab', 
    labId: 'health', 
    description: 'Developing new methodologies for co-designing with neurodivergent individuals.', 
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=600&fit=crop',
    memberIds: [7, 3],
    pubIds: [101],
    content: [{ type: 'text', value: 'Sensory-first design approaches.' }]
  }
];

const PUBLICATIONS = [
  { id: 101, title: "Designing for Neurodiversity in Academia", authors: "Patel, P., et al.", venue: "CHI 2025", memberIds: [7], labId: 'health' },
  { id: 103, title: "Trust and Reciprocity in Human-AI Teams", authors: "Jenkins, S., Wilson, J.", venue: "CSCW 2024", memberIds: [1, 4], labId: 'ai' }
];

// --- Specialized Components ---

const NarrativeRenderer = ({ content }) => {
  if (!content || content.length === 0) return null;
  return (
    <div className="space-y-12 mb-20">
      {content.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            return <h3 key={idx} className="text-2xl font-black text-gray-900 uppercase tracking-tight pt-4">{block.value}</h3>;
          case 'text':
            return <p key={idx} className="text-lg text-gray-600 leading-relaxed font-light">{block.value}</p>;
          case 'image':
            return (
              <figure key={idx} className="my-12">
                <img src={block.value} alt="Content" className="w-full rounded-lg shadow-sm" />
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
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-sm">RL</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 uppercase">RESEARCH::LAB</span>
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
          <img src={member.image} alt={member.name} className="w-full aspect-square object-cover rounded-xl grayscale mb-6" />
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Primary Lab</h4>
              <button onClick={() => onNavigateLab(lab)} className="text-sm font-bold uppercase hover:text-blue-600 transition-colors">{member.lab}</button>
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
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">{member.name}</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">{member.bio}</p>
          
          <div className="space-y-12">
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-100 pb-2">Active Research</h3>
              <div className="grid grid-cols-1 gap-4">
                {projects.map(p => (
                  <div key={p.id} onClick={() => onNavigateProject(p)} className="p-4 border border-gray-100 rounded-lg hover:border-blue-600 cursor-pointer group transition-all">
                    <h4 className="font-bold uppercase text-sm group-hover:text-blue-600">{p.title}</h4>
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
      const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
                            p.description.toLowerCase().includes(projectSearch.toLowerCase());
      
      const labData = LABS.find(l => l.id === p.labId);
      const matchesLab = projectLabFilter === 'All' || labData?.name === projectLabFilter;
      
      return matchesSearch && matchesLab;
    });
  }, [projectSearch, projectLabFilter]);

  const filteredMembers = useMemo(() => {
    const subset = memberFilter === 'All' ? MEMBERS : MEMBERS.filter(m => m.lab === memberFilter);
    return {
      Faculty: subset.filter(m => m.role === 'Faculty'),
      Researchers: subset.filter(m => m.role === 'Researcher'),
      Students: subset.filter(m => m.role === 'Student')
    };
  }, [memberFilter]);

  // --- View Logic ---

  if (activeTab === 'profile' && selectedMember) {
    return (
      <div className="min-h-screen bg-white">
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
    const lab = LABS.find(l => l.id === selectedProject.labId);
    return (
      <div className="min-h-screen bg-white">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <button onClick={() => setActiveTab('projects')} className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <img src={selectedProject.image} className="w-full h-[50vh] object-cover rounded-2xl mb-16 shadow-lg grayscale hover:grayscale-0 transition-all duration-700" alt={selectedProject.title} />
          <div className="max-w-4xl mx-auto">
            <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm mb-4 inline-block">{selectedProject.type}</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-8">{selectedProject.title}</h1>
            <p className="text-2xl text-gray-500 font-light italic mb-16 border-l-4 border-gray-100 pl-8 leading-relaxed">{selectedProject.description}</p>
            <NarrativeRenderer content={selectedProject.content} />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'lab' && selectedLab) {
    const labProjects = PROJECTS.filter(p => p.labId === selectedLab.id);
    const labMembers = MEMBERS.filter(m => m.lab === selectedLab.name);
    return (
      <div className="min-h-screen bg-white">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <button onClick={() => setActiveTab('home')} className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="mb-20">
            <div className={`${selectedLab.color} w-16 h-16 rounded-xl flex items-center justify-center mb-8`}>{selectedLab.icon}</div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">{selectedLab.title}</h1>
            <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">{selectedLab.description}</p>
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Lab Projects</h3>
              <div className="space-y-4">
                {labProjects.map(p => (
                  <div key={p.id} onClick={() => { setSelectedProject(p); setActiveTab('project_page'); }} className="p-6 border border-gray-100 rounded-xl hover:border-blue-600 cursor-pointer transition-all">
                    <h4 className="font-bold uppercase tracking-tight">{p.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Lab Members</h3>
              <div className="grid grid-cols-2 gap-4">
                {labMembers.map(m => (
                  <div key={m.id} onClick={() => { setSelectedMember(m); setActiveTab('profile'); }} className="flex items-center space-x-3 p-3 border border-gray-50 rounded-lg cursor-pointer hover:bg-gray-50">
                    <img src={m.image} className="w-8 h-8 rounded-full grayscale" />
                    <span className="text-xs font-bold uppercase">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        {activeTab === 'home' && (
          <>
            <section className="py-40 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                  THE FUTURE <br/> IS <span className="text-blue-600">INTERACTIVE</span>.
                </h1>
                <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                  A cross-disciplinary research collective pushing the boundaries of human-machine experience.
                </p>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-40">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {LABS.map(lab => (
                  <div 
                    key={lab.id} 
                    onClick={() => { setSelectedLab(lab); setActiveTab('lab'); }}
                    className="group relative h-80 overflow-hidden rounded-2xl cursor-pointer bg-gray-900 transition-all hover:shadow-2xl"
                  >
                    <img src={lab.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700 grayscale" alt={lab.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <div className={`${lab.color} w-10 h-10 rounded flex items-center justify-center mb-4 transform group-hover:-translate-y-2 transition-transform`}>{lab.icon}</div>
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
                <h1 className="text-6xl font-black uppercase tracking-tighter mb-8">Archive</h1>
                <div className="flex flex-wrap gap-4">
                  {['All', 'Lab::AI', 'Lab::Immerse', 'Lab::Health', 'Lab::Tech'].map(lab => (
                    <button 
                      key={lab} 
                      onClick={() => setProjectLabFilter(lab)}
                      className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border transition-all ${projectLabFilter === lab ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
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
                  placeholder="SEARCH REPOSITORY..." 
                  className="w-full bg-gray-50 border-none rounded-full py-4 pl-12 text-xs font-black uppercase tracking-widest focus:ring-2 ring-blue-500"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredProjects.map(p => (
                <div key={p.id} onClick={() => { setSelectedProject(p); setActiveTab('project_page'); }} className="group cursor-pointer">
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-6 relative">
                    <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={p.title} />
                    <div className="absolute top-6 left-6 flex space-x-2">
                       <span className="px-2 py-1 bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest rounded shadow-sm">{p.type}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2 font-light italic leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="mb-20">
              <h1 className="text-6xl font-black uppercase tracking-tighter mb-8">People</h1>
              <div className="flex flex-wrap gap-4">
                {['All', 'Lab::AI', 'Lab::Immerse', 'Lab::Health', 'Lab::Tech'].map(lab => (
                  <button 
                    key={lab} 
                    onClick={() => setMemberFilter(lab)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border transition-all ${memberFilter === lab ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
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
                          <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={m.name} />
                        </div>
                        <h4 className="font-black text-sm uppercase tracking-tight group-hover:text-blue-600">{m.name}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{m.lab}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-16">Publications</h1>
            <div className="space-y-6">
              {PUBLICATIONS.map(pub => (
                <div key={pub.id} className="group border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
                   <div className="flex-grow">
                     <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1 block">{pub.venue}</span>
                     <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-blue-600">{pub.title}</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{pub.authors}</p>
                   </div>
                   <button className="flex items-center text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black shrink-0">
                     Read Paper <ExternalLink className="w-3 h-3 ml-2" />
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-32 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm mb-6">
             <span className="text-white font-bold">RL</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">RESEARCH::LAB ARCHIVE — 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default App;