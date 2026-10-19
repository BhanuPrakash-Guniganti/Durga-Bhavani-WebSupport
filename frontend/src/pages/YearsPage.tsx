import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { sampleYears } from '../data/sampleData';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage } from '../i18n';

export const YearsPage: React.FC = () => {
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const { t, getLocalized, isTelugu } = useAppLanguage();

  const filteredYears = sampleYears.filter((yr) => {
    if (selectedYearFilter === 'all') return true;
    return yr.year.toString() === selectedYearFilter;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">{t('years.sub')}</span>
          <h1>{t('years.title')}</h1>
          <p>{t('years.desc')}</p>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('all')}
          >
            {t('years.allYears', { count: sampleYears.length })}
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2026' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2026')}
          >
            {t('years.yearTab2026')}
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2025' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2025')}
          >
            {t('years.yearTab2025')}
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2024' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2024')}
          >
            {t('years.yearTab2024')}
          </button>
        </div>

        {/* Years Grid */}
        {filteredYears.length === 0 ? (
          <EmptyState
            title={t('years.noYearsFound')}
            description={t('years.noYearsDesc')}
            actionLabel={t('years.showAllYears')}
            actionLink="/years"
          />
        ) : (
          <div className="grid-3">
            {filteredYears.map((yearItem) => {
              const yearTitle = getLocalized(yearItem.title);
              const yearDesc = getLocalized(yearItem.description);

              return (
                <article key={yearItem.year} className="card card-cultural-top">
                  <div className="card-media">
                    <img
                      src={yearItem.coverImage}
                      alt={yearTitle}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.src.includes('cover-devi-alankaranalu')) {
                          target.src = '/images/covers/cover-devi-alankaranalu.webp';
                        }
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <span className="badge badge-maroon" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
                        {t('years.yearCardBadge', { year: yearItem.year })}
                      </span>
                      <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ImageIcon size={12} />
                        <span>{t('years.albumsCount', { count: yearItem.albumCount })}</span>
                      </span>
                    </div>

                    <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
                      {yearTitle}
                    </h2>

                    <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                      {yearDesc}
                    </p>

                    {yearItem.startDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                        <Calendar size={13} color="var(--color-maroon-primary)" />
                        <span>
                          {yearItem.dateRangeFormatted
                            ? `${isTelugu ? 'ఉత్సవ తేదీలు:' : 'Festival Dates:'} ${getLocalized(yearItem.dateRangeFormatted)}`
                            : t('years.festivalDates', { start: yearItem.startDate, end: yearItem.endDate })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-footer" style={{ justifyContent: 'flex-end' }}>
                    <Link to={`/years/${yearItem.year}`} className="btn btn-primary btn-sm">
                      <span>{t('years.viewYearArchive')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
