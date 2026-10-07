import { useEffect, useRef, useState } from 'react'
import './App.css'

const LOVER_NAME = 'Mittu'

const OUTLINE = '#3b2420'
const BEAR_FUR = '#c9a084'
const TONGUE = '#ef8a8f'

// Story beats. `ms` = how long the beat lasts before auto-advancing.
const STEPS = [
  { id: 'intro', ms: 2600 },
  { id: 'enter', ms: 3200 },
  { id: 'sorry', ms: 3600 },
  { id: 'flower', ms: 3600 },
  { id: 'plead', ms: 3800 },
  { id: 'question' },
]

const PLEAS = [
  'Kar do na maaf? 🥺',
  'Please? 🥺',
  'Mittu please? 🥹',
  'Meri malkin please? 😭',
  'Shopping karwaunga naa 🛍️',
  'Ham makeup bhi lenge ab to man jao 🥺💄',
]

const NO_LABELS = ['Nahii', 'Abhi bhi nahi', 'Nope', 'Soch rahi hu', 'Hmm...', 'Bilkul nahi']

function Face({ mood, cheek, tears }) {
  const L = 78
  const R = 142
  const Y = 112

  let eyes
  switch (mood) {
    case 'plead':
      eyes = [L, R].map((x) => (
        <g key={x} stroke="none">
          <circle cx={x} cy={Y} r="13" fill={OUTLINE} />
          <circle cx={x - 4} cy={Y - 5} r="5" fill="#fff" />
          <circle cx={x + 5} cy={Y + 4} r="2.4" fill="#fff" />
        </g>
      ))
      break
    case 'angry':
      eyes = (
        <>
          <path d={`M${L - 13} ${Y - 14} L${L + 10} ${Y - 6}`} />
          <path d={`M${R + 13} ${Y - 14} L${R - 10} ${Y - 6}`} />
          <path d={`M${L - 10} ${Y + 2} q10 6 20 0`} fill="none" />
          <path d={`M${R - 10} ${Y + 2} q10 6 20 0`} fill="none" />
        </>
      )
      break
    case 'peek':
      eyes = (
        <>
          <path d={`M${L - 12} ${Y - 12} L${L + 8} ${Y - 8}`} />
          <circle cx={L - 5} cy={Y} r="8" fill={OUTLINE} stroke="none" />
          <path d={`M${R - 10} ${Y + 2} q10 6 20 0`} fill="none" />
        </>
      )
      break
    case 'happy':
      eyes = [L, R].map((x) => (
        <path key={x} d={`M${x - 10} ${Y + 4} q10 -14 20 0`} fill="none" />
      ))
      break
    default:
      eyes = [L, R].map((x) => (
        <circle key={x} cx={x} cy={Y} r="8" fill={OUTLINE} stroke="none" />
      ))
  }

  let mouth
  switch (mood) {
    case 'angry':
      mouth = <path d="M100 136 q10 -9 20 0" fill="none" />
      break
    case 'peek':
      mouth = <path d="M102 134 h16" fill="none" />
      break
    case 'nervous':
      mouth = <path d="M96 132 q3.5 -5 7 0 t7 0 t7 0 t7 0" fill="none" strokeWidth="4" />
      break
    case 'plead':
      mouth = <path d="M101 136 q9 -10 18 0" fill="none" strokeWidth="5" />
      break
    case 'soften':
      mouth = <path d="M100 126 q5 7 10 0 q5 7 10 0" fill="none" />
      break
    default:
      mouth = (
        <>
          <path d="M103 128 Q110 150 117 128 Z" fill={TONGUE} strokeWidth="4" />
          <path d="M98 124 q6 8 12 0 q6 8 12 0" fill="none" />
        </>
      )
  }

  const blush = mood === 'soften' || mood === 'happy'
  const cheekFill = mood === 'angry' ? '#f27f7f' : cheek

  return (
    <g className={`face face--${mood}`}>
      <g stroke="none" className={mood === 'angry' ? 'puff' : ''}>
        <ellipse cx="54" cy="136" rx="18" ry="13" fill={cheekFill} />
        <ellipse cx="166" cy="136" rx="18" ry="13" fill={cheekFill} />
      </g>
      {blush && (
        <g strokeWidth="2.5" stroke="#e0607a" className="blush-lines">
          <path d="M46 134 l5 -6 M54 134 l5 -6 M62 134 l5 -6" />
          <path d="M158 134 l5 -6 M166 134 l5 -6 M174 134 l5 -6" />
        </g>
      )}
      {eyes}
      {mouth}
      {tears && mood === 'plead' && (
        <g stroke="none" fill="#8fd3ff">
          <path className="tear" d={`M${L} ${Y + 14} q-6 10 0 14 q6 -4 0 -14 Z`} />
          <path className="tear tear--late" d={`M${R} ${Y + 14} q-6 10 0 14 q6 -4 0 -14 Z`} />
        </g>
      )}
      {mood === 'nervous' && (
        <path
          className="sweat"
          d="M196 70 q-10 14 0 20 q10 -6 0 -20 Z"
          fill="#9bd8ff"
          strokeWidth="3"
        />
      )}
    </g>
  )
}

