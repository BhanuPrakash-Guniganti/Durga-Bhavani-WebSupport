import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { sampleSiteSettings } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';

export const ContactPage: React.FC = () => {
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
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a message subject.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please enter a detailed message (at least 10 characters).';
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

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Get in Touch</span>
          <h1>Contact the Organizing Committee</h1>
          <p>
            Reach out to Durga Bhavani Seva Samiti for festival inquiries, pooja participation, volunteer seva,
            or historical photo submissions.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Contact & Location Information" />
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-10)', alignItems: 'flex-start' }}>
          {/* Left Column: Contact Details & Map */}
          <div>
            <div className="card card-cultural-top" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
                Temple Location & Office
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--font-size-base)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={22} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>Address:</strong>
                    <span>{sampleSiteSettings.locationAddress}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>Email:</strong>
                    <span>{sampleSiteSettings.contactEmail}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)' }}>Phone:</strong>
                    <span>{sampleSiteSettings.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="card" style={{ padding: 'var(--space-2)', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-3)', fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-maroon-primary)' }}>
                🗺️ Dodlapahad Location Map
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
              Send an Inquiry or Message
            </h2>
            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-5)' }}>
              Have questions about upcoming poojas or want to submit feedback? Leave a message below.
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
                  Message Received!
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: '#2E7D32', margin: 0 }}>
                  Thank you for contacting Durga Bhavani Seva Samiti. This is a layout demonstration; no actual
                  emails are dispatched without verified committee backend configuration.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="name" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                    Full Name <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                    placeholder="Enter your name"
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
                      Email Address <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                      Phone (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="subject" style={{ display: 'block', fontWeight: 600, fontSize: 'var(--font-size-sm)', marginBottom: '4px' }}>
                    Subject <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)' }}
                    placeholder="e.g. Navaratri Pooja Inquiry or Historical Photo Submission"
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
                    Message <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="search-input"
                    style={{ borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)', resize: 'vertical' }}
                    placeholder="Write your message here..."
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
                  <span>{submitting ? 'Submitting Message...' : 'Send Message to Committee'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
