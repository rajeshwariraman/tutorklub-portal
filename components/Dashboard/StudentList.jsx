// components/Dashboard/StudentList.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AddStudent from "./AddStudent";
import StudentCard from "./StudentCard";
const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", cream:"#faf8f4", muted:"#5a6478" };
const SUBJECTS = ["", "Math", "English", "Telugu", "Hindi"];
export default function StudentList({ onSelectStudent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showAdd, setShowAdd]   = useState(false);
  const [filter, setFilter]     = useState("");
  useEffect(() => { fetchStudents(); }, []);
  async function fetchStudents() {
    setLoading(true);
    const { data } = await supabase.from("Students").select("*")
      .order("created_at", { ascending: false });
    setStudents(data || []);
    setLoading(false);
  }
  function handleStudentAdded(s) { setStudents(prev => [s, ...prev]); setShowAdd(false); }
  const filtered = students.filter(s => !filter || s.Subject === filter);
  return (
    <div style={{ maxWidth:1160, margin:"0 auto", padding:"2rem 1.5rem",
      fontFamily:"'Nunito',system-ui,sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        marginBottom:"1.5rem", flexWrap:"wrap", gap:"1rem" }}>
        <div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.4rem", color:C.navy, marginBottom:"0.25rem" }}>
            Students
          </h2>
          <p style={{ fontSize:"0.85rem", color:C.muted }}>
            {students.length} student{students.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          style={{ background:C.teal, color:C.white, border:"none", borderRadius:50,
            padding:"0.7rem 1.4rem", fontSize:"0.88rem", fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
            boxShadow:"0 4px 14px rgba(14,138,124,0.3)" }}>
          + Add Student
        </button>
      </div>
      {showAdd && (
        <div style={{ marginBottom:"1.5rem" }}>
          <AddStudent onStudentAdded={handleStudentAdded} onClose={() => setShowAdd(false)}/>
        </div>
      )}
      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.25rem", flexWrap:"wrap" }}>
        {SUBJECTS.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding:"0.4rem 0.9rem", borderRadius:50, border:"none",
              cursor:"pointer", fontFamily:"inherit", fontSize:"0.78rem", fontWeight:700,
              background:filter===s ? C.navy : C.white,
              color:filter===s ? C.white : C.muted,
              boxShadow:"0 2px 8px rgba(26,39,68,0.07)" }}>
            {s || "All Subjects"}
          </button>
        ))}
      </div>
      {loading && <div style={{ textAlign:"center", padding:"3rem", color:C.muted }}>Loading students…</div>}
      {!loading && filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"3rem", background:C.white,
          borderRadius:14, boxShadow:"0 2px 10px rgba(26,39,68,0.06)" }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>👩‍🎓</div>
          <p style={{ color:C.muted, fontSize:"0.88rem" }}>
            No students yet. Click "Add Student" to get started!
          </p>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
        {filtered.map(s => (
          <StudentCard key={s.id} student={s} onSelect={onSelectStudent}/>
        ))}
      </div>
    </div>
  );
}
