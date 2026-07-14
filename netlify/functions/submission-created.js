/**
 * Netlify Function: submission-created
 *
 * Fires automatically on every Netlify Form submission.
 * Delivers lead notifications via a 3-tier fallback chain:
 *
 *   Tier 1 — Resend API          (primary, branded HTML — needs RESEND_API_KEY)
 *   Tier 2 — Nodemailer + SMTP   (local fallback — uses your own Hostingrr mailbox,
 *                                 completely independent of any third-party service)
 *   Tier 3 — Emergency log       (last resort — lead data written to Netlify function
 *                                 logs so nothing is ever silently lost)
 *
 * ── Environment variables (Netlify → Site settings → Environment variables) ──
 *
 * Tier 1 (Resend):
 *   RESEND_API_KEY          Your Resend API key
 *   NOTIFY_EMAIL            Destination inbox  (default: support@ecommittra.com)
 *
 * Tier 2 (SMTP / Hostingrr):
 *   SMTP_HOST               cPanel mail server  (default: mail.ecommittra.com)
 *   SMTP_PORT               465 (SSL) or 587 (TLS)  (default: 465)
 *   SMTP_SECURE             "true" for port 465 SSL, "false" for 587 TLS  (default: true)
 *   SMTP_USER               Full mailbox address    e.g. support@ecommittra.com
 *   SMTP_PASS               Mailbox password
 *   SMTP_FROM               Friendly from address   e.g. "eCommittra Leads <support@ecommittra.com>"
 *                           (defaults to SMTP_USER if not set)
 *
 * How to find SMTP details in Hostingrr cPanel:
 *   cPanel → Email Accounts → [your account] → Connect Devices → Mail Client Settings
 */

import nodemailer from 'nodemailer';

