import React from 'react';
import { useAppLanguage } from '../../i18n';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showIcon = true
}) => {
  const { currentLang, setLanguage } = useAppLanguage();

  return (
    <div
      className={`lang-switcher ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {showIcon && (
        <span
          className="lang-globe-icon"
          aria-hidden="true"
        >
          <Globe size={13} />
        </span>
      )}
      <button
        type="button"
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={currentLang === 'en'}
        title="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        className={`lang-btn ${currentLang === 'te' ? 'active' : ''}`}
        onClick={() => setLanguage('te')}
        aria-pressed={currentLang === 'te'}
        title="తెలుగు భాషకు మారండి"
      >
        తెలుగు
      </button>
    </div>
  );
};
