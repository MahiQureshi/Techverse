const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Ensure data folder exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initial seed data
const initialData = {
  users: [
    {
      id: "usr_student_1",
      name: "Aarav Sharma",
      email: "aarav.sharma@techuniv.edu",
      role: "student",
      college: "National Institute of Technology",
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      academicYear: "3rd Year (6th Sem)",
      graduationYear: "2027",
      cgpa: "9.24",
      bio: "Passionate full-stack & AI systems builder. Focused on decentralized identity, verifiable computing, and high-throughput web apps.",
      interests: ["Full-Stack Engineering", "AI & Machine Learning", "Distributed Systems", "Cloud Computing"],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      stats: {
        totalAchievements: 8,
        verified: 5,
        pending: 2,
        unverified: 1
      }
    },
    {
      id: "usr_reviewer_1",
      name: "Dr. Sunita Raman",
      email: "sunita.dean@techuniv.edu",
      role: "reviewer",
      title: "Dean of Academic Affairs & Credential Verification Board",
      institution: "National Institute of Technology",
      department: "Office of Registrar & Placement Oversight",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
    }
  ],
  achievements: [
    {
      id: "ach_1",
      studentId: "usr_student_1",
      title: "Deep Learning & Neural Networks Specialization",
      category: "Certifications",
      issuer: "DeepLearning.AI / Coursera",
      dateEarned: "2026-08-14",
      credentialId: "DL-AI-994827-USAP",
      credentialUrl: "https://coursera.org/verify/DL-AI-994827",
      description: "Mastered multi-layer perceptrons, CNNs, Sequence Models, transformer architectures, and hyperparameter optimization techniques with PyTorch.",
      skills: ["PyTorch", "Deep Learning", "CNNs", "Transformers"],
      status: "Verified",
      verifiedBy: "Dr. Sunita Raman (Academic Council)",
      verifiedAt: "2026-08-18",
      verificationMethod: "Official Issuer API & Registry Match",
      evidence: "Certificate PDF attached & verified cryptographically via Coursera Registry ID DL-AI-994827.",
      evidenceCompleteness: 5, // out of 5
      expirationDate: "Never"
    },
    {
      id: "ach_2",
      studentId: "usr_student_1",
      title: "SmartPulse: AI Patient Vitals & Remote Triage System",
      category: "Projects",
      issuer: "National Tech Innovation Showcase 2026",
      dateEarned: "2026-09-10",
      credentialId: "PRJ-MED-2026-01",
      credentialUrl: "https://github.com/aarav-sharma/smartpulse-ai",
      demoUrl: "https://smartpulse-telehealth-demo.vercel.app",
      description: "Built an end-to-end telemetry system streaming IoT vitals to a fine-tuned LLM medical triage assistant. Reduced triage latency by 68%.",
      skills: ["React", "FastAPI", "WebSockets", "IoT", "PyTorch"],
      status: "Verified",
      verifiedBy: "Hackathon Evaluation Jury (Inter-College Tech Board)",
      verifiedAt: "2026-09-12",
      verificationMethod: "Institutional Review & Code Repository Verification",
      evidence: "Live repository commits verified; project presentation evaluated by faculty jury.",
      evidenceCompleteness: 5,
      contributionRole: "Lead Architect: Designed WebSocket real-time engine and AI inference pipeline."
    },
    {
      id: "ach_3",
      studentId: "usr_student_1",
      title: "1st Place Winner - Apex National AI Hackathon",
      category: "Hackathons and Competitions",
      issuer: "Apex Tech Innovations & Ministry of Education",
      dateEarned: "2026-07-22",
      credentialId: "HCK-APEX-2026-GOLD-014",
      credentialUrl: "https://apex-hackathon.org/hall-of-fame/2026",
      description: "Competed against 420 national teams. Designed decentralized verifiable certificate ledger within 36 straight hours.",
      skills: ["System Architecture", "React", "Node.js", "Cryptographic Hashing"],
      status: "Verified",
      verifiedBy: "Apex Hackathon Organizing Committee",
      verifiedAt: "2026-07-25",
      verificationMethod: "Award Citation & Official Jury Certificate Validation",
      evidence: "Grand Winner Trophy Citation & Official signed decree #APEX-2026-W1.",
      evidenceCompleteness: 5
    },
    {
      id: "ach_4",
      studentId: "usr_student_1",
      title: "Academic Excellence Merit Scholarship (Semester 5)",
      category: "Academic achievements",
      issuer: "National Institute of Technology",
      dateEarned: "2026-06-01",
      credentialId: "NIT-SCHOLAR-SEM5-883",
      credentialUrl: "https://techuniv.edu/registry/scholarships/883",
      description: "Conferred top 1 percentile academic distinction award for maintaining CGPA 9.24 across core CS algorithms, OS, and DBMS coursework.",
      skills: ["Data Structures & Algorithms", "Operating Systems", "Relational Databases"],
      status: "Verified",
      verifiedBy: "Office of the Dean of Academic Affairs",
      verifiedAt: "2026-06-05",
      verificationMethod: "Institutional Registry Database Audit",
      evidence: "Official transcript seal & Dean's Merit Honor Roll Notification.",
      evidenceCompleteness: 5
    },
    {
      id: "ach_5",
      studentId: "usr_student_1",
      title: "Software Engineering Intern - Cloud Platforms",
      category: "Internships and experience",
      issuer: "HyperScale Cloud Systems Ltd.",
      dateEarned: "2026-05-30",
      credentialId: "INTERN-HSC-2026-049",
      credentialUrl: "https://hyperscale.cloud/verify/interns/049",
      description: "Constructed distributed metric ingestion pipelines using Go and Redis streams, handling 150k metrics/sec with automated failover.",
      skills: ["Go", "Redis", "Docker", "Kubernetes", "Prometheus"],
      status: "Verified",
      verifiedBy: "Engineering Manager (Vikas Mehta) via LinkedIn Talent Verification",
      verifiedAt: "2026-06-02",
      verificationMethod: "Issuer Organization Work Completion Verification",
      evidence: "Internship Completion Certificate and Manager Letter of Recommendation.",
      evidenceCompleteness: 5
    },
    {
      id: "ach_6",
      studentId: "usr_student_1",
      title: "AWS Certified Solutions Architect - Associate",
      category: "Certifications",
      issuer: "Amazon Web Services (AWS)",
      dateEarned: "2026-09-28",
      credentialId: "AWS-SAA-8849201-USAP",
      credentialUrl: "https://aws.amazon.com/verification/AWS-SAA-8849201",
      description: "Comprehensive validation of distributed system design, high availability on VPC, IAM security, S3 storage tiers, and serverless architectures.",
      skills: ["AWS", "Cloud Architecture", "IAM", "Serverless", "DynamoDB"],
      status: "Pending",
      verifiedBy: null,
      verifiedAt: null,
      verificationMethod: "Awaiting automated Credential ID validation with Credly / AWS API",
      evidence: "AWS Certificate PDF badge and Credly verification link submitted.",
      evidenceCompleteness: 5
    },
    {
      id: "ach_7",
      studentId: "usr_student_1",
      title: "Co-Lead & Technical Organizer - Google Developer Student Club",
      category: "Leadership and volunteering",
      issuer: "GDSC Student Chapter",
      dateEarned: "2026-04-10",
      credentialId: "GDSC-2025-26-LEAD-03",
      credentialUrl: "https://gdsc.community.dev/chapters/nit",
      description: "Mentored 350+ junior students in open source web development, arranged 6 workshops, and coordinated 2 campus hackathons.",
      skills: ["Community Leadership", "Public Speaking", "Event Management", "Mentorship"],
      status: "Pending",
      verifiedBy: null,
      verifiedAt: null,
      verificationMethod: "Pending Faculty Advisor signature",
      evidence: "GDSC Lead Appointment letter from Faculty Advisor.",
      evidenceCompleteness: 4
    },
    {
      id: "ach_8",
      studentId: "usr_student_1",
      title: "Research Paper: Verifiable Credential Presentation Using Selective Zero-Knowledge Proofs",
      category: "Research and publications",
      issuer: "IEEE Student Symposium on Security & Privacy 2026",
      dateEarned: "2026-10-05",
      credentialId: "IEEE-ST-2026-P918",
      credentialUrl: "https://doi.org/10.1109/STSP.2026.918",
      description: "Authored peer-reviewed paper exploring minimal disclosure algorithms for student academic passports while preserving identity privacy.",
      skills: ["Zero-Knowledge Proofs", "Cryptography", "Academic Writing", "Identity Privacy"],
      status: "Unverified",
      verifiedBy: null,
      verifiedAt: null,
      verificationMethod: "Self-reported entry with DOI draft link",
      evidence: "Draft manuscript DOI pending final publication issue volume.",
      evidenceCompleteness: 4
    }
  ],
  passports: [
    {
      id: "pass_default",
      studentId: "usr_student_1",
      shareSlug: "student123",
      targetPurpose: "AI & Full-Stack Software Internship",
      title: "Aarav Sharma - Core Engineering & AI Passport",
      theme: "sky-glass",
      visibility: "Public",
      expiryDate: null,
      selectedAchievements: ["ach_1", "ach_2", "ach_3", "ach_4", "ach_5", "ach_6"],
      allowedSections: {
        profileOverview: true,
        summaryStats: true,
        skillsCloud: true,
        verifiedBadges: true,
        academicRecords: true,
        projectsShowcase: true,
        relationshipGraph: true,
        verificationAudits: true
      },
      viewsCount: 148,
      createdAt: "2026-08-20"
    },
    {
      id: "pass_scholarship",
      studentId: "usr_student_1",
      shareSlug: "aarav-scholarship",
      targetPurpose: "National Postgraduate Merit Scholarship",
      title: "Aarav Sharma - Academic Excellence & Leadership Dossier",
      theme: "midnight-navy",
      visibility: "Restricted",
      expiryDate: "2026-12-31",
      selectedAchievements: ["ach_1", "ach_3", "ach_4", "ach_7", "ach_8"],
      allowedSections: {
        profileOverview: true,
        summaryStats: true,
        skillsCloud: true,
        verifiedBadges: true,
        academicRecords: true,
        projectsShowcase: false,
        relationshipGraph: true,
        verificationAudits: true
      },
      viewsCount: 39,
      createdAt: "2026-09-01"
    }
  ],
  verificationQueue: [
    {
      id: "vq_1",
      achievementId: "ach_6",
      studentName: "Aarav Sharma",
      studentId: "usr_student_1",
      achievementTitle: "AWS Certified Solutions Architect - Associate",
      category: "Certifications",
      issuer: "Amazon Web Services (AWS)",
      submittedDate: "2026-09-29",
      evidenceDetails: "Certificate Badge ID: AWS-SAA-8849201-USAP with verification link",
      status: "Pending",
      notes: ""
    },
    {
      id: "vq_2",
      achievementId: "ach_7",
      studentName: "Aarav Sharma",
      studentId: "usr_student_1",
      achievementTitle: "Co-Lead & Technical Organizer - Google Developer Student Club",
      category: "Leadership and volunteering",
      issuer: "GDSC Student Chapter",
      submittedDate: "2026-10-01",
      evidenceDetails: "Lead Appointment letter signed by Faculty Advisor",
      status: "Pending",
      notes: "Requires verifying with Dr. Alok Kumar (Faculty Advisor GDSC)"
    }
  ],
  reviewHistory: [
    {
      id: "rh_1",
      achievementId: "ach_1",
      achievementTitle: "Deep Learning & Neural Networks Specialization",
      decision: "Approved",
      reviewerName: "Dr. Sunita Raman",
      reviewerRole: "Dean of Academic Affairs",
      timestamp: "2026-08-18 14:32:00",
      notes: "Verified against Coursera digital registry. Certificate ID confirmed authentic.",
      verificationMethod: "Official Issuer API & Registry Match"
    },
    {
      id: "rh_2",
      achievementId: "ach_2",
      achievementTitle: "SmartPulse: AI Patient Vitals & Remote Triage System",
      decision: "Approved",
      reviewerName: "Dr. Sunita Raman",
      reviewerRole: "Inter-College Tech Board Oversight",
      timestamp: "2026-09-12 11:15:00",
      notes: "Evaluated project codebase repository and working telehealth WebSocket demonstration.",
      verificationMethod: "Institutional Review & Code Repository Verification"
    },
    {
      id: "rh_3",
      achievementId: "ach_4",
      achievementTitle: "Academic Excellence Merit Scholarship (Semester 5)",
      decision: "Approved",
      reviewerName: "Dr. Sunita Raman",
      reviewerRole: "Dean of Academic Affairs",
      timestamp: "2026-06-05 09:40:00",
      notes: "Verified with campus examination and marksheet registrar ledger.",
      verificationMethod: "Institutional Registry Database Audit"
    }
  ],
  opportunities: [
    {
      id: "opp_1",
      title: "AI & Distributed Systems Research Intern",
      organization: "Google Research Labs / NextGen Systems",
      location: "Bangalore / Hybrid",
      stipend: "INR 85,000 / month",
      requiredSkills: ["PyTorch", "Deep Learning", "Distributed Systems", "Python"],
      preferredSkills: ["Transformers", "Docker", "Zero-Knowledge Proofs"],
      description: "Join the frontier AI architecture research team working on low-latency inference pipelines and verifiable ML systems.",
      deadline: "2026-11-20"
    },
    {
      id: "opp_2",
      title: "Full-Stack Cloud Systems Engineer (Graduate Trainee)",
      organization: "Microsoft Cloud & Enterprise",
      location: "Hyderabad / Remote",
      stipend: "INR 75,000 / month",
      requiredSkills: ["React", "Node.js", "Cloud Architecture", "AWS"],
      preferredSkills: ["WebSockets", "Docker", "Kubernetes"],
      description: "Scale high-throughput enterprise developer tooling with modern web and microservices stacks.",
      deadline: "2026-11-30"
    },
    {
      id: "opp_3",
      title: "National Merit Young Technologist Fellowship",
      organization: "National Science & Technology Foundation",
      location: "New Delhi (Funded Residency)",
      stipend: "Grant of INR 3,50,000 + Mentorship",
      requiredSkills: ["Data Structures & Algorithms", "Academic Writing", "PyTorch"],
      preferredSkills: ["Zero-Knowledge Proofs", "Cryptography"],
      description: "Prestigious fellowship awarded to top undergraduate engineers with proven project impact and verified peer-reviewed publications.",
      deadline: "2026-12-15"
    }
  ]
};

