// Frontend API Client for Unified Student Achievement Passport
const API_BASE = '/api';

export const api = {
  // Health
  getHealth: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // Student Profile
  getStudentProfile: async () => {
    const res = await fetch(`${API_BASE}/student/profile`);
    return res.json();
  },

  updateStudentProfile: async (data) => {
    const res = await fetch(`${API_BASE}/student/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Achievements
  getAchievements: async (params = {}) => {
    const url = new URL(`${API_BASE}/achievements`);
    Object.keys(params).forEach(key => {
      if (params[key]) url.searchParams.append(key, params[key]);
    });
    const res = await fetch(url);
    return res.json();
  },

  getAchievementById: async (id) => {
    const res = await fetch(`${API_BASE}/achievements/${id}`);
    return res.json();
  },

  createAchievement: async (achievementData) => {
    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(achievementData)
    });
    return res.json();
  },

  requestVerification: async (id, payload = {}) => {
    const res = await fetch(`${API_BASE}/achievements/${id}/verify-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  deleteAchievement: async (id) => {
    const res = await fetch(`${API_BASE}/achievements/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Reviewer portal
  getReviewerQueue: async () => {
    const res = await fetch(`${API_BASE}/reviewer/queue`);
    return res.json();
  },

  getReviewHistory: async () => {
    const res = await fetch(`${API_BASE}/reviewer/history`);
    return res.json();
  },

  submitReviewDecision: async (decisionData) => {
    const res = await fetch(`${API_BASE}/reviewer/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisionData)
    });
    return res.json();
  },

  // Passports & Sharing
  getPassports: async () => {
    const res = await fetch(`${API_BASE}/passports`);
    return res.json();
  },

  getPublicPassport: async (slug) => {
    const res = await fetch(`${API_BASE}/passport/${slug}`);
    return res.json();
  },

  createPassport: async (passportData) => {
    const res = await fetch(`${API_BASE}/passports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passportData)
    });
    return res.json();
  },

  revokePassport: async (id) => {
    const res = await fetch(`${API_BASE}/passports/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Opportunities
  getOpportunities: async () => {
    const res = await fetch(`${API_BASE}/opportunities`);
    return res.json();
  }
};
