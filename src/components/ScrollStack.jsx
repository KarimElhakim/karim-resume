import { useState, useEffect, useRef, Children } from 'react'
import './ScrollStack.css'

const ScrollStackItem = ({ children, className = '' }) => {
  return (
    <div className={`scroll-stack-item ${className}`}>
      {children}
    </div>
  )
}

const ScrollStack = ({ children, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const scrollCenter = scrollTop + containerHeight / 2

      // Find which item is closest to the center of the viewport
      let closestIndex = 0
      let closestDistance = Infinity

      Children.forEach(children, (child, index) => {
        if (child.type !== ScrollStackItem) return
        
        const itemElement = itemsRef.current[index]
        if (!itemElement) return

        const itemTop = itemElement.offsetTop
        const itemHeight = itemElement.offsetHeight
        const itemCenter = itemTop + itemHeight / 2

        const distance = Math.abs(scrollCenter - itemCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      
      // Initial check after DOM is ready
      const timeoutId = setTimeout(() => {
        handleScroll()
      }, 300)
      
      // Also check on resize
      const handleResize = () => {
        setTimeout(handleScroll, 100)
      }
      window.addEventListener('resize', handleResize, { passive: true })
      
      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        clearTimeout(timeoutId)
      }
    }
  }, [children])

  // Set initial active index to 0
  useEffect(() => {
    setActiveIndex(0)
  }, [])

  return (
    <div className={`scroll-stack ${className}`} ref={containerRef}>
      {Children.map(children, (child, index) => {
        if (child.type !== ScrollStackItem) return child
        
        return (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el
            }}
            className={`scroll-stack-item-wrapper ${index === activeIndex ? 'active' : ''}`}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}

ScrollStack.Item = ScrollStackItem

export default ScrollStack
export { ScrollStackItem }
