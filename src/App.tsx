import { useEffect, useRef, useState } from 'react'
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
      <div className="hero-video-bg">
        {/* Replace this div with <video autoPlay muted loop playsInline> */}
        <div className="video-slot hero-slot" />
      </div>
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
            <a href="#download" className="btn btn-primary">Download App</a>
            <a href="#demo" className="btn btn-ghost">Request Demo</a>
          </div>
        </div>
        <div className="hero-video-right">
          {/* Replace with <video autoPlay muted loop playsInline> */}
          <div className="video-slot hero-video-slot" />
        </div>
      </div>
      <a href="#features" className="scroll-hint" aria-label="Scroll down">
        <span className="scroll-arrow" />
      </a>
    </section>
  )
}

/* ─── Phone mockup ─── */
interface PhoneProps {
  activeScreen: number
  screens: { color: string; label: string }[]
}

function Phone({ activeScreen, screens }: PhoneProps) {
  return (
    <div className="phone">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          {screens.map((s, i) => (
            <div
              key={i}
              className={`phone-screen-content ${i === activeScreen ? 'active' : ''}`}
              style={{ '--accent': s.color } as React.CSSProperties}
            >
              {/* Replace with actual app screenshot */}
              <div className="app-screen-placeholder">
                <div className="app-screen-label">{s.label}</div>
                <div className="app-screen-dots">
                  <span /><span /><span />
                </div>
              </div>
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
    color: '#355E3B',
    label: 'Live Map',
  },
  {
    tag: 'Safety Check-ins',
    title: 'Automatic alerts when it matters',
    desc: 'Rally monitors activity patterns and sends smart alerts when someone goes quiet or misses a check-in. Discreet, automatic, always on.',
    color: '#2a4f2f',
    label: 'Check-in',
  },
  {
    tag: 'Group Sync',
    title: 'Coordinate without the chaos',
    desc: 'Built-in session chat, venue suggestions, and meetup pins tied to your live night-out group. One place for everything.',
    color: '#1e3d22',
    label: 'Group Chat',
  },
  {
    tag: 'Night Recap',
    title: 'Relive every moment',
    desc: 'After the night ends, Rally compiles your route, shared moments, and highlights into an automatic story you can revisit.',
    color: '#142817',
    label: 'Recap',
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
        <Phone activeScreen={active} screens={FEATURES} />
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

/* ─── Actions (Download + Demo) ─── */
function Actions() {
  return (
    <section className="actions" id="download">
      <div className="actions-grid">
        <div className="reveal action-card" id="demo">
          <div className="action-badge">Free Download</div>
          <h2>Rally is live</h2>
          <p>Available on iOS and Android. Join thousands of people already using Rally on their nights out.</p>
          <div className="store-row">
            <button className="store-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </button>
            <button className="store-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M3.18 23.76c.3.17.64.2.96.09l.09-.06 11.29-6.52-2.45-2.45-9.89 8.94zM.54 1.52C.2 1.86 0 2.38 0 3.07v17.86c0 .7.2 1.21.55 1.55l.08.07 9.99-9.99v-.23L.62 1.45l-.08.07zM19.37 9.32l-2.8-1.62-2.73 2.73 2.73 2.73 2.81-1.62c.8-.46.8-1.22-.01-1.22zM4.14.24l11.29 6.52-2.45 2.45L3.09.27 3.18.21c.31-.11.65-.09.96.03z"/>
              </svg>
              Google Play
            </button>
          </div>
        </div>

        <div className="reveal action-card" style={{ animationDelay: '0.12s' }}>
          <div className="action-badge">For Venues &amp; Events</div>
          <h2>Request a demo</h2>
          <p>See how Rally integrates with your venue or event. We'll walk you through everything, tailored to your setup.</p>
          <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Work email" required />
            <textarea placeholder="Tell us about your venue or event" rows={3} />
            <button type="submit" className="btn btn-primary full-width">Request a Demo</button>
          </form>
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
      <p className="footer-copy">© {new Date().getFullYear()} Rally. All rights reserved.</p>
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
      <Footer />
    </div>
  )
}
