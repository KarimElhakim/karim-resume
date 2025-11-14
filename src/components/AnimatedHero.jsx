import { useState, useEffect } from 'react'

const AnimatedHero = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
  
  const fullText = "Hi, I'm Karim Elhakim\nSoftware Engineer & AI Specialist\nSoftware Engineer | Backend Developer | AI Specialist | B.Sc. Mechatronics Engineering | M.Sc. Artificial Intelligence"
  const lines = fullText.split('\n')

  useEffect(() => {
    let charIndex = 0
    let lineIndex = 0
    let currentLine = ''
    
    const typeInterval = setInterval(() => {
      if (lineIndex >= lines.length) {
        clearInterval(typeInterval)
        setShowCursor(false)
        return
      }

      const line = lines[lineIndex]
      
      if (charIndex < line.length) {
        currentLine += line[charIndex]
        setDisplayedText(prev => {
          const prevLines = prev.split('\n')
          prevLines[lineIndex] = currentLine
          return prevLines.join('\n')
        })
        charIndex++
        
        // Random glitch effect
        if (Math.random() > 0.95) {
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 100)
        }
      } else {
        // Move to next line
        charIndex = 0
        lineIndex++
        currentLine = ''
        setDisplayedText(prev => prev + '\n')
      }
    }, 30) // Faster typing speed

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  const renderText = () => {
    return displayedText.split('\n').map((line, lineIndex) => {
      if (!line) return null
      return (
        <div key={lineIndex} className={`hero-line ${lineIndex === 0 ? 'hero-title' : lineIndex === 1 ? 'hero-subtitle' : 'hero-description'}`}>
          {line.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`hero-char ${glitchActive && Math.random() > 0.7 ? 'glitch' : ''}`}
              style={{
                animationDelay: `${charIndex * 0.02}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          {lineIndex === displayedText.split('\n').length - 1 && showCursor && (
            <span className="cursor-blink">_</span>
          )}
        </div>
      )
    })
  }

  return (
    <div className="hero-content hacker-style">
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">karim@terminal</span>
        </div>
        <div className="terminal-body">
          {renderText()}
        </div>
      </div>
    </div>
  )
}

export default AnimatedHero
