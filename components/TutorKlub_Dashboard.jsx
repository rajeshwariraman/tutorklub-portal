import { useState, useRef, useEffect } from "react";

const C = {
  navy:"#1a2744", navyD:"#0f1a30", teal:"#0e8a7c", tealM:"#14a896",
  tealL:"#e6f5f3", gold:"#c9922a", goldL:"#fdf4e3",
  cream:"#faf8f4", white:"#fff",
  green:"#16a34a", greenL:"#f0fdf4",
  red:"#dc2626",   redL:"#fef2f2",
  blue:"#2563eb",  blueL:"#eff6ff",
  amber:"#d97706", amberL:"#fffbeb",
  purple:"#7c3aed",purpleL:"#f5f3ff",
  pink:"#db2777",  pinkL:"#fdf2f8",
  orange:"#c2410c",orangeL:"#fff7ed",
  grey:"#6b7280",  greyL:"#f9fafb",
  muted:"#5a6478", soft:"#8491a8",
};

const DC={Beginner:C.green,Intermediate:C.amber,Advanced:C.red};
const DB={Beginner:C.greenL,Intermediate:C.amberL,Advanced:C.redL};
const SC={Math:C.blue,English:C.purple,Telugu:C.orange,Hindi:C.pink};
const SB={Math:C.blueL,English:C.purpleL,Telugu:C.orangeL,Hindi:C.pinkL};

function Badge({label,type}){
  const c=type==="diff"?DC[label]:SC[label];
  const b=type==="diff"?DB[label]:SB[label];
  return <span style={{background:b,color:c,border:`1px solid ${c}33`,borderRadius:50,padding:"0.18rem 0.6rem",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.05em",display:"inline-block",whiteSpace:"nowrap"}}>{label}</span>;
}

function ScoreGauge({score,total}){
  const pct=(score/total)*100;
  const col=pct>=80?C.green:pct>=60?C.amber:C.red;
  const lbl=pct>=80?"Excellent":pct>=60?"Good":pct>=40?"Needs Practice":"Needs Support";
  const r=50,cx=64,cy=64,circ=2*Math.PI*r,dash=(pct/100)*circ;
  return(
    <div style={{textAlign:"center"}}>
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth={9}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={9}
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} style={{transition:"stroke-dasharray 1s"}}/>
        <text x={cx} y={cy-5} textAnchor="middle" fontSize={20} fontWeight={700} fill={C.navy} fontFamily="Georgia,serif">{score}/{total}</text>
        <text x={cx} y={cy+13} textAnchor="middle" fontSize={10} fill={C.soft} fontFamily="Nunito,sans-serif">Score</text>
      </svg>
      <div style={{fontWeight:700,fontSize:"0.82rem",color:col,marginTop:2}}>{lbl}</div>
    </div>
  );
}

function StatCard({icon,val,label,sub,color}){
  return(
    <div style={{background:C.white,borderRadius:12,padding:"1.1rem 1rem",boxShadow:"0 2px 12px rgba(26,39,68,0.07)"}}>
      <div style={{fontSize:"1.3rem",marginBottom:"0.3rem"}}>{icon}</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:"1.7rem",fontWeight:700,color:color||C.navy,lineHeight:1}}>{val}</div>
      <div style={{fontSize:"0.7rem",color:C.soft,fontWeight:600,marginTop:"0.3rem"}}>{label}</div>
      {sub&&<div style={{fontSize:"0.68rem",color:"#bbb",marginTop:"0.1rem"}}>{sub}</div>}
    </div>
  );
}

