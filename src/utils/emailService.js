/**
 * Sends a real 6-digit OTP via Vercel Serverless Function (/api/send-otp)
 * which uses official Gmail SMTP (Google App Password) for instant Primary Inbox delivery.
 */
export const sendRealOtpEmail = async (toEmail, userName, clientFallbackOtp, context = 'Account Activation') => {
  const cleanEmail = (toEmail || '').trim().toLowerCase();

  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, userName: userName || 'Member', purpose: context })
    });
    const data = await response.json();
    if (response.ok && data.success) {
      console.log(`[OTP] Sent to ${cleanEmail} via Gmail SMTP`);
      return { success: true, mode: 'REAL_EMAIL_DELIVERED', message: `Verification code sent to ${cleanEmail}. Please check your inbox.`, otpCode: data.otpCode };
    }
    console.warn('[OTP ERROR]:', data?.error);
  } catch (err) {
    console.warn('[OTP FETCH FAILED]:', err.message);
  }

  const activeOtp = clientFallbackOtp || Math.floor(100000 + Math.random() * 900000).toString();
  return { success: true, mode: 'CLIENT_FALLBACK', message: `Could not send email. Please contact support.`, otpCode: activeOtp };
};

/**
 * Validates OTP with Backend Server API
 */
export const verifyOtpWithBackend = async (email, otp) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').toString().trim();
  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp: cleanOtp })
    });
    return await response.json();
  } catch {
    try {
      const r = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, otp: cleanOtp })
      });
      return await r.json();
    } catch {
      return { success: false, offline: true };
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared helper — calls /api/send-email Vercel serverless function
// Gmail SMTP (Google App Password) → guaranteed Primary Inbox delivery
// ─────────────────────────────────────────────────────────────────────────────
const sendAutomationEmail = async (type, to, data) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, to, data })
    });
    const result = await response.json();
    if (response.ok && result.success) {
      console.log(`[AUTOMATION: ${type}] Email sent to ${to}`);
      return true;
    }
    console.warn(`[AUTOMATION: ${type}] Serverless failed:`, result?.error);
  } catch (err) {
    console.warn(`[AUTOMATION: ${type}] Fetch failed:`, err.message);
  }
  return false;
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 1 — Volunteer: Drive Registration Confirmed
// ─────────────────────────────────────────────────────────────────────────────
export const sendVolunteerDriveRegistrationEmail = async ({
  volunteerEmail, volunteerName, eventTitle, eventDate, eventLocation, organizerNgoName
}) => {
  const to = (volunteerEmail || '').trim().toLowerCase();
  await sendAutomationEmail('volunteer_confirmation', to, {
    volunteerName, eventTitle, eventDate, eventLocation, organizerNgoName
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 2 — NGO: New Drive Request Received from Company
// ─────────────────────────────────────────────────────────────────────────────
export const sendCompanyDriveRequestedEmail = async ({
  ngoEmail, ngoName, companyName, cause, targetLocation,
  expectedVolunteers, proposedDate, contactPerson, contactPhone, contactEmail
}) => {
  const to = (ngoEmail || '').trim().toLowerCase();
  await sendAutomationEmail('ngo_drive_request', to, {
    ngoName, companyName, cause, targetLocation,
    expectedVolunteers, proposedDate, contactPerson, contactPhone, contactEmail
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 3 — Company: Drive Request Approved by NGO
// ─────────────────────────────────────────────────────────────────────────────
export const sendCompanyDriveApprovedEmail = async ({
  companyEmail, companyName, eventTitle, ngoName, ngoPhone, ngoEmail, scheduledDate, location
}) => {
  const to = (companyEmail || '').trim().toLowerCase();
  await sendAutomationEmail('company_approval', to, {
    companyName, eventTitle, ngoName, ngoPhone, ngoEmail, scheduledDate, location
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ONLY — Urgent SOS Broadcast to ALL Registered Volunteers
// ─────────────────────────────────────────────────────────────────────────────
export const sendSosBroadcast = async (volunteerEmails, eventData) => {
  if (!volunteerEmails || volunteerEmails.length === 0) {
    console.warn('[SOS] No volunteer emails provided.');
    return { success: false, error: 'No emails provided.' };
  }

  try {
    const response = await fetch('/api/send-sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteerEmails, eventData })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log(`[SOS BROADCAST] ✅ Sent to ${result.sentCount} volunteers. Failed: ${result.failedCount}`);
      return result;
    }

    console.warn('[SOS BROADCAST ERROR]:', result?.error);
    return { success: false, error: result?.error };
  } catch (err) {
    console.error('[SOS BROADCAST FETCH FAILED]:', err.message);
    return { success: false, error: err.message };
  }
};

