import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import WGUPSDemo from './WGUPSDemo.jsx'
import { SiPython, SiReact, SiJavascript, SiHtml5, SiGit, SiLinux, SiVite, SiCplusplus, SiNodedotjs, SiDocker } from 'react-icons/si'
import { FaDatabase, FaJava } from 'react-icons/fa'

// ── EMAIL LINK ────────────────────────────────────────────────────────────────
const EMAIL = 'elliottph2772@gmail.com'

function EmailLink({ className, children = 'Email', onAfterClick, toastPosition = 'bottom' }) {
  const [toast, setToast] = useState(false)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch { /* clipboard unavailable */ }
    onAfterClick?.()

    let mailClientOpened = false
    const onBlur = () => { mailClientOpened = true }
    const onHide = () => { if (document.visibilityState === 'hidden') mailClientOpened = true }

    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onHide)

    setTimeout(() => {
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('visibilitychange', onHide)
      if (!mailClientOpened) {
        setToast(true)
        setTimeout(() => setToast(false), 5500)
      }
    }, 500)
  }

  return (
    <>
      <a href={`mailto:${EMAIL}`} className={className} onClick={handleClick}>
        {children}
      </a>
      {toast && createPortal(
        <div className={`email-toast${toastPosition === 'top' ? ' email-toast--top' : ''}`}>
          <div className="email-toast-title">Email Copied</div>
          <p className="email-toast-body">Go to your email service of choice and paste it.</p>
        </div>,
        document.body
      )}
    </>
  )
}

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

const completedCUs = courses.reduce((sum, c) => sum + c.cus, 0)

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
    tag: 'React · Vite',
    description:
      'This site — built from scratch with React & Vite. Reactive graduation progress tracker, multi-tab routing, and Deployment.',
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
  { name: 'React',       Icon: SiReact,       color: '#61dafb' },
  { name: 'Java',        Icon: FaJava,        color: '#f89820' },
  { name: 'Docker',      Icon: SiDocker,      color: '#2496ed' },
  { name: 'Python',      Icon: SiPython,      color: '#3776ab' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#f7df1e' },
  { name: 'HTML & CSS',  Icon: SiHtml5,       color: '#e34f26' },
  { name: 'SQL',         Icon: FaDatabase,    color: '#4479a1' },
  { name: 'Git',         Icon: SiGit,         color: '#f05032' },
  { name: 'Linux',       Icon: SiLinux,       color: '#fcc624' },
  { name: 'Vite',        Icon: SiVite,        color: '#646cff' },
  { name: 'C++',         Icon: SiCplusplus,   color: '#00599c' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
]

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage() {
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
          {techStack.map(({ name, Icon, color }, i) => (
            <div className="tech-card" key={name} style={{ animationDelay: `${i * 60}ms`, '--icon-color': color }}>
              <Icon size={52} color={color} />
              <div className="tech-name">{name}</div>
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
        <EmailLink className="about-link" />
        <a href="https://github.com/elliottph2772" className="about-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/elliotthudson" className="about-link" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </div>
  )
}

function ProjectDetail({ project, onBack }) {
  return (
    <div className="page project-detail-page" style={/** @type {React.CSSProperties} */({ '--accent': project.color })}>
      <button className="back-btn" onClick={onBack}>← Projects</button>
      <div className="detail-header">
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

function ProjectsPage({ selected, setSelected }) {
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


const CAT_COLORS = {
  'Gen Ed':      '#ffd97f',
  'Core':        '#7fffb2',
  'Math':        '#ff9f7f',
  'Programming': '#5b8fff',
  'Data':        '#d97fff',
}

function CoursesPage() {
  return (
    <div className="page courses-page">
      <div className="page-header">
        <h2>Courses</h2>
        <p>{completedCUs} of {WGU_TOTAL_CUS} CUs completed</p>
      </div>
      <div className="courses-grid">
        {courses.map((c, i) => (
          <div className="course-card" key={i} style={/** @type {React.CSSProperties} */({ animationDelay: `${i * 60}ms`, '--cat-color': CAT_COLORS[c.term] })}>
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
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  function handleTabClick(id) {
    setMenuOpen(false)
    if (id === 'projects' && active === 'projects' && selectedProject) {
      setSelectedProject(null)
    } else {
      setActive(id)
      if (id !== 'projects') setSelectedProject(null)
    }
  }

  function renderPage() {
    if (active === 'projects') {
      return <ProjectsPage selected={selectedProject} setSelected={setSelectedProject} />
    }
    const { Page } = TABS.find((t) => t.id === active)
    return <Page />
  }

  return (
      <>
        <nav>
          <div className="nav-logo" onClick={() => { setActive('home'); setSelectedProject(null); setMenuOpen(false) }} style={{cursor: 'pointer'}}>
            Eternal<span>Halflife</span>
          </div>
          <div className="nav-links">
            <EmailLink key={active} className="nav-link nav-link--email" toastPosition="top" />
            <a href="https://github.com/elliottph2772" className="nav-link nav-link--github" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/elliotthudson" className="nav-link nav-link--linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <ul className="nav-tabs">
            {TABS.map((t) => (
                <li key={t.id}>
                  <button
                      className={`nav-btn nav-btn--${t.id} ${active === t.id ? 'active' : ''}`}
                      onClick={() => handleTabClick(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
            ))}
          </ul>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {menuOpen && (
          <>
            <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
            <div className="mobile-menu">
              {TABS.filter(t => t.id !== 'home').map(t => (
                <button
                  key={t.id}
                  className={`mobile-menu-btn${active === t.id ? ' active' : ''}`}
                  onClick={() => handleTabClick(t.id)}
                >
                  {t.label}
                </button>
              ))}
              <div className="mobile-menu-divider" />
              <div className="mobile-menu-socials">
                <EmailLink className="mobile-menu-link" onAfterClick={() => setMenuOpen(false)} toastPosition="top" />
                <a href="https://github.com/elliottph2772" className="mobile-menu-link" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
                <a href="https://linkedin.com/in/elliotthudson" className="mobile-menu-link" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
              </div>
            </div>
          </>
        )}

        <main>{renderPage()}</main>
      </>
  )
}