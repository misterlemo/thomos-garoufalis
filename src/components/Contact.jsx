import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useOfficeStatus, weekdayName, formatHour } from '../hooks';
import { HOURS, MAPS_EMBED, MAPS_URL, OFFICE_EMAILS, PHONE, PHONE_HREF, WEB3FORMS_KEY } from '../data';
import Emph from './Emph';
import { StatusPill } from './Hero';

const EMPTY = { name: '', email: '', phone: '', topic: '', message: '' };
const WEEK = [1, 2, 3, 4, 5, 6, 0];

const Contact = () => {
  const { t } = useLanguage();
  const { today } = useOfficeStatus();
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [botcheck, setBotcheck] = useState(false);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = t.form.required;
    if (!data.email.trim()) e.email = t.form.required;
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = t.form.invalidEmail;
    if (!data.message.trim()) e.message = t.form.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (botcheck) return; // honeypot ticked — almost certainly a bot
    if (!validate()) return;

    const subject = `Website enquiry${data.topic ? ` — ${data.topic}` : ''}`;

    if (!WEB3FORMS_KEY) {
      const body = `${data.message}\n\n${data.name}\n${data.email}${data.phone ? `\n${data.phone}` : ''}`;
      window.location.href = `mailto:${OFFICE_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: data.name,
          ...data,
          topic: data.topic || '—',
          language: t.locale,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      setStatus('success');
      setData(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const field = (name, label, props = {}) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea id={`f-${name}`} name={name} rows={5} value={data[name]} onChange={onChange} aria-invalid={!!errors[name]} />
      ) : (
        <input id={`f-${name}`} name={name} value={data[name]} onChange={onChange} aria-invalid={!!errors[name]} {...props} />
      )}
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <section className="contact section" id="contact">
      <div className="container contact-grid">
        <div className="contact-info" data-reveal>
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {t.contactEyebrow}
          </p>
          <h2 className="contact-title">
            <Emph text={t.contactTitle} />
          </h2>
          <p className="section-lead">{t.contactLead}</p>

          <dl className="details">
            <div>
              <dt>{t.phoneLabel}</dt>
              <dd>
                <a href={PHONE_HREF} className="big-link">
                  {PHONE}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.emailLabel}</dt>
              <dd>
                {OFFICE_EMAILS.map((m) => (
                  <a key={m} href={`mailto:${m}`}>
                    {m}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt>{t.addressLabel}</dt>
              <dd>
                {t.address[0]}
                <br />
                {t.address[1]}
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="arrow-link">
                  {t.directions} ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.hoursLabel}</dt>
              <dd>
                <StatusPill />
                <table className="hours">
                  <tbody>
                    {WEEK.map((d) => (
                      <tr key={d} className={d === today ? 'is-today' : ''}>
                        <th scope="row">{weekdayName(t.locale, d)}</th>
                        <td>{HOURS[d] ? `${formatHour(HOURS[d][0])} – ${formatHour(HOURS[d][1])}` : t.closed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>
        </div>

        <div className="form-card" data-reveal>
          {status === 'success' ? (
            <div className="form-done" role="status">
              <span className="form-done-mark" aria-hidden="true">✓</span>
              <p>{t.form.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <input
                type="checkbox"
                name="botcheck"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
              />
              <div className="field-row">
                {field('name', t.form.name, { autoComplete: 'name' })}
                {field('email', t.form.email, { type: 'email', autoComplete: 'email' })}
              </div>
              <div className="field-row">
                {field('phone', t.form.phone, { type: 'tel', autoComplete: 'tel' })}
                <div className="field">
                  <label htmlFor="f-topic">{t.form.topic}</label>
                  <select id="f-topic" name="topic" value={data.topic} onChange={onChange}>
                    <option value="">—</option>
                    {t.practices.map((p) => (
                      <option key={p.title}>{p.title}</option>
                    ))}
                    <option>{t.form.topicOther}</option>
                  </select>
                </div>
              </div>
              {field('message', t.form.message, { as: 'textarea' })}

              <p className="form-note">{t.form.consent}</p>
              {status === 'error' && (
                <p className="form-error" role="alert">
                  {t.form.error}
                </p>
              )}
              <button type="submit" className="btn btn-accent btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? t.form.sending : t.form.submit}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container">
        <div className="map" data-reveal>
          <iframe
            src={MAPS_EMBED}
            title={t.address.join(', ')}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
