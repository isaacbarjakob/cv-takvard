export async function onRequestPost({request,env}){
  try{
    const body=await request.json();
    const clean=v=>String(v||'').replace(/[<>]/g,'').trim();
    const name=clean(body.namn), phone=clean(body.telefon), email=clean(body.epost), service=clean(body.tjanst), message=clean(body.meddelande);
    if(!name||!phone)return Response.json({error:'Namn och telefon krävs.'},{status:400});
    if(!env.RESEND_API_KEY)return Response.json({error:'E-posttjänsten är inte konfigurerad.'},{status:503});
    const html=`<h2>Ny offertförfrågan från C&V Takvård</h2><p><b>Namn:</b> ${name}</p><p><b>Telefon:</b> ${phone}</p><p><b>E-post:</b> ${email||'-'}</p><p><b>Tjänst:</b> ${service||'-'}</p><p><b>Meddelande:</b><br>${message||'-'}</p>`;
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL||'C&V Takvård <onboarding@resend.dev>',to:[env.CONTACT_TO_EMAIL||'cv_takvard@hotmail.com'],reply_to:email||undefined,subject:`Offertförfrågan: ${service||'C&V Takvård'}`,html})});
    if(!r.ok)return Response.json({error:'E-posttjänsten svarade med ett fel.'},{status:502});
    return Response.json({ok:true});
  }catch{return Response.json({error:'Ogiltig förfrågan.'},{status:400})}
}
