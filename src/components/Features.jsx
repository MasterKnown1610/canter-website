import "./Features.scss";

function Features() {
  return (
    <section className="features">
      <div className="features__grid">
        <div className="features__card">
          <div className="features__number features__number--blue">01</div>
          <div className="features__title">Virtual Assistants</div>
          <div className="features__desc">
            AI-powered customer service agents
          </div>
        </div>
        <div className="features__card">
          <div className="features__number features__number--purple">02</div>
          <div className="features__title">Process Automation</div>
          <div className="features__desc">Streamline business workflows</div>
        </div>
        <div className="features__card">
          <div className="features__number features__number--blue">03</div>
          <div className="features__title">Data Analytics</div>
          <div className="features__desc">Insights for smarter decisions</div>
        </div>
        <div className="features__card">
          <div className="features__number features__number--purple">04</div>
          <div className="features__title">Custom Solutions</div>
          <div className="features__desc">Tailored to your business</div>
        </div>
      </div>
    </section>
  );
}

export default Features;
