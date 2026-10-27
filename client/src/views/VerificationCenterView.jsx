import React, { useState } from 'react';
import { 
  ShieldCheck, Clock, CheckCircle2, AlertTriangle, 
  HelpCircle, ArrowRight, RotateCcw, ExternalLink, FileText
} from 'lucide-react';

export default function VerificationCenterView({ achievements, onRequestVerify, onNavigate, isDark }) {
  const [activeTab, setActiveTab] = useState('all');
  const [reconsiderationId, setReconsiderationId] = useState(null);
  const [appealNote, setAppealNote] = useState('');

  const verified = achievements?.filter(a => a.status === 'Verified') || [];
  const pending = achievements?.filter(a => a.status === 'Pending') || [];
  const unverified = achievements?.filter(a => a.status === 'Unverified') || [];
  const rejected = achievements?.filter(a => a.status === 'Rejected') || [];

  const handleAppealSubmit = (id) => {
    if (!appealNote) {
      alert("Please enter the updated details or clarification for reconsideration.");
      return;
    }
    onRequestVerify(id, { reconsideration: true, appealNote });
    setReconsiderationId(null);
    setAppealNote('');
  };

  const getList = () => {
    if (activeTab === 'verified') return verified;
    if (activeTab === 'pending') return pending;
    if (activeTab === 'unverified') return unverified;
    if (activeTab === 'rejected') return rejected;
    return achievements || [];
  };

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Verification Center</h1>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
          Follow your credentials through institutional auditing, credential registry verification, and dispute resolution.
        </p>
      </div>

      {/* STATUS EXPLANATION BANNER */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: '#38BDF8' }}>
          Understanding Verification Statuses
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            background: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(236, 253, 245, 0.8)',
            border: '1px solid rgba(16, 185, 129, 0.25)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#10B981', fontSize: '13px', marginBottom: '4px' }}>
              <ShieldCheck size={16} /> Verified ({verified.length})
            </div>
            <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#475569' }}>
              Checked & authorized by college dean, hackathon jury, or official issuer registry.
            </p>
          </div>

          <div style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            background: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(254, 243, 199, 0.8)',
            border: '1px solid rgba(245, 158, 11, 0.25)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#F59E0B', fontSize: '13px', marginBottom: '4px' }}>
              <Clock size={16} /> Pending ({pending.length})
            </div>
            <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#475569' }}>
              Submitted to institutional review queue. Awaiting reviewer audit.
            </p>
          </div>

          <div style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            background: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(241, 245, 249, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.25)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>
              <AlertTriangle size={16} /> Unverified ({unverified.length})
            </div>
            <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#475569' }}>
              Self-reported record without verified institutional backing.
            </p>
          </div>

          <div style={{ 
            padding: '14px', 
            borderRadius: '12px', 
            background: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(254, 242, 242, 0.8)',
            border: '1px solid rgba(239, 68, 68, 0.25)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#EF4444', fontSize: '13px', marginBottom: '4px' }}>
              <RotateCcw size={16} /> Rejected ({rejected.length})
            </div>
            <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#475569' }}>
              Evidence insufficient or mismatch. Eligible for dispute reconsideration.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', borderBottom: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid #E2E8F0', paddingBottom: '12px', flexWrap: 'wrap' }}>
        {['all', 'verified', 'pending', 'unverified', 'rejected'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '10px', 
              border: activeTab === tab ? '1px solid #38BDF8' : 'none', 
              background: activeTab === tab ? (isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(224, 242, 254, 0.9)') : 'transparent',
              color: activeTab === tab ? '#38BDF8' : (isDark ? '#94A3B8' : '#64748B'),
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LIST OF VERIFICATION RECORDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {getList().map(ach => (
          <div key={ach.id} className="glass-panel hover-lift" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                  {ach.category}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{ach.title}</h3>
                <div style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569' }}>
                  {ach.issuer} • Conferred: {ach.dateEarned}
                </div>
              </div>

              <span className={`badge-status ${ach.status.toLowerCase()}`}>
                {ach.status === 'Verified' && <ShieldCheck size={14} />}
                {ach.status === 'Pending' && <Clock size={14} />}
                {ach.status}
              </span>
            </div>

            {/* AUDIT DETAILS */}
            <div style={{ 
              padding: '14px 18px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.8)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '14px'
            }}>
              <div><strong>Verification Method:</strong> {ach.verificationMethod}</div>
              {ach.verifiedBy && <div><strong>Audited By:</strong> {ach.verifiedBy} on {ach.verifiedAt}</div>}
              <div><strong>Evidence Attached:</strong> {ach.evidence}</div>
              {ach.credentialId && (
                <div><strong>Credential Registry ID:</strong> <code style={{ color: '#38BDF8' }}>{ach.credentialId}</code></div>
              )}
            </div>

            {/* ACTION ROW */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                Completeness: {ach.evidenceCompleteness || 5}/5 fields verified
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {ach.status === 'Unverified' && (
                  <button 
                    className="btn-primary" 
                    onClick={() => onRequestVerify(ach.id)}
                    style={{ fontSize: '12px', padding: '8px 16px' }}
                  >
                    Submit for Institutional Review
                  </button>
                )}

                {ach.status === 'Rejected' && (
                  <button 
                    onClick={() => setReconsiderationId(ach.id)}
                    style={{ 
                      padding: '8px 16px', 
                      borderRadius: '10px', 
                      background: 'rgba(239, 68, 68, 0.15)', 
                      color: '#EF4444', 
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <RotateCcw size={14} /> Request Reconsideration Appeal
                  </button>
                )}

                {ach.status === 'Pending' && (
                  <span style={{ fontSize: '12px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> In Review Queue (Campus Oversight)
                  </span>
                )}
              </div>
            </div>

            {/* RECONSIDERATION FORM IF ACTIVE */}
            {reconsiderationId === ach.id && (
              <div style={{ 
                marginTop: '16px', 
                padding: '16px', 
                borderRadius: '12px', 
                background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#FFFFFF',
                border: '1px solid #38BDF8' 
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#38BDF8' }}>
                  Dispute & Reconsideration Mechanism
                </h4>
                <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '10px' }}>
                  Explain the correction (e.g. corrected certificate ID, updated registry link, or attached registrar endorsement).
                </p>
                <textarea 
                  rows="2" 
                  value={appealNote}
                  onChange={e => setAppealNote(e.target.value)}
                  placeholder="Provide updated credential proof or explain reviewer error..."
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '8px', 
                    border: '1px solid #CBD5E1', 
                    background: isDark ? '#0B1F3A' : '#FFF',
                    color: isDark ? '#FFF' : '#000',
                    fontSize: '13px',
                    marginBottom: '10px'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-primary" 
                    onClick={() => handleAppealSubmit(ach.id)}
                    style={{ fontSize: '12px', padding: '6px 14px' }}
                  >
                    Submit Appeal to Reviewer
                  </button>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setReconsiderationId(null)}
                    style={{ fontSize: '12px', padding: '6px 14px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
