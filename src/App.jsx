import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const LOVER_NAME = 'Mittu'

const NOTE_LINES = [
  `Meri pyari ${LOVER_NAME},`,
  '',
  'Mujhe meri galti ka ehasas hai , mujhe us time tumhare sath hona chahiye tha',
  'But kya karu na jane ho gayi galti mujse jaan',
  'Subha se kuch karne ka man bhi nahi kiya kal se aapsee thik se baat bhi hue,',
  'Pata hai man mai ye sun ke tum bologe ki "ha ab ye bhi meri galti 😅"',
  'But apko is mood mai nahi dekh sakhta, to socha isbar kuch new tarike se apko manaya jaye',
  'itna website design karni nahi ati hame but ye banaya hai apke liye' ,
  'bas end mai yahi kahunga ki kar dijiye na maf jaan apne prajyot ko.',
  'Sorry miss evee 💜',
]

function Typewriter({ lines, speed = 38, startDelay = 400 }) {
  const [text, setText] = useState('')
  const full = useMemo(() => lines.join('\n'), [lines])

  useEffect(() => {
    let i = 0
    let cancelled = false
    const start = setTimeout(function tick() {
      if (cancelled) return
      i += 1
      setText(full.slice(0, i))
      if (i < full.length) setTimeout(tick, speed)
    }, startDelay)
    return () => {
      cancelled = true
      clearTimeout(start)
    }
  }, [full, speed, startDelay])

  return (
    <pre className="note-text">
      {text}
      <span className="caret" />
    </pre>
  )
}

function FloatingHearts({ count = 24 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 28,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [count]
  )

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

function RunawayButton({ messages }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)

  const dodge = () => {
    const pad = 24
    const w = window.innerWidth
    const rect = ref.current?.getBoundingClientRect()
    const bw = rect?.width ?? 140
    const maxX = Math.max(40, (w - bw) / 2 - pad)
    const nx = (Math.random() * 2 - 1) * maxX
    const ny = (Math.random() * 2 - 1) * 120 - 20
    setPos({ x: nx, y: ny })
    setIdx((i) => Math.min(i + 1, messages.length - 1))
  }

  return (
    <button
      ref={ref}
      type="button"
      className="no-btn runaway"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseEnter={dodge}
      onClick={dodge}
    >
      {messages[idx]}
    </button>
  )
}

export default function App() {
  const [forgiven, setForgiven] = useState(false)

  const noMessages = [
    'Nahii',
    'Please?',
    'Mittu please?',
    'Meri malkin please?',
    'Shopping karwaunga naa',
    'Ham makeup bhi lenge ab to man jao 🥺',
  ]

  return (
    <div className="page">
      <FloatingHearts />

      <main className={`card ${forgiven ? 'card--soft' : ''}`}>
        {!forgiven ? (
          <>
            <h1 className="title">
              I'm <span className="title-accent">Sorry</span>, {LOVER_NAME}
            </h1>

            <div className="note">
              <Typewriter lines={NOTE_LINES} />
            </div>

            <div className="actions">
              <button
                type="button"
                className="yes-btn"
                onClick={() => setForgiven(true)}
              >
                Kardiya maf 💜
              </button>
              <RunawayButton messages={noMessages} />
            </div>
          </>
        ) : (
          <div className="thanks">
            <div className="big-heart">💜</div>
            <h1 className="title">Thank you, {LOVER_NAME}</h1>
            <p className="thanks-text">
             I love you Ishuuuuuuuu ❤️.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