// Initialize DB if not present
function getDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return initialData;
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Ensure database is populated
getDB();

// ---------------- API ROUTES ---------------- //

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', project: 'Unified Student Achievement Passport API', version: '2.0.0', timestamp: new Date() });
});

// GET all users
app.get('/api/users', (req, res) => {
  const db = getDB();
  res.json(db.users);
});

// GET current student profile
app.get('/api/student/profile', (req, res) => {
  const db = getDB();
  const student = db.users.find(u => u.role === 'student');
  if (!student) return res.status(404).json({ error: 'Student not found' });
  
  // Calculate dynamic stats
  const achievements = db.achievements.filter(a => a.studentId === student.id);
  const verifiedCount = achievements.filter(a => a.status === 'Verified').length;
  const pendingCount = achievements.filter(a => a.status === 'Pending').length;
  const unverifiedCount = achievements.filter(a => a.status === 'Unverified').length;
  const rejectedCount = achievements.filter(a => a.status === 'Rejected').length;

  res.json({
    ...student,
    stats: {
      totalAchievements: achievements.length,
      verified: verifiedCount,
      pending: pendingCount,
      unverified: unverifiedCount,
      rejected: rejectedCount
    }
  });
});

// UPDATE student profile
app.put('/api/student/profile', (req, res) => {
  const db = getDB();
  const idx = db.users.findIndex(u => u.role === 'student');
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });

  db.users[idx] = { ...db.users[idx], ...req.body };
  saveDB(db);
  res.json(db.users[idx]);
});

