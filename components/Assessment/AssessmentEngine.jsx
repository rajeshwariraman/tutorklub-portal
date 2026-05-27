// components/Assessment/AssessmentEngine.jsx
import { useState } from "react";
import { QB } from "../../data/questionBank";
import QuestionCard from "./QuestionCard";

const C = {
  navy:"#1a2744", white:"#fff", muted:"#5a6478", soft:"#8491a8",
};

export default function AssessmentEngine(){
  const [qbF,setQbF]=useState({grade:"",subject:"",diff:"",topic:""});
  const [qbOpen,setQbOpen]=useState(null);

  const allTopics=[...new Set(
    QB.filter(q=>(!qbF.grade||q.g===+qbF.grade)&&(!qbF.subject||q.s===qbF.subject))
      .map(q=>q.t)
  )];

  const filteredQB=QB.filter(q=>
    (!qbF.grade||q.g===+qbF.grade)&&
    (!qbF.subject||q.s===qbF.subject)&&
    (!qbF.diff||q.d===qbF.diff)&&
    (!qbF.topic||q.t===qbF.topic)
  );

  return(
  <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>
    <div style={{marginBottom:"1.25rem"}}>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:C.navy,marginBottom:"0.25rem"}}>Question Bank</h2>
      <p style={{fontSize:"0.85rem",color:C.muted}}>{QB.length} questions · Grades 1–5 · Math, English, Telugu, Hindi · Beginner / Intermediate / Advanced</p>
    </div>

    <div style={{background:C.white,borderRadius:12,padding:"1.1rem 1.25rem",marginBottom:"1.25rem",display:"flex",gap:"0.6rem",flexWrap:"wrap",alignItems:"flex-end",boxShadow:"0 2px 10px rgba(26,39,68,0.07)"}}>
      {[
        {label:"Grade",key:"grade",opts:[["","All Grades"],["1","Grade 1"],["2","Grade 2"],["3","Grade 3"],["4","Grade 4"],["5","Grade 5"]]},
        {label:"Subject",key:"subject",opts:[["","All Subjects"],["Math","Mathematics"],["English","English"],["Telugu","Telugu"],["Hindi","Hindi"]]},
        {label:"Difficulty",key:"diff",opts:[["","All Levels"],["Beginner","Beginner"],["Intermediate","Intermediate"],["Advanced","Advanced"]]},
      ].map(f=>(
        <div key={f.key}>
          <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.25rem"}}>{f.label}</div>
          <select value={qbF[f.key]} onChange={e=>setQbF(p=>({...p,[f.key]:e.target.value,topic:""}))}
            style={{padding:"0.5rem 0.8rem",border:"1.5px solid #e0ddd6",borderRadius:8,fontFamily:"inherit",fontSize:"0.82rem",color:C.navy,outline:"none",background:C.white,cursor:"pointer"}}>
            {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      ))}
      {allTopics.length>0&&(
        <div>
          <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.25rem"}}>Topic</div>
          <select value={qbF.topic} onChange={e=>setQbF(p=>({...p,topic:e.target.value}))}
            style={{padding:"0.5rem 0.8rem",border:"1.5px solid #e0ddd6",borderRadius:8,fontFamily:"inherit",fontSize:"0.82rem",color:C.navy,outline:"none",background:C.white,cursor:"pointer",maxWidth:190}}>
            <option value="">All Topics</option>
            {allTopics.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
      )}
      <div style={{fontSize:"0.78rem",color:C.soft,fontWeight:600,paddingBottom:"0.1rem"}}>
        {filteredQB.length} question{filteredQB.length!==1?"s":""}
      </div>
    </div>

    <div style={{display:"flex",flexDirection:"column",gap:"0.65rem"}}>
      {filteredQB.map(q=>(
        <QuestionCard
          key={q.id}
          q={q}
          isOpen={qbOpen===q.id}
          onToggle={()=>setQbOpen(qbOpen===q.id?null:q.id)}
        />
      ))}
    </div>
  </div>);
}
