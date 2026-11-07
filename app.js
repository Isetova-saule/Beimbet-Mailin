
const data=window.MAYLIN_DATA||{};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const nav=$('#mainNav'),toggle=$('#mobileToggle'); if(toggle&&nav){toggle.addEventListener('click',()=>{let open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Мәзірді жабу':'Мәзірді ашу')});}
const modal=$('#modalBack'),modalContent=$('#modalBody'),modalClose=$('#modalClose');let lastFocus;
function showModal(markup){if(!modal)return;lastFocus=document.activeElement;modalContent.innerHTML=markup;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modalClose.focus()}
function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus?.()}
if(modalClose){modalClose.addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()})}
if($('#timelineButtons')){function renderTime(i){$('#timelineButtons').innerHTML=data.milestones.map((m,j)=>`<button type="button" class="timebtn ${i===j?'active':''}" data-time="${j}" aria-pressed="${i===j}"><strong>${m[0]}</strong><small>${m[3]}</small></button>`).join('');let m=data.milestones[i];$('#timelineDetail').innerHTML=`<span class="stamp">${m[0]} · ${i+1}/8</span><h3>${m[1]}</h3><p>${m[2]}</p>`;const panel=document.querySelector('.image-panel img'); const label=document.querySelector('.image-panel .image-label'); if(panel && m[4]){panel.src='assets/'+m[4]; panel.alt=m[1]+' кезеңіне арналған көркем иллюстрация';} if(label){label.textContent=m[5]||'ӨМІР ШЕЖІРЕСІ';}$$('[data-time]').forEach(b=>b.addEventListener('click',()=>renderTime(+b.dataset.time)))}renderTime(0)}
if($('#worksGrid')){
  function artSrc(w){return w[6]?'assets/'+w[6]:'assets/chapter_'+(w[5]+1)+'.webp'}
  function renderWorks(genre='Барлығы'){
    $('#worksGrid').innerHTML=data.works.map((w,i)=>({w,i})).filter(o=>genre==='Барлығы'||o.w[1]===genre).map(({w,i})=>{
      const intro=`<div class="work-image"><img loading="lazy" src="${artSrc(w)}" alt="«${w[0]}» туындысына арналған көркем иллюстрация"></div><div class="work-info"><span class="chip">${w[2]} · ${w[1]}</span><h3>${w[0]}</h3><p>${w[3]}</p><strong>${w[7]?'Кітап бетін ашу →':'Толығырақ оқу ↗'}</strong></div>`;
      return w[7]?`<a class="work-card featured-work" href="${w[7]}">${intro}</a>`:`<button type="button" class="work-card" data-work="${i}">${intro}</button>`
    }).join('');
    $$('[data-work]').forEach(btn=>btn.addEventListener('click',()=>{const w=data.works[+btn.dataset.work];showModal(`<img src="${artSrc(w)}" alt="«${w[0]}» шығармасына арналған иллюстрация"><span class="chip">${w[2]}</span><h2>${w[0]}</h2><p>${w[3]}</p><h3>Сыни талдау сұрағы</h3><p>${w[4]}</p><div class="notice">Шығарманы толық талдау үшін түпнұсқа мәтінмен жұмыс істеңіз.</div>`) }));
  }
  renderWorks();
  $$('[data-genre]').forEach(b=>b.addEventListener('click',()=>{$$('[data-genre]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderWorks(b.dataset.genre)}));
}
const values=[['Аналық мейірім','Күлпаштың қайғылы таңдауы қандай тарихи және әлеуметтік жағдайлармен байланысты? Жауабыңызды мәтіннен дәлелдеңіз.'],['Адалдық пен еркіндік','«Шұғаның белгісі» шығармасында махаббатқа қандай әлеуметтік кедергілер әсер етті?'],['Еңбек және қарапайымдылық','Мырқымбай образы арқылы автор қай әлеуметтік ортаның өмірін танытады?'],['Адамдық қарым-қатынас','«Қара шелек» әңгімесіндегі тұрмыстық тартыс қандай мінезді ашады?']];
$$('[data-value]').forEach(b=>b.addEventListener('click',()=>{let v=values[+b.dataset.value];$('#valueQuestion').innerHTML=`<span class="kicker">МӘТІНГЕ СҮЙЕНІП ДӘЛЕЛДЕ</span><h3>${v[0]}</h3><p>${v[1]}</p>`}))
const steps=[['ОҚЫ','Көркем мәтінмен танысып, негізгі ой мен кейіпкерлерді анықтау.'],['ЗЕРТТЕ','Жазушы дәуірін, тарихи контекст пен кейіпкер әрекетінің себептерін зерттеу.'],['ЖАҢҒЫРТ','Жасанды интеллект көмегімен мәтінге негізделген цифрлық иллюстрация немесе шығармашылық өнім дайындау.'],['ТЕКСЕР','Жасалған бейнені көркем мәтінмен салыстырып, ойдан қосылған немесе тарихи қате бөлшектерді анықтау.'],['ОЙ ТҮЙ','Шығармадағы рухани құндылықтарға жеке пікір білдіріп, дәлелді тұжырым жазу.']];
if($('#methodFlow')){function setStep(i){$('#methodFlow').innerHTML=steps.map((s,j)=>`<button type="button" class="step-button ${i===j?'active':''}" data-step="${j}" aria-pressed="${i===j}"><strong>${j+1}. ${s[0]}</strong><small>${['Мәтін','Контекст','Цифрлық өнім','Салыстыру','Қорытынды'][j]}</small></button>`).join('');$('#methodDetail').innerHTML=`<strong>${steps[i][0]}:</strong> ${steps[i][1]}`;$$('[data-step]').forEach(b=>b.addEventListener('click',()=>setStep(+b.dataset.step)))}setStep(0)}
const mistakes={phone:'Смартфон: ХХ ғасыр басындағы ауыл тұрмысына сәйкес келмейтін зат.',plastic:'Пластик бөтелке: көрсетілген тарихи ортаға тән емес заманауи бұйым.',light:'LED шам: 1922 жылғы ауыл үйінің тұрмысына сәйкес келмейтін жарық көзі.'};let detected=new Set();
function updateLab(){if(!$('#labFeedback'))return;$('#labFeedback').innerHTML=`Анықталған сәйкессіздік: <b>${detected.size} / 3</b><div style="margin-top:7px">${[...detected].map(x=>'✓ '+mistakes[x]).join('<br>')}</div>${detected.size===3?'<div style="color:#85e5b8;margin-top:8px">Жарайсыз! Енді бұл белгілерді мәтін мен тарихи дерекке сүйеніп салыстырыңыз.</div>':''}`;$$('[data-error]').forEach(b=>{let f=detected.has(b.dataset.error);b.classList.toggle('found',f);b.textContent=f?'✓':'?'})}
$$('[data-error]').forEach(b=>b.addEventListener('click',()=>{detected.add(b.dataset.error);updateLab()}));if($('#labReset'))$('#labReset').addEventListener('click',()=>{detected.clear();updateLab()});
const qs=[['Бейімбет Майлин қай жылы дүниеге келген?',['1884','1894','1904','1914'],1,'Жазушы 1894 жылы 15 қарашада дүниеге келген.'],['«Шұғаның белгісі» шығармасының жанры қандай?',['Мысал','Өлең','Хикаят','Ертегі'],2,'«Шұғаның белгісі» — хикаят.'],['«Күлпаш» шығармасындағы кейіпкерлер кімдер?',['Күлпаш, Мақтым, Қали','Шұға, Әбдірахман','Мырқымбай, Раушан','Талтаңбай, Шаншар'],0,'Әңгімеде Күлпаш, Мақтым және Қали тағдыры баяндалады.'],['Мырқымбай бейнесі нені танытады?',['Ғарыш әлемін','Қарапайым еңбек адамының тұрмысын','Теңіз саяхатын','Ертегі батырын'],1,'Мырқымбай — ауыл кедейінің әлеуметтік өмірін жинақтайтын бейне.'],['Жасанды интеллект жасаған суретті қалай бағалаймыз?',['Тек сыртқы әдемілігіне қарай','Тексермей қабылдаймыз','Мәтінмен және тарихи дерекпен салыстырамыз','Дұрыс деп қабылдаймыз'],2,'Цифрлық бейнеде ойдан қосылған бөлшектер болуы мүмкін.'],['Бейімбет Майлин қандай жанрларда еңбек етті?',['Тек поэзия','Поэзия, проза, драматургия','Тек фантастика','Тек публицистика'],1,'Жазушы поэзия, проза және драматургия салаларында елеулі мұра қалдырды.']];
let qi=0,score=0,chosen=null;
function drawQuiz(){if(!$('#quiz'))return;if(qi===qs.length){$('#quiz').innerHTML=`<div class="quiz-score">${score} / ${qs.length}</div><h3>${score>=5?'Тамаша нәтиже!':'Бөлімдерді қайталап көріңіз.'}</h3><p>Әдеби мұраға саяхатты аяқтадыңыз.</p><button type="button" class="btn gold" id="retryQuiz">Қайта бастау ↻</button>`;$('#retryQuiz').onclick=()=>{qi=0;score=0;chosen=null;drawQuiz()};return}let q=qs[qi];$('#quiz').innerHTML=`<div class="quiz-meta">СҰРАҚ ${qi+1} / ${qs.length}</div><div class="progress"><div style="width:${qi/qs.length*100}%"></div></div><h3 class="quiz-q">${q[0]}</h3><div class="answers">${q[1].map((a,i)=>`<button type="button" class="answer" data-answer="${i}">${i+1}. ${a}</button>`).join('')}</div><p class="quiz-why" id="quizWhy">Бір жауапты таңдаңыз.</p><button type="button" class="btn gold" id="nextQuiz" disabled>${qi===qs.length-1?'Нәтижені көру':'Келесі сұрақ →'}</button>`;$$('[data-answer]').forEach(b=>b.addEventListener('click',()=>{if(chosen!==null)return;chosen=+b.dataset.answer;if(chosen===q[2])score++;$$('[data-answer]').forEach(x=>{x.disabled=true;let n=+x.dataset.answer;if(n===q[2])x.classList.add('good');else if(n===chosen)x.classList.add('bad')});$('#quizWhy').textContent=(chosen===q[2]?'Дұрыс! ':'Қате жауап. ')+q[3];$('#nextQuiz').disabled=false}));$('#nextQuiz').addEventListener('click',()=>{qi++;chosen=null;drawQuiz()})}drawQuiz();



// «Күлпаш»: offline-friendly film slot. If media/kulpash.mp4 is installed,
// the browser plays it from the site. Selecting a local video previews it for this visit.
(()=>{
  const video=document.getElementById('kulpashVideo');
  const input=document.getElementById('kulpashVideoFile');
  const screen=document.getElementById('filmScreen');
  const status=document.getElementById('filmStatus');
  if(!video||!input||!screen)return;
  let currentObjectUrl=null;
  const ready=()=>{
    screen.classList.add('has-video');video.setAttribute('controls','controls');
    status.textContent='Бейнероликті ойнатуға болады';
  };
  video.addEventListener('loadedmetadata',ready);
  video.addEventListener('error',()=>{
    if(!screen.classList.contains('has-video'))status.textContent='Бейнероликті таңдап, осы беттен көре аласыз';
  });
  input.addEventListener('change',()=>{
    const file=input.files?.[0];if(!file)return;
    if(!(file.type.startsWith('video/')||/\.(mp4|webm|mov|m4v)$/i.test(file.name))){status.textContent='Бейне файл таңдалмады';return;}
    if(currentObjectUrl)URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl=URL.createObjectURL(file);
    video.pause();video.removeAttribute('poster');
    video.src=currentObjectUrl; video.load();
    status.textContent=file.name;
  });
  window.addEventListener('pagehide',()=>{if(currentObjectUrl)URL.revokeObjectURL(currentObjectUrl)});
})();
