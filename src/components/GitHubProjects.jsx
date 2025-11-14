import { useState, useEffect } from 'react'

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
        setProjects(data)
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
            <img
              src={`https://github.com/${project.owner.login}.png`}
              alt={project.owner.login}
              className="project-avatar"
            />
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description || 'No description available'}</p>
            </div>
          </div>
          <div className="project-footer">
            <span className="project-language">{project.language || 'Other'}</span>
            <span className="project-stars">⭐ {project.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  )
}

export default GitHubProjects

