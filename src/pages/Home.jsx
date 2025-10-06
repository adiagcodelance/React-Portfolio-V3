import React, { useEffect, useState } from "react";
import "./Home.css";
import Experience from "../components/Experience";
import MediaThumbnails from "../components/MediaThumbnails";
import { api } from "../utils/api";

export default function Home() {
  // Fallback data in case API fails
  const fallbackJobs = [
    { company: "DeepHealth", title: "Software Engineer", dates: "Jun 2024 – Present",
      logo: "/dh_logo.png", media: [],
      bullets: ["Added additonal functionality to existing Build process and scripts.", 
        "Developed new features and solved bugs in existing RIS application requested by clients.",
        "Developed a Python based GUI to allow easy use of Build scripts, increasing number of developers capable of starting builds with limited training.",
        "Documented build process in detail to streamline training and process management and development.",
        "Designed development architecture for ScriptSender source code, allowing easy maintenace and development of ancillary services used with RIS."], 
        tags: ["C#", "SQL", "Java", "Python", "React", "Visual Studio", "Visual Studio Code"] },
    { company: "Sunly Energy", title: "Data Analyst & IT Assistant", dates: "May 2023 – Jun 2024",
      logo: "Sunly_Yellow-01 (2).png", media: [],
      bullets: ["Managed for tech onboarding/offboarding, hardware/software setup, and provided IT support for headquarters and remote franchise operations.",
        "Responsible of tech procurement of both hardware and software to ensure seamless operations.",
        "Continuous Salesforce.com data administration, handling mass data uploads and deletions to maintain data integrity.",
        "Hardware/software troubleshooting and maintenance for 30+ employees including setup of hardware and software.",
        "New Salesforce automations to expand on new applcations process related to franchise business partners.",
        "Created reports and automations for data-driven analyses as a part of business intelligence reporting to support operations and management.",
        "Supported the development APIs (Application Programming Interface) to facilitate data integration between the solar design SAAS (Software as A Service) and Salesforce.com, streamlining processes related to solar application, design, and invoicing.",
        "Collaborated with a marketing agency to enhancement of website design, focusing on improvement of user experience, SEO (Search Engine Optimization), development and deployment of new pages for increased online visibility."
    ], tags: ["HTML5", "CSS", "React", "SquareSpace", "Salesforce.com", "OpenSolar", "Postman", "IT"] },
    { company:"The Spice Store Inc.", title: "Operations Associate", dates: "Nov 2018 - Jun 2024",
      logo: "/the spice store final.jpg", media: [],
        bullets: ["Managed salesfloor operations, procurement, logistics, pricing, merchandising, and reporting.",
            "Provided IT setup for hardware and POS software (RetailMagic) setup and support, ensuring the smooth integration and functionality of technology in day-to-day operations.",
            "Initiated development of a website for the company.",
            "Conducted staff training on essential processes (work manual), policies, and customer service standards to maintain a consistent level of service excellence.",
            "Managed B2B sales operations, order taking, procurement, delivery, implementing pricing strategies, invoicing, and account receivables."
        ],
        tags: ["IT", "Sales", "Stocking", "RetailMagic"]
    }
  ];

  const fallbackProjects = [
    { name: "Folio", desc: "IOS App, built to allow cross functionality between built in calendar tool and a notes system for clear organization.",
         tags: ["Swift", "Xcode", "Apple"], gh: "https://github.com/adiagcodelance/Folio", ext: "https://github.com/adiagcodelance/Folio" },
    { name: "University Capstone - Telling Stories", desc: "Goal was to develop a web service that allowed our client the ability to create a unique educational H5P content that could be pushed to mediums such as Pressbooks and Moodle.",
         tags: ["HTML5", "JSX", "React", "H5P", "Visual Studio"], gh: "https://github.com/adiagcodelance/CS-4820-Telling-Stories", ext: "https://github.com/adiagcodelance/CS-4820-Telling-Stories" },
    { name: "App Development Project - Assignment Planner App", desc: "Assignment planner was an app developed with the goal of providing students a dedicated planner app with tools to help plan their academic assignments.",
         tags: ["Flutter", "Java", "Android", "Android Studio"], gh: "https://github.com/adiagcodelance/Assignment-Planner-", ext: "https://github.com/adiagcodelance/Assignment-Planner-" },
  ];

  const fallbackCertifications = [
    { logo: "/datacamp.png", media: [], name: "Artifical Intelligence (AI)", desc: "Being able to identify the uses cases for different sub-domains of AI. Being able to explain Generative AI and common terminology of the domain. Being able to construct simple prompts for generative AI tools and being able to explain the ethical considerations that apply to AI and generative AI solutions.", tags: ["AI", "AI Architecture", "Machine Learning", "Generative AI"], ext: "https://www.datacamp.com/skill-verification/AIF0028742102106" },
    { logo: "/datacamp.png", media: [], name: "SQL Associate", desc: "At the associate level, data management tasks relate mostly to data cleaning and processing. This includes identifying data quality issues, performing transformations and being able to work with data from multiple sources, typically multiple database tables. For the large part, these tasks are performed in SQL. This skill was tested through a hands-on SQL coding challenge. The individual was required to code specific cleaning and transformation tasks that can be applied to a given data source. This candidate was comfortable in calculatings metrics to effectively report characteristics of data and relationships between features using PostgreSQL. This skill was primarily tested through a hands-on SQL coding challenge.", tags: ["SQL", "MySQL", "PostegreSQL", "Database Management"], ext: "https://www.datacamp.com/certificate/SQA0013747867975" },
    { logo: "", media: [], name: "Canon Beginner Photography Course", desc: "Completed Canon's online beginner photography course covering fundamentals of photography including exposure, composition, and camera settings.", tags: ["Photography", "Camera Settings", "Composition"], ext: "#" },
    { logo: "", media: [], name: "Microsoft Office Suite", desc: "Completed Microsoft Office Suite training covering Word, Excel, PowerPoint, and Outlook.", tags: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Outlook"], ext: "#" },
  ];

  // State for API data
  const [jobs, setJobs] = useState(fallbackJobs);
  const [otherProjects, setOtherProjects] = useState(fallbackProjects);
  const [certifications, setCertifications] = useState(fallbackCertifications);
  const [loading, setLoading] = useState(false);
  const [usingFallbackData, setUsingFallbackData] = useState(true);

  // Try to load data from API, but keep fallback data if it fails
  useEffect(() => {
    const loadData = async () => {
      try {
        const [experienceData, projectsData, certificationsData] = await Promise.all([
          api.getExperiences(),
          api.getProjects(),
          api.getCertifications(),
        ]);
        
        // Check if we got valid data from all endpoints
        const hasValidExperience = experienceData && Array.isArray(experienceData) && experienceData.length > 0;
        const hasValidProjects = projectsData && Array.isArray(projectsData) && projectsData.length > 0;
        const hasValidCertifications = certificationsData && Array.isArray(certificationsData) && certificationsData.length > 0;
        
        if (hasValidExperience && hasValidProjects && hasValidCertifications) {
          // All data is valid, update everything and mark as using API data
          setJobs(experienceData.map(exp => ({
            ...exp,
            media: exp.media || []
          })));
          setOtherProjects(projectsData.map(project => ({
            name: project.name,
            desc: project.description,
            tags: project.tags || [],
            gh: project.githubUrl,
            ext: project.externalUrl
          })));
          setCertifications(certificationsData.map(cert => ({
            logo: cert.logo || '',
            media: cert.media || [],
            name: cert.name,
            desc: cert.description,
            tags: cert.tags || [],
            ext: cert.externalUrl
          })));
          setUsingFallbackData(false);
        } else {
          setUsingFallbackData(true);
        }
      } catch (error) {
        console.error('API failed, using fallback data:', error);
        setUsingFallbackData(true);
        // Keep the fallback data that was set in useState
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Active left-nav + reveals + scroll progress
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const links = Array.from(document.querySelectorAll(".breadcrumb-nav a"));
    const linkFor = id => links.find(a => a.getAttribute("href") === `#${id}`);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => linkFor(e.target.id)?.classList.toggle("active", e.isIntersecting));
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

    const rev = new IntersectionObserver((ents) => {
      ents.forEach(e => e.target.classList.toggle("reveal-in", e.isIntersecting));
    }, { threshold: 0.12 });

    sections.forEach(s => { io.observe(s); rev.observe(s); });
    return () => { io.disconnect(); rev.disconnect(); };
  }, []);

  useEffect(() => {
    const bar = document.getElementById("scrollbar");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Show loading state while fetching data
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Inter, ui-sans-serif, system-ui',
        color: 'var(--text-body)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-soft)',
            borderTop: '3px solid var(--accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      {/* Subtle Data Status Chip */}
      {usingFallbackData && (
        <div aria-label="Using cached data"
          style={{
            position: 'fixed',
            top: 10,
            left: 10,
            background: 'rgba(255,193,7,0.15)', // subtle warning
            border: '1px solid #ffd27a',
            color: '#8a6d3b',
            padding: '6px 10px',
            fontSize: '12px',
            borderRadius: 8,
            zIndex: 1000,
          }}>
          Using cached data • <a href="/admin" style={{ color: '#8a6d3b', fontWeight: 600 }}>login</a> to update
        </div>
      )}

      {/* remove test panel */}
      
      {/* scroll progress */}
      <div id="scrollbar" />
      {/* sticky left nav */}
      <nav className="breadcrumb-nav" aria-label="Section navigation">
         <div className="hero-wrap">
    <div>
        {/* Ghibli icon above name */}
      <img
        src="/adi_g.png"   // <-- change to your icon path if different
        alt="Aditya avatar"
        className="hero-icon"
      />
      <h3 className="hero-name">Aditya Agrawal</h3>

      <div className="hero-role">Software Engineer</div>
      <div>
        <p>Create, Collaborate and Learn. These are the 3 principles that define me.</p>
      </div>
    </div>
    </div>
        <ul>
          <li><a href="#about"><span className="idx"></span> About</a></li>
          <li><a href="#experience"><span className="idx"></span> Experience</a></li>
          <li><a href="#more-projects"><span className="idx"></span> Projects</a></li>
          <li><a href="#certificates"><span className="idx"></span> Certifications</a></li>
          <li><a href="#contact"><span className="idx"></span> Contact</a></li>
        </ul>
      </nav>

      {/* main content */}
      <main className="content">
        {/* HERO */}


{/* ABOUT */}
<section className="card about" id="about" data-reveal>
  <div className="section-title">
          <h2 className="heading"><span className="idx"></span> About</h2>
  </div>
  <div className="body">
    <p>
      As a Computer Science graduate and tech enthusiast, I thrive in environments that encourage challenge, growth, 
        and continuous learning. With a mindset rooted in “Never give up” and “Make a difference,
        ” I bring persistence, creativity, and a user-first perspective to every project I take on. 
        
        Outside of my current role, I’ve consistently introduced systems, processes, and integrations that have transformed 
        how teams work, whether through automating business intelligence pipelines, enhancing Salesforce integrations, 
        or co-leading redesigns that elevated usability and SEO.
        At my core, I’m motivated by the challenge of solving complex problems, the joy of continuous learning, 
        and the impact of building technology that empowers people.
    </p>
    <p className="hero-blurb">
        Currently, I’m a Software Engineer at DeepHealth, driving performance improvements, workflow automations, managing current build processes and pipeline
        and intuitive tooling that empower both engineers and end-users. I currently have a strong focus towards learning and specializing in AI, and I am working towards
        that through courses and projects.
     </p>
  </div>
</section>


        {/* experience */}
        <section className="card exp" id="experience" data-reveal>
          <h2 className="heading"><span className="idx"></span> Experience</h2>
          <Experience jobs={jobs} />
        </section>


        {/* other projects grid */}
        <section className="card projects-grid" id="more-projects" data-reveal>
          <h2 className="heading"><span className="idx"></span> Noteworthy Projects</h2>
          <ul className="grid">
            {otherProjects.map((p,i)=>(
              <li key={i} className="tile">
                <header>
                  <h3>{p.name}</h3>
                  <div className="links">
                    {p.gh && <a href={p.gh} aria-label="GitHub" target="_blank" rel="noreferrer">GH</a>}
                    {p.ext && <a href={p.ext} aria-label="External link" target="_blank" rel="noreferrer">↗</a>}
                  </div>
                </header>
                <p className="muted">{p.desc}</p>
                <ul className="taglist">{p.tags?.map(t=> <li key={t}>{t}</li>)}</ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="card certificates-grid" id="certificates" data-reveal>
            <h2 className="heading"><span className="idx"></span> Certifications</h2>
            <ul className="grid">
                {certifications.map((c,i)=>(
                    <li key={i} className="tile">
                      {c.logo && <img src={c.logo} alt={`${c.name} logo`} className="cert-logo" />}
                      <MediaThumbnails media={c.media} maxDisplay={3} />
                        <header>
                            <h3>{c.name}</h3>
                            <div className="links">
                                {c.ext && <a href={c.ext} aria-label="External link" target="_blank" rel="noreferrer">↗</a>}
                            </div>
                        </header>
                        <p className="muted">{c.desc}</p>
                        <ul className="taglist">{c.tags?.map(t=> <li key={t}>{t}</li>)}</ul>
                    </li>
                ))}
            </ul>
        </section>

        {/* contact */}
        <section className="card contact" id="contact" data-reveal>
          <h2 className="heading"><span className="idx"></span> Get in touch</h2>
          <p className="muted">I’m always open to interesting problems, collaborations, and good coffee.</p>
          <div className="connect-div">
            <button className="connect-btn" onClick={() => (window.location.href = "mailto:aditya25agrawal@gmail.com")}>
              Say hello
            </button>
          </div>
        </section>
      </main>

      {/* side rails */}
      <div className="side-rail left-rail">
        <ul>
          <li><a href="https://github.com/adiagcodelance" aria-label="GitHub">GH</a></li>
          <li><a href="https://linkedin.com/in/yourusername" aria-label="LinkedIn">IN</a></li>
        </ul>
        <div className="rail-line" />
      </div>
      <div className="side-rail right-rail">
        <a href="mailto:aditya25agrawal@gmail.com" className="email">aditya25agrawal@gmail.com</a>
        <div className="rail-line" />
      </div>
    </div>
  );
}
