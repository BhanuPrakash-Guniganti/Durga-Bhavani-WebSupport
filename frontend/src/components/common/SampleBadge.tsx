import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAppLanguage } from '../../i18n';

interface SampleBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  label,
  size = 'md'
}) => {
  const { t } = useAppLanguage();
  const displayLabel = label || t('common.sampleBadgeDefault');

  return (
    <span
      className={`badge badge-sample ${size === 'sm' ? 'btn-sm' : ''}`}
      title={displayLabel}
    >
      <AlertCircle size={size === 'sm' ? 12 : 14} />
      <span>{displayLabel}</span>
    </span>
  );
};
