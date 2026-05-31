import { useState } from "react";
import StudentLogin from "./StudentLogin";
import AssessmentInstructions from "./AssessmentInstructions";
import StudentAssessment from "./StudentAssessment";
import ThankYou from "./ThankYou";

export default function StudentFlow() {
  const params  = new URLSearchParams(window.location.search);
  const grade   = params.get("grade");
  const subject = params.get("subject");

  const [step, setStep]       = useState("login");
  const [student, setStudent] = useState(null);
  const [result, setResult]   = useState(null);

  function handleLogin(studentData) {
    setStudent(studentData);
    setStep("instructions");
  }

  function handleStart() {
    setStep("assessment");
  }

  function handleDone(answers, questions, tabSwitch, score) {
    if (tabSwitch) {
      alert("Session ended: tab switching detected.");
      window.location.href = "/student";
      return;
    }
    setResult({ score, total: questions.length });
    setStep("thankyou");
  }

  if (step === "login")
    return <StudentLogin onLogin={handleLogin} grade={grade} subject={subject} />;
  if (step === "instructions")
    return <AssessmentInstructions student={student} grade={grade} subject={subject} onStart={handleStart} />;
  if (step === "assessment")
    return <StudentAssessment student={student} grade={grade} subject={subject} onDone={handleDone} />;
  if (step === "thankyou")
    return <ThankYou student={student} score={result.score} total={result.total} />;
}
// 43 lines
