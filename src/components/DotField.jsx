import { useEffect, useRef } from 'react'

/**
 * Canvas "comment field". Each dot is one customer comment. The same dots
 * move between four modes so the motion explains the product:
 *   scatter -> cluster -> weigh -> decide
 * All numbers are fictional sample data for this concept.
 */
export const THEMES = [
  { label: 'Onboarding is confusing', count: 742, color: '#9fb39a' },
  { label: 'Exports time out', count: 511, color: '#8fa3b8' },
  { label: 'Pricing page unclear', count: 368, color: '#d8c39a' },
  { label: 'Teams want SSO', count: 221, color: '#c98d76' },
]
const TOTAL = THEMES.reduce((s, t) => s + t.count, 0)
const SIGNAL = '#ff5a1f'
const BONE = '236,231,220'

function rand(seed) {
  // small deterministic PRNG so layouts are stable between renders
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function layout(mode, W, H, dots, compact) {
  const pad = compact ? 18 : 28
  if (mode === 'scatter') {
    for (const d of dots) { d.tx = pad + d.r1 * (W - pad * 2); d.ty = pad + d.r2 * (H - pad * 2) }
    return []
  }
  if (mode === 'cluster') {
    const pos = compact
      ? [[0.3, 0.32], [0.72, 0.3], [0.3, 0.74], [0.72, 0.74]]
      : [[0.3, 0.32], [0.72, 0.28], [0.32, 0.74], [0.74, 0.72]]
    const base = Math.min(W, H) * (compact ? 0.15 : 0.17)
    const groups = THEMES.map((t, k) => ({
      k, x: pos[k][0] * W, y: pos[k][1] * H, r: base * Math.sqrt(t.count / THEMES[0].count), text: t.label.toUpperCase(),
    }))
    for (const d of dots) {
      const L = groups[d.k], a = d.r1 * Math.PI * 2, rr = Math.pow(d.r2, 0.55) * L.r
      d.tx = L.x + Math.cos(a) * rr; d.ty = L.y + Math.sin(a) * rr
    }
    return groups.map(l => ({ x: l.x, y: l.y - l.r - 14, text: l.text, align: 'center' }))
  }
  if (mode === 'weigh') {
    // clusters side by side, sized by volume, on a shared baseline
    const gap = compact ? 10 : 18
    const radii = THEMES.map(t => Math.sqrt(t.count / THEMES[0].count))
    const scale = Math.min((W - pad * 2 - gap * 3) / radii.reduce((s, r) => s + r * 2, 0), H * 0.3)
    const used = radii.reduce((s, r) => s + r * 2 * scale, 0) + gap * 3
    let x = (W - used) / 2
    const base = H * 0.64
    const groups = THEMES.map((t, k) => {
      const r = radii[k] * scale
      const cx = x + r; x += r * 2 + gap
      return { k, x: cx, y: base - r, r, count: t.count }
    })
    for (const d of dots) {
      const L = groups[d.k], a = d.r1 * Math.PI * 2, rr = Math.sqrt(d.r2) * L.r
      d.tx = L.x + Math.cos(a) * rr; d.ty = L.y + Math.sin(a) * rr
    }
    return groups.map(l => ({ x: l.x, y: base + 30, text: String(l.count), align: 'center', big: true }))
  }
  // decide: a ranked list; bar length follows mention count
  const top = H * 0.2
  const rowH = (H * 0.64) / THEMES.length
  const maxLen = W - pad * 2
  const rows = THEMES.map((t, k) => ({ k, y: top + k * rowH, len: maxLen * (t.count / THEMES[0].count) }))
  for (const d of dots) {
    const L = rows[d.k]
    d.tx = pad + d.r1 * L.len
    d.ty = L.y + 22 + (d.r2 - 0.5) * (compact ? 12 : 18)
  }
  return rows.map((l, k) => ({ x: pad, y: l.y, text: `${String(k + 1).padStart(2, '0')}  ${THEMES[k].label.toUpperCase()}`, align: 'left', hot: k === 0 }))
}

export default function DotField({ mode = 'cluster', className = '', label = 'Illustration: customer comments grouping into themes' }) {
  const ref = useRef(null)
  const state = useRef({ mode, labels: [], labelAlpha: 0, dirty: true })

  useEffect(() => {
    state.current.mode = mode
    state.current.dirty = true
  }, [mode])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const S = state.current
    let W = 0, H = 0, dots = [], raf = 0, visible = true, lastMode = null, compact = false

    function build() {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.max(1, r.width); H = Math.max(1, r.height)
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      compact = W < 520
      const n = compact ? 620 : 1600
      const rnd = rand(7)
      const prev = dots
      dots = Array.from({ length: n }, (_, i) => {
        // assign dots to themes in proportion to their mention counts
        const f = ((i + 0.5) / n) * TOTAL
        let acc = 0, k = 0
        for (; k < THEMES.length - 1; k++) { acc += THEMES[k].count; if (f <= acc) break }
        const p = prev[i]
        return { k, r1: rnd(), r2: rnd(), ph: rnd() * 6.283, s: 0.7 + rnd() * 1.3, x: p ? p.x : rnd() * W, y: p ? p.y : rnd() * H, tx: 0, ty: 0 }
      })
      lastMode = null
    }

    function draw(now) {
      if (S.mode !== lastMode) {
        S.labels = layout(S.mode, W, H, dots, compact)
        S.labelAlpha = 0
        lastMode = S.mode
        if (reduce) for (const d of dots) { d.x = d.tx; d.y = d.ty }
      }
      ctx.clearRect(0, 0, W, H)
      const ease = reduce ? 1 : 0.055
      const tint = S.mode !== 'scatter'
      const wob = reduce ? 0 : 1.6
      let settle = 0
      for (const d of dots) {
        d.x += (d.tx - d.x) * ease
        d.y += (d.ty - d.y) * ease
        settle += Math.abs(d.tx - d.x) + Math.abs(d.ty - d.y)
        const x = d.x + Math.sin(now * 0.0009 + d.ph) * wob
        const y = d.y + Math.cos(now * 0.0011 + d.ph) * wob
        ctx.fillStyle = !tint ? `rgba(${BONE},${0.28 + d.r2 * 0.4})` : S.mode === 'decide' && d.k === 0 ? SIGNAL : THEMES[d.k].color
        ctx.beginPath(); ctx.arc(x, y, d.s, 0, 6.283); ctx.fill()
      }
      const target = settle / dots.length < 6 ? 1 : 0
      S.labelAlpha += (target - S.labelAlpha) * (reduce ? 1 : 0.08)
      if (S.labelAlpha > 0.01) {
        ctx.globalAlpha = S.labelAlpha
        for (const l of S.labels) {
          ctx.textAlign = l.align
          ctx.fillStyle = l.hot ? SIGNAL : l.big ? 'rgba(236,231,220,.95)' : 'rgba(236,231,220,.8)'
          ctx.font = l.big ? `600 ${compact ? 15 : 20}px "Geist Mono Variable", monospace` : `500 ${compact ? 9.5 : 11}px "Geist Mono Variable", monospace`
          ctx.fillText(l.text, l.x, l.y)
        }
        ctx.globalAlpha = 1
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    build()
    const ro = new ResizeObserver(() => { build(); draw(performance.now()) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    let poll = 0
    if (reduce) {
      // no animation loop: redraw only when the mode changes
      poll = window.setInterval(() => { if (S.dirty) { S.dirty = false; draw(performance.now()) } }, 150)
    } else {
      raf = requestAnimationFrame(draw)
    }
    if (document.fonts) document.fonts.ready.then(() => { S.dirty = true; lastMode = null })
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.clearInterval(poll) }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <span className="sr-only">{label}</span>
    </div>
  )
}
