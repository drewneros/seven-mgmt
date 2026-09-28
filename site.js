const b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
b?.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Close':'Menu'});
m?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded',false);b.textContent='Menu'}));
const f=document.getElementById('enquiry');
if(f){
  const h=new URLSearchParams(location.search).get('host');
  if(h){const p=document.getElementById('picks');p.value=h[0].toUpperCase()+h.slice(1)}
  f.addEventListener('submit',e=>{e.preventDefault();
    if(f.website.value)return;
    if(!f.checkValidity()){f.reportValidity();return}
    // TODO(backend): POST FormData(f) to the enquiry endpoint (email + WhatsApp alert + auto-reply). See ISSUES.md
    f.style.display='none';document.getElementById('ok').style.display='block';
  });
}

// ---- motion ----
(()=>{
  const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const sel='.sec-head>*,.grid .card,.pts>div,.steps li,.about>*,.apart .lead,.apart .eyebrow,.cta .wrap>*,.phead>*,.prof .gal>*,.prof .facts,.form>*,.hero p+*,.contact-alt,.prose>*';
  document.querySelectorAll(sel).forEach(el=>{
    if(el.closest('.hero'))return;
    const sibs=[...el.parentElement.children].filter(c=>c.matches(sel));
    el.style.setProperty('--i',Math.min(sibs.indexOf(el),6));
    el.classList.add('rv');
  });
  if(rm||!('IntersectionObserver' in window)){document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(e=>io.observe(e));
  // scroll progress
  const p=document.querySelector('.prog');let t=false;
  const upd=()=>{const h=document.documentElement;p.style.transform='scaleX('+(scrollY/Math.max(1,h.scrollHeight-innerHeight))+')';t=false};
  addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(upd)}},{passive:true});upd();
  // hero pointer parallax
  const hero=document.querySelector('.hero');
  if(hero&&matchMedia('(hover:hover)').matches)hero.addEventListener('pointermove',e=>{
    hero.style.setProperty('--mx',(e.clientX/innerWidth-.5).toFixed(3));hero.style.setProperty('--my',(e.clientY/innerHeight-.5).toFixed(3))});
  // card spotlight
  document.querySelectorAll('.ph').forEach(el=>el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect();el.style.setProperty('--x',(e.clientX-r.left)+'px');el.style.setProperty('--y',(e.clientY-r.top)+'px')}));
})();
