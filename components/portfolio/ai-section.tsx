'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './motion-primitives'

const LAYERS = [
  { label: 'Input', nodes: 3 },
  { label: 'Hidden 1', nodes: 5 },
  { label: 'Hidden 2', nodes: 5 },
  { label: 'Output', nodes: 2 },
]

const BLUE = 'oklch(0.65 0.22 225)'
const CYAN = 'oklch(0.72 0.16 195)'
const GOLDEN = 'oklch(0.78 0.18 75)'

interface Pulse {
  fromLayer: number
  fromNode: number
  toNode: number
  progress: number
  speed: number
}

export function AiSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setInView(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Build node positions
    const layerPositions: { x: number; y: number }[][] = []
    const totalLayers = LAYERS.length
    const layerSpacing = W / (totalLayers + 1)

    LAYERS.forEach((layer, li) => {
      const x = layerSpacing * (li + 1)
      const nodeSpacing = H / (layer.nodes + 1)
      const nodes = Array.from({ length: layer.nodes }, (_, ni) => ({
        x,
        y: nodeSpacing * (ni + 1),
      }))
      layerPositions.push(nodes)
    })

    // Active node state
    const nodeActive = layerPositions.map(layer => layer.map(() => 0))

    // Signal pulses
    const pulses: Pulse[] = []

    const spawnPulse = () => {
      const fromLayer = Math.floor(Math.random() * (LAYERS.length - 1))
      const fromNode = Math.floor(Math.random() * LAYERS[fromLayer].nodes)
      const toNode = Math.floor(Math.random() * LAYERS[fromLayer + 1].nodes)
      pulses.push({ fromLayer, fromNode, toNode, progress: 0, speed: 0.008 + Math.random() * 0.008 })
    }

    // Seed initial pulses
    for (let i = 0; i < 6; i++) {
      const p = { fromLayer: 0, fromNode: i % 3, toNode: i % 5, progress: i * 0.15, speed: 0.008 + Math.random() * 0.006 }
      pulses.push(p)
    }

    let frame = 0
    let inferenceShown = false

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      frame++

      // Decay node activations
      for (let li = 0; li < layerPositions.length; li++) {
        for (let ni = 0; ni < layerPositions[li].length; ni++) {
          nodeActive[li][ni] *= 0.95
        }
      }

      // Draw connections (dim)
      for (let li = 0; li < layerPositions.length - 1; li++) {
        for (const a of layerPositions[li]) {
          for (const b of layerPositions[li + 1]) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = 'oklch(0.65 0.22 225 / 8%)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update & draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        if (!prefersReduced) p.progress += p.speed

        if (p.progress >= 1) {
          // Activate destination node
          const destLayer = p.fromLayer + 1
          nodeActive[destLayer][p.toNode] = Math.min(1, nodeActive[destLayer][p.toNode] + 0.8)

          // Trigger cascade to next layer
          if (destLayer < LAYERS.length - 1) {
            const nextNode = Math.floor(Math.random() * LAYERS[destLayer + 1].nodes)
            pulses.push({
              fromLayer: destLayer,
              fromNode: p.toNode,
              toNode: nextNode,
              progress: 0,
              speed: 0.008 + Math.random() * 0.007,
            })
          } else {
            inferenceShown = true
          }

          pulses.splice(i, 1)

          // Spawn new pulse from input layer
          if (pulses.length < 12 && Math.random() > 0.3) spawnPulse()
          continue
        }

        // Draw pulse as a glowing dot along the connection
        const a = layerPositions[p.fromLayer][p.fromNode]
        const b = layerPositions[p.fromLayer + 1][p.toNode]
        const px = a.x + (b.x - a.x) * p.progress
        const py = a.y + (b.y - a.y) * p.progress

        // Highlight the active connection
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `oklch(0.65 0.22 225 / ${20 + p.progress * 20}%)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Pulse glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8)
        grd.addColorStop(0, 'oklch(0.78 0.18 75 / 90%)')
        grd.addColorStop(0.4, 'oklch(0.78 0.18 75 / 30%)')
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = GOLDEN
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw nodes
      for (let li = 0; li < layerPositions.length; li++) {
        for (let ni = 0; ni < layerPositions[li].length; ni++) {
          const { x, y } = layerPositions[li][ni]
          const activation = nodeActive[li][ni]
          const isOutput = li === LAYERS.length - 1

          // Node glow
          if (activation > 0.1) {
            const glowColor = isOutput ? CYAN : BLUE
            const grd = ctx.createRadialGradient(x, y, 0, x, y, 20 + activation * 10)
            grd.addColorStop(0, `${glowColor.replace(')', ` / ${activation * 60}%)`).replace('oklch(', 'oklch(')}`)
            grd.addColorStop(1, 'transparent')
            ctx.fillStyle = grd
            ctx.beginPath()
            ctx.arc(x, y, 20 + activation * 10, 0, Math.PI * 2)
            ctx.fill()
          }

          // Node circle
          ctx.beginPath()
          ctx.arc(x, y, 6 + activation * 3, 0, Math.PI * 2)
          const nodeColor = isOutput
            ? `oklch(0.72 0.16 195 / ${30 + activation * 70}%)`
            : `oklch(0.65 0.22 225 / ${25 + activation * 75}%)`
          ctx.fillStyle = nodeColor
          ctx.fill()
          ctx.strokeStyle = isOutput
            ? `oklch(0.72 0.16 195 / ${50 + activation * 50}%)`
            : `oklch(0.65 0.22 225 / ${40 + activation * 60}%)`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [inView])

  return (
    <section id="ai" className="mx-auto max-w-6xl px-4 py-24 md:py-32" ref={sectionRef}>
      <SectionHeading eyebrow="03 — AI Engine" title="Neural inference pipeline" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'oklch(0.09 0.012 225)',
          border: '1px solid oklch(0.65 0.22 225 / 15%)',
        }}
      >
        {/* Layer labels */}
        <div className="absolute top-4 left-0 right-0 flex justify-around px-4" aria-hidden="true">
          {LAYERS.map((layer, i) => (
            <div key={layer.label} className="text-center">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{
                color: i === LAYERS.length - 1 ? CYAN : 'oklch(0.65 0.22 225 / 50%)'
              }}>
                {layer.label}
              </p>
              <p className="font-mono text-[8px]" style={{ color: 'oklch(0.40 0.01 225)' }}>
                {layer.nodes}N
              </p>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          aria-label="Animated neural network visualization"
          className="w-full"
          style={{ height: '240px', display: 'block' }}
        />

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: '1px solid oklch(0.65 0.22 225 / 10%)' }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-3">
            <div className="led-blue" />
            <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'oklch(0.65 0.22 225)' }}>
              INFERENCE ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px]" style={{ color: 'oklch(0.40 0.01 225)' }}>
              MODEL: CRNN-BiLSTM-CTC
            </span>
            <span className="font-mono text-[9px]" style={{ color: GOLDEN }}>
              ACC: 92.31%
            </span>
          </div>
        </div>
      </motion.div>

      {/* AI capability cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          { title: 'Computer Vision', desc: 'YOLOv8 segmentation & object detection pipelines for medical and industrial applications.', color: BLUE },
          { title: 'OCR & NLP', desc: 'CRNN-BiLSTM-CTC models for handwritten text recognition with 92%+ accuracy.', color: CYAN },
          { title: 'Security AI', desc: 'AI-driven CVE severity prediction integrated into DevSecOps CI/CD pipelines.', color: GOLDEN },
        ].map(card => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="rounded-2xl p-6 trace-border"
            style={{
              background: 'oklch(0.09 0.012 225)',
              border: `1px solid ${card.color}20`,
            }}
          >
            <div className="w-8 h-1 rounded mb-4" style={{ background: card.color }} />
            <h3 className="font-serif text-base font-semibold mb-2">{card.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.012 225)' }}>{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
