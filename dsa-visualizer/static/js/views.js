const INFO={
bubble:{n:'Bubble Sort',what:'Repeatedly swaps adjacent out-of-order pairs so the largest value bubbles to the end of each pass.',time:'O(n²) (O(n) best with early exit)',space:'O(1)',use:'Teaching; tiny or nearly sorted lists.'},
selection:{n:'Selection Sort',what:'Finds the minimum of the unsorted part and swaps it into the next position.',time:'O(n²) in all cases',space:'O(1)',use:'When writes are expensive (it does at most n swaps).'},
insertion:{n:'Insertion Sort',what:'Grows a sorted prefix by inserting each new element into its correct place.',time:'O(n²) worst, O(n) best',space:'O(1)',use:'Small or almost-sorted data; the base case inside hybrid sorts like Timsort.'},
merge:{n:'Merge Sort',what:'Divide the array in halves, sort each recursively, then merge the sorted halves.',time:'O(n log n) always',space:'O(n)',use:'Stable sorting, external sorting of huge files, linked lists.'},
quick:{n:'Quick Sort',what:'Picks a pivot (last element), partitions smaller values to its left, then recurses on both sides.',time:'O(n log n) avg, O(n²) worst',space:'O(log n) stack',use:'General-purpose in-memory sorting (e.g. language standard libraries).'},
linear:{n:'Linear Search',what:'Checks each element from left to right until the target is found.',time:'O(n)',space:'O(1)',use:'Unsorted data, small lists, searching a linked list.'},
binary:{n:'Binary Search',what:'On a sorted array, compares with the middle and discards half the range each step.',time:'O(log n)',space:'O(1)',use:'Dictionary lookup, database indexes, finding a bug commit (git bisect).'},
stack:{n:'Stack (LIFO)',what:'Last-in, first-out. Push adds to the top, pop removes from the top, peek reads it.',time:'Push/Pop/Peek O(1)',space:'O(n)',use:'Undo/redo, browser back button, function call stack, expression evaluation, bracket matching.'},
queue:{n:'Queue (FIFO)',what:'First-in, first-out. Enqueue at the rear, dequeue from the front. A circular queue reuses freed slots by wrapping indices with modulo.',time:'Enqueue/Dequeue O(1)',space:'O(n)',use:'CPU scheduling, printer spooling, BFS, network packet buffers, call-centre lines.'},
ll:{n:'Singly Linked List',what:'Nodes hold a value and a pointer to the next node; no contiguous memory is needed.',time:'Head insert O(1), tail/search/position O(n)',space:'O(n)',use:'Music playlists, image viewers, hash-table chaining, stacks/queues implementation.'},
bst:{n:'Binary Search Tree',what:'Left subtree < node < right subtree. Inorder traversal yields sorted order. Deleting a node with two children replaces it with its inorder successor.',time:'O(log n) avg, O(n) skewed',space:'O(n)',use:'Ordered maps/sets, database indexing, autocomplete, file-system hierarchies.'},
bfs:{n:'Breadth-First Search',what:'Explores level by level using a queue.',time:'O(V + E)',space:'O(V)',use:'Shortest path in unweighted graphs, social-network friend suggestions, web crawlers.'},
dfs:{n:'Depth-First Search',what:'Goes as deep as possible along a path, then backtracks (recursion/stack).',time:'O(V + E)',space:'O(V)',use:'Maze solving, cycle detection, topological sort, connected components.'},
dijkstra:{n:"Dijkstra's Algorithm",what:'Repeatedly picks the unvisited node with the smallest known distance and relaxes its edges. Needs non-negative weights.',time:'O(V²) (O((V+E) log V) with a heap)',space:'O(V)',use:'GPS navigation, network routing (OSPF), flight planning.'}};

