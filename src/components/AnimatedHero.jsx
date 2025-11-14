import PixelBlast from './PixelBlast'
import Shuffle from './Shuffle'

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
          <h1 className="hero-title-main">
            <Shuffle
              text="Hi, I'm Karim Elhakim"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </h1>
          <h2 className="hero-subtitle-main">
            <Shuffle
              text="Software Engineer & AI Specialist"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </h2>
          <p className="hero-description-main">
            <Shuffle
              text="Software Engineer | Backend Developer | AI Specialist | B.Sc. Mechatronics Engineering | M.Sc. Artificial Intelligence"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnimatedHero
