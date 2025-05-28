import "./About.scss";

function About() {
  return (
    <section className="about-section">
      <div className="about-section__left">
        <h2 className="about-section__title">
          Why Choose{" "}
          <span className="about-section__title--accent">Canter?</span>
        </h2>
        <p className="about-section__desc">
          At Canter Business Solutions, we're dedicated to making advanced AI
          technology accessible and effective for small and medium-sized
          businesses. Our solutions are designed to solve real-world problems
          and deliver measurable results.
        </p>
        <div className="about-section__features">
          <div className="about-section__feature">
            <span className="about-section__feature-icon about-section__feature-icon--blue">
              🛡️
            </span>
            <div>
              <div className="about-section__feature-title">
                Enterprise-Grade Security
              </div>
              <div className="about-section__feature-desc">
                Your data is protected with bank-level encryption and security
                protocols.
              </div>
            </div>
          </div>
          <div className="about-section__feature">
            <span className="about-section__feature-icon about-section__feature-icon--purple">
              ⚡
            </span>
            <div>
              <div className="about-section__feature-title">
                Rapid Implementation
              </div>
              <div className="about-section__feature-desc">
                Get up and running in days, not months, with our streamlined
                onboarding.
              </div>
            </div>
          </div>
          <div className="about-section__feature">
            <span className="about-section__feature-icon about-section__feature-icon--blue">
              📊
            </span>
            <div>
              <div className="about-section__feature-title">
                Measurable Results
              </div>
              <div className="about-section__feature-desc">
                Track ROI with detailed analytics and performance dashboards.
              </div>
            </div>
          </div>
          <div className="about-section__feature">
            <span className="about-section__feature-icon about-section__feature-icon--purple">
              🌐
            </span>
            <div>
              <div className="about-section__feature-title">
                Scalable Solutions
              </div>
              <div className="about-section__feature-desc">
                Our systems grow with your business, from startup to enterprise.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-section__right">
        <div className="about-section__impact-card">
          <div className="about-section__impact-header">
            <span className="about-section__impact-title">Our Impact</span>
            <span className="about-section__impact-badge">Client Success</span>
          </div>
          <div className="about-section__impact-stats">
            <div className="about-section__stat about-section__stat--blue">
              <span className="about-section__stat-icon">💬</span>
              <div>
                <div className="about-section__stat-label">
                  Customer Support
                </div>
                <div className="about-section__stat-value">
                  75% <span className="about-section__stat-arrow">↑</span>
                </div>
                <div className="about-section__stat-desc">
                  Faster resolution times
                </div>
              </div>
            </div>
            <div className="about-section__stat about-section__stat--purple">
              <span className="about-section__stat-icon">👥</span>
              <div>
                <div className="about-section__stat-label">
                  Staff Efficiency
                </div>
                <div className="about-section__stat-value">
                  40% <span className="about-section__stat-arrow">↑</span>
                </div>
                <div className="about-section__stat-desc">
                  Increase in productivity
                </div>
              </div>
            </div>
          </div>
          <div className="about-section__testimonial">
            <div className="about-section__testimonial-avatar">BJ</div>
            <div className="about-section__testimonial-content">
              <div className="about-section__testimonial-quote">
                "Canter's AI solution transformed our clinic's intake process.
                We've reduced paperwork by 40% and our patients love the
                streamlined experience."
              </div>
              <div className="about-section__testimonial-author">
                Dr. Brian Johnson
              </div>
              <div className="about-section__testimonial-role">
                Medical Director, Westside Health
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
