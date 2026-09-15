// components/Doubts/DoubtBoard.jsx — class doubt board (student view + tutor view)
import { useState, useEffect } from "react";
import DoubtThread from "./DoubtThread";
import { fetchDoubts, postDoubt, uploadImage } from "../../lib/doubtService";

const C = { navy:"#1a2744", teal:"#0e8a7c", white:"#fff", muted:"#5a6478" };
const SUBJECTS = ["", "Math", "English", "Telugu", "Hindi", "Sanskrit"];
const chip = (a) => ({ padding:"0.4rem 0.9rem", borderRadius:50, border:"none", cursor:"pointer",
  fontFamily:"inherit", fontSize:"0.78rem", fontWeight:700, background:a ? C.navy : C.white,
  color:a ? C.white : C.muted, boxShadow:"0 2px 8px rgba(26,39,68,0.07)" });
const inp = { width:"100%", padding:"0.65rem 0.9rem", borderRadius:8, border:"1.5px solid #e2e6ef",
  fontSize:"0.92rem", boxSizing:"border-box", outline:"none", fontFamily:"inherit" };

export default function DoubtBoard({ role, student, tutorName = "Tutor" }) {
  const [doubts, setDoubts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade]     = useState(student ? String(student.Grade) : "");
  const [subject, setSubject] = useState(student ? student.Subject : "");
  const [status, setStatus]   = useState("Open");
  const [body, setBody]       = useState("");
  const [file, setFile]       = useState(null);
  const [priv, setPriv]       = useState(false);
  const [posting, setPosting] = useState(false);

  useEffect(() => { load(); }, [grade, subject, status]);
  async function load() {
    setLoading(true);
    try { setDoubts(await fetchDoubts({ grade, subject, status: role === "tutor" ? status : "",
      studentId: student?.id })); }
    catch (e) { alert("Could not load doubts: " + e.message); }
    setLoading(false);
  }

  async function submit() {
    if (!body.trim()) return;
    setPosting(true);
    try {
      const Image_Url = file ? await uploadImage(file) : null;
      const d = await postDoubt({ Student_Id: student.id, Login_id: student.Login_id,
        Child_Name: student.Child_Name, Grade: student.Grade, Subject: student.Subject,
        Body: body.trim(), Image_Url, Is_Private: priv });
      setDoubts(p => [d, ...p]); setBody(""); setFile(null); setPriv(false);
    } catch (e) { alert("Could not post: " + e.message); }
    setPosting(false);
  }

  return (
    <div style={{ maxWidth:820, margin:"0 auto", padding:"1.5rem 1rem", fontFamily:"'Nunito',system-ui,sans-serif" }}>
      <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.4rem", color:C.navy, margin:"0 0 0.25rem" }}>
        {role === "tutor" ? "💬 Student Doubts" : `💬 Grade ${student.Grade} ${student.Subject} — Doubts`}</h2>
      <p style={{ fontSize:"0.85rem", color:C.muted, margin:"0 0 1.2rem" }}>
        {role === "tutor" ? "Reply to questions from your classes. Mark resolved when done."
          : "Ask anything you're stuck on. Your tutor and classmates can help. Tick Private if only your tutor should see it."}</p>

      {role === "student" && (
        <div style={{ background:C.white, borderRadius:14, padding:"1rem 1.2rem", marginBottom:"1.5rem",
          boxShadow:"0 2px 12px rgba(26,39,68,0.07)" }}>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={3}
            placeholder="Type your doubt here… e.g. I don't understand how to carry the 1 in 47 + 36"
            style={{ ...inp, resize:"vertical", marginBottom:"0.7rem" }}/>
          <div style={{ display:"flex", gap:"0.8rem", alignItems:"center", flexWrap:"wrap" }}>
            <label style={{ fontSize:"0.82rem", color:C.muted, cursor:"pointer" }}>📷 Add photo
              <input type="file" accept="image/*" capture="environment" onChange={e => setFile(e.target.files[0])}
                style={{ display:"none" }}/>{file && ` · ${file.name}`}</label>
            <label style={{ fontSize:"0.82rem", color:C.muted, cursor:"pointer" }}>
              <input type="checkbox" checked={priv} onChange={e => setPriv(e.target.checked)}/> 🔒 Private (tutor only)</label>
            <button onClick={submit} disabled={posting} style={{ marginLeft:"auto", background:C.teal, color:C.white,
              border:"none", borderRadius:50, padding:"0.6rem 1.3rem", fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>
              {posting ? "Posting…" : "Post Doubt →"}</button>
          </div>
        </div>
      )}

      {role === "tutor" && (
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.2rem", flexWrap:"wrap", alignItems:"center" }}>
          <select value={grade} onChange={e => setGrade(e.target.value)} style={{ ...inp, width:"auto" }}>
            <option value="">All Grades</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
          </select>
          {SUBJECTS.map(s => <button key={s} style={chip(subject === s)} onClick={() => setSubject(s)}>{s || "All Subjects"}</button>)}
          {["Open", "Resolved", ""].map(s => <button key={s} style={chip(status === s)} onClick={() => setStatus(s)}>{s || "All"}</button>)}
        </div>
      )}

      {loading ? <p style={{ color:C.muted }}>Loading…</p>
        : doubts.length === 0 ? <p style={{ color:C.muted }}>No doubts here yet.</p>
        : doubts.map(d => <DoubtThread key={d.Id} doubt={d} role={role}
            authorName={role === "tutor" ? tutorName : student.Child_Name}
            onStatusChange={(id, s) => setDoubts(p => p.map(x => x.Id === id ? { ...x, Status:s } : x))}/>)}
    </div>
  );
}
