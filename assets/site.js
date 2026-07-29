const nav=document.getElementById('nav');
const menuBtn=document.querySelector('.menuBtn');
if(menuBtn){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-lock',open)});}
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');document.body.classList.remove('menu-lock')}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
fetch('/ll-admin.json',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{
 document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=d.contact.phone_display||d.contact.phone);
 document.querySelectorAll('[data-email]').forEach(e=>e.textContent=d.contact.email);
 document.querySelectorAll('[data-instagram]').forEach(e=>e.textContent=d.contact.instagram_handle);
}).catch(()=>{});
document.querySelectorAll('[data-contact-form]').forEach(form=>{
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const status=form.querySelector('.formStatus');
  const btn=form.querySelector('button[type="submit"]')||form.querySelector('button');
  status.textContent='Skickar…';
  btn.disabled=true;
  try{
   const res=await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
   const data=await res.json().catch(()=>({}));
   if(!res.ok)throw new Error(data.error||'Kunde inte skicka');
   status.textContent='Tack! Din förfrågan är skickad direkt till C&V Takvård.';
   form.reset();
  }catch(err){
   status.textContent='Formuläret kunde inte skickas just nu. Försök igen om en stund.';
  }finally{btn.disabled=false}
 });
});
