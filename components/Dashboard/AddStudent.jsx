import { useState } from "react";
import { supabase } from "../../lib/supabase";
import AddStudentFields from "./AddStudentFields";

const TUTOR_ID = "014c789e-ead5-4e77-b3a9-fc017fb49645";

const C = {
  navy:"#1a2744", teal:"#0e8a7c", white:"#fff", soft:"#8491a8",
  green:"#16a34a", greenL:"#f0fdf4", red:"#dc2626", redL:"#fef2f2",
};

function generateLoginId(name) {
  const initials = name.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return `TK-${initials}${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function AddStudent({ onStudentAdded, onClose }) {
  const [form, setForm]       = useState({ child_name:"", parent_name:"", grade:"", subject:"", email:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    if (!form.child_name || !form.parent_name || !form.grade || !form.subject) {
      setError("Please fill in all required fields."); return;
    }
    setLoading(true); setError(""); setSuccess("");
    const login_id = generateLoginId(form.child_name);
    const date = new Date().toLocaleDateString("en-IN",
      { day:"numeric", month:"long", year:"numeric" });
    const { data, error: dbError } = await supabase
      .from("Students")
      .insert([{
        Login_id: login_id,
        Child_Name: form.child_name,
        Parent_Name: form.parent_name,
        Grade: parseInt(form.grade),
        Subject: form.subject,
        email: form.email,
        date,
        Tutor_Id: TUTOR_ID
      }])
      .select();
    if (dbError) { setError("Failed to add student. Please try again."); setLoading(false); return; }
    setSuccess(`Student added! Login ID: ${login_id}`);
    setLoading(false);
    if (onStudentAdded) onStudentAdded(data[0]);
  }

  return (
    <div style={{ background:C.white, borderRadius:18, padding:"2rem", maxWidth:480,
      boxShadow:"0 4px 28px rgba(26,39,68,0.1)", fontFamily:"'Nunito',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between",
        alignItems:"center", marginBottom:"1.5rem" }}>
        <h3 style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", color:C.navy, margin:0 }}>
          Add New Student
        </h3>
        {onClose && (
          <button onClick={onClose} style={{ background:"transparent", border:"none",
            fontSize:"1.2rem", cursor:"pointer", color:C.soft }}>✕</button>
        )}
      </div>
      <AddStudentFields form={form} setForm={setForm}/>
      {error   && <div style={{ background:C.redL, borderRadius:8, padding:"0.65rem 0.85rem",
        marginBottom:"0.75rem", fontSize:"0.8rem", color:C.red }}>{error}</div>}
      {success && <div style={{ background:C.greenL, borderRadius:8, padding:"0.65rem 0.85rem",
        marginBottom:"0.75rem", fontSize:"0.8rem", color:C.green, fontWeight:700 }}>✅ {success}</div>}
      <button onClick={handleSubmit} disabled={loading}
        style={{ width:"100%", background:loading?"#d1d5db":C.teal, color:C.white,
          border:"none", borderRadius:50, padding:"0.9rem", fontSize:"0.9rem",
          fontWeight:700, cursor:loading?"default":"pointer", fontFamily:"inherit",
          boxShadow:"0 4px 14px rgba(14,138,124,0.3)" }}>
        {loading ? "Adding Student…" : "Add Student →"}
      </button>
    </div>
  );
}
