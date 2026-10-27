import React from 'react';
import { 
  ShieldCheck, Award, Eye, FileCheck, Share2, Compass, 
  ArrowRight, CheckCircle2, Lock, Sparkles, Database, Users, 
  Layers, ExternalLink, ChevronRight, Check
} from 'lucide-react';

export default function LandingView({ onNavigate, isDark }) {
  const steps = [
    {
      num: "01",
      title: "Collect & Aggregate",
      desc: "Import academic CGPA marksheets, Coursera/AWS certificates, hackathons, and GitHub repositories into a single ledger.",
      icon: <Layers size={22} className="text-sky-400" />
    },
    {
      num: "02",
      title: "Verify with Institutions",
      desc: "Authorized college registrars, hackathon juries, and official credential APIs confirm authenticity. No self-verified claims.",
      icon: <ShieldCheck size={22} className="text-emerald-400" />
    },
    {
      num: "03",
      title: "Personalize Opportunity Passports",
      desc: "Generate tailored views emphasizing AI, software engineering, or scholarships with selective zero-exposure data controls.",
      icon: <Sparkles size={22} className="text-cyan-400" />
    },
    {
      num: "04",
      title: "Share with Verifiable Confidence",
      desc: "Distribute cryptographic QR codes or shareable links. Recruiters can audit verification timestamps and original audit trails.",
      icon: <Share2 size={22} className="text-blue-400" />
    }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 20px 80px 20px' }}>
      {/* HERO SECTION */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
        gap: '40px', 
        alignItems: 'center',
        padding: '50px 0 70px 0'
      }}>
        <div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 14px', 
            borderRadius: '9999px',
            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 165, 233, 0.1)',
            color: '#38BDF8',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '20px',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}>
            <Sparkles size={14} /> UNIFIED STUDENT ACHIEVEMENT PASSPORT 2.0
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(34px, 4.5vw, 54px)', 
            fontWeight: 800, 
            lineHeight: 1.15, 
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Everything You've Achieved. <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #38BDF8 0%, #2DD4BF 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              One Trusted Identity.
            </span>
          </h1>

          <p style={{ 
            fontSize: '17px', 
            lineHeight: 1.6, 
            color: isDark ? '#94A3B8' : '#475569', 
            marginBottom: '32px',
            maxWidth: '540px'
          }}>
            Consolidate scattered academic records, industry certifications, hackathon victories, and production code repositories into a tamper-evident digital passport with institutional verification.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button 
              className="btn-primary" 
              onClick={() => onNavigate('dashboard')}
              style={{ padding: '14px 28px', fontSize: '15px' }}
            >
              Enter Student Dashboard <ArrowRight size={18} />
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('public-passport')}
              style={{ padding: '14px 24px', fontSize: '15px' }}
            >
              <Eye size={18} /> View Sample Passport
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('reviewer')}
              style={{ padding: '14px 24px', fontSize: '15px', borderColor: 'rgba(45, 212, 191, 0.4)' }}
            >
              <ShieldCheck size={18} className="text-teal-400" /> Reviewer Portal
            </button>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={16} className="text-emerald-400" /> Tamper-Evident Records
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={16} className="text-emerald-400" /> Institutional Verification
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={16} className="text-emerald-400" /> Privacy-First Access
            </div>
          </div>
        </div>

        {/* HERO LIVE INTERACTIVE PREVIEW CARD */}
        <div className="glass-panel hover-lift" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '180px', 
            height: '180px', 
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '16px', 
                border: '2px solid #38BDF8', 
                background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '20px'
              }}>
                AS
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Aarav Sharma</h3>
                <p style={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}>
                  B.Tech CSE • National Institute of Tech
                </p>
              </div>
            </div>
            <span className="badge-status verified">
              <ShieldCheck size={12} /> ID VERIFIED
            </span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px', 
            marginBottom: '20px',
            textAlign: 'center' 
          }}>
            <div style={{ 
              padding: '12px 8px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.9)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(148, 190, 225, 0.25)'
            }}>
              <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>CGPA</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#38BDF8' }}>9.24</div>
            </div>
            <div style={{ 
              padding: '12px 8px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.9)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(148, 190, 225, 0.25)'
            }}>
              <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Verified</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981' }}>5</div>
            </div>
            <div style={{ 
              padding: '12px 8px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(11, 31, 58, 0.6)' : 'rgba(241, 245, 249, 0.9)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(148, 190, 225, 0.25)'
            }}>
              <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Awaiting</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#F59E0B' }}>2</div>
            </div>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>Active Verified Credentials</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <div style={{ 
              padding: '10px 14px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Deep Learning Specialization</div>
                <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>DeepLearning.AI / Coursera</div>
              </div>
              <span className="badge-status verified"><ShieldCheck size={11} /> Verified</span>
            </div>

            <div style={{ 
              padding: '10px 14px', 
              borderRadius: '12px', 
              background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              border: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid rgba(226, 232, 240, 0.8)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>1st Place - Apex National AI Hackathon</div>
                <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>Apex Tech Innovations Jury</div>
              </div>
              <span className="badge-status verified"><ShieldCheck size={11} /> Verified</span>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('public-passport')}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              background: 'rgba(56, 189, 248, 0.15)', 
              color: '#38BDF8', 
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            Open Live Shareable Passport <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 CORE STEPS WORKFLOW */}
      <div style={{ marginTop: '50px', marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '10px' }}>
            The Complete Verification Workflow
          </h2>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', maxWidth: '600px', margin: '0 auto', fontSize: '15px' }}>
            A certificate upload alone does not prove authenticity. USAP provides a closed-loop institutional verification protocol.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {steps.map(step => (
            <div key={step.num} className="glass-panel hover-lift" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                  {step.num}
                </span>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  background: isDark ? 'rgba(11, 31, 58, 0.8)' : 'rgba(224, 242, 254, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.icon}
                </div>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: isDark ? '#94A3B8' : '#64748B' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CORE MODULES SHOWCASE */}
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Essential Platform Architecture</h2>
          <p style={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '14px' }}>
            Designed according to the six comprehensive modules specified for modern institutional credential verification.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', borderRadius: '14px', background: isDark ? 'rgba(11, 31, 58, 0.4)' : 'rgba(255, 255, 255, 0.6)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Users size={18} className="text-sky-400" /> Module 1: Student Profile
            </h4>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5 }}>
              Personalized digital passport displaying student demographics, branch, verified CGPA, skills radar, and career aspirations.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '14px', background: isDark ? 'rgba(11, 31, 58, 0.4)' : 'rgba(255, 255, 255, 0.6)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Award size={18} className="text-teal-400" /> Module 2 & 3: Records & Projects
            </h4>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5 }}>
              Granular management of semester results, Coursera/NPTEL credentials, live demo URLs, GitHub repositories, and evidence uploads.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '14px', background: isDark ? 'rgba(11, 31, 58, 0.4)' : 'rgba(255, 255, 255, 0.6)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={18} className="text-emerald-400" /> Module 4: Verification Workflow
            </h4>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5 }}>
              Multi-tiered verification status: Verified, Pending, Unverified, or Rejected. Complete audit trail recording who verified each record and when.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '14px', background: isDark ? 'rgba(11, 31, 58, 0.4)' : 'rgba(255, 255, 255, 0.6)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Share2 size={18} className="text-cyan-400" /> Module 5 & 6: Passports & Verifier Portal
            </h4>
            <p style={{ fontSize: '13px', color: isDark ? '#94A3B8' : '#64748B', lineHeight: 1.5 }}>
              Custom shareable link generator with QR codes, selective section controls, and a dedicated Institutional Reviewer dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CALL TO ACTION */}
      <div style={{ 
        textAlign: 'center', 
        padding: '50px 30px', 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(45, 212, 191, 0.15) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
          Ready to Build Your Verified Achievement Passport?
        </h2>
        <p style={{ color: isDark ? '#94A3B8' : '#64748B', maxWidth: '540px', margin: '0 auto 24px auto', fontSize: '15px' }}>
          Stop sending disjointed PDF attachments. Present an audited, beautifully structured digital profile to recruiters and admission committees.
        </p>
        <button 
          className="btn-primary" 
          onClick={() => onNavigate('dashboard')}
          style={{ padding: '14px 32px', fontSize: '15px' }}
        >
          Launch Student Dashboard Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
