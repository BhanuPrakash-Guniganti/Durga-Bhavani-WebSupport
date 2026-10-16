import React from 'react';
import type { LocalizedString } from '../../types';

interface TranslationStatusBadgeProps {
  value: LocalizedString | string;
  size?: 'sm' | 'md';
}

export const TranslationStatusBadge: React.FC<TranslationStatusBadgeProps> = ({
  value,
  size = 'md'
}) => {
  const isObject = typeof value === 'object' && value !== null;
  const en = isObject ? (value.en || '').trim() : (value || '').trim();
  const te = isObject ? (value.te || '').trim() : '';

  const hasEn = en.length > 0;
  const hasTe = te.length > 0;

  const fontSize = size === 'sm' ? '0.75rem' : '0.8125rem';
  const padding = size === 'sm' ? '2px 8px' : '4px 10px';

  if (hasEn && hasTe) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding,
          fontSize,
          fontWeight: 600,
          background: '#E8F5E9',
          color: '#2E7D32',
          border: '1px solid #A5D6A7',
          borderRadius: 'var(--radius-full)'
        }}
        title="Complete: Translated in both English and Telugu"
      >
        <span>✓</span>
        <span>EN + TE Complete</span>
      </span>
    );
  }

  if (hasEn && !hasTe) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding,
          fontSize,
          fontWeight: 600,
          background: '#FFF8E1',
          color: '#B78103',
          border: '1px solid #FFE082',
          borderRadius: 'var(--radius-full)'
        }}
        title="Telugu translation missing"
      >
        <span>⚠️</span>
        <span>Telugu Missing</span>
      </span>
    );
  }

  if (!hasEn && hasTe) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding,
          fontSize,
          fontWeight: 600,
          background: '#E1F5FE',
          color: '#0277BD',
          border: '1px solid #81D4FA',
          borderRadius: 'var(--radius-full)'
        }}
        title="English translation missing"
      >
        <span>⚠️</span>
        <span>English Missing</span>
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding,
        fontSize,
        fontWeight: 600,
        background: '#FFEBEE',
        color: '#C62828',
        border: '1px solid #EF9A9A',
        borderRadius: 'var(--radius-full)'
      }}
      title="Empty: Missing in both languages"
    >
      <span>✕</span>
      <span>Untranslated</span>
    </span>
  );
};
