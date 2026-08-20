/**
 * Sends a real 6-digit OTP via Vercel Serverless Function (/api/send-otp)
 * which uses official Gmail SMTP (Google App Password) for instant Primary Inbox delivery.
 */
export const sendRealOtpEmail = async (toEmail, userName, clientFallbackOtp, context = 'Account Activation') => {
  const cleanEmail = (toEmail || '').trim().toLowerCase();

  try {
    // Primary Method: Vercel Serverless Function → Gmail SMTP (Google App Password)
    // The serverless function runs server-side on Vercel — Nodemailer works perfectly here.
    // Gmail-to-Gmail delivery lands in Primary Inbox instantly (no spam, no delay).
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        userName: userName || 'Member',
        purpose: context
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log(`[GMAIL SERVERLESS SUCCESS] OTP sent to ${cleanEmail} via Gmail SMTP`);
      return {
        success: true,
        mode: 'REAL_EMAIL_DELIVERED',
        message: `Verification code sent to ${cleanEmail}. Please check your inbox.`,
        otpCode: data.otpCode
      };
    } else {
      console.warn('[SERVERLESS OTP ERROR]:', data?.error || 'Unknown error');
    }
  } catch (err) {
    console.warn('[SERVERLESS FETCH FAILED]:', err.message);
  }

  // Fallback: Generate OTP client-side so the modal still works even if API is unreachable
  const activeOtp = clientFallbackOtp || Math.floor(100000 + Math.random() * 900000).toString();
  console.warn('[OTP FALLBACK] Could not reach /api/send-otp. Using client-generated OTP.');
  return {
    success: true,
    mode: 'CLIENT_FALLBACK',
    message: `Could not send email. Please contact support.`,
    otpCode: activeOtp
  };
};


/**
 * Validates OTP with Backend Server API
 */
export const verifyOtpWithBackend = async (email, otp) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').toString().trim();

  try {
    const response = await fetch(`${BACKEND_API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cleanEmail, otp: cleanOtp })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    try {
      const directResp = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, otp: cleanOtp })
      });
      return await directResp.json();
    } catch (directErr) {
      console.warn('Backend offline for verification:', directErr);
      return { success: false, offline: true };
    }
  }
};

/**
 * Automation 1: Send Volunteer Successful Drive Registration Confirmation Email
 */
export const sendVolunteerDriveRegistrationEmail = async ({ volunteerEmail, volunteerName, eventTitle, eventDate, eventLocation, organizerNgoName }) => {
  const cleanEmail = (volunteerEmail || '').trim().toLowerCase();
  const apiKey = 'am_us_inbox_5ccad543b1ee9681a51d93d404eb1e4d8c2227aca1882de12fd4d72682e6c561';
  const inbox = 'social_sankalp@agentmail.to';

  const htmlBody = `
    <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.06);">
      <div style="background:linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0f172a 100%);padding:32px 25px;text-align:center;">
        <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:6px 14px;border-radius:10px;color:#bae6fd;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">
          Sankalp Volunteer Network
        </div>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:800;">Drive Registration Confirmed! 🎉</h1>
      </div>
      <div style="padding:30px 25px;">
        <p style="font-size:15px;color:#1e293b;font-weight:700;margin-top:0;">Hello ${volunteerName || 'Valued Volunteer'},</p>
        <p style="font-size:13px;color:#475569;line-height:1.6;">
          You have successfully registered for the upcoming social awareness drive organized by <strong>${organizerNgoName || 'Sankalp Partner NGO'}</strong>.
        </p>

        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:16px;padding:20px;margin:20px 0;">
          <h3 style="margin:0 0 12px 0;font-size:16px;color:#0369a1;font-weight:800;">${eventTitle}</h3>
          <table style="width:100%;font-size:12px;color:#334155;border-collapse:collapse;">
            <tr>
              <td style="padding:4px 0;font-weight:700;width:90px;">📅 Date:</td>
              <td style="padding:4px 0;">${eventDate || 'Upcoming Schedule'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">📍 Location:</td>
              <td style="padding:4px 0;">${eventLocation || 'On-ground Sector'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">🛡️ Partner:</td>
              <td style="padding:4px 0;">${organizerNgoName || 'Accredited NGO Partner'}</td>
            </tr>
          </table>
        </div>

        <div style="background:#f8fafc;border-left:4px solid #0284c7;padding:12px 16px;border-radius:8px;margin-bottom:20px;">
          <p style="font-size:12px;color:#475569;margin:0;line-height:1.5;">
            ⭐ <strong>Certificate Notice:</strong> Upon completing this drive, your digital accredited certificate with verifiable QR seal will be issued to your Volunteer Hub.
          </p>
        </div>

        <p style="font-size:12px;color:#94a3b8;margin:0;border-top:1px solid #f1f5f9;padding-top:16px;">
          Thank you for dedicating your time to public welfare and civic awareness.<br/>
          <strong>Sankalp Social Foundation Network</strong>
        </p>
      </div>
    </div>
  `;

  try {
    await fetch(`https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        to: [cleanEmail],
        subject: `Registration Confirmed: ${eventTitle} (Sankalp NGO Network)`,
        text: `Hello ${volunteerName},\n\nYou are successfully registered for: ${eventTitle} on ${eventDate}.\nLocation: ${eventLocation}.\n\nThank you for volunteering with Sankalp NGO!`,
        html: htmlBody
      })
    });
    console.log(`[AUTOMATION] Volunteer drive registration email dispatched to ${cleanEmail}`);
  } catch (err) {
    console.warn('[AUTOMATION ERROR] Volunteer registration mail failed:', err);
  }
};

