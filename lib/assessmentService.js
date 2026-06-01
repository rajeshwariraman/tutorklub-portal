import { supabase } from './supabase'

export async function saveAssessment({ studentId, questionIds, answers, score, total }) {
  const { data, error } = await supabase
    .from('Assessment')
    .insert([{
      student_id: studentId,
      question_ids: questionIds,
      answers: answers,
      score,
      total,
      date: new Date().toISOString(),
    }])
    .select()
  if (error) console.error('saveAssessment:', error.message)
  return { data, error }
}

export async function loadAssessments(loginId) {
  // Resolve login_id to numeric id first
  const { data: student } = await supabase
    .from('Students')
    .select('id')
    .eq('login_id', loginId.toUpperCase())
    .single()
  if (!student) return { data: [], error: null }

  const { data, error } = await supabase
    .from('Assessment')
    .select('*')
    .eq('student_id', student.id)
    .order('date', { ascending: false })
  if (error) console.error('loadAssessments:', error.message)
  return { data: data ?? [], error }
}

export async function loadStudent(loginId) {
  // Load student by login_id
  const { data, error } = await supabase
    .from('Students')
    .select('*')
    .eq('login_id', loginId.toUpperCase())
    .single()
  if (error) console.error('loadStudent:', error.message)
  if (!data) return { data: null, error }

  // Load most recent assessment
  const { data: assessment } = await supabase
    .from('Assessment')
    .select('*')
    .eq('student_id', data.id)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  if (!assessment) return { data: null, error: null }

  // Normalise question_ids
  const questionIds = assessment.question_ids
    || JSON.parse(assessment.question_id || '[]')

  // Normalise answers: StudentAssessment saves {qid: optionIndex}
  // ParentDashboard expects array indexed by position in questionIds
  const rawAnswers = typeof assessment.answers === 'string'
    ? JSON.parse(assessment.answers)
    : assessment.answers || {}
  const answersArray = questionIds.map(qid =>
    rawAnswers[qid] !== undefined ? rawAnswers[qid]
    : rawAnswers[String(qid)] !== undefined ? rawAnswers[String(qid)]
    : null
  )

  return {
    data: {
      id:         data.id,
      loginId:    data.login_id,
      childName:  data.child_name,
      parentName: data.parent_name || '',
      grade:      data.grade,
      subject:    data.subject,
      email:      data.email || '',
      questionIds,
      answers:    answersArray,
      score:      assessment.score,
      total:      assessment.total,
      date:       new Date(assessment.date).toLocaleDateString('en-IN'),
      feedback:   assessment.feedback,
    },
    error: null
  }
}
