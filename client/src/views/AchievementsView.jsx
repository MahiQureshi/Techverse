import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ShieldCheck, Clock, AlertCircle, 
  XCircle, ExternalLink, Calendar, Trash2, CheckCircle2, 
  Tag, FileText, ChevronRight, Layers, ArrowUpDown
} from 'lucide-react';

export default function AchievementsView({ achievements, onNavigate, onDelete, onRequestVerify, isDark }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [activeModalAch, setActiveModalAch] = useState(null);

  const categories = [
    'All',
    'Certifications',
    'Projects',
    'Academic achievements',
    'Hackathons and Competitions',
    'Internships and experience',
    'Leadership and volunteering',
    'Research and publications'
  ];

  const statuses = ['All', 'Verified', 'Pending', 'Unverified', 'Rejected'];

  // Filter & sort
  let filtered = achievements?.filter(ach => {
    const matchesCat = selectedCategory === 'All' || ach.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || ach.status.toLowerCase() === selectedStatus.toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || (
      ach.title.toLowerCase().includes(q) ||
      ach.issuer.toLowerCase().includes(q) ||
      (ach.skills && ach.skills.some(s => s.toLowerCase().includes(q)))
    );
    return matchesCat && matchesStatus && matchesSearch;
  }) || [];

  if (sortBy === 'oldest') {
    filtered.sort((a, b) => new Date(a.dateEarned) - new Date(b.dateEarned));
  } else if (sortBy === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered.sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned));
  }

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* HEADER & TOP BAR */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>My Achievements</h1>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
            Consolidated repository of academic marks, certifications, hackathon awards, and production projects.
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={() => onNavigate('add-achievement')}
          style={{ padding: '12px 22px' }}
        >
          <Plus size={18} /> Add New Achievement
        </button>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="glass-panel" style={{ padding: '18px 22px', marginBottom: '25px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '14px',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Search title, issuer, skill..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px 10px 36px', 
                borderRadius: '10px', 
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#1E293B',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Category filter */}
          <div>
            <select 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '10px', 
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#1E293B',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select 
              value={selectedStatus} 
              onChange={e => setSelectedStatus(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '10px', 
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#1E293B',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              {statuses.map(st => (
                <option key={st} value={st} style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>
                  {st === 'All' ? 'All Verification Statuses' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '10px', 
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                color: isDark ? '#FFFFFF' : '#1E293B',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="newest" style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>Date: Newest First</option>
              <option value="oldest" style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>Date: Oldest First</option>
              <option value="title" style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>Title: A to Z</option>
            </select>
          </div>
        </div>

        {/* Counter strip */}
        <div style={{ marginTop: '14px', fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', display: 'flex', gap: '15px' }}>
          <span>Showing <strong>{filtered.length}</strong> of {achievements?.length} achievements</span>
        </div>
      </div>

      {/* ACHIEVEMENTS GRID */}
      {filtered.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <AlertCircle size={40} style={{ color: '#38BDF8', margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No achievements match your filters</h3>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px', marginBottom: '20px' }}>
            Try adjusting your search criteria or add a new record to your passport.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => onNavigate('add-achievement')}
          >
            <Plus size={16} /> Add Achievement
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
          {filtered.map(ach => (
            <div 
              key={ach.id} 
              className="glass-panel hover-lift" 
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* TOP META ROW */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: '#38BDF8', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em' 
                  }}>
                    {ach.category}
                  </span>
                  
                  <span className={`badge-status ${ach.status.toLowerCase()}`}>
                    {ach.status === 'Verified' && <ShieldCheck size={12} />}
                    {ach.status === 'Pending' && <Clock size={12} />}
                    {ach.status === 'Unverified' && <AlertCircle size={12} />}
                    {ach.status === 'Rejected' && <XCircle size={12} />}
                    {ach.status}
                  </span>
                </div>

                {/* TITLE & ISSUER */}
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.35 }}>
                  {ach.title}
                </h3>
                
                <div style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569', marginBottom: '10px' }}>
                  <strong>{ach.issuer}</strong> • {ach.dateEarned}
                </div>

                <p style={{ 
                  fontSize: '13px', 
                  color: isDark ? '#94A3B8' : '#64748B', 
                  lineHeight: 1.5, 
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {ach.description}
                </p>

                {/* SKILLS TAGS */}
                {ach.skills && ach.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {ach.skills.map(skill => (
                      <span 
                        key={skill} 
                        style={{ 
                          fontSize: '11px', 
                          padding: '3px 8px', 
                          borderRadius: '6px', 
                          background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(224, 242, 254, 0.8)',
                          color: '#0284C7',
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CARD FOOTER */}
              <div style={{ 
                borderTop: isDark ? '1px solid rgba(125, 185, 235, 0.1)' : '1px solid #E2E8F0', 
                paddingTop: '14px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <button 
                  onClick={() => setActiveModalAch(ach)}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#38BDF8', 
                    fontWeight: 600, 
                    fontSize: '13px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  View Details & Audit <ChevronRight size={14} />
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {ach.status === 'Unverified' && (
                    <button 
                      onClick={() => onRequestVerify(ach.id)}
                      title="Submit for Institutional Review"
                      style={{ 
                        padding: '6px 10px', 
                        borderRadius: '8px', 
                        background: 'rgba(245, 158, 11, 0.15)', 
                        border: '1px solid rgba(245, 158, 11, 0.3)', 
                        color: '#F59E0B',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Request Verification
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(ach.id)}
                    title="Delete record"
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: isDark ? '#64748B' : '#94A3B8', 
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL AUDIT MODAL */}
      {activeModalAch && (
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
          <div className="glass-panel" style={{ 
            maxWidth: '600px', 
            width: '100%', 
            padding: '32px', 
            maxHeight: '90vh', 
            overflowY: 'auto' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                  {activeModalAch.category}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px' }}>{activeModalAch.title}</h2>
              </div>
              <button 
                onClick={() => setActiveModalAch(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <span className={`badge-status ${activeModalAch.status.toLowerCase()}`}>
                {activeModalAch.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', marginBottom: '24px' }}>
              <div><strong>Issuing Organization:</strong> {activeModalAch.issuer}</div>
              <div><strong>Date Conferred:</strong> {activeModalAch.dateEarned}</div>
              <div><strong>Credential Registry ID:</strong> <code style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>{activeModalAch.credentialId || 'N/A'}</code></div>
              <div><strong>Description:</strong> {activeModalAch.description}</div>
              {activeModalAch.contributionRole && (
                <div><strong>Individual Contribution:</strong> {activeModalAch.contributionRole}</div>
              )}
              {activeModalAch.credentialUrl && (
                <div>
                  <strong>Official Verification URL:</strong>{' '}
                  <a href={activeModalAch.credentialUrl} target="_blank" rel="noreferrer" style={{ color: '#38BDF8' }}>
                    {activeModalAch.credentialUrl} <ExternalLink size={12} style={{ display: 'inline' }} />
                  </a>
                </div>
              )}
              {activeModalAch.demoUrl && (
                <div>
                  <strong>Live Production URL:</strong>{' '}
                  <a href={activeModalAch.demoUrl} target="_blank" rel="noreferrer" style={{ color: '#2DD4BF' }}>
                    {activeModalAch.demoUrl} <ExternalLink size={12} style={{ display: 'inline' }} />
                  </a>
                </div>
              )}
              
              <div style={{ 
                padding: '14px', 
                borderRadius: '12px', 
                background: isDark ? 'rgba(11, 31, 58, 0.7)' : 'rgba(241, 245, 249, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.2)' 
              }}>
                <div style={{ fontWeight: 700, color: '#38BDF8', marginBottom: '6px' }}>Verification Audit Trail</div>
                <div><strong>Method:</strong> {activeModalAch.verificationMethod}</div>
                {activeModalAch.verifiedBy && <div><strong>Audited By:</strong> {activeModalAch.verifiedBy}</div>}
                {activeModalAch.verifiedAt && <div><strong>Audit Timestamp:</strong> {activeModalAch.verifiedAt}</div>}
                <div><strong>Evidence Attached:</strong> {activeModalAch.evidence}</div>
              </div>
            </div>

            <button 
              className="btn-secondary" 
              onClick={() => setActiveModalAch(null)}
              style={{ width: '100%' }}
            >
              Close Record Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
