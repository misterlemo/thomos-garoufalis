import { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { OFFICE_EMAILS, PHONE, PHONE_HREF } from '../data';
import { Monogram } from './Header';

// Scale the wordmark so it spans the container exactly, whatever the language.
const useFitText = (text) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = '100px';
      const natural = el.scrollWidth;
      const available = el.clientWidth;
      if (natural) el.style.fontSize = `${Math.min(160, (100 * available) / natural)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);
  return ref;
};

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const wordmarkRef = useFitText(t.firmShort);

  return (
    <footer className="footer section-dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Monogram />
            <p>{t.firmLong}</p>
          </div>
          <div className="footer-col">
            <p>{t.address[0]}</p>
            <p>{t.address[1]}</p>
          </div>
          <div className="footer-col">
            <a href={PHONE_HREF}>{PHONE}</a>
            {OFFICE_EMAILS.map((m) => (
              <a key={m} href={`mailto:${m}`}>
                {m}
              </a>
            ))}
          </div>
          <div className="footer-col">
            {['practice', 'approach', 'team', 'contact'].map((id) => (
              <a key={id} href={`#${id}`}>
                {t.nav[id]}
              </a>
            ))}
          </div>
        </div>

        <p className="wordmark" aria-hidden="true">
          <span ref={wordmarkRef}>{t.firmShort}</span>
        </p>

        <div className="footer-bottom">
          <span>
            © 2019–{year} {t.firmShort}. {t.rights}
          </span>
          <span>{t.footerNote}</span>
          <a href="#top">{t.backToTop} ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
