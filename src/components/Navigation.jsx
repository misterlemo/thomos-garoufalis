import { useLanguage } from '../LanguageContext';
import LanguageSelector from '../LanguageSelector';

const Navigation = () => {
  const { t } = useLanguage();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>ΘΩΜΟΣ - ΓΑΡΟΥΦΑΛΗΣ</h2>
        </div>
        
        <ul className="nav-menu">
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

        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navigation;
