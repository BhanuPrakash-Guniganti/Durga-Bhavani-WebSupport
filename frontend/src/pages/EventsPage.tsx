import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { sampleEvents } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';

export const EventsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = sampleEvents.filter((evt) => {
    if (statusFilter === 'all') return true;
    return evt.status === statusFilter;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="sub-heading">Devotional Calendar</span>
          <h1>Temple Events & Celebrations</h1>
          <p>
            Stay informed about annual Navaratri festival schedules, special Pournami poojas, community
            meetings, and cultural processions in Dodlapahad.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Event Schedule - For Layout Demonstration" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Events ({sampleEvents.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusFilter('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === 'past' ? 'active' : ''}`}
            onClick={() => setStatusFilter('past')}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <EmptyState
            title="No events matching criteria"
            description="There are currently no events listed under this filter."
          />
        ) : (
          <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
            {filteredEvents.map((evt) => (
              <article key={evt.id} className="card card-cultural-top">
                {evt.posterUrl && (
                  <div className="card-media" style={{ maxHeight: '200px' }}>
                    <img src={evt.posterUrl} alt={evt.title} loading="lazy" />
                  </div>
                )}
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span className={`badge ${evt.status === 'upcoming' ? 'badge-gold' : 'badge-maroon'}`}>
                      {evt.status === 'upcoming' ? 'Upcoming Event' : 'Concluded'}
                    </span>
                    <SampleBadge size="sm" />
                  </div>

                  <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)' }}>
                    {evt.title}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', background: 'var(--color-cream-alt)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} color="var(--color-maroon-primary)" />
                      <span>
                        <strong>Date:</strong> {evt.startDate} {evt.endDate ? `to ${evt.endDate}` : ''}
                      </span>
                    </div>

                    {evt.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} color="var(--color-maroon-primary)" />
                        <span><strong>Time:</strong> {evt.time}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} color="var(--color-maroon-primary)" />
                      <span><strong>Location:</strong> {evt.location}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>
                    {evt.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
