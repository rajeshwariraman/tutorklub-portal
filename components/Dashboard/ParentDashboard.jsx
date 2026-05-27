// components/Dashboard/ParentDashboard.jsx
import { useState } from "react";
import { QB, DEMO_STUDENT, buildFoundationPlan } from "../../data/questionBank";
import TutorIntervention from "../Foundation/TutorIntervention";
import FoundationPlan from "../Foundation/FoundationPlan";

const C = {
  navy:"#1a2744", teal:"#0e8a7c", gold:"#c9922a",
  cream:"#faf8f4", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626", redL:"#fef2f2",
  amber:"#d97706", amberL:"#fffbeb",
  purple:"#7c3aed", pink:"#db2777", orange:"#c2410c",
  blue:"#2563eb", blueL:"#eff6ff",
  muted:"#5a6478", soft:"#8491a8",
};

function ScoreGauge({score,total}){
  const pct=(score/total)*100;
  const col=pct>=80?C.green:pct>=60?C.amber:C.red;
  const lbl=pct>=80?"Excellent":pct>=60?"Good":pct>=40?"Needs Practice":"Needs Support";
  const r=50,cx=64,cy=64,circ=2*Math.PI*r,dash=(pct/100)*circ;
  return(
    <div style={{textAlign:"center"}}>
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth={9}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={9}
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} style={{transition:"stroke-dasharray 1s"}}/>
        <text x={cx} y={cy-5} textAnchor="middle" fontSize={20} fontWeight={700} fill={C.navy} fontFamily="Georgia,serif">{score}/{total}</text>
        <text x={cx} y={cy+13} textAnchor="middle" fontSize={10} fill={C.soft} fontFamily="Nunito,sans-serif">Score</text>
      </svg>
      <div style={{fontWeight:700,fontSize:"0.82rem",color:col,marginTop:2}}>{lbl}</div>
    </div>
  );
}

function StatCard({icon,val,label,sub,color}){
  return(
    <div style={{background:C.white,borderRadius:12,padding:"1.1rem 1rem",boxShadow:"0 2px 12px rgba(26,39,68,0.07)"}}>
      <div style={{fontSize:"1.3rem",marginBottom:"0.3rem"}}>{icon}</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:"1.7rem",fontWeight:700,color:color||C.navy,lineHeight:1}}>{val}</div>
      <div style={{fontSize:"0.7rem",color:C.soft,fontWeight:600,marginTop:"0.3rem"}}>{label}</div>
      {sub&&<div style={{fontSize:"0.68rem",color:"#bbb",marginTop:"0.1rem"}}>{sub}</div>}
    </div>
  );
}

