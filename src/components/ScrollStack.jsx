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
      const itemHeight = containerHeight / Children.count(children)

      const newIndex = Math.min(
        Math.floor(scrollTop / itemHeight),
        Children.count(children) - 1
      )

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Initial check
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [children, activeIndex])

  return (
    <div className={`scroll-stack ${className}`} ref={containerRef}>
      {Children.map(children, (child, index) => {
        if (child.type !== ScrollStackItem) return child
        
        return (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
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