const PSEUDO={
bubble:`repeat n-1 times:\n  for j = 0 .. n-i-2:\n    if a[j] > a[j+1]:\n      swap(a[j], a[j+1])`,
selection:`for i = 0 .. n-1:\n  min = i\n  for j = i+1 .. n-1:\n    if a[j] < a[min]: min = j\n  swap(a[i], a[min])`,
insertion:`for i = 1 .. n-1:\n  j = i\n  while j>0 and a[j-1] > a[j]:\n    swap(a[j-1], a[j]); j--`,
merge:`mergeSort(l, r):\n  if l >= r: return\n  mergeSort(l, mid)\n  mergeSort(mid+1, r)\n  merge the two sorted halves`,
quick:`quickSort(l, h):\n  pivot = a[h]; i = l\n  for j = l .. h-1:\n    if a[j] < pivot: swap(a[i++], a[j])\n  swap(a[i], a[h])\n  quickSort(l, i-1); quickSort(i+1, h)`,
linear:`for i = 0 .. n-1:\n  if a[i] == target: return i\nreturn -1`,
binary:`lo = 0; hi = n-1\nwhile lo <= hi:\n  mid = (lo+hi)/2\n  if a[mid] == target: return mid\n  if a[mid] < target: lo = mid+1\n  else hi = mid-1\nreturn -1`,
stack:`push(x): if top == cap-1 -> overflow\n         else a[++top] = x\npop():   if top == -1 -> underflow\n         else return a[top--]`,
queue:`enqueue(x): if full -> overflow\n            rear = (rear+1) % cap; a[rear] = x\ndequeue():  if empty -> underflow\n            x = a[front]; front = (front+1) % cap`,
ll:`insertHead(x): node.next = head; head = node\ninsertTail(x): walk to last node; last.next = node\nsearch(x):     cur = head; while cur: compare, cur = cur.next`,
bst:`insert(n, v): if n is null: return new node\n  if v < n.v: n.left = insert(n.left, v)\n  else if v > n.v: n.right = insert(n.right, v)\ninorder(n): inorder(left); visit n; inorder(right)`,
bfs:`queue = [start]; mark start\nwhile queue:\n  u = dequeue()\n  for each unseen neighbour v: mark v; enqueue(v)`,
dfs:`dfs(u): mark u\n  for each unseen neighbour v:\n    dfs(v)`,
dijkstra:`dist[start] = 0, others = infinity\nrepeat:\n  u = unvisited node with smallest dist\n  for each neighbour v of u:\n    dist[v] = min(dist[v], dist[u] + w(u,v))`};
for(const k in PSEUDO)INFO[k].code=PSEUDO[k];

const V={},NAMES={overview:'Overview',sorting:'Sorting',searching:'Searching',stack:'Stack',queue:'Queue',linkedlist:'Linked List',tree:'Binary Search Tree',graph:'Graphs'};
const sampleBtn=(id,t='Sample')=>`<button class=ghost id=${id}>${t}</button>`;

V.overview=w=>{
 w.innerHTML=hd('DSA Algorithm Visualizer','An interactive platform to see how data structures and algorithms actually run, one step at a time.')+
 `<div class=card><p>Every module runs a real implementation of the algorithm. Execution is recorded as a list of steps, which you can play, pause, step through, speed up or reset. Each page shows complexity and real-world uses.</p><p class=sub style="margin-top:8px">Stack: HTML + CSS + vanilla JavaScript · Flask (Python) · SQLite for run history.</p></div>
 <div class=grid>${Object.keys(NAMES).slice(1).map(k=>`<div class=card data-go=${k}><h4>${NAMES[k]}</h4></div>`).join('')}</div>
 <div class=card style="margin-top:16px"><h4>Recent runs (saved by the Flask backend)</h4><div id=runs class=sub>No backend detected, so history is off. The visualizer still works.</div></div>`;
 w.onclick=e=>{const k=e.target.closest('[data-go]');if(k)go(k.dataset.go)};
 fetch('/api/runs').then(r=>r.json()).then(r=>{if(r.length)$('#runs',w).innerHTML=r.map(x=>`${x.algo}: ${x.size} items, ${x.steps} steps (${x.ts})`).join('<br>')}).catch(()=>{})};

const PRE={random:n=>Array.from({length:n},()=>1+Math.random()*99|0),
 nearly:n=>{const a=Array.from({length:n},(_,i)=>(i+1)*7);[a[1],a[2]]=[a[2],a[1]];[a[n-3],a[n-2]]=[a[n-2],a[n-3]];return a},
 reversed:n=>Array.from({length:n},(_,i)=>(n-i)*7),
 few:n=>Array.from({length:n},()=>[10,40,70][Math.random()*3|0])};
