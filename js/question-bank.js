// ============================================================================
// ENGLISH LEVEL QUEST — Question Bank (full expansion)
// Every example item given in the original brief, mapped into the schema
// defined in english-level-quest-architecture.md, across all three age
// groups (10-12 / 13-17 / adult) and all five CEFR levels (A1-C1).
//
// ageCode -> ageGroup: kid="10-12", teen="13-17", adult="adult"
// Where the brief gave age-neutral examples, the same content is reused
// across all three age groups (content IS already age-appropriate for all).
// Where the brief gave distinct per-age versions (B1/B2/C1 speaking), those
// exact distinct versions are used.
// "Secret diagnostic" items from §12 of the brief carry diagnosticWeight>=0.75.
// CEFR Topic Ladder items from §11 (travel/technology/education/money across
// all 5 levels) are included as additional speaking items.
// ============================================================================

const AGE_GROUP = { kid: "10-12", teen: "13-17", adult: "adult" };

const QUESTION_BANK = [

// ============================================================================
// A1
// ============================================================================

// --- A1 VOCABULARY (10 items x 3 ages) ---
...(function(){
  const items = [];
  const ageNum = { kid: "twelve", teen: "fifteen", adult: "thirty" };
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_a1_personalinfo_001`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"personal-information",concept:"age-expression",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:`"I am ${ageNum[age]} _____ old."`,options:["years","days","ages","times"],correctAnswer:0,
       explanation:"«Years old» — стандартний вираз для віку.",tags:["age","basic"]},
      {id:`${age}_a1_family_002`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"family",concept:"family-members",questionType:"odd-one-out",difficulty:1,diagnosticWeight:0.3,
       prompt:"Which word is a family member?",options:["cousin","kitchen","breakfast","lesson"],correctAnswer:0,
       explanation:"«Cousin» (двоюрідний брат/сестра) — член родини, решта слів не стосуються родини.",tags:["family","vocab"]},
      {id:`${age}_a1_home_003`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"home",concept:"rooms-and-places",questionType:"picture-choice",difficulty:1,diagnosticWeight:0.3,
       prompt:"🍳 Which picture shows a kitchen?",options:["🍳 kitchen","🛏️ bedroom","🚗 car","🌳 tree"],correctAnswer:0,
       explanation:"Кухня — місце, де готують їжу.",tags:["home","picture"]},
      {id:`${age}_a1_dailyroutine_004`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"daily-routine",concept:"breakfast-collocation",questionType:"vocab-in-context",difficulty:1,diagnosticWeight:0.3,
       prompt:'"I usually _____ breakfast at 8."',options:["have","make","play","go"],correctAnswer:0,
       explanation:"«Have breakfast» — стійке сполучення слів.",tags:["routine","collocation"]},
      {id:`${age}_a1_family_005`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"family",concept:"family-members",questionType:"odd-one-out",difficulty:1,diagnosticWeight:0.3,
       prompt:"Which word is different?",options:["mother","sister","uncle","teacher"],correctAnswer:3,
       explanation:"«Teacher» не є членом родини, решта слів — родичі.",tags:["family","vocab"]},
      {id:`${age}_a1_home_006`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"home",concept:"rooms-and-objects",questionType:"vocab-in-context",difficulty:1,diagnosticWeight:0.3,
       prompt:"Where do you usually keep milk and butter at home?",options:["fridge","wardrobe","bookshelf","garden"],correctAnswer:0,
       explanation:"Молоко і масло зберігають у холодильнику (fridge).",tags:["home","vocab"]},
      {id:`${age}_a1_feelings_007`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"basic-feelings",concept:"basic-feelings",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"I feel _____ because I want to sleep."',options:["tired","hungry","angry","funny"],correctAnswer:0,
       explanation:"«Tired» (втомлений) логічно пов'язаний із бажанням спати.",tags:["feelings"]},
      {id:`${age}_a1_weather_008`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"weather",concept:"weather-words",questionType:"picture-choice",difficulty:1,diagnosticWeight:0.3,
       prompt:"🌧️ What's the weather like?",options:["rainy","sunny","snowy","windy"],correctAnswer:0,
       explanation:"На картинці дощова погода.",tags:["weather","picture"]},
      {id:`${age}_a1_food_009`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"food",concept:"food-and-drinks",questionType:"vocab-in-context",difficulty:1,diagnosticWeight:0.3,
       prompt:"Which one can you drink?",options:["milk","bread","chicken","rice"],correctAnswer:0,
       explanation:"Молоко (milk) — напій, решта — тверда їжа.",tags:["food","drinks"]},
      {id:`${age}_a1_sports_010`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"vocabulary",topic:"sports",concept:"sports-vocabulary",questionType:"vocab-in-context",difficulty:1,diagnosticWeight:0.3,
       prompt:"Which activity uses a ball?",options:["football","reading","drawing","cooking"],correctAnswer:0,
       explanation:"У футбол грають м'ячем.",tags:["sports"]}
    );
  }
  return items;
})(),

// --- A1 GRAMMAR (10 items x 3 ages) ---
...(function(){
  const items = [];
  const sheAge = { kid: "11", teen: "16", adult: "29" };
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_a1_personalinfo_011`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"personal-information",concept:"to-be",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"I _____ from Ukraine."',options:["am","is","are","be"],correctAnswer:0,
       explanation:"З «I» використовуємо «am».",tags:["to-be"]},
      {id:`${age}_a1_personalinfo_012`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"personal-information",concept:"to-be",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:`"She _____ ${sheAge[age]} years old."`,options:["is","are","am","have"],correctAnswer:0,
       explanation:"З «she» використовуємо «is».",tags:["to-be"]},
      {id:`${age}_a1_family_013`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"family",concept:"present-simple",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"My brother _____ football every Saturday."',options:["plays","play","playing","is play"],correctAnswer:0,
       explanation:"Present Simple, 3-тя особа однини: «plays».",tags:["present-simple"]},
      {id:`${age}_a1_sports_014`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"sports",concept:"present-continuous",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"Look! They _____ football now."',options:["are playing","play","plays","playing"],correctAnswer:0,
       explanation:"Present Continuous для дії зараз: «are playing».",tags:["present-continuous"]},
      {id:`${age}_a1_hobbies_015`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"hobbies",concept:"can-ability",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"I _____ swim, but I can\'t drive."',options:["can","am","have","do"],correctAnswer:0,
       explanation:"«Can» для вираження вміння.",tags:["can"]},
      {id:`${age}_a1_home_016`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"home",concept:"there-is-are",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"There _____ two chairs in my room."',options:["are","is","am","be"],correctAnswer:0,
       explanation:"«Two chairs» — множина, тому «are».",tags:["there-is-are"]},
      {id:`${age}_a1_family_017`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"family",concept:"possessive-adjectives",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"This is _____ sister."',options:["my","me","I","mine"],correctAnswer:0,
       explanation:"Присвійний прикметник перед іменником: «my».",tags:["possessives"]},
      {id:`${age}_a1_animals_018`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"animals",concept:"basic-prepositions",questionType:"missing-word",difficulty:1,diagnosticWeight:0.3,
       prompt:'"The cat is _____ the table."',options:["under","every","very","much"],correctAnswer:0,
       explanation:"«Under» — прийменник місця.",tags:["prepositions"]},
      {id:`${age}_a1_dailyroutine_019`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"daily-routine",concept:"word-order",questionType:"sentence-builder",difficulty:2,diagnosticWeight:0.4,
       prompt:'Build: "usually / I / school / walk / to"',options:["I usually walk to school.","Usually I to walk school.","I walk usually to school.","To school usually I walk."],correctAnswer:0,
       explanation:"Порядок слів: підмет + частотний прислівник + дієслово + обставина.",tags:["word-order"]},
      {id:`${age}_a1_family_020`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"grammar",topic:"family",concept:"to-be-fix",questionType:"fix-the-message",difficulty:2,diagnosticWeight:0.4,
       prompt:'Fix: "He are my best friend."',options:["He is my best friend.","He am my best friend.","He be my best friend.","He was my best friend."],correctAnswer:0,
       explanation:"З «he» потрібно «is», не «are».",tags:["to-be"]}
    );
  }
  return items;
})(),

