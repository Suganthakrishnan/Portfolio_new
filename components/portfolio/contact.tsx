'use client'

import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { Reveal, SectionHeading } from './motion-primitives'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'suganthakrishnan@gmail.com',
    href: 'mailto:suganthakrishnan@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 00000 00000',
    href: 'tel:+910000000000',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'in/sugantha-krishnan',
    href: 'https://www.linkedin.com/in/sugantha-krishnan',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'Suganthakrishnan',
    href: 'https://github.com/Suganthakrishnan',
  },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading
        eyebrow="06 — Contact"
        title="Let's build something intelligent"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass glass-hover group flex h-full flex-col rounded-3xl p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
                  <c.icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="mt-1 break-all text-sm font-medium text-foreground">
                {c.value}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-24">
        <footer className="flex flex-col items-center gap-2 border-t border-border pt-10 text-center">
          <p className="font-serif text-sm tracking-wide">Sugantha Krishnan</p>
          <p className="text-xs text-muted-foreground">
            Electronics &amp; Communication Engineer — AI · Embedded · Software
          </p>
        </footer>
      </Reveal>
    </section>
  )
}
