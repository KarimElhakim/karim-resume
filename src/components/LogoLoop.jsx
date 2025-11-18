import { useEffect, useRef } from 'react'
import './LogoLoop.css'

const LogoLoop = ({
  logos = [],
  speed = 120,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo loop'
}) => {
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const positionRef = useRef(0)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || logos.length === 0) return

    const duplicatedLogos = [...logos, ...logos]
    const itemWidth = logoHeight + gap
    const totalWidth = duplicatedLogos.length * itemWidth
    const speedPerFrame = speed / 60 // Convert to pixels per frame at 60fps

    const animate = () => {
      const currentSpeed = isHoveredRef.current && hoverSpeed > 0 ? hoverSpeed : speedPerFrame
      
      if (direction === 'left') {
        positionRef.current -= currentSpeed
        if (Math.abs(positionRef.current) >= totalWidth / 2) {
          positionRef.current = 0
        }
        container.style.transform = `translateX(${positionRef.current}px)`
      } else if (direction === 'right') {
        positionRef.current += currentSpeed
        if (positionRef.current >= totalWidth / 2) {
          positionRef.current = 0
        }
        container.style.transform = `translateX(${positionRef.current}px)`
      } else if (direction === 'up') {
        positionRef.current -= currentSpeed
        if (Math.abs(positionRef.current) >= totalWidth / 2) {
          positionRef.current = 0
        }
        container.style.transform = `translateY(${positionRef.current}px)`
      } else if (direction === 'down') {
        positionRef.current += currentSpeed
        if (positionRef.current >= totalWidth / 2) {
          positionRef.current = 0
        }
        container.style.transform = `translateY(${positionRef.current}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [logos, speed, direction, logoHeight, gap, hoverSpeed])

  const duplicatedLogos = [...logos, ...logos]

  return (
    <div 
      className={`logo-loop-container ${direction}`}
      style={{
        maskImage: fadeOut ? `linear-gradient(to ${direction === 'left' || direction === 'right' ? 'right' : 'bottom'}, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : 'none',
        WebkitMaskImage: fadeOut ? `linear-gradient(to ${direction === 'left' || direction === 'right' ? 'right' : 'bottom'}, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : 'none'
      }}
    >
      <div 
        ref={containerRef}
        className="logo-loop-track"
        style={{
          flexDirection: direction === 'left' || direction === 'right' ? 'row' : 'column',
          gap: `${gap}px`
        }}
        aria-label={ariaLabel}
      >
        {duplicatedLogos.map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`logo-loop-item ${scaleOnHover ? 'scale-on-hover' : ''}`}
            style={{
              height: `${logoHeight}px`,
              width: `${logoHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${logoHeight * 0.7}px`
            }}
            title={logo.title || logo.alt}
          >
            {logo.node || (logo.src && <img src={logo.src} alt={logo.alt} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />)}
          </a>
        ))}
      </div>
    </div>
  )
}

export default LogoLoop