// --- A1 REAL ENGLISH (8 items x 3 ages) ---
...(function(){
  const items = [];
  const prompts = [
    {p:"What's your name?",opts:["My name is Ben.","Yes, please.","I'm fine, thanks.","It's half past three."]},
    {p:"Where are you from?",opts:["I'm from Ukraine.","I'm eleven.","Nice to meet you.","See you soon."]},
    {p:"How old are you?",opts:["I'm eleven.","I'm from Kyiv.","I'm a student.","I'm fine."]},
    {p:"Can I have some water, please?",opts:["Sure, here you are.","Yes, I am.","It's on the table.","No, thanks."]},
    {p:"Thank you!",opts:["You're welcome.","Yes, please.","Nice to meet you.","I'm sorry."]},
    {p:"How are you?",opts:["I'm fine, thanks.","I'm eleven.","It's Monday.","I'm from Lviv."]},
    {p:"What time is it?",opts:["It's half past three.","It's Monday.","It's sunny.","It's mine."]},
    {p:"Where is the bathroom?",opts:["It's over there.","It's half past three.","It's mine.","It's Monday."]}
  ];
  for (const age of ["kid","teen","adult"]) {
    prompts.forEach((item, i) => {
      items.push({id:`${age}_a1_reallife_${String(21+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"realLife",topic:"introductions",concept:"basic-social-exchanges",questionType:"natural-reply",difficulty:1,diagnosticWeight:0.3,
        prompt:`"${item.p}"`,options:item.opts,correctAnswer:0,
        explanation:"Лише один варіант є природною відповіддю на це питання.",tags:["real-life","social"]});
    });
  }
  return items;
})(),

// --- A1 READING (1 shared passage -> 3 questions, x 3 ages) ---
...(function(){
  const items = [];
  const profiles = {
    kid:  {name:"Ben",  age:"11", city:"London",     like:"basketball", ageOpts:["11","10","13","9"],  cityOpts:["London","Kyiv","Berlin","Madrid"],   likeOpts:["basketball","football","reading","music"]},
    teen: {name:"Alex", age:"15", city:"Manchester", like:"gaming",     ageOpts:["15","13","17","14"],  cityOpts:["Manchester","London","Kyiv","Berlin"],likeOpts:["gaming","basketball","reading","music"]},
    adult:{name:"Olga", age:"29", city:"Lviv",       like:"cooking",    ageOpts:["29","25","33","40"],  cityOpts:["Lviv","Kyiv","London","Berlin"],       likeOpts:["cooking","gaming","reading","football"]}
  };
  for (const age of ["kid","teen","adult"]) {
    const pr = profiles[age];
    const passage = `Hi! I'm ${pr.name}. I'm ${pr.age}. I live in ${pr.city} and I love ${pr.like}.`;
    items.push(
      {id:`${age}_a1_personalinfo_029`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"reading",topic:"personal-information",concept:"explicit-facts",questionType:"mini-reading",difficulty:1,diagnosticWeight:0.3,
       passage,prompt:`How old is ${pr.name}?`,options:pr.ageOpts,correctAnswer:0,
       explanation:"Відповідь прямо вказана в тексті.",tags:["reading","facts"]},
      {id:`${age}_a1_personalinfo_030`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"reading",topic:"personal-information",concept:"explicit-facts",questionType:"mini-reading",difficulty:1,diagnosticWeight:0.3,
       passage,prompt:`Where does ${pr.name} live?`,options:pr.cityOpts,correctAnswer:0,
       explanation:"Відповідь прямо вказана в тексті.",tags:["reading","facts"]},
      {id:`${age}_a1_hobbies_031`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"reading",topic:"hobbies",concept:"explicit-facts",questionType:"mini-reading",difficulty:1,diagnosticWeight:0.3,
       passage,prompt:`What does ${pr.name} love?`,options:pr.likeOpts,correctAnswer:0,
       explanation:"Відповідь прямо вказана в тексті.",tags:["reading","facts"]}
    );
  }
  return items;
})(),

// --- A1 LISTENING (1 example x 3 ages) ---
...(function(){
  const items = [];
  const scripts = {
    kid:  "I get up at seven and have breakfast with my sister.",
    teen: "I get up at seven and check my phone before breakfast.",
    adult:"I get up at seven and have coffee before work."
  };
  for (const age of ["kid","teen","adult"]) {
    items.push({id:`${age}_a1_dailyroutine_032`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"listening",topic:"daily-routine",concept:"concrete-information",questionType:"listening-snapshot",difficulty:1,diagnosticWeight:0.3,
      audioScript:scripts[age],prompt:"What does the speaker do at seven?",options:["gets up","goes to school","goes to bed","has dinner"],correctAnswer:0,
      explanation:"У записі сказано, що людина встає (gets up) о сьомій.",tags:["listening","routine"]});
  }
  return items;
})(),

// --- A1 SPEAKING (8 generic prompts x 3 ages) ---
...(function(){
  const items = [];
  const prompts = [
    {p:"What's your name?",fn:"introduce-self",fu:["Can you spell it?"]},
    {p:"Where do you live?",fn:"give-personal-information",fu:["What's it like there?"]},
    {p:"Tell me about your family.",fn:"describe-people",fu:["Who do you live with?"]},
    {p:"What's your favourite food?",fn:"express-preference",fu:["Why do you like it?"]},
    {p:"What do you do after school/work?",fn:"describe-routine",fu:["What time do you usually finish?"]},
    {p:"Describe your room.",fn:"describe-place",fu:["What's your favourite thing in it?"]},
    {p:"What can you see in this picture? 🏞️",fn:"describe-picture",fu:["What colours can you see?"]},
    {p:"What do you like doing at weekends?",fn:"express-preference",fu:["Who do you usually do it with?"]}
  ];
  for (const age of ["kid","teen","adult"]) {
    prompts.forEach((item, i) => {
      items.push({id:`${age}_a1_speaking_${String(33+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"A1",skill:"speaking",topic:"personal-information",
        function:item.fn,questionType:"voice-response",prompt:item.p,followUps:item.fu,targetDuration:15,tags:["speaking","a1"]});
    });
  }
  return items;
})(),

// ============================================================================
// A2
// ============================================================================

// --- A2 VOCABULARY (8 items x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_a2_travel_001`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"travel",concept:"travel-documents",questionType:"vocab-in-context",difficulty:2,diagnosticWeight:0.4,
       prompt:"You need this document to travel to another country.",options:["passport","ticket","luggage","visa"],correctAnswer:0,
       explanation:"«Passport» — документ для подорожей за кордон.",tags:["travel"]},
      {id:`${age}_a2_shopping_002`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"shopping",concept:"try-on",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"Can I _____ this jacket on?"',options:["try","wear","put","take"],correctAnswer:0,
       explanation:"«Try on» — приміряти одяг.",tags:["shopping"]},
      {id:`${age}_a2_health_003`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"health",concept:"illness-vocabulary",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"I\'ve got a terrible _____."',options:["headache","hunger","thirst","fever"],correctAnswer:0,
       explanation:"«Headache» — головний біль.",tags:["health"]},
      {id:`${age}_a2_personality_004`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"personality",concept:"personality-adjectives",questionType:"vocab-in-context",difficulty:2,diagnosticWeight:0.4,
       prompt:"This word describes someone quiet with new people.",options:["shy","friendly","curly","funny"],correctAnswer:0,
       explanation:"«Shy» — соромливий, тихий із новими людьми.",tags:["personality"]},
      {id:`${age}_a2_city_005`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"city",concept:"collocations",questionType:"collocation",difficulty:2,diagnosticWeight:0.5,
       prompt:'"_____ a bus"',options:["catch","take","make","do"],correctAnswer:0,
       explanation:"«Catch a bus» — стійке сполучення.",tags:["collocation","transport"]},
      {id:`${age}_a2_shopping_006`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"shopping",concept:"price-adjectives",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"This hotel costs €300 a night. It\'s very _____."',options:["expensive","cheap","curly","shy"],correctAnswer:0,
       explanation:"€300 за ніч — це дорого, тому «expensive».",tags:["shopping","money"]},
      {id:`${age}_a2_appearance_007`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"appearance",concept:"appearance-adjectives",questionType:"picture-choice",difficulty:2,diagnosticWeight:0.4,
       prompt:"👩‍🦱 Which word describes this hairstyle?",options:["curly","straight","short","bald"],correctAnswer:0,
       explanation:"На зображенні кучряве волосся.",tags:["appearance"]},
      {id:`${age}_a2_technology_008`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"vocabulary",topic:"technology",concept:"account-vocabulary",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"I forgot my _____, so I can\'t log into my account."',options:["password","luggage","journey","app"],correctAnswer:0,
       explanation:"«Password» потрібен для входу в облік.",tags:["technology"]}
    );
  }
  return items;
})(),

