'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Award, User } from 'lucide-react'
import { Reveal, SectionHeading } from './motion-primitives'

const journey = [
  { label: 'Curiosity', color: 'oklch(0.60 0.012 225)' },
  { label: 'Electronics', color: 'oklch(0.65 0.22 225)' },
  { label: 'Embedded Systems', color: 'oklch(0.65 0.22 225)' },
  { label: 'PCB Design', color: 'oklch(0.72 0.16 195)' },
  { label: 'Machine Learning', color: 'oklch(0.72 0.16 195)' },
  { label: 'Software Eng.', color: 'oklch(0.78 0.18 75)' },
  { label: 'Intelligent Products', color: 'oklch(0.78 0.18 75)' },
]

function SignalFlow() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="mt-8 flex flex-col items-start gap-0"
    >
      {journey.map((step, i) => (
        <motion.div
          key={step.label}
          variants={{
            hidden: { opacity: 0, x: -12 },
            visible: {
              opacity: 1, x: 0,
              transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="flex items-center gap-3"
        >
          {/* Node */}
          <div className="relative flex items-center justify-center">
            <div
              className="w-3 h-3 rounded-full border"
              style={{ background: step.color, borderColor: step.color, boxShadow: `0 0 8px ${step.color}` }}
            />
          </div>

          {/* Label */}
          <span
            className="font-mono text-xs tracking-[0.1em]"
            style={{ color: step.color }}
          >
            {step.label}
          </span>

          {/* Connecting line (not for last item) */}
          {i < journey.length - 1 && (
            <div className="sr-only" />
          )}
        </motion.div>
      ))}

      {/* Vertical signal line behind nodes */}
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 md:py-32 overflow-hidden">
      {/* Subtle portrait ghost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-full w-72 select-none opacity-[0.07] mix-blend-luminosity"
        style={{ filter: 'blur(32px) saturate(0.2)' }}
      >
        <Image
          src="/images/profile/portrait.jpg"
          alt=""
          fill
          className="object-cover object-top"
          sizes="288px"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, transparent 0%, oklch(0.07 0.005 240) 100%)' }}
        />
      </div>

      <SectionHeading eyebrow="01 — About" title="Engineering across the stack" />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Bio Card */}
        <Reveal>
          <div className="glass glass-hover h-full rounded-3xl p-8 md:p-10"
            style={{ border: '1px solid oklch(0.65 0.22 225 / 12%)' }}>
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ background: 'oklch(0.65 0.22 225 / 12%)', border: '1px solid oklch(0.65 0.22 225 / 20%)' }}
              >
                <User className="size-5" style={{ color: 'oklch(0.65 0.22 225)' }} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-medium">Sugantha Krishnan</h3>
            </div>
            <p className="leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
              ECE student with experience across AI, Embedded Systems, PCB
              Design and Software Engineering. Worked on industrial embedded
              systems, STM32 firmware, multilayer PCB design, AI-based medical
              OCR, DevSecOps and full-stack applications.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
              Interested in building intelligent products combining hardware
              and software.
            </p>

            {/* Signal flow journey */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid oklch(0.65 0.22 225 / 12%)' }}>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: 'oklch(0.65 0.22 225)' }}>
                Journey
              </p>
              <div className="relative pl-4">
                {/* Vertical trace line */}
                <div
                  className="absolute left-1.5 top-1.5 bottom-1.5 w-px"
                  style={{ background: 'linear-gradient(to bottom, oklch(0.65 0.22 225 / 60%), oklch(0.78 0.18 75 / 60%))' }}
                  aria-hidden="true"
                />
                <SignalFlow />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Portrait Card */}
        <Reveal delay={0.08}>
          <div className="glass glass-hover overflow-hidden rounded-3xl p-3 h-full flex flex-col justify-between"
            style={{ border: '1px solid oklch(0.65 0.22 225 / 12%)' }}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
              style={{ border: '1px solid oklch(0.65 0.22 225 / 15%)' }}>
              <Image
                src="/images/profile/portrait.jpg"
                alt="Sugantha Krishnan Professional Portrait"
                fill
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              {/* Scan-line overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, oklch(0.07 0.005 240 / 20%) 3px, oklch(0.07 0.005 240 / 20%) 4px)',
                }}
              />
              {/* Corner brackets */}
              {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className={`absolute ${pos} w-4 h-4`}
                  style={{
                    borderTop: i < 2 ? '1px solid oklch(0.65 0.22 225 / 50%)' : 'none',
                    borderBottom: i >= 2 ? '1px solid oklch(0.65 0.22 225 / 50%)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid oklch(0.65 0.22 225 / 50%)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid oklch(0.65 0.22 225 / 50%)' : 'none',
                  }}
                />
              ))}
            </div>
            <div className="p-3 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'oklch(0.65 0.22 225)' }}>
                Sugantha Krishnan
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: 'oklch(0.60 0.012 225)' }}>
                VIT Chennai · ECE
              </p>
            </div>
          </div>
        </Reveal>

        {/* Education & Stats */}
        <div className="flex flex-col gap-6">
          <Reveal delay={0.16}>
            <div className="glass glass-hover rounded-3xl p-7"
              style={{ border: '1px solid oklch(0.65 0.22 225 / 12%)' }}>
              <div
                className="mb-4 flex size-10 items-center justify-center rounded-xl"
                style={{ background: 'oklch(0.65 0.22 225 / 12%)' }}
              >
                <GraduationCap className="size-5" style={{ color: 'oklch(0.65 0.22 225)' }} aria-hidden="true" />
              </div>
              <p className="text-sm" style={{ color: 'oklch(0.60 0.012 225)' }}>Education</p>
              <p className="mt-1 font-medium leading-snug">
                B.Tech Electronics &amp; Communication Engineering
              </p>
              <p className="mt-1 text-sm" style={{ color: 'oklch(0.60 0.012 225)' }}>VIT Chennai</p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="glass glass-hover rounded-3xl p-7"
              style={{ border: '1px solid oklch(0.78 0.18 75 / 15%)' }}>
              <div
                className="mb-4 flex size-10 items-center justify-center rounded-xl"
                style={{ background: 'oklch(0.78 0.18 75 / 10%)' }}
              >
                <Award className="size-5" style={{ color: 'oklch(0.78 0.18 75)' }} aria-hidden="true" />
              </div>
              <p className="text-sm" style={{ color: 'oklch(0.60 0.012 225)' }}>CGPA</p>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 font-serif text-3xl font-semibold text-gradient-signal"
              >
                9.4
              </motion.p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
