import { useState, useEffect, useRef, Children } from 'react'
import './ScrollStack.css'

const ScrollStackItem = ({ children, className = '' }) => {
  return (
    <div className={`scroll-stack-item ${className}`}>
      {children}
    </div>
  )
}

const ScrollStack = ({ children, icons = [], className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  const itemCount = Children.count(children)
  


  const scrollToIndex = (index) => {
    if (!containerRef.current || index < 0 || index >= itemCount) return
    
    const itemElement = itemsRef.current[index]
    if (!itemElement) return

    isScrollingRef.current = true
    itemElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })

    setTimeout(() => {
      isScrollingRef.current = false
    }, 1500)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId = null
    let lastScrollTop = container.scrollTop

    const updateActiveIndex = () => {
      if (!container || isScrollingRef.current) return

      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const scrollCenter = scrollTop + containerHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      Children.forEach(children, (child, index) => {
        if (child.type !== ScrollStackItem) return
        
        const itemElement = itemsRef.current[index]
        if (!itemElement) return

        const rect = itemElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const itemCenter = rect.top - containerRect.top + rect.height / 2
        const containerCenter = containerHeight / 2

        const distance = Math.abs(itemCenter - containerCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex)
      }
    }

    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        updateActiveIndex()
        rafId = null
      })
    }

    // Use IntersectionObserver for better performance
    const observerOptions = {
      root: container,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.5, 1]
    }

    const observerCallback = (entries) => {
      if (isScrollingRef.current) return
      
      entries.forEach((entry) => {
        const index = itemsRef.current.indexOf(entry.target)
        if (index === -1) return

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveIndex(index)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Observe all items
    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    container.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    const timeoutId = setTimeout(() => {
      updateActiveIndex()
    }, 100)
    
    // Check on resize
    const handleResize = () => {
      requestAnimationFrame(() => {
        updateActiveIndex()
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [children, activeIndex])

  // Set initial active index to 0
  useEffect(() => {
    setActiveIndex(0)
  }, [])

  return (
    <div className="scroll-stack-wrapper">
      {/* Navigation Indicators - Animated Dots */}
      <div className="scroll-stack-indicators">
        {Children.map(children, (child, index) => {
          if (child.type !== ScrollStackItem) return null
          
          return (
            <button
              key={index}
              className={`scroll-stack-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to card ${index + 1}`}
              title={`Card ${index + 1}`}
            >
              <span className="indicator-dot">
                <span className="indicator-pulse"></span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Scroll Container */}
      <div className={`scroll-stack ${className}`} ref={containerRef}>
        {Children.map(children, (child, index) => {
          if (child.type !== ScrollStackItem) return child
          
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className={`scroll-stack-item-wrapper ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'prev' : index > activeIndex ? 'next' : ''}`}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

ScrollStack.Item = ScrollStackItem

export default ScrollStack
export { ScrollStackItem }
