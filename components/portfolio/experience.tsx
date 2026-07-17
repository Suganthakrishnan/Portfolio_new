'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading } from './motion-primitives'

const pipeline = [
  { id: 'join VIT',      label: 'ECE',      sub: 'Student',   color: 'oklch(0.65 0.22 225)', desc: 'Academic foundation in Electronics & Communication Engineering' },
  { id: 'learn',      label: 'Learning',   sub: 'PROCESS',     color: 'oklch(0.65 0.22 225)', desc: 'Deep dives into embedded systems, PCB design, and AI frameworks' },
  { id: 'intern1',    label: 'Green Ray',  sub: 'INTERN ①',    color: 'oklch(0.72 0.16 195)', desc: 'STM32 firmware · Relay control · Industrial air scrubber systems' },
  { id: 'intern2',    label: 'Sri Tech',   sub: 'INTERN ②',    color: 'oklch(0.72 0.16 195)', desc: 'Modbus RTU/TCP · Python tooling · Industrial PLC communication' },
  { id: 'intern3',    label: 'Pinnavox',   sub: 'INTERN ③',    color: 'oklch(0.78 0.18 75)',  desc: 'Multilayer PCB design · KiCad · DFM & EMI/EMC standards' },
  { id: 'intern4', label: 'Hear', sub: 'INTERN ③',  color: 'oklch(0.72 0.16 195)', desc: 'Hearing AID · PCB design · DSP'}
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="experience" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="04 — Experience" title="Journey" />

      {/* Desktop: horizontal pipeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Pipeline track */}
          <div
            className="absolute top-[52px] left-0 right-0 h-px"
            style={{ background: 'oklch(0.65 0.22 225 / 15%)' }}
            aria-hidden="true"
          />

          {/* Animated signal traveling along track */}
          <motion.div
            className="absolute top-[51px] h-[2px] origin-left"
            style={{
              background: 'linear-gradient(90deg, transparent, oklch(0.78 0.18 75 / 80%), transparent)',
              width: '15%',
              scaleX: useTransform(scrollYProgress, [0.1, 0.8], [0, 6.5]),
            }}
            aria-hidden="true"
          />

          {/* Nodes */}
          <div className="flex justify-between items-start">
            {pipeline.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-0 w-[13%]"
              >
                {/* Node */}
                <div
                  className="relative z-10 flex size-[26px] items-center justify-center rounded-full border"
                  style={{
                    background: `${step.color}15`,
                    borderColor: `${step.color}60`,
                    boxShadow: `0 0 12px -2px ${step.color}50`,
                  }}
                >
                  <div className="size-2 rounded-full" style={{ background: step.color }} />
                </div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <p className="font-serif text-sm font-medium">{step.label}</p>
                  <p className="font-mono text-[9px] tracking-[0.2em] mt-0.5" style={{ color: step.color }}>
                    {step.sub}
                  </p>
                </div>

                {/* Description card on hover */}
                <div
                  className="mt-3 rounded-xl p-3 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 w-full"
                  style={{
                    background: 'oklch(0.09 0.012 225)',
                    border: `1px solid ${step.color}20`,
                    fontSize: '10px',
                    lineHeight: 1.5,
                    color: 'oklch(0.60 0.012 225)',
                  }}
                >
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded detail cards below */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'PCB Design Intern',
              company: 'Pinnavox',
              color: 'oklch(0.78 0.18 75)',
              points: [
                'Designing multilayer PCBs for embedded and IoT products',
                'Worked with KiCad for schematic capture and layout',
                'Followed DFM and EMI/EMC standards',
                'Generated fabrication-ready Gerber files',
              ],
            },
            {
              title: 'Embedded Systems Intern',
              company: 'Sri Tech Engineering',
              color: 'oklch(0.72 0.16 195)',
              points: [
                'Implemented Modbus RTU/TCP communication',
                'Python-based industrial tooling',
                'Industrial PLC communication systems',
              ],
            },
            {
              title: 'Embedded Systems Intern',
              company: 'Green Ray Technologies',
              color: 'oklch(0.65 0.22 225)',
              points: [
                'STM32 firmware development in Embedded C',
                'Relay control systems for industrial equipment',
                'Industrial air scrubber automation',
              ],
            },
          ].map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-6"
              style={{
                background: 'oklch(0.09 0.012 225)',
                border: `1px solid ${role.color}20`,
              }}
            >
              {/* Color accent bar */}
              <div className="w-8 h-1 rounded mb-4" style={{ background: role.color }} />

              <div className="mb-4">
                <h3 className="font-serif text-base font-semibold">{role.title}</h3>
                <p className="font-mono text-xs mt-1" style={{ color: role.color }}>{role.company}</p>
              </div>

              <ul className="flex flex-col gap-2">
                {role.points.map(point => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ color: 'oklch(0.60 0.012 225)' }}
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ background: role.color }}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="md:hidden relative ml-3">
        <div
          className="absolute inset-y-0 left-0 w-px"
          style={{ background: 'linear-gradient(to bottom, oklch(0.65 0.22 225 / 60%), oklch(0.78 0.18 75 / 60%))' }}
          aria-hidden="true"
        />
        <ol className="flex flex-col gap-8">
          {[
            { title: 'PCB Design Intern', company: 'Pinnavox', color: 'oklch(0.78 0.18 75)', points: ['Multilayer PCBs · KiCad · DFM/EMI/EMC · Gerber files'] },
            { title: 'Embedded Systems Intern', company: 'Sri Tech Engineering', color: 'oklch(0.72 0.16 195)', points: ['Modbus RTU/TCP · Python tooling · PLC communication'] },
            { title: 'Embedded Systems Intern', company: 'Green Ray Technologies', color: 'oklch(0.65 0.22 225)', points: ['STM32 firmware · Embedded C · Relay control systems'] },
          ].map((role, i) => (
            <li key={role.company} className="relative pl-7">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-4 size-[11px] rounded-full border"
                style={{ background: 'oklch(0.07 0.005 240)', borderColor: role.color, boxShadow: `0 0 10px ${role.color}70` }}
              />
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-5"
                style={{ background: 'oklch(0.09 0.012 225)', border: `1px solid ${role.color}20` }}
              >
                <h3 className="font-serif text-sm font-semibold">{role.title}</h3>
                <p className="font-mono text-xs mt-1 mb-3" style={{ color: role.color }}>{role.company}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>{role.points[0]}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