V.sorting=w=>{
 w.innerHTML=hd('Sorting Algorithms','Amber bars are being compared, green bars are in their final place.')+`<div class=card><div class=row><select id=alg>${Object.keys(ALGO).map(k=>`<option value=${k}>${INFO[k].n}</option>`).join('')}</select><select id=pre><option value=random>Random</option><option value=nearly>Nearly sorted</option><option value=reversed>Reversed</option><option value=few>Few unique</option></select><button class=ghost id=gen>Generate</button><input id=inp value="64 34 25 12 22 11 90 5" aria-label="Numbers"></div>${CTRL}<div class=stats id=stats></div><div class=stage id=bars></div><div class=log></div></div>
 <div class=card><div class=row><h4 style="flex:1">Compare all algorithms on this input</h4><button class=ghost id=bench>Run benchmark</button></div><div id=tbl class=sub>Click the button to count comparisons and swaps for all five sorts.</div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),inp=g('inp'),alg=g('alg');
 const draw=s=>{const st=g('bars'),m=Math.max(...s.a,1);
  if(st.children.length!=s.a.length)st.innerHTML=s.a.map(()=>'<div class=bar><span></span></div>').join('');
  [...st.children].forEach((b,i)=>{b.style.height=Math.max(s.a[i],1)/m*100+'%';b.firstChild.textContent=s.a[i];b.className='bar'+(s.sorted.includes(i)?' ok':'')+(s.hi.includes(i)?' hi':'')});
  g('stats').innerHTML=`<span>Comparisons <b>${s.c||0}</b></span><span>Swaps / writes <b>${s.sw||0}</b></span><span>Elements <b>${s.a.length}</b></span>`};
 const show=()=>{draw({a:parse(inp.value),hi:[],sorted:[]});g('info').innerHTML=info(INFO[alg.value])};
 const P=playerUI(w,()=>{const a=parse(inp.value);if(a.length<2||a.length>30)return toast('Enter 2 to 30 numbers');const s=tally([...ALGO[alg.value](a)]);record(alg.value,a.length,s.length);return s},draw,show);
 inp.oninput=alg.onchange=()=>P.reset();
 g('gen').onclick=()=>{inp.value=PRE[g('pre').value](12).join(' ');P.reset()};
 g('bench').onclick=()=>{const a=parse(inp.value);if(a.length<2)return toast('Enter at least 2 numbers');
  g('tbl').innerHTML='<table><tr><th>Algorithm</th><th>Comparisons</th><th>Swaps / writes</th><th>Total steps</th></tr>'+Object.keys(ALGO).map(k=>{const s=tally([...ALGO[k](a)]),l=s[s.length-1];return`<tr><td>${INFO[k].n}</td><td>${l.c}</td><td>${l.sw}</td><td>${s.length}</td></tr>`}).join('')+'</table>'};
 show()};

V.searching=w=>{
 w.innerHTML=hd('Searching Algorithms','The cell being checked is amber; cells outside the binary-search range fade out.')+`<div class=card><div class=row><select id=alg><option value=linear>Linear Search</option><option value=binary>Binary Search</option></select><input id=inp value="7 3 15 9 21 12 4" aria-label="Array"><input id=t value=21 style="width:80px" aria-label="Target"><button class=ghost id=rnd>🎲 Random</button></div>${CTRL}<div class=flex id=cells></div><div class=log></div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),inp=g('inp'),alg=g('alg');
 const arr=()=>{const a=parse(inp.value);return alg.value=='binary'?a.sort((x,y)=>x-y):a};
 const draw=s=>{const c=g('cells');if(c.children.length!=s.a.length)c.innerHTML=s.a.map((x,i)=>`<div class=cell>${x}<small>${i}</small></div>`).join('');
  [...c.children].forEach((e,i)=>{e.firstChild.nodeValue=s.a[i];e.className='cell'+(s.found==i?' ok':i==s.cur?' hi':'')+(s.lo!=null&&(i<s.lo||i>s.hi)?' dim':'')})};
 const show=()=>{draw({a:arr()});g('info').innerHTML=info(INFO[alg.value])};
 const P=playerUI(w,()=>{const a=arr();if(!a.length)return toast('Enter some numbers');if(alg.value=='binary')toast('Binary search needs sorted data, so the array was sorted');return[...ALGO2[alg.value](a,+g('t').value)]},draw,show);
 inp.oninput=alg.onchange=g('t').oninput=()=>P.reset();
 g('rnd').onclick=()=>{inp.value=Array.from({length:9},()=>1+Math.random()*40|0).join(' ');g('t').value=parse(inp.value)[3];P.reset()};show()};
