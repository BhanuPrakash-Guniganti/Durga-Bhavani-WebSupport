import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { sampleYears } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

export const YearsPage: React.FC = () => {
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');

  const filteredYears = sampleYears.filter((yr) => {
    if (selectedYearFilter === 'all') return true;
    return yr.year.toString() === selectedYearFilter;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Annual Archives</span>
          <h1>Celebration Years Archive</h1>
          <p>
            Browse through Dodlapahad's annual Sri Durga Bhavani Utsav celebrations. Access festival albums,
            pooja reports, video highlights, and community memories starting from our inaugural year in 2024.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Celebration Archives (2024–2026)" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('all')}
          >
            All Years ({sampleYears.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2026' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2026')}
          >
            2026 (Third Year)
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2025' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2025')}
          >
            2025 (Second Year)
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedYearFilter === '2024' ? 'active' : ''}`}
            onClick={() => setSelectedYearFilter('2024')}
          >
            2024 (First Year)
          </button>
        </div>

        {/* Years Grid */}
        {filteredYears.length === 0 ? (
          <EmptyState
            title="No celebration years found"
            description="There are currently no records for this filter."
            actionLabel="Show All Years"
            actionLink="/years"
          />
        ) : (
          <div className="grid-3">
            {filteredYears.map((yearItem) => (
              <article key={yearItem.year} className="card card-cultural-top">
                <div className="card-media">
                  <img
                    src={yearItem.coverImage}
                    alt={yearItem.title}
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span className="badge badge-maroon" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
                      Year {yearItem.year}
                    </span>
                    <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ImageIcon size={12} />
                      <span>{yearItem.albumCount} Albums</span>
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
                    {yearItem.title}
                  </h2>

                  <p style={{ fontSize: 'var(--font-size-sm)', flex: 1 }}>
                    {yearItem.description}
                  </p>

                  {yearItem.startDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                      <Calendar size={13} color="var(--color-maroon-primary)" />
                      <span>Festival Dates: {yearItem.startDate} to {yearItem.endDate}</span>
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <SampleBadge size="sm" />
                  <Link to={`/years/${yearItem.year}`} className="btn btn-primary btn-sm">
                    <span>View Year Archive</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
