import { supabase } from './supabaseClient'

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

export async function loadAssessments(studentId) {
  const { data, error } = await supabase
    .from('Assessment')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false })
  if (error) console.error('loadAssessments:', error.message)
  return { data: data ?? [], error }
}

export async function loadStudent(studentId) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single()
  if (error) console.error('loadStudent:', error.message)
  return { data, error }
}
