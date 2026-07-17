'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  BrainCircuit,
  Cpu,
  CircuitBoard,
  AppWindow,
} from 'lucide-react'
import { SectionHeading } from './motion-primitives'

const categories = [
  {
    id: 'prog',
    icon: Terminal,
    title: 'Programming',
    subtitle: 'PROG',
    color: 'oklch(0.65 0.22 225)',
    skills: [
      { name: 'Java'},
      { name: 'Python' },
      { name: 'Embedded C' },
      { name: 'SQL'},
      { name: 'TypeScript' },
    ],
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    title: 'AI / ML',
    subtitle: 'Deep learning',
    color: 'oklch(0.72 0.16 195)',
    skills: [
      { name: 'TensorFlow' },
      { name: 'YOLOv8' },
      { name: 'Scikit-learn' },
      { name: 'NumPy' },
      { name: 'OpenCV', },
      { name: 'Pandas',},
    ],
  },
  {
    id: 'embedded',
    icon: Cpu,
    title: 'Embedded',
    subtitle: 'MCU-IC',
    color: 'oklch(0.78 0.18 75)',
    skills: [
      { name: 'STM32,ESP32'},
      { name: 'Embedded C'},
      { name: 'UART, SPI, I2C, CAN'},
      { name: 'I2C' },
      { name: 'CAN' },
    ],
  },
  {
    id: 'pcb',
    icon: CircuitBoard,
    title: 'PCB Design',
    subtitle: 'PCB-IC',
    color: 'oklch(0.65 0.22 225)',
    skills: [
      { name: 'KiCad' },
      { name: 'DFM'},
      { name: 'EMC/EMI regulations' },
      { name: 'Gerber' },
    ],
  },
  {
    id: 'software',
    icon: AppWindow,
    title: 'Software',
    subtitle: 'SW',
    color: 'oklch(0.72 0.16 195)',
    skills: [
      { name: 'React'},
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Git / GitHub' },
      { name: 'Next.js'},
    ],
  },
]

function ICCard({ cat }: { cat: typeof categories[number] }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = cat.icon
  const PIN_COUNT = 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(e => !e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded(e => !e)
          }
        }}
        aria-expanded={expanded}
        aria-controls={`ic-${cat.id}-content`}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl cursor-pointer"
        style={{ '--tw-ring-color': cat.color } as React.CSSProperties}
        data-interactive
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'oklch(0.10 0.012 225)',
            border: `1px solid ${expanded ? cat.color + '50' : 'oklch(0.65 0.22 225 / 15%)'}`,
            boxShadow: expanded ? `0 0 24px -6px ${cat.color}40` : 'none',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* IC top pins */}
          <div className="flex justify-between px-6" aria-hidden="true">
            {Array.from({ length: PIN_COUNT }).map((_, i) => (
              <div
                key={i}
                className="w-px h-3"
                style={{ background: expanded ? cat.color : 'oklch(0.65 0.22 225 / 25%)' }}
              />
            ))}
          </div>

          {/* IC body */}
          <div className="px-5 py-4">
            {/* IC label header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="flex size-8 items-center justify-center rounded-lg"
                  style={{ background: `${cat.color}15` }}
                >
                  <Icon className="size-4" style={{ color: cat.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold">{cat.title}</p>
                  <p className="font-mono text-[9px] tracking-[0.2em]" style={{ color: cat.color }}>
                    {cat.subtitle}
                  </p>
                </div>
              </div>
              {/* Power indicator */}
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: cat.color }}
                animate={expanded
                  ? { opacity: 1, boxShadow: `0 0 6px ${cat.color}` }
                  : { opacity: 0.3, boxShadow: 'none' }
                }
              />
            </div>

            {/* Skill count summary */}
            <p className="font-mono text-[10px] tracking-wider" style={{ color: 'oklch(0.60 0.012 225)' }}>
              {cat.skills.length} modules loaded · {expanded ? 'TAP TO CLOSE' : 'TAP TO INSPECT'}
            </p>
          </div>

          {/* IC bottom pins */}
          <div className="flex justify-between px-6" aria-hidden="true">
            {Array.from({ length: PIN_COUNT }).map((_, i) => (
              <div
                key={i}
                className="w-px h-3"
                style={{ background: expanded ? cat.color : 'oklch(0.65 0.22 225 / 25%)' }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Expanded skill list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            id={`ic-${cat.id}-content`}
            role="region"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-2 rounded-2xl p-5"
              style={{
                background: 'oklch(0.09 0.01 225)',
                border: `1px solid ${cat.color}30`,
              }}
            >
              <p className="font-mono text-[9px] tracking-[0.3em] mb-3 uppercase" style={{ color: cat.color }}>
                Module Inventory
              </p>
              <ul className="flex flex-col gap-2">
                {cat.skills.map(skill => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}20` }}
                  >
                    <span className="font-mono text-xs text-foreground">{skill.name}</span>
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: cat.color }}>

                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading eyebrow="02 — Skills" title="Integrated circuit modules" />
      <p className="font-mono text-xs tracking-[0.2em] mb-10 -mt-6" style={{ color: 'oklch(0.60 0.012 225)' }}>
        Tap any IC to inspect loaded modules
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => (
          <ICCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  )
}
