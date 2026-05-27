// components/AI/AIWorkspace.jsx
import { useState, useRef, useEffect } from "react";
import { WORKSPACE_PROBLEMS } from "../../data/questionBank";
import StepAnalysis from "./StepAnalysis";

const C = {
  navy:"#1a2744", teal:"#0e8a7c", tealL:"#e6f5f3",
  cream:"#faf8f4", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626",   redL:"#fef2f2",
  blue:"#2563eb",  blueL:"#eff6ff",
  amber:"#d97706", amberL:"#fffbeb",
  muted:"#5a6478", soft:"#8491a8",
};

const DC={Beginner:C.green,Intermediate:C.amber,Advanced:C.red};
const DB={Beginner:C.greenL,Intermediate:C.amberL,Advanced:C.redL};

function Badge({label,type}){
  const c=type==="diff"?DC[label]:undefined;
  const b=type==="diff"?DB[label]:undefined;
  return <span style={{background:b,color:c,border:`1px solid ${c}33`,borderRadius:50,padding:"0.18rem 0.6rem",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.05em",display:"inline-block",whiteSpace:"nowrap"}}>{label}</span>;
}

async function analyzeStep(problem, allSteps, newStep){
  const prev=allSteps.map((s,i)=>`Step ${i+1}: "${s.text}" - ${s.isCorrect?"Correct":"Incorrect"}`).join("\n");
  const prompt=`You are an expert, warm primary school maths tutor analysing a student's step-by-step working.

PROBLEM: "${problem}"
${prev?`\nPREVIOUS STEPS:\n${prev}\n`:""}
STUDENT'S LATEST STEP: "${newStep}"

Analyse this step carefully. Think about WHAT the student was trying to do and WHETHER their thinking is correct.

Respond ONLY with valid JSON, no markdown:
{
  "isCorrect": true or false,
  "stepLabel": "Short label for this step (e.g. 'Find common denominator', 'Multiply units', 'Final answer')",
  "analysis": "2-3 sentences explaining what the student was thinking and whether that thinking process is sound",
  "mistakeType": null, or one of: "arithmetic_error", "conceptual_misunderstanding", "wrong_procedure", "partial_understanding",
  "mistakeExplanation": null if correct, or exactly where and how the thinking went wrong in one clear sentence,
  "correction": null if correct, or the correct version of this step with a brief explanation of why,
  "encouragement": "A warm 6-8 word encouraging phrase for the student",
  "isComplete": true if this step correctly and completely solves the problem, else false,
  "nextHint": null if step is incorrect or problem is complete, or a gentle one-sentence hint pointing toward the next step if this step is correct and more work remains
}`;
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
  const data=await res.json();
  const raw=data.content[0].text.replace(/```json|```/g,"").trim();
  return JSON.parse(raw);
}

export default function AIWorkspace(){
  const [selectedProblem,setSelectedProblem]=useState(null);
  const [customProblem,setCustomProblem]=useState("");
  const [stepInput,setStepInput]=useState("");
  const [steps,setSteps]=useState([]);
  const [analyzing,setAnalyzing]=useState(false);
  const [wsComplete,setWsComplete]=useState(false);
  const [wsError,setWsError]=useState("");
  const stepsEndRef=useRef(null);

  useEffect(()=>{stepsEndRef.current?.scrollIntoView({behavior:"smooth"})},[steps]);

  const activeProblemText=selectedProblem?.problem||(customProblem.trim()?customProblem:null);

  function resetWorkspace(){setSteps([]);setStepInput("");setWsComplete(false);setWsError("");}

  async function submitStep(){
    if(!stepInput.trim()||!activeProblemText||analyzing) return;
    const text=stepInput.trim();
    setStepInput("");setAnalyzing(true);setWsError("");
    try{
      const result=await analyzeStep(activeProblemText,steps,text);
      setSteps(s=>[...s,{text,isCorrect:result.isCorrect,...result,id:Date.now()}]);
      if(result.isComplete) setWsComplete(true);
    }catch(e){
      setWsError("Could not analyse step. Please check your connection and try again.");
    }
    setAnalyzing(false);
  }

  return(
  <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>
    <div style={{marginBottom:"1.5rem"}}>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:C.navy,marginBottom:"0.3rem"}}>AI Maths Workspace</h2>
      <p style={{fontSize:"0.85rem",color:C.muted,maxWidth:680,lineHeight:1.65}}>The student works through a problem one step at a time on their device. Claude analyses <strong>each step</strong> in real time — identifying mistakes in thinking, not just wrong answers, and showing exactly how to correct the reasoning.</p>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"320px 1fr",gap:"1.5rem",alignItems:"flex-start"}}>
      {/* ── LEFT PANEL ── */}
      <div>
        <div style={{background:C.white,borderRadius:14,padding:"1.2rem",boxShadow:"0 2px 14px rgba(26,39,68,0.08)",marginBottom:"1rem"}}>
          <div style={{fontSize:"0.67rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.soft,marginBottom:"0.75rem"}}>Choose a Problem</div>
          {WORKSPACE_PROBLEMS.map(p=>(
          <div key={p.id} onClick={()=>{setSelectedProblem(p);resetWorkspace();setCustomProblem("");}}
            style={{padding:"0.85rem",borderRadius:10,marginBottom:"0.5rem",cursor:"pointer",border:`2px solid ${selectedProblem?.id===p.id?C.teal:"#eee"}`,background:selectedProblem?.id===p.id?C.tealL:"#fafafa",transition:"all 0.18s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"0.5rem",marginBottom:"0.25rem"}}>
              <span style={{fontSize:"0.82rem",fontWeight:700,color:C.navy,lineHeight:1.4}}>{p.title}</span>
              <Badge label={p.difficulty} type="diff"/>
            </div>
            <div style={{fontSize:"0.71rem",color:C.soft}}>Grade {p.grade} · {p.subject} · {p.topic}</div>
          </div>))}
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"1.2rem",boxShadow:"0 2px 14px rgba(26,39,68,0.08)"}}>
          <div style={{fontSize:"0.67rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.soft,marginBottom:"0.75rem"}}>Or Enter a Custom Problem</div>
          <textarea value={customProblem} onChange={e=>{setCustomProblem(e.target.value);setSelectedProblem(null);resetWorkspace();}}
            placeholder="Type any maths problem here..."
            style={{width:"100%",minHeight:85,padding:"0.75rem",border:"1.5px solid #e0ddd6",borderRadius:8,fontFamily:"inherit",fontSize:"0.84rem",resize:"vertical",boxSizing:"border-box",outline:"none",lineHeight:1.6}}/>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div>
        {!activeProblemText&&(
        <div style={{background:C.white,borderRadius:14,padding:"3rem 2rem",textAlign:"center",boxShadow:"0 2px 14px rgba(26,39,68,0.08)"}}>
          <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🧮</div>
          <h3 style={{fontFamily:"Georgia,serif",color:C.navy,marginBottom:"0.5rem"}}>Select a Problem to Begin</h3>
          <p style={{fontSize:"0.87rem",color:C.muted,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>The student enters their working one step at a time. Claude analyses each step for correctness and quality of mathematical reasoning — not just the final answer.</p>
        </div>)}

        {activeProblemText&&(<>
          {/* Problem Header */}
          <div style={{background:C.navy,borderRadius:14,padding:"1.25rem 1.5rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"1rem"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#6de4d8",marginBottom:"0.35rem"}}>Problem</div>
              <p style={{fontFamily:"Georgia,serif",fontSize:"1.05rem",color:C.white,margin:0,lineHeight:1.5}}>{activeProblemText}</p>
              {selectedProblem&&<p style={{fontSize:"0.74rem",color:"rgba(255,255,255,0.4)",marginTop:"0.5rem",fontStyle:"italic"}}>Hint for student: {selectedProblem.hint}</p>}
            </div>
            <button onClick={resetWorkspace} style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:50,padding:"0.38rem 0.85rem",fontSize:"0.72rem",cursor:"pointer",flexShrink:0,fontFamily:"inherit"}}>Reset</button>
          </div>

          {/* Step Analysis List */}
          {steps.length>0&&(
          <div style={{background:C.white,borderRadius:14,padding:"1.25rem",marginBottom:"1rem",boxShadow:"0 2px 14px rgba(26,39,68,0.08)",maxHeight:440,overflowY:"auto"}}>
            <div style={{fontSize:"0.67rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.soft,marginBottom:"0.75rem"}}>Working — Step by Step Analysis</div>
            {steps.map((step,i)=>(
              <StepAnalysis key={step.id} step={step} index={i}/>
            ))}
            <div ref={stepsEndRef}/>
          </div>)}

          {/* Completion Banner */}
          {wsComplete&&(
          <div style={{background:C.green,borderRadius:12,padding:"1.1rem 1.5rem",marginBottom:"1rem",display:"flex",gap:"0.75rem",alignItems:"center"}}>
            <span style={{fontSize:"1.7rem"}}>🎉</span>
            <div>
              <div style={{fontWeight:700,color:C.white,fontSize:"0.95rem"}}>Problem solved correctly — all steps verified!</div>
              <p style={{fontSize:"0.79rem",color:"rgba(255,255,255,0.85)",margin:"0.2rem 0 0"}}>Excellent step-by-step reasoning. The AI confirms every step of thinking was sound. Well done!</p>
            </div>
          </div>)}

          {/* Step Input */}
          {!wsComplete&&(
          <div style={{background:C.white,borderRadius:14,padding:"1.25rem",boxShadow:"0 2px 14px rgba(26,39,68,0.08)"}}>
            <div style={{fontSize:"0.67rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.soft,marginBottom:"0.6rem"}}>
              {steps.length===0?"Enter Your First Step":"Enter Your Next Step"}
            </div>
            <div style={{background:C.cream,borderRadius:10,padding:"0.8rem 1rem",marginBottom:"0.85rem",fontSize:"0.79rem",color:C.muted,lineHeight:1.65}}>
              {steps.length===0
                ?"💬 Show your thinking clearly, not just the answer. For example: '1/2 + 1/4 — I need a common denominator. The denominators are 2 and 4. LCM = 4.'"
                :steps[steps.length-1].isCorrect
                  ?"✅ Great step! Continue — write exactly what you do next."
                  :"⚠️ Read the correction above carefully. Then write this step correctly below."}
            </div>
            <textarea value={stepInput} onChange={e=>setStepInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submitStep();}}}
              placeholder="Write your working here... (Enter to submit · Shift+Enter for new line)"
              disabled={analyzing}
              style={{width:"100%",minHeight:85,padding:"0.85rem",border:`1.5px solid ${analyzing?"#e0ddd6":C.teal}`,borderRadius:10,fontFamily:"monospace",fontSize:"0.9rem",resize:"vertical",boxSizing:"border-box",outline:"none",lineHeight:1.6,transition:"border 0.2s",background:analyzing?"#fafafa":C.white}}/>
            <div style={{display:"flex",gap:"0.75rem",marginTop:"0.75rem",alignItems:"center"}}>
              <button onClick={submitStep} disabled={!stepInput.trim()||analyzing}
                style={{flex:1,background:!stepInput.trim()||analyzing?"#d1d5db":C.teal,color:C.white,border:"none",borderRadius:50,padding:"0.85rem",fontSize:"0.9rem",fontWeight:700,cursor:!stepInput.trim()||analyzing?"default":"pointer",transition:"background 0.2s",fontFamily:"inherit"}}>
                {analyzing?"🤖 Claude is analysing your step...":"Submit This Step →"}
              </button>
              {steps.length>0&&(
              <button onClick={resetWorkspace} style={{background:"transparent",color:C.soft,border:"1px solid #e0ddd6",borderRadius:50,padding:"0.82rem 1.15rem",fontSize:"0.82rem",cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>
                Start Over
              </button>)}
            </div>
            {wsError&&<p style={{fontSize:"0.78rem",color:C.red,marginTop:"0.6rem"}}>{wsError}</p>}
            <p style={{fontSize:"0.71rem",color:"#bbb",marginTop:"0.6rem",textAlign:"center"}}>Powered by Claude AI · Analyses reasoning quality, not just the final answer</p>
          </div>)}
        </>)}
      </div>
    </div>
  </div>);
}
