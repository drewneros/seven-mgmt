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
