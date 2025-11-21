import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'

const GitHubProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/KarimElhakim/repos?sort=updated&per_page=6', {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        })
        
        // Handle rate limiting gracefully (403 is common for unauthenticated requests)
        if (response.status === 403) {
          // Rate limited - silently handle without console error
          setError('GitHub API rate limit reached. Projects will load when available.')
          setLoading(false)
          return
        }
        
        if (!response.ok) {
          // Only log non-rate-limit errors
          if (response.status !== 403) {
            console.warn(`GitHub API returned status ${response.status}`)
          }
          setError('Unable to load projects. Please check back later.')
          setLoading(false)
          return
        }
        
        const data = await response.json()
        
        // Fetch languages for each project with error handling
        const projectsWithLanguages = await Promise.all(
          data.map(async (project) => {
            try {
              const langResponse = await fetch(project.languages_url, {
                headers: {
                  'Accept': 'application/vnd.github.v3+json'
                }
              })
              if (langResponse.ok && langResponse.status !== 403) {
                const languages = await langResponse.json()
                return { ...project, languages: Object.keys(languages) }
              }
            } catch (err) {
              // Silently fail for language fetching - don't log errors
            }
            return { ...project, languages: project.language ? [project.language] : [] }
          })
        )
        
        setProjects(projectsWithLanguages)
        setLoading(false)
        setError(null)
      } catch (err) {
        // Only log unexpected errors (not network/CORS/rate limit)
        if (err.name !== 'TypeError' && err.message !== 'Failed to fetch') {
          console.warn('GitHub API error:', err)
        }
        setError('Unable to load projects. Please check back later.')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>
  }

  if (error) {
    return (
      <div className="projects-error">
        {error.includes('rate limit') ? (
          <div>
            <p>GitHub API rate limit reached.</p>
            <p className="projects-error-subtitle">Projects will load automatically when available.</p>
          </div>
        ) : (
          <div>
            <p>Unable to load projects.</p>
            <p className="projects-error-subtitle">Please check back later.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
        >
          <div className="project-header">
            <FaGithub className="project-github-icon" />
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description || 'No description available'}</p>
            </div>
          </div>
          <div className="project-languages">
            {project.languages && project.languages.length > 0 ? (
              project.languages.map((lang, index) => (
                <span key={index} className="project-language-tag">{lang}</span>
              ))
            ) : (
              <span className="project-language-tag">{project.language || 'Other'}</span>
            )}
          </div>
          <div className="project-footer">
            <span className="project-stars">⭐ {project.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  )
}

export default GitHubProjects
