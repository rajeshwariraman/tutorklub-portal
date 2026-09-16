// components/Doubts/StudentDoubts.jsx — /doubts route: Login ID → class doubt board
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import DoubtBoard from "./DoubtBoard";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478", bg:"#faf8f4" };
const inp = { width:"100%", padding:"0.65rem 0.9rem", borderRadius:8, border:"1.5px solid #e2e6ef",
  fontSize:"0.95rem", marginBottom:"1rem", boxSizing:"border-box", outline:"none" };

export default function StudentDoubts() {
  const [student, setStudent] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("tk_student")) || null; } catch { return null; }
  });
  const [loginId, setLoginId]   = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    const { data, error: err } = await supabase.from("Students").select("*")
      .eq("Login_id", loginId.trim()).single();
    setLoading(false);
    if (err || !data) return setError("Login ID not found. Please check and try again.");
    const pwd = password || loginId.trim();
    if (data.password && data.password !== pwd)
      return setError("Incorrect password. Your default password is your Login ID.");
    sessionStorage.setItem("tk_student", JSON.stringify(data));
    setStudent(data);
  }

  function logout() { sessionStorage.removeItem("tk_student"); setStudent(null); }

  if (student) return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Nunito',system-ui,sans-serif" }}>
      <div style={{ background:C.navy, padding:"0 1rem" }}>
        <div style={{ maxWidth:820, margin:"0 auto", height:54, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:C.white }}>
            ✦ TutorKlub <span style={{ color:"#6de4d8" }}>Doubts</span></span>
          <span style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.7)" }}>
            Hi, {student.Child_Name} ·{" "}
            <button onClick={logout} style={{ background:"none", border:"none", color:"#6de4d8", cursor:"pointer", fontFamily:"inherit", fontWeight:700 }}>Sign out</button>
          </span>
        </div>
      </div>
      <DoubtBoard role="student" student={student}/>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", fontFamily:"'Nunito',system-ui,sans-serif", padding:"1rem" }}>
      <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
        <span style={{ fontFamily:"Georgia,serif", fontSize:"1.4rem", fontWeight:700, color:C.navy }}>✦ TutorKlub</span>
        <div style={{ marginTop:"0.5rem" }}><span style={{ background:C.navy, color:C.white, fontSize:"0.75rem", fontWeight:700,
          padding:"0.25rem 0.9rem", borderRadius:20, letterSpacing:"0.05em" }}>STUDENT DOUBTS</span></div>
      </div>
      <div style={{ background:C.white, borderRadius:16, padding:"2rem", width:"100%", maxWidth:400, boxShadow:"0 4px 24px rgba(26,39,68,0.10)" }}>
        <h2 style={{ margin:"0 0 0.25rem", color:C.navy, fontSize:"1.3rem", fontWeight:800 }}>Student Login</h2>
        <p style={{ margin:"0 0 1.5rem", color:C.muted, fontSize:"0.88rem" }}>Enter your Login ID to see your class board</p>
        <form onSubmit={handleSubmit}>
          <input value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Login ID, e.g. TK-AR4821" required style={inp}/>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password"
            placeholder="Password (leave blank to use Login ID)" style={inp}/>
          {error && <p style={{ color:"#dc2626", fontSize:"0.85rem", margin:"0 0 1rem", background:"#fef2f2", padding:"0.6rem 0.8rem", borderRadius:8 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width:"100%", padding:"0.75rem", background:C.teal, color:C.white,
            border:"none", borderRadius:10, fontSize:"1rem", fontWeight:800, cursor:"pointer", opacity:loading ? 0.7 : 1 }}>
            {loading ? "Checking…" : "Login →"}</button>
        </form>
      </div>
    </div>
  );
}