// GET achievements (with optional search, filter, sort)
app.get('/api/achievements', (req, res) => {
  const db = getDB();
  let list = db.achievements;
  const { category, status, search, sort } = req.query;

  if (category && category !== 'All') {
    list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (status && status !== 'All') {
    list = list.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.issuer.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.skills && item.skills.some(s => s.toLowerCase().includes(q)))
    );
  }

  if (sort === 'oldest') {
    list.sort((a, b) => new Date(a.dateEarned) - new Date(b.dateEarned));
  } else if (sort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default newest
    list.sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned));
  }

  res.json(list);
});

// POST new achievement
app.post('/api/achievements', (req, res) => {
  const db = getDB();
  const {
    title, category, issuer, dateEarned, description,
    credentialId, credentialUrl, demoUrl, skills, evidence,
    submitForVerification, contributionRole, expirationDate
  } = req.body;

  if (!title || !category || !issuer) {
    return res.status(400).json({ error: 'Title, category, and issuer are required.' });
  }

  // Calculate completeness
  let completeness = 0;
  if (title) completeness++;
  if (category) completeness++;
  if (issuer) completeness++;
  if (dateEarned) completeness++;
  if (evidence || credentialId || credentialUrl) completeness++;

  const newAch = {
    id: 'ach_' + Date.now(),
    studentId: 'usr_student_1',
    title,
    category,
    issuer,
    dateEarned: dateEarned || new Date().toISOString().split('T')[0],
    credentialId: credentialId || `USAP-REG-${Math.floor(100000 + Math.random() * 900000)}`,
    credentialUrl: credentialUrl || '',
    demoUrl: demoUrl || '',
    description: description || '',
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
    status: submitForVerification ? 'Pending' : 'Unverified',
    verifiedBy: null,
    verifiedAt: null,
    verificationMethod: submitForVerification ? 'Pending Institutional / Issuer Review' : 'Self-Reported Entry',
    evidence: evidence || 'Self-submitted document reference',
    evidenceCompleteness: completeness,
    contributionRole: contributionRole || 'Individual Contributor',
    expirationDate: expirationDate || 'Never'
  };

  db.achievements.unshift(newAch);

  // If submitted for verification, push to queue
  if (submitForVerification) {
    db.verificationQueue.unshift({
      id: 'vq_' + Date.now(),
      achievementId: newAch.id,
      studentName: 'Aarav Sharma',
      studentId: 'usr_student_1',
      achievementTitle: newAch.title,
      category: newAch.category,
      issuer: newAch.issuer,
      submittedDate: new Date().toISOString().split('T')[0],
      evidenceDetails: newAch.evidence || `Credential ID: ${newAch.credentialId}`,
      status: 'Pending',
      notes: ''
    });
  }

  saveDB(db);
  res.status(201).json(newAch);
});

