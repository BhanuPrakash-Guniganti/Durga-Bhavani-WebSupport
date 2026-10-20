import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Flower2,
  Trophy,
  HeartHandshake,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppLanguage } from '../../i18n';
import { formatRupees } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { albums, avatars, auctions, donors, auditLogs } = useData();
  const { currentLang, getLocalized } = useAppLanguage();

  const albums2025 = (albums || []).filter((a) => a && a.year === 2025);
  const avatars2025 = (avatars || []).filter((a) => a && a.year === 2025);
  const confirmedAuctions = (auctions || []).filter((a) => a && a.status === 'published' && a.isComplete);
  const incompleteAuctions = (auctions || []).filter((a) => a && (!a.isComplete || a.status === 'draft'));
  const totalAuctionRaised = confirmedAuctions.reduce(
    (acc, curr) => acc + (curr.winningAmount || 0),
    0
  );

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="sub-heading">
              {currentLang === 'te' ? 'నిర్వహణ కేంద్రం' : 'Administration & Control'}
            </span>
            <h1 style={{ margin: 0 }}>
              {currentLang === 'te' ? '2025 ఉత్సవాల డాష్‌బోర్డ్' : '2025 Celebrations Dashboard'}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/years/2025" target="_blank" className="btn btn-secondary btn-sm">
              {currentLang === 'te' ? 'పబ్లిక్ 2025 సైట్ ప్రివ్యూ ↗' : 'Preview Public 2025 Site ↗'}
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-8)' }}>
        {/* Metric 1: Albums */}
        <div className="card" style={{ padding: 'var(--space-5)', borderTop: '4px solid var(--color-maroon-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? '2025 ఆల్బమ్‌లు' : '2025 Albums'}
            </span>
            <FolderKanban size={20} color="var(--color-maroon-primary)" />
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {albums2025.length}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {albums2025.filter((a) => a.status === 'published').length} {currentLang === 'te' ? 'ప్రచురించబడ్డాయి' : 'Published'}
          </div>
        </div>

        {/* Metric 2: Avatars */}
        <div className="card" style={{ padding: 'var(--space-5)', borderTop: '4px solid var(--color-gold-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'అమ్మవారి అలంకరణలు' : 'Daily Avatars'}
            </span>
            <Flower2 size={20} color="var(--color-gold-dark)" />
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {avatars2025.length}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            10 {currentLang === 'te' ? 'అవతారాలు నమోదు అయ్యాయి' : 'Avatars Configured (Day 1 - 10)'}
          </div>
        </div>

        {/* Metric 3: Confirmed Auctions */}
        <div className="card" style={{ padding: 'var(--space-5)', borderTop: '4px solid var(--color-success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'ధృవీకరించిన వేలం పాటలు' : 'Confirmed Auctions'}
            </span>
            <Trophy size={20} color="var(--color-success)" />
          </div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, color: 'var(--color-success)' }}>
            {confirmedAuctions.length}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {incompleteAuctions.length} {currentLang === 'te' ? 'వివరాలు పెండింగ్‌లో ఉన్నాయి' : 'Draft / Awaiting Data'}
          </div>
        </div>

        {/* Metric 4: Total Auction Amount */}
        <div className="card" style={{ padding: 'var(--space-5)', borderTop: '4px solid var(--color-saffron-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'మొత్తం వేలం పాటల సమర్పణ' : 'Auction Total Raised'}
            </span>
            <TrendingUp size={20} color="var(--color-saffron-primary)" />
          </div>
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {formatRupees(totalAuctionRaised)}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            11 {currentLang === 'te' ? 'విజేతల మొత్తం' : 'Items Sum Total'}
          </div>
        </div>
      </div>

      {/* Alert Card: Drafts and Missing Required Information */}
      {incompleteAuctions.length > 0 && (
        <div
          className="card"
          style={{
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-8)',
            borderLeft: '4px solid var(--color-warning)',
            background: 'var(--color-warning-bg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertTriangle size={24} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: 'var(--font-size-base)', color: '#8A3B00' }}>
                {currentLang === 'te'
                  ? 'డ్రాఫ్ట్ మరియు అసంపూర్ణ వేలం రికార్డులు (పబ్లిక్ సైట్‌లో కనిపించవు)'
                  : 'Draft & Incomplete Auction Records (Hidden from Public Confirmed List)'}
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', color: '#5A2A00' }}>
                {currentLang === 'te'
                  ? 'క్రింది 4 విశేష వస్తువుల విజేతలు మరియు పాట మొత్తాలు ఇంకా అందలేదు. ఇవి డ్రాఫ్ట్ స్థితిలో ఉంచబడ్డాయి:'
                  : 'The winners and winning amounts for the following 4 additional items have not yet been supplied. As per policy, they remain unfilled drafts and are not shown as confirmed winners to the public:'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {incompleteAuctions.map((item) => (
                  <span
                    key={item.id}
                    className="badge"
                    style={{
                      background: '#FFF',
                      border: '1px solid var(--color-warning)',
                      color: '#8A3B00',
                      fontSize: '12px',
                      padding: '4px 10px'
                    }}
                  >
                    ⚠️ {getLocalized(item.itemName)} ({currentLang === 'te' ? 'విజేత వివరాలు కావాలి' : 'Awaiting Winner & Amount'})
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '12px' }}>
                <Link to="/admin/auctions" className="btn btn-secondary btn-sm" style={{ background: '#FFF' }}>
                  {currentLang === 'te' ? 'వేలం పాట రికార్డులను సవరించండి →' : 'Manage Auction Records →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Shortcuts Grid */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-8)' }}>
        {/* Card 1: Devi Alankaranalu */}
        <div className="card card-hover" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-maroon-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-maroon-primary)'
              }}
            >
              <Flower2 size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>
                {currentLang === 'te' ? 'అమ్మవారి అలంకరణలు' : 'Devi Alankaranalu'}
              </h3>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                10 {currentLang === 'te' ? 'దివ్య అవతారాలు' : 'Daily Avatars'}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            {currentLang === 'te'
              ? 'పది రోజుల అమ్మవారి అవతారాల పేర్లు, క్రమం, మరియు బహుళ ఛాయాచిత్రాలను నిర్వహించండి.'
              : 'Manage the 10 daily avatars, bilingual names, editable day sequence, and upload multiple photographs.'}
          </p>
          <Link to="/admin/avatars" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            <span>{currentLang === 'te' ? 'అవతారాల నిర్వహణ' : 'Manage Avatars'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Card 2: Auctions */}
        <div className="card card-hover" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-gold-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-dark)'
              }}
            >
              <Trophy size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>
                {currentLang === 'te' ? 'వేలం పాటల జాబితా' : 'Auction List'}
              </h3>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {currentLang === 'te' ? 'వేలం పాటల రికార్డులు & విజేతలు' : 'Auction Records & Winners'}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            {currentLang === 'te'
              ? '2024, 2025 పవిత్ర చీరల వేలం, విశేష వస్తువుల వేలం విజేతలు, తండ్రి పేర్లు, పాట మొత్తాలను సమగ్రంగా నిర్వహించండి.'
              : 'View, filter, and manage 2024 & 2025 sacred saree and festival item auctions, winner details, and amounts.'}
          </p>
          <Link to="/admin/auctions" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            <span>{currentLang === 'te' ? 'వేలం పాటల జాబితా తెరవండి' : 'Open Auction List'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Card 3: Donors */}
        <div className="card card-hover" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(230, 81, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-saffron-primary)'
              }}
            >
              <HeartHandshake size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>
                {currentLang === 'te' ? 'దాతలు & స్పాన్సర్లు' : 'Donors & Sponsors'}
              </h3>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {donors.length} {currentLang === 'te' ? 'నమోదైన దాతలు' : 'Records Configured'}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            {currentLang === 'te'
              ? '2025 ఉత్సవాలకు దాతలు మరియు స్పాన్సర్ల వివరాలను ప్రత్యేకంగా నమోదు చేయండి.'
              : 'Manage sponsors and donors for the 2025 celebrations with bilingual names, contribution types, and logos.'}
          </p>
          <Link to="/admin/donors" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            <span>{currentLang === 'te' ? 'దాతల నిర్వహణ' : 'Manage Donors'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Audit Log Activity Table */}
      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCheck size={20} color="var(--color-maroon-primary)" />
            <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>
              {currentLang === 'te' ? 'ఇటీవలి నిర్వాహక చర్యలు (ఆడిట్ లాగ్)' : 'Recent Administrative Activity (Audit Trail)'}
            </h2>
          </div>
          <Link to="/admin/audit-logs" className="btn btn-secondary btn-sm">
            {currentLang === 'te' ? 'అన్ని లాగ్స్ చూడండి' : 'View Full Audit Trail'}
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px' }}>Timestamp</th>
                <th style={{ padding: '10px 14px' }}>Actor</th>
                <th style={{ padding: '10px 14px' }}>Action</th>
                <th style={{ padding: '10px 14px' }}>Resource</th>
                <th style={{ padding: '10px 14px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>
                    {log.actorName} <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>({log.actorRole})</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
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
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>
                    {log.resourceType} {log.resourceTitle ? `(${log.resourceTitle})` : ''}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
