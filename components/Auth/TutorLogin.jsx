// components/Auth/TutorLogin.jsx
import { useState } from "react";
const C = {
  navy:"#1a2744", teal:"#0e8a7c", cream:"#faf8f4",
  white:"#fff", muted:"#5a6478", red:"#dc2626",
};
const TUTOR_EMAIL = "hello@tutorklub.com";
const TUTOR_PASSWORD = "Tutorklub123";
export default function TutorLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  function handleLogin() {
    if (email === TUTOR_EMAIL && password === TUTOR_PASSWORD) {
      onLogin({ email });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }
  return (
  <div style={{
    minHeight:"100vh", background:C.cream,
    display:"flex", alignItems:"center",
    justifyContent:"center",
    fontFamily:"'Nunito',system-ui,sans-serif"
  }}>
    <div style={{
      background:C.white, borderRadius:18,
      padding:"2.5rem", width:"100%", maxWidth:420,
      boxShadow:"0 4px 28px rgba(26,39,68,0.1)",
      textAlign:"center"
    }}>
      <div style={{
        width:48, height:48, borderRadius:12,
        background:C.teal, display:"flex",
        alignItems:"center", justifyContent:"center",
        fontSize:"1.4rem", margin:"0 auto 1rem"
      }}>✦</div>
      <h2 style={{
        fontFamily:"Georgia,serif", fontSize:"1.5rem",
        color:C.navy, marginBottom:"0.5rem"
      }}>TutorKlub Portal</h2>
      <div style={{
        background:"#e6f5f3", borderRadius:8,
        padding:"0.4rem 0.9rem", display:"inline-block",
        marginBottom:"0.75rem"
      }}>
        <span style={{
          fontSize:"0.75rem", fontWeight:700,
          color:"#0e8a7c", letterSpacing:"0.08em",
          textTransform:"uppercase"
        }}>🔑 Tutor Login</span>
      </div>
      <p style={{
        fontSize:"0.85rem", color:C.muted,
        marginBottom:"1.75rem"
      }}>Sign in to access your tutor dashboard</p>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email address"
        type="email"
        style={{
          width:"100%", padding:"0.8rem",
          border:"1.5px solid #e0ddd6", borderRadius:10,
          fontSize:"0.9rem", fontFamily:"inherit",
          boxSizing:"border-box", marginBottom:"0.75rem",
          outline:"none"
        }}/>
      <div style={{position:"relative", marginBottom:"1rem"}}>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Password"
          type={showPassword?"text":"password"}
          style={{
            width:"100%", padding:"0.8rem",
            paddingRight:"3rem",
            border:"1.5px solid #e0ddd6", borderRadius:10,
            fontSize:"0.9rem", fontFamily:"inherit",
            boxSizing:"border-box", outline:"none"
          }}/>
        <button
          onClick={()=>setShowPassword(!showPassword)}
          style={{
            position:"absolute", right:"0.75rem",
            top:"50%", transform:"translateY(-50%)",
            background:"none", border:"none",
            cursor:"pointer", fontSize:"1rem",
            color:C.muted
          }}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {error && (
      <p style={{
        fontSize:"0.8rem", color:C.red,
        marginBottom:"0.75rem"
      }}>{error}</p>)}
      <button
        onClick={handleLogin}
        style={{
          width:"100%", background:C.teal,
          color:C.white, border:"none", borderRadius:50,
          padding:"0.9rem", fontSize:"0.9rem",
          fontWeight:700, cursor:"pointer",
          fontFamily:"inherit",
          boxShadow:"0 4px 14px rgba(14,138,124,0.3)"
        }}>
        Sign In →
      </button>
    </div>
  </div>);
}
