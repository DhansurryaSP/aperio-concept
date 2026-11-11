import { Reveal } from './Reveal'

const rules = [
  ['Never trains shared models on your customers’ words.', 'Your data is used to build your themes and nothing else.'],
  ['Never invents a quote.', 'Every line in a theme is a real comment you can open in its source.'],
  ['Never hides how a theme was sized.', 'Volume, reach and trend are shown side by side — no black-box score.'],
  ['Never needs a data team to set up.', 'Connect a source, wait a few minutes, read your first list.'],
]

export default function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="border-t border-bone/10 bg-graphite-2 py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal as="p" className="eyebrow text-signal">Principles</Reveal>
          <Reveal as="h2" id="principles-title" className="display mt-4 max-w-[12ch] text-[clamp(2.2rem,4.6vw,4rem)]">What Aperio won’t do.</Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[38ch] text-bone-dim">Feedback is personal. These are product rules, written down where you can hold us to them.</Reveal>
        </div>
        <ol className="flex flex-col">
          {rules.map(([t, b], i) => (
            <Reveal as="li" key={t} delay={i * 0.06} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-bone/10 py-7 first:border-t-0 first:pt-0">
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em]">{t}</p>
                <p className="mt-2 text-bone-dim">{b}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
