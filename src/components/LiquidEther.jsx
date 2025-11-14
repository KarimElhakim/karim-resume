import { useEffect, useRef } from 'react'
import './LiquidEther.css'

const LiquidEther = ({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6
}) => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Simple liquid ether effect
    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = mouseForce / (distance + 1)

        if (distance < cursorSize) {
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (isBounce) {
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        } else {
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0
        }

        // Viscous damping
        if (isViscous) {
          particle.vx *= (100 - viscous) / 100
          particle.vy *= (100 - viscous) / 100
        }

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = 1 - distance / 150
            ctx.lineWidth = 1
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.8
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [colors, mouseForce, cursorSize, isViscous, viscous, isBounce])

  return (
    <canvas
      ref={canvasRef}
      className="liquid-ether"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default LiquidEther

