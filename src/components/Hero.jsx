import { useEffect, useState } from 'react'
import DotField from './DotField'
import { LineReveal, Reveal } from './Reveal'

export default function Hero() {
  const [mode, setMode] = useState('scatter')
  useEffect(() => {
    const t = window.setTimeout(() => setMode('cluster'), 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="shell grid min-h-[calc(100svh-4.5rem)] items-center gap-8 pb-14 pt-6 lg:grid-cols-[1.25fr_1fr] lg:pb-20">
        <div className="relative z-10">
          <Reveal as="p" className="eyebrow mb-7 text-ash">Customer feedback, read for you</Reveal>
          <LineReveal
            as="h1" id="hero-title"
            className="display text-[clamp(2.5rem,4.3vw,4.6rem)] lg:whitespace-nowrap"
            lines={[
              { text: 'Ten thousand comments.' },
              { text: 'Four things to fix.', className: 'text-[#5d5b54]' },
              { text: 'One Monday.', className: 'text-signal' },
            ]}
          />
          <Reveal as="p" delay={0.35} className="mt-7 max-w-[42ch] text-[1.08rem] leading-relaxed text-bone-dim md:text-[1.15rem]">
            Aperio reads every ticket, review and call note, groups what people keep saying, and hands your team a short,
            evidence-backed list of what to build next.
          </Reveal>
          <Reveal delay={0.45} className="mt-9 flex flex-wrap gap-3">
            <a href="#access" className="rounded-full bg-bone px-6 py-3.5 font-semibold text-graphite transition-transform hover:-translate-y-0.5">See it on your data</a>
            <a href="#how" className="rounded-full border border-bone/30 px-6 py-3.5 font-semibold transition-colors hover:border-bone">How it works</a>
          </Reveal>
          <Reveal as="ul" delay={0.55} aria-label="Sources Aperio reads" className="eyebrow mt-12 flex flex-wrap gap-x-6 gap-y-2 text-ash">
            <li>Support tickets</li><li>App reviews</li><li>Sales calls</li><li>Surveys</li>
          </Reveal>
        </div>
        <div className="relative">
          <DotField mode={mode} className="h-[320px] w-full sm:h-[420px] lg:h-[600px]" />
          <p className="eyebrow absolute bottom-0 right-0 text-ash" aria-hidden="true">1,842 comments → 4 themes</p>
        </div>
      </div>
    </section>
  )
}
