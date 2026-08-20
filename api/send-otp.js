// Vercel Serverless Function — /api/send-otp
// Handles OTP email dispatch via official Gmail SMTP (Google App Password)
// This runs server-side on Vercel's Node.js runtime, so Nodemailer works perfectly.

import nodemailer from 'nodemailer';

// In-memory OTP store: { email: { otp, expiresAt } }
// Note: On Vercel, serverless functions can be cold-started, so for production scale
// use a Redis/KV store. For this app, in-memory is sufficient for single-session flows.
const otpStore = {};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, userName, purpose } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  // Generate a fresh 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Store in memory
  otpStore[email.toLowerCase().trim()] = { otp, expiresAt };

  // Build beautiful HTML email
  const contextLabel = purpose || 'Account Verification';
  const recipientName = userName || 'Valued Member';

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:540px;margin:0 auto;background:#ffffff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.07);">
      <div style="background:linear-gradient(135deg,#0284c7 0%,#0369a1 50%,#0f172a 100%);padding:30px 25px;text-align:center;">
        <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:6px 16px;border-radius:10px;color:#bae6fd;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
          Sankalp Social Network
        </div>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:800;">Your Verification Code</h1>
      </div>
      <div style="padding:32px 28px;">
        <p style="font-size:15px;color:#1e293b;font-weight:700;margin-top:0;">Hello ${recipientName},</p>
        <p style="font-size:13px;color:#64748b;line-height:1.7;margin-bottom:20px;">
          We received a request for <strong>${contextLabel}</strong>. Use the 6-digit one-time code below to proceed:
        </p>
        <div style="background:#f0f9ff;border:2px dashed #0284c7;border-radius:16px;padding:24px;text-align:center;margin:24px 0;">
          <div style="font-size:11px;font-weight:800;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">Your One-Time Code</div>
          <div style="font-family:monospace;font-size:40px;font-weight:900;color:#0284c7;letter-spacing:10px;">${otp}</div>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;margin-bottom:20px;">
          <p style="font-size:12px;color:#92400e;margin:0;font-weight:600;">
            ⏱️ This code expires in <strong>5 minutes</strong>. Never share it with anyone.
          </p>
        </div>
        <p style="font-size:11px;color:#94a3b8;margin:0;">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
      <div style="background:#f8fafc;padding:16px 28px;text-align:center;border-top:1px solid #e2e8f0;">
        <p style="font-size:11px;color:#94a3b8;margin:0;">© ${new Date().getFullYear()} Sankalp Social Network · Empowering NGOs &amp; Corporates</p>
      </div>
    </div>
  `;

  // Configure Gmail SMTP using Google App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Sankalp Portal" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: `${otp} is your Sankalp Portal Verification Code`,
      text: `Hello ${recipientName},\n\nYour Sankalp verification code is: ${otp}\n\nValid for 5 minutes. Never share this code.\n\n— Sankalp Social Network`,
      html: htmlBody
    });

    console.log(`[OTP SENT] ${otp} → ${email}`);

    return res.status(200).json({
      success: true,
      otpCode: otp,
      message: `OTP sent successfully to ${email}`
    });
  } catch (err) {
    console.error('[OTP SEND ERROR]', err.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to send OTP email. Please try again.',
      detail: err.message
    });
  }
}
