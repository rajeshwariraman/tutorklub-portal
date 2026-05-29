import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import TutorLogin from "./components/Auth/TutorLogin";
import ParentDashboard from "./components/Dashboard/ParentDashboard";
import StudentList from "./components/Dashboard/StudentList";
import AIWorkspace from "./components/AI/AIWorkspace";
import AssessmentEngine from "./components/Assessment/AssessmentEngine";
import AssessmentGrade3 from "./pages/AssessmentGrade3";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478" };
const T=(a)=>({
  padding:"0.55rem 1.3rem", borderRadius:50, border:"none", cursor:"pointer",
  fontFamily:"inherit", fontSize:"0.82rem", fontWeight:700,
  background:a?C.navy:"transparent", color:a?C.white:C.muted, transition:"all 0.2s",
});

function TutorPortal() {
  const [tab,setTab]=useState("students");
  const [user,setUser]=useState(null);
  const [checking,setChecking]=useState(true);
  const [selectedStudent,setSelectedStudent]=useState(null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setUser(session?.user??null);
      setChecking(false);
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      setUser(session?.user??null);
    });
    return ()=>subscription.unsubscribe();
  },[]);

  async function handleLogout(){
    await supabase.auth.signOut();
    setUser(null);
  }

  if(checking) return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",
      justifyContent:"center",fontFamily:"inherit",color:C.muted}}>
      Loading...
    </div>
  );

  if(!user) return <TutorLogin onLogin={setUser}/>;

  return(
  <div style={{fontFamily:"'Nunito',system-ui,sans-serif",background:"#faf8f4",minHeight:"100vh"}}>
    <div style={{background:C.navy,padding:"0 1.5rem"}}>
      <div style={{maxWidth:1160,margin:"0 auto",display:"flex",alignItems:"center",
        justifyContent:"space-between",height:58,flexWrap:"wrap",gap:"0.5rem",
        paddingTop:"0.25rem",paddingBottom:"0.25rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <div style={{width:30,height:30,borderRadius:7,background:C.teal,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem"}}>✦</div>
          <span style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:700,color:C.white}}>
            TutorKlub <span style={{color:"#6de4d8"}}>Tutor Portal</span>
          </span>
        </div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",alignItems:"center"}}>
          {[
            ["students","👩‍🎓 Students"],
            ["dashboard","📊 Dashboard"],
            ["workspace","🧮 AI Workspace"],
            ["qbank","📚 Question Bank"]
          ].map(([id,lbl])=>(
            <button key={id} style={T(tab===id)} onClick={()=>{setTab(id);setSelectedStudent(null);}}>
              {lbl}
            </button>
          ))}
          <button onClick={handleLogout}
            style={{padding:"0.45rem 1rem",borderRadius:50,
              border:"1px solid rgba(255,255,255,0.2)",
              cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:600,
              background:"transparent",color:"rgba(255,255,255,0.5)"}}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
    {tab==="students" && (
      <StudentList onSelectStudent={(s)=>{
        setSelectedStudent(s);
        setTab("dashboard");
      }}/>
    )}
    {tab==="dashboard" && <ParentDashboard student={selectedStudent}/>}
    {tab==="workspace" && <AIWorkspace/>}
    {tab==="qbank"     && <AssessmentEngine/>}
  </div>);
}

export default function App() {
  return (
    <Routes>
      <Route path="/assess/grade3" element={<AssessmentGrade3/>}/>
      <Route path="/*" element={<TutorPortal/>}/>
    </Routes>
  );
}
