import { useEffect, useRef } from 'react'
import './StarBorder.css'

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'cyan',
  speed = '5s',
  children,
  ...props
}) => {
  const borderRef = useRef(null)

  useEffect(() => {
    const border = borderRef.current
    if (!border) return

    const updateBorder = () => {
      const rect = border.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      // Create animated border using SVG
      const svg = border.querySelector('svg')
      if (svg) {
        svg.setAttribute('width', width)
        svg.setAttribute('height', height)
        const path = svg.querySelector('path')
        if (path) {
          const d = `M 0,0 L ${width},0 L ${width},${height} L 0,${height} Z`
          path.setAttribute('d', d)
        }
      }
    }

    updateBorder()
    window.addEventListener('resize', updateBorder)
    
    const resizeObserver = new ResizeObserver(updateBorder)
    resizeObserver.observe(border)

    return () => {
      window.removeEventListener('resize', updateBorder)
      resizeObserver.disconnect()
    }
  }, [])

  const colorMap = {
    cyan: '#00d4ff',
    blue: '#0066ff',
    purple: '#9d4edd',
    pink: '#ff006e',
    green: '#00ff88',
    yellow: '#ffd60a'
  }

  const borderColor = colorMap[color] || colorMap.cyan

  return (
    <Component
      ref={borderRef}
      className={`star-border-wrapper ${className}`}
      {...props}
    >
      <svg className="star-border-svg" width="100%" height="100%">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={borderColor} stopOpacity="1" />
            <stop offset="50%" stopColor={borderColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={borderColor} stopOpacity="1" />
          </linearGradient>
          <animate
            attributeName="x1"
            values="0%;100%;0%"
            dur={speed}
            repeatCount="indefinite"
          />
        </defs>
        <path
          className="star-border-path"
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth="2"
          strokeDasharray="10,5"
          style={{
            animation: `dash ${speed} linear infinite`
          }}
        />
      </svg>
      <div className="star-border-content">
        {children}
      </div>
    </Component>
  )
}

export default StarBorder

