'use client'

import { Trophy, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from './motion-primitives'

const achievements = [
  {
    icon: Trophy,
    title: 'Hackathon Winner',
    subtitle: '3rd Place — DataDrive AI Hackathon',
    detail: 'Competed in an AI-focused hackathon, delivering a high-performance data solution that earned 3rd place recognition.',
    color: 'oklch(0.78 0.18 75)',
  },
  {
    icon: FileText,
    title: 'Research Publication',
    subtitle: 'Elsevier Journal Submission',
    detail: 'Submitted research on AI-powered medical OCR system (MEDSEG) achieving 92.31% word-level accuracy to Elsevier journal.',
    color: 'oklch(0.72 0.16 195)',
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="06 — Achievements" title="Recognition" />

      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="rounded-3xl p-8 trace-border"
            style={{
              background: 'oklch(0.09 0.012 225)',
              border: `1px solid ${a.color}25`,
              boxShadow: `0 0 30px -12px ${a.color}30`,
            }}
          >
            {/* Icon */}
            <div
              className="flex size-14 items-center justify-center rounded-2xl mb-6"
              style={{ background: `${a.color}12`, border: `1px solid ${a.color}25` }}
            >
              <a.icon className="size-6" style={{ color: a.color }} aria-hidden="true" />
            </div>

            {/* Content */}
            <h3 className="font-serif text-xl font-semibold">{a.title}</h3>
            <p className="font-mono text-xs tracking-[0.12em] mt-2" style={{ color: a.color }}>
              {a.subtitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
              {a.detail}
            </p>

            {/* Bottom accent bar */}
            <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${a.color}40, transparent)` }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