// --- A2 GRAMMAR (10 items x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_a2_travel_009`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"travel",concept:"past-simple",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"We _____ to Spain last summer."',options:["went","have gone","go","going"],correctAnswer:0,
       explanation:"Маркер минулого часу «last summer» вимагає Past Simple.",tags:["past-simple"]},
      {id:`${age}_a2_plans_010`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"plans",concept:"going-to",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"I\'m _____ visit my grandmother this weekend."',options:["going to","will to","go to","going"],correctAnswer:0,
       explanation:"«Going to» для запланованих дій.",tags:["future"]},
      {id:`${age}_a2_travel_011`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"travel",concept:"comparatives",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"This hotel is _____ than ours."',options:["cheaper","cheapest","more cheap","cheap"],correctAnswer:0,
       explanation:"Порівняльний ступінь коротких прикметників: «-er».",tags:["comparatives"]},
      {id:`${age}_a2_money_012`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"money",concept:"much-many",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"How _____ money have you got?"',options:["much","many","few","several"],correctAnswer:0,
       explanation:"«Money» — незлічуваний іменник, тому «much».",tags:["quantifiers"]},
      {id:`${age}_a2_health_013`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"health",concept:"should",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"You\'ve got a headache. You _____ rest."',options:["should","can to","mustn\'t to","should to"],correctAnswer:0,
       explanation:"Після модального дієслова «should» — інфінітив без «to».",tags:["modals"]},
      {id:`${age}_a2_weekends_014`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"weekends",concept:"first-conditional",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"If it rains, we _____ at home."',options:["will stay","stayed","would stay","staying"],correctAnswer:0,
       explanation:"First Conditional: if + Present Simple, will + base form.",tags:["conditionals"]},
      {id:`${age}_a2_travel_015`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"travel",concept:"present-perfect-basics",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"Have you ever _____ sushi?"',options:["tried","try","trying","tries"],correctAnswer:0,
       explanation:"Present Perfect: have + past participle.",tags:["present-perfect"]},
      {id:`${age}_a2_school_016`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"school",concept:"past-simple-fix",questionType:"fix-the-message",difficulty:2,diagnosticWeight:0.5,
       prompt:'Fix: "I didn\'t went to school yesterday."',options:["I didn't go to school yesterday.","I don't went to school yesterday.","I didn't went to school yesterday.","I not went to school yesterday."],correctAnswer:0,
       explanation:"Після «didn't» дієслово в базовій формі: «go».",tags:["past-simple"]},
      {id:`${age}_a2_travel_017`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"travel",concept:"word-order",questionType:"sentence-builder",difficulty:2,diagnosticWeight:0.4,
       prompt:'Build: "ever / have / been / you / abroad"',options:["Have you ever been abroad?","You have ever been abroad?","Ever have you been abroad?","Have ever you been abroad?"],correctAnswer:0,
       explanation:"Питання з Present Perfect: Have + підмет + ever + been...",tags:["word-order"]},
      {id:`${age}_a2_films_018`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"grammar",topic:"films",concept:"gerund-basics",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"I enjoy _____ films."',options:["watching","watch","to watching","watched"],correctAnswer:0,
       explanation:"Після «enjoy» використовується герундій (-ing).",tags:["gerund"]}
    );
  }
  return items;
})(),

// --- A2 REAL ENGLISH (3 items x 3 ages) ---
...(function(){
  const items = [];
  const dialogues = [
    {topic:"shopping", p:"Shop assistant: \"Can I help you?\"", opts:["Yes, I'm looking for a jacket.","Yes, I am tall.","No, I'm fifteen.","It's Monday."]},
    {topic:"travel",    p:"Hotel receptionist: \"Can I see your passport, please?\"", opts:["Sure, here you are.","Yes, I like it.","It's expensive.","I'm from here."]},
    {topic:"restaurants",p:"Waiter: \"Are you ready to order?\"", opts:["Yes, I'd like the soup, please.","Yes, I'm ready to go.","No, I don't have it.","It's delicious."]}
  ];
  for (const age of ["kid","teen","adult"]) {
    dialogues.forEach((d, i) => {
      items.push({id:`${age}_a2_${d.topic}_${String(19+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"realLife",topic:d.topic,concept:"everyday-situations",questionType:"natural-reply",difficulty:2,diagnosticWeight:0.4,
        prompt:d.p,options:d.opts,correctAnswer:0,
        explanation:"Лише одна відповідь природно підходить до ситуації.",tags:["real-life"]});
    });
  }
  return items;
})(),

// --- A2 SPEAKING (8 generic prompts x 3 ages) ---
...(function(){
  const items = [];
  const prompts = [
    {p:"Tell me about your last weekend.",fn:"narrate-past-events",fu:["What was the best part?"],topic:"weekends"},
    {p:"Tell me about your last holiday.",fn:"narrate-past-events",fu:["Would you go there again?"],topic:"holidays"},
    {p:"Where would you like to travel?",fn:"express-preference",fu:["Why there?"],topic:"travel"},
    {p:"What are you going to do next weekend?",fn:"talk-about-plans",fu:["Who are you doing it with?"],topic:"plans"},
    {p:"Describe your best friend.",fn:"describe-people",fu:["How did you meet?"],topic:"friends"},
    {p:"What apps do you use?",fn:"describe-habits",fu:["Which one do you use most?"],topic:"technology"},
    {p:"What should people do to stay healthy?",fn:"give-advice",fu:["Do you follow this advice yourself?"],topic:"health"},
    {p:"Do you prefer shopping online or in shops?",fn:"express-and-justify-preference",fu:["What's the biggest difference for you?"],topic:"shopping"}
  ];
  for (const age of ["kid","teen","adult"]) {
    prompts.forEach((item, i) => {
      items.push({id:`${age}_a2_speaking_${String(22+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"A2",skill:"speaking",topic:item.topic,
        function:item.fn,questionType:"voice-response",prompt:item.p,followUps:item.fu,targetDuration:20,tags:["speaking","a2"]});
    });
  }
  return items;
})(),

// ============================================================================
// B1
// ============================================================================

// --- B1 VOCABULARY (8 items x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_b1_friendships_001`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"friendships",concept:"phrasal-verbs-conflict",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"We argued yesterday, but we talked and _____."',options:["made up","broke up","gave up","woke up"],correctAnswer:0,
       explanation:"«Make up» — помиритися після суперечки.",tags:["phrasal-verb"]},
      {id:`${age}_b1_money_002`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"money",concept:"afford",questionType:"vocab-in-context",difficulty:3,diagnosticWeight:0.5,
       prompt:'"I don\'t have enough money for it." → "I _____ it."',options:["can't afford","can't lend","can't borrow","can't waste"],correctAnswer:0,
       explanation:"«Afford» — мати достатньо грошей на щось.",tags:["money"]},
      {id:`${age}_b1_friendships_003`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"friendships",concept:"look-forward-to",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"I\'m really _____ to seeing you next week."',options:["looking forward","looking forwards","looking ahead","looking back"],correctAnswer:0,
       explanation:"«Look forward to» — з нетерпінням чекати.",tags:["collocation"]},
      {id:`${age}_b1_emotions_004`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"emotions",concept:"emotion-adjectives",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"After weeks of worrying, she finally heard that she had passed. She felt _____."',options:["relieved","anxious","frustrated","disappointed"],correctAnswer:0,
       explanation:"«Relieved» — відчуття полегшення після тривоги.",tags:["emotions"]},
      {id:`${age}_b1_money_005`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"money",concept:"borrow-vs-lend",questionType:"missing-word",difficulty:3,diagnosticWeight:0.6,
       prompt:'"Can I _____ some money from you? I\'ll pay you back tomorrow."',options:["borrow","lend","waste","afford"],correctAnswer:0,
       explanation:"«Borrow from» — позичати У когось; «lend» — позичати комусь.",tags:["money","confusable"]},
      {id:`${age}_b1_decisions_006`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"decisions",concept:"make-a-decision",questionType:"collocation",difficulty:2,diagnosticWeight:0.4,
       prompt:'"I need to _____ a decision soon."',options:["make","do","take","create"],correctAnswer:0,
       explanation:"«Make a decision» — стійке сполучення.",tags:["collocation"]},
      {id:`${age}_b1_education_007`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"education",concept:"deal-with",questionType:"finish-the-chat",difficulty:3,diagnosticWeight:0.5,
       prompt:'A: "I\'m so stressed about exams."\nB: "Don\'t worry, you\'ll _____ it."',options:["deal with","give up on","look forward to","find out"],correctAnswer:0,
       explanation:"«Deal with» — впоратися з проблемою/стресом.",tags:["phrasal-verb"]},
      {id:`${age}_b1_emotions_008`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"vocabulary",topic:"emotions",concept:"emotion-adjectives",questionType:"vocab-in-context",difficulty:3,diagnosticWeight:0.5,
       prompt:"You lost your keys and you can't find them anywhere. You probably feel _____.",options:["frustrated","relieved","disappointed","anxious"],correctAnswer:0,
       explanation:"«Frustrated» — роздратований через невдалу ситуацію.",tags:["emotions"]}
    );
  }
  return items;
})(),

