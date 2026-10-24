import { useLanguage } from '../LanguageContext';
import Emph from './Emph';

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section className="approach section" id="approach">
      <div className="container approach-grid">
        <div className="approach-head" data-reveal>
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {t.approachEyebrow}
          </p>
          <h2 className="section-title">
            <Emph text={t.approachTitle} />
          </h2>
        </div>

        <ol className="steps">
          {t.steps.map((s, i) => (
            <li key={i} className="step" data-reveal style={{ '--i': i }}>
              <span className="step-num">{['I', 'II', 'III'][i]}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container">
        <dl className="facts" data-reveal>
          {t.facts.map((f, i) => (
            <div key={i} className="fact">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Approach;
