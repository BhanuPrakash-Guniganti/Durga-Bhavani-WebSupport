import React, { useState } from 'react';
import {
  HeartHandshake,
  Plus,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useAppLanguage } from '../../i18n';
import { BilingualField } from '../../components/admin/BilingualField';
import { formatRupees, type DonorRecord } from '../../types';

export const AdminDonorsPage: React.FC = () => {
  const { donors, saveDonor, deleteDonor } = useData();
  const { canDelete } = useAuth();
  const { currentLang, getLocalized } = useAppLanguage();

  const [editingDonor, setEditingDonor] = useState<DonorRecord | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingDonor({
      id: `donor-2025-${Date.now()}`,
      albumSlug: 'donors-and-sponsors-2025',
      year: 2025,
      name: { en: '', te: '' },
      contributionType: { en: '', te: '' },
      amount: undefined,
      photoOrLogoUrl: '',
      notes: { en: '', te: '' },
      status: 'published',
      sortOrder: donors.length + 1,
      isSample: false
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDonor) return;
    if (!editingDonor.name.en && !editingDonor.name.te) {
      alert('Please provide donor or sponsor name in at least one language.');
      return;
    }
    saveDonor(editingDonor);
    setEditingDonor(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (!canDelete()) {
      alert('Only Super Administrators are permitted to delete donor records.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete donor record "${name}"?`)) {
      deleteDonor(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="sub-heading">
            {currentLang === 'te' ? 'ఆల్బమ్ 3 నిర్వహణ' : 'Album 3 Management'}
          </span>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HeartHandshake color="var(--color-saffron-primary)" />
            <span>{currentLang === 'te' ? 'దాతలు మరియు స్పాన్సర్లు (2025)' : 'Donors & Sponsors (2025)'}</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {currentLang === 'te'
              ? '2025 ఉత్సవాలకు దాతలు, పోషకులు మరియు స్పాన్సర్ల వివరాలను ఇక్కడ నిర్వహించండి. (ధృవీకరించిన రికార్డులను మాత్రమే చేర్చండి).'
              : 'Manage patrons, donors, and sponsors supporting the 2025 celebrations with bilingual names and optional contribution amounts.'}
          </p>
        </div>

        <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{currentLang === 'te' ? 'కొత్త దాతను చేర్చండి' : 'Add Donor / Sponsor'}</span>
        </button>
      </div>

      {/* Donors List or Empty State */}
      {donors.length === 0 ? (
        <div
          className="card"
          style={{
            padding: 'var(--space-10)',
            textAlign: 'center',
            background: 'var(--color-cream-alt)',
            border: '2px dashed var(--color-border-medium)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-gold-pale)',
              color: 'var(--color-gold-dark)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}
          >
            <HeartHandshake size={28} />
          </div>
          <h2 style={{ fontSize: 'var(--font-size-lg)', margin: '0 0 8px 0', color: 'var(--color-text-primary)' }}>
            {currentLang === 'te' ? 'దాతల రికార్డులు ఇంకా చేర్చబడలేదు' : 'No Donor Records Added Yet'}
          </h2>
          <p style={{ margin: '0 0 var(--space-4) 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto' }}>
            {currentLang === 'te'
              ? 'నిర్వాహక కమిటీ నుండి అధికారిక దాతలు మరియు స్పాన్సర్ల వివరాలు అందిన తర్వాత ఇక్కడ నమోదు చేయవచ్చు. నియమావళి ప్రకారం నకిలీ పేర్లు లేదా కల్పిత మొత్తాలు సృష్టించబడవు.'
              : 'Official donor and sponsor details will be entered here when supplied by the organizing committee. As required, no placeholder or fabricated sponsor records are pre-created.'}
          </p>
          <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>{currentLang === 'te' ? 'మొదటి దాత రికార్డు చేర్చండి' : 'Add First Donor Record'}</span>
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: 'var(--space-6)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--color-cream-alt)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '12px 14px', width: '50px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Donor / Organization</th>
                <th style={{ padding: '12px 14px' }}>Contribution Type</th>
                <th style={{ padding: '12px 14px', width: '140px' }}>Amount</th>
                <th style={{ padding: '12px 14px', width: '120px' }}>Status</th>
                <th style={{ padding: '12px 14px', width: '140px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, idx) => (
                <tr key={donor.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '12px 14px', color: 'var(--color-text-muted)' }}>{idx + 1}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600 }}>{donor.name.te || donor.name.en}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{donor.name.en}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                      {getLocalized(donor.contributionType) || 'General Seva'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-maroon-primary)' }}>
                    {donor.amount !== undefined ? formatRupees(donor.amount) : '—'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      className="badge"
                      style={{
                        background: donor.status === 'published' ? 'var(--color-success-bg)' : '#FFF3E0',
                        color: donor.status === 'published' ? 'var(--color-success)' : 'var(--color-warning)',
                        fontSize: '11px'
                      }}
                    >
                      {donor.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsNew(false);
                          setEditingDonor({ ...donor });
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(donor.id, donor.name.en || donor.name.te)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', color: 'var(--color-danger)' }}
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
      )}

      {/* Modal: Add / Edit Donor */}
      {editingDonor && (
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
                {isNew ? 'Add Donor / Sponsor' : `Edit: ${editingDonor.name.en || editingDonor.name.te}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingDonor(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* Donor Name */}
              <BilingualField
                label="Person or Organization Name (పేరు / సంస్థ)"
                value={editingDonor.name}
                onChange={(newName) =>
                  setEditingDonor({
                    ...editingDonor,
                    name: newName
                  })
                }
                placeholderEn="e.g. Sri Ramesh Rao or Dodlapahad Youth Welfare Association"
                placeholderTe="ఉదా: శ్రీ రమేష్ రావు లేదా దొడ్లపహాడ్ యువజన సంఘం"
                required
              />

              {/* Contribution Type */}
              <BilingualField
                label="Contribution Type / Seva Category (సహకార రూపం)"
                value={editingDonor.contributionType}
                onChange={(newType) =>
                  setEditingDonor({
                    ...editingDonor,
                    contributionType: newType
                  })
                }
                placeholderEn="e.g. Maha Annadanam Sponsor, Alankaram Seva, Stage & Lighting Sponsor"
                placeholderTe="ఉదా: మహా అన్నదాన పోషకులు, అలంకార సేవ, విద్యుత్ దీపాలంకరణ స్పాన్సర్"
              />

              {/* Amount */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Optional Contribution Amount (సమర్పణ మొత్తం - ₹)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={editingDonor.amount !== undefined ? editingDonor.amount : ''}
                  onChange={(e) =>
                    setEditingDonor({
                      ...editingDonor,
                      amount: e.target.value === '' ? undefined : parseInt(e.target.value, 10)
                    })
                  }
                  placeholder="e.g. 10000 (Optional, leave blank if anonymous or in-kind seva)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
                {editingDonor.amount !== undefined && (
                  <div style={{ marginTop: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-success)' }}>
                    Display Format: {formatRupees(editingDonor.amount)}
                  </div>
                )}
              </div>

              {/* Photo/Logo URL */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Optional Photo or Logo URL
                </label>
                <input
                  type="url"
                  value={editingDonor.photoOrLogoUrl || ''}
                  onChange={(e) =>
                    setEditingDonor({
                      ...editingDonor,
                      photoOrLogoUrl: e.target.value
                    })
                  }
                  placeholder="https://... (Optional)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-medium)' }}
                />
              </div>

              {/* Status */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '6px' }}>
                  Publication Status
                </label>
                <select
                  value={editingDonor.status}
                  onChange={(e) =>
                    setEditingDonor({
                      ...editingDonor,
                      status: e.target.value as DonorRecord['status']
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
                  onClick={() => setEditingDonor(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Donor Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
