import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import {
  sampleYears,
  sampleAlbums,
  sampleEvents,
  sampleAnnouncements,
  sampleHistoryMilestones
} from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

type SearchCategory = 'all' | 'years' | 'albums' | 'events' | 'announcements' | 'history';

interface SearchResult {
  id: string;
  category: 'Year' | 'Album' | 'Event' | 'Announcement' | 'History';
  title: string;
  description: string;
  link: string;
  badge: string;
}

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');

  const allRecords = useMemo<SearchResult[]>(() => {
    const list: SearchResult[] = [];

    // Years
    sampleYears.forEach((y) => {
      list.push({
        id: `yr-${y.year}`,
        category: 'Year',
        title: y.title,
        description: y.description,
        link: `/years/${y.year}`,
        badge: `Year ${y.year}`
      });
    });

    // Albums
    sampleAlbums.forEach((a) => {
      list.push({
        id: `alb-${a.id}`,
        category: 'Album',
        title: a.title,
        description: a.description,
        link: `/albums/${a.slug}`,
        badge: `Album · ${a.year}`
      });
    });

    // Events
    sampleEvents.forEach((e) => {
      list.push({
        id: `evt-${e.id}`,
        category: 'Event',
        title: e.title,
        description: `${e.startDate} · ${e.location} - ${e.description}`,
        link: '/events',
        badge: `Event · ${e.status}`
      });
    });

    // Announcements
    sampleAnnouncements.forEach((ann) => {
      list.push({
        id: `ann-${ann.id}`,
        category: 'Announcement',
        title: ann.title,
        description: ann.content,
        link: '/announcements',
        badge: 'Announcement'
      });
    });

    // History
    sampleHistoryMilestones.forEach((m) => {
      list.push({
        id: `hist-${m.id}`,
        category: 'History',
        title: `${m.title} (${m.yearOrDate})`,
        description: m.description,
        link: '/history',
        badge: 'Milestone'
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    return allRecords.filter((item) => {
      // Category match
      if (category !== 'all') {
        const catLower = item.category.toLowerCase();
        if (category === 'years' && catLower !== 'year') return false;
        if (category === 'albums' && catLower !== 'album') return false;
        if (category === 'events' && catLower !== 'event') return false;
        if (category === 'announcements' && catLower !== 'announcement') return false;
        if (category === 'history' && catLower !== 'history') return false;
      }

      // Keyword match
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });
  }, [allRecords, category, query]);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Unified Portal Search</span>
          <h1>Search Temple Archives</h1>
          <p>
            Search across celebration years, photo albums, upcoming & past events, committee notices, and
            historical milestones.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Search Index" />
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" size={20} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords (e.g., Shobha Yatra, 2024, Chandi Homam, Annadanam)..."
            className="search-input"
            aria-label="Search temple records"
          />
        </div>

        {/* Category Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Results ({results.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'years' ? 'active' : ''}`}
            onClick={() => setCategory('years')}
          >
            Years
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'albums' ? 'active' : ''}`}
            onClick={() => setCategory('albums')}
          >
            Albums
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'events' ? 'active' : ''}`}
            onClick={() => setCategory('events')}
          >
            Events
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'announcements' ? 'active' : ''}`}
            onClick={() => setCategory('announcements')}
          >
            Notices
          </button>
          <button
            type="button"
            className={`filter-tab ${category === 'history' ? 'active' : ''}`}
            onClick={() => setCategory('history')}
          >
            History
          </button>
        </div>

        {/* Results List */}
        {results.length === 0 ? (
          <EmptyState
            title="No matching records found"
            description={`No results found for "${query}". Please try different keywords or choose a different category.`}
          />
        ) : (
          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {results.map((item) => (
              <div key={item.id} className="card card-hover" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-gold" style={{ fontSize: 'var(--font-size-xs)' }}>
                    {item.badge}
                  </span>
                  <SampleBadge size="sm" />
                </div>

                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                  <Link to={item.link} style={{ color: 'var(--color-maroon-dark)' }}>
                    {item.title}
                  </Link>
                </h3>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                  {item.description.length > 180 ? `${item.description.slice(0, 180)}...` : item.description}
                </p>

                <div>
                  <Link to={item.link} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>Open Record</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
