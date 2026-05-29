import { useState } from "react";
import { QB3 } from "../data/questionBank";
import { supabase } from "../lib/supabase";

const C = {
  navy:"#1a2744", teal:"#0e8a7c", white:"#fff",
  cream:"#faf8f4", muted:"#5a6478", soft:"#8491a8",
  green:"#16a34a", red:"#dc2626",
};

function Header({ subtitle }) {
  return (
    <div style={{ background:C.navy, padding:"1.25rem 1.5rem",
      display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:36, height:36, borderRadius:8, background:C.teal,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"1.1rem", color:C.white, fontWeight:700 }}>T</div>
      <div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"1.1rem", color:C.white }}>
          TutorKlub
        </div>
        <div style={{ fontSize:"0.72rem", color:"#6de4d8", marginTop:1 }}>{subtitle}</div>
      </div>
    </div>
  );
}

export default function AssessmentGrade3() {
  const [screen, setScreen]   = useState("login");
  const [loginId, setLoginId] = useState("");
  const [answers, setAnswers] = useState({});
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");

  const allAnswered = QB3.length > 0 &&
    QB3.every((_, i) => answers[i] !== undefined);

  async function handleSubmit() {
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSaving(true);
    setError("");
    const score = QB3.reduce((s, q, i) => s + (answers[i] === q.a ? 1 : 0), 0);
    const { error: dbError } = await supabase
      .from("Assessment")
      .insert([{
        student_id:  loginId.toUpperCase(),
        question_id: JSON.stringify(QB3.map(q => q.id)),
        answers:     JSON.stringify(QB3.map((_, i) => answers[i] ?? -1)),
        score,
        total:       QB3.length,
        date:        new Date().toISOString(),
        type:        "Initial Diagnostic",
      }]);
    setSaving(false);
    if (dbError) {
      setError("Submission failed. Please try again.");
      return;
    }
    setScreen("thankyou");
  }

  if (screen === "thankyou") return (
    <div style={{ fontFamily:"'Nunito',system-ui,sans-serif",
      background:C.cream, minHeight:"100vh" }}>
      <Header subtitle="Assessment Complete"/>
      <div style={{ maxWidth:520, margin:"3rem auto", padding:"0 1.5rem" }}>
        <div style={{ background:C.white, borderRadius:18, padding:"2.5rem",
          textAlign:"center", boxShadow:"0 4px 28px rgba(26,39,68,0.1)" }}>
          <div style={{ width:64, height:64, borderRadius:"50%",
            background:"#f0fdf4", display:"flex", alignItems:"center",
            justifyContent:"center", margin:"0 auto 1.25rem",
            fontSize:"1.8rem", color:C.green }}>✓</div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem",
            color:C.navy, marginBottom:"0.75rem" }}>Thank you!</h2>
          <p style={{ fontSize:"0.88rem", color:C.muted,
            lineHeight:1.7, marginBottom:"0.5rem" }}>
            Your assessment has been submitted.
          </p>
          <p style={{ fontSize:"0.88rem", color:C.muted,
            lineHeight:1.7, marginBottom:"1.75rem" }}>
            Please confirm your dates to book a discussion with our team
            about your child's results.
          </p>
          <a href="https://wa.me/919985554222"
            target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center",
              gap:10, width:"100%", background:"#25D366", color:C.white,
              borderRadius:50, padding:"1rem", fontSize:"0.95rem",
              fontWeight:700, textDecoration:"none", fontFamily:"inherit" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  if (screen === "login") return (
    <div style={{ fontFamily:"'Nunito',system-ui,sans-serif",
      background:C.cream, minHeight:"100vh" }}>
      <Header subtitle="Diagnostic Assessment"/>
      <div style={{ maxWidth:520, margin:"0 auto" }}>
        <div style={{ background:C.white, borderRadius:"0 0 16px 16px",
          padding:"2rem", textAlign:"center",
          borderBottom:"0.5px solid #e8e4de",
          borderLeft:"0.5px solid #e8e4de",
          borderRight:"0.5px solid #e8e4de",
          marginBottom:"1.5rem" }}>
          <div style={{ display:"inline-block", background:"#e6f5f3",
            color:C.teal, fontSize:"0.75rem", fontWeight:700,
            padding:"0.3rem 1rem", borderRadius:50,
            marginBottom:"1rem", letterSpacing:"0.05em" }}>
            Grade 3 · Mathematics
          </div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem",
            color:C.navy, marginBottom:"0.75rem" }}>
            Initial Diagnostic Assessment
          </h2>
          <p style={{ fontSize:"0.85rem", color:C.muted,
            lineHeight:1.7, marginBottom:"1.5rem" }}>
            This assessment helps us understand your child's current level
            in Mathematics. It contains {QB3.length} questions covering key
            Grade 3 topics. Please read each question carefully and select
            the best answer. There is no time limit.
          </p>
          <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.soft,
            textTransform:"uppercase", letterSpacing:"0.08em",
            marginBottom:"0.4rem", textAlign:"left" }}>
            Enter your Login ID
          </div>
          <input
            value={loginId}
            onChange={e => setLoginId(e.target.value)}
            onKeyDown={e => e.key === "Enter" && loginId.includes("TK-") && setScreen("test")}
            placeholder="e.g. TK-AR4821"
            style={{ width:"100%", padding:"0.85rem",
              border:"1.5px solid #e0ddd6", borderRadius:10,
              fontSize:"1rem", fontFamily:"monospace",
              textAlign:"center", marginBottom:"1rem",
              outline:"none", color:C.navy, boxSizing:"border-box" }}/>
          <button
            onClick={() => {
              if (!loginId.toUpperCase().includes("TK-")) {
                setError("Please enter a valid Login ID (e.g. TK-AR4821)");
                return;
              }
              setError("");
              setScreen("test");
            }}
            style={{ width:"100%", background:C.teal, color:C.white,
              border:"none", borderRadius:50, padding:"0.9rem",
              fontSize:"0.9rem", fontWeight:700, cursor:"pointer",
              fontFamily:"inherit" }}>
            Start Assessment →
          </button>
          {error && <p style={{ fontSize:"0.8rem", color:C.red,
            marginTop:"0.75rem" }}>{error}</p>}
          <p style={{ fontSize:"0.72rem", color:"#aaa", marginTop:"0.75rem" }}>
            Your Login ID was provided by your TutorKlub tutor
          </p>
        </div>
      </div>
    </div>
  );

  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / QB3.length) * 100);

  return (
    <div style={{ fontFamily:"'Nunito',system-ui,sans-serif",
      background:C.cream, minHeight:"100vh" }}>
      <Header subtitle={`Grade 3 · Mathematics · ${QB3.length} Questions`}/>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"1.25rem 1.5rem" }}>

        <div style={{ background:"#e8e4de", height:6,
          borderRadius:3, marginBottom:4 }}>
          <div style={{ background:C.teal, height:"100%",
            borderRadius:3, width:`${pct}%`,
            transition:"width 0.3s" }}/>
        </div>
        <div style={{ fontSize:"0.75rem", color:C.soft,
          textAlign:"right", marginBottom:"1rem" }}>
          {answered} of {QB3.length} answered
        </div>

        {QB3.map((q, i) => (
          <div key={q.id} style={{ background:C.white, borderRadius:14,
            padding:"1.25rem", marginBottom:"1rem",
            border:`0.5px solid ${answers[i] !== undefined ? C.teal + "44" : "#e8e4de"}` }}>
            <div style={{ fontSize:"0.7rem", fontWeight:700, color:C.teal,
              textTransform:"uppercase", letterSpacing:"0.08em",
              marginBottom:"0.5rem" }}>
              Question {i + 1} of {QB3.length}
            </div>
            <p style={{ fontSize:"0.92rem", color:C.navy, fontWeight:600,
              lineHeight:1.6, marginBottom:"1rem" }}>{q.q}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {q.opts.map((opt, j) => (
                <button key={j}
                  onClick={() => setAnswers(prev => ({ ...prev, [i]: j }))}
                  style={{ padding:"0.65rem 0.85rem", borderRadius:8,
                    border:`1.5px solid ${answers[i] === j ? C.teal : "#e0ddd6"}`,
                    fontSize:"0.83rem", color: answers[i] === j ? C.teal : C.navy,
                    cursor:"pointer", background: answers[i] === j ? "#e6f5f3" : C.white,
                    textAlign:"left", fontFamily:"inherit",
                    fontWeight: answers[i] === j ? 700 : 400 }}>
                  {String.fromCharCode(65 + j)}. {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background:C.white, borderRadius:14,
          padding:"1.25rem", textAlign:"center",
          border:"0.5px solid #e8e4de", marginTop:"0.5rem" }}>
          {!allAnswered && (
            <p style={{ fontSize:"0.78rem", color:C.soft, marginBottom:"1rem" }}>
              {QB3.length - answered} question{QB3.length - answered !== 1 ? "s" : ""} remaining
            </p>
          )}
          {error && <p style={{ fontSize:"0.8rem", color:C.red,
            marginBottom:"1rem" }}>{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{ background: saving ? "#d1d5db" : C.navy,
              color:C.white, border:"none", borderRadius:50,
              padding:"1rem 2.5rem", fontSize:"0.95rem",
              fontWeight:700, cursor: saving ? "default" : "pointer",
              fontFamily:"inherit" }}>
            {saving ? "Submitting…" : "Submit Assessment →"}
          </button>
        </div>

      </div>
    </div>
  );
}
