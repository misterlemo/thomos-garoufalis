import { useLanguage } from '../LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section home">
      <div className="container">
        <div className="home-content">
          <h1 className="home-title">
            <span className="title-first-line">{t.firmNameFirst}</span>
            <span className="title-second-line">{t.firmNameSecond}</span>
            <span className="title-third-line">{t.firmNameThird}</span>
          </h1>
          <p className="home-tagline">{t.tagline}</p>
          <p className="home-intro">{t.intro}</p>
          <button 
            className="cta-button"
            onClick={handleContactClick}
          >
            {t.contactUs}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
