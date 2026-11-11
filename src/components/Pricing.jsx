import { Reveal } from './Reveal'

const plans = [
  { name: 'Team', price: '$49', per: 'per month', note: 'For one product team.', items: ['Up to 5,000 comments a month', '3 connected sources', 'Weekly ranked list', 'Export to your tracker'] },
  { name: 'Company', price: '$199', per: 'per month', note: 'For several teams sharing one view.', items: ['Up to 50,000 comments a month', 'Unlimited sources', 'Daily list and alerts', 'SSO and audit log'], featured: true },
]

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-paper py-24 text-ink md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="eyebrow text-signal">Pricing</Reveal>
            <Reveal as="h2" id="pricing-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,4rem)]">Two plans. No seat maths.</Reveal>
          </div>
          <Reveal as="p" className="eyebrow text-ink/45">Concept pricing · not a real offer</Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}
              className={`flex flex-col rounded-[28px] p-8 md:p-10 ${p.featured ? 'bg-graphite text-bone' : 'bg-white ring-1 ring-ink/10'}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{p.name}</h3>
                {p.featured && <span className="eyebrow rounded-full bg-signal px-3 py-1 text-graphite">Most teams</span>}
              </div>
              <p className={`mt-2 ${p.featured ? 'text-bone-dim' : 'text-ink/60'}`}>{p.note}</p>
              <p className="mt-10 flex items-baseline gap-2"><span className="display text-6xl">{p.price}</span><span className={p.featured ? 'text-bone-dim' : 'text-ink/55'}>{p.per}</span></p>
              <ul className={`mt-8 flex flex-col border-t pt-6 ${p.featured ? 'border-bone/15' : 'border-ink/10'}`}>
                {p.items.map(it => (
                  <li key={it} className="flex items-center gap-3 py-2"><span aria-hidden="true" className={`size-1.5 rounded-full ${p.featured ? 'bg-signal' : 'bg-ink'}`} />{it}</li>
                ))}
              </ul>
              <a href="#access" className={`mt-10 self-start rounded-full px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 ${p.featured ? 'bg-bone text-graphite' : 'bg-ink text-paper'}`}>Request access</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
