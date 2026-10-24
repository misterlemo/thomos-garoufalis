import { useLanguage } from '../LanguageContext';
import { TEAM } from '../data';

const Team = () => {
  const { t } = useLanguage();

  return (
    <section className="team section section-tint" id="team">
      <div className="container">
        <div className="section-head section-head-row" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="rule" aria-hidden="true" />
              {t.teamEyebrow}
            </p>
            <h2 className="section-title">{t.teamTitle}</h2>
          </div>
        </div>

        <ul className="team-grid">
          {TEAM.map((m, i) => (
            <li key={m.email} className="person" data-reveal style={{ '--i': i }}>
              <div className="portrait" aria-hidden="true">
                <span className="portrait-initials">{m.initials}</span>
                <span className="portrait-index">0{i + 1}</span>
              </div>
              <div className="person-info">
                <p className="person-role">{m.partner ? t.partner : t.associate}</p>
                <h3 className="person-name">
                  {/* first name / surname on their own lines so every card lines up */}
                  {t.team[i].split(' ').map((part) => (
                    <span key={part}>{part}</span>
                  ))}
                </h3>
                <a className="person-email" href={`mailto:${m.email}`}>
                  {m.email}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
