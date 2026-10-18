import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  FolderKanban,
  Check,
  Search,
  Loader2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import { BilingualField } from '../../components/admin/BilingualField';
import { formatRupees, type AuctionItemRecord, type LocalizedString } from '../../types';
import { createSampleSvgImage } from '../../data/sampleData';
import { api } from '../../services/api';

const isTelugu = (text?: string) => !!text && /[\u0C00-\u0C7F]/.test(text);

export const AdminAuctionsPage: React.FC = () => {
  const { auctions, avatars, albums, saveAuctionItem, deleteAuctionItem } = useData();
  const { canDelete } = useAuth();
  const { currentLang, getLocalized } = useAppLanguage();
  const { t } = useTranslation();

  const [filterType, setFilterType] = useState<'all' | 'confirmed' | 'drafts' | 'sarees' | 'special'>('all');
  const [editingItem, setEditingItem] = useState<AuctionItemRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [mediaSelectorOpen, setMediaSelectorOpen] = useState(false);
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<'all' | 'auctions' | 'avatars' | 'albums' | 'motifs'>('all');
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Filter logic
  const filteredAuctions = auctions.filter((item) => {
    if (filterType === 'confirmed') return item.isComplete && item.status === 'published';
    if (filterType === 'drafts') return !item.isComplete || item.status === 'draft';
    if (filterType === 'sarees') return item.itemType === 'saree';
    if (filterType === 'special') return item.itemType === 'special_item';
    return true;
  });

  const confirmedCount = auctions.filter((a) => a.isComplete && a.status === 'published').length;
  const draftCount = auctions.filter((a) => !a.isComplete || a.status === 'draft').length;
  const totalAmount = auctions
    .filter((a) => a.isComplete && a.status === 'published')
    .reduce((acc, curr) => acc + (curr.winningAmount || 0), 0);

  // Aggregate available images from across the platform for the Media Library
  const mediaItems = useMemo(() => {
    const list: Array<{
      id: string;
      url: string;
      title: LocalizedString;
      category: 'auctions' | 'avatars' | 'albums' | 'motifs';
      categoryLabel: LocalizedString;
    }> = [];

    // 1. Current auction items with photos
    auctions.forEach((a) => {
      if (a.photoUrl && a.photoUrl.trim().length > 0) {
        list.push({
          id: `med-auc-${a.id}`,
          url: a.photoUrl,
          title: a.itemName,
          category: 'auctions',
          categoryLabel: { en: 'Auction Offering', te: 'వేలం సమర్పణ' }
        });
      }
    });

    const toLocalizedString = (val: LocalizedString | string | undefined, fallback: string): LocalizedString => {
      if (!val) return { en: fallback, te: fallback };
      if (typeof val === 'string') return { en: val, te: val };
      return { en: val.en || fallback, te: val.te || fallback };
    };

    // 2. Avatar photos
    avatars.forEach((av) => {
      av.photos.forEach((p, idx) => {
        list.push({
          id: `med-av-${av.id}-${idx}`,
          url: p.url,
          title: toLocalizedString(p.caption, getLocalized(av.name)),
          category: 'avatars',
          categoryLabel: { en: `Day ${av.dayNumber} Alankaram`, te: `${av.dayNumber}వ రోజు అలంకారం` }
        });
      });
    });

    // 3. Album photos
    albums.forEach((alb) => {
      alb.photos.forEach((p, idx) => {
        list.push({
          id: `med-alb-${alb.id}-${idx}`,
          url: p.url,
          title: toLocalizedString(p.caption, getLocalized(alb.title)),
          category: 'albums',
          categoryLabel: { en: `Album (${alb.year})`, te: `ఉత్సవ ఆల్బమ్ (${alb.year})` }
        });
      });
    });

    // 4. Sacred Temple Motifs
    list.push(
      {
        id: 'motif-kalash',
        url: createSampleSvgImage('Sacred Kalasham', 'Auction', '#7A0C0C', 'kalash'),
        title: { en: 'Sacred Kalasham Motif', te: 'పవిత్ర కలశం ఆలయ చిహ్నం' },
        category: 'motifs',
        categoryLabel: { en: 'Sacred Motif', te: 'పవిత్ర చిహ్నం' }
      },
      {
        id: 'motif-diya',
        url: createSampleSvgImage('Auspicious Diya', 'Auction', '#7A0C0C', 'diya'),
        title: { en: 'Auspicious Deepam Motif', te: 'మంగళప్రదమైన దీపం చిహ్నం' },
        category: 'motifs',
        categoryLabel: { en: 'Sacred Motif', te: 'పవిత్ర చిహ్నం' }
      },
      {
        id: 'motif-mandir',
        url: createSampleSvgImage('Temple Gopuram', 'Auction', '#7A0C0C', 'mandir'),
        title: { en: 'Temple Mandir Gopuram Motif', te: 'ఆలయ గోపురం చిహ్నం' },
        category: 'motifs',
        categoryLabel: { en: 'Sacred Motif', te: 'పవిత్ర చిహ్నం' }
      }
    );

    // Deduplicate by URL
    const seen = new Set<string>();
    return list.filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });
  }, [auctions, avatars, albums, getLocalized]);

  const filteredMediaItems = useMemo(() => {
    return mediaItems.filter((item) => {
      if (mediaCategoryFilter !== 'all' && item.category !== mediaCategoryFilter) {
        return false;
      }
      if (mediaSearchQuery.trim()) {
        const q = mediaSearchQuery.toLowerCase();
        const enTitle = (item.title?.en || '').toLowerCase();
        const teTitle = (item.title?.te || '').toLowerCase();
        return enTitle.includes(q) || teTitle.includes(q);
      }
      return true;
    });
  }, [mediaItems, mediaCategoryFilter, mediaSearchQuery]);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: `auc-2025-${Date.now()}`,
      albumSlug: 'auction-winners-2025',
      year: 2025,
      itemName: { en: '', te: '' },
      avatarId: undefined,
      avatarName: undefined,
      winnerName: '',
      fatherName: '',
      winningAmount: undefined,
      photoUrl: undefined,
      itemType: 'saree',
      status: 'draft',
      isComplete: false,
      sortOrder: auctions.length + 1,
      isSample: false
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError(null);

    try {
      const res = await api.uploadImage(file, 'durga-bhavani/auctions');
      setEditingItem((prev) => (prev ? { ...prev, photoUrl: res.url, photoPublicId: res.publicId } : null));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Image upload failed';
      setUploadError(msg);
      // Fallback to local data URL so admin preview still works
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditingItem((prev) => (prev ? { ...prev, photoUrl: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.itemName.en && !editingItem.itemName.te) {
      alert(currentLang === 'te' ? 'దయచేసి కనీసం ఒక భాషలో వస్తువు పేరును నమోదు చేయండి.' : 'Please provide item name in at least one language.');
      return;
    }

    // Determine completeness: must have winnerName and winningAmount >= 0
    const hasWinner = typeof editingItem.winnerName === 'object' && editingItem.winnerName
      ? Boolean(editingItem.winnerName.te?.trim() || editingItem.winnerName.en?.trim())
      : Boolean(editingItem.winnerName && editingItem.winnerName.trim().length > 0);
    const hasValidAmount = editingItem.winningAmount !== undefined && editingItem.winningAmount >= 0;
    const isComplete = hasWinner && hasValidAmount;

    // Associated avatar name resolution
    let avatarName = undefined;
    if (editingItem.avatarId) {
      const matched = avatars.find((av) => av.id === editingItem.avatarId);
      if (matched) {
        avatarName = matched.name;
      }
    }

    const toSave: AuctionItemRecord = {
      ...editingItem,
      isComplete,
      avatarName
    };

    saveAuctionItem(toSave);
    setEditingItem(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (!canDelete()) {
      alert('Only Super Administrators are permitted to delete auction records.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete auction record "${title}"?`)) {
      deleteAuctionItem(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="sub-heading">
            {currentLang === 'te' ? 'ఆల్బమ్ 2 నిర్వహణ' : 'Album 2 Management'}
          </span>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy color="var(--color-gold-dark)" />
            <span>{currentLang === 'te' ? 'వేలం పాట రికార్డులు (2025)' : 'Auction Records (2025)'}</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {currentLang === 'te'
              ? 'పది చీరలు, మెడలు మీద చీర మరియు విశేష వస్తువుల వేలం వివరాలు, ఛాయాచిత్రాలు, విజేతల పేర్లు, పాట మొత్తాల నిర్వహణ.'
              : 'Manage the 10 saree auctions linked to avatars, Medalu Meeda Cheera, special item drafts, individual winner images, and Rupee amounts.'}
          </p>
        </div>

        <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{currentLang === 'te' ? 'కొత్త వేలం రికార్డు చేర్చండి' : 'Add Auction Record'}</span>
        </button>
      </div>

      {/* Summary Stats Strip */}
      <div
        className="card"
        style={{
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'var(--color-surface)'
        }}
      >
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'ధృవీకరించబడిన విజేతలు' : 'Confirmed Items'}
            </span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-success)' }}>
              {confirmedCount} {currentLang === 'te' ? 'రికార్డులు' : 'Items'}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'మొత్తం సమర్పణ' : 'Total Raised'}
            </span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-maroon-primary)' }}>
              {formatRupees(totalAmount)}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {currentLang === 'te' ? 'పెండింగ్ డ్రాఫ్ట్‌లు' : 'Incomplete Drafts'}
            </span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-warning)' }}>
              {draftCount} {currentLang === 'te' ? 'రికార్డులు' : 'Items'}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('all')}
          >
            {currentLang === 'te' ? `అన్నీ (${auctions.length})` : `All (${auctions.length})`}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('confirmed')}
          >
            {currentLang === 'te' ? `ధృవీకరించబడినవి (${confirmedCount})` : `Confirmed (${confirmedCount})`}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'drafts' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('drafts')}
          >
            {currentLang === 'te' ? `డ్రాఫ్ట్‌లు (${draftCount})` : `Drafts (${draftCount})`}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'sarees' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('sarees')}
          >
            {currentLang === 'te' ? 'చీరలు (11)' : 'Sarees (11)'}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'special' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('special')}
          >
            {currentLang === 'te' ? 'విశేష వస్తువులు (4)' : 'Special Items (4)'}
          </button>
        </div>
      </div>

      {/* Auction Records Table */}
      <div className="card table-responsive" style={{ padding: 'clamp(10px, 2vw, 24px)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: '40px' }}>#</th>
              <th style={{ padding: '12px 14px', width: '60px' }}>{currentLang === 'te' ? 'ఫోటో' : 'Photo'}</th>
              <th style={{ padding: '12px 14px' }}>{currentLang === 'te' ? 'వస్తువు పేరు (తెలుగు / EN)' : 'Item Name (TE / EN)'}</th>
              <th style={{ padding: '12px 14px' }}>{currentLang === 'te' ? 'సంబంధిత అవతారం' : 'Associated Avatar'}</th>
              <th style={{ padding: '12px 14px' }}>{currentLang === 'te' ? 'విజేత పేరు' : 'Winner Name'}</th>
              <th style={{ padding: '12px 14px' }}>{currentLang === 'te' ? 'తండ్రి పేరు' : "Father's Name"}</th>
              <th style={{ padding: '12px 14px', width: '130px' }}>{currentLang === 'te' ? 'పాట మొత్తం' : 'Amount'}</th>
              <th style={{ padding: '12px 14px', width: '140px' }}>{currentLang === 'te' ? 'స్థితి' : 'Status'}</th>
              <th style={{ padding: '12px 14px', width: '140px', textAlign: 'right' }}>{currentLang === 'te' ? 'చర్యలు' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuctions.map((item, idx) => {
              const winnerPrimary = typeof item.winnerName === 'object' && item.winnerName
                ? (currentLang === 'te' ? item.winnerName.te : item.winnerName.en) || item.winnerName.te || item.winnerName.en
                : item.winnerName;
              const winnerSecondary = typeof item.winnerName === 'object' && item.winnerName
                ? (currentLang === 'te' ? item.winnerName.en : item.winnerName.te)
                : undefined;

              const fatherDisplay = typeof item.fatherName === 'object' && item.fatherName
                ? (getLocalized(item.fatherName) || item.fatherName.te || item.fatherName.en)
                : item.fatherName;

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '12px 14px', color: 'var(--color-text-muted)' }}>{idx + 1}</td>

                  {/* Photo Thumbnail */}
                  <td style={{ padding: '8px 14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        background: 'var(--color-cream-alt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                    >
                      {item.photoUrl && item.photoUrl.trim().length > 0 ? (
                        <img
                          src={item.photoUrl}
                          alt={getLocalized(item.itemName)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Trophy size={18} color="var(--color-gold-dark)" opacity={0.6} />
                      )}
                    </div>
                  </td>

                  {/* Item Name */}
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {item.itemName.te || item.itemName.en}
                    </div>
                    {item.itemName.en && item.itemName.te && item.itemName.en !== item.itemName.te && (
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {item.itemName.en}
                      </div>
                    )}
                  </td>

                  {/* Associated Avatar */}
                  <td style={{ padding: '12px 14px' }}>
                    {item.avatarId ? (
                      <span
                        className="badge"
                        style={{
                          background: 'var(--color-maroon-subtle)',
                          color: 'var(--color-maroon-primary)',
                          fontSize: '11px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <LinkIcon size={10} />
                        <span>{getLocalized(item.avatarName) || item.avatarId}</span>
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        {currentLang === 'te' ? 'ఆలయ సమర్పణ' : 'Unassigned / Temple Offering'}
                      </span>
                    )}
                  </td>

                  {/* Winner Name */}
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                    {winnerPrimary ? (
                      <div>
                        <div>{winnerPrimary}</div>
                        {winnerSecondary && (
                          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                            {winnerSecondary}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-warning)', fontStyle: 'italic', fontSize: '11px' }}>
                        [{currentLang === 'te' ? 'విజేత పేరు నమోదు కాలేదు' : 'Missing / Awaiting Winner'}]
                      </span>
                    )}
                  </td>

                  {/* Father's Name */}
                  <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                    {fatherDisplay && fatherDisplay.trim().length > 0 ? (
                      fatherDisplay
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    )}
                  </td>

                  {/* Winning Amount */}
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-maroon-primary)', fontSize: 'var(--font-size-base)' }}>
                    {item.winningAmount !== undefined ? (
                      formatRupees(item.winningAmount)
                    ) : (
                      <span style={{ color: 'var(--color-warning)', fontSize: '11px', fontStyle: 'italic' }}>
                        [{currentLang === 'te' ? 'మొత్తం నమోదు కాలేదు' : 'Missing / Awaiting Amount'}]
                      </span>
                    )}
                  </td>

                  {/* Completeness / Status Badge */}
                  <td style={{ padding: '12px 14px' }}>
                    {item.isComplete ? (
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>
                        <CheckCircle size={10} style={{ display: 'inline', marginRight: '3px' }} />
                        {currentLang === 'te' ? `ధృవీకరించబడింది (${item.status})` : `Confirmed (${item.status})`}
                      </span>
                    ) : (
                      <span
                        className="badge"
                        style={{
                          background: 'var(--color-warning-bg)',
                          color: 'var(--color-warning)',
                          border: '1px solid var(--color-warning)',
                          fontSize: '11px'
                        }}
                      >
                        <AlertTriangle size={10} style={{ display: 'inline', marginRight: '3px' }} />
                        {currentLang === 'te' ? 'అసంపూర్ణ డ్రాఫ్ట్' : 'Incomplete Draft'}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsNew(false);
                          setEditingItem({ ...item });
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="Edit auction record"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.itemName.en || item.itemName.te)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', color: 'var(--color-danger)' }}
                        title="Delete auction record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Add / Edit Auction Record */}
      {editingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 'var(--space-4)'
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: 'min(680px, 95vw)',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(14px, 3vw, 32px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>
                {isNew
                  ? (currentLang === 'te' ? 'కొత్త వేలం రికార్డు చేర్చండి' : 'Add Auction Record')
                  : `${currentLang === 'te' ? 'వేలం రికార్డు సవరణ' : 'Edit Auction Record'}: ${editingItem.itemName.te || editingItem.itemName.en}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* Item Name */}
              <BilingualField
                label={currentLang === 'te' ? 'వస్తువు పేరు (Item Name)' : 'Item Name (వస్తువు పేరు)'}
                value={editingItem.itemName}
                onChange={(newName) =>
                  setEditingItem({
                    ...editingItem,
                    itemName: newName
                  })
                }
                placeholderEn="e.g. Sri Bala Tripura Sundari Devi Saree or Laddu Prasadam"
                placeholderTe="ఉదా: శ్రీ బాలా త్రిపుర సుందరీ దేవి చీర లేదా లడ్డూ"
                required
              />

              {/* Link to Associated Avatar */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  {currentLang === 'te' ? 'సంబంధిత అమ్మవారి అవతారం' : 'Associated Avatar (సంబంధిత అమ్మవారి అవతారం)'}
                </label>
                <select
                  value={editingItem.avatarId || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      avatarId: e.target.value || undefined
                    })
                  }
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                >
                  <option value="">
                    {currentLang === 'te'
                      ? '-- ఆలయ సమర్పణ / సంబంధిత అవతారం లేదు (ఉదా: మెడలు మీద చీర లేదా విశేష వస్తువులు) --'
                      : '-- Unassigned / Temple Offering (e.g. Medalu Meeda Cheera or Special Items) --'}
                  </option>
                  {avatars.map((av) => (
                    <option key={av.id} value={av.id}>
                      Day {av.dayNumber}: {av.name.te} ({av.name.en})
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  {currentLang === 'te'
                    ? 'అవతారం స్పష్టంగా లేకపోతే అసంబంధితంగా ఉంచండి.'
                    : 'If the association is uncertain, leave it unassigned and make it editable.'}
                </span>
              </div>

              {/* Winner's Name */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  {currentLang === 'te' ? 'విజేత పేరు (తెలుగు & English)' : "Winner's Name (Telugu & English)"}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <input
                      type="text"
                      value={
                        typeof editingItem.winnerName === 'object' && editingItem.winnerName
                          ? (editingItem.winnerName.te || '')
                          : (isTelugu(editingItem.winnerName) ? (editingItem.winnerName || '') : '')
                      }
                      onChange={(e) => {
                        const teVal = e.target.value;
                        const currentEn = typeof editingItem.winnerName === 'object' && editingItem.winnerName
                          ? (editingItem.winnerName.en || '')
                          : (!isTelugu(editingItem.winnerName) ? (editingItem.winnerName || '') : '');
                        if (teVal && currentEn) {
                          setEditingItem({ ...editingItem, winnerName: { te: teVal, en: currentEn } });
                        } else if (teVal) {
                          setEditingItem({ ...editingItem, winnerName: teVal });
                        } else if (currentEn) {
                          setEditingItem({ ...editingItem, winnerName: currentEn });
                        } else {
                          setEditingItem({ ...editingItem, winnerName: '' });
                        }
                      }}
                      placeholder="తెలుగు: ఉదా: ఓర్సు జగదీశ్"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>తెలుగు (Telugu)</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={
                        typeof editingItem.winnerName === 'object' && editingItem.winnerName
                          ? (editingItem.winnerName.en || '')
                          : (!isTelugu(editingItem.winnerName) ? (editingItem.winnerName || '') : '')
                      }
                      onChange={(e) => {
                        const enVal = e.target.value;
                        const currentTe = typeof editingItem.winnerName === 'object' && editingItem.winnerName
                          ? (editingItem.winnerName.te || '')
                          : (isTelugu(editingItem.winnerName) ? (editingItem.winnerName || '') : '');
                        if (currentTe && enVal) {
                          setEditingItem({ ...editingItem, winnerName: { te: currentTe, en: enVal } });
                        } else if (enVal) {
                          setEditingItem({ ...editingItem, winnerName: enVal });
                        } else if (currentTe) {
                          setEditingItem({ ...editingItem, winnerName: currentTe });
                        } else {
                          setEditingItem({ ...editingItem, winnerName: '' });
                        }
                      }}
                      placeholder="English: e.g. Orsu Jagadeesh"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>English</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  {currentLang === 'te'
                    ? 'విజేత పేరు అందుబాటులో ఉన్న భాషల్లో నమోదు చేయండి. ప్రకటించని పక్షంలో ఖాళీగా ఉంచండి.'
                    : 'Preserves original supplied spelling. Enter Telugu, English, or both wherever available. Leave blank if not yet announced.'}
                </span>
              </div>

              {/* Father's Name */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  {currentLang === 'te' ? 'తండ్రి పేరు (అందుబాటులో ఉంటే)' : "Father's Name (If Provided)"}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <input
                      type="text"
                      value={
                        typeof editingItem.fatherName === 'object' && editingItem.fatherName
                          ? (editingItem.fatherName.te || '')
                          : (isTelugu(editingItem.fatherName) ? (editingItem.fatherName || '') : '')
                      }
                      onChange={(e) => {
                        const teVal = e.target.value;
                        const currentEn = typeof editingItem.fatherName === 'object' && editingItem.fatherName
                          ? (editingItem.fatherName.en || '')
                          : (!isTelugu(editingItem.fatherName) ? (editingItem.fatherName || '') : '');
                        if (teVal && currentEn) {
                          setEditingItem({ ...editingItem, fatherName: { te: teVal, en: currentEn } });
                        } else if (teVal) {
                          setEditingItem({ ...editingItem, fatherName: teVal });
                        } else if (currentEn) {
                          setEditingItem({ ...editingItem, fatherName: currentEn });
                        } else {
                          setEditingItem({ ...editingItem, fatherName: '' });
                        }
                      }}
                      placeholder="తెలుగు: ఉదా: రాంచంద్రయ్య"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>తెలుగు (Optional)</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={
                        typeof editingItem.fatherName === 'object' && editingItem.fatherName
                          ? (editingItem.fatherName.en || '')
                          : (!isTelugu(editingItem.fatherName) ? (editingItem.fatherName || '') : '')
                      }
                      onChange={(e) => {
                        const enVal = e.target.value;
                        const currentTe = typeof editingItem.fatherName === 'object' && editingItem.fatherName
                          ? (editingItem.fatherName.te || '')
                          : (isTelugu(editingItem.fatherName) ? (editingItem.fatherName || '') : '');
                        if (currentTe && enVal) {
                          setEditingItem({ ...editingItem, fatherName: { te: currentTe, en: enVal } });
                        } else if (enVal) {
                          setEditingItem({ ...editingItem, fatherName: enVal });
                        } else if (currentTe) {
                          setEditingItem({ ...editingItem, fatherName: currentTe });
                        } else {
                          setEditingItem({ ...editingItem, fatherName: '' });
                        }
                      }}
                      placeholder="English: e.g. Ramachandraiah"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>English (Optional)</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  {currentLang === 'te'
                    ? 'తండ్రి పేరు ఉన్నట్లయితే మాత్రమే నమోదు చేయండి. ఖాళీగా ఉంటే ఊహించవద్దు.'
                    : "Do not invent father's names; leave blank if not supplied (e.g. Komiri Vasu)."}
                </span>
              </div>

              {/* Winning Amount */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  {currentLang === 'te' ? 'వేలం పాట మొత్తం (భారతీయ రూపాయలు - ₹)' : 'Winning Amount in Indian Rupees (వేలం మొత్తం - ₹)'}
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={editingItem.winningAmount !== undefined ? editingItem.winningAmount : ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      winningAmount: e.target.value === '' ? undefined : parseInt(e.target.value, 10)
                    })
                  }
                  placeholder="e.g. 25000 or 5116 (Leave blank if pending)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
                {editingItem.winningAmount !== undefined && (
                  <div style={{ marginTop: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-success)' }}>
                    Display Format: {formatRupees(editingItem.winningAmount)}
                  </div>
                )}
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  {currentLang === 'te'
                    ? 'మొత్తం ఖరారు కాని రికార్డులకు ఖాళీగా ఉంచండి.'
                    : 'Do not treat missing amounts as zero. Leave blank if amount has not yet been confirmed.'}
                </span>
              </div>

              {/* Auction Item Photograph Management */}
              <div
                style={{
                  marginBottom: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  background: 'var(--color-cream-alt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <ImageIcon size={16} color="var(--color-maroon-primary)" />
                    <span>{currentLang === 'te' ? 'వేలం వస్తువు / విజేత ఫోటో' : 'Auction Item / Winner Photograph'}</span>
                  </span>
                </label>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {/* Thumbnail Preview */}
                  <div
                    style={{
                      width: '140px',
                      height: '95px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#FFF',
                      border: '1px solid var(--color-border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {editingItem.photoUrl && editingItem.photoUrl.trim().length > 0 ? (
                      <img
                        src={editingItem.photoUrl}
                        alt="Auction Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', padding: '6px' }}>
                        <Trophy size={28} color="var(--color-gold-dark)" style={{ margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', fontWeight: 500 }}>
                          {t('auctions.noPhoto')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      {/* Select from Media Library */}
                      <button
                        type="button"
                        onClick={() => setMediaSelectorOpen(true)}
                        className="btn btn-primary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <FolderKanban size={14} />
                        <span>{t('auctions.selectFromMediaLibrary')}</span>
                      </button>

                      {/* Upload from Device */}
                      <label className="btn btn-secondary btn-sm" style={{ cursor: uploadingImage ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>
                          {uploadingImage
                            ? (currentLang === 'te' ? 'అప్‌లోడ్ అవుతోంది...' : 'Uploading...')
                            : (editingItem.photoUrl && editingItem.photoUrl.trim().length > 0
                                ? t('auctions.replaceImage')
                                : t('auctions.uploadImage'))}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingImage}
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {/* Remove Image */}
                      {editingItem.photoUrl && editingItem.photoUrl.trim().length > 0 && (
                        <button
                          type="button"
                          onClick={() => setEditingItem({ ...editingItem, photoUrl: '' })}
                          className="btn btn-secondary btn-sm"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          {t('auctions.removeImage')}
                        </button>
                      )}
                    </div>

                    {uploadError && (
                      <div style={{ color: 'var(--color-danger)', fontSize: '11px', marginBottom: '6px' }}>
                        ⚠️ {uploadError}
                      </div>
                    )}

                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      {currentLang === 'te'
                        ? 'మీడియా లైబ్రరీ నుండి ఎంచుకోండి, పరికరము నుండి అప్‌లోడ్ చేయండి లేదా నేరుగా వెబ్ URL నమోదు చేయండి.'
                        : 'Choose from existing festival media library, upload an image file, or enter a direct URL.'}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                    {t('auctions.directUrl')}
                  </label>
                  <input
                    type="text"
                    value={editingItem.photoUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value.trim() })}
                    placeholder="https://example.com/photo.jpg or data:image/..."
                    style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)', background: '#FFF' }}
                  />
                </div>
              </div>

              {/* Item Type & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: 'var(--space-6)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    {currentLang === 'te' ? 'వస్తువు రకం (Item Type)' : 'Item Type'}
                  </label>
                  <select
                    value={editingItem.itemType}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        itemType: e.target.value as AuctionItemRecord['itemType']
                      })
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                  >
                    <option value="saree">{currentLang === 'te' ? 'పవిత్ర చీర (Sacred Saree)' : 'Sacred Saree (చీర)'}</option>
                    <option value="special_item">{currentLang === 'te' ? 'విశేష వస్తువు (లడ్డూ, కలశం మొదలైనవి)' : 'Special Item (విశేష వస్తువు: Laddu, Kalasham, etc.)'}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    {currentLang === 'te' ? 'ప్రచురణ స్థితి (Status)' : 'Status'}
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as AuctionItemRecord['status']
                      })
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                  >
                    <option value="published">{currentLang === 'te' ? 'ప్రచురించు (పూర్తయితే)' : 'Published (If Complete)'}</option>
                    <option value="draft">{currentLang === 'te' ? 'డ్రాఫ్ట్ (నిర్వాహకులకు మాత్రమే)' : 'Draft (Admin Only)'}</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="btn btn-secondary btn-sm"
                >
                  {t('auctions.cancel')}
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {t('auctions.saveAuctionRecord')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Library Selector Modal */}
      {mediaSelectorOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: 'var(--space-4)'
          }}
          onClick={() => setMediaSelectorOpen(false)}
        >
          <div
            className="card card-cultural-top"
            style={{
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              padding: 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: 'var(--font-size-xl)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-maroon-primary)' }}>
                  <FolderKanban color="var(--color-maroon-primary)" size={20} />
                  <span>{t('auctions.mediaLibraryTitle')}</span>
                </h2>
                <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  {t('auctions.mediaLibraryDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMediaSelectorOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label={t('auctions.cancel')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Tabs and Search Bar */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', background: 'var(--color-cream-alt)', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Search Input */}
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  value={mediaSearchQuery}
                  onChange={(e) => setMediaSearchQuery(e.target.value)}
                  placeholder={t('auctions.searchMediaPlaceholder')}
                  style={{ width: '100%', padding: '6px 10px 6px 34px', fontSize: 'var(--font-size-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                />
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`btn btn-sm ${mediaCategoryFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMediaCategoryFilter('all')}
                >
                  {t('auctions.allMedia', { count: mediaItems.length })}
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mediaCategoryFilter === 'auctions' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMediaCategoryFilter('auctions')}
                >
                  {t('auctions.filterAuctions')}
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mediaCategoryFilter === 'avatars' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMediaCategoryFilter('avatars')}
                >
                  {t('auctions.filterAvatars')}
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mediaCategoryFilter === 'albums' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMediaCategoryFilter('albums')}
                >
                  {t('auctions.filterAlbums')}
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mediaCategoryFilter === 'motifs' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMediaCategoryFilter('motifs')}
                >
                  {t('auctions.filterMotifs')}
                </button>
              </div>
            </div>

            {/* Media Grid */}
            <div style={{ padding: 'var(--space-6)', flex: 1, overflowY: 'auto', maxHeight: '55vh' }}>
              {filteredMediaItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
                  <p>{t('auctions.noMediaFound')}</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '12px' }}>
                  {filteredMediaItems.map((media) => {
                    const isSelected = editingItem?.photoUrl === media.url;
                    const titleText = getLocalized(media.title);
                    const categoryText = getLocalized(media.categoryLabel);

                    return (
                      <div
                        key={media.id}
                        onClick={() => {
                          if (editingItem) {
                            setEditingItem({ ...editingItem, photoUrl: media.url });
                          }
                          setMediaSelectorOpen(false);
                        }}
                        style={{
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid var(--color-gold-dark)' : '1px solid var(--color-border-subtle)',
                          background: '#FFF',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 0 2px rgba(212, 175, 55, 0.3)' : undefined,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        title={titleText}
                      >
                        <div style={{ height: '110px', background: 'var(--color-cream-alt)', position: 'relative', overflow: 'hidden' }}>
                          <img src={media.url} alt={titleText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                          {isSelected && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'var(--color-gold-dark)',
                                color: '#FFF',
                                borderRadius: 'var(--radius-full)',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                              }}
                            >
                              <Check size={14} />
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <span className="badge" style={{ fontSize: '9px', alignSelf: 'flex-start', marginBottom: '4px', background: 'var(--color-maroon-subtle)', color: 'var(--color-maroon-primary)' }}>
                            {categoryText}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                            {titleText}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'flex-end', background: 'var(--color-cream-alt)' }}>
              <button
                type="button"
                onClick={() => setMediaSelectorOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                {t('auctions.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