function Rose() {
  return (
    <g className="rose">
      <path d="M184 176 L214 122" stroke="#3f8f4a" strokeWidth="5" />
      <path d="M200 150 q16 -8 20 4 q-12 7 -20 -4 Z" fill="#7ccf7f" strokeWidth="3" />
      <circle cx="218" cy="112" r="16" fill="#ef5b72" strokeWidth="4" />
      <path d="M211 112 q7 -10 14 0 q-7 7 -11 0" fill="none" strokeWidth="3" />
      <ellipse cx="184" cy="176" rx="10" ry="9" fill={BEAR_FUR} />
    </g>
  )
}

function Bear({ mood, arms, tears }) {
  return (
    <svg viewBox="0 0 220 240" overflow="visible" className="critter">
      <g stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <g className={`arm arm-l arm--${arms}`}>
          <ellipse cx="50" cy="182" rx="24" ry="15" fill={BEAR_FUR} />
        </g>
        <g className={`arm arm-r arm--${arms}`}>
          <ellipse cx="170" cy="182" rx="24" ry="15" fill={BEAR_FUR} />
        </g>
        <path
          d="M62 150 C48 190 52 214 68 226 L96 226 C100 216 120 216 124 226 L152 226 C168 214 172 190 158 150 Z"
          fill={BEAR_FUR}
        />
        <circle cx="50" cy="52" r="25" fill={BEAR_FUR} />
        <circle cx="50" cy="52" r="12" fill={OUTLINE} stroke="none" />
        <circle cx="170" cy="52" r="25" fill={BEAR_FUR} />
        <circle cx="170" cy="52" r="12" fill={OUTLINE} stroke="none" />
        <ellipse cx="110" cy="110" rx="90" ry="74" fill={BEAR_FUR} />
        <Face mood={mood} cheek="#f3c37f" tears={tears} />
        {arms === 'flower' && <Rose />}
      </g>
    </svg>
  )
}

