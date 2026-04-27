import { useState, useEffect } from 'react'
import './App.css'
import WGUPSDemo from './WGUPSDemo.jsx'
import { SiPython, SiReact, SiJavascript, SiHtml5, SiGit, SiLinux, SiVite, SiThreedotjs, SiCplusplus, SiNodedotjs } from 'react-icons/si'
import { FaDatabase, FaJava } from 'react-icons/fa'

// ── DATA ──────────────────────────────────────────────────────────────────────

const WGU_TOTAL_CUS = 122

const courses = [
  // ── General Education
  { name: 'Natural Science Lab',                                   cus: 2,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Introduction to Physical and Human Geography',          cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Global Arts and Humanities',                            cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Health, Fitness, and Wellness',                         cus: 4,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Composition: Successful Self-Expression',               cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'Introduction to Communication: Connecting with Others', cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  { name: 'American Politics and the US Constitution',             cus: 3,  grade: 'Pass', term: 'Gen Ed'      },
  // ── Core IT / CS
  { name: 'IT Leadership Foundations',                             cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Introduction to IT',                                    cus: 4,  grade: 'Pass', term: 'Core'        },
  { name: 'Network and Security – Foundations',                    cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Web Development Foundations',                           cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Version Control',                                       cus: 1,  grade: 'Pass', term: 'Core'        },
  { name: 'Linux Foundations',                                     cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Fundamentals of Information Security',                  cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Computer Architecture',                                 cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Operating Systems for Computer Scientists',             cus: 3,  grade: 'Pass', term: 'Core'        },
  { name: 'Introduction to Computer Science',                      cus: 4,  grade: 'Pass', term: 'Core'        },
  // ── Math
  { name: 'Applied Probability and Statistics',                    cus: 3,  grade: 'Pass', term: 'Math'        },
  { name: 'Calculus I',                                            cus: 4,  grade: 'Pass', term: 'Math'        },
  { name: 'Discrete Mathematics I',                                cus: 4,  grade: 'Pass', term: 'Math'        },
  { name: 'Discrete Mathematics II',                               cus: 4,  grade: 'Pass', term: 'Math'        },
  // ── Programming
  { name: 'Scripting and Programming – Foundations',               cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Scripting and Programming – Applications',              cus: 4,  grade: 'Pass', term: 'Programming' },
  { name: 'Java Fundamentals',                                     cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Java Frameworks',                                       cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Back-End Programming',                                  cus: 3,  grade: 'Pass', term: 'Programming' },
  { name: 'Advanced Java',                                         cus: 3,  grade: 'Pass', term: 'Programming' },
  // ── Data
  { name: 'Data Management – Foundations',                         cus: 3,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Management – Applications',                        cus: 4,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Structures and Algorithms I',                      cus: 4,  grade: 'Pass', term: 'Data'        },
  { name: 'Data Structures and Algorithms II',                     cus: 4,  grade: 'Pass', term: 'Data'        },
]

const projects = [
  {
  id: 1,
  title: 'WGUPS Routing System',
  tag: 'Python · Algorithms',
  description: 'A parcel delivery simulation for Salt Lake City using a nearest-neighbor routing algorithm, a custom chained hash table keyed by package ID, and a singly linked list per-truck route. Includes a supervisor UI with time-windowed status queries.',
  highlights: [
    'Hash Tables & Linked Lists',
    'Nearest-neighbor O(n²) optimizer',
    'Package Filtering logic',
    'Time-windowed delivery status',
  ],
  color: '#7fffb2',
  details: [
    {
      label: 'Simulation',
      component: <WGUPSDemo />,
    },
    {
      label: 'The Problem',
      content: 'Design a routing algorithm for three trucks delivering 40 packages across Salt Lake City under a set of constraints — package deadlines, truck capacity limits, delayed arrivals, and a wrong address that corrects itself mid-day. Total mileage had to stay under 140 miles.',
    },
    {
      label: 'Data Structures',
      content: 'Built a chained hash table from scratch keyed by package ID for O(1) average lookup. Each truck route is stored as a singly linked list, allowing efficient insertion and traversal without relying on any standard library containers.',
    },
    {
      label: 'Routing Algorithm',
      content: 'Implemented a nearest-neighbor greedy algorithm that at each step selects the closest undelivered package. Consistently produced routes under the 140 mile requirement, running in O(n²) time.',
    },
    {
      label: 'Supervisor UI',
      content: 'A command line interface lets the user enter any time during the day and see the exact status of every package at that moment — at the hub, en route, or delivered — along with total mileage across all trucks.',
    },
  ],
},
  {
    id: 2,
    title: 'Portfolio Website',
    tag: 'React · Vite · Three.js',
    description:
      'This site — built from scratch with React, Vite, and React Three Fiber. Reactive graduation progress tracker, multi-tab routing, and Deployment.',
    highlights: [
      'Reactive CU progress bar',
      'Tab-based SPA routing',
      'Deployed via Vercel',
    ],
    color: '#5b8fff',
  },
  {
    id: 3,
    title: 'Next Project Loading . . .',
    tag: 'You Never Know What The Future May Hold',
    description:
      'Always working on the next project, Stay Tuned!',
    highlights: ['Coding ?', 'Gaming ?', 'Sports ?'],
    color: '#ff7fb2',
  },
]

const techStack = [
  { name: 'Python',      Icon: SiPython,      color: '#3776ab' },
  { name: 'Java',        Icon: FaJava,        color: '#f89820' },
  { name: 'React',       Icon: SiReact,       color: '#61dafb' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#f7df1e' },
  { name: 'HTML & CSS',  Icon: SiHtml5,       color: '#e34f26' },
  { name: 'SQL',         Icon: FaDatabase,    color: '#4479a1' },
  { name: 'Git',         Icon: SiGit,         color: '#f05032' },
  { name: 'Linux',       Icon: SiLinux,       color: '#fcc624' },
  { name: 'Vite',        Icon: SiVite,        color: '#646cff' },
  { name: 'Three.js',    Icon: SiThreedotjs,  color: '#049ef4' },
  { name: 'C++',         Icon: SiCplusplus,   color: '#00599c' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
]

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const completedCUs = courses.reduce((sum, c) => sum + c.cus, 0)
  const pct = Math.round((completedCUs / WGU_TOTAL_CUS) * 100)
  const [displayPct, setDisplayPct] = useState(0)
  const [labelPos, setLabelPos] = useState(0)

  useEffect(() => {
    let frame
    let startTime = null
    const duration = 4000
    function easeOut(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }
    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const t = Math.min((timestamp - startTime) / duration, 1)
      setDisplayPct(Math.round(easeOut(t) * pct))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    const timeout = setTimeout(() => { frame = requestAnimationFrame(tick) }, 300)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [pct])

  useEffect(() => {
    const t = setTimeout(() => setLabelPos(pct), 50)
    return () => clearTimeout(t)
  }, [pct])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page home-page">
      <div className="hero">
        <div className="hero-tag">B.S. Computer Science · WGU</div>
        <h1 className="hero-name">Elliott Hudson</h1>
        <p className="hero-sub">
          Eternal HalfLife — Some Things Fade, But Hard Work Remains.
        </p>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Graduation Progress — {completedCUs} of {WGU_TOTAL_CUS} CREDITS COMPLETED</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${labelPos}%` }}>
            <span className="progress-glow" />
          </div>
          <span className="progress-pct-follow" style={{ left: `${labelPos}%` }}>{displayPct}%</span>
        </div>
      </div>

      <div className="tech-section">
        <div className="tech-grid">
          {techStack.map((t, i) => (
            <div className="tech-card" key={t.name} style={{ animationDelay: `${i * 60}ms` }}>
              <t.Icon size={52} color={t.color} />
              <div className="tech-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-about">
        {[
          { label: 'Currently', text: 'B.S. Computer Science student at Western Governors University. Building foundational skills in software engineering.' },
          { label: 'Interests', text: 'Coding, Gaming, PC hardware, AI Integration and The Detroit Lions.' },
          { label: 'Looking For', text: 'Tech internships or Junior Software engineering roles where I can contribute real work while finishing my degree.' },
        ].map((b, i) => (
          <div className="about-block reveal" key={b.label} style={{ transitionDelay: `${i * 0.13}s` }}>
            <div className="about-block-label">{b.label}</div>
            <p>{b.text}</p>
          </div>
        ))}
      </div>

      <footer className="home-footer reveal" style={{ transitionDelay: '0.39s' }}>
        <a href="mailto:elliottph2772@gmail.com" className="about-link">Email</a>
        <a href="https://github.com/elliottph2772" className="about-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/elliotthudson" className="about-link" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </div>
  )
}

function ProjectDetail({ project, onBack }) {
  return (
    <div className="page project-detail-page">
      <button className="back-btn" onClick={onBack}>← Projects</button>
      <div className="detail-header" style={/** @type {React.CSSProperties} */({ '--accent': project.color })}>
        <div className="detail-tag">{project.tag}</div>
        <h2 className="detail-title">{project.title}</h2>
      </div>
      <div className="detail-body">
        <div className="detail-section">
          <div className="detail-section-label">Overview</div>
          <p>{project.description}</p>
        </div>
        <div className="detail-section">
          <div className="detail-section-label">Key Features</div>
          <ul className="detail-highlights">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
        {project.details && project.details.map((block, i) => (
          <div className="detail-section" key={i}>
            <div className="detail-section-label">{block.label}</div>
            {block.component
              ? <div style={{ gridColumn: '1 / -1' }}>{block.component}</div>
              : <p>{block.content}</p>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsPage() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="page projects-page">
      <div className="page-header">
        <h2>Projects</h2>
        <p>Click on a project for an expanded demonstration.</p>
      </div>
      <div className="projects-list">
        {projects.map((p) => (
          <div
            className="project-card"
            key={p.id}
            style={/** @type {React.CSSProperties} */({ '--accent': p.color, cursor: 'pointer' })}
            onClick={() => setSelected(p)}
          >
            <div className="project-top">
              <div>
                <div className="project-tag">{p.tag}</div>
                <h3 className="project-title">{p.title}</h3>
              </div>
              <div className="project-num">0{p.id}</div>
            </div>
            <p className="project-desc">{p.description}</p>
            <ul className="project-highlights">
              {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}


function CoursesPage() {
  const completedCUs = courses.reduce((sum, c) => sum + c.cus, 0)
  return (
    <div className="page courses-page">
      <div className="page-header">
        <h2>Courses</h2>
        <p>{completedCUs} of {WGU_TOTAL_CUS} CUs completed</p>
      </div>
      <div className="courses-grid">
        {courses.map((c, i) => (
          <div className="course-card" key={i} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="course-term" data-cat={c.term}>{c.term}</div>
            <div className="course-name">{c.name}</div>
            <div className="course-footer">
              <span className="course-cus">{c.cus} CUs</span>
              <span className="badge pass">{c.grade}</span>
            </div>
          </div>
        ))}
        <div className="course-card course-remaining">
          <div className="course-term">Remaining</div>
          <div className="course-name">{WGU_TOTAL_CUS - completedCUs} CUs to graduation</div>
          <div className="course-footer">
            <span className="course-cus">{WGU_TOTAL_CUS} total</span>
            <span className="badge upcoming">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'home',     label: 'Home',     Page: HomePage     },
  { id: 'projects', label: 'Projects', Page: ProjectsPage },
  { id: 'courses',  label: 'Courses',  Page: CoursesPage  },
]

export default function App() {
  const [active, setActive] = useState('home')
  const {Page} = TABS.find((t) => t.id === active)

  return (
      <>
        <nav>
          <div className="nav-logo" onClick={() => setActive('home')} style={{cursor: 'pointer'}}>
            Eternal<span>Halflife</span>
          </div>
          <ul className="nav-tabs">
            {TABS.map((t) => (
                <li key={t.id} className={t.id === 'home' ? 'hide-on-mobile' : ''}>
                  <button
                      className={`nav-btn ${active === t.id ? 'active' : ''}`}
                      onClick={() => setActive(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
            ))}
          </ul>
        </nav>
        <main><Page/></main>
      </>
  )
}