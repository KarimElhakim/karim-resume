import { useState, useEffect } from 'react'

const AnimatedHero = () => {
  const [displayedLines, setDisplayedLines] = useState(['', '', ''])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  
  const lines = [
    "Hi, I'm Karim Elhakim",
    "Software Engineer & AI Specialist",
    "Software Engineer | Backend Developer | AI Specialist | B.Sc. Mechatronics Engineering | M.Sc. Artificial Intelligence"
  ]

  useEffect(() => {
    if (currentLineIndex >= lines.length) return

    const line = lines[currentLineIndex]
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[currentLineIndex] = line.substring(0, charIndex + 1)
          return newLines
        })
        charIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1)
        }, 1000)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [currentLineIndex])

  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="hero-char"
        style={{
          animationDelay: `${index * 0.03}s`,
          display: 'inline-block'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div className="hero-content">
      <h1 className="hero-title">
        {renderAnimatedText(displayedLines[0])}
      </h1>
      {displayedLines[0].length === lines[0].length && (
        <h2 className="hero-subtitle">
          {renderAnimatedText(displayedLines[1])}
        </h2>
      )}
      {displayedLines[1].length === lines[1].length && (
        <p className="hero-description">
          {renderAnimatedText(displayedLines[2])}
        </p>
      )}
    </div>
  )
}

export default AnimatedHero

