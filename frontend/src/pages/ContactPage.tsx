import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { sampleSiteSettings } from '../data/sampleData';
import { useAppLanguage, getLocalized } from '../i18n';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentLang } = useAppLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t('contact.errName');
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = t('contact.errEmail');
    }
    if (!formData.subject.trim()) errs.subject = t('contact.errSubject');
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = t('contact.errMessage');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate safe local submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  const localizedAddress = getLocalized(sampleSiteSettings.locationAddress, currentLang);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">{t('contact.sub')}</span>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.desc')}</p>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-10)', alignItems: 'flex-start' }}>
          {/* Left Column: Contact Details & Map */}
          <div>
            <div className="card card-cultural-top" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
                {t('contact.contactInfoHeading')}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-base)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={22} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>{t('contact.locationTitle')}:</strong>
                    <span>{localizedAddress}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>{t('contact.emailTitle')}:</strong>
                    <span>{sampleSiteSettings.contactEmail}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>{t('contact.phoneTitle')}:</strong>
                    <span>{sampleSiteSettings.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="card" style={{ padding: 'var(--space-2)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-3)', fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-maroon-primary)' }}>
                🗺️ {t('contact.mapsTitle')}
              </div>
              <div style={{ width: '100%', height: '260px', background: 'var(--color-cream-alt)', position: 'relative' }}>
                <iframe
                  title="Temple Location Map"
                  src={sampleSiteSettings.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="card card-gold-top" style={{ padding: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
              {t('contact.formTitle')}
            </h2>
            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-5)' }}>
              {currentLang === 'te'
                ? 'ఉత్సవాల గురించి సందేహాలు లేదా సలహాలు ఉన్నాయా? మీ సందేశాన్ని ఇక్కడ నమోదు చేయండి.'
                : 'Have questions about upcoming poojas or want to submit feedback? Leave a message below.'}
            </p>

            {submitted ? (
              <div
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto var(--space-3) auto' }} />
                <h3 style={{ color: 'var(--color-success)', marginBottom: 'var(--space-2)' }}>
                  {t('contact.successTitle')}
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: '#2E7D32', margin: 0 }}>
                  {t('contact.successMsg')}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="name" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                    {t('contact.nameLabel')} <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                    placeholder={t('contact.namePlaceholder')}
                  />
                  {errors.name && (
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email and Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                      {t('contact.emailLabel')} <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                      placeholder={t('contact.emailPlaceholder')}
                    />
                    {errors.email && (
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="subject" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                    {t('contact.subjectLabel')} <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                  {errors.subject && (
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label htmlFor="message" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                    {t('contact.messageLabel')} <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)', resize: 'vertical' }}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Send size={16} />
                  <span>{submitting ? t('contact.submitting') : t('contact.sendButton')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

