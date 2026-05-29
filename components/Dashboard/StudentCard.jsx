// components/Dashboard/StudentCard.jsx
import { useState } from "react";
import { sendAssessmentEmail } from "../../lib/emailService";

const SC = { Math:"#2563eb", English:"#7c3aed", Telugu:"#c2410c", Hindi:"#db2777" };
const SB = { Math:"#eff6ff", English:"#f5f3ff", Telugu:"#fff7ed", Hindi:"#fdf2f8" };

function Badge({ label }) {
  return (
    <span style={{
      background:SB[label]||"#e6f5f3", color:SC[label]||"#0e8a7c",
      border:`1px solid ${SC[label]||"#0e8a7c"}33`,
      borderRadius:50, padding:"0.18rem 0.6rem",
      fontSize:"0.68rem", fontWeight:700,
      letterSpacing:"0.05em", display:"inline-block",
    }}>{label}</span>
  );
}

export default function StudentCard({ student: s, onSelect }) {
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");

  async function handleSendAssessment(e) {
    e.stopPropagation();
    if (!s.email) {
      setError("No email on file for this student.");
      return;
    }
    setSending(true);
    setError("");
    const { success } = await sendAssessmentEmail({
      parentName:  s.Parent_Name,
      childName:   s.Child_Name,
      grade:       s.Grade,
      subject:     s.Subject,
      loginId:     s.Login_id,
      parentEmail: s.email,
    });
    setSending(false);
    if (success) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } else {
      setError("Failed to send. Please try again.");
    }
  }

  return (
    <div
      style={{
        background:"#fff", borderRadius:12, padding:"1rem 1.25rem",
        boxShadow:"0 2px 8px rgba(26,39,68,0.06)",
        border:"1px solid #f0ede8",
        fontFamily:"'Nunito',system-ui,sans-serif",
      }}>
      <div style={{ display:"flex", alignItems:"center",
        justifyContent:"space-between", flexWrap:"wrap", gap:"0.75rem" }}>

        <div style={{ display:"flex", alignItems:"center",
          gap:"0.85rem", cursor:"pointer", flex:1 }}
          onClick={() => onSelect && onSelect(s)}>
          <div style={{ width:40, height:40, borderRadius:"50%",
            background:"#e6f5f3", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"1.1rem",
            fontWeight:700, color:"#0e8a7c", flexShrink:0 }}>
            {s.Child_Name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:"0.92rem",
              color:"#1a2744", marginBottom:"0.2rem" }}>
              {s.Child_Name}
            </div>
            <div style={{ fontSize:"0.76rem", color:"#8491a8" }}>
              Parent: {s.Parent_Name} · Grade {s.Grade}
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center",
          gap:"0.75rem", flexWrap:"wrap" }}>
          <Badge label={s.Subject}/>
          <div style={{ background:"#faf8f4", borderRadius:8,
            padding:"0.3rem 0.7rem", fontSize:"0.72rem",
            fontFamily:"monospace", fontWeight:700, color:"#1a2744" }}>
            {s.Login_id}
          </div>

          <button
            onClick={handleSendAssessment}
            disabled={sending}
            style={{
              background: sent ? "#f0fdf4" : "#e6f5f3",
              color: sent ? "#16a34a" : "#0e8a7c",
              border: `1px solid ${sent ? "#16a34a33" : "#0e8a7c33"}`,
              borderRadius:50, padding:"0.3rem 0.85rem",
              fontSize:"0.72rem", fontWeight:700,
              cursor: sending ? "default" : "pointer",
              fontFamily:"inherit", whiteSpace:"nowrap",
            }}>
            {sending ? "Sending…" : sent ? "✓ Sent!" : "📨 Send Assessment"}
          </button>

          <span
            onClick={() => onSelect && onSelect(s)}
            style={{ fontSize:"0.78rem", color:"#0e8a7c",
              fontWeight:700, cursor:"pointer" }}>
            View Results →
          </span>
        </div>
      </div>

      {error && (
        <div style={{ fontSize:"0.75rem", color:"#dc2626",
          marginTop:"0.5rem", paddingLeft:"0.25rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}
