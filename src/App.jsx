import { useEffect, useState } from 'react'
import './App.css'

const LOVER_NAME = 'Mittu'

const OUTLINE = '#3b2420'
const BEAR_FUR = '#c9a084'
const TONGUE = '#ef8a8f'

// Story beats. `ms` = how long the beat lasts before auto-advancing.
const STEPS = [
  { id: 'dark', ms: 3600 },
  { id: 'lights', ms: 3000 },
  { id: 'sing', ms: 3800 },
  { id: 'wish' },
  { id: 'celebrate' },
]

const WISH_LINES = [
  `Happy Birthday meri pyari ${LOVER_NAME} 🎂`,
  'Tum meri life ki sabse pyari gift ho 💝',
  'Har din tumhari smile dekhne ke liye jeeta hu',
  'Tum kush hote ho to mai khush hota hu, hamesha hasti rehna',
  'Hmm pata hai pareshan karta hu tumhe bohot, rulata bhi hu bohot',
  'Bohot ganda hu mai but kaisa bhi hu but tumhara hu',
  'Aaj ka din bas tumhara — khush raho, hasti raho and hamesha meri raho 😘',
  'Meri umra bhi tumhe mile, meri zindagi bhi tumhari ho, meri har khushi tumhare naam ho 💖',
  'Aur haan, cake mai se bada piece mera 😋',
  'Love you forever, Ishuuuu 💜',
]

const rand = (min, max) => min + Math.random() * (max - min)

const BG_HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: rand(0, 100),
  size: rand(12, 30),
  duration: rand(9, 18),
  delay: -rand(0, 18),
  opacity: rand(0.25, 0.6),
}))

const BALLOON_COLORS = ['#ff8fab', '#ffd166', '#9bd0ff', '#c3a6ff', '#ff6b81', '#8ee3c8', '#ffb38a']
const BALLOONS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: 4 + i * 11 + rand(-3, 3),
  color: BALLOON_COLORS[i % BALLOON_COLORS.length],
  duration: rand(9, 14),
  delay: rand(0, 2.5),
  size: rand(48, 72),
}))

const CONFETTI_COLORS = ['#ff6b81', '#ffd166', '#6fc3ff', '#b28dff', '#7ee0b0', '#ff9a5a']
const CONFETTI = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: rand(0, 100),
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  duration: rand(3, 6),
  delay: rand(0, 4),
  spin: rand(360, 1080),
  drift: rand(-60, 60),
  round: i % 3 === 0,
}))

const FIREWORKS = [
  { id: 0, left: 18, top: 22, delay: 0, color: '#ff6b81' },
  { id: 1, left: 80, top: 18, delay: 0.6, color: '#ffd166' },
  { id: 2, left: 50, top: 10, delay: 1.2, color: '#b28dff' },
  { id: 3, left: 30, top: 35, delay: 1.9, color: '#6fc3ff' },
  { id: 4, left: 70, top: 32, delay: 2.5, color: '#7ee0b0' },
]

function Face({ mood, cheek }) {
  const L = 78
  const R = 142
  const Y = 112

  let eyes
  if (mood === 'happy') {
    eyes = [L, R].map((x) => <path key={x} d={`M${x - 10} ${Y + 4} q10 -14 20 0`} fill="none" />)
  } else if (mood === 'sleep') {
    eyes = [L, R].map((x) => <path key={x} d={`M${x - 10} ${Y} q10 8 20 0`} fill="none" />)
  } else if (mood === 'surprised') {
    eyes = [L, R].map((x) => (
      <g key={x} stroke="none">
        <circle cx={x} cy={Y} r="12" fill={OUTLINE} />
        <circle cx={x - 4} cy={Y - 4} r="4.5" fill="#fff" />
        <circle cx={x + 4} cy={Y + 4} r="2" fill="#fff" />
      </g>
    ))
  } else {
    eyes = [L, R].map((x) => <circle key={x} cx={x} cy={Y} r="8" fill={OUTLINE} stroke="none" />)
  }

  let mouth
  if (mood === 'sleep') {
    mouth = <ellipse cx="110" cy="134" rx="5" ry="4" fill={TONGUE} strokeWidth="3" />
  } else if (mood === 'surprised') {
    mouth = <ellipse cx="110" cy="138" rx="9" ry="11" fill={TONGUE} strokeWidth="4" />
  } else if (mood === 'shh') {
    mouth = <path d="M102 132 h16" fill="none" />
  } else {
    mouth = (
      <>
        <path d="M103 128 Q110 150 117 128 Z" fill={TONGUE} strokeWidth="4" />
        <path d="M98 124 q6 8 12 0 q6 8 12 0" fill="none" />
      </>
    )
  }

  const blush = mood === 'happy' || mood === 'surprised'

  return (
    <g>
      <g stroke="none">
        <ellipse cx="54" cy="136" rx="18" ry="13" fill={cheek} />
        <ellipse cx="166" cy="136" rx="18" ry="13" fill={cheek} />
      </g>
      {blush && (
        <g strokeWidth="2.5" stroke="#e0607a">
          <path d="M46 134 l5 -6 M54 134 l5 -6 M62 134 l5 -6" />
          <path d="M158 134 l5 -6 M166 134 l5 -6 M174 134 l5 -6" />
        </g>
      )}
      {eyes}
      {mouth}
    </g>
  )
}

