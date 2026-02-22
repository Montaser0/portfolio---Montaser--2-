'use client'
import React, { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

export default function PatternBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    let nodes: Node[] = []
    let pointerX = 0
    let pointerY = 0

    const css = getComputedStyle(document.documentElement)
    const readNum = (name: string, fallback: number) => {
      const raw = css.getPropertyValue(name).trim()
      const n = Number(raw)
      return Number.isFinite(n) ? n : fallback
    }
    const readColor = (name: string, fallback: string) => {
      const raw = css.getPropertyValue(name).trim()
      if (!raw || raw.includes('color-mix(')) return fallback
      return raw
    }

    const opts = {
      lineColor: readColor('--network-line-color', 'rgba(120,180,255,1)'),
      nodeColor: readColor('--network-node-color', 'rgba(120,180,255,1)'),
      lineOpacity: readNum('--network-line-opacity', 0.25),
      nodeOpacity: readNum('--network-node-opacity', 0.9),
      nodeSize: readNum('--network-node-size', 1.2),
      neighbors: Math.max(1, Math.floor(readNum('--network-neighbors', 3))),
      speed: readNum('--network-speed', 0.25),
      density: readNum('--network-density', 0.00006),
    }

    const resize = () => {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.max(40, Math.floor(width * height * opts.density))
      nodes = []
      for (let i = 0; i < target; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() * 2 - 1) * opts.speed,
          vy: (Math.random() * 2 - 1) * opts.speed,
        })
      }
    }

    const onPointer = (e: PointerEvent) => {
      const nx = e.clientX / (width || 1) - 0.5
      const ny = e.clientY / (height || 1) - 0.5
      pointerX = nx * 20
      pointerY = ny * 20
    }

    const dist2 = (a: Node, b: Node) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return dx * dx + dy * dy
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of nodes) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }

      ctx.save()
      ctx.translate(pointerX, pointerY)
      ctx.globalAlpha = opts.lineOpacity
      ctx.strokeStyle = opts.lineColor
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        const k = opts.neighbors
        const nearest: { j: number; d: number }[] = []
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue
          const q = nodes[j]
          const d = dist2(p, q)
          if (nearest.length < k) {
            nearest.push({ j, d })
            nearest.sort((a, b) => a.d - b.d)
          } else if (d < nearest[k - 1].d) {
            nearest[k - 1] = { j, d }
            nearest.sort((a, b) => a.d - b.d)
          }
        }
        for (const n of nearest) {
          const q = nodes[n.j]
          const a = Math.max(0.1, Math.min(1, 90 / Math.sqrt(n.d)))
          ctx.globalAlpha = opts.lineOpacity * a
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = opts.nodeOpacity
      ctx.fillStyle = opts.nodeColor
      for (const p of nodes) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, opts.nodeSize, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(step)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    resize()
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none"
      style={{ opacity: 'var(--network-layer-opacity, 0.5)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
