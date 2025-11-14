import { useEffect, useRef } from 'react'
import './PixelBlast.css'

const PixelBlast = ({
  variant = 'circle',
  pixelSize = 6,
  color = '#B19EEF',
  patternScale = 3,
  patternDensity = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = true,
  rippleSpeed = 0.4,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.5,
  liquid = true,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  liquidWobbleSpeed = 5,
  speed = 0.6,
  edgeFade = 0.25,
  transparent = true
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

    const pixels = []
    const cols = Math.floor(canvas.width / pixelSize)
    const rows = Math.floor(canvas.height / pixelSize)

    // Initialize pixels
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        pixels.push({
          x: x * pixelSize,
          y: y * pixelSize,
          size: pixelSize + (Math.random() - 0.5) * pixelSizeJitter,
          phase: Math.random() * Math.PI * 2,
          basePhase: Math.random() * Math.PI * 2
        })
      }
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let time = 0

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const animate = () => {
      time += speed * 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pixels.forEach(pixel => {
        const centerX = pixel.x + pixel.size / 2
        const centerY = pixel.y + pixel.size / 2

        // Distance from center
        const distX = centerX - canvas.width / 2
        const distY = centerY - canvas.height / 2
        const distFromCenter = Math.sqrt(distX * distX + distY * distY)
        const maxDist = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2

        // Distance from mouse
        const dx = centerX - mouseX
        const dy = centerY - mouseY
        const distFromMouse = Math.sqrt(dx * dx + dy * dy)

        // Liquid wobble effect
        let wobble = 0
        if (liquid) {
          wobble = Math.sin(time * liquidWobbleSpeed + pixel.basePhase) * liquidStrength
          if (distFromMouse < liquidRadius * 100) {
            wobble += (1 - distFromMouse / (liquidRadius * 100)) * liquidStrength * 2
          }
        }

        // Ripple effect
        let ripple = 0
        if (enableRipples && distFromMouse < 300) {
          const ripplePhase = distFromMouse * rippleThickness - time * rippleSpeed * 100
          ripple = Math.sin(ripplePhase) * (1 - distFromMouse / 300) * rippleIntensityScale
        }

        // Edge fade
        const edgeFadeFactor = 1 - Math.min(distFromCenter / (maxDist * (1 - edgeFade)), 1)

        // Calculate final position
        const finalX = pixel.x + wobble * pixel.size + ripple * pixel.size * 0.5
        const finalY = pixel.y + wobble * pixel.size + ripple * pixel.size * 0.5

        // Draw pixel
        ctx.save()
        ctx.globalAlpha = edgeFadeFactor * (transparent ? 0.8 : 1)
        ctx.fillStyle = color

        if (variant === 'circle') {
          ctx.beginPath()
          ctx.arc(finalX + pixel.size / 2, finalY + pixel.size / 2, pixel.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(finalX, finalY, pixel.size, pixel.size)
        }

        ctx.restore()
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
  }, [variant, pixelSize, color, patternScale, patternDensity, pixelSizeJitter, enableRipples, rippleSpeed, rippleThickness, rippleIntensityScale, liquid, liquidStrength, liquidRadius, liquidWobbleSpeed, speed, edgeFade, transparent])

  return (
    <canvas
      ref={canvasRef}
      className="pixel-blast"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  )
}

export default PixelBlast

