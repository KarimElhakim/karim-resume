import { useEffect, useRef } from 'react'

const SplashCursor = () => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })

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

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.life = 1
        this.decay = Math.random() * 0.02 + 0.01
        this.hue = (Date.now() * 0.1) % 360
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= this.decay
        this.size *= 0.98
        this.hue = (this.hue + 1) % 360
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.life
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`
        ctx.fill()
        ctx.restore()
      }
    }

    // Create splash on mouse move
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      // Create particles on movement
      const dx = mouseRef.current.x - lastMouseRef.current.x
      const dy = mouseRef.current.y - lastMouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 2) {
        // Create splash particles
        for (let i = 0; i < Math.min(Math.floor(distance / 2), 5); i++) {
          particlesRef.current.push(
            new Particle(
              mouseRef.current.x + (Math.random() - 0.5) * 10,
              mouseRef.current.y + (Math.random() - 0.5) * 10
            )
          )
        }
        lastMouseRef.current = { ...mouseRef.current }
      }
    }

    // Create splash on click
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create burst of particles
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push(new Particle(x, y))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update()
        particle.draw()
        return particle.life > 0
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

