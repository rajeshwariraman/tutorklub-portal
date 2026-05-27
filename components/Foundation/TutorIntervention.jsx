// components/Foundation/TutorIntervention.jsx
const C = {
  navy:"#1a2744", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626",   redL:"#fef2f2",
  blue:"#2563eb",  blueL:"#eff6ff",
  amber:"#d97706",
  purple:"#7c3aed",purpleL:"#f5f3ff",
  pink:"#db2777",  pinkL:"#fdf2f8",
  orange:"#c2410c",orangeL:"#fff7ed",
  muted:"#5a6478",
};
const DC={Beginner:C.green,Intermediate:C.amber,Advanced:C.red};
const DB={Beginner:C.greenL,Intermediate:"#fffbeb",Advanced:C.redL};
const SC={Math:C.blue,English:C.purple,Telugu:C.orange,Hindi:C.pink};
const SB={Math:C.blueL,English:C.purpleL,Telugu:C.orangeL,Hindi:C.pinkL};

function Badge({label,type}){
  const c=type==="diff"?DC[label]:SC[label];
  const b=type==="diff"?DB[label]:SB[label];
  return <span style={{background:b,color:c,border:`1px solid ${c}33`,borderRadius:50,padding:"0.18rem 0.6rem",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.05em",display:"inline-block",whiteSpace:"nowrap"}}>{label}</span>;
}

// Props: { topicData, expandedQ, setExpandedQ }
export default function TutorIntervention({topicData,expandedQ,setExpandedQ}){
  return(
  <>
    <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:C.navy,marginBottom:"0.85rem"}}>Topic-by-Topic Analysis &amp; AI Insights</h2>
    <div style={{display:"flex",flexDirection:"column",gap:"0.85rem",marginBottom:"1.5rem"}}>
      {topicData.map((item,i)=>{
        const open=expandedQ===i;
        return(
        <div key={i} style={{background:C.white,borderRadius:14,overflow:"hidden",boxShadow:"0 2px 10px rgba(26,39,68,0.06)",border:`2px solid ${item.correct?"#dcfce7":"#fee2e2"}`}}>
          <div style={{padding:"1.1rem 1.25rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"1rem",cursor:"pointer"}} onClick={()=>setExpandedQ(open?null:i)}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.4rem",flexWrap:"wrap"}}>
                <span style={{fontWeight:700,fontSize:"0.86rem",color:C.navy}}>Q{i+1}: {item.t}</span>
                <Badge label={item.d} type="diff"/>
                <Badge label={item.s} type="subj"/>
              </div>
              <p style={{fontSize:"0.82rem",color:C.muted,margin:0,lineHeight:1.6}}>{item.q}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"0.35rem",flexShrink:0}}>
              <span style={{background:item.correct?C.greenL:C.redL,color:item.correct?C.green:C.red,fontWeight:700,fontSize:"0.72rem",padding:"0.25rem 0.7rem",borderRadius:50}}>
                {item.correct?"✓ Correct":"✗ Needs Attention"}
              </span>
              <span style={{fontSize:"0.7rem",color:"#bbb"}}>{open?"▲ Hide":"▼ Details"}</span>
            </div>
          </div>

          {open&&(
          <div style={{borderTop:"1px solid #f5f5f5",padding:"1.25rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"1rem"}}>
              <div style={{background:"#f8f8f8",borderRadius:8,padding:"0.7rem"}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.25rem"}}>Student Answered</div>
                <div style={{fontSize:"0.86rem",fontWeight:700,color:item.correct?C.green:C.red}}>{item.selectedOpt||"—"}</div>
              </div>
              <div style={{background:C.greenL,borderRadius:8,padding:"0.7rem"}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.25rem"}}>Correct Answer</div>
                <div style={{fontSize:"0.86rem",fontWeight:700,color:C.green}}>{item.correctOpt}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.65rem"}}>
              {[
                {bg:C.blueL,tc:C.blue,lc:"#1e40af",title:"🤖 AI Analysis",
                  text:item.correct
                    ?`Strong grasp of "${item.concept}". This student is ready to tackle harder "${item.t}" questions at the next difficulty level.`
                    :`Pattern detected: ${item.mistake}. This is a conceptual gap in "${item.concept}", not a careless mistake.`},
                {bg:C.redL,tc:C.red,lc:"#991b1b",title:"⚠️ Mistake in Thinking",
                  text:item.correct
                    ?"No errors. Thinking is sound and approach is correct."
                    :`The student likely ${item.mistake.toLowerCase()}. This is a typical ${item.d}-level misconception in this topic.`},
                {bg:C.greenL,tc:C.green,lc:"#166534",title:"💡 How to Correct It",
                  text:item.correct
                    ?`Build on this strength. Introduce a harder ${item.t} problem next session to stretch their thinking.`
                    :item.fix},
              ].map((box,j)=>(
                <div key={j} style={{background:box.bg,borderRadius:8,padding:"0.75rem"}}>
                  <div style={{fontSize:"0.65rem",fontWeight:700,color:box.tc,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.3rem"}}>{box.title}</div>
                  <p style={{fontSize:"0.78rem",color:box.lc,lineHeight:1.65,margin:0}}>{box.text}</p>
                </div>
              ))}
            </div>
          </div>)}
        </div>);
      })}
    </div>
  </>);
}
