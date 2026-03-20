export const PROJECTS = [
  // --- PROGRAMMES (4) ---
  { 
    id: 'prog-embodied', 
    type: 'Programme', 
    title: 'Embodied Intelligence', 
    labIds: ['ai', 'tech'], 
    description: 'Investigating the physical manifestation of AI in architectural robotics.', 
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    memberIds: [1, 4],
    content: [
      { type: 'heading', value: 'Programme Vision' },
      { type: 'text', value: 'This initiative explores how the physical form factor of an AI agent changes the psychological contract between human and machine.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=1200&q=80', caption: 'Laboratory prototyping of kinetic limbs.' }
    ]
  },
  { 
    id: 'prog-bio', 
    type: 'Programme', 
    title: 'Synthetic Bio-Fab', 
    labIds: ['additive', 'tech'], 
    description: 'Next-generation additive manufacturing using biological and mycelium-based polymers.', 
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f1305b3c2?w=1200&h=600&fit=crop',
    memberIds: [2, 3],
    content: [
      { type: 'heading', value: 'Bio-Fabrication' },
      { type: 'text', value: 'Exploring sustainable growth-based construction through fungal networks.' }
    ]
  },
  { 
    id: 'prog-quantum', 
    type: 'Programme', 
    title: 'Quantum Design Systems', 
    labIds: ['quantum', 'ai'], 
    description: 'Leveraging quantum computing for complex topology optimization.', 
    image: 'https://images.unsplash.com/photo-1509023467864-1ecbb3f6354b?w=1200&h=600&fit=crop',
    memberIds: [1, 2],
    content: [
      { type: 'heading', value: 'Quantum Optimization' },
      { type: 'text', value: 'Solving non-polynomial problems in structural engineering.' }
    ]
  },
  { 
    id: 'prog-human', 
    type: 'Programme', 
    title: 'Human-Machine Co-Design', 
    labIds: ['tech', 'quantum'], 
    description: 'Protocols for collaborative design between human intuition and machine logic.', 
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
    memberIds: [3, 4],
    content: [
      { type: 'heading', value: 'Co-Design Framework' },
      { type: 'text', value: 'Establishing new methodologies for hybrid intelligence in the design studio.' }
    ]
  },

  // --- PROJECTS (20) ---
  // Associated with 'Embodied Intelligence'
  { 
    id: 'p1', 
    type: 'Project', 
    parentProgrammeId: 'prog-embodied', 
    title: 'Kinetic Facades', 
    labIds: ['tech'], 
    description: 'Responsive building envelopes.', 
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=800&q=80', 
    memberIds: [1, 4], 
    content: [
      { type: 'text', value: 'Detailed research into kinetic shading systems using SMA actuators.' },
      { type: 'video', value: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ] 
  },
  { id: 'p2', type: 'Project', parentProgrammeId: 'prog-embodied', title: 'Neural Latency', labIds: ['ai'], description: 'Reducing lag in robotic feedback loops.', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800&q=80', memberIds: [1], content: [{ type: 'text', value: 'Optimization of real-time control systems.' }] },
  { id: 'p3', type: 'Project', parentProgrammeId: 'prog-embodied', title: 'Soft Robotics', labIds: ['tech', 'ai'], description: 'Pneumatic actuators for safe contact.', image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&q=80', memberIds: [4], content: [{ type: 'text', value: 'Investigation of variable stiffness materials.' }] },
  { id: 'p4', type: 'Project', parentProgrammeId: 'prog-embodied', title: 'Tactile Sensing', labIds: ['ai'], description: 'Haptic feedback for remote fabrication.', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80', memberIds: [1, 2], content: [{ type: 'text', value: 'Sensor integration in robotic end-effectors.' }] },

  // Associated with 'Synthetic Bio-Fab'
  { id: 'p5', type: 'Project', parentProgrammeId: 'prog-bio', title: 'Mycelium Bricks', labIds: ['additive'], description: 'Growing structural components.', image: 'https://images.unsplash.com/photo-1518173946687-a4c8a3b74dbf?w=800&q=80', memberIds: [2], content: [{ type: 'text', value: 'Fungal growth patterns in architectural formwork.' }] },
  { id: 'p6', type: 'Project', parentProgrammeId: 'prog-bio', title: 'Algae Bio-Ink', labIds: ['additive', 'tech'], description: 'Carbon-sequestering 3D printing.', image: 'https://images.unsplash.com/photo-1523289217630-0dd16184af8e?w=800&q=80', memberIds: [3], content: [{ type: 'text', value: 'Developing photosynthetic extrusion materials.' }] },
  { id: 'p7', type: 'Project', parentProgrammeId: 'prog-bio', title: 'Cellular Scaffolds', labIds: ['tech'], description: 'Printing matrices for tissue growth.', image: 'https://images.unsplash.com/photo-1579154235602-3c3751226840?w=800&q=80', memberIds: [2, 3], content: [{ type: 'text', value: 'Bio-compatible structural lattices.' }] },
  { id: 'p8', type: 'Project', parentProgrammeId: 'prog-bio', title: 'Biopolymer Strength', labIds: ['additive'], description: 'Testing tensile strength of starch-based resins.', image: 'https://images.unsplash.com/photo-1532187896946-4110fb5d5086?w=800&q=80', memberIds: [3], content: [{ type: 'text', value: 'Mechanical characterization of bio-plastics.' }] },

  // Associated with 'Quantum Design Systems'
  { id: 'p9', type: 'Project', parentProgrammeId: 'prog-quantum', title: 'Q-Topology', labIds: ['quantum'], description: 'Quantum-accelerated shape optimization.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', memberIds: [1], content: [{ type: 'text', value: 'Complex load-path calculation using Q-algorithms.' }] },
  { id: 'p10', type: 'Project', parentProgrammeId: 'prog-quantum', title: 'Entangled Nodes', labIds: ['quantum', 'ai'], description: 'Distributed computing in structural mesh.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', memberIds: [2], content: [{ type: 'text', value: 'Multi-agent coordination in quantum state space.' }] },
  { id: 'p11', type: 'Project', parentProgrammeId: 'prog-quantum', title: 'Superposition Flow', labIds: ['quantum'], description: 'Fluid dynamics via quantum probability.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', memberIds: [1, 3], content: [{ type: 'text', value: 'Simulating wind loads through quantum annealing.' }] },
  { id: 'p12', type: 'Project', parentProgrammeId: 'prog-quantum', title: 'Cryo-Fabrication', labIds: ['tech', 'quantum'], description: 'Printing in absolute-zero environments.', image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=800&q=80', memberIds: [2, 4], content: [{ type: 'text', value: 'Material behavior at superconducting temperatures.' }] },

  // Associated with 'Human-Machine Co-Design'
  { id: 'p13', type: 'Project', parentProgrammeId: 'prog-human', title: 'Gesture Control', labIds: ['tech'], description: 'Robotic arms via hand tracking.', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80', memberIds: [3], content: [{ type: 'text', value: 'Intuitive robotic interfaces for craftsmen.' }] },
  { id: 'p14', type: 'Project', parentProgrammeId: 'prog-human', title: 'Intuitive Meshing', labIds: ['ai', 'tech'], description: 'Human-guided AI mesh refinement.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', memberIds: [4], content: [{ type: 'text', value: 'Interactive machine learning for geometry.' }] },
  { id: 'p15', type: 'Project', parentProgrammeId: 'prog-human', title: 'VR Sandboxes', labIds: ['tech'], description: 'Immersive environments for spatial design.', image: 'https://images.unsplash.com/photo-1592477942544-ef29188827e7?w=800&q=80', memberIds: [3, 4], content: [{ type: 'text', value: 'Collaborative VR for urban planning.' }] },
  { id: 'p16', type: 'Project', parentProgrammeId: 'prog-human', title: 'Ethical Algorithms', labIds: ['ai'], description: 'Bias detection in generative architectural models.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', memberIds: [1, 4], content: [{ type: 'text', value: 'Quantifying diversity in generative output.' }] },

  // Independent Projects
  { id: 'p17', type: 'Project', title: 'Solar Weaving', labIds: ['tech'], description: 'Robotic weaving of solar-collecting textiles.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80', memberIds: [2], content: [{ type: 'text', value: 'Automated fabrication of smart building membranes.' }] },
  { id: 'p18', type: 'Project', title: 'Acoustic Meta-Materials', labIds: ['additive'], description: '3D printed geometry for passive noise cancellation.', image: 'https://images.unsplash.com/photo-1516339901600-2e3a82dc50d4?w=800&q=80', memberIds: [3], content: [{ type: 'text', value: 'Diffractive patterns for sound management.' }] },
  { id: 'p19', type: 'Project', title: 'Graphene Infusion', labIds: ['additive', 'tech'], description: 'Strengthening large-scale prints with 2D materials.', image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&q=80', memberIds: [1, 4], content: [{ type: 'text', value: 'Enhanced polymer properties via nano-additives.' }] },
  { id: 'p20', type: 'Project', title: 'Urban Topology', labIds: ['ai'], description: 'AI-driven layout of smart city infrastructure.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80', memberIds: [2, 3], content: [{ type: 'text', value: 'Optimization of transit networks and energy grids.' }] }
];