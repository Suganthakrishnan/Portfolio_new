'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  { text: 'POWER ON', delay: 200, type: 'header' },
  { text: 'Bootloader v2.4.1 loaded', delay: 600, type: 'info' },
  { text: '', delay: 900, type: 'spacer' },
  { text: 'Initializing GPIO...', delay: 1100, type: 'init', check: true, checkDelay: 1400 },
  { text: 'Initializing SPI...', delay: 1600, type: 'init', check: true, checkDelay: 1850 },
  { text: 'Initializing I2C...', delay: 2000, type: 'init', check: true, checkDelay: 2200 },
  { text: 'Initializing UART...', delay: 2350, type: 'init', check: true, checkDelay: 2550 },
  { text: '', delay: 2700, type: 'spacer' },
  { text: 'Loading AI Runtime...', delay: 2900, type: 'loading' },
  { text: 'Neural Engine Online', delay: 3400, type: 'success' },
  { text: '', delay: 3600, type: 'spacer' },
  { text: 'SYSTEM READY', delay: 3800, type: 'ready' },
] as const

type LineType = 'header' | 'info' | 'init' | 'loading' | 'success' | 'ready' | 'spacer'

interface BootLine {
  text: string
  delay: number
  type: LineType
  check?: boolean
  checkDelay?: number
}

const EXIT_DELAY = 4600

export function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const [shownLines, setShownLines] = useState<number[]>([])
  const [checkedLines, setCheckedLines] = useState<number[]>([])
  const [exiting, setExiting] = useState(false)
  const timers = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Only show once per session
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('boot-seen')
      if (seen) {
        setDone(true)
        onComplete?.()
        return
      }
    }

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDone(true)
      sessionStorage.setItem('boot-seen', '1')
      onComplete?.()
      return
    }

    setVisible(true)

    // Schedule each line to appear
    ;(bootLines as readonly BootLine[]).forEach((line, i) => {
      const t1 = setTimeout(() => {
        setShownLines(prev => [...prev, i])
      }, line.delay)
      timers.current.push(t1)

      if (line.check && line.checkDelay) {
        const t2 = setTimeout(() => {
          setCheckedLines(prev => [...prev, i])
        }, line.checkDelay)
        timers.current.push(t2)
      }
    })

    // Exit
    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        setDone(true)
        sessionStorage.setItem('boot-seen', '1')
        onComplete?.()
      }, 700)
    }, EXIT_DELAY)
    timers.current.push(exitTimer)

    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [onComplete])

  if (done) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#080c12' }}
        >
          {/* Scanline overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.65 0.22 225 / 2%) 2px, oklch(0.65 0.22 225 / 2%) 4px)',
            }}
          />

          {/* Corner brackets */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 md:inset-12">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l" style={{ borderColor: 'oklch(0.65 0.22 225 / 40%)' }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r" style={{ borderColor: 'oklch(0.65 0.22 225 / 40%)' }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l" style={{ borderColor: 'oklch(0.65 0.22 225 / 40%)' }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r" style={{ borderColor: 'oklch(0.65 0.22 225 / 40%)' }} />
          </div>

          {/* Power LED */}
          <motion.div
            aria-hidden="true"
            className="absolute top-6 left-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="led-green" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-green-400/60 uppercase">PWR</span>
          </motion.div>

          {/* Terminal */}
          <div className="w-full max-w-xl px-6 md:px-0">
            <ul className="flex flex-col gap-0.5" aria-live="polite" aria-atomic="false">
              {(bootLines as readonly BootLine[]).map((line, i) => {
                if (!shownLines.includes(i)) return null
                if (line.type === 'spacer') return <li key={i} className="h-3" aria-hidden="true" />

                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center gap-3"
                  >
                    {/* Line prefix */}
                    {line.type === 'header' && (
                      <span className="font-mono text-xl md:text-2xl font-semibold tracking-[0.25em]" style={{ color: 'oklch(0.65 0.22 225)' }}>
                        {line.text}
                      </span>
                    )}
                    {line.type === 'info' && (
                      <span className="font-mono text-sm tracking-wide" style={{ color: 'oklch(0.60 0.012 225)' }}>
                        {line.text}
                      </span>
                    )}
                    {line.type === 'init' && (
                      <>
                        <span className="font-mono text-sm tracking-wide" style={{ color: 'oklch(0.75 0.01 240)' }}>
                          {line.text}
                        </span>
                        {checkedLines.includes(i) && (
                          <motion.span
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="font-mono text-sm font-semibold"
                            style={{ color: 'oklch(0.72 0.28 145)' }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </>
                    )}
                    {line.type === 'loading' && (
                      <span className="font-mono text-sm tracking-wide" style={{ color: 'oklch(0.78 0.18 75)' }}>
                        {line.text}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          style={{ color: 'oklch(0.78 0.18 75)' }}
                        >
                          {' '}▌
                        </motion.span>
                      </span>
                    )}
                    {line.type === 'success' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-sm font-medium tracking-wide"
                        style={{ color: 'oklch(0.72 0.16 195)' }}
                      >
                        {line.text}
                      </motion.span>
                    )}
                    {line.type === 'ready' && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-lg md:text-xl font-semibold tracking-[0.3em]"
                        style={{ color: 'oklch(0.96 0.004 240)', textShadow: '0 0 20px oklch(0.65 0.22 225 / 80%)' }}
                      >
                        {line.text}
                      </motion.span>
                    )}
                  </motion.li>
                )
              })}
            </ul>
          </div>

          {/* Bottom system info */}
          <div className="absolute bottom-6 right-6 font-mono text-[10px] tracking-wider" style={{ color: 'oklch(0.40 0.01 225)' }}>
            SYS v1.0.0 · ECE PORTFOLIO
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
