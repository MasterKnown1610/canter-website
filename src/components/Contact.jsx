import "./Contact.scss";

function Contact() {
  return (
    <section className="contact-section">
      <h2 className="contact-section__title">
        Get in <span className="contact-section__title--accent">Touch</span>
      </h2>
      <p className="contact-section__subtitle">
        Ready to transform your business with AI? Contact us today to schedule a
        consultation.
      </p>
      <div className="contact-section__divider" />
      <div className="contact-section__content">
        <div className="contact-section__info">
          <div className="contact-section__info-block">
            <div className="contact-section__info-title">
              Contact Information
            </div>
            <div className="contact-section__info-item">
              <span className="contact-section__info-icon contact-section__info-icon--blue">
                ✉️
              </span>
              <div>
                <div className="contact-section__info-label">Email</div>
                <div className="contact-section__info-value">
                  info@canterbusiness.com
                </div>
              </div>
            </div>
            <div className="contact-section__info-item">
              <span className="contact-section__info-icon contact-section__info-icon--purple">
                📞
              </span>
              <div>
                <div className="contact-section__info-label">Phone</div>
                <div className="contact-section__info-value">
                  +1 (800) 555-0123
                </div>
              </div>
            </div>
            <div className="contact-section__info-item">
              <span className="contact-section__info-icon contact-section__info-icon--blue">
                📍
              </span>
              <div>
                <div className="contact-section__info-label">Location</div>
                <div className="contact-section__info-value">
                  100 Innovation Drive
                  <br />
                  Dallas, Texas 75201
                </div>
              </div>
            </div>
          </div>
          <div className="contact-section__hours-card">
            <div className="contact-section__hours-title">Business Hours</div>
            <div className="contact-section__hours-row">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="contact-section__hours-row">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
            <div className="contact-section__hours-row">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
        <form className="contact-section__form">
          <div className="contact-section__form-title">Send us a Message</div>
          <div className="contact-section__form-row">
            <div className="contact-section__form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="contact-section__form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div className="contact-section__form-group">
            <label>Company Name</label>
            <input type="text" placeholder="Your Company" />
          </div>
          <div className="contact-section__form-group">
            <label>Message</label>
            <textarea placeholder="How can we help you?" rows={4}></textarea>
          </div>
          <div className="contact-section__form-check">
            <input type="checkbox" id="privacy" />
            <label htmlFor="privacy">
              I agree to the{" "}
              <a href="#" className="contact-section__privacy-link">
                Privacy Policy
              </a>
            </label>
          </div>
          <button className="contact-section__submit" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
