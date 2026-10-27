import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Clock, CheckCircle2, XCircle, 
  Search, ExternalLink, Filter, AlertCircle, FileText, UserCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function ReviewerView({ onNavigate, isDark }) {
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReviewItem, setActiveReviewItem] = useState(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [reviewerName, setReviewerName] = useState('Dr. Sunita Raman');
  const [reviewerRole, setReviewerRole] = useState('Dean of Academic Affairs');

  const loadData = async () => {
    setLoading(true);
    try {
      const q = await api.getReviewerQueue();
      const h = await api.getReviewHistory();
      setQueue(q);
      setHistory(h);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDecision = async (decision) => {
    if (!activeReviewItem) return;
    try {
      await api.submitReviewDecision({
        queueId: activeReviewItem.id,
        achievementId: activeReviewItem.achievementId,
        decision,
        reviewerName,
        reviewerRole,
        notes: decisionNotes,
        method: decision === 'Approved' ? 'Institutional Review Board Audit & Credential Match' : 'Evidence Insufficient'
      });
      setActiveReviewItem(null);
      setDecisionNotes('');
      await loadData();
    } catch (e) {
      alert("Error submitting decision: " + e.message);
    }
  };

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* REVIEWER HEADER */}
      <div className="glass-panel" style={{ 
        padding: '28px 32px', 
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
            <ShieldCheck size={16} /> INSTITUTIONAL CREDENTIAL AUDIT & VERIFICATION BOARD
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Reviewer & Campus Authority Portal</h1>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
            Auditing official student marksheets, Coursera/AWS course credentials, and hackathon project citations.
          </p>
        </div>

        <div style={{ 
          padding: '12px 18px', 
          borderRadius: '12px', 
          background: isDark ? 'rgba(11, 31, 58, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ 
            width: '38px', height: '38px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFF', fontWeight: 700, fontSize: '14px'
          }}>
            SR
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{reviewerName}</div>
            <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>{reviewerRole}</div>
          </div>
        </div>
      </div>

      {/* METRIC COUNTERS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>Awaiting Review</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>{queue.length}</div>
          <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Pending student submissions</div>
        </div>

        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>Decisions Recorded</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>{history.length}</div>
          <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Audited & permanently logged</div>
        </div>

        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 600 }}>Audit Integrity Status</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8', marginTop: '6px' }}>100% Compliant</div>
          <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Closed-loop verification protocol</div>
        </div>
      </div>

      {/* PENDING QUEUE */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} className="text-amber-400" /> Pending Verification Queue ({queue.length})
        </h3>

        {queue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: isDark ? '#94A3B8' : '#64748B' }}>
            <CheckCircle2 size={36} style={{ color: '#10B981', margin: '0 auto 10px auto' }} />
            All submissions processed! No pending records awaiting examination.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {queue.map(item => (
              <div 
                key={item.id}
                style={{ 
                  padding: '18px 22px', 
                  borderRadius: '14px', 
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                      • Submitted {item.submittedDate} by <strong>{item.studentName}</strong>
                    </span>
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{item.achievementTitle}</h4>
                  <div style={{ fontSize: '12px', color: isDark ? '#CBD5E1' : '#475569', marginTop: '4px' }}>
                    <strong>Issuer:</strong> {item.issuer} | <strong>Evidence:</strong> {item.evidenceDetails}
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  onClick={() => setActiveReviewItem(item)}
                  style={{ fontSize: '13px', padding: '10px 18px' }}
                >
                  Inspect & Audit Submission
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REVIEW AUDIT LOG HISTORY */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} className="text-teal-400" /> Recorded Institutional Audit Trail
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map(h => (
            <div 
              key={h.id}
              style={{ 
                padding: '14px 18px', 
                borderRadius: '12px', 
                background: isDark ? 'rgba(11, 31, 58, 0.4)' : 'rgba(248, 250, 252, 0.8)',
                border: isDark ? '1px solid rgba(125, 185, 235, 0.1)' : '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{h.achievementTitle}</div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Audited by {h.reviewerName} ({h.reviewerRole}) on {h.timestamp}
                </div>
                {h.notes && (
                  <div style={{ fontSize: '12px', color: '#38BDF8', marginTop: '4px' }}>
                    Notes: {h.notes}
                  </div>
                )}
              </div>

              <span className={`badge-status ${h.decision === 'Approved' ? 'verified' : 'rejected'}`}>
                {h.decision === 'Approved' ? <ShieldCheck size={12} /> : <XCircle size={12} />}
                {h.decision}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* INSPECTION & DECISION MODAL */}
      {activeReviewItem && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0, 0, 0, 0.7)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8' }}>CREDENTIAL AUDIT DESK</span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>{activeReviewItem.achievementTitle}</h2>
              </div>
              <button 
                onClick={() => setActiveReviewItem(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginBottom: '22px' }}>
              <div><strong>Applicant:</strong> {activeReviewItem.studentName}</div>
              <div><strong>Category:</strong> {activeReviewItem.category}</div>
              <div><strong>Issuing Body:</strong> {activeReviewItem.issuer}</div>
              <div><strong>Evidence Reference:</strong> {activeReviewItem.evidenceDetails}</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Reviewer Evaluation Notes
              </label>
              <textarea 
                rows="3" 
                value={decisionNotes}
                onChange={e => setDecisionNotes(e.target.value)}
                placeholder="Record audit reasoning (e.g. Verified with Coursera registry API or marksheet ledger)..."
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: '1px solid #CBD5E1', 
                  background: isDark ? '#0B1F3A' : '#FFF',
                  color: isDark ? '#FFF' : '#000',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => handleDecision('Approved')}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '10px', 
                  background: '#10B981', 
                  color: '#FFF', 
                  border: 'none', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={18} /> Approve & Verify
              </button>

              <button 
                onClick={() => handleDecision('Rejected')}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '10px', 
                  background: '#EF4444', 
                  color: '#FFF', 
                  border: 'none', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <XCircle size={18} /> Reject Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
