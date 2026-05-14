import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  User, 
  BookOpen, 
  Briefcase,
  Terminal,
  Cpu,
  Globe,
  Database,
  Home,
  FolderOpen,
  Shield,
  LineChart,
  PenTool,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';

// --- LIQUID GLASS COMPONENT ---
const LiquidGlass = () => {
  const glassRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isShattered, setIsShattered] = useState(false);
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = (window.innerWidth / 2 - e.pageX) / 25;
      targetRef.current.y = (window.innerHeight / 2 - e.pageY) / 25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (isShattered) return;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1;
      
      if (glassRef.current) {
        glassRef.current.style.transform = `rotateY(${currentRef.current.x}deg) rotateX(${currentRef.current.y}deg)`;
      }

      timeRef.current += 0.03;

      particlesRef.current.forEach((p, i) => {
        if (!p) return;
        const speed = (i + 1) * 1.2;
        const floatX = Math.sin(timeRef.current * 0.5 + i * 10) * 10;
        const floatY = Math.cos(timeRef.current * 0.3 + i * 10) * 10;
        p.style.transform = `translate(${-currentRef.current.x * speed + floatX}px, ${-currentRef.current.y * speed + floatY}px)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isShattered]);

  const handleShatter = () => {
    if (isShattered) return;
    setIsShattered(true);

    if (glassRef.current) {
        glassRef.current.style.transform = 'scale(1)';
    }

    const rect = glassRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
        const shard = document.createElement('div');
        shard.classList.add('shard');
        
        const size = Math.random() * 30 + 10;
        shard.style.width = `${size}px`;
        shard.style.height = `${size}px`;
        shard.style.left = `${centerX}px`;
        shard.style.top = `${centerY}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rot = Math.random() * 720;

        shard.animate([
            { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });

        document.body.appendChild(shard);
        setTimeout(() => shard.remove(), 800);
    }

    setTimeout(() => {
      setIsShattered(false);
    }, 4000);
  };

  return (
    <div className="relative flex justify-center items-center w-full h-[400px] lg:h-[500px] -mt-10 lg:mt-0" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 gooey-filter z-0 flex justify-center items-center overflow-visible pointer-events-none">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        </filter>
      </svg>

      <div 
        ref={glassRef} 
        className={`liquid-glass ${isShattered ? 'shattered' : ''}`}
        onClick={handleShatter}
      >
        <div ref={el => particlesRef.current[0] = el} className="particle" style={{ width: '15px', height: '15px', top: '20%', left: '20%' }}></div>
        <div ref={el => particlesRef.current[1] = el} className="particle" style={{ width: '10px', height: '10px', top: '60%', left: '80%' }}></div>
        <div ref={el => particlesRef.current[2] = el} className="particle" style={{ width: '8px', height: '8px', top: '40%', left: '50%' }}></div>
      </div>
    </div>
  );
};

