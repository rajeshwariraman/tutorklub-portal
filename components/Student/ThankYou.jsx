import { useState } from "react";
import { supabase } from "../../lib/supabase";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478", bg:"#faf8f4" };

const NEXT = [
  ["📋","You will receive a full list of all questions you answered"],
  ["📊","Your tutor is preparing your comprehensive test report"],
  ["👩‍🏫","Your tutor will review your results with you personally"],
  ["📅","Your demo session will be confirmed shortly"],
];

export default function ThankYou({ student, score, total, assessmentId }) {
  const [fb, setFb]     = useState({ how:"", topics:"", help:"" });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const name = student?.child_name?.split(" ")[0] || "Student";

  async function submitFeedback() {
    if (!fb.how && !fb.topics && !fb.help) return;
    setSaving(true);
    await supabase.from("Assessment")
      .update({ feedback: { how_was_test: fb.how, current_topics: fb.topics, needs_help_with: fb.help } })
      .eq("student_id", student.id)
      .order("date", { ascending: false })
      .limit(1);
    setSaving(false); setSaved(true);
  }

  const inp = (val, key, placeholder) => (
    <textarea value={val} onChange={e=>setFb(f=>({...f,[key]:e.target.value}))}
      placeholder={placeholder} rows={2}
      style={{width:"100%",padding:"0.65rem 0.8rem",borderRadius:8,border:"1.5px solid #e2e6ef",
        fontSize:"0.88rem",resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",outline:"none"}}/>
  );

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',system-ui,sans-serif",
      padding:"1.5rem 1rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:"100%",maxWidth:520}}>
        {/* Section 1 */}
        <div style={{background:C.white,borderRadius:16,padding:"1.8rem",
          boxShadow:"0 4px 24px rgba(26,39,68,0.08)",marginBottom:"1rem",textAlign:"center"}}>
          <div style={{fontSize:"2.5rem",marginBottom:"0.5rem"}}>🎉</div>
          <h2 style={{margin:"0 0 0.4rem",color:C.navy,fontSize:"1.4rem",fontWeight:800}}>Assessment Complete!</h2>
          <p style={{color:C.muted,margin:0,fontSize:"0.95rem"}}>
            Well done {name}! You answered <strong style={{color:C.teal}}>{score} out of {total}</strong> questions.
          </p>
        </div>

        {/* Section 2 */}
        <div style={{background:C.white,borderRadius:16,padding:"1.5rem",
          boxShadow:"0 4px 24px rgba(26,39,68,0.08)",marginBottom:"1rem"}}>
          <h3 style={{margin:"0 0 0.8rem",color:C.navy,fontWeight:800,fontSize:"1rem"}}>What happens next</h3>
          {NEXT.map(([icon,txt],i)=>(
            <div key={i} style={{display:"flex",gap:"0.7rem",alignItems:"flex-start",
              marginBottom:"0.5rem",fontSize:"0.9rem",color:"#374151"}}>
              <span>{icon}</span><span>{txt}</span>
            </div>
          ))}
        </div>

        {/* Section 3 — Feedback */}
        <div style={{background:C.white,borderRadius:16,padding:"1.5rem",
          boxShadow:"0 4px 24px rgba(26,39,68,0.08)",marginBottom:"1rem"}}>
          <h3 style={{margin:"0 0 0.25rem",color:C.navy,fontWeight:800,fontSize:"1rem"}}>Tell us how it went! 😊</h3>
          <p style={{margin:"0 0 1rem",color:C.muted,fontSize:"0.85rem"}}>Your feedback helps us prepare better for your demo session.</p>
          <p style={{fontWeight:700,color:C.navy,fontSize:"0.85rem",margin:"0 0 0.3rem"}}>How did you find the test?</p>
          {inp(fb.how,"how","e.g. It was easy / tough / I got confused on fractions...")}
          <p style={{fontWeight:700,color:C.navy,fontSize:"0.85rem",margin:"0.8rem 0 0.3rem"}}>What topics are you currently studying at school?</p>
          {inp(fb.topics,"topics","e.g. We are doing multiplication tables and fractions in class right now...")}
          <p style={{fontWeight:700,color:C.navy,fontSize:"0.85rem",margin:"0.8rem 0 0.3rem"}}>Is there anything you find really difficult or would like help with?</p>
          {inp(fb.help,"help","e.g. I struggle with word problems and division...")}
          {saved
            ? <p style={{color:"#16a34a",fontWeight:700,fontSize:"0.9rem",margin:"0.8rem 0 0"}}>Thank you for your feedback! ✅</p>
            : <button onClick={submitFeedback} disabled={saving}
                style={{marginTop:"0.9rem",padding:"0.65rem 1.5rem",background:C.teal,color:C.white,
                  border:"none",borderRadius:10,fontWeight:800,fontSize:"0.9rem",cursor:"pointer",opacity:saving?0.7:1}}>
                {saving?"Saving...":"Submit Feedback →"}
              </button>}
        </div>

        {/* Section 4 */}
        <div style={{background:C.white,borderRadius:16,padding:"1.5rem",
          boxShadow:"0 4px 24px rgba(26,39,68,0.08)",textAlign:"center"}}>
          <p style={{margin:"0 0 0.4rem",color:C.muted,fontSize:"0.82rem"}}>Your Login ID</p>
          <code style={{display:"block",background:"#f1f5f9",padding:"0.5rem 1rem",borderRadius:8,
            fontSize:"1rem",fontWeight:700,color:C.navy,marginBottom:"1rem"}}>{student?.login_id}</code>
          <a href="https://calendly.com/tutorklub/free-assessment" target="_blank" rel="noreferrer"
            style={{display:"block",padding:"0.75rem",background:C.navy,color:C.white,
              borderRadius:10,fontWeight:800,fontSize:"0.95rem",textDecoration:"none",marginBottom:"0.8rem"}}>
            📅 Book Free Demo Session
          </a>
          <div style={{display:"flex",alignItems:"center",gap:"0.4rem",justifyContent:"center"}}>
            <div style={{width:22,height:22,borderRadius:5,background:C.teal,display:"flex",
              alignItems:"center",justifyContent:"center",fontSize:"0.7rem"}}>✦</div>
            <span style={{fontFamily:"Georgia,serif",fontWeight:700,color:C.navy,fontSize:"0.95rem"}}>TutorKlub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// 90 lines
