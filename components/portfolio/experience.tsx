'use client'

import { Reveal, SectionHeading } from './motion-primitives'

const roles = [
  {
    title: 'PCB Design Intern',
    company: 'Pinnavox',
    points: [
      'Designing multilayer PCBs for embedded and IoT products',
      'Worked with KiCad',
      'Followed DFM and EMI/EMC standards',
      'Generated fabrication-ready Gerber files',
    ],
  },
  {
    title: 'Embedded Systems Intern',
    company: 'Sri Tech Engineering',
    points: [
      'Implemented Modbus RTU/TCP communication',
      'Python-based tooling',
      'Industrial PLC communication',
    ],
  },
  {
    title: 'Embedded Systems Intern',
    company: 'Green Ray Technologies',
    points: [
      'STM32 firmware development',
      'Embedded C',
      'Relay control for industrial air scrubbers',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="03 — Experience" title="Where I've worked" />

      <div className="relative ml-3 md:ml-6">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent"
        />
        <ol className="flex flex-col gap-10">
          {roles.map((role, i) => (
            <li key={role.company} className="relative pl-8 md:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-8 size-[11px] rounded-full border border-primary bg-background shadow-[0_0_12px_oklch(0.68_0.19_295/60%)]"
              />
              <Reveal delay={i * 0.08}>
                <div className="glass glass-hover rounded-3xl p-7 md:p-8">
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-xl font-medium">
                      {role.title}
                    </h3>
                    <p className="text-sm text-primary">{role.company}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
