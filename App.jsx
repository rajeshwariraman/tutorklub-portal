import { useState } from "react";
import ParentDashboard from "./components/Dashboard/ParentDashboard";
import AIWorkspace from "./components/AI/AIWorkspace";
import AssessmentEngine from "./components/Assessment/AssessmentEngine";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478" };

const T=(a)=>({
  padding:"0.55rem 1.3rem", borderRadius:50, border:"none", cursor:"pointer",
  fontFamily:"inherit", fontSize:"0.82rem", fontWeight:700,
  background:a?C.navy:"transparent", color:a?C.white:C.muted, transition:"all 0.2s",
});

export default function App(){
  const [tab,setTab]=useState("dashboard");
  return(
  <div style={{fontFamily:"'Nunito',system-ui,sans-serif",background:"#faf8f4",minHeight:"100vh"}}>
    <div style={{background:C.navy,padding:"0 1.5rem"}}>
      <div style={{maxWidth:1160,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:58,flexWrap:"wrap",gap:"0.5rem",paddingTop:"0.25rem",paddingBottom:"0.25rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <div style={{width:30,height:30,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem"}}>✦</div>
          <span style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:700,color:C.white}}>
            TutorKlub <span style={{color:"#6de4d8"}}>Tutor Portal</span>
          </span>
        </div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {[["dashboard","📊 Dashboard"],["workspace","🧮 AI Workspace"],["qbank","📚 Question Bank"]].map(([id,lbl])=>(
            <button key={id} style={T(tab===id)} onClick={()=>setTab(id)}>{lbl}</button>
          ))}
        </div>
      </div>
    </div>
    {tab==="dashboard" && <ParentDashboard />}
    {tab==="workspace" && <AIWorkspace />}
    {tab==="qbank"     && <AssessmentEngine />}
  </div>);
}
