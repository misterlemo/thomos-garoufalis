import { useLanguage } from './LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">{t.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
