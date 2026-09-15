
// components/Doubts/DoubtThread.jsx — one doubt, its replies, and the reply box
import { useState, useEffect } from "react";
import { fetchReplies, postReply, setDoubtStatus, timeAgo } from "../../lib/doubtService";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478", tealL:"#e6f5f3",
  cream:"#faf8f4", green:"#16a34a", greenL:"#f0fdf4", amber:"#d97706", amberL:"#fffbeb" };

export default function DoubtThread({ doubt, role, authorName, onStatusChange }) {
  const [replies, setReplies] = useState([]);
  const [text, setText]       = useState("");
  const [busy, setBusy]       = useState(false);
  const [status, setStatus]   = useState(doubt.Status);

  useEffect(() => { fetchReplies(doubt.Id).then(setReplies).catch(() => {}); }, [doubt.Id]);

  async function send() {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const r = await postReply({ Doubt_Id: doubt.Id, Author_Type: role,
        Author_Name: authorName, Body: text.trim() });
      setReplies(p => [...p, r]); setText("");
    } catch (e) { alert("Could not send reply: " + e.message); }
    setBusy(false);
  }

  async function toggle() {
    const next = status === "Open" ? "Resolved" : "Open";
    try { await setDoubtStatus(doubt.Id, next); setStatus(next); onStatusChange?.(doubt.Id, next); }
    catch (e) { alert("Could not update: " + e.message); }
  }

  const open = status === "Open";
  return (
    <div style={{ background:C.white, borderRadius:14, padding:"1.1rem 1.2rem", marginBottom:"1rem",
      boxShadow:"0 2px 12px rgba(26,39,68,0.07)", borderLeft:`4px solid ${open ? C.amber : C.green}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
        <div style={{ fontSize:"0.78rem", color:C.muted }}>
          <b style={{ color:C.navy }}>{doubt.Child_Name}</b> · Grade {doubt.Grade} {doubt.Subject}
          · {timeAgo(doubt.Created_At)} {doubt.Is_Private && "· 🔒 Private"}
        </div>
        <span style={{ background:open ? C.amberL : C.greenL, color:open ? C.amber : C.green,
          fontSize:"0.68rem", fontWeight:700, padding:"0.2rem 0.7rem", borderRadius:50 }}>{status}</span>
      </div>
      <p style={{ margin:"0.6rem 0", color:C.navy, fontSize:"0.95rem", whiteSpace:"pre-wrap" }}>{doubt.Body}</p>
      {doubt.Image_Url && <a href={doubt.Image_Url} target="_blank" rel="noreferrer">
        <img src={doubt.Image_Url} alt="doubt" style={{ maxWidth:"100%", maxHeight:260, borderRadius:10, marginBottom:"0.5rem" }}/></a>}

      {replies.map(r => (
        <div key={r.Id} style={{ background:r.Author_Type === "tutor" ? C.tealL : C.cream,
          borderRadius:10, padding:"0.6rem 0.8rem", marginTop:"0.5rem", fontSize:"0.88rem" }}>
          <div style={{ fontSize:"0.72rem", color:C.muted, marginBottom:2 }}>
            <b style={{ color:r.Author_Type === "tutor" ? C.teal : C.navy }}>
              {r.Author_Type === "tutor" ? "👩‍🏫 " : ""}{r.Author_Name}</b> · {timeAgo(r.Created_At)}
          </div>
          <div style={{ whiteSpace:"pre-wrap", color:C.navy }}>{r.Body}</div>
        </div>
      ))}

      <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.8rem", flexWrap:"wrap" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder={role === "tutor" ? "Reply to student…" : "Ask a follow-up…"}
          style={{ flex:1, minWidth:180, padding:"0.6rem 0.8rem", borderRadius:8, border:"1.5px solid #e2e6ef", fontSize:"0.9rem", outline:"none" }}/>
        <button onClick={send} disabled={busy} style={{ background:C.teal, color:C.white, border:"none",
          borderRadius:8, padding:"0.6rem 1rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Send</button>
        {role === "tutor" && <button onClick={toggle} style={{ background:"transparent", color:C.muted,
          border:"1.5px solid #e2e6ef", borderRadius:8, padding:"0.6rem 0.9rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          {open ? "✓ Mark Resolved" : "Reopen"}</button>}
      </div>
    </div>
  );
}
