import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSelector from '../LanguageSelector';

const Navigation = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>ΘΩΜΟΣ - ΓΑΡΟΥΦΑΛΗΣ</h2>
        </div>

        <button 
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
              {t.home}
            </a>
          </li>
          <li>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>
              {t.services}
            </a>
          </li>
          <li>
            <a href="#team" onClick={(e) => handleNavClick(e, 'team')}>
              {t.team}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
              {t.contact}
            </a>
          </li>
        </ul>

        <div className={`nav-language ${isMenuOpen ? 'open' : ''}`}>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
