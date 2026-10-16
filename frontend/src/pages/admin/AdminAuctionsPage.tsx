import React, { useState } from 'react';
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
  Upload
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import { BilingualField } from '../../components/admin/BilingualField';
import { formatRupees, type AuctionItemRecord } from '../../types';

export const AdminAuctionsPage: React.FC = () => {
  const { auctions, avatars, saveAuctionItem, deleteAuctionItem } = useData();
  const { canDelete } = useAuth();
  const { currentLang, getLocalized } = useAppLanguage();

  const [filterType, setFilterType] = useState<'all' | 'confirmed' | 'drafts' | 'sarees' | 'special'>('all');
  const [editingItem, setEditingItem] = useState<AuctionItemRecord | null>(null);
  const [isNew, setIsNew] = useState(false);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditingItem((prev) => (prev ? { ...prev, photoUrl: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.itemName.en && !editingItem.itemName.te) {
      alert('Please provide item name in at least one language.');
      return;
    }

    // Determine completeness: must have winnerName and winningAmount >= 0
    const hasWinner = !!editingItem.winnerName && editingItem.winnerName.trim().length > 0;
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
              ? 'పది చీరలు, మెడలు మీద చీర మరియు విశేష వస్తువుల వేలం వివరాలు, విజేతల పేర్లు, పాట మొత్తాల నిర్వహణ.'
              : 'Manage the 10 saree auctions linked to avatars, Medalu Meeda Cheera, and special item drafts with Indian Rupee formatting.'}
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
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Confirmed Items</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-success)' }}>
              {confirmedCount} Items
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Raised</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-maroon-primary)' }}>
              {formatRupees(totalAmount)}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Incomplete Drafts</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-warning)' }}>
              {draftCount} Items
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
            All ({auctions.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('confirmed')}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'drafts' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('drafts')}
          >
            Drafts ({draftCount})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'sarees' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('sarees')}
          >
            Sarees (11)
          </button>
          <button
            type="button"
            className={`btn btn-sm ${filterType === 'special' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('special')}
          >
            Special Items (4)
          </button>
        </div>
      </div>

      {/* Auction Records Table */}
      <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: '40px' }}>#</th>
              <th style={{ padding: '12px 14px', width: '60px' }}>Photo</th>
              <th style={{ padding: '12px 14px' }}>Item Name (తెలుగు / EN)</th>
              <th style={{ padding: '12px 14px' }}>Associated Avatar</th>
              <th style={{ padding: '12px 14px' }}>Winner Name</th>
              <th style={{ padding: '12px 14px' }}>Father's Name</th>
              <th style={{ padding: '12px 14px', width: '130px' }}>Amount</th>
              <th style={{ padding: '12px 14px', width: '140px' }}>Status</th>
              <th style={{ padding: '12px 14px', width: '140px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuctions.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '12px 14px', color: 'var(--color-text-muted)' }}>{idx + 1}</td>

                {/* Photo Thumbnail */}
                <td style={{ padding: '8px 14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      background: 'var(--color-cream-alt)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt={getLocalized(item.itemName)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Trophy size={16} color="var(--color-gold-dark)" opacity={0.6} />
                    )}
                  </div>
                </td>

                {/* Item Name */}
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {item.itemName.te || item.itemName.en}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                    {item.itemName.en}
                  </div>
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
                      Unassigned / ఆలయ సమర్పణ
                    </span>
                  )}
                </td>

                {/* Winner Name */}
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                  {item.winnerName ? (
                    item.winnerName
                  ) : (
                    <span style={{ color: 'var(--color-warning)', fontStyle: 'italic', fontSize: '11px' }}>
                      [Missing / Awaiting Winner]
                    </span>
                  )}
                </td>

                {/* Father's Name */}
                <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                  {item.fatherName ? (
                    item.fatherName
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
                      [Missing / Awaiting Amount]
                    </span>
                  )}
                </td>

                {/* Completeness / Status Badge */}
                <td style={{ padding: '12px 14px' }}>
                  {item.isComplete ? (
                    <span className="badge badge-success" style={{ fontSize: '11px' }}>
                      <CheckCircle size={10} style={{ display: 'inline', marginRight: '3px' }} />
                      Confirmed ({item.status})
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
                      Incomplete Draft
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
            ))}
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
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'var(--space-8)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>
                {isNew ? 'Add Auction Record' : `Edit Auction Record: ${editingItem.itemName.en || editingItem.itemName.te}`}
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
                label="Item Name (వస్తువు పేరు)"
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
                  Associated Avatar (సంబంధిత అమ్మవారి అవతారం)
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
                  <option value="">-- Unassigned / ఆలయ సమర్పణ (e.g. Medalu Meeda Cheera or Special Items) --</option>
                  {avatars.map((av) => (
                    <option key={av.id} value={av.id}>
                      Day {av.dayNumber}: {av.name.te} ({av.name.en})
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  If the association is uncertain, leave it unassigned and make it editable.
                </span>
              </div>

              {/* Winner Name */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Winner's Name (విజేత పేరు)
                </label>
                <input
                  type="text"
                  value={editingItem.winnerName || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      winnerName: e.target.value
                    })
                  }
                  placeholder="e.g. ఓర్సు జగదీశ్ or Uduthala Mahesh"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  Preserves original supplied Telugu or English spelling. Leave blank if not yet announced.
                </span>
              </div>

              {/* Father's Name */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Father's Name (తండ్రి పేరు - If Provided)
                </label>
                <input
                  type="text"
                  value={editingItem.fatherName || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      fatherName: e.target.value
                    })
                  }
                  placeholder="e.g. రాంచంద్రయ్య (Leave blank if not supplied)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  Do not invent father's names; leave blank if not supplied (e.g. Komiri Vasu).
                </span>
              </div>

              {/* Winning Amount */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Winning Amount in Indian Rupees (వేలం మొత్తం - ₹)
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
                  Do not treat missing amounts as zero. Leave blank if amount has not yet been confirmed.
                </span>
              </div>

              {/* Auction Item Photograph */}
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
                  <div
                    style={{
                      width: '130px',
                      height: '90px',
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
                    {editingItem.photoUrl ? (
                      <img
                        src={editingItem.photoUrl}
                        alt="Auction Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', padding: '6px' }}>
                        <Trophy size={24} color="var(--color-gold-dark)" style={{ margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                          {currentLang === 'te' ? 'ఫోటో లేదు' : 'No Photo'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={14} />
                        <span>{editingItem.photoUrl ? (currentLang === 'te' ? 'ఫోటో మార్చండి' : 'Replace Image') : (currentLang === 'te' ? 'ఫోటో అప్‌లోడ్' : 'Upload Image')}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {editingItem.photoUrl && (
                        <button
                          type="button"
                          onClick={() => setEditingItem({ ...editingItem, photoUrl: undefined })}
                          className="btn btn-secondary btn-sm"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          {currentLang === 'te' ? 'ఫోటో తొలగించండి' : 'Remove Image'}
                        </button>
                      )}
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {currentLang === 'te'
                        ? 'పరికరము నుండి ఫోటోను ఎంచుకోండి లేదా క్రింద వెబ్ URL నమోదు చేయండి.'
                        : 'Upload an image file from your device or paste a URL below.'}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                    {currentLang === 'te' ? 'లేదా ఫోటో వెబ్ URL నమోదు చేయండి:' : 'Or enter direct image URL:'}
                  </label>
                  <input
                    type="text"
                    value={editingItem.photoUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value.trim() || undefined })}
                    placeholder="https://example.com/photo.jpg or data:image/..."
                    style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)', background: '#FFF' }}
                  />
                </div>
              </div>

              {/* Item Type & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: 'var(--space-6)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    Item Type
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
                    <option value="saree">Sacred Saree (చీర)</option>
                    <option value="special_item">Special Item (విశేష వస్తువు: Laddu, Kalasham, etc.)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    Status
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
                    <option value="published">Published (If Complete)</option>
                    <option value="draft">Draft (Admin Only)</option>
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
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Auction Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
