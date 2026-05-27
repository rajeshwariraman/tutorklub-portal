// components/AI/StepAnalysis.jsx
const C = {
  navy:"#1a2744", cream:"#faf8f4", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626",   redL:"#fef2f2",
  blue:"#2563eb",  blueL:"#eff6ff",
  amber:"#d97706", amberL:"#fffbeb",
};

export default function StepAnalysis({step,index}){
  return(
  <div style={{marginBottom:"1rem",borderRadius:12,overflow:"hidden",border:`2px solid ${step.isCorrect?"#dcfce7":"#fee2e2"}`}}>
    <div style={{background:step.isCorrect?C.greenL:C.redL,padding:"0.6rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
        <span style={{width:22,height:22,borderRadius:"50%",background:step.isCorrect?C.green:C.red,color:C.white,fontSize:"0.7rem",fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{index+1}</span>
        <span style={{fontSize:"0.78rem",fontWeight:700,color:step.isCorrect?C.green:C.red}}>{step.stepLabel||`Step ${index+1}`}</span>
      </div>
      <span style={{fontSize:"0.75rem",fontWeight:700,color:step.isCorrect?C.green:C.red}}>{step.isCorrect?"✓ Correct":"✗ Error in Thinking"}</span>
    </div>

    <div style={{padding:"0.85rem 1rem",background:C.white}}>
      <div style={{fontFamily:"monospace",fontSize:"0.92rem",color:C.navy,fontWeight:600,marginBottom:"0.65rem",padding:"0.5rem 0.75rem",background:C.cream,borderRadius:6,lineHeight:1.5}}>{step.text}</div>
      <div style={{display:"grid",gridTemplateColumns:step.isCorrect?"1fr 1fr":"1fr 1fr 1fr",gap:"0.5rem",marginBottom:"0.5rem"}}>
        <div style={{background:C.blueL,borderRadius:8,padding:"0.65rem"}}>
          <div style={{fontSize:"0.62rem",fontWeight:700,color:C.blue,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>🤖 AI Analysis</div>
          <p style={{fontSize:"0.76rem",color:"#1e40af",lineHeight:1.6,margin:0}}>{step.analysis}</p>
        </div>
        {!step.isCorrect&&step.mistakeExplanation&&(
        <div style={{background:C.redL,borderRadius:8,padding:"0.65rem"}}>
          <div style={{fontSize:"0.62rem",fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>⚠️ Mistake in Thinking</div>
          <p style={{fontSize:"0.76rem",color:"#991b1b",lineHeight:1.6,margin:0}}>{step.mistakeExplanation}</p>
        </div>)}
        {!step.isCorrect&&step.correction&&(
        <div style={{background:C.amberL,borderRadius:8,padding:"0.65rem"}}>
          <div style={{fontSize:"0.62rem",fontWeight:700,color:C.amber,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>💡 Correct Approach</div>
          <p style={{fontSize:"0.76rem",color:"#92400e",lineHeight:1.6,margin:0}}>{step.correction}</p>
        </div>)}
        {step.isCorrect&&step.nextHint&&(
        <div style={{background:C.greenL,borderRadius:8,padding:"0.65rem"}}>
          <div style={{fontSize:"0.62rem",fontWeight:700,color:C.green,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>→ Next Step Hint</div>
          <p style={{fontSize:"0.76rem",color:"#166534",lineHeight:1.6,margin:0}}>{step.nextHint}</p>
        </div>)}
      </div>
      <div style={{fontSize:"0.74rem",color:step.isCorrect?C.green:C.amber,fontStyle:"italic",fontWeight:600}}>"{step.encouragement}"</div>
    </div>
  </div>);
}
