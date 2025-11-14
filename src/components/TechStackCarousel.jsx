import { useState, useEffect, useRef } from 'react'
import { 
  SiDotnet, SiPostgresql, SiMongodb, SiGit, SiDocker, SiJest, SiVite,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud } from 'react-icons/fa'

const TechStackCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  
  const techStack = [
    { name: 'C#', icon: FaCode, color: '#239120' },
    { name: '.NET Core', icon: SiDotnet, color: '#512BD4' },
    { name: '.NET 5/6/7', icon: SiDotnet, color: '#512BD4' },
    { name: 'ASP.NET', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'ASP.NET Core', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'Web API', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'REST', icon: SiNodedotjs, color: '#339933' },
    { name: 'SQL Server', icon: FaDatabase, color: '#CC2927' },
    { name: 'T-SQL', icon: FaDatabase, color: '#CC2927' },
    { name: 'Entity Framework', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'LINQ', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Azure DevOps', icon: FaCloud, color: '#0078D4' },
    { name: 'CI/CD', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Visual Studio', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'Azure App Services', icon: FaCloud, color: '#0078D4' },
    { name: 'Azure Functions', icon: FaCloud, color: '#0078D4' },
    { name: 'Azure Storage', icon: FaCloud, color: '#0078D4' },
    { name: 'Application Insights', icon: FaCloud, color: '#0078D4' },
    { name: 'SharePoint', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'ServiceNow', icon: FaCloud, color: '#81B1D1' },
    { name: 'AgilePoint', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'REST Integrations', icon: SiNodedotjs, color: '#339933' },
    { name: 'JSON', icon: SiJson, color: '#000000' },
    { name: 'SOAP', icon: SiJson, color: '#000000' },
    { name: 'Unit Testing', icon: SiJest, color: '#C21325' },
    { name: 'xUnit', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'NUnit', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'Debugging', icon: FaCode, color: '#239120' },
    { name: 'Serilog', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'Agile/Scrum', icon: SiGit, color: '#F05032' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'SASS', icon: SiSass, color: '#CC6699' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techStack.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [techStack.length])

  return (
    <div className="tech-carousel-wrapper">
      <div className="tech-carousel-container" ref={carouselRef}>
        <div 
          className="tech-carousel-track"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <div key={index} className="tech-carousel-slide">
                <div className="tech-carousel-item">
                  <IconComponent className="tech-carousel-icon" style={{ color: tech.color }} />
                  <span className="tech-carousel-name">{tech.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TechStackCarousel
