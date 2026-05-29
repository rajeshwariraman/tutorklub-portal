// components/Dashboard/AssessmentHistory.jsx
export default function AssessmentHistory({ assessments, loading }) {
  if (loading) return (
    <div style={{ textAlign:"center", padding:"1rem", color:"#8491a8", fontSize:"0.85rem" }}>
      Loading history…
    </div>
  )
  if (!assessments.length) return null

  return (
    <div style={{
      background:"#fff", borderRadius:14,
      boxShadow:"0 2px 10px rgba(26,39,68,0.06)",
      padding:"1.25rem", marginBottom:"1.25rem"
    }}>
      <div style={{
        display:"flex", alignItems:"center",
        justifyContent:"space-between", marginBottom:"1rem"
      }}>
        <h3 style={{
          fontFamily:"Georgia,serif", fontSize:"1rem",
          color:"#1a2744", margin:0
        }}>Past Assessments</h3>
        <span style={{
          fontSize:"0.72rem", color:"#8491a8",
          background:"#faf8f4", padding:"0.25rem 0.75rem",
          borderRadius:50, fontWeight:600
        }}>
          {assessments.length} session{assessments.length !== 1 ? "s" : ""}
        </span>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            {["Date","Score","Total","Result"].map(h => (
              <th key={h} style={{
                textAlign:"left", padding:"0.5rem 0.75rem",
                borderBottom:"1.5px solid #f0ede8",
                fontSize:"0.68rem", fontWeight:700,
                color:"#8491a8", textTransform:"uppercase",
                letterSpacing:"0.08em"
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assessments.map((a, i) => {
            const pct = Math.round((a.score / a.total) * 100)
            const col = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626"
            const bg  = pct >= 80 ? "#f0fdf4" : pct >= 60 ? "#fffbeb" : "#fef2f2"
            return (
              <tr key={a.id} style={{
                borderBottom: i < assessments.length - 1
                  ? "1px solid #f7f5f2" : "none"
              }}>
                <td style={{ padding:"0.65rem 0.75rem", fontSize:"0.82rem", color:"#1a2744" }}>
                  {new Date(a.date).toLocaleDateString("en-IN", {
                    day:"numeric", month:"short", year:"numeric"
                  })}
                </td>
                <td style={{ padding:"0.65rem 0.75rem", fontSize:"0.82rem", fontWeight:700, color:"#1a2744" }}>
                  {a.score}
                </td>
                <td style={{ padding:"0.65rem 0.75rem", fontSize:"0.82rem", color:"#8491a8" }}>
                  {a.total}
                </td>
                <td style={{ padding:"0.65rem 0.75rem" }}>
                  <span style={{
                    background:bg, color:col,
                    fontWeight:700, fontSize:"0.75rem",
                    padding:"0.2rem 0.65rem", borderRadius:50,
                    border:`1px solid ${col}33`
                  }}>
                    {pct}%
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
