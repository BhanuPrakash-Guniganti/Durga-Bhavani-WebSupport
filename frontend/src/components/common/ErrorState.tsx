import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to display content',
  message = 'An unexpected issue occurred while retrieving the requested records. Please check your connection or try again.',
  onRetry
}) => {
  return (
    <div className="state-container" role="alert">
      <div className="state-icon-wrapper" style={{ color: 'var(--color-danger)' }} aria-hidden="true">
        <AlertTriangle size={32} />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-primary btn-sm">
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
