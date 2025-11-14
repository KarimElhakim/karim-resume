import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ExperienceCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0)

  const cards = [
    {
      title: 'Backend Development',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="exp-card-icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      items: [
        'Completed Master\'s in Artificial Intelligence with focus on Machine Learning and Data Engineering',
        'Applied AI techniques for backend integration and automation',
        'Worked on optimization and automation using AI models'
      ]
    }
  ]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <div className="experience-carousel">
      <div className="exp-carousel-container">
        <button className="exp-carousel-btn exp-carousel-btn-left" onClick={prevCard}>
          <FaChevronLeft />
        </button>
        <div className="exp-carousel-track">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`exp-card ${index === currentCard ? 'active' : index === currentCard - 1 ? 'prev' : index === currentCard + 1 ? 'next' : ''}`}
            >
              <div className="exp-card-header">
                {card.icon}
                <h3 className="exp-card-title">{card.title}</h3>
              </div>
              <ul className="exp-card-list">
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span className="bullet">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="exp-carousel-btn exp-carousel-btn-right" onClick={nextCard}>
          <FaChevronRight />
        </button>
      </div>
      <div className="exp-carousel-indicators">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`exp-indicator ${index === currentCard ? 'active' : ''}`}
            onClick={() => setCurrentCard(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExperienceCarousel

