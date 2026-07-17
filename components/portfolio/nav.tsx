'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#about',       label: 'About',      short: 'ABT' },
  { href: '#skills',      label: 'Skills',     short: 'SKL' },
  { href: '#experience',  label: 'Experience', short: 'EXP' },
  { href: '#projects',    label: 'Projects',   short: 'PRJ' },
  { href: '#contact',     label: 'Contact',    short: 'CTN' },
]

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact']

export function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // IntersectionObserver to track active section
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        setActive(`#${visible[0].target.id}`)
      }
    },
    {
      threshold: [0.25, 0.5, 0.75],
    }
  )

  SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  return () => observer.disconnect()
}, [])

  // Move the active pill indicator
  useEffect(() => {
    const idx = links.findIndex(l => l.href === active)
    if (idx === -1 || !linkRefs.current[idx]) return
    const el = linkRefs.current[idx]!
    const nav = navRef.current
    if (!nav) return
    const elRect = el.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    })
  }, [active])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Main navigation"
        ref={navRef}
        className="glass relative flex items-center gap-1 rounded-full px-2 py-2 md:gap-0 md:px-3"
        style={{ border: '1px solid oklch(0.65 0.22 225 / 15%)' }}
      >
        {/* Power LED + Brand */}
        <a
          href="#top"
          className="flex items-center gap-2 px-3 py-1"
          aria-label="Go to top"
        >
          <span className="led-green" aria-hidden="true" />
          <span
            className="font-mono text-xs font-semibold tracking-[0.2em]"
            style={{ color: 'oklch(0.65 0.22 225)' }}
          >
            SK
          </span>
        </a>

        {/* Separator */}
        <div
          className="hidden sm:block mx-1 h-4 w-px"
          style={{ background: 'oklch(0.65 0.22 225 / 20%)' }}
          aria-hidden="true"
        />

        {/* Nav links with sliding indicator */}
        <div className="relative hidden sm:flex items-center">
          {/* Sliding active indicator */}
          {/*}
          {active && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full"
              style={{ background: 'oklch(0.65 0.22 225 / 12%)', border: '1px solid oklch(0.65 0.22 225 / 25%)' }}
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
            */}

          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={el => { linkRefs.current[i] = el }}
              className="relative z-10 px-3 py-1.5 font-mono text-xs tracking-[0.12em] transition-colors duration-200"
              style={{
                color: active === link.href
                  ? 'oklch(0.65 0.22 225)'
                  : 'oklch(0.60 0.012 225)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* System status badge */}
        <div
          className="hidden md:flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full"
          style={{ background: 'oklch(0.65 0.22 225 / 8%)', border: '1px solid oklch(0.65 0.22 225 / 15%)' }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'oklch(0.72 0.16 195)' }}>
            SYS:ONLINE
          </span>
        </div>

        {/* Mobile — Work CTA */}
        <a
          href="#projects"
          className="rounded-full px-4 py-1.5 font-mono text-xs font-medium sm:hidden"
          style={{ background: 'oklch(0.65 0.22 225)', color: 'oklch(0.07 0.005 240)' }}
        >
          Work
        </a>
      </nav>
    </motion.header>
  )
}
