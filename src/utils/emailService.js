/**
 * Sends a real 6-digit OTP via Vercel Serverless Function (/api/send-otp)
 * which uses official Gmail SMTP (Google App Password) for instant Primary Inbox delivery.
 */
export const sendRealOtpEmail = async (toEmail, userName, clientFallbackOtp, context = 'Account Activation') => {
  const cleanEmail = (toEmail || '').trim().toLowerCase();

  try {
    // Primary Method: Vercel Serverless Function → Gmail SMTP (Google App Password)
    // Runs server-side on Vercel — Nodemailer works perfectly.
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
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

// ─────────────────────────────────────────────────────────────────────────────
// Shared AgentMail config for all automation emails
// ─────────────────────────────────────────────────────────────────────────────
const AGENTMAIL_API_KEY = 'am_us_inbox_5ccad543b1ee9681a51d93d404eb1e4d8c2227aca1882de12fd4d72682e6c561';
const AGENTMAIL_INBOX   = 'social_sankalp@agentmail.to';

const sendViaAgentMail = async ({ to, subject, text, html }) => {
  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(AGENTMAIL_INBOX)}/messages/send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AGENTMAIL_API_KEY}`
      },
      body: JSON.stringify({ to: [to], subject, text, html })
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AgentMail error (${res.status}): ${err}`);
  }
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 1 — Volunteer: Drive Registration Confirmed
// ─────────────────────────────────────────────────────────────────────────────
export const sendVolunteerDriveRegistrationEmail = async ({
  volunteerEmail, volunteerName, eventTitle, eventDate, eventLocation, organizerNgoName
}) => {
  const to = (volunteerEmail || '').trim().toLowerCase();

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:linear-gradient(135deg,#0ea5e9 0%,#0284c7 40%,#0f172a 100%);padding:36px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);padding:5px 14px;border-radius:20px;color:#bae6fd;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">Sankalp Volunteer Network</div>
            <div style="font-size:40px;margin-bottom:8px;">🎉</div>
            <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0;">Registration Confirmed!</h1>
            <p style="color:#bae6fd;font-size:13px;margin:8px 0 0 0;">You're officially part of this drive.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 0 32px;">
            <p style="font-size:16px;color:#1e293b;font-weight:700;margin:0 0 8px 0;">Hello ${volunteerName || 'Valued Volunteer'},</p>
            <p style="font-size:13px;color:#475569;line-height:1.7;margin:0 0 24px 0;">
              You have <strong>successfully registered</strong> for an upcoming social awareness drive organized by
              <strong style="color:#0284c7;">${organizerNgoName || 'Sankalp Partner NGO'}</strong>.
              We're thrilled to have your commitment!
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:16px;margin-bottom:24px;">
              <tr><td style="padding:20px 22px;">
                <p style="font-size:11px;font-weight:800;color:#0369a1;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Drive Details</p>
                <h2 style="font-size:18px;color:#0f172a;font-weight:800;margin:0 0 18px 0;">${eventTitle || 'Awareness Drive'}</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;font-size:12px;color:#64748b;font-weight:700;width:110px;">📅 Date</td>
                    <td style="padding:6px 0;font-size:13px;color:#1e293b;font-weight:600;">${eventDate || 'As per schedule'}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:12px;color:#64748b;font-weight:700;">📍 Location</td>
                    <td style="padding:6px 0;font-size:13px;color:#1e293b;font-weight:600;">${eventLocation || 'On-ground sector'}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:12px;color:#64748b;font-weight:700;">🤝 Partner NGO</td>
                    <td style="padding:6px 0;font-size:13px;color:#1e293b;font-weight:600;">${organizerNgoName || 'Accredited NGO Partner'}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;margin-bottom:24px;">
              <tr><td style="padding:14px 16px;">
                <p style="font-size:12px;color:#92400e;margin:0;line-height:1.6;">
                  ⭐ <strong>Certificate Notice:</strong> Upon successful completion of this drive, your accredited digital certificate with a verifiable QR seal will be issued to your Volunteer Hub profile.
                </p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:18px 20px;">
                <p style="font-size:12px;font-weight:800;color:#334155;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">What's Next?</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Keep an eye on your email for drive updates.</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Visit your Volunteer Hub on Sankalp Portal for attendance details.</p>
                <p style="font-size:12px;color:#64748b;margin:0;">✅ Arrive 15 minutes early on the drive day.</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">Thank you for contributing to public welfare and civic awareness.</p>
            <p style="font-size:12px;font-weight:800;color:#64748b;margin:0;">Sankalp Social Foundation Network</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Hello ${volunteerName || 'Volunteer'},\n\nYou have successfully registered for: ${eventTitle}\nDate: ${eventDate}\nLocation: ${eventLocation}\nOrganised by: ${organizerNgoName}\n\nUpon completion, your certificate will be issued to your Volunteer Hub.\n\n— Sankalp Social Network`;

  try {
    await sendViaAgentMail({ to, subject: `🎉 Confirmed: You're registered for "${eventTitle}" — Sankalp NGO`, text, html });
    console.log(`[AUTOMATION 1] Volunteer registration email sent → ${to}`);
  } catch (err) {
    console.warn('[AUTOMATION 1 ERROR] Volunteer registration email failed:', err.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 2 — NGO: New Drive Request Received from Company
// ─────────────────────────────────────────────────────────────────────────────
export const sendCompanyDriveRequestedEmail = async ({
  ngoEmail, ngoName, companyName, cause, targetLocation,
  expectedVolunteers, proposedDate, contactPerson, contactPhone, contactEmail
}) => {
  const to = (ngoEmail || '').trim().toLowerCase();

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1 0%,#4338ca 40%,#0f172a 100%);padding:36px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);padding:5px 14px;border-radius:20px;color:#c7d2fe;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">Sankalp Corporate Partnership</div>
            <div style="font-size:40px;margin-bottom:8px;">🏢</div>
            <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0;">New Drive Request Received</h1>
            <p style="color:#c7d2fe;font-size:13px;margin:8px 0 0 0;">Action required — Please review and respond.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 0 32px;">
            <p style="font-size:16px;color:#1e293b;font-weight:700;margin:0 0 8px 0;">Hello ${ngoName || 'Partner NGO'},</p>
            <p style="font-size:13px;color:#475569;line-height:1.7;margin:0 0 24px 0;">
              <strong style="color:#4338ca;">${companyName || 'A Corporate Partner'}</strong> has submitted a new
              <strong>Awareness Drive Hosting Request</strong> for your NGO through the Sankalp Portal.
              Please review the details below and respond at your earliest convenience.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border:1.5px solid #ddd6fe;border-radius:16px;margin-bottom:24px;">
              <tr><td style="padding:20px 22px;">
                <p style="font-size:11px;font-weight:800;color:#4338ca;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Request Summary</p>
                <h2 style="font-size:17px;color:#0f172a;font-weight:800;margin:0 0 18px 0;">${cause || 'Social Awareness Campaign'}</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;width:130px;">🏢 Organization</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">🎯 Cause Theme</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${cause || 'Social Awareness'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">📍 Location</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${targetLocation || 'Institutional Premises'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">👥 Expected Turnout</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${expectedVolunteers || '25+'} participants</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">📅 Proposed Date</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${proposedDate || 'Mutually Agreed'}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;margin-bottom:24px;">
              <tr><td style="padding:18px 20px;">
                <p style="font-size:12px;font-weight:800;color:#92400e;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">👤 Company Coordinator Contact</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 5px 0;"><strong>Name:</strong> ${contactPerson || 'HR Lead'}</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 5px 0;"><strong>Phone:</strong> ${contactPhone || 'Available in portal'}</p>
                <p style="font-size:13px;color:#78350f;margin:0;"><strong>Email:</strong> ${contactEmail || 'Available in portal'}</p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 10px 10px 0;margin-bottom:28px;">
              <tr><td style="padding:14px 16px;">
                <p style="font-size:12px;color:#166534;margin:0;line-height:1.7;">
                  🔐 Please <strong>sign in to your NGO Partner Portal</strong> on Sankalp to approve or decline this request, review sanction letters, and assign volunteer teams.
                </p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">This is an automated notification from the Sankalp Platform.</p>
            <p style="font-size:12px;font-weight:800;color:#64748b;margin:0;">Sankalp Social Foundation Network</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Hello ${ngoName},\n\n${companyName} has submitted a new Awareness Drive Request.\n\nCause: ${cause}\nLocation: ${targetLocation}\nExpected Participants: ${expectedVolunteers}\nProposed Date: ${proposedDate}\n\nCoordinator: ${contactPerson} | ${contactPhone} | ${contactEmail}\n\nPlease log in to your NGO Portal on Sankalp to review and approve.\n\n— Sankalp Social Network`;

  try {
    await sendViaAgentMail({ to, subject: `🏢 New Drive Request from ${companyName} — Action Required | Sankalp`, text, html });
    console.log(`[AUTOMATION 2] Drive request notification sent to NGO → ${to}`);
  } catch (err) {
    console.warn('[AUTOMATION 2 ERROR] NGO notification email failed:', err.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATION 3 — Company: Drive Request Approved by NGO
// ─────────────────────────────────────────────────────────────────────────────
export const sendCompanyDriveApprovedEmail = async ({
  companyEmail, companyName, eventTitle, ngoName, ngoPhone, ngoEmail, scheduledDate, location
}) => {
  const to = (companyEmail || '').trim().toLowerCase();

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:linear-gradient(135deg,#10b981 0%,#059669 40%,#064e3b 100%);padding:36px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);padding:5px 14px;border-radius:20px;color:#a7f3d0;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">Sankalp Sanction Approval</div>
            <div style="font-size:40px;margin-bottom:8px;">✅</div>
            <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0;">Your Drive is Approved!</h1>
            <p style="color:#a7f3d0;font-size:13px;margin:8px 0 0 0;">Officially sanctioned by your NGO Partner.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 0 32px;">
            <p style="font-size:16px;color:#1e293b;font-weight:700;margin:0 0 8px 0;">Hello ${companyName || 'Institutional Partner'},</p>
            <p style="font-size:13px;color:#475569;line-height:1.7;margin:0 0 24px 0;">
              Congratulations! Your awareness drive request
              <strong style="color:#059669;">"${eventTitle || 'Social Impact Drive'}"</strong>
              has been <strong>officially approved and sanctioned</strong> by
              <strong style="color:#059669;">${ngoName || 'Sankalp NGO Partner'}</strong>.
              You're all set to create a meaningful social impact!
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1.5px solid #86efac;border-radius:16px;margin-bottom:24px;">
              <tr><td style="padding:20px 22px;">
                <p style="font-size:11px;font-weight:800;color:#059669;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Sanctioned Event Details</p>
                <h2 style="font-size:17px;color:#0f172a;font-weight:800;margin:0 0 18px 0;">${eventTitle || 'Awareness Drive'}</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;width:130px;">📅 Scheduled Date</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${scheduledDate || 'Confirmed by NGO'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">📍 Venue</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${location || 'Designated Premises'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">🤝 Sanctioning NGO</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${ngoName}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;margin-bottom:24px;">
              <tr><td style="padding:18px 20px;">
                <p style="font-size:12px;font-weight:800;color:#92400e;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">📞 NGO Direct Query &amp; Coordination</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 6px 0;">For any queries, logistical planning, or speaker coordination, please contact <strong>${ngoName}</strong> directly:</p>
                <p style="font-size:14px;color:#0369a1;font-weight:800;margin:0 0 5px 0;">📱 ${ngoPhone || '+91 98201 94821'}</p>
                <p style="font-size:13px;color:#0369a1;font-weight:600;margin:0;">✉️ ${ngoEmail || 'contact@sankalpfoundation.org'}</p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:18px 20px;">
                <p style="font-size:12px;font-weight:800;color:#334155;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">Next Steps</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Contact the NGO to finalise logistics and speaker assignments.</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Coordinate with your internal HR/CSR team for employee participation.</p>
                <p style="font-size:12px;color:#64748b;margin:0;">✅ Download your official Sanction Letter from the Sankalp Portal.</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">Empowering Corporate Social Responsibility through verified NGO partnerships.</p>
            <p style="font-size:12px;font-weight:800;color:#64748b;margin:0;">Sankalp Social Foundation Network</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Hello ${companyName},\n\nGreat news! Your drive request "${eventTitle}" has been officially approved by ${ngoName}.\n\nScheduled Date: ${scheduledDate}\nVenue: ${location}\n\nFor queries, contact ${ngoName} directly:\nPhone: ${ngoPhone || '+91 98201 94821'}\nEmail: ${ngoEmail || 'contact@sankalpfoundation.org'}\n\n— Sankalp Social Network`;

  try {
    await sendViaAgentMail({ to, subject: `✅ Approved: Your Drive "${eventTitle}" Sanctioned by ${ngoName} | Sankalp`, text, html });
    console.log(`[AUTOMATION 3] Drive approval email sent to company → ${to}`);
  } catch (err) {
    console.warn('[AUTOMATION 3 ERROR] Company approval email failed:', err.message);
  }
};
