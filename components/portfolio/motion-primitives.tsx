'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const inner = href ? (
    <a href={href} className={cn('inline-flex items-center gap-2', className)}>
      {children}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {children}
    </button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <Reveal className={cn('mb-12 md:mb-16', className)}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-medium text-balance md:text-4xl lg:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