// GET single achievement by ID
app.get('/api/achievements/:id', (req, res) => {
  const db = getDB();
  const ach = db.achievements.find(a => a.id === req.params.id);
  if (!ach) return res.status(404).json({ error: 'Achievement not found' });
  res.json(ach);
});

// REQUEST VERIFICATION or RECONSIDERATION
app.post('/api/achievements/:id/verify-request', (req, res) => {
  const db = getDB();
  const ach = db.achievements.find(a => a.id === req.params.id);
  if (!ach) return res.status(404).json({ error: 'Achievement not found' });

  ach.status = 'Pending';
  ach.verificationMethod = req.body.reconsideration 
    ? 'Reconsideration Appeal with Updated Evidence' 
    : 'Submitted for Institutional Review';

  if (req.body.updatedEvidence) {
    ach.evidence = req.body.updatedEvidence;
  }

  // Add to queue if not already there
  const existingQ = db.verificationQueue.find(q => q.achievementId === ach.id && q.status === 'Pending');
  if (!existingQ) {
    db.verificationQueue.unshift({
      id: 'vq_' + Date.now(),
      achievementId: ach.id,
      studentName: 'Aarav Sharma',
      studentId: 'usr_student_1',
      achievementTitle: ach.title,
      category: ach.category,
      issuer: ach.issuer,
      submittedDate: new Date().toISOString().split('T')[0],
      evidenceDetails: ach.evidence,
      status: 'Pending',
      notes: req.body.appealNote || 'Review requested by student'
    });
  }

  saveDB(db);
  res.json({ message: 'Verification request recorded in queue.', achievement: ach });
});

