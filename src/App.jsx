import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Torus, Box, Sphere, MeshDistortMaterial } from '@react-three/drei'
import './App.css'
import WGUPSDemo from './WGUPSDemo.jsx'

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
    highlights: ['Coding', 'Gaming', 'Sports'],
    color: '#ff7fb2',
  },
]

// ── 3D SCENES ─────────────────────────────────────────────────────────────────

function RotatingTorus() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.4
    ref.current.rotation.y = clock.elapsedTime * 0.6
  })
  return (
    <Torus ref={ref} args={[1, 0.35, 32, 100]}>
      <MeshDistortMaterial color="#7fffb2" distort={0.3} speed={2} roughness={0.1} metalness={0.8} />
    </Torus>
  )
}

function FloatingCube() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.5
    ref.current.rotation.z = clock.elapsedTime * 0.3
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.3
  })
  return (
    <Box ref={ref} args={[1.6, 1.6, 1.6]}>
      <meshStandardMaterial color="#5b8fff" roughness={0.05} metalness={0.9} />
    </Box>
  )
}

function PulseSphere() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 1.5) * 0.15
    ref.current.scale.set(s, s, s)
    ref.current.rotation.y = clock.elapsedTime * 0.4
  })
  return (
    <Sphere ref={ref} args={[1, 64, 64]}>
      <MeshDistortMaterial color="#ff7fb2" distort={0.5} speed={3} roughness={0.0} metalness={0.6} />
    </Sphere>
  )
}

const MODEL_SCENES = [
  {
    label: 'Torus',
    hint: 'Drag to orbit · scroll to zoom',
    bg: '#0d1a14',
    scene: (
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#7fffb2" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#5b8fff" />
        <RotatingTorus />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    ),
  },
  {
    label: 'Cube',
    hint: 'Drag to orbit · scroll to zoom',
    bg: '#0d0f1a',
    scene: (
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-4, 2, -4]} intensity={1} color="#5b8fff" />
        <FloatingCube />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    ),
  },
  {
    label: 'Sphere',
    hint: 'Drag to orbit · scroll to zoom',
    bg: '#1a0d13',
    scene: (
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={1.5} color="#ff7fb2" />
        <pointLight position={[-4, -4, 4]} intensity={0.8} color="#7fffb2" />
        <PulseSphere />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    ),
  },
]

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const completedCUs = courses.reduce((sum, c) => sum + c.cus, 0)
  const pct = Math.round((completedCUs / WGU_TOTAL_CUS) * 100)
  const [displayPct, setDisplayPct] = useState(0)

  useEffect(() => {
    let frame
    let startTime = null
    const duration = 2500
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

  return (
    <div className="page home-page">
      <div className="hero">
        <div className="hero-tag">B.S. Computer Science · WGU</div>
        <h1 className="hero-name">Elliott Hudson</h1>
        <p className="hero-sub">
          Eternal HalfLife — Carving the way for a better Future.
        </p>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Graduation Progress</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${displayPct}%` }}>
            <span className="progress-glow" />
            <span className="progress-pct-follow">{displayPct}%</span>
          </div>
        </div>
        <div className="progress-note">{completedCUs} of {WGU_TOTAL_CUS} CUs completed</div>
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

function ProjectDetail({ project, onBack }) {
  return (
    <div className="page project-detail-page">
      <button className="back-btn" onClick={onBack}>← Projects</button>
      <div className="detail-header" style={{ '--accent': project.color }}>
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
            style={{ '--accent': p.color, cursor: 'pointer' }}
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

function ModelsPage() {
  const [active, setActive] = useState(0)
  const m = MODEL_SCENES[active]

  return (
    <div className="page models-page">
      <div className="page-header">
        <h2>3D Models</h2>
        <p>Interactive Three.js scenes — drag to orbit, scroll to zoom.</p>
      </div>
      <div className="model-switcher">
        {MODEL_SCENES.map((s, i) => (
          <button
            key={i}
            className={`model-switch-btn ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="canvas-wrapper" style={{ background: m.bg }}>
        {m.scene}
        <div className="canvas-hint">{m.hint}</div>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page about-page">
      <div className="page-header">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        {[
          {
            label: 'Currently',
            text: 'B.S. Computer Science student at Western Governors University. Building foundational skills in software engineering.',
          },
          {
            label: 'Interests',
            text: 'Coding, Gaming, PC hardware, AI Integration and The Detroit Lions.',
          },
          {
            label: 'Looking For',
            text: 'Tech internships or Junior Software engineering roles where I can contribute real work while finishing my degree.',
          },
        ].map((b) => (
          <div className="about-block" key={b.label}>
            <div className="about-block-label">{b.label}</div>
            <p>{b.text}</p>
          </div>
        ))}
        <div className="about-block">
          <div className="about-block-label">Contact</div>
          <div className="about-links">
            <a href="mailto:elliottph2772@gmail.com" className="about-link">Email</a>
            <a href="https://github.com/elliottph2772" className="about-link" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/elliotthudson" className="about-link" target="_blank" rel="noreferrer">LinkedIn</a>
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
  // { id: 'models',   label: '3D',       Page: ModelsPage   },
  { id: 'about',    label: 'About',    Page: AboutPage    },
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