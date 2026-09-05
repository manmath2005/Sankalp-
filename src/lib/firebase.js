import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCE9B_HC7WTZXg74yC3uidmlDKTr1YkQGk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sankalp-18550.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sankalp-18550",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sankalp-18550.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "863175038157",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:863175038157:web:46365a01c41951e0a68584"
};

// Check if production Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  (import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey) && 
  (import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId)
);

// Initialize Firebase App safely (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export Firebase Auth instance
export const auth = getAuth(app);

/**
 * Initialize Invisible reCAPTCHA Verifier
 * @param {string} containerId - Element ID (e.g. 'recaptcha-container') or button
 * @param {Function} onSolved - Optional callback when captcha is solved
 * @param {Function} onExpired - Optional callback when captcha expires
 * @returns {RecaptchaVerifier}
 */
export const initRecaptchaVerifier = (containerId = 'recaptcha-container', onSolved = null, onExpired = null) => {
  if (typeof window === 'undefined') return null;

  try {
    // Clear existing verifier if any
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Could not clear previous recaptchaVerifier", e);
      }
      window.recaptchaVerifier = null;
    }

    const containerElem = document.getElementById(containerId);
    if (!containerElem) {
      console.warn(`reCAPTCHA container #${containerId} not found in DOM yet.`);
    }

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response) => {
        if (onSolved) onSolved(response);
      },
      'expired-callback': () => {
        if (onExpired) onExpired();
      }
    });

    window.recaptchaVerifier = verifier;
    return verifier;
  } catch (err) {
    console.error("Failed to initialize Firebase RecaptchaVerifier:", err);
    return null;
  }
};

/**
 * Send Phone Verification OTP via Firebase Phone Auth
 * @param {string} phoneNumber - Full E.164 phone number, e.g. "+919876543210"
 * @param {RecaptchaVerifier} [appVerifier] - Optional reCAPTCHA instance
 * @returns {Promise<{ confirmationResult: any, isMock: boolean }>}
 */
export const sendFirebasePhoneOtp = async (phoneNumber, appVerifier = null) => {
  const cleanPhone = (phoneNumber || '').toString().trim();
  if (!cleanPhone) {
    throw new Error("Phone number is required for OTP delivery.");
  }

  // Ensure E.164 format with +91 if missing
  const formattedE164 = cleanPhone.startsWith('+') 
    ? cleanPhone 
    : `+91${cleanPhone.replace(/\D/g, '').slice(-10)}`;

  // If real Firebase keys are configured, use actual Firebase Phone Auth
  if (isFirebaseConfigured) {
    const verifier = appVerifier || window.recaptchaVerifier || initRecaptchaVerifier('recaptcha-container');
    if (!verifier) {
      throw new Error("Unable to initialize reCAPTCHA verifier for phone authentication.");
    }

    const confirmationResult = await signInWithPhoneNumber(auth, formattedE164, verifier);
    return {
      confirmationResult,
      formattedPhone: formattedE164,
      isMock: false
    };
  }

  // Development Fallback / Simulation Mode when API keys are pending
  const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const mockConfirmationResult = {
    verificationId: `mock_vid_${Date.now()}`,
    confirm: async (code) => {
      const cleanCode = (code || '').toString().trim();
      if (cleanCode === simulatedOtp || cleanCode === '123456') {
        return {
          user: {
            uid: `firebase_usr_${Date.now().toString().slice(-6)}`,
            phoneNumber: formattedE164,
            displayName: "Firebase Verified User",
            email: null,
            metadata: { creationTime: new Date().toISOString() }
          }
        };
      }
      const error = new Error("Invalid verification code. Please check the 6-digit code.");
      error.code = 'auth/invalid-verification-code';
      throw error;
    }
  };

  return {
    confirmationResult: mockConfirmationResult,
    simulatedOtp,
    formattedPhone: formattedE164,
    isMock: true
  };
};

/**
 * Confirm 6-Digit OTP with Firebase confirmationResult
 * @param {object} confirmationResult - Object returned by signInWithPhoneNumber
 * @param {string} otpCode - 6 digit numeric code
 * @returns {Promise<any>}
 */
export const confirmFirebasePhoneOtp = async (confirmationResult, otpCode) => {
  if (!confirmationResult || typeof confirmationResult.confirm !== 'function') {
    throw new Error("Active verification session not found. Please request a new OTP.");
  }

  const cleanCode = (otpCode || '').toString().trim();
  if (cleanCode.length !== 6) {
    throw new Error("Please enter all 6 digits of your verification code.");
  }

  return await confirmationResult.confirm(cleanCode);
};

/**
 * Format Firebase Auth Error Codes to user-friendly messages
 * @param {Error|object} error 
 * @returns {string}
 */
export const formatFirebaseError = (error) => {
  if (!error) return "An unknown error occurred during authentication.";

  const code = error.code || "";
  const msg = error.message || "";

  switch (code) {
    case 'auth/invalid-phone-number':
      return "The phone number entered is invalid. Please enter a valid 10-digit Indian mobile number (+91).";
    case 'auth/missing-phone-number':
      return "Please provide a valid mobile number.";
    case 'auth/quota-exceeded':
      return "SMS quota for this project has been exceeded. Please try again later or use Email OTP.";
    case 'auth/too-many-requests':
      return "Too many OTP requests were made from this device. Please wait a few minutes before trying again.";
    case 'auth/invalid-verification-code':
      return "Incorrect 6-digit verification code. Please check your SMS and try again.";
    case 'auth/code-expired':
      return "This verification code has expired (5-minute limit). Please click 'Resend OTP'.";
    case 'auth/captcha-check-failed':
      return "Security reCAPTCHA verification failed. Please refresh the page and try again.";
    case 'auth/network-request-failed':
      return "Network connection issue. Please check your internet connection.";
    case 'auth/user-disabled':
      return "This account has been disabled by the administrator.";
    case 'auth/operation-not-allowed':
      return "Phone authentication is not enabled in the Firebase Console. Please enable Phone provider in Firebase.";
    default:
      if (msg.includes("reCAPTCHA")) {
        return "Security verification failed. Please refresh and try again.";
      }
      return msg || "Phone verification failed. Please try again.";
  }
};
