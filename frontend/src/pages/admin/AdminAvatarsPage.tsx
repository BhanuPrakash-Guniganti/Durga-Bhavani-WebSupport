import React, { useState } from 'react';
import {
  Flower2,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Image as ImageIcon,
  Eye,
  X,
  Upload
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import { BilingualField } from '../../components/admin/BilingualField';
import { TranslationStatusBadge } from '../../components/admin/TranslationStatusBadge';
import type { AvatarRecord, MediaPhoto, LocalizedString } from '../../types';

export const AdminAvatarsPage: React.FC = () => {
  const { avatars, saveAvatar, deleteAvatar, reorderAvatars, addAvatarPhoto, deleteAvatarPhoto } = useData();
  const { canDelete } = useAuth();
  const { currentLang, getLocalized } = useAppLanguage();

  // State for modals
  const [editingAvatar, setEditingAvatar] = useState<AvatarRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [photoManagingAvatar, setPhotoManagingAvatar] = useState<AvatarRecord | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<AvatarRecord | null>(null);

  // New photo form state
  const [newPhotoFileUrl, setNewPhotoFileUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState<LocalizedString>({ en: '', te: '' });
  const [newPhotoAlt, setNewPhotoAlt] = useState<LocalizedString>({ en: '', te: '' });

  const sortedAvatars = [...avatars].sort((a, b) => a.sortOrder - b.sortOrder);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...sortedAvatars];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    // update sortOrder and dayNumber
    const updated = newItems.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1,
      dayNumber: idx + 1
    }));
    reorderAvatars(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === sortedAvatars.length - 1) return;
    const newItems = [...sortedAvatars];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    const updated = newItems.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1,
      dayNumber: idx + 1
    }));
    reorderAvatars(updated);
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingAvatar({
      id: `avatar-2025-${Date.now()}`,
      albumSlug: 'devi-alankaranalu-2025',
      year: 2025,
      dayNumber: sortedAvatars.length + 1,
      name: { en: '', te: '' },
      description: { en: '', te: '' },
      photos: [],
      sortOrder: sortedAvatars.length + 1,
      status: 'published',
      isSample: false
    });
  };

  const handleSaveAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAvatar) return;
    if (!editingAvatar.name.en && !editingAvatar.name.te) {
      alert('Please provide avatar name in at least one language.');
      return;
    }
    saveAvatar(editingAvatar);
    setEditingAvatar(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (!canDelete()) {
      alert('Only Super Administrators are permitted to delete avatar records.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteAvatar(id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPhotoFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoManagingAvatar) return;
    if (!newPhotoFileUrl) {
      alert('Please select or upload an image file first.');
      return;
    }

    const newPhoto: MediaPhoto = {
      id: `p-${Date.now()}`,
      url: newPhotoFileUrl,
      caption: newPhotoCaption,
      altText: newPhotoAlt.en ? newPhotoAlt : { en: getLocalized(photoManagingAvatar.name), te: getLocalized(photoManagingAvatar.name) },
      year: 2025,
      albumSlug: 'devi-alankaranalu-2025',
      isSample: false
    };

    addAvatarPhoto(photoManagingAvatar.id, newPhoto);
    // Update local state in photo managing modal
    setPhotoManagingAvatar({
      ...photoManagingAvatar,
      photos: [...photoManagingAvatar.photos, newPhoto]
    });
    // Reset form
    setNewPhotoFileUrl('');
    setNewPhotoCaption({ en: '', te: '' });
    setNewPhotoAlt({ en: '', te: '' });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="sub-heading">
            {currentLang === 'te' ? 'ఆల్బమ్ 1 నిర్వహణ' : 'Album 1 Management'}
          </span>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flower2 color="var(--color-maroon-primary)" />
            <span>{currentLang === 'te' ? 'అమ్మవారి అలంకరణలు (పది అవతారాలు)' : 'Devi Alankaranalu (Ten Avatars)'}</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {currentLang === 'te'
              ? 'పది రోజుల అమ్మవారి అవతారాల వివరాలు, క్రమం, మరియు బహుళ ఛాయాచిత్రాల నిర్వహణ.'
              : 'Configure the 10 daily avatars, editable day order, bilingual names, and multi-photo uploads.'}
          </p>
        </div>

        <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{currentLang === 'te' ? 'కొత్త అవతారం చేర్చండి' : 'Add New Avatar'}</span>
        </button>
      </div>

      {/* Avatars List Table */}
      <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: '70px' }}>Order</th>
              <th style={{ padding: '12px 14px', width: '90px' }}>Day</th>
              <th style={{ padding: '12px 14px' }}>Telugu Name (తెలుగు)</th>
              <th style={{ padding: '12px 14px' }}>English Name</th>
              <th style={{ padding: '12px 14px', width: '130px' }}>Translation</th>
              <th style={{ padding: '12px 14px', width: '100px' }}>Photos</th>
              <th style={{ padding: '12px 14px', width: '100px' }}>Status</th>
              <th style={{ padding: '12px 14px', width: '220px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAvatars.map((avatar, idx) => (
              <tr key={avatar.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                {/* Reorder Buttons */}
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      style={{
                        padding: '2px 4px',
                        background: idx === 0 ? '#E0E0E0' : 'var(--color-cream-alt)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        cursor: idx === 0 ? 'not-allowed' : 'pointer'
                      }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sortedAvatars.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      style={{
                        padding: '2px 4px',
                        background: idx === sortedAvatars.length - 1 ? '#E0E0E0' : 'var(--color-cream-alt)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '3px',
                        cursor: idx === sortedAvatars.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </td>

                {/* Day Badge */}
                <td style={{ padding: '12px 14px' }}>
                  <span className="badge badge-maroon" style={{ fontSize: '12px' }}>
                    Day {avatar.dayNumber}
                  </span>
                </td>

                {/* Telugu Name */}
                <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-maroon-primary)' }}>
                  {avatar.name.te || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                </td>

                {/* English Name */}
                <td style={{ padding: '12px 14px', fontWeight: 500 }}>
                  {avatar.name.en || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                </td>

                {/* Translation Status */}
                <td style={{ padding: '12px 14px' }}>
                  <TranslationStatusBadge value={avatar.name} />
                </td>

                {/* Photos Count */}
                <td style={{ padding: '12px 14px' }}>
                  <button
                    type="button"
                    onClick={() => setPhotoManagingAvatar(avatar)}
                    className="badge"
                    style={{
                      background: avatar.photos.length > 0 ? 'var(--color-gold-pale)' : '#FFF3E0',
                      border: `1px solid ${avatar.photos.length > 0 ? 'var(--color-gold-primary)' : 'var(--color-warning)'}`,
                      color: avatar.photos.length > 0 ? 'var(--color-gold-dark)' : 'var(--color-warning)',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Click to view/upload photos"
                  >
                    <ImageIcon size={12} />
                    <span>{avatar.photos.length} Photos</span>
                  </button>
                </td>

                {/* Status */}
                <td style={{ padding: '12px 14px' }}>
                  <span
                    className="badge"
                    style={{
                      background: avatar.status === 'published' ? 'var(--color-success-bg)' : '#FFF3E0',
                      color: avatar.status === 'published' ? 'var(--color-success)' : 'var(--color-warning)',
                      fontSize: '11px'
                    }}
                  >
                    {avatar.status}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setPreviewAvatar(avatar)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Preview card"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNew(false);
                        setEditingAvatar({ ...avatar });
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Edit avatar details"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(avatar.id, avatar.name.en || avatar.name.te)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px', color: 'var(--color-danger)' }}
                      title="Delete avatar"
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

      {/* Modal: Edit / Add Avatar */}
      {editingAvatar && (
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
                {isNew ? 'Add Devi Avatar' : `Edit Day ${editingAvatar.dayNumber} Avatar`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingAvatar(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAvatar}>
              {/* Day Number */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Festival Day Number (1 - 10) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={editingAvatar.dayNumber}
                  onChange={(e) =>
                    setEditingAvatar({
                      ...editingAvatar,
                      dayNumber: parseInt(e.target.value, 10) || 1
                    })
                  }
                  required
                  style={{ width: '120px', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
              </div>

              {/* Avatar Name */}
              <BilingualField
                label="Avatar Name (అవతారం పేరు)"
                value={editingAvatar.name}
                onChange={(newName) =>
                  setEditingAvatar({
                    ...editingAvatar,
                    name: newName
                  })
                }
                placeholderEn="e.g. Sri Bala Tripura Sundari Devi"
                placeholderTe="ఉదా: శ్రీ బాలా త్రిపుర సుందరీ దేవి"
                required
              />

              {/* Avatar Description */}
              <BilingualField
                label="Significance & Alankaram Description (అవతార విశిష్టత)"
                value={editingAvatar.description || { en: '', te: '' }}
                onChange={(newDesc) =>
                  setEditingAvatar({
                    ...editingAvatar,
                    description: newDesc
                  })
                }
                as="textarea"
                rows={3}
                placeholderEn="Enter divine significance..."
                placeholderTe="అవతార విశిష్టతను నమోదు చేయండి..."
              />

              {/* Status */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Publication Status
                </label>
                <select
                  value={editingAvatar.status}
                  onChange={(e) =>
                    setEditingAvatar({
                      ...editingAvatar,
                      status: e.target.value as AvatarRecord['status']
                    })
                  }
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)', background: '#FFF' }}
                >
                  <option value="published">Published (Visible on Public Site)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingAvatar(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Avatar Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage Avatar Photos */}
      {photoManagingAvatar && (
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
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'var(--space-8)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)' }}>
                  Manage Photographs: {getLocalized(photoManagingAvatar.name)}
                </h2>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Day {photoManagingAvatar.dayNumber} · {photoManagingAvatar.photos.length} Photos Uploaded
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPhotoManagingAvatar(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Existing Photos List */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-3)' }}>
                Current Avatar Photos
              </h3>

              {photoManagingAvatar.photos.length === 0 ? (
                <div
                  style={{
                    padding: 'var(--space-6)',
                    background: 'var(--color-cream-alt)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    border: '1px dashed var(--color-border-medium)'
                  }}
                >
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                    No photos uploaded yet for this avatar. Use the upload form below to add photographs with bilingual captions and alt text.
                  </p>
                </div>
              ) : (
                <div className="grid-3" style={{ gap: '12px' }}>
                  {photoManagingAvatar.photos.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        background: '#FFF'
                      }}
                    >
                      <img
                        src={p.url}
                        alt={getLocalized(p.altText)}
                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '8px' }}>
                        <p style={{ margin: '0 0 6px 0', fontSize: '11px', fontWeight: 600 }}>
                          {getLocalized(p.caption) || 'No caption'}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            deleteAvatarPhoto(photoManagingAvatar.id, p.id);
                            setPhotoManagingAvatar({
                              ...photoManagingAvatar,
                              photos: photoManagingAvatar.photos.filter((photo) => photo.id !== p.id)
                            });
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{
                            width: '100%',
                            color: 'var(--color-danger)',
                            padding: '3px 6px',
                            fontSize: '11px',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload New Photo Form */}
            <div style={{ borderTop: '2px solid var(--color-border-subtle)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Upload size={18} color="var(--color-maroon-primary)" />
                <span>Upload New Photo</span>
              </h3>

              <form onSubmit={handleAddPhotoSubmit}>
                {/* File picker */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                    Select Image File (JPG, PNG, WebP) *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'block', fontSize: 'var(--font-size-sm)' }}
                  />
                  {newPhotoFileUrl && (
                    <div style={{ marginTop: '8px', maxWidth: '160px' }}>
                      <img
                        src={newPhotoFileUrl}
                        alt="Preview"
                        style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}
                      />
                    </div>
                  )}
                </div>

                {/* Bilingual Caption */}
                <BilingualField
                  label="Photo Caption (శీర్షిక)"
                  value={newPhotoCaption}
                  onChange={setNewPhotoCaption}
                  placeholderEn="e.g. Goddess adorned with golden necklace"
                  placeholderTe="ఉదా: స్వర్ణాభరణాలతో దివ్య దర్శనం"
                />

                {/* Bilingual Alt Text */}
                <BilingualField
                  label="Accessibility Alt Text (దృశ్య వివరణ)"
                  value={newPhotoAlt}
                  onChange={setNewPhotoAlt}
                  placeholderEn="e.g. Alankaram of Sri Bala Tripura Sundari Devi"
                  placeholderTe="ఉదా: శ్రీ బాలా త్రిపుర సుందరీ దేవి దివ్య అలంకారం"
                  helpText="Required for screen-readers and web accessibility in both English and Telugu."
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: 'var(--space-4)' }}>
                  <button
                    type="button"
                    onClick={() => setPhotoManagingAvatar(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Done
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Upload & Attach Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Preview Avatar Card */}
      {previewAvatar && (
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
              maxWidth: '440px',
              width: '100%',
              padding: 'var(--space-6)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <span className="badge badge-gold">Public Card Live Preview</span>
              <button
                type="button"
                onClick={() => setPreviewAvatar(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Card preview representation */}
            <div className="card card-cultural-top" style={{ overflow: 'hidden' }}>
              <div
                style={{
                  height: '180px',
                  background: 'var(--color-cream-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--color-border-subtle)'
                }}
              >
                {previewAvatar.photos.length > 0 ? (
                  <img
                    src={previewAvatar.photos[0].url}
                    alt={getLocalized(previewAvatar.photos[0].altText)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <Flower2 size={36} color="var(--color-maroon-primary)" />
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      Photo upload pending
                    </p>
                  </div>
                )}
              </div>

              <div style={{ padding: 'var(--space-4)' }}>
                <span className="badge badge-maroon" style={{ fontSize: '11px', marginBottom: '6px' }}>
                  Day {previewAvatar.dayNumber}
                </span>
                <h3 style={{ margin: '4px 0 2px 0', fontSize: 'var(--font-size-lg)', color: 'var(--color-maroon-primary)' }}>
                  {previewAvatar.name.te}
                </h3>
                <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {previewAvatar.name.en}
                </h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {getLocalized(previewAvatar.description)}
                </p>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setPreviewAvatar(null)}
                className="btn btn-secondary btn-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
