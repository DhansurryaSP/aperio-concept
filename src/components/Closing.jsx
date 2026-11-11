import { useState } from 'react'
import { LineReveal, Reveal } from './Reveal'
import { Logo } from './Nav'

export function Closing() {
  const [state, setState] = useState('idle')
  const [email, setEmail] = useState('')
  function submit(e) {
    e.preventDefault()
    // Concept site: nothing is sent anywhere. Validate and show a local confirmation.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); return }
    setState('done')
  }
  return (
    <section id="access" aria-labelledby="access-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="shell">
        <LineReveal
          className="display text-[clamp(3rem,9vw,8.5rem)]"
          lines={[{ text: 'Hear everyone.' }, { text: 'Fix what matters.', className: 'text-signal' }]}
        />
        <span id="access-title" className="sr-only">Request access</span>
        <Reveal delay={0.2} className="mt-12 max-w-xl">
          {state === 'done' ? (
            <p role="status" className="rounded-2xl border border-bone/15 p-6 text-lg">
              Thanks — this is a concept site, so nothing was sent. On a live product, you’d get an invite by email.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">Work email</label>
              <input
                id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email}
                onChange={e => { setEmail(e.target.value); setState('idle') }}
                aria-invalid={state === 'error'} aria-describedby="email-help"
                className="min-w-0 flex-1 rounded-full border border-bone/25 bg-transparent px-6 py-4 text-lg placeholder:text-ash focus:border-bone focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-signal px-7 py-4 font-semibold text-graphite transition-transform hover:-translate-y-0.5">Request access</button>
            </form>
          )}
          <p id="email-help" className={`eyebrow mt-4 ${state === 'error' ? 'text-signal' : 'text-ash'}`} aria-live="polite">
            {state === 'error' ? 'Please enter a valid email address.' : 'Concept demo — the form does not send or store anything.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-bone/10 py-12">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-[46ch] text-sm text-ash">
            Aperio is a fictional product. This is a self-initiated concept site designed and built by Dhansurrya S P — all names, numbers, quotes and prices are sample content.
          </p>
        </div>
        <ul className="eyebrow flex flex-wrap gap-x-6 gap-y-2 text-ash">
          <li><a className="hover:text-bone" href="https://github.com/DhansurryaSP/aperio-concept">Source code</a></li>
          <li><a className="hover:text-bone" href="https://github.com/DhansurryaSP">GitHub</a></li>
          <li><a className="hover:text-bone" href="#top">Back to top ↑</a></li>
        </ul>
      </div>
    </footer>
  )
}
