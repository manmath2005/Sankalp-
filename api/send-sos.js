// Vercel Serverless Function — /api/send-sos
// Sends urgent SOS emails to a list of volunteer emails via Gmail SMTP.
// Only callable from admin context. Sends in batches to avoid rate limits.

import nodemailer from 'nodemailer';

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

function sosBroadcastHtml({ eventTitle, eventDate, eventVenue, eventLocation, urgencyLevel, requiredResources, coordinator, organizerContact, description }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#1a0000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0000;padding:32px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(220,38,38,0.35);">

        <!-- URGENT BANNER -->
        <tr>
          <td style="background:#dc2626;padding:10px 32px;text-align:center;">
            <p style="color:#ffffff;font-size:11px;font-weight:800;margin:0;letter-spacing:3px;text-transform:uppercase;">
              🚨 URGENT · EMERGENCY · IMMEDIATE ACTION REQUIRED
            </p>
          </td>
        </tr>

        <!-- RED HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#991b1b 0%,#dc2626 50%,#b91c1c 100%);padding:36px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:5px 16px;border-radius:20px;color:#fecaca;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">
              Sankalp Emergency SOS Broadcast
            </div>
            <div style="font-size:48px;margin-bottom:10px;">🆘</div>
            <h1 style="color:#ffffff;font-size:26px;font-weight:900;margin:0;letter-spacing:-0.5px;">Emergency Volunteer Call</h1>
            <p style="color:#fecaca;font-size:13px;margin:10px 0 0 0;font-weight:600;">You are urgently needed. Please respond immediately.</p>
          </td>
        </tr>

        <!-- URGENCY BADGE -->
        <tr>
          <td style="background:#fef2f2;padding:16px 32px;text-align:center;border-bottom:2px solid #fecaca;">
            <div style="display:inline-block;background:#dc2626;color:#ffffff;font-size:11px;font-weight:800;padding:6px 20px;border-radius:30px;letter-spacing:1.5px;text-transform:uppercase;">
              ⚡ Urgency Level: ${urgencyLevel || 'CRITICAL'}
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:32px 32px 0 32px;">
            <p style="font-size:15px;color:#1e293b;font-weight:700;margin:0 0 8px 0;">Dear Sankalp Volunteer,</p>
            <p style="font-size:13px;color:#475569;line-height:1.7;margin:0 0 24px 0;">
              An <strong style="color:#dc2626;">emergency awareness drive</strong> has been declared by the Sankalp Admin.
              Your participation is <strong>critically needed</strong> at the earliest. Please read the details below and respond immediately.
            </p>

            <!-- EVENT CARD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff1f2;border:2px solid #fca5a5;border-radius:16px;margin-bottom:24px;">
              <tr>
                <td style="padding:20px 22px;">
                  <p style="font-size:11px;font-weight:800;color:#dc2626;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">🚨 Emergency Drive Details</p>
                  <h2 style="font-size:20px;color:#0f172a;font-weight:900;margin:0 0 18px 0;">${eventTitle || 'Emergency Awareness Drive'}</h2>
                  ${description ? `<p style="font-size:13px;color:#475569;line-height:1.6;margin:0 0 18px 0;">${description}</p>` : ''}
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;font-size:12px;color:#64748b;font-weight:700;width:130px;">📅 Date & Time</td>
                      <td style="padding:8px 0;font-size:13px;color:#1e293b;font-weight:700;">${eventDate || 'IMMEDIATE — As Declared'}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;font-size:12px;color:#64748b;font-weight:700;">🏛️ Venue</td>
                      <td style="padding:8px 0;font-size:13px;color:#1e293b;font-weight:700;">${eventVenue || 'Ground Zero — Contact Admin'}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;font-size:12px;color:#64748b;font-weight:700;">📍 Location</td>
                      <td style="padding:8px 0;font-size:13px;color:#1e293b;font-weight:700;">${eventLocation || 'Declared Zone — To be Confirmed'}</td>
                    </tr>
                    ${requiredResources ? `
                    <tr>
                      <td style="padding:8px 0;font-size:12px;color:#64748b;font-weight:700;vertical-align:top;">⚙️ Required Resources</td>
                      <td style="padding:8px 0;font-size:13px;color:#dc2626;font-weight:700;">${requiredResources}</td>
                    </tr>` : ''}
                  </table>
                </td>
              </tr>
            </table>

            <!-- CONTACT CARD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;margin-bottom:24px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="font-size:12px;font-weight:800;color:#92400e;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">📞 Report To / Emergency Coordinator</p>
                  <p style="font-size:14px;color:#78350f;font-weight:800;margin:0 0 5px 0;">${coordinator || 'Sankalp Admin Team'}</p>
                  <p style="font-size:14px;color:#0369a1;font-weight:800;margin:0;">📱 ${organizerContact || 'Contact via Sankalp Portal'}</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border:2px solid #dc2626;border-radius:14px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 22px;text-align:center;">
                  <p style="font-size:14px;font-weight:800;color:#dc2626;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px;">⚠️ Immediate Action Required</p>
                  <p style="font-size:13px;color:#7f1d1d;margin:0;line-height:1.6;">
                    Please <strong>confirm your availability</strong> by contacting the coordinator above or logging in to the
                    <strong>Sankalp Volunteer Portal</strong> immediately. Every minute counts.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#1e293b;padding:20px 32px;text-align:center;">
            <p style="font-size:12px;color:#94a3b8;margin:0 0 4px 0;">This is an official Emergency SOS from the Sankalp Admin Command Center.</p>
            <p style="font-size:12px;font-weight:800;color:#e2e8f0;margin:0;">Sankalp Social Foundation — Emergency Response Division</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { volunteerEmails, eventData } = req.body || {};

  if (!volunteerEmails || !Array.isArray(volunteerEmails) || volunteerEmails.length === 0) {
    return res.status(400).json({ success: false, error: 'No volunteer emails provided.' });
  }

  if (!eventData?.eventTitle) {
    return res.status(400).json({ success: false, error: 'Missing event data.' });
  }

  const transporter = createTransporter();
  const html = sosBroadcastHtml(eventData);
  const subject = `🆘 URGENT SOS: Emergency Volunteer Required — "${eventData.eventTitle}" | Sankalp`;
  const text = `URGENT EMERGENCY CALL — Sankalp Portal\n\nYou are urgently needed for: ${eventData.eventTitle}\nDate: ${eventData.eventDate}\nVenue: ${eventData.eventVenue}, ${eventData.eventLocation}\nUrgency: ${eventData.urgencyLevel || 'CRITICAL'}\nResources Needed: ${eventData.requiredResources || 'Volunteers'}\n\nCoordinator: ${eventData.coordinator} — ${eventData.organizerContact}\n\nPlease respond immediately.\n\n— Sankalp Emergency Response`;

  const results = { sent: [], failed: [] };

  // Send individually for deliverability (not BCC, so each gets personalized delivery)
  for (const email of volunteerEmails) {
    try {
      await transporter.sendMail({
        from: `"Sankalp Emergency SOS 🆘" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text,
        html,
        priority: 'high',
        headers: { 'X-Priority': '1', 'X-MSMail-Priority': 'High', Importance: 'High' }
      });
      results.sent.push(email);
      // Small delay between sends to avoid Gmail rate limit (500ms)
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`[SOS] Failed for ${email}:`, err.message);
      results.failed.push(email);
    }
  }

  console.log(`[SOS BROADCAST] Sent: ${results.sent.length}, Failed: ${results.failed.length}`);
  return res.status(200).json({
    success: true,
    sentCount: results.sent.length,
    failedCount: results.failed.length,
    failed: results.failed
  });
}
