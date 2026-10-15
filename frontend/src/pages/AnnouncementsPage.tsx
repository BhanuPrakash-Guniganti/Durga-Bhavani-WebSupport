import React, { useState } from 'react';
import { Calendar, Star } from 'lucide-react';
import { sampleAnnouncements } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

export const AnnouncementsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredAnnouncements = sampleAnnouncements.filter((ann) => {
    if (filter === 'featured') return ann.featured;
    return true;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Official Notices</span>
          <h1>Committee Announcements</h1>
          <p>
            Official circulars, festival schedules, volunteer registrations, and community notices issued by the
            Durga Bhavani Seva Samiti organizing committee.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Notice Board Entries" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Notices ({sampleAnnouncements.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Featured Circulars
          </button>
        </div>

        {/* Announcements List */}
        {filteredAnnouncements.length === 0 ? (
          <EmptyState
            title="No notices found"
            description="There are currently no active announcements matching your selection."
          />
        ) : (
          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {filteredAnnouncements.map((item) => (
              <article
                key={item.id}
                className="card"
                style={{
                  padding: 'var(--space-6)',
                  borderLeft: item.featured
                    ? '4px solid var(--color-saffron-primary)'
                    : '4px solid var(--color-maroon-primary)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="var(--color-maroon-primary)" />
                      <span>Published: {item.publishedAt}</span>
                    </span>

                    {item.featured && (
                      <span className="badge badge-saffron" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={12} />
                        <span>Featured Circular</span>
                      </span>
                    )}
                  </div>
                  <SampleBadge size="sm" />
                </div>

                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)' }}>
                  {item.title}
                </h2>

                <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.7, marginBottom: item.imageUrl ? 'var(--space-4)' : 0 }}>
                  {item.content}
                </p>

                {item.imageUrl && (
                  <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '220px', marginTop: 'var(--space-3)' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
