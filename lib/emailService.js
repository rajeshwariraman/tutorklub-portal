const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export async function sendAssessmentEmail({ parentName, childName, grade, subject, loginId, parentEmail }) {
  const assessmentLink = `https://tutorklub-portal.vercel.app/assess/grade${grade}`;
  const subjectLine = `${childName}'s Grade ${grade} Assessment is Ready — TutorKlub`;

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      
      <div style="background:#1a2744;padding:24px 32px;border-radius:12px 12px 0 0;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="background:#0e8a7c;width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="color:white;font-size:18px;font-weight:700;">T</span>
          </div>
          <div>
            <div style="color:white;font-family:Georgia,serif;font-size:18px;font-weight:700;">TutorKlub</div>
            <div style="color:#6de4d8;font-size:12px;">We teach the way your child learns.</div>
          </div>
        </div>
      </div>

      <div style="padding:32px;background:#faf8f4;">
        <p style="font-size:15px;color:#1a2744;margin:0 0 16px;">Hi ${parentName},</p>
        
        <p style="font-size:15px;color:#5a6478;line-height:1.7;margin:0 0 16px;">
          We hope ${childName} enjoyed meeting the tutor and getting a glimpse of the learning experience at TutorKlub.
        </p>

        <p style="font-size:15px;color:#5a6478;line-height:1.7;margin:0 0 16px;">
          <strong style="color:#1a2744;">${childName}'s Grade ${grade} ${subject} Diagnostic Assessment is now available.</strong>
        </p>

        <p style="font-size:15px;color:#5a6478;line-height:1.7;margin:0 0 24px;">
          This assessment is designed to help us understand ${childName}'s current learning level, identify strengths, uncover any gaps, and build a personalised learning pathway tailored specifically to their needs.
        </p>

        <div style="background:#ffffff;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #e0ddd6;">
          <p style="font-size:13px;font-weight:700;color:#8491a8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px;">Assessment Details</p>
          
          <div style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#0e8a7c;font-weight:700;font-size:14px;">•</span>
            <span style="font-size:14px;color:#5a6478;"><strong style="color:#1a2744;">Login ID:</strong> <span style="font-family:monospace;background:#f0fdf4;color:#0e8a7c;padding:2px 8px;border-radius:4px;font-weight:700;">${loginId}</span></span>
          </div>
          
          <div style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#0e8a7c;font-weight:700;font-size:14px;">•</span>
            <span style="font-size:14px;color:#5a6478;"><strong style="color:#1a2744;">Assessment Link:</strong> <a href="${assessmentLink}" style="color:#0e8a7c;">${assessmentLink}</a></span>
          </div>
          
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#0e8a7c;font-weight:700;font-size:14px;">•</span>
            <span style="font-size:14px;color:#5a6478;"><strong style="color:#1a2744;">Duration:</strong> Approximately 45 minutes</span>
          </div>
        </div>

        <div style="background:#ffffff;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #0e8a7c;">
          <p style="font-size:14px;color:#5a6478;line-height:1.7;margin:0;">
            Please encourage ${childName} to complete the assessment independently in a quiet environment. 
            There is no need for preparation — the goal is simply to understand where ${childName} is today 
            so we can help move forward with confidence.
          </p>
        </div>

        <p style="font-size:15px;color:#5a6478;line-height:1.7;margin:0 0 16px;">
          Once completed, your tutor will review the results and share personalised recommendations during your consultation.
        </p>

        <p style="font-size:15px;color:#5a6478;line-height:1.7;margin:0 0 32px;">
          We look forward to helping ${childName} build strong foundations, greater confidence, and a genuine love for learning.
        </p>

        <a href="${assessmentLink}" 
          style="display:block;background:#0e8a7c;color:white;text-align:center;padding:16px;border-radius:50px;font-size:16px;font-weight:700;text-decoration:none;margin-bottom:32px;">
          Start Assessment →
        </a>

        <p style="font-size:14px;color:#8491a8;margin:0 0 4px;">Warm regards,</p>
        <p style="font-size:14px;color:#1a2744;font-weight:700;margin:0 0 4px;">The TutorKlub Team</p>
        <p style="font-size:13px;color:#0e8a7c;font-style:italic;margin:0;">We teach the way your child learns.</p>
      </div>

      <div style="background:#1a2744;padding:16px 32px;border-radius:0 0 12px 12px;text-align:center;">
        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;">
          © 2026 TutorKlub · hello@tutorklub.com
        </p>
      </div>

    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "TutorKlub <hello@tutorklub.com>",
      to: [parentEmail],
      subject: subjectLine,
      html,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Email error:", data);
    return { success: false, error: data };
  }
  return { success: true, data };
}