function Panda({ mood, arms }) {
  const crossed = arms === 'crossed'
  return (
    <svg viewBox="0 0 220 240" overflow="visible" className="critter">
      <g stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        {!crossed && (
          <>
            <g className={`arm arm-l arm--${arms}`}>
              <ellipse cx="50" cy="186" rx="24" ry="15" fill="#fff" />
            </g>
            <g className={`arm arm-r arm--${arms}`}>
              <ellipse cx="170" cy="186" rx="24" ry="15" fill="#fff" />
            </g>
          </>
        )}
        <ellipse cx="86" cy="226" rx="17" ry="11" fill={OUTLINE} />
        <ellipse cx="134" cy="226" rx="17" ry="11" fill={OUTLINE} />
        <path
          d="M62 150 C50 190 56 214 72 222 L148 222 C164 214 170 190 158 150 Z"
          fill="#fff"
        />
        <circle cx="46" cy="48" r="26" fill={OUTLINE} />
        <circle cx="176" cy="54" r="24" fill={OUTLINE} />
        <ellipse cx="110" cy="110" rx="90" ry="74" fill="#fff" />
        <g fill={OUTLINE} strokeWidth="3">
          <path d="M110 190 L90 178 L92 200 Z" />
          <path d="M110 190 L130 178 L128 200 Z" />
          <circle cx="110" cy="190" r="6" />
        </g>
        {crossed && (
          <g className="crossed">
            <ellipse cx="94" cy="206" rx="30" ry="13" fill="#fff" transform="rotate(-12 94 206)" />
            <ellipse cx="126" cy="206" rx="30" ry="13" fill="#fff" transform="rotate(12 126 206)" />
          </g>
        )}
        <Face mood={mood} cheek="#f6b8bd" />
      </g>
    </svg>
  )
}

const BG_HEARTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 12 + Math.random() * 22,
  duration: 9 + Math.random() * 10,
  delay: -Math.random() * 18,
  opacity: 0.25 + Math.random() * 0.4,
}))

const BURST = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2
  const dist = 110 + Math.random() * 90
  return {
    id: i,
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist - 60,
    delay: Math.random() * 0.3,
    emoji: ['💖', '💕', '💗', '💜', '❤️'][i % 5],
  }
})

