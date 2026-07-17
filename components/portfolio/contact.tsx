'use client'

import Image from 'next/image'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { Reveal, SectionHeading } from './motion-primitives'

const contacts = [
  {
    icon: Mail,
    label: 'SMTP',
    protocol: 'EMAIL',
    value: 'suganthakrishnan@gmail.com',
    href: 'mailto:suganthakrishnan@gmail.com',
    color: 'oklch(0.65 0.22 225)',
  },
  {
    icon: Phone,
    label: 'TEL',
    protocol: 'VOICE',
    value: '+91 8056717176',
    href: 'tel:+918056717176',
    color: 'oklch(0.72 0.16 195)',
  },
  {
    icon: LinkedinIcon,
    label: 'TCP/IP',
    protocol: 'LINKEDIN',
    value: 'in/sugantha-krishnan',
    href: 'https://www.linkedin.com/in/sugantha-krishnan',
    color: 'oklch(0.65 0.22 225)',
  },
  {
    icon: GithubIcon,
    label: 'SSH',
    protocol: 'GITHUB',
    value: 'Suganthakrishnan',
    href: 'https://github.com/Suganthakrishnan',
    color: 'oklch(0.78 0.18 75)',
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-24 md:py-32 overflow-hidden">
      {/* Subtle portrait ghost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 h-[70%] w-64 select-none opacity-[0.06] mix-blend-luminosity"
        style={{ filter: 'blur(40px) saturate(0.15)' }}
      >
        <Image
          src="/images/profile/black.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="256px"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to left, transparent 0%, oklch(0.07 0.005 240) 100%)' }}
        />
      </div>

      {/* Engineering-language header */}
      <div className="mb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'oklch(0.65 0.22 225)' }}>
              07 — Contact
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl lg:text-5xl">
            Open Communication Channel
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ background: 'oklch(0.72 0.28 145 / 10%)', border: '1px solid oklch(0.72 0.28 145 / 25%)' }}
            >
              <div className="led-green" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.2em]" style={{ color: 'oklch(0.72 0.28 145)' }}>
                UART CONNECTED
              </span>
            </div>
            <span className="font-mono text-xs" style={{ color: 'oklch(0.60 0.012 225)' }}>
              Ready for Collaboration
            </span>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <motion.a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group trace-border flex h-full flex-col rounded-3xl p-7 focus:outline-none focus-visible:ring-2"
              style={{
                background: 'oklch(0.09 0.012 225)',
                border: `1px solid ${c.color}20`,
              }}
              data-interactive
            >
              {/* Protocol label */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: c.color }}>
                    {c.label}
                  </p>
                  <p className="font-mono text-[8px] mt-0.5 tracking-wider" style={{ color: 'oklch(0.40 0.01 225)' }}>
                    {c.protocol}
                  </p>
                </div>
                <div
                  className="flex size-10 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                  style={{ background: `${c.color}12`, border: `1px solid ${c.color}20` }}
                >
                  <c.icon className="size-4" style={{ color: c.color }} aria-hidden="true" />
                </div>
              </div>

              <p className="break-all text-sm font-medium flex-1">{c.value}</p>

              {/* Packet transmission indicator */}
              <div className="mt-4 flex items-center gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map(dot => (
                  <motion.div
                    key={dot}
                    className="h-0.5 flex-1 rounded"
                    style={{ background: `${c.color}20` }}
                    animate={{
                      background: [
                        `${c.color}20`,
                        `${c.color}80`,
                        `${c.color}20`,
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: dot * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
                <ArrowUpRight
                  className="size-3.5 ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: c.color }}
                  aria-hidden="true"
                />
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      {/* Footer */}
      <Reveal delay={0.35} className="mt-24">
        <footer className="flex flex-col items-center gap-3 pt-10" style={{ borderTop: '1px solid oklch(0.65 0.22 225 / 12%)' }}>
          <div className="flex items-center gap-3">
            <div className="led-green" aria-label="System online" />
            <p className="font-mono text-xs tracking-[0.2em]" style={{ color: 'oklch(0.60 0.012 225)' }}>
              SYS:ONLINE · ALL CHANNELS READY
            </p>
          </div>
          <p className="font-serif text-sm tracking-wide">Sugantha Krishnan</p>
          <p className="font-mono text-xs" style={{ color: 'oklch(0.50 0.01 225)' }}>
            Electronics &amp; Communication Engineer — AI · Embedded · Software
          </p>
        </footer>
      </Reveal>
    </section>
  )
}
