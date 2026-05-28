import { useState } from 'react'

export default function AssessmentForm({ questions, onSubmit, saving }) {
  const [answers, setAnswers] = useState({})

  const allAnswered = questions.length > 0 &&
    questions.every((_, i) => answers[i] !== undefined)

  function handleSubmit() {
    const score = questions.reduce((acc, q, i) =>
      acc + (answers[i] === q.answer ? 1 : 0), 0)
    onSubmit({
      questionIds: questions.map(q => q.id),
      answers:     questions.map((_, i) => answers[i] ?? ''),
      score,
      total: questions.length,
    })
  }

  return (
    <div>
      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <p><strong>Q{i + 1}.</strong> {q.question}</p>
          {q.options.map(opt => (
            <label key={opt} style={{ display: 'block', marginLeft: 12 }}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => setAnswers(prev => ({ ...prev, [i]: opt }))}
              />{' '}{opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} disabled={!allAnswered || saving}>
        {saving ? 'Saving…' : 'Submit Assessment'}
      </button>
    </div>
  )
}
