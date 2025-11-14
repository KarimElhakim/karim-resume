import { useState, useEffect } from 'react'
import { 
  SiDotnet, SiPostgresql, SiMongodb, SiGit, SiDocker, SiJest, SiVite,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud } from 'react-icons/fa'

const TechStackCarousel = () => {
  const [rotation, setRotation] = useState(0)
  
  const techStack = [
    { name: 'C#', icon: FaCode, color: '#239120' },
    { name: '.NET', icon: SiDotnet, color: '#512BD4' },
    { name: 'ASP.NET', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'SQL Server', icon: FaDatabase, color: '#CC2927' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  ]

  const totalItems = techStack.length
  const angleStep = 360 / totalItems

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + angleStep)
    }, 150) // Fast rotation

    return () => clearInterval(interval)
  }, [angleStep])

  return (
    <div className="tech-belt-container">
      <div className="tech-belt" style={{ transform: `rotate(${rotation}deg)` }}>
        {techStack.map((tech, index) => {
          const IconComponent = tech.icon
          const itemAngle = index * angleStep
          const radius = 200 // Distance from center
          const x = Math.cos((itemAngle * Math.PI) / 180) * radius
          const y = Math.sin((itemAngle * Math.PI) / 180) * radius
          
          return (
            <div
              key={index}
              className="tech-belt-item"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                color: tech.color
              }}
            >
              <IconComponent className="tech-belt-icon" />
              <span className="tech-belt-name">{tech.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TechStackCarousel
