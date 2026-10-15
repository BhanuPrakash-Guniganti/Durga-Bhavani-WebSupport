import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading temple records...'
}) => {
  return (
    <div className="state-container" role="status" aria-live="polite">
      <div
        className="state-icon-wrapper"
        style={{ animation: 'spinDiya 1.5s linear infinite' }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>
      <p className="state-description" style={{ fontWeight: 600, color: 'var(--color-maroon-primary)' }}>
        {message}
      </p>
    </div>
  );
};
