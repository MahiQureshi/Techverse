import React, { useState } from 'react';
import { 
  Share2, QrCode, Copy, Eye, Lock, ShieldCheck, 
  ExternalLink, Trash2, Plus, Sparkles, Check, Clock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function PassportsView({ passports, achievements, onCreatePassport, onRevokePassport, onNavigate, isDark }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [activeQrSlug, setActiveQrSlug] = useState(null);

  // New passport form state
  const [newTitle, setNewTitle] = useState('');
  const [newPurpose, setNewPurpose] = useState('AI & Machine Learning Software Internship');
  const [newSlug, setNewSlug] = useState('');
  const [newTheme, setNewTheme] = useState('sky-glass');
  const [selectedAchIds, setSelectedAchIds] = useState(achievements?.map(a => a.id) || []);

  const handleCopyLink = (slug) => {
    const fullUrl = `${window.location.origin}/#passport/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleToggleAch = (id) => {
    if (selectedAchIds.includes(id)) {
      setSelectedAchIds(selectedAchIds.filter(i => i !== id));
    } else {
      setSelectedAchIds([...selectedAchIds, id]);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle) {
      alert("Please provide a title for your custom passport.");
      return;
    }
    const slug = newSlug.trim() || ('p-' + Math.random().toString(36).substring(2, 7));
    onCreatePassport({
      title: newTitle,
      targetPurpose: newPurpose,
      shareSlug: slug,
      theme: newTheme,
      visibility: 'Public',
      selectedAchievements: selectedAchIds
    });
    setShowCreateModal(false);
    setNewTitle('');
    setNewSlug('');
  };

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Shareable Digital Passports</h1>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
            Generate custom views of your records tailored for internship recruiters, scholarship boards, or hackathons.
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={() => setShowCreateModal(true)}
          style={{ padding: '12px 22px' }}
        >
          <Plus size={18} /> Create Opportunity Passport
        </button>
      </div>

      {/* PRIVACY & ZERO-KNOWLEDGE PRINCIPLE BANNER */}
      <div className="glass-panel" style={{ padding: '22px 26px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '42px', height: '42px', borderRadius: '12px', 
          background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Lock size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#38BDF8', marginBottom: '2px' }}>
            Selective Disclosure & Privacy Control
          </h4>
          <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>
            Shared links never expose private student phone numbers, residential addresses, or internal mark sheets. You decide exactly which achievements each link reveals, and you can revoke access anytime.
          </p>
        </div>
      </div>

      {/* PASSPORTS LIST */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {passports?.map(p => {
          const shareUrl = `${window.location.origin}/#passport/${p.shareSlug}`;
          const isCopied = copiedSlug === p.shareSlug;

          return (
            <div key={p.id} className="glass-panel hover-lift" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: '#2DD4BF', 
                    background: 'rgba(45, 212, 191, 0.12)', 
                    padding: '4px 10px', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(45, 212, 191, 0.25)' 
                  }}>
                    {p.targetPurpose}
                  </span>
                  
                  <span style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 600 }}>
                    {p.viewsCount || 0} audits
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{p.title}</h3>

                <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '16px' }}>
                  Contains <strong>{p.selectedAchievements?.length || 0} selected verified credentials</strong> • Theme: {p.theme}
                </p>

                {/* SHARE URL BOX */}
                <div style={{ 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  background: isDark ? 'rgba(11, 31, 58, 0.7)' : 'rgba(241, 245, 249, 0.8)',
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(203, 213, 225, 0.8)',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#38BDF8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                    /passport/{p.shareSlug}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleCopyLink(p.shareSlug)}
                      title="Copy Public Link"
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer', 
                        color: isCopied ? '#10B981' : '#38BDF8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />} {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                    <button 
                      onClick={() => setActiveQrSlug(activeQrSlug === p.shareSlug ? null : p.shareSlug)}
                      title="Show QR Code"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2DD4BF' }}
                    >
                      <QrCode size={16} />
                    </button>
                  </div>
                </div>

                {/* QR CODE POPUP */}
                {activeQrSlug === p.shareSlug && (
                  <div style={{ 
                    padding: '16px', 
                    borderRadius: '12px', 
                    background: '#FFFFFF', 
                    textAlign: 'center', 
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <QRCodeSVG value={shareUrl} size={150} level="H" />
                    <div style={{ fontSize: '11px', color: '#0B1F3A', fontWeight: 600 }}>
                      Scan with any smartphone camera to open passport
                    </div>
                  </div>
                )}
              </div>

              {/* CARD ACTIONS */}
              <div style={{ borderTop: isDark ? '1px solid rgba(125, 185, 235, 0.1)' : '1px solid #E2E8F0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a 
                  href={`#passport/${p.shareSlug}`}
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    color: '#38BDF8', 
                    textDecoration: 'none', 
                    fontWeight: 600, 
                    fontSize: '13px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}
                >
                  <Eye size={14} /> Preview Live View <ExternalLink size={12} />
                </a>

                <button 
                  onClick={() => onRevokePassport(p.id)}
                  title="Revoke access link"
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#EF4444', 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trash2 size={14} /> Revoke Link
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE OPPORTUNITY PASSPORT MODAL */}
      {showCreateModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0, 0, 0, 0.65)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '640px', width: '100%', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Create Tailored Opportunity Passport</h2>
                <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Select specific records to include in this shareable link.
                </p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Passport Title *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Aarav Sharma - Deep Learning Research Dossier"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', background: isDark ? '#0B1F3A' : '#FFF', color: isDark ? '#FFF' : '#000', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Application Target Purpose
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. AI Internship, Scholarship, Hackathon"
                  value={newPurpose}
                  onChange={e => setNewPurpose(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', background: isDark ? '#0B1F3A' : '#FFF', color: isDark ? '#FFF' : '#000', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Custom Share Slug (optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. aarav-google-intern"
                    value={newSlug}
                    onChange={e => setNewSlug(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', background: isDark ? '#0B1F3A' : '#FFF', color: isDark ? '#FFF' : '#000', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Visual Style Theme
                  </label>
                  <select 
                    value={newTheme}
                    onChange={e => setNewTheme(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #CBD5E1', background: isDark ? '#0B1F3A' : '#FFF', color: isDark ? '#FFF' : '#000', fontSize: '13px' }}
                  >
                    <option value="sky-glass">Sky Glass (Blue & Navy)</option>
                    <option value="midnight-navy">Midnight Navy (Dark)</option>
                    <option value="minimal-clean">Clean Academic White</option>
                  </select>
                </div>
              </div>

              {/* ACHIEVEMENTS SELECTOR */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Select Achievements to Include ({selectedAchIds.length} selected)
                </label>
                <div style={{ maxHeight: '180px', overflowY: 'auto', border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1', borderRadius: '10px', padding: '10px' }}>
                  {achievements?.map(a => (
                    <div 
                      key={a.id} 
                      onClick={() => handleToggleAch(a.id)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '6px 8px', 
                        cursor: 'pointer',
                        borderRadius: '6px',
                        background: selectedAchIds.includes(a.id) ? (isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(224, 242, 254, 0.8)') : 'transparent' 
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedAchIds.includes(a.id)}
                        onChange={() => {}}
                        style={{ accentColor: '#0EA5E9' }}
                      />
                      <span style={{ fontSize: '13px', flex: 1 }}>{a.title}</span>
                      <span className={`badge-status ${a.status.toLowerCase()}`} style={{ fontSize: '10px' }}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
                  Generate Share Link & QR Code
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
