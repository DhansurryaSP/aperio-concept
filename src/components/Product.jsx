import { Reveal } from './Reveal'

const quotes = [
  { text: 'I clicked export twice and nothing came. Ended up copying the table by hand.', src: 'Support ticket', when: '2 days ago' },
  { text: 'CSV download just spins forever on anything over a few thousand rows.', src: 'App review · 2★', when: '5 days ago' },
  { text: 'Our finance lead won’t sign off until exports are reliable.', src: 'Sales call note', when: '1 week ago' },
]

function Spark() {
  // fictional 30-day mention trend
  const pts = [4, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 11, 10, 12, 11, 14, 13, 15, 17, 16, 18, 20, 19, 22, 21, 24, 26, 25, 28, 31]
  const w = 280, h = 64, max = 32
  const d = pts.map((v, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1)) * w},${h - (v / max) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-16 w-full overflow-visible" role="img" aria-label="Mentions rising over the last 30 days (sample data)">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="rgba(143,163,184,.18)" />
      <path d={d} fill="none" stroke="#5f7489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      
    </svg>
  )
}

function Callout({ n, children, className = '' }) {
  return (
    <p className={`flex items-start gap-3 text-[0.92rem] leading-snug text-ink/70 ${className}`}>
      <span className="eyebrow mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-[0.62rem] text-paper">{n}</span>
      <span>{children}</span>
    </p>
  )
}

export default function Product() {
  return (
    <section id="product" aria-labelledby="product-title" className="bg-paper py-24 text-ink md:py-32">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal as="p" className="eyebrow text-signal">The product, up close</Reveal>
            <Reveal as="h2" id="product-title" className="display mt-4 max-w-[16ch] text-[clamp(2.2rem,4.6vw,4rem)]">One theme. Every word behind it.</Reveal>
          </div>
          <Reveal as="p" delay={0.1} className="max-w-[34ch] text-ink/65">No charts to interpret. Each theme reads like a short brief your whole team can act on.</Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_240px] lg:gap-14">
          <Reveal className="relative">
            <article aria-label="Example theme: Exports time out (sample data)" className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-48px_rgba(22,23,15,.55)] ring-1 ring-ink/10">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 px-6 py-5 md:px-10">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-slate" aria-hidden="true" />
                  <span className="eyebrow text-ink/55">Theme 02 · this week</span>
                </div>
                <span className="eyebrow rounded-full bg-signal/10 px-3 py-1 text-signal">Rising</span>
              </header>
              <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.15fr_1fr] md:px-10 md:py-12">
                <div>
                  <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)]">Exports time out</h3>
                  <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-5">
                    <div><dt className="eyebrow text-ink/50">Mentions</dt><dd className="mt-1 font-mono text-2xl">511</dd></div>
                    <div><dt className="eyebrow text-ink/50">30 days</dt><dd className="mt-1 font-mono text-2xl">+38%</dd></div>
                    <div><dt className="eyebrow text-ink/50">Accounts</dt><dd className="mt-1 font-mono text-2xl">94</dd></div>
                  </dl>
                  <div className="mt-6"><Spark /></div>
                  <p className="mt-6 text-ink/70">Large exports stall or never arrive by email. Mostly accounts with more than 5,000 rows; often raised during month-end reporting.</p>
                  <button type="button" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-transform hover:-translate-y-0.5">
                    Draft the spec <span aria-hidden="true">→</span>
                  </button>
                </div>
                <ul className="flex flex-col gap-4" aria-label="Example quotes">
                  {quotes.map(q => (
                    <li key={q.text} className="rounded-2xl bg-paper p-5">
                      <blockquote className="text-[1.02rem] leading-snug">“{q.text}”</blockquote>
                      <p className="eyebrow mt-3 flex justify-between gap-3 text-ink/50"><span>{q.src}</span><span>{q.when}</span></p>
                    </li>
                  ))}
                  <li className="eyebrow pl-1 text-ink/45">+ 508 more, each linked to its source</li>
                </ul>
              </div>
            </article>
            <p className="eyebrow mt-4 text-ink/45">Sample data · fictional product</p>
          </Reveal>
          <div className="flex flex-col gap-6 lg:pt-24">
            <Reveal delay={0.1}><Callout n="1">Every quote links back to the original ticket, review or call — nothing is paraphrased away.</Callout></Reveal>
            <Reveal delay={0.18}><Callout n="2">Trend and reach sit next to volume, so “loud this week” and “growing for months” look different.</Callout></Reveal>
            <Reveal delay={0.26}><Callout n="3">One click turns a theme into a draft spec in your tracker, evidence attached.</Callout></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
