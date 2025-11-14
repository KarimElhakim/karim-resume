import { useEffect, useRef, useState } from 'react'
import './Shuffle.css'

const Shuffle = ({
  text = '',
  shuffleDirection = 'right',
  duration = 0.35,
  animationMode = 'evenodd',
  shuffleTimes = 1,
  ease = 'power3.out',
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const elementRef = useRef(null)
  const hasTriggeredRef = useRef(false)

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  
  const getRandomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const shuffleText = (originalText, progress) => {
    return originalText
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' '
        
        const shouldShuffle = animationMode === 'evenodd' 
          ? index % 2 === 0 
          : Math.random() > 0.5
        
        if (shouldShuffle && progress < 1) {
          return getRandomChar()
        }
        return char
      })
      .join('')
  }

  const easeOut = (t) => {
    return 1 - Math.pow(1 - t, 3)
  }

  useEffect(() => {
    if (!elementRef.current) return
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasTriggeredRef.current || !triggerOnce) {
              hasTriggeredRef.current = true
              animate()
            }
          }
        })
      },
      { threshold }
    )

    observer.observe(elementRef.current)

    const handleMouseEnter = () => {
      if (triggerOnHover && (!hasTriggeredRef.current || !triggerOnce)) {
        hasTriggeredRef.current = true
        animate()
      }
    }

    if (triggerOnHover) {
      elementRef.current.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      observer.disconnect()
      if (elementRef.current && triggerOnHover) {
        elementRef.current.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [threshold, triggerOnce, triggerOnHover, respectReducedMotion])

  const animate = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const startTime = performance.now()
    const totalDuration = duration * 1000

    const animateFrame = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      const easedProgress = easeOut(progress)

      let currentText = text
      for (let i = 0; i < shuffleTimes; i++) {
        currentText = shuffleText(currentText, easedProgress)
      }

      setDisplayText(currentText)

      if (progress < 1) {
        requestAnimationFrame(animateFrame)
      } else {
        setDisplayText(text)
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animateFrame)
  }

  return (
    <span ref={elementRef} className="shuffle-text">
      {displayText}
    </span>
  )
}

export default Shuffle

