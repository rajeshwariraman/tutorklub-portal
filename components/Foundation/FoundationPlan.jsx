// components/Foundation/FoundationPlan.jsx
const C = {
  navy:"#1a2744", navyD:"#0f1a30", teal:"#0e8a7c",
  cream:"#faf8f4", white:"#fff",
  green:"#16a34a", red:"#dc2626", amber:"#d97706",
  muted:"#5a6478", soft:"#8491a8",
};

// Props: { student, plan, wrongTopics, score, totalQuestions, planView, setPlanView }
export default function FoundationPlan({student,plan,wrongTopics,score,totalQuestions,planView,setPlanView}){
  return(
  <div style={{background:C.white,borderRadius:18,boxShadow:"0 4px 24px rgba(26,39,68,0.09)",overflow:"hidden",marginBottom:"1.5rem"}}>

    {/* Header */}
    <div style={{background:C.navy,padding:"1.25rem 1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem"}}>
      <div>
        <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#6de4d8",margin:"0 0 0.2rem"}}>Personalised Recommendation</p>
        <h3 style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:C.white,margin:0}}>10-Day Private Foundation Programme</h3>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.78rem",margin:"0.2rem 0 0"}}>8 focused private sessions → graduate to small group → full group class</p>
      </div>
      <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
        {[["plan","📅 Session Plan"],["pathway","🛤️ Learning Pathway"],["insight","💡 Why Private First"]].map(([v,l])=>(
          <button key={v} onClick={()=>setPlanView(v)}
            style={{padding:"0.42rem 0.9rem",borderRadius:50,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.74rem",fontWeight:700,
              background:planView===v?"rgba(14,138,124,0.5)":"rgba(255,255,255,0.08)",
              color:planView===v?"#6de4d8":"rgba(255,255,255,0.5)"}}>
            {l}
          </button>
        ))}
      </div>
    </div>

    {/* ── Plan View ── */}
    {planView==="plan"&&(
    <div style={{padding:"1.5rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"0.85rem"}}>
        {plan.map((s,i)=>{
          const isGrad=s.type==="Graduation";
          return(
          <div key={i} style={{borderRadius:12,overflow:"hidden",border:`2px solid ${s.col}22`,boxShadow:"0 2px 8px rgba(26,39,68,0.06)"}}>
            <div style={{background:s.col,padding:"0.5rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:"0.67rem",fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:"0.07em"}}>DAY {s.day} · SESSION {s.session}</span>
              <span style={{fontSize:"1rem"}}>{s.icon}</span>
            </div>
            <div style={{padding:"0.85rem",background:isGrad?C.navyD:C.white}}>
              <div style={{fontSize:"0.72rem",fontWeight:700,color:isGrad?"#6de4d8":s.col,marginBottom:"0.25rem",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.type}</div>
              <div style={{fontSize:"0.85rem",fontWeight:700,color:isGrad?C.white:C.navy,marginBottom:"0.3rem"}}>{s.topic}</div>
              <div style={{fontSize:"0.76rem",color:isGrad?"rgba(255,255,255,0.6)":C.muted,lineHeight:1.6,marginBottom:"0.35rem"}}>{s.focus}</div>
              <div style={{fontSize:"0.7rem",color:isGrad?"rgba(255,255,255,0.4)":C.soft,fontStyle:"italic"}}>{s.activity}</div>
            </div>
          </div>);
        })}
      </div>
      <div style={{marginTop:"1.1rem",padding:"0.85rem 1rem",background:C.cream,borderRadius:10,display:"flex",gap:"0.6rem",alignItems:"flex-start",fontSize:"0.79rem",color:C.muted}}>
        <span>💤</span>
        <span><strong style={{color:C.navy}}>Rest days</strong> are built in. Students receive AI-generated practice sets automatically after each session — delivered to the parent's email within an hour of class ending.</span>
      </div>
    </div>)}

    {/* ── Pathway View ── */}
    {planView==="pathway"&&(
    <div style={{padding:"1.75rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
        {[
          {icon:"🧑‍💻",title:"Private 1-on-1",sub:"STARTING NOW",duration:"Days 1 – 10 · 8 Sessions",
            desc:`Full attention on ${student.childName}'s specific gaps. Tutor corrects misconceptions in real time using AI Workspace.`,
            detail:["Complete focus on identified gaps: "+wrongTopics.map(t=>t.t).join(", "),"Custom pace — no group pressure at all","AI Workspace for step-by-step error analysis","Correction of thinking patterns, not just answers","Practice sets generated automatically after every session"],
            col:C.red,badge:"Now"},
          {icon:"👥",title:"Small Group · 3 Students",sub:"AFTER SESSION 8",duration:"Weeks 2 – 3",
            desc:"Once foundations are solid, join 2 peers at the same level. Introduces collaboration while keeping it intimate.",
            detail:["3 students matched at same proficiency level","Peer learning begins naturally","Group problem-solving exercises","AI still tracks each student individually","Tutor can still address individual needs quickly"],
            col:C.amber,badge:"Next"},
          {icon:"🏫",title:"Full Group · 5 Students",sub:"AFTER 3 WEEKS",duration:"Ongoing",
            desc:"The full TutorKlub experience. Ready to thrive — not struggle — in a 5-student group class.",
            detail:["5-student class — our standard","Competitive and collaborative environment","Monthly parent review calls","AI benchmarks progress against grade level","Strong foundation prevents dropout"],
            col:C.teal,badge:"Goal"},
        ].map((stage,i)=>(
        <div key={i} style={{borderRadius:14,overflow:"hidden",border:`2px solid ${stage.col}22`,boxShadow:"0 2px 12px rgba(26,39,68,0.07)"}}>
          <div style={{background:stage.col,padding:"1rem",textAlign:"center"}}>
            <div style={{fontSize:"1.7rem",marginBottom:"0.2rem"}}>{stage.icon}</div>
            <div style={{fontSize:"0.62rem",fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em",marginBottom:"0.15rem"}}>{stage.sub}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"1rem",fontWeight:700,color:C.white}}>{stage.title}</div>
            <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.7)",marginTop:"0.2rem"}}>{stage.duration}</div>
          </div>
          <div style={{padding:"1rem",background:C.white}}>
            <p style={{fontSize:"0.79rem",color:C.muted,lineHeight:1.65,marginBottom:"0.75rem"}}>{stage.desc}</p>
            {stage.detail.map((d,j)=>(
              <div key={j} style={{display:"flex",gap:"0.5rem",marginBottom:"0.4rem",fontSize:"0.74rem",color:C.muted,lineHeight:1.5}}>
                <span style={{color:stage.col,fontWeight:700,flexShrink:0}}>→</span>{d}
              </div>
            ))}
          </div>
        </div>))}
      </div>
      <div style={{marginTop:"1.1rem",background:C.navy,borderRadius:12,padding:"1.1rem 1.5rem",display:"flex",gap:"0.75rem",alignItems:"flex-start"}}>
        <span style={{fontSize:"1.3rem",flexShrink:0}}>📋</span>
        <p style={{fontSize:"0.81rem",color:"rgba(255,255,255,0.7)",lineHeight:1.75,margin:0}}>
          <strong style={{color:"#6de4d8"}}>TutorKlub Pathway for {student.childName}:</strong>{" "}
          8 private sessions targeting{" "}
          <strong style={{color:C.white}}>{wrongTopics.map(t=>t.t).join(", ")||"identified gaps"}</strong>
          {" "}→ 3-student group for 2 weeks → full 5-student Grade {student.grade} {student.subject} class.
          This structured pathway reduces dropout risk and produces measurably stronger long-term outcomes.
        </p>
      </div>
    </div>)}

    {/* ── Insight View ── */}
    {planView==="insight"&&(
    <div style={{padding:"1.75rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.25rem"}}>
        {[
          {icon:"🔬",title:"The assessment reveals a specific gap, not general weakness",
            body:`${student.childName} answered ${score} out of ${totalQuestions} correctly. The ${wrongTopics.length} incorrect answer${wrongTopics.length!==1?"s":""} reveal${wrongTopics.length===1?"s":""} a specific conceptual gap in ${wrongTopics.map(t=>t.t).join(", ")}. In a group class, this gap would be hidden — the session moves on regardless.`},
          {icon:"🧠",title:"Private sessions repair thinking patterns, not just answers",
            body:"When a student applies a wrong procedure consistently, it means the underlying mental model is incorrect. That model needs to be carefully replaced — which requires individual attention, multiple worked examples, and real-time step-by-step analysis of their thinking. This is only possible 1-on-1."},
          {icon:"⏱️",title:"8 sessions in 10 days is the proven mastery threshold",
            body:"Mastery-based learning research shows that 8 focused practice sessions with immediate corrective feedback on a specific concept is sufficient to move a struggling student to confident fluency. We have designed the plan above specifically around this threshold."},
          {icon:"🚀",title:"Strong foundation → group class success, not anxiety",
            body:`Students who join group classes with unresolved gaps tend to fall further behind, lose confidence, and disengage. ${student.childName} will thrive — not just survive — in a group class after completing this foundation programme. Parents consistently report dramatically higher engagement.`},
          {icon:"💰",title:"The economics make sense for families",
            body:"8 private sessions followed by a lifetime of group classes is more cost-effective than months of group classes where the child is too confused to benefit. The private foundation is an investment that makes every subsequent group class session worthwhile."},
          {icon:"📈",title:"AI Workspace accelerates learning between sessions",
            body:"In private sessions, we use the AI Workspace so the student can show their working step by step and receive instant analysis of their thinking — not just their answer. This collapses weeks of passive learning into days of active correction."},
        ].map((item,i)=>(
        <div key={i} style={{background:C.cream,borderRadius:12,padding:"1.1rem"}}>
          <div style={{fontSize:"1.4rem",marginBottom:"0.5rem"}}>{item.icon}</div>
          <div style={{fontWeight:700,fontSize:"0.87rem",color:C.navy,marginBottom:"0.4rem"}}>{item.title}</div>
          <p style={{fontSize:"0.79rem",color:C.muted,lineHeight:1.7,margin:0}}>{item.body}</p>
        </div>))}
      </div>
      <div style={{background:C.navy,borderRadius:12,padding:"1.35rem 1.5rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
        <span style={{fontSize:"1.5rem",flexShrink:0}}>📋</span>
        <div>
          <div style={{fontWeight:700,color:"#6de4d8",fontSize:"0.88rem",marginBottom:"0.4rem"}}>TutorKlub's Formal Recommendation for {student.childName}</div>
          <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.75)",lineHeight:1.8,margin:"0 0 0.6rem"}}>
            We recommend <strong style={{color:C.white}}>8 private sessions over 10 days</strong> to address specific gaps in{" "}
            <strong style={{color:C.white}}>{wrongTopics.map(t=>t.t).join(" and ")||"the assessed topics"}</strong>.
            Each session uses our <strong style={{color:C.white}}>AI Workspace</strong> so the tutor can see {student.childName}'s exact thinking process and correct it in real time.
            After Session 8, {student.childName} will be matched to a <strong style={{color:C.white}}>3-student group</strong> for 2 transitional weeks before joining the regular <strong style={{color:C.white}}>Grade {student.grade} {student.subject} group class</strong>.
          </p>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            {[["📅","Starts","Within 48 hours"],["⏱️","Duration","10 days / 8 sessions"],["💻","Format","Zoom + AI Workspace"],["👥","Next step","3-student group class"]].map(([ic,lbl,val])=>(
              <div key={lbl} style={{background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"0.55rem 0.85rem"}}>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",marginBottom:"0.15rem"}}>{ic} {lbl}</div>
                <div style={{fontSize:"0.8rem",fontWeight:700,color:C.white}}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>)}
  </div>);
           }
