import { useEffect, useRef } from 'react'

const SplashCursor = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class for splash effect
    class Particle {
      constructor(x, y, vx = 0, vy = 0) {
        this.x = x
        this.y = y
        this.vx = vx + (Math.random() - 0.5) * 2
        this.vy = vy + (Math.random() - 0.5) * 2
        this.size = Math.random() * 4 + 2
        this.life = 1
        this.decay = Math.random() * 0.03 + 0.02
        this.hue = (Date.now() * 0.1 + Math.random() * 60) % 360
        this.gravity = 0.1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.gravity
        this.vx *= 0.98
        this.vy *= 0.98
        this.life -= this.decay
        this.size *= 0.97
        this.hue = (this.hue + 2) % 360
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.life)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, ${this.life})`)
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`
        ctx.fill()
        ctx.restore()
      }
    }

    // Create splash on mouse move
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const newX = e.clientX - rect.left
      const newY = e.clientY - rect.top

      // Calculate velocity
      const dx = newX - mouseRef.current.x
      const dy = newY - mouseRef.current.y
      velocityRef.current = { x: dx * 0.5, y: dy * 0.5 }

      mouseRef.current = { x: newX, y: newY }

      // Create particles based on movement speed
      const distance = Math.sqrt(dx * dx + dy * dy)
      const particleCount = Math.min(Math.floor(distance / 3), 8)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(
          new Particle(
            mouseRef.current.x + (Math.random() - 0.5) * 15,
            mouseRef.current.y + (Math.random() - 0.5) * 15,
            velocityRef.current.x,
            velocityRef.current.y
          )
        )
      }

      lastMouseRef.current = { ...mouseRef.current }
    }

    // Create burst on click
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create burst of particles
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30
        const speed = Math.random() * 5 + 3
        particlesRef.current.push(
          new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed)
        )
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update()
        particle.draw()
        return particle.life > 0 && particle.size > 0.1
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="splash-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default SplashCursor