const QB = [
  {id:1,g:1,s:"Math",t:"Addition",d:"Beginner",q:"What is 3 + 5?",opts:["6","7","8","9"],a:2,concept:"Basic addition",mistake:"Counting from 1 instead of counting on",fix:"Start at 3, count 4 more: 4,5,6,7,8. Use fingers.",exp:"3+5=8."},
  {id:2,g:1,s:"Math",t:"Addition",d:"Intermediate",q:"What is 6 + 7?",opts:["11","12","13","14"],a:2,concept:"Addition bridging 10",mistake:"Losing track when sum crosses 10",fix:"Split 7 into 4+3. 6+4=10, then +3=13.",exp:"Bridge through 10: 6+4=10, +3=13."},
  {id:3,g:1,s:"Math",t:"Subtraction",d:"Beginner",q:"What is 9 - 3?",opts:["5","6","7","4"],a:1,concept:"Basic subtraction",mistake:"Adding instead of taking away",fix:"Put out 9 objects, take away 3, count what remains.",exp:"9-3=6."},
  {id:4,g:1,s:"Math",t:"Subtraction",d:"Intermediate",q:"12 birds. 5 fly away. How many remain?",opts:["6","7","8","9"],a:1,concept:"Subtraction word problems",mistake:"Adding after 'fly away'",fix:"'Fly away' means subtract. 12-5=7.",exp:"12-5=7."},
  {id:5,g:1,s:"Math",t:"Shapes",d:"Beginner",q:"How many sides does a rectangle have?",opts:["3","4","5","6"],a:1,concept:"2D shapes",mistake:"Confusing with triangle",fix:"Trace a book. Count: 1,2,3,4 sides.",exp:"Rectangle has 4 sides."},
  {id:6,g:1,s:"English",t:"Phonics",d:"Beginner",q:"What sound does the letter B make?",opts:["Aah","Buh","Cuh","Duh"],a:1,concept:"Letter-sound correspondence",mistake:"Saying letter name not sound",fix:"B = 'buh' as in ball, bus, bat.",exp:"B makes the 'buh' sound."},
  {id:7,g:1,s:"English",t:"Sentences",d:"Beginner",q:"Which is a complete sentence?",opts:["The big red","A dog ran fast.","Running quickly","Many flowers"],a:1,concept:"Sentence structure",mistake:"Missing subject or verb",fix:"Sentence needs WHO + DOES WHAT. 'A dog ran fast' has both.",exp:"'A dog ran fast' = subject + verb."},
  {id:8,g:1,s:"Telugu",t:"Varnamala",d:"Beginner",q:"Which is a Telugu vowel (Achu)?",opts:["ka","A (అ)","Ta","Na"],a:1,concept:"Telugu vowels (Achulu)",mistake:"Confusing vowels with consonants",fix:"Vowels: a aa i ii... Consonants: ka ta na",exp:"a (A) is the first Telugu vowel."},
  {id:9,g:1,s:"Hindi",t:"Varnamala",d:"Beginner",q:"Which is the first Swar (vowel) in Hindi?",opts:["ka (क)","A (अ)","Ta (ट)","Ma (म)"],a:1,concept:"Hindi vowels (Swar)",mistake:"Confusing Swar with Vyanjan",fix:"Swar: a aa i ii... Vyanjan: ka kha ga...",exp:"a (अ) is the first Hindi vowel."},
  {id:10,g:2,s:"Math",t:"Place Value",d:"Beginner",q:"In 47, what digit is in the tens place?",opts:["7","4","47","0"],a:1,concept:"Place value",mistake:"Confusing tens and units position",fix:"Tens | Units chart: 4 | 7. Tens = 4.",exp:"4 is in the tens place of 47."},
  {id:11,g:2,s:"Math",t:"2-Digit Addition",d:"Beginner",q:"What is 23 + 14?",opts:["36","37","38","39"],a:1,concept:"Column addition without carrying",mistake:"Adding tens with units",fix:"Units: 3+4=7. Tens: 2+1=3. Answer: 37.",exp:"23+14=37."},
  {id:12,g:2,s:"Math",t:"2-Digit Addition",d:"Intermediate",q:"What is 47 + 36?",opts:["73","83","74","84"],a:1,concept:"Addition with carrying",mistake:"Forgetting to carry the 1",fix:"7+6=13 (write 3, carry 1). 4+3+1=8. Answer: 83.",exp:"47+36=83."},
  {id:13,g:2,s:"Math",t:"Time",d:"Beginner",q:"How many minutes are in 1 hour?",opts:["30","45","60","100"],a:2,concept:"Time units",mistake:"Guessing 30 or 100",fix:"Minute hand full circle = 60 minutes = 1 hour.",exp:"1 hour = 60 minutes."},
  {id:14,g:2,s:"English",t:"Spelling",d:"Beginner",q:"Which is the correct spelling?",opts:["frend","freind","friend","freiend"],a:2,concept:"Common word spelling",mistake:"i before e rule confusion",fix:"Friend: 'a FRIEND till the END'. Memory trick.",exp:"'Friend' - memorise as an exception."},
  {id:15,g:2,s:"English",t:"Grammar",d:"Beginner",q:"A naming word is called a:",opts:["Verb","Noun","Adjective","Adverb"],a:1,concept:"Parts of speech - nouns",mistake:"Confusing noun with verb",fix:"Nouns = things you can name. Verbs = actions.",exp:"A noun is a naming word."},
  {id:16,g:2,s:"Telugu",t:"Matras",d:"Beginner",q:"ka + long aa matra in Telugu gives:",opts:["ki","kii","kaa","ku"],a:2,concept:"Telugu vowel markers (Guninthalu)",mistake:"Confusing different maatras",fix:"Long aa matra added to right of consonant. ka + aa = kaa.",exp:"kaa = ka + long aa matra."},
  {id:17,g:2,s:"Hindi",t:"Matras",d:"Beginner",q:"ka (क) + aa matra (ा) gives:",opts:["ki","kii","kaa","ku"],a:2,concept:"Hindi aa matra",mistake:"Confusing maatras",fix:"aa matra appears to the RIGHT of the consonant. ka + aa = kaa.",exp:"ka + aa matra = kaa (का)."},
  {id:18,g:3,s:"Math",t:"Multiplication",d:"Beginner",q:"What is 6 x 7?",opts:["42","36","48","54"],a:0,concept:"Times tables",mistake:"Confusing 6x7 with 6x8 or 7x7",fix:"Count by 6s: 6,12,18,24,30,36,42.",exp:"6 x 7 = 42."},
  {id:19,g:3,s:"Math",t:"Multiplication",d:"Intermediate",q:"What is 24 x 5?",opts:["100","110","120","130"],a:2,concept:"2-digit times 1-digit multiplication",mistake:"Forgetting to carry the tens",fix:"4x5=20 (write 0, carry 2). 2x5=10+2=12. Answer: 120.",exp:"24 x 5 = 120."},
  {id:20,g:3,s:"Math",t:"Fractions",d:"Beginner",q:"1 out of 4 equal parts shaded. This fraction is:",opts:["1/2","1/3","1/4","2/4"],a:2,concept:"Fractions as parts of a whole",mistake:"Writing total parts as numerator",fix:"Fraction = shaded/total. 1 shaded out of 4 total = 1/4.",exp:"1/4 means 1 part of 4 equal parts."},
  {id:21,g:3,s:"Math",t:"Fractions",d:"Intermediate",q:"Which fraction is larger: 1/3 or 1/4?",opts:["1/4","1/3","They are equal","Cannot tell"],a:1,concept:"Comparing unit fractions",mistake:"Thinking larger denominator means larger fraction",fix:"Imagine pizza. Sliced into 3 = bigger pieces than sliced into 4. So 1/3 > 1/4.",exp:"1/3 > 1/4. Larger denominator means smaller pieces."},
  {id:22,g:3,s:"Math",t:"Fractions",d:"Advanced",q:"What is 1/2 + 1/4?",opts:["2/6","1/4","3/4","2/4"],a:2,concept:"Adding fractions with unlike denominators",mistake:"Adding both numerators AND denominators (1+1=2, 2+4=6 = 2/6)",fix:"Convert to common denominator: 1/2 = 2/4. Then 2/4 + 1/4 = 3/4.",exp:"Find common denominator first: 2/4 + 1/4 = 3/4."},
  {id:23,g:3,s:"Math",t:"Area & Perimeter",d:"Beginner",q:"Perimeter of a square with side 5 cm?",opts:["10 cm","15 cm","20 cm","25 cm"],a:2,concept:"Perimeter of a square",mistake:"Multiplying by 3 or only adding 2 sides",fix:"Square has 4 equal sides. 4 x 5 = 20 cm.",exp:"Perimeter = 4 x side = 4 x 5 = 20 cm."},
  {id:24,g:3,s:"Math",t:"Area & Perimeter",d:"Intermediate",q:"Area of a rectangle 6 cm long and 3 cm wide?",opts:["9 cm2","12 cm2","18 cm2","15 cm2"],a:2,concept:"Area of a rectangle",mistake:"Adding instead of multiplying (using perimeter formula)",fix:"Area = length x width = 6 x 3 = 18 cm2. Perimeter adds. Area multiplies.",exp:"Area = l x w = 6 x 3 = 18 cm2."},
  {id:25,g:3,s:"English",t:"Parts of Speech",d:"Beginner",q:"The adjective in 'The big brown dog ran' is:",opts:["dog","ran","big","the"],a:2,concept:"Identifying adjectives",mistake:"Choosing the noun it describes",fix:"Adjective answers 'what kind of?'. What kind of dog? Big.",exp:"'Big' describes the noun 'dog' - it is an adjective."},
  {id:26,g:3,s:"English",t:"Parts of Speech",d:"Intermediate",q:"'Slowly' in 'She walked slowly' is a/an:",opts:["Noun","Verb","Adjective","Adverb"],a:3,concept:"Adverbs",mistake:"Confusing adverb with adjective",fix:"Adverbs tell HOW. Slowly = how she walked.",exp:"'Slowly' is an adverb - it modifies the verb 'walked'."},
  {id:27,g:3,s:"Telugu",t:"Grammar",d:"Beginner",q:"Which is a Telugu noun (Namavachakam)?",opts:["run (parugettu)","beautiful (andamina)","book (pustakam)","quickly (tvaragaa)"],a:2,concept:"Telugu nouns",mistake:"Choosing verb or adjective",fix:"Noun = naming word. Pustakam (book) is a thing you can hold.",exp:"Pustakam (book) is a noun in Telugu."},
  {id:28,g:3,s:"Hindi",t:"Grammar",d:"Beginner",q:"'Kitaab' (book) is which gender in Hindi?",opts:["Masculine","Feminine","Neutral","Both"],a:1,concept:"Hindi grammatical gender",mistake:"Applying English logic to Hindi",fix:"Kitaab is feminine. Learn with: kitaab/kalam = feminine; skool/ghar = masculine.",exp:"Kitaab (book) is feminine (streeeling) in Hindi."},
  {id:29,g:4,s:"Math",t:"Division",d:"Beginner",q:"What is 56 divided by 8?",opts:["6","7","8","9"],a:1,concept:"Division using times tables",mistake:"Confusing 7x8 and 8x8",fix:"Think: 8 x ? = 56. Using 8 times table: 8x7=56. Answer = 7.",exp:"56 / 8 = 7 because 8 x 7 = 56."},
  {id:30,g:4,s:"Math",t:"Decimals",d:"Beginner",q:"Which is largest: 0.5, 0.25, 0.75, 0.1?",opts:["0.1","0.25","0.5","0.75"],a:3,concept:"Comparing decimals",mistake:"Thinking more digits after decimal = larger number",fix:"Line up decimal points. Compare digit by digit from left. 0.75 has 7 in tenths.",exp:"0.75 is largest. Compare tenths digit first: 7>5>2>1."},
  {id:31,g:4,s:"Math",t:"Geometry",d:"Intermediate",q:"Sum of all angles in any triangle?",opts:["90 degrees","180 degrees","270 degrees","360 degrees"],a:1,concept:"Triangle angle sum property",mistake:"Confusing with quadrilateral (360 degrees)",fix:"Tear triangle corners off and line them up - they always make a straight line = 180 degrees.",exp:"Angles in any triangle always sum to 180 degrees."},
  {id:32,g:4,s:"English",t:"Literary Devices",d:"Intermediate",q:"'The wind whispered through the trees' uses:",opts:["Simile","Metaphor","Personification","Alliteration"],a:2,concept:"Personification",mistake:"Confusing personification with metaphor",fix:"Personification = giving human actions to non-human things. Wind cannot actually whisper.",exp:"Personification: wind is given the human action of 'whispering'."},
  {id:33,g:4,s:"Telugu",t:"Grammar",d:"Intermediate",q:"'I will go' in Telugu is:",opts:["vellanu (went)","veltunnanu (going now)","veltanu (will go)","veltavu (you will go)"],a:2,concept:"Telugu future tense",mistake:"Using present continuous tense for future",fix:"Future for 'I' (nenu): verb stem + tanu. velli + tanu = veltanu.",exp:"Veltanu = I will go. Future tense uses -tanu for first person."},
  {id:34,g:4,s:"Hindi",t:"Grammar",d:"Intermediate",q:"The subject case marker for past tense in Hindi is:",opts:["ko","ke","ne","mein"],a:2,concept:"Hindi case markers (Karak Vibhakti)",mistake:"Confusing subject and object markers",fix:"Ne = subject marker for past transitive verbs. Ko = object marker.",exp:"Ne is the subject case marker (karta karak) in Hindi."},
  {id:35,g:5,s:"Math",t:"Percentages",d:"Beginner",q:"What is 25% of 200?",opts:["25","50","75","100"],a:1,concept:"Calculating percentages",mistake:"Dividing 200 by 25 directly",fix:"25% = 1/4. So 200 divided by 4 = 50. Or 200 x 0.25 = 50.",exp:"25% of 200 = 50."},
  {id:36,g:5,s:"Math",t:"Percentages",d:"Intermediate",q:"Shirt costs 500 rupees with 20% discount. Sale price?",opts:["400 rupees","420 rupees","450 rupees","480 rupees"],a:0,concept:"Percentage discount",mistake:"Subtracting 20 (the number) instead of 20%",fix:"20% of 500 = 100. Sale price = 500 - 100 = 400 rupees.",exp:"500 minus 20% = 400 rupees."},
  {id:37,g:5,s:"Math",t:"Ratios",d:"Beginner",q:"12 boys and 8 girls. Ratio of boys to girls in simplest form?",opts:["2:3","3:2","12:8","4:6"],a:1,concept:"Ratios in simplest form",mistake:"Not simplifying the ratio",fix:"HCF of 12 and 8 is 4. Divide both: 12/4 : 8/4 = 3:2.",exp:"12:8 simplifies to 3:2."},
  {id:38,g:5,s:"Math",t:"Algebra",d:"Intermediate",q:"If x + 7 = 15, what is x?",opts:["6","7","8","9"],a:2,concept:"Solving one-step equations",mistake:"Adding 7 to 15 instead of subtracting",fix:"Subtract 7 from both sides: x = 15 - 7 = 8. Keep equation balanced.",exp:"x + 7 = 15 becomes x = 15 - 7 = 8."},
  {id:39,g:5,s:"Math",t:"Algebra",d:"Advanced",q:"If 3y = 18, what is y?",opts:["3","6","9","54"],a:1,concept:"Solving multiplicative equations",mistake:"Multiplying 3 x 18 instead of dividing",fix:"3y = 18 means 3 x y = 18. Divide both sides by 3: y = 18/3 = 6.",exp:"3y = 18. Divide both sides by 3. y = 6."},
  {id:40,g:5,s:"English",t:"Literary Devices",d:"Advanced",q:"When an author hints at future events in the story, this is called:",opts:["Flashback","Foreshadowing","Imagery","Symbolism"],a:1,concept:"Foreshadowing",mistake:"Confusing with flashback (which goes backward in time)",fix:"Foreshadowing = clues pointing FORWARD. Flashback = revisiting the PAST.",exp:"Foreshadowing hints at future events. Flashback revisits past events."},
];

