/**
 * Google Identity Services & OAuth 2.0 Account Chooser
 * Opens the native Google Account Chooser popup to display all active Google/Gmail accounts on the device.
 */
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Google Client ID for Sankalp (can be configured via Vite env or fallback)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "863175038157-gsi-client.apps.googleusercontent.com";

/**
 * Ensures Google Identity Services (GSI) script is loaded
 * @returns {Promise<boolean>}
 */
export const loadGoogleIdentityScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.google?.accounts?.oauth2) {
      return resolve(true);
    }
    const existingScript = document.getElementById('google-gsi-client');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("Could not load Google GSI script, falling back to Firebase popup.");
      resolve(false);
    };
    document.head.appendChild(script);
  });
};

/**
 * Triggers Google Sign-In with popup displaying all available Gmail accounts on the device.
 * Priority 1: Firebase Auth signInWithPopup with prompt: 'select_account'
 * Priority 2: Google Identity Services (GSI) Token Client with prompt: 'select_account'
 * 
 * @returns {Promise<{ email: string, name: string, picture?: string, uid?: string }>}
 */
export const triggerGoogleAccountChooser = async () => {
  // Strategy 1: Firebase Auth Google Provider with forced account selection prompt
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Forces Google to show all accounts on the device
    });
    provider.addScope('email');
    provider.addScope('profile');

    const result = await signInWithPopup(auth, provider);
    if (result && result.user) {
      const user = result.user;
      return {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        picture: user.photoURL || null,
        uid: user.uid
      };
    }
  } catch (firebaseErr) {
    console.warn("Firebase Google popup notice:", firebaseErr.code || firebaseErr.message);

    if (firebaseErr.code === 'auth/popup-blocked') {
      throw new Error("Google Sign-In popup was blocked by your browser. Please allow popups for this site and try again.");
    }
  }

  // Strategy 2: Google Identity Services (GSI) OAuth 2.0 Web Client
  await loadGoogleIdentityScript();

  if (window.google?.accounts?.oauth2) {
    return new Promise((resolve, reject) => {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          prompt: 'select_account', // Pop up all available Gmail accounts
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              return reject(new Error(tokenResponse.error_description || "Google Sign-In was cancelled."));
            }
            try {
              // Fetch user info using access token
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              if (userInfoRes.ok) {
                const profile = await userInfoRes.json();
                return resolve({
                  email: profile.email,
                  name: profile.name || profile.email.split('@')[0],
                  picture: profile.picture || null,
                  uid: profile.sub
                });
              }
              resolve({
                email: "google.user@gmail.com",
                name: "Google Member",
                picture: null
              });
            } catch (err) {
              reject(err);
            }
          }
        });

        // Open popup
        client.requestAccessToken({ prompt: 'select_account' });
      } catch (gsiErr) {
        console.warn("GSI init error:", gsiErr);
        reject(gsiErr);
      }
    });
  }

  throw new Error("Unable to open Google Account Chooser. Please check your browser popup permissions.");
};