const ALGO2={linear,binary};

V.stack=w=>{
 let s=[];w.innerHTML=hd('Stack','Last in, first out. Try pushing past the capacity or popping an empty stack.')+`<div class=card><div class=row><input id=v value=10 style="width:90px" aria-label="Value"><label class=sub style="margin:0">Capacity <input id=cap type=number min=1 max=10 value=5 style="width:70px"></label><button id=push>Push</button><button id=pop>Pop</button><button id=peek class=ghost>Peek</button>${sampleBtn('samp')}<button class=ghost id=rst>↺ Reset</button></div><div class="msg" id=m>Stack is empty.</div><div class=vstack id=st></div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),cap=()=>Math.max(1,+g('cap').value||5);
 const msg=(t,c='')=>{const m=g('m');m.className='msg '+c;m.textContent=t;if(c=='bad'){m.classList.add('shake')}};
 const draw=h=>g('st').innerHTML=s.map((x,i)=>`<div class="item ${i==h?'hi':''}">${x}${i==s.length-1?'<em>← TOP</em>':''}</div>`).reverse().join('')||'<span class=sub>empty</span>';
 g('push').onclick=()=>{const v=g('v').value.trim();if(!v)return toast('Enter a value');if(s.length>=cap()){msg(`⚠ Stack Overflow: capacity ${cap()} reached, cannot push ${v}.`,'bad');return}s.push(v);draw(s.length-1);msg(`Pushed ${v}. Size ${s.length}/${cap()}.`,'ok')};
 g('pop').onclick=()=>{if(!s.length){msg('⚠ Stack Underflow: nothing to pop.','bad');return}const v=s.pop();draw();msg(`Popped ${v}.`,'ok')};
 g('peek').onclick=()=>{if(!s.length)return msg('Stack is empty, nothing to peek.','bad');draw(s.length-1);msg(`Top element is ${s[s.length-1]} (not removed).`,'ok')};
 g('samp').onclick=()=>{s=['A','B','C'];draw();msg('Loaded sample: A, B, C.')};
 g('rst').onclick=()=>{s=[];draw();msg('Stack reset.')};
 g('info').innerHTML=info(INFO.stack);draw()};

V.queue=w=>{
 let cap,sl,f,r,n;w.innerHTML=hd('Queue','First in, first out. Switch to circular to see wrap-around reuse freed slots.')+`<div class=card><div class=row><select id=mode><option value=lin>Linear queue</option><option value=circ>Circular queue</option></select><input id=v value=7 style="width:90px" aria-label="Value"><label class=sub style="margin:0">Capacity <input id=cap type=number min=2 max=10 value=5 style="width:70px"></label><button id=enq>Enqueue</button><button id=deq>Dequeue</button>${sampleBtn('samp')}<button class=ghost id=rst>↺ Reset</button></div><div class=msg id=m>Queue is empty.</div><div class=flex id=q></div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),circ=()=>g('mode').value=='circ';
 const init=()=>{cap=Math.max(2,Math.min(10,+g('cap').value||5));sl=Array(cap).fill(null);f=0;r=-1;n=0;draw()};
 const msg=(t,c='')=>{const m=g('m');m.className='msg '+c;m.textContent=t};
 const draw=()=>g('q').innerHTML=sl.map((x,i)=>`<div class="slot ${x!=null?'hi':''}">${x??''}${n&&i==f?'<em>FRONT</em>':''}${n&&i==r?`<em style="${n&&i==f?'top:-38px;color:var(--warn)':'color:var(--warn)'}">REAR</em>`:''}<small>${i}</small></div>`).join('');
 g('enq').onclick=()=>{const v=g('v').value.trim();if(!v)return toast('Enter a value');
  if(circ()?n>=cap:r>=cap-1){msg(r>=cap-1&&n<cap?`⚠ Linear queue overflow: rear hit the end although ${cap-n} slot(s) are free. This waste is why circular queues exist.`:'⚠ Queue Overflow: queue is full.','bad');return}
  r=circ()?(r+1)%cap:r+1;sl[r]=v;n++;draw();g('q').children[r].classList.add('pop');msg(`Enqueued ${v} at index ${r}.`,'ok')};
 g('deq').onclick=()=>{if(!n){msg('⚠ Queue Underflow: queue is empty.','bad');return}const v=sl[f];sl[f]=null;f=circ()?(f+1)%cap:f+1;n--;draw();msg(`Dequeued ${v}. Front moves to index ${f}.`,'ok')};
 g('samp').onclick=()=>{init();['A','B','C'].forEach(v=>{r=circ()?(r+1)%cap:r+1;sl[r]=v;n++});draw();msg('Loaded sample: A, B, C.')};
 g('rst').onclick=()=>{init();msg('Queue reset.')};g('mode').onchange=g('cap').onchange=()=>{init();msg('Queue reset for new settings.')};
 g('info').innerHTML=info(INFO.queue);init()};

