'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './brand-icons'
import { Reveal, SectionHeading } from './motion-primitives'

const devStages = ['Idea', 'Architecture', 'Schematic', 'PCB', 'Firmware', 'AI Model', 'Product']

const metrics = [
  { value: '92.31%', label: 'Word Accuracy' },
  { value: '95.92%', label: 'Char Accuracy' },
  { value: '4.07%',  label: 'CER' },
  { value: '7.68%',  label: 'WER' },
]

function Tech({ items, color = 'oklch(0.65 0.22 225)' }: { items: string[]; color?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {items.map(t => (
        <li
          key={t}
          className="rounded-full px-3 py-1 text-xs font-mono"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}30`,
            color,
          }}
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
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors"
      style={{
        border: '1px solid oklch(0.65 0.22 225 / 20%)',
        color: 'oklch(0.75 0.01 240)',
      }}
      data-interactive
    >
      <GithubIcon className="size-4" />
      View on GitHub
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </a>
  )
}

function DevStagesBadge() {
  const [stage, setStage] = useState(0)

  const next = () => setStage(s => (s + 1) % devStages.length)

  return (
    <button
      type="button"
      onClick={next}
      data-interactive
      aria-label={`Development stage: ${devStages[stage]}. Click to advance.`}
      className="flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
      style={{
        background: 'oklch(0.78 0.18 75 / 10%)',
        border: '1px solid oklch(0.78 0.18 75 / 25%)',
        color: 'oklch(0.78 0.18 75)',
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: 'oklch(0.78 0.18 75)' }} aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.span
          key={stage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {devStages[stage].toUpperCase()}
        </motion.span>
      </AnimatePresence>
      <span style={{ color: 'oklch(0.60 0.012 225)' }}>{stage + 1}/{devStages.length}</span>
    </button>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="05 — Projects" title="Selected work" />

      {/* MEDSEG — Featured */}
      <Reveal>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="trace-border overflow-hidden rounded-3xl"
          style={{
            background: 'oklch(0.09 0.012 225)',
            border: '1px solid oklch(0.65 0.22 225 / 15%)',
          }}
        >
          <div className="group relative aspect-[16/9] w-full md:aspect-[21/9] overflow-hidden">
            <Image
              src="/images/projects/project-medseg.png"
              alt="MEDSEG AI medical prescription OCR pipeline visualization"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, oklch(0.09 0.012 225 / 90%) 0%, transparent 60%)' }}
            />
          </div>
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'oklch(0.65 0.22 225)' }}>
                Featured Project
              </p>
              <DevStagesBadge />
            </div>
            <h3 className="font-serif text-3xl font-semibold md:text-4xl">MEDSEG</h3>
            <p className="mt-2" style={{ color: 'oklch(0.72 0.16 195)' }}>
              AI-powered Medical Prescription OCR
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
              Designed a YOLOv8 segmentation pipeline combined with a CRNN-BiLSTM-CTC OCR model
              for handwritten medical prescription recognition. Improved OCR accuracy significantly
              across noisy handwritten prescriptions.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {metrics.map(m => (
                <div
                  key={m.label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: 'oklch(0.12 0.012 225)', border: '1px solid oklch(0.65 0.22 225 / 12%)' }}
                >
                  <p className="font-serif text-2xl font-semibold md:text-3xl text-gradient-signal">{m.value}</p>
                  <p className="mt-1 text-xs" style={{ color: 'oklch(0.60 0.012 225)' }}>{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Tech
                items={['YOLOv8', 'TensorFlow', 'Python', 'CRNN', 'BiLSTM', 'Computer Vision']}
                color="oklch(0.65 0.22 225)"
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
            className="trace-border flex h-full flex-col overflow-hidden rounded-3xl"
            style={{ background: 'oklch(0.09 0.012 225)', border: '1px solid oklch(0.72 0.16 195 / 15%)' }}
          >
            <div className="group relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/projects/project-ascend.jpg"
                alt="ASCEND RPG productivity dashboard"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, oklch(0.09 0.012 225 / 80%) 0%, transparent 60%)' }}
              />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <h3 className="font-serif text-2xl font-semibold">ASCEND</h3>
              <p className="mt-1 text-sm" style={{ color: 'oklch(0.72 0.16 195)' }}>
                Real-Life RPG Productivity System
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
                A productivity platform that gamifies workouts, sleep, habits and goals
                into RPG-style progression with XP, streaks and stats.
              </p>
              <div className="mt-5">
                <Tech items={['React', 'TypeScript', 'Supabase']} color="oklch(0.72 0.16 195)" />
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
            className="trace-border flex h-full flex-col overflow-hidden rounded-3xl"
            style={{ background: 'oklch(0.09 0.012 225)', border: '1px solid oklch(0.78 0.18 75 / 15%)' }}
          >
            <div className="group relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/projects/project-devsecops.png"
                alt="DevSecOps pipeline visualization with security scanning"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, oklch(0.09 0.012 225 / 80%) 0%, transparent 60%)' }}
              />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <h3 className="font-serif text-2xl font-semibold">DevSecOps Pipeline</h3>
              <p className="mt-1 text-sm" style={{ color: 'oklch(0.78 0.18 75)' }}>
                Secure CI/CD with AI-based CVE Analysis
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
                End-to-end DevSecOps pipeline integrating Docker, Kubernetes, Trivy
                vulnerability scanning and AI-based CVE severity prediction.
              </p>
              <div className="mt-5">
                <Tech items={['Docker', 'Kubernetes', 'Trivy', 'AI/ML']} color="oklch(0.78 0.18 75)" />
              </div>
              <div className="mt-6">
                <GithubLink href="https://github.com/Suganthakrishnan/glitchcon-secure-deployment" />
              </div>
            </div>
          </motion.article>
        </Reveal>
      </div>

      {/* Other projects — smaller cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'STM32 Industrial Relay Controller',
            desc: 'Firmware for relay-controlled industrial air scrubber systems built in Embedded C.',
            tech: ['STM32', 'Embedded C'],
            color: 'oklch(0.65 0.22 225)',
          },
          {
            title: 'Modbus Industrial Gateway',
            desc: 'Python tooling for Modbus RTU/TCP communication with industrial PLC hardware.',
            tech: ['Python', 'Modbus', 'PLC'],
            color: 'oklch(0.72 0.16 195)',
          },
          {
            title: 'Multilayer IoT PCB',
            desc: 'DFM-compliant multilayer PCB design for embedded IoT products, fabrication-ready.',
            tech: ['KiCad', 'DFM', 'Gerber'],
            color: 'oklch(0.78 0.18 75)',
          },
        ].map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35 }}
              className="trace-border flex h-full flex-col rounded-3xl p-7"
              style={{ background: 'oklch(0.09 0.012 225)', border: `1px solid ${p.color}15` }}
            >
              {/* Accent bar */}
              <div className="w-8 h-0.5 rounded mb-4" style={{ background: p.color }} />
              <h3 className="font-serif text-lg font-medium">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>
                {p.desc}
              </p>
              <div className="mt-5">
                <Tech items={p.tech} color={p.color} />
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
