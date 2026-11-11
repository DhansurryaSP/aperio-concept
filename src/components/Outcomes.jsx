import { Reveal } from './Reveal'

const items = [
  { n: '01', title: 'Stop guessing which bug matters.', body: 'Rank problems by how many people hit them, not by who complained loudest in Slack.' },
  { n: '02', title: 'Walk into planning with evidence.', body: 'Every priority arrives with the customer’s own words attached.' },
  { n: '03', title: 'Hear the quiet problems early.', body: 'Slow-growing themes surface weeks before they show up in churn.' },
]

function Dots({ i }) {
  // tiny dot motif per outcome
  const layouts = [
    [[8, 8], [20, 8], [32, 8], [44, 8], [8, 20], [20, 20], [32, 20], [8, 32], [20, 32], [8, 44]],
    [[26, 8], [14, 20], [26, 20], [38, 20], [8, 32], [20, 32], [32, 32], [44, 32], [26, 44]],
    [[8, 44], [20, 40], [32, 30], [44, 14], [44, 26], [40, 40], [28, 44]],
  ]
  return (
    <svg viewBox="0 0 52 52" className="size-14" aria-hidden="true">
      {layouts[i].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={k === 0 ? 3.6 : 2.6} fill={k === 0 ? '#ff5a1f' : '#8a877f'} />)}
    </svg>
  )
}

export default function Outcomes() {
  return (
    <section aria-labelledby="outcomes-title" className="py-24 md:py-32">
      <div className="shell">
        <h2 id="outcomes-title" className="sr-only">What changes for your team</h2>
        <ul className="flex flex-col">
          {items.map((it, i) => (
            <li key={it.n} className="grid gap-6 border-t border-bone/10 py-12 md:grid-cols-[80px_1fr_minmax(0,22rem)] md:items-start md:gap-10 md:py-16">
              <Reveal><Dots i={i} /></Reveal>
              <Reveal as="h3" delay={0.05} className="display text-[clamp(2rem,4.4vw,3.8rem)]">{it.title}</Reveal>
              <Reveal as="p" delay={0.12} className="text-[1.05rem] leading-relaxed text-bone-dim md:pt-3">{it.body}</Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
