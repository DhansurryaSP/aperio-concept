import { motion, useReducedMotion } from 'motion/react'

/** Fade-and-rise on first entry into view. Disabled for reduced motion. */
export function Reveal({ as = 'div', delay = 0, y = 18, className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Headline revealed line by line behind a mask. The heading itself is the in-view trigger. */
export function LineReveal({ lines, className = '', delay = 0, as = 'h2', id }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const line = {
    hidden: { y: '105%' },
    show: i => ({ y: '0%', transition: { duration: 0.85, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
  }
  return (
    <Tag id={id} className={className} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${l.className ?? ''}`} custom={i} variants={line}>
            {l.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
