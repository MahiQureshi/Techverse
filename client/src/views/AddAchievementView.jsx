import React, { useState } from 'react';
import { 
  Sparkles, Upload, FileText, CheckCircle2, AlertCircle, 
  ArrowLeft, ShieldCheck, Link as LinkIcon, Code2, Award
} from 'lucide-react';

export default function AddAchievementView({ onSave, onNavigate, isDark }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Certifications',
    issuer: '',
    dateEarned: new Date().toISOString().split('T')[0],
    description: '',
    credentialId: '',
    credentialUrl: '',
    demoUrl: '',
    skills: '',
    evidence: '',
    contributionRole: '',
    submitForVerification: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAutofillLoading, setAiAutofillLoading] = useState(false);

  const categories = [
    'Academic achievements',
    'Certifications',
    'Projects',
    'Hackathons and Competitions',
    'Internships and experience',
    'Leadership and volunteering',
    'Research and publications'
  ];

  // Evidence completeness calculation
  let completenessScore = 0;
  if (formData.title) completenessScore++;
  if (formData.issuer) completenessScore++;
  if (formData.dateEarned) completenessScore++;
  if (formData.description) completenessScore++;
  if (formData.evidence || formData.credentialId || formData.credentialUrl) completenessScore++;

  // Simulate AI Assistant suggestion
  const handleAiSuggest = () => {
    setAiAutofillLoading(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: prev.title || "Meta Full-Stack Engineering Professional Certificate",
        issuer: prev.issuer || "Meta / Coursera",
        skills: prev.skills || "React, Node.js, REST APIs, SQL, System Architecture",
        description: prev.description || "Comprehensive hands-on training spanning modern responsive frontend applications, Express middleware backend architecture, relational database indexing, and automated unit testing suites.",
        credentialId: prev.credentialId || "META-FS-881903",
        credentialUrl: prev.credentialUrl || "https://coursera.org/verify/professional-cert/META-FS-881903",
        evidence: "Official digital certificate badge reference with verified credential link."
      }));
      setAiAutofillLoading(false);
    }, 700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      alert("Please specify at least an Achievement Title and Issuing Organization.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
      });
      onNavigate('achievements');
    } catch (err) {
      alert("Error saving achievement: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '10px 0 60px 0' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => onNavigate('achievements')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: '#38BDF8', 
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} /> Back to Achievements
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* LEFT: FORM INPUTS */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Add New Achievement</h2>
              <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B' }}>
                Store structured records and request institutional verification.
              </p>
            </div>

            {/* AI ASSISTANT BUTTON */}
            <button 
              type="button"
              onClick={handleAiSuggest}
              disabled={aiAutofillLoading}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '8px 14px', 
                borderRadius: '10px', 
                background: 'rgba(56, 189, 248, 0.15)', 
                color: '#38BDF8', 
                border: '1px solid rgba(56, 189, 248, 0.35)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} /> {aiAutofillLoading ? 'Extracting...' : 'AI Autofill Demo'}
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Achievement Category *
              </label>
              <select 
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  fontSize: '13px'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} style={{ background: isDark ? '#0B1F3A' : '#FFF' }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Achievement Title *
              </label>
              <input 
                type="text" 
                placeholder="e.g. AWS Solutions Architect or AI Medical Triage Project"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Issuer & Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Issuing Organization / College *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Coursera, NIT, IEEE"
                  value={formData.issuer}
                  onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    borderRadius: '10px', 
                    border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                    background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Date Conferred / Completed
                </label>
                <input 
                  type="date" 
                  value={formData.dateEarned}
                  onChange={e => setFormData({ ...formData, dateEarned: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    borderRadius: '10px', 
                    border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                    background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Credential ID & Official Verification URL */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Credential ID (if any)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. CERT-994821"
                  value={formData.credentialId}
                  onChange={e => setFormData({ ...formData, credentialId: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    borderRadius: '10px', 
                    border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                    background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Verification URL / DOI
                </label>
                <input 
                  type="url" 
                  placeholder="https://issuer.org/verify/..."
                  value={formData.credentialUrl}
                  onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    borderRadius: '10px', 
                    border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                    background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                    color: isDark ? '#FFFFFF' : '#1E293B',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Description & Impact Summary
              </label>
              <textarea 
                rows="3" 
                placeholder="Explain what was accomplished, technologies used, problems solved, or honors conferred..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Skills */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Associated Skills (comma separated)
              </label>
              <input 
                type="text" 
                placeholder="Python, React, Machine Learning, AWS"
                value={formData.skills}
                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Evidence & Project Specifics */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Supporting Evidence & Document Reference
              </label>
              <input 
                type="text" 
                placeholder="Certificate PDF link, repository hash, or registrar marksheet scan reference"
                value={formData.evidence}
                onChange={e => setFormData({ ...formData, evidence: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                  background: isDark ? 'rgba(11, 31, 58, 0.6)' : '#FFFFFF',
                  color: isDark ? '#FFFFFF' : '#1E293B',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Submit for review checkbox */}
            <div style={{ 
              padding: '14px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(224, 242, 254, 0.5)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <input 
                type="checkbox" 
                id="verifyCheckbox"
                checked={formData.submitForVerification}
                onChange={e => setFormData({ ...formData, submitForVerification: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#0EA5E9' }}
              />
              <label htmlFor="verifyCheckbox" style={{ fontSize: '13px', cursor: 'pointer' }}>
                <strong>Submit directly to Institutional Reviewer Queue</strong>
                <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  Routes to campus verification board. Status will start as Pending Verification.
                </div>
              </label>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={isSubmitting}
                style={{ flex: 1, padding: '12px' }}
              >
                {isSubmitting ? 'Saving Record...' : 'Save to Passport Ledger'}
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => onNavigate('achievements')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: LIVE CARD PREVIEW & COMPLETENESS */}
        <div>
          {/* EVIDENCE COMPLETENESS INDICATOR */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} className="text-teal-400" /> Evidence Completeness
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
              <span>Completeness Score</span>
              <strong style={{ color: completenessScore >= 4 ? '#10B981' : '#F59E0B' }}>
                {completenessScore} of 5 Recommended Fields
              </strong>
            </div>

            <div style={{ height: '8px', borderRadius: '4px', background: isDark ? 'rgba(15, 23, 42, 0.8)' : '#E2E8F0', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ 
                width: `${(completenessScore / 5) * 100}%`, 
                height: '100%', 
                background: completenessScore >= 4 ? '#10B981' : '#F59E0B',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <div style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5 }}>
              Records with comprehensive evidence and official verification URLs get audited 4x faster by institutional review committees.
            </div>
          </div>

          {/* LIVE PASSPORT CARD PREVIEW */}
          <div className="glass-panel hover-lift" style={{ padding: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.05em', marginBottom: '12px' }}>
              LIVE PASSPORT CARD PREVIEW
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                {formData.category}
              </span>
              <span className={`badge-status ${formData.submitForVerification ? 'pending' : 'unverified'}`}>
                {formData.submitForVerification ? 'Pending' : 'Unverified'}
              </span>
            </div>

            <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>
              {formData.title || 'Untitled Achievement'}
            </h4>

            <div style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569', marginBottom: '10px' }}>
              <strong>{formData.issuer || 'Issuing Body'}</strong> • {formData.dateEarned}
            </div>

            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
              {formData.description || 'Achievement description and impact summary will appear here.'}
            </p>

            {formData.skills && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {formData.skills.split(',').map((s, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: '11px', 
                      padding: '3px 8px', 
                      borderRadius: '6px', 
                      background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(224, 242, 254, 0.8)',
                      color: '#0284C7',
                      fontWeight: 600
                    }}
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