export default function ParentDashboard(){
  const [loginInput,setLoginInput]=useState("");
  const [student,setStudent]=useState(null);
  const [showLocked,setShowLocked]=useState(true);
  const [expandedQ,setExpandedQ]=useState(null);
  const [planView,setPlanView]=useState("plan");

  const studentQs=student?student.questionIds.map(id=>QB.find(q=>q.id===id)).filter(Boolean):[];
  const score=student?studentQs.reduce((s,q,i)=>s+(student.answers[i]===q.a?1:0),0):0;
  const topicData=student?studentQs.map((q,i)=>({...q,correct:student.answers[i]===q.a,selectedOpt:q.opts[student.answers[i]],correctOpt:q.opts[q.a]})):[];
  const plan=student?buildFoundationPlan(student,studentQs,student.answers):[];
  const wrongTopics=topicData.filter(t=>!t.correct);

  return(
  <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>

    <div style={{textAlign:"center",marginBottom:"20px"}}>
      <button onClick={()=>window.location.href="https://calendly.com/tutorklub/free-assessment"}
        style={{background:"#0e8a7c",color:"white",padding:"12px 24px",borderRadius:"30px",border:"none",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}>
        Book Free Demo
      </button>
    </div>

    {/* ── Login Screen ── */}
    {!student&&(
    <div style={{background:C.white,borderRadius:18,padding:"2.5rem",maxWidth:460,margin:"0 auto",boxShadow:"0 4px 28px rgba(26,39,68,0.1)",textAlign:"center"}}>
      <div style={{fontSize:"2.5rem",marginBottom:"0.6rem"}}>🔒</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.45rem",color:C.navy,marginBottom:"0.5rem"}}>Open Student Results</h2>
      <p style={{fontSize:"0.85rem",color:C.muted,marginBottom:"1.5rem",lineHeight:1.7}}>Enter the student's Login ID to view their full assessment dashboard. Share results with parents during the demo session.</p>
      <input value={loginInput} onChange={e=>setLoginInput(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&loginInput.toUpperCase().includes("TK-")&&(setStudent(DEMO_STUDENT),setShowLocked(true))}
        placeholder="e.g. TK-AR4821"
        style={{width:"100%",padding:"0.75rem",border:"1.5px solid #e0ddd6",borderRadius:10,fontSize:"1rem",fontFamily:"monospace",textAlign:"center",boxSizing:"border-box",marginBottom:"0.75rem",outline:"none"}}/>
      <button onClick={()=>{if(loginInput.toUpperCase().includes("TK-")){setStudent(DEMO_STUDENT);setShowLocked(true);}}}
        style={{width:"100%",background:C.teal,color:C.white,border:"none",borderRadius:50,padding:"0.85rem",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(14,138,124,0.3)"}}>
        Open Dashboard →
      </button>
      <p style={{fontSize:"0.72rem",color:"#aaa",marginTop:"0.75rem"}}>Demo: type TK-AR4821 and press Enter</p>
    </div>)}

    {/* ── Locked Screen ── */}
    {student&&showLocked&&(
    <div style={{background:C.white,borderRadius:18,padding:"2.5rem",maxWidth:460,margin:"0 auto",boxShadow:"0 4px 28px rgba(26,39,68,0.1)",textAlign:"center"}}>
      <div style={{fontSize:"3rem",marginBottom:"0.6rem"}}>🔒</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.45rem",color:C.navy,marginBottom:"0.5rem"}}>Results Ready: {student.childName}</h2>
      <p style={{fontSize:"0.85rem",color:C.muted,marginBottom:"1.5rem",lineHeight:1.7}}>Present to <strong>{student.parentName}</strong> when you are in the demo session. Click below to reveal all results.</p>
      <div style={{background:C.cream,borderRadius:12,padding:"1rem",marginBottom:"1.5rem",textAlign:"left"}}>
        {[["Student",student.childName],["Grade","Grade "+student.grade],["Subject",student.subject],["Date",student.date],["Login ID",student.loginId]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"0.35rem 0",borderBottom:"1px solid #f0ede8"}}>
            <span style={{fontSize:"0.78rem",color:C.soft,fontWeight:600}}>{k}</span>
            <span style={{fontSize:"0.78rem",color:C.navy,fontWeight:700,fontFamily:k==="Login ID"?"monospace":"inherit"}}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>setShowLocked(false)}
        style={{width:"100%",background:C.gold,color:C.white,border:"none",borderRadius:50,padding:"0.9rem",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(201,146,42,0.3)"}}>
        Reveal Results to Parent →
      </button>
      <button onClick={()=>{setStudent(null);setLoginInput("");}}
        style={{width:"100%",background:"transparent",color:"#aaa",border:"1px solid #e0ddd6",borderRadius:50,padding:"0.65rem",fontSize:"0.82rem",fontWeight:600,cursor:"pointer",marginTop:"0.5rem"}}>
        ← Back
      </button>
    </div>)}

    {/* ── Revealed Dashboard ── */}
    {student&&!showLocked&&(<>

      <div style={{background:C.navy,borderRadius:16,padding:"1.5rem 2rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#6de4d8",margin:"0 0 0.2rem"}}>Assessment Results — Demo Session</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"1.65rem",color:C.white,margin:0}}>{student.childName}</h1>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.8rem",margin:"0.25rem 0 0"}}>Grade {student.grade} · {student.subject} · {student.date}</p>
        </div>
        <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
          <ScoreGauge score={score} total={studentQs.length}/>
          <div>
            <div style={{background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"0.65rem 1rem",marginBottom:"0.4rem"}}>
              <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",fontWeight:600}}>Login ID</div>
              <div style={{fontFamily:"monospace",fontWeight:700,color:"#6de4d8",fontSize:"0.95rem",letterSpacing:"0.1em"}}>{student.loginId}</div>
            </div>
            <button onClick={()=>{setStudent(null);setLoginInput("");setExpandedQ(null);setPlanView("plan");}}
              style={{background:"transparent",color:"rgba(255,255,255,0.35)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:50,padding:"0.35rem 0.9rem",fontSize:"0.72rem",cursor:"pointer",display:"block",width:"100%",textAlign:"center"}}>
              ← Close Dashboard
            </button>
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.25rem"}}>
        <StatCard icon="📋" val={studentQs.length} label="Questions" sub="Total answered"/>
        <StatCard icon="✅" val={score} label="Correct" color={C.green}/>
        <StatCard icon="📌" val={studentQs.length-score} label="Need Attention" color={C.red}/>
        <StatCard icon="📊" val={Math.round(score/studentQs.length*100)+"%"} label="Overall Score"
          color={score/studentQs.length>=0.8?C.green:score/studentQs.length>=0.6?C.amber:C.red}/>
      </div>

      <TutorIntervention
        topicData={topicData}
        expandedQ={expandedQ}
        setExpandedQ={setExpandedQ}
      />

      <FoundationPlan
        student={student}
        plan={plan}
        wrongTopics={wrongTopics}
        score={score}
        totalQuestions={studentQs.length}
        planView={planView}
        setPlanView={setPlanView}
      />
 </>)}
  </div>);
}
    </>)}
  </div>);
}
