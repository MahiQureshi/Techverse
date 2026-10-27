import React from 'react';
import { 
  Award, ShieldCheck, Clock, AlertCircle, Plus, 
  ArrowUpRight, Sparkles, TrendingUp, Compass, 
  CheckCircle, FileText, ChevronRight, ExternalLink
} from 'lucide-react';

export default function DashboardView({ profile, achievements, onNavigate, isDark }) {
  const stats = profile?.stats || {
    totalAchievements: achievements?.length || 0,
    verified: achievements?.filter(a => a.status === 'Verified').length || 0,
    pending: achievements?.filter(a => a.status === 'Pending').length || 0,
    unverified: achievements?.filter(a => a.status === 'Unverified').length || 0
  };

  // Group achievements by category
  const categories = {};
  achievements?.forEach(a => {
    categories[a.category] = (categories[a.category] || 0) + 1;
  });

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* WELCOME BANNER */}
      <div className="glass-panel" style={{ 
        padding: '30px 35px', 
        marginBottom: '30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
            <Sparkles size={16} /> OFFICIAL STUDENT IDENTITY PROFILE
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
            Welcome back, {profile?.name || 'Aarav Sharma'}
          </h1>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px', lineHeight: 1.5 }}>
            {profile?.degree} {profile?.branch} • {profile?.college} (Graduating {profile?.graduationYear})
          </p>
          <p style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569', marginTop: '8px' }}>
            Your passport has <strong style={{ color: '#10B981' }}>{stats.verified} verified credentials</strong> audited by authorized institutions. 
            {stats.pending > 0 && <span style={{ color: '#F59E0B' }}> {stats.pending} records currently in review queue.</span>}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary"
            onClick={() => onNavigate('add-achievement')}
          >
            <Plus size={18} /> Add Achievement
          </button>
          <button 
            className="btn-secondary"
            onClick={() => onNavigate('passports')}
          >
            <ExternalLink size={16} /> Share Passport
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {/* Total */}
        <div 
          className="glass-panel hover-lift" 
          onClick={() => onNavigate('achievements')}
          style={{ padding: '24px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#94A3B8' : '#64748B' }}>Total Records</span>
            <div style={{ 
              width: '38px', height: '38px', borderRadius: '10px', 
              background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Award size={20} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.totalAchievements}</div>
          <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '4px' }}>
            Academic, certifications & projects
          </div>
        </div>

        {/* Verified */}
        <div 
          className="glass-panel hover-lift" 
          onClick={() => onNavigate('verification')}
          style={{ padding: '24px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>Verified Records</span>
            <div style={{ 
              width: '38px', height: '38px', borderRadius: '10px', 
              background: 'rgba(16, 185, 129, 0.15)', color: '#10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <ShieldCheck size={20} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#10B981' }}>{stats.verified}</div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
            Officially audited & confirmed
          </div>
        </div>

        {/* Pending */}
        <div 
          className="glass-panel hover-lift" 
          onClick={() => onNavigate('verification')}
          style={{ padding: '24px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#F59E0B' }}>Pending Verification</span>
            <div style={{ 
              width: '38px', height: '38px', borderRadius: '10px', 
              background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#F59E0B' }}>{stats.pending}</div>
          <div style={{ fontSize: '12px', color: '#F59E0B', marginTop: '4px' }}>
            Awaiting reviewer examination
          </div>
        </div>

        {/* Self-reported / Unverified */}
        <div 
          className="glass-panel hover-lift" 
          onClick={() => onNavigate('achievements')}
          style={{ padding: '24px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#94A3B8' : '#64748B' }}>Self-Reported</span>
            <div style={{ 
              width: '38px', height: '38px', borderRadius: '10px', 
              background: 'rgba(148, 163, 184, 0.15)', color: '#94A3B8',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <AlertCircle size={20} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800 }}>{stats.unverified}</div>
          <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginTop: '4px' }}>
            Ready for evidence submission
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: CATEGORY BREAKDOWN & VERIFICATION TIMELINE */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
        gap: '25px', 
        marginBottom: '30px' 
      }}>
        {/* Category Breakdown */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} className="text-sky-400" /> Category Distribution
            </h3>
            <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>Live Stored Data</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(categories).map(([cat, count]) => {
              const pct = Math.round((count / (achievements?.length || 1)) * 100);
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span>{cat}</span>
                    <span style={{ color: '#38BDF8' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ 
                    height: '8px', 
                    borderRadius: '4px', 
                    background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(226, 232, 240, 0.8)',
                    overflow: 'hidden' 
                  }}>
                    <div style={{ 
                      width: `${pct}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #38BDF8 0%, #2DD4BF 100%)',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Journey */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} className="text-teal-400" /> Achievement Journey Milestones
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                <CheckCircle size={16} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Account & College Profile Created</div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>Verified with National Institute of Technology</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                <CheckCircle size={16} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>First 5 Official Verified Credentials</div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>DeepLearning.AI, Apex AI Hackathon, Semester Transcript</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', 
                background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                <Clock size={16} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Cloud & GDSC Leadership Verification in Progress</div>
                <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>Reviewer assigned: Dr. Sunita Raman (Academic Council)</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('graph')}
              style={{ flex: 1, fontSize: '13px', padding: '10px' }}
            >
              Explore Relationship Graph →
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('opportunities')}
              style={{ flex: 1, fontSize: '13px', padding: '10px' }}
            >
              Opportunity Matches →
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ACHIEVEMENTS PREVIEW */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Achievements & Credentials</h3>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>
              Showing latest records stored in your passport profile
            </p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => onNavigate('achievements')}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            View All ({achievements?.length})
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {achievements?.slice(0, 3).map(ach => (
            <div 
              key={ach.id} 
              className="hover-lift" 
              style={{ 
                padding: '20px', 
                borderRadius: '16px',
                background: isDark ? 'rgba(11, 31, 58, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                  {ach.category}
                </span>
                <span className={`badge-status ${ach.status.toLowerCase()}`}>
                  {ach.status === 'Verified' && <ShieldCheck size={11} />}
                  {ach.status === 'Pending' && <Clock size={11} />}
                  {ach.status}
                </span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{ach.title}</h4>
              <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '12px' }}>
                {ach.issuer} • {ach.dateEarned}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {ach.skills?.slice(0, 3).map(sk => (
                  <span 
                    key={sk} 
                    style={{ 
                      fontSize: '11px', 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(224, 242, 254, 0.8)',
                      color: '#0284C7',
                      fontWeight: 500
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
