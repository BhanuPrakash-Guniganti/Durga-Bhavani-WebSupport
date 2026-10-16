import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  User,
  Share2,
  Check,
  Maximize2,
  Flower2,
  Trophy,
  HeartHandshake,
  Sparkles,
  X,
  LayoutGrid,
  List
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Lightbox } from '../components/common/Lightbox';
import { SampleBadge } from '../components/common/SampleBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useAppLanguage } from '../i18n';
import { formatRupees, type AvatarRecord, type AuctionItemRecord, type MediaPhoto } from '../types';

export const AlbumDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { albums, avatars, auctions, donors } = useData();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activePhotosList, setActivePhotosList] = useState<MediaPhoto[]>([]);
  const [selectedAvatarModal, setSelectedAvatarModal] = useState<AvatarRecord | null>(null);
  const [selectedAuctionModal, setSelectedAuctionModal] = useState<AuctionItemRecord | null>(null);
  const [auctionViewMode, setAuctionViewMode] = useState<'cards' | 'table'>('cards');
  const [copied, setCopied] = useState(false);
  const [auctionFilter, setAuctionFilter] = useState<'all' | 'sarees' | 'additional'>('all');
  const { t } = useTranslation();
  const { currentLang, getLocalized } = useAppLanguage();

  const album = albums.find((a) => a.slug === slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!album) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            title={t('albums.notFoundTitle')}
            description={t('albums.notFoundDesc')}
            actionLabel={t('yearDetail.backToYears')}
            actionLink="/years"
          />
        </div>
      </div>
    );
  }

  const localizedTitle = getLocalized(album.title);
  const localizedDesc = getLocalized(album.description);

  // For Devi Alankaranalu
  const sortedAvatars = [...avatars].sort((a, b) => a.sortOrder - b.sortOrder);

  // For Auction Winners
  const confirmedAuctions = auctions.filter((a) => a.status === 'published' && a.isComplete);
  const filteredConfirmedAuctions = confirmedAuctions.filter((item) => {
    if (auctionFilter === 'sarees') return !!item.avatarId;
    if (auctionFilter === 'additional') return !item.avatarId;
    return true;
  });
  const totalRaised = confirmedAuctions.reduce((acc, curr) => acc + (curr.winningAmount || 0), 0);

  // For Donors
  const publishedDonors = donors.filter((d) => d.status === 'published');

  return (
    <div className="section">
      <div className="container">
        {/* Navigation Breadcrumbs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '8px' }}>
          <Link to={`/years/${album.year}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} />
            <span>{t('albums.backToYear', { year: album.year })}</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            title={currentLang === 'te' ? 'ఆల్బమ్ లింక్ కాపీ చేయండి' : 'Copy album share link'}
          >
            {copied ? <Check size={16} color="var(--color-success)" /> : <Share2 size={16} />}
            <span>
              {copied
                ? currentLang === 'te' ? 'లింక్ కాపీ అయ్యింది!' : 'Link Copied!'
                : currentLang === 'te' ? 'షేర్ చేయండి' : 'Share Album'}
            </span>
          </button>
        </div>

        {/* Album Header Banner */}
        <div className="card card-cultural-top" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to={`/years/${album.year}`} className="badge badge-maroon" style={{ textDecoration: 'none' }}>
                <Calendar size={12} />
                <span>{t('yearDetail.festivalYear', { year: album.year })}</span>
              </Link>
              {album.albumType === 'avatars' && (
                <span className="badge badge-gold">
                  <Flower2 size={12} />
                  <span>10 {currentLang === 'te' ? 'దివ్య అవతారాలు' : 'Daily Avatars'}</span>
                </span>
              )}
              {album.albumType === 'auction' && (
                <span className="badge badge-gold">
                  <Trophy size={12} />
                  <span>{confirmedAuctions.length} {currentLang === 'te' ? 'విజేతల రికార్డులు' : 'Confirmed Items'}</span>
                </span>
              )}
              {album.albumType === 'donors' && (
                <span className="badge badge-gold">
                  <HeartHandshake size={12} />
                  <span>{currentLang === 'te' ? 'దాతృత్వ రికార్డులు' : 'Sponsors Registry'}</span>
                </span>
              )}
              {album.albumType === 'general' && (
                <span className="badge badge-gold">
                  <ImageIcon size={12} />
                  <span>{t('albums.allPhotos', { count: album.photos.length })}</span>
                </span>
              )}
            </div>
            <SampleBadge />
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            {localizedTitle}
          </h1>

          <p style={{ fontSize: 'var(--font-size-base)', maxWidth: '900px', lineHeight: 1.7, margin: 0 }}>
            {localizedDesc}
          </p>
        </div>

        {/* =========================================================================
            ALBUM 1: DEVI ALANKARANALU (AVATARS VIEW)
            ========================================================================= */}
        {album.albumType === 'avatars' && (
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="sub-heading">
                  {currentLang === 'te' ? 'దశ దిన అలంకారాలు' : 'Ten Daily Avatars'}
                </span>
                <h2 style={{ margin: 0 }}>
                  {currentLang === 'te' ? 'అమ్మవారి పది దివ్య అవతారాలు' : 'The Goddess’s Ten Daily Avatars'}
                </h2>
              </div>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {currentLang === 'te' ? '1 నుండి 10 రోజుల క్రమం' : 'Days 1 to 10 in Sequence'}
              </span>
            </div>

            {/* Grid of 10 Avatars */}
            <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
              {sortedAvatars.map((avatar) => {
                const primaryName = currentLang === 'te' ? avatar.name.te : avatar.name.en;
                const secondaryName = currentLang === 'te' ? avatar.name.en : avatar.name.te;
                const desc = getLocalized(avatar.description);

                return (
                  <article
                    key={avatar.id}
                    className="card card-gold-top card-hover"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      background: 'var(--color-surface)'
                    }}
                  >
                    {/* Media representation or empty state */}
                    <div
                      style={{
                        position: 'relative',
                        height: '220px',
                        background: 'var(--color-cream-alt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid var(--color-border-subtle)',
                        overflow: 'hidden'
                      }}
                    >
                      {avatar.photos.length > 0 ? (
                        <>
                          <img
                            src={avatar.photos[0].url}
                            alt={getLocalized(avatar.photos[0].altText) || primaryName}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setActivePhotosList(avatar.photos);
                              setActivePhotoIndex(0);
                              setLightboxOpen(true);
                            }}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-full)',
                              background: 'rgba(0,0,0,0.6)',
                              color: '#FFF',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                            title="Expand photo"
                          >
                            <Maximize2 size={16} />
                          </button>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                          <Flower2 size={40} color="var(--color-maroon-primary)" style={{ marginBottom: '8px' }} />
                          <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-maroon-primary)', fontSize: 'var(--font-size-sm)' }}>
                            {currentLang === 'te' ? 'ఛాయాచిత్రాలు త్వరలో జోడించబడతాయి' : 'Photographs Pending Upload'}
                          </p>
                          <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                            {currentLang === 'te'
                              ? 'ఈ అవతారానికి సంబంధించిన ఫోటోలను కమిటీ త్వరలోనే అప్‌లోడ్ చేస్తుంది.'
                              : 'Official photos for this avatar will be uploaded upon committee review.'}
                          </p>
                        </div>
                      )}

                      {/* Day Badge Overlay */}
                      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <span className="badge badge-maroon" style={{ fontSize: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                          {currentLang === 'te' ? `${avatar.dayNumber}వ రోజు` : `Day ${avatar.dayNumber}`}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Avatar Names */}
                      <h3 style={{ margin: '0 0 4px 0', fontSize: 'var(--font-size-xl)', color: 'var(--color-maroon-primary)' }}>
                        {primaryName}
                      </h3>
                      {secondaryName && (
                        <h4 style={{ margin: '0 0 var(--space-3) 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                          {secondaryName}
                        </h4>
                      )}

                      {/* Description */}
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)', flex: 1 }}>
                        {desc}
                      </p>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedAvatarModal(avatar)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <ImageIcon size={14} />
                        <span>{t('alankaranalu.avatarDetails')}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            ALBUM 2: AUCTION WINNERS VIEW
            ========================================================================= */}
        {album.albumType === 'auction' && (
          <div style={{ marginBottom: 'var(--space-12)' }}>
            {/* Total Raised Statistics Showcase */}
            <div
              className="card"
              style={{
                padding: 'var(--space-6) var(--space-8)',
                marginBottom: 'var(--space-8)',
                background: 'linear-gradient(135deg, #5E0909 0%, #2D0303 100%)',
                color: '#FFF',
                border: '2px solid var(--color-gold-dark)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFE082' }}>
                    {t('auctions.totalRaised')}
                  </span>
                  <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#FFE082', margin: '4px 0' }}>
                    {formatRupees(totalRaised)}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: '#E0D6C8' }}>
                    {confirmedAuctions.length} {t('auctions.confirmedItems')} · 2025 {currentLang === 'te' ? 'నవరాత్రి ఉత్సవాలు' : 'Navaratri Celebrations'}
                  </div>
                </div>

                {/* Filter Pills and View Mode Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setAuctionFilter('all')}
                      className={`btn btn-sm ${auctionFilter === 'all' ? 'btn-gold' : 'btn-secondary'}`}
                    >
                      {t('auctions.filterAll', { count: confirmedAuctions.length })}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuctionFilter('sarees')}
                      className={`btn btn-sm ${auctionFilter === 'sarees' ? 'btn-gold' : 'btn-secondary'}`}
                    >
                      {t('auctions.filterSarees', { count: 10 })}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuctionFilter('additional')}
                      className={`btn btn-sm ${auctionFilter === 'additional' ? 'btn-gold' : 'btn-secondary'}`}
                    >
                      {currentLang === 'te' ? 'మెడలు మీద చీర (1)' : 'Medalu Meeda Cheera (1)'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
                    <button
                      type="button"
                      onClick={() => setAuctionViewMode('cards')}
                      className={`btn btn-sm ${auctionViewMode === 'cards' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ padding: '4px 10px', fontSize: 'var(--font-size-xs)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <LayoutGrid size={14} />
                      <span>{t('auctions.viewCards')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuctionViewMode('table')}
                      className={`btn btn-sm ${auctionViewMode === 'table' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ padding: '4px 10px', fontSize: 'var(--font-size-xs)', display: 'inline-flex', alignItems: 'center', gap: '6px', color: auctionViewMode === 'table' ? undefined : '#FFF' }}
                    >
                      <List size={14} />
                      <span>{t('auctions.viewTable')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* When auctionViewMode === 'cards' */}
            {auctionViewMode === 'cards' ? (
              <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                {filteredConfirmedAuctions.map((item) => {
                  const itemPrimaryName = currentLang === 'te' ? item.itemName.te : item.itemName.en;
                  const itemSecondaryName = currentLang === 'te' ? item.itemName.en : item.itemName.te;
                  const avatarName = item.avatarName ? getLocalized(item.avatarName) : null;

                  return (
                    <article
                      key={item.id}
                      className="card card-gold-top card-hover"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        background: 'var(--color-surface)',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedAuctionModal(item)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${itemPrimaryName} - ${item.winnerName}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedAuctionModal(item);
                        }
                      }}
                    >
                      {/* Media representation or neutral placeholder */}
                      <div
                        style={{
                          position: 'relative',
                          height: '220px',
                          background: 'var(--color-cream-alt)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottom: '1px solid var(--color-border-subtle)',
                          overflow: 'hidden'
                        }}
                      >
                        {item.photoUrl ? (
                          <>
                            <img
                              src={item.photoUrl}
                              alt={itemPrimaryName}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              loading="lazy"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePhotosList([{
                                  id: item.id,
                                  url: item.photoUrl!,
                                  caption: { en: `${item.itemName.en} - ${item.winnerName}`, te: `${item.itemName.te} - ${item.winnerName}` },
                                  altText: { en: item.itemName.en, te: item.itemName.te },
                                  isSample: false
                                }]);
                                setActivePhotoIndex(0);
                                setLightboxOpen(true);
                              }}
                              style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '32px',
                                height: '32px',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(0,0,0,0.6)',
                                color: '#FFF',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 2
                              }}
                              title={t('albums.openPhoto')}
                            >
                              <Maximize2 size={16} />
                            </button>
                          </>
                        ) : (
                          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                            <Trophy size={40} color="var(--color-gold-dark)" style={{ marginBottom: '8px' }} />
                            <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-maroon-primary)', fontSize: 'var(--font-size-sm)' }}>
                              {t('auctions.noPhotoTitle')}
                            </p>
                            <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                              {t('auctions.noPhotoDesc')}
                            </p>
                          </div>
                        )}

                        {/* Item Type Badge Overlay (Top Left) */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                          <span className="badge badge-maroon" style={{ fontSize: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                            {item.avatarId ? t('auctions.sacredSaree') : t('auctions.specialItem')}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Associated Devi Name Badge if applicable */}
                        {avatarName && (
                          <div style={{ marginBottom: 'var(--space-2)' }}>
                            <span
                              className="badge"
                              style={{
                                background: 'var(--color-maroon-subtle)',
                                color: 'var(--color-maroon-primary)',
                                fontSize: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              🌺 {avatarName}
                            </span>
                          </div>
                        )}

                        {/* Auction Item Name in Telugu and English */}
                        <h3 style={{ margin: '0 0 4px 0', fontSize: 'var(--font-size-xl)', color: 'var(--color-maroon-primary)' }}>
                          {itemPrimaryName}
                        </h3>
                        {itemSecondaryName && (
                          <h4 style={{ margin: '0 0 var(--space-4) 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                            {itemSecondaryName}
                          </h4>
                        )}

                        {/* Winner Details & Amount Box */}
                        <div
                          style={{
                            padding: 'var(--space-3) var(--space-4)',
                            background: 'var(--color-cream-alt)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border-subtle)',
                            marginBottom: 'var(--space-4)',
                            flex: 1
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <div>
                              <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                                {t('auctions.tableWinner')}
                              </div>
                              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-maroon-primary)' }}>
                                {item.winnerName}
                              </div>
                              {item.fatherName ? (
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                                  <span style={{ color: 'var(--color-text-muted)' }}>{t('auctions.tableFather')}: </span>
                                  {item.fatherName}
                                </div>
                              ) : null}
                            </div>

                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                                {t('auctions.tableAmount')}
                              </div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold-dark)' }}>
                                {formatRupees(item.winningAmount)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAuctionModal(item);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <Trophy size={14} />
                          <span>{t('auctions.cardDetails')}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Confirmed Auction Items Table */
              <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-base)' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
                      <th style={{ padding: '14px 16px', width: '60px' }}>#</th>
                      <th style={{ padding: '14px 16px' }}>{t('auctions.tableItem')}</th>
                      <th style={{ padding: '14px 16px' }}>{t('auctions.tableAvatar')}</th>
                      <th style={{ padding: '14px 16px' }}>{t('auctions.tableWinner')}</th>
                      <th style={{ padding: '14px 16px' }}>{t('auctions.tableFather')}</th>
                      <th style={{ padding: '14px 16px', width: '160px', textAlign: 'right' }}>{t('auctions.tableAmount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConfirmedAuctions.map((item, idx) => {
                      const itemName = getLocalized(item.itemName);
                      const avatarName = item.avatarName ? getLocalized(item.avatarName) : null;
                      return (
                        <tr
                          key={item.id}
                          style={{ borderBottom: '1px solid var(--color-border-subtle)', cursor: 'pointer' }}
                          onClick={() => setSelectedAuctionModal(item)}
                        >
                          <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            {idx + 1}
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.photoUrl ? (
                                <img
                                  src={item.photoUrl}
                                  alt={itemName}
                                  style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                                />
                              ) : null}
                              <span>{itemName}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            {avatarName ? (
                              <span
                                className="badge"
                                style={{
                                  background: 'var(--color-maroon-subtle)',
                                  color: 'var(--color-maroon-primary)',
                                  fontSize: '12px'
                                }}
                              >
                                🌺 {avatarName}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontStyle: 'italic' }}>
                                {t('auctions.unassignedAvatar')}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-maroon-primary)' }}>
                            {item.winnerName}
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)' }}>
                            {item.fatherName ? item.fatherName : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--color-maroon-primary)', fontSize: '1.1rem' }}>
                            {formatRupees(item.winningAmount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Incomplete / Pending Items Informational Notice */}
            <div
              className="card"
              style={{
                padding: 'var(--space-6)',
                borderLeft: '4px solid var(--color-gold-dark)',
                background: 'var(--color-gold-pale)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Sparkles size={24} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: 'var(--font-size-base)', color: 'var(--color-maroon-primary)' }}>
                    {t('auctions.pendingNoticeTitle')}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {t('auctions.pendingNoticeDesc')}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="badge badge-gold">
                      {currentLang === 'te' ? 'లడ్డూ ప్రసాదం' : 'Laddu Prasadam'}
                    </span>
                    <span className="badge badge-gold">
                      {currentLang === 'te' ? 'ముక్కు పుడక' : 'Mukku Pudaka (Nose Ring)'}
                    </span>
                    <span className="badge badge-gold">
                      {currentLang === 'te' ? 'పవిత్ర కలశం' : 'Sacred Kalasham'}
                    </span>
                    <span className="badge badge-gold">
                      {currentLang === 'te' ? 'లక్ష్మీ మాల' : 'Lakshmi Maala'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ALBUM 3: DONORS & SPONSORS VIEW
            ========================================================================= */}
        {album.albumType === 'donors' && (
          <div style={{ marginBottom: 'var(--space-12)' }}>
            {publishedDonors.length === 0 ? (
              <div
                className="card"
                style={{
                  padding: 'var(--space-12)',
                  textAlign: 'center',
                  background: 'var(--color-cream-alt)',
                  border: '2px dashed var(--color-border-medium)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-gold-pale)',
                    color: 'var(--color-gold-dark)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <HeartHandshake size={32} />
                </div>
                <h2 style={{ fontSize: 'var(--font-size-xl)', margin: '0 0 8px 0', color: 'var(--color-maroon-primary)' }}>
                  {t('donors.emptyTitle')}
                </h2>
                <p style={{ margin: '0 auto', maxWidth: '580px', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 1.6 }}>
                  {t('donors.emptyDesc')}
                </p>
              </div>
            ) : (
              <div className="grid-3">
                {publishedDonors.map((donor) => {
                  const donorName = getLocalized(donor.name);
                  const contrib = getLocalized(donor.contributionType);
                  return (
                    <div key={donor.id} className="card card-cultural-top" style={{ padding: 'var(--space-5)' }}>
                      <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                        {contrib}
                      </span>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: 'var(--font-size-lg)' }}>
                        {donorName}
                      </h3>
                      {donor.amount !== undefined && (
                        <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-maroon-primary)', marginTop: '8px' }}>
                          {formatRupees(donor.amount)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            GENERAL PHOTO ALBUM VIEW (Standard photos grid)
            ========================================================================= */}
        {album.albumType === 'general' && (
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', margin: 0 }}>
                {currentLang === 'te' ? 'ఉత్సవ ఛాయాచిత్రాలు' : 'Photographs'}
              </h2>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {t('albums.openPhoto')}
              </span>
            </div>

            <div className="grid-3" role="region" aria-label={localizedTitle}>
              {album.photos.map((photo, index) => {
                const photoCaption = getLocalized(photo.caption);
                const photoAlt = getLocalized(photo.altText) || photoCaption;
                return (
                  <div
                    key={photo.id}
                    className="card card-hover"
                    style={{ cursor: 'pointer', overflow: 'hidden' }}
                    onClick={() => {
                      setActivePhotosList(album.photos);
                      setActivePhotoIndex(index);
                      setLightboxOpen(true);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${photoCaption} (${index + 1}/${album.photos.length})`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePhotosList(album.photos);
                        setActivePhotoIndex(index);
                        setLightboxOpen(true);
                      }
                    }}
                  >
                    <div className="card-media" style={{ position: 'relative' }}>
                      <img src={photo.url} alt={photoAlt} loading="lazy" />
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(0,0,0,0.5)',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Maximize2 size={16} />
                      </div>
                    </div>

                    <div className="card-body" style={{ padding: 'var(--space-4)' }}>
                      <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                        {photoCaption}
                      </p>

                      {photo.photographerCredit && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                          <User size={12} color="var(--color-maroon-primary)" />
                          <span>{t('albums.photoCredit', { name: getLocalized(photo.photographerCredit) })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal: Avatar Detail & Full Photos View */}
        {selectedAvatarModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: 'var(--space-4)'
            }}
            onClick={() => setSelectedAvatarModal(null)}
          >
            <div
              className="card"
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: 'var(--space-8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="badge badge-maroon" style={{ marginBottom: '6px' }}>
                    {currentLang === 'te' ? `${selectedAvatarModal.dayNumber}వ రోజు అలంకారం` : `Day ${selectedAvatarModal.dayNumber} Alankaram`}
                  </span>
                  <h2 style={{ margin: '4px 0', fontSize: 'var(--font-size-2xl)', color: 'var(--color-maroon-primary)' }}>
                    {selectedAvatarModal.name.te}
                  </h2>
                  <h3 style={{ margin: 0, fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {selectedAvatarModal.name.en}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAvatarModal(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Significance */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', margin: '0 0 6px 0', color: 'var(--color-maroon-primary)' }}>
                  {currentLang === 'te' ? 'అవతార విశిష్టత' : 'Spiritual Significance'}
                </h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {getLocalized(selectedAvatarModal.description)}
                </p>
              </div>

              {/* Avatar Photos */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', margin: '0 0 10px 0', color: 'var(--color-maroon-primary)' }}>
                  {currentLang === 'te' ? 'ఛాయాచిత్రాలు' : 'Photographs'} ({selectedAvatarModal.photos.length})
                </h4>

                {selectedAvatarModal.photos.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--space-6)',
                      background: 'var(--color-cream-alt)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      border: '1px dashed var(--color-border-medium)'
                    }}
                  >
                    <Flower2 size={32} color="var(--color-maroon-primary)" style={{ marginBottom: '6px' }} />
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                      {t('alankaranalu.noPhotosDesc')}
                    </p>
                  </div>
                ) : (
                  <div className="grid-2" style={{ gap: '10px' }}>
                    {selectedAvatarModal.photos.map((p, pIdx) => (
                      <div
                        key={p.id}
                        style={{ cursor: 'pointer', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}
                        onClick={() => {
                          setActivePhotosList(selectedAvatarModal.photos);
                          setActivePhotoIndex(pIdx);
                          setLightboxOpen(true);
                        }}
                      >
                        <img src={p.url} alt={getLocalized(p.altText)} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                        <div style={{ padding: '6px', fontSize: '11px' }}>{getLocalized(p.caption)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => setSelectedAvatarModal(null)}
                  className="btn btn-secondary btn-sm"
                >
                  {t('alankaranalu.closeModal')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Auction Winner & Offering Details */}
        {selectedAuctionModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: 'var(--space-4)'
            }}
            onClick={() => setSelectedAuctionModal(null)}
          >
            <div
              className="card card-cultural-top"
              style={{
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: 'var(--space-8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                <div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-maroon">
                      {selectedAuctionModal.avatarId ? t('auctions.sacredSaree') : t('auctions.specialItem')}
                    </span>
                    {selectedAuctionModal.avatarName && (
                      <span className="badge badge-gold">
                        🌺 {getLocalized(selectedAuctionModal.avatarName)}
                      </span>
                    )}
                  </div>
                  <h2 style={{ margin: '4px 0', fontSize: 'var(--font-size-2xl)', color: 'var(--color-maroon-primary)' }}>
                    {selectedAuctionModal.itemName.te}
                  </h2>
                  <h3 style={{ margin: 0, fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {selectedAuctionModal.itemName.en}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAuctionModal(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Large Image Representation or Neutral Placeholder */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  background: 'var(--color-cream-alt)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-6)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                {selectedAuctionModal.photoUrl ? (
                  <>
                    <img
                      src={selectedAuctionModal.photoUrl}
                      alt={getLocalized(selectedAuctionModal.itemName)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActivePhotosList([{
                          id: selectedAuctionModal.id,
                          url: selectedAuctionModal.photoUrl!,
                          caption: {
                            en: `${selectedAuctionModal.itemName.en} - ${selectedAuctionModal.winnerName}`,
                            te: `${selectedAuctionModal.itemName.te} - ${selectedAuctionModal.winnerName}`
                          },
                          altText: {
                            en: selectedAuctionModal.itemName.en,
                            te: selectedAuctionModal.itemName.te
                          },
                          isSample: false
                        }]);
                        setActivePhotoIndex(0);
                        setLightboxOpen(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#FFF',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title={t('albums.openPhoto')}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                    <Trophy size={48} color="var(--color-gold-dark)" style={{ marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-maroon-primary)', fontSize: 'var(--font-size-base)' }}>
                      {t('auctions.noPhotoTitle')}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', maxWidth: '340px' }}>
                      {t('auctions.noPhotoDesc')}
                    </p>
                  </div>
                )}
              </div>

              {/* Winner Details & Winning Bid Card */}
              <div
                style={{
                  padding: 'var(--space-5)',
                  background: 'linear-gradient(135deg, rgba(142, 28, 28, 0.05) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-gold-light)',
                  marginBottom: 'var(--space-6)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-muted)', margin: '0 0 4px 0' }}>
                      {t('auctions.winnerDetails')}
                    </h4>
                    <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-maroon-primary)' }}>
                      {selectedAuctionModal.winnerName}
                    </div>
                    {selectedAuctionModal.fatherName && (
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('auctions.tableFather')}: </span>
                        <strong>{selectedAuctionModal.fatherName}</strong>
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-muted)', margin: '0 0 4px 0' }}>
                      {t('auctions.winningBid')}
                    </h4>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-gold-dark)' }}>
                      {formatRupees(selectedAuctionModal.winningAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ritual & Offering Context */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', margin: '0 0 6px 0', color: 'var(--color-maroon-primary)' }}>
                  {t('auctions.offeringDetails')}
                </h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {selectedAuctionModal.notes
                    ? getLocalized(selectedAuctionModal.notes)
                    : t('auctions.congratulations')}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => setSelectedAuctionModal(null)}
                  className="btn btn-secondary btn-sm"
                >
                  {t('auctions.closeModal')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        <Lightbox
          photos={activePhotosList.length > 0 ? activePhotosList : album.photos}
          currentIndex={activePhotoIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        />
      </div>
    </div>
  );
};
