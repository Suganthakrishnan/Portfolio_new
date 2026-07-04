'use client'

import { GraduationCap, Award, User } from 'lucide-react'
import { Reveal, SectionHeading } from './motion-primitives'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="01 — About" title="Engineering across the stack" />

      <div className="grid gap-6 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="glass glass-hover h-full rounded-3xl p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <User className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-medium">Sugantha Krishnan</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              ECE student with experience across AI, Embedded Systems, PCB
              Design and Software Engineering. Worked on industrial embedded
              systems, STM32 firmware, multilayer PCB design, AI-based medical
              OCR, DevSecOps and full-stack applications.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Interested in building intelligent products combining hardware
              and software.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="glass glass-hover rounded-3xl p-7">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <GraduationCap className="size-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm text-muted-foreground">Education</p>
              <p className="mt-1 font-medium leading-snug">
                B.Tech Electronics &amp; Communication Engineering
              </p>
              <p className="mt-1 text-sm text-muted-foreground">VIT Chennai</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass glass-hover rounded-3xl p-7">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <Award className="size-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm text-muted-foreground">CGPA</p>
              <p className="mt-1 font-serif text-3xl font-semibold text-gradient">
                9.4
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
