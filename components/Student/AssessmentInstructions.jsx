const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478", bg:"#faf8f4" };

const BEFORE = [
  "Sit in a quiet place with no distractions",
  "Keep your phone away",
  "Make sure your internet connection is stable",
  "Have a pencil and paper ready if needed",
];
const DURING = [
  ["⏱️","You have 45 minutes to complete the assessment"],
  ["📵","Do NOT switch browser tabs or windows"],
  ["🔒","Switching screens will auto log you out"],
  ["📝","Answer all questions — no negative marking"],
  ["⬅️","You cannot go back once you submit"],
];
const AFTER = [
  "You will receive a complete list of all questions you answered",
  "Your tutor will prepare a comprehensive test report",
  "Your tutor will review results with you personally in your demo session",
  "A demo session will be booked shortly",
];

function Section({ title, items, icon, variant }) {
  return (
    <div style={{marginBottom:"1.2rem"}}>
      <div style={{fontWeight:800,color:C.navy,marginBottom:"0.5rem",fontSize:"0.9rem",
        textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</div>
      {items.map((item,i)=>(
        <div key={i} style={{display:"flex",gap:"0.6rem",alignItems:"flex-start",
          marginBottom:"0.35rem",fontSize:"0.9rem",color:"#374151"}}>
          <span style={{flexShrink:0}}>{variant==="emoji" ? item[0] : "✅"}</span>
          <span>{variant==="emoji" ? item[1] : item}</span>
        </div>
      ))}
    </div>
  );
}

export default function AssessmentInstructions({ student, grade, subject, onStart }) {
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',system-ui,sans-serif",padding:"1rem"}}>
      <div style={{background:C.white,borderRadius:16,padding:"2rem",width:"100%",maxWidth:520,
        boxShadow:"0 4px 24px rgba(26,39,68,0.10)"}}>
        <h2 style={{margin:"0 0 0.2rem",color:C.navy,fontSize:"1.4rem",fontWeight:800}}>
          Welcome, {student?.child_name?.split(" ")[0] || "Student"}! 👋
        </h2>
        <p style={{margin:"0 0 1.4rem",color:C.muted,fontSize:"0.88rem"}}>
          Grade {grade} · {subject} · Please read carefully before you begin
        </p>
        <Section title="Before You Begin" items={BEFORE} />
        <Section title="During the Test" items={DURING} variant="emoji" />
        <Section title="After the Test" items={AFTER.map(a=>"📋 "+a)} />
        <button onClick={onStart}
          style={{width:"100%",padding:"0.85rem",background:C.teal,color:C.white,border:"none",
            borderRadius:12,fontSize:"1.05rem",fontWeight:800,cursor:"pointer",marginTop:"0.5rem",
            boxShadow:"0 2px 8px rgba(14,138,124,0.25)"}}>
          I Understand — Start Assessment →
        </button>
      </div>
    </div>
  );
}
// 58 lines
