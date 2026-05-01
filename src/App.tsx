import { useEffect, useRef, useState } from 'react'
import { lenis } from './lenis'
import './App.css'

/* ─── Scroll reveal (generic rise-up) ─── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const HERO_SUB = 'The first mobile app that monitors you and your friends on a night out in real time.'

/* ─── Typewriter hook ─── */
function useTypewriter(text: string, startDelay = 1100, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, startDelay, speed])

  return { displayed, done }
}

/* ─── Hero ─── */
function Hero() {
  const { displayed, done } = useTypewriter(HERO_SUB)

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-body">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-meet">Meet </span>
            <span className="hero-rally">
              <span className="rally-plain">R</span>
              <span className="rally-green">a</span>
              <span className="rally-green">l</span>
              <span className="rally-green">l</span>
              <span className="rally-plain">y</span>
            </span>
          </h1>
          <p className="hero-sub">
            {displayed}
            <span className={`type-cursor ${done ? 'cursor-done' : ''}`} />
          </p>
          <div className="hero-actions">
            <a
              href="#demo"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); lenis.scrollTo('#demo') }}
            >
              Request Demo
            </a>
          </div>
        </div>
        <div className="hero-video-right">
          {/* Drop hero-demo.mp4 into /public and replace this div with:
              <video autoPlay muted loop playsInline src="/hero-demo.mp4" className="hero-video-el" /> */}
          <video autoPlay muted loop playsInline src="/hero-demo.mp4" className="hero-video-el" />
        </div>
      </div>
      <a href="#features" className="scroll-hint" aria-label="Scroll down">
        <span className="scroll-arrow" />
      </a>
    </section>
  )
}

