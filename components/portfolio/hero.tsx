'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Cpu, BrainCircuit, Code2 } from 'lucide-react'
import { MagneticButton } from './motion-primitives'

const name = 'SUGANTHA KRISHNAN'
const subtitles = ['Embedded Systems', 'Artificial Intelligence', 'Software Engineering']

function OscilloscopeWave({ mouseX }: { mouseX: number }) {
  const points = 80
  const w = 360
  const h = 48
  const freq = 1.5 + mouseX * 2.5

  const path = Array.from({ length: points }, (_, i) => {
    const x = (i / (points - 1)) * w
    const y = h / 2 + Math.sin((i / points) * Math.PI * 2 * freq) * (h / 2 - 4)
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className="opacity-60"
    >
      {/* Grid lines */}
      {[0, h / 4, h / 2, (3 * h) / 4, h].map(gy => (
        <line key={gy} x1="0" y1={gy} x2={w} y2={gy}
          stroke="oklch(0.65 0.22 225 / 10%)" strokeWidth="0.5" />
      ))}
      {[0, w / 4, w / 2, (3 * w) / 4, w].map(gx => (
        <line key={gx} x1={gx} y1="0" x2={gx} y2={h}
          stroke="oklch(0.65 0.22 225 / 10%)" strokeWidth="0.5" />
      ))}
      {/* Waveform */}
      <motion.path
        d={path}
        stroke="oklch(0.78 0.18 75)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
      />
      {/* Glow copy */}
      <path
        d={path}
        stroke="oklch(0.78 0.18 75 / 20%)"
        strokeWidth="5"
        fill="none"
      />
      {/* Scope labels */}
      <text x="4" y="10" fontSize="7" fill="oklch(0.65 0.22 225 / 40%)" fontFamily="JetBrains Mono, monospace">
        CH1
      </text>
      <text x={w - 30} y="10" fontSize="7" fill="oklch(0.78 0.18 75 / 40%)" fontFamily="JetBrains Mono, monospace">
        {freq.toFixed(1)}Hz
      </text>
    </svg>
  )
}

function PcbNameReveal({ name }: { name: string }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(t)
  }, [])

  const chars = name.split('')

  return (
    <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={char === ' ' ? 'inline-block w-4 md:w-6 lg:w-8' : 'inline-block text-gradient'}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  )
}

function RotatingSubtitle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % subtitles.length)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mt-5 h-7 overflow-hidden">
      <motion.p
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-sm tracking-[0.25em] uppercase"
        style={{ color: 'oklch(0.65 0.22 225)' }}
      >
        {subtitles[index]}
      </motion.p>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mouseX, setMouseX] = useState(0.5)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const portraitOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const springX = useSpring(0, { stiffness: 60, damping: 20 })
  const springY = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const nx = (e.clientX / innerWidth - 0.5) * 2
      const ny = (e.clientY / innerHeight - 0.5) * 2
      springX.set(nx * 20)
      springY.set(ny * 14)
      setMouseX(e.clientX / innerWidth)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [springX, springY])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden"
    >
      {/* ── Portrait Silhouette ── */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: portraitOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <motion.div
          style={{ x: springX, y: springY }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {/* Desktop portrait */}
            <div className="absolute inset-y-0 right-0 w-[45%] hidden md:block">
              <div className="relative w-full h-full">
                <Image
                  src="/images/profile/black.jpg"
                  alt=""
                  fill
                  priority
                  className="object-cover object-top"
                  style={{
                    filter: 'grayscale(1) contrast(200%) brightness(0.7) sepia(0.4) hue-rotate(195deg)',
                    maskImage:
                      'linear-gradient(to right, transparent 0%, black 30%, black 75%, transparent 100%), linear-gradient(to bottom, black 35%, transparent 95%)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, black 30%, black 75%, transparent 100%), linear-gradient(to bottom, black 35%, transparent 95%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                  }}
                  sizes="45vw"
                />
                {/* Digital scan-line overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, oklch(0.07 0.005 240 / 30%) 3px, oklch(0.07 0.005 240 / 30%) 4px)',
                  }}
                />
                {/* Dotted halftone */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, oklch(0.07 0.005 240) 38%, transparent 42%)',
                    backgroundSize: '6px 6px',
                  }}
                />
                {/* Blue ambient glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 65% 75% at 75% 45%, oklch(0.65 0.22 225 / 12%) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>

            {/* Mobile portrait */}
            <div className="absolute inset-0 block md:hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/profile/black.jpeg"
                  alt=""
                  fill
                  priority
                  className="object-cover object-top"
                  style={{
                    filter: 'grayscale(1) contrast(180%) brightness(0.5) sepia(0.3) hue-rotate(195deg)',
                    opacity: 0.25,
                    maskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
                  }}
                  sizes="100vw"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Left-side gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, oklch(0.07 0.005 240 / 94%) 0%, oklch(0.07 0.005 240 / 65%) 40%, oklch(0.07 0.005 240 / 15%) 70%, oklch(0.07 0.005 240 / 30%) 100%), linear-gradient(to bottom, transparent 0%, oklch(0.07 0.005 240 / 80%) 90%)',
          }}
        />
      </motion.div>

      {/* ── Foreground Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* System badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass mb-8 flex items-center gap-3 rounded-full px-5 py-2"
          style={{ border: '1px solid oklch(0.65 0.22 225 / 20%)' }}
        >
          <Cpu className="size-4" style={{ color: 'oklch(0.65 0.22 225)' }} aria-hidden="true" />
          <BrainCircuit className="size-4" style={{ color: 'oklch(0.72 0.16 195)' }} aria-hidden="true" />
          <Code2 className="size-4" style={{ color: 'oklch(0.78 0.18 75)' }} aria-hidden="true" />
          <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'oklch(0.60 0.012 225)' }}>
            Hardware · AI · Software
          </span>
        </motion.div>

        {/* Name with PCB trace reveal */}
        <PcbNameReveal name={name} />

        {/* Rotating subtitle */}
        <RotatingSubtitle />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 max-w-xl text-sm leading-relaxed md:text-base"
          style={{ color: 'oklch(0.60 0.012 225)' }}
        >
          &ldquo;If I ever get lost, look where Embedded Systems and Software Engineering meet.&rdquo;
        </motion.p>

        {/* Oscilloscope waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 rounded-xl overflow-hidden"
          style={{ background: 'oklch(0.10 0.012 225 / 60%)', border: '1px solid oklch(0.65 0.22 225 / 15%)', padding: '8px 12px' }}
          aria-hidden="true"
        >
          <OscilloscopeWave mouseX={mouseX} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <MagneticButton
            href="#projects"
            className="glow-accent rounded-full px-8 py-3.5 text-sm font-mono font-medium tracking-wider transition-opacity hover:opacity-90"
            style={{ background: 'oklch(0.65 0.22 225)', color: 'oklch(0.07 0.005 240)' }}
          >
            Explore My Work
            <ArrowDown className="size-4" aria-hidden="true" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-6 rounded-full p-1.5"
          style={{ border: '1px solid oklch(0.65 0.22 225 / 30%)' }}
        >
          <div
            className="mx-auto h-2 w-1 rounded-full"
            style={{ background: 'oklch(0.65 0.22 225)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
