import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  User, 
  BookOpen, 
  Briefcase,
  GraduationCap,
  Download,
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
  X,
  GitCommit,
  FileCode2,
  Star,
  Twitter,
  Heart,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { GitHubCalendar } from 'react-github-calendar';
import { GitHubStats } from './components/GitHubStats';

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

// --- LAZY IMAGE COMPONENT ---
const LazyImage = ({ src, alt, className, containerClassName }: { src: string; alt: string; className?: string; containerClassName?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className || ''} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      />
    </div>
  );
};

// Types
interface Article {
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
  link?: string;
}

interface LinkedInPost {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  link: string;
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  features?: string[];
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  stats?: {
    loc: string;
    commits: number;
    stars: number;
  };
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
  const [expandedArticle, setExpandedArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<{ [title: string]: { id: number; author: string; text: string; date: string; likes: number; isLiked: boolean }[] }>({});
  const [newComment, setNewComment] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const articlesRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollYProgress: articlesScrollProgress } = useScroll({
    target: articlesRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = ["All", "Frontend", "Fullstack", "Data Visualization"];

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
    const sections = ['home', 'about', 'timeline', 'skills', 'projects'];
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

  const milestones = [
    {
      year: "2023",
      title: "Senior High School Graduation",
      company: "Academic Milestone",
      description: "Completed Senior High School with a strong focus on Science, Technology, Engineering, and Mathematics (STEM), laying the foundation for computer science studies.",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      year: "2023",
      title: "Started BSCS at New Era University",
      company: "Higher Education",
      description: "Began Bachelor of Science in Computer Science, diving deep into software engineering, database management, and professional web development.",
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />
    },
    {
      year: "2025",
      title: "Specialized Project Development",
      company: "University Innovations",
      description: "Led the development of key university systems including the NEU Library Visitor App and the MOA Monitoring System, focusing on real-world impact.",
      icon: <Code2 className="w-5 h-5 text-indigo-400" />
    },
    {
      year: "2026",
      title: "Advanced KM Frameworks",
      company: "Curriculum Map Project",
      description: "Developed the CICS Curriculum Map System using D3.js, providing an advanced Knowledge Management framework for academic visualization.",
      icon: <LineChart className="w-5 h-5 text-purple-400" />
    },
    {
      year: "2026",
      title: "Fullstack Developer & Intern",
      company: "Ongoing Excellence",
      description: "Currently refining skills in AI orchestration and fullstack development while seeking impactful internship opportunities and collaborations.",
      icon: <Briefcase className="w-5 h-5 text-green-400" />
    }
  ];

  const projects: Project[] = [
    {
      title: "NEU Library Visitor App",
      description: "Modern web application for managing library visitor logs, tracking entries/exits, generating reports, and improving campus library operations with real-time updates.",
      longDescription: "A comprehensive visitor tracking and management system tailored for the New Era University Library. The system provides an intuitive interface for students and staff to log their visits securely. An admin dashboard helps librarians analyze visitor trends, manage resources better, and oversee library capacity in real-time. Built with a focus on seamless user experience, fast entry processing, and data security.",
      features: [
        "Real-time visitor log tracking",
        "Automated entry/exit processing",
        "Comprehensive report generation for librarians",
        "Responsive and intuitive management dashboard",
        "Secure student and staff authentication"
      ],
      tags: ["React", "UI/UX", "Database"],
      github: "https://github.com/JLNerecina/NEU-Library-Visitor-App",
      link: "https://remix-neu-library-visitor-app-230692279419.us-west1.run.app/",
      image: "/NEU Library Visitor App Preview 1.png",
      stats: { loc: "3.2k", commits: 24, stars: 0 }
    },
    {
      title: "NEU MOA Monitoring System",
      description: "Comprehensive monitoring dashboard for tracking Memorandum of Agreement (MOA) status, deadlines, partners, and compliance to streamline university partnerships.",
      longDescription: "A highly specialized monitoring dashboard designed for standardizing and tracking Memorandums of Agreement (MOA) for New Era University. This system digitizes the MOA lifecycle—from drafting to expiration checking. It features automated alerts that notify administrators before critical agreements lapse, ensuring legal compliance and improved inter-departmental visibility. It also provides a clear audit trail of all signed partnerships.",
      features: [
        "Digital MOA lifecycle management",
        "Automated expiration alerts and notifications",
        "Centralized partner database with compliance tracking",
        "Inter-departmental visibility and collaboration tools",
        "Detailed audit trails for legal integrity"
      ],
      tags: ["Dashboard", "Fullstack", "System"],
      github: "https://github.com/JLNerecina/NEU-MOA-Monitoring-System",
      link: "https://neu-moa-monitoring-system-230692279419.us-west1.run.app/",
      image: "/NEU MOA Monitoring System Preview.png",
      stats: { loc: "600+", commits: 12, stars: 0 }
    },
    {
      title: "CICS Curriculum Map System",
      description: "A Knowledge Management framework designed to visualize and track academic progress, prerequisites, and course relationships for students and admins.",
      longDescription: "An advanced Knowledge Management framework designed to dynamically visualize academic progress. Using D3.js, the framework provides an interactive node-based curriculum map, allowing students and administrators to deeply understand course relationships and prerequisites. It is instrumental in helping students identify bottlenecks in their path and make informed choices about their academic progression.",
      features: [
        "Interactive node-based curriculum visualization with D3.js",
        "Dynamic prerequisite relationship tracking",
        "Academic progress identification and bottleneck analysis",
        "Knowledge management framework for educational planning",
        "Seamless integration for students and academic admins"
      ],
      tags: ["KM Framework", "D3.js", "Education"],
      github: "https://github.com/JLNerecina/PE2-KM-Curriculum-Map",
      image: "/CICS Curriculum Map.png",
      stats: { loc: "4.2k", commits: 48, stars: 3 }
    },
    {
      title: "HOPE, Inc. Product Management System",
      description: "A comprehensive product management system for HOPE, Inc., streamlining inventory, sales, and data tracking processes.",
      longDescription: "A scalable, comprehensive product management system specifically developed for HOPE, Inc. to streamline their inventory, sales tracking, and operational processes. Built on a modern tech stack (React & Tailwind on the frontend), this application empowers operations staff to accurately monitor stock levels, manage detailed product lifecycles, and generate insightful business reports. It features robust role-based access control and high-performance data processing.",
      features: [
        "Scalable inventory and stock level monitoring",
        "Real-time sales tracking and product lifecycle management",
        "Insightful business report generation",
        "Robust role-based access control (RBAC)",
        "High-performance frontend and backend integration"
      ],
      tags: ["Fullstack", "Management System", "Tailwind"],
      github: "https://github.com/fausturnacht/SE2-Zendata-HopePMS",
      image: "/PMS Dashboard.png",
      stats: { loc: "10.6k", commits: 115, stars: 3 }
    }
  ];

  const filteredProjects = filterCategory === "All" 
    ? projects 
    : projects.filter(p => {
        const cat = filterCategory.toLowerCase();
        const pTags = p.tags.map(t => t.toLowerCase());
        if (cat === "frontend") return pTags.some(t => t.includes("react") || t.includes("tailwind") || t.includes("ui"));
        if (cat === "fullstack") return pTags.some(t => t.includes("fullstack") || t.includes("database") || t.includes("system"));
        if (cat === "data visualization") return pTags.some(t => t.includes("d3") || t.includes("km"));
        return pTags.includes(cat);
      });

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

  const linkedInPosts: LinkedInPost[] = [
    {
      id: "1",
      author: "John Lian Nerecina",
      role: "Fullstack Developer",
      date: "Recently",
      content: "I'm thrilled to share my newly updated interactive portfolio! It features 3D hover effects, smooth Framer Motion page transitions, and dynamically integrates with the GitHub API to showcase my activity. Built using React, Vite, and Tailwind CSS. Feel free to explore my work and let me know your thoughts!",
      link: "https://www.linkedin.com/in/john-lian-nerecina-042744286"
    },
    {
      id: "2",
      author: "John Lian Nerecina",
      role: "Fullstack Developer",
      date: "1 month ago",
      content: "Just wrapped up a deep dive into building performant user interfaces with D3.js and React. Creating scalable, data-driven applications is incredibly rewarding. Check out my latest article on how I integrate these technologies for smooth data visualization.",
      link: "https://www.linkedin.com/in/john-lian-nerecina-042744286"
    }
  ];

  const articles: Article[] = [
    {
      title: "Building Modern React Portfolios",
      excerpt: "A deep dive into crafting 3D tilt effects, parallax scrolling, and optimizing glassmorphism interfaces in modern React 18+.",
      content: "When building a modern portfolio, performance and visual impact go hand-in-hand. By leveraging React 18's concurrent features, alongside Framer Motion for buttery-smooth animations, we can craft experiences that feel alive. \n\nWe extensively use `react-parallax-tilt` to give depth to cards, making the user interface tactile and interactive. Combining this with CSS backdrop filters allows for beautiful glassmorphism that perfectly meshes with dark, cosmic themes.",
      date: "May 25, 2026",
      readTime: "5 min read",
      tags: ["React", "UI/UX", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Understanding Vite's Fast HMR",
      excerpt: "How Vite achieves its incredibly fast Hot Module Replacement by leveraging native ES modules in the browser.",
      content: "Traditional bundlers like Webpack build the entire application before serving it, which leads to slow startup times and delayed Hot Module Replacement (HMR) as project size grows. Vite fundamentally changes this paradigm.\n\nBy leveraging native ES modules in the browser, Vite serves source code directly and only transforms files as they are requested. This means HMR updates are virtually instantaneous regardless of application size, providing an unparalleled developer experience.",
      date: "Apr 12, 2026",
      readTime: "7 min read",
      tags: ["Vite", "Build Tools", "Performance"],
      link: "#"
    },
    {
      title: "The Art of Data Visualization with D3.js",
      excerpt: "Bridging the gap between raw data and meaningful insights using powerful SVG manipulations and data joining.",
      content: "Data visualization is more than just drawing charts; it's about telling a compelling story with data. D3.js (Data-Driven Documents) provides the low-level primitives necessary to bind arbitrary data to exactly crafted DOM representations.\n\nIn my recent projects, wrapping D3 up in React components allowed me to seamlessly combine React's declarative rendering with D3's sophisticated math and scaling utilities, resulting in interactive maps and deep hierarchical data visualizations.",
      date: "Mar 10, 2026",
      readTime: "6 min read",
      tags: ["D3.js", "Data Visualization", "JavaScript"],
      link: "#"
    }
  ];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !expandedArticle) return;
    
    const comment = {
      id: Date.now(),
      author: "Guest User",
      text: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      isLiked: false
    };
    
    setComments(prev => ({
      ...prev,
      [expandedArticle.title]: [...(prev[expandedArticle.title] || []), comment]
    }));
    
    setNewComment("");
  };

  const handleToggleLike = (articleTitle: string, commentId: number) => {
    setComments(prev => {
      const articleComments = prev[articleTitle] || [];
      return {
        ...prev,
        [articleTitle]: articleComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            };
          }
          return comment;
        })
      };
    });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden moving-gradient text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 40%)` 
        }}
      />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 origin-left z-[100]"
      />
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
            <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white/90 hidden sm:block">Online Portfolio</span>
          </motion.div>
          
          {/* Main Navigation - Integrated horizontally on Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center pointer-events-auto mx-4">
            <ul className="glass-nav-container !rounded-full py-1.5 px-3">
              {[
                { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
                { id: 'timeline', label: 'Journey', icon: <LineChart className="w-4 h-4" /> },
                { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
                { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
                { id: 'articles', label: 'Articles', icon: <BookOpen className="w-4 h-4" /> },
              ].map((item) => (
                <li 
                  key={item.id} 
                  className={`glass-nav-item-wrapper ${activeSection === item.id ? 'active' : ''}`}
                >
                  <a 
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className="glass-nav-item !h-[45px] lg:!w-[70px] xl:!w-[80px]"
                  >
                    <div className="glass-nav-content">
                      <span className="glass-nav-text text-[11px] xl:text-xs">{item.label}</span>
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
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-widest shadow-xl ml-auto lg:ml-0"
          >
            Get in Touch
          </a>
        </div>
        
        {/* Mobile Navbar sticking to bottom */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] lg:hidden flex justify-center pointer-events-auto">
          <ul className="glass-nav-container w-full justify-around !rounded-2xl">
            {[
              { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
              { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
              { id: 'timeline', label: 'Journey', icon: <LineChart className="w-5 h-5" /> },
              { id: 'skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
              { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
              { id: 'articles', label: 'Articles', icon: <BookOpen className="w-5 h-5" /> },
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
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="bg-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden group h-[300px] lg:h-auto lg:min-h-[400px] flex items-center justify-center">
              <LazyImage 
                src="/Profile Portfolio.jpg" 
                alt="John Lian Nerecina"
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors z-20"></div>
            </Tilt>
            
            {/* Content Box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-12 flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 text-center lg:text-left"
              >
                About Me
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base lg:text-lg text-zinc-400 mb-6 leading-relaxed font-light"
              >
                Currently pursuing my degree at New Era University, I am deeply invested in the ever-evolving landscape of software development. 
                My journey began with a curiosity for how systems work, which quickly turned into a passion for creating impactful applications.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base lg:text-lg text-zinc-400 mb-8 leading-relaxed font-light"
              >
                I believe in clean code, continuous learning, and the power of technology to solve real-world problems. 
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center text-zinc-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Education</div>
                    <div className="text-xs text-zinc-500 font-mono">BSCS, NEU</div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center text-zinc-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Status</div>
                    <div className="text-xs text-zinc-500 font-mono">Internships</div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-10"
              >
                <a 
                  href="/John_Lian_Nerecina_Resume.pdf" 
                  download="John_Lian_Nerecina_Resume.pdf"
                  className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20 group"
                >
                  <Download className="w-5 h-5 mr-3 group-hover:-translate-y-1 group-hover:animate-bounce transition-transform" />
                  Download Resume
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="py-24 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 relative">
             <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">My Journey</h2>
             <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Timeline & Milestones</h3>
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 100 }}
               className="h-1 bg-blue-500 mx-auto mt-6 rounded-full"
             />
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[21px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/50 via-zinc-800 to-zinc-950/20 md:hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                  className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 z-10">
                    <div className="w-11 h-11 bg-[#0a0a0a] border-2 border-zinc-800 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="group bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all hover:bg-zinc-900/60 shadow-xl overflow-hidden relative">
                      {/* Background Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-zinc-800/80 rounded-xl text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all">
                          {milestone.icon}
                        </div>
                        <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">{milestone.year}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-1 text-white group-hover:text-blue-100 transition-colors">{milestone.title}</h4>
                      <p className="text-blue-500/80 font-medium text-xs mb-4">{milestone.company}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Spacer for MD screens to keep alignment center if using flex-col on small */}
                  <div className="md:w-1/2 md:block hidden"></div>
                </motion.div>
              ))}
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

      {/* GitHub Section */}
      <section id="github" className="py-16 lg:py-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col mb-12 text-center md:text-left">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">GitHub Contributions</h2>
            <p className="text-zinc-400 max-w-xl text-lg lg:text-xl font-light">Consistency and Passion for Coding</p>
          </div>
          
          {/* GitHub Overview and Top Languages Metric Cards */}
          <GitHubStats />

          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2500} className="w-full">
            <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-8 flex justify-center items-center overflow-hidden shadow-xl max-w-full">
              <div className="overflow-x-auto w-full flex justify-center py-4 scrollbar-hide">
                <div className="min-w-max">
                  <GitHubCalendar 
                    username="JLNerecina" 
                    colorScheme="dark"
                    blockSize={14}
                    blockMargin={5}
                    fontSize={14}
                    theme={{
                      dark: ['#1e1e1e', '#0e4429', '#006d32', '#26a641', '#39d353']
                    }}
                  />
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 space-y-6 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Featured Projects</h2>
              <p className="text-zinc-400 max-w-xl text-lg lg:text-xl font-light mb-6">Impactful work and technical explorations.</p>
              
              {/* Project Filters */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilterCategory(cat);
                      setActiveProject(0);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      filterCategory === cat
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <a href="https://github.com/JLNerecina" target="_blank" rel="noreferrer" className="text-blue-500 font-medium flex items-center hover:text-white transition-colors text-sm">
              View all on GitHub <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out py-8"
                style={{ transform: `translateX(-${activeProject * (100 / itemsPerViewProject)}%)` }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div 
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="w-full lg:w-1/2 flex-shrink-0 px-2 lg:px-4"
                    >
                      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="h-full">
                        <div 
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
                        
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, tagIdx) => (
                              <span key={tagIdx} className="px-2.5 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-xs font-medium text-zinc-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {project.stats && (
                          <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default group/stat">
                              <FileCode2 className="w-5 h-5 text-zinc-500 group-hover/stat:text-blue-400 mb-2 transition-colors" />
                              <span className="text-sm font-medium text-zinc-300 group-hover/stat:text-blue-100 transition-colors">{project.stats.loc}</span>
                              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 group-hover/stat:text-blue-400/70">LOC</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-default group/stat">
                              <GitCommit className="w-5 h-5 text-zinc-500 group-hover/stat:text-emerald-400 mb-2 transition-colors" />
                              <span className="text-sm font-medium text-zinc-300 group-hover/stat:text-emerald-100 transition-colors">{project.stats.commits}</span>
                              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 group-hover/stat:text-emerald-400/70">Commits</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:border-amber-500/50 hover:bg-amber-500/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 transition-all cursor-default group/stat">
                              <Star className="w-5 h-5 text-zinc-500 group-hover/stat:text-amber-400 mb-2 transition-colors" />
                              <span className="text-sm font-medium text-zinc-300 group-hover/stat:text-amber-100 transition-colors">{project.stats.stars}</span>
                              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 group-hover/stat:text-amber-400/70">Stars</span>
                            </div>
                          </div>
                        )}

                        {project.image && (
                          <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-video">
                            <LazyImage 
                              src={project.image} 
                              alt={project.title}
                              containerClassName="w-full h-full"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                        </div>
                      </Tilt>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={() => setActiveProject(p => p === 0 ? Math.max(0, filteredProjects.length - itemsPerViewProject) : p - 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: Math.max(1, filteredProjects.length - itemsPerViewProject + 1) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveProject(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === activeProject ? 'bg-blue-500 w-8' : 'bg-zinc-700 w-2.5 hover:bg-zinc-500'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveProject(p => (p + 1) > (filteredProjects.length - itemsPerViewProject) ? 0 : p + 1)}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles / Tech Blog Section */}
      <section id="articles" ref={articlesRef} className="py-16 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative h-full">
          
          {/* Sticky/Fixed-style progress pill for the section */}
          <div className="sticky top-24 z-50 flex justify-end w-full h-0 pointer-events-none mb-12 lg:mb-0">
             <div className="pointer-events-auto flex items-center gap-4 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 px-5 py-2.5 rounded-full shadow-lg -mt-16 lg:mt-0 lg:-translate-y-3">
               <div className="flex items-center gap-2">
                 <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                 <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">Feed Progress</span>
               </div>
               <div className="w-24 md:w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                 <motion.div 
                   style={{ scaleX: articlesScrollProgress, transformOrigin: 'left' }}
                   className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                 />
               </div>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 relative z-20 pointer-events-none">
            <div className="flex flex-col pointer-events-auto">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Tech Blog</h2>
              <p className="text-zinc-400 max-w-xl text-lg lg:text-xl font-light">Insights, tutorials, and development logs.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2000} className="h-full">
                  <div 
                    onClick={() => setExpandedArticle(article)}
                    className="cursor-pointer flex flex-col h-full bg-[#121212]/80 border border-zinc-800/80 rounded-3xl p-8 hover:border-zinc-700/60 shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-widest uppercase">
                        {article.tags[0]}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-zinc-800/60 mt-auto">
                      <span className="text-xs font-mono text-zinc-500">{article.date}</span>
                      <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Featured Posts Section */}
      <section id="linkedin-posts" className="py-16 lg:py-24 bg-black/40 backdrop-blur-sm relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn Activity
              </h2>
              <p className="text-zinc-400 max-w-xl text-lg lg:text-xl font-light">
                Professional updates, milestones, and development insights.
              </p>
            </div>
            <a 
              href="https://www.linkedin.com/in/john-lian-nerecina-042744286" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center px-6 py-2.5 bg-[#0a66c2]/10 border border-[#0a66c2]/30 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-[#0a66c2]/30"
            >
              View Full Profile <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {linkedInPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} className="h-full">
                  <div className="bg-[#121212]/80 border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 hover:border-[#0a66c2]/40 shadow-xl hover:shadow-[#0a66c2]/5 transition-all flex flex-col h-full group duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <img src="/My Logo - JLN.png" alt={post.author} className="w-12 h-12 rounded-full object-contain bg-black/60 p-1 border border-zinc-700/50" />
                        <div>
                          <h4 className="text-white font-semibold flex items-center leading-tight">
                            {post.author}
                            <span className="w-1 h-1 bg-zinc-600 rounded-full mx-2 hidden sm:block"></span>
                            <span className="text-[10px] text-zinc-500 font-normal hidden sm:block">1st</span>
                          </h4>
                          <p className="text-xs text-zinc-400 font-light mt-0.5">{post.role}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">{post.date}</p>
                        </div>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    </div>

                    <div className="text-zinc-300 font-light text-sm leading-relaxed mb-8 flex-grow whitespace-pre-line group-hover:text-white transition-colors">
                      {post.content}
                    </div>

                    <div className="mt-auto pt-4 border-t border-zinc-800/60">
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl text-sm font-semibold hover:bg-[#0a66c2] hover:text-white transition-all gap-2 duration-300 hover:border-transparent hover:shadow-lg hover:shadow-[#0a66c2]/20"
                      >
                        View Post on LinkedIn
                      </a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
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
              <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                I'm currently looking for new opportunities and collaborations. 
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>
              
              <div className="max-w-lg mx-auto bg-black/40 p-8 rounded-3xl border border-white/5 mb-8 backdrop-blur-md">
                <form className="flex flex-col gap-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    <input type="email" placeholder="Your Email" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  <textarea placeholder="Your Message" rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                  <button type="button" onClick={() => window.location.href='mailto:johnlian.nerecina@neu.edu.ph'} className="mt-2 w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 hover:text-white active:scale-95 transition-all text-sm shadow-xl shadow-blue-500/10">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex justify-center items-center gap-4">
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
                <div className="w-full h-[300px] md:h-[450px] relative">
                  <LazyImage 
                    src={expandedProject.image} 
                    alt={expandedProject.title} 
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-[#0a0a0a]/40 to-transparent"></div>
                </div>
              )}

              <div className="px-8 pb-12 md:px-12 md:pb-16 relative z-10 -mt-20">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                  <div className="flex-1">
                     <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">{expandedProject.title}</h2>
                     <div className="flex flex-wrap gap-2">
                        {expandedProject.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-mono tracking-widest uppercase text-blue-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {expandedProject.github && (
                      <a href={expandedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-white text-zinc-300 text-sm transition-all hover:scale-105 active:scale-95 shadow-xl">
                        <Github className="w-4 h-4 mr-2" /> Source
                      </a>
                    )}
                    {expandedProject.link && (
                      <a href={expandedProject.link} target="_blank" rel="noreferrer" className="inline-flex items-center px-5 py-2.5 bg-blue-600 rounded-full hover:bg-blue-500 text-white text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/40">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <section>
                      <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
                        <div className="w-8 h-px bg-zinc-800 mr-3"></div>
                        Project Overview
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-lg font-light">
                        {expandedProject.longDescription}
                      </p>
                    </section>

                    {expandedProject.features && (
                      <section>
                        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6 flex items-center">
                          <div className="w-8 h-px bg-zinc-800 mr-3"></div>
                          Key Features
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {expandedProject.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl group/feat hover:border-blue-500/30 transition-colors">
                              <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 mt-0.5 group-hover/feat:bg-blue-500/20 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              </div>
                              <span className="text-sm text-zinc-400 group-hover/feat:text-zinc-300 transition-colors font-light leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>

                  <div className="space-y-8">
                    {expandedProject.stats && (
                      <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm">
                        <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Project Stats</h4>
                        <div className="flex flex-col gap-4">
                           <div className="flex items-center justify-between text-zinc-300">
                             <div className="flex items-center gap-2">
                               <FileCode2 className="w-4 h-4 text-zinc-500" />
                               <span className="text-sm">Lines of Code</span>
                             </div>
                             <span className="text-sm font-mono">{expandedProject.stats.loc}</span>
                           </div>
                           <div className="flex items-center justify-between text-zinc-300">
                             <div className="flex items-center gap-2">
                               <GitCommit className="w-4 h-4 text-zinc-500" />
                               <span className="text-sm">Commits</span>
                             </div>
                             <span className="text-sm font-mono">{expandedProject.stats.commits}</span>
                           </div>
                           <div className="flex items-center justify-between text-zinc-300">
                             <div className="flex items-center gap-2">
                               <Star className="w-4 h-4 text-zinc-500" />
                               <span className="text-sm">Stars</span>
                             </div>
                             <span className="text-sm font-mono">{expandedProject.stats.stars}</span>
                           </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm">
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {expandedProject.tags.map((tag) => (
                          <div key={tag} className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/30 rounded-xl text-[10px] text-zinc-400 font-medium">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
                      <h4 className="text-xs font-mono text-blue-500/70 uppercase tracking-widest mb-3 text-center">Ready to explore?</h4>
                      <div className="flex flex-col gap-3">
                         {expandedProject.link && (
                           <a href={expandedProject.link} target="_blank" rel="noreferrer" className="w-full py-3 bg-blue-600 text-white rounded-2xl text-center text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                             Launch App
                           </a>
                         )}
                         {expandedProject.github && (
                           <a href={expandedProject.github} target="_blank" rel="noreferrer" className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl text-center text-sm font-semibold hover:bg-zinc-800 transition-colors">
                             View Repository
                           </a>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {expandedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setExpandedArticle(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-950 border border-zinc-800 rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedArticle(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12 relative z-10 pt-16">
                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <span>{expandedArticle.date}</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {expandedArticle.readTime}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                    {expandedArticle.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {expandedArticle.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-mono tracking-widest uppercase text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full h-px bg-zinc-800/80 mb-10"></div>
                
                <article className="prose prose-invert prose-zinc max-w-none text-zinc-300 font-light leading-loose">
                  {expandedArticle.content?.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6">{paragraph}</p>
                  ))}
                </article>

                {/* Social Share */}
                <div className="flex items-center gap-4 pt-10 mt-10 border-t border-zinc-800/80">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Share Article</span>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(expandedArticle.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-blue-400 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-blue-500/20"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(expandedArticle.title)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-blue-600/20"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                {/* Comments Section */}
                <div className="pt-10 mt-10 border-t border-zinc-800/80">
                  <h3 className="text-xl font-bold tracking-tight text-white mb-6">Comments</h3>
                  
                  <div className="space-y-6 mb-8">
                    {comments[expandedArticle.title]?.length > 0 ? (
                      comments[expandedArticle.title].map((comment) => (
                        <div key={comment.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-zinc-300">{comment.author}</span>
                            <span className="text-xs font-mono text-zinc-500">{comment.date}</span>
                          </div>
                          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">{comment.text}</p>
                          <div className="flex items-center gap-2 mt-4">
                            <button
                              onClick={() => handleToggleLike(expandedArticle.title, comment.id)}
                              className="group flex items-center gap-1.5 focus:outline-none"
                            >
                              <div className="relative flex items-center justify-center p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
                                <Heart 
                                  className={`w-4 h-4 transition-all duration-300 ${comment.isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-zinc-500 group-hover:text-red-400'}`} 
                                />
                                <AnimatePresence>
                                  {comment.isLiked && (
                                    <motion.div
                                      initial={{ scale: 0.5, opacity: 1 }}
                                      animate={{ scale: 1.5, opacity: 0 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.4 }}
                                      className="absolute inset-0 bg-red-500 rounded-full z-0"
                                    />
                                  )}
                                </AnimatePresence>
                              </div>
                              <span className={`text-xs font-mono transition-colors ${comment.isLiked ? 'text-red-500' : 'text-zinc-500'}`}>
                                {comment.likes > 0 ? comment.likes : 'Like'}
                              </span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-500 font-light italic">No comments yet. Be the first to share your thoughts!</p>
                    )}
                  </div>

                  <form onSubmit={handleAddComment} className="flex flex-col gap-4">
                    <textarea 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Leave a comment..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 font-light focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none h-24"
                    />
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="self-end px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-900/20"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