function FloatingHearts() {
  const hearts = BG_HEARTS
  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

function HeartBurst() {
  const pieces = BURST
  return (
    <div className="burst" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function Bubble({ text, side }) {
  if (!text) return null
  return (
    <div key={text} className={`bubble bubble--${side}`}>
      {text}
    </div>
  )
}

function RunawayButton({ label, onDodge }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const dodge = () => {
    const el = ref.current
    if (!el) return
    const pad = 16
    const rect = el.getBoundingClientRect()
    const originLeft = rect.left - pos.x
    const originTop = rect.top - pos.y
    const yes = document.querySelector('.yes-btn')?.getBoundingClientRect()

    const bad = (nx, ny) => {
      const l = originLeft + nx
      const t = originTop + ny
      const r = l + rect.width
      const b = t + rect.height
      if (l < pad || t < pad || r > window.innerWidth - pad || b > window.innerHeight - pad) return true
      if (!yes) return false
      return !(r + 16 < yes.left || l > yes.right + 16 || b + 16 < yes.top || t > yes.bottom + 16)
    }

    let nx = 0
    let ny = 0
    for (let i = 0; i < 40; i++) {
      nx = (Math.random() * 2 - 1) * (window.innerWidth / 2 - rect.width)
      ny = (Math.random() * 2 - 1) * 160
      if (!bad(nx, ny)) break
    }
    setPos({ x: nx, y: ny })
    onDodge()
  }

  return (
    <button
      ref={ref}
      type="button"
      className="no-btn"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseEnter={dodge}
      onClick={dodge}
    >
      {label}
    </button>
  )
}

export default function App() {
  const [stepIdx, setStepIdx] = useState(0)
  const [forgiven, setForgiven] = useState(false)
  const [pleaIdx, setPleaIdx] = useState(0)
  const [runKey, setRunKey] = useState(0)

  const step = forgiven ? 'forgiven' : STEPS[stepIdx].id

  useEffect(() => {
    const ms = STEPS[stepIdx].ms
    if (forgiven || !ms) return
    const t = setTimeout(() => setStepIdx((i) => i + 1), ms)
    return () => clearTimeout(t)
  }, [stepIdx, forgiven])

  const replay = () => {
    setForgiven(false)
    setPleaIdx(0)
    setStepIdx(0)
    setRunKey((k) => k + 1)
  }

  const bear = {
    intro: { mood: 'nervous', arms: 'fidget', x: -30, bubble: null },
    enter: { mood: 'nervous', arms: 'fidget', x: 24, walking: true, bubble: `${LOVER_NAME}... 👉👈` },
    sorry: { mood: 'plead', arms: 'fidget', x: 26, bubble: "I'm sorry jaan 🥺" },
    flower: { mood: 'nervous', arms: 'flower', x: 30, bubble: 'Ye aapke liye 🌹' },
    plead: { mood: 'plead', arms: 'flower', x: 30, tears: true, bubble: 'Maaf kar do na please 🥺' },
    question: { mood: 'plead', arms: 'flower', x: 30, tears: pleaIdx > 0, bubble: PLEAS[pleaIdx] },
    forgiven: { mood: 'happy', arms: 'hand', x: 38, bubble: 'Love you ❤️' },
  }[step]

  const panda = {
    intro: { mood: 'angry', arms: 'crossed', bubble: 'Hmph! 😤', fx: '💢' },
    enter: { mood: 'angry', arms: 'crossed', bubble: null, fx: '💢' },
    sorry: { mood: 'angry', arms: 'crossed', bubble: 'Baat mat karo! 😤', fx: '💢', shake: true },
    flower: { mood: 'peek', arms: 'crossed', bubble: '...', fx: null },
    plead: { mood: 'soften', arms: 'crossed', bubble: 'Hmm... 🙄', fx: null },
    question: { mood: 'soften', arms: 'crossed', bubble: 'Soch rahi hu... 🤔', fx: null },
    forgiven: { mood: 'happy', arms: 'hand', bubble: 'Chalo maaf kiya 💕', fx: null },
  }[step]

  return (
    <div className="page" key={runKey}>
      <FloatingHearts />

      <header className="heading">
        {forgiven ? (
          <>
            <h1 className="title">
              Thank you, <span className="accent">{LOVER_NAME}</span> 💜
            </h1>
            <p className="subtitle">I love you Ishuuuuuuuu ❤️</p>
          </>
        ) : (
          <h1 className="title">
            I&apos;m <span className="accent">Sorry</span>, {LOVER_NAME}
          </h1>
        )}
      </header>

      <section className={`stage stage--${step}`}>
        <div className="ground" />

        <div
          className={`actor bear ${bear.walking ? 'is-walking' : ''}`}
          style={{ left: `${bear.x}%` }}
        >
          <Bubble text={bear.bubble} side="left" />
          <div className="body-wrap">
            <Bear mood={bear.mood} arms={bear.arms} tears={bear.tears} />
          </div>
        </div>

        <div
          className={`actor panda panda--${panda.mood} ${panda.shake ? 'is-shaking' : ''}`}
          style={{ left: forgiven ? '62%' : '72%' }}
        >
          <Bubble text={panda.bubble} side="right" />
          {panda.fx && <span className="fx">{panda.fx}</span>}
          <div className="body-wrap">
            <Panda mood={panda.mood} arms={panda.arms} />
          </div>
        </div>

        {forgiven && (
          <>
            <HeartBurst />
            <span className="kiss" aria-hidden="true">💋</span>
            <span className="big-heart" aria-hidden="true">💞</span>
          </>
        )}
      </section>

      <footer className="controls">
        {step === 'question' && (
          <div className="actions">
            <button type="button" className="yes-btn" onClick={() => setForgiven(true)}>
              Kar diya maaf 💜
            </button>
            <RunawayButton
              label={NO_LABELS[pleaIdx]}
              onDodge={() => setPleaIdx((i) => Math.min(i + 1, PLEAS.length - 1))}
            />
          </div>
        )}
        {!forgiven && step !== 'question' && (
          <button type="button" className="skip-btn" onClick={() => setStepIdx(STEPS.length - 1)}>
            Skip ›
          </button>
        )}
        {forgiven && (
          <button type="button" className="skip-btn" onClick={replay}>
            ↺ Phir se dekho
          </button>
        )}
      </footer>
    </div>
  )
}
