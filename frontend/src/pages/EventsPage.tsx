import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { sampleEvents } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage, getLocalized } from '../i18n';

export const EventsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const { t } = useTranslation();
  const { currentLang } = useAppLanguage();

  const filteredEvents = sampleEvents.filter((evt) => {
    if (statusFilter === 'all') return true;
    return evt.status === statusFilter;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">{t('events.sub')}</span>
          <h1>{t('events.title')}</h1>
          <p>{t('events.desc')}</p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label={t('events.badge')} />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            {t('events.all', { count: sampleEvents.length })}
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusFilter('upcoming')}
          >
            {t('events.upcoming')}
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'past' ? 'active' : ''}`}
            onClick={() => setStatusFilter('past')}
          >
            {t('events.past')}
          </button>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            title={t('events.noEvents')}
            description={t('events.noEventsDesc')}
          />
        ) : (
          <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
            {filteredEvents.map((evt) => {
              const evtTitle = getLocalized(evt.title, currentLang);
              const evtDesc = getLocalized(evt.description, currentLang);
              const evtLoc = getLocalized(evt.location, currentLang);
              const isUpcoming = evt.status === 'upcoming';

              return (
                <article key={evt.id} className="card card-cultural-top">
                  {evt.posterUrl && (
                    <div className="card-media" style={{ maxHeight: '200px' }}>
                      <img src={evt.posterUrl} alt={evtTitle} loading="lazy" />
                    </div>
                  )}
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <span className={`badge ${isUpcoming ? 'badge-gold' : 'badge-maroon'}`}>
                        {isUpcoming ? t('events.statusUpcoming') : t('events.statusPast')}
                      </span>
                      <SampleBadge size="sm" />
                    </div>

                    <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)' }}>
                      {evtTitle}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', background: 'var(--color-cream-alt)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="var(--color-maroon-primary)" />
                        <span>
                          <strong>{t('events.date')}:</strong> {evt.startDate} {evt.endDate ? `${currentLang === 'te' ? 'నుండి' : 'to'} ${evt.endDate}` : ''}
                        </span>
                      </div>

                      {evt.time && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={16} color="var(--color-maroon-primary)" />
                          <span><strong>{t('events.time')}:</strong> {getLocalized(evt.time, currentLang)}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={16} color="var(--color-maroon-primary)" />
                        <span><strong>{t('events.location')}:</strong> {evtLoc}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>
                      {evtDesc}
                    </p>
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

