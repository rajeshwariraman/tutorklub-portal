import { useState } from "react";
import { supabase } from "../../lib/supabase";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478", bg:"#faf8f4" };

export default function StudentLogin({ onLogin, grade, subject }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    const { data, error: err } = await supabase
      .from("Students")
      .select("*")
      .eq("login_id", loginId.trim())
      .single();
    setLoading(false);
    if (err || !data) return setError("Login ID not found. Please check and try again.");
    const pwd = password || loginId.trim();
    if (data.password && data.password !== pwd)
      return setError("Incorrect password. Your default password is your Login ID.");
    if (!grade || !subject)
      return setError("Invalid assessment link. Please ask your tutor for the correct link.");
    onLogin(data);
  }

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',system-ui,sans-serif",padding:"1rem"}}>
      <div style={{marginBottom:"1.5rem",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",justifyContent:"center",marginBottom:"0.5rem"}}>
          <div style={{width:36,height:36,borderRadius:8,background:C.teal,display:"flex",
            alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>✦</div>
          <span style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",fontWeight:700,color:C.navy}}>TutorKlub</span>
        </div>
        <span style={{background:C.navy,color:C.white,fontSize:"0.75rem",fontWeight:700,
          padding:"0.25rem 0.9rem",borderRadius:20,letterSpacing:"0.05em"}}>STUDENT ASSESSMENT PORTAL</span>
      </div>

      <div style={{background:C.white,borderRadius:16,padding:"2rem",width:"100%",maxWidth:400,
        boxShadow:"0 4px 24px rgba(26,39,68,0.10)"}}>
        <h2 style={{margin:"0 0 0.25rem",color:C.navy,fontSize:"1.3rem",fontWeight:800}}>Student Login</h2>
        <p style={{margin:"0 0 1.5rem",color:C.muted,fontSize:"0.88rem"}}>
          Grade {grade} · {subject} Assessment
        </p>
        <form onSubmit={handleSubmit}>
          <label style={{display:"block",marginBottom:"0.25rem",color:C.navy,fontSize:"0.85rem",fontWeight:700}}>
            Login ID
          </label>
          <input value={loginId} onChange={e=>setLoginId(e.target.value)}
            placeholder="e.g. TK-AR4821" required
            style={{width:"100%",padding:"0.65rem 0.9rem",borderRadius:8,border:"1.5px solid #e2e6ef",
              fontSize:"0.95rem",marginBottom:"1rem",boxSizing:"border-box",outline:"none"}}/>
          <label style={{display:"block",marginBottom:"0.25rem",color:C.navy,fontSize:"0.85rem",fontWeight:700}}>
            Password <span style={{color:C.muted,fontWeight:400}}>(default: your Login ID)</span>
          </label>
          <input value={password} onChange={e=>setPassword(e.target.value)}
            type="password" placeholder="Leave blank to use Login ID as password"
            style={{width:"100%",padding:"0.65rem 0.9rem",borderRadius:8,border:"1.5px solid #e2e6ef",
              fontSize:"0.95rem",marginBottom:"1.2rem",boxSizing:"border-box",outline:"none"}}/>
          {error && <p style={{color:"#dc2626",fontSize:"0.85rem",margin:"0 0 1rem",
            background:"#fef2f2",padding:"0.6rem 0.8rem",borderRadius:8}}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{width:"100%",padding:"0.75rem",background:C.teal,color:C.white,border:"none",
              borderRadius:10,fontSize:"1rem",fontWeight:800,cursor:"pointer",opacity:loading?0.7:1}}>
            {loading ? "Checking..." : "Login →"}
          </button>
        </form>
      </div>
    </div>
  );
}
// 74 lines
