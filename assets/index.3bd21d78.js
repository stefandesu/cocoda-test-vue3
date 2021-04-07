import{d as e,c as t,w as n,p as s,a as o,o as l,b as a,e as c,j as r,t as i,f as u,F as d,g as p,r as m,h,i as v,v as w,k as y,l as f,m as k,n as b,q as g}from"./vendor.b88d82d7.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const s=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,l)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return n(self[t].moduleMap[a]);const c=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){l(new Error(`Failed to import: ${e}`)),o(r)},onload(){n(self[t].moduleMap[a]),o(r)}});document.head.appendChild(r)})),self[t].moduleMap={}}}("/assets/");var S=e({name:"Spinner",props:{size:{type:String,default:"40"}}});const C=n();s("data-v-4266abf4");const _=a("div",null,null,-1),L=a("div",null,null,-1),I=a("div",null,null,-1),D=a("div",null,null,-1),N=a("div",null,null,-1),A=a("div",null,null,-1),U=a("div",null,null,-1),R=a("div",null,null,-1);o();const T=C(((e,n,s,o,a,c)=>(l(),t("div",{class:"lds-spinner",style:`--size: ${e.size}px;`},[_,L,I,D,N,A,U,R],4))));S.render=T,S.__scopeId="data-v-4266abf4";var $=e({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showText:{type:Boolean,default:!0},isLink:{type:Boolean,default:!1}},setup:e=>{const t=c((()=>r.notation(e.item))),n=c((()=>r.prefLabel(e.item,{fallbackToUri:null==t})));return{notation:t,label:n}}});const j=n();s("data-v-33bb821f");const z={key:0};o();const B=j(((e,n,s,o,a,c)=>(l(),t("span",{class:{itemName:!0,hoverable:e.isLink}},[e.showNotation?(l(),t("b",z,i(e.notation),1)):u("",!0),e.showText?(l(),t(d,{key:1},[p(i(" "+e.label),1)],64)):u("",!0)],2))));$.render=B,$.__scopeId="data-v-33bb821f";var E=e({name:"ConceptSearch",components:{Spinner:S,ItemName:$},emits:["select"],props:{scheme:{type:Object,required:!0}},setup:(e,{emit:t})=>{const n=m(""),s=m(!1),o=m(!1),l=m(new Array),a=c((()=>""!==n.value&&s.value)),r=m(0);function i(){l.value[r.value]&&t("select",l.value[r.value])}let u;const d=((e,t)=>{let n;return(...s)=>{let o;return n&&clearTimeout(n),n=setTimeout((()=>{o=e(...s)}),t),o}})((async function(t){u&&u();const n=e.scheme._registry.search({scheme:e.scheme,search:t});u=n.cancel,l.value=await n,o.value=!1}),200);return h((()=>n.value),(()=>{n.value?(o.value=!0,r.value=0,d(n.value)):l.value=[]})),{value:n,focused:s,loading:o,results:l,showResults:a,selected:r,select:i,handleKey:function({code:e,target:t}){switch(e){case"Escape":t&&t.blur&&t.blur();break;case"ArrowDown":r.value=(r.value+1)%l.value.length;break;case"ArrowUp":0===r.value?r.value=l.value.length-1:r.value-=1;break;case"Enter":i(),t&&t.blur&&t.blur()}},onFocus:function(){s.value=!0},onBlur:function(e){e.relatedTarget&&e.relatedTarget.className.includes("result")&&i(),s.value=!1}}}});const O=n();s("data-v-df888d30");const F={class:"concept-search"},M={key:0,class:"results"},x={key:0,class:"result"},K={key:1,class:"result"};o();const q=O(((e,n,s,o,c,r)=>{const i=f("Spinner"),p=f("ItemName");return l(),t("div",F,[v(a("input",{"onUpdate:modelValue":n[1]||(n[1]=t=>e.value=t),onFocus:n[2]||(n[2]=(...t)=>e.onFocus&&e.onFocus(...t)),onBlur:n[3]||(n[3]=(...t)=>e.onBlur&&e.onBlur(...t)),onKeydown:n[4]||(n[4]=(...t)=>e.handleKey&&e.handleKey(...t)),placeholder:"Type to search..."},null,544),[[w,e.value]]),e.showResults?(l(),t("div",M,[e.loading?(l(),t("div",x,[a(i,{size:"20"})])):0===e.results.length?(l(),t("div",K," No results ")):(l(!0),t(d,{key:2},y(e.results,((n,s)=>(l(),t("div",{key:n.uri,class:{result:!0,selected:e.selected===s},tabindex:"-1",onMouseover:t=>e.selected=s},[a(p,{item:n},null,8,["item"])],42,["onMouseover"])))),128))])):u("",!0)])}));E.render=q,E.__scopeId="data-v-df888d30";const P=k.initializeRegistry({provider:"ConceptApi",status:"https://coli-conc.gbv.de/api/status"}),W={uri:"http://dewey.info/scheme/edition/e23/",prefLabel:{de:"Dewey-Dezimalklassifikation"},notation:["DDC"],identifier:["http://bartoc.org/en/node/241"],type:["http://www.w3.org/2004/02/skos/core#ConceptScheme"],_registry:P};let V;var G={scheme:W,state:b({selected:void 0}),setSelected(e){this.state.selected=e,this.selectedWasSet(e)},async selectedWasSet(e){if(null!==e&&!r.compare(e,V)){if(V=e,!e.ancestors||null===e.ancestors[0])try{const t=await P.getAncestors({concept:e});r.compare(e,this.state.selected)&&(this.state.selected.ancestors=t)}catch(t){console.warn("Could not load ancestors for",e.uri)}if(!e.narrower||null===e.narrower[0])try{const t=await P.getNarrower({concept:e});r.compare(e,this.state.selected)&&(this.state.selected.narrower=t)}catch(t){console.warn("Could not load narrower for",e.uri)}if(!e.__DETAILSLOADED__)try{const[t]=await P.getConcepts({concepts:[e]});if(r.compare(t,this.state.selected)){for(const e in t)this.state.selected[e]||(this.state.selected[e]=t[e]);this.state.selected.__DETAILSLOADED__=1}}catch(t){console.warn("Could not load details for",e.uri)}const n=new URLSearchParams(window.location.search);n.set("uri",e.uri);const s=`${window.location.href.replace(window.location.search,"")}?${n.toString()}`;window.history.replaceState({},"",s)}},setSelectedUri(e,t){!t&&e.startsWith("http://dewey.info/class/")&&(t=W);const n={uri:e,scheme:t};this.setSelected(n)}},H=e({name:"ConceptDetails",components:{Spinner:S,ItemName:$},props:{concept:{type:Object,default:null}},setup:()=>({store:G})});const J=n();s("data-v-75dda3fc");const Q={class:"concept-details"},X={key:1,class:"ancestors"},Y=p(" ⬑ "),Z={key:1,class:"narrower"},ee=p(" ⬐ "),te={key:1};o();const ne=J(((e,n,s,o,c,r)=>{const p=f("Spinner"),m=f("ItemName");return l(),t("div",Q,[e.concept?(l(),t(d,{key:0},[e.concept.ancestors&&e.concept.ancestors.length?(l(),t(d,{key:0},[1===e.concept.ancestors.length&&null===e.concept.ancestors[0]?(l(),t(p,{key:0,size:"20"})):(l(),t("ul",X,[(l(!0),t(d,null,y(e.concept.ancestors,(n=>(l(),t("li",{key:n.uri},[Y,a(m,{item:n,isLink:!0,onClick:t=>e.store.setSelected(n)},null,8,["item","onClick"])])))),128))]))],64)):u("",!0),a("p",null,[a(m,{item:e.concept},null,8,["item"])]),a("p",null,i(e.concept.uri),1),e.concept.narrower&&e.concept.narrower.length?(l(),t(d,{key:1},[1===e.concept.narrower.length&&null===e.concept.narrower[0]?(l(),t(p,{key:0,size:"20"})):(l(),t("ul",Z,[(l(!0),t(d,null,y(e.concept.narrower,(n=>(l(),t("li",{key:n.uri},[ee,a(m,{item:n,isLink:!0,onClick:t=>e.store.setSelected(n)},null,8,["item","onClick"])])))),128))]))],64)):u("",!0)],64)):(l(),t("p",te," No concept given. "))])}));H.render=ne,H.__scopeId="data-v-75dda3fc";var se=e({name:"App",components:{ConceptSearch:E,ConceptDetails:H,ItemName:$},setup:()=>{const e=m(new Array);const t=new URLSearchParams(window.location.search).get("uri");return t&&G.setSelectedUri(t),{items:e,generateItems:function(t){e.value=Array.from(Array(t).keys()).map((e=>({uri:`uri:test:${e}`,notation:[`${e}`],prefLabel:{en:`Concept #${e}`}})))},store:G}}});const oe=a("h1",null,"Cocoda Test Vue 3",-1),le=p(" Generate elements: ");se.render=function(e,n,s,o,c,r){const u=f("ConceptSearch"),p=f("ConceptDetails"),m=f("ItemName");return l(),t("main",null,[oe,a("section",null,[a(u,{scheme:e.store.scheme,onSelect:n[1]||(n[1]=t=>{e.store.setSelected(t)})},null,8,["scheme"])]),a("section",null,[a(p,{concept:e.store.state.selected},null,8,["concept"])]),a("section",null,[a("p",null,[le,(l(),t(d,null,y([1e3,1e4,1e5],(t=>a("button",{key:t,onClick:n=>e.generateItems(t)},i(t),9,["onClick"]))),64)),a("button",{onClick:n[2]||(n[2]=t=>e.generateItems(0))}," Clear ")]),(l(!0),t(d,null,y(e.items,((n,s)=>(l(),t("div",{key:s},[a(m,{item:n,isLink:!0,onClick:t=>e.store.setSelected(n)},null,8,["item","onClick"])])))),128))])])},g(se).mount("#app");