// Types
interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [itemsPerViewSkill, setItemsPerViewSkill] = useState(1);
  const [activeProject, setActiveProject] = useState(0);
  const [itemsPerViewProject, setItemsPerViewProject] = useState(1);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerViewProject(window.innerWidth >= 1024 ? 2 : 1);
      setItemsPerViewSkill(window.innerWidth >= 1024 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'skills', 'projects'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const projects: Project[] = [
    {
      title: "NEU Library Visitor App",
      description: "Modern web application for managing library visitor logs, tracking entries/exits, generating reports, and improving campus library operations with real-time updates.",
      longDescription: "A comprehensive visitor tracking and management system tailored for the New Era University Library. The system provides an intuitive interface for students and staff to log their visits securely. An admin dashboard helps librarians analyze visitor trends, manage resources better, and oversee library capacity in real-time. Built with a focus on seamless user experience, fast entry processing, and data security.",
      tags: ["React", "UI/UX", "Database"],
      github: "https://github.com/JLNerecina/NEU-Library-Visitor-App",
      link: "https://remix-neu-library-visitor-app-230692279419.us-west1.run.app/",
      image: "/NEU Library Visitor App Preview 1.png"
    },
    {
      title: "NEU MOA Monitoring System",
      description: "Comprehensive monitoring dashboard for tracking Memorandum of Agreement (MOA) status, deadlines, partners, and compliance to streamline university partnerships.",
      longDescription: "A highly specialized monitoring dashboard designed for standardizing and tracking Memorandums of Agreement (MOA) for New Era University. This system digitizes the MOA lifecycle—from drafting to expiration checking. It features automated alerts that notify administrators before critical agreements lapse, ensuring legal compliance and improved inter-departmental visibility. It also provides a clear audit trail of all signed partnerships.",
      tags: ["Dashboard", "Fullstack", "System"],
      github: "https://github.com/JLNerecina/NEU-MOA-Monitoring-System",
      link: "https://neu-moa-monitoring-system-230692279419.us-west1.run.app/",
      image: "/NEU MOA Monitoring System Preview.png"
    },
    {
      title: "CICS Curriculum Map System",
      description: "A Knowledge Management framework designed to visualize and track academic progress, prerequisites, and course relationships for students and admins.",
      longDescription: "An advanced Knowledge Management framework designed to dynamically visualize academic progress. Using D3.js, the framework provides an interactive node-based curriculum map, allowing students and administrators to deeply understand course relationships and prerequisites. It is instrumental in helping students identify bottlenecks in their path and make informed choices about their academic progression.",
      tags: ["KM Framework", "D3.js", "Education"],
      github: "https://github.com/JLNerecina/PE2-KM-Curriculum-Map",
      image: "/CICS Curriculum Map.png"
    },
    {
      title: "HOPE, Inc. Product Management System",
      description: "A comprehensive product management system for HOPE, Inc., streamlining inventory, sales, and data tracking processes.",
      longDescription: "A scalable, comprehensive product management system specifically developed for HOPE, Inc. to streamline their inventory, sales tracking, and operational processes. Built on a modern tech stack (React & Tailwind on the frontend), this application empowers operations staff to accurately monitor stock levels, manage detailed product lifecycles, and generate insightful business reports. It features robust role-based access control and high-performance data processing.",
      tags: ["Fullstack", "Management System", "Tailwind"],
      github: "https://github.com/fausturnacht/SE2-Zendata-HopePMS",
      image: "/PMS Dashboard.png"
    }
  ];

  const skillGroups = [
    {
      title: "Frontend Development",
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: "HTML5", src: "https://cdn.simpleicons.org/html5/E34F26", level: "Advanced" },
        { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", level: "Advanced" },
        { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E", level: "Intermediate" },
        { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6", level: "Intermediate" },
        { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB", level: "Intermediate" },
        { name: "Vite", src: "https://cdn.simpleicons.org/vite/646CFF", level: "Intermediate" },
        { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", level: "Advanced" },
        { name: "Bootstrap", src: "https://cdn.simpleicons.org/bootstrap/7952B3", level: "Advanced" }
      ]
    },
    {
      title: "Backend & Software Eng.",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: "PHP", src: "https://cdn.simpleicons.org/php/777BB4", level: "Intermediate" },
        { name: "Laravel", src: "https://cdn.simpleicons.org/laravel/FF2D20", level: "Intermediate" },
        { name: "Java", src: "https://cdn.simpleicons.org/openjdk/FFFFFF", level: "Beginner" },
        { name: "OOP", level: "Advanced" },
        { name: "Design Patterns", level: "Intermediate" },
        { name: "Data Structures", level: "Intermediate" },
        { name: "Algorithms", level: "Intermediate" }
      ]
    },
    {
      title: "AI Orchestration",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: "Google AI Studio", src: "https://cdn.simpleicons.org/google/4285F4", level: "Advanced" },
        { name: "Claude Code", src: "https://cdn.simpleicons.org/anthropic/white", level: "Intermediate" },
        { name: "Antigravity", level: "Beginner" },
        { name: "Google Stitch", level: "Beginner" }
      ]
    },
    {
      title: "BaaS, Databases & Local",
      icon: <Database className="w-5 h-5 text-green-400" />,
      skills: [
        { name: "Supabase", src: "https://cdn.simpleicons.org/supabase/3ECF8E", level: "Intermediate" },
        { name: "Firestore", src: "https://cdn.simpleicons.org/firebase/FFCA28", level: "Intermediate" },
        { name: "MySQL", src: "https://cdn.simpleicons.org/mysql/4479A1", level: "Advanced" },
        { name: "XAMPP", src: "https://cdn.simpleicons.org/xampp/FB503B", level: "Advanced" },
        { name: "Laragon", level: "Advanced" },
        { name: "HeidiSQL", level: "Intermediate" }
      ]
    },
    {
      title: "Cybersecurity & OS",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      skills: [
        { name: "Bash", src: "https://cdn.simpleicons.org/gnubash/4EAA25", level: "Intermediate" },
        { name: "Burp Suite", src: "https://cdn.simpleicons.org/portswigger/FF6633", level: "Beginner" },
        { name: "Oracle VirtualBox", src: "https://cdn.simpleicons.org/virtualbox/183A61", level: "Intermediate" },
        { name: "Kali Linux", src: "https://cdn.simpleicons.org/kalilinux/557C94", level: "Intermediate" },
        { name: "Linux Mint", src: "https://cdn.simpleicons.org/linuxmint/87A556", level: "Advanced" },
        { name: "Metasploitable", level: "Beginner" }
      ]
    },
    {
      title: "Data Science & Analytics",
      icon: <LineChart className="w-5 h-5 text-orange-400" />,
      skills: [
        { name: "R", src: "https://cdn.simpleicons.org/r/276DC3", level: "Beginner" },
        { name: "Tableau Public", level: "Intermediate" },
        { name: "tidyverse", level: "Beginner" },
        { name: "ggplot2", level: "Beginner" },
        { name: "Statistical Analysis", level: "Intermediate" }
      ]
    },
    {
      title: "Design, UI/UX & PM",
      icon: <PenTool className="w-5 h-5 text-pink-400" />,
      skills: [
        { name: "Figma", src: "https://cdn.simpleicons.org/figma/F24E1E", level: "Intermediate" },
        { name: "Adobe Photoshop", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", level: "Advanced" },
        { name: "Canva", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", level: "Advanced" },
        { name: "Project Libre", level: "Beginner" }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden moving-gradient text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* SVG Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#00c6ff" offset="0%" />
            <stop stopColor="#0072ff" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header & Glass Navigation */}
      <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/5 p-3 px-6 rounded-full shadow-2xl pointer-events-auto">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto shadow-lg flex items-center space-x-3"
          >
            <img src="/My Logo - JLN.png" alt="JLN Logo" className="h-10 md:h-12 object-contain rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/90 hidden sm:block">Online Portfolio</span>
          </motion.div>
          
          {/* Main Navigation - Integrated horizontally on Desktop */}
          <nav className="hidden md:flex flex-1 justify-center pointer-events-auto">
            <ul className="glass-nav-container !rounded-full py-1.5 px-3">
              {[
                { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
                { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
                { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
              ].map((item) => (
                <li 
                  key={item.id} 
                  className={`glass-nav-item-wrapper ${activeSection === item.id ? 'active' : ''}`}
                >
                  <a 
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className="glass-nav-item !h-[45px] !w-[80px]"
                  >
                    <div className="glass-nav-content">
                      <span className="glass-nav-text text-xs">{item.label}</span>
                      <span className="glass-nav-icon">{item.icon}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Button */}
          <a 
            href="mailto:johnlian.nerecina@neu.edu.ph"
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-widest shadow-xl ml-auto md:ml-0"
          >
            Get in Touch
          </a>
        </div>
        
        {/* Mobile Navbar sticking to bottom */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:hidden flex justify-center pointer-events-auto">
          <ul className="glass-nav-container w-full justify-around !rounded-2xl">
            {[
              { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
              { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
              { id: 'skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
              { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
            ].map((item) => (
              <li 
                key={item.id} 
                className={`glass-nav-item-wrapper ${activeSection === item.id ? 'active' : ''}`}
              >
                <a 
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className="glass-nav-item"
                >
                  <div className="glass-nav-content">
                    <span className="glass-nav-text">{item.label}</span>
                    <span className="glass-nav-icon">{item.icon}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black/10">
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-lg mb-6">
                Available for New Opportunities
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] uppercase">
                John Lian <span className="text-blue-500 block italic">Nerecina</span>
              </h1>
              <p className="text-lg lg:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Designer, Web Developer, and Database Specialist. Current CS student at <span className="font-semibold text-white">New Era University</span>. 
                I turn complex ideas into responsive websites and robust applications.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
                <a 
                  href="https://linkedin.com/in/john-lian-nerecina-042744286"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors group text-sm"
                >
                  <Linkedin className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
                <a 
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors shadow-sm text-sm"
                >
                  View My Work
                </a>
              </div>
            </motion.div>

            <div className="hidden lg:flex w-full justify-center">
              <LiquidGlass />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Badges */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Education", value: "NEU Main" },
              { label: "Specialty", value: "Web Dev" },
              { label: "Location", value: "Quezon City" },
              { label: "Role", value: "Fullstack" }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center md:text-left hover:bg-zinc-800/80 transition-colors">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</div>
                <div className="text-xl font-medium text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Image Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden group h-[300px] lg:h-auto lg:min-h-[400px] flex items-center justify-center">
              <img 
                src="/Profile Portfolio.jpg" 
                alt="John Lian Nerecina"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors z-20"></div>
            </div>
            
            {/* Content Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-12 flex flex-col justify-center">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 text-center lg:text-left">About Me</h2>
              <p className="text-base lg:text-lg text-zinc-400 mb-6 leading-relaxed font-light">
                Currently pursuing my degree at New Era University, I am deeply invested in the ever-evolving landscape of software development. 
                My journey began with a curiosity for how systems work, which quickly turned into a passion for creating impactful applications.
              </p>
              <p className="text-base lg:text-lg text-zinc-400 mb-8 leading-relaxed font-light">
                I believe in clean code, continuous learning, and the power of technology to solve real-world problems. 
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-zinc-300">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Education</div>
                    <div className="text-xs text-zinc-500 font-mono">BSCS, NEU</div>
                  </div>
                </div>
                <div className="flex items-center text-zinc-300">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Status</div>
                    <div className="text-xs text-zinc-500 font-mono">Internships</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 inline-block relative">
              Skills & Expertise
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                className="h-1 bg-blue-500 mx-auto mt-2 rounded-full"
              />
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSkill * (100 / itemsPerViewSkill)}%)` }}
              >
                {skillGroups.map((group, i) => (
                  <div key={i} className="w-full lg:w-1/2 flex-shrink-0 px-2 lg:px-4">
                    <motion.div 
                      className="bg-zinc-950/40 backdrop-blur-md border border-zinc-800/50 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group h-full"
                    >
                      <div className="flex items-center space-x-3 mb-8 justify-center">
                        {group.icon}
                        <h3 className="text-xl font-bold tracking-tight text-center">{group.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
                        {group.skills.map((skill, j) => (
                          <motion.div 
                            key={j}
                            whileHover={{ scale: 1.05 }}
                            className="w-full relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center group/skill hover:bg-zinc-800 transition-colors h-32 max-w-[150px]"
                          >
                            {(() => {
                              let width = "w-[50%]";
                              let color = "bg-zinc-600";
                              let levelText = skill.level || "Neutral";
                              if (skill.level === "Beginner") { width = "w-[33%]"; color = "bg-zinc-400"; }
                              else if (skill.level === "Intermediate") { width = "w-[66%]"; color = "bg-blue-400"; }
                              else if (skill.level === "Advanced") { width = "w-[100%]"; color = "bg-green-400"; }
                              
                              return (
                                <div className="absolute top-3 right-3 group/tooltip cursor-help" title={levelText}>
                                  <div className={`w-2 h-2 rounded-full ${color} opacity-70 group-hover/skill:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,255,255,0.1)]`} style={{ boxShadow: `0 0 8px var(--tw-shadow-color)`}} />
                                </div>
                              );
                            })()}
                            {skill.src ? (
                              <img src={skill.src} alt={skill.name} className="w-10 h-10 mb-3 object-contain group-hover/skill:scale-110 transition-transform" />
                            ) : (
                              <div className="w-10 h-10 mb-3 flex items-center justify-center bg-zinc-800/50 text-white rounded-xl font-bold group-hover/skill:scale-110 transition-transform border border-zinc-700/50">
                                 <span className="text-xl">{skill.name.charAt(0)}</span>
                              </div>
                            )}
                            <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter group-hover/skill:text-zinc-300 transition-colors">
                              {skill.name}
                            </div>
                            {/* Subtle Progress Bar */}
                            <div className="w-16 h-0.5 bg-zinc-800 rounded-full mt-2 overflow-hidden opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                                {(() => {
                                  let width = "w-[50%]";
                                  let color = "bg-zinc-600";
                                  if (skill.level === "Beginner") { width = "w-[33%]"; color = "bg-zinc-400"; }
                                  else if (skill.level === "Intermediate") { width = "w-[66%]"; color = "bg-blue-400"; }
                                  else if (skill.level === "Advanced") { width = "w-[100%]"; color = "bg-green-400"; }
                                  return (
                                    <div className={`h-full ${width} ${color}`} />
                                  );
                                })()}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => setActiveSkill(s => s === 0 ? Math.max(0, skillGroups.length - itemsPerViewSkill) : s - 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Previous skill group"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: Math.max(1, skillGroups.length - itemsPerViewSkill + 1) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveSkill(i)}
                    aria-label={`Go to skill group ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === activeSkill ? 'bg-blue-500 w-8' : 'bg-zinc-700 w-2.5 hover:bg-zinc-500'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveSkill(s => (s + 1) > (skillGroups.length - itemsPerViewSkill) ? 0 : s + 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Next skill group"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 space-y-6 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Featured Projects</h2>
              <p className="text-zinc-400 max-w-xl text-lg lg:text-xl font-light">Impactful work and technical explorations.</p>
            </div>
            <a href="https://github.com/JLNerecina" target="_blank" rel="noreferrer" className="text-blue-500 font-medium flex items-center hover:text-white transition-colors text-sm">
              View all on GitHub <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeProject * (100 / itemsPerViewProject)}%)` }}
              >
                {projects.map((project, i) => (
                  <div key={i} className="w-full lg:w-1/2 flex-shrink-0 px-2 lg:px-4">
                    <motion.div 
                      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => setExpandedProject(project)}
                      className="group relative bg-[#121212] border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all h-full min-h-[420px] flex flex-col justify-between overflow-hidden mx-auto max-w-2xl cursor-pointer shadow-xl"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors">
                            <Code2 className="w-6 h-6" />
                          </div>
                          <div className="flex space-x-2 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-1"><Github className="w-5 h-5" /></a>}
                            {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-1"><ExternalLink className="w-5 h-5" /></a>}
                          </div>
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-white">{project.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                          {project.description}
                        </p>
                        {project.image && (
                          <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-video">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Abstract Bar */}
                      <div className="absolute bottom-0 left-8 right-8 h-1 bg-zinc-900 rounded-t-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-1/3 h-full bg-blue-500"></div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => setActiveProject(p => p === 0 ? Math.max(0, projects.length - itemsPerViewProject) : p - 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: Math.max(1, projects.length - itemsPerViewProject + 1) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveProject(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === activeProject ? 'bg-blue-500 w-8' : 'bg-zinc-700 w-2.5 hover:bg-zinc-500'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveProject(p => (p + 1) > (projects.length - itemsPerViewProject) ? 0 : p + 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-transparent text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-600/10 backdrop-blur-3xl rounded-3xl p-12 md:p-24 text-center relative overflow-hidden h-full border border-white/10 shadow-2xl shadow-blue-500/10">
            {/* Animated background highlights */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Ready to start a project?
              </h2>
              <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                I'm currently looking for new opportunities and collaborations. 
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a 
                  href="mailto:johnlian.nerecina@neu.edu.ph"
                  className="w-full md:w-auto px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white active:scale-95 transition-all text-base shadow-2xl shadow-white/10"
                >
                  Email Me Direct
                </a>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/john-lian-nerecina-042744286" 
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-110 active:scale-95 backdrop-blur-md group"
                  >
                    <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                  </a>
                  <a 
                    href="https://github.com/JLNerecina" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-110 active:scale-95 backdrop-blur-md group"
                  >
                    <Github className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">
          <div>&copy; 2024 John Lian Nerecina</div>
          <div className="hidden md:block">Designed for High Impact & Performance</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="https://github.com/JLNerecina" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setExpandedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-950 border border-zinc-800 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedProject(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {expandedProject.image && (
                <div className="w-full h-64 md:h-96 relative border-b border-zinc-800">
                  <img src={expandedProject.image} alt={expandedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                </div>
              )}

              <div className="p-8 md:p-12 relative z-10 -mt-16 md:-mt-24">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {expandedProject.github && (
                    <a href={expandedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white text-zinc-300 text-sm transition-colors">
                      <Github className="w-4 h-4 mr-2" /> Source Code
                    </a>
                  )}
                  {expandedProject.link && (
                    <a href={expandedProject.link} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500 text-white text-sm transition-colors shadow-lg shadow-blue-900/20">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  )}
                </div>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{expandedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {expandedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono tracking-widest uppercase text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-medium mb-4 text-white">Project Overview</h3>
                <p className="text-zinc-400 leading-relaxed text-lg font-light">
                  {expandedProject.longDescription || expandedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
