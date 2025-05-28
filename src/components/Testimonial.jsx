import "./Testimonial.scss";

function Testimonial() {
  return (
    <section className="testimonial">
      <blockquote className="testimonial__quote">
        "Canter helped us automate our customer service, saving us 30+ hours per
        week while improving customer satisfaction."
      </blockquote>
      <div className="testimonial__author">— Sarah J., Restaurant Owner</div>
    </section>
  );
}

export default Testimonial;
