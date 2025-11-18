import LogoLoop from './LogoLoop'
import { 
  SiDotnet, SiPostgresql, SiMongodb, SiGit, SiDocker, SiJest, SiVite,
  SiJson, SiNodedotjs, SiExpress, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiCss3, SiSass, SiTailwindcss, SiReactrouter,
  SiReactquery, SiRedux, SiNextdotjs, SiWebpack, SiBabel, SiEslint, SiPrettier
} from 'react-icons/si'
import { FaMicrosoft, FaCode, FaDatabase, FaCloud, FaServer } from 'react-icons/fa'

const TechStackCarousel = () => {
  const techLogos = [
    { node: <SiReact style={{ color: '#61DAFB' }} />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs style={{ color: '#000000' }} />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiTypescript style={{ color: '#3178C6' }} />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiTailwindcss style={{ color: '#38B2AC' }} />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiDotnet style={{ color: '#512BD4' }} />, title: '.NET Core', href: 'https://dotnet.microsoft.com' },
    { node: <FaMicrosoft style={{ color: '#0078D4' }} />, title: 'ASP.NET', href: 'https://dotnet.microsoft.com/apps/aspnet' },
    { node: <SiPostgresql style={{ color: '#336791' }} />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
    { node: <SiMongodb style={{ color: '#47A248' }} />, title: 'MongoDB', href: 'https://www.mongodb.com' },
    { node: <SiGit style={{ color: '#F05032' }} />, title: 'Git', href: 'https://git-scm.com' },
    { node: <SiDocker style={{ color: '#2496ED' }} />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiVite style={{ color: '#646CFF' }} />, title: 'Vite', href: 'https://vitejs.dev' },
    { node: <SiJavascript style={{ color: '#F7DF1E' }} />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { node: <SiPython style={{ color: '#3776AB' }} />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiNodedotjs style={{ color: '#339933' }} />, title: 'Node.js', href: 'https://nodejs.org' },
    { node: <SiExpress style={{ color: '#000000' }} />, title: 'Express', href: 'https://expressjs.com' },
    { node: <SiHtml5 style={{ color: '#E34F26' }} />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { node: <SiCss3 style={{ color: '#1572B6' }} />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { node: <SiSass style={{ color: '#CC6699' }} />, title: 'SASS', href: 'https://sass-lang.com' },
    { node: <SiReactrouter style={{ color: '#CA4245' }} />, title: 'React Router', href: 'https://reactrouter.com' },
    { node: <SiReactquery style={{ color: '#FF4154' }} />, title: 'React Query', href: 'https://tanstack.com/query' },
    { node: <SiRedux style={{ color: '#764ABC' }} />, title: 'Redux', href: 'https://redux.js.org' },
    { node: <SiWebpack style={{ color: '#8DD6F9' }} />, title: 'Webpack', href: 'https://webpack.js.org' },
    { node: <SiBabel style={{ color: '#F9DC3E' }} />, title: 'Babel', href: 'https://babeljs.io' },
    { node: <SiEslint style={{ color: '#4B32C3' }} />, title: 'ESLint', href: 'https://eslint.org' },
    { node: <SiPrettier style={{ color: '#F7B93E' }} />, title: 'Prettier', href: 'https://prettier.io' },
    { node: <SiJest style={{ color: '#C21325' }} />, title: 'Jest', href: 'https://jestjs.io' },
  ]

  return (
    <div className="tech-logo-loop-wrapper">
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={128}
        gap={80}
        hoverSpeed={40}
        scaleOnHover
        fadeOut
        fadeOutColor="#0a0a0a"
        ariaLabel="Technology stack"
      />
    </div>
  )
}

export default TechStackCarousel
