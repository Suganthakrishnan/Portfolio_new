'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './brand-icons'
import { Reveal, SectionHeading } from './motion-primitives'

const metrics = [
  { value: '92.31%', label: 'Word Accuracy' },
  { value: '95.92%', label: 'Character Accuracy' },
  { value: '4.07%', label: 'CER' },
  { value: '7.68%', label: 'WER' },
]

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function GithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
    >
      <GithubIcon className="size-4" />
      View on GitHub
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </a>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="04 — Projects" title="Selected work" />

      {/* MEDSEG — featured */}
      <Reveal>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass glass-hover overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <Image
              src="/images/project-medseg.png"
              alt="MEDSEG AI medical prescription OCR pipeline visualization"
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            />
          </div>
          <div className="p-8 md:p-12">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Featured Project
            </p>
            <h3 className="font-serif text-3xl font-semibold md:text-4xl">
              MEDSEG
            </h3>
            <p className="mt-2 text-primary">
              AI-powered Medical Prescription OCR
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Designed a YOLOv8 segmentation pipeline combined with a
              CRNN-BiLSTM-CTC OCR model for handwritten medical prescription
              recognition. Improved OCR accuracy significantly across noisy
              handwritten prescriptions.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-border bg-secondary/40 p-5 text-center"
                >
                  <p className="font-serif text-2xl font-semibold text-gradient md:text-3xl">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Tech
                items={[
                  'YOLOv8',
                  'TensorFlow',
                  'Python',
                  'CRNN',
                  'BiLSTM',
                  'Computer Vision',
                ]}
              />
            </div>
          </div>
        </motion.article>
      </Reveal>

      {/* ASCEND + DevSecOps */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Reveal delay={0.1}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-hover flex h-full flex-col overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/project-ascend.png"
                alt="ASCEND RPG productivity dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
              />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <h3 className="font-serif text-2xl font-semibold">ASCEND</h3>
              <p className="mt-1 text-sm text-primary">
                Real-Life RPG Productivity System
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                A productivity platform that gamifies workouts, sleep, habits
                and goals into RPG-style progression with XP, streaks and
                stats.
              </p>
              <div className="mt-5">
                <Tech items={['React', 'TypeScript', 'Supabase']} />
              </div>
              <div className="mt-6">
                <GithubLink href="https://github.com/Suganthakrishnan/ASCEND" />
              </div>
            </div>
          </motion.article>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-hover flex h-full flex-col overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/project-devsecops.png"
                alt="DevSecOps pipeline visualization with security scanning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
              />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <h3 className="font-serif text-2xl font-semibold">
                DevSecOps Pipeline
              </h3>
              <p className="mt-1 text-sm text-primary">
                Secure CI/CD with AI-based CVE Analysis
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                End-to-end DevSecOps pipeline integrating Docker, Kubernetes,
                Trivy vulnerability scanning and AI-based CVE severity
                prediction.
              </p>
              <div className="mt-5">
                <Tech items={['Docker', 'Kubernetes', 'Trivy', 'AI/ML']} />
              </div>
              <div className="mt-6">
                <GithubLink href="https://github.com/Suganthakrishnan/glitchcon-secure-deployment" />
              </div>
            </div>
          </motion.article>
        </Reveal>
      </div>

      {/* Other projects */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'STM32 Industrial Relay Controller',
            desc: 'Firmware for relay-controlled industrial air scrubber systems built in Embedded C.',
            tech: ['STM32', 'Embedded C'],
          },
          {
            title: 'Modbus Industrial Gateway',
            desc: 'Python tooling for Modbus RTU/TCP communication with industrial PLC hardware.',
            tech: ['Python', 'Modbus', 'PLC'],
          },
          {
            title: 'Multilayer IoT PCB',
            desc: 'DFM-compliant multilayer PCB design for embedded IoT products, fabrication-ready.',
            tech: ['KiCad', 'DFM', 'Gerber'],
          },
        ].map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="glass glass-hover flex h-full flex-col rounded-3xl p-7">
              <h3 className="font-serif text-lg font-medium">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-5">
                <Tech items={p.tech} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
