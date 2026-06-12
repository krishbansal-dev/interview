import { useState, useEffect } from 'react';
import { 
  Terminal, 
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
  X 
} from 'lucide-react';



export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Interactive GUI states
  const [labStatus, setLabStatus] = useState<string>('idle');
  const [activeServerConsole, setActiveServerConsole] = useState<string | null>(null);
  const [serverConsoleLogs, setServerConsoleLogs] = useState<string[]>([]);
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



  // Simulated server CLI console triggering in GUI mode
  const triggerServerConsole = (serverName: string) => {
    setActiveServerConsole(serverName);
    setServerConsoleLogs(['Establishing SSH handshake over Zero-Trust Mesh...', 'Authenticating keys...', 'Connection established.', 'Root console open.']);
    
    setTimeout(() => {
      setServerConsoleLogs(prev => [...prev, '$ docker compose ps']);
    }, 800);

    setTimeout(() => {
      if (serverName === 'vps-1') {
        setServerConsoleLogs(prev => [...prev, 
          'NAME                     IMAGE                  STATUS      PORTS',
          'nginx-proxy-manager      jc21/nginx-pm:latest   running     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp',
          'express-tracker-api      node:18-alpine         running     3000/tcp',
          'portainer                portainer/portainer    running     9000/tcp',
          'netbird-client           netbirdio/client       running     connected to mesh'
        ]);
      } else if (serverName === 'vps-2') {
        setServerConsoleLogs(prev => [...prev, 
          'NAME                     IMAGE                  STATUS      PORTS',
          'coturn-relay             coturn/coturn          running     0.0.0.0:3478->3478/udp, 0.0.0.0:3478->3478/tcp',
          'peerdrop-signaling       node:18-alpine         running     0.0.0.0:8000->8000/tcp',
          'netbird-client           netbirdio/client       running     connected to mesh'
        ]);
      } else {
        setServerConsoleLogs(prev => [...prev, 
          'NAME                     IMAGE                  STATUS      PORTS',
          'postgresql-spatial       postgis/postgis        running     5432/tcp',
          'redis-session-cache      redis:alpine           running     6379/tcp',
          'n8n-automation           n8nio/n8n:latest       running     5678/tcp',
          'cloudflare-ddns-sync     cloudflare-api:latest  running     dynamic ipv6 updater (proxied)'
        ]);
      }
    }, 1500);
  };



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
                <a href="mailto:contact@krishbansal.dev" className="social-link">
                  <Mail className="w-4 h-4" />
                </a>
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

                {/* Dashboard Stats & Live Traffic widgets */}
                <div className="grid-3col">
                  {/* Stats Grid card */}
                  <div className="card-glass flex flex-col justify-between">
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
                    <div className="stat-footer-log">
                      <span>Server Pool Health</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100% OK
                      </span>
                    </div>
                  </div>

                  {/* Simulated Netbird network traffic */}
                  <div className="card-glass traffic-card">
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
                    <div className="chart-footer">
                      <span>T-30s</span>
                      <span>Real-time VPN transit log (simulated)</span>
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                {/* AI-Native Architecture Strategy */}
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
                  <div className="project-details-grid">
                    {/* Project overview */}
                    <div className="flex-col-gap-24">
                      <div className="card-glass">
                        <div className="badge-wrap" style={{ marginBottom: '16px' }}>
                          <span className="custom-badge badge-primary">SaaS Architecture</span>
                          <span className="custom-badge badge-success">Active</span>
                        </div>
                        <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '8px' }}>SalesForce Employee Tracker</h2>
                        <p className="school-desc" style={{ textAlign: 'left', marginBottom: '16px' }}>
                          Three-tier SaaS mapping package: Expo React Native app, admin web dashboard, and containerized Postgres spatial database API.
                        </p>
                        
                        <div className="project-list-bullets">
                          <p className="project-bullet-item"><span className="project-bullet-tag">Geofencing:</span> PostgreSQL PostGIS spatial queries verifying coordinate presence within 50-meter store geofences.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">Mobile Map:</span> Real-time Leaflet mapping display displaying shop registries and salesman pin locations.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">Offline Buffer:</span> Local SQLite database buffering logs during network drops, auto-syncing on connection restore.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">Container Architecture:</span> Docker Compose container isolates database, Redis cache, backend API, and dashboard layers.</p>
                        </div>
                      </div>

                      <div className="card-glass" style={{ padding: '16px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                        <p className="project-bullet-tag" style={{ marginBottom: '8px' }}>CI/CD SSH Pipeline:</p>
                        <p style={{ color: 'var(--text-muted)' }}>GitHub Action triggered on commit &rarr; SSH VPS login &rarr; git pull &rarr; docker compose rebuild &rarr; prune image caching.</p>
                      </div>
                    </div>

                    {/* Interactive Blueprint diagram */}
                    <div className="card-glass node-diagram-card">
                      <div>
                        <h3 className="section-title-mono">Interactive System Architecture Diagram</h3>
                        <p className="school-desc" style={{ textAlign: 'left', fontSize: '11px', marginBottom: '16px' }}>Click on any blueprint node to inspect the engineering trade-offs.</p>
                        
                        {/* Blueprint grid mock */}
                        <div className="node-diagram-grid text-center">
                          <button 
                            onClick={() => setActiveArchNode('rnative')}
                            className={`node-btn ${activeArchNode === 'rnative' ? 'active' : ''}`}
                          >
                            React Native (SQLite)
                          </button>
                          
                          <div className="diagram-line-connector">
                            <div className="diagram-line-bar">
                              <span className="diagram-line-arrow">&rarr;</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setActiveArchNode('node')}
                            className={`node-btn ${activeArchNode === 'node' ? 'active' : ''}`}
                          >
                            Node.js Express API
                          </button>

                          <div className="diagram-vertical-connector" style={{ justifyContent: 'center' }}>
                            <div className="vertical-line"></div>
                          </div>

                          <button 
                            onClick={() => setActiveArchNode('redis')}
                            className={`node-btn ${activeArchNode === 'redis' ? 'active' : ''}`}
                          >
                            Redis Session Cache
                          </button>

                          <div></div>

                          <button 
                            onClick={() => setActiveArchNode('postgis')}
                            className={`node-btn ${activeArchNode === 'postgis' ? 'active' : ''}`}
                          >
                            PostgreSQL + PostGIS
                          </button>
                        </div>
                      </div>

                      {/* Architecture Explanation box */}
                      <div className="node-explanation-box" style={{ marginTop: '24px' }}>
                        {activeArchNode === 'rnative' && (
                          <p>
                            <span className="project-bullet-tag">Expo Mobile Client:</span> Hybrid mobile client tracking location coordinates, rendering interactive Leaflet.js map overlays, and caching coordinates locally in SQLite when offline.
                          </p>
                        )}
                        {activeArchNode === 'node' && (
                          <p>
                            <span className="project-bullet-tag">Node.js Express API:</span> Central routing system for login credentials, spatial checking records, image upload streams, and sync requests.
                          </p>
                        )}
                        {activeArchNode === 'redis' && (
                          <p>
                            <span className="project-bullet-tag">Redis Caching:</span> Key-value cache that keeps active session IDs and last known coordinates in memory to prevent heavy SQL database read load.
                          </p>
                        )}
                        {activeArchNode === 'postgis' && (
                          <p>
                            <span className="project-bullet-tag">Spatial PostgreSQL Database:</span> Stores store geographical polygons and runs location checks using PostGIS GIS calculations to verify agent visits.
                          </p>
                        )}
                        {!activeArchNode && (
                          <p className="text-slate-500 italic text-center">Click a node above to inspect structural logic.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="project-details-grid">
                    {/* Project overview */}
                    <div className="flex-col-gap-24">
                      <div className="card-glass">
                        <div className="badge-wrap" style={{ marginBottom: '16px' }}>
                          <span className="custom-badge badge-primary">WebRTC P2P</span>
                          <span className="custom-badge badge-success">Active</span>
                        </div>
                        <h2 className="school-title" style={{ textAlign: 'left', marginBottom: '8px' }}>PeerDrop File Share</h2>
                        <p className="school-desc" style={{ textAlign: 'left', marginBottom: '16px' }}>
                          A decentralized, privacy-first peer-to-peer web app allowing multi-gigabyte browser sharing and video streams.
                        </p>
                        
                        <div className="project-list-bullets">
                          <p className="project-bullet-item"><span className="project-bullet-tag">P2P Connectivity:</span> Direct browser-to-browser encrypted transfers via WebRTC, bypassing cloud file storage costs.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">WebSocket Signaling:</span> Relays connection parameters via room codes (e.g. 6-character rooms) before connection establishes.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">Zero-Knowledge Transfers:</span> Files stream directly in-memory between browsers, ensuring the server never sees the raw data.</p>
                          <p className="project-bullet-item"><span className="project-bullet-tag">NAT Traversal coturn:</span> Self-hosted TURN servers handle traversal when direct corporate firewalls block standard P2P packets.</p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive diagram for PeerDrop */}
                    <div className="card-glass node-diagram-card">
                      <div>
                        <h3 className="section-title-mono">Interactive System Architecture Diagram</h3>
                        <p className="school-desc" style={{ textAlign: 'left', fontSize: '11px', marginBottom: '16px' }}>Click on any blueprint node to inspect the engineering trade-offs.</p>
                        
                        <div className="node-diagram-grid text-center">
                          <button 
                            onClick={() => setActiveArchNode('peera')}
                            className={`node-btn ${activeArchNode === 'peera' ? 'active' : ''}`}
                          >
                            Browser Peer A (Sender)
                          </button>
                          
                          <div className="diagram-line-connector">
                            <span className="diagram-line-label">WebSocket Handshake</span>
                            <div className="diagram-line-bar">
                              <span className="diagram-line-arrow">&rarr;</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setActiveArchNode('signal')}
                            className={`node-btn ${activeArchNode === 'signal' ? 'active' : ''}`}
                          >
                            Signaling Server (Node)
                          </button>

                          <div className="diagram-vertical-connector">
                            <div className="vertical-line"></div>
                            <div className="vertical-line"></div>
                          </div>

                          <button 
                            onClick={() => setActiveArchNode('coturn')}
                            className={`node-btn ${activeArchNode === 'coturn' ? 'active' : ''}`}
                          >
                            TURN Relay (Coturn)
                          </button>

                          <div></div>

                          <button 
                            onClick={() => setActiveArchNode('peerb')}
                            className={`node-btn ${activeArchNode === 'peerb' ? 'active' : ''}`}
                          >
                            Browser Peer B (Receiver)
                          </button>
                        </div>
                      </div>

                      {/* Explanation box */}
                      <div className="node-explanation-box" style={{ marginTop: '24px' }}>
                        {activeArchNode === 'peera' && (
                          <p>
                            <span className="project-bullet-tag">Browser Peer A (Sender):</span> Reads local files in the browser and streams raw packets directly to Peer B without routing data through third-party servers.
                          </p>
                        )}
                        {activeArchNode === 'signal' && (
                          <p>
                            <span className="project-bullet-tag">WebSocket Signaling:</span> Relays initial pairing descriptors when users enter identical 6-digit room codes. Goes idle once the direct channel opens.
                          </p>
                        )}
                        {activeArchNode === 'coturn' && (
                          <p>
                            <span className="project-bullet-tag">Coturn STUN/TURN:</span> Discovers public IP paths and relays the encrypted media stream if strict corporate routers block direct peer-to-peer connection paths.
                          </p>
                        )}
                        {activeArchNode === 'peerb' && (
                          <p>
                            <span className="project-bullet-tag">Browser Peer B (Receiver):</span> Accepts incoming data channel streams directly from Peer A and triggers browser download events.
                          </p>
                        )}
                        {!activeArchNode && (
                          <p className="text-slate-500 italic text-center">Click a node above to inspect structural logic.</p>
                        )}
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
                    { id: 'vps-1', name: 'vps-1.krishbansal.dev', type: 'Oracle Cloud ARM', role: 'Edge reverse proxy (Nginx Proxy Manager) and SaaS APIs.', icon: Globe },
                    { id: 'vps-2', name: 'vps-2.krishbansal.dev', type: 'Oracle Cloud ARM', role: 'WebRTC Peer signaling node and Coturn STUN/TURN media relay.', icon: Shield },
                    { id: 'minipc', name: 'bare-metal-mini-pc', type: 'Local Mini PC (Dynamic IPv6)', role: 'Database core (PostGIS), Redis session cache, and n8n automations. Exposed to IPv4 clients using Cloudflare API DDNS & Cloudflare Proxy (orange cloud).', icon: Database }
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

                        <button 
                          onClick={() => triggerServerConsole(server.id)}
                          className="hero-action-btn"
                          style={{ marginTop: '24px', width: '100%', justifyContent: 'center', fontSize: '10px' }}
                        >
                          <Terminal className="w-3 h-3 text-cyan-400" />
                          $ open_ssh_console
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Server console simulation drawer */}
                {activeServerConsole && (
                  <div className="card-glass console-window">
                    <div className="console-header-row">
                      <h3 className="console-header-title">
                        <Terminal className="w-4 h-4" />
                        SECURE SSH SESSION: root@{activeServerConsole}.krishbansal.dev
                      </h3>
                      <button 
                        onClick={() => setActiveServerConsole(null)}
                        className="console-close-btn"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="console-screen">
                      {serverConsoleLogs.map((log, index) => (
                        <p key={index} className={log.startsWith('$') ? 'text-cyan-400' : log.includes('running') ? 'text-emerald-400' : 'text-slate-400'}>
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
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