// DELETE achievement
app.delete('/api/achievements/:id', (req, res) => {
  const db = getDB();
  db.achievements = db.achievements.filter(a => a.id !== req.params.id);
  db.verificationQueue = db.verificationQueue.filter(q => q.achievementId !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Achievement removed.' });
});

// ---------------- VERIFICATION PORTAL (REVIEWER) ---------------- //

// GET Reviewer Queue
app.get('/api/reviewer/queue', (req, res) => {
  const db = getDB();
  res.json(db.verificationQueue);
});

// GET Review History
app.get('/api/reviewer/history', (req, res) => {
  const db = getDB();
  res.json(db.reviewHistory);
});

// PROCESS VERIFICATION (Approve / Reject / Request More Info)
app.post('/api/reviewer/decision', (req, res) => {
  const db = getDB();
  const { queueId, achievementId, decision, reviewerName, reviewerRole, notes, method } = req.body;

  const ach = db.achievements.find(a => a.id === achievementId);
  if (!ach) return res.status(404).json({ error: 'Achievement record not found' });

  const finalStatus = decision === 'Approved' ? 'Verified' : (decision === 'Rejected' ? 'Rejected' : 'Pending');
  ach.status = finalStatus;
  ach.verifiedBy = decision === 'Approved' ? `${reviewerName || 'Dr. Sunita Raman'} (${reviewerRole || 'Academic Council'})` : null;
  ach.verifiedAt = decision === 'Approved' ? new Date().toISOString().split('T')[0] : null;
  ach.verificationMethod = method || (decision === 'Approved' ? 'Institutional Review & Credential Match' : 'Evidence Insufficient');

  // Remove or update queue item
  db.verificationQueue = db.verificationQueue.filter(q => q.achievementId !== achievementId);

  // Append to history
  db.reviewHistory.unshift({
    id: 'rh_' + Date.now(),
    achievementId: ach.id,
    achievementTitle: ach.title,
    decision,
    reviewerName: reviewerName || 'Dr. Sunita Raman',
    reviewerRole: reviewerRole || 'Dean of Academic Affairs',
    timestamp: new Date().toLocaleString(),
    notes: notes || `Submission ${decision.toLowerCase()} after audit.`,
    verificationMethod: ach.verificationMethod
  });

  saveDB(db);
  res.json({ success: true, status: finalStatus, achievement: ach });
});

// ---------------- PASSPORTS & SHARING ---------------- //

// GET all student passports
app.get('/api/passports', (req, res) => {
  const db = getDB();
  res.json(db.passports);
});

// GET public / shared passport by slug
app.get('/api/passport/:slug', (req, res) => {
  const db = getDB();
  const passport = db.passports.find(p => p.shareSlug === req.params.slug);
  if (!passport) {
    return res.status(404).json({ error: 'Passport not found or link has expired/been revoked.' });
  }

  // Increment views
  passport.viewsCount = (passport.viewsCount || 0) + 1;
  saveDB(db);

  const student = db.users.find(u => u.id === passport.studentId) || db.users[0];
  const allAch = db.achievements.filter(a => a.studentId === student.id);
  const selectedAch = allAch.filter(a => passport.selectedAchievements.includes(a.id));

  res.json({
    passport,
    student: {
      name: student.name,
      college: student.college,
      degree: student.degree,
      branch: student.branch,
      academicYear: student.academicYear,
      graduationYear: student.graduationYear,
      cgpa: student.cgpa,
      bio: student.bio,
      interests: student.interests,
      avatar: student.avatar
    },
    achievements: selectedAch
  });
});

// CREATE or UPDATE custom passport
app.post('/api/passports', (req, res) => {
  const db = getDB();
  const { title, targetPurpose, theme, visibility, expiryDate, selectedAchievements, allowedSections, shareSlug } = req.body;

  const slug = shareSlug || ('pass-' + Math.random().toString(36).substring(2, 8));

  const newPassport = {
    id: 'pass_' + Date.now(),
    studentId: 'usr_student_1',
    shareSlug: slug,
    targetPurpose: targetPurpose || 'General Academic & Professional Profile',
    title: title || 'Custom Achievement Passport',
    theme: theme || 'sky-glass',
    visibility: visibility || 'Public',
    expiryDate: expiryDate || null,
    selectedAchievements: selectedAchievements || db.achievements.map(a => a.id),
    allowedSections: allowedSections || {
      profileOverview: true,
      summaryStats: true,
      skillsCloud: true,
      verifiedBadges: true,
      academicRecords: true,
      projectsShowcase: true,
      relationshipGraph: true,
      verificationAudits: true
    },
    viewsCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.passports.push(newPassport);
  saveDB(db);
  res.status(201).json(newPassport);
});

// REVOKE passport share link
app.delete('/api/passports/:id', (req, res) => {
  const db = getDB();
  db.passports = db.passports.filter(p => p.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Passport share link revoked.' });
});

// ---------------- OPPORTUNITY MATCHING ---------------- //
app.get('/api/opportunities', (req, res) => {
  const db = getDB();
  const achievements = db.achievements;
  const userSkills = new Set();
  achievements.forEach(a => {
    if (a.skills) a.skills.forEach(s => userSkills.add(s.toLowerCase()));
  });

  const matched = db.opportunities.map(opp => {
    const reqMatches = opp.requiredSkills.filter(s => userSkills.has(s.toLowerCase()));
    const prefMatches = opp.preferredSkills.filter(s => userSkills.has(s.toLowerCase()));
    const matchPercentage = Math.round((reqMatches.length / opp.requiredSkills.length) * 100);

    return {
      ...opp,
      matchedSkills: reqMatches,
      matchedPreferred: prefMatches,
      matchPercentage: Math.min(matchPercentage, 100),
      missingSkills: opp.requiredSkills.filter(s => !userSkills.has(s.toLowerCase()))
    };
  });

  res.json(matched);
});

// Always serve production built frontend client
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Unified Student Achievement Passport Server listening on port ${PORT}`);
});
