import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaDownload, FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import AnimatedHero from './components/AnimatedHero'
import TechStackCarousel from './components/TechStackCarousel'
import ScrollStack, { ScrollStackItem } from './components/ScrollStack'
import GitHubProjects from './components/GitHubProjects'
import SplashCursor from './components/SplashCursor'
import LiquidEther from './components/LiquidEther'
import CardNav from './components/CardNav'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' })
  const [expandedCategory, setExpandedCategory] = useState(null)

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


  const navItems = [
    {
      label: 'Home',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'About', ariaLabel: 'About Karim' },
        { label: 'Skills', ariaLabel: 'View Skills' }
      ]
    },
    {
      label: 'Experience',
      bgColor: '#170D27',
      textColor: '#fff',
      links: [
        { label: 'Work History', ariaLabel: 'Work Experience' },
        { label: 'Projects', ariaLabel: 'View Projects' }
      ]
    },
    {
      label: 'Contact',
      bgColor: '#271E37',
      textColor: '#fff',
      links: [
        { label: 'Email', ariaLabel: 'Email Karim' },
        { label: 'LinkedIn', ariaLabel: 'LinkedIn Profile' },
        { label: 'GitHub', ariaLabel: 'GitHub Profile' }
      ]
    }
  ]

  return (
    <div className="App">
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
      <SplashCursor />
      <CardNav
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      {/* Hero Section */}
      <section id="home" className="hero">
        <AnimatedHero />
        <div className="hero-download">
            <a 
              href={`${import.meta.env.BASE_URL}Karim Elhakim Resume (EG).pdf`} 
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
          <ScrollStack>
            <ScrollStackItem>
              <div className="exp-card-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <h3 className="exp-card-title">Backend Development</h3>
              </div>
              <ul className="exp-card-list">
                <li><span className="bullet">•</span>Built scalable .NET Core applications with clean architecture and SOLID principles</li>
                <li><span className="bullet">•</span>Developed RESTful APIs using ASP.NET Core Web API for enterprise applications</li>
                <li><span className="bullet">•</span>Optimized SQL Server databases with efficient T-SQL queries and Entity Framework Core</li>
                <li><span className="bullet">•</span>Implemented robust error handling, logging, and monitoring using Serilog and Application Insights</li>
                <li><span className="bullet">•</span>Designed and maintained microservices architecture with Docker containerization</li>
              </ul>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="exp-card-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v11H3V10zm7-6h4v17h-4V4zm7 8h4v9h-4v-9z" />
                </svg>
                <h3 className="exp-card-title">Enterprise Integration & Support</h3>
              </div>
              <ul className="exp-card-list">
                <li><span className="bullet">•</span>Integrated applications with SharePoint, ServiceNow, and AgilePoint for seamless workflow automation</li>
                <li><span className="bullet">•</span>Resolved complex production issues by analyzing logs, testing fixes, and coordinating with QA teams</li>
                <li><span className="bullet">•</span>Supported SharePoint migrations, ensuring content and access moved correctly</li>
                <li><span className="bullet">•</span>Created comprehensive documentation and training materials for development teams</li>
                <li><span className="bullet">•</span>Participated in sprint planning and code reviews to improve codebase quality</li>
              </ul>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="exp-card-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4zm8 8l4-4m-4 4l-4-4m4 4v4" />
                </svg>
                <h3 className="exp-card-title">Cloud & DevOps</h3>
              </div>
              <ul className="exp-card-list">
                <li><span className="bullet">•</span>Deployed applications to Azure App Services and Azure Functions</li>
                <li><span className="bullet">•</span>Set up CI/CD pipelines using Azure DevOps for automated builds and deployments</li>
                <li><span className="bullet">•</span>Managed containerized services with Docker for consistent development and production environments</li>
                <li><span className="bullet">•</span>Configured Azure Storage and Application Insights for monitoring and analytics</li>
              </ul>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="exp-card-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="exp-card-title">AI & Machine Learning</h3>
              </div>
              <ul className="exp-card-list">
                <li><span className="bullet">•</span>Completed Master's in Artificial Intelligence with focus on Machine Learning and Data Engineering</li>
                <li><span className="bullet">•</span>Applied AI techniques for backend integration and automation</li>
                <li><span className="bullet">•</span>Worked on optimization and automation using AI models</li>
              </ul>
            </ScrollStackItem>
          </ScrollStack>
          
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
              <img src={`${import.meta.env.BASE_URL}uwe-logo.png`} alt="UWE Bristol Logo" className="university-logo" onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}uwe-logo.svg` }} />
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
                  <a href="mailto:karimali1896@gmail.com?subject=Hi%20There&body=Hi%20Karim,%0D%0A%0D%0A" className="social-link email-link">
                    <SiGmail className="social-icon gmail-icon" style={{ color: '#EA4335' }} />
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
