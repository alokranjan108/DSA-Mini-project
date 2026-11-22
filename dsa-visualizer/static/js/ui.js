const $=(s,e=document)=>e.querySelector(s);
const parse=s=>s.trim().split(/[\s,]+/).filter(Boolean).map(Number).filter(x=>!isNaN(x));
function toast(m){const t=document.createElement('div');t.id='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2200)}
const record=(algo,size,steps)=>fetch('/api/runs',{method:'POST',body:JSON.stringify({algo,size,steps})}).catch(()=>{});
/* Step player: precomputes steps from a generator so we can play, pause and step. */
class Player{
 constructor(draw,log){this.draw=draw;this.log=log;this.steps=[];this.i=-1;this.t=null}
 load(it){this.stop();this.steps=[...it];this.i=-1}
 next(){if(this.i>=this.steps.length-1){this.stop();return false}this.i++;const s=this.steps[this.i];this.draw(s);this.log(s.msg,this.i,this.steps.length);return true}
 play(delay){this.stop();const tick=()=>{if(this.next())this.t=setTimeout(tick,delay())};tick()}
 stop(){clearTimeout(this.t);this.t=null}
 get done(){return this.i<0||this.i>=this.steps.length-1}
}
const CTRL=`<div class=row><button data-a=start>▶ Start</button><button class=ghost data-a=pause>⏸ Pause</button><button class=ghost data-a=step>Step</button><button class=ghost data-a=reset>↺ Reset</button><label class=sub style="margin:0">Speed <input type=range class=speed min=50 max=1000 value=600></label></div>`;
function playerUI(el,make,draw,onReset){
 const logEl=()=>$('.log',el);
 const P=new Player(draw,(m,i,n)=>logEl().insertAdjacentHTML('afterbegin',`<div><span>${i+1}/${n}</span>${m}</div>`));
 const delay=()=>1050-$('.speed',el).value;
 const fresh=()=>{const s=make();if(!s)return false;P.load(s);logEl().innerHTML='';return true};
 P.reset=()=>{P.stop();P.i=-1;P.steps=[];logEl().innerHTML='';onReset&&onReset()};
 el.addEventListener('click',e=>{const a=e.target.dataset.a;if(!a)return;
  if(a=='start'){if(P.done&&!fresh())return;P.play(delay)}
  if(a=='pause')P.stop();
  if(a=='step'){if(P.done&&!fresh())return;P.next()}
  if(a=='reset')P.reset()});
 return P}
const info=i=>`<div class="card info"><div><h4>${i.n}</h4><p>${i.what}</p></div><div><h4>Complexity</h4><p>Time: <b>${i.time}</b><br>Space: <b>${i.space}</b></p></div><div><h4>Real-world uses</h4><p>${i.use}</p></div>${i.code?`<div><h4>Pseudocode</h4><pre>${i.code}</pre></div>`:''}</div>`;
const hd=(t,s)=>`<h2>${t}</h2><p class=sub>${s}</p>`;

/* adds running comparison / swap counts to every sorting step */
const tally=s=>{let c=0,sw=0;return s.map((x,i)=>{
 if(i>0&&x.a.join()!=s[i-1].a.join())sw++;
 if(/compare|^Is /i.test(x.msg))c++;
 return{...x,c,sw}})};
