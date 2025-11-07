import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: false, error: false, message: '' })

    const formData = new FormData(e.target)
    const data = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_email: 'karimali1896@gmail.com'
    }

    try {
      // Replace these with your EmailJS service ID, template ID, and public key
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS is not configured. Please set up EmailJS credentials.')
      }

      await emailjs.send(serviceId, templateId, data, publicKey)
      
      setFormStatus({ 
        loading: false, 
        success: true, 
        error: false, 
        message: 'Thank you! Your message has been sent successfully.' 
      })
      e.target.reset()
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false, message: '' })
      }, 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: true, 
        message: 'Sorry, there was an error sending your message. Please try again or email me directly at karimali1896@gmail.com' 
      })
    }
  }

  return (
    <div className="App">
      {/* Header/Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="nav-brand">Resume</div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#languages">Languages & Hobbies</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Karim Elhakim</h1>
          <p className="hero-subtitle">Software Engineer & AI Specialist</p>
          <p className="hero-description">
            Software Engineer with 4+ years of experience in C#/.NET backend development 
            and enterprise application support. Recently completed a Master's in Artificial Intelligence 
            and currently seeking a full-time development role.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="button primary">Get In Touch</a>
            <a href="#about" className="button secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">Profile</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Software Engineer with 4+ years of experience in C#/.NET backend development 
                and enterprise application support. Recently completed a Master's in Artificial 
                Intelligence (Sep 2025) and currently seeking a full-time development role. 
                Strong foundation in backend engineering, troubleshooting complex systems, and 
                delivering stable and maintainable features.
              </p>
              <p>
                My approach combines technical expertise with creative problem-solving, 
                ensuring that every project I work on delivers both functionality and 
                exceptional user experience. I'm always eager to learn new technologies 
                and take on challenging projects.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">4+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Master's</div>
                <div className="stat-label">AI Degree</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">.NET</div>
                <div className="stat-label">Specialization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section alt">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Senior Software Engineer</h3>
                <h4>ITWORX | 2023 - 2024</h4>
                <p>
                  Worked on improving backend features in .NET and SQL Server applications, helping make 
                  the system more stable and easier to maintain for users and support teams.
                </p>
                <ul>
                  <li>Helped solve several recurring production issues by carefully analyzing logs, testing fixes, and coordinating with QA to ensure changes were safe before deployment</li>
                  <li>Supported integrations with SharePoint, ServiceNow, and AgilePoint, so information and workflows could move smoothly across different tools used by clients</li>
                  <li>Participated in sprint planning and discussions about how to make the codebase cleaner and more reliable over time, while keeping delivery on track</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Software Support Specialist</h3>
                <h4>ITWORX | 2020 - 2023</h4>
                <p>
                  Supported AgilePoint and other internal applications, helping users resolve issues quickly 
                  so they could continue their work without disruptions.
                </p>
                <ul>
                  <li>Worked on handling requests and investigating problems by reviewing logs, testing scenarios, and coordinating with developers when deeper fixes were needed</li>
                  <li>Participated in SharePoint migrations, ensuring content and access moved correctly and users understood the new environment</li>
                  <li>Prepared clear documentation and guides to help teams get used to updated features and reduce repeated questions</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Application Support Specialist</h3>
                <h4>ITWORX | 2019 - 2020</h4>
                <p>
                  Handled user tickets and technical requests, making sure issues were understood clearly 
                  and resolved or escalated in a timely manner.
                </p>
                <ul>
                  <li>Assisted in system configurations and basic integrations as my responsibilities expanded over time</li>
                  <li>Helped deliver training sessions and walkthroughs when new features were introduced, improving user confidence with the tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            <div className="education-card">
              <h3>Master's in Artificial Intelligence</h3>
              <h4>University of the West of England (UWE Bristol), UK | Completed: September 2025</h4>
              <p>
                Focus areas: Machine Learning, Data Engineering, Applied AI Systems. 
                Relevant work: Backend integration of AI models, optimization, and automation.
              </p>
              <a 
                href="https://courses.uwe.ac.uk/I4001/artificial-intelligence" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="course-link-button"
              >
                View Course Details
                <span className="link-arrow">→</span>
              </a>
            </div>
            <div className="education-card">
              <h3>Bachelor of Engineering in Mechatronics</h3>
              <h4>Arab Academy for Science and Technology (AAST), Cairo, Egypt | Graduated: 2018</h4>
              <p>
                Coursework in programming, control systems, and embedded technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section alt">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages & Frameworks</h3>
              <div className="skill-items">
                <span className="skill-tag">C#</span>
                <span className="skill-tag">.NET Core</span>
                <span className="skill-tag">.NET 5/6/7</span>
                <span className="skill-tag">ASP.NET</span>
                <span className="skill-tag">ASP.NET Core</span>
                <span className="skill-tag">Web API</span>
                <span className="skill-tag">REST</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Data & Persistence</h3>
              <div className="skill-items">
                <span className="skill-tag">SQL Server</span>
                <span className="skill-tag">T-SQL</span>
                <span className="skill-tag">Entity Framework</span>
                <span className="skill-tag">LINQ</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">MongoDB</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Dev Workflow</h3>
              <div className="skill-items">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Azure DevOps</span>
                <span className="skill-tag">CI/CD</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Visual Studio</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Cloud & Monitoring</h3>
              <div className="skill-items">
                <span className="skill-tag">Azure App Services</span>
                <span className="skill-tag">Azure Functions</span>
                <span className="skill-tag">Azure Storage</span>
                <span className="skill-tag">Application Insights</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Integrations & Platforms</h3>
              <div className="skill-items">
                <span className="skill-tag">SharePoint</span>
                <span className="skill-tag">ServiceNow</span>
                <span className="skill-tag">AgilePoint</span>
                <span className="skill-tag">REST Integrations</span>
                <span className="skill-tag">JSON</span>
                <span className="skill-tag">SOAP</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Testing & Quality</h3>
              <div className="skill-items">
                <span className="skill-tag">Unit Testing</span>
                <span className="skill-tag">xUnit</span>
                <span className="skill-tag">NUnit</span>
                <span className="skill-tag">Debugging</span>
                <span className="skill-tag">Serilog</span>
                <span className="skill-tag">Agile/Scrum</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages & Hobbies Section */}
      <section id="languages" className="section">
        <div className="container">
          <h2 className="section-title">Languages & Hobbies</h2>
          <div className="education-grid">
            <div className="education-card">
              <h3>Languages</h3>
              <ul>
                <li>English (Fluent)</li>
                <li>Arabic (Fluent)</li>
              </ul>
            </div>
            <div className="education-card">
              <h3>Hobbies</h3>
              <ul>
                <li>Video Games</li>
                <li>Basketball</li>
                <li>Model Building</li>
                <li>Watching Movies</li>
                <li>Listening to Music</li>
                <li>Reading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section alt">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your visions. Feel free to reach out!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong>
                  <a href="mailto:karimali1896@gmail.com">karimali1896@gmail.com</a>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <a href="tel:+201018999261">01018999261</a>
                </div>
                <div className="contact-item">
                  <strong>Location:</strong>
                  <span>Family City Compound - Fifth Settlement New Cairo - Cairo</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/karim-ali-200725104" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required disabled={formStatus.loading} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required disabled={formStatus.loading} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required disabled={formStatus.loading}></textarea>
              </div>
              {formStatus.message && (
                <div className={`form-message ${formStatus.success ? 'success' : formStatus.error ? 'error' : ''}`}>
                  {formStatus.message}
                </div>
              )}
              <button type="submit" className="button primary" disabled={formStatus.loading}>
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Karim Elhakim. All rights reserved.</p>
          <p>Inspired by <a href="https://html5up.net/" target="_blank" rel="noopener noreferrer">HTML5 UP</a> templates</p>
          <p>References available upon request</p>
        </div>
      </footer>
    </div>
  )
}

export default App
