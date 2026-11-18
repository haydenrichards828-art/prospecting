// Demo copy: made up people, nothing leaves the phone, nothing is saved.
// Only loaded when the app is opened as demo.html or with #demo.
(function(){
  if (!window.DEMO_ON) return;

  // Numbers from the range ACMA keeps aside for films and TV, so even a slip can never ring a real person
  const FICT=["0491 570 156","0491 570 157","0491 570 158","0491 570 159","0491 570 110","0491 570 313","0491 570 737","0491 571 266","0491 571 491","0491 571 804","0491 572 549","0491 572 665","0491 572 983","0491 573 770","0491 573 087","0491 574 118","0491 574 632","0491 575 254","0491 575 789","0491 576 398","0491 576 801","0491 577 426","0491 577 644","0491 578 957","0491 578 148","0491 578 888","0491 579 212","0491 579 760","0491 579 455"];
  const fict=i=>FICT[Math.abs(i)%FICT.length];
  const isF=p=>FICT.includes(p);

  // Never actually ring or text anyone from the demo
  document.addEventListener("click",e=>{ const a=e.target.closest('a[href^="tel:"],a[href^="sms:"]'); if(!a) return;
    e.preventDefault(); const t=/^tel:/.test(a.getAttribute("href"));
    toast(t?"Demo: this would ring them now. Pick what happened below.":"Demo: this would open your texts"); }, true);
  window.openUrl=u=>toast(/^tel:/.test(u)?"Demo: this would ring them now":"Demo: this would open your texts");
  window.callingAllowed=()=>true;

  let seq=1000;
  const nowISO=()=>new Date().toISOString();
  const today=()=>new Date().toLocaleDateString("en-CA",{timeZone:"Australia/Sydney"});
  const dayOf=iso=>new Date(iso).toLocaleDateString("en-CA",{timeZone:"Australia/Sydney"});
  const LBL={sold:"Sold",on_market:"On the market",dignam_listed:"Listed with Dignam",rented:"Rented",rented_dignam:"Dignam manages the rental",recent_buyer:"Bought recently",wrong_names:"Wrong names",wrong_reason:"Wrong reason shown",other:"Something else"};
  const DAYS={sold:730,recent_buyer:730,wrong_names:90,wrong_reason:1,other:1,rented:null,on_market:null,dignam_listed:null,rented_dignam:null};

  function setup(D){
    if(D._full) return; D._full=true;
    D.log=[]; D.removed=[]; D.cbGone=new Set();
    D.seedCB=[{call_id:1,callback_at:new Date(Date.now()+36e5).toISOString(),notes:"Wants a price guide first",property_id:201,owner_name:"Tony Marino",phone:fict(3),street_address:"22 Hill St",suburb:"Bulli",bedrooms:3,baths:1,cars:1},
              {call_id:2,callback_at:new Date(Date.now()+3*864e5).toISOString(),notes:"Ring after the kids are back at school",property_id:202,owner_name:"Grace Holloway",phone:fict(4),street_address:"9 Cliff Pde",suburb:"Thirroul",bedrooms:4,baths:2,cars:2}];
    D.rows.forEach((r,i)=>{ if(r.phone) r.phone=fict(i); r.bedrooms=r.bedrooms??(2+i%4); r.baths=r.baths??(1+i%3); r.cars=r.cars??(i%3); });
  }
  function fixPhones(D){
    (D.leads||[]).forEach((l,i)=>{ if(l.phone&&!isF(l.phone)) l.phone=fict(i+7); });
    (D.pipe||[]).forEach((p,i)=>{ if(p.phone&&!isF(p.phone)) p.phone=fict(i+13); });
    (D.msgs||[]).forEach((m,i)=>{ if(m.properties&&m.properties.phone&&!isF(m.properties.phone)) m.properties.phone=fict(i+19); });
  }
  const person=(D,pid)=>D.rows.find(x=>x.property_id===pid)||D.seedCB.find(x=>x.property_id===pid)||{};
  const liveCBs=D=>{
    const seeded=D.seedCB.filter(c=>!D.cbGone.has(c.call_id));
    const mine=D.log.filter(c=>c.outcome==="call_back"&&c.callback_at&&!D.cbGone.has(c.id)).map(c=>{ const p=person(D,c.property_id);
      return {call_id:c.id,callback_at:c.callback_at,notes:c.notes,property_id:c.property_id,owner_name:p.owner_name,phone:p.phone,street_address:p.street_address,suburb:p.suburb}; });
    // only the latest booking per person counts
    const by={}; [...seeded,...mine].forEach(c=>{ if(!by[c.property_id]||c.call_id>by[c.property_id].call_id) by[c.property_id]=c; });
    return Object.values(by).sort((a,b)=>a.callback_at.localeCompare(b.callback_at));
  };

  window.demoApi=(function(orig){ return function(action,body){
    body=body||{};
    if(action==="undo_outcome"){ const D=window.__demo; setup(D);
      const c=D.log.find(x=>x.id===body.call_id);
      if(!c){ D.cbGone.add(body.call_id); return {ok:true}; }
      D.log=D.log.filter(x=>x!==c);
      D.calls=Math.max(0,D.calls-1); if(c.outcome!=="no_answer") D.connected=Math.max(0,D.connected-1); if(c.outcome==="appraisal") D.appr=Math.max(0,D.appr-1);
      if(c.pipe) D.pipe=D.pipe.filter(p=>p!==c.pipe);
      D.removed=D.removed.filter(x=>x.ref!=="c"+c.id);
      return {ok:true}; }

    const r=orig(action,body); const D=window.__demo; if(!D) return r; setup(D); fixPhones(D);

    switch(action){
      case "list": {
        const gone=new Set(D.removed.map(x=>x.property_id)), t=today();
        r.rows=(r.rows||[]).filter(x=>!gone.has(x.property_id)).map(x=>{
          const mine=D.log.filter(c=>c.property_id===x.property_id).sort((a,b)=>b.id-a.id);
          const todays=mine.find(c=>dayOf(c.at)===t);
          return {...x,today_outcome:todays?todays.outcome:null,history:[...mine.map(c=>({id:c.id,at:c.at,outcome:c.outcome,notes:c.notes,by:"You"})),...(x.history||[])]}; });
        return r; }
      case "outcome": {
        const id=++seq, p=person(D,body.property_id);
        const c={id,property_id:body.property_id,outcome:body.outcome,callback_at:body.callback_at||null,notes:body.notes||null,at:nowISO()};
        D.log.push(c);
        if(body.outcome==="appraisal"||body.outcome==="listed"){
          if(body.outcome==="listed"){ c.pipe={property_id:p.property_id||id,stage:"listed",source:"calls",updated_at:nowISO(),owner_name:p.owner_name,phone:p.phone,street_address:p.street_address,suburb:p.suburb}; D.pipe.unshift(c.pipe); }
          else c.pipe=D.pipe[0]; }
        if(body.outcome==="do_not_call") D.removed.unshift({ref:"c"+id,property_id:body.property_id,owner_name:p.owner_name,street_address:p.street_address,suburb:p.suburb,reason:"do not call",until:null});
        return {...r,id}; }
      case "callbacks": { const end=today(); return {rows:liveCBs(D).filter(c=>dayOf(c.callback_at)<=end)}; }
      case "upcoming_callbacks": return {rows:liveCBs(D)};
      case "report_issue": { const p=person(D,body.property_id), d=DAYS[body.kind];
        D.removed.unshift({ref:"r"+(++seq),property_id:body.property_id,owner_name:p.owner_name,street_address:p.street_address,suburb:p.suburb,reason:"reported: "+(LBL[body.kind]||body.kind).toLowerCase(),until:d?new Date(Date.now()+d*864e5).toISOString():null});
        return {ok:true}; }
      case "removed_list": return {rows:D.removed};
      case "restore_removed": { const x=D.removed.find(y=>y.ref===body.ref); D.removed=D.removed.filter(y=>y.ref!==body.ref);
        if(x&&/^c/.test(x.ref)) D.log=D.log.filter(c=>"c"+c.id!==x.ref);
        return {ok:true}; }
      case "change_password": case "logout": return {ok:true};
    }
    return r; }; })(window.demoApi);

  // A small marker so it's always obvious this is the demo
  function banner(){ if(document.getElementById("demobar")) return;
    const b=document.createElement("div"); b.id="demobar";
    b.innerHTML='Demo, made up people, nothing is saved <a href="./">Exit</a>';
    document.body.prepend(b); }
  if(document.body) banner(); else addEventListener("DOMContentLoaded",banner);
})();
