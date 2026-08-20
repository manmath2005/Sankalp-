// Vercel Serverless Function — /api/send-email
// Handles all automation emails (volunteer confirmation, NGO request, company approval)
// via official Gmail SMTP (Google App Password) for guaranteed Primary Inbox delivery.

import nodemailer from 'nodemailer';

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

// ── HTML Templates ──────────────────────────────────────────────────────────

function volunteerConfirmationHtml({ volunteerName, eventTitle, eventDate, eventLocation, organizerNgoName }) {
  return `<!DOCTYPE html>
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
                  ⭐ <strong>Certificate Notice:</strong> Upon successful completion, your accredited digital certificate with a verifiable QR seal will be issued to your Volunteer Hub profile.
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
}

function ngoRequestHtml({ ngoName, companyName, cause, targetLocation, expectedVolunteers, proposedDate, contactPerson, contactPhone, contactEmail }) {
  return `<!DOCTYPE html>
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
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">🎯 Cause</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${cause || 'Social Awareness'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">📍 Location</td>
                    <td style="padding:7px 0;font-size:13px;color:#1e293b;font-weight:600;">${targetLocation || 'Institutional Premises'}</td>
                  </tr>
                  <tr>
                    <td style="padding:7px 0;font-size:12px;color:#64748b;font-weight:700;">👥 Turnout</td>
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
                <p style="font-size:12px;font-weight:800;color:#92400e;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">👤 Company Coordinator</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 5px 0;"><strong>Name:</strong> ${contactPerson || 'HR Lead'}</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 5px 0;"><strong>Phone:</strong> ${contactPhone || 'Available in portal'}</p>
                <p style="font-size:13px;color:#78350f;margin:0;"><strong>Email:</strong> ${contactEmail || 'Available in portal'}</p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 10px 10px 0;margin-bottom:28px;">
              <tr><td style="padding:14px 16px;">
                <p style="font-size:12px;color:#166534;margin:0;line-height:1.7;">
                  🔐 Sign in to your <strong>NGO Partner Portal</strong> on Sankalp to approve or decline, review sanction letters, and assign volunteer teams.
                </p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">Automated notification from the Sankalp Platform.</p>
            <p style="font-size:12px;font-weight:800;color:#64748b;margin:0;">Sankalp Social Foundation Network</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function companyApprovalHtml({ companyName, eventTitle, ngoName, ngoPhone, ngoEmail: ngoMail, scheduledDate, location }) {
  return `<!DOCTYPE html>
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
              Congratulations! Your drive request <strong style="color:#059669;">"${eventTitle || 'Social Impact Drive'}"</strong>
              has been <strong>officially approved and sanctioned</strong> by
              <strong style="color:#059669;">${ngoName || 'Sankalp NGO Partner'}</strong>.
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
                <p style="font-size:12px;font-weight:800;color:#92400e;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">📞 NGO Direct Contact</p>
                <p style="font-size:13px;color:#78350f;margin:0 0 6px 0;">For logistics, planning, or queries, contact <strong>${ngoName}</strong>:</p>
                <p style="font-size:14px;color:#0369a1;font-weight:800;margin:0 0 5px 0;">📱 ${ngoPhone || '+91 98201 94821'}</p>
                <p style="font-size:13px;color:#0369a1;font-weight:600;margin:0;">✉️ ${ngoMail || 'contact@sankalpfoundation.org'}</p>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:18px 20px;">
                <p style="font-size:12px;font-weight:800;color:#334155;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">Next Steps</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Contact the NGO to finalise logistics and speakers.</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 6px 0;">✅ Coordinate with your HR/CSR team for employee participation.</p>
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
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { type, to, data } = req.body || {};

  if (!type || !to) {
    return res.status(400).json({ success: false, error: 'Missing required fields: type and to' });
  }

  let subject, text, html;

  if (type === 'volunteer_confirmation') {
    subject = `🎉 Confirmed: You're registered for "${data?.eventTitle}" — Sankalp NGO`;
    text = `Hello ${data?.volunteerName || 'Volunteer'},\n\nYou have successfully registered for: ${data?.eventTitle}\nDate: ${data?.eventDate}\nLocation: ${data?.eventLocation}\nOrganised by: ${data?.organizerNgoName}\n\nUpon completion, your certificate will be issued to your Volunteer Hub.\n\n— Sankalp Social Network`;
    html = volunteerConfirmationHtml(data || {});

  } else if (type === 'ngo_drive_request') {
    subject = `🏢 New Drive Request from ${data?.companyName} — Action Required | Sankalp`;
    text = `Hello ${data?.ngoName},\n\n${data?.companyName} has submitted a new Awareness Drive Request.\n\nCause: ${data?.cause}\nLocation: ${data?.targetLocation}\nProposed Date: ${data?.proposedDate}\n\nCoordinator: ${data?.contactPerson} | ${data?.contactPhone} | ${data?.contactEmail}\n\nPlease log in to your NGO Portal to review and approve.\n\n— Sankalp Social Network`;
    html = ngoRequestHtml(data || {});

  } else if (type === 'company_approval') {
    subject = `✅ Approved: Your Drive "${data?.eventTitle}" Sanctioned by ${data?.ngoName} | Sankalp`;
    text = `Hello ${data?.companyName},\n\nYour drive "${data?.eventTitle}" has been approved by ${data?.ngoName}.\n\nDate: ${data?.scheduledDate}\nVenue: ${data?.location}\n\nContact: ${data?.ngoPhone} | ${data?.ngoEmail}\n\n— Sankalp Social Network`;
    html = companyApprovalHtml(data || {});

  } else {
    return res.status(400).json({ success: false, error: `Unknown email type: ${type}` });
  }

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Sankalp Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });
    console.log(`[send-email] ${type} sent to ${to} — ${info.messageId}`);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error(`[send-email] Failed to send ${type} to ${to}:`, err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
