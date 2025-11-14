import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaDownload, FaBars, FaTimes, FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import AnimatedHero from './components/AnimatedHero'
import TechStackCarousel from './components/TechStackCarousel'
import ExperienceCarousel from './components/ExperienceCarousel'
import GitHubProjects from './components/GitHubProjects'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' })
  const [expandedCategory, setExpandedCategory] = useState(null)
  const cursorTrailRef = useRef([])
  const cursorRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)

  // Smooth cursor with fluid propagation effect
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.2s ease;
    `
    document.body.appendChild(cursor)
    cursorRef.current = cursor

    let lastTime = 0
    const trailLength = 15

    const animate = (currentTime) => {
      if (!cursorRef.current) return

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Update cursor position smoothly
      if (cursorRef.current) {
        const { x, y } = mousePosRef.current
        cursorRef.current.style.left = x + 'px'
        cursorRef.current.style.top = y + 'px'
        cursorRef.current.style.opacity = '1'
      }

      // Create fluid trail particles
      if (deltaTime > 16) { // ~60fps
        const trail = document.createElement('div')
        trail.className = 'cursor-trail'
        const hue = (Date.now() * 0.05) % 360
        trail.style.cssText = `
          position: fixed;
          left: ${mousePosRef.current.x}px;
          top: ${mousePosRef.current.y}px;
          width: 8px;
          height: 8px;
          background: hsla(${hue}, 100%, 60%, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 12px hsla(${hue}, 100%, 60%, 0.9);
        `
        document.body.appendChild(trail)
        cursorTrailRef.current.push(trail)

        // Animate trail particles
        let opacity = 0.8
        let scale = 1
        const fadeInterval = setInterval(() => {
          opacity -= 0.05
          scale += 0.1
          trail.style.opacity = opacity
          trail.style.transform = `translate(-50%, -50%) scale(${scale})`
          
          if (opacity <= 0) {
            clearInterval(fadeInterval)
            if (trail.parentNode) {
              trail.parentNode.removeChild(trail)
            }
            cursorTrailRef.current = cursorTrailRef.current.filter(t => t !== trail)
          }
        }, 16)

        // Remove old trails
        if (cursorTrailRef.current.length > trailLength) {
          const oldTrail = cursorTrailRef.current.shift()
          if (oldTrail && oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail)
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (cursorRef.current && cursorRef.current.parentNode) {
        cursorRef.current.parentNode.removeChild(cursorRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.nav')) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: false, error: false, message: '' })

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xyzbrvnz'
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `Contact Form Message from ${name}`,
          _replyto: email,
        }),
      })

      if (response.ok) {
        setFormStatus({ 
          loading: false, 
          success: true, 
          error: false, 
          message: '✅ Thank you for your message!' 
        })
        e.target.reset()
        
        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: false, message: '' })
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: true, 
        message: 'Sorry, there was an error sending your message. Please email me directly at karimali1896@gmail.com' 
      })
    }
  }


  return (
    <div className="App">
      {/* Header/Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="nav-brand">Karim Elhakim</div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a></li>
            <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
            <li><a href="#resume" onClick={() => setIsMobileMenuOpen(false)}>Resume</a></li>
            <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <AnimatedHero />
        <div className="hero-download">
            <a 
              href="/Karim Elhakim Resume (EG).pdf" 
              download="Karim Elhakim Resume.pdf"
              className="download-button"
            >
              <FaDownload className="button-icon" /> Download Resume PDF
            </a>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack-section">
        <div className="container">
          <h2 className="section-title">My Full Tech Stack</h2>
          <TechStackCarousel />
        </div>
      </section>

      {/* How I Solve Your Challenges */}
      <section id="experience" className="challenges-section">
        <div className="container">
          <h2 className="section-title">How I Solve Your Development Challenges</h2>
          <ExperienceCarousel />
          
          <div className="challenges-accordion" style={{ display: 'none' }}>
            {[
              {
                title: 'Backend Development',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="challenge-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                ),
                items: [
                  'Built scalable .NET Core applications with clean architecture and SOLID principles',
                  'Developed RESTful APIs using ASP.NET Core Web API for enterprise applications',
                  'Optimized SQL Server databases with efficient T-SQL queries and Entity Framework Core',
                  'Implemented robust error handling, logging, and monitoring using Serilog and Application Insights',
                  'Designed and maintained microservices architecture with Docker containerization'
                ]
              },
              {
                title: 'Enterprise Integration & Support',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="challenge-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v11H3V10zm7-6h4v17h-4V4zm7 8h4v9h-4v-9z" />
                  </svg>
                ),
                items: [
                  'Integrated applications with SharePoint, ServiceNow, and AgilePoint for seamless workflow automation',
                  'Resolved complex production issues by analyzing logs, testing fixes, and coordinating with QA teams',
                  'Supported SharePoint migrations, ensuring content and access moved correctly',
                  'Created comprehensive documentation and training materials for development teams',
                  'Participated in sprint planning and code reviews to improve codebase quality'
                ]
              },
              {
                title: 'Cloud & DevOps',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="challenge-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4zm8 8l4-4m-4 4l-4-4m4 4v4" />
                  </svg>
                ),
                items: [
                  'Deployed applications to Azure App Services and Azure Functions',
                  'Set up CI/CD pipelines using Azure DevOps for automated builds and deployments',
                  'Managed containerized services with Docker for consistent development and production environments',
                  'Configured Azure Storage and Application Insights for monitoring and analytics'
                ]
              },
              {
                title: 'AI & Machine Learning',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="challenge-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                ),
                items: [
                  'Completed Master\'s in Artificial Intelligence with focus on Machine Learning and Data Engineering',
                  'Applied AI techniques for backend integration and automation',
                  'Worked on optimization and automation using AI models'
                ]
              }
            ].map((category, index) => (
              <div key={index} className="challenge-item-wrapper">
                <div 
                  className="challenge-item"
                  onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                >
                  <div className="challenge-item-header">
                    {category.icon}
                    <div className="challenge-item-title-wrapper">
                      <span className="challenge-item-title">{category.title}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className={`challenge-arrow ${expandedCategory === category.title ? 'expanded' : ''}`}
                      >
                        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                      </svg>
                    </div>
                  </div>
                  <div className={`challenge-content ${expandedCategory === category.title ? 'expanded' : ''}`}>
                    <ul className="challenge-list">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <span className="bullet">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="work-experience-section">
        <div className="container">
          <h2 className="section-title">My work</h2>
          
          <div className="work-item">
            <div className="work-header">
              <div>
                <h3 className="work-title">Senior Software Engineer</h3>
                <h4 className="work-company">ITWORX | 2023 - 2024</h4>
              </div>
              <img src="/itworx-logo.png" alt="ITWORX Logo" className="company-logo" />
            </div>
            <p className="work-description">
              Worked on improving backend features in .NET and SQL Server applications, helping make 
              the system more stable and easier to maintain for users and support teams.
            </p>
            <ul className="work-achievements">
              <li>Helped solve several recurring production issues by carefully analyzing logs, testing fixes, and coordinating with QA to ensure changes were safe before deployment</li>
              <li>Supported integrations with SharePoint, ServiceNow, and AgilePoint, so information and workflows could move smoothly across different tools used by clients</li>
              <li>Participated in sprint planning and discussions about how to make the codebase cleaner and more reliable over time, while keeping delivery on track</li>
            </ul>
          </div>

          <div className="work-item">
            <div className="work-header">
              <div>
                <h3 className="work-title">Software Support Specialist</h3>
                <h4 className="work-company">ITWORX | 2020 - 2023</h4>
              </div>
              <img src="/itworx-logo.png" alt="ITWORX Logo" className="company-logo" />
            </div>
            <p className="work-description">
              Supported AgilePoint and other internal applications, helping users resolve issues quickly 
              so they could continue their work without disruptions.
            </p>
            <ul className="work-achievements">
              <li>Worked on handling requests and investigating problems by reviewing logs, testing scenarios, and coordinating with developers when deeper fixes were needed</li>
              <li>Participated in SharePoint migrations, ensuring content and access moved correctly and users understood the new environment</li>
              <li>Prepared clear documentation and guides to help teams get used to updated features and reduce repeated questions</li>
            </ul>
          </div>

          <div className="work-item">
            <div className="work-header">
              <div>
                <h3 className="work-title">Application Support Specialist</h3>
                <h4 className="work-company">ITWORX | 2019 - 2020</h4>
              </div>
              <img src="/itworx-logo.png" alt="ITWORX Logo" className="company-logo" />
            </div>
            <p className="work-description">
              Handled user tickets and technical requests, making sure issues were understood clearly 
              and resolved or escalated in a timely manner.
            </p>
            <ul className="work-achievements">
              <li>Assisted in system configurations and basic integrations as my responsibilities expanded over time</li>
              <li>Helped deliver training sessions and walkthroughs when new features were introduced, improving user confidence with the tools</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="resume" className="education-section">
        <div className="container">
          <h2 className="section-title">Education</h2>
          
          <div className="education-item">
            <div className="education-header">
              <img src="/uwe-logo.png" alt="UWE Bristol Logo" className="university-logo" onError={(e) => { e.target.src = '/uwe-logo.svg' }} />
              <div>
                <h3 className="education-degree">Master's in Artificial Intelligence</h3>
                <h4 className="education-institution">University of the West of England (UWE Bristol), UK | Completed: September 2025</h4>
              </div>
            </div>
            <p className="education-description">
              Focus areas: Machine Learning, Data Engineering, Applied AI Systems. 
              Relevant work: Backend integration of AI models, optimization, and automation.
            </p>
            <a 
              href="https://courses.uwe.ac.uk/I4001/artificial-intelligence" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="education-link"
            >
              View Course Details →
            </a>
          </div>

          <div className="education-item">
            <div className="education-header">
              <img src="/aast-logo.png" alt="AAST Logo" className="university-logo" />
              <div>
                <h3 className="education-degree">Bachelor of Engineering in Mechatronics</h3>
                <h4 className="education-institution">Arab Academy for Science and Technology (AAST), Cairo, Egypt | Graduated: 2018</h4>
              </div>
            </div>
            <p className="education-description">
              Coursework in programming, control systems, and embedded technologies.
            </p>
            <a 
              href="https://aast.edu/en/programs-courses/program.php?unit_id=353&program_id=136&language_id=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="education-link"
            >
              View Course Details →
            </a>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <GitHubProjects />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Let's talk</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3 className="contact-subtitle">Contact</h3>
              <p className="contact-description">
                Have a project in mind? I'm currently available for full-time opportunities and collaborations. Let's build something impactful together.
              </p>
              <div className="contact-details">
                <p><strong>Location:</strong> Family City Compound - Fifth Settlement New Cairo - Cairo</p>
                <p><strong>Email:</strong> <a href="mailto:karimali1896@gmail.com?subject=Hi%20There&body=Hi%20Karim,%0D%0A%0D%0A" className="contact-link">karimali1896@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+201018999261" className="contact-link">01018999261</a></p>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/karim-elhakim-200725104/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin className="social-icon" />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/KarimElhakim" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaGithub className="social-icon" />
                    <span>GitHub</span>
                  </a>
                  <a href="mailto:karimali1896@gmail.com?subject=Hi%20There&body=Hi%20Karim,%0D%0A%0D%0A" className="social-link">
                    <FaEnvelope className="social-icon" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Name" required disabled={formStatus.loading} />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Email" required disabled={formStatus.loading} />
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows="5" placeholder="Message" required disabled={formStatus.loading}></textarea>
              </div>
              {formStatus.message && (
                <div className={`form-message ${formStatus.success ? 'success' : formStatus.error ? 'error' : ''}`}>
                  {formStatus.message}
                </div>
              )}
              <button type="submit" className="submit-button" disabled={formStatus.loading}>
                {formStatus.loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Built with Karim Elhakim 🚀</p>
        </div>
      </footer>
    </div>
  )
}

export default App