// --- B1 GRAMMAR (10 items x 3 ages, incl. one secret diagnostic) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_b1_friendships_009`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"friendships",concept:"present-perfect-vs-past-simple",questionType:"missing-word",difficulty:4,diagnosticWeight:0.85,
       prompt:'"I _____ her since primary school."',options:["have known","know","knew","am knowing"],correctAnswer:0,
       explanation:"Триваюча дія з «since» вимагає Present Perfect.",tags:["present-perfect","diagnostic"]},
      {id:`${age}_b1_friendships_010`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"friendships",concept:"present-perfect-vs-past-simple",questionType:"missing-word",difficulty:3,diagnosticWeight:0.6,
       prompt:'"I _____ her at a party three years ago."',options:["met","have met","meet","was meeting"],correctAnswer:0,
       explanation:"Конкретний момент у минулому («three years ago») → Past Simple.",tags:["past-simple"]},
      {id:`${age}_b1_personalgoals_011`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"personal-goals",concept:"second-conditional",questionType:"missing-word",difficulty:3,diagnosticWeight:0.6,
       prompt:'"If I _____ more free time, I\'d learn another language."',options:["had","have","would have","will have"],correctAnswer:0,
       explanation:"Second Conditional: if + Past Simple, would + base form.",tags:["conditionals"]},
      {id:`${age}_b1_friendships_012`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"friendships",concept:"relative-clauses",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"A good friend is someone _____ listens to you."',options:["who","which","where","whose"],correctAnswer:0,
       explanation:"«Who» для людей у підрядному означальному реченні.",tags:["relative-clauses"]},
      {id:`${age}_b1_socialmedia_013`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"social-media",concept:"passive-basics",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"Millions of photos _____ online every day."',options:["are posted","post","are posting","posted"],correctAnswer:0,
       explanation:"Пасивний стан: are + past participle.",tags:["passive"]},
      {id:`${age}_b1_friendships_014`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"friendships",concept:"reported-speech-basics",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"Mia said, \'I\'m tired.\'" → "Mia said that she _____ tired."',options:["was","is","were","has been"],correctAnswer:0,
       explanation:"У непрямій мові час зсувається назад: is → was.",tags:["reported-speech"]},
      {id:`${age}_b1_childhood_015`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"childhood",concept:"used-to",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"I _____ play outside every day when I was younger."',options:["used to","use to","was used","would used"],correctAnswer:0,
       explanation:"«Used to» для звичних дій у минулому, які вже не відбуваються.",tags:["used-to"]},
      {id:`${age}_b1_personalgoals_016`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"personal-goals",concept:"too-enough",questionType:"missing-word",difficulty:2,diagnosticWeight:0.4,
       prompt:'"The bag isn\'t big _____."',options:["enough","too","so","such"],correctAnswer:0,
       explanation:"«Enough» стоїть після прикметника.",tags:["too-enough"]},
      {id:`${age}_b1_friendships_017`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"friendships",concept:"present-perfect-vs-past-simple",questionType:"fix-the-message",difficulty:4,diagnosticWeight:0.85,
       prompt:'Fix: "I\'ve seen him yesterday."',options:["I saw him yesterday.","I have seen him yesterday.","I had seen him yesterday.","I was seeing him yesterday."],correctAnswer:0,
       explanation:"«Yesterday» вказує на конкретний момент у минулому → Past Simple, не Present Perfect.",tags:["present-perfect","diagnostic"]},
      {id:`${age}_b1_entertainment_018`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"entertainment",concept:"past-continuous-narrative",questionType:"finish-the-chat",difficulty:3,diagnosticWeight:0.5,
       prompt:'Finish: "While I was walking home, _____."',options:["it started to rain.","I walk to the shop.","I am walking fast.","it rains a lot."],correctAnswer:0,
       explanation:"Past Continuous + Past Simple для переривання дії: «it started to rain».",tags:["past-continuous"]}
    );
  }
  return items;
})(),

// --- B1 REAL ENGLISH (2 items x 3 ages) ---
...(function(){
  const items = [];
  const dialogues = [
    {topic:"comforting-a-friend", p:'Friend: "I failed my exam and I feel terrible."', opts:["I'm really sorry, do you want to talk about it?","That's great news!","I don't care.","You should have studied more, obviously."]},
    {topic:"politely-disagreeing", p:'"I don\'t really agree with you."', opts:["That's a fair point, but I see it a bit differently.","Whatever, I don't care what you think.","You're completely wrong.","OK, I agree with everything."]}
  ];
  for (const age of ["kid","teen","adult"]) {
    dialogues.forEach((d, i) => {
      items.push({id:`${age}_b1_${d.topic}_${String(19+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"realLife",topic:d.topic,concept:"functional-language",questionType:"choose-natural-reply",difficulty:3,diagnosticWeight:0.5,
        prompt:d.p,options:d.opts,correctAnswer:0,
        explanation:"Природна й доречна відповідь враховує тон і контекст ситуації.",tags:["real-life","functional"]});
    });
  }
  return items;
})(),

// --- B1 SPEAKING (5 distinct prompts per age group, as given) ---
...(function(){
  const items = [];
  const bySpeaking = {
    kid: ["Should children have homework every day?","Are video games good or bad for children?","What makes someone a good friend?","Should students be allowed to use phones at school?","What would you do if you could choose any future job?"],
    teen:["Can online friendships be real friendships?","Is social media more helpful or harmful?","Should parents limit teenagers' screen time?","Would you rather have an interesting job or a high salary?","What makes someone a good friend?"],
    adult:["Is working from home better than working in an office?","Is money necessary for happiness?","What makes a good workplace?","Would you move abroad for a better job?","How has technology changed communication?"]
  };
  for (const age of ["kid","teen","adult"]) {
    bySpeaking[age].forEach((p, i) => {
      items.push({id:`${age}_b1_speaking_${String(21+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"speaking",topic:"opinions",
        function:"express-and-justify-opinion",questionType:"opinion-challenge",prompt:p,followUps:["Why do you think that?","Can you give an example?"],targetDuration:30,tags:["speaking","b1"]});
    });
  }
  return items;
})(),

// --- B1 secret diagnostic: since vs for (A2->B1 discriminator, §12) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push({id:`${age}_b1_diagnostic_026`,ageGroup:AGE_GROUP[age],cefr:"B1",skill:"grammar",topic:"personal-information",concept:"since-vs-for",questionType:"missing-word",difficulty:4,diagnosticWeight:0.85,
      prompt:'"I\'ve lived here _____ 2022."',options:["since","for","from","during"],correctAnswer:0,
      explanation:"«Since» використовується з конкретною точкою в часі (2022), «for» — з тривалістю.",tags:["diagnostic","since-for"]});
  }
  return items;
})(),

// ============================================================================
// B2
// ============================================================================

// --- B2 VOCABULARY (8 items x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_b2_media_001`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"media",concept:"biased",questionType:"vocab-in-context",difficulty:4,diagnosticWeight:0.6,
       prompt:'"The article presents only one side of the issue." → This means the article is _____.',options:["biased","objective","accurate","credible"],correctAnswer:0,
       explanation:"«Biased» — упереджений, однобічний.",tags:["media"]},
      {id:`${age}_b2_media_002`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"media",concept:"come-across",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"I found this article by accident." → "I _____ this article."',options:["came across","brought up","turned down","relied on"],correctAnswer:0,
       explanation:"«Come across» — натрапити на щось випадково.",tags:["phrasal-verb"]},
      {id:`${age}_b2_career_003`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"career",concept:"turn-down",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"She rejected the job offer." → "She _____ the job offer."',options:["turned down","took for granted","came across","relied on"],correctAnswer:0,
       explanation:"«Turn down» — відмовити, відхилити пропозицію.",tags:["phrasal-verb"]},
      {id:`${age}_b2_relationships_004`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"relationships",concept:"take-for-granted",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"We often don\'t appreciate things until we lose them." → "We often _____ things until we lose them."',options:["take for granted","turn down","come across","rely on"],correctAnswer:0,
       explanation:"«Take for granted» — не цінувати щось, вважаючи це само собою зрозумілим.",tags:["collocation"]},
      {id:`${age}_b2_society_005`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"society",concept:"raise-awareness",questionType:"collocation",difficulty:4,diagnosticWeight:0.6,
       prompt:"Which collocation is correct?",options:["raise awareness","grow awareness","lift awareness","increase up awareness"],correctAnswer:0,
       explanation:"«Raise awareness» — стійке сполучення.",tags:["collocation"]},
      {id:`${age}_b2_consumerism_006`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"consumerism",concept:"misleading",questionType:"meaning-from-context",difficulty:4,diagnosticWeight:0.6,
       prompt:"The company's claims turned out to be _____ — the product didn't work as promised.",options:["misleading","reliable","biased","credible"],correctAnswer:0,
       explanation:"«Misleading» — такий, що вводить в оману.",tags:["meaning-from-context"]},
      {id:`${age}_b2_career_007`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"career",concept:"bring-up",questionType:"finish-the-chat",difficulty:4,diagnosticWeight:0.6,
       prompt:'A: "Why did she leave the meeting?"\nB: "Someone _____ a topic she didn\'t want to discuss."',options:["brought up","turned down","came across","relied on"],correctAnswer:0,
       explanation:"«Bring up» — піднімати тему в розмові.",tags:["phrasal-verb"]},
      {id:`${age}_b2_communication_008`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"communication",concept:"register",questionType:"formal-neutral-informal",difficulty:4,diagnosticWeight:0.6,
       prompt:"Which sentence is more formal?",options:["I would appreciate your prompt response.","Get back to me ASAP.","Hit me up soon.","Reply whenever, no rush."],correctAnswer:0,
       explanation:"Формальний регістр використовує повні ввічливі конструкції.",tags:["register"]}
    );
  }
  return items;
})(),

