let allStories = [];
let filter = 'all';

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function render(){
  const list = document.getElementById('list');
  const count = document.getElementById('count');
  let items = allStories.slice();
  if(filter === 'picked') items = items.filter(s => s.picked);
  if(filter === '大事' || filter === '好玩') items = items.filter(s => s.category === filter);
  count.textContent = '共 ' + items.length + ' 条 · 更新到 ' + (document.getElementById('updated').dataset.updated || '');
  if(!items.length){ list.innerHTML = '<p>这里暂时没有故事。</p>'; return; }
  list.innerHTML = items.map(s => `
    <article class="card">
      <div class="meta"><span>${esc(s.date)}</span><span class="tag ${s.category==='好玩'?'fun':''}">${esc(s.category)}</span>${s.picked ? '<span class="picked">★ 想写这个</span>' : ''}</div>
      <h2>${esc(s.title)}</h2>
      <p>${esc(s.summary)}</p>
      <p class="angle">公众号角度：${esc(s.angle)}</p>
      ${s.note ? `<div class="note">核对提示：${esc(s.note)}</div>` : ''}
      <p class="source">来源：<a href="${esc(s.sourceUrl)}" target="_blank" rel="noopener">${esc(s.sourceName)}</a></p>
    </article>`).join('');
}

document.querySelectorAll('.filters button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filter = b.dataset.filter;
    render();
  });
});

fetch('stories.json?v=' + Date.now())
  .then(r => r.json())
  .then(d => {
    allStories = (d.stories || []).slice().sort((a,b) => String(b.date).localeCompare(String(a.date)) || (b.id - a.id));
    document.getElementById('updated').dataset.updated = d.updated || '';
    render();
  })
  .catch(() => {
    document.getElementById('list').innerHTML = '<p>故事加载失败，刷新一下页面再试。</p>';
  });

if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
document.getElementById('installBtn')?.addEventListener('click', async () => {
  alert('在手机浏览器里点“分享 / 更多”，选“添加到主屏幕”，这个网站就会像 App 一样出现在桌面上。');
});
