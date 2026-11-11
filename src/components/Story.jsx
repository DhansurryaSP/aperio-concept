import { useEffect, useRef, useState } from 'react'
import DotField from './DotField'
import { Reveal } from './Reveal'

const chapters = [
  { mode: 'scatter', n: '01', title: 'Collect', body: 'Connect your help desk, app store reviews, call notes and surveys. Every comment lands in one place, in its original words, with a link back to where it came from.' },
  { mode: 'cluster', n: '02', title: 'Cluster', body: 'Aperio groups comments by what people mean, not the keywords they use. "Can’t find the export", "CSV never arrives" and "download hangs" become one theme.' },
  { mode: 'weigh', n: '03', title: 'Weigh', body: 'Each theme is sized by how many people raise it, how often, and how recently — so a loud week doesn’t drown out a problem that has been quietly growing.' },
  { mode: 'decide', n: '04', title: 'Decide', body: 'You get a ranked list for the week, each item backed by real quotes. Send one to your tracker as a draft spec, with the evidence attached.' },
]

export default function Story() {
  const [active, setActive] = useState(0)
  const refs = useRef([])
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)) }),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="how" aria-labelledby="how-title" className="relative border-t border-bone/10 py-24 md:py-32">
      <div className="shell">
        <Reveal as="p" className="eyebrow text-signal">How it works</Reveal>
        <Reveal as="h2" id="how-title" className="display mt-4 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4rem)]">From noise to a Monday list.</Reveal>
      </div>
      <div className="shell mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-[14vh] h-[72vh] rounded-[28px] border border-bone/10 bg-graphite-2">
            <div className="absolute inset-6 top-14"><DotField mode={chapters[active].mode} className="h-full w-full" label={`Illustration for step ${chapters[active].n}: ${chapters[active].title}`} /></div>
            <p className="eyebrow absolute left-6 top-5 text-ash" aria-hidden="true">Step {chapters[active].n} / 04</p>
          </div>
        </div>
        <ol className="flex flex-col">
          {chapters.map((c, i) => (
            <li
              key={c.n} data-i={i} ref={el => (refs.current[i] = el)}
              className="flex min-h-[auto] flex-col justify-center border-t border-bone/10 py-10 first:border-t-0 lg:min-h-[72vh] lg:py-0"
            >
              <div className="mb-6 h-[260px] overflow-hidden rounded-[22px] border border-bone/10 bg-graphite-2 lg:hidden">
                <DotField mode={c.mode} className="h-full w-full" label={`Illustration for step ${c.n}: ${c.title}`} />
              </div>
              <p className={`eyebrow transition-colors duration-500 ${active === i ? 'text-signal' : 'text-ash'}`}>{c.n}</p>
              <h3 className={`display mt-3 text-[clamp(2rem,3.6vw,3.2rem)] transition-opacity duration-500 ${active === i ? 'lg:opacity-100' : 'lg:opacity-40'}`}>{c.title}</h3>
              <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed text-bone-dim">{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
