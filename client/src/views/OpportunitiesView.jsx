import React, { useState, useEffect } from 'react';
import { 
  Briefcase, CheckCircle2, AlertCircle, ArrowUpRight, 
  Sparkles, ExternalLink, Filter, Target
} from 'lucide-react';
import { api } from '../services/api';

export default function OpportunitiesView({ onNavigate, isDark }) {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOpportunities()
      .then(data => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '10px 0 60px 0' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2DD4BF', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
          <Sparkles size={16} /> EVIDENCE-BASED OPPORTUNITY MATCHING
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Opportunity Matching & Skill Gap Analysis</h1>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
          Matches your verified credentials with internships, research fellowships, and graduate openings with transparent evidence requirements.
        </p>
      </div>

      {/* OPPORTUNITIES GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {opportunities.map(opp => (
          <div key={opp.id} className="glass-panel hover-lift" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '14px' }}>
              <div>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  color: '#38BDF8', 
                  background: 'rgba(56, 189, 248, 0.12)', 
                  padding: '4px 10px', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(56, 189, 248, 0.25)' 
                }}>
                  {opp.location} • {opp.stipend}
                </span>
                
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>{opp.title}</h2>
                <div style={{ fontSize: '14px', color: isDark ? '#CBD5E1' : '#475569', fontWeight: 600 }}>
                  {opp.organization}
                </div>
              </div>

              {/* MATCH BADGE */}
              <div style={{ 
                padding: '12px 18px', 
                borderRadius: '14px', 
                background: opp.matchPercentage >= 75 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                border: opp.matchPercentage >= 75 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: opp.matchPercentage >= 75 ? '#10B981' : '#38BDF8' }}>
                  EVIDENCE MATCH
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: opp.matchPercentage >= 75 ? '#10B981' : '#38BDF8' }}>
                  {opp.matchPercentage}%
                </div>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
              {opp.description}
            </p>

            {/* SKILLS BREAKDOWN */}
            <div style={{ 
              padding: '16px 20px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.8)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                Verified Skills Audit for this Role:
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {opp.requiredSkills.map(skill => {
                  const hasSkill = opp.matchedSkills?.includes(skill);
                  return (
                    <span 
                      key={skill}
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: hasSkill ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: hasSkill ? '#10B981' : '#F59E0B',
                        border: hasSkill ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      {hasSkill ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                      {skill} {hasSkill ? '(Verified)' : '(Gap)'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                Application Deadline: <strong>{opp.deadline}</strong>
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => onNavigate('passports')}
                  style={{ fontSize: '13px', padding: '10px 20px' }}
                >
                  Prepare Tailored Passport <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
