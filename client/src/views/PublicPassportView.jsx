import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Award, ExternalLink, QrCode, 
  CheckCircle2, Lock, Share2, Layers, BookOpen, Download
} from 'lucide-react';
import { api } from '../services/api';

export default function PublicPassportView({ slug = 'student123', isDark }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getPublicPassport(slug)
      .then(res => {
        if (res.error) setError(res.error);
        else setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load passport.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#38BDF8' }}>
        <h2>Loading Verified Student Passport...</h2>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '40px' }} className="glass-panel">
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginBottom: '12px' }}>Passport Inactive or Revoked</h2>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
          {error || "This specific sharing link has been revoked by the student or expired."}
        </p>
      </div>
    );
  }

  const { student, passport, achievements } = data;
  const verifiedCount = achievements.filter(a => a.status === 'Verified').length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px 80px 20px' }}>
      {/* VERIFIED PASSPORT BADGE */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '6px 14px', 
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10B981',
            fontSize: '12px',
            fontWeight: 800
          }}>
            <ShieldCheck size={16} /> OFFICIAL VERIFIED PASSPORT
          </span>
          <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
            Audited via USAP Verification Network
          </span>
        </div>

        <button 
          onClick={() => window.print()} 
          className="btn-secondary"
          style={{ fontSize: '12px', padding: '8px 16px' }}
        >
          <Download size={14} /> Print / Export PDF
        </button>
      </div>

      {/* STUDENT PROFILE CARD */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '30px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ 
            width: '84px', 
            height: '84px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
            border: '3px solid #38BDF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontWeight: 800,
            fontSize: '32px'
          }}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>{student.name}</h1>
            <p style={{ fontSize: '15px', color: '#38BDF8', fontWeight: 600, marginBottom: '4px' }}>
              {student.degree} in {student.branch} • {student.college}
            </p>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', maxWidth: '650px', lineHeight: 1.5 }}>
              {student.bio}
            </p>
          </div>
        </div>

        {/* STATS STRIP */}
        <div style={{ 
          marginTop: '28px', 
          paddingTop: '20px', 
          borderTop: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid #E2E8F0',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '16px' 
        }}>
          <div>
            <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Academic Performance
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8' }}>
              CGPA {student.cgpa} / 10
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Audited Credentials
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981' }}>
              {verifiedCount} Verified Records
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Passport Scope
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>
              {passport.targetPurpose}
            </div>
          </div>
        </div>
      </div>

      {/* VERIFIED ACHIEVEMENTS LIST */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} className="text-teal-400" /> Authorized Academic & Professional Records ({achievements.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {achievements.map(ach => (
            <div key={ach.id} className="glass-panel hover-lift" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                    {ach.category}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{ach.title}</h3>
                  <div style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569' }}>
                    <strong>{ach.issuer}</strong> • Conferred {ach.dateEarned}
                  </div>
                </div>

                <span className="badge-status verified">
                  <ShieldCheck size={14} /> Officially Verified
                </span>
              </div>

              <p style={{ fontSize: '14px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.6, marginBottom: '14px' }}>
                {ach.description}
              </p>

              {ach.contributionRole && (
                <div style={{ fontSize: '13px', color: '#2DD4BF', fontWeight: 600, marginBottom: '12px' }}>
                  Role & Contribution: {ach.contributionRole}
                </div>
              )}

              {/* AUDIT DETAILS PANEL */}
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '10px', 
                background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ color: '#10B981', fontWeight: 700 }}>
                  Verification Audit Stamp: {ach.verificationMethod}
                </div>
                {ach.verifiedBy && <div>Auditor: {ach.verifiedBy} ({ach.verifiedAt})</div>}
                {ach.credentialId && <div>Registry Identifier: <code style={{ color: '#38BDF8' }}>{ach.credentialId}</code></div>}
              </div>

              {/* LINKS */}
              {(ach.credentialUrl || ach.demoUrl) && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px' }}>
                  {ach.credentialUrl && (
                    <a href={ach.credentialUrl} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}>
                      Official Issuer Verification Page <ExternalLink size={12} />
                    </a>
                  )}
                  {ach.demoUrl && (
                    <a href={ach.demoUrl} target="_blank" rel="noreferrer" style={{ color: '#2DD4BF', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}>
                      Live Production Application <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER AUDIT NOTE */}
      <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
        <div>Unified Student Achievement Passport (USAP) • Cryptographic Credential Protocol</div>
        <div>All records audited against participating institutional registries and authorized evaluators.</div>
      </div>
    </div>
  );
}