V.linkedlist=w=>{
 let L=[3,7,12];w.innerHTML=hd('Linked List','Insert, delete, search and traverse. Traversal follows the pointers one node at a time.')+`<div class=card><div class=row><input id=v value=5 style="width:80px" aria-label="Value"><input id=p type=number value=1 min=0 style="width:80px" aria-label="Position"><button id=ih>Insert at head</button><button id=it>Insert at tail</button><button id=ip>Insert at position</button></div><div class=row><button class=ghost id=dv>Delete value</button><button class=ghost id=dp>Delete at position</button><button class=ghost id=se>Search value</button><button class=ghost id=tr>Traverse</button>${sampleBtn('samp')}<button class=ghost id=rst>↺ Reset</button></div><div class=msg id=m>List: 3 → 7 → 12</div><div class=flex id=ll></div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),msg=(t,c='')=>{const m=g('m');m.className='msg '+c;m.textContent=t};
 const draw=h=>g('ll').innerHTML='<span class=head>HEAD →</span>'+L.map((x,i)=>`<div class="node ${i==h?'hi':''}">${x}<small>${i}</small></div><span class=arrow>→</span>`).join('')+'<span class=nul>NULL</span>';
 const P=new Player(s=>draw(s.hi),m=>msg(m));const run=it=>{P.load(it);P.play(()=>500)};
 const val=()=>g('v').value.trim(),pos=()=>+g('p').value;
 const need=()=>val()?true:(toast('Enter a value'),false);
 g('ih').onclick=()=>{if(!need())return;P.stop();L.unshift(val());draw(0);msg(`Inserted ${val()} at head.`,'ok')};
 g('it').onclick=()=>{if(!need())return;P.stop();L.push(val());draw(L.length-1);msg(`Inserted ${val()} at tail.`,'ok')};
 g('ip').onclick=()=>{if(!need())return;P.stop();if(pos()<0||pos()>L.length)return msg(`Invalid position: use 0 to ${L.length}.`,'bad');L.splice(pos(),0,val());draw(pos());msg(`Inserted ${val()} at position ${pos()}.`,'ok')};
 g('dv').onclick=()=>{P.stop();const i=L.indexOf(val());if(i<0)return msg(`${val()} not found, nothing deleted.`,'bad');L.splice(i,1);draw();msg(`Deleted ${val()}.`,'ok')};
 g('dp').onclick=()=>{P.stop();if(pos()<0||pos()>=L.length)return msg(`Invalid position: use 0 to ${L.length-1}.`,'bad');const x=L.splice(pos(),1);draw();msg(`Deleted ${x} at position ${pos()}.`,'ok')};
 g('se').onclick=()=>{if(!need())return;const st=[];for(let i=0;i<L.length;i++){st.push({hi:i,msg:`Visit node ${i}: ${L[i]} == ${val()}?`});if(L[i]==val()){st.push({hi:i,msg:`Found ${val()} at position ${i} ✔`});return run(st)}}st.push({hi:-1,msg:`${val()} not found (reached NULL) ✘`});run(st)};
 g('tr').onclick=()=>run(L.length?L.map((x,i)=>({hi:i,msg:`Visit node ${i}: ${x}`})).concat({hi:-1,msg:'Reached NULL. Traversal complete.'}):[{hi:-1,msg:'List is empty.'}]);
 g('samp').onclick=()=>{P.stop();L=[3,7,12];draw();msg('Loaded sample: 3 → 7 → 12')};g('rst').onclick=()=>{P.stop();L=[];draw();msg('List cleared.')};
 g('info').innerHTML=info(INFO.ll);draw()};

V.tree=w=>{
 let root=null;[50,30,70,20,40,60,80].forEach(v=>root=bstIns(root,v));
 w.innerHTML=hd('Binary Search Tree','Insert, delete and traverse. Traversal order is listed below the tree.')+`<div class=card><div class=row><input id=v value=45 style="width:80px" aria-label="Value"><button id=ins>Insert</button><button id=del>Delete</button><button class=ghost id=in>Inorder</button><button class=ghost id=pre>Preorder</button><button class=ghost id=post>Postorder</button>${sampleBtn('samp')}<button class=ghost id=rst>↺ Reset</button></div><div class=msg id=m>Sample tree loaded.</div><div style="overflow-x:auto;background:#0e1220;border-radius:10px"><svg id=svg></svg></div><p class=sub id=out style="margin:10px 0 0"></p></div><div id=info></div>`;
 const g=id=>$('#'+id,w),msg=(t,c='')=>{const m=g('m');m.className='msg '+c;m.textContent=t};
 const draw=(cur=null,vis=[])=>{const pos=[],E=[];let k=0,md=0;const lay=(n,d,par)=>{if(!n)return;lay(n.l,d+1,n);const o={v:n.v,x:k++,d};pos.push(o);md=Math.max(md,d);if(par)E.push([par,n.v]);lay(n.r,d+1,n)};
  const lines=[];(function e(n){if(!n)return;for(const c of[n.l,n.r])if(c){lines.push([n.v,c.v]);e(c)}})(root);lay(root,0);
  const gap=48,W=Math.max(300,k*gap+40),H=(md+1)*70+20,P={};pos.forEach(o=>P[o.v]={x:30+o.x*gap,y:36+o.d*70});
  g('svg').setAttribute('viewBox',`0 0 ${W} ${H}`);g('svg').setAttribute('width',W);g('svg').setAttribute('height',H);
  g('svg').innerHTML=lines.map(([a,b])=>`<line x1=${P[a].x} y1=${P[a].y} x2=${P[b].x} y2=${P[b].y}></line>`).join('')+pos.map(o=>`<circle class="${o.v==cur?'cur':vis.includes(o.v)?'vis':''}" cx=${P[o.v].x} cy=${P[o.v].y} r=19></circle><text x=${P[o.v].x} y=${P[o.v].y}>${o.v}</text>`).join('')};
 const Pl=new Player(s=>{draw(s.cur,s.o);g('out').textContent='Output: '+s.o.join(', ')},m=>msg(m));
 const val=()=>{const v=parse(g('v').value)[0];if(v==null)toast('Enter a number');return v};
 g('ins').onclick=()=>{Pl.stop();const v=val();if(v==null)return;if(bstHas(root,v))return msg(`${v} already exists (BST keeps unique keys).`,'bad');root=bstIns(root,v);draw(v);msg(`Inserted ${v}.`,'ok')};
 g('del').onclick=()=>{Pl.stop();const v=val();if(v==null)return;if(!bstHas(root,v))return msg(`${v} not found.`,'bad');root=bstDel(root,v);draw();msg(`Deleted ${v}.`,'ok')};
 for(const t of['in','pre','post'])g(t).onclick=()=>{if(!root)return msg('Tree is empty.','bad');g('out').textContent='';Pl.load(trav(root,t,[]));Pl.play(()=>600)};
 g('samp').onclick=()=>{Pl.stop();root=null;[50,30,70,20,40,60,80].forEach(v=>root=bstIns(root,v));draw();msg('Sample tree loaded.')};
 g('rst').onclick=()=>{Pl.stop();root=null;draw();g('out').textContent='';msg('Tree cleared.')};
 g('info').innerHTML=info(INFO.bst);draw()};

V.graph=w=>{
 const DEF='A-B:4, A-C:2, B-C:1, B-D:5, C-D:8, C-E:10, D-E:2, D-F:6, E-F:3';let G=new Map();
 w.innerHTML=hd('Graph Algorithms','Undirected weighted graph. Edit the edge list as NodeA-NodeB:weight.')+`<div class=card><div class=row><input id=ed value="${DEF}" style="flex:1;min-width:220px" aria-label="Edges"><button class=ghost id=apply>Apply graph</button>${sampleBtn('samp')}</div><div class=row><select id=alg><option value=bfs>BFS</option><option value=dfs>DFS</option><option value=dijkstra>Dijkstra</option></select><label class=sub style="margin:0">Start <select id=s></select></label><label class=sub style="margin:0">Target <select id=t></select></label></div>${CTRL}<svg id=svg viewBox="0 0 600 380" style="width:100%;max-height:380px;background:#0e1220;border-radius:10px"></svg><div class=log></div></div><div id=info></div>`;
 const g=id=>$('#'+id,w),pts={};
 const build=()=>{G=new Map();for(const m of g('ed').value.matchAll(/([\w]+)\s*-\s*([\w]+)\s*(?::\s*(\d+))?/g)){const[,a,b,x]=m,c=+x||1;if(!G.has(a))G.set(a,[]);if(!G.has(b))G.set(b,[]);G.get(a).push([b,c]);G.get(b).push([a,c])}
  const ns=[...G.keys()];if(ns.length<2||ns.length>10){toast('Use 2 to 10 nodes');return false}
  ns.forEach((k,i)=>{const a=2*Math.PI*i/ns.length-Math.PI/2;pts[k]={x:300+210*Math.cos(a),y:190+150*Math.sin(a)}});
  g('s').innerHTML=g('t').innerHTML=ns.map(k=>`<option>${k}</option>`).join('');g('t').value=ns[ns.length-1];return true};
 const draw=(s={})=>{const vis=s.vis||[],fr=s.fr||[],pe=new Set((s.path||[]).slice(1).map((x,i)=>s.path[i]+'|'+x));let out='';
  for(const[a,l]of G)for(const[b,c]of l)if(a<b){const on=(s.edge&&((s.edge[0]==a&&s.edge[1]==b)||(s.edge[0]==b&&s.edge[1]==a)))||pe.has(a+'|'+b)||pe.has(b+'|'+a);out+=`<line class="${on?'on':''}" x1=${pts[a].x} y1=${pts[a].y} x2=${pts[b].x} y2=${pts[b].y}></line><text x=${(pts[a].x+pts[b].x)/2} y=${(pts[a].y+pts[b].y)/2-8} style="fill:var(--mut);font-size:12px">${c}</text>`}
  for(const k of G.keys())out+=`<circle class="${k==s.cur?'cur':vis.includes(k)?'vis':fr.includes(k)?'fr':''}" cx=${pts[k].x} cy=${pts[k].y} r=22></circle><text x=${pts[k].x} y=${pts[k].y}>${k}</text>${s.d?`<text x=${pts[k].x} y=${pts[k].y+34} style="fill:var(--ok);font-size:12px">${s.d[k]==Infinity?'∞':s.d[k]}</text>`:''}`;g('svg').innerHTML=out};
 const show=()=>{draw();g('info').innerHTML=info(INFO[g('alg').value])};
 const P=playerUI(w,()=>{const a=g('alg').value,s=g('s').value;const it=a=='bfs'?bfs(G,s):a=='dfs'?dfs(G,s):dijk(G,s,g('t').value);const st=[...it];record(a,G.size,st.length);return st},draw,show);
 g('apply').onclick=()=>{P.stop();if(build())P.reset()};g('samp').onclick=()=>{g('ed').value=DEF;g('apply').onclick()};
 g('alg').onchange=()=>P.reset();build();show()};

/* Router */
const nav=$('#nav nav');
nav.innerHTML=Object.entries(NAMES).map(([k,v])=>`<a data-k=${k}>${v}</a>`).join('');
function go(k){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.dataset.k==k));const v=$('#view');v.innerHTML='';const w=document.createElement('div');v.append(w);V[k](w);location.hash=k}
nav.onclick=e=>e.target.dataset.k&&go(e.target.dataset.k);
go(NAMES[location.hash.slice(1)]?location.hash.slice(1):'overview');
