'use client'

import { Trophy, FileText } from 'lucide-react'
import { Reveal, SectionHeading } from './motion-primitives'

const achievements = [
  {
    icon: Trophy,
    title: 'Hackathon Winner',
    subtitle: '3rd Place',
    detail: 'DataDrive AI Hackathon',
  },
  {
    icon: FileText,
    title: 'Elsevier Journal Submission',
    subtitle: 'Research Publication',
    detail: 'Medical OCR Research',
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="05 — Achievements" title="Recognition" />

      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <div className="glass glass-hover flex items-start gap-5 rounded-3xl p-8">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15">
                <a.icon className="size-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium">{a.title}</h3>
                <p className="mt-1 text-sm text-primary">{a.subtitle}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
