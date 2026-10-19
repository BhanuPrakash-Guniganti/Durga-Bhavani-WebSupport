import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import {
  sampleYears,
  sampleAlbums,
  sampleEvents,
  sampleAnnouncements,
  sampleHistoryMilestones
} from '../data/sampleData';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage, getLocalized } from '../i18n';

type SearchCategory = 'all' | 'years' | 'albums' | 'events' | 'announcements' | 'history';

interface SearchResultItem {
  id: string;
  category: 'Year' | 'Album' | 'Event' | 'Announcement' | 'History';
  titleEn: string;
  titleTe: string;
  descEn: string;
  descTe: string;
  link: string;
  badgeEn: string;
  badgeTe: string;
}

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const { t } = useTranslation();
  const { currentLang } = useAppLanguage();

  const allRecords = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // Years
    sampleYears.forEach((y) => {
      const titleEn = getLocalized(y.title, 'en');
      const titleTe = getLocalized(y.title, 'te');
      const descEn = getLocalized(y.description, 'en');
      const descTe = getLocalized(y.description, 'te');
      list.push({
        id: `yr-${y.year}`,
        category: 'Year',
        titleEn,
        titleTe,
        descEn,
        descTe,
        link: `/years/${y.year}`,
        badgeEn: `Year ${y.year}`,
        badgeTe: `${y.year} సంవత్సరం`
      });
    });

    // Albums
    sampleAlbums.forEach((a) => {
      const titleEn = getLocalized(a.title, 'en');
      const titleTe = getLocalized(a.title, 'te');
      const descEn = getLocalized(a.description, 'en');
      const descTe = getLocalized(a.description, 'te');
      list.push({
        id: `alb-${a.id}`,
        category: 'Album',
        titleEn,
        titleTe,
        descEn,
        descTe,
        link: `/albums/${a.slug}`,
        badgeEn: `Album · ${a.year}`,
        badgeTe: `ఆల్బమ్ · ${a.year}`
      });
    });

    // Events
    sampleEvents.forEach((e) => {
      const titleEn = getLocalized(e.title, 'en');
      const titleTe = getLocalized(e.title, 'te');
      const descEn = `${e.startDate} · ${getLocalized(e.location, 'en')} - ${getLocalized(e.description, 'en')}`;
      const descTe = `${e.startDate} · ${getLocalized(e.location, 'te')} - ${getLocalized(e.description, 'te')}`;
      const isUpcoming = e.status === 'upcoming';
      list.push({
        id: `evt-${e.id}`,
        category: 'Event',
        titleEn,
        titleTe,
        descEn,
        descTe,
        link: e.year ? `/years/${e.year}` : '/years',
        badgeEn: `Event · ${isUpcoming ? 'Upcoming' : 'Concluded'}`,
        badgeTe: `కార్యక్రమం · ${isUpcoming ? 'రాబోయేది' : 'పూర్తయినది'}`
      });
    });

    // Announcements
    sampleAnnouncements.forEach((ann) => {
      const titleEn = getLocalized(ann.title, 'en');
      const titleTe = getLocalized(ann.title, 'te');
      const descEn = getLocalized(ann.content, 'en');
      const descTe = getLocalized(ann.content, 'te');
      list.push({
        id: `ann-${ann.id}`,
        category: 'Announcement',
        titleEn,
        titleTe,
        descEn,
        descTe,
        link: '/',
        badgeEn: 'Announcement',
        badgeTe: 'ప్రకటన'
      });
    });

    // History
    sampleHistoryMilestones.forEach((m) => {
      const titleEn = getLocalized(m.title, 'en');
      const titleTe = getLocalized(m.title, 'te');
      const descEn = getLocalized(m.description, 'en');
      const descTe = getLocalized(m.description, 'te');
      const yearEn = getLocalized(m.yearOrDate, 'en');
      const yearTe = getLocalized(m.yearOrDate, 'te');
      list.push({
        id: `hist-${m.id}`,
        category: 'History',
        titleEn: titleEn.includes(yearEn) ? titleEn : `${titleEn} (${yearEn})`,
        titleTe: titleTe.includes(yearTe) ? titleTe : `${titleTe} (${yearTe})`,
        descEn,
        descTe,
        link: '/history',
        badgeEn: 'Milestone',
        badgeTe: 'మైలురాయి'
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    return allRecords.filter((item) => {
      // Category filter
      if (category !== 'all') {
        const catLower = item.category.toLowerCase();
        if (category === 'years' && catLower !== 'year') return false;
        if (category === 'albums' && catLower !== 'album') return false;
        if (category === 'events' && catLower !== 'event') return false;
        if (category === 'announcements' && catLower !== 'announcement') return false;
        if (category === 'history' && catLower !== 'history') return false;
      }

      // Bilingual keyword match
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      const matchEn =
        item.titleEn.toLowerCase().includes(q) ||
        item.descEn.toLowerCase().includes(q);
      const matchTe =
        item.titleTe.toLowerCase().includes(q) ||
        item.descTe.toLowerCase().includes(q);

      return matchEn || matchTe;
    });
  }, [allRecords, category, query]);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">{t('search.sub')}</span>
          <h1>{t('search.title')}</h1>
          <p>{t('search.desc')}</p>
        </div>

        {/* Search Bar Input */}
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" size={20} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="search-input"
            aria-label={t('search.title')}
          />
        </div>

        {/* Category Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            {t('search.all')} ({results.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'years' ? 'active' : ''}`}
            onClick={() => setCategory('years')}
          >
            {t('search.years')}
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'albums' ? 'active' : ''}`}
            onClick={() => setCategory('albums')}
          >
            {t('search.albums')}
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'events' ? 'active' : ''}`}
            onClick={() => setCategory('events')}
          >
            {t('search.events')}
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'announcements' ? 'active' : ''}`}
            onClick={() => setCategory('announcements')}
          >
            {t('search.announcements')}
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'history' ? 'active' : ''}`}
            onClick={() => setCategory('history')}
          >
            {t('search.history')}
          </button>
        </div>

        {/* Results List */}
        {results.length === 0 ? (
          <EmptyState
            title={t('search.noResults')}
            description={t('search.noResultsDesc')}
          />
        ) : (
          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {results.map((item) => {
              const displayTitle = currentLang === 'te' ? item.titleTe : item.titleEn;
              const displayDesc = currentLang === 'te' ? item.descTe : item.descEn;
              const displayBadge = currentLang === 'te' ? item.badgeTe : item.badgeEn;

              return (
                <div key={item.id} className="card card-hover" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span className="badge badge-gold" style={{ fontSize: 'var(--font-size-xs)' }}>
                      {displayBadge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                    <Link to={item.link} style={{ color: 'var(--color-maroon-dark)' }}>
                      {displayTitle}
                    </Link>
                  </h3>

                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                    {displayDesc.length > 180 ? `${displayDesc.slice(0, 180)}...` : displayDesc}
                  </p>

                  <div>
                    <Link to={item.link} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span>{currentLang === 'te' ? 'వివరాలు చూడండి' : 'Open Record'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

