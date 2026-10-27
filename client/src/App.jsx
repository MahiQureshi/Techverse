import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Award, PlusCircle, 
  Share2, Network, Briefcase, Sun, Moon, LogOut, 
  Menu, X, CheckCircle, Sparkles, User, ExternalLink
} from 'lucide-react';

import { api } from './services/api';
import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import AchievementsView from './views/AchievementsView';
import AddAchievementView from './views/AddAchievementView';
import VerificationCenterView from './views/VerificationCenterView';
import PassportsView from './views/PassportsView';
import ReviewerView from './views/ReviewerView';
import RelationshipGraphView from './views/RelationshipGraphView';
import OpportunitiesView from './views/OpportunitiesView';
import PublicPassportView from './views/PublicPassportView';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isDark, setIsDark] = useState(true);
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [passports, setPassports] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [publicSlug, setPublicSlug] = useState('student123');

  // Handle URL Hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#passport/')) {
        const slug = hash.replace('#passport/', '');
        setPublicSlug(slug);
        setCurrentView('public-passport');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update theme class on body
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDark]);

  // Load initial data
  const refreshData = async () => {
    try {
      const [profData, achData, passData] = await Promise.all([
        api.getStudentProfile(),
        api.getAchievements(),
        api.getPassports()
      ]);
      setProfile(profData);
      setAchievements(achData);
      setPassports(passData);
    } catch (e) {
      console.error("Failed to load initial data", e);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSaveAchievement = async (formData) => {
    await api.createAchievement(formData);
    await refreshData();
  };

  const handleDeleteAchievement = async (id) => {
    if (window.confirm("Are you sure you want to remove this achievement?")) {
      await api.deleteAchievement(id);
      await refreshData();
    }
  };

  const handleRequestVerify = async (id, payload) => {
    await api.requestVerification(id, payload);
    await refreshData();
    alert("Record submitted to institutional review queue!");
  };

  const handleCreatePassport = async (passportData) => {
    await api.createPassport(passportData);
    await refreshData();
  };

  const handleRevokePassport = async (id) => {
    if (window.confirm("Revoke this public sharing link? External viewers will no longer be able to open it.")) {
      await api.revokePassport(id);
      await refreshData();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
    { id: 'achievements', label: 'My Records', icon: <Award size={17} /> },
    { id: 'add-achievement', label: 'Add Record', icon: <PlusCircle size={17} /> },
    { id: 'verification', label: 'Verification Center', icon: <ShieldCheck size={17} /> },
    { id: 'passports', label: 'Share Passports', icon: <Share2 size={17} /> },
    { id: 'graph', label: 'Relationship Graph', icon: <Network size={17} /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Briefcase size={17} /> },
    { id: 'reviewer', label: 'Reviewer Portal', icon: <CheckCircle size={17} /> }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* GLOBAL NAVIGATION BAR */}
      <header className="glass-panel" style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        borderRadius: 0, 
        borderLeft: 'none', 
        borderRight: 'none', 
        borderTop: 'none',
        padding: '14px 24px'
      }}>
        <div style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* LOGO */}
          <div 
            onClick={() => { window.location.hash = ''; setCurrentView('landing'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                USAP <span style={{ color: '#38BDF8', fontWeight: 600, fontSize: '12px' }}>PASSPORT</span>
              </div>
              <div style={{ fontSize: '11px', color: isDark ? '#94A3B8' : '#64748B' }}>
                Unified Student Achievement Passport
              </div>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden-mobile">
            {currentView !== 'landing' && currentView !== 'public-passport' && (
              navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: currentView === item.id 
                      ? (isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(224, 242, 254, 0.9)') 
                      : 'transparent',
                    color: currentView === item.id 
                      ? '#38BDF8' 
                      : (isDark ? '#CBD5E1' : '#475569'),
                    fontWeight: currentView === item.id ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))
            )}

            {currentView === 'landing' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setCurrentView('dashboard')} 
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Student Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('reviewer')} 
                  className="btn-secondary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Reviewer Portal
                </button>
              </div>
            )}

            {currentView === 'public-passport' && (
              <button 
                onClick={() => { window.location.hash = ''; setCurrentView('dashboard'); }} 
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Back to App
              </button>
            )}
          </nav>

          {/* CONTROLS (THEME & MOBILE) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.8)' : '#FFFFFF',
                color: isDark ? '#F59E0B' : '#0EA5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Toggle Light / Dark Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="show-mobile-only"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: isDark ? '1px solid rgba(125, 185, 235, 0.2)' : '1px solid #CBD5E1',
                background: isDark ? 'rgba(11, 31, 58, 0.8)' : '#FFFFFF',
                color: isDark ? '#FFF' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div style={{ 
            marginTop: '16px', 
            paddingTop: '16px', 
            borderTop: isDark ? '1px solid rgba(125, 185, 235, 0.15)' : '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: currentView === item.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: currentView === item.id ? '#38BDF8' : (isDark ? '#CBD5E1' : '#475569'),
                  fontWeight: 600,
                  fontSize: '14px',
                  textAlign: 'left'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
        {currentView === 'landing' && (
          <LandingView onNavigate={setCurrentView} isDark={isDark} />
        )}

        {currentView === 'dashboard' && (
          <DashboardView 
            profile={profile} 
            achievements={achievements} 
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'achievements' && (
          <AchievementsView 
            achievements={achievements} 
            onNavigate={setCurrentView} 
            onDelete={handleDeleteAchievement}
            onRequestVerify={handleRequestVerify}
            isDark={isDark} 
          />
        )}

        {currentView === 'add-achievement' && (
          <AddAchievementView 
            onSave={handleSaveAchievement} 
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'verification' && (
          <VerificationCenterView 
            achievements={achievements} 
            onRequestVerify={handleRequestVerify}
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'passports' && (
          <PassportsView 
            passports={passports} 
            achievements={achievements} 
            onCreatePassport={handleCreatePassport}
            onRevokePassport={handleRevokePassport}
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'reviewer' && (
          <ReviewerView 
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'graph' && (
          <RelationshipGraphView 
            achievements={achievements} 
            isDark={isDark} 
          />
        )}

        {currentView === 'opportunities' && (
          <OpportunitiesView 
            onNavigate={setCurrentView} 
            isDark={isDark} 
          />
        )}

        {currentView === 'public-passport' && (
          <PublicPassportView 
            slug={publicSlug} 
            isDark={isDark} 
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="glass-panel" style={{ 
        marginTop: 'auto', 
        borderRadius: 0, 
        borderLeft: 'none', 
        borderRight: 'none', 
        borderBottom: 'none',
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '13px',
        color: isDark ? '#94A3B8' : '#64748B'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <strong>Unified Student Achievement Passport (USAP)</strong> • Built for Inter-Institutional Academic Trust
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>Home</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('verification')}>Verification Center</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('reviewer')}>Campus Reviewer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
