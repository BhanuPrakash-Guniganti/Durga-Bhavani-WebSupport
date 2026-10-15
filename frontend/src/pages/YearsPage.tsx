import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { sampleYears } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

export const YearsPage: React.FC = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  const filteredYears = sampleYears.filter((yr) => {
    if (selectedDecade === 'all') return true;
    if (selectedDecade === '2020s') return yr.year >= 2020;
    if (selectedDecade === '2010s') return yr.year >= 2010 && yr.year < 2020;
    return true;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Annual Archives</span>
          <h1>Celebration Years Archive</h1>
          <p>
            Browse through Dodlapahad's annual Navaratri celebrations year by year. Access festival albums,
            pooja reports, video highlights, and community memories.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Demonstration Years" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${selectedDecade === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedDecade('all')}
          >
            All Years ({sampleYears.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedDecade === '2020s' ? 'active' : ''}`}
            onClick={() => setSelectedDecade('2020s')}
          >
            2020s (Current Era)
          </button>
          <button
            type="button"
            className={`filter-tab ${selectedDecade === '2010s' ? 'active' : ''}`}
            onClick={() => setSelectedDecade('2010s')}
          >
            2010s Archive
          </button>
        </div>

        {/* Years Grid */}
        {filteredYears.length === 0 ? (
          <EmptyState
            title="No celebration years found"
            description="There are currently no records for this decade filter."
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
