import Hero from "./Hero";
import Features from "./Features";
import Testimonial from "./Testimonial";
import "./HeroFeatures.scss";

function HeroFeatures() {
  return (
    <div className="hero-features">
      <div className="hero-features__container">
        <div className="hero-features__hero">
          <Hero />
        </div>
        <div className="hero-features__right">
          <Features />
          <Testimonial />
        </div>
      </div>
    </div>
  );
}

export default HeroFeatures;
