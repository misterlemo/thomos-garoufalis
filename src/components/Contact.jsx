import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.requiredField;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.requiredField;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.requiredField;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setSubmitError(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">{t.contactTitle}</h2>
        <p className="section-subtitle">{t.contactSubtitle}</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <h3>{t.addressLabel}</h3>
              <p>{t.address}</p>
            </div>
            
            <div className="contact-item">
              <h3>{t.phoneLabel}</h3>
              <p>
                <a href="tel:+306981357660">{t.phone}</a>
              </p>
            </div>
            
            <div className="contact-item">
              <h3>{t.emailLabel}</h3>
              <p>
                <a href="mailto:garoufalis.ls@gmail.com">garoufalis.ls@gmail.com</a>
                <br />
                <a href="mailto:thomchri@hotmail.com">thomchri@hotmail.com</a>
              </p>
            </div>
            
            <div className="contact-item">
              <h3>{t.officeHoursLabel}</h3>
              <ul className="office-hours">
                <li>{t.officeHours.monday}</li>
                <li>{t.officeHours.tuesday}</li>
                <li>{t.officeHours.wednesday}</li>
                <li>{t.officeHours.thursday}</li>
                <li>{t.officeHours.friday}</li>
                <li>{t.officeHours.saturday}</li>
                <li>{t.officeHours.sunday}</li>
              </ul>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h3>{t.formTitle}</h3>
            
            {submitted && (
              <div className="form-success">
                {t.successMessage}
              </div>
            )}
            
            {submitError && (
              <div className="form-error">
                {t.errorMessage}
              </div>
            )}
            
            <form 
              className="contact-form"
              onSubmit={handleSubmit}
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
              <input type="hidden" name="subject" value="New Contact Form Submission" />
              <input type="hidden" name="from_name" value="Law Firm Website" />
              <input type="hidden" name="replyto" value={formData.email} />
              <input type="hidden" name="email" value="misterlemo@gmail.com" />
              
              <div className="form-group">
                <label htmlFor="name">{t.nameLabel} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t.emailLabel} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t.phoneLabel}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t.messageLabel} *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows="5"
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="submit-button">
                {t.submitButton}
              </button>
            </form>
          </div>
        </div>
        
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps?q=Dodekanisou+21,+Thessaloniki+546+26,+Greece&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={language === 'el' ? 'Χάρτης Θεσσαλονίκης' : 'Thessaloniki Map'}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
