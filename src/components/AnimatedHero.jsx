import PixelBlast from './PixelBlast'

const AnimatedHero = () => {
  return (
    <div className="hero-content pixel-hero">
      <div className="hero-card">
        <div className="hero-card-background">
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#B19EEF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </div>
        <div className="hero-text-content">
          <h1 className="hero-title-main">Hi, I'm Karim Elhakim</h1>
          <h2 className="hero-subtitle-main">Software Engineer & AI Specialist</h2>
          <p className="hero-description-main">
            Software Engineer | Backend Developer | AI Specialist | B.Sc. Mechatronics Engineering | M.Sc. Artificial Intelligence
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnimatedHero
