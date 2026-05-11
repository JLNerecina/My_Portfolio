import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Layers, 
  User, 
  BookOpen, 
  Briefcase,
  Terminal,
  Cpu,
  Globe,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Types
interface Project {
  title: string;
  description: string;
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
      tags: ["React", "UI/UX", "Database"],
      github: "https://github.com/JLNerecina/NEU-Library-Visitor-App",
      link: "https://remix-neu-library-visitor-app-230692279419.us-west1.run.app/",
      image: "/NEU Library Visitor App Preview 1.png"
    },
    {
      title: "NEU MOA Monitoring System",
      description: "Comprehensive monitoring dashboard for tracking Memorandum of Agreement (MOA) status, deadlines, partners, and compliance to streamline university partnerships.",
      tags: ["Dashboard", "Fullstack", "System"],
      github: "https://github.com/JLNerecina/NEU-MOA-Monitoring-System",
      link: "https://neu-moa-monitoring-system-230692279419.us-west1.run.app/",
      image: "/NEU MOA Monitoring System Preview.png"
    },
    {
      title: "More Projects Coming Soon",
      description: "Constantly building and experimenting with new technologies. Stay tuned for upcoming full-stack applications and open-source contributions.",
      tags: ["Coming Soon", "In Progress"],
      github: "https://github.com/JLNerecina",
    }
  ];

  const skills: Skill[] = [
    { name: "Frontend Development", icon: <Globe className="w-5 h-5" />, level: "Advanced" },
    { name: "Backend Systems", icon: <Terminal className="w-5 h-5" />, level: "Intermediate" },
    { name: "Database Design", icon: <Database className="w-5 h-5" />, level: "Intermediate" },
    { name: "Cloud Infrastructure", icon: <Cpu className="w-5 h-5" />, level: "Beginner" },
    { name: "System Architecture", icon: <Layers className="w-5 h-5" />, level: "Intermediate" },
    { name: "UI/UX Design", icon: <Code2 className="w-5 h-5" />, level: "Advanced" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md shadow-sm border-b border-white/10 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight text-white uppercase"
          >
            JLN.
          </motion.div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {['Home', 'About', 'Skills', 'Projects'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`transition-colors relative py-1 ${
                  activeSection === item.toLowerCase() ? 'text-blue-500' : 'hover:text-blue-500 text-zinc-500 font-mono uppercase tracking-widest text-[10px]'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </a>
            ))}
            <a 
              href="mailto:johnlian.nerecina@neu.edu.ph"
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-5 py-2 rounded-lg hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono uppercase tracking-widest"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest rounded-lg mb-6">
                Available for New Opportunities
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1] uppercase">
                John Lian <span className="text-blue-500 block italic">Nerecina</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl font-light">
                Designer, Web Developer, and Database Specialist. Current CS student at <span className="font-semibold text-white">New Era University</span>. 
                I turn complex ideas into responsive websites and robust applications, focusing on high-quality, user-centered solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://linkedin.com/in/john-lian-nerecina-042744286"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors group text-sm"
                >
                  <Linkedin className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
                <a 
                  href="#projects"
                  className="inline-flex items-center px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors shadow-sm text-sm"
                >
                  View My Work
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Badges */}
      <section className="py-12 bg-[#0a0a0a]">
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
      <section id="about" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-4 items-stretch">
            {/* Image Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden group min-h-[400px] flex items-center justify-center">
              <img 
                src="/6071405867900277108_121.jpg" 
                alt="John Lian Nerecina"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors z-20"></div>
            </div>
            
            {/* Content Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">About Me</h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed font-light">
                Currently pursuing my degree at New Era University, I am deeply invested in the ever-evolving landscape of software development. 
                My journey began with a curiosity for how systems work, which quickly turned into a passion for creating impactful applications.
              </p>
              <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-light">
                I believe in clean code, continuous learning, and the power of technology to solve real-world problems. 
                When I'm not coding, you can find me exploring new tech trends or collaborating on open-source projects.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-zinc-300">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Education</div>
                    <div className="text-xs text-zinc-500 font-mono">BSCS, New Era University</div>
                  </div>
                </div>
                <div className="flex items-center text-zinc-300">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Current Status</div>
                    <div className="text-xs text-zinc-500 font-mono">Available for Internships</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Technical Proficiency</h2>
            <p className="text-zinc-400 max-w-2xl text-xl font-light">A versatile toolkit developed through academic excellence and hands-on project experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-800/80 transition-all relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white mb-6 group-hover:bg-blue-600 transition-colors">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-medium mb-3 text-white">{skill.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{skill.level}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((dot) => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (skill.level === 'Advanced' ? 3 : 2) ? 'bg-blue-500' : 'bg-zinc-700'}`}></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Featured Projects</h2>
              <p className="text-zinc-400 max-w-xl text-xl font-light">Highlighting some of my most impactful work and technical explorations.</p>
            </div>
            <a href="https://github.com/JLNerecina" target="_blank" rel="noreferrer" className="text-blue-500 font-medium flex items-center hover:text-white transition-colors text-sm">
              View all on GitHub <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-[#121212] border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all h-full min-h-[320px] flex flex-col justify-between overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex space-x-2 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-600 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden h-full border border-blue-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Ready to start a project?</h2>
              <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                I'm currently looking for new opportunities and collaborations. 
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <a 
                  href="mailto:johnlian.nerecina@neu.edu.ph"
                  className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 active:scale-95 transition-all text-sm shadow-xl shadow-blue-900/20"
                >
                  Email Me Direct
                </a>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/in/john-lian-nerecina-042744286" className="p-4 bg-blue-700/50 rounded-full hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/JLNerecina" target="_blank" rel="noreferrer" className="p-4 bg-blue-700/50 rounded-full hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95">
                    <Github className="w-5 h-5" />
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
    </div>
  );
}
