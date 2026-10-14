import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "./Home.css";

const fallbackJobs = [
  {
    company: "DeepHealth",
    title: "Software Engineer",
    dates: "Jun 2024 – Present",
    logo: "/dh_logo.png",
    media: [],
    bullets: [
      "Developed new features and resolved client-requested issues in an existing RIS application.",
      "Built a Python GUI that made build scripts accessible to more developers with less training.",
      "Documented the build process to streamline onboarding, maintenance, and development.",
      "Designed a maintainable architecture for ancillary RIS services and ScriptSender tooling.",
    ],
    tags: ["C#", "SQL", "Java", "Python", "React", "Visual Studio"],
  },
  {
    company: "Sunly Energy",
    title: "Data Analyst & IT Assistant",
    dates: "May 2023 – Jun 2024",
    logo: "/Sunly_Yellow-01 (2).png",
    media: [],
    bullets: [
      "Supported onboarding, procurement, and hardware and software operations for 30+ employees.",
      "Created Salesforce reports and automations for business intelligence and franchise processes.",
      "Supported API integrations between solar design software and Salesforce.",
      "Collaborated on website UX, SEO, and new-page development.",
    ],
    tags: ["Salesforce", "React", "Postman", "OpenSolar", "IT"],
  },
  {
    company: "The Spice Store Inc.",
    title: "Operations Associate",
    dates: "Nov 2018 – Jun 2024",
    logo: "/the spice store final.jpg",
    media: [],
    bullets: [
      "Managed sales-floor operations, procurement, logistics, pricing, merchandising, and reporting.",
      "Provided hardware, POS software, and day-to-day IT support.",
      "Initiated development of the company website and trained staff on essential processes.",
    ],
    tags: ["IT", "RetailMagic", "Sales", "Operations"],
  },
];

const fallbackProjects = [
  {
    name: "Dayweave",
    desc: "A calm productivity system that brings tasks, calendar events, notes, and intelligent capture together across iPhone and iPad.",
    tags: ["iOS", "iPadOS", "Productivity", "AI"],
    gh: "",
    ext: "https://apps.apple.com/ca/app/dayweave-planner-tasks/id6790466640",
  },
  {
    name: "Telling Stories",
    desc: "A web service for creating educational H5P content that can be published to Pressbooks and Moodle.",
    tags: ["React", "JSX", "H5P", "Pressbooks"],
    gh: "https://github.com/adiagcodelance/CS-4820-Telling-Stories",
    ext: "https://github.com/adiagcodelance/CS-4820-Telling-Stories",
  },
  {
    name: "Assignment Planner",
    desc: "A dedicated planner giving students focused tools for organizing and completing academic assignments.",
    tags: ["Flutter", "Java", "Android"],
    gh: "https://github.com/adiagcodelance/Assignment-Planner-",
    ext: "https://github.com/adiagcodelance/Assignment-Planner-",
  },
];

const dayweaveScreenshots = [
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/7b/4a/fd/7b4afd2a-b7cd-36e5-7242-efb6c0f853c3/01-everything-in-one-place.png/640x960bb.jpg",
    alt: "Dayweave overview showing tasks, events, and notes in one place",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/4a/80/d8/4a80d87d-5618-4549-a239-5d414326d4b4/02-smart-capture.png/640x960bb.jpg",
    alt: "Dayweave intelligent capture screen",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ba/86/9a/ba869a20-f039-b6b5-f75c-a1c8fd212fdc/03-plan-your-day.png/640x960bb.jpg",
    alt: "Dayweave daily planning screen",
  },
  {
    src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/7e/f5/21/7ef52184-abca-0ab8-c208-e55cdac72839/04-see-your-week.png/640x960bb.jpg",
    alt: "Dayweave seven-day weekly timeline",
  },
];

const fallbackCertifications = [
  {
    logo: "/datacamp.png",
    name: "Artificial Intelligence Fundamentals",
    desc: "AI use cases, generative AI, machine learning, prompting, and responsible AI.",
    tags: ["AI", "Generative AI", "Machine Learning"],
    ext: "https://www.datacamp.com/skill-verification/AIF0028742102106",
  },
  {
    logo: "/datacamp.png",
    name: "SQL Associate",
    desc: "Data cleaning, transformation, reporting, and relational analysis using PostgreSQL.",
    tags: ["SQL", "PostgreSQL", "Data Management"],
    ext: "https://www.datacamp.com/certificate/SQA0013747867975",
  },
  {
    name: "Canon Beginner Photography Course",
    desc: "Photography fundamentals including exposure, composition, and camera settings.",
    tags: ["Photography", "Composition"],
    ext: "#",
  },
  {
    name: "Microsoft Office Suite",
    desc: "Training across Word, Excel, PowerPoint, and Outlook.",
    tags: ["Excel", "PowerPoint", "Word"],
    ext: "#",
  },
];

