import React from 'react';
import { Archive, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are currently no published entries matching this view or filter criteria.',
  actionLabel,
  actionLink,
  icon
}) => {
  return (
    <div className="state-container">
      <div className="state-icon-wrapper" aria-hidden="true">
        {icon || <Archive size={32} />}
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{description}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-sm">
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};
