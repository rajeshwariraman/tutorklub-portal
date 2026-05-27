// components/Assessment/QuestionCard.jsx
const C = {
  navy:"#1a2744", white:"#fff", cream:"#faf8f4",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626",   redL:"#fef2f2",
  blue:"#2563eb",  blueL:"#eff6ff",
  amber:"#d97706", amberL:"#fffbeb",
  purple:"#7c3aed",purpleL:"#f5f3ff",
  pink:"#db2777",  pinkL:"#fdf2f8",
  orange:"#c2410c",orangeL:"#fff7ed",
  greyL:"#f9fafb", soft:"#8491a8",
};
const DC={Beginner:C.green,Intermediate:C.amber,Advanced:C.red};
const DB={Beginner:C.greenL,Intermediate:C.amberL,Advanced:C.redL};
const SC={Math:C.blue,English:C.purple,Telugu:C.orange,Hindi:C.pink};
const SB={Math:C.blueL,English:C.purpleL,Telugu:C.orangeL,Hindi:C.pinkL};

function Badge({label,type}){
  const c=type==="diff"?DC[label]:SC[label];
  const b=type==="diff"?DB[label]:SB[label];
  return <span style={{background:b,color:c,border:`1px solid ${c}33`,borderRadius:50,padding:"0.18rem 0.6rem",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.05em",display:"inline-block",whiteSpace:"nowrap"}}>{label}</span>;
}

export default function QuestionCard({q,isOpen,onToggle}){
  return(
  <div style={{background:C.white,borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(26,39,68,0.06)",border:"1px solid #f0ede8"}}>
    <div style={{padding:"0.9rem 1.1rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"0.75rem",cursor:"pointer"}} onClick={onToggle}>
      <div style={{flex:1}}>
        <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap",marginBottom:"0.4rem"}}>
          <span style={{fontSize:"0.67rem",fontWeight:700,color:C.soft,background:C.greyL,borderRadius:4,padding:"0.12rem 0.45rem"}}>G{q.g}</span>
          <Badge label={q.s} type="subj"/>
          <Badge label={q.d} type="diff"/>
          <span style={{fontSize:"0.67rem",color:"#aaa",background:"#f9f9f9",border:"1px solid #eee",borderRadius:4,padding:"0.12rem 0.45rem"}}>{q.t}</span>
        </div>
        <p style={{fontSize:"0.85rem",color:C.navy,fontWeight:600,margin:0,lineHeight:1.5}}>{q.q}</p>
      </div>
      <span style={{fontSize:"0.72rem",color:"#bbb",flexShrink:0,marginTop:"0.2rem"}}>{isOpen?"▲":"▼"}</span>
    </div>

    {isOpen&&(
    <div style={{borderTop:"1px solid #f5f5f5",padding:"1.1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.45rem",marginBottom:"0.85rem"}}>
        {q.opts.map((opt,i)=>(
        <div key={i} style={{padding:"0.55rem 0.8rem",borderRadius:8,fontSize:"0.82rem",
          background:i===q.a?C.greenL:"#f9f9f9",
          border:`1.5px solid ${i===q.a?"#16a34a":"#e8e8e8"}`,
          color:i===q.a?"#15803d":C.navy,
          fontWeight:i===q.a?700:400}}>
          {String.fromCharCode(65+i)}. {opt}{i===q.a&&" ✓"}
        </div>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.6rem"}}>
        {[
          {bg:C.blueL, tc:C.blue, lc:"#1e40af", h:"Concept Tested",   t:q.concept},
          {bg:C.redL,  tc:C.red,  lc:"#991b1b",  h:"Common Mistake",   t:q.mistake},
          {bg:C.greenL,tc:C.green,lc:"#166534",  h:"How to Correct It",t:q.fix},
        ].map((b,j)=>(
        <div key={j} style={{background:b.bg,borderRadius:8,padding:"0.7rem"}}>
          <div style={{fontSize:"0.62rem",fontWeight:700,color:b.tc,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>{b.h}</div>
          <p style={{fontSize:"0.77rem",color:b.lc,margin:0,lineHeight:1.6}}>{b.t}</p>
        </div>))}
      </div>
    </div>)}
  </div>);
}
