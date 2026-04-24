import { useEffect, useRef, useState } from 'react'

const intakeLines = [
  { t: '', cls: 'g', delay: 200 },
  { t: 'LOADING PACKAGE MANIFEST...', cls: 'g', delay: 400 },
  { t: 'ALL ADDRESSES MATCHED IN DISTANCE MATRIX', cls: 'd', delay: 300 },
  { t: '', cls: 'g', delay: 80 },
  { t: 'PKG#01  195 W Oakland Ave        [TRUCK 2]', cls: 'g', delay: 65 },
  { t: 'PKG#02  2530 S 500 E             [TRUCK 1]', cls: 'g', delay: 65 },
  { t: 'PKG#03  233 Canyon Rd            [TRUCK 2]', cls: 'w', delay: 65 },
  { t: '        NOTE: Must deliver with PKG#18', cls: 'w', delay: 55 },
  { t: 'PKG#04  380 W 2880 S             [TRUCK 1]', cls: 'g', delay: 65 },
  { t: 'PKG#05  410 S State St           [TRUCK 2]', cls: 'w', delay: 65 },
  { t: '        NOTE: Deadline 10:30 AM', cls: 'w', delay: 55 },
  { t: 'PKG#06  3060 Lester St           [TRUCK 3]', cls: 'e', delay: 65 },
  { t: '        NOTE: Delayed — arrives hub 9:05 AM', cls: 'e', delay: 55 },
  { t: 'PKG#07  1330 2100 S              [TRUCK 1]', cls: 'g', delay: 65 },
  { t: 'PKG#08  300 State St             [TRUCK 3]', cls: 'w', delay: 65 },
  { t: '        NOTE: Can only be on Truck 3', cls: 'w', delay: 55 },
  { t: 'PKG#09  300 Columbia Ave         [TRUCK 2]', cls: 'g', delay: 65 },
  { t: 'PKG#10  600 E 900 S              [TRUCK 1]', cls: 'g', delay: 65 },
  { t: '        ...', cls: 'd', delay: 280 },
  { t: 'PKG#36  2300 Parkway Blvd        [TRUCK 1]', cls: 'e', delay: 65 },
  { t: '        NOTE: Wrong addr — corrects 10:20 AM', cls: 'e', delay: 55 },
  { t: 'PKG#37  410 S State St           [TRUCK 2]', cls: 'g', delay: 65 },
  { t: 'PKG#38  1060 Dalton Ave S        [TRUCK 3]', cls: 'g', delay: 65 },
  { t: 'PKG#39  2010 W 500 S             [TRUCK 1]', cls: 'g', delay: 65 },
  { t: 'PKG#40  380 W 2880 S             [TRUCK 2]', cls: 'g', delay: 65 },
  { t: '', cls: 'g', delay: 100 },
  { t: '--------------------------------', cls: 'd', delay: 100 },
  { t: '40 PACKAGES INDEXED INTO HASH TABLE', cls: 'g', delay: 200 },
  { t: 'CONSTRAINT FLAGS DETECTED: 8', cls: 'w', delay: 100 },
  { t: 'STATUS: READY FOR TRUCK ASSIGNMENT', cls: 'g', delay: 200 },
]

const resultsLines = [
  { t: '', cls: 'g', delay: 300 },
  { t: 'RUNNING END OF DAY SUMMARY...', cls: 'g', delay: 500 },
  { t: '', cls: 'g', delay: 100 },
  { t: 'TRUCK 1 --------------------------------', cls: 'd', delay: 200 },
  { t: '  Packages loaded:   16', cls: 'g', delay: 100 },
  { t: '  Route:  HUB->14->15->16->34->20->19', cls: 'd', delay: 100 },
  { t: '          ->40->4->1->2->29->37->5', cls: 'd', delay: 80 },
  { t: '          ->30->13->31->HUB', cls: 'd', delay: 80 },
  { t: '  Miles driven:      34.3 mi', cls: 'g', delay: 100 },
  { t: '  Deadlines met:     YES', cls: 'g', delay: 100 },
  { t: '', cls: 'g', delay: 80 },
  { t: 'TRUCK 2 --------------------------------', cls: 'd', delay: 200 },
  { t: '  Packages loaded:   16', cls: 'g', delay: 100 },
  { t: '  Route:  HUB->21->24->26->22->11->23', cls: 'd', delay: 100 },
  { t: '          ->18->36->27->10->38->3', cls: 'd', delay: 80 },
  { t: '          ->8->7->17->12->HUB', cls: 'd', delay: 80 },
  { t: '  Miles driven:      54.6 mi', cls: 'g', delay: 100 },
  { t: '  Deadlines met:     YES', cls: 'g', delay: 100 },
  { t: '', cls: 'g', delay: 80 },
  { t: 'TRUCK 3 --------------------------------', cls: 'd', delay: 200 },
  { t: '  Packages loaded:   8', cls: 'g', delay: 100 },
  { t: '  Route:  HUB->25->33->28->32->6', cls: 'd', delay: 100 },
  { t: '          ->35->39->9->HUB', cls: 'd', delay: 80 },
  { t: '  Miles driven:      29.1 mi', cls: 'g', delay: 100 },
  { t: '  Deadlines met:     YES', cls: 'g', delay: 100 },
  { t: '', cls: 'g', delay: 80 },
  { t: '================================', cls: 'd', delay: 200 },
  { t: '  TOTAL MILEAGE:     118.0 mi', cls: 'hi', delay: 150 },
  { t: '  LIMIT:             140.0 mi  [PASSED]', cls: 'hi', delay: 100 },
  { t: '  ALL 40 PKGS DELIVERED:  YES', cls: 'hi', delay: 150 },
  { t: '  CONSTRAINT RESOLUTION: COMPLETE', cls: 'hi', delay: 150 },
  { t: '================================', cls: 'd', delay: 100 },
  { t: '', cls: 'g', delay: 80 },
  { t: 'ALGORITHM: NEAREST NEIGHBOR O(n^2)', cls: 'd', delay: 100 },
  { t: 'DATA STRUCTURE: CHAINED HASH TABLE', cls: 'd', delay: 100 },
]

