'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Cpu, BrainCircuit, Code2 } from 'lucide-react'
import { MagneticButton } from './motion-primitives'

const name = 'SUGANTHA KRISHNAN'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass mb-8 flex items-center gap-3 rounded-full px-5 py-2"
      >
        <Cpu className="size-4 text-primary" aria-hidden="true" />
        <BrainCircuit className="size-4 text-primary" aria-hidden="true" />
        <Code2 className="size-4 text-primary" aria-hidden="true" />
        <span className="text-xs tracking-wide text-muted-foreground">
          Hardware · AI · Software
        </span>
      </motion.div>

      <h1 className="font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="sr-only">{name}</span>
        <span aria-hidden="true" className="text-gradient">
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-6 font-serif text-lg tracking-wide text-primary md:text-xl"
      >
        Electronics &amp; Communication Engineer
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg"
      >
        Building Intelligent Systems where AI, Embedded Systems and Software
        Engineering meet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-10"
      >
        <MagneticButton
          href="#projects"
          className="glow-accent rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Explore My Work
          <ArrowDown className="size-4" aria-hidden="true" />
        </MagneticButton>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-6 rounded-full border border-border p-1.5"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
