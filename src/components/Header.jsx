import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__logo-icon">⚡</span>
        <span className="header__logo-text">Canter</span>
      </div>
      <nav className="header__nav">
        <a href="#" className="header__link">
          Home
        </a>
        <a href="#" className="header__link">
          Services
        </a>
        <a href="#" className="header__link">
          Case Studies
        </a>
        <a href="#" className="header__link">
          About
        </a>
        <a href="#" className="header__link">
          Contact
        </a>
      </nav>
      <a href="#" className="header__cta">
        Get Started
      </a>
    </header>
  );
}

export default Header;