const clsMap = {
  g: { color: '#7fffb2' },
  d: { color: '#3a6a3a' },
  w: { color: '#ffb347' },
  e: { color: '#ff6b6b' },
  hi: { color: '#ffffff' },
}

function Typewriter({ lines, onDone }) {
  const [rendered, setRendered] = useState([])
  const bodyRef = useRef()
  const timers = useRef([])

  useEffect(() => {
    setRendered([])
    timers.current.forEach(clearTimeout)
    timers.current = []
    let cum = 0
    lines.forEach((l, i) => {
      cum += l.delay
      const t = setTimeout(() => {
        setRendered(prev => [...prev, l])
      }, cum)
      timers.current.push(t)
    })
    const done = setTimeout(() => { if (onDone) onDone() }, cum + 400)
    timers.current.push(done)
    return () => timers.current.forEach(clearTimeout)
  }, [lines])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [rendered])

  return (
    <div ref={bodyRef} style={{ padding: '16px', height: '300px', overflowY: 'auto', background: '#0d1a0d' }}>
      {rendered.map((l, i) => (
        <div key={i} style={{ fontFamily: "'Courier New', monospace", fontSize: '12px', lineHeight: '1.8', whiteSpace: 'pre', ...clsMap[l.cls] }}>
          {l.t}
        </div>
      ))}
      <span style={{ display: 'inline-block', width: '8px', height: '14px', background: '#7fffb2', verticalAlign: 'middle', animation: 'wgups-blink 1s step-end infinite' }} />
    </div>
  )
}

function TruckSVG({ color, id }) {
  return (
    <svg width="90" height="55" viewBox="0 0 90 55" id={id}>
      <rect x="2" y="20" width="68" height="28" rx="3" fill="#1a1a1a" stroke={color} strokeWidth="1.2" />
      <rect x="62" y="10" width="26" height="38" rx="3" fill="#1a1a1a" stroke={color} strokeWidth="1.2" />
      <circle cx="16" cy="50" r="6" fill="#0a0a0f" stroke={color} strokeWidth="1.2" />
      <circle cx="16" cy="50" r="2.5" fill={color} />
      <circle cx="72" cy="50" r="6" fill="#0a0a0f" stroke={color} strokeWidth="1.2" />
      <circle cx="72" cy="50" r="2.5" fill={color} />
      <rect x="64" y="14" width="22" height="14" rx="2" fill="#0a0a0f" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" />
      <rect x="6" y="24" width="56" height="4" rx="1" fill={color} fillOpacity="0.25" />
    </svg>
  )
}