// --- B2 GRAMMAR (8 items x 3 ages, incl. secret diagnostic) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_b2_decisions_009`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"decisions",concept:"third-conditional",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"If I\'d known about the problem, I _____ differently."',options:["would have acted","would act","will act","had acted"],correctAnswer:0,
       explanation:"Third Conditional: if + Past Perfect, would have + past participle.",tags:["conditionals"]},
      {id:`${age}_b2_communication_010`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"communication",concept:"modal-deduction",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"He isn\'t answering. He _____ have forgotten his phone."',options:["might","must","can","should"],correctAnswer:0,
       explanation:"«Might have» виражає можливе, не впевнене припущення.",tags:["modals"]},
      {id:`${age}_b2_education_011`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"education",concept:"future-perfect",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"By this time next year, I _____ university."',options:["will have finished","will finish","have finished","finished"],correctAnswer:0,
       explanation:"Future Perfect для дії, завершеної до певного моменту в майбутньому.",tags:["future-perfect"]},
      {id:`${age}_b2_money_012`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"money",concept:"wish-past",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"I wish I _____ so much money yesterday."',options:["hadn't spent","didn't spend","wouldn't spend","haven't spent"],correctAnswer:0,
       explanation:"Wish + Past Perfect для жалю про минуле.",tags:["wish"]},
      {id:`${age}_b2_technology_013`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"technology",concept:"causative-have",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"I had my laptop _____ yesterday."',options:["repaired","repair","repairing","to repair"],correctAnswer:0,
       explanation:"Causative «have something done»: have + об'єкт + past participle.",tags:["causative"]},
      {id:`${age}_b2_privacy_014`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"privacy",concept:"reported-questions",questionType:"missing-word",difficulty:4,diagnosticWeight:0.6,
       prompt:'"\'Where do you live?\' she asked." → "She asked _____."',options:["where I lived","where did I live","where I live","where do I live"],correctAnswer:0,
       explanation:"У непрямому питанні порядок слів прямий, час зсувається назад.",tags:["reported-speech"]},
      {id:`${age}_b2_communication_015`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"communication",concept:"modal-deduction",questionType:"missing-word",difficulty:3,diagnosticWeight:0.5,
       prompt:'"He hasn\'t replied to any messages all day. He _____ be busy."',options:["must","can","should","would"],correctAnswer:0,
       explanation:"«Must» для сильного логічного припущення.",tags:["modals"]},
      {id:`${age}_b2_dailylife_016`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"daily-life",concept:"narrative-tenses",questionType:"fix-the-message",difficulty:4,diagnosticWeight:0.6,
       prompt:'Fix: "I was cooking dinner when the phone rang and I answer it."',options:["...and I answered it.","...and I am answering it.","...and I had answered it.","...and I answer it."],correctAnswer:0,
       explanation:"Усі дії в оповіданні мають бути послідовними в минулому часі: «answered».",tags:["narrative-tense"]}
    );
  }
  return items;
})(),

// --- B2 READING / USE OF ENGLISH (6 items x 3 ages) ---
...(function(){
  const items = [];
  const items6 = [
    {skill:"reading", concept:"implication", topic:"social-pressure", qType:"mini-reading",
     passage:"Ever since the new grading app launched, students check their marks every hour, even during lessons. Teachers have noticed a strange kind of relief whenever the app is down for maintenance.",
     prompt:"What is implied about the students?",
     options:["They feel anxious about constantly monitoring their grades.","They dislike using technology at school.","They prefer paper reports.","They never check the app."]},
    {skill:"reading", concept:"authors-attitude", topic:"consumerism", qType:"mini-reading",
     passage:"Review: 'Another gadget nobody really needed, dressed up as the next big thing. Sure, it looks sleek — but so did last year's model, and the one before that.'",
     prompt:"What is the author's attitude towards the product?",
     options:["Skeptical and slightly mocking","Enthusiastic and impressed","Completely neutral","Confused about how it works"]},
    {skill:"reading", concept:"summarising-argument", topic:"education", qType:"mini-reading",
     passage:"Standardised tests measure a narrow set of skills under artificial time pressure. They tell us little about creativity, collaboration or real-world problem-solving — yet schools are judged almost entirely by the results.",
     prompt:"Which statement best summarises the argument?",
     options:["Standardised tests overvalue a limited range of skills.","Standardised tests are the best way to judge schools.","Creativity cannot be taught.","Schools should remove all assessment."]},
    {skill:"reading", concept:"writers-purpose", topic:"technology", qType:"mini-reading",
     passage:"Take the humble alarm clock. It used to just wake you up. Now it tracks your sleep, syncs with your health app, and reminds you to breathe. I mention it only to show how far 'simple' devices have drifted.",
     prompt:"Why does the writer mention the alarm clock?",
     options:["As an example of how ordinary technology has become complex.","To recommend a specific brand.","To criticise people who sleep too little.","To explain how alarm clocks are made."]},
    {skill:"useOfEnglish", concept:"word-in-context", topic:"work-life-balance", qType:"missing-word",
     passage:"Many employees say they struggle to switch off after work, checking emails late into the evening. Experts argue that this constant _____ availability damages wellbeing over time.",
     prompt:"Which word best fits the context?",
     options:["digital","delicious","distant","delayed"]},
    {skill:"useOfEnglish", concept:"identifying-bias", topic:"media", qType:"vocab-in-context",
     passage:null,
     prompt:"Which headline sounds biased?",
     options:["'Reckless politicians gamble with our future again'","'City council votes 7-3 on new budget'","'Rainfall expected to continue through Friday'","'New library opens downtown this weekend'"]}
  ];
  for (const age of ["kid","teen","adult"]) {
    items6.forEach((it, i) => {
      items.push({id:`${age}_b2_${it.topic}_${String(17+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:it.skill,topic:it.topic,concept:it.concept,
        questionType:it.qType,difficulty:4,diagnosticWeight:0.6,
        ...(it.passage ? {passage:it.passage} : {}),
        prompt:it.prompt,options:it.options,correctAnswer:0,
        explanation:"Правильна відповідь випливає з контексту та тону тексту, а не з прямої цитати.",tags:["b2","reading"]});
    });
  }
  return items;
})(),

// --- B2 SPEAKING (5 distinct prompts per age group, as given) ---
...(function(){
  const items = [];
  const bySpeaking = {
    kid: ["Should schools ban phones during lessons?","Is competition good for children?","Should children have complete freedom online?","Will AI make school better?","Is it more important to win or enjoy an activity?"],
    teen:["Does social media put too much pressure on teenagers?","Should students use AI for homework?","Do influencers have too much influence?","Is failure necessary for success?","Should parents monitor teenagers' phones?"],
    adult:["Is remote work better for society?","Is AI likely to improve our lives?","How much privacy should people sacrifice for convenience?","Is advertising manipulative?","Should companies move to a four-day working week?"]
  };
  for (const age of ["kid","teen","adult"]) {
    bySpeaking[age].forEach((p, i) => {
      items.push({id:`${age}_b2_speaking_${String(23+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"speaking",topic:"argumentation",
        function:"develop-argument-with-examples",questionType:"opinion-challenge",prompt:p,
        followUps:["What's the strongest argument on the other side?","Can you give a real example?"],targetDuration:40,tags:["speaking","b2"]});
    });
  }
  return items;
})(),

// --- B2 secret diagnostics (§12: suggest+gerund, tone of "thanks for finally replying") ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_b2_diagnostic_028`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"grammar",topic:"communication",concept:"suggest-gerund-pattern",questionType:"fix-the-message",difficulty:5,diagnosticWeight:0.85,
       prompt:'Fix: "He suggested me to go home."',options:["He suggested going home.","He suggested me going home.","He suggested that I to go home.","He suggested to me go home."],correctAnswer:0,
       explanation:"«Suggest» не вживається з «to + об'єкт»; природна форма — «suggest doing» або «suggest that...».",tags:["diagnostic","suggest"]},
      {id:`${age}_b2_diagnostic_029`,ageGroup:AGE_GROUP[age],cefr:"B2",skill:"vocabulary",topic:"communication",concept:"tone-and-attitude",questionType:"tone-detector",difficulty:5,diagnosticWeight:0.8,
       prompt:'"Thanks for finally replying." What is the speaker\'s attitude probably expressing?',options:["Sarcasm and mild irritation","Sincere gratitude","Genuine surprise","Confusion"],correctAnswer:0,
       explanation:"«Finally» у цьому контексті зазвичай передає легке роздратування, а не щиру вдячність.",tags:["diagnostic","tone"]}
    );
  }
  return items;
})(),

// ============================================================================
// C1
// ============================================================================

// --- C1 VOCABULARY (1 item x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push({id:`${age}_c1_education_001`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"vocabulary",topic:"education",concept:"underlying-issue",questionType:"meaning-from-context",difficulty:5,diagnosticWeight:0.7,
      prompt:"The immediate problem may be falling grades, but the _____ issue is that students have lost motivation.",
      options:["underlying","compelling","widespread","arguable"],correctAnswer:0,
      explanation:"«Underlying» — глибинна, прихована причина, на відміну від очевидної проблеми.",tags:["c1","vocabulary"]});
  }
  return items;
})(),

