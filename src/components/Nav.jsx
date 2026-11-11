import { useEffect, useState } from 'react'

const links = [
  { href: '#how', label: 'How it works' },
  { href: '#product', label: 'Product' },
  { href: '#principles', label: 'Principles' },
  { href: '#pricing', label: 'Pricing' },
]

export function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[1.35rem] font-bold tracking-[-0.04em] ${className}`}>
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        <i className="block size-2.5 rounded-full bg-signal" />
        <i className="block size-[7px] rounded-full bg-bone" />
        <i className="block size-[5px] rounded-full bg-ash" />
      </span>
      aperio
    </span>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-500 ${scrolled ? 'bg-graphite/85 backdrop-blur-md border-b border-bone/10' : 'border-b border-transparent'}`}>
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between md:h-[72px]">
        <a href="#top" aria-label="Aperio home"><Logo /></a>
        <ul className="hidden items-center gap-9 text-[0.92rem] text-bone-dim md:flex">
          {links.map(l => (
            <li key={l.href}><a className="transition-colors hover:text-bone" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#access" className="rounded-full border border-bone/30 px-4 py-2 text-[0.9rem] transition-colors hover:border-bone hover:bg-bone hover:text-graphite">Request access</a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-bone/20 md:hidden"
            aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <i className={`absolute left-0 block h-px w-4 bg-bone transition-transform ${open ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
              <i className={`absolute left-0 block h-px w-4 bg-bone transition-transform ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" hidden={!open} className="border-t border-bone/10 bg-graphite md:hidden">
        <ul className="shell flex flex-col py-4">
          {links.map(l => (
            <li key={l.href}><a onClick={() => setOpen(false)} className="block py-3 font-display text-3xl tracking-tight" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </header>
  )
}
