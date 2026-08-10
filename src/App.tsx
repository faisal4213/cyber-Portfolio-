import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, ArrowUpRight } from 'lucide-react';
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* --- SMOOTH SCROLL HELPER --- */
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

/* --- CUSTOM MOUSE POINTER --- */
function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      setIsHovered(!!target?.closest('a, button, [role="button"], .group'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00A884] rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
          scale: isHovered ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#00A884]/60 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "#00A884" : "rgba(0, 168, 132, 0.4)",
          backgroundColor: isHovered ? "rgba(0, 168, 132, 0.08)" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}

export default function App() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const initEngine = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <ParticlesProvider init={initEngine}>
      <CustomCursor />
      <AppContent backgroundY={backgroundY} containerRef={containerRef} />
    </ParticlesProvider>
  );
}

function AppContent({ backgroundY, containerRef }: { backgroundY: any, containerRef: any }) {
  const { loaded } = useParticlesProvider();
  
  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-background text-foreground overflow-clip selection:bg-[#00A884]/30 selection:text-[#00A884]">
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {loaded && (
          <Particles
            id="tsparticles"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "grab" },
                },
                modes: {
                  grab: { distance: 140, links: { opacity: 0.5 } },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "rgba(0, 168, 132, 0.4)",
                  distance: 170,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 0.7,
                  straight: false,
                },
                number: {
                  density: { enable: true },
                  value: 100,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-background pointer-events-none" />
      </motion.div>

        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </div>
      </div>
    );
  }

  /* --- NAVIGATION BAR --- */
  function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 40);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500 flex justify-between items-center ${
          scrolled 
            ? 'py-4 bg-background/70 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')} 
          className="flex items-center gap-1 text-2xl font-black tracking-tighter text-white hover:text-[#00A884] transition-colors"
        >
          F<Lock className="w-4 h-4 text-[#00A884] inline-block" />J
        </a>
        
        <div className="hidden md:flex gap-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#00A884] transition-colors">About</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-[#00A884] transition-colors">Work</a>
          <a href="#certifications" onClick={(e) => handleNavClick(e, '#certifications')} className="hover:text-[#00A884] transition-colors">Certifications</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#00A884] transition-colors">Contact</a>
        </div>
      </motion.nav>
    );
  }

