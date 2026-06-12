import { useState, useEffect } from 'react';
import { 
  Layout, 
  BookOpen, 
  Cpu, 
  Globe, 
  Server, 
  Mail, 
  Database, 
  Shield, 
  Award, 
  RefreshCw, 
  CheckSquare,
  Smartphone
} from 'lucide-react';



export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('contact@krishbansal.dev')
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      })
      .catch((err) => {
        console.error('Could not copy email address: ', err);
      });
    
    // Attempt to open mail app as parallel default behaviour
    window.location.href = 'mailto:contact@krishbansal.dev';
  };
  
  // Interactive GUI states
  const [labStatus, setLabStatus] = useState<string>('idle');
  const [selectedProject, setSelectedProject] = useState<'salesforce' | 'peerdrop'>('salesforce');
  const [activeArchNode, setActiveArchNode] = useState<string | null>(null);
  
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);
  
  // Simulated stats state
  const [netTraffic, setNetTraffic] = useState<number[]>(Array(10).fill(0).map(() => Math.floor(Math.random() * 40) + 10));
  const [pingTimes, setPingTimes] = useState<{ [key: string]: number }>({
    'vps-1': 14,
    'vps-2': 16,
    'minipc': 22
  });

  // Simulate network traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetTraffic(prev => [...prev.slice(1), Math.floor(Math.random() * 50) + 15]);
      setPingTimes({
        'vps-1': Math.floor(Math.random() * 6) + 12,
        'vps-2': Math.floor(Math.random() * 8) + 13,
        'minipc': Math.floor(Math.random() * 10) + 18,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);







  return (
    <div className="app-container">
      {/* Top Header Panel */}
      <header className="app-header">
        <div className="header-logo-section">
          <div className="logo-box logo-plaksha">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaupKpN5w0PIbI6_vYMFEnxN0OnBXOI09EUw&s" 
              alt="Plaksha Emblem" 
              className="header-plaksha-logo" 
            />
          </div>
          <div>
            <h1 className="header-title flex items-center gap-2">
              KRISH BANSAL 
              <span className="custom-badge badge-primary">
                Interview Build
              </span>
            </h1>
            <p className="header-subtitle">📍 Panchkula, HR, India</p>
          </div>
        </div>


      </header>

      {/* Main Dashboard Layout */}
      <div className="dashboard-layout">
        <div className="sidebar-placeholder"></div>
        {/* Sidebar Navigation */}
          <aside className="sidebar">
            <div className="sidebar-top">
              <div className="sidebar-title">Navigation</div>
              <nav className="nav-menu">
                {[
                  { id: 'dashboard', label: 'Overview', icon: Layout },
                  { id: 'story', label: 'Story & Philosophy', icon: BookOpen },
                  { id: 'discussion', label: 'Discussion Index', icon: CheckSquare },
                  { id: 'projects', label: 'Systems & Projects', icon: Cpu },
                  { id: 'lab', label: 'Self-Hosted Lab', icon: Server },
                  { id: 'education', label: 'Education', icon: Award },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Social Links */}
            <div className="sidebar-footer">
              <div className="social-title">CHANNELS</div>
              <div className="social-grid">
                <a href="https://github.com/krishbansal-dev" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <a href="https://linkedin.com/in/krishbansal-dev" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={handleMailClick} 
                    className="social-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    title="Click to copy or email: contact@krishbansal.dev"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  {copiedEmail && (
                    <span className="copied-tooltip">
                      Copied!
                    </span>
                  )}
                </div>
                <a href="https://krishbansal.dev" target="_blank" rel="noreferrer" className="social-link">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
              <p className="sidebar-copyright">© 2026 Krish Bansal</p>
            </div>
          </aside>

          {/* Main Visual Panels */}
          <main className="main-content">
            {/* Mobile Tab Selectors */}
            <div className="mobile-nav-bar">
              {[
                { id: 'dashboard', label: 'Overview' },
                { id: 'story', label: 'Story' },
                { id: 'discussion', label: 'Topics' },
                { id: 'projects', label: 'Architecture' },
                { id: 'lab', label: 'Lab' },
                { id: 'education', label: 'Education' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="flex-col-gap-24">
                {/* Two-column layout grid */}
                <div className="dashboard-grid-main">
                  {/* Left Column: Hero and Manifesto */}
                  <div className="dashboard-col-left">
                    {/* Hero Profile Card */}
                    <div className="card-glass hero-card">
                      <div className="hero-glow-1"></div>
                      <div className="hero-glow-2"></div>
                      
                      <div className="hero-flex relative z-10">
                        <div>
                          <div className="hero-status-row">
                            <span className="status-dot-active"></span>
                            <p className="status-label">Active & Ready for Interview</p>
                          </div>
                          <h2 className="hero-name">
                            Krish Bansal
                          </h2>
                          <p className="hero-title-text">
                            Systems Architect & <span className="gradient-text font-bold">AI-Accelerated Engineer</span>
                          </p>
                          <p className="hero-desc">
                            Infra architect with a deep focus on containerized server design, decentralized zero-knowledge mesh networks, and high-performance routing. I use AI tools to rapidly configure code templates, allowing me to shift my focus entirely to systems logic, database schemas, and deployment pipelines.
                          </p>
                        </div>
                        
                        <button 
                          onClick={() => setActiveTab('discussion')}
                          className="hero-action-btn"
                        >
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                          Explore Discussion Topics
                        </button>
                      </div>

                      {/* Core Tech Stack Icons Grid */}
                      <div className="grid-4col mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                        <div className="tech-card">
                          <p className="tech-card-title">DOCKER & INFRA</p>
                          <p className="tech-card-desc">Container Isolated Compose</p>
                        </div>
                        <div className="tech-card">
                          <p className="tech-card-title">ROUTING & WAN</p>
                          <p className="tech-card-desc">Cloudflare & NPM proxies</p>
                        </div>
                        <div className="tech-card">
                          <p className="tech-card-title">MESH SECURE VPN</p>
                          <p className="tech-card-desc">Netbird Zero-Trust Networks</p>
                        </div>
                        <div className="tech-card">
                          <p className="tech-card-title">DATABASES & ORMS</p>
                          <p className="tech-card-desc">PostGIS, Redis, Prisma</p>
                        </div>
                      </div>
                    </div>

                    {/* AI-Native Manifesto Card */}
                    <div className="card-glass relative overflow-hidden" style={{ padding: '24px' }}>
                      <div className="hero-glow-1" style={{ top: '-10%', left: '30%', opacity: 0.15 }}></div>
                      <h3 className="section-title-mono" style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>AI-Native Manifesto</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          "I use AI as a design and engineering multiplier. While I can read and understand code syntax flawlessly across HTML, CSS, JS, and Python, I rely on AI to generate implementation details. This allows me to focus on the big picture: planning system architecture, designing database schemas, organizing secure networking tunnels, and managing server host configurations."
                        </p>
                        <p style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                          "Many developers write code but don't know how to run it in production, scale it, or secure it on the internet. I focus on understanding the world's digital ecosystem so I can build complete, production-ready systems from scratch and ship them immediately. I look forward to deepening my theoretical and code-level understanding at Plaksha, but AI is my current superpower for building at speed."
                        </p>
                        <div className="quote-box" style={{ borderLeft: '3px solid var(--accent-primary)', backgroundColor: 'rgba(99, 102, 241, 0.05)', padding: '16px', borderRadius: '8px', fontSize: '15px', color: '#ffffff', fontWeight: 'bold', fontStyle: 'italic', marginTop: '8px' }}>
                          "I don't just write code; I orchestrate complete digital systems."
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Stats and Zero-Trust Live Chart */}
                  <div className="dashboard-col-right">
                    {/* Stats Grid card */}
                    <div className="card-glass flex flex-col justify-between" style={{ flex: 1 }}>
                      <div>
                        <h3 className="section-title-mono">Infrastructure Stats</h3>
                        <div className="stats-grid">
                          <div className="stat-item">
                            <p className="stat-number">2</p>
                            <p className="stat-label">Oracle Cloud VPS</p>
                          </div>
                          <div className="stat-item">
                            <p className="stat-number">2</p>
                            <p className="stat-label">Active SaaS Apps</p>
                          </div>
                          <div className="stat-item">
                            <p className="stat-number">7+</p>
                            <p className="stat-label">Managed Domains</p>
                          </div>
                          <div className="stat-item">
                            <p className="stat-number">90+</p>
                            <p className="stat-label">JEE Maths %ile (others low)</p>
                          </div>
                        </div>
                      </div>
                      <div className="stat-footer-log">
                        <span>Server Pool Health</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% OK
                        </span>
                      </div>
                    </div>

                    {/* Simulated Netbird network traffic */}
                    <div className="card-glass traffic-card flex flex-col justify-between" style={{ flex: 1 }}>
                      <div>
                        <div className="chart-header">
                          <h3 className="section-title-mono mb-0">Zero-Trust Mesh Transit</h3>
                          <span className="chart-badge">
                            netbird0: encrypted
                          </span>
                        </div>
                        {/* Visual bar transit chart */}
                        <div className="chart-bars">
                          {netTraffic.map((value, i) => (
                            <div 
                              key={i} 
                              className="chart-bar"
                              style={{ height: `${value * 1.8}%` }}
                              title={`Data: ${value} KB/s`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="chart-footer">
                        <span>T-30s</span>
                        <span>Real-time VPN transit log (simulated)</span>
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI-Native Developer Workflow (full width below the grid) */}
                <div className="card-glass">
                  <h3 className="section-title-mono">AI-Native Developer Workflow</h3>
                  <div className="grid-5col">
                    {[
                      { step: '01', title: 'Blueprint', desc: 'Detail system routing, schemas, and container layout.' },
                      { step: '02', title: 'AI Assist', desc: 'Use AI tools as code multipliers to write configuration scripts.' },
                      { step: '03', title: 'Containers', desc: 'Package services into clean, isolated Docker environments.' },
                      { step: '04', title: 'Tunnel Routing', desc: 'Secure local and edge nodes behind Cloudflare Tunnels.' },
                      { step: '05', title: 'Ship & Test', desc: 'Deploy automated actions via GitHub Actions with active rollback.' }
                    ].map((item, idx) => (
                      <div key={idx} className="workflow-step-card">
                        <span className="step-number-tag">{item.step}</span>
                        <h4 className="step-title">{item.title}</h4>
                        <p className="step-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: STORY & PHILOSOPHY */}
            {activeTab === 'story' && (
              <div className="grid-3col">
                {/* The minecraft server logs */}
                <div className="span-2 flex-col-gap-24">
                  <div className="card-glass">
                    <h3 className="section-title-mono">The Catalyst: Minecraft Server</h3>
                    <div className="flex-col-gap-24" style={{ marginTop: '16px' }}>
                      <p className="text-sm leading-relaxed text-slate-300">
                        At a young age, my friends and I wanted a private Minecraft server, but paid hosting was out of our budget. I decided to figure out how to host it myself. I negotiated and spun up a remote VPS, configured SSH, mapped DNS ports, and worked through the Linux CLI.
                      </p>
                      
                      {/* Interactive Minecraft Server Console Box */}
                      <div className="console-screen emerald">
                        <p className="text-slate-500">// Triggering SSH Minecraft Startup sequence...</p>
                        <p>[20:10:35 INFO]: Starting minecraft server version 1.12.2</p>
                        <p>[20:10:35 INFO]: Loading properties</p>
                        <p>[20:10:35 INFO]: Default game type: SURVIVAL</p>
                        <p>[20:10:36 INFO]: Generating keypair</p>
                        <p>[20:10:37 INFO]: Preparing level "world"</p>
                        <p>[20:10:39 INFO]: Preparing start region for level 0 (Seed: 489372895)</p>
                        <p>[20:10:41 INFO]: Done (5.4s)! For help, type "help" or "?"</p>
                        <p className="text-cyan-400">[20:11:02 INFO]: Krish logged in from 192.168.1.150</p>
                        <p className="text-yellow-400">[20:11:05 INFO]: Krish issued server command: /op krishbansal</p>
                        <p className="text-purple-400">[Server: Opped krishbansal]</p>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        What started as a desire to play a game with friends became my gateway to server hosting and Linux systems. Learning how to configure a server, connect to it over SSH, open and map network ports, and point domain names laid the foundation for everything I build today.
                      </p>
                    </div>
                  </div>

                  {/* Academics Philosophy */}
                  <div className="card-glass">
                    <h3 className="section-title-mono">Academic & Learning Stance</h3>
                    <div className="flex-col-gap-24" style={{ marginTop: '16px' }}>
                      <p className="text-sm leading-relaxed text-slate-300">
                        "While my 90+ percentile was in Mathematics in JEE Main (with other subjects being low due to my intense focus on active software creation over theoretical chemistry memorization), this score validates my quantitative and logical core. I have always believed that engineering is defined by building. Rather than dedicating my focus to theoretical rote recall in other subjects, I chose to invest my efforts in acquiring practical skills in containerization, mesh network routing, and spatial databases."
                      </p>
                      <div className="quote-box">
                        "Plaksha University's focus on interdisciplinary engineering and builder-first learning matches my active approach to systems engineering. I aim to deploy production-ready cloud systems and solve real-world scale challenges."
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI-Native builder manifesto */}
                <div className="flex-col-gap-24">
                  <div className="card-glass">
                    <h3 className="section-title-mono">AI-Native Manifesto</h3>
                    <div className="flex-col-gap-24" style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                      <p className="text-slate-300">
                        "I use AI as a design and engineering multiplier. While I can read and understand code syntax flawlessly across HTML, CSS, JS, and Python, I rely on AI to generate implementation details. This allows me to focus on the big picture: planning system architecture, designing database schemas, organizing secure networking tunnels, and managing server host configurations."
                      </p>
                      <p className="text-slate-300">
                        "Many developers write code but don't know how to run it in production, scale it, or secure it on the internet. I focus on understanding the world's digital ecosystem so I can build complete, production-ready systems from scratch and ship them immediately. I look forward to deepening my theoretical and code-level understanding at Plaksha, but AI is my current superpower for building at speed."
                      </p>
                      <p className="text-slate-300 font-semibold mt-4">
                        "I don't just write code; I orchestrate complete digital systems."
                      </p>
                    </div>
                  </div>

                  {/* Co-curricular interests */}
                  <div className="card-glass">
                    <h3 className="section-title-mono">Cognitive & Creative Outlets</h3>
                    <div style={{ marginTop: '16px' }}>
                      <div className="list-item-split">
                        <span>Strategic Analytics</span>
                        <span>Competitive Chess</span>
                      </div>
                      <div className="list-item-split">
                        <span>System Optimization</span>
                        <span>Complex Strategy Mechanics</span>
                      </div>
                      <div className="list-item-split" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                        <span>Narrative & Design Aesthetics</span>
                        <span>Creative Digital Media</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: DISCUSSION TOPICS CHECKLIST */}
            {activeTab === 'discussion' && (
              <div className="flex-col-gap-24">
                <div>
                  <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '4px' }}>Topics of Discussion Index</h2>
                  <p className="school-desc" style={{ textAlign: 'left', fontSize: '12px' }}>
                    An interactive map of my technical competency areas, infrastructure stacks, and learning philosophies. Check topics to highlight them, or click "Explain Concept" to view my experience and suggested interview questions.
                  </p>
                </div>

                <div className="grid-2col" style={{ gap: '20px' }}>
                  {[
                    {
                      id: 'ssh',
                      title: 'SSH & Linux CLI',
                      desc: 'Managing remote servers, directory navigation, key-based auth, and Ubuntu commands.',
                      exp: [
                        'Actively use SSH keys and configs to manage remote Oracle VPS servers and home lab mini PC.',
                        'Comfortable with basic Linux directories, bash scripting, file permissions (chmod/chown), and diagnostic commands (top, df, systemctl).'
                      ],
                      questions: [
                        'How did setting up a Minecraft server teach you about Linux permissions and ports?',
                        'What is your preferred method for managing server authentication securely?'
                      ]
                    },
                    {
                      id: 'docker',
                      title: 'Docker & Containerization',
                      desc: 'Dockerizing services, multi-container layouts, and environment isolation.',
                      exp: [
                        'Dockerize applications to standardize environments across local development and cloud production VPS.',
                        'Write Docker Compose configuration files to orchestrate databases, caches, and API backend instances as isolated microservices.'
                      ],
                      questions: [
                        'Why do you containerize apps before deployment?',
                        'How do you manage configurations and persistent storage in multi-container setups?'
                      ]
                    },
                    {
                      id: 'selfhost',
                      title: 'Self-Hosting Stack',
                      desc: 'Orchestrating tools like Portainer, NPM, Netbird, and N8N automations.',
                      exp: [
                        'Host Portainer for visual container administration, Nginx Proxy Manager (NPM) for reverse-proxying and SSL termination.',
                        'Deploy N8N workflow automations to handle webhook triggers and process background API tasks.'
                      ],
                      questions: [
                        'What are some of the key services you host in your home lab?',
                        'How does Nginx Proxy Manager help expose services securely?'
                      ]
                    },
                    {
                      id: 'cloudflare',
                      title: 'Cloudflare Stack',
                      desc: 'DNS management, tunnels, Cloudflare Pages hosting, and API DDNS integrations.',
                      exp: [
                        'Manage domains, tunnels to route local ports through double NATs, and pages for hosting fast static web frontends.',
                        'Use the Cloudflare API to update dynamic IPv6 inbound routing, enabling orange cloud proxy services for IPv4 clients.'
                      ],
                      questions: [
                        'How do Cloudflare Tunnels bypass local router configurations?',
                        'How does the Cloudflare orange cloud facilitate connections for IPv4 clients?'
                      ]
                    },
                    {
                      id: 'serverless',
                      title: 'Serverless Architecture',
                      desc: 'Deploying logic and pages without server management, using Cloudflare Pages.',
                      exp: [
                        'Deploy static frontends on Cloudflare Pages, eliminating the need to maintain operating systems and scale servers.',
                        'Understand how edge hosting reduces latency and automates scaling compared to virtual machines.'
                      ],
                      questions: [
                        'What are the advantages of hosting a frontend on Cloudflare Pages over a VPS?',
                        'How do you define serverless in your projects?'
                      ]
                    },
                    {
                      id: 'git',
                      title: 'Git & GitHub Workflows',
                      desc: 'Version control workflows: PRs, branch commits, remotes, and repository management.',
                      exp: [
                        'Maintain code repositories on GitHub, managing development branches, commit flows, pull requests, and merges.',
                        'Use git commands daily to sync work and coordinate deployment pipeline triggers.'
                      ],
                      questions: [
                        'What git workflow do you use when building projects?',
                        'How do you handle merge conflicts in your code repository?'
                      ]
                    },
                    {
                      id: 'cicd',
                      title: 'CI/CD Pipelines',
                      desc: 'Automating deployment cycles using GitHub Actions workflows.',
                      exp: [
                        'Constructed automated pipelines: GitHub Actions build and push static assets to Cloudflare Pages on commit.',
                        'Configure Actions to SSH into VPS nodes, pull latest commits, rebuild Docker Compose images, and prune dangling cache.'
                      ],
                      questions: [
                        'Can you describe the CI/CD pipeline you built for your tracking project?',
                        'Why is automated container pruning important in a VPS environment?'
                      ]
                    },
                    {
                      id: 'zerotrust',
                      title: 'Zero-Trust Networks',
                      desc: 'Netbird overlay VPN mesh connections across private servers.',
                      exp: [
                        'Connect Oracle VPS instances and home lab mini PC securely using Netbird private mesh VPN overlay.',
                        'Secure administration ports (e.g. SSH, dashboards) so they are inaccessible via public WAN but fully accessible inside the VPN.'
                      ],
                      questions: [
                        'How does a Zero-Trust VPN mesh improve server security?',
                        'How do you access your home server SSH ports when you are outside your local network?'
                      ]
                    },
                    {
                      id: 'apis',
                      title: 'REST APIs & Integrations',
                      desc: 'Understanding GET/POST requests and processing API payloads in N8N.',
                      exp: [
                        'Understand HTTP methods (GET, POST), route handlers, and query payloads.',
                        'Integrate API endpoints in N8N automation workflows to process Webhook notifications and sync database data.'
                      ],
                      questions: [
                        'What is the role of the signaling backend in your peer-to-peer web app?',
                        'How do you use APIs inside N8N automations?'
                      ]
                    },
                    {
                      id: 'ai',
                      title: 'AI-Native Orchestration',
                      desc: 'Using AI as an engineering multiplier for system architecture and planning.',
                      exp: [
                        'Use AI tools to generate template code and config files, while focusing on system architecture and deployments.',
                        'Plan database schemas, data flows, and container specifications first, ensuring complete control over how everything runs.'
                      ],
                      questions: [
                        'How does your AI-native workflow differ from simple code generation prompting?',
                        'Why do you believe understanding the digital hosting ecosystem is as important as writing syntax?'
                      ]
                    },

                    {
                      id: 'catalyst',
                      title: 'Personal Catalyst (Minecraft)',
                      desc: 'Starting the software and DevOps journey by hosting gaming servers.',
                      exp: [
                        'Arranged first server at a young age to host a Minecraft server, setting up remote VPS, port mapping, and Linux CLI.',
                        'Enjoy playing competitive chess (strategic analytics), anime, and system logic optimization.'
                      ],
                      questions: [
                        'How did setting up a Minecraft server inspire your passion for Linux and infrastructure?',
                        'What other systems-oriented co-curriculars play a big part in your daily developer life?'
                      ]
                    }
                  ].map(concept => (
                    <div 
                      key={concept.id} 
                      className={`card-glass concept-discussion-card ${expandedConcept === concept.id ? 'checked-glow' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedConcept(expandedConcept === concept.id ? null : concept.id)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h4 
                          className="school-title" 
                          style={{ 
                            textAlign: 'left', 
                            fontSize: '14px', 
                            fontFamily: 'var(--font-heading)',
                            marginBottom: 0
                          }}
                        >
                          {concept.title}
                        </h4>
                        <span className={`concept-status-badge ${expandedConcept === concept.id ? 'active' : ''}`}>
                          {expandedConcept === concept.id ? 'Expanded' : 'Click to View'}
                        </span>
                      </div>

                      <p className="school-desc" style={{ textAlign: 'left', fontSize: '12px', marginTop: '12px', marginBottom: '16px' }}>
                        {concept.desc}
                      </p>

                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => setExpandedConcept(expandedConcept === concept.id ? null : concept.id)}
                          className="hero-action-btn"
                          style={{ fontSize: '11px', padding: '6px 12px', flexGrow: 1, justifyContent: 'center' }}
                        >
                          {expandedConcept === concept.id ? 'Hide Details' : 'Explain My Experience'}
                        </button>
                      </div>

                      {expandedConcept === concept.id && (
                        <div 
                          className="concept-expanded-drawer pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] space-y-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div>
                            <p className="project-bullet-tag" style={{ fontSize: '11px', marginBottom: '4px' }}>Hands-on Experience:</p>
                            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
                              {concept.exp.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SYSTEMS & PROJECTS */}
            {activeTab === 'projects' && (
              <div className="flex-col-gap-24">
                {/* Project selector */}
                <div className="project-toggle-wrap">
                  <button 
                    onClick={() => { setSelectedProject('salesforce'); setActiveArchNode(null); }}
                    className={`project-toggle-btn ${selectedProject === 'salesforce' ? 'active' : ''}`}
                  >
                    SalesForce Tracker
                  </button>
                  <button 
                    onClick={() => { setSelectedProject('peerdrop'); setActiveArchNode(null); }}
                    className={`project-toggle-btn ${selectedProject === 'peerdrop' ? 'active' : ''}`}
                  >
                    PeerDrop Engine
                  </button>
                </div>

                {/* Main project card */}
                {selectedProject === 'salesforce' ? (
                  <div className="flex-col-gap-24">
                    {/* Top Row: Full Width Overview Card */}
                    <div className="card-glass">
                      <div className="badge-wrap">
                        <span className="custom-badge badge-primary">SaaS Architecture</span>
                        <span className="custom-badge badge-success">Production Ready</span>
                        <span className="custom-badge badge-info">Multi-Container</span>
                      </div>
                      <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '8px' }}>SalesForce Employee Tracker</h2>
                      <p className="school-desc" style={{ textAlign: 'left', marginBottom: '16px', fontSize: '14px', lineHeight: '1.6' }}>
                        A complete three-tier SaaS location auditing package. It pairs an Expo React Native mobile client (featuring local spatial caches) with a secure, containerized Express API and Spatial PostGIS storage cluster.
                      </p>
                      
                      <div className="project-list-bullets">
                        <p className="project-bullet-item"><span className="project-bullet-tag">Geofencing:</span> Employs PostGIS spatial coordinate checks to verify location compliance within 50m of registers.</p>
                        <p className="project-bullet-item"><span className="project-bullet-tag">Mobile Sync:</span> Renders dynamic Leaflet overlays at 60 FPS using hardware-accelerated transitions.</p>
                        <p className="project-bullet-item"><span className="project-bullet-tag">Offline Buffer:</span> Coordinates save to SQLite during dropout periods, batch uploading when connection restores.</p>
                      </div>
                    </div>

                    {/* Middle Row: Two-Column split */}
                    <div className="project-details-layout">
                      {/* Left Column: Metrics and Pipeline */}
                      <div className="project-col-specs">

                        {/* CI/CD Pipeline Card */}
                        <div className="card-glass">
                          <h3 className="section-title-mono" style={{ marginBottom: '12px' }}>CI/CD Pipeline</h3>
                          <div className="pipeline-steps">
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">01. PUSH</span>
                              <span className="pipeline-step-desc">GitHub Actions triggers automatically on push to production branch.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">02. SSH</span>
                              <span className="pipeline-step-desc">Establish secure SSH socket connection with remote VPS node.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">03. COMPOSE</span>
                              <span className="pipeline-step-desc">Trigger Docker build runner to rebuild express and db containers.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">04. PRUNE</span>
                              <span className="pipeline-step-desc">Prune legacy image caches to conserve host SSD limits.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Interactive Blueprint Diagram */}
                      <div className="card-glass project-col-diagram">
                        <div>
                          <h3 className="section-title-mono" style={{ marginBottom: '4px' }}>System Topology</h3>
                          <p className="school-desc" style={{ textAlign: 'left', fontSize: '11px', marginBottom: '16px' }}>Click any node card to inspect container details.</p>
                          
                          <div className="topology-diagram-container">
                            <div className="topology-grid">
                              {/* Column 1: Client */}
                              <div className="topology-col">
                                <span className="topology-group-title">Client Tier</span>
                                <button 
                                  onClick={() => setActiveArchNode('rnative')}
                                  className={`topology-node ${activeArchNode === 'rnative' ? 'active' : ''}`}
                                >
                                  <div className="topology-node-icon">
                                    <Smartphone className="w-5 h-5" />
                                  </div>
                                  <div className="topology-node-title">Expo App</div>
                                  <div className="topology-node-badge">CLIENT (SQLite)</div>
                                </button>
                              </div>

                              {/* Column 2: Service */}
                              <div className="topology-col">
                                <span className="topology-group-title">Service Tier</span>
                                <div className="flex-col-gap-16 w-full">
                                  <button 
                                    onClick={() => setActiveArchNode('node')}
                                    className={`topology-node ${activeArchNode === 'node' ? 'active' : ''}`}
                                  >
                                    <div className="topology-node-icon">
                                      <Cpu className="w-5 h-5" />
                                    </div>
                                    <div className="topology-node-title">Express API</div>
                                    <div className="topology-node-badge">ROUTING</div>
                                  </button>

                                  <button 
                                    onClick={() => setActiveArchNode('redis')}
                                    className={`topology-node ${activeArchNode === 'redis' ? 'active' : ''}`}
                                  >
                                    <div className="topology-node-icon">
                                      <RefreshCw className="w-5 h-5" />
                                    </div>
                                    <div className="topology-node-title">Redis Cache</div>
                                    <div className="topology-node-badge">IN-MEMORY</div>
                                  </button>
                                </div>
                              </div>

                              {/* Column 3: Storage */}
                              <div className="topology-col">
                                <span className="topology-group-title">Storage Tier</span>
                                <button 
                                  onClick={() => setActiveArchNode('postgis')}
                                  className={`topology-node ${activeArchNode === 'postgis' ? 'active' : ''}`}
                                >
                                  <div className="topology-node-icon">
                                    <Database className="w-5 h-5" />
                                  </div>
                                  <div className="topology-node-title">PostgreSQL</div>
                                  <div className="topology-node-badge">GIS DATABASE</div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Node Explanation Drawer */}
                        <div className="node-explanation-box">
                          {activeArchNode === 'rnative' && (
                            <p>
                              <span className="project-bullet-tag">Expo Client & SQLite:</span> Tracks coordinates in a background thread. Caches data in SQLite when cellular connection drops, batch-uploading it as soon as the API becomes reachable again.
                            </p>
                          )}
                          {activeArchNode === 'node' && (
                            <p>
                              <span className="project-bullet-tag">Express Server API:</span> Validates client tokens, receives geolocation coordinate batches, parses multipart image uploads, and queries PostgreSQL for store checks.
                            </p>
                          )}
                          {activeArchNode === 'redis' && (
                            <p>
                              <span className="project-bullet-tag">Redis Cache:</span> Maintains active JSON Web Tokens (JWT) and coordinates in-memory. Cuts database read queries down by 80% during peak login periods.
                            </p>
                          )}
                          {activeArchNode === 'postgis' && (
                            <p>
                              <span className="project-bullet-tag">PostGIS Database:</span> Performs geographic point-in-polygon evaluations using standard coordinate maps. Spatially index queries to run in less than 2ms.
                            </p>
                          )}
                          {!activeArchNode && (
                            <p className="text-slate-500 italic text-center">Click a node above to inspect structural logic.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-col-gap-24">
                    {/* Top Row: Full Width Overview Card */}
                    <div className="card-glass">
                      <div className="badge-wrap">
                        <span className="custom-badge badge-primary">WebRTC P2P</span>
                        <span className="custom-badge badge-success">Zero-Knowledge</span>
                        <span className="custom-badge badge-info">Low Latency</span>
                      </div>
                      <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '8px' }}>PeerDrop Share Engine</h2>
                      <p className="school-desc" style={{ textAlign: 'left', marginBottom: '16px', fontSize: '14px', lineHeight: '1.6' }}>
                        A decentralized peer-to-peer browser tool for streaming large files and media streams directly between browser tabs. Leverages custom signaling tunnels and NAT routing traversal.
                      </p>
                      
                      <div className="project-list-bullets">
                        <p className="project-bullet-item"><span className="project-bullet-tag">Direct Flow:</span> Establishes raw browser-to-browser SCTP channels, completely eliminating server storage capacity limits.</p>
                        <p className="project-bullet-item"><span className="project-bullet-tag">Signaling:</span> Exchange SDP handshakes over encrypted WebSockets using simple room codes.</p>
                        <p className="project-bullet-item"><span className="project-bullet-tag">Symmetric NAT Bypass:</span> Traverses heavy corporate firewalls using self-hosted, custom-routed Coturn TURN nodes.</p>
                      </div>
                    </div>

                    {/* Middle Row: Two-Column split */}
                    <div className="project-details-layout">
                      {/* Left Column: Metrics and Pipeline */}
                      <div className="project-col-specs">

                        {/* CI/CD Pipeline Card */}
                        <div className="card-glass">
                          <h3 className="section-title-mono" style={{ marginBottom: '12px' }}>CI/CD Pipeline</h3>
                          <div className="pipeline-steps">
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">01. BUILD</span>
                              <span className="pipeline-step-desc">Vite compiler translates TypeScript into minified static assets.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">02. DEPLOY</span>
                              <span className="pipeline-step-desc">Push static build folder directly to Cloudflare Pages edge network.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">03. HOST</span>
                              <span className="pipeline-step-desc">Secure edge DNS routing and SSL certificate mapping.</span>
                            </div>
                            <div className="pipeline-step">
                              <span className="pipeline-step-badge">04. TURN MAPPING</span>
                              <span className="pipeline-step-desc">Map TURN credentials dynamically to self-hosted Coturn routers.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Interactive Blueprint Diagram */}
                      <div className="card-glass project-col-diagram">
                        <div>
                          <h3 className="section-title-mono" style={{ marginBottom: '4px' }}>System Topology</h3>
                          <p className="school-desc" style={{ textAlign: 'left', fontSize: '11px', marginBottom: '16px' }}>Click any node card to inspect WebRTC role details.</p>
                          
                          <div className="topology-diagram-container">
                            <div className="topology-grid">
                              {/* Column 1: Client Sender */}
                              <div className="topology-col">
                                <span className="topology-group-title">Sender Peer</span>
                                <button 
                                  onClick={() => setActiveArchNode('peera')}
                                  className={`topology-node ${activeArchNode === 'peera' ? 'active' : ''}`}
                                >
                                  <div className="topology-node-icon">
                                    <Globe className="w-5 h-5" />
                                  </div>
                                  <div className="topology-node-title">Peer A</div>
                                  <div className="topology-node-badge">SENDER (WebRTC)</div>
                                </button>
                              </div>

                              {/* Column 2: Signaling & Relay */}
                              <div className="topology-col">
                                <span className="topology-group-title">Relay Tier</span>
                                <div className="flex-col-gap-16 w-full">
                                  <button 
                                    onClick={() => setActiveArchNode('signal')}
                                    className={`topology-node ${activeArchNode === 'signal' ? 'active' : ''}`}
                                  >
                                    <div className="topology-node-icon">
                                      <Cpu className="w-5 h-5" />
                                    </div>
                                    <div className="topology-node-title">Signaler</div>
                                    <div className="topology-node-badge">WEBSOCKETS</div>
                                  </button>

                                  <button 
                                    onClick={() => setActiveArchNode('coturn')}
                                    className={`topology-node ${activeArchNode === 'coturn' ? 'active' : ''}`}
                                  >
                                    <div className="topology-node-icon">
                                      <Shield className="w-5 h-5" />
                                    </div>
                                    <div className="topology-node-title">Coturn</div>
                                    <div className="topology-node-badge">COTURN TURN</div>
                                  </button>
                                </div>
                              </div>

                              {/* Column 3: Client Receiver */}
                              <div className="topology-col">
                                <span className="topology-group-title">Receiver Peer</span>
                                <button 
                                  onClick={() => setActiveArchNode('peerb')}
                                  className={`topology-node ${activeArchNode === 'peerb' ? 'active' : ''}`}
                                >
                                  <div className="topology-node-icon">
                                    <Globe className="w-5 h-5" />
                                  </div>
                                  <div className="topology-node-title">Peer B</div>
                                  <div className="topology-node-badge">RECEIVER (WebRTC)</div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Node Explanation Drawer */}
                        <div className="node-explanation-box">
                          {activeArchNode === 'peera' && (
                            <p>
                              <span className="project-bullet-tag">Browser Peer A (Sender):</span> Opens a local file handle. Encrypts and sends files in 64KB SCTP chunks, monitoring the data channel's `bufferedAmount` to prevent browser RAM crashes.
                            </p>
                          )}
                          {activeArchNode === 'signal' && (
                            <p>
                              <span className="project-bullet-tag">WebSocket Signal Service:</span> Connects peers via room codes, relaying SDP offers, answers, and ICE candidates. Relinquishes interaction once direct client links are active.
                            </p>
                          )}
                          {activeArchNode === 'coturn' && (
                            <p>
                              <span className="project-bullet-tag">Coturn Relay:</span> Discovers public IPs (STUN role) and relays data (TURN role) when symmetric corporate firewalls block direct connection handshakes.
                            </p>
                          )}
                          {activeArchNode === 'peerb' && (
                            <p>
                              <span className="project-bullet-tag">Browser Peer B (Receiver):</span> Listens for incoming SCTP data packets. Converts buffer arrays into blobs and triggers file download events inside the browser window.
                            </p>
                          )}
                          {!activeArchNode && (
                            <p className="text-slate-500 italic text-center">Click a node above to inspect WebRTC role details.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SELF-HOSTED LAB */}
            {activeTab === 'lab' && (
              <div className="flex-col-gap-24">
                <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                  <div>
                    <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '4px' }}>Interactive Lab Manager</h2>
                    <p className="school-desc" style={{ textAlign: 'left', fontSize: '12px' }}>Pings and Docker container logs mapped via the Netbird Zero-Trust Mesh.</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setLabStatus('checking');
                      setTimeout(() => setLabStatus('idle'), 1200);
                    }}
                    className="hero-action-btn"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${labStatus === 'checking' ? 'animate-spin text-indigo-400' : ''}`} />
                    Test Mesh Latency
                  </button>
                </div>

                {/* Server nodes grid */}
                <div className="grid-3col">
                  {[
                    { id: 'vps-1', name: 'VM 1', type: 'Oracle Cloud ARM', role: 'Deployments and Developments (VM)', icon: Globe },
                    { id: 'vps-2', name: 'VM 2', type: 'Oracle Cloud ARM', role: 'VM2 (SaaS)', icon: Shield },
                    { id: 'minipc', name: 'PC', type: 'Local Mini PC (Dynamic IPv6)', role: 'Testing and Experiments (PC)', icon: Database }
                  ].map(server => {
                    const Icon = server.icon;
                    return (
                      <div key={server.id} className="card-glass flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="icon-box">
                              <Icon className="w-4 h-4 text-indigo-400" />
                            </div>
                            <span className="ping-badge">
                              <span className="ping-dot"></span>
                              {pingTimes[server.id] || 15}ms
                            </span>
                          </div>
                          
                          <h4 className="school-title" style={{ textAlign: 'left', fontSize: '13px', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{server.name}</h4>
                          <p className="school-subtitle" style={{ textAlign: 'left', marginBottom: '8px' }}>{server.type}</p>
                          <p className="school-desc" style={{ textAlign: 'left', fontSize: '11px' }}>{server.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: EDUCATION */}
            {activeTab === 'education' && (
              <div className="flex-col-gap-24">
                <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Education & Application Focus</h2>
                
                <div className="grid-3col">
                  {/* Plaksha University */}
                  <div className="card-glass flex flex-col justify-between">
                    <div>
                      <div className="logo-frame-container">
                        <div className="school-logo-circle">
                          <img 
                            src="https://cdn.universitykart.com//Content/upload/admin/owzakzf0.d4k.png" 
                            alt="Plaksha University Logo" 
                            className="school-logo-img"
                          />
                        </div>
                      </div>
                      
                      <h3 className="school-title">Plaksha University</h3>
                      <p className="school-subtitle">Interview: 15th June 2026</p>
                      <p className="school-desc">
                        Applying for modern interdisciplinary engineering. Excited about Plaksha's applied-first curriculum, tech entrepreneurship focus, and builder-focused environment.
                      </p>
                    </div>

                    <div className="education-status-footer">
                      <span className="custom-badge badge-primary">
                        Target Institution
                      </span>
                    </div>
                  </div>

                  {/* Sri Chaitanya / LMJ School */}
                  <div className="card-glass flex flex-col justify-between">
                    <div>
                      <div className="logo-frame-container">
                        <div className="school-logo-circle">
                          <img 
                            src="/sri_chaitanya.jpg" 
                            alt="Sri Chaitanya Logo" 
                            className="school-logo-img"
                          />
                        </div>
                      </div>
                      
                      <h3 className="school-title">Sri Chaitanya & LMJ School</h3>
                      <p className="school-subtitle">Sr Secondary (11th & 12th)</p>
                      <p className="school-desc">
                        Physics, Chemistry, and Mathematics focus. Developed deep analytical mechanics and math solving skills. Prepared for JEE Main.
                      </p>
                    </div>

                    <div className="education-status-footer">
                      <span className="custom-badge badge-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* DC Model School */}
                  <div className="card-glass flex flex-col justify-between">
                    <div>
                      <div className="logo-frame-container">
                        <div className="school-logo-circle">
                          <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMqOe_CXw-X3l3KcRObDsli66N4L6notmVJA&s" 
                            alt="DC Model School Logo" 
                            className="school-logo-img"
                          />
                        </div>
                      </div>
                      
                      <h3 className="school-title">DC Model Sr Sec School</h3>
                      <p className="school-subtitle">High School (10th)</p>
                      <p className="school-desc">
                        Sector-7 Panchkula. Fostered core science and math concepts. Initiated my server orchestration interests during this time.
                      </p>
                    </div>

                    <div className="education-status-footer">
                      <span className="custom-badge badge-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </main>
        </div>
    </div>
  );
}