function PartyHat({ x = 110, color = '#ff6b81' }) {
  return (
    <g className="party-hat" style={{ transformOrigin: `${x}px 44px` }}>
      <path d={`M${x - 26} 44 L${x} -16 L${x + 26} 44 Z`} fill={color} />
      <path d={`M${x - 14} 16 L${x + 12} 26 M${x - 20} 32 L${x + 18} 40`} stroke="#fff" strokeWidth="5" />
      <circle cx={x} cy="-18" r="8" fill="#ffd166" />
    </g>
  )
}

function Bear({ mood, arms, hat }) {
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
        <Face mood={mood} cheek="#f3c37f" />
        {hat && <PartyHat color="#6fc3ff" />}
      </g>
    </svg>
  )
}

function Panda({ mood, arms, crown }) {
  return (
    <svg viewBox="0 0 220 240" overflow="visible" className="critter">
      <g stroke={OUTLINE} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <g className={`arm arm-l arm--${arms}`}>
          <ellipse cx="50" cy="186" rx="24" ry="15" fill="#fff" />
        </g>
        <g className={`arm arm-r arm--${arms}`}>
          <ellipse cx="170" cy="186" rx="24" ry="15" fill="#fff" />
        </g>
        <ellipse cx="86" cy="226" rx="17" ry="11" fill={OUTLINE} />
        <ellipse cx="134" cy="226" rx="17" ry="11" fill={OUTLINE} />
        <path d="M62 150 C50 190 56 214 72 222 L148 222 C164 214 170 190 158 150 Z" fill="#fff" />
        <circle cx="46" cy="48" r="26" fill={OUTLINE} />
        <circle cx="176" cy="54" r="24" fill={OUTLINE} />
        <ellipse cx="110" cy="110" rx="90" ry="74" fill="#fff" />
        <g fill={OUTLINE} strokeWidth="3">
          <path d="M110 190 L90 178 L92 200 Z" />
          <path d="M110 190 L130 178 L128 200 Z" />
          <circle cx="110" cy="190" r="6" />
        </g>
        <Face mood={mood} cheek="#f6b8bd" />
        {crown && (
          <g className="crown">
            <path d="M78 46 L84 8 L100 30 L110 2 L120 30 L136 8 L142 46 Z" fill="#ffd166" />
            <circle cx="110" cy="34" r="5" fill="#ff6b81" strokeWidth="3" />
          </g>
        )}
      </g>
    </svg>
  )
}