function animateCount(setter, from, to, duration, fmt) {
  const start = performance.now()
  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    setter(fmt(from + (to - from) * ease))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function WGUPSDemo() {
  const [stage, setStage] = useState(0)
  const [pkgs, setPkgs] = useState([0, 0, 0])
  const [dispatched, setDispatched] = useState(false)
  const [rv1, setRv1] = useState('0')
  const [rv2, setRv2] = useState('0')
  const [rv3, setRv3] = useState('0%')
  const timers = useRef([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const goTo = (s) => {
    clearTimers()
    setStage(s)
    setDispatched(false)
    setPkgs([0, 0, 0])
  }

  useEffect(() => {
    if (stage === 1) {
      const steps = [[4,8,12,16],[4,8,12,16],[2,4,6,8]]
      steps.forEach((arr, ti) => {
        arr.forEach((n, i) => {
          const t = setTimeout(() => {
            setPkgs(prev => { const next = [...prev]; next[ti] = n; return next })
          }, 300 + ti * 200 + i * 320)
          timers.current.push(t)
        })
      })
    }
    if (stage === 2) {
      setPkgs([16, 16, 8])
      const t = setTimeout(() => setDispatched(true), 400)
      timers.current.push(t)
    }
    if (stage === 3) {
      setRv1('0'); setRv2('0'); setRv3('0%')
      const t1 = setTimeout(() => animateCount(setRv1, 0, 118, 1200, v => v.toFixed(1) + ' mi'), 4200)
      const t2 = setTimeout(() => animateCount(setRv2, 0, 40, 800, v => Math.round(v) + ' pkgs'), 4600)
      const t3 = setTimeout(() => animateCount(setRv3, 0, 84, 800, v => Math.round(v) + '%'), 5000)
      timers.current.push(t1, t2, t3)
    }
    return clearTimers
  }, [stage])

  const labels = [
    'stage 1 of 4 — package intake',
    'stage 2 of 4 — loading the trucks',
    'stage 3 of 4 — dispatch',
    'stage 4 of 4 — end of day report',
  ]

  const truckColors = ['#7fffb2', '#5b8fff', '#d97fff']
  const truckNames = ['Truck 1', 'Truck 2', 'Truck 3']

  return (
    <div style={{ background: '#0a0a0f', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Courier New', monospace" }}>
      <style>{`@keyframes wgups-blink { 50% { opacity: 0; } }`}</style>

      <div style={{ color: '#55556e', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', padding: '14px 20px 0' }}>
        {labels[stage]}
      </div>

      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', padding: '8px 0 4px' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === stage ? '#7fffb2' : '#2a2a3a', transition: 'background 0.3s' }} />
        ))}
      </div>

      {/* STAGE 0 — intake */}
      {stage === 0 && (
        <div style={{ margin: '20px', border: '2px solid #2a3a2a', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#1a2a1a', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #2a3a2a' }}>
            {['#ff6b6b','#ffb347','#7fffb2'].map((c,i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
            <span style={{ color: '#4a6a4a', fontSize: '11px', letterSpacing: '0.15em', flex: 1, textAlign: 'center' }}>WGUPS DISPATCH SYSTEM v1.0 — THE HUB</span>
          </div>
          <Typewriter lines={intakeLines} />
        </div>
      )}

      {/* STAGES 1 & 2 — trucks */}
      {(stage === 1 || stage === 2) && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '32px', padding: '24px 20px 8px', minHeight: '140px', overflow: 'hidden' }}>
            {truckColors.map((color, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ color: '#55556e', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{truckNames[i]}</div>
                <div style={{ transform: dispatched ? 'translateX(380px)' : 'none', transition: dispatched ? `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.35}s` : 'none' }}>
                  <TruckSVG color={color} />
                </div>
                <div style={{ color: '#7fffb2', fontSize: '13px', textAlign: 'center', minWidth: '60px' }}>{pkgs[i]} pkgs</div>
              </div>
            ))}
          </div>
          <div style={{ height: '3px', background: '#2a2a3a', borderRadius: '2px', margin: '0 20px' }} />
          <div style={{ height: '1px', background: '#1a1a2a', margin: '2px 20px' }} />
          <div style={{ textAlign: 'center', padding: '4px 0 8px', color: '#3a5a3a', fontSize: '10px', letterSpacing: '0.1em' }}>THE HUB — SALT LAKE CITY, UT</div>
        </div>
      )}

      {/* STAGE 3 — results */}
      {stage === 3 && (
        <div>
          <div style={{ margin: '20px 20px 0', border: '2px solid #2a3a2a', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#1a2a1a', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #2a3a2a' }}>
              {['#ff6b6b','#ffb347','#7fffb2'].map((c,i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              <span style={{ color: '#4a6a4a', fontSize: '11px', letterSpacing: '0.15em', flex: 1, textAlign: 'center' }}>WGUPS DISPATCH SYSTEM v1.0 — END OF DAY REPORT</span>
            </div>
            <Typewriter lines={resultsLines} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', margin: '16px 20px 0' }}>
            {[[rv1,'total miles'],[rv2,'packages'],[rv3,'under limit']].map(([val,lbl],i) => (
              <div key={i} style={{ background: '#0d1a0d', border: '1px solid #2a3a2a', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: '#7fffb2', fontSize: '18px', fontWeight: 700 }}>{val}</div>
                <div style={{ color: '#3a6a3a', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ height: '16px' }} />
        </div>
      )}

      {/* NAV */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '14px 20px 18px' }}>
        <button onClick={() => goTo(Math.max(0, stage - 1))} style={{ background: 'none', border: '1px solid #2a2a3a', borderRadius: '4px', color: stage === 0 ? '#2a2a3a' : '#55556e', fontFamily: "'Courier New', monospace", fontSize: '11px', letterSpacing: '0.08em', padding: '6px 16px', cursor: stage === 0 ? 'default' : 'pointer' }}>
          ← prev
        </button>
        <button onClick={() => goTo(Math.min(3, stage + 1))} style={{ background: 'none', border: '1px solid #2a2a3a', borderRadius: '4px', color: stage === 3 ? '#2a2a3a' : '#55556e', fontFamily: "'Courier New', monospace", fontSize: '11px', letterSpacing: '0.08em', padding: '6px 16px', cursor: stage === 3 ? 'default' : 'pointer' }}>
          next →
        </button>
      </div>
    </div>
  )
}