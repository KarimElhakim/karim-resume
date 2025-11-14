import { useState, useEffect } from 'react'
import { 
  SiDotnet, SiPostgresql, SiMongodb, SiGit, SiDocker, SiJest, SiVite,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud } from 'react-icons/fa'

const TechStackCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const techStack = [
    { name: 'C#', icon: FaCode, color: '#239120' },
    { name: '.NET Core', icon: SiDotnet, color: '#512BD4' },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techStack.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [techStack.length])

  return (
    <div className="tech-carousel">
      <div className="tech-carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {techStack.map((tech, index) => {
          const IconComponent = tech.icon
          return (
            <div key={index} className="tech-carousel-item">
              <IconComponent className="tech-carousel-icon" style={{ color: tech.color }} />
              <span className="tech-carousel-name">{tech.name}</span>
            </div>
          )
        })}
      </div>
      <div className="tech-carousel-indicators">
        {techStack.map((_, index) => (
          <div
            key={index}
            className={`tech-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default TechStackCarousel

