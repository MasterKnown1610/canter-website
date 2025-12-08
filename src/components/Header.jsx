import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import logo from "../assets/logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100; // Offset for header height

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span className="header__logo-icon">
          <img src={logo} alt="Canter" />
        </span>
      </Link>

      <button
        className="header__menu-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <nav className={`header__nav ${isMenuOpen ? "active" : ""}`}>
        {location.pathname === "/" ? (
          <>
            <a
              href="#about"
              className={`header__link ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#services"
              className={`header__link ${
                activeSection === "services" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="#case-studies"
              className={`header__link ${
                activeSection === "case-studies" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              Case Studies
            </a>
            <a
              href="#contact"
              className={`header__link ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              Contact
            </a>
          </>
        ) : (
          <Link to="/" className="header__link" onClick={closeMenu}>
            Home
          </Link>
        )}
      </nav>
      {location.pathname === "/" ? (
        <a href="#contact" className="header__cta" onClick={closeMenu}>
          Get Started
        </a>
      ) : (
        <Link to="/business-form" className="header__cta" onClick={closeMenu}>
          Register Business
        </Link>
      )}
    </header>
  );
}

export default Header;
