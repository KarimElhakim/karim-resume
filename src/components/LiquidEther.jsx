import { useEffect, useRef } from 'react'
import './LiquidEther.css'
import { ComponentPerformanceTracker } from '../utils/performanceMonitor'
import { componentCoordinator } from '../utils/componentCoordinator'

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
  const trackerRef = useRef(new ComponentPerformanceTracker('LiquidEther'))
  const componentRef = useRef({ name: 'LiquidEther' })
  
  // Register with component coordinator
  useEffect(() => {
    componentCoordinator.registerComponent('LiquidEther', componentRef.current);
    return () => {
      componentCoordinator.unregisterComponent('LiquidEther');
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animationId

    // Fix canvas sizing for crisp rendering and full document coverage
    const pixelRatio = window.devicePixelRatio || 1
    let resizeTimeout
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth
        // Use full document height, not just viewport
        const height = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          window.innerHeight
        )
        
        // Set actual canvas size accounting for pixel ratio
        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio
        
        // Scale context to match pixel ratio for crisp rendering
        ctx.scale(pixelRatio, pixelRatio)
        
        // Set CSS size to match display size - full document height
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
      }, 150)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('scroll', resizeCanvas, { passive: true })

    // Adaptive particle count based on device capabilities - reduced for better performance
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    const particleCount = isMobile ? 10 : isLowEnd ? 15 : 20 // Reduced from 15/20/30

    // Initialize particles array
    const particles = []

    // Use CSS size for particle initialization (not pixel ratio adjusted)
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let mouseX = displayWidth / 2
    let mouseY = displayHeight / 2
    let lastFrameTime = performance.now()

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Optimized animation loop - LiquidEther can be throttled if needed
    const animate = (currentTime) => {
      // Check with component coordinator - LiquidEther can be throttled for SplashCursor
      if (!componentCoordinator.shouldUpdate('LiquidEther')) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      // Minimal tracking overhead - only in dev mode
      if (import.meta.env.DEV) {
        trackerRef.current.startUpdate();
      }
      const deltaTime = currentTime - lastFrameTime
      lastFrameTime = currentTime

      // Use CSS display size for clearing and drawing
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight

      // Clear canvas efficiently
      ctx.clearRect(0, 0, displayWidth, displayHeight)

      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distanceSq = dx * dx + dy * dy // Use squared distance to avoid sqrt
        const distance = Math.sqrt(distanceSq)
        const force = mouseForce / (distance + 1)

        if (distance < cursorSize) {
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges - use display dimensions
        const displayWidth = window.innerWidth
        const displayHeight = window.innerHeight
        
        if (isBounce) {
          if (particle.x < 0 || particle.x > displayWidth) particle.vx *= -1
          if (particle.y < 0 || particle.y > displayHeight) particle.vy *= -1
        } else {
          if (particle.x < 0) particle.x = displayWidth
          if (particle.x > displayWidth) particle.x = 0
          if (particle.y < 0) particle.y = displayHeight
          if (particle.y > displayHeight) particle.y = 0
        }

        // Viscous damping
        if (isViscous) {
          particle.vx *= (100 - viscous) / 100
          particle.vy *= (100 - viscous) / 100
        }

        // Draw connections - optimized with distance check and batched rendering
        const maxConnectionDist = isMobile ? 100 : 120 // Reduced connection distance
        const maxConnectionDistSq = maxConnectionDist * maxConnectionDist
        
        // Batch line drawing for better performance
        ctx.beginPath()
        let hasLines = false
        
        for (let j = i + 1; j < particles.length; j++) {
          const otherParticle = particles[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxConnectionDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxConnectionDist) * 0.5
            
            if (alpha > 0.05) {
              ctx.globalAlpha = alpha
              ctx.strokeStyle = particle.color
              ctx.lineWidth = 1
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              hasLines = true
            }
          }
        }
        
        if (hasLines) {
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.8
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      if (import.meta.env.DEV) {
        trackerRef.current.endUpdate();
      }
      
      animationId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      // Clean up ALL event listeners to prevent memory leaks
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', resizeCanvas)
      
      // Cancel animation frame
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      
      // Clear timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
        resizeTimeout = null
      }
      
      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
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
        width: '100vw',
        height: '100%', // Cover full document height
        minHeight: '100vh', // At minimum cover viewport
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
        mixBlendMode: 'screen',
        willChange: 'contents',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        imageRendering: 'crisp-edges'
      }}
    />
  )
}

export default LiquidEther