/* --- HERO SECTION --- */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.85], [1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section ref={ref} className="h-screen flex items-center justify-center px-6 relative overflow-hidden text-center z-0 pt-16">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-4xl w-full flex flex-col items-center pointer-events-none"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.span variants={itemVariants} className="text-xs font-mono tracking-[0.25em] text-[#00A884] uppercase mb-4">
            CYBERSECURITY ENGINEER
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-black tracking-tight mb-6 text-white uppercase">
            I BUILD. I BREAK. I SECURE.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground font-mono max-w-2xl mx-auto mb-10 leading-relaxed">
            Focused on threat detection, security operations, penetration testing, and building secure systems.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex gap-4 pointer-events-auto">
            <a 
              href="#projects" 
              onClick={(e) => handleNavClick(e, '#projects')}
              className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-[#00A884] hover:text-[#00A884] transition-all rounded-full bg-black/40 backdrop-blur-sm"
            >
              VIEW MY WORK
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-[#00A884] hover:text-[#00A884] transition-all rounded-full bg-black/40 backdrop-blur-sm"
            >
              GET IN TOUCH
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --- ABOUT SECTION --- */
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={ref} className="min-h-screen flex flex-col justify-center px-6 py-28 relative bg-card z-20 border-y border-border">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-12">
          <span>01</span>
          <span className="w-8 h-px bg-[#00A884]/40" />
          <span>About</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div style={{ y: y1 }} className="md:col-span-7 space-y-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
                Mohammed Faisal Jahangir
              </h2>
              <p className="text-xs md:text-sm font-mono text-[#00A884] tracking-wide">
                Cybersecurity Engineer &nbsp;|&nbsp; Security Operations &nbsp;|&nbsp; Offensive Security
              </p>
            </div>

            <p className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed">
              I am a Computer Science graduate currently pursuing an M.S. in Cybersecurity at King Fahd University of Petroleum & Minerals (KFUPM). As a security professional focused on Security Operations and Detection Engineering, my work sits at the intersection of defensive and offensive security—spanning threat detection, incident investigation, log analysis, network security, and vulnerability assessment.
            </p>

            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 border-b border-border pb-2">
                Education
              </h3>
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <div>
                    <span className="text-white font-semibold block">M.S. Cybersecurity</span>
                    <span className="text-muted-foreground text-xs">King Fahd University of Petroleum & Minerals (KFUPM)</span>
                  </div>
                  <span className="text-[#00A884] text-xs font-mono">Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <div>
                    <span className="text-white font-semibold block">B.Tech Computer Science</span>
                    <span className="text-muted-foreground text-xs">Lords Institute of Engineering and Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-5 space-y-8 md:pl-6 md:border-l border-border/60">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00A884] mb-6">
                Technical Focus & Expertise
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-b border-border/40 pb-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
                  SECURITY OPERATIONS
                </h4>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  Threat detection, SIEM monitoring, log analysis, incident investigation
                </p>
              </div>

              <div className="border-b border-border/40 pb-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
                  OFFENSIVE SECURITY
                </h4>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  VAPT, penetration testing, web security, reconnaissance
                </p>
              </div>

              <div className="border-b border-border/40 pb-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
                  NETWORK SECURITY
                </h4>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  TCP/IP, DNS, packet analysis, Wireshark, network investigation
                </p>
              </div>

              <div className="border-b border-border/40 pb-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
                  SECURITY ENGINEERING
                </h4>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  Detection engineering, Windows telemetry, Sysmon, MITRE ATT&CK
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- SELECTED WORK SECTION --- */
const GITHUB_REPO_BASE = "https://github.com/faisal4213/Home-SOC-Lab";

interface Metric {
  value: string;
  label: string;
}

interface Project {
  number: string;
  title: string;
  category: string;
  technologies: string;
  description: string;
  metrics: Metric[];
  ctaLabel: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "HOME SOC ENVIRONMENT",
    category: "Home SOC Lab",
    technologies: "Splunk · Windows Server · Active Directory · Sysmon · Kali Linux",
    description: "Built a Windows-based SOC environment to simulate enterprise security monitoring, endpoint telemetry, threat detection, and incident investigation.",
    metrics: [
      { value: "1,918", label: "Failed auth attempts investigated" },
      { value: "12+", label: "MITRE ATT&CK-aligned detections" },
      { value: "361K+", label: "Network packets analyzed" }
    ],
    ctaLabel: "VIEW GITHUB REPOSITORY ↗",
    link: "https://github.com/faisal4213/Home-SOC-Lab"
  },
  {
    number: "02",
    title: "VPN BRUTE-FORCE INVESTIGATION",
    category: "Incident Analysis",
    technologies: "Splunk · SPL · Threat Detection · MITRE ATT&CK",
    description: "Investigated anomalous VPN authentication activity, identifying 1,918 failed login attempts followed by successful authentication and confirming an account takeover.",
    metrics: [
      { value: "1,918", label: "Failed login attempts" },
      { value: "7", label: "Successful logins" },
      { value: "T1110", label: "MITRE ATT&CK — Brute Force" }
    ],
    ctaLabel: "VIEW CASE STUDY ↗",
    link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/VPN-Brute-Force-Simon.md"
  },
  {
    number: "03",
    title: "MALWARE PCAP ANALYSIS",
    category: "Network Forensics",
    technologies: "Wireshark · Network Forensics · IOC Analysis",
    description: "Analyzed real-world malicious network traffic to identify reconnaissance, botnet activity, exploitation attempts, and indicators of compromise.",
    metrics: [
      { value: "361,992", label: "Packets analyzed" },
      { value: "Mozi", label: "Botnet indicators identified" },
      { value: "CVE-2021-41773", label: "Apache exploitation attempt" }
    ],
    ctaLabel: "VIEW CASE STUDY ↗",
    link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/Mozi-Botnet-Detection.md"
  },
  {
    number: "04",
    title: "IMPOSSIBLE TRAVEL / ACCOUNT COMPROMISE",
    category: "Threat Hunting",
    technologies: "Splunk · Log Analysis · Threat Hunting · MITRE ATT&CK",
    description: "Investigated VPN authentication logs to identify geographically impossible activity and determine whether an account had been compromised.",
    metrics: [
      { value: "2,862", label: "VPN events analyzed" },
      { value: "ENGLAND + CHINA", label: "Impossible travel activity" },
      { value: "T1078", label: "MITRE ATT&CK — Valid Accounts" }
    ],
    ctaLabel: "VIEW CASE STUDY ↗",
    link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/Impossible-Travel-Penny.md"
  }
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
          <span>02</span>
          <span className="w-8 h-px bg-[#00A884]/40" />
          <span>Case Studies</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20">Selected Work</h2>
        
        <div className="space-y-24">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div 
      ref={ref} 
      className="border border-border/80 bg-card/60 backdrop-blur-sm p-8 md:p-12 rounded-lg relative overflow-hidden group hover:border-[#00A884]/60 transition-colors duration-500"
    >
      <motion.div style={{ y: textY }} className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#00A884] mb-2 uppercase tracking-widest">
              <span>PROJECT {project.number}</span>
              <span className="w-4 h-px bg-border" />
              <span>{project.category}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">
              {project.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground/80 md:text-right max-w-xs">
            {project.technologies}
          </span>
        </div>

        <p className="text-sm md:text-base font-mono text-muted-foreground leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-y border-border/40">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-[#00A884] hover:text-white transition-colors border-b border-[#00A884]/40 pb-1"
          >
            {project.ctaLabel} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/* --- CERTIFICATIONS SECTION --- */
function CertificationsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const listY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const certifications = [
    { title: "TOP 20 CRITICAL WEB APPLICATION VULNERABILITY", issuer: "Craw Security", date: "Feb 2026", skills: [] },
    { title: "PENETRATION TESTING", issuer: "Craw Security", date: "Jan 2026", skills: [] },
    { title: "ETHICAL HACKING", issuer: "Craw Security", date: "Jan 2026", skills: [] },
    { title: "pathway-aoc-2025-kra8blxfpajw0vn6 Certificate", issuer: "TryHackMe", date: "Jan 2026", id: "THM-OT5REBWCQZ", skills: [] },
    { title: "IN-DEPTH ADVANCED NETWORKING CERTIFICATION", issuer: "Craw Security", date: "Dec 2025", id: "CRAWEN-68278373", skills: ["Network Security", "Networking"] },
    { title: "Networking Basics", issuer: "Cisco Networking Academy", date: "Oct 2025", skills: [] },
    { title: "Deloitte- Cyber Job Simulation", issuer: "Forage", date: "Oct 2025", id: "BwWAuYe5hudJYgPYz", skills: [] },
    { title: "Introduction to Programming Using Python", issuer: "Craw Security", date: "Oct 2025", id: "CRAWEN-68278373", skills: ["Python"] },
    { title: "Linux Essentials Certification", issuer: "Craw Security", date: "Sep 2025", id: "CRAWEN-68278373", skills: ["Linux", "Red Hat Linux"] },
    { title: "Tools of the Trade: Linux and SQL", issuer: "Google", date: "May 2024", skills: ["Linux", "SQL"] },
    { title: "Connect and Protect: Networks and Network Security", issuer: "Google", date: "May 2024", skills: ["Network Security"] },
    { title: "Play It Safe: Manage Security Risks", issuer: "Google", date: "Apr 2024", skills: ["Risk Management"] },
    { title: "Foundation of Cybersecurity", issuer: "Google", date: "Apr 2024", skills: ["Foundation cyber security"] }
  ];

    return (
      <section id="certifications" className="py-32 px-6 bg-card z-20 relative border-t border-border">
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
              <span>03</span>
              <span className="w-8 h-px bg-[#00A884]/40" />
              <span>Credentials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter sticky top-32">
              Certifications<br />& Honors
            </h2>
          </div>
          <motion.div ref={ref} style={{ y: listY }} className="md:w-2/3 space-y-4">
            {certifications.map((cert, i) => (
              <div 
                key={i} 
                className="group border-b border-border/80 p-4 -mx-4 rounded-md flex flex-col items-start gap-3 hover:border-[#00A884] hover:bg-[#00A884]/[0.04] hover:translate-x-2 transition-all duration-300 ease-out"
              >
                <div className="flex justify-between items-end w-full">
                  <div className="pr-4">
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-[#00A884] transition-colors duration-300">{cert.title}</h3>
                    <p className="text-muted-foreground font-mono text-xs mt-1">{cert.issuer}</p>
                  </div>
                  <div className="text-muted-foreground font-mono text-xs whitespace-nowrap text-right group-hover:text-white transition-colors duration-300">
                    {cert.date}
                  </div>
                </div>
                
                {(cert.id || cert.skills.length > 0) && (
                  <div className="flex flex-col md:flex-row gap-x-6 gap-y-1 text-xs text-muted-foreground/80 font-mono">
                    {cert.id && <span>ID: {cert.id}</span>}
                    {cert.skills.length > 0 && <span>Skills: {cert.skills.join(", ")}</span>}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  /* --- CONTACT SECTION --- */
  function ContactSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

    return (
      <footer id="contact" ref={ref} className="min-h-[70vh] bg-transparent border-t border-border flex flex-col justify-center px-6 relative overflow-hidden py-20">
        <motion.div style={{ y }} className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
            <span>04</span>
            <span className="w-8 h-px bg-[#00A884]/40" />
            <span>Contact</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Let's Talk
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground font-mono max-w-lg mb-10">
            Open for infrastructure security audits, SOC operations, and threat analysis roles. Connect if you want to discuss detection engineering or security architecture.
          </p>

          <a 
            href="mailto:faisaljahangir2003@gmail.com"
            className="text-xl md:text-3xl font-mono text-[#00A884] border-b-2 border-transparent hover:border-[#00A884] transition-all duration-300 mb-12"
          >
            faisaljahangir2003
          </a>

          <div className="flex gap-6">
    <a
      href="https://github.com/faisal4213"
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
    >
      GH
    </a>

    <a
      href="https://www.linkedin.com/in/mohammed-faisal-jahangir/"
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
    >
      IN
    </a>

    <a
      href="https://x.com/faisal_jah8775"
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
    >
      X
    </a>
  </div>
        </motion.div>
      </footer>
    );
  }










// import React, { useRef, useEffect, useState } from 'react';
// import { motion, useScroll, useTransform, MotionValue, Variants } from 'framer-motion';
// import { Lock, ArrowUpRight } from 'lucide-react';

// /* --- SMOOTH SCROLL HELPER --- */
// const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//   if (href.startsWith("#")) {
//     e.preventDefault();
//     if (href === "#") {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return;
//     }
//     const targetElement = document.querySelector(href);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   }
// };

// /* --- NATIVE CANVAS PARTICLE BACKGROUND --- */
// /* --- INTERACTIVE CANVAS PARTICLE BACKGROUND --- */
// function ParticleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     // Track mouse coordinates globally
//     const mouse = {
//       x: -1000,
//       y: -1000,
//       radius: 180 // Connection & interaction distance
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//     };

//     const handleMouseLeave = () => {
//       mouse.x = -1000;
//       mouse.y = -1000;
//     };

//     const handleResize = () => {
//       if (!canvas) return;
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseleave', handleMouseLeave);

//     const particles = Array.from({ length: 90 }, () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       vx: (Math.random() - 0.5) * 0.6,
//       vy: (Math.random() - 0.5) * 0.6,
//       radius: Math.random() * 1.8 + 1,
//     }));

//     const render = () => {
//       ctx.clearRect(0, 0, width, height);

//       for (let i = 0; i < particles.length; i++) {
//         const p = particles[i];
//         p.x += p.vx;
//         p.y += p.vy;

//         // Bounce off canvas edges
//         if (p.x < 0 || p.x > width) p.vx *= -1;
//         if (p.y < 0 || p.y > height) p.vy *= -1;

//         // Draw particle dot
//         ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         ctx.fill();

//         // 1. CONNECT DOTS TO MOUSE CURSOR
//         const dxMouse = p.x - mouse.x;
//         const dyMouse = p.y - mouse.y;
//         const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

//         if (distMouse < mouse.radius) {
//           const alpha = 1 - distMouse / mouse.radius;
//           ctx.beginPath();
//           ctx.moveTo(p.x, p.y);
//           ctx.lineTo(mouse.x, mouse.y);
//           ctx.strokeStyle = `rgba(0, 168, 132, ${alpha * 0.75})`; // Accent green line to cursor
//           ctx.lineWidth = 1.2;
//           ctx.stroke();

//           // Subtle interactive repulsion effect
//           const force = (mouse.radius - distMouse) / mouse.radius;
//           const angle = Math.atan2(dyMouse, dxMouse);
//           p.x += Math.cos(angle) * force * 1.2;
//           p.y += Math.sin(angle) * force * 1.2;
//         }

//         // 2. CONNECT DOTS TO OTHER NEARBY DOTS
//         for (let j = i + 1; j < particles.length; j++) {
//           const p2 = particles[j];
//           const dx = p.x - p2.x;
//           const dy = p.y - p2.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 120) {
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})`;
//             ctx.lineWidth = 0.8;
//             ctx.stroke();
//           }
//         }
//       }

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseleave', handleMouseLeave);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
// }

// /* --- CUSTOM MOUSE POINTER --- */
// function CustomCursor() {
//   const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//       const target = e.target as HTMLElement | null;
//       setIsHovered(!!target?.closest('a, button, [role="button"], .group'));
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00A884] rounded-full pointer-events-none z-[9999] hidden md:block"
//         animate={{
//           x: mousePos.x - 5,
//           y: mousePos.y - 5,
//           scale: isHovered ? 2 : 1,
//         }}
//         transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.1 }}
//       />
//       <motion.div
//         className="fixed top-0 left-0 w-8 h-8 border border-[#00A884]/60 rounded-full pointer-events-none z-[9998] hidden md:block"
//         animate={{
//           x: mousePos.x - 16,
//           y: mousePos.y - 16,
//           scale: isHovered ? 1.6 : 1,
//           borderColor: isHovered ? "#00A884" : "rgba(0, 168, 132, 0.4)",
//           backgroundColor: isHovered ? "rgba(0, 168, 132, 0.08)" : "transparent"
//         }}
//         transition={{ type: "spring", stiffness: 300, damping: 25 }}
//       />
//     </>
//   );
// }

// /* --- MAIN APP COMPONENT --- */
// export default function App() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

//   return (
//     <>
//       <CustomCursor />
//       <AppContent backgroundY={backgroundY} containerRef={containerRef} />
//     </>
//   );
// }

// /* --- APP CONTENT WRAPPER --- */
// interface AppContentProps {
//   backgroundY: MotionValue<string>;
//   containerRef: React.RefObject<HTMLDivElement | null>;
// }

// function AppContent({ backgroundY, containerRef }: AppContentProps) {
//   return (
//     <div 
//       ref={containerRef} 
//       className="relative min-h-[400vh] bg-background text-foreground overflow-clip selection:bg-[#00A884]/30 selection:text-[#00A884]"
//     >
//       <motion.div 
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{ y: backgroundY }}
//       >
//         <ParticleBackground />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-background pointer-events-none" />
//       </motion.div>

//       <div className="relative z-10">
//         <Navbar />
//         <HeroSection />
//         <AboutSection />
//         <ProjectsSection />
//         <CertificationsSection />
//         <ContactSection />
//       </div>
//     </div>
//   );
// }

// /* --- NAVIGATION BAR --- */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//       className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500 flex justify-between items-center ${
//         scrolled 
//           ? 'py-4 bg-background/70 backdrop-blur-md border-b border-white/10 shadow-lg' 
//           : 'py-6 bg-transparent border-b border-transparent'
//       }`}
//     >
//       <a 
//         href="#" 
//         onClick={(e) => handleNavClick(e, '#')} 
//         className="flex items-center gap-1 text-2xl font-black tracking-tighter text-white hover:text-[#00A884] transition-colors"
//       >
//         F<Lock className="w-4 h-4 text-[#00A884] inline-block" />J
//       </a>
      
//       <div className="hidden md:flex gap-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
//         <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#00A884] transition-colors">About</a>
//         <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-[#00A884] transition-colors">Work</a>
//         <a href="#certifications" onClick={(e) => handleNavClick(e, '#certifications')} className="hover:text-[#00A884] transition-colors">Certifications</a>
//         <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#00A884] transition-colors">Contact</a>
//       </div>
//     </motion.nav>
//   );
// }

// /* --- HERO SECTION --- */
// function HeroSection() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"]
//   });
  
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.85], [1, 1, 0]);

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
//   };

//   return (
//     <section ref={ref} className="h-screen flex items-center justify-center px-6 relative overflow-hidden text-center z-0 pt-16">
//       <motion.div 
//         style={{ y, opacity }}
//         className="max-w-4xl w-full flex flex-col items-center pointer-events-none"
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//           className="flex flex-col items-center"
//         >
//           <motion.span variants={itemVariants} className="text-xs font-mono tracking-[0.25em] text-[#00A884] uppercase mb-4">
//             CYBERSECURITY ENGINEER
//           </motion.span>
          
//           <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-black tracking-tight mb-6 text-white uppercase">
//             I BUILD. I BREAK. I SECURE.
//           </motion.h1>

//           <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground font-mono max-w-2xl mx-auto mb-10 leading-relaxed">
//             Focused on threat detection, security operations, penetration testing, and building secure systems.
//           </motion.p>
          
//           <motion.div variants={itemVariants} className="flex gap-4 pointer-events-auto">
//             <a 
//               href="#projects" 
//               onClick={(e) => handleNavClick(e, '#projects')}
//               className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-[#00A884] hover:text-[#00A884] transition-all rounded-full bg-black/40 backdrop-blur-sm"
//             >
//               VIEW MY WORK
//             </a>
//             <a 
//               href="#contact" 
//               onClick={(e) => handleNavClick(e, '#contact')}
//               className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:border-[#00A884] hover:text-[#00A884] transition-all rounded-full bg-black/40 backdrop-blur-sm"
//             >
//               GET IN TOUCH
//             </a>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

// /* --- ABOUT SECTION --- */
// function AboutSection() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
//   const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

//   return (
//     <section id="about" ref={ref} className="min-h-screen flex flex-col justify-center px-6 py-28 relative bg-card z-20 border-y border-border">
//       <div className="max-w-6xl w-full mx-auto">
//         <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-12">
//           <span>01</span>
//           <span className="w-8 h-px bg-[#00A884]/40" />
//           <span>About</span>
//         </div>

//         <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
//           <motion.div style={{ y: y1 }} className="md:col-span-7 space-y-10">
//             <div>
//               <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
//                 Mohammed Faisal Jahangir
//               </h2>
//               <p className="text-xs md:text-sm font-mono text-[#00A884] tracking-wide">
//                 Cybersecurity Engineer &nbsp;|&nbsp; Security Operations &nbsp;|&nbsp; Offensive Security
//               </p>
//             </div>

//             <p className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed">
//               I am a Computer Science graduate currently pursuing an M.S. in Cybersecurity at King Fahd University of Petroleum & Minerals (KFUPM). As a security professional focused on Security Operations and Detection Engineering, my work sits at the intersection of defensive and offensive security—spanning threat detection, incident investigation, log analysis, network security, and vulnerability assessment.
//             </p>

//             <div className="pt-4 space-y-3">
//               <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 border-b border-border pb-2">
//                 Education
//               </h3>
//               <div className="space-y-4 font-mono text-xs md:text-sm">
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
//                   <div>
//                     <span className="text-white font-semibold block">M.S. Cybersecurity</span>
//                     <span className="text-muted-foreground text-xs">King Fahd University of Petroleum & Minerals (KFUPM)</span>
//                   </div>
//                   <span className="text-[#00A884] text-xs font-mono">Present</span>
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
//                   <div>
//                     <span className="text-white font-semibold block">B.Tech Computer Science</span>
//                     <span className="text-muted-foreground text-xs">Lords Institute of Engineering and Technology</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div style={{ y: y2 }} className="md:col-span-5 space-y-8 md:pl-6 md:border-l border-border/60">
//             <div>
//               <h3 className="text-xs font-mono uppercase tracking-widest text-[#00A884] mb-6">
//                 Technical Focus & Expertise
//               </h3>
//             </div>

//             <div className="space-y-6">
//               <div className="border-b border-border/40 pb-5">
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
//                   SECURITY OPERATIONS
//                 </h4>
//                 <p className="text-xs font-mono text-muted-foreground leading-relaxed">
//                   Threat detection, SIEM monitoring, log analysis, incident investigation
//                 </p>
//               </div>

//               <div className="border-b border-border/40 pb-5">
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
//                   OFFENSIVE SECURITY
//                 </h4>
//                 <p className="text-xs font-mono text-muted-foreground leading-relaxed">
//                   VAPT, penetration testing, web security, reconnaissance
//                 </p>
//               </div>

//               <div className="border-b border-border/40 pb-5">
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
//                   NETWORK SECURITY
//                 </h4>
//                 <p className="text-xs font-mono text-muted-foreground leading-relaxed">
//                   TCP/IP, DNS, packet analysis, Wireshark, network investigation
//                 </p>
//               </div>

//               <div className="border-b border-border/40 pb-5">
//                 <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-2">
//                   SECURITY ENGINEERING
//                 </h4>
//                 <p className="text-xs font-mono text-muted-foreground leading-relaxed">
//                   Detection engineering, Windows telemetry, Sysmon, MITRE ATT&CK
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* --- SELECTED WORK SECTION --- */
// interface Metric {
//   value: string;
//   label: string;
// }

// interface Project {
//   number: string;
//   title: string;
//   category: string;
//   technologies: string;
//   description: string;
//   metrics: Metric[];
//   ctaLabel: string;
//   link: string;
// }

// const PROJECTS: Project[] = [
//   {
//     number: "01",
//     title: "HOME SOC ENVIRONMENT",
//     category: "Home SOC Lab",
//     technologies: "Splunk · Windows Server · Active Directory · Sysmon · Kali Linux",
//     description: "Built a Windows-based SOC environment to simulate enterprise security monitoring, endpoint telemetry, threat detection, and incident investigation.",
//     metrics: [
//       { value: "1,918", label: "Failed auth attempts investigated" },
//       { value: "12+", label: "MITRE ATT&CK-aligned detections" },
//       { value: "361K+", label: "Network packets analyzed" }
//     ],
//     ctaLabel: "VIEW GITHUB REPOSITORY ↗",
//     link: "https://github.com/faisal4213/Home-SOC-Lab"
//   },
//   {
//     number: "02",
//     title: "VPN BRUTE-FORCE INVESTIGATION",
//     category: "Incident Analysis",
//     technologies: "Splunk · SPL · Threat Detection · MITRE ATT&CK",
//     description: "Investigated anomalous VPN authentication activity, identifying 1,918 failed login attempts followed by successful authentication and confirming an account takeover.",
//     metrics: [
//       { value: "1,918", label: "Failed login attempts" },
//       { value: "7", label: "Successful logins" },
//       { value: "T1110", label: "MITRE ATT&CK — Brute Force" }
//     ],
//     ctaLabel: "VIEW CASE STUDY ↗",
//     link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/VPN-Brute-Force-Simon.md"
//   },
//   {
//     number: "03",
//     title: "MALWARE PCAP ANALYSIS",
//     category: "Network Forensics",
//     technologies: "Wireshark · Network Forensics · IOC Analysis",
//     description: "Analyzed real-world malicious network traffic to identify reconnaissance, botnet activity, exploitation attempts, and indicators of compromise.",
//     metrics: [
//       { value: "361,992", label: "Packets analyzed" },
//       { value: "Mozi", label: "Botnet indicators identified" },
//       { value: "CVE-2021-41773", label: "Apache exploitation attempt" }
//     ],
//     ctaLabel: "VIEW CASE STUDY ↗",
//     link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/Mozi-Botnet-Detection.md"
//   },
//   {
//     number: "04",
//     title: "IMPOSSIBLE TRAVEL / ACCOUNT COMPROMISE",
//     category: "Threat Hunting",
//     technologies: "Splunk · Log Analysis · Threat Hunting · MITRE ATT&CK",
//     description: "Investigated VPN authentication logs to identify geographically impossible activity and determine whether an account had been compromised.",
//     metrics: [
//       { value: "2,862", label: "VPN events analyzed" },
//       { value: "ENGLAND + CHINA", label: "Impossible travel activity" },
//       { value: "T1078", label: "MITRE ATT&CK — Valid Accounts" }
//     ],
//     ctaLabel: "VIEW CASE STUDY ↗",
//     link: "https://github.com/faisal4213/Home-SOC-Lab/blob/main/Investigations/Impossible-Travel-Penny.md"
//   }
// ];

// function ProjectsSection() {
//   return (
//     <section id="projects" className="py-32 px-6">
//       <div className="max-w-5xl w-full mx-auto">
//         <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
//           <span>02</span>
//           <span className="w-8 h-px bg-[#00A884]/40" />
//           <span>Case Studies</span>
//         </div>
        
//         <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20">Selected Work</h2>
        
//         <div className="space-y-24">
//           {PROJECTS.map((project) => (
//             <ProjectCard key={project.number} project={project} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProjectCard({ project }: { project: Project }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

//   return (
//     <div 
//       ref={ref} 
//       className="border border-border/80 bg-card/60 backdrop-blur-sm p-8 md:p-12 rounded-lg relative overflow-hidden group hover:border-[#00A884]/60 transition-colors duration-500"
//     >
//       <motion.div style={{ y: textY }} className="flex flex-col gap-8">
//         <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-border/60 pb-6">
//           <div>
//             <div className="flex items-center gap-3 text-xs font-mono text-[#00A884] mb-2 uppercase tracking-widest">
//               <span>PROJECT {project.number}</span>
//               <span className="w-4 h-px bg-border" />
//               <span>{project.category}</span>
//             </div>
//             <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">
//               {project.title}
//             </h3>
//           </div>
//           <span className="text-xs font-mono text-muted-foreground/80 md:text-right max-w-xs">
//             {project.technologies}
//           </span>
//         </div>

//         <p className="text-sm md:text-base font-mono text-muted-foreground leading-relaxed max-w-3xl">
//           {project.description}
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-y border-border/40">
//           {project.metrics.map((metric, idx) => (
//             <div key={idx} className="flex flex-col">
//               <span className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight">
//                 {metric.value}
//               </span>
//               <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-1">
//                 {metric.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="pt-2">
//           <a 
//             href={project.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-[#00A884] hover:text-white transition-colors border-b border-[#00A884]/40 pb-1"
//           >
//             {project.ctaLabel} <ArrowUpRight className="w-4 h-4" />
//           </a>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* --- CERTIFICATIONS SECTION --- */
// interface Certification {
//   title: string;
//   issuer: string;
//   date: string;
//   id?: string;
//   skills: string[];
// }

// function CertificationsSection() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   const listY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

//   const certifications: Certification[] = [
//     { title: "TOP 20 CRITICAL WEB APPLICATION VULNERABILITY", issuer: "Craw Security", date: "Feb 2026", skills: [] },
//     { title: "PENETRATION TESTING", issuer: "Craw Security", date: "Jan 2026", skills: [] },
//     { title: "ETHICAL HACKING", issuer: "Craw Security", date: "Jan 2026", skills: [] },
//     { title: "Advent of Cyber 2025 Certificate", issuer: "TryHackMe", date: "Jan 2026", id: "THM-OT5REBWCQZ", skills: [] },
//     { title: "IN-DEPTH ADVANCED NETWORKING CERTIFICATION", issuer: "Craw Security", date: "Dec 2025", id: "CRAWEN-68278373", skills: ["Network Security", "Networking"] },
//     { title: "Networking Basics", issuer: "Cisco Networking Academy", date: "Oct 2025", skills: [] },
//     { title: "Deloitte- Cyber Job Simulation", issuer: "Forage", date: "Oct 2025", id: "BwWAuYe5hudJYgPYz", skills: [] },
//     { title: "Introduction to Programming Using Python", issuer: "Craw Security", date: "Oct 2025", id: "CRAWEN-68278373", skills: ["Python"] },
//     { title: "Linux Essentials Certification", issuer: "Craw Security", date: "Sep 2025", id: "CRAWEN-68278373", skills: ["Linux", "Red Hat Linux"] },
//     { title: "Tools of the Trade: Linux and SQL", issuer: "Google", date: "May 2024", skills: ["Linux", "SQL"] },
//     { title: "Connect and Protect: Networks and Network Security", issuer: "Google", date: "May 2024", skills: ["Network Security"] },
//     { title: "Play It Safe: Manage Security Risks", issuer: "Google", date: "Apr 2024", skills: ["Risk Management"] },
//     { title: "Foundation of Cybersecurity", issuer: "Google", date: "Apr 2024", skills: ["Foundation cyber security"] }
//   ];

//   return (
//     <section id="certifications" className="py-32 px-6 bg-card z-20 relative border-t border-border">
//       <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-16">
//         <div className="md:w-1/3">
//           <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
//             <span>03</span>
//             <span className="w-8 h-px bg-[#00A884]/40" />
//             <span>Credentials</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter sticky top-32">
//             Certifications<br />& Honors
//           </h2>
//         </div>
//         <motion.div ref={ref} style={{ y: listY }} className="md:w-2/3 space-y-4">
//           {certifications.map((cert, i) => (
//             <div 
//               key={i} 
//               className="group border-b border-border/80 p-4 -mx-4 rounded-md flex flex-col items-start gap-3 hover:border-[#00A884] hover:bg-[#00A884]/[0.04] hover:translate-x-2 transition-all duration-300 ease-out"
//             >
//               <div className="flex justify-between items-end w-full">
//                 <div className="pr-4">
//                   <h3 className="text-lg md:text-xl font-bold group-hover:text-[#00A884] transition-colors duration-300">{cert.title}</h3>
//                   <p className="text-muted-foreground font-mono text-xs mt-1">{cert.issuer}</p>
//                 </div>
//                 <div className="text-muted-foreground font-mono text-xs whitespace-nowrap text-right group-hover:text-white transition-colors duration-300">
//                   {cert.date}
//                 </div>
//               </div>
              
//               {(cert.id || cert.skills.length > 0) && (
//                 <div className="flex flex-col md:flex-row gap-x-6 gap-y-1 text-xs text-muted-foreground/80 font-mono">
//                   {cert.id && <span>ID: {cert.id}</span>}
//                   {cert.skills.length > 0 && <span>Skills: {cert.skills.join(", ")}</span>}
//                 </div>
//               )}
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* --- CONTACT SECTION --- */
// function ContactSection() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end end"]
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

//   return (
//     <footer id="contact" ref={ref} className="min-h-[70vh] bg-transparent border-t border-border flex flex-col justify-center px-6 relative overflow-hidden py-20">
//       <motion.div style={{ y }} className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
//         <div className="flex items-center gap-2 text-xs font-mono text-[#00A884] uppercase tracking-widest mb-4">
//           <span>04</span>
//           <span className="w-8 h-px bg-[#00A884]/40" />
//           <span>Contact</span>
//         </div>
        
//         <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
//           Let's Talk
//         </h2>
        
//         <p className="text-base md:text-lg text-muted-foreground font-mono max-w-lg mb-10">
//           Open for infrastructure security audits, SOC operations, and threat analysis roles. Connect if you want to discuss detection engineering or security architecture.
//         </p>

//         <a 
//           href="mailto:faisaljahangir2003@gmail.com"
//           className="text-xl md:text-3xl font-mono text-[#00A884] border-b-2 border-transparent hover:border-[#00A884] transition-all duration-300 mb-12"
//         >
//           faisaljahangir2003@gmail.com
//         </a>

//         <div className="flex gap-6">
//           <a
//             href="https://github.com/faisal4213"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
//           >
//             GH
//           </a>

//           <a
//             href="https://www.linkedin.com/in/mohammed-faisal-jahangir/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
//           >
//             IN
//           </a>

//           <a
//             href="https://x.com/faisal_jah8775"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 border border-border hover:border-[#00A884] hover:text-[#00A884] hover:scale-105 transition-all duration-300 rounded-full font-bold uppercase text-xs"
//           >
//             X
//           </a>
//         </div>
//       </motion.div>
//     </footer>
//   );
// }