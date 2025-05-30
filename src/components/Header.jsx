import { useState } from "react";
import "./Header.scss";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span className="header__logo-icon">⚡</span>
        <span className="header__logo-text">Canter</span>
      </a>

      <button
        className="header__menu-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <nav className={`header__nav ${isMenuOpen ? "active" : ""}`}>
        <a href="#about" className="header__link" onClick={closeMenu}>
          About
        </a>
        <a href="#services" className="header__link" onClick={closeMenu}>
          Services
        </a>
        <a href="#case-studies" className="header__link" onClick={closeMenu}>
          Case Studies
        </a>
        <a href="#testimonials" className="header__link" onClick={closeMenu}>
          Testimonials
        </a>
        <a href="#contact" className="header__cta" onClick={closeMenu}>
          Get Started
        </a>
      </nav>
    </header>
  );
}

export default Header;
