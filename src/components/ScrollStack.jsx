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
  
  // Extract icons from children if not provided
  const getIconForIndex = (index) => {
    if (icons && icons[index]) {
      return icons[index]
    }
    // Try to extract icon from child's content
    const child = Children.toArray(children)[index]
    if (child && child.props && child.props.children) {
      const childrenArray = Children.toArray(child.props.children)
      const headerElement = childrenArray.find(el => 
        el && el.props && el.props.className && el.props.className.includes('exp-card-header')
      )
      if (headerElement && headerElement.props && headerElement.props.children) {
        const headerChildren = Children.toArray(headerElement.props.children)
        const iconElement = headerChildren.find(el => 
          el && el.type === 'svg'
        )
        if (iconElement) {
          return iconElement
        }
      }
    }
    return null
  }

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
    let scrollTimeout
    
    const handleScroll = () => {
      if (!containerRef.current || isScrollingRef.current) return

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const container = containerRef.current
        if (!container) return

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

        if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex)
        }
      }, 100)
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
        clearTimeout(scrollTimeout)
      }
    }
  }, [children, activeIndex])

  // Prevent skipping - enforce scroll snap
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastScrollTop = container.scrollTop
    let scrollVelocity = 0
    let lastTime = Date.now()

    const handleScroll = () => {
      const currentTime = Date.now()
      const currentScrollTop = container.scrollTop
      const deltaTime = currentTime - lastTime
      
      if (deltaTime > 0) {
        scrollVelocity = Math.abs(currentScrollTop - lastScrollTop) / deltaTime
      }

      // If scrolling too fast, snap to nearest card
      if (scrollVelocity > 2 && !isScrollingRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => {
          const containerHeight = container.clientHeight
          const scrollTop = container.scrollTop
          const scrollCenter = scrollTop + containerHeight / 2

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

          scrollToIndex(closestIndex)
        }, 200)
      }

      lastScrollTop = currentScrollTop
      lastTime = currentTime
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [children])

  // Set initial active index to 0
  useEffect(() => {
    setActiveIndex(0)
  }, [])

  return (
    <div className="scroll-stack-wrapper">
      {/* Navigation Indicators - Full Logo Icons */}
      <div className="scroll-stack-indicators">
        {Children.map(children, (child, index) => {
          if (child.type !== ScrollStackItem) return null
          
          const icon = getIconForIndex(index)
          
          return (
            <button
              key={index}
              className={`scroll-stack-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to card ${index + 1}`}
              title={`Card ${index + 1}`}
            >
              <div className="indicator-icon-wrapper">
                {icon ? (
                  <div className="indicator-icon">
                    {icon}
                  </div>
                ) : (
                  <span className="indicator-dot">
                    <span className="indicator-pulse"></span>
                  </span>
                )}
                <span className="indicator-pulse"></span>
              </div>
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