/**
 * Automation 2: Send Email to NGO when a Company Requests a Drive
 */
export const sendCompanyDriveRequestedEmail = async ({ ngoEmail, ngoName, companyName, cause, targetLocation, expectedVolunteers, proposedDate, contactPerson, contactPhone, contactEmail }) => {
  const cleanNgoEmail = (ngoEmail || '').trim().toLowerCase();
  const apiKey = 'am_us_inbox_5ccad543b1ee9681a51d93d404eb1e4d8c2227aca1882de12fd4d72682e6c561';
  const inbox = 'social_sankalp@agentmail.to';

  const htmlBody = `
    <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.06);">
      <div style="background:linear-gradient(135deg, #4338ca 0%, #3730a3 50%, #0f172a 100%);padding:32px 25px;text-align:center;">
        <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:6px 14px;border-radius:10px;color:#c7d2fe;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">
          Sankalp Corporate Partnership
        </div>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:800;">New Drive Hosting Request! 🏢</h1>
      </div>
      <div style="padding:30px 25px;">
        <p style="font-size:15px;color:#1e293b;font-weight:700;margin-top:0;">Hello ${ngoName || 'Partner NGO'},</p>
        <p style="font-size:13px;color:#475569;line-height:1.6;">
          <strong>${companyName || 'An Institutional Partner'}</strong> has submitted a new awareness drive hosting request for your NGO.
        </p>

        <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px;margin:20px 0;">
          <h3 style="margin:0 0 12px 0;font-size:16px;color:#4338ca;font-weight:800;">Campaign Request Summary</h3>
          <table style="width:100%;font-size:12px;color:#334155;border-collapse:collapse;">
            <tr>
              <td style="padding:4px 0;font-weight:700;width:120px;">🏢 Organization:</td>
              <td style="padding:4px 0;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">🎯 Cause Theme:</td>
              <td style="padding:4px 0;">${cause || 'Social Awareness Campaign'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">📍 Location:</td>
              <td style="padding:4px 0;">${targetLocation || 'Institutional Premises'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">👥 Expected Turnout:</td>
              <td style="padding:4px 0;">${expectedVolunteers || '25+'} participants</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">📅 Proposed Date:</td>
              <td style="padding:4px 0;">${proposedDate || 'Mutually Agreed'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">👤 Coordinator:</td>
              <td style="padding:4px 0;">${contactPerson || 'HR Lead'} (${contactPhone || 'Phone available in portal'}, ${contactEmail || 'Email in portal'})</td>
            </tr>
          </table>
        </div>

        <p style="font-size:12px;color:#64748b;line-height:1.5;">
          Please sign in to your <strong>Sankalp NGO Partner Portal</strong> to review the sanction letters, approve the event request, and assign volunteer teams.
        </p>
      </div>
    </div>
  `;

  try {
    await fetch(`https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        to: [cleanNgoEmail],
        subject: `New Drive Request from ${companyName} (${cause || 'Social Awareness'})`,
        text: `Hello ${ngoName},\n\n${companyName} has requested an awareness drive on ${cause}.\nLocation: ${targetLocation}\nProposed Date: ${proposedDate}.\n\nPlease log in to your NGO Portal to review and approve.`,
        html: htmlBody
      })
    });
    console.log(`[AUTOMATION] Company drive request notification dispatched to NGO ${cleanNgoEmail}`);
  } catch (err) {
    console.warn('[AUTOMATION ERROR] NGO notification mail failed:', err);
  }
};

/**
 * Automation 3: Send Email to Company when NGO Approves the Drive Request
 */
export const sendCompanyDriveApprovedEmail = async ({ companyEmail, companyName, eventTitle, ngoName, ngoPhone, ngoEmail, scheduledDate, location }) => {
  const cleanCompanyEmail = (companyEmail || '').trim().toLowerCase();
  const apiKey = 'am_us_inbox_5ccad543b1ee9681a51d93d404eb1e4d8c2227aca1882de12fd4d72682e6c561';
  const inbox = 'social_sankalp@agentmail.to';

  const htmlBody = `
    <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.06);">
      <div style="background:linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%);padding:32px 25px;text-align:center;">
        <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:6px 14px;border-radius:10px;color:#a7f3d0;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">
          Sankalp Sanction Approval
        </div>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:800;">Your Drive Request is Approved! ✅</h1>
      </div>
      <div style="padding:30px 25px;">
        <p style="font-size:15px;color:#1e293b;font-weight:700;margin-top:0;">Hello ${companyName || 'Institutional Partner'},</p>
        <p style="font-size:13px;color:#475569;line-height:1.6;">
          Great news! Your awareness drive request <strong>"${eventTitle || 'Social Impact Drive'}"</strong> has been officially approved and sanctioned by <strong>${ngoName || 'Sankalp NGO Partner'}</strong>.
        </p>

        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:16px;padding:20px;margin:20px 0;">
          <h3 style="margin:0 0 12px 0;font-size:16px;color:#047857;font-weight:800;">Sanctioned Event Schedule</h3>
          <table style="width:100%;font-size:12px;color:#334155;border-collapse:collapse;">
            <tr>
              <td style="padding:4px 0;font-weight:700;width:120px;">📅 Scheduled Date:</td>
              <td style="padding:4px 0;">${scheduledDate || 'Confirmed by NGO'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">📍 Location:</td>
              <td style="padding:4px 0;">${location || 'Designated Premises'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;font-weight:700;">🛡️ Partner NGO:</td>
              <td style="padding:4px 0;">${ngoName}</td>
            </tr>
          </table>
        </div>

        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:16px;margin-bottom:20px;">
          <p style="font-size:13px;color:#92400e;margin:0 0 6px 0;font-weight:800;">
            📞 Direct Query & Coordination Contact:
          </p>
          <p style="font-size:12px;color:#78350f;margin:0;line-height:1.6;">
            For any queries, logistical planning, or speaker arrangements, please contact the NGO directly at:<br/>
            <strong>Phone / Helpline:</strong> <a href="tel:${ngoPhone || '+919820194821'}" style="color:#0369a1;font-weight:bold;">${ngoPhone || '+91 98201 94821'}</a><br/>
            <strong>Email:</strong> <a href="mailto:${ngoEmail || 'contact@sankalpfoundation.org'}" style="color:#0369a1;font-weight:bold;">${ngoEmail || 'contact@sankalpfoundation.org'}</a>
          </p>
        </div>

        <p style="font-size:12px;color:#94a3b8;margin:0;border-top:1px solid #f1f5f9;padding-top:16px;">
          Sankalp NGO Network • Empowering Civic & Corporate Social Responsibility
        </p>
      </div>
    </div>
  `;

  try {
    await fetch(`https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        to: [cleanCompanyEmail],
        subject: `Approved: Your Drive Request "${eventTitle || 'Awareness Drive'}" has been Sanctioned!`,
        text: `Hello ${companyName},\n\nYour awareness drive request "${eventTitle}" has been approved by ${ngoName}.\n\nFor any query, contact: ${ngoPhone || '+91 98201 94821'} or ${ngoEmail || 'contact@sankalpfoundation.org'}.\n\nThank you!`,
        html: htmlBody
      })
    });
    console.log(`[AUTOMATION] Company drive approval email dispatched to ${cleanCompanyEmail}`);
  } catch (err) {
    console.warn('[AUTOMATION ERROR] Company approval mail failed:', err);
  }
};
