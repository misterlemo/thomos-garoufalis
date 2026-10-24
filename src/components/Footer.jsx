import { useLanguage } from '../LanguageContext';
import { OFFICE_EMAILS, PHONE, PHONE_HREF } from '../data';
import { Monogram } from './Header';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

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
          {t.firmShort}
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
