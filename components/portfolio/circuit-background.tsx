'use client'

import { useEffect, useRef } from 'react'

interface TraceNode {
  x: number
  y: number
  gridX: number
  gridY: number
}

interface SignalPulse {
  traceIndex: number
  progress: number
  speed: number
  opacity: number
}

interface Trace {
  x1: number; y1: number
  x2: number; y2: number
  midX: number; midY: number
  isHorizontal: boolean
}

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    let nodes: TraceNode[] = []
    let traces: Trace[] = []
    let pulses: SignalPulse[] = []
    let hexLabels: { x: number; y: number; text: string }[] = []
    let frame = 0

    const GRID_SIZE = 80
    const TRACE_COLOR_DIM = 'rgba(37, 99, 180, 0.08)'
    const TRACE_COLOR_MID = 'rgba(59, 130, 246, 0.14)'
    const TRACE_COLOR_LIT = 'rgba(96, 165, 250, 0.40)'
    const VIA_COLOR = 'rgba(71, 145, 210, 0.18)'
    const SIGNAL_COLOR_CORE = 'rgba(217, 170, 40, 0.9)'
    const SIGNAL_COLOR_GLOW = 'rgba(251, 191, 36, 0.3)'
    const HEX_COLOR = 'rgba(59, 130, 246, 0.10)'

    const HEX_POOL = [
      '0xA4F2', '0x00FF', '0x3C08', '0xDEAD', '0xBEEF',
      '0xF00D', '0x1337', '0xCAFE', '0xACDC', '0xFF00',
    ]

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Build a sparse grid of nodes
      nodes = []
      traces = []
      pulses = []
      hexLabels = []

      const colCount = Math.ceil(width / GRID_SIZE) + 1
      const rowCount = Math.ceil(height / GRID_SIZE) + 1

      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
          // Not every grid intersection gets a node — use a density function
          if (Math.random() > 0.55) continue
          nodes.push({
            x: col * GRID_SIZE + (Math.random() - 0.5) * 12,
            y: row * GRID_SIZE + (Math.random() - 0.5) * 12,
            gridX: col,
            gridY: row,
          })
        }
      }

      // Build orthogonal traces between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = Math.abs(a.gridX - b.gridX)
          const dy = Math.abs(a.gridY - b.gridY)
          // Only connect nodes that are 1-2 grid cells apart
          if (dx <= 2 && dy <= 2 && Math.random() > 0.4) {
            // Orthogonal routing: go horizontal first, then vertical
            traces.push({
              x1: a.x, y1: a.y,
              x2: b.x, y2: b.y,
              midX: b.x, midY: a.y,
              isHorizontal: Math.random() > 0.5,
            })
          }
        }
      }

      // Limit trace count for performance
      if (traces.length > 200) {
        traces = traces.slice(0, 200)
      }

      // Hex labels near some vias
      nodes.forEach(n => {
        if (Math.random() > 0.85) {
          hexLabels.push({
            x: n.x + 6,
            y: n.y - 6,
            text: HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)],
          })
        }
      })

      // Seed initial signal pulses
      if (!prefersReduced) {
        for (let p = 0; p < Math.min(12, Math.floor(traces.length / 8)); p++) {
          pulses.push({
            traceIndex: Math.floor(Math.random() * traces.length),
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.003,
            opacity: 0.6 + Math.random() * 0.4,
          })
        }
      }
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      frame++

      const mouse = mouseRef.current

      // Draw traces
      for (const tr of traces) {
        // Distance from mouse to trace midpoint
        const mx = (tr.x1 + tr.x2) / 2
        const my = (tr.y1 + tr.y2) / 2
        const dist = Math.hypot(mx - mouse.x, my - mouse.y)
        const boost = dist < 180 ? (1 - dist / 180) : 0

        const color = boost > 0.5 ? TRACE_COLOR_LIT
          : boost > 0.1 ? TRACE_COLOR_MID
          : TRACE_COLOR_DIM

        ctx.strokeStyle = color
        ctx.lineWidth = boost > 0.3 ? 1.2 : 0.6
        ctx.beginPath()
        if (tr.isHorizontal) {
          ctx.moveTo(tr.x1, tr.y1)
          ctx.lineTo(tr.midX, tr.midY)
          ctx.lineTo(tr.x2, tr.y2)
        } else {
          ctx.moveTo(tr.x1, tr.y1)
          ctx.lineTo(tr.x1, tr.y2)
          ctx.lineTo(tr.x2, tr.y2)
        }
        ctx.stroke()
      }

      // Draw via holes
      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        const boost = dist < 150 ? (1 - dist / 150) * 0.6 : 0

        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.5 + boost * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 99, 180, ${0.15 + boost * 0.5})`
        ctx.fill()

        // Via ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, 4 + boost * 2.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 + boost * 0.3})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw hex labels
      ctx.font = '8px JetBrains Mono, monospace'
      ctx.fillStyle = HEX_COLOR
      for (const lbl of hexLabels) {
        ctx.fillText(lbl.text, lbl.x, lbl.y)
      }

      // Draw & update signal pulses
      if (!prefersReduced) {
        for (const pulse of pulses) {
          pulse.progress += pulse.speed
          if (pulse.progress >= 1) {
            pulse.progress = 0
            pulse.traceIndex = Math.floor(Math.random() * traces.length)
            pulse.speed = 0.002 + Math.random() * 0.003
          }

          const tr = traces[pulse.traceIndex]
          if (!tr) continue

          // Interpolate position along orthogonal path
          let px: number, py: number
          const t = pulse.progress
          const halfPoint = 0.5

          if (t < halfPoint) {
            // First segment
            const seg = t / halfPoint
            if (tr.isHorizontal) {
              px = tr.x1 + (tr.midX - tr.x1) * seg
              py = tr.y1 + (tr.midY - tr.y1) * seg
            } else {
              px = tr.x1
              py = tr.y1 + (tr.y2 - tr.y1) * seg
            }
          } else {
            // Second segment
            const seg = (t - halfPoint) / halfPoint
            if (tr.isHorizontal) {
              px = tr.midX + (tr.x2 - tr.midX) * seg
              py = tr.midY + (tr.y2 - tr.midY) * seg
            } else {
              px = tr.x1 + (tr.x2 - tr.x1) * seg
              py = tr.y2
            }
          }

          // Draw golden signal dot with glow
          const grd = ctx.createRadialGradient(px, py, 0, px, py, 6)
          grd.addColorStop(0, SIGNAL_COLOR_CORE)
          grd.addColorStop(0.4, SIGNAL_COLOR_GLOW)
          grd.addColorStop(1, 'transparent')
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(px, py, 6, 0, Math.PI * 2)
          ctx.fill()

          // Core dot
          ctx.fillStyle = SIGNAL_COLOR_CORE
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fill()
        }

        // Occasionally spawn new pulses
        if (frame % 120 === 0 && pulses.length < 18) {
          pulses.push({
            traceIndex: Math.floor(Math.random() * traces.length),
            progress: 0,
            speed: 0.002 + Math.random() * 0.003,
            opacity: 0.7 + Math.random() * 0.3,
          })
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)

    if (prefersReduced) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.85 }}
    />
  )
}
