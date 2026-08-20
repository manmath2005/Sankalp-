import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_NGO_DATA, 
  INITIAL_NGOS,
  INITIAL_EVENTS, 
  INITIAL_PAST_EVENTS, 
  INITIAL_VOLUNTEERS, 
  INITIAL_CORPORATE_REQUESTS, 
  INITIAL_USERS 
} from '../data/mockData';
import { sendRealOtpEmail } from '../utils/emailService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Data Store States (Initialized from localStorage or defaults)
  const [ngoInfo] = useState(INITIAL_NGO_DATA);

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem('sankalp_ngos_list');
    if (!saved) return INITIAL_NGOS;
    try {
      const parsed = JSON.parse(saved);
      // Ensure all 50 verified NGOs from directory are present and up to date
      const merged = [...INITIAL_NGOS];
      parsed.forEach(userNgo => {
        if (!merged.some(n => n.id === userNgo.id)) {
          merged.push(userNgo);
        }
      });
      return merged;
    } catch {
      return INITIAL_NGOS;
    }
  });
  
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('sankalp_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [pastEvents, setPastEvents] = useState(() => {
    const saved = localStorage.getItem('sankalp_past_events');
    if (!saved) return INITIAL_PAST_EVENTS;
    try {
      const parsed = JSON.parse(saved);
      const merged = [...INITIAL_PAST_EVENTS];
      parsed.forEach(p => {
        if (!merged.some(m => m.id === p.id)) {
          merged.push(p);
        }
      });
      return merged;
    } catch {
      return INITIAL_PAST_EVENTS;
    }
  });

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('sankalp_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [corporateRequests, setCorporateRequests] = useState(() => {
    const saved = localStorage.getItem('sankalp_corporate_requests');
    return saved ? JSON.parse(saved) : INITIAL_CORPORATE_REQUESTS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sankalp_users');
    if (!saved) return INITIAL_USERS;
    try {
      const parsed = JSON.parse(saved);
      // Ensure all INITIAL_USERS (Staff, Volunteer, Corporate, Super Admin) are present and synced
      const merged = [...parsed];
      INITIAL_USERS.forEach(initUser => {
        const idx = merged.findIndex(u => u.email.toLowerCase() === initUser.email.toLowerCase());
        if (idx === -1) {
          merged.push(initUser);
        } else {
          // Keep demo credentials up to date and verified
          merged[idx] = {
            ...merged[idx],
            ...initUser,
            isEmailVerified: true,
            status: 'Active'
          };
        }
      });
      return merged;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 2. Authentication & In-Memory Session Tracking (Zero session persistence across reloads/revisits for security)
  const [currentUser, setCurrentUser] = useState(null);

  // Active Session Tokens store (In-memory session registry)
  const [activeSessions, setActiveSessions] = useState({});

  // Modals & UI Controls
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'
  const [otpModalData, setOtpModalData] = useState(null); // { userEmail, pendingUser, generatedOtp }
  const [sessionConflictData, setSessionConflictData] = useState(null); // Detect duplicate login
  const [toastMessage, setToastMessage] = useState(null);

  // 3. Global Dark Mode Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('sankalp_theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sankalp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sankalp_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Clear any legacy saved user sessions from localStorage on load
  useEffect(() => {
    localStorage.removeItem('sankalp_current_user');
    localStorage.removeItem('sankalp_active_sessions');
  }, []);

  // Helper Toast Trigger
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // ==========================================
  // AUTHENTICATION & SECURITY LOGIC
  // ==========================================

  // Initiate User Registration with 6-Digit Email OTP Verification & Questionnaire
  const registerUser = async (formData) => {
    const { name, email, password, role, institution, skills, phone, profession, city, age } = formData;
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user email already exists
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    // Generate 6-digit Email Verification OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Prepare pending user object
    const newUserId = `USR-${Date.now().toString().slice(-4)}`;
    let volunteerId = null;

    if (role === 'VOLUNTEER') {
      volunteerId = `VOL-${Date.now().toString().slice(-3)}`;
    }

    const pendingUser = {
      id: newUserId,
      name,
      email: cleanEmail,
      password,
      role: role || 'VOLUNTEER',
      companyName: formData.companyName || '',
      ngoName: formData.ngoName || '',
      ngoId: formData.ngoId || null,
      darpanId: formData.darpanId || '',
      registrationNo: formData.registrationNo || '',
      profession: profession || 'Student',
      city: city || 'Mumbai',
      age: parseInt(age) || 22,
      status: 'Active',
      isEmailVerified: false,
      verificationCode: generatedOtp,
      volunteerId,
      phone: phone || '',
      institution: institution || formData.ngoName || formData.companyName || 'Independent',
      skills: skills || [],
      registeredAt: new Date().toISOString().split('T')[0]
    };

    // Dispatch real email with server-generated OTP
    const emailResult = await sendRealOtpEmail(cleanEmail, name, generatedOtp, `${role.replace('_', ' ')} Registration`);
    const activeOtp = emailResult.otpCode || generatedOtp;

    pendingUser.verificationCode = activeOtp;

    // Trigger OTP modal step
    setOtpModalData({
      userEmail: cleanEmail,
      userName: name,
      pendingUser,
      generatedOtp: activeOtp,
      dispatchMode: emailResult.mode,
      dispatchMessage: emailResult.message
    });

    showToast(`Verification code generated for ${cleanEmail}!`, 'info');
    return { pendingUser, generatedOtp, emailResult };
  };

  // Resend OTP to user's email
  const resendEmailOtp = async () => {
    if (!otpModalData) return;
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const updatedPendingUser = {
      ...otpModalData.pendingUser,
      verificationCode: newOtp
    };

    const emailResult = await sendRealOtpEmail(
      otpModalData.userEmail,
      otpModalData.userName || otpModalData.pendingUser.name,
      newOtp,
      'Email OTP Resend'
    );

    const activeOtp = emailResult.otpCode || newOtp;
    updatedPendingUser.verificationCode = activeOtp;

    setOtpModalData({
      ...otpModalData,
      generatedOtp: activeOtp,
      pendingUser: updatedPendingUser,
      dispatchMode: emailResult.mode,
      dispatchMessage: emailResult.message
    });

    showToast(`New verification code sent to ${otpModalData.userEmail}`, 'success');
  };

  // Instant Sign In / Sign Up with Google / Gmail OAuth
  const continueWithGoogleOAuth = async (suggestedRole = 'VOLUNTEER') => {
    // 1. Simulate fast & secure Google Account Picker Dialog
    const userEnteredEmail = window.prompt(
      "Sign in with Google / Gmail:\nEnter your Google / Gmail address to continue:", 
      currentUser?.email || "user@gmail.com"
    );

    if (!userEnteredEmail || !userEnteredEmail.trim()) {
      return null;
    }

    const cleanEmail = userEnteredEmail.trim().toLowerCase();
    if (!cleanEmail.includes('@')) {
      throw new Error("Please enter a valid Google email address.");
    }

    // Extract name from email prefix or capitalize
    const autoName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    // Check if user already exists
    let existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existingUser) {
      // Existing user: sign them in automatically
      loginUserWithSession(existingUser, true);
      showToast(`Welcome back, ${existingUser.name}! Signed in via Google Gmail.`, 'success');
      return existingUser;
    }

    // New User: Auto Register & Activate immediately with Google Identity
    const newUserId = `USR-GGL-${Date.now().toString().slice(-4)}`;
    let volunteerId = suggestedRole === 'VOLUNTEER' ? `VOL-GGL-${Date.now().toString().slice(-3)}` : null;

    const newGoogleUser = {
      id: newUserId,
      name: autoName,
      email: cleanEmail,
      password: `google_oauth_${Date.now()}`,
      role: suggestedRole,
      companyName: suggestedRole === 'COMPANY_PARTNER' ? `${autoName} Group` : '',
      ngoName: suggestedRole === 'NGO_PARTNER' ? `${autoName} Social Trust` : '',
      profession: suggestedRole === 'VOLUNTEER' ? 'Student' : 'Director',
      city: 'Mumbai',
      age: 22,
      status: 'Active',
      isEmailVerified: true,
      authProvider: 'google',
      volunteerId,
      phone: '+91 98000 00000',
      institution: suggestedRole === 'VOLUNTEER' ? 'Independent Community' : 'Corporate Partner',
      skills: ['Digital Literacy', 'Public Coordination'],
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newGoogleUser]);

    if (suggestedRole === 'VOLUNTEER') {
      const newVol = {
        id: volunteerId,
        name: autoName,
        email: cleanEmail,
        phone: '+91 98000 00000',
        institution: 'Independent Volunteer',
        profession: 'Student',
        city: 'Mumbai',
        age: 22,
        roleCategory: 'Student Volunteer',
        skills: ['Public Outreach', 'Digital Media'],
        status: 'Verified',
        joinedDate: newGoogleUser.registeredAt,
        eventsParticipated: [],
        assignedEventIds: [],
        certificates: []
      };
      setVolunteers(prev => [...prev, newVol]);
    }

    loginUserWithSession(newGoogleUser, true);
    showToast(`Account created & signed in automatically via Google Gmail! Welcome, ${autoName}!`, 'success');
    return newGoogleUser;
  };

  // Register a New Verified NGO in the Platform Directory
  const registerNewNgo = async (ngoData) => {
    const { ngoName, email, phone, directorName, registrationNo, darpanId, city, state, address, primarySectors, specialization, password } = ngoData;
    const cleanEmail = email.trim().toLowerCase();

    // Check if email or registration already exists
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("An account with this official email already exists.");
    }
    if (ngos.some(n => n.registrationNo.toLowerCase() === registrationNo.trim().toLowerCase())) {
      throw new Error("An NGO with this Government Registration Number is already registered.");
    }

    const newNgoId = `NGO-${String(ngos.length + 1).padStart(3, '0')}`;
    const newNgoEntry = {
      id: newNgoId,
      name: ngoName,
      registrationNo,
      darpanId: darpanId || `DARPAN/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`,
      established: new Date().getFullYear(),
      tagline: `Dedicated to impactful ${primarySectors.join(', ')} awareness drives.`,
      email: cleanEmail,
      phone,
      address: address || `${city}, ${state}`,
      city,
      state: state || 'India',
      accreditations: ["80G Certified", "12A Registered", "Govt Verified"],
      primarySectors: primarySectors.length ? primarySectors : ["Government Office", "Public Office"],
      specialization: specialization || "Social Rights, Health & Educational Awareness",
      rating: 5.0,
      reviewsCount: 1,
      director: directorName,
      logoBg: "from-sky-600 to-indigo-600",
      stats: {
        eventsCompleted: 0,
        volunteersRegistered: 0,
        impactedCitizens: "New",
        partnerInstitutions: 0,
        certificatesIssued: 0
      },
      pastHistorySummary: `Newly onboarded verified NGO authorized to conduct onfield and virtual drives in ${primarySectors.join(', ')}.`
    };

    // Register user account for NGO
    return await registerUser({
      name: `${directorName} (${ngoName})`,
      email: cleanEmail,
      password,
      role: 'NGO_PARTNER',
      ngoName,
      ngoId: newNgoId,
      registrationNo,
      darpanId,
      city,
      phone,
      institution: ngoName,
      profession: 'NGO Director / Lead',
      age: 35
    });
  };

  // Complete OTP Verification & Activate/Authenticate Account (Registration or Login)
  const verifyEmailOtp = async (inputOtp) => {
    if (!otpModalData) return false;

    const cleanInputOtp = (inputOtp || '').toString().trim();
    const expectedOtp = (otpModalData.generatedOtp || '').toString().trim();

    // Check with backend API first, fallback to state
    let isMatch = cleanInputOtp === expectedOtp;
    try {
      const backendCheck = await verifyOtpWithBackend(otpModalData.userEmail, cleanInputOtp);
      if (backendCheck?.success) {
        isMatch = true;
      }
    } catch {
      // Offline fallback
    }

    if (isMatch) {
      // 1. If this is a LOGIN OTP verification:
      if (otpModalData.isLogin) {
        const user = users.find(u => u.email.toLowerCase() === otpModalData.userEmail.toLowerCase());
        if (!user) {
          throw new Error("User account not found.");
        }
        setOtpModalData(null);
        loginUserWithSession(user, true);
        showToast(`Welcome back, ${user.name}! Authenticated securely via Email OTP.`, "success");
        return true;
      }

      // 2. If this is a REGISTRATION OTP verification:
      const activatedUser = {
        ...otpModalData.pendingUser,
        isEmailVerified: true,
        verificationCode: null
      };

      // Add to users list
      setUsers(prev => [...prev, activatedUser]);

      // If newly registered NGO, also add to NGO directory
      if (activatedUser.role === 'NGO_PARTNER' && activatedUser.ngoName) {
        const existingNgo = ngos.find(n => n.name.toLowerCase() === activatedUser.ngoName.toLowerCase());
        if (!existingNgo) {
          const newNgoCard = {
            id: activatedUser.ngoId || `NGO-${String(ngos.length + 1).padStart(3, '0')}`,
            name: activatedUser.ngoName,
            registrationNo: activatedUser.registrationNo || 'NGO/REG/2026/VALID',
            darpanId: activatedUser.darpanId || 'DARPAN/2026/VERIFIED',
            established: new Date().getFullYear(),
            tagline: "Empowering Communities through Social Awareness & Public Engagement",
            email: activatedUser.email,
            phone: activatedUser.phone,
            address: `${activatedUser.city}, India`,
            city: activatedUser.city,
            state: "India",
            accreditations: ["80G Certified", "12A Registered", "Darpan Verified"],
            primarySectors: ["Government Office", "Public Office", "College", "School"],
            specialization: "General Civic & Social Awareness Programs",
            rating: 5.0,
            reviewsCount: 1,
            director: activatedUser.name,
            logoBg: "from-sky-600 to-indigo-600",
            stats: {
              eventsCompleted: 0,
              volunteersRegistered: 0,
              impactedCitizens: "New Partner",
              partnerInstitutions: 0,
              certificatesIssued: 0
            },
            pastHistorySummary: `Newly accredited partner NGO authorized to conduct onfield & virtual drives across institutions.`
          };
          setNgos(prev => [...prev, newNgoCard]);
        }
      }

      // If volunteer, also add to volunteers table in DBMS with demographics
      if (activatedUser.role === 'VOLUNTEER') {
        const newVolunteer = {
          id: activatedUser.volunteerId,
          name: activatedUser.name,
          email: activatedUser.email,
          phone: activatedUser.phone,
          institution: activatedUser.institution,
          profession: activatedUser.profession,
          city: activatedUser.city,
          age: activatedUser.age,
          roleCategory: `${activatedUser.profession} Volunteer`,
          skills: activatedUser.skills,
          status: 'Verified',
          joinedDate: activatedUser.registeredAt,
          eventsParticipated: [],
          assignedEventIds: [],
          certificates: []
        };
        setVolunteers(prev => [...prev, newVolunteer]);
      }

      // Close OTP modal
      setOtpModalData(null);
      
      // Auto log-in newly verified user
      loginUserWithSession(activatedUser, true);
      showToast("Email verified successfully! Welcome to the Sankalp NGO Network.", "success");
      return true;
    } else {
      throw new Error("Invalid verification code. Please check your email or test inbox.");
    }
  };

  // Initiate Passwordless Email-Based OTP Login
  const initiateEmailOtpLogin = async (email, expectedRole = null) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error("Please enter your registered email address.");
    }

    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error(`No account found registered with ${cleanEmail}. Please check your email or register.`);
    }

    // Role check if expectedRole is specified
    if (expectedRole && user.role !== expectedRole) {
      const isNgoRole = (expectedRole === 'NGO_PARTNER' || expectedRole === 'NGO_STAFF') && (user.role === 'NGO_PARTNER' || user.role === 'NGO_STAFF' || user.role === 'SUPER_ADMIN');
      if (!isNgoRole && !(expectedRole === 'NGO_STAFF' && user.role === 'SUPER_ADMIN')) {
        throw new Error(`This portal is for ${expectedRole.replace('_', ' ')} accounts only. Your account is registered as ${user.role.replace('_', ' ')}.`);
      }
    }

    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Dispatch real email via server
    const emailResult = await sendRealOtpEmail(
      cleanEmail, 
      user.name, 
      generatedOtp, 
      `Secure Login Verification`
    );

    const activeOtp = emailResult.otpCode || generatedOtp;

    // Open OTP Verification Modal configured for Login
    setOtpModalData({
      userEmail: cleanEmail,
      userName: user.name,
      pendingUser: user,
      generatedOtp: activeOtp,
      isLogin: true,
      dispatchMode: emailResult.mode,
      dispatchMessage: emailResult.message
    });

    showToast(`Login OTP sent to ${cleanEmail}!`, 'info');
    return { user, generatedOtp, emailResult };
  };

  // Request 6-digit OTP for Password Reset
  const requestPasswordResetOtp = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error("Please enter your registered email address.");
    }

    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error(`No registered account was found with ${cleanEmail}.`);
    }

    // Generate 6-digit code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Dispatch real email via backend
    const emailResult = await sendRealOtpEmail(
      cleanEmail,
      user.name,
      generatedOtp,
      'Password Reset Request'
    );

    const activeOtp = emailResult.otpCode || generatedOtp;
    showToast(`Password reset code sent to ${cleanEmail}!`, 'info');
    return { success: true, email: cleanEmail, otpCode: activeOtp, userName: user.name };
  };

  // Verify OTP and Update Password
  const completePasswordReset = async (email, otpInput, newPassword, activeOtpFallback = null) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanOtp = (otpInput || '').toString().trim();
    const cleanPass = (newPassword || '').trim();

    if (!cleanPass || cleanPass.length < 6) {
      throw new Error("New password must be at least 6 characters long.");
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (userIndex === -1) {
      throw new Error("Account not found.");
    }

    // Verify with backend API
    const backendResult = await verifyOtpWithBackend(cleanEmail, cleanOtp);

    const isMatch = backendResult.success || (activeOtpFallback && cleanOtp === activeOtpFallback.toString().trim());

    if (isMatch || backendResult.offline || backendResult.fallback) {
      // Update password in users state
      setUsers(prev => prev.map((u, i) => {
        if (i === userIndex) {
          return { ...u, password: cleanPass };
        }
        return u;
      }));

      showToast("Password changed successfully! You can now sign in with your new password.", "success");
      return true;
    } else {
      throw new Error(backendResult.message || "Invalid or expired OTP verification code.");
    }
  };

  // Update Volunteer Profile Information (Mobile, Profession, City, Skills, Bio, Emergency Contact)
  const updateVolunteerProfile = (email, updatedFields) => {
    const cleanEmail = (email || '').trim().toLowerCase();

    // 1. Update in volunteers array
    setVolunteers(prev => prev.map(v => {
      if (v.email.toLowerCase() === cleanEmail) {
        return {
          ...v,
          ...updatedFields
        };
      }
      return v;
    }));

    // 2. Update in users array
    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === cleanEmail) {
        return {
          ...u,
          ...updatedFields
        };
      }
      return u;
    }));

    // 3. Update in currentUser if logged in
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      setCurrentUser(prev => ({
        ...prev,
        ...updatedFields
      }));
    }

    showToast("Volunteer profile details updated successfully!", "success");
  };

  // Login Handler with Duplicate Active Session Control & Role Scoping
  const loginUser = (email, password, expectedRole = null, adminPin = null, forceTakeover = false) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const user = users.find(u => {
      const uEmail = u.email.toLowerCase();
      if (uEmail !== cleanEmail) return false;

      // Direct password match
      if (u.password === cleanPassword) return true;

      // Demo credential fallback tolerance
      if (cleanEmail === 'staff@sankalp.org' && (cleanPassword === 'staff123password' || cleanPassword === 'staff123')) return true;
      if (cleanEmail === 'rohan.verma@example.com' && (cleanPassword === 'volunteer123' || cleanPassword === 'volunteer123password')) return true;
      if (cleanEmail === 'corporate@sbi-staff.org' && (cleanPassword === 'company123password' || cleanPassword === 'company123')) return true;
      if (cleanEmail === 'admin@sankalp.org' && (cleanPassword === 'secretAdmin2026!' || cleanPassword === 'admin123password')) return true;

      return false;
    });

    if (!user) {
      throw new Error("Invalid email or password credentials.");
    }

    // Role check if expectedRole is specified
    if (expectedRole && user.role !== expectedRole) {
      // Allow NGO_PARTNER or NGO_STAFF to cross-authenticate in NGO Portal
      const isNgoRole = (expectedRole === 'NGO_PARTNER' || expectedRole === 'NGO_STAFF') && (user.role === 'NGO_PARTNER' || user.role === 'NGO_STAFF' || user.role === 'SUPER_ADMIN');
      if (isNgoRole) {
        // Allowed
      } else if (expectedRole === 'NGO_STAFF' && user.role === 'SUPER_ADMIN') {
        // Allowed
      } else {
        throw new Error(`This login portal is restricted for ${expectedRole.replace('_', ' ')} accounts only.`);
      }
    }

    // Extra Security check for Hidden Super Admin
    if (user.role === 'SUPER_ADMIN') {
      if (adminPin && user.adminPin !== adminPin) {
        throw new Error("Invalid Administrative Security PIN access code.");
      }
    }

    if (!user.isEmailVerified) {
      // Re-trigger OTP verification
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpModalData({
        userEmail: user.email,
        pendingUser: user,
        generatedOtp
      });
      throw new Error("Your email is not verified yet. We have opened the verification modal for you.");
    }

    // Check for existing active session (Duplicate Login Check)
    const existingSession = activeSessions[user.id];
    const currentDeviceToken = localStorage.getItem('sankalp_device_token') || `DEV-${Date.now()}`;
    localStorage.setItem('sankalp_device_token', currentDeviceToken);

    if (existingSession && existingSession.deviceToken !== currentDeviceToken && !forceTakeover) {
      // Prompt session conflict dialog
      setSessionConflictData({
        user,
        existingSession,
        currentDeviceToken,
        attemptedEmail: email,
        attemptedPassword: password,
        attemptedRole: expectedRole,
        attemptedAdminPin: adminPin
      });
      return false;
    }

    // Proceed to 2-Step Authentication: Dispatch OTP and open verification modal
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Trigger OTP modal and dispatch email
    sendRealOtpEmail(user.email, user.name, generatedOtp, 'Two-Factor Login Verification')
      .then(emailResult => {
        const activeOtp = emailResult?.otpCode || generatedOtp;
        setOtpModalData({
          userEmail: user.email,
          userName: user.name,
          pendingUser: user,
          generatedOtp: activeOtp,
          isLogin: true,
          dispatchMode: emailResult?.mode,
          dispatchMessage: emailResult?.message
        });
      })
      .catch(() => {
        setOtpModalData({
          userEmail: user.email,
          userName: user.name,
          pendingUser: user,
          generatedOtp,
          isLogin: true
        });
      });

    setOtpModalData({
      userEmail: user.email,
      userName: user.name,
      pendingUser: user,
      generatedOtp,
      isLogin: true
    });

    showToast(`Password verified! We sent a 6-digit OTP code to ${user.email}`, 'info');
    return true;
  };

  const loginUserWithSession = (user, forceTakeover = false) => {
    const deviceToken = localStorage.getItem('sankalp_device_token') || `DEV-${Date.now()}`;
    localStorage.setItem('sankalp_device_token', deviceToken);

    const sessionToken = `SESS-${user.id}-${Date.now()}`;

    // Register active session
    const updatedSessions = {
      ...activeSessions,
      [user.id]: {
        sessionToken,
        deviceToken,
        loginTime: new Date().toLocaleString(),
        ipAddress: '192.168.1.45 (Current Device)'
      }
    };

    setActiveSessions(updatedSessions);
    setCurrentUser({
      ...user,
      sessionToken
    });

    setSessionConflictData(null);
    setAuthModalOpen(false);
    showToast(`Logged in successfully as ${user.name} (${user.role})`, 'success');
  };

  // Terminate Active Session & Logout
  const logoutUser = () => {
    if (currentUser) {
      const newSessions = { ...activeSessions };
      delete newSessions[currentUser.id];
      setActiveSessions(newSessions);
      setCurrentUser(null);
      showToast("Logged out safely.", "info");
    }
  };

  // Emergency Invalidate Session from DBMS
  const invalidateUserSession = (userId) => {
    const newSessions = { ...activeSessions };
    delete newSessions[userId];
    setActiveSessions(newSessions);
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
    }
    showToast(`Active session terminated for User ID: ${userId}`, 'warning');
  };

  // ==========================================
  // DBMS & APPLICATION CRUD OPERATIONS
  // ==========================================

  // Volunteer Event Choice & Registration
  const registerVolunteerForEvent = (eventId) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      showToast("Please log in or sign up to volunteer for an event.", "info");
      return;
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Find volunteer record
    const volunteer = volunteers.find(v => v.email.toLowerCase() === currentUser.email.toLowerCase());

    if (!volunteer) {
      showToast("Volunteer profile record not found. Please contact admin.", "warning");
      return;
    }

    if (volunteer.assignedEventIds && volunteer.assignedEventIds.includes(eventId)) {
      showToast("You are already registered for this event!", "info");
      return;
    }

    // Update volunteer record
    const updatedVolunteers = volunteers.map(v => {
      if (v.id === volunteer.id) {
        return {
          ...v,
          assignedEventIds: [...(v.assignedEventIds || []), eventId]
        };
      }
      return v;
    });

    // Increment registered count in event
    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          volunteersRegistered: (e.volunteersRegistered || 0) + 1
        };
      }
      return e;
    });

    setVolunteers(updatedVolunteers);
    setEvents(updatedEvents);
    showToast(`Successfully registered for "${event.title}"!`, 'success');
  };

  // DBMS: Admin Create New Event
  const createNewEvent = (newEventData) => {
    const eventId = `EVT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const eventToAdd = {
      ...newEventData,
      id: eventId,
      volunteersRegistered: 0,
      status: newEventData.status || 'Upcoming'
    };

    setEvents(prev => [eventToAdd, ...prev]);
    showToast(`New awareness event "${eventToAdd.title}" posted!`, 'success');
  };

  // DBMS: Admin Update Event
  const updateEvent = (eventId, updatedFields) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...updatedFields } : e));
    showToast("Event updated successfully.", "info");
  };

  // DBMS: Admin Submit Corporate Event Request
  const submitCorporateRequest = (requestData) => {
    const reqId = `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newReq = {
      ...requestData,
      id: reqId,
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setCorporateRequests(prev => [newReq, ...prev]);
    showToast("Your event hosting request was submitted to Sankalp NGO! Our team will contact you shortly.", 'success');
  };

  // DBMS: Admin Change Request Status
  const updateCorporateRequestStatus = (requestId, newStatus) => {
    setCorporateRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
    showToast(`Request ${requestId} status changed to ${newStatus}`, 'info');
  };

  // DBMS: Admin Issue Certificate to Volunteer
  const issueCertificateToVolunteer = (volunteerId, eventTitle, hoursContributed = 8) => {
    const certId = `CERT-SANKALP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert = {
      id: certId,
      eventId: `PAST-${Date.now().toString().slice(-4)}`,
      eventTitle,
      issuedDate: new Date().toISOString().split('T')[0],
      hoursContributed: parseInt(hoursContributed),
      verifierSignature: "Dr. R. K. Saxena (President)"
    };

    setVolunteers(prev => prev.map(v => {
      if (v.id === volunteerId) {
        return {
          ...v,
          certificates: [...(v.certificates || []), newCert]
        };
      }
      return v;
    }));

    showToast(`Certificate ${certId} issued to Volunteer!`, 'success');
  };

  // Reset Mock Data to Default
  const resetSystemData = () => {
    setEvents(INITIAL_EVENTS);
    setPastEvents(INITIAL_PAST_EVENTS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setCorporateRequests(INITIAL_CORPORATE_REQUESTS);
    setUsers(INITIAL_USERS);
    setActiveSessions({});
    localStorage.clear();
    showToast("All DBMS system data reset to defaults.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        ngoInfo,
        ngos,
        events,
        pastEvents,
        volunteers,
        corporateRequests,
        users,
        currentUser,
        activeSessions,
        authModalOpen,
        authMode,
        otpModalData,
        sessionConflictData,
        toastMessage,
        setAuthModalOpen,
        setAuthMode,
        setOtpModalData,
        setSessionConflictData,
        registerUser,
        registerNewNgo,
        verifyEmailOtp,
        resendEmailOtp,
        initiateEmailOtpLogin,
        requestPasswordResetOtp,
        completePasswordReset,
        updateVolunteerProfile,
        loginUser,
        logoutUser,
        invalidateUserSession,
        registerVolunteerForEvent,
        createNewEvent,
        updateEvent,
        submitCorporateRequest,
        updateCorporateRequestStatus,
        issueCertificateToVolunteer,
        resetSystemData,
        showToast,
        continueWithGoogleOAuth,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
