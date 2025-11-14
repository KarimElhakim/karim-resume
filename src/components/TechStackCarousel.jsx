import { useEffect, useRef } from 'react'
import { 
  SiDotnet, SiPostgresql, SiMongodb, SiGit, SiDocker, SiJest, SiVite,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss, SiReactrouter,
  SiReactquery, SiRedux, SiNextdotjs, SiWebpack, SiBabel, SiEslint, SiPrettier
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud, FaServer } from 'react-icons/fa'

const TechStackCarousel = () => {
  const trackRef = useRef(null)
  const animationFrameRef = useRef(null)
  const positionRef = useRef(0)

  const techStack = [
    { name: 'C#', icon: FaCode, color: '#239120' },
    { name: '.NET Core', icon: SiDotnet, color: '#512BD4' },
    { name: '.NET 5/6/7', icon: SiDotnet, color: '#512BD4' },
    { name: 'ASP.NET', icon: FaMicrosoft, color: '#0078D4' },
    { name: 'ASP.NET Core', icon: SiDotnet, color: '#512BD4' },
    { name: 'Web API', icon: FaServer, color: '#0078D4' },
    { name: 'REST', icon: SiNodedotjs, color: '#339933' },
    { name: 'SQL Server', icon: FaDatabase, color: '#CC2927' },
    { name: 'T-SQL', icon: FaDatabase, color: '#CC2927' },
    { name: 'Entity Framework', icon: SiDotnet, color: '#512BD4' },
    { name: 'LINQ', icon: SiDotnet, color: '#512BD4' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Azure DevOps', icon: FaCloud, color: '#0078D4' },
    { name: 'CI/CD', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Visual Studio', icon: FaMicrosoft, color: '#5C2D91' },
    { name: 'Azure', icon: FaCloud, color: '#0078D4' },
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
    { name: 'xUnit', icon: SiDotnet, color: '#512BD4' },
    { name: 'NUnit', icon: SiDotnet, color: '#512BD4' },
    { name: 'Debugging', icon: FaCode, color: '#239120' },
    { name: 'Serilog', icon: SiDotnet, color: '#512BD4' },
    { name: 'Agile/Scrum', icon: SiGit, color: '#F05032' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'React Router', icon: SiReactrouter, color: '#CA4245' },
    { name: 'React Query', icon: SiReactquery, color: '#FF4154' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'SASS', icon: SiSass, color: '#CC6699' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
    { name: 'Babel', icon: SiBabel, color: '#F9DC3E' },
    { name: 'ESLint', icon: SiEslint, color: '#4B32C3' },
    { name: 'Prettier', icon: SiPrettier, color: '#F7B93E' },
  ]

  // Duplicate array for seamless loop
  const duplicatedStack = [...techStack, ...techStack]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const itemWidth = 200 // Approximate width of each item including gap
    const speed = 0.5 // pixels per frame

    const animate = () => {
      positionRef.current -= speed

      // Reset position when scrolled past first set
      if (Math.abs(positionRef.current) >= techStack.length * itemWidth) {
        positionRef.current = 0
      }

      if (track) {
        track.style.transform = `translateX(${positionRef.current}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Pause on hover (desktop only)
    const handleMouseEnter = () => {
      if (window.innerWidth > 768 && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    const handleMouseLeave = () => {
      if (window.innerWidth > 768) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    const container = track.parentElement
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [techStack.length])

  return (
    <div className="tech-scroll-container">
      <div className="tech-scroll-wrapper">
        <div ref={trackRef} className="tech-scroll-track">
          {duplicatedStack.map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <div key={index} className="tech-scroll-item group">
                <IconComponent className="tech-scroll-icon" style={{ color: tech.color }} />
                <span className="tech-scroll-name">{tech.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TechStackCarousel