const DEMO_STUDENT = {
  loginId:"TK-AR4821",childName:"Arjun Reddy",parentName:"Suresh Reddy",
  grade:3,subject:"Mathematics",email:"suresh@email.com",
  date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),
  questionIds:[18,20,21,23,24],
  answers:{0:0,1:3,2:0,3:2,4:0},
};

function buildFoundationPlan(student,questions,answers){
  const wrong=questions.map((q,i)=>({...q,correct:answers[i]===q.a})).filter(q=>!q.correct);
  const right=questions.map((q,i)=>({...q,correct:answers[i]===q.a})).filter(q=>q.correct);
  const sessions=[];
  let day=1;
  wrong.forEach((q,i)=>{
    sessions.push({day,session:sessions.length+1,type:"Foundation",topic:q.t,focus:"Reteach: "+q.concept,activity:"Visual teaching + worked examples by tutor",icon:"🎯",col:C.red});
    day++;
    sessions.push({day,session:sessions.length+1,type:"Guided Practice",topic:q.t,focus:"Practise "+q.concept+" step by step",activity:"AI Workspace + tutor correction in real time",icon:"📝",col:C.amber});
    day++;
    if(i<wrong.length-1){day++;}
  });
  right.forEach(q=>{
    if(sessions.length>=7) return;
    sessions.push({day,session:sessions.length+1,type:"Extension",topic:q.t,focus:"Advance "+q.concept+" to next difficulty level",activity:"Challenge problems + enrichment tasks",icon:"⭐",col:C.teal});
    day++;
  });
  while(sessions.length<8){
    sessions.push({day,session:sessions.length+1,type:"Consolidation",topic:"Mixed Revision",focus:"Revisit all topics from this programme",activity:"Timed mixed practice with AI analysis",icon:"🔄",col:C.purple});
    day++;
  }
  sessions.push({day:Math.min(day,10),session:sessions.length+1,type:"Graduation",topic:"Group Class Preview",focus:"Final assessment + group class experience",activity:"Mini group session with 2 other students at same level",icon:"🎓",col:C.navy});
  return sessions.slice(0,9);
}

