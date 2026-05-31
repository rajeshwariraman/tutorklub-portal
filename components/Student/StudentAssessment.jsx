import { useState, useEffect, useRef } from "react";
import { QB } from "../../data/questionBank";
import { supabase } from "../../lib/supabase";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478" };
const MINS = 45;

export default function StudentAssessment({ student, grade, subject, onDone }) {
  const questions = QB.filter(q => q.g === parseInt(grade) && q.s === subject);
  const [answers, setAnswers] = useState({});
  const [secs, setSecs]       = useState(MINS * 60);
  const timerRef              = useRef(null);

  useEffect(() => {
    // Tab switch detection
    const onBlur = () => { clearInterval(timerRef.current); onDone(answers, questions, true); };
    window.addEventListener("blur", onBlur);
    timerRef.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(timerRef.current); submit(answers, false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => { clearInterval(timerRef.current); window.removeEventListener("blur", onBlur); };
  }, []);

  async function submit(ans, confirm = true) {
    const answered = Object.keys(ans).length;
    if (confirm && !window.confirm(
      `You have answered ${answered} of ${questions.length} questions. Submit now?`)) return;
    clearInterval(timerRef.current);
    const score = questions.reduce((n,q) => n + (ans[q.id] === q.a ? 1 : 0), 0);
    await supabase.from("Assessment").insert({
      student_id: student.id,
      question_ids: questions.map(q=>q.id),
      answers: ans,
      score,
      total: questions.length,
      date: new Date().toISOString(),
    });
    onDone(ans, questions, false, score);
  }

  const mm = String(Math.floor(secs/60)).padStart(2,"0");
  const ss = String(secs%60).padStart(2,"0");
  const low = secs < 300;
  const answered = Object.keys(answers).length;

  if (!questions.length) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      fontFamily:"'Nunito',system-ui,sans-serif",color:C.muted,textAlign:"center",padding:"2rem"}}>
      <div><h3 style={{color:C.navy}}>Assessment not available yet</h3>
      <p>Please contact your tutor.</p></div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Nunito',system-ui,sans-serif",background:"#faf8f4",minHeight:"100vh"}}>
      {/* Sticky header */}
      <div style={{position:"sticky",top:0,zIndex:10,background:C.navy,color:C.white,
        padding:"0.75rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,fontSize:"0.9rem"}}>{student?.child_name}</span>
        <span style={{fontWeight:800,fontSize:"1.1rem",color:low?"#f87171":"#6de4d8"}}>{mm}:{ss}</span>
        <span style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.7)"}}>{answered} of {questions.length} answered</span>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"1.5rem 1rem"}}>
        {questions.map((q,i) => {
          const unanswered = answers[q.id] === undefined;
          return (
            <div key={q.id} style={{background:C.white,borderRadius:12,padding:"1.2rem",
              marginBottom:"1rem",border:`1.5px solid ${unanswered?"#fcd34d":"#e2e6ef"}`,
              boxShadow:"0 2px 8px rgba(26,39,68,0.06)"}}>
              <p style={{margin:"0 0 0.8rem",fontWeight:700,color:C.navy,fontSize:"0.95rem"}}>
                <span style={{color:C.teal,marginRight:"0.4rem"}}>Q{i+1}.</span>{q.q}
              </p>
              {q.opts.map((opt,oi) => (
                <label key={oi} style={{display:"flex",alignItems:"center",gap:"0.6rem",
                  padding:"0.45rem 0.7rem",borderRadius:8,marginBottom:"0.3rem",cursor:"pointer",
                  background:answers[q.id]===oi?"#f0fdf8":"transparent",
                  border:`1px solid ${answers[q.id]===oi?C.teal:"transparent"}`}}>
                  <input type="radio" name={`q${q.id}`} checked={answers[q.id]===oi}
                    onChange={()=>setAnswers(a=>({...a,[q.id]:oi}))}
                    style={{accentColor:C.teal}}/>
                  <span style={{fontSize:"0.9rem",color:"#374151"}}>{opt}</span>
                </label>
              ))}
            </div>
          );
        })}
        <button onClick={()=>submit(answers)}
          style={{width:"100%",padding:"0.9rem",background:C.teal,color:C.white,border:"none",
            borderRadius:12,fontSize:"1.05rem",fontWeight:800,cursor:"pointer",marginTop:"0.5rem"}}>
          Submit Assessment ✓
        </button>
      </div>
    </div>
  );
}
// 97 lines
