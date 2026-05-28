export default function AssessmentHistory({ assessments, loading }) {
  if (loading) return <p>Loading history…</p>
  if (!assessments.length) return <p>No past assessments.</p>

  return (
    <div>
      <h4>Past Assessments</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Date', 'Score', 'Total', '%'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '4px 8px', borderBottom: '1px solid #ccc' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assessments.map(a => (
            <tr key={a.id}>
              <td style={{ padding: '4px 8px' }}>
                {new Date(a.date).toLocaleDateString('en-IN')}
              </td>
              <td style={{ padding: '4px 8px' }}>{a.score}</td>
              <td style={{ padding: '4px 8px' }}>{a.total}</td>
              <td style={{ padding: '4px 8px' }}>
                {Math.round((a.score / a.total) * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
