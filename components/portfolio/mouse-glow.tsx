'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

export function MouseGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 80, damping: 25 })
  const sy = useSpring(y, { stiffness: 80, damping: 25 })

  // Probe cursor position (slightly lagged)
  const px = useSpring(x, { stiffness: 120, damping: 22 })
  const py = useSpring(y, { stiffness: 120, damping: 22 })

  const [isHovering, setIsHovering] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const moveTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsMoving(true)
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current)
      moveTimerRef.current = setTimeout(() => setIsMoving(false), 150)
    }

    const onEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-interactive]')
      ) {
        setIsHovering(true)
      }
    }

    const onLeaveInteractive = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnterInteractive)
    document.addEventListener('mouseout', onLeaveInteractive)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnterInteractive)
      document.removeEventListener('mouseout', onLeaveInteractive)
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current)
    }
  }, [x, y])

  const background = useMotionTemplate`radial-gradient(450px circle at ${sx}px ${sy}px, oklch(0.65 0.22 225 / 7%), transparent 70%)`

  return (
    <>
      {/* Ambient mouse light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background }}
      />

      {/* Probe cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: px,
          y: py,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          animate={{
            scale: isHovering ? 1.4 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Probe body */}
          <motion.circle
            cx="16"
            cy="16"
            r="5"
            stroke={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            strokeWidth="1.5"
            fill="none"
            animate={{
              r: isHovering ? 6 : isMoving ? 4.5 : 5,
              opacity: isMoving ? 1 : 0.8,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
          {/* Center dot */}
          <motion.circle
            cx="16"
            cy="16"
            r="2"
            fill={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            animate={{ r: isHovering ? 2.5 : 1.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
          {/* Cross-hair lines */}
          <motion.line
            x1="16" y1="4" x2="16" y2="10"
            stroke={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            strokeWidth="1"
            animate={{ opacity: isMoving ? 1 : 0.5 }}
          />
          <motion.line
            x1="16" y1="22" x2="16" y2="28"
            stroke={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            strokeWidth="1"
            animate={{ opacity: isMoving ? 1 : 0.5 }}
          />
          <motion.line
            x1="4" y1="16" x2="10" y2="16"
            stroke={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            strokeWidth="1"
            animate={{ opacity: isMoving ? 1 : 0.5 }}
          />
          <motion.line
            x1="22" y1="16" x2="28" y2="16"
            stroke={isHovering ? 'oklch(0.78 0.18 75)' : 'oklch(0.65 0.22 225)'}
            strokeWidth="1"
            animate={{ opacity: isMoving ? 1 : 0.5 }}
          />
          {/* Outer ring glow when hovering */}
          {isHovering && (
            <motion.circle
              cx="16"
              cy="16"
              r="10"
              stroke="oklch(0.78 0.18 75 / 30%)"
              strokeWidth="1"
              fill="none"
              initial={{ r: 6, opacity: 0 }}
              animate={{ r: 12, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </motion.svg>
      </motion.div>
    </>
  )
}
