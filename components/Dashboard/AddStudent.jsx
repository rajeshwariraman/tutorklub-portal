// components/Dashboard/AddStudent.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const C = {
  navy:"#1a2744", teal:"#0e8a7c", cream:"#faf8f4",
  white:"#fff", muted:"#5a6478", soft:"#8491a8",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626", redL:"#fef2f2",
};

function generateLoginId(name){
  const initials=name.trim().split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
  const num=Math.floor(1000+Math.random()*9000);
  return `TK-${initials}${num}`;
}

export default function AddStudent({ onStudentAdded, onClose }){
  const [form,setForm]=useState({
    child_name:"", parent_name:"",
    grade:"", subject:"", email:""
  });
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");

  async function handleSubmit(){
    if(!form.child_name||!form.parent_name||!form.grade||!form.subject){
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const login_id=generateLoginId(form.child_name);
    const date=new Date().toLocaleDateString("en-IN",{
      day:"numeric",month:"long",year:"numeric"
    });

    const { data,error:dbError }=await supabase
      .from("Students")
      .insert([{
        login_id,
        child_name: form.child_name,
        parent_name: form.parent_name,
        grade: parseInt(form.grade),
        subject: form.subject,
        email: form.email,
        date,
      }])
      .select();

    if(dbError){
      setError("Failed to add student. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(`Student added! Login ID: ${login_id}`);
    setLoading(false);
    if(onStudentAdded) onStudentAdded(data[0]);
  }

  return(
  <div style={{
    background:C.white, borderRadius:18,
    padding:"2rem", maxWidth:480,
    boxShadow:"0 4px 28px rgba(26,39,68,0.1)",
    fontFamily:"'Nunito',system-ui,sans-serif"
  }}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
      <h3 style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:C.navy,margin:0}}>
        Add New Student
      </h3>
      {onClose&&(
      <button onClick={onClose} style={{
        background:"transparent",border:"none",
        fontSize:"1.2rem",cursor:"pointer",color:C.soft
      }}>✕</button>)}
    </div>

    {[
      {label:"Child's Full Name *",key:"child_name",placeholder:"e.g. Arjun Reddy"},
      {label:"Parent's Name *",key:"parent_name",placeholder:"e.g. Suresh Reddy"},
      {label:"Parent's Email",key:"email",placeholder:"e.g. suresh@email.com"},
    ].map(f=>(
    <div key={f.key} style={{marginBottom:"0.85rem"}}>
      <div style={{fontSize:"0.72rem",fontWeight:700,color:C.soft,
        textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.3rem"}}>
        {f.label}
      </div>
      <input
        value={form[f.key]}
        onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
        placeholder={f.placeholder}
        style={{
          width:"100%",padding:"0.75rem",
          border:"1.5px solid #e0ddd6",borderRadius:10,
          fontSize:"0.88rem",fontFamily:"inherit",
          boxSizing:"border-box",outline:"none"
        }}/>
    </div>))}

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"0.85rem"}}>
      <div>
        <div style={{fontSize:"0.72rem",fontWeight:700,color:C.soft,
          textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.3rem"}}>
          Grade *
        </div>
        <select value={form.grade} onChange={e=>setForm(p=>({...p,grade:e.target.value}))}
          style={{width:"100%",padding:"0.75rem",border:"1.5px solid #e0ddd6",
            borderRadius:10,fontSize:"0.88rem",fontFamily:"inherit",
            outline:"none",background:C.white,cursor:"pointer"}}>
          <option value="">Select</option>
          {[1,2,3,4,5].map(g=><option key={g} value={g}>Grade {g}</option>)}
        </select>
      </div>
      <div>
        <div style={{fontSize:"0.72rem",fontWeight:700,color:C.soft,
          textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.3rem"}}>
          Subject *
        </div>
        <select value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
          style={{width:"100%",padding:"0.75rem",border:"1.5px solid #e0ddd6",
            borderRadius:10,fontSize:"0.88rem",fontFamily:"inherit",
            outline:"none",background:C.white,cursor:"pointer"}}>
          <option value="">Select</option>
          {["Math","English","Telugu","Hindi"].map(s=>(
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>

    {error&&(
    <div style={{background:C.redL,borderRadius:8,padding:"0.65rem 0.85rem",
      marginBottom:"0.75rem",fontSize:"0.8rem",color:C.red}}>
      {error}
    </div>)}

    {success&&(
    <div style={{background:C.greenL,borderRadius:8,padding:"0.65rem 0.85rem",
      marginBottom:"0.75rem",fontSize:"0.8rem",color:C.green,fontWeight:700}}>
      ✅ {success}
    </div>)}

    <button onClick={handleSubmit} disabled={loading}
      style={{
        width:"100%",background:loading?"#d1d5db":C.teal,
        color:C.white,border:"none",borderRadius:50,
        padding:"0.9rem",fontSize:"0.9rem",fontWeight:700,
        cursor:loading?"default":"pointer",fontFamily:"inherit",
        boxShadow:"0 4px 14px rgba(14,138,124,0.3)"
      }}>
      {loading?"Adding Student...":"Add Student →"}
    </button>
  </div>);
}
