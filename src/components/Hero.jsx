import { useLanguage } from '../LanguageContext';
import { useOfficeStatus, weekdayName, formatHour } from '../hooks';
import { PHONE, PHONE_HREF } from '../data';
import Emph from './Emph';

export const StatusPill = () => {
  const { t } = useLanguage();
  const s = useOfficeStatus();

  let detail = '';
  if (s.open) detail = `${t.until} ${formatHour(s.closesAt)}`;
  else if (s.opensAt != null)
    detail = `${t.opensAt} ${s.nextDay != null ? weekdayName(t.locale, s.nextDay, 'short') + ' ' : ''}${formatHour(s.opensAt)}`;

  return (
    <span className={`status ${s.open ? 'is-open' : ''}`}>
      <span className="status-dot" aria-hidden="true" />
      <strong>{s.open ? t.openNow : t.closedNow}</strong>
      {detail && <span className="status-detail">· {detail}</span>}
    </span>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const badge = t.badge;

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="rule" aria-hidden="true" />
            {t.heroEyebrow}
          </p>

          <h1 className="hero-title">
            {t.heroTitle.map((line, i) => (
              <span className="line" key={`${t.locale}-${i}`} style={{ '--d': `${0.1 + i * 0.12}s` }}>
                <span>
                  <Emph text={line} />
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-lead">{t.heroLead}</p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-accent">
              {t.heroPrimary}
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
            <a href="#practice" className="btn btn-ghost">
              {t.heroSecondary}
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <div className="arch">
            <img
              src="/images/hero.jpg"
              alt=""
              width="1536"
              height="1024"
              fetchpriority="high"
            />
          </div>
          <div className="seal" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#seal-circle" textLength="488">
                  {badge}
                </textPath>
              </text>
            </svg>
            <span className="seal-mark">§</span>
          </div>
        </figure>
      </div>

      <div className="container hero-bar">
        <StatusPill />
        <a href={PHONE_HREF} className="hero-phone">
          {PHONE}
        </a>
        <a href="#practice" className="scroll-cue">
          {t.scroll}
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
