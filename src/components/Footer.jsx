import "./Footer.scss";
import logo from "../assets/logo.png";
function Footer() {
  return (
    <footer className="footer-new">
      <div className="footer-new__main">
        <div className="footer-new__col footer-new__brand">
          <div className="footer-new__logo">
            <span className="footer-new__logo-icon">
              <img src={logo} alt="Canter" />
            </span>
          </div>
          <div className="footer-new__desc">
            Transforming businesses with AI-powered solutions that drive
            efficiency and growth.
          </div>
          <div className="footer-new__socials">
            <a href="#" aria-label="Facebook" className="footer-new__social">
              <span>🌐</span>
            </a>
            <a href="#" aria-label="Twitter" className="footer-new__social">
              <span>🐦</span>
            </a>
            <a href="#" aria-label="LinkedIn" className="footer-new__social">
              <span>💼</span>
            </a>
            <a href="#" aria-label="Instagram" className="footer-new__social">
              <span>📸</span>
            </a>
          </div>
        </div>
        <div className="footer-new__col">
          <div className="footer-new__col-title">Services</div>
          <a href="#" className="footer-new__link">
            AI Integration
          </a>
          <a href="#" className="footer-new__link">
            Restaurant Solutions
          </a>
          <a href="#" className="footer-new__link">
            Healthcare Assistants
          </a>
          <a href="#" className="footer-new__link">
            CRM Integration
          </a>
          <a href="#" className="footer-new__link">
            HR Solutions
          </a>
        </div>
        <div className="footer-new__col">
          <div className="footer-new__col-title">Company</div>
          <a href="#" className="footer-new__link">
            About Us
          </a>
          <a href="#" className="footer-new__link">
            Case Studies
          </a>
          <a href="#" className="footer-new__link">
            Testimonials
          </a>
          <a href="#" className="footer-new__link">
            Careers
          </a>
          <a href="#" className="footer-new__link">
            Blog
          </a>
        </div>
        <div className="footer-new__col">
          <div className="footer-new__col-title">Support</div>
          <a href="#" className="footer-new__link">
            Contact Us
          </a>
          <a href="#" className="footer-new__link">
            FAQ
          </a>
          <a href="#" className="footer-new__link">
            Privacy Policy
          </a>
          <a href="#" className="footer-new__link">
            Terms of Service
          </a>
          <a href="#" className="footer-new__link">
            Support Center
          </a>
        </div>
      </div>
      <div className="footer-new__bottom">
        <div className="footer-new__copyright">
          &copy; {new Date().getFullYear()} Canter Business Solutions. All
          rights reserved.
        </div>
        <div className="footer-new__policies">
          <a href="#" className="footer-new__policy-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-new__policy-link">
            Terms of Service
          </a>
          <a href="#" className="footer-new__policy-link">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
