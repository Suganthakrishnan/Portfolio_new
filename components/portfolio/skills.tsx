'use client'

import { motion } from 'framer-motion'
import {
  Terminal,
  BrainCircuit,
  Cpu,
  CircuitBoard,
  AppWindow,
} from 'lucide-react'
import { SectionHeading, fadeUp, stagger } from './motion-primitives'

const categories = [
  {
    icon: Terminal,
    title: 'Programming',
    skills: ['Python', 'Java', 'Embedded C', 'SQL'],
  },
  {
    icon: BrainCircuit,
    title: 'AI',
    skills: ['TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    icon: Cpu,
    title: 'Embedded',
    skills: ['STM32', 'Embedded C', 'UART', 'SPI', 'I2C', 'CAN', 'Modbus'],
  },
  {
    icon: CircuitBoard,
    title: 'PCB',
    skills: ['KiCad', 'Cadence Virtuoso', 'DFM', 'Gerber'],
  },
  {
    icon: AppWindow,
    title: 'Software',
    skills: ['React', 'TypeScript', 'Git', 'GitHub', 'Docker', 'Kubernetes'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="02 — Skills" title="Tools of the trade" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            variants={fadeUp}
            className="glass glass-hover rounded-3xl p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <cat.icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-medium">{cat.title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
