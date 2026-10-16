import React, { useState } from 'react';
import { FileCheck, Search, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppLanguage } from '../../i18n';

export const AdminAuditLogsPage: React.FC = () => {
  const { auditLogs } = useData();
  const { currentLang } = useAppLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesSearch =
      searchTerm === '' ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resourceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.resourceTitle && log.resourceTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesAction && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span className="sub-heading">
          {currentLang === 'te' ? 'భద్రత మరియు ఆడిట్ లాగ్స్' : 'Security & Governance'}
        </span>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCheck color="var(--color-maroon-primary)" />
          <span>{currentLang === 'te' ? 'నిర్వాహక ఆడిట్ లాగ్స్' : 'Administrative Audit Trail'}</span>
        </h1>
        <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          {currentLang === 'te'
            ? 'అడ్మినిస్ట్రేటర్లు చేసిన మార్పులు, ప్రచురణలు మరియు తొలగింపుల పూర్తి రికార్డు. ఇది వ్యవస్థ పారదర్శకతను కాపాడుతుంది.'
            : 'Immutable log of administrative modifications, creations, deletions, and photo uploads for audit compliance.'}
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div
        className="card"
        style={{
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by actor, resource, or details..."
            style={{
              width: '100%',
              padding: '6px 10px',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              background: '#FFF'
            }}
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="publish">Publish</option>
            <option value="unpublish">Unpublish</option>
            <option value="upload">Upload</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: '180px' }}>Timestamp</th>
              <th style={{ padding: '12px 14px', width: '180px' }}>Administrator</th>
              <th style={{ padding: '12px 14px', width: '100px' }}>Action</th>
              <th style={{ padding: '12px 14px', width: '150px' }}>Resource Type</th>
              <th style={{ padding: '12px 14px' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="var(--color-maroon-primary)" />
                    <span>{log.actorName}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Role: {log.actorRole}</div>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span
                    className="badge"
                    style={{
                      background:
                        log.action === 'create'
                          ? 'var(--color-success-bg)'
                          : log.action === 'delete'
                          ? 'var(--color-danger-bg)'
                          : 'var(--color-gold-subtle)',
                      color:
                        log.action === 'create'
                          ? 'var(--color-success)'
                          : log.action === 'delete'
                          ? 'var(--color-danger)'
                          : 'var(--color-gold-dark)',
                      fontSize: '11px'
                    }}
                  >
                    {log.action.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 500 }}>
                  {log.resourceType}
                  {log.resourceTitle && (
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      {log.resourceTitle}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                  {log.details || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
