import { useEffect, useRef, useState } from 'react';
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
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | mailto
  const [draft, setDraft] = useState(null); // composed email for the no-key fallback
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // The result panels are shorter than the form; keep them on screen.
  useEffect(() => {
    if (status === 'mailto' || status === 'success') {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [status]);
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
      // No delivery service configured: hand off to the visitor's own email.
      // mailto: fails silently when no mail app is set up, so always show
      // the fallback panel with Gmail / copy options as well.
      const body = `${data.message}\n\n${data.name}\n${data.email}${data.phone ? `\n${data.phone}` : ''}`;
      const to = OFFICE_EMAILS.join(',');
      const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setDraft({
        body,
        mailto: `mailto:${to}?${q}`,
        gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      });
      setCopied(false);
      setStatus('mailto');
      const link = document.createElement('a');
      link.href = `mailto:${to}?${q}`;
      link.click();
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

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(`${OFFICE_EMAILS[0]}\n\n${draft.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
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

        <div className="form-card" data-reveal ref={cardRef}>
          {status === 'mailto' && draft ? (
            <div className="form-fallback" role="status">
              <h3>{t.form.fallbackTitle}</h3>
              <p>{t.form.fallbackText}</p>
              <div className="fallback-actions">
                <a href={draft.mailto} className="btn btn-accent btn-block">
                  {t.form.openMail}
                </a>
                <a href={draft.gmail} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-block">
                  {t.form.openGmail} ↗
                </a>
                <button type="button" className="btn btn-outline-light btn-block" onClick={copyDraft}>
                  {copied ? t.form.copied : t.form.copy}
                </button>
              </div>
              <p className="form-note">
                {t.form.sendTo}{' '}
                {OFFICE_EMAILS.map((m, i) => (
                  <span key={m}>
                    {i > 0 && ' · '}
                    <a href={`mailto:${m}`}>{m}</a>
                  </span>
                ))}
              </p>
              <button type="button" className="link-button" onClick={() => setStatus('idle')}>
                {t.form.back}
              </button>
            </div>
          ) : status === 'success' ? (
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
