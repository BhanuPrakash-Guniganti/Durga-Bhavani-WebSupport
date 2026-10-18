import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import { BilingualField } from '../../components/admin/BilingualField';
import type { AlbumRecord, AlbumType } from '../../types';

export const AdminAlbumsPage: React.FC = () => {
  const { albums, saveAlbum, deleteAlbum, toggleAlbumStatus } = useData();
  const { canDelete } = useAuth();
  const { currentLang, getLocalized } = useAppLanguage();

  const [yearFilter, setYearFilter] = useState<string>('2025');
  const [editingAlbum, setEditingAlbum] = useState<AlbumRecord | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filteredAlbums = albums.filter((a) => {
    if (yearFilter === 'all') return true;
    return a.year.toString() === yearFilter;
  });

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingAlbum({
      id: `alb-${Date.now()}`,
      slug: `album-${Date.now()}`,
      title: { en: '', te: '' },
      description: { en: '', te: '' },
      year: parseInt(yearFilter !== 'all' ? yearFilter : '2025', 10),
      coverImage: '',
      photoCount: 0,
      photos: [],
      status: 'draft',
      albumType: 'general',
      isSample: false
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAlbum) return;
    const titleEn = typeof editingAlbum.title === 'string' ? editingAlbum.title : editingAlbum.title?.en;
    const titleTe = typeof editingAlbum.title === 'string' ? '' : editingAlbum.title?.te;
    if (!titleEn && !titleTe) {
      alert('Please provide album title in at least one language.');
      return;
    }
    saveAlbum(editingAlbum);
    setEditingAlbum(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (!canDelete()) {
      alert('Only Super Administrators are permitted to delete albums.');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete album "${title}"?`)) {
      deleteAlbum(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="sub-heading">
            {currentLang === 'te' ? 'ఆల్బమ్‌ల సేకరణ' : 'Album Collections'}
          </span>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderKanban color="var(--color-maroon-primary)" />
            <span>{currentLang === 'te' ? 'ఉత్సవ ఫోటో ఆల్బమ్‌లు' : 'Festival Photo & Archive Albums'}</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {currentLang === 'te'
              ? '2025 వేడుకలకు సంబంధించిన 3 ప్రత్యేక ఆల్బమ్‌లు మరియు ఇతర సంవత్సరాల ఆల్బమ్‌ల నిర్వహణ.'
              : 'Manage the three 2025 albums (Devi Alankaranalu, Auction Winners, Donors & Sponsors) and annual archives.'}
          </p>
        </div>

        <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{currentLang === 'te' ? 'కొత్త ఆల్బమ్ చేర్చండి' : 'Create New Album'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-6)' }}>
        <button
          type="button"
          className={`btn btn-sm ${yearFilter === '2025' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setYearFilter('2025')}
        >
          2025 Celebrations ({albums.filter((a) => a.year === 2025).length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${yearFilter === '2026' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setYearFilter('2026')}
        >
          2026 ({albums.filter((a) => a.year === 2026).length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${yearFilter === '2024' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setYearFilter('2024')}
        >
          2024 ({albums.filter((a) => a.year === 2024).length})
        </button>
        <button
          type="button"
          className={`btn btn-sm ${yearFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setYearFilter('all')}
        >
          All Years ({albums.length})
        </button>
      </div>

      {/* Albums Grid */}
      <div className="grid-3">
        {filteredAlbums.map((album) => {
          const title = getLocalized(album.title);
          const desc = getLocalized(album.description);
          return (
            <div key={album.id} className="card card-cultural-top" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: 'var(--space-5)', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-maroon" style={{ fontSize: '11px' }}>
                    Year {album.year}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: album.status === 'published' ? 'var(--color-success-bg)' : '#FFF3E0',
                      color: album.status === 'published' ? 'var(--color-success)' : 'var(--color-warning)',
                      fontSize: '11px'
                    }}
                  >
                    {album.status.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 6px 0', fontSize: 'var(--font-size-lg)', color: 'var(--color-maroon-primary)' }}>
                  {title}
                </h3>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  Slug: <code>{album.slug}</code> · Type: <strong>{album.albumType || 'general'}</strong>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'var(--color-cream-alt)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link
                    to={`/albums/${album.slug}`}
                    target="_blank"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px' }}
                    title="Preview public album page"
                  >
                    <ExternalLink size={14} />
                    <span>Preview</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNew(false);
                      setEditingAlbum({ ...album });
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px' }}
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => toggleAlbumStatus(album.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', fontSize: '11px' }}
                  >
                    {album.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(album.id, title)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', color: 'var(--color-danger)' }}
                    title="Delete album"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add / Edit Album */}
      {editingAlbum && (
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
              maxWidth: 'min(650px, 95vw)',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(14px, 3vw, 32px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>
                {isNew ? 'Create New Album' : `Edit Album: ${getLocalized(editingAlbum.title)}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingAlbum(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* Year and Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    Celebration Year *
                  </label>
                  <input
                    type="number"
                    value={editingAlbum.year}
                    onChange={(e) =>
                      setEditingAlbum({
                        ...editingAlbum,
                        year: parseInt(e.target.value, 10) || 2025
                      })
                    }
                    required
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    Album Category Type
                  </label>
                  <select
                    value={editingAlbum.albumType || 'general'}
                    onChange={(e) =>
                      setEditingAlbum({
                        ...editingAlbum,
                        albumType: e.target.value as AlbumType
                      })
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                  >
                    <option value="avatars">Devi Alankaranalu (Avatars View)</option>
                    <option value="auction">Auction Winners (Auction View)</option>
                    <option value="donors">Donors & Sponsors (Sponsors View)</option>
                    <option value="general">General Photo Gallery</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <BilingualField
                label="Album Title (ఆల్బమ్ శీర్షిక)"
                value={
                  typeof editingAlbum.title === 'string'
                    ? { en: editingAlbum.title, te: '' }
                    : editingAlbum.title
                }
                onChange={(newTitle) =>
                  setEditingAlbum({
                    ...editingAlbum,
                    title: newTitle
                  })
                }
                placeholderEn="e.g. Devi Alankaranalu or Auction Winners"
                placeholderTe="ఉదా: అమ్మవారి అలంకరణలు లేదా వేలం పాట విజేతలు"
                required
              />

              {/* Slug */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  URL Slug (e.g. devi-alankaranalu-2025) *
                </label>
                <input
                  type="text"
                  value={editingAlbum.slug}
                  onChange={(e) =>
                    setEditingAlbum({
                      ...editingAlbum,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })
                  }
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
              </div>

              {/* Description */}
              <BilingualField
                label="Album Description (వివరణ)"
                value={
                  typeof editingAlbum.description === 'string'
                    ? { en: editingAlbum.description, te: '' }
                    : editingAlbum.description
                }
                onChange={(newDesc) =>
                  setEditingAlbum({
                    ...editingAlbum,
                    description: newDesc
                  })
                }
                as="textarea"
                rows={3}
                placeholderEn="Enter album details..."
                placeholderTe="ఆల్బమ్ వివరాలను నమోదు చేయండి..."
              />

              {/* Status */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Publication Status
                </label>
                <select
                  value={editingAlbum.status}
                  onChange={(e) =>
                    setEditingAlbum({
                      ...editingAlbum,
                      status: e.target.value as AlbumRecord['status']
                    })
                  }
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingAlbum(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
