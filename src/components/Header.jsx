import { useEffect, useState } from 'react';
import { LANGUAGES, useLanguage } from '../LanguageContext';

const LINKS = ['practice', 'approach', 'team', 'contact'];

export const Monogram = () => (
  <span className="monogram" aria-hidden="true">
    <span>Θ</span>
    <span>Γ</span>
  </span>
);

const LangSwitch = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-label={l.name}
          aria-pressed={language === l.code}
          onClick={() => setLanguage(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <Monogram />
          <span className="brand-text">
            <span className="brand-name">{t.firmShort}</span>
            <span className="brand-kind">{t.firmKind}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <LangSwitch />
          <a href="#contact" className="btn btn-sm btn-ink">
            {t.cta}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle-label">{open ? t.close : t.menu}</span>
            <span className="menu-toggle-icon" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{ '--i': i }}>
              <span className="mobile-num">0{i + 1}</span>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="mobile-foot">
          <LangSwitch />
          <a href="#contact" className="btn btn-accent" onClick={() => setOpen(false)}>
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