export const handler = async (event) => {

  // ── Parse payload ────────────────────────────────────────────────────────
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    console.error('[submission-created] Failed to parse event body');
    return { statusCode: 400, body: 'Bad request' };
  }

  if (payload.form_name !== 'contact') {
    return { statusCode: 200, body: 'Skipped — not the contact form' };
  }

  // ── Extract lead data ────────────────────────────────────────────────────
  const { data } = payload;
  const firstName   = data.firstName || 'Not provided';
  const email       = data.email     || 'Not provided';
  const phone       = data.phone     || 'Not provided';
  const service     = data.service   || 'General Inquiry';
  const message     = data.message   || 'Not provided';
  const replyTo     = email !== 'Not provided' ? email : undefined;
  const notifyEmail = process.env.NOTIFY_EMAIL || 'support@ecommittra.com';
  const subject     = `🔔 New Lead: ${firstName} — ${service}`;

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const htmlBody = buildHtml({ firstName, email, phone, service, message, submittedAt });
  const textBody = buildText({ firstName, email, phone, service, message, submittedAt });

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 1 — Resend (primary)
  // ══════════════════════════════════════════════════════════════════════════
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:     'eCommittra Leads <leads@ecommittra.com>',
          to:       [notifyEmail],
          reply_to: replyTo,
          subject,
          html:     htmlBody,
          text:     textBody,
        }),
      });

      if (res.ok) {
        console.log(`[submission-created] ✅ Tier 1 (Resend) — sent for: ${firstName} (${phone})`);
        return { statusCode: 200, body: 'Email sent via Resend' };
      }

      const errText = await res.text();
      console.warn(`[submission-created] ⚠️ Tier 1 (Resend) failed [${res.status}]: ${errText}`);
    } catch (err) {
      console.warn(`[submission-created] ⚠️ Tier 1 (Resend) threw: ${err.message}`);
    }
  } else {
    console.warn('[submission-created] ⚠️ RESEND_API_KEY not set — skipping Tier 1');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 2 — Nodemailer via Hostingrr SMTP (local fallback)
  //
  //  Completely independent of any external email service.
  //  Uses your own mailbox on your own hosting server.
  // ══════════════════════════════════════════════════════════════════════════
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    try {
      const smtpHost   = process.env.SMTP_HOST   || 'mail.ecommittra.com';
      const smtpPort   = parseInt(process.env.SMTP_PORT || '465', 10);
      const smtpSecure = (process.env.SMTP_SECURE || 'true') === 'true'; // true = SSL (port 465)
      const smtpFrom   = process.env.SMTP_FROM   || `eCommittra Leads <${smtpUser}>`;

      const transporter = nodemailer.createTransport({
        host:   smtpHost,
        port:   smtpPort,
        secure: smtpSecure,          // true → SSL on 465 | false → STARTTLS on 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        // Hostingrr shared hosting uses self-signed certs on some configs.
        // tls.rejectUnauthorized:false allows connection while still encrypting traffic.
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 8000,     // 8 s — Netlify functions timeout after 10 s
        greetingTimeout:   6000,
        socketTimeout:     8000,
      });

      await transporter.sendMail({
        from:    smtpFrom,
        to:      notifyEmail,
        replyTo: replyTo,
        subject,
        html:    htmlBody,
        text:    textBody,
      });

      console.log(`[submission-created] ✅ Tier 2 (SMTP/Nodemailer) — sent for: ${firstName} (${phone})`);
      return { statusCode: 200, body: 'Email sent via SMTP fallback' };

    } catch (err) {
      console.warn(`[submission-created] ⚠️ Tier 2 (SMTP/Nodemailer) failed: ${err.message}`);
    }
  } else {
    console.warn('[submission-created] ⚠️ SMTP_USER / SMTP_PASS not set — skipping Tier 2');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TIER 3 — Emergency log (lead is NEVER silently lost)
  //
  //  View logs: Netlify dashboard → Functions → submission-created → Logs
  //  The lead also always exists in: Netlify → Forms → contact submissions
  // ══════════════════════════════════════════════════════════════════════════
  console.error(
    '[submission-created] 🚨 ALL DELIVERY METHODS FAILED — lead preserved below:\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    `  Name:     ${firstName}\n` +
    `  Phone:    +91 ${phone}\n` +
    `  Email:    ${email}\n` +
    `  Service:  ${service}\n` +
    `  Message:  ${message}\n` +
    `  Time:     ${submittedAt} IST\n` +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  );

  // Return 200 — don't let Netlify retry and create duplicate log spam.
  // The lead data is safe in Netlify Forms dashboard regardless of email failures.
  return {
    statusCode: 200,
    body: 'All delivery methods failed — lead logged to function logs and saved in Netlify Forms',
  };
};