// --- C1 GRAMMAR (5 items x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push(
      {id:`${age}_c1_innovation_002`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"grammar",topic:"innovation",concept:"inversion-rarely",questionType:"missing-word",difficulty:5,diagnosticWeight:0.85,
       prompt:'"Rarely _____ such a convincing argument."',options:["have I heard","I have heard","did I hear","I heard"],correctAnswer:0,
       explanation:"Після негативного прислівника на початку речення («Rarely») використовується інверсія.",tags:["inversion","diagnostic"]},
      {id:`${age}_c1_personalresponsibility_003`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"grammar",topic:"personal-responsibility",concept:"mixed-conditional",questionType:"missing-word",difficulty:5,diagnosticWeight:0.8,
       prompt:'"_____ I known about the consequences, I would have refused."',options:["Had","If","Should","Were"],correctAnswer:0,
       explanation:"Інверсія в умовному реченні замість «If I had known»: «Had I known».",tags:["mixed-conditional","inversion"]},
      {id:`${age}_c1_ethics_004`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"grammar",topic:"ethics",concept:"cleft-sentence",questionType:"missing-word",difficulty:5,diagnosticWeight:0.75,
       prompt:'"What concerns me most _____ the lack of transparency."',options:["is","are","was","were"],correctAnswer:0,
       explanation:"У cleft-реченні «what...» дієслово узгоджується з наступним підметом («the lack»).",tags:["cleft-sentence"]},
      {id:`${age}_c1_society_005`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"grammar",topic:"society",concept:"emphasis-structures",questionType:"sentence-builder",difficulty:5,diagnosticWeight:0.8,
       prompt:'Rewrite using emphasis: "Social media affects teenagers\' mental health the most."',
       options:["It is social media that affects teenagers' mental health the most.","Social media is affecting the most teenagers' mental health.","The most social media affects teenagers' mental health.","It affects social media teenagers' mental health the most."],correctAnswer:0,
       explanation:"Emphatic «It is... that...» виділяє підмет, на якому робиться наголос.",tags:["emphasis"]},
      {id:`${age}_c1_psychology_006`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"grammar",topic:"psychology",concept:"inversion-only-when",questionType:"missing-word",difficulty:5,diagnosticWeight:0.8,
       prompt:'"Only when she saw the results _____ how much work it had taken."',options:["did she realise","she realised","she did realise","had she realised"],correctAnswer:0,
       explanation:"Після «Only when...» на початку речення вживається інверсія з «did».",tags:["inversion"]}
    );
  }
  return items;
})(),

// --- C1 READING (1 item x 3 ages) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push({id:`${age}_c1_media_007`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"reading",topic:"media-manipulation",concept:"rhetorical-purpose",questionType:"mini-reading",difficulty:5,diagnosticWeight:0.75,
      passage:"Version A: 'About forty people gathered outside the building yesterday to express their views on the new policy.'\nVersion B: 'A furious mob descended on the building yesterday, screaming their outrage at a policy that threatens ordinary families.'",
      prompt:"Which linguistic choices make Version B more emotionally loaded?",
      options:["Loaded words like 'furious mob' and 'screaming their outrage' instead of neutral terms","The use of the past tense","The mention of a specific number of people","The use of the word 'policy'"],correctAnswer:0,
      explanation:"Емоційно забарвлена лексика («furious mob», «screaming their outrage») створює суб'єктивний, драматизований тон на відміну від нейтрального Version A.",tags:["c1","bias","register"]});
  }
  return items;
})(),

