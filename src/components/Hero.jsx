import "./Hero.scss";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>
          <span className="hero__highlight">AI-Powered</span>
          <br /> Business Solutions
        </h1>
        <p className="hero__subtitle">
          Transforming small and medium-scale businesses with cutting-edge AI
          tools for front office operations, customer support, and business
          process automation.
        </p>
        <div className="hero__actions">
          <Link to="/business-form" className="hero__btn hero__btn--primary">
            Register Business
          </Link>
          <a href="#services" className="hero__btn hero__btn--secondary">
            Learn More
          </a>
        </div>
        <div className="hero__tags">
          <div className="hero__tag">
            <span className="hero__tag-icon">⚙️</span> AI Integration
          </div>
          <div className="hero__tag">
            <span className="hero__tag-icon">📦</span> Automation
          </div>
          <div className="hero__tag">
            <span className="hero__tag-icon">💬</span> 24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
