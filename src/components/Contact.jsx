import "./Contact.scss";
import { useState } from "react";
import useToast from "../hooks/useToast";
import Toast from "./Toast";

function Contact() {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    privacy: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Google Form submission URL
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScpwN4Sphn6UsqOb5jkZEmg7LoDBC6GKhvN_cH-jTIVG-DYsw/formResponse";

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "entry.1276597779": formData.name,
          "entry.270335779": formData.email,
          "entry.1709713200": formData.company,
          "entry.699694400": formData.message,
        }).toString(),
      });

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        privacy: false,
      });

      showToast(
        "Thank you for your message! We'll get back to you soon.",
        "success"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "There was an error submitting your message. Please try again.",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="contact-section">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
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
        <form className="contact-section__form" onSubmit={handleSubmit}>
          <div className="contact-section__form-title">Send us a Message</div>
          <div className="contact-section__form-row">
            <div className="contact-section__form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="contact-section__form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="contact-section__form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              required
            />
          </div>
          <div className="contact-section__form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              required
            ></textarea>
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
