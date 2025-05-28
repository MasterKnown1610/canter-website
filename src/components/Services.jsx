import "./Services.scss";

const services = [
  {
    icon: "📞",
    title: "AI Restaurant Management",
    desc: "Automated ordering systems that handle phone orders, table reservations, and status updates. Reduce wait times and free up staff for a better dining experience.",
    color: "blue",
  },
  {
    icon: "🩺",
    title: "Healthcare Assistants",
    desc: "Digital intake assistants that collect patient information before appointments. Streamline the check-in process and allow physicians to focus on patient care.",
    color: "purple",
  },
  {
    icon: "📊",
    title: "CRM Integration",
    desc: "AI-powered service ticket resolution for Salesforce and ServiceNow. Automatically resolve common issues and guide users through complex procedures.",
    color: "blue",
  },
  {
    icon: "👥",
    title: "HR Solutions",
    desc: "Intelligent HR assistants for onboarding, benefits management, and employee support. Reduce administrative burden and improve employee satisfaction.",
    color: "purple",
  },
  {
    icon: "🗄️",
    title: "Custom AI Integration",
    desc: "Tailor-made AI solutions integrated with your existing systems. Connect your business tools to powerful AI capabilities with minimal disruption.",
    color: "blue",
  },
  {
    icon: "🧬",
    title: "Product Development",
    desc: "End-to-end AI product development services. From concept to deployment, we build innovative AI solutions for your specific business needs.",
    color: "purple",
  },
];

function Services() {
  return (
    <section className="services-page">
      <h2 className="services-page__title">
        <span className="services-page__title--white">Our</span>
        <span className="services-page__title--purple"> Services</span>
      </h2>
      <p className="services-page__subtitle">
        Transformative AI solutions tailored for small and medium-sized
        businesses
      </p>
      <div className="services-page__divider" />
      <div className="services-page__grid">
        {services.map((service, idx) => (
          <div
            className={`services-page__card services-page__card--${service.color}`}
            key={idx}
          >
            <div
              className={`services-page__icon services-page__icon--${service.color}`}
            >
              {service.icon}
            </div>
            <div className="services-page__card-title">{service.title}</div>
            <div className="services-page__card-desc">{service.desc}</div>
            <a href="#" className="services-page__learn-more">
              Learn more <span className="services-page__arrow">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
