// data/questionBank.js

// Colors needed only for buildFoundationPlan session colour coding
const _C = {
  red:"#dc2626", amber:"#d97706", teal:"#0e8a7c",
  purple:"#7c3aed", navy:"#1a2744",
};

export const QB = [
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

export const DEMO_STUDENT = {
  loginId:"TK-AR4821", childName:"Arjun Reddy", parentName:"Suresh Reddy",
  grade:3, subject:"Mathematics", email:"suresh@email.com",
  date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),
  questionIds:[18,20,21,23,24],
  answers:{0:0,1:3,2:0,3:2,4:0},
};

export const WORKSPACE_PROBLEMS = [
  {id:"wp1",grade:3,subject:"Math",topic:"Fractions",title:"Adding Fractions",problem:"Calculate 1/2 + 1/4. Show every step of your working.",hint:"Start by thinking — can you add these directly, or do you need to change something first?",difficulty:"Intermediate"},
  {id:"wp2",grade:3,subject:"Math",topic:"Multiplication",title:"24 x 5",problem:"Work out 24 x 5 step by step. Show how you break it down.",hint:"Try splitting 24 into 20 + 4 and multiply each part separately.",difficulty:"Intermediate"},
  {id:"wp3",grade:4,subject:"Math",topic:"Division",title:"Long Division: 135 / 5",problem:"Calculate 135 divided by 5. Show each step of your working.",hint:"How many times does 5 go into 13? Write that down first.",difficulty:"Intermediate"},
  {id:"wp4",grade:5,subject:"Math",topic:"Percentages",title:"Percentage Discount",problem:"A bag costs 800 rupees. There is a 25% discount. What is the final price? Show your steps.",hint:"Step 1: Find what 25% of 800 is. Step 2: Subtract from 800.",difficulty:"Intermediate"},
  {id:"wp5",grade:2,subject:"Math",topic:"Addition with Carrying",title:"67 + 48",problem:"Add 67 + 48. Show each step including any carrying.",hint:"Start with the units column. What do 7 and 8 add up to?",difficulty:"Beginner"},
  {id:"wp6",grade:5,subject:"Math",topic:"Algebra",title:"Solve the Equation",problem:"Solve: 3x + 4 = 19. Show every step of your working.",hint:"What do you need to do first to get 3x by itself?",difficulty:"Advanced"},
  {id:"wp7",grade:3,subject:"Math",topic:"Area & Perimeter",title:"Rectangle Area vs Perimeter",problem:"A rectangle is 8 cm long and 5 cm wide. Find BOTH its area AND its perimeter. Show working for each.",hint:"Area and perimeter use different operations - one multiplies, one adds.",difficulty:"Intermediate"},
  {id:"wp8",grade:4,subject:"Math",topic:"Division",title:"Word Problem Division",problem:"A teacher has 144 pencils to share equally among 12 students. How many does each student get? Show your working.",hint:"What operation do we use when sharing equally?",difficulty:"Beginner"},
];

export function buildFoundationPlan(student, questions, answers){
  const wrong=questions.map((q,i)=>({...q,correct:answers[i]===q.a})).filter(q=>!q.correct);
  const right=questions.map((q,i)=>({...q,correct:answers[i]===q.a})).filter(q=>q.correct);
  const sessions=[];
  let day=1;
  wrong.forEach((q,i)=>{
    sessions.push({day,session:sessions.length+1,type:"Foundation",topic:q.t,focus:"Reteach: "+q.concept,activity:"Visual teaching + worked examples by tutor",icon:"🎯",col:_C.red});
    day++;
    sessions.push({day,session:sessions.length+1,type:"Guided Practice",topic:q.t,focus:"Practise "+q.concept+" step by step",activity:"AI Workspace + tutor correction in real time",icon:"📝",col:_C.amber});
    day++;
    if(i<wrong.length-1){day++;}
  });
  right.forEach(q=>{
    if(sessions.length>=7) return;
    sessions.push({day,session:sessions.length+1,type:"Extension",topic:q.t,focus:"Advance "+q.concept+" to next difficulty level",activity:"Challenge problems + enrichment tasks",icon:"⭐",col:_C.teal});
    day++;
  });
  while(sessions.length<8){
    sessions.push({day,session:sessions.length+1,type:"Consolidation",topic:"Mixed Revision",focus:"Revisit all topics from this programme",activity:"Timed mixed practice with AI analysis",icon:"🔄",col:_C.purple});
    day++;
  }
  sessions.push({day:Math.min(day,10),session:sessions.length+1,type:"Graduation",topic:"Group Class Preview",focus:"Final assessment + group class experience",activity:"Mini group session with 2 other students at same level",icon:"🎓",col:_C.navy});
  return sessions.slice(0,9);
  }