// ── HTML email builder ────────────────────────────────────────────────────
function buildHtml({ firstName, email, phone, service, message, submittedAt }) {
  const emailLink = email !== 'Not provided'
    ? `<a href="mailto:${escapeHtml(email)}" style="color:#FF6B2B;text-decoration:none;">${escapeHtml(email)}</a>`
    : '<span style="color:#9ca3af;font-style:italic;">Not provided</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — eCommittra</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#FF6B2B 0%,#e55a1c 100%);padding:28px 40px;text-align:center;">
          <img src="https://ecommittra.com/logo.png" alt="eCommittra" width="48" height="48"
               style="display:inline-block;width:48px;height:48px;object-fit:contain;margin-bottom:10px;border-radius:8px;background:#ffffff;padding:4px;" />
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">eCommittra</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Your Committed Partner for eCommerce Growth</p>
        </td></tr>

        <!-- Alert banner -->
        <tr><td style="background:#fff7f3;border-bottom:3px solid #FF6B2B;padding:16px 40px;text-align:center;">
          <p style="margin:0;color:#FF6B2B;font-size:15px;font-weight:600;">🔔 &nbsp;New Lead from Website Contact Form</p>
          <p style="margin:4px 0 0;color:#6b7280;font-size:12px;">Submitted on ${submittedAt} IST</p>
        </td></tr>

        <!-- Lead details -->
        <tr><td style="padding:32px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">

            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="36" valign="top"><span style="display:inline-block;width:28px;height:28px;background:#fff7f3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">👤</span></td>
                <td style="padding-left:12px;">
                  <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                  <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#111827;">${escapeHtml(firstName)}</p>
                </td>
              </tr></table>
            </td></tr>

            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="36" valign="top"><span style="display:inline-block;width:28px;height:28px;background:#fff7f3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">📱</span></td>
                <td style="padding-left:12px;">
                  <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Phone</p>
                  <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#111827;">+91 ${escapeHtml(phone)}</p>
                </td>
                <td align="right" valign="middle">
                  <a href="tel:+91${phone.replace(/\s/g, '')}" style="display:inline-block;background:#FF6B2B;color:#ffffff;font-size:12px;font-weight:600;padding:7px 16px;border-radius:6px;text-decoration:none;">📞 Call Now</a>
                </td>
              </tr></table>
            </td></tr>

            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="36" valign="top"><span style="display:inline-block;width:28px;height:28px;background:#fff7f3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">✉️</span></td>
                <td style="padding-left:12px;">
                  <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                  <p style="margin:2px 0 0;font-size:15px;font-weight:500;color:#111827;">${emailLink}</p>
                </td>
              </tr></table>
            </td></tr>

            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="36" valign="top"><span style="display:inline-block;width:28px;height:28px;background:#fff7f3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">🛒</span></td>
                <td style="padding-left:12px;">
                  <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Service Interested In</p>
                  <p style="margin:2px 0 0;"><span style="display:inline-block;background:#fff7f3;color:#FF6B2B;font-size:13px;font-weight:600;padding:3px 10px;border-radius:20px;border:1px solid #ffcfb8;">${escapeHtml(service)}</span></p>
                </td>
              </tr></table>
            </td></tr>

            <tr><td style="padding:16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0"><tr>
                <td width="36" valign="top"><span style="display:inline-block;width:28px;height:28px;background:#fff7f3;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">💬</span></td>
                <td style="padding-left:12px;">
                  <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                  <div style="margin:8px 0 0;background:#f9fafb;border-left:3px solid #FF6B2B;border-radius:0 6px 6px 0;padding:12px 16px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${escapeHtml(message)}</p>
                  </div>
                </td>
              </tr></table>
            </td></tr>

          </table>
        </td></tr>

        <!-- CTA buttons -->
        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:8px;">
              <a href="https://wa.me/918821953915?text=Hi%20${encodeURIComponent(firstName)}%2C%20this%20is%20eCommittra.%20We%20received%20your%20inquiry%20and%20wanted%20to%20connect%21"
                 style="display:block;text-align:center;background:#25D366;color:#ffffff;font-size:13px;font-weight:600;padding:12px;border-radius:8px;text-decoration:none;">
                💬 WhatsApp Lead
              </a>
            </td>
            <td style="padding-left:8px;">
              <a href="https://app.netlify.com/sites/ecommittra/forms"
                 style="display:block;text-align:center;background:#f3f4f6;color:#374151;font-size:13px;font-weight:600;padding:12px;border-radius:8px;text-decoration:none;">
                📋 View All Submissions
              </a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Sent automatically from <strong>ecommittra.com</strong> contact form.</p>
          <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">
            Rahul: <a href="tel:+918821953915" style="color:#FF6B2B;text-decoration:none;">+91 8821953915</a>
            &nbsp;·&nbsp;
            Himanshu: <a href="tel:+917489881387" style="color:#FF6B2B;text-decoration:none;">+91 7489881387</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Plain-text builder ────────────────────────────────────────────────────
function buildText({ firstName, email, phone, service, message, submittedAt }) {
  return `New Lead — eCommittra Website
Submitted: ${submittedAt} IST

Name:    ${firstName}
Phone:   +91 ${phone}
Email:   ${email}
Service: ${service}

Message:
${message}

---
Rahul: +91 8821953915 | Himanshu: +91 7489881387`.trim();
}

// ── HTML escape ───────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
