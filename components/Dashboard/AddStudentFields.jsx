// components/Dashboard/AddStudentFields.jsx
const F = {
  width:"100%", padding:"0.75rem", border:"1.5px solid #e0ddd6",
  borderRadius:10, fontSize:"0.88rem", fontFamily:"inherit",
  boxSizing:"border-box", outline:"none",
};
const L = {
  fontSize:"0.72rem", fontWeight:700, color:"#8491a8",
  textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.3rem",
};
export default function AddStudentFields({ form, setForm }) {
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <>
      {[
        { label:"Child's Full Name *", key:"child_name", placeholder:"e.g. Arjun Reddy" },
        { label:"Parent's Name *",     key:"parent_name", placeholder:"e.g. Suresh Reddy" },
        { label:"Parent's Email",      key:"email",       placeholder:"e.g. suresh@email.com" },
        { label:"Parent's WhatsApp Number", key:"phone", placeholder:"e.g. 9985554222" },
      ].map(f => (
        <div key={f.key} style={{ marginBottom:"0.85rem" }}>
          <div style={L}>{f.label}</div>
          <input value={form[f.key]||""} onChange={set(f.key)}
            placeholder={f.placeholder} style={F}/>
        </div>
      ))}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
        gap:"0.75rem", marginBottom:"0.85rem" }}>
        <div>
          <div style={L}>Grade *</div>
          <select value={form.grade} onChange={set("grade")}
            style={{ ...F, background:"#fff", cursor:"pointer" }}>
            <option value="">Select</option>
            {[1,2,3,4,5].map(g => <option key={g} value={g}>Grade {g}</option>)}
          </select>
        </div>
        <div>
          <div style={L}>Subject *</div>
          <select value={form.subject} onChange={set("subject")}
            style={{ ...F, background:"#fff", cursor:"pointer" }}>
            <option value="">Select</option>
            {["Math","English","Telugu","Hindi"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
