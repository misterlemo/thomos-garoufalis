import { useLanguage } from '../LanguageContext';

const Team = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      key: 'member1',
      email: 'thomchri@hotmail.com'
    },
    {
      key: 'member2',
      email: 'garoufalis.ls@gmail.com'
    },
    {
      key: 'member3',
      email: 'apoampr@gmail.com'
    },
    {
      key: 'member4',
      email: 'efgeorgov@gmail.com'
    }
  ];

  return (
    <section id="team" className="section team">
      <div className="container">
        <h2 className="section-title">{t.teamTitle}</h2>
        <p className="section-subtitle">{t.teamSubtitle}</p>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.key} className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo-placeholder">
                  <span>{t[`${member.key}Name`].charAt(0)}</span>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{t[`${member.key}Name`]}</h3>
                <p className="team-role">{t[`${member.key}Role`]}</p>
                <p className="team-bio">{t[`${member.key}Bio`]}</p>
                <div className="team-email">
                  ✉ {member.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