function Cake({ lit }) {
  return (
    <svg viewBox="0 0 160 150" overflow="visible" className="cake-svg">
      <g stroke={OUTLINE} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="80" cy="138" rx="74" ry="10" fill="#fff" />
        <rect x="16" y="84" width="128" height="52" rx="14" fill="#f6b8bd" />
        <path d="M16 100 q16 14 32 0 q16 14 32 0 q16 14 32 0 q16 14 32 0" fill="none" stroke="#fff" strokeWidth="6" />
        <rect x="32" y="48" width="96" height="40" rx="12" fill="#fff4e6" />
        <path d="M32 62 q12 12 24 0 q12 12 24 0 q12 12 24 0 q12 12 24 0" fill="#ff8fab" />
        {[50, 80, 110].map((x, i) => (
          <g key={x}>
            <rect x={x - 5} y="20" width="10" height="30" rx="3" fill={['#6fc3ff', '#ffd166', '#b28dff'][i]} />
            {lit ? (
              <path
                className="flame"
                style={{ animationDelay: `${i * 0.15}s` }}
                d={`M${x} -6 q-11 16 0 22 q11 -6 0 -22 Z`}
                fill="#ffb02e"
                stroke="#ff7a00"
                strokeWidth="2.5"
              />
            ) : (
              <path className="smoke" d={`M${x} 16 q-6 -8 0 -16 q6 -8 0 -16`} fill="none" stroke="#b9aaaa" strokeWidth="3" />
            )}
          </g>
        ))}
        <circle cx="56" cy="114" r="4" fill="#fff" stroke="none" />
        <circle cx="104" cy="118" r="4" fill="#fff" stroke="none" />
        <path d="M80 110 c-6 -8 -16 0 0 12 c16 -12 6 -20 0 -12 Z" fill="#e0405f" strokeWidth="3" />
      </g>
    </svg>
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

function Typewriter({ lines, speed = 45, startDelay = 1400 }) {
  const full = lines.join('\n')
  const [n, setN] = useState(0)
  useEffect(() => {
    let i = 0
    let t = setTimeout(function tick() {
      i += 1
      setN(i)
      if (i < full.length) t = setTimeout(tick, speed)
    }, startDelay)
    return () => clearTimeout(t)
  }, [full, speed, startDelay])
  return (
    <pre className="letter-text">
      {full.slice(0, n)}
      <span className="caret" />
    </pre>
  )
}

export default function App() {
  const [stepIdx, setStepIdx] = useState(0)
  const [runKey, setRunKey] = useState(0)
  const step = STEPS[stepIdx].id
  const after = (id) => stepIdx >= STEPS.findIndex((s) => s.id === id)

  useEffect(() => {
    const ms = STEPS[stepIdx].ms
    if (!ms) return
    const t = setTimeout(() => setStepIdx((i) => i + 1), ms)
    return () => clearTimeout(t)
  }, [stepIdx])

  const replay = () => {
    setStepIdx(0)
    setRunKey((k) => k + 1)
  }

  const bear = {
    dark: { mood: 'shh', arms: 'carry', x: 26, walking: true, bubble: 'Utho meri pyari ....' },
    lights: { mood: 'happy', arms: 'carry', x: 32, bubble: 'SURPRISE!! 🎉' },
    sing: { mood: 'happy', arms: 'carry', x: 32, bubble: 'Happy Birthday meri jaan 🎂' },
    wish: { mood: 'happy', arms: 'cheer', x: 22, bubble: 'Wish maango 🙏' },
    celebrate: { mood: 'happy', arms: 'cheer', x: 36, bubble: 'Love you ishuuuu ❤️' },
  }[step]

  const panda = {
    dark: { mood: 'sleep', arms: 'rest', bubble: 'Zzz... 💤' },
    lights: { mood: 'surprised', arms: 'up', bubble: 'Kyaaa?! 😳' },
    sing: { mood: 'happy', arms: 'rest', bubble: 'Awww 🥹💕' },
    wish: { mood: 'sleep', arms: 'pray', bubble: '✨ Wish... ✨' },
    celebrate: { mood: 'happy', arms: 'up', bubble: 'Thank you jaan 💖' },
  }[step]

  const cakeCentered = after('wish')

  return (
    <div className={`page page--${step}`} key={runKey}>
      <div className="night" />
      <div className="sparkles" aria-hidden="true">
        {BG_HEARTS.map((h) => (
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

      {after('lights') && (
        <>
          <div className="bunting" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length], animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
          <div className="balloons" aria-hidden="true">
            {BALLOONS.map((b) => (
              <span
                key={b.id}
                className="balloon"
                style={{
                  left: `${b.left}%`,
                  width: `${b.size}px`,
                  height: `${b.size * 1.2}px`,
                  '--c': b.color,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {step === 'celebrate' && (
        <>
          <div className="confetti" aria-hidden="true">
            {CONFETTI.map((c) => (
              <span
                key={c.id}
                style={{
                  left: `${c.left}%`,
                  background: c.color,
                  borderRadius: c.round ? '50%' : '2px',
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                  '--spin': `${c.spin}deg`,
                  '--drift': `${c.drift}px`,
                }}
              />
            ))}
          </div>
          <div className="fireworks" aria-hidden="true">
            {FIREWORKS.map((f) => (
              <span key={f.id} className="firework" style={{ left: `${f.left}%`, top: `${f.top}%`, '--c': f.color, animationDelay: `${f.delay}s` }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} style={{ '--a': `${i * 30}deg` }} />
                ))}
              </span>
            ))}
          </div>
        </>
      )}

      <header className="heading">
        {after('lights') ? (
          <h1 className="title">
            {'Happy Birthday'.split('').map((ch, i) => (
              <span key={i} className="wave-letter" style={{ animationDelay: `${i * 0.07}s` }}>
                {ch === ' ' ? '\u00a0' : ch}
              </span>
            ))}
            <br />
            <span className="accent">{LOVER_NAME}</span> 🎂
          </h1>
        ) : (
          <h1 className="title title--dim"></h1>
        )}
      </header>

      <section className={`stage stage--${step}`}>
        <div className="ground" />

        <div className={`actor bear ${bear.walking ? 'is-walking' : ''}`} style={{ left: `${bear.x}%` }}>
          <Bubble text={bear.bubble} side="left" />
          <div className="body-wrap">
            <Bear mood={bear.mood} arms={bear.arms} hat={after('lights')} />
          </div>
        </div>

        <div className={`actor panda panda--${step}`} style={{ left: step === 'celebrate' ? '64%' : '72%' }}>
          <Bubble text={panda.bubble} side="right" />
          {step === 'dark' && <span className="zzz">💤</span>}
          <div className="body-wrap">
            <Panda mood={panda.mood} arms={panda.arms} crown={after('sing')} />
          </div>
        </div>

        <div
          className={`cake ${cakeCentered ? 'cake--table' : ''} ${bear.walking ? 'is-walking' : ''}`}
          style={{ left: cakeCentered ? '50%' : `${bear.x + 14}%` }}
        >
          <Cake lit={step !== 'celebrate'} />
        </div>
      </section>

      <footer className="controls">
        {step === 'wish' && (
          <button type="button" className="blow-btn" onClick={() => setStepIdx(STEPS.length - 1)}>
            Wish maango &amp; phoonk maaro 🌬️🕯️
          </button>
        )}
        {step === 'celebrate' && (
          <div className="letter">
            <Typewriter lines={WISH_LINES} />
            <button type="button" className="skip-btn" onClick={replay}>
              ↺ Phir se dekho
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}
