import React, { Component, type ReactNode } from 'react';
import { RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('[ErrorBoundary] Caught unexpected component error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoHome = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    const { error, showDetails, errorInfo } = this.state;
    const isTelugu = typeof document !== 'undefined' && document.documentElement.lang === 'te';

    return (
      <div
        role="alert"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: 'var(--space-8, 2rem) var(--space-4, 1rem)',
          width: '100%'
        }}
      >
        <div
          className="card card-cultural-top"
          style={{
            maxWidth: '650px',
            width: '100%',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0,0,0,0.1))',
            borderRadius: 'var(--radius-lg, 12px)',
            background: 'var(--color-surface, #FFFFFF)',
            border: '1px solid var(--color-gold-pale, #F5E6C8)'
          }}
        >
          {/* Spiritual Diya & Warning Icon Badge */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.7) 100%)',
              border: '2px solid var(--color-gold-primary, #D4AF37)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4, 1rem) auto',
              fontSize: '1.75rem'
            }}
          >
            🪔
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
              color: 'var(--color-maroon-dark, #5A0808)',
              marginBottom: 'var(--space-2, 0.5rem)'
            }}
          >
            {isTelugu
              ? 'పేజీని ప్రదర్శించడంలో సాంకేతిక సమస్య ఎదురైంది'
              : 'A Display Issue Occurred on this Page'}
          </h2>

          <p
            style={{
              fontSize: 'var(--font-size-base, 1rem)',
              color: 'var(--color-text-muted, #5C5248)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto var(--space-6, 1.5rem) auto'
            }}
          >
            {isTelugu
              ? 'శ్రీ దుర్గాభవాని ఉత్సవ పోర్టల్ మీ సమాచారాన్ని భద్రంగా ఉంచుతుంది. దయచేసి పేజీని రీలోడ్ చేయండి లేదా హోమ్ పేజీకి తిరిగి వెళ్లండి.'
              : 'Our Sri Durga Bhavani Utsav Portal is safe. Please try refreshing this section or return to the main homepage.'}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3, 0.75rem)',
              justifyContent: 'center',
              marginBottom: 'var(--space-6, 1.5rem)'
            }}
          >
            <button
              type="button"
              onClick={this.handleReset}
              className="btn btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} />
              <span>{isTelugu ? 'మళ్లీ ప్రయత్నించండి' : 'Try Again'}</span>
            </button>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Home size={16} />
              <span>{isTelugu ? 'హోమ్ పేజీకి వెళ్లండి' : 'Go to Homepage'}</span>
            </button>
          </div>

          {/* Technical Diagnostics Toggle (for admins/debugging) */}
          {error && (
            <div style={{ marginTop: 'var(--space-4, 1rem)', textAlign: 'left' }}>
              <button
                type="button"
                onClick={this.toggleDetails}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted, #7A6F62)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  margin: '0 auto'
                }}
              >
                <span>{isTelugu ? 'సాంకేతిక వివరాలు (అడ్మినిస్ట్రేటర్)' : 'Technical Diagnostics'}</span>
                {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showDetails && (
                <div
                  style={{
                    marginTop: 'var(--space-3, 0.75rem)',
                    padding: 'var(--space-3, 0.75rem)',
                    borderRadius: '6px',
                    background: '#2B1111',
                    color: '#FFEAEA',
                    fontSize: '0.78rem',
                    fontFamily: 'monospace',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '180px'
                  }}
                >
                  <strong>{error.name}:</strong> {error.message}
                  {errorInfo?.componentStack && (
                    <div style={{ marginTop: '6px', opacity: 0.8 }}>
                      {errorInfo.componentStack.slice(0, 500)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