const WORKSPACE_PROBLEMS=[
  {id:"wp1",grade:3,subject:"Math",topic:"Fractions",title:"Adding Fractions",problem:"Calculate 1/2 + 1/4. Show every step of your working.",hint:"Start by thinking — can you add these directly, or do you need to change something first?",difficulty:"Intermediate"},
  {id:"wp2",grade:3,subject:"Math",topic:"Multiplication",title:"24 x 5",problem:"Work out 24 x 5 step by step. Show how you break it down.",hint:"Try splitting 24 into 20 + 4 and multiply each part separately.",difficulty:"Intermediate"},
  {id:"wp3",grade:4,subject:"Math",topic:"Division",title:"Long Division: 135 / 5",problem:"Calculate 135 divided by 5. Show each step of your working.",hint:"How many times does 5 go into 13? Write that down first.",difficulty:"Intermediate"},
  {id:"wp4",grade:5,subject:"Math",topic:"Percentages",title:"Percentage Discount",problem:"A bag costs 800 rupees. There is a 25% discount. What is the final price? Show your steps.",hint:"Step 1: Find what 25% of 800 is. Step 2: Subtract from 800.",difficulty:"Intermediate"},
  {id:"wp5",grade:2,subject:"Math",topic:"Addition with Carrying",title:"67 + 48",problem:"Add 67 + 48. Show each step including any carrying.",hint:"Start with the units column. What do 7 and 8 add up to?",difficulty:"Beginner"},
  {id:"wp6",grade:5,subject:"Math",topic:"Algebra",title:"Solve the Equation",problem:"Solve: 3x + 4 = 19. Show every step of your working.",hint:"What do you need to do first to get 3x by itself?",difficulty:"Advanced"},
  {id:"wp7",grade:3,subject:"Math",topic:"Area & Perimeter",title:"Rectangle Area vs Perimeter",problem:"A rectangle is 8 cm long and 5 cm wide. Find BOTH its area AND its perimeter. Show working for each.",hint:"Area and perimeter use different operations - one multiplies, one adds.",difficulty:"Intermediate"},
  {id:"wp8",grade:4,subject:"Math",topic:"Division",title:"Word Problem Division",problem:"A teacher has 144 pencils to share equally among 12 students. How many does each student get? Show your working.",hint:"What operation do we use when sharing equally?",difficulty:"Beginner"},
];

