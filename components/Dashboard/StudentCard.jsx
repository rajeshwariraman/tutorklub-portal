const SC = { Math:"#2563eb", English:"#7c3aed", Telugu:"#c2410c", Hindi:"#db2777" };
const SB = { Math:"#eff6ff", English:"#f5f3ff", Telugu:"#fff7ed", Hindi:"#fdf2f8" };
function Badge({ label }) {
  return (
    <span style={{
      background:SB[label]||"#e6f5f3", color:SC[label]||"#0e8a7c",
      border:`1px solid ${SC[label]||"#0e8a7c"}33`,
      borderRadius:50, padding:"0.18rem 0.6rem",
      fontSize:"0.68rem", fontWeight:700,
      letterSpacing:"0.05em", display:"inline-block",
    }}>{label}</span>
  );
}
export default function StudentCard({ student: s, onSelect }) {
  return (
    <div onClick={() => onSelect && onSelect(s)}
      style={{ background:"#fff", borderRadius:12, padding:"1rem 1.25rem",
        cursor:"pointer", boxShadow:"0 2px 8px rgba(26,39,68,0.06)",
        border:"1px solid #f0ede8", display:"flex", alignItems:"center",
        justifyContent:"space-between", flexWrap:"wrap", gap:"0.75rem" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 16px rgba(26,39,68,0.12)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow="0 2px 8px rgba(26,39,68,0.06)"}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:"#e6f5f3",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.1rem", fontWeight:700, color:"#0e8a7c", flexShrink:0 }}>
          {s.Child_Name?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:"0.92rem", color:"#1a2744", marginBottom:"0.2rem" }}>
            {s.Child_Name}
          </div>
          <div style={{ fontSize:"0.76rem", color:"#8491a8" }}>
            Parent: {s.Parent_Name} · Grade {s.Grade}
          </div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexWrap:"wrap" }}>
        <Badge label={s.Subject}/>
        <div style={{ background:"#faf8f4", borderRadius:8, padding:"0.3rem 0.7rem",
          fontSize:"0.72rem", fontFamily:"monospace", fontWeight:700, color:"#1a2744" }}>
          {s.Login_id}
        </div>
        <span style={{ fontSize:"0.78rem", color:"#0e8a7c", fontWeight:700 }}>View Results →</span>
      </div>
    </div>
  );
}
