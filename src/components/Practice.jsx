import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const Marquee = ({ items }) => {
  const row = items.flatMap((item, i) => [
    <span key={`t${i}`}>{item}</span>,
    <span key={`s${i}`} className="marquee-star" aria-hidden="true">
      §
    </span>,
  ]);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </div>
  );
};

const Practice = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section className="practice section-dark" id="practice">
      <Marquee items={t.practices.map((p) => p.title)} />

      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {t.practiceEyebrow}
          </p>
          <h2 className="section-title">{t.practiceTitle}</h2>
          <p className="section-lead">{t.practiceLead}</p>
        </div>

        <ol className="practice-list">
          {t.practices.map((p, i) => {
            const isOpen = active === i;
            return (
              <li key={i} className={`practice-item ${isOpen ? 'is-open' : ''}`} data-reveal style={{ '--i': i }}>
                <button
                  type="button"
                  className="practice-row"
                  aria-expanded={isOpen}
                  aria-controls={`practice-${i}`}
                  onClick={() => setActive(isOpen ? -1 : i)}
                >
                  <span className="practice-num">0{i + 1}</span>
                  <span className="practice-title">{p.title}</span>
                  <span className="practice-icon" aria-hidden="true" />
                </button>
                <div className="practice-body" id={`practice-${i}`} role="region">
                  <div className="practice-body-inner">
                    <p>{p.desc}</p>
                    <ul className="tags">
                      {p.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Practice;
