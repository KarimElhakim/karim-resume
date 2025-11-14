import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'

const GitHubProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/KarimElhakim/repos?sort=updated&per_page=6')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        
        // Fetch languages for each project
        const projectsWithLanguages = await Promise.all(
          data.map(async (project) => {
            try {
              const langResponse = await fetch(project.languages_url)
              if (langResponse.ok) {
                const languages = await langResponse.json()
                return { ...project, languages: Object.keys(languages) }
              }
            } catch (err) {
              console.error(`Failed to fetch languages for ${project.name}:`, err)
            }
            return { ...project, languages: project.language ? [project.language] : [] }
          })
        )
        
        setProjects(projectsWithLanguages)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>
  }

  if (error) {
    return <div className="projects-error">Unable to load projects. Check back later.</div>
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
