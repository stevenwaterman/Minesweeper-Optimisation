var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function i(t,n){const e=t.subscribe(n);return e.unsubscribe?()=>e.unsubscribe():e}function c(t,n,e){t.$$.on_destroy.push(i(n,e))}function u(t,n){t.appendChild(n)}function s(t,n,e){t.insertBefore(n,e||null)}function a(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function $(t,n,e,r){t.style.setProperty(n,e,r?"important":"")}let p;function h(t){p=t}const g=[],m=[],y=[],b=[],x=Promise.resolve();let w=!1;function _(t){y.push(t)}function v(){const t=new Set;do{for(;g.length;){const t=g.shift();h(t),A(t.$$)}for(;m.length;)m.pop()();for(let n=0;n<y.length;n+=1){const e=y[n];t.has(e)||(e(),t.add(e))}y.length=0}while(g.length);for(;b.length;)b.pop()();w=!1}function A(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(_)}}const M=new Set;let k;function K(t,n){t&&t.i&&(M.delete(t),t.i(n))}function E(t,n,e,r){if(t&&t.o){if(M.has(t))return;M.add(t),k.c.push(()=>{M.delete(t),r&&(e&&t.d(1),r())}),t.o(n)}}function N(t,e,l){const{fragment:i,on_mount:c,on_destroy:u,after_update:s}=t.$$;i&&i.m(e,l),_(()=>{const e=c.map(n).filter(o);u?u.push(...e):r(e),t.$$.on_mount=[]}),s.forEach(_)}function O(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function T(t,n){-1===t.$$.dirty[0]&&(g.push(t),w||(w=!0,x.then(v)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function j(n,o,l,i,c,u,s=[-1]){const a=p;h(n);const f=o.props||{},d=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:c,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:e(),dirty:s};let $=!1;d.ctx=l?l(n,f,(t,e,...r)=>{const o=r.length?r[0]:e;return d.ctx&&c(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),$&&T(n,t)),e}):[],d.update(),$=!0,r(d.before_update),d.fragment=!!i&&i(d.ctx),o.target&&(o.hydrate?d.fragment&&d.fragment.l(function(t){return Array.from(t.childNodes)}(o.target)):d.fragment&&d.fragment.c(),o.intro&&K(n.$$.fragment),N(n,o.target,o.anchor),v()),h(a)}class B{$destroy(){O(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}const C=[];function P(n,e=t){let r;const o=[];function i(t){if(l(n,t)&&(n=t,r)){const t=!C.length;for(let t=0;t<o.length;t+=1){const e=o[t];e[1](),C.push(e,n)}if(t){for(let t=0;t<C.length;t+=2)C[t][0](C[t+1]);C.length=0}}}return{set:i,update:function(t){i(t(n))},subscribe:function(l,c=t){const u=[l,c];return o.push(u),1===o.length&&(r=e(i)||t),l(n),()=>{const t=o.indexOf(u);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}function S(n,e,l){const i=!Array.isArray(n),c=i?[n]:n,u=e.length<2;return{subscribe:P(l,n=>{let l=!1;const s=[];let a=0,f=t;const d=()=>{if(a)return;f();const r=e(i?s[0]:s,n);u?n(r):f=o(r)?r:t},$=c.map((t,n)=>t.subscribe(t=>{s[n]=t,a&=~(1<<n),l&&d()},()=>{a|=1<<n}));return l=!0,d(),function(){r($),f()}}).subscribe}}function q(t){const n=Math.floor(.1*t);return function(t){let n;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));n=t[e],t[e]=t[r],t[r]=n}return t}([...Array(t-n-1).fill(null).map(()=>({isMine:!1,stateKnown:!1})),...Array(1).fill(null).map(()=>({isMine:!1,stateKnown:!0})),...Array(n).fill(null).map(()=>({isMine:!0,stateKnown:!1}))])}const X=function(){const t={width:100,height:100,cells:q(1e4)},{subscribe:n,set:e,update:r}=P(t);return{subscribe:n,reveal:t=>r(n=>(n.cells[t].stateKnown=!0,n))}}(),z=S([X],([t])=>t.width),D=S([X],([t])=>t.height),F=S([z,D],([t,n])=>t*n);function G(t,n,e){const r=function(t,n,e){const r=t%n,o=Math.floor(t/n);return[[r-1,o-1],[r,o-1],[r+1,o-1],[r-1,o],[r+1,o],[r-1,o+1],[r,o+1],[r+1,o+1]].filter(t=>t[0]>=0).filter(t=>t[1]>=0).filter(t=>t[0]<n).filter(t=>t[1]<e).map(t=>t[0]+t[1]*n)}(t,n,e);return{...S([X],([t])=>r.map(n=>t.cells[n])),reveal:()=>r.forEach(X.reveal)}}function H(n){let e,r;return{c(){var t;e=f("div"),t=n[2],r=document.createTextNode(t),d(e,"class","cell svelte-80gadg"),$(e,"color",n[0]),$(e,"background-color",n[1])},m(t,n){s(t,e,n),u(e,r)},p(t,[n]){4&n&&function(t,n){n=""+n,t.data!==n&&(t.data=n)}(r,t[2]),1&n&&$(e,"color",t[0]),2&n&&$(e,"background-color",t[1])},i:t,o:t,d(t){t&&a(e)}}}function I(n,e,r){let o,l,u,s,a=t,f=t;c(n,z,t=>r(6,o=t)),c(n,D,t=>r(7,l=t)),n.$$.on_destroy.push(()=>a()),n.$$.on_destroy.push(()=>f());let d,$,p,h,g,m,y,b,x,w,_,v,A,M,{index:k}=e;return n.$set=t=>{"index"in t&&r(5,k=t.index)},n.$$.update=()=>{var t;32&n.$$.dirty&&(r(3,(t=k,h=S([X],([n])=>n.cells[t]))),a(),a=i(h,t=>r(9,u=t))),224&n.$$.dirty&&(r(4,g=G(k,o,l)),f(),f=i(g,t=>r(13,s=t))),512&n.$$.dirty&&r(8,m=u.isMine),512&n.$$.dirty&&r(10,y=u.stateKnown),1280&n.$$.dirty&&r(11,b=y&&!m),8192&n.$$.dirty&&r(12,x=s.filter(t=>!t.stateKnown).length),8192&n.$$.dirty&&r(14,w=s.filter(t=>t.isMine).length),8192&n.$$.dirty&&r(15,_=s.filter(t=>t.isMine&&t.stateKnown).length),49152&n.$$.dirty&&r(16,v=w-_),51200&n.$$.dirty&&r(17,A=b&&w===_),71680&n.$$.dirty&&r(18,M=b&&v===x),131088&n.$$.dirty&&A&&setTimeout(()=>g.reveal(),0),262160&n.$$.dirty&&M&&setTimeout(()=>g.reveal(),0),16640&n.$$.dirty&&r(0,d=m?"white":["transparent","blue","green","red","purple","maroon","#0aa","black","#444"][w]),1280&n.$$.dirty&&r(1,$=y?m?"#f55":"white":null),17664&n.$$.dirty&&r(2,p=y?m?"X":w:"")},[d,$,p,h,g,k]}class J extends B{constructor(t){super(),j(this,t,I,H,l,{index:5})}}function L(t,n,e){const r=t.slice();return r[3]=n[e],r[5]=e,r}function Q(n){let e;const r=new J({props:{index:n[5]}});return{c(){var t;(t=r.$$.fragment)&&t.c()},m(t,n){N(r,t,n),e=!0},p:t,i(t){e||(K(r.$$.fragment,t),e=!0)},o(t){E(r.$$.fragment,t),e=!1},d(t){O(r,t)}}}function R(t){let n,e,o,l,i=Array(t[2]).fill(null),c=[];for(let n=0;n<i.length;n+=1)c[n]=Q(L(t,i,n));const $=t=>E(c[t],1,1,()=>{c[t]=null});return{c(){n=f("main"),e=f("div");for(let t=0;t<c.length;t+=1)c[t].c();d(e,"class","board svelte-1a2xkkt"),d(e,"style",o=`grid-template-columns: repeat(${t[0]}, 8px); grid-template-rows: repeat(${t[1]}, 8px)`)},m(t,r){s(t,n,r),u(n,e);for(let t=0;t<c.length;t+=1)c[t].m(e,null);l=!0},p(t,[n]){if(4&n){let o;for(i=Array(t[2]).fill(null),o=0;o<i.length;o+=1){const r=L(t,i,o);c[o]?(c[o].p(r,n),K(c[o],1)):(c[o]=Q(r),c[o].c(),K(c[o],1),c[o].m(e,null))}for(k={r:0,c:[],p:k},o=i.length;o<c.length;o+=1)$(o);k.r||r(k.c),k=k.p}(!l||3&n&&o!==(o=`grid-template-columns: repeat(${t[0]}, 8px); grid-template-rows: repeat(${t[1]}, 8px)`))&&d(e,"style",o)},i(t){if(!l){for(let t=0;t<i.length;t+=1)K(c[t]);l=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)E(c[t]);l=!1},d(t){t&&a(n),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(c,t)}}}function U(t,n,e){let r,o,l;return c(t,z,t=>e(0,r=t)),c(t,D,t=>e(1,o=t)),c(t,F,t=>e(2,l=t)),[r,o,l]}return new class extends B{constructor(t){super(),j(this,t,U,R,l,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map