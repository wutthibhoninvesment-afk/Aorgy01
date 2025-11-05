
// View switching
const views = Array.from(document.querySelectorAll('.view'));
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.view;
    views.forEach(v=>v.classList.remove('active'));
    document.getElementById(`view-${target}`).classList.add('active');
  });
});

// Theme toggle + accent persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const accentPicker = document.getElementById('accentPicker');
const savedTheme = localStorage.getItem('theme');
const savedAccent = localStorage.getItem('accentColor');

if(savedTheme === 'light'){ root.classList.add('light'); }
if(savedAccent){ root.style.setProperty('--accent', savedAccent); accentPicker.value = savedAccent; }

themeToggle.addEventListener('click', ()=>{
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});
accentPicker.addEventListener('input', (e)=>{
  root.style.setProperty('--accent', e.target.value);
  localStorage.setItem('accentColor', e.target.value);
});

// Prompt to UI preview (mock)
const promptBox = document.getElementById('promptBox');
const runPrompt = document.getElementById('runPrompt');
const clearPrompt = document.getElementById('clearPrompt');
const preview = document.getElementById('uiPreview');

function renderPreviewFromPrompt(text){
  preview.innerHTML = '';
  // Basic parsing for sample keywords
  const wantsGold = /gold|ทอง/i.test(text);
  const wantsBTC  = /btc|bitcoin/i.test(text);
  const wantsCash = /cash|เงินสด/i.test(text);

  const blocks = [];
  if(wantsGold) blocks.push({title:'Hold Gold', body:'การ์ดตัวอย่างสำหรับทองคำ', ctas:['Buy Gold','Explain']});
  if(wantsBTC)  blocks.push({title:'Hold Bitcoin', body:'การ์ดตัวอย่างสำหรับบิตคอยน์', ctas:['Buy BTC','Explain']});
  if(wantsCash) blocks.push({title:'Hold Cash', body:'การ์ดตัวอย่างสำหรับเงินสด', ctas:['Add Cash','Explain']});
  if(blocks.length === 0) blocks.push({title:'Generic UI', body:'สร้างการ์ดจากไอเดียของคุณ', ctas:['Primary','Secondary']});

  blocks.forEach(b=>{
    const el = document.createElement('div');
    el.className = 'preview-card';
    el.innerHTML = \`
      <h4 class="preview-title">\${b.title}</h4>
      <p>\${b.body}</p>
      <div class="preview-cta">\${b.ctas.map(c=>'<button class="primary">'+c+'</button>').join('')}</div>
    \`;
    preview.appendChild(el);
  });
}

runPrompt.addEventListener('click', ()=>{
  renderPreviewFromPrompt(promptBox.value.trim());
});
clearPrompt.addEventListener('click', ()=>{
  promptBox.value='';
  preview.innerHTML='';
});

// Templates quick fill
document.querySelectorAll('.tpl').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const map = {
      gold: 'สร้างหน้า Hold Gold ที่มีการ์ดสรุป + ปุ่ม Buy Gold + โมดอล Explain',
      btc:  'สร้างหน้า Hold Bitcoin มีกราฟเล็ก + ปุ่ม Buy BTC + Explain',
      cash: 'สร้างหน้า Hold Cash มี % เป้าหมาย + ปุ่ม Add Cash + Explain'
    };
    promptBox.value = map[btn.dataset.tpl] || '';
    document.querySelector('[data-view="home"]').click();
  });
});

// Modal explain
const modal = document.getElementById('modal');
document.getElementById('explainBtn').addEventListener('click', ()=>{
  modal.hidden = false;
});
document.getElementById('closeModal').addEventListener('click', ()=>{
  modal.hidden = true;
});

// Notifications preference (no real push here; just local state)
document.getElementById('notifToggle').addEventListener('change', (e)=>{
  localStorage.setItem('notifPref', e.target.checked ? 'on' : 'off');
});
