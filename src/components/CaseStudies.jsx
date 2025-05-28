import "./CaseStudies.scss";

const studies = [
  {
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
    category: "Hospitality",
    title: "AI-Powered Restaurant Ordering",
    desc: "Implemented an AI ordering system for a chain of 5 restaurants, resulting in improved customer satisfaction and reduced staff workload.",
    results: "30% reduction in wait times, 25% increase in order accuracy",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    category: "Healthcare",
    title: "Healthcare Intake Automation",
    desc: "Developed a patient intake system for a medical clinic, streamlining the check-in process and improving data accuracy.",
    results: "40% less paperwork, 20% shorter appointment times",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    category: "IT Services",
    title: "ServiceNow Ticket Resolution",
    desc: "Created an AI agent that automatically resolves common IT service tickets, dramatically reducing response times.",
    results:
      "65% automated resolution rate, 48-hour reduction in resolution time",
  },
];

function CaseStudies() {
  return (
    <section className="case-studies">
      <h2 className="case-studies__title">
        <span className="case-studies__title--white">Case</span>
        <span className="case-studies__title--purple"> Studies</span>
      </h2>
      <p className="case-studies__subtitle">
        Real-world examples of how our AI solutions transform businesses
      </p>
      <div className="case-studies__divider" />
      <div className="case-studies__grid">
        {studies.map((study, idx) => (
          <div className="case-studies__card" key={idx}>
            <div className="case-studies__image-wrap">
              <img
                src={study.image}
                alt={study.title}
                className="case-studies__image"
              />
              <span className="case-studies__badge">{study.category}</span>
            </div>
            <div className="case-studies__card-content">
              <div className="case-studies__card-title">{study.title}</div>
              <div className="case-studies__card-desc">{study.desc}</div>
              <div className="case-studies__results">
                <span className="case-studies__results-label">Results:</span>
                <span className="case-studies__results-value">
                  {study.results}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="case-studies__cta">View All Case Studies</button>
    </section>
  );
}

export default CaseStudies;