/* ─── Mini app screens ─── */
function LiveMapScreen() {
  const chips = [
    { init: 'T', name: 'Tyler', ok: true },
    { init: 'S', name: 'Sophia', ok: true },
    { init: 'C', name: 'Collin', ok: false },
  ]
  return (
    <div className="ms ms-map">
      <div className="ms-topbar">
        <div className="ms-hamburger"><span /><span /><span /></div>
        <div className="ms-topbar-logo">R<span>all</span>y</div>
        <div className="ms-rally-pill"><span className="ms-pill-dot" />Active · 2:14</div>
      </div>
      <div className="ms-map-canvas">
        <div className="ms-map-grid" />
        <div className="ms-pin" style={{ top: '38%', left: '48%', background: '#355E3B' }}>T</div>
        <div className="ms-pin" style={{ top: '55%', left: '63%', background: '#5a9162' }}>S</div>
        <div className="ms-pin" style={{ top: '44%', left: '28%', background: '#3f6e46' }}>C</div>
      </div>
      <div className="ms-map-bottom">
        <div className="ms-chips-row">
          {chips.map((c, i) => (
            <div key={i} className="ms-chip">
              <div className="ms-chip-av" style={{ background: c.ok ? '#355E3B' : '#333' }}>{c.init}</div>
              <div>
                <div className="ms-chip-name">{c.name}</div>
                <div className={`ms-chip-status ${c.ok ? 'ms-chip-safe' : ''}`}>{c.ok ? 'Safe' : 'Away'}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ms-action-row">
          <div className="ms-help-btn">Request Help</div>
          <div className="ms-ride-btn">Order Ride</div>
        </div>
      </div>
    </div>
  )
}

function AlertsScreen() {
  return (
    <div className="ms ms-alerts">
      <div className="ms-header">
        <span className="ms-back">‹ Back</span>
        <span className="ms-htitle">Safety Alerts</span>
        <span className="ms-live-badge">LIVE</span>
      </div>
      <div className="ms-alert-banner">
        <div className="ms-banner-left">
          <div className="ms-banner-top-row">
            <span className="ms-alert-level">All Clear</span>
            <span className="ms-notif-badge">Monitoring</span>
          </div>
          <div className="ms-alert-oneliner">All signals look normal.</div>
        </div>
        <div className="ms-sig-dots">
          {[['Gait', 'ok'], ['Prox', 'ok'], ['Sound', 'warn']].map(([lbl, s]) => (
            <div key={lbl} className="ms-sig-row">
              <span className="ms-sig-lbl">{lbl}</span>
              <div className={`ms-sig-dot ms-sig-${s}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="ms-tab-bar">
        {['Gait', 'Proximity', 'Sound', 'Log'].map((t, i) => (
          <div key={t} className={`ms-tab ${i === 0 ? 'ms-tab-active' : ''}`}>{t}</div>
        ))}
      </div>
      <div className="ms-gauge-card">
        <div className="ms-gauge-wrap">
          <svg viewBox="0 0 160 160" className="ms-gauge-svg">
            <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
            <circle cx="80" cy="80" r="65" fill="none" stroke="#355E3B" strokeWidth="14"
              strokeDasharray="408.4" strokeDashoffset="359.4"
              strokeLinecap="round" transform="rotate(-90 80 80)" />
          </svg>
          <div className="ms-gauge-center">
            <div className="ms-gauge-num">12%</div>
            <div className="ms-gauge-lbl">impairment</div>
          </div>
        </div>
        <div className="ms-gauge-title">Looking good!</div>
        <div className="ms-gauge-desc">Your walk is steady.</div>
      </div>
    </div>
  )
}

function FriendsScreen() {
  const friends = [
    { init: 'CC', name: 'Collin Chan', sub: 'Active now', inRally: true,  bg: '#355E3B' },
    { init: 'JK', name: 'Jordan Kim',  sub: 'Active now', inRally: true,  bg: '#2a4f2f' },
    { init: 'MR', name: 'Maya R.',     sub: '2h ago',     inRally: false, bg: '#1e3d22' },
    { init: 'RD', name: 'Richard D.',  sub: '5h ago',     inRally: false, bg: '#222' },
  ]
  return (
    <div className="ms ms-friends">
      <div className="ms-header">
        <span className="ms-back">‹ Back</span>
        <span className="ms-htitle">Friends</span>
        <span className="ms-add-btn">+ Add</span>
      </div>
      <div className="ms-search-bar">
        <span className="ms-search-icon">⌕</span>
        <span className="ms-search-ph">Search friends…</span>
      </div>
      <div className="ms-section-lbl">In Your Rally</div>
      <div className="ms-friends-list">
        {friends.map((f, i) => (
          <div key={i} className="ms-friend-row">
            <div className="ms-av" style={{ background: f.bg }}>
              {f.init}
              <div className={`ms-av-dot ${f.inRally ? 'ms-av-dot-on' : ''}`} />
            </div>
            <div className="ms-friend-info">
              <div className="ms-friend-name">{f.name}</div>
              <div className="ms-friend-sub">{f.sub}</div>
            </div>
            {f.inRally && <div className="ms-rally-badge">In your rally</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function RecapScreen() {
  const tl: [string, string, string][] = [
    ['green', '9:00 PM',  'Group met at The Corner'],
    ['amber', '11:30 PM', 'Alex gait hit 87%'],
    ['green', '1:30 AM',  'Everyone home safe'],
  ]
  return (
    <div className="ms ms-recap">
      <div className="ms-header">
        <span className="ms-back">‹ Back</span>
        <span className="ms-htitle">Night Summary</span>
        <span className="ms-share-btn">Share</span>
      </div>
      <div className="ms-rally-nav">
        <span className="ms-nav-btn">‹</span>
        <div className="ms-nav-center">
          <div className="ms-nav-date">Saturday, March 21</div>
          <div className="ms-nav-time">9:00 PM – 1:30 AM · 4h 30m</div>
        </div>
        <span className="ms-nav-btn">›</span>
      </div>
      <div className="ms-stat-grid">
        <div className="ms-stat-box"><div className="ms-stat-val">4h 30m</div><div className="ms-stat-lbl">Time Out</div></div>
        <div className="ms-stat-box"><div className="ms-stat-val">3</div><div className="ms-stat-lbl">Venues</div></div>
        <div className="ms-stat-box ms-stat-safe"><div className="ms-stat-val">All safe</div><div className="ms-stat-lbl">Status</div></div>
      </div>
      <div className="ms-section-lbl">Timeline</div>
      <div className="ms-timeline">
        {tl.map(([color, time, text], i) => (
          <div key={i} className="ms-tl-row">
            <div className="ms-tl-time">{time}</div>
            <div className="ms-tl-dot-col">
              <div className={`ms-tl-dot ms-tl-${color}`} />
              {i < tl.length - 1 && <div className="ms-tl-line" />}
            </div>
            <div className="ms-tl-text">{text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PHONE_SCREENS = [
  <img key="map"     src="/rally-cropped.jpg"           className="phone-screen-img" alt="Live map" />,
  <img key="alerts"  src="/rallyalerts-cropped.jpg"     className="phone-screen-img" alt="Alerts" />,
  <img key="friends" src="/rallyrallyview-cropped.jpg"  className="phone-screen-img" alt="Rally view" />,
  <img key="recap"   src="/rallynightsummary-cropped.jpg" className="phone-screen-img" alt="Night summary" />,
]

/* ─── Phone mockup ─── */
function Phone({ activeScreen }: { activeScreen: number }) {
  return (
    <div className="phone">
      <div className="phone-frame">
<div className="phone-screen">
          {PHONE_SCREENS.map((screen, i) => (
            <div key={i} className={`phone-screen-content ${i === activeScreen ? 'active' : ''}`}>
              {screen}
            </div>
          ))}
        </div>
        <div className="phone-home-bar" />
      </div>
    </div>
  )
}

/* ─── Features scroll section ─── */
const FEATURES = [
  {
    tag: 'Real-Time Location',
    title: 'Always know where your crew is',
    desc: 'See live location pins for every friend in your group, updating as the night unfolds. No more losing each other between venues.',
  },
  {
    tag: 'Safety Check-ins',
    title: 'Automatic alerts when it matters',
    desc: 'Rally monitors activity patterns and sends smart alerts when someone goes quiet or misses a check-in. Discreet, automatic, always on.',
  },
  {
    tag: 'Group Sync',
    title: 'Coordinate without the chaos',
    desc: 'Start a Rally and invite your crew with one tap. Friends get notified instantly, and once they join, everyone is live on the same map with monitoring active for the whole group.',
  },
  {
    tag: 'Night Recap',
    title: 'Relive every moment',
    desc: 'After the night ends, Rally compiles your route, shared moments, and highlights into an automatic story you can revisit.',
  },
]

function FeaturesScroll() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target as HTMLDivElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.55 }
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="features-scroll" id="features">
      <div className="features-sticky-col">
        <Phone activeScreen={active} />
      </div>

      <div className="features-steps-col">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            ref={(el) => { stepRefs.current[i] = el }}
            className={`feature-step ${i === active ? 'step-active' : ''}`}
          >
            <span className="step-tag">{f.tag}</span>
            <h2 className="step-title">{f.title}</h2>
            <p className="step-desc">{f.desc}</p>
            <div className="step-indicator">
              {FEATURES.map((_, j) => (
                <span key={j} className={`dot ${j === active ? 'dot-active' : ''}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Actions (Demo) ─── */
const FORMSPREE_ID = 'maqvndjv'

function Actions() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="actions" id="demo">
      <div className="reveal action-card action-card-centered">
        <div className="action-badge">For Venues &amp; Events</div>
        <h2>Request a demo</h2>
        <p>See how Rally integrates with your venue or event. We'll walk you through everything, tailored to your setup.</p>
        {status === 'success' ? (
          <p className="demo-success">Thanks! We'll be in touch soon.</p>
        ) : (
          <form className="demo-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Work email" required />
            <textarea name="message" placeholder="Tell us about your venue or event" rows={3} />
            {status === 'error' && <p className="demo-error">Something went wrong. Please try again.</p>}
            <button type="submit" className="btn btn-primary full-width" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request a Demo'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ─── Team ─── */
const MEMBERS = [
  { initials: 'TN', name: 'Tyler Nguyen',  company: 'BNSF Railway', location: 'Virginia Beach, VA',  email: 'wgq4tr@virginia.edu', bg: '#1a3d1e', headshot: '/tylerheadshot.jpeg' },
  { initials: 'SM', name: 'Sophia Ma',     company: 'StoneX',        location: 'Charlottesville, VA', email: 'hcd9vc@virginia.edu', bg: '#0f2d12', headshot: '/IMG_1720.JPG', imgStyle: { filter: 'brightness(1.3)' } },
]

function Team() {
  return (
    <section className="team">
      <div className="team-inner reveal">
        <p className="team-eyebrow">Built by UVA students</p>
        <div className="team-cards">
          {MEMBERS.map((m) => (
            <div key={m.email} className="team-card">
              {m.headshot
                ? <img src={m.headshot} className="team-avatar team-avatar-img" alt={m.name} style={(m as any).imgStyle} />
                : <div className="team-avatar" style={{ background: m.bg }}>{m.initials}</div>
              }
              <span className="team-name">{m.name}</span>
              <span className="team-meta">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="5" width="14" height="9" rx="1.5"/><path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5"/>
                </svg>
                {m.company}
              </span>
              <span className="team-meta">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z"/><circle cx="8" cy="6" r="1.5"/>
                </svg>
                {m.location}
              </span>
              <a href={`mailto:${m.email}`} className="team-meta team-email">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/>
                </svg>
                {m.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">Rally</span>
      <p className="footer-copy">© {new Date().getFullYear()} Rally</p>
      <span className="footer-hoohacks">HooHacks 2026</span>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  useScrollReveal()
  return (
    <div className="site">
      <Hero />
      <FeaturesScroll />
      <Actions />
      <Team />
      <Footer />
    </div>
  )
}