async function analyzeStep(problem,allSteps,newStep){
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

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [loginInput,setLoginInput]=useState("");
  const [student,setStudent]=useState(null);
  const [showLocked,setShowLocked]=useState(true);
  const [expandedQ,setExpandedQ]=useState(null);
  const [planView,setPlanView]=useState("plan");
  const [qbF,setQbF]=useState({grade:"",subject:"",diff:"",topic:""});
  const [qbOpen,setQbOpen]=useState(null);
  const [selectedProblem,setSelectedProblem]=useState(null);
  const [customProblem,setCustomProblem]=useState("");
  const [stepInput,setStepInput]=useState("");
  const [steps,setSteps]=useState([]);
  const [analyzing,setAnalyzing]=useState(false);
  const [wsComplete,setWsComplete]=useState(false);
  const [wsError,setWsError]=useState("");
  const stepsEndRef=useRef(null);

  useEffect(()=>{stepsEndRef.current?.scrollIntoView({behavior:"smooth"})},[steps]);

  const studentQs=student?student.questionIds.map(id=>QB.find(q=>q.id===id)).filter(Boolean):[];
  const score=student?studentQs.reduce((s,q,i)=>s+(student.answers[i]===q.a?1:0),0):0;
  const topicData=student?studentQs.map((q,i)=>({...q,correct:student.answers[i]===q.a,selectedOpt:q.opts[student.answers[i]],correctOpt:q.opts[q.a]})):[];
  const plan=student?buildFoundationPlan(student,studentQs,student.answers):[];
  const wrongTopics=topicData.filter(t=>!t.correct);
  const rightTopics=topicData.filter(t=>t.correct);

  const activeProblemText=selectedProblem?.problem||(customProblem.trim()?customProblem:null);

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

  function resetWorkspace(){setSteps([]);setStepInput("");setWsComplete(false);setWsError("");}

  const T=(a)=>({padding:"0.55rem 1.3rem",borderRadius:50,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem",fontWeight:700,background:a?C.navy:"transparent",color:a?C.white:C.muted,transition:"all 0.2s"});

  const allTopics=[...new Set(QB.filter(q=>(!qbF.grade||q.g===+qbF.grade)&&(!qbF.subject||q.s===qbF.subject)).map(q=>q.t))];
  const filteredQB=QB.filter(q=>(!qbF.grade||q.g===+qbF.grade)&&(!qbF.subject||q.s===qbF.subject)&&(!qbF.diff||q.d===qbF.diff)&&(!qbF.topic||q.t===qbF.topic));

  return(
  <div style={{fontFamily:"'Nunito',system-ui,sans-serif",background:C.cream,minHeight:"100vh"}}>

    <div style={{background:C.navy,padding:"0 1.5rem"}}>
      <div style={{maxWidth:1160,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:58,flexWrap:"wrap",gap:"0.5rem",paddingTop:"0.25rem",paddingBottom:"0.25rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
          <div style={{width:30,height:30,borderRadius:7,background:C.teal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem"}}>✦</div>
          <span style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:700,color:C.white}}>TutorKlub <span style={{color:"#6de4d8"}}>Tutor Portal</span></span>
        </div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {[["dashboard","📊 Dashboard"],["workspace","🧮 AI Workspace"],["qbank","📚 Question Bank"]].map(([id,lbl])=>(
            <button key={id} style={T(tab===id)} onClick={()=>setTab(id)}>{lbl}</button>
          ))}
        </div>
      </div>
    </div>

    {/* ── DASHBOARD ── */}
    {tab==="dashboard"&&(
    <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>

      {!student&&(
      <div style={{background:C.white,borderRadius:18,padding:"2.5rem",maxWidth:460,margin:"0 auto",boxShadow:"0 4px 28px rgba(26,39,68,0.1)",textAlign:"center"}}>
        <div style={{fontSize:"2.5rem",marginBottom:"0.6rem"}}>🔒</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.45rem",color:C.navy,marginBottom:"0.5rem"}}>Open Student Results</h2>
        <p style={{fontSize:"0.85rem",color:C.muted,marginBottom:"1.5rem",lineHeight:1.7}}>Enter the student's Login ID to view their full assessment dashboard. Share results with parents during the demo session.</p>
        <input value={loginInput} onChange={e=>setLoginInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&loginInput.toUpperCase().includes("TK-")&&(setStudent(DEMO_STUDENT),setShowLocked(true))}
          placeholder="e.g. TK-AR4821"
          style={{width:"100%",padding:"0.75rem",border:"1.5px solid #e0ddd6",borderRadius:10,fontSize:"1rem",fontFamily:"monospace",textAlign:"center",boxSizing:"border-box",marginBottom:"0.75rem",outline:"none"}}/>
        <button onClick={()=>{if(loginInput.toUpperCase().includes("TK-")){setStudent(DEMO_STUDENT);setShowLocked(true);}}}
          style={{width:"100%",background:C.teal,color:C.white,border:"none",borderRadius:50,padding:"0.85rem",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(14,138,124,0.3)"}}>
          Open Dashboard →
        </button>
        <p style={{fontSize:"0.72rem",color:"#aaa",marginTop:"0.75rem"}}>Demo: type TK-AR4821 and press Enter</p>
      </div>)}

      {student&&showLocked&&(
      <div style={{background:C.white,borderRadius:18,padding:"2.5rem",maxWidth:460,margin:"0 auto",boxShadow:"0 4px 28px rgba(26,39,68,0.1)",textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:"0.6rem"}}>🔒</div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.45rem",color:C.navy,marginBottom:"0.5rem"}}>Results Ready: {student.childName}</h2>
        <p style={{fontSize:"0.85rem",color:C.muted,marginBottom:"1.5rem",lineHeight:1.7}}>Present to <strong>{student.parentName}</strong> when you are in the demo session. Click below to reveal all results.</p>
        <div style={{background:C.cream,borderRadius:12,padding:"1rem",marginBottom:"1.5rem",textAlign:"left"}}>
          {[["Student",student.childName],["Grade","Grade "+student.grade],["Subject",student.subject],["Date",student.date],["Login ID",student.loginId]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"0.35rem 0",borderBottom:"1px solid #f0ede8"}}>
              <span style={{fontSize:"0.78rem",color:C.soft,fontWeight:600}}>{k}</span>
              <span style={{fontSize:"0.78rem",color:C.navy,fontWeight:700,fontFamily:k==="Login ID"?"monospace":"inherit"}}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>setShowLocked(false)}
          style={{width:"100%",background:C.gold,color:C.white,border:"none",borderRadius:50,padding:"0.9rem",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(201,146,42,0.3)"}}>
          Reveal Results to Parent →
        </button>
        <button onClick={()=>{setStudent(null);setLoginInput("");}}
          style={{width:"100%",background:"transparent",color:"#aaa",border:"1px solid #e0ddd6",borderRadius:50,padding:"0.65rem",fontSize:"0.82rem",fontWeight:600,cursor:"pointer",marginTop:"0.5rem"}}>
          ← Back
        </button>
      </div>)}

      {student&&!showLocked&&(<>

        <div style={{background:C.navy,borderRadius:16,padding:"1.5rem 2rem",marginBottom:"1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#6de4d8",margin:"0 0 0.2rem"}}>Assessment Results — Demo Session</p>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"1.65rem",color:C.white,margin:0}}>{student.childName}</h1>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.8rem",margin:"0.25rem 0 0"}}>Grade {student.grade} · {student.subject} · {student.date}</p>
          </div>
          <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
            <ScoreGauge score={score} total={studentQs.length}/>
            <div>
              <div style={{background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"0.65rem 1rem",marginBottom:"0.4rem"}}>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",fontWeight:600}}>Login ID</div>
                <div style={{fontFamily:"monospace",fontWeight:700,color:"#6de4d8",fontSize:"0.95rem",letterSpacing:"0.1em"}}>{student.loginId}</div>
              </div>
              <button onClick={()=>{setStudent(null);setLoginInput("");setExpandedQ(null);setPlanView("plan");}}
                style={{background:"transparent",color:"rgba(255,255,255,0.35)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:50,padding:"0.35rem 0.9rem",fontSize:"0.72rem",cursor:"pointer",display:"block",width:"100%",textAlign:"center"}}>
                ← Close Dashboard
              </button>
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.25rem"}}>
          <StatCard icon="📋" val={studentQs.length} label="Questions" sub="Total answered"/>
          <StatCard icon="✅" val={score} label="Correct" color={C.green}/>
          <StatCard icon="📌" val={studentQs.length-score} label="Need Attention" color={C.red}/>
          <StatCard icon="📊" val={Math.round(score/studentQs.length*100)+"%"} label="Overall Score"
            color={score/studentQs.length>=0.8?C.green:score/studentQs.length>=0.6?C.amber:C.red}/>
        </div>

        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:C.navy,marginBottom:"0.85rem"}}>Topic-by-Topic Analysis &amp; AI Insights</h2>
        <div style={{display:"flex",flexDirection:"column",gap:"0.85rem",marginBottom:"1.5rem"}}>
          {topicData.map((item,i)=>{
            const open=expandedQ===i;
            return(
            <div key={i} style={{background:C.white,borderRadius:14,overflow:"hidden",boxShadow:"0 2px 10px rgba(26,39,68,0.06)",border:`2px solid ${item.correct?"#dcfce7":"#fee2e2"}`}}>
              <div style={{padding:"1.1rem 1.25rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"1rem",cursor:"pointer"}} onClick={()=>setExpandedQ(open?null:i)}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginBottom:"0.4rem",flexWrap:"wrap"}}>
                    <span style={{fontWeight:700,fontSize:"0.86rem",color:C.navy}}>Q{i+1}: {item.t}</span>
                    <Badge label={item.d} type="diff"/>
                    <Badge label={item.s} type="subj"/>
                  </div>
                  <p style={{fontSize:"0.82rem",color:C.muted,margin:0,lineHeight:1.6}}>{item.q}</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"0.35rem",flexShrink:0}}>
                  <span style={{background:item.correct?C.greenL:C.redL,color:item.correct?C.green:C.red,fontWeight:700,fontSize:"0.72rem",padding:"0.25rem 0.7rem",borderRadius:50}}>
                    {item.correct?"✓ Correct":"✗ Needs Attention"}
                  </span>
                  <span style={{fontSize:"0.7rem",color:"#bbb"}}>{open?"▲ Hide":"▼ Details"}</span>
                </div>
              </div>
              {open&&(
              <div style={{borderTop:"1px solid #f5f5f5",padding:"1.25rem"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"1rem"}}>
                  <div style={{background:"#f8f8f8",borderRadius:8,padding:"0.7rem"}}>
                    <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.25rem"}}>Student Answered</div>
                    <div style={{fontSize:"0.86rem",fontWeight:700,color:item.correct?C.green:C.red}}>{item.selectedOpt||"—"}</div>
                  </div>
                  <div style={{background:C.greenL,borderRadius:8,padding:"0.7rem"}}>
                    <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.25rem"}}>Correct Answer</div>
                    <div style={{fontSize:"0.86rem",fontWeight:700,color:C.green}}>{item.correctOpt}</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.65rem"}}>
                  {[
                    {bg:C.blueL,tc:C.blue,lc:"#1e40af",title:"🤖 AI Analysis",text:item.correct?`Strong grasp of "${item.concept}". This student is ready to tackle harder "${item.t}" questions at the next difficulty level.`:`Pattern detected: ${item.mistake}. This is a conceptual gap in "${item.concept}", not a careless mistake.`},
                    {bg:C.redL,tc:C.red,lc:"#991b1b",title:"⚠️ Mistake in Thinking",text:item.correct?"No errors. Thinking is sound and approach is correct.":`The student likely ${item.mistake.toLowerCase()}. This is a typical ${item.d}-level misconception in this topic.`},
                    {bg:C.greenL,tc:C.green,lc:"#166534",title:"💡 How to Correct It",text:item.correct?`Build on this strength. Introduce a harder ${item.t} problem next session to stretch their thinking.`:item.fix},
                  ].map((box,j)=>(
                    <div key={j} style={{background:box.bg,borderRadius:8,padding:"0.75rem"}}>
                      <div style={{fontSize:"0.65rem",fontWeight:700,color:box.tc,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.3rem"}}>{box.title}</div>
                      <p style={{fontSize:"0.78rem",color:box.lc,lineHeight:1.65,margin:0}}>{box.text}</p>
                    </div>
                  ))}
                </div>
              </div>)}
            </div>);
          })}
        </div>

        {/* ══ 10-DAY PRIVATE FOUNDATION PLAN ══ */}
        <div style={{background:C.white,borderRadius:18,boxShadow:"0 4px 24px rgba(26,39,68,0.09)",overflow:"hidden",marginBottom:"1.5rem"}}>
          <div style={{background:C.navy,padding:"1.25rem 1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem"}}>
            <div>
              <p style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#6de4d8",margin:"0 0 0.2rem"}}>Personalised Recommendation</p>
              <h3 style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:C.white,margin:0}}>10-Day Private Foundation Programme</h3>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.78rem",margin:"0.2rem 0 0"}}>8 focused private sessions → graduate to small group → full group class</p>
            </div>
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              {[["plan","📅 Session Plan"],["pathway","🛤️ Learning Pathway"],["insight","💡 Why Private First"]].map(([v,l])=>(
                <button key={v} onClick={()=>setPlanView(v)}
                  style={{padding:"0.42rem 0.9rem",borderRadius:50,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.74rem",fontWeight:700,background:planView===v?"rgba(14,138,124,0.5)":"rgba(255,255,255,0.08)",color:planView===v?"#6de4d8":"rgba(255,255,255,0.5)"}}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {planView==="plan"&&(
          <div style={{padding:"1.5rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"0.85rem"}}>
              {plan.map((s,i)=>{
                const isGrad=s.type==="Graduation";
                return(
                <div key={i} style={{borderRadius:12,overflow:"hidden",border:`2px solid ${s.col}22`,boxShadow:"0 2px 8px rgba(26,39,68,0.06)"}}>
                  <div style={{background:s.col,padding:"0.5rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:"0.67rem",fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:"0.07em"}}>DAY {s.day} · SESSION {s.session}</span>
                    <span style={{fontSize:"1rem"}}>{s.icon}</span>
                  </div>
                  <div style={{padding:"0.85rem",background:isGrad?C.navyD:C.white}}>
                    <div style={{fontSize:"0.72rem",fontWeight:700,color:isGrad?"#6de4d8":s.col,marginBottom:"0.25rem",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.type}</div>
                    <div style={{fontSize:"0.85rem",fontWeight:700,color:isGrad?C.white:C.navy,marginBottom:"0.3rem"}}>{s.topic}</div>
                    <div style={{fontSize:"0.76rem",color:isGrad?"rgba(255,255,255,0.6)":C.muted,lineHeight:1.6,marginBottom:"0.35rem"}}>{s.focus}</div>
                    <div style={{fontSize:"0.7rem",color:isGrad?"rgba(255,255,255,0.4)":C.soft,fontStyle:"italic"}}>{s.activity}</div>
                  </div>
                </div>);
              })}
            </div>
            <div style={{marginTop:"1.1rem",padding:"0.85rem 1rem",background:C.cream,borderRadius:10,display:"flex",gap:"0.6rem",alignItems:"flex-start",fontSize:"0.79rem",color:C.muted}}>
              <span>💤</span>
              <span><strong style={{color:C.navy}}>Rest days</strong> are built in. Students receive AI-generated practice sets automatically after each session — delivered to the parent's email within an hour of class ending.</span>
            </div>
          </div>)}

          {planView==="pathway"&&(
          <div style={{padding:"1.75rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
              {[
                {icon:"🧑‍💻",title:"Private 1-on-1",sub:"STARTING NOW",duration:"Days 1 – 10 · 8 Sessions",desc:`Full attention on ${student.childName}'s specific gaps. Tutor corrects misconceptions in real time using AI Workspace.`,detail:["Complete focus on identified gaps: "+wrongTopics.map(t=>t.t).join(", "),"Custom pace — no group pressure at all","AI Workspace for step-by-step error analysis","Correction of thinking patterns, not just answers","Practice sets generated automatically after every session"],col:C.red,badge:"Now"},
                {icon:"👥",title:"Small Group · 3 Students",sub:"AFTER SESSION 8",duration:"Weeks 2 – 3",desc:"Once foundations are solid, join 2 peers at the same level. Introduces collaboration while keeping it intimate.",detail:["3 students matched at same proficiency level","Peer learning begins naturally","Group problem-solving exercises","AI still tracks each student individually","Tutor can still address individual needs quickly"],col:C.amber,badge:"Next"},
                {icon:"🏫",title:"Full Group · 5 Students",sub:"AFTER 3 WEEKS",duration:"Ongoing",desc:"The full TutorKlub experience. Ready to thrive — not struggle — in a 5-student group class.",detail:["5-student class — our standard","Competitive and collaborative environment","Monthly parent review calls","AI benchmarks progress against grade level","Strong foundation prevents dropout"],col:C.teal,badge:"Goal"},
              ].map((stage,i)=>(
              <div key={i} style={{borderRadius:14,overflow:"hidden",border:`2px solid ${stage.col}22`,boxShadow:"0 2px 12px rgba(26,39,68,0.07)"}}>
                <div style={{background:stage.col,padding:"1rem",textAlign:"center"}}>
                  <div style={{fontSize:"1.7rem",marginBottom:"0.2rem"}}>{stage.icon}</div>
                  <div style={{fontSize:"0.62rem",fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em",marginBottom:"0.15rem"}}>{stage.sub}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:"1rem",fontWeight:700,color:C.white}}>{stage.title}</div>
                  <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.7)",marginTop:"0.2rem"}}>{stage.duration}</div>
                </div>
                <div style={{padding:"1rem",background:C.white}}>
                  <p style={{fontSize:"0.79rem",color:C.muted,lineHeight:1.65,marginBottom:"0.75rem"}}>{stage.desc}</p>
                  {stage.detail.map((d,j)=>(
                    <div key={j} style={{display:"flex",gap:"0.5rem",marginBottom:"0.4rem",fontSize:"0.74rem",color:C.muted,lineHeight:1.5}}>
                      <span style={{color:stage.col,fontWeight:700,flexShrink:0}}>→</span>{d}
                    </div>
                  ))}
                </div>
              </div>))}
            </div>
            <div style={{marginTop:"1.1rem",background:C.navy,borderRadius:12,padding:"1.1rem 1.5rem",display:"flex",gap:"0.75rem",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.3rem",flexShrink:0}}>📋</span>
              <p style={{fontSize:"0.81rem",color:"rgba(255,255,255,0.7)",lineHeight:1.75,margin:0}}>
                <strong style={{color:"#6de4d8"}}>TutorKlub Pathway for {student.childName}:</strong>{" "}
                8 private sessions targeting{" "}
                <strong style={{color:C.white}}>{wrongTopics.map(t=>t.t).join(", ")||"identified gaps"}</strong>
                {" "}→ 3-student group for 2 weeks → full 5-student Grade {student.grade} {student.subject} class.
                This structured pathway reduces dropout risk and produces measurably stronger long-term outcomes.
              </p>
            </div>
          </div>)}

          {planView==="insight"&&(
          <div style={{padding:"1.75rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.25rem"}}>
              {[
                {icon:"🔬",title:"The assessment reveals a specific gap, not general weakness",body:`${student.childName} answered ${score} out of ${studentQs.length} correctly. The ${wrongTopics.length} incorrect answer${wrongTopics.length!==1?"s":""} reveal${wrongTopics.length===1?"s":""} a specific conceptual gap in ${wrongTopics.map(t=>t.t).join(", ")}. In a group class, this gap would be hidden — the session moves on regardless.`},
                {icon:"🧠",title:"Private sessions repair thinking patterns, not just answers",body:"When a student applies a wrong procedure consistently, it means the underlying mental model is incorrect. That model needs to be carefully replaced — which requires individual attention, multiple worked examples, and real-time step-by-step analysis of their thinking. This is only possible 1-on-1."},
                {icon:"⏱️",title:"8 sessions in 10 days is the proven mastery threshold",body:"Mastery-based learning research shows that 8 focused practice sessions with immediate corrective feedback on a specific concept is sufficient to move a struggling student to confident fluency. We have designed the plan above specifically around this threshold."},
                {icon:"🚀",title:"Strong foundation → group class success, not anxiety",body:`Students who join group classes with unresolved gaps tend to fall further behind, lose confidence, and disengage. ${student.childName} will thrive — not just survive — in a group class after completing this foundation programme. Parents consistently report dramatically higher engagement.`},
                {icon:"💰",title:"The economics make sense for families",body:"8 private sessions followed by a lifetime of group classes is more cost-effective than months of group classes where the child is too confused to benefit. The private foundation is an investment that makes every subsequent group class session worthwhile."},
                {icon:"📈",title:"AI Workspace accelerates learning between sessions",body:"In private sessions, we use the AI Workspace so the student can show their working step by step and receive instant analysis of their thinking — not just their answer. This collapses weeks of passive learning into days of active correction."},
              ].map((item,i)=>(
              <div key={i} style={{background:C.cream,borderRadius:12,padding:"1.1rem"}}>
                <div style={{fontSize:"1.4rem",marginBottom:"0.5rem"}}>{item.icon}</div>
                <div style={{fontWeight:700,fontSize:"0.87rem",color:C.navy,marginBottom:"0.4rem"}}>{item.title}</div>
                <p style={{fontSize:"0.79rem",color:C.muted,lineHeight:1.7,margin:0}}>{item.body}</p>
              </div>
              ))}
            </div>
            <div style={{background:C.navy,borderRadius:12,padding:"1.35rem 1.5rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.5rem",flexShrink:0}}>📋</span>
              <div>
                <div style={{fontWeight:700,color:"#6de4d8",fontSize:"0.88rem",marginBottom:"0.4rem"}}>TutorKlub's Formal Recommendation for {student.childName}</div>
                <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.75)",lineHeight:1.8,margin:"0 0 0.6rem"}}>
                  We recommend <strong style={{color:C.white}}>8 private sessions over 10 days</strong> to address specific gaps in{" "}
                  <strong style={{color:C.white}}>{wrongTopics.map(t=>t.t).join(" and ")||"the assessed topics"}</strong>.
                  Each session uses our <strong style={{color:C.white}}>AI Workspace</strong> so the tutor can see {student.childName}'s exact thinking process and correct it in real time.
                  After Session 8, {student.childName} will be matched to a <strong style={{color:C.white}}>3-student group</strong> for 2 transitional weeks before joining the regular <strong style={{color:C.white}}>Grade {student.grade} {student.subject} group class</strong>.
                </p>
                <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
                  {[["📅","Starts","Within 48 hours"],["⏱️","Duration","10 days / 8 sessions"],["💻","Format","Zoom + AI Workspace"],["👥","Next step","3-student group class"]].map(([ic,lbl,val])=>(
                    <div key={lbl} style={{background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"0.55rem 0.85rem"}}>
                      <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",marginBottom:"0.15rem"}}>{ic} {lbl}</div>
                      <div style={{fontSize:"0.8rem",fontWeight:700,color:C.white}}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </>)}
    </div>)}

    {/* ── AI WORKSPACE ── */}
    {tab==="workspace"&&(
    <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>
      <div style={{marginBottom:"1.5rem"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:C.navy,marginBottom:"0.3rem"}}>AI Maths Workspace</h2>
        <p style={{fontSize:"0.85rem",color:C.muted,maxWidth:680,lineHeight:1.65}}>The student works through a problem one step at a time on their device. Claude analyses <strong>each step</strong> in real time — identifying mistakes in thinking, not just wrong answers, and showing exactly how to correct the reasoning.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"320px 1fr",gap:"1.5rem",alignItems:"flex-start"}}>
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

        <div>
          {!activeProblemText&&(
          <div style={{background:C.white,borderRadius:14,padding:"3rem 2rem",textAlign:"center",boxShadow:"0 2px 14px rgba(26,39,68,0.08)"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🧮</div>
            <h3 style={{fontFamily:"Georgia,serif",color:C.navy,marginBottom:"0.5rem"}}>Select a Problem to Begin</h3>
            <p style={{fontSize:"0.87rem",color:C.muted,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>The student enters their working one step at a time. Claude analyses each step for correctness and quality of mathematical reasoning — not just the final answer.</p>
          </div>)}

          {activeProblemText&&(<>
            <div style={{background:C.navy,borderRadius:14,padding:"1.25rem 1.5rem",marginBottom:"1rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"1rem"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#6de4d8",marginBottom:"0.35rem"}}>Problem</div>
                <p style={{fontFamily:"Georgia,serif",fontSize:"1.05rem",color:C.white,margin:0,lineHeight:1.5}}>{activeProblemText}</p>
                {selectedProblem&&<p style={{fontSize:"0.74rem",color:"rgba(255,255,255,0.4)",marginTop:"0.5rem",fontStyle:"italic"}}>Hint for student: {selectedProblem.hint}</p>}
              </div>
              <button onClick={resetWorkspace} style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:50,padding:"0.38rem 0.85rem",fontSize:"0.72rem",cursor:"pointer",flexShrink:0,fontFamily:"inherit"}}>Reset</button>
            </div>

            {steps.length>0&&(
            <div style={{background:C.white,borderRadius:14,padding:"1.25rem",marginBottom:"1rem",boxShadow:"0 2px 14px rgba(26,39,68,0.08)",maxHeight:440,overflowY:"auto"}}>
              <div style={{fontSize:"0.67rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.soft,marginBottom:"0.75rem"}}>Working — Step by Step Analysis</div>
              {steps.map((step,i)=>(
              <div key={step.id} style={{marginBottom:"1rem",borderRadius:12,overflow:"hidden",border:`2px solid ${step.isCorrect?"#dcfce7":"#fee2e2"}`}}>
                <div style={{background:step.isCorrect?C.greenL:C.redL,padding:"0.6rem 1rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <span style={{width:22,height:22,borderRadius:"50%",background:step.isCorrect?C.green:C.red,color:C.white,fontSize:"0.7rem",fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{i+1}</span>
                    <span style={{fontSize:"0.78rem",fontWeight:700,color:step.isCorrect?C.green:C.red}}>{step.stepLabel||`Step ${i+1}`}</span>
                  </div>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:step.isCorrect?C.green:C.red}}>{step.isCorrect?"✓ Correct":"✗ Error in Thinking"}</span>
                </div>
                <div style={{padding:"0.85rem 1rem",background:C.white}}>
                  <div style={{fontFamily:"monospace",fontSize:"0.92rem",color:C.navy,fontWeight:600,marginBottom:"0.65rem",padding:"0.5rem 0.75rem",background:C.cream,borderRadius:6,lineHeight:1.5}}>{step.text}</div>
                  <div style={{display:"grid",gridTemplateColumns:step.isCorrect?"1fr 1fr":"1fr 1fr 1fr",gap:"0.5rem",marginBottom:"0.5rem"}}>
                    <div style={{background:C.blueL,borderRadius:8,padding:"0.65rem"}}>
                      <div style={{fontSize:"0.62rem",fontWeight:700,color:C.blue,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>🤖 AI Analysis</div>
                      <p style={{fontSize:"0.76rem",color:"#1e40af",lineHeight:1.6,margin:0}}>{step.analysis}</p>
                    </div>
                    {!step.isCorrect&&step.mistakeExplanation&&(
                    <div style={{background:C.redL,borderRadius:8,padding:"0.65rem"}}>
                      <div style={{fontSize:"0.62rem",fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>⚠️ Mistake in Thinking</div>
                      <p style={{fontSize:"0.76rem",color:"#991b1b",lineHeight:1.6,margin:0}}>{step.mistakeExplanation}</p>
                    </div>)}
                    {!step.isCorrect&&step.correction&&(
                    <div style={{background:C.amberL,borderRadius:8,padding:"0.65rem"}}>
                      <div style={{fontSize:"0.62rem",fontWeight:700,color:C.amber,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>💡 Correct Approach</div>
                      <p style={{fontSize:"0.76rem",color:"#92400e",lineHeight:1.6,margin:0}}>{step.correction}</p>
                    </div>)}
                    {step.isCorrect&&step.nextHint&&(
                    <div style={{background:C.greenL,borderRadius:8,padding:"0.65rem"}}>
                      <div style={{fontSize:"0.62rem",fontWeight:700,color:C.green,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>→ Next Step Hint</div>
                      <p style={{fontSize:"0.76rem",color:"#166534",lineHeight:1.6,margin:0}}>{step.nextHint}</p>
                    </div>)}
                  </div>
                  <div style={{fontSize:"0.74rem",color:step.isCorrect?C.green:C.amber,fontStyle:"italic",fontWeight:600}}>"{step.encouragement}"</div>
                </div>
              </div>))}
              <div ref={stepsEndRef}/>
            </div>)}

            {wsComplete&&(
            <div style={{background:C.green,borderRadius:12,padding:"1.1rem 1.5rem",marginBottom:"1rem",display:"flex",gap:"0.75rem",alignItems:"center"}}>
              <span style={{fontSize:"1.7rem"}}>🎉</span>
              <div>
                <div style={{fontWeight:700,color:C.white,fontSize:"0.95rem"}}>Problem solved correctly — all steps verified!</div>
                <p style={{fontSize:"0.79rem",color:"rgba(255,255,255,0.85)",margin:"0.2rem 0 0"}}>Excellent step-by-step reasoning. The AI confirms every step of thinking was sound. Well done!</p>
              </div>
            </div>)}

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
    </div>)}

    {/* ── QUESTION BANK ── */}
    {tab==="qbank"&&(
    <div style={{maxWidth:1160,margin:"0 auto",padding:"2rem 1.5rem"}}>
      <div style={{marginBottom:"1.25rem"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:C.navy,marginBottom:"0.25rem"}}>Question Bank</h2>
        <p style={{fontSize:"0.85rem",color:C.muted}}>{QB.length} questions · Grades 1–5 · Math, English, Telugu, Hindi · Beginner / Intermediate / Advanced</p>
      </div>
      <div style={{background:C.white,borderRadius:12,padding:"1.1rem 1.25rem",marginBottom:"1.25rem",display:"flex",gap:"0.6rem",flexWrap:"wrap",alignItems:"flex-end",boxShadow:"0 2px 10px rgba(26,39,68,0.07)"}}>
        {[
          {label:"Grade",key:"grade",opts:[["","All Grades"],["1","Grade 1"],["2","Grade 2"],["3","Grade 3"],["4","Grade 4"],["5","Grade 5"]]},
          {label:"Subject",key:"subject",opts:[["","All Subjects"],["Math","Mathematics"],["English","English"],["Telugu","Telugu"],["Hindi","Hindi"]]},
          {label:"Difficulty",key:"diff",opts:[["","All Levels"],["Beginner","Beginner"],["Intermediate","Intermediate"],["Advanced","Advanced"]]},
        ].map(f=>(
        <div key={f.key}>
          <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.25rem"}}>{f.label}</div>
          <select value={qbF[f.key]} onChange={e=>setQbF(p=>({...p,[f.key]:e.target.value,topic:""}))}
            style={{padding:"0.5rem 0.8rem",border:"1.5px solid #e0ddd6",borderRadius:8,fontFamily:"inherit",fontSize:"0.82rem",color:C.navy,outline:"none",background:C.white,cursor:"pointer"}}>
            {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>))}
        {allTopics.length>0&&(
        <div>
          <div style={{fontSize:"0.65rem",fontWeight:700,color:"#aaa",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.25rem"}}>Topic</div>
          <select value={qbF.topic} onChange={e=>setQbF(p=>({...p,topic:e.target.value}))}
            style={{padding:"0.5rem 0.8rem",border:"1.5px solid #e0ddd6",borderRadius:8,fontFamily:"inherit",fontSize:"0.82rem",color:C.navy,outline:"none",background:C.white,cursor:"pointer",maxWidth:190}}>
            <option value="">All Topics</option>
            {allTopics.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>)}
        <div style={{fontSize:"0.78rem",color:C.soft,fontWeight:600,paddingBottom:"0.1rem"}}>{filteredQB.length} question{filteredQB.length!==1?"s":""}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"0.65rem"}}>
        {filteredQB.map(q=>{
          const open=qbOpen===q.id;
          return(
          <div key={q.id} style={{background:C.white,borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(26,39,68,0.06)",border:"1px solid #f0ede8"}}>
            <div style={{padding:"0.9rem 1.1rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"0.75rem",cursor:"pointer"}} onClick={()=>setQbOpen(open?null:q.id)}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:"0.35rem",flexWrap:"wrap",marginBottom:"0.4rem"}}>
                  <span style={{fontSize:"0.67rem",fontWeight:700,color:C.soft,background:C.greyL,borderRadius:4,padding:"0.12rem 0.45rem"}}>G{q.g}</span>
                  <Badge label={q.s} type="subj"/>
                  <Badge label={q.d} type="diff"/>
                  <span style={{fontSize:"0.67rem",color:"#aaa",background:"#f9f9f9",border:"1px solid #eee",borderRadius:4,padding:"0.12rem 0.45rem"}}>{q.t}</span>
                </div>
                <p style={{fontSize:"0.85rem",color:C.navy,fontWeight:600,margin:0,lineHeight:1.5}}>{q.q}</p>
              </div>
              <span style={{fontSize:"0.72rem",color:"#bbb",flexShrink:0,marginTop:"0.2rem"}}>{open?"▲":"▼"}</span>
            </div>
            {open&&(
            <div style={{borderTop:"1px solid #f5f5f5",padding:"1.1rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.45rem",marginBottom:"0.85rem"}}>
                {q.opts.map((opt,i)=>(
                <div key={i} style={{padding:"0.55rem 0.8rem",borderRadius:8,fontSize:"0.82rem",
                  background:i===q.a?C.greenL:"#f9f9f9",border:`1.5px solid ${i===q.a?"#16a34a":"#e8e8e8"}`,
                  color:i===q.a?"#15803d":C.navy,fontWeight:i===q.a?700:400}}>
                  {String.fromCharCode(65+i)}. {opt}{i===q.a&&" ✓"}
                </div>))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0.6rem"}}>
                {[{bg:C.blueL,tc:C.blue,lc:"#1e40af",h:"Concept Tested",t:q.concept},{bg:C.redL,tc:C.red,lc:"#991b1b",h:"Common Mistake",t:q.mistake},{bg:C.greenL,tc:C.green,lc:"#166534",h:"How to Correct It",t:q.fix}].map((b,j)=>(
                <div key={j} style={{background:b.bg,borderRadius:8,padding:"0.7rem"}}>
                  <div style={{fontSize:"0.62rem",fontWeight:700,color:b.tc,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.25rem"}}>{b.h}</div>
                  <p style={{fontSize:"0.77rem",color:b.lc,margin:0,lineHeight:1.6}}>{b.t}</p>
                </div>))}
              </div>
            </div>)}
          </div>);})}
      </div>
    </div>)}

  </div>);
}
