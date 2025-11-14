import { useState, useEffect, useRef } from 'react'
import './CardNav.css'

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  baseColor = '#fff',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
  ease = 'power3.out'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false)
        setActiveIndex(null)
      }
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setActiveIndex(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
    setActiveIndex(null)
  }

  return (
    <nav ref={navRef} className="card-nav">
      <div className="card-nav-container">
        {logo && (
          <a href="#home" className="card-nav-logo">
            <img src={logo} alt={logoAlt} />
          </a>
        )}
        <button
          className={`card-nav-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`card-nav-menu ${isOpen ? 'open' : ''}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`card-nav-item ${activeIndex === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <a
                href={index === 0 ? '#home' : index === 1 ? '#experience' : '#contact'}
                className="card-nav-button"
                onClick={handleLinkClick}
                style={{
                  backgroundColor: activeIndex === index ? item.bgColor : buttonBgColor,
                  color: activeIndex === index ? item.textColor : buttonTextColor
                }}
              >
                {item.label}
              </a>
              {activeIndex === index && item.links && (
                <div
                  className="card-nav-dropdown"
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor
                  }}
                >
                  {item.links.map((link, linkIndex) => {
                    let href = `#${link.label.toLowerCase().replace(/\s+/g, '-')}`
                    if (link.label === 'Email') href = 'mailto:karimali1896@gmail.com?subject=Hi%20There&body=Hi%20Karim,'
                    if (link.label === 'LinkedIn') href = 'https://www.linkedin.com/in/karim-elhakim-200725104/'
                    if (link.label === 'GitHub') href = 'https://github.com/KarimElhakim'
                    if (link.label === 'Work History') href = '#experience'
                    if (link.label === 'Projects') href = '#projects'
                    if (link.label === 'About') href = '#home'
                    if (link.label === 'Skills') href = '#home'
                    return (
                      <a
                        key={linkIndex}
                        href={href}
                        className="card-nav-link"
                        onClick={handleLinkClick}
                        aria-label={link.ariaLabel || link.label}
                        target={link.label === 'LinkedIn' || link.label === 'GitHub' ? '_blank' : undefined}
                        rel={link.label === 'LinkedIn' || link.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default CardNav