// --- C1 SPEAKING (distinct per age, as given) ---
...(function(){
  const items = [];
  const bySpeaking = {
    teen: ["To what extent should social media companies be responsible for users' wellbeing?","Does technology give young people more freedom or less?","Should education prioritise knowledge or critical thinking?","Can social pressure ever have positive effects?"],
    adult:["Should technological progress ever be deliberately slowed down?","To what extent should governments regulate social media?","Can truly objective journalism exist?","Where should personal freedom end and social responsibility begin?","Is technological convenience worth the loss of privacy?"],
    kid:  ["Should AI be allowed to make important decisions for people?","Is it fair for schools to treat every student exactly the same?","Does technology make childhood better or worse?","Should people always be allowed to say whatever they want online?"]
  };
  for (const age of ["kid","teen","adult"]) {
    bySpeaking[age].forEach((p, i) => {
      items.push({id:`${age}_c1_speaking_${String(8+i).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"speaking",topic:"ethics-and-technology",
        function:"argue-and-counter-argue",questionType:"opinion-challenge",prompt:p,
        followUps:["What would someone who disagrees with you say?","Is there a middle ground?"],targetDuration:50,tags:["speaking","c1"]});
    });
  }
  return items;
})(),

// --- C1 secret diagnostic: register appropriateness (§12) ---
...(function(){
  const items = [];
  for (const age of ["kid","teen","adult"]) {
    items.push({id:`${age}_c1_diagnostic_013`,ageGroup:AGE_GROUP[age],cefr:"C1",skill:"vocabulary",topic:"communication",concept:"register-appropriateness",questionType:"formal-neutral-informal",difficulty:5,diagnosticWeight:0.8,
      prompt:"Which sentence is most appropriate in a formal business email?",
      options:["I regret to inform you that the deadline has passed.","Sorry mate, you missed it.","Oops, too late!","You're too late, deal with it."],correctAnswer:0,
      explanation:"У формальному листі доречна ввічлива, нейтрально-офіційна формула, навіть якщо інші варіанти граматично правильні.",tags:["diagnostic","register"]});
  }
  return items;
})(),

// ============================================================================
// CEFR TOPIC LADDER — additional speaking items (§11)
// Same four topic families (travel, technology, education, money) at every
// level, increasing only linguistic/cognitive demand, exactly as in the brief.
// ============================================================================
...(function(){
  const items = [];
  const ladder = {
    travel: {
      A1:"Where do you go on holiday?",
      A2:"Tell me about your last holiday.",
      B1:"Do you prefer travelling alone or with other people? Why?",
      B2:"Does tourism cause more benefits or problems for popular destinations?",
      C1:"To what extent should governments restrict tourism in overcrowded destinations?"
    },
    technology: {
      A1:"What do you use your phone for?",
      A2:"Which apps do you use most?",
      B1:"Could you live without your phone for a week?",
      B2:"Does technology make people more connected or more isolated?",
      C1:"Has society become excessively dependent on digital technology?"
    },
    education: {
      A1:"What is your favourite subject?",
      A2:"What makes a good teacher?",
      B1:"Should students have homework every day?",
      B2:"Do exams accurately measure students' abilities?",
      C1:"Should standardised examinations remain a central part of education?"
    },
    money: {
      A1:"What can you buy in this shop?",
      A2:"What did you buy recently?",
      B1:"Is it better to save money or enjoy spending it?",
      B2:"Why do people often buy things they don't need?",
      C1:"To what extent is consumer behaviour shaped by social pressure rather than genuine need?"
    }
  };
  const targetDurationByLevel = {A1:15,A2:20,B1:30,B2:40,C1:50};
  let idx = 1;
  for (const topic of Object.keys(ladder)) {
    for (const level of ["A1","A2","B1","B2","C1"]) {
      for (const age of ["kid","teen","adult"]) {
        items.push({id:`${age}_${level.toLowerCase()}_ladder_${topic}_${String(idx).padStart(3,"0")}`,ageGroup:AGE_GROUP[age],cefr:level,skill:"speaking",topic:`topic-ladder-${topic}`,
          function:"discuss-topic-at-increasing-depth",questionType:"voice-response",prompt:ladder[topic][level],
          followUps:["Can you tell me more?"],targetDuration:targetDurationByLevel[level],tags:["speaking","topic-ladder",topic]});
      }
      idx++;
    }
  }
  return items;
})(),

// ============================================================================
// SUPPLEMENT — items added so every app section has material at every level.
// The brief gives explicit listening examples only for A1, reading examples
// only for A1/B2/C1, and real-life examples only up to B1. These follow the
// brief's own ladders: §16 (listening), §17 (reading), §9–10 (B2/C1 functions),
// and the C1 target-vocabulary list in §10.
// A string field is shared by all ages; an {kid,teen,adult} object varies by age.
// ============================================================================
...(function(){
  const items = [];
  const v = (x, age) => (x && typeof x === "object" && !Array.isArray(x)) ? x[age] : x;
  const sup = [
    // ---------- LISTENING (§16 ladder) ----------
    {lvl:"A1",skill:"listening",topic:"transport",concept:"times-and-numbers",type:"listening-snapshot",w:0.3,d:1,
     audio:"The bus to the city centre leaves at half past nine.",
     prompt:"When does the bus leave?",options:["9:30","9:15","10:30","7:30"],
     expl:"«Half past nine» = 9:30."},
    {lvl:"A1",skill:"listening",topic:"food",concept:"food-orders",type:"listening-snapshot",w:0.3,d:1,
     audio:"Can I have a cheese sandwich and an orange juice, please?",
     prompt:"What does the speaker want to drink?",options:["orange juice","apple juice","water","milk"],
     expl:"Мовець замовляє «an orange juice»."},
    {lvl:"A2",skill:"listening",topic:"travel",concept:"specific-information",type:"listening-snapshot",w:0.4,d:2,
     audio:"Attention, please. Flight B A two one four to Barcelona is now boarding at gate twelve. Passengers should have their passports and boarding passes ready.",
     prompt:"Where should passengers for Barcelona go?",options:["To gate 12","To gate 14","To the check-in desk","To the passport office"],
     expl:"В оголошенні сказано: «boarding at gate twelve»."},
    {lvl:"A2",skill:"listening",topic:"plans",concept:"main-idea",type:"listening-snapshot",w:0.4,d:2,
     audio:{kid:"Hi, it's Sam. I can't meet you at the cinema at six because I've got a lot of homework. Can we meet at eight instead?",
            teen:"Hi, it's Sam. I can't meet you at the cinema at six because I've got a lot of homework. Can we meet at eight instead?",
            adult:"Hi, it's Sam. I can't meet you at the cinema at six because I have to finish some work. Can we meet at eight instead?"},
     prompt:"Why is Sam calling?",options:["To change the meeting time","To cancel the film completely","To invite another friend","To buy the cinema tickets"],
     expl:"Сем не може о шостій і пропонує зустрітися о восьмій — він змінює час."},
    {lvl:"A2",skill:"listening",topic:"weather",concept:"basic-details",type:"listening-snapshot",w:0.4,d:2,
     audio:"Tomorrow will be cold and windy in the morning, but in the afternoon it will be sunny and warm.",
     prompt:"What will the weather be like in the afternoon?",options:["Sunny and warm","Cold and windy","Rainy and cold","Snowy"],
     expl:"«In the afternoon it will be sunny and warm»."},
    {lvl:"B1",skill:"listening",topic:"travel",concept:"sequence-and-outcome",type:"listening-snapshot",w:0.5,d:3,
     audio:"I was going to take the train, but there was a strike, so in the end my brother gave me a lift.",
     prompt:"How did the speaker travel in the end?",options:["By car","By train","By bus","On foot"],
     expl:"«My brother gave me a lift» — брат підвіз машиною."},
    {lvl:"B1",skill:"listening",topic:"food",concept:"sequence",type:"listening-snapshot",w:0.5,d:3,
     audio:"First, heat the oven. While it's heating up, mix the flour and the eggs. Only add the chocolate at the very end, otherwise it melts too quickly.",
     prompt:"When should you add the chocolate?",options:["At the very end","Before mixing the flour","While the oven heats up","Before you heat the oven"],
     expl:"«Only add the chocolate at the very end»."},
    {lvl:"B1",skill:"listening",topic:"everyday-life",concept:"speaker-intention",type:"listening-snapshot",w:0.6,d:3,
     audio:"Listen, I know you're busy, but if you've got five minutes later, I'd really appreciate a hand with these boxes.",
     prompt:"What does the speaker want?",options:["Some help carrying boxes","To borrow some boxes","Five minutes of silence","Someone to buy new boxes"],
     expl:"«I'd appreciate a hand» = мені потрібна допомога."},
    {lvl:"B2",skill:"listening",topic:"school-and-work",concept:"attitude",type:"listening-snapshot",w:0.65,d:4,
     audio:"Oh, brilliant. The printer's broken again. Just what I needed ten minutes before the deadline.",
     prompt:"How does the speaker really feel?",options:["Annoyed","Delighted","Relieved","Indifferent"],
     expl:"«Brilliant» тут іронічне — мовець роздратований."},
    {lvl:"B2",skill:"listening",topic:"films",concept:"implied-meaning",type:"listening-snapshot",w:0.65,d:4,
     audio:"Well, the film was beautifully shot, I'll give it that. Whether it needed to be three hours long is another question.",
     prompt:"What does the speaker imply about the film?",options:["It was too long","It was badly filmed","It was too short","It is their favourite film ever"],
     expl:"«Whether it needed to be three hours long is another question» = фільм задовгий."},
    {lvl:"B2",skill:"listening",topic:"decisions",concept:"attitude",type:"listening-snapshot",w:0.65,d:4,
     audio:"I'm not saying the new plan won't work. I'm just saying I'd like to see some numbers before we all get too excited.",
     prompt:"What is the speaker's attitude to the new plan?",options:["Cautious","Enthusiastic","Hostile","Uninterested"],
     expl:"Мовець не проти, але хоче доказів — це обережність."},
    {lvl:"C1",skill:"listening",topic:"media",concept:"irony",type:"listening-snapshot",w:0.8,d:5,
     audio:"Of course, the report is entirely accurate, provided you ignore the three pages of data it conveniently leaves out.",
     prompt:"What is the speaker suggesting about the report?",options:["It is deliberately selective","It is completely reliable","It is far too long","It contains too much data"],
     expl:"«Conveniently leaves out» — іронія: звіт навмисно пропускає невигідні дані."},
    {lvl:"C1",skill:"listening",topic:"communication",concept:"register",type:"listening-snapshot",w:0.75,d:5,
     audio:"I'd be grateful if you could look into this at your earliest convenience, as the delay is now affecting several people.",
     prompt:"In which situation would this most likely be said?",options:["A formal complaint to an organisation","A chat between close friends","A text to a sibling","An invitation to a party"],
     expl:"«I'd be grateful… at your earliest convenience» — формальний регістр скарги."},
    {lvl:"C1",skill:"listening",topic:"society",concept:"subtle-stance",type:"listening-snapshot",w:0.8,d:5,
     audio:{kid:"It's not that I object to a four-day school week in principle. It's more that nobody seems to have thought about who looks after the younger children on the fifth day.",
            teen:"It's not that I object to a four-day school week in principle. It's more that nobody seems to have thought about who looks after the younger children on the fifth day.",
            adult:"It's not that I object to a four-day working week in principle. It's more that nobody seems to have thought through who covers the fifth day."},
     prompt:"Which best describes the speaker's position?",options:["They accept the idea but doubt it has been planned properly","They reject the idea completely","They support it without any reservations","They think the idea has already failed"],
     expl:"«Not that I object… in principle; it's more that…» — згода з ідеєю, але сумнів щодо реалізації."},

    // ---------- READING (§17 ladder) ----------
    {lvl:"A2",skill:"reading",topic:"notices",concept:"basic-details",type:"mini-reading",w:0.4,d:2,
     passage:"SWIMMING POOL — Summer opening times\nMonday–Friday: 7:00–21:00\nSaturday & Sunday: 9:00–18:00\nChildren under 8 must be with an adult.\nThe café is closed for repairs until 15 July.",
     prompt:"When does the pool open on Saturday?",options:["At 9:00","At 7:00","At 18:00","At 21:00"],
     expl:"«Saturday & Sunday: 9:00–18:00»."},
    {lvl:"A2",skill:"reading",topic:"notices",concept:"basic-details",type:"mini-reading",w:0.4,d:2,
     passage:"SWIMMING POOL — Summer opening times\nMonday–Friday: 7:00–21:00\nSaturday & Sunday: 9:00–18:00\nChildren under 8 must be with an adult.\nThe café is closed for repairs until 15 July.",
     prompt:"What is closed until 15 July?",options:["The café","The swimming pool","The changing rooms","The children's pool"],
     expl:"«The café is closed for repairs until 15 July»."},
    {lvl:"A2",skill:"reading",topic:"friends",concept:"main-idea",type:"mini-reading",w:0.4,d:2,
     passage:"Hi Mia! Thanks for the birthday present — I love the book! Sorry I didn't reply yesterday, my phone was dead all day. Are you free on Saturday? We could go to the park. — Lena",
     prompt:"Why didn't Lena reply yesterday?",options:["Her phone had no battery","She was at the park","She didn't like the present","She was at a birthday party"],
     expl:"«My phone was dead all day» = телефон розрядився."},
    {lvl:"B1",skill:"reading",topic:"travel",concept:"reason",type:"mini-reading",w:0.5,d:3,
     passage:"I booked this hostel because it was cheap and close to the station, and I didn't expect much. The room was small, but it was spotless, and the staff went out of their way to help us when our train was cancelled. I'd stay here again without a second thought.",
     prompt:"Why did the writer choose the hostel?",options:["It was cheap and near the station","It had very large rooms","The staff were famous","A friend recommended it"],
     expl:"«Because it was cheap and close to the station»."},
    {lvl:"B1",skill:"reading",topic:"travel",concept:"meaning-from-context",type:"mini-reading",w:0.6,d:3,
     passage:"I booked this hostel because it was cheap and close to the station, and I didn't expect much. The room was small, but it was spotless, and the staff went out of their way to help us when our train was cancelled. I'd stay here again without a second thought.",
     prompt:"What does \"went out of their way\" mean in the text?",options:["Made a special effort","Left the building","Got lost","Refused to help"],
     expl:"«Go out of one's way» — докласти особливих зусиль."},
    {lvl:"B1",skill:"reading",topic:"community",concept:"writer-intention",type:"mini-reading",w:0.5,d:3,
     passage:"Dear members, because of the number of complaints about noise, the club will no longer allow music after 10 p.m. We hope this will help us stay on good terms with our neighbours.",
     prompt:"Why has the club changed the rule?",options:["To avoid problems with the neighbours","To save electricity","Because members asked for more music","Because the club is closing"],
     expl:"«Stay on good terms with our neighbours» — щоб не сваритися з сусідами."},
    {lvl:"C1",skill:"reading",topic:"technology",concept:"rhetorical-purpose",type:"mini-reading",w:0.75,d:5,
     passage:"We are told, again and again, that screen time is ruining childhood. Yet the same voices rarely ask what children actually did before screens — or whether every hour spent offline was spent climbing trees and reading classics.",
     prompt:"What is the writer's main purpose?",options:["To question an assumption behind a popular claim","To prove that screens are harmless","To describe children's hobbies in the past","To recommend some classic books"],
     expl:"Автор ставить під сумнів приховане припущення, на якому тримається популярна теза."},
    {lvl:"C1",skill:"reading",topic:"technology",concept:"implicit-stance",type:"mini-reading",w:0.75,d:5,
     passage:"We are told, again and again, that screen time is ruining childhood. Yet the same voices rarely ask what children actually did before screens — or whether every hour spent offline was spent climbing trees and reading classics.",
     prompt:"What does the writer imply about \"the same voices\"?",options:["They idealise the past","They have researched the topic carefully","They are mostly children","They agree with the writer"],
     expl:"Автор натякає, що критики романтизують минуле."},

    // ---------- REAL-LIFE ENGLISH (B1–C1 functions) ----------
    {lvl:"B1",skill:"realLife",topic:"clarification",concept:"asking-for-clarification",type:"choose-natural-reply",w:0.5,d:3,
     prompt:{kid:"Teacher: \"So, the deadline has been moved to Thursday.\"\nYou're not sure which Thursday. What do you say?",
             teen:"Teacher: \"So, the deadline has been moved to Thursday.\"\nYou're not sure which Thursday. What do you say?",
             adult:"Manager: \"So, the deadline has been moved to Thursday.\"\nYou're not sure which Thursday. What do you say?"},
     options:["Sorry, do you mean this Thursday or next week?","Great, so I'll send it next Friday then.","Thursday? I moved last year.","Why is Thursday a deadline day?"],
     expl:"Коли щось незрозуміло, природно уточнити: «Do you mean…?»"},
    {lvl:"B1",skill:"realLife",topic:"changing-plans",concept:"apologising-and-rearranging",type:"choose-natural-reply",w:0.5,d:3,
     prompt:"Friend: \"Are we still meeting at seven?\"\nSomething important has come up and you can't go. What do you say?",
     options:["I'm really sorry, something's come up. Could we do tomorrow instead?","Yes, see you at seven!","I'm sorry, I came up something.","Maybe. I don't know. Whatever."],
     expl:"Природна відповідь: вибачення + причина + нова пропозиція."},
    {lvl:"B2",skill:"realLife",topic:"restaurants",concept:"polite-complaint",type:"choose-natural-reply",w:0.6,d:4,
     prompt:"Your soup arrives cold at a restaurant. What's the most natural thing to say to the waiter?",
     options:["Excuse me, I'm afraid my soup's gone cold. Would you mind warming it up?","This soup is cold. Bring another one now.","Sorry for bothering you — the soup is perfect.","Excuse me, I'm afraid my soup is coldly."],
     expl:"«I'm afraid… Would you mind…?» — ввічлива, але чітка скарга."},
    {lvl:"B2",skill:"realLife",topic:"teamwork",concept:"softening-disagreement",type:"choose-natural-reply",w:0.6,d:4,
     prompt:{kid:"In a group project, a classmate suggests an idea you don't think will work. What do you say?",
             teen:"In a group project, a classmate suggests an idea you don't think will work. What do you say?",
             adult:"In a meeting, a colleague suggests an idea you don't think will work. What do you say?"},
     options:["I see where you're coming from, but I'm not sure it would work for everyone.","You're wrong, obviously.","I agree completely, but it's a bad idea.","I'm not agree with this idea."],
     expl:"«I see where you're coming from, but…» — м'яка незгода."},
    {lvl:"B2",skill:"realLife",topic:"social-situations",concept:"implied-meaning",type:"tone-detector",w:0.7,d:4,
     prompt:"\"Interesting choice,\" she said, looking at my new haircut. What does she probably mean?",
     options:["She doesn't really like it","She thinks it's fascinating","She wants the same haircut","She didn't notice it"],
     expl:"«Interesting choice» часто є ввічливим способом висловити несхвалення."},
    {lvl:"C1",skill:"realLife",topic:"invitations",concept:"diplomatic-refusal",type:"choose-natural-reply",w:0.75,d:5,
     prompt:{kid:"You're asked to lead an extra school club, but you're already far too busy. Which reply is most tactful?",
             teen:"You're asked to organise the school charity event, but you're already far too busy. Which reply is most tactful?",
             adult:"You're asked to speak at a conference, but you're already far too busy. Which reply is most tactful?"},
     options:["That's very kind of you to think of me — unfortunately I'm already stretched quite thin this month.","No thanks, not interested.","I would love to, so I can't.","Unfortunately, I am stretching thin."],
     expl:"Тактовна відмова: подяка + м'яке пояснення без прямого «ні»."},
    {lvl:"C1",skill:"realLife",topic:"presenting-ideas",concept:"hedging",type:"formal-neutral-informal",w:0.8,d:5,
     prompt:"You are presenting results you're not completely sure about. Which sentence is most appropriately cautious?",
     options:["The data would seem to suggest a link, although further research is needed.","The data proves a link one hundred per cent.","There's maybe some link, I guess, who knows.","The data is suggesting certainly a link."],
     expl:"«Would seem to suggest… although…» — академічне хеджування."},
    {lvl:"C1",skill:"realLife",topic:"sport",concept:"reading-between-the-lines",type:"tone-detector",w:0.8,d:5,
     prompt:"\"Well, that's one way of doing it,\" said the coach after watching the team's new tactic. What is implied?",
     options:["The coach doubts it is a good way","The coach is impressed","The coach invented the tactic","The coach didn't watch it"],
     expl:"«That's one way of doing it» — стримана критика."},

    // ---------- C1 VOCABULARY (target list in §10) ----------
    {lvl:"C1",skill:"vocabulary",topic:"debate",concept:"compelling-argument",type:"vocab-in-context",w:0.7,d:5,
     prompt:"\"Her speech was so _____ that even the sceptics changed their minds.\"",
     options:["compelling","controversial","widespread","underlying"],
     expl:"«Compelling» — переконливий."},
    {lvl:"C1",skill:"vocabulary",topic:"science",concept:"widespread-misconception",type:"collocation",w:0.7,d:5,
     prompt:"\"It is a _____ misconception that we only use 10% of our brains.\"",
     options:["widespread","compelling","credible","far-reaching"],
     expl:"«Widespread misconception» — поширена хибна думка."},
    {lvl:"C1",skill:"vocabulary",topic:"environment",concept:"far-reaching-consequences",type:"collocation",w:0.7,d:5,
     prompt:"\"The decision could have _____ consequences for the whole region.\"",
     options:["far-reaching","compelling","underlying","arguable"],
     expl:"«Far-reaching consequences» — далекосяжні наслідки."},
    {lvl:"C1",skill:"vocabulary",topic:"education",concept:"raise-concerns",type:"collocation",w:0.7,d:5,
     prompt:"\"The new rule has _____ concerns among parents.\"",
     options:["raised","risen","grown","lifted"],
     expl:"«Raise concerns» — викликати занепокоєння; «rise» — неперехідне дієслово."}
  ];
  const counters = {};
  for (const age of ["kid","teen","adult"]) {
    sup.forEach(s => {
      const key = `${age}_${s.lvl}_${s.skill}`;
      counters[key] = (counters[key] || 0) + 1;
      const item = {
        id:`${age}_${s.lvl.toLowerCase()}_sup_${s.skill.toLowerCase()}_${String(counters[key]).padStart(3,"0")}`,
        ageGroup:AGE_GROUP[age], cefr:s.lvl, skill:s.skill, topic:s.topic, concept:s.concept,
        questionType:s.type, difficulty:s.d, diagnosticWeight:s.w,
        prompt:v(s.prompt, age), options:s.options.slice(), correctAnswer:0,
        explanation:s.expl, tags:["supplement", s.skill]
      };
      if (s.passage) item.passage = v(s.passage, age);
      if (s.audio) item.audioScript = v(s.audio, age);
      items.push(item);
    });
  }
  return items;
})()

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = QUESTION_BANK;
}
