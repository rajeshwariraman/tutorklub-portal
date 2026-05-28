// components/Dashboard/StudentList.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AddStudent from "./AddStudent";
const C = {
  navy:"#1a2744", teal:"#0e8a7c", tealL:"#e6f5f3",
  cream:"#faf8f4", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626", redL:"#fef2f2",
  blue:"#2563eb", blueL:"#eff6ff",
  purple:"#7c3aed", purpleL:"#f5f3ff",
  pink:"#db2777", pinkL:"#fdf2f8",
  orange:"#c2410c", orangeL:"#fff7ed",
  muted:"#5a6478", soft:"#8491a8",
};
const SC={Math:C.blue,English:C.purple,Telugu:C.orange,Hindi:C.pink};
const SB={Math:C.blueL,English:C.purpleL,Telugu:C.orangeL,Hindi:C.pinkL};
function Badge({label}){
  return(
  <span style={{
    background:SB[label]||C.tealL,
    color:SC[label]||C.teal,
    border:`1px solid ${SC[label]||C.teal}33`,
    borderRadius:50,padding:"0.18rem 0.6rem",
    fontSize:"0.68rem",fontWeight:700,
    letterSpacing:"0.05em",display:"inline-block"
  }}>{label}</span>);
}
export default function StudentList({ onSelectStudent }){
  const [students,setStudents]=useState([]);
  const [loading,setLoading]=useState(true);
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState("");
  useEffect(()=>{ fetchStudents(); },[]);
  async function fetchStudents(){
    setLoading(true);
    const { data }=await supabase
      .from("Students")
      .select("*")
      .order("created_at",{ascending:false});
    setStudents(data||[]);
    setLoading(false);
  }
  function handleStudentAdded(newStudent){
    setStudents(s=>[newStudent,...s]);
    setShowAdd(false);
  }
  const filtered=students.filter(s=>!filter||s.subject===filter);
  return(
  <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem",
    fontFamily:"'Nunito',system-ui,sans-serif"}}>
    <div style={{display:"flex",justifyContent:"space-between",
      alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
      <div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",
          color:C.navy,marginBottom:"0.25rem"}}>Students</h2>
        <p style={{fontSize:"0.85rem",color:C.muted}}>
          {students.length} student{students.length!==1?"s":""} registered
        </p>
      </div>
      <button onClick={()=>setShowAdd(!showAdd)}
        style={{background:C.teal,color:C.white,border:"none",
          borderRadius:50,padding:"0.7rem 1.4rem",fontSize:"0.88rem",
          fontWeight:700,cursor:"pointer",fontFamily:"inherit",
          boxShadow:"0 4px 14px rgba(14,138,124,0.3)"}}>
        + Add Student
      </button>
    </div>
    {showAdd&&(
    <div style={{marginBottom:"1.5rem"}}>
      <AddStudent
        onStudentAdded={handleStudentAdded}
        onClose={()=>setShowAdd(false)}/>
    </div>)}
    <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
      {["","Math","English","Telugu","Hindi"].map(s=>(
      <button key={s} onClick={()=>setFilter(s)}
        style={{padding:"0.4rem 0.9rem",borderRadius:50,border:"none",
          cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:700,
          background:filter===s?C.navy:C.white,
          color:filter===s?C.white:C.muted,
          boxShadow:"0 2px 8px rgba(26,39,68,0.07)"}}>
        {s||"All Subjects"}
      </button>))}
    </div>
    {loading&&(
    <div style={{textAlign:"center",padding:"3rem",color:C.muted}}>
      Loading students...
    </div>)}
    {!loading&&filtered.length===0&&(
    <div style={{textAlign:"center",padding:"3rem",
      background:C.white,borderRadius:14,
      boxShadow:"0 2px 10px rgba(26,39,68,0.06)"}}>
      <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>👩‍🎓</div>
      <p style={{color:C.muted,fontSize:"0.88rem"}}>
        No students yet. Click "Add Student" to get started!
      </p>
    </div>)}
    <div style={{display:"flex",flexDirection:"column",gap:"0.65rem"}}>
      {filtered.map(s=>(
      <div key={s.id}
        onClick={()=>onSelectStudent&&onSelectStudent(s)}
        style={{background:C.white,borderRadius:12,
          padding:"1rem 1.25rem",cursor:"pointer",
          boxShadow:"0 2px 8px rgba(26,39,68,0.06)",
          border:"1px solid #f0ede8",
          display:"flex",alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap",gap:"0.75rem"}}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(26,39,68,0.12)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(26,39,68,0.06)"}>
        <div style={{display:"flex",alignItems:"center",gap:"0.85rem"}}>
          <div style={{width:40,height:40,borderRadius:"50%",
            background:C.tealL,display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:"1.1rem",fontWeight:700,
            color:C.teal,flexShrink:0}}>
            {s.child_name?.[0]?.toUpperCase()||"?"}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:"0.92rem",color:C.navy,
              marginBottom:"0.2rem"}}>{s.child_name}</div>
            <div style={{fontSize:"0.76rem",color:C.soft}}>
              Parent: {s.parent_name} · Grade {s.grade}
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem",flexWrap:"wrap"}}>
          <Badge label={s.subject}/>
          <div style={{background:C.cream,borderRadius:8,
            padding:"0.3rem 0.7rem",fontSize:"0.72rem",
            fontFamily:"monospace",fontWeight:700,color:C.navy}}>
            {s.login_id}
          </div>
          <span style={{fontSize:"0.78rem",color:C.teal,fontWeight:700}}>
            View Results →
          </span>
        </div>
      </div>))}
    </div>
  </div>);
}
