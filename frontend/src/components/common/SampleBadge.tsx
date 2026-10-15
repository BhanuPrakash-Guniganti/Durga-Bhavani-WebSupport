import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SampleBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  label = 'Sample Demonstration Record',
  size = 'md'
}) => {
  return (
    <span
      className={`badge badge-sample ${size === 'sm' ? 'btn-sm' : ''}`}
      title="This record contains temporary demonstration information and will be replaced by verified temple committee records."
    >
      <AlertCircle size={size === 'sm' ? 12 : 14} />
      <span>{label}</span>
    </span>
  );
};
