import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowLeft, Globe, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { currentLang, toggleLanguage } = useAppLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg(
        currentLang === 'te'
          ? 'దయచేసి ఈమెయిల్ మరియు పాస్‌వర్డ్ నమోదు చేయండి.'
          : 'Please enter both your email address and password.'
      );
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      await login(email.trim(), password.trim());
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check credentials.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A0000 0%, #3B0000 50%, #150000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        position: 'relative'
      }}
    >
      {/* Top Navbar with Language Toggle and Back Button */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFE082',
            textDecoration: 'none',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            background: 'rgba(0,0,0,0.3)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(212,175,55,0.3)'
          }}
        >
          <ArrowLeft size={16} />
          <span>{currentLang === 'te' ? 'పబ్లిక్ సైట్' : 'Public Website'}</span>
        </Link>

        <button
          type="button"
          onClick={toggleLanguage}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0,0,0,0.3)',
            color: '#FFE082',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-size-sm)',
            cursor: 'pointer'
          }}
        >
          <Globe size={16} />
          <span>{currentLang === 'en' ? 'తెలుగు' : 'English'}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(25, 3, 3, 0.95)',
          border: '2px solid var(--color-gold-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212, 175, 55, 0.15)',
          color: '#FFF',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Emblem & Branding */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto var(--space-3)',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--color-gold-primary), #B8860B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
            }}
          >
            🔱
          </div>
          <h1
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: '#FFE082',
              margin: '0 0 var(--space-1) 0',
              letterSpacing: '0.5px'
            }}
          >
            {currentLang === 'te' ? 'ఆలయ నిర్వాహకుల లాగిన్' : 'Temple Admin Portal'}
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: '#D6C8B8' }}>
            {currentLang === 'te'
              ? 'శ్రీ దుర్గాభవాని సేవా సమితి - దొడ్లపహాడ్'
              : 'Durga Bhavani Seva Samiti - Dodlapahad'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(180, 40, 40, 0.25)',
              border: '1px solid #FF5252',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              marginBottom: 'var(--space-5)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: '#FFCDD2',
              fontSize: 'var(--font-size-sm)'
            }}
          >
            <ShieldAlert size={18} color="#FF5252" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                color: '#FFE082',
                marginBottom: 'var(--space-1.5)'
              }}
            >
              {currentLang === 'te' ? 'అధీకృత ఈమెయిల్' : 'Administrator Email'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contactdurgabhavani.dodlapahad@gmail.com"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px 10px 38px',
                  color: '#FFF',
                  fontSize: 'var(--font-size-sm)',
                  boxSizing: 'border-box'
                }}
              />
              <Mail
                size={16}
                color="var(--color-gold-primary)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                color: '#FFE082',
                marginBottom: 'var(--space-1.5)'
              }}
            >
              {currentLang === 'te' ? 'రహస్య పాస్‌వర్డ్' : 'Secure Password'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px 10px 38px',
                  color: '#FFF',
                  fontSize: 'var(--font-size-sm)',
                  boxSizing: 'border-box'
                }}
              />
              <Lock
                size={16}
                color="var(--color-gold-primary)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="btn btn-gold"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px 20px',
              fontSize: 'var(--font-size-base)',
              fontWeight: 700,
              gap: '8px'
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>{currentLang === 'te' ? 'ధృవీకరిస్తోంది...' : 'Authenticating...'}</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>{currentLang === 'te' ? 'సురక్షిత లాగిన్' : 'Sign In as Administrator'}</span>
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            textAlign: 'center',
            fontSize: '11px',
            color: '#B0A090'
          }}
        >
          {currentLang === 'te'
            ? 'ఈ పోర్టల్ అనుమతించబడిన దేవాలయ కమిటీ సభ్యుల కొరకు మాత్రమే కేటాయించబడింది.'
            : 'Access restricted to authorized temple committee administrators only.'}
        </div>
      </div>
    </div>
  );
};