const normalizeProjects = (items) =>
  items.map((project) => {
    const isDayweave = ["folio", "dayweave", "dayweave: planner & tasks"]
      .includes(project.name?.trim().toLowerCase());

    return {
      name: isDayweave ? "Dayweave" : project.name,
      desc: isDayweave
        ? "A calm productivity system that brings tasks, calendar events, notes, and intelligent capture together across iPhone and iPad."
        : project.description || project.desc,
      tags: isDayweave ? ["iOS", "iPadOS", "Productivity", "AI"] : project.tags || [],
      gh: isDayweave ? "" : project.githubUrl || project.gh,
      ext: isDayweave
        ? "https://apps.apple.com/ca/app/dayweave-planner-tasks/id6790466640"
        : project.externalUrl || project.ext,
      media: isDayweave ? [] : project.media || [],
    };
  });

const normalizeCertifications = (items) =>
  items.map((certification) => ({
    logo: certification.logo || "",
    media: certification.media || [],
    name: certification.name,
    desc: certification.description || certification.desc,
    tags: certification.tags || [],
    ext: certification.externalUrl || certification.ext,
  }));

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function TagList({ tags = [] }) {
  return (
    <ul className="tag-list" aria-label="Technologies">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}

function ProjectArtwork({ index, project }) {
  if (project.name === "Dayweave") {
    return (
      <div className="dayweave-gallery">
        {dayweaveScreenshots.map((screenshot, screenshotIndex) => (
          <img
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            loading={screenshotIndex === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    );
  }

  if (project.media?.[0]?.url) {
    return <img className="project-media" src={project.media[0].url} alt="" loading="lazy" />;
  }

  if (index === 1) {
    return (
      <div className="stories-art" aria-hidden="true">
        <strong>H5P</strong><div><span /><span /><span /></div><small>Pressbooks</small><small>Moodle</small>
      </div>
    );
  }

  return (
    <div className="planner-art" aria-hidden="true">
      <div className="checkmark">✓</div>
      <div><strong>Assignment Planner</strong><span /><span /><span /></div>
    </div>
  );
}

export default function Home() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [projects, setProjects] = useState(fallbackProjects);
  const [certifications, setCertifications] = useState(fallbackCertifications);
  const [secretClicks, setSecretClicks] = useState(0);
  const navigate = useNavigate();

  const handleSecretClick = useCallback(() => {
    const nextCount = secretClicks + 1;
    setSecretClicks(nextCount);
    if (nextCount >= 5) navigate("/valentine");
    window.setTimeout(() => setSecretClicks(0), 2000);
  }, [navigate, secretClicks]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      api.getExperiences(),
      api.getProjects(),
      api.getCertifications(),
    ]).then(([experienceResult, projectResult, certificationResult]) => {
      if (!mounted) return;

      if (experienceResult.status === "fulfilled" && experienceResult.value?.length) {
        setJobs(experienceResult.value.map((job) => ({ ...job, media: job.media || [], tags: job.tags || [] })));
      }
      if (projectResult.status === "fulfilled" && projectResult.value?.length) {
        setProjects(normalizeProjects(projectResult.value));
      }
      if (certificationResult.status === "fulfilled" && certificationResult.value?.length) {
        setCertifications(normalizeCertifications(certificationResult.value));
      }
    });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".site-nav a[href^='#']");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0.01 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const currentTags = useMemo(() => jobs[0]?.tags?.slice(0, 5) || [], [jobs]);

  return (
    <div className="portfolio-site">
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Aditya Agrawal, home">AA<span>.</span></a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#credentials">Credentials</a>
        </nav>
        <a className="header-contact" href="mailto:aditya25agrawal@gmail.com">Get in touch <ArrowIcon /></a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer · Developer tooling · Automation</p>
            <h1>I make complex workflows feel <em>simple.</em></h1>
            <p className="hero-lede">I’m Aditya Agrawal, a software engineer at DeepHealth focused on build systems, workflow automation, intuitive tooling, and the thoughtful use of AI.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#projects">See selected work <span aria-hidden="true">↘</span></a>
              <a href="https://github.com/adiagcodelance" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
              <a href="https://www.linkedin.com/in/aditya-agrawal96-91824b18b" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
            </div>
          </div>
          <button className={`portrait-button ${secretClicks ? "wiggle" : ""}`} onClick={handleSecretClick} aria-label="Aditya's illustrated portrait">
            <span className="portrait-orbit"><img src="/adi_g.png" alt="Aditya Agrawal" /></span>
            <small>Create · Collaborate · Learn</small>
          </button>
        </section>

        <section className="current-strip" aria-label="Current focus">
          <div><span>Currently</span><strong>{jobs[0]?.title || "Software Engineer"} at {jobs[0]?.company || "DeepHealth"}</strong></div>
          <div><span>Working across</span><strong>{currentTags.join(" · ")}</strong></div>
          <div><span>Learning</span><strong>AI architecture · Machine learning</strong></div>
        </section>

        <section className="about-section numbered-section" id="about">
          <div className="section-kicker"><span>01</span><p>About</p></div>
          <div className="about-content">
            <h2>Persistent, curious, and always looking for a better way to work.</h2>
            <div className="about-columns">
              <p>As a Computer Science graduate and tech enthusiast, I thrive in environments that encourage challenge, growth, and continuous learning. I bring persistence, creativity, and a user-first perspective to every project.</p>
              <p>Across engineering, analytics, and IT, I’ve introduced systems, processes, and integrations that improve how teams work—from business intelligence pipelines and Salesforce automation to build tooling and web redesigns.</p>
            </div>
          </div>
        </section>

        <section className="experience-section numbered-section" id="experience">
          <div className="section-kicker"><span>02</span><p>Experience</p></div>
          <div className="section-heading"><h2>Building useful systems in real operating environments.</h2></div>
          <div className="role-list">
            {jobs.map((job) => (
              <article className="role-row" key={`${job.company}-${job.dates}`}>
                <div className="role-meta">
                  <span>{job.dates}</span>
                  <strong>{job.company}</strong>
                  <p>{job.title}</p>
                </div>
                <div className="role-content">
                  <h3>{job.bullets?.[0]}</h3>
                  <ul>{job.bullets?.slice(1).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <TagList tags={job.tags} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section numbered-section" id="projects">
          <div className="section-kicker"><span>03</span><p>Selected work</p></div>
          <div className="section-heading"><h2>Projects that organize information and make learning easier.</h2></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.name}>
                <div className="project-art"><ProjectArtwork index={index} project={project} /></div>
                <div className="project-copy">
                  <p className="project-type">{project.name === "Dayweave" ? "Live on the App Store" : index === 1 ? "University capstone" : "Android application"}</p>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <TagList tags={project.tags} />
                  {(project.ext || project.gh) && <a href={project.ext || project.gh} target="_blank" rel="noreferrer">{project.name === "Dayweave" ? "View on the App Store" : "View project"} <ArrowIcon /></a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credentials-section numbered-section" id="credentials">
          <div className="section-kicker"><span>04</span><p>Credentials</p></div>
          <div className="credential-list">
            {certifications.map((certification) => (
              <article key={certification.name}>
                <div className="credential-source">
                  {certification.logo && <img src={certification.logo} alt="" loading="lazy" />}
                  <span>{certification.logo ? "Credential" : "Additional learning"}</span>
                </div>
                <h3>{certification.name}</h3>
                <p>{certification.desc}</p>
                {certification.ext && certification.ext !== "#" && <a href={certification.ext} target="_blank" rel="noreferrer" aria-label={`View ${certification.name}`}><ArrowIcon /></a>}
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">Have an interesting problem?</p>
          <h2>Let’s build something useful.</h2>
          <a href="mailto:aditya25agrawal@gmail.com">aditya25agrawal@gmail.com <ArrowIcon /></a>
        </section>
      </main>

      <footer className="site-footer">
        <span>Aditya Agrawal</span><span>Create · Collaborate · Learn</span>
        <a href="/api/resume" target="_blank" rel="noreferrer">Résumé <ArrowIcon /></a>
      </footer>
    </div>
  );
}
