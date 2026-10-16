import React, { useState } from 'react';
import type { LocalizedString } from '../../types';
import { TranslationStatusBadge } from './TranslationStatusBadge';

interface BilingualFieldProps {
  label: string;
  value: LocalizedString;
  onChange: (newValue: LocalizedString) => void;
  as?: 'input' | 'textarea';
  rows?: number;
  placeholderEn?: string;
  placeholderTe?: string;
  required?: boolean;
  helpText?: string;
}

export const BilingualField: React.FC<BilingualFieldProps> = ({
  label,
  value,
  onChange,
  as = 'input',
  rows = 3,
  placeholderEn = 'Enter in English...',
  placeholderTe = 'తెలుగులో నమోదు చేయండి...',
  required = false,
  helpText
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'en' | 'te'>('both');

  const handleEnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      en: e.target.value,
      te: value.te || ''
    });
  };

  const handleTeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      en: value.en || '',
      te: e.target.value
    });
  };

  return (
    <div style={{ marginBottom: 'var(--space-5)', width: '100%' }}>
      {/* Field Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '6px'
        }}
      >
        <label style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TranslationStatusBadge value={value} size="sm" />

          {/* View Mode Toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--color-cream-alt)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              style={{
                background: activeTab === 'both' ? 'var(--color-maroon-primary)' : 'transparent',
                color: activeTab === 'both' ? '#FFF' : 'var(--color-text-secondary)',
                border: 'none',
                padding: '2px 8px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              style={{
                background: activeTab === 'en' ? 'var(--color-maroon-primary)' : 'transparent',
                color: activeTab === 'en' ? '#FFF' : 'var(--color-text-secondary)',
                border: 'none',
                padding: '2px 8px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('te')}
              style={{
                background: activeTab === 'te' ? 'var(--color-maroon-primary)' : 'transparent',
                color: activeTab === 'te' ? '#FFF' : 'var(--color-text-secondary)',
                border: 'none',
                padding: '2px 8px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>

      {/* Inputs Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'both' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: 'var(--space-3)'
        }}
      >
        {/* English Input */}
        {(activeTab === 'both' || activeTab === 'en') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              English (en)
            </span>
            {as === 'input' ? (
              <input
                type="text"
                value={value.en || ''}
                onChange={handleEnChange}
                placeholder={placeholderEn}
                className="search-input"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderColor: !value.en?.trim() && required ? 'var(--color-gold-border)' : undefined
                }}
              />
            ) : (
              <textarea
                rows={rows}
                value={value.en || ''}
                onChange={handleEnChange}
                placeholder={placeholderEn}
                className="search-input"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2) var(--space-3)',
                  resize: 'vertical',
                  borderColor: !value.en?.trim() && required ? 'var(--color-gold-border)' : undefined
                }}
              />
            )}
          </div>
        )}

        {/* Telugu Input */}
        {(activeTab === 'both' || activeTab === 'te') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              తెలుగు (te)
            </span>
            {as === 'input' ? (
              <input
                type="text"
                value={value.te || ''}
                onChange={handleTeChange}
                placeholder={placeholderTe}
                className="search-input"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2) var(--space-3)',
                  fontFamily: 'var(--font-telugu)',
                  lineHeight: 1.6,
                  borderColor: !value.te?.trim() && required ? 'var(--color-gold-border)' : undefined
                }}
                lang="te"
              />
            ) : (
              <textarea
                rows={rows}
                value={value.te || ''}
                onChange={handleTeChange}
                placeholder={placeholderTe}
                className="search-input"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2) var(--space-3)',
                  fontFamily: 'var(--font-telugu)',
                  lineHeight: 1.6,
                  resize: 'vertical',
                  borderColor: !value.te?.trim() && required ? 'var(--color-gold-border)' : undefined
                }}
                lang="te"
              />
            )}
          </div>
        )}
      </div>

      {helpText && (
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
          {helpText}
        </span>
      )}
    </div>
  );
};
