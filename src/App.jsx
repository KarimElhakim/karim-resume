import { useState, useEffect } from 'react'
import './App.css'
import { 
  SiDotnet, SiPostgresql, SiMongodb,
  SiGit, SiDocker, SiJest, SiVite, SiLinux,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango,
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud, FaDownload, FaBars, FaTimes } from 'react-icons/fa'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
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

  const techStack = [
    { name: 'C#', icon: FaCode },
    { name: '.NET Core', icon: SiDotnet },
    { name: '.NET 5/6/7', icon: SiDotnet },
    { name: 'ASP.NET', icon: FaMicrosoft },
    { name: 'ASP.NET Core', icon: FaMicrosoft },
    { name: 'Web API', icon: FaMicrosoft },
    { name: 'REST', icon: SiNodedotjs },
    { name: 'SQL Server', icon: FaDatabase },
    { name: 'T-SQL', icon: FaDatabase },
    { name: 'Entity Framework', icon: FaMicrosoft },
    { name: 'LINQ', icon: FaMicrosoft },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Git', icon: SiGit },
    { name: 'Azure DevOps', icon: FaCloud },
    { name: 'CI/CD', icon: SiGit },
    { name: 'Docker', icon: SiDocker },
    { name: 'Visual Studio', icon: FaMicrosoft },
    { name: 'Azure App Services', icon: FaCloud },
    { name: 'Azure Functions', icon: FaCloud },
    { name: 'Azure Storage', icon: FaCloud },
    { name: 'Application Insights', icon: FaCloud },
    { name: 'SharePoint', icon: FaMicrosoft },
    { name: 'ServiceNow', icon: FaCloud },
    { name: 'AgilePoint', icon: FaMicrosoft },
    { name: 'REST Integrations', icon: SiNodedotjs },
    { name: 'JSON', icon: SiJson },
    { name: 'SOAP', icon: SiJson },
    { name: 'Unit Testing', icon: SiJest },
    { name: 'xUnit', icon: FaMicrosoft },
    { name: 'NUnit', icon: FaMicrosoft },
    { name: 'Debugging', icon: FaCode },
    { name: 'Serilog', icon: FaMicrosoft },
    { name: 'Agile/Scrum', icon: SiGit },
  ]

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
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm Karim Elhakim</h1>
          <h2 className="hero-subtitle">Software Engineer & AI Specialist</h2>
          <p className="hero-description">
            Software Engineer | Backend Developer | AI Specialist | B.Sc. Mechatronics Engineering | M.Sc. Artificial Intelligence
          </p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack-section">
        <div className="container">
          <h2 className="section-title">My Full Tech Stack</h2>
          <div className="tech-stack-grid">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <div key={index} className="tech-item">
                  <IconComponent className="tech-icon" />
                  <span className="tech-name">{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How I Solve Your Challenges */}
      <section id="experience" className="challenges-section">
        <div className="container">
          <h2 className="section-title">How I Solve Your Development Challenges</h2>
          
          <div className="challenge-category">
            <h3 className="challenge-category-title">Backend Development</h3>
            <ul className="challenge-list">
              <li>Built scalable .NET Core applications with clean architecture and SOLID principles</li>
              <li>Developed RESTful APIs using ASP.NET Core Web API for enterprise applications</li>
              <li>Optimized SQL Server databases with efficient T-SQL queries and Entity Framework Core</li>
              <li>Implemented robust error handling, logging, and monitoring using Serilog and Application Insights</li>
              <li>Designed and maintained microservices architecture with Docker containerization</li>
            </ul>
          </div>

          <div className="challenge-category">
            <h3 className="challenge-category-title">Enterprise Integration & Support</h3>
            <ul className="challenge-list">
              <li>Integrated applications with SharePoint, ServiceNow, and AgilePoint for seamless workflow automation</li>
              <li>Resolved complex production issues by analyzing logs, testing fixes, and coordinating with QA teams</li>
              <li>Supported SharePoint migrations, ensuring content and access moved correctly</li>
              <li>Created comprehensive documentation and training materials for development teams</li>
              <li>Participated in sprint planning and code reviews to improve codebase quality</li>
            </ul>
          </div>

          <div className="challenge-category">
            <h3 className="challenge-category-title">Cloud & DevOps</h3>
            <ul className="challenge-list">
              <li>Deployed applications to Azure App Services and Azure Functions</li>
              <li>Set up CI/CD pipelines using Azure DevOps for automated builds and deployments</li>
              <li>Managed containerized services with Docker for consistent development and production environments</li>
              <li>Configured Azure Storage and Application Insights for monitoring and analytics</li>
            </ul>
          </div>

          <div className="challenge-category">
            <h3 className="challenge-category-title">AI & Machine Learning</h3>
            <ul className="challenge-list">
              <li>Completed Master's in Artificial Intelligence with focus on Machine Learning and Data Engineering</li>
              <li>Applied AI techniques for backend integration and automation</li>
              <li>Worked on optimization and automation using AI models</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="work-experience-section">
        <div className="container">
          <h2 className="section-title">My Work</h2>
          
          <div className="work-item">
            <div className="work-header">
              <div>
                <h3 className="work-title">Senior Software Engineer</h3>
                <h4 className="work-company">ITWORX | 2023 - 2024</h4>
              </div>
              <img src={`${import.meta.env.BASE_URL}itworx-logo.png`} alt="ITWORX Logo" className="company-logo" onError={(e) => { e.target.style.display = 'none' }} />
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
              <img src={`${import.meta.env.BASE_URL}itworx-logo.png`} alt="ITWORX Logo" className="company-logo" onError={(e) => { e.target.style.display = 'none' }} />
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
              <img src={`${import.meta.env.BASE_URL}itworx-logo.png`} alt="ITWORX Logo" className="company-logo" onError={(e) => { e.target.style.display = 'none' }} />
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
              <img src={`${import.meta.env.BASE_URL}uwe-logo.svg`} alt="UWE Bristol Logo" className="university-logo" onError={(e) => { e.target.style.display = 'none' }} />
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
              <img src={`${import.meta.env.BASE_URL}aast-logo.png`} alt="AAST Logo" className="university-logo" onError={(e) => { e.target.style.display = 'none' }} />
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

          <div className="resume-download">
            <a 
              href={`${import.meta.env.BASE_URL}${encodeURIComponent('Karim Elhakim Resume (EG).pdf')}`} 
              download="Karim Elhakim Resume.pdf"
              className="download-button"
            >
              <FaDownload className="button-icon" /> Download Resume PDF
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-placeholder">
              <p>Projects coming soon...</p>
            </div>
          </div>
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
                <p><strong>Email:</strong> <a href="mailto:karimali1896@gmail.com">karimali1896@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+201018999261">01018999261</a></p>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/karim-elhakim-200725104/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
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
