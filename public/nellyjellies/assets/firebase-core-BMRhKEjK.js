import{o as si}from"./vendor-DW0O-OoR.js";const cr=()=>{};var Gn={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=function(i){const r=[];let o=0;for(let c=0;c<i.length;c++){let d=i.charCodeAt(c);d<128?r[o++]=d:d<2048?(r[o++]=d>>6|192,r[o++]=d&63|128):(d&64512)===55296&&c+1<i.length&&(i.charCodeAt(c+1)&64512)===56320?(d=65536+((d&1023)<<10)+(i.charCodeAt(++c)&1023),r[o++]=d>>18|240,r[o++]=d>>12&63|128,r[o++]=d>>6&63|128,r[o++]=d&63|128):(r[o++]=d>>12|224,r[o++]=d>>6&63|128,r[o++]=d&63|128)}return r},ur=function(i){const r=[];let o=0,c=0;for(;o<i.length;){const d=i[o++];if(d<128)r[c++]=String.fromCharCode(d);else if(d>191&&d<224){const w=i[o++];r[c++]=String.fromCharCode((d&31)<<6|w&63)}else if(d>239&&d<365){const w=i[o++],v=i[o++],I=i[o++],_=((d&7)<<18|(w&63)<<12|(v&63)<<6|I&63)-65536;r[c++]=String.fromCharCode(55296+(_>>10)),r[c++]=String.fromCharCode(56320+(_&1023))}else{const w=i[o++],v=i[o++];r[c++]=String.fromCharCode((d&15)<<12|(w&63)<<6|v&63)}}return r.join("")},ai={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,r){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const o=r?this.byteToCharMapWebSafe_:this.byteToCharMap_,c=[];for(let d=0;d<i.length;d+=3){const w=i[d],v=d+1<i.length,I=v?i[d+1]:0,_=d+2<i.length,S=_?i[d+2]:0,F=w>>2,A=(w&3)<<4|I>>4;let E=(I&15)<<2|S>>6,P=S&63;_||(P=64,v||(E=64)),c.push(o[F],o[A],o[E],o[P])}return c.join("")},encodeString(i,r){return this.HAS_NATIVE_SUPPORT&&!r?btoa(i):this.encodeByteArray(oi(i),r)},decodeString(i,r){return this.HAS_NATIVE_SUPPORT&&!r?atob(i):ur(this.decodeStringToByteArray(i,r))},decodeStringToByteArray(i,r){this.init_();const o=r?this.charToByteMapWebSafe_:this.charToByteMap_,c=[];for(let d=0;d<i.length;){const w=o[i.charAt(d++)],I=d<i.length?o[i.charAt(d)]:0;++d;const S=d<i.length?o[i.charAt(d)]:64;++d;const A=d<i.length?o[i.charAt(d)]:64;if(++d,w==null||I==null||S==null||A==null)throw new fr;const E=w<<2|I>>4;if(c.push(E),S!==64){const P=I<<4&240|S>>2;if(c.push(P),A!==64){const k=S<<6&192|A;c.push(k)}}}return c},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class fr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pr=function(i){const r=oi(i);return ai.encodeByteArray(r,!0)},ne=function(i){return pr(i).replace(/\./g,"")},gr=function(i){try{return ai.decodeString(i,!0)}catch(r){console.error("base64Decode failed: ",r)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=()=>dr().__FIREBASE_DEFAULTS__,yr=()=>{if(typeof process>"u"||typeof Gn>"u")return;const i=Gn.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},vr=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const r=i&&gr(i[1]);return r&&JSON.parse(r)},se=()=>{try{return cr()||mr()||yr()||vr()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},wr=i=>{var r,o;return(o=(r=se())==null?void 0:r.emulatorHosts)==null?void 0:o[i]},xo=i=>{const r=wr(i);if(!r)return;const o=r.lastIndexOf(":");if(o<=0||o+1===r.length)throw new Error(`Invalid host ${r} with no separate hostname and port!`);const c=parseInt(r.substring(o+1),10);return r[0]==="["?[r.substring(1,o-1),c]:[r.substring(0,o),c]},hi=()=>{var i;return(i=se())==null?void 0:i.config},Po=i=>{var r;return(r=se())==null?void 0:r[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((r,o)=>{this.resolve=r,this.reject=o})}wrapCallback(r){return(o,c)=>{o?this.reject(o):this.resolve(c),typeof r=="function"&&(this.promise.catch(()=>{}),r.length===1?r(o):r(o,c))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Bo(i){return(await fetch(i,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(i,r){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const o={alg:"none",type:"JWT"},c=r||"demo-project",d=i.iat||0,w=i.sub||i.user_id;if(!w)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const v={iss:`https://securetoken.google.com/${c}`,aud:c,iat:d,exp:d+3600,auth_time:d,sub:w,user_id:w,firebase:{sign_in_provider:"custom",identities:{}},...i};return[ne(JSON.stringify(o)),ne(JSON.stringify(v)),""].join(".")}const Nt={};function Sr(){const i={prod:[],emulator:[]};for(const r of Object.keys(Nt))Nt[r]?i.emulator.push(r):i.prod.push(r);return i}function Cr(i){let r=document.getElementById(i),o=!1;return r||(r=document.createElement("div"),r.setAttribute("id",i),o=!0),{created:o,element:r}}let Kn=!1;function No(i,r){if(typeof window>"u"||typeof document>"u"||!Er(window.location.host)||Nt[i]===r||Nt[i]||Kn)return;Nt[i]=r;function o(E){return`__firebase__banner__${E}`}const c="__firebase__banner",w=Sr().prod.length>0;function v(){const E=document.getElementById(c);E&&E.remove()}function I(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function _(E,P){E.setAttribute("width","24"),E.setAttribute("id",P),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function S(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Kn=!0,v()},E}function F(E,P){E.setAttribute("id",P),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function A(){const E=Cr(c),P=o("text"),k=document.getElementById(P)||document.createElement("span"),j=o("learnmore"),R=document.getElementById(j)||document.createElement("a"),G=o("preprendIcon"),q=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const V=E.element;I(V),F(R,j);const J=S();_(q,G),V.append(q,k,R,J),document.body.appendChild(V)}w?(k.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",A):A()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ho(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(li())}function ci(){var r;const i=(r=se())==null?void 0:r.forceEnvironment;if(i==="node")return!0;if(i==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Lo(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Fo(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function $o(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Uo(){const i=li();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Vo(){return!ci()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zo(){return!ci()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Ir(){try{return typeof indexedDB=="object"}catch{return!1}}function Ar(){return new Promise((i,r)=>{try{let o=!0;const c="validate-browser-context-for-indexeddb-analytics-module",d=self.indexedDB.open(c);d.onsuccess=()=>{d.result.close(),o||self.indexedDB.deleteDatabase(c),i(!0)},d.onupgradeneeded=()=>{o=!1},d.onerror=()=>{var w;r(((w=d.error)==null?void 0:w.message)||"")}}catch(o){r(o)}})}function qo(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr="FirebaseError";class bt extends Error{constructor(r,o,c){super(o),this.code=r,this.customData=c,this.name=Tr,Object.setPrototypeOf(this,bt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$e.prototype.create)}}class $e{constructor(r,o,c){this.service=r,this.serviceName=o,this.errors=c}create(r,...o){const c=o[0]||{},d=`${this.service}/${r}`,w=this.errors[r],v=w?_r(w,c):"Error",I=`${this.serviceName}: ${v} (${d}).`;return new bt(d,I,c)}}function _r(i,r){return i.replace(Dr,(o,c)=>{const d=r[c];return d!=null?String(d):`<${c}?>`})}const Dr=/\{\$([^}]+)}/g;function Wo(i){for(const r in i)if(Object.prototype.hasOwnProperty.call(i,r))return!1;return!0}function je(i,r){if(i===r)return!0;const o=Object.keys(i),c=Object.keys(r);for(const d of o){if(!c.includes(d))return!1;const w=i[d],v=r[d];if(Jn(w)&&Jn(v)){if(!je(w,v))return!1}else if(w!==v)return!1}for(const d of c)if(!o.includes(d))return!1;return!0}function Jn(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(i){const r=[];for(const[o,c]of Object.entries(i))Array.isArray(c)?c.forEach(d=>{r.push(encodeURIComponent(o)+"="+encodeURIComponent(d))}):r.push(encodeURIComponent(o)+"="+encodeURIComponent(c));return r.length?"&"+r.join("&"):""}function Go(i){const r={};return i.replace(/^\?/,"").split("&").forEach(c=>{if(c){const[d,w]=c.split("=");r[decodeURIComponent(d)]=decodeURIComponent(w)}}),r}function Ko(i){const r=i.indexOf("?");if(!r)return"";const o=i.indexOf("#",r);return i.substring(r,o>0?o:void 0)}function Jo(i,r){const o=new Or(i,r);return o.subscribe.bind(o)}class Or{constructor(r,o){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=o,this.task.then(()=>{r(this)}).catch(c=>{this.error(c)})}next(r){this.forEachObserver(o=>{o.next(r)})}error(r){this.forEachObserver(o=>{o.error(r)}),this.close(r)}complete(){this.forEachObserver(r=>{r.complete()}),this.close()}subscribe(r,o,c){let d;if(r===void 0&&o===void 0&&c===void 0)throw new Error("Missing Observer.");Rr(r,["next","error","complete"])?d=r:d={next:r,error:o,complete:c},d.next===void 0&&(d.next=ke),d.error===void 0&&(d.error=ke),d.complete===void 0&&(d.complete=ke);const w=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?d.error(this.finalError):d.complete()}catch{}}),this.observers.push(d),w}unsubscribeOne(r){this.observers===void 0||this.observers[r]===void 0||(delete this.observers[r],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(r){if(!this.finalized)for(let o=0;o<this.observers.length;o++)this.sendOne(o,r)}sendOne(r,o){this.task.then(()=>{if(this.observers!==void 0&&this.observers[r]!==void 0)try{o(this.observers[r])}catch(c){typeof console<"u"&&console.error&&console.error(c)}})}close(r){this.finalized||(this.finalized=!0,r!==void 0&&(this.finalError=r),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Rr(i,r){if(typeof i!="object"||i===null)return!1;for(const o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}function ke(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=1e3,kr=2,xr=14400*1e3,Pr=.5;function Yo(i,r=Mr,o=kr){const c=r*Math.pow(o,i),d=Math.round(Pr*c*(Math.random()-.5)*2);return Math.min(xr,c+d)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(i){return i&&i._delegate?i._delegate:i}class wt{constructor(r,o,c){this.name=r,this.instanceFactory=o,this.type=c,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(r){return this.instantiationMode=r,this}setMultipleInstances(r){return this.multipleInstances=r,this}setServiceProps(r){return this.serviceProps=r,this}setInstanceCreatedCallback(r){return this.onInstanceCreated=r,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(r,o){this.name=r,this.container=o,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(r){const o=this.normalizeInstanceIdentifier(r);if(!this.instancesDeferred.has(o)){const c=new br;if(this.instancesDeferred.set(o,c),this.isInitialized(o)||this.shouldAutoInitialize())try{const d=this.getOrInitializeService({instanceIdentifier:o});d&&c.resolve(d)}catch{}}return this.instancesDeferred.get(o).promise}getImmediate(r){const o=this.normalizeInstanceIdentifier(r==null?void 0:r.identifier),c=(r==null?void 0:r.optional)??!1;if(this.isInitialized(o)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:o})}catch(d){if(c)return null;throw d}else{if(c)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(r){if(r.name!==this.name)throw Error(`Mismatching Component ${r.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=r,!!this.shouldAutoInitialize()){if(Nr(r))try{this.getOrInitializeService({instanceIdentifier:ut})}catch{}for(const[o,c]of this.instancesDeferred.entries()){const d=this.normalizeInstanceIdentifier(o);try{const w=this.getOrInitializeService({instanceIdentifier:d});c.resolve(w)}catch{}}}}clearInstance(r=ut){this.instancesDeferred.delete(r),this.instancesOptions.delete(r),this.instances.delete(r)}async delete(){const r=Array.from(this.instances.values());await Promise.all([...r.filter(o=>"INTERNAL"in o).map(o=>o.INTERNAL.delete()),...r.filter(o=>"_delete"in o).map(o=>o._delete())])}isComponentSet(){return this.component!=null}isInitialized(r=ut){return this.instances.has(r)}getOptions(r=ut){return this.instancesOptions.get(r)||{}}initialize(r={}){const{options:o={}}=r,c=this.normalizeInstanceIdentifier(r.instanceIdentifier);if(this.isInitialized(c))throw Error(`${this.name}(${c}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const d=this.getOrInitializeService({instanceIdentifier:c,options:o});for(const[w,v]of this.instancesDeferred.entries()){const I=this.normalizeInstanceIdentifier(w);c===I&&v.resolve(d)}return d}onInit(r,o){const c=this.normalizeInstanceIdentifier(o),d=this.onInitCallbacks.get(c)??new Set;d.add(r),this.onInitCallbacks.set(c,d);const w=this.instances.get(c);return w&&r(w,c),()=>{d.delete(r)}}invokeOnInitCallbacks(r,o){const c=this.onInitCallbacks.get(o);if(c)for(const d of c)try{d(r,o)}catch{}}getOrInitializeService({instanceIdentifier:r,options:o={}}){let c=this.instances.get(r);if(!c&&this.component&&(c=this.component.instanceFactory(this.container,{instanceIdentifier:jr(r),options:o}),this.instances.set(r,c),this.instancesOptions.set(r,o),this.invokeOnInitCallbacks(c,r),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,r,c)}catch{}return c||null}normalizeInstanceIdentifier(r=ut){return this.component?this.component.multipleInstances?r:ut:r}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jr(i){return i===ut?void 0:i}function Nr(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(r){this.name=r,this.providers=new Map}addComponent(r){const o=this.getProvider(r.name);if(o.isComponentSet())throw new Error(`Component ${r.name} has already been registered with ${this.name}`);o.setComponent(r)}addOrOverwriteComponent(r){this.getProvider(r.name).isComponentSet()&&this.providers.delete(r.name),this.addComponent(r)}getProvider(r){if(this.providers.has(r))return this.providers.get(r);const o=new Br(r,this);return this.providers.set(r,o),o}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(O||(O={}));const Lr={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Fr=O.INFO,$r={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Ur=(i,r,...o)=>{if(r<i.logLevel)return;const c=new Date().toISOString(),d=$r[r];if(d)console[d](`[${c}]  ${i.name}:`,...o);else throw new Error(`Attempted to log a message with an invalid logType (value: ${r})`)};class Vr{constructor(r){this.name=r,this._logLevel=Fr,this._logHandler=Ur,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(r){if(!(r in O))throw new TypeError(`Invalid value "${r}" assigned to \`logLevel\``);this._logLevel=r}setLogLevel(r){this._logLevel=typeof r=="string"?Lr[r]:r}get logHandler(){return this._logHandler}set logHandler(r){if(typeof r!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=r}get userLogHandler(){return this._userLogHandler}set userLogHandler(r){this._userLogHandler=r}debug(...r){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...r),this._logHandler(this,O.DEBUG,...r)}log(...r){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...r),this._logHandler(this,O.VERBOSE,...r)}info(...r){this._userLogHandler&&this._userLogHandler(this,O.INFO,...r),this._logHandler(this,O.INFO,...r)}warn(...r){this._userLogHandler&&this._userLogHandler(this,O.WARN,...r),this._logHandler(this,O.WARN,...r)}error(...r){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...r),this._logHandler(this,O.ERROR,...r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(r){this.container=r}getPlatformInfoString(){return this.container.getProviders().map(o=>{if(qr(o)){const c=o.getImmediate();return`${c.library}/${c.version}`}else return null}).filter(o=>o).join(" ")}}function qr(i){const r=i.getComponent();return(r==null?void 0:r.type)==="VERSION"}const Ne="@firebase/app",Yn="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=new Vr("@firebase/app"),Wr="@firebase/app-compat",Xr="@firebase/analytics-compat",Gr="@firebase/analytics",Kr="@firebase/app-check-compat",Jr="@firebase/app-check",Yr="@firebase/auth",Zr="@firebase/auth-compat",Qr="@firebase/database",ts="@firebase/data-connect",es="@firebase/database-compat",ns="@firebase/functions",is="@firebase/functions-compat",rs="@firebase/installations",ss="@firebase/installations-compat",os="@firebase/messaging",as="@firebase/messaging-compat",hs="@firebase/performance",ls="@firebase/performance-compat",cs="@firebase/remote-config",us="@firebase/remote-config-compat",fs="@firebase/storage",ps="@firebase/storage-compat",gs="@firebase/firestore",ds="@firebase/ai",ms="@firebase/firestore-compat",ys="firebase",vs="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="[DEFAULT]",ws={[Ne]:"fire-core",[Wr]:"fire-core-compat",[Gr]:"fire-analytics",[Xr]:"fire-analytics-compat",[Jr]:"fire-app-check",[Kr]:"fire-app-check-compat",[Yr]:"fire-auth",[Zr]:"fire-auth-compat",[Qr]:"fire-rtdb",[ts]:"fire-data-connect",[es]:"fire-rtdb-compat",[ns]:"fire-fn",[is]:"fire-fn-compat",[rs]:"fire-iid",[ss]:"fire-iid-compat",[os]:"fire-fcm",[as]:"fire-fcm-compat",[hs]:"fire-perf",[ls]:"fire-perf-compat",[cs]:"fire-rc",[us]:"fire-rc-compat",[fs]:"fire-gcs",[ps]:"fire-gcs-compat",[gs]:"fire-fst",[ms]:"fire-fst-compat",[ds]:"fire-vertex","fire-js":"fire-js",[ys]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new Map,bs=new Map,Le=new Map;function Zn(i,r){try{i.container.addComponent(r)}catch(o){K.debug(`Component ${r.name} failed to register with FirebaseApp ${i.name}`,o)}}function Ht(i){const r=i.name;if(Le.has(r))return K.debug(`There were multiple attempts to register component ${r}.`),!1;Le.set(r,i);for(const o of ie.values())Zn(o,i);for(const o of bs.values())Zn(o,i);return!0}function ui(i,r){const o=i.container.getProvider("heartbeat").getImmediate({optional:!0});return o&&o.triggerHeartbeat(),i.container.getProvider(r)}function Qo(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},rt=new $e("app","Firebase",Es);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(r,o,c){this._isDeleted=!1,this._options={...r},this._config={...o},this._name=o.name,this._automaticDataCollectionEnabled=o.automaticDataCollectionEnabled,this._container=c,this.container.addComponent(new wt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(r){this.checkDestroyed(),this._automaticDataCollectionEnabled=r}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(r){this._isDeleted=r}checkDestroyed(){if(this.isDeleted)throw rt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=vs;function Cs(i,r={}){let o=i;typeof r!="object"&&(r={name:r});const c={name:He,automaticDataCollectionEnabled:!0,...r},d=c.name;if(typeof d!="string"||!d)throw rt.create("bad-app-name",{appName:String(d)});if(o||(o=hi()),!o)throw rt.create("no-options");const w=ie.get(d);if(w){if(je(o,w.options)&&je(c,w.config))return w;throw rt.create("duplicate-app",{appName:d})}const v=new Hr(d);for(const _ of Le.values())v.addComponent(_);const I=new Ss(o,c,v);return ie.set(d,I),I}function ea(i=He){const r=ie.get(i);if(!r&&i===He&&hi())return Cs();if(!r)throw rt.create("no-app",{appName:i});return r}function vt(i,r,o){let c=ws[i]??i;o&&(c+=`-${o}`);const d=c.match(/\s|\//),w=r.match(/\s|\//);if(d||w){const v=[`Unable to register library "${c}" with version "${r}":`];d&&v.push(`library name "${c}" contains illegal characters (whitespace or "/")`),d&&w&&v.push("and"),w&&v.push(`version name "${r}" contains illegal characters (whitespace or "/")`),K.warn(v.join(" "));return}Ht(new wt(`${c}-version`,()=>({library:c,version:r}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is="firebase-heartbeat-database",As=1,Lt="firebase-heartbeat-store";let xe=null;function fi(){return xe||(xe=si(Is,As,{upgrade:(i,r)=>{switch(r){case 0:try{i.createObjectStore(Lt)}catch(o){console.warn(o)}}}}).catch(i=>{throw rt.create("idb-open",{originalErrorMessage:i.message})})),xe}async function Ts(i){try{const o=(await fi()).transaction(Lt),c=await o.objectStore(Lt).get(pi(i));return await o.done,c}catch(r){if(r instanceof bt)K.warn(r.message);else{const o=rt.create("idb-get",{originalErrorMessage:r==null?void 0:r.message});K.warn(o.message)}}}async function Qn(i,r){try{const c=(await fi()).transaction(Lt,"readwrite");await c.objectStore(Lt).put(r,pi(i)),await c.done}catch(o){if(o instanceof bt)K.warn(o.message);else{const c=rt.create("idb-set",{originalErrorMessage:o==null?void 0:o.message});K.warn(c.message)}}}function pi(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=1024,Ds=30;class Os{constructor(r){this.container=r,this._heartbeatsCache=null;const o=this.container.getProvider("app").getImmediate();this._storage=new Ms(o),this._heartbeatsCachePromise=this._storage.read().then(c=>(this._heartbeatsCache=c,c))}async triggerHeartbeat(){var r,o;try{const d=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),w=ti();if(((r=this._heartbeatsCache)==null?void 0:r.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((o=this._heartbeatsCache)==null?void 0:o.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===w||this._heartbeatsCache.heartbeats.some(v=>v.date===w))return;if(this._heartbeatsCache.heartbeats.push({date:w,agent:d}),this._heartbeatsCache.heartbeats.length>Ds){const v=ks(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(v,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(c){K.warn(c)}}async getHeartbeatsHeader(){var r;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((r=this._heartbeatsCache)==null?void 0:r.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const o=ti(),{heartbeatsToSend:c,unsentEntries:d}=Rs(this._heartbeatsCache.heartbeats),w=ne(JSON.stringify({version:2,heartbeats:c}));return this._heartbeatsCache.lastSentHeartbeatDate=o,d.length>0?(this._heartbeatsCache.heartbeats=d,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),w}catch(o){return K.warn(o),""}}}function ti(){return new Date().toISOString().substring(0,10)}function Rs(i,r=_s){const o=[];let c=i.slice();for(const d of i){const w=o.find(v=>v.agent===d.agent);if(w){if(w.dates.push(d.date),ei(o)>r){w.dates.pop();break}}else if(o.push({agent:d.agent,dates:[d.date]}),ei(o)>r){o.pop();break}c=c.slice(1)}return{heartbeatsToSend:o,unsentEntries:c}}class Ms{constructor(r){this.app=r,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ir()?Ar().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const o=await Ts(this.app);return o!=null&&o.heartbeats?o:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(r){if(await this._canUseIndexedDBPromise){const c=await this.read();return Qn(this.app,{lastSentHeartbeatDate:r.lastSentHeartbeatDate??c.lastSentHeartbeatDate,heartbeats:r.heartbeats})}else return}async add(r){if(await this._canUseIndexedDBPromise){const c=await this.read();return Qn(this.app,{lastSentHeartbeatDate:r.lastSentHeartbeatDate??c.lastSentHeartbeatDate,heartbeats:[...c.heartbeats,...r.heartbeats]})}else return}}function ei(i){return ne(JSON.stringify({version:2,heartbeats:i})).length}function ks(i){if(i.length===0)return-1;let r=0,o=i[0].date;for(let c=1;c<i.length;c++)i[c].date<o&&(o=i[c].date,r=c);return r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(i){Ht(new wt("platform-logger",r=>new zr(r),"PRIVATE")),Ht(new wt("heartbeat",r=>new Os(r),"PRIVATE")),vt(Ne,Yn,i),vt(Ne,Yn,"esm2020"),vt("fire-js","")}xs("");var Ps="firebase",Bs="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt(Ps,Bs,"app");const gi="@firebase/installations",Ue="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=1e4,mi=`w:${Ue}`,yi="FIS_v2",js="https://firebaseinstallations.googleapis.com/v1",Ns=3600*1e3,Hs="installations",Ls="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},pt=new $e(Hs,Ls,Fs);function vi(i){return i instanceof bt&&i.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi({projectId:i}){return`${js}/projects/${i}/installations`}function bi(i){return{token:i.token,requestStatus:2,expiresIn:Us(i.expiresIn),creationTime:Date.now()}}async function Ei(i,r){const c=(await r.json()).error;return pt.create("request-failed",{requestName:i,serverCode:c.code,serverMessage:c.message,serverStatus:c.status})}function Si({apiKey:i}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":i})}function $s(i,{refreshToken:r}){const o=Si(i);return o.append("Authorization",Vs(r)),o}async function Ci(i){const r=await i();return r.status>=500&&r.status<600?i():r}function Us(i){return Number(i.replace("s","000"))}function Vs(i){return`${yi} ${i}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zs({appConfig:i,heartbeatServiceProvider:r},{fid:o}){const c=wi(i),d=Si(i),w=r.getImmediate({optional:!0});if(w){const S=await w.getHeartbeatsHeader();S&&d.append("x-firebase-client",S)}const v={fid:o,authVersion:yi,appId:i.appId,sdkVersion:mi},I={method:"POST",headers:d,body:JSON.stringify(v)},_=await Ci(()=>fetch(c,I));if(_.ok){const S=await _.json();return{fid:S.fid||o,registrationStatus:2,refreshToken:S.refreshToken,authToken:bi(S.authToken)}}else throw await Ei("Create Installation",_)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(i){return new Promise(r=>{setTimeout(r,i)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(i){return btoa(String.fromCharCode(...i)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws=/^[cdef][\w-]{21}$/,Fe="";function Xs(){try{const i=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(i),i[0]=112+i[0]%16;const o=Gs(i);return Ws.test(o)?o:Fe}catch{return Fe}}function Gs(i){return qs(i).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(i){return`${i.appName}!${i.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai=new Map;function Ti(i,r){const o=oe(i);_i(o,r),Ks(o,r)}function _i(i,r){const o=Ai.get(i);if(o)for(const c of o)c(r)}function Ks(i,r){const o=Js();o&&o.postMessage({key:i,fid:r}),Ys()}let ft=null;function Js(){return!ft&&"BroadcastChannel"in self&&(ft=new BroadcastChannel("[Firebase] FID Change"),ft.onmessage=i=>{_i(i.data.key,i.data.fid)}),ft}function Ys(){Ai.size===0&&ft&&(ft.close(),ft=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs="firebase-installations-database",Qs=1,gt="firebase-installations-store";let Pe=null;function Ve(){return Pe||(Pe=si(Zs,Qs,{upgrade:(i,r)=>{switch(r){case 0:i.createObjectStore(gt)}}})),Pe}async function re(i,r){const o=oe(i),d=(await Ve()).transaction(gt,"readwrite"),w=d.objectStore(gt),v=await w.get(o);return await w.put(r,o),await d.done,(!v||v.fid!==r.fid)&&Ti(i,r.fid),r}async function Di(i){const r=oe(i),c=(await Ve()).transaction(gt,"readwrite");await c.objectStore(gt).delete(r),await c.done}async function ae(i,r){const o=oe(i),d=(await Ve()).transaction(gt,"readwrite"),w=d.objectStore(gt),v=await w.get(o),I=r(v);return I===void 0?await w.delete(o):await w.put(I,o),await d.done,I&&(!v||v.fid!==I.fid)&&Ti(i,I.fid),I}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ze(i){let r;const o=await ae(i.appConfig,c=>{const d=to(c),w=eo(i,d);return r=w.registrationPromise,w.installationEntry});return o.fid===Fe?{installationEntry:await r}:{installationEntry:o,registrationPromise:r}}function to(i){const r=i||{fid:Xs(),registrationStatus:0};return Oi(r)}function eo(i,r){if(r.registrationStatus===0){if(!navigator.onLine){const d=Promise.reject(pt.create("app-offline"));return{installationEntry:r,registrationPromise:d}}const o={fid:r.fid,registrationStatus:1,registrationTime:Date.now()},c=no(i,o);return{installationEntry:o,registrationPromise:c}}else return r.registrationStatus===1?{installationEntry:r,registrationPromise:io(i)}:{installationEntry:r}}async function no(i,r){try{const o=await zs(i,r);return re(i.appConfig,o)}catch(o){throw vi(o)&&o.customData.serverCode===409?await Di(i.appConfig):await re(i.appConfig,{fid:r.fid,registrationStatus:0}),o}}async function io(i){let r=await ni(i.appConfig);for(;r.registrationStatus===1;)await Ii(100),r=await ni(i.appConfig);if(r.registrationStatus===0){const{installationEntry:o,registrationPromise:c}=await ze(i);return c||o}return r}function ni(i){return ae(i,r=>{if(!r)throw pt.create("installation-not-found");return Oi(r)})}function Oi(i){return ro(i)?{fid:i.fid,registrationStatus:0}:i}function ro(i){return i.registrationStatus===1&&i.registrationTime+di<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function so({appConfig:i,heartbeatServiceProvider:r},o){const c=oo(i,o),d=$s(i,o),w=r.getImmediate({optional:!0});if(w){const S=await w.getHeartbeatsHeader();S&&d.append("x-firebase-client",S)}const v={installation:{sdkVersion:mi,appId:i.appId}},I={method:"POST",headers:d,body:JSON.stringify(v)},_=await Ci(()=>fetch(c,I));if(_.ok){const S=await _.json();return bi(S)}else throw await Ei("Generate Auth Token",_)}function oo(i,{fid:r}){return`${wi(i)}/${r}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qe(i,r=!1){let o;const c=await ae(i.appConfig,w=>{if(!Ri(w))throw pt.create("not-registered");const v=w.authToken;if(!r&&lo(v))return w;if(v.requestStatus===1)return o=ao(i,r),w;{if(!navigator.onLine)throw pt.create("app-offline");const I=uo(w);return o=ho(i,I),I}});return o?await o:c.authToken}async function ao(i,r){let o=await ii(i.appConfig);for(;o.authToken.requestStatus===1;)await Ii(100),o=await ii(i.appConfig);const c=o.authToken;return c.requestStatus===0?qe(i,r):c}function ii(i){return ae(i,r=>{if(!Ri(r))throw pt.create("not-registered");const o=r.authToken;return fo(o)?{...r,authToken:{requestStatus:0}}:r})}async function ho(i,r){try{const o=await so(i,r),c={...r,authToken:o};return await re(i.appConfig,c),o}catch(o){if(vi(o)&&(o.customData.serverCode===401||o.customData.serverCode===404))await Di(i.appConfig);else{const c={...r,authToken:{requestStatus:0}};await re(i.appConfig,c)}throw o}}function Ri(i){return i!==void 0&&i.registrationStatus===2}function lo(i){return i.requestStatus===2&&!co(i)}function co(i){const r=Date.now();return r<i.creationTime||i.creationTime+i.expiresIn<r+Ns}function uo(i){const r={requestStatus:1,requestTime:Date.now()};return{...i,authToken:r}}function fo(i){return i.requestStatus===1&&i.requestTime+di<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(i){const r=i,{installationEntry:o,registrationPromise:c}=await ze(r);return c?c.catch(console.error):qe(r).catch(console.error),o.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(i,r=!1){const o=i;return await mo(o),(await qe(o,r)).token}async function mo(i){const{registrationPromise:r}=await ze(i);r&&await r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(i){if(!i||!i.options)throw Be("App Configuration");if(!i.name)throw Be("App Name");const r=["projectId","apiKey","appId"];for(const o of r)if(!i.options[o])throw Be(o);return{appName:i.name,projectId:i.options.projectId,apiKey:i.options.apiKey,appId:i.options.appId}}function Be(i){return pt.create("missing-app-config-values",{valueName:i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi="installations",vo="installations-internal",wo=i=>{const r=i.getProvider("app").getImmediate(),o=yo(r),c=ui(r,"heartbeat");return{app:r,appConfig:o,heartbeatServiceProvider:c,_delete:()=>Promise.resolve()}},bo=i=>{const r=i.getProvider("app").getImmediate(),o=ui(r,Mi).getImmediate();return{getId:()=>po(o),getToken:d=>go(o,d)}};function Eo(){Ht(new wt(Mi,wo,"PUBLIC")),Ht(new wt(vo,bo,"PRIVATE"))}Eo();vt(gi,Ue);vt(gi,Ue,"esm2020");var ri=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var So,Co;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function r(f,a){function l(){}l.prototype=a.prototype,f.F=a.prototype,f.prototype=new l,f.prototype.constructor=f,f.D=function(p,u,m){for(var h=Array(arguments.length-2),$=2;$<arguments.length;$++)h[$-2]=arguments[$];return a.prototype[u].apply(p,h)}}function o(){this.blockSize=-1}function c(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}r(c,o),c.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function d(f,a,l){l||(l=0);const p=Array(16);if(typeof a=="string")for(var u=0;u<16;++u)p[u]=a.charCodeAt(l++)|a.charCodeAt(l++)<<8|a.charCodeAt(l++)<<16|a.charCodeAt(l++)<<24;else for(u=0;u<16;++u)p[u]=a[l++]|a[l++]<<8|a[l++]<<16|a[l++]<<24;a=f.g[0],l=f.g[1],u=f.g[2];let m=f.g[3],h;h=a+(m^l&(u^m))+p[0]+3614090360&4294967295,a=l+(h<<7&4294967295|h>>>25),h=m+(u^a&(l^u))+p[1]+3905402710&4294967295,m=a+(h<<12&4294967295|h>>>20),h=u+(l^m&(a^l))+p[2]+606105819&4294967295,u=m+(h<<17&4294967295|h>>>15),h=l+(a^u&(m^a))+p[3]+3250441966&4294967295,l=u+(h<<22&4294967295|h>>>10),h=a+(m^l&(u^m))+p[4]+4118548399&4294967295,a=l+(h<<7&4294967295|h>>>25),h=m+(u^a&(l^u))+p[5]+1200080426&4294967295,m=a+(h<<12&4294967295|h>>>20),h=u+(l^m&(a^l))+p[6]+2821735955&4294967295,u=m+(h<<17&4294967295|h>>>15),h=l+(a^u&(m^a))+p[7]+4249261313&4294967295,l=u+(h<<22&4294967295|h>>>10),h=a+(m^l&(u^m))+p[8]+1770035416&4294967295,a=l+(h<<7&4294967295|h>>>25),h=m+(u^a&(l^u))+p[9]+2336552879&4294967295,m=a+(h<<12&4294967295|h>>>20),h=u+(l^m&(a^l))+p[10]+4294925233&4294967295,u=m+(h<<17&4294967295|h>>>15),h=l+(a^u&(m^a))+p[11]+2304563134&4294967295,l=u+(h<<22&4294967295|h>>>10),h=a+(m^l&(u^m))+p[12]+1804603682&4294967295,a=l+(h<<7&4294967295|h>>>25),h=m+(u^a&(l^u))+p[13]+4254626195&4294967295,m=a+(h<<12&4294967295|h>>>20),h=u+(l^m&(a^l))+p[14]+2792965006&4294967295,u=m+(h<<17&4294967295|h>>>15),h=l+(a^u&(m^a))+p[15]+1236535329&4294967295,l=u+(h<<22&4294967295|h>>>10),h=a+(u^m&(l^u))+p[1]+4129170786&4294967295,a=l+(h<<5&4294967295|h>>>27),h=m+(l^u&(a^l))+p[6]+3225465664&4294967295,m=a+(h<<9&4294967295|h>>>23),h=u+(a^l&(m^a))+p[11]+643717713&4294967295,u=m+(h<<14&4294967295|h>>>18),h=l+(m^a&(u^m))+p[0]+3921069994&4294967295,l=u+(h<<20&4294967295|h>>>12),h=a+(u^m&(l^u))+p[5]+3593408605&4294967295,a=l+(h<<5&4294967295|h>>>27),h=m+(l^u&(a^l))+p[10]+38016083&4294967295,m=a+(h<<9&4294967295|h>>>23),h=u+(a^l&(m^a))+p[15]+3634488961&4294967295,u=m+(h<<14&4294967295|h>>>18),h=l+(m^a&(u^m))+p[4]+3889429448&4294967295,l=u+(h<<20&4294967295|h>>>12),h=a+(u^m&(l^u))+p[9]+568446438&4294967295,a=l+(h<<5&4294967295|h>>>27),h=m+(l^u&(a^l))+p[14]+3275163606&4294967295,m=a+(h<<9&4294967295|h>>>23),h=u+(a^l&(m^a))+p[3]+4107603335&4294967295,u=m+(h<<14&4294967295|h>>>18),h=l+(m^a&(u^m))+p[8]+1163531501&4294967295,l=u+(h<<20&4294967295|h>>>12),h=a+(u^m&(l^u))+p[13]+2850285829&4294967295,a=l+(h<<5&4294967295|h>>>27),h=m+(l^u&(a^l))+p[2]+4243563512&4294967295,m=a+(h<<9&4294967295|h>>>23),h=u+(a^l&(m^a))+p[7]+1735328473&4294967295,u=m+(h<<14&4294967295|h>>>18),h=l+(m^a&(u^m))+p[12]+2368359562&4294967295,l=u+(h<<20&4294967295|h>>>12),h=a+(l^u^m)+p[5]+4294588738&4294967295,a=l+(h<<4&4294967295|h>>>28),h=m+(a^l^u)+p[8]+2272392833&4294967295,m=a+(h<<11&4294967295|h>>>21),h=u+(m^a^l)+p[11]+1839030562&4294967295,u=m+(h<<16&4294967295|h>>>16),h=l+(u^m^a)+p[14]+4259657740&4294967295,l=u+(h<<23&4294967295|h>>>9),h=a+(l^u^m)+p[1]+2763975236&4294967295,a=l+(h<<4&4294967295|h>>>28),h=m+(a^l^u)+p[4]+1272893353&4294967295,m=a+(h<<11&4294967295|h>>>21),h=u+(m^a^l)+p[7]+4139469664&4294967295,u=m+(h<<16&4294967295|h>>>16),h=l+(u^m^a)+p[10]+3200236656&4294967295,l=u+(h<<23&4294967295|h>>>9),h=a+(l^u^m)+p[13]+681279174&4294967295,a=l+(h<<4&4294967295|h>>>28),h=m+(a^l^u)+p[0]+3936430074&4294967295,m=a+(h<<11&4294967295|h>>>21),h=u+(m^a^l)+p[3]+3572445317&4294967295,u=m+(h<<16&4294967295|h>>>16),h=l+(u^m^a)+p[6]+76029189&4294967295,l=u+(h<<23&4294967295|h>>>9),h=a+(l^u^m)+p[9]+3654602809&4294967295,a=l+(h<<4&4294967295|h>>>28),h=m+(a^l^u)+p[12]+3873151461&4294967295,m=a+(h<<11&4294967295|h>>>21),h=u+(m^a^l)+p[15]+530742520&4294967295,u=m+(h<<16&4294967295|h>>>16),h=l+(u^m^a)+p[2]+3299628645&4294967295,l=u+(h<<23&4294967295|h>>>9),h=a+(u^(l|~m))+p[0]+4096336452&4294967295,a=l+(h<<6&4294967295|h>>>26),h=m+(l^(a|~u))+p[7]+1126891415&4294967295,m=a+(h<<10&4294967295|h>>>22),h=u+(a^(m|~l))+p[14]+2878612391&4294967295,u=m+(h<<15&4294967295|h>>>17),h=l+(m^(u|~a))+p[5]+4237533241&4294967295,l=u+(h<<21&4294967295|h>>>11),h=a+(u^(l|~m))+p[12]+1700485571&4294967295,a=l+(h<<6&4294967295|h>>>26),h=m+(l^(a|~u))+p[3]+2399980690&4294967295,m=a+(h<<10&4294967295|h>>>22),h=u+(a^(m|~l))+p[10]+4293915773&4294967295,u=m+(h<<15&4294967295|h>>>17),h=l+(m^(u|~a))+p[1]+2240044497&4294967295,l=u+(h<<21&4294967295|h>>>11),h=a+(u^(l|~m))+p[8]+1873313359&4294967295,a=l+(h<<6&4294967295|h>>>26),h=m+(l^(a|~u))+p[15]+4264355552&4294967295,m=a+(h<<10&4294967295|h>>>22),h=u+(a^(m|~l))+p[6]+2734768916&4294967295,u=m+(h<<15&4294967295|h>>>17),h=l+(m^(u|~a))+p[13]+1309151649&4294967295,l=u+(h<<21&4294967295|h>>>11),h=a+(u^(l|~m))+p[4]+4149444226&4294967295,a=l+(h<<6&4294967295|h>>>26),h=m+(l^(a|~u))+p[11]+3174756917&4294967295,m=a+(h<<10&4294967295|h>>>22),h=u+(a^(m|~l))+p[2]+718787259&4294967295,u=m+(h<<15&4294967295|h>>>17),h=l+(m^(u|~a))+p[9]+3951481745&4294967295,f.g[0]=f.g[0]+a&4294967295,f.g[1]=f.g[1]+(u+(h<<21&4294967295|h>>>11))&4294967295,f.g[2]=f.g[2]+u&4294967295,f.g[3]=f.g[3]+m&4294967295}c.prototype.v=function(f,a){a===void 0&&(a=f.length);const l=a-this.blockSize,p=this.C;let u=this.h,m=0;for(;m<a;){if(u==0)for(;m<=l;)d(this,f,m),m+=this.blockSize;if(typeof f=="string"){for(;m<a;)if(p[u++]=f.charCodeAt(m++),u==this.blockSize){d(this,p),u=0;break}}else for(;m<a;)if(p[u++]=f[m++],u==this.blockSize){d(this,p),u=0;break}}this.h=u,this.o+=a},c.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var a=1;a<f.length-8;++a)f[a]=0;a=this.o*8;for(var l=f.length-8;l<f.length;++l)f[l]=a&255,a/=256;for(this.v(f),f=Array(16),a=0,l=0;l<4;++l)for(let p=0;p<32;p+=8)f[a++]=this.g[l]>>>p&255;return f};function w(f,a){var l=I;return Object.prototype.hasOwnProperty.call(l,f)?l[f]:l[f]=a(f)}function v(f,a){this.h=a;const l=[];let p=!0;for(let u=f.length-1;u>=0;u--){const m=f[u]|0;p&&m==a||(l[u]=m,p=!1)}this.g=l}var I={};function _(f){return-128<=f&&f<128?w(f,function(a){return new v([a|0],a<0?-1:0)}):new v([f|0],f<0?-1:0)}function S(f){if(isNaN(f)||!isFinite(f))return A;if(f<0)return R(S(-f));const a=[];let l=1;for(let p=0;f>=l;p++)a[p]=f/l|0,l*=4294967296;return new v(a,0)}function F(f,a){if(f.length==0)throw Error("number format error: empty string");if(a=a||10,a<2||36<a)throw Error("radix out of range: "+a);if(f.charAt(0)=="-")return R(F(f.substring(1),a));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');const l=S(Math.pow(a,8));let p=A;for(let m=0;m<f.length;m+=8){var u=Math.min(8,f.length-m);const h=parseInt(f.substring(m,m+u),a);u<8?(u=S(Math.pow(a,u)),p=p.j(u).add(S(h))):(p=p.j(l),p=p.add(S(h)))}return p}var A=_(0),E=_(1),P=_(16777216);i=v.prototype,i.m=function(){if(j(this))return-R(this).m();let f=0,a=1;for(let l=0;l<this.g.length;l++){const p=this.i(l);f+=(p>=0?p:4294967296+p)*a,a*=4294967296}return f},i.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(k(this))return"0";if(j(this))return"-"+R(this).toString(f);const a=S(Math.pow(f,6));var l=this;let p="";for(;;){const u=J(l,a).g;l=G(l,u.j(a));let m=((l.g.length>0?l.g[0]:l.h)>>>0).toString(f);if(l=u,k(l))return m+p;for(;m.length<6;)m="0"+m;p=m+p}},i.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function k(f){if(f.h!=0)return!1;for(let a=0;a<f.g.length;a++)if(f.g[a]!=0)return!1;return!0}function j(f){return f.h==-1}i.l=function(f){return f=G(this,f),j(f)?-1:k(f)?0:1};function R(f){const a=f.g.length,l=[];for(let p=0;p<a;p++)l[p]=~f.g[p];return new v(l,~f.h).add(E)}i.abs=function(){return j(this)?R(this):this},i.add=function(f){const a=Math.max(this.g.length,f.g.length),l=[];let p=0;for(let u=0;u<=a;u++){let m=p+(this.i(u)&65535)+(f.i(u)&65535),h=(m>>>16)+(this.i(u)>>>16)+(f.i(u)>>>16);p=h>>>16,m&=65535,h&=65535,l[u]=h<<16|m}return new v(l,l[l.length-1]&-2147483648?-1:0)};function G(f,a){return f.add(R(a))}i.j=function(f){if(k(this)||k(f))return A;if(j(this))return j(f)?R(this).j(R(f)):R(R(this).j(f));if(j(f))return R(this.j(R(f)));if(this.l(P)<0&&f.l(P)<0)return S(this.m()*f.m());const a=this.g.length+f.g.length,l=[];for(var p=0;p<2*a;p++)l[p]=0;for(p=0;p<this.g.length;p++)for(let u=0;u<f.g.length;u++){const m=this.i(p)>>>16,h=this.i(p)&65535,$=f.i(u)>>>16,st=f.i(u)&65535;l[2*p+2*u]+=h*st,q(l,2*p+2*u),l[2*p+2*u+1]+=m*st,q(l,2*p+2*u+1),l[2*p+2*u+1]+=h*$,q(l,2*p+2*u+1),l[2*p+2*u+2]+=m*$,q(l,2*p+2*u+2)}for(f=0;f<a;f++)l[f]=l[2*f+1]<<16|l[2*f];for(f=a;f<2*a;f++)l[f]=0;return new v(l,0)};function q(f,a){for(;(f[a]&65535)!=f[a];)f[a+1]+=f[a]>>>16,f[a]&=65535,a++}function V(f,a){this.g=f,this.h=a}function J(f,a){if(k(a))throw Error("division by zero");if(k(f))return new V(A,A);if(j(f))return a=J(R(f),a),new V(R(a.g),R(a.h));if(j(a))return a=J(f,R(a)),new V(R(a.g),a.h);if(f.g.length>30){if(j(f)||j(a))throw Error("slowDivide_ only works with positive integers.");for(var l=E,p=a;p.l(f)<=0;)l=Y(l),p=Y(p);var u=z(l,1),m=z(p,1);for(p=z(p,2),l=z(l,2);!k(p);){var h=m.add(p);h.l(f)<=0&&(u=u.add(l),m=h),p=z(p,1),l=z(l,1)}return a=G(f,u.j(a)),new V(u,a)}for(u=A;f.l(a)>=0;){for(l=Math.max(1,Math.floor(f.m()/a.m())),p=Math.ceil(Math.log(l)/Math.LN2),p=p<=48?1:Math.pow(2,p-48),m=S(l),h=m.j(a);j(h)||h.l(f)>0;)l-=p,m=S(l),h=m.j(a);k(m)&&(m=E),u=u.add(m),f=G(f,h)}return new V(u,f)}i.B=function(f){return J(this,f).h},i.and=function(f){const a=Math.max(this.g.length,f.g.length),l=[];for(let p=0;p<a;p++)l[p]=this.i(p)&f.i(p);return new v(l,this.h&f.h)},i.or=function(f){const a=Math.max(this.g.length,f.g.length),l=[];for(let p=0;p<a;p++)l[p]=this.i(p)|f.i(p);return new v(l,this.h|f.h)},i.xor=function(f){const a=Math.max(this.g.length,f.g.length),l=[];for(let p=0;p<a;p++)l[p]=this.i(p)^f.i(p);return new v(l,this.h^f.h)};function Y(f){const a=f.g.length+1,l=[];for(let p=0;p<a;p++)l[p]=f.i(p)<<1|f.i(p-1)>>>31;return new v(l,f.h)}function z(f,a){const l=a>>5;a%=32;const p=f.g.length-l,u=[];for(let m=0;m<p;m++)u[m]=a>0?f.i(m+l)>>>a|f.i(m+l+1)<<32-a:f.i(m+l);return new v(u,f.h)}c.prototype.digest=c.prototype.A,c.prototype.reset=c.prototype.u,c.prototype.update=c.prototype.v,Co=c,v.prototype.add=v.prototype.add,v.prototype.multiply=v.prototype.j,v.prototype.modulo=v.prototype.B,v.prototype.compare=v.prototype.l,v.prototype.toNumber=v.prototype.m,v.prototype.toString=v.prototype.toString,v.prototype.getBits=v.prototype.i,v.fromNumber=S,v.fromString=F,So=v}).apply(typeof ri<"u"?ri:typeof self<"u"?self:typeof window<"u"?window:{});var ee=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Io,Ao,To,_o,Do,Oo,Ro,Mo;(function(){var i,r=Object.defineProperty;function o(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof ee=="object"&&ee];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}var c=o(this);function d(t,e){if(e)t:{var n=c;t=t.split(".");for(var s=0;s<t.length-1;s++){var g=t[s];if(!(g in n))break t;n=n[g]}t=t[t.length-1],s=n[t],e=e(s),e!=s&&e!=null&&r(n,t,{configurable:!0,writable:!0,value:e})}}d("Symbol.dispose",function(t){return t||Symbol("Symbol.dispose")}),d("Array.prototype.values",function(t){return t||function(){return this[Symbol.iterator]()}}),d("Object.entries",function(t){return t||function(e){var n=[],s;for(s in e)Object.prototype.hasOwnProperty.call(e,s)&&n.push([s,e[s]]);return n}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var w=w||{},v=this||self;function I(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function _(t,e,n){return t.call.apply(t.bind,arguments)}function S(t,e,n){return S=_,S.apply(null,arguments)}function F(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function A(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Ob=function(s,g,y){for(var b=Array(arguments.length-2),C=2;C<arguments.length;C++)b[C-2]=arguments[C];return e.prototype[g].apply(s,b)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?t=>t&&AsyncContext.Snapshot.wrap(t):t=>t;function P(t){const e=t.length;if(e>0){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function k(t,e){for(let s=1;s<arguments.length;s++){const g=arguments[s];var n=typeof g;if(n=n!="object"?n:g?Array.isArray(g)?"array":n:"null",n=="array"||n=="object"&&typeof g.length=="number"){n=t.length||0;const y=g.length||0;t.length=n+y;for(let b=0;b<y;b++)t[n+b]=g[b]}else t.push(g)}}class j{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function R(t){v.setTimeout(()=>{throw t},0)}function G(){var t=f;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class q{constructor(){this.h=this.g=null}add(e,n){const s=V.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var V=new j(()=>new J,t=>t.reset());class J{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}let Y,z=!1,f=new q,a=()=>{const t=Promise.resolve(void 0);Y=()=>{t.then(l)}};function l(){for(var t;t=G();){try{t.h.call(t.g)}catch(n){R(n)}var e=V;e.j(t),e.h<100&&(e.h++,t.next=e.g,e.g=t)}z=!1}function p(){this.u=this.u,this.C=this.C}p.prototype.u=!1,p.prototype.dispose=function(){this.u||(this.u=!0,this.N())},p.prototype[Symbol.dispose]=function(){this.dispose()},p.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function u(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}u.prototype.h=function(){this.defaultPrevented=!0};var m=(function(){if(!v.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const n=()=>{};v.addEventListener("test",n,e),v.removeEventListener("test",n,e)}catch{}return t})();function h(t){return/^[\s\xa0]*$/.test(t)}function $(t,e){u.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t&&this.init(t,e)}A($,u),$.prototype.init=function(t,e){const n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget,e||(n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement)),this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=t.pointerType,this.state=t.state,this.i=t,t.defaultPrevented&&$.Z.h.call(this)},$.prototype.h=function(){$.Z.h.call(this);const t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var st="closure_listenable_"+(Math.random()*1e6|0),ki=0;function xi(t,e,n,s,g){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=g,this.key=++ki,this.da=this.fa=!1}function Ft(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function $t(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function Pi(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function We(t){const e={};for(const n in t)e[n]=t[n];return e}const Xe="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ge(t,e){let n,s;for(let g=1;g<arguments.length;g++){s=arguments[g];for(n in s)t[n]=s[n];for(let y=0;y<Xe.length;y++)n=Xe[y],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function Ut(t){this.src=t,this.g={},this.h=0}Ut.prototype.add=function(t,e,n,s,g){const y=t.toString();t=this.g[y],t||(t=this.g[y]=[],this.h++);const b=le(t,e,s,g);return b>-1?(e=t[b],n||(e.fa=!1)):(e=new xi(e,this.src,y,!!s,g),e.fa=n,t.push(e)),e};function he(t,e){const n=e.type;if(n in t.g){var s=t.g[n],g=Array.prototype.indexOf.call(s,e,void 0),y;(y=g>=0)&&Array.prototype.splice.call(s,g,1),y&&(Ft(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function le(t,e,n,s){for(let g=0;g<t.length;++g){const y=t[g];if(!y.da&&y.listener==e&&y.capture==!!n&&y.ha==s)return g}return-1}var ce="closure_lm_"+(Math.random()*1e6|0),ue={};function Ke(t,e,n,s,g){if(Array.isArray(e)){for(let y=0;y<e.length;y++)Ke(t,e[y],n,s,g);return null}return n=Ze(n),t&&t[st]?t.J(e,n,I(s)?!!s.capture:!1,g):Bi(t,e,n,!1,s,g)}function Bi(t,e,n,s,g,y){if(!e)throw Error("Invalid event type");const b=I(g)?!!g.capture:!!g;let C=pe(t);if(C||(t[ce]=C=new Ut(t)),n=C.add(e,n,s,b,y),n.proxy)return n;if(s=ji(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)m||(g=b),g===void 0&&(g=!1),t.addEventListener(e.toString(),s,g);else if(t.attachEvent)t.attachEvent(Ye(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function ji(){function t(n){return e.call(t.src,t.listener,n)}const e=Ni;return t}function Je(t,e,n,s,g){if(Array.isArray(e))for(var y=0;y<e.length;y++)Je(t,e[y],n,s,g);else s=I(s)?!!s.capture:!!s,n=Ze(n),t&&t[st]?(t=t.i,y=String(e).toString(),y in t.g&&(e=t.g[y],n=le(e,n,s,g),n>-1&&(Ft(e[n]),Array.prototype.splice.call(e,n,1),e.length==0&&(delete t.g[y],t.h--)))):t&&(t=pe(t))&&(e=t.g[e.toString()],t=-1,e&&(t=le(e,n,s,g)),(n=t>-1?e[t]:null)&&fe(n))}function fe(t){if(typeof t!="number"&&t&&!t.da){var e=t.src;if(e&&e[st])he(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(Ye(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=pe(e))?(he(n,t),n.h==0&&(n.src=null,e[ce]=null)):Ft(t)}}}function Ye(t){return t in ue?ue[t]:ue[t]="on"+t}function Ni(t,e){if(t.da)t=!0;else{e=new $(e,this);const n=t.listener,s=t.ha||t.src;t.fa&&fe(t),t=n.call(s,e)}return t}function pe(t){return t=t[ce],t instanceof Ut?t:null}var ge="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ze(t){return typeof t=="function"?t:(t[ge]||(t[ge]=function(e){return t.handleEvent(e)}),t[ge])}function N(){p.call(this),this.i=new Ut(this),this.M=this,this.G=null}A(N,p),N.prototype[st]=!0,N.prototype.removeEventListener=function(t,e,n,s){Je(this,t,e,n,s)};function H(t,e){var n,s=t.G;if(s)for(n=[];s;s=s.G)n.push(s);if(t=t.M,s=e.type||e,typeof e=="string")e=new u(e,t);else if(e instanceof u)e.target=e.target||t;else{var g=e;e=new u(s,t),Ge(e,g)}g=!0;let y,b;if(n)for(b=n.length-1;b>=0;b--)y=e.g=n[b],g=Vt(y,s,!0,e)&&g;if(y=e.g=t,g=Vt(y,s,!0,e)&&g,g=Vt(y,s,!1,e)&&g,n)for(b=0;b<n.length;b++)y=e.g=n[b],g=Vt(y,s,!1,e)&&g}N.prototype.N=function(){if(N.Z.N.call(this),this.i){var t=this.i;for(const e in t.g){const n=t.g[e];for(let s=0;s<n.length;s++)Ft(n[s]);delete t.g[e],t.h--}}this.G=null},N.prototype.J=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},N.prototype.K=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function Vt(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();let g=!0;for(let y=0;y<e.length;++y){const b=e[y];if(b&&!b.da&&b.capture==n){const C=b.listener,x=b.ha||b.src;b.fa&&he(t.i,b),g=C.call(x,s)!==!1&&g}}return g&&!s.defaultPrevented}function Hi(t,e){if(typeof t!="function")if(t&&typeof t.handleEvent=="function")t=S(t.handleEvent,t);else throw Error("Invalid listener argument");return Number(e)>2147483647?-1:v.setTimeout(t,e||0)}function Qe(t){t.g=Hi(()=>{t.g=null,t.i&&(t.i=!1,Qe(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}class Li extends p{constructor(e,n){super(),this.m=e,this.l=n,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Qe(this)}N(){super.N(),this.g&&(v.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Et(t){p.call(this),this.h=t,this.g={}}A(Et,p);var tn=[];function en(t){$t(t.g,function(e,n){this.g.hasOwnProperty(n)&&fe(e)},t),t.g={}}Et.prototype.N=function(){Et.Z.N.call(this),en(this)},Et.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var de=v.JSON.stringify,Fi=v.JSON.parse,$i=class{stringify(t){return v.JSON.stringify(t,void 0)}parse(t){return v.JSON.parse(t,void 0)}};function nn(){}function rn(){}var St={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function me(){u.call(this,"d")}A(me,u);function ye(){u.call(this,"c")}A(ye,u);var ot={},sn=null;function zt(){return sn=sn||new N}ot.Ia="serverreachability";function on(t){u.call(this,ot.Ia,t)}A(on,u);function Ct(t){const e=zt();H(e,new on(e))}ot.STAT_EVENT="statevent";function an(t,e){u.call(this,ot.STAT_EVENT,t),this.stat=e}A(an,u);function L(t){const e=zt();H(e,new an(e,t))}ot.Ja="timingevent";function hn(t,e){u.call(this,ot.Ja,t),this.size=e}A(hn,u);function It(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return v.setTimeout(function(){t()},e)}function At(){this.g=!0}At.prototype.ua=function(){this.g=!1};function Ui(t,e,n,s,g,y){t.info(function(){if(t.g)if(y){var b="",C=y.split("&");for(let T=0;T<C.length;T++){var x=C[T].split("=");if(x.length>1){const B=x[0];x=x[1];const X=B.split("_");b=X.length>=2&&X[1]=="type"?b+(B+"="+x+"&"):b+(B+"=redacted&")}}}else b=null;else b=y;return"XMLHTTP REQ ("+s+") [attempt "+g+"]: "+e+`
`+n+`
`+b})}function Vi(t,e,n,s,g,y,b){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+g+"]: "+e+`
`+n+`
`+y+" "+b})}function dt(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+qi(t,n)+(s?" "+s:"")})}function zi(t,e){t.info(function(){return"TIMEOUT: "+e})}At.prototype.info=function(){};function qi(t,e){if(!t.g)return e;if(!e)return null;try{const y=JSON.parse(e);if(y){for(t=0;t<y.length;t++)if(Array.isArray(y[t])){var n=y[t];if(!(n.length<2)){var s=n[1];if(Array.isArray(s)&&!(s.length<1)){var g=s[0];if(g!="noop"&&g!="stop"&&g!="close")for(let b=1;b<s.length;b++)s[b]=""}}}}return de(y)}catch{return e}}var qt={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ln={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cn;function ve(){}A(ve,nn),ve.prototype.g=function(){return new XMLHttpRequest},cn=new ve;function Tt(t){return encodeURIComponent(String(t))}function Wi(t){var e=1;t=t.split(":");const n=[];for(;e>0&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function Z(t,e,n,s){this.j=t,this.i=e,this.l=n,this.S=s||1,this.V=new Et(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new un}function un(){this.i=null,this.g="",this.h=!1}var fn={},we={};function be(t,e,n){t.M=1,t.A=Xt(W(e)),t.u=n,t.R=!0,pn(t,null)}function pn(t,e){t.F=Date.now(),Wt(t),t.B=W(t.A);var n=t.B,s=t.S;Array.isArray(s)||(s=[String(s)]),Tn(n.i,"t",s),t.C=0,n=t.j.L,t.h=new un,t.g=zn(t.j,n?e:null,!t.u),t.P>0&&(t.O=new Li(S(t.Y,t,t.g),t.P)),e=t.V,n=t.g,s=t.ba;var g="readystatechange";Array.isArray(g)||(g&&(tn[0]=g.toString()),g=tn);for(let y=0;y<g.length;y++){const b=Ke(n,g[y],s||e.handleEvent,!1,e.h||e);if(!b)break;e.g[b.key]=b}e=t.J?We(t.J):{},t.u?(t.v||(t.v="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.B,t.v,t.u,e)):(t.v="GET",t.g.ea(t.B,t.v,null,e)),Ct(),Ui(t.i,t.v,t.B,t.l,t.S,t.u)}Z.prototype.ba=function(t){t=t.target;const e=this.O;e&&et(t)==3?e.j():this.Y(t)},Z.prototype.Y=function(t){try{if(t==this.g)t:{const C=et(this.g),x=this.g.ya(),T=this.g.ca();if(!(C<3)&&(C!=3||this.g&&(this.h.h||this.g.la()||xn(this.g)))){this.K||C!=4||x==7||(x==8||T<=0?Ct(3):Ct(2)),Ee(this);var e=this.g.ca();this.X=e;var n=Xi(this);if(this.o=e==200,Vi(this.i,this.v,this.B,this.l,this.S,C,e),this.o){if(this.U&&!this.L){e:{if(this.g){var s,g=this.g;if((s=g.g?g.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!h(s)){var y=s;break e}}y=null}if(t=y)dt(this.i,this.l,t,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Se(this,t);else{this.o=!1,this.m=3,L(12),at(this),_t(this);break t}}if(this.R){t=!0;let B;for(;!this.K&&this.C<n.length;)if(B=Gi(this,n),B==we){C==4&&(this.m=4,L(14),t=!1),dt(this.i,this.l,null,"[Incomplete Response]");break}else if(B==fn){this.m=4,L(15),dt(this.i,this.l,n,"[Invalid Chunk]"),t=!1;break}else dt(this.i,this.l,B,null),Se(this,B);if(gn(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),C!=4||n.length!=0||this.h.h||(this.m=1,L(16),t=!1),this.o=this.o&&t,!t)dt(this.i,this.l,n,"[Invalid Chunked Response]"),at(this),_t(this);else if(n.length>0&&!this.W){this.W=!0;var b=this.j;b.g==this&&b.aa&&!b.P&&(b.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Re(b),b.P=!0,L(11))}}else dt(this.i,this.l,n,null),Se(this,n);C==4&&at(this),this.o&&!this.K&&(C==4?Fn(this.j,this):(this.o=!1,Wt(this)))}else hr(this.g),e==400&&n.indexOf("Unknown SID")>0?(this.m=3,L(12)):(this.m=0,L(13)),at(this),_t(this)}}}catch{}finally{}};function Xi(t){if(!gn(t))return t.g.la();const e=xn(t.g);if(e==="")return"";let n="";const s=e.length,g=et(t.g)==4;if(!t.h.i){if(typeof TextDecoder>"u")return at(t),_t(t),"";t.h.i=new v.TextDecoder}for(let y=0;y<s;y++)t.h.h=!0,n+=t.h.i.decode(e[y],{stream:!(g&&y==s-1)});return e.length=0,t.h.g+=n,t.C=0,t.h.g}function gn(t){return t.g?t.v=="GET"&&t.M!=2&&t.j.Aa:!1}function Gi(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?we:(n=Number(e.substring(n,s)),isNaN(n)?fn:(s+=1,s+n>e.length?we:(e=e.slice(s,s+n),t.C=s+n,e)))}Z.prototype.cancel=function(){this.K=!0,at(this)};function Wt(t){t.T=Date.now()+t.H,dn(t,t.H)}function dn(t,e){if(t.D!=null)throw Error("WatchDog timer not null");t.D=It(S(t.aa,t),e)}function Ee(t){t.D&&(v.clearTimeout(t.D),t.D=null)}Z.prototype.aa=function(){this.D=null;const t=Date.now();t-this.T>=0?(zi(this.i,this.B),this.M!=2&&(Ct(),L(17)),at(this),this.m=2,_t(this)):dn(this,this.T-t)};function _t(t){t.j.I==0||t.K||Fn(t.j,t)}function at(t){Ee(t);var e=t.O;e&&typeof e.dispose=="function"&&e.dispose(),t.O=null,en(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.dispose())}function Se(t,e){try{var n=t.j;if(n.I!=0&&(n.g==t||Ce(n.h,t))){if(!t.L&&Ce(n.h,t)&&n.I==3){try{var s=n.Ba.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var g=s;if(g[0]==0){t:if(!n.v){if(n.g)if(n.g.F+3e3<t.F)Zt(n),Jt(n);else break t;Oe(n),L(18)}}else n.xa=g[1],0<n.xa-n.K&&g[2]<37500&&n.F&&n.A==0&&!n.C&&(n.C=It(S(n.Va,n),6e3));vn(n.h)<=1&&n.ta&&(n.ta=void 0)}else lt(n,11)}else if((t.L||n.g==t)&&Zt(n),!h(e))for(g=n.Ba.g.parse(e),e=0;e<g.length;e++){let T=g[e];const B=T[0];if(!(B<=n.K))if(n.K=B,T=T[1],n.I==2)if(T[0]=="c"){n.M=T[1],n.ba=T[2];const X=T[3];X!=null&&(n.ka=X,n.j.info("VER="+n.ka));const ct=T[4];ct!=null&&(n.za=ct,n.j.info("SVER="+n.za));const nt=T[5];nt!=null&&typeof nt=="number"&&nt>0&&(s=1.5*nt,n.O=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const it=t.g;if(it){const te=it.g?it.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(te){var y=s.h;y.g||te.indexOf("spdy")==-1&&te.indexOf("quic")==-1&&te.indexOf("h2")==-1||(y.j=y.l,y.g=new Set,y.h&&(Ie(y,y.h),y.h=null))}if(s.G){const Me=it.g?it.g.getResponseHeader("X-HTTP-Session-Id"):null;Me&&(s.wa=Me,D(s.J,s.G,Me))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-t.F,n.j.info("Handshake RTT: "+n.T+"ms")),s=n;var b=t;if(s.na=Vn(s,s.L?s.ba:null,s.W),b.L){wn(s.h,b);var C=b,x=s.O;x&&(C.H=x),C.D&&(Ee(C),Wt(C)),s.g=b}else Hn(s);n.i.length>0&&Yt(n)}else T[0]!="stop"&&T[0]!="close"||lt(n,7);else n.I==3&&(T[0]=="stop"||T[0]=="close"?T[0]=="stop"?lt(n,7):De(n):T[0]!="noop"&&n.l&&n.l.qa(T),n.A=0)}}Ct(4)}catch{}}var Ki=class{constructor(t,e){this.g=t,this.map=e}};function mn(t){this.l=t||10,v.PerformanceNavigationTiming?(t=v.performance.getEntriesByType("navigation"),t=t.length>0&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(v.chrome&&v.chrome.loadTimes&&v.chrome.loadTimes()&&v.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function yn(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function vn(t){return t.h?1:t.g?t.g.size:0}function Ce(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Ie(t,e){t.g?t.g.add(e):t.h=e}function wn(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}mn.prototype.cancel=function(){if(this.i=bn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function bn(t){if(t.h!=null)return t.i.concat(t.h.G);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.G);return e}return P(t.i)}var En=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ji(t,e){if(t){t=t.split("&");for(let n=0;n<t.length;n++){const s=t[n].indexOf("=");let g,y=null;s>=0?(g=t[n].substring(0,s),y=t[n].substring(s+1)):g=t[n],e(g,y?decodeURIComponent(y.replace(/\+/g," ")):"")}}}function Q(t){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let e;t instanceof Q?(this.l=t.l,Dt(this,t.j),this.o=t.o,this.g=t.g,Ot(this,t.u),this.h=t.h,Ae(this,_n(t.i)),this.m=t.m):t&&(e=String(t).match(En))?(this.l=!1,Dt(this,e[1]||"",!0),this.o=Rt(e[2]||""),this.g=Rt(e[3]||"",!0),Ot(this,e[4]),this.h=Rt(e[5]||"",!0),Ae(this,e[6]||"",!0),this.m=Rt(e[7]||"")):(this.l=!1,this.i=new kt(null,this.l))}Q.prototype.toString=function(){const t=[];var e=this.j;e&&t.push(Mt(e,Sn,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.o)&&t.push(Mt(e,Sn,!0),"@"),t.push(Tt(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.u,n!=null&&t.push(":",String(n))),(n=this.h)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Mt(n,n.charAt(0)=="/"?Qi:Zi,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",Mt(n,er)),t.join("")},Q.prototype.resolve=function(t){const e=W(this);let n=!!t.j;n?Dt(e,t.j):n=!!t.o,n?e.o=t.o:n=!!t.g,n?e.g=t.g:n=t.u!=null;var s=t.h;if(n)Ot(e,t.u);else if(n=!!t.h){if(s.charAt(0)!="/")if(this.g&&!this.h)s="/"+s;else{var g=e.h.lastIndexOf("/");g!=-1&&(s=e.h.slice(0,g+1)+s)}if(g=s,g==".."||g==".")s="";else if(g.indexOf("./")!=-1||g.indexOf("/.")!=-1){s=g.lastIndexOf("/",0)==0,g=g.split("/");const y=[];for(let b=0;b<g.length;){const C=g[b++];C=="."?s&&b==g.length&&y.push(""):C==".."?((y.length>1||y.length==1&&y[0]!="")&&y.pop(),s&&b==g.length&&y.push("")):(y.push(C),s=!0)}s=y.join("/")}else s=g}return n?e.h=s:n=t.i.toString()!=="",n?Ae(e,_n(t.i)):n=!!t.m,n&&(e.m=t.m),e};function W(t){return new Q(t)}function Dt(t,e,n){t.j=n?Rt(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Ot(t,e){if(e){if(e=Number(e),isNaN(e)||e<0)throw Error("Bad port number "+e);t.u=e}else t.u=null}function Ae(t,e,n){e instanceof kt?(t.i=e,nr(t.i,t.l)):(n||(e=Mt(e,tr)),t.i=new kt(e,t.l))}function D(t,e,n){t.i.set(e,n)}function Xt(t){return D(t,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),t}function Rt(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Mt(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,Yi),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Yi(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Sn=/[#\/\?@]/g,Zi=/[#\?:]/g,Qi=/[#\?]/g,tr=/[#\?@]/g,er=/#/g;function kt(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function ht(t){t.g||(t.g=new Map,t.h=0,t.i&&Ji(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}i=kt.prototype,i.add=function(t,e){ht(this),this.i=null,t=mt(this,t);let n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Cn(t,e){ht(t),e=mt(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function In(t,e){return ht(t),e=mt(t,e),t.g.has(e)}i.forEach=function(t,e){ht(this),this.g.forEach(function(n,s){n.forEach(function(g){t.call(e,g,s,this)},this)},this)};function An(t,e){ht(t);let n=[];if(typeof e=="string")In(t,e)&&(n=n.concat(t.g.get(mt(t,e))));else for(t=Array.from(t.g.values()),e=0;e<t.length;e++)n=n.concat(t[e]);return n}i.set=function(t,e){return ht(this),this.i=null,t=mt(this,t),In(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},i.get=function(t,e){return t?(t=An(this,t),t.length>0?String(t[0]):e):e};function Tn(t,e,n){Cn(t,e),n.length>0&&(t.i=null,t.g.set(mt(t,e),P(n)),t.h+=n.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(let s=0;s<e.length;s++){var n=e[s];const g=Tt(n);n=An(this,n);for(let y=0;y<n.length;y++){let b=g;n[y]!==""&&(b+="="+Tt(n[y])),t.push(b)}}return this.i=t.join("&")};function _n(t){const e=new kt;return e.i=t.i,t.g&&(e.g=new Map(t.g),e.h=t.h),e}function mt(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function nr(t,e){e&&!t.j&&(ht(t),t.i=null,t.g.forEach(function(n,s){const g=s.toLowerCase();s!=g&&(Cn(this,s),Tn(this,g,n))},t)),t.j=e}function ir(t,e){const n=new At;if(v.Image){const s=new Image;s.onload=F(tt,n,"TestLoadImage: loaded",!0,e,s),s.onerror=F(tt,n,"TestLoadImage: error",!1,e,s),s.onabort=F(tt,n,"TestLoadImage: abort",!1,e,s),s.ontimeout=F(tt,n,"TestLoadImage: timeout",!1,e,s),v.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function rr(t,e){const n=new At,s=new AbortController,g=setTimeout(()=>{s.abort(),tt(n,"TestPingServer: timeout",!1,e)},1e4);fetch(t,{signal:s.signal}).then(y=>{clearTimeout(g),y.ok?tt(n,"TestPingServer: ok",!0,e):tt(n,"TestPingServer: server error",!1,e)}).catch(()=>{clearTimeout(g),tt(n,"TestPingServer: error",!1,e)})}function tt(t,e,n,s,g){try{g&&(g.onload=null,g.onerror=null,g.onabort=null,g.ontimeout=null),s(n)}catch{}}function sr(){this.g=new $i}function Te(t){this.i=t.Sb||null,this.h=t.ab||!1}A(Te,nn),Te.prototype.g=function(){return new Gt(this.i,this.h)};function Gt(t,e){N.call(this),this.H=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}A(Gt,N),i=Gt.prototype,i.open=function(t,e){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=t,this.D=e,this.readyState=1,Pt(this)},i.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const e={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};t&&(e.body=t),(this.H||v).fetch(new Request(this.D,e)).then(this.Pa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,xt(this)),this.readyState=0},i.Pa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Pt(this)),this.g&&(this.readyState=3,Pt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof v.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Dn(this)}else t.text().then(this.Oa.bind(this),this.ga.bind(this))};function Dn(t){t.j.read().then(t.Ma.bind(t)).catch(t.ga.bind(t))}i.Ma=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.B.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?xt(this):Pt(this),this.readyState==3&&Dn(this)}},i.Oa=function(t){this.g&&(this.response=this.responseText=t,xt(this))},i.Na=function(t){this.g&&(this.response=t,xt(this))},i.ga=function(){this.g&&xt(this)};function xt(t){t.readyState=4,t.l=null,t.j=null,t.B=null,Pt(t)}i.setRequestHeader=function(t,e){this.A.append(t,e)},i.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function Pt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Gt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function On(t){let e="";return $t(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function _e(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=On(n),typeof t=="string"?n!=null&&Tt(n):D(t,e,n))}function M(t){N.call(this),this.headers=new Map,this.L=t||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}A(M,N);var or=/^https?$/i,ar=["POST","PUT"];i=M.prototype,i.Fa=function(t){this.H=t},i.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cn.g(),this.g.onreadystatechange=E(S(this.Ca,this));try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(y){Rn(this,y);return}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var g in s)n.set(g,s[g]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const y of s.keys())n.set(y,s.get(y));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(y=>y.toLowerCase()=="content-type"),g=v.FormData&&t instanceof v.FormData,!(Array.prototype.indexOf.call(ar,e,void 0)>=0)||s||g||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[y,b]of n)this.g.setRequestHeader(y,b);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(t),this.v=!1}catch(y){Rn(this,y)}};function Rn(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.o=5,Mn(t),Kt(t)}function Mn(t){t.A||(t.A=!0,H(t,"complete"),H(t,"error"))}i.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=t||7,H(this,"complete"),H(this,"abort"),Kt(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Kt(this,!0)),M.Z.N.call(this)},i.Ca=function(){this.u||(this.B||this.v||this.j?kn(this):this.Xa())},i.Xa=function(){kn(this)};function kn(t){if(t.h&&typeof w<"u"){if(t.v&&et(t)==4)setTimeout(t.Ca.bind(t),0);else if(H(t,"readystatechange"),et(t)==4){t.h=!1;try{const y=t.ca();t:switch(y){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var s;if(s=y===0){let b=String(t.D).match(En)[1]||null;!b&&v.self&&v.self.location&&(b=v.self.location.protocol.slice(0,-1)),s=!or.test(b?b.toLowerCase():"")}n=s}if(n)H(t,"complete"),H(t,"success");else{t.o=6;try{var g=et(t)>2?t.g.statusText:""}catch{g=""}t.l=g+" ["+t.ca()+"]",Mn(t)}}finally{Kt(t)}}}}function Kt(t,e){if(t.g){t.m&&(clearTimeout(t.m),t.m=null);const n=t.g;t.g=null,e||H(t,"ready");try{n.onreadystatechange=null}catch{}}}i.isActive=function(){return!!this.g};function et(t){return t.g?t.g.readyState:0}i.ca=function(){try{return et(this)>2?this.g.status:-1}catch{return-1}},i.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.La=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),Fi(e)}};function xn(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.F){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function hr(t){const e={};t=(t.g&&et(t)>=2&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let s=0;s<t.length;s++){if(h(t[s]))continue;var n=Wi(t[s]);const g=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const y=e[g]||[];e[g]=y,y.push(n)}Pi(e,function(s){return s.join(", ")})}i.ya=function(){return this.o},i.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bt(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Pn(t){this.za=0,this.i=[],this.j=new At,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Bt("failFast",!1,t),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Bt("baseRetryDelayMs",5e3,t),this.Za=Bt("retryDelaySeedMs",1e4,t),this.Ta=Bt("forwardChannelMaxRetries",2,t),this.va=Bt("forwardChannelRequestTimeoutMs",2e4,t),this.ma=t&&t.xmlHttpFactory||void 0,this.Ua=t&&t.Rb||void 0,this.Aa=t&&t.useFetchStreams||!1,this.O=void 0,this.L=t&&t.supportsCrossDomainXhr||!1,this.M="",this.h=new mn(t&&t.concurrentRequestLimit),this.Ba=new sr,this.S=t&&t.fastHandshake||!1,this.R=t&&t.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=t&&t.Pb||!1,t&&t.ua&&this.j.ua(),t&&t.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&t&&t.detectBufferingProxy||!1,this.ia=void 0,t&&t.longPollingTimeout&&t.longPollingTimeout>0&&(this.ia=t.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}i=Pn.prototype,i.ka=8,i.I=1,i.connect=function(t,e,n,s){L(0),this.W=t,this.H=e||{},n&&s!==void 0&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.J=Vn(this,null,this.W),Yt(this)};function De(t){if(Bn(t),t.I==3){var e=t.V++,n=W(t.J);if(D(n,"SID",t.M),D(n,"RID",e),D(n,"TYPE","terminate"),jt(t,n),e=new Z(t,t.j,e),e.M=2,e.A=Xt(W(n)),n=!1,v.navigator&&v.navigator.sendBeacon)try{n=v.navigator.sendBeacon(e.A.toString(),"")}catch{}!n&&v.Image&&(new Image().src=e.A,n=!0),n||(e.g=zn(e.j,null),e.g.ea(e.A)),e.F=Date.now(),Wt(e)}Un(t)}function Jt(t){t.g&&(Re(t),t.g.cancel(),t.g=null)}function Bn(t){Jt(t),t.v&&(v.clearTimeout(t.v),t.v=null),Zt(t),t.h.cancel(),t.m&&(typeof t.m=="number"&&v.clearTimeout(t.m),t.m=null)}function Yt(t){if(!yn(t.h)&&!t.m){t.m=!0;var e=t.Ea;Y||a(),z||(Y(),z=!0),f.add(e,t),t.D=0}}function lr(t,e){return vn(t.h)>=t.h.j-(t.m?1:0)?!1:t.m?(t.i=e.G.concat(t.i),!0):t.I==1||t.I==2||t.D>=(t.Sa?0:t.Ta)?!1:(t.m=It(S(t.Ea,t,e),$n(t,t.D)),t.D++,!0)}i.Ea=function(t){if(this.m)if(this.m=null,this.I==1){if(!t){this.V=Math.floor(Math.random()*1e5),t=this.V++;const g=new Z(this,this.j,t);let y=this.o;if(this.U&&(y?(y=We(y),Ge(y,this.U)):y=this.U),this.u!==null||this.R||(g.J=y,y=null),this.S)t:{for(var e=0,n=0;n<this.i.length;n++){e:{var s=this.i[n];if("__data__"in s.map&&(s=s.map.__data__,typeof s=="string")){s=s.length;break e}s=void 0}if(s===void 0)break;if(e+=s,e>4096){e=n;break t}if(e===4096||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=Nn(this,g,e),n=W(this.J),D(n,"RID",t),D(n,"CVER",22),this.G&&D(n,"X-HTTP-Session-Id",this.G),jt(this,n),y&&(this.R?e="headers="+Tt(On(y))+"&"+e:this.u&&_e(n,this.u,y)),Ie(this.h,g),this.Ra&&D(n,"TYPE","init"),this.S?(D(n,"$req",e),D(n,"SID","null"),g.U=!0,be(g,n,null)):be(g,n,e),this.I=2}}else this.I==3&&(t?jn(this,t):this.i.length==0||yn(this.h)||jn(this))};function jn(t,e){var n;e?n=e.l:n=t.V++;const s=W(t.J);D(s,"SID",t.M),D(s,"RID",n),D(s,"AID",t.K),jt(t,s),t.u&&t.o&&_e(s,t.u,t.o),n=new Z(t,t.j,n,t.D+1),t.u===null&&(n.J=t.o),e&&(t.i=e.G.concat(t.i)),e=Nn(t,n,1e3),n.H=Math.round(t.va*.5)+Math.round(t.va*.5*Math.random()),Ie(t.h,n),be(n,s,e)}function jt(t,e){t.H&&$t(t.H,function(n,s){D(e,s,n)}),t.l&&$t({},function(n,s){D(e,s,n)})}function Nn(t,e,n){n=Math.min(t.i.length,n);const s=t.l?S(t.l.Ka,t.l,t):null;t:{var g=t.i;let C=-1;for(;;){const x=["count="+n];C==-1?n>0?(C=g[0].g,x.push("ofs="+C)):C=0:x.push("ofs="+C);let T=!0;for(let B=0;B<n;B++){var y=g[B].g;const X=g[B].map;if(y-=C,y<0)C=Math.max(0,g[B].g-100),T=!1;else try{y="req"+y+"_"||"";try{var b=X instanceof Map?X:Object.entries(X);for(const[ct,nt]of b){let it=nt;I(nt)&&(it=de(nt)),x.push(y+ct+"="+encodeURIComponent(it))}}catch(ct){throw x.push(y+"type="+encodeURIComponent("_badmap")),ct}}catch{s&&s(X)}}if(T){b=x.join("&");break t}}b=void 0}return t=t.i.splice(0,n),e.G=t,b}function Hn(t){if(!t.g&&!t.v){t.Y=1;var e=t.Da;Y||a(),z||(Y(),z=!0),f.add(e,t),t.A=0}}function Oe(t){return t.g||t.v||t.A>=3?!1:(t.Y++,t.v=It(S(t.Da,t),$n(t,t.A)),t.A++,!0)}i.Da=function(){if(this.v=null,Ln(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var t=4*this.T;this.j.info("BP detection timer enabled: "+t),this.B=It(S(this.Wa,this),t)}},i.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,L(10),Jt(this),Ln(this))};function Re(t){t.B!=null&&(v.clearTimeout(t.B),t.B=null)}function Ln(t){t.g=new Z(t,t.j,"rpc",t.Y),t.u===null&&(t.g.J=t.o),t.g.P=0;var e=W(t.na);D(e,"RID","rpc"),D(e,"SID",t.M),D(e,"AID",t.K),D(e,"CI",t.F?"0":"1"),!t.F&&t.ia&&D(e,"TO",t.ia),D(e,"TYPE","xmlhttp"),jt(t,e),t.u&&t.o&&_e(e,t.u,t.o),t.O&&(t.g.H=t.O);var n=t.g;t=t.ba,n.M=1,n.A=Xt(W(e)),n.u=null,n.R=!0,pn(n,t)}i.Va=function(){this.C!=null&&(this.C=null,Jt(this),Oe(this),L(19))};function Zt(t){t.C!=null&&(v.clearTimeout(t.C),t.C=null)}function Fn(t,e){var n=null;if(t.g==e){Zt(t),Re(t),t.g=null;var s=2}else if(Ce(t.h,e))n=e.G,wn(t.h,e),s=1;else return;if(t.I!=0){if(e.o)if(s==1){n=e.u?e.u.length:0,e=Date.now()-e.F;var g=t.D;s=zt(),H(s,new hn(s,n)),Yt(t)}else Hn(t);else if(g=e.m,g==3||g==0&&e.X>0||!(s==1&&lr(t,e)||s==2&&Oe(t)))switch(n&&n.length>0&&(e=t.h,e.i=e.i.concat(n)),g){case 1:lt(t,5);break;case 4:lt(t,10);break;case 3:lt(t,6);break;default:lt(t,2)}}}function $n(t,e){let n=t.Qa+Math.floor(Math.random()*t.Za);return t.isActive()||(n*=2),n*e}function lt(t,e){if(t.j.info("Error code "+e),e==2){var n=S(t.bb,t),s=t.Ua;const g=!s;s=new Q(s||"//www.google.com/images/cleardot.gif"),v.location&&v.location.protocol=="http"||Dt(s,"https"),Xt(s),g?ir(s.toString(),n):rr(s.toString(),n)}else L(2);t.I=0,t.l&&t.l.pa(e),Un(t),Bn(t)}i.bb=function(t){t?(this.j.info("Successfully pinged google.com"),L(2)):(this.j.info("Failed to ping google.com"),L(1))};function Un(t){if(t.I=0,t.ja=[],t.l){const e=bn(t.h);(e.length!=0||t.i.length!=0)&&(k(t.ja,e),k(t.ja,t.i),t.h.i.length=0,P(t.i),t.i.length=0),t.l.oa()}}function Vn(t,e,n){var s=n instanceof Q?W(n):new Q(n);if(s.g!="")e&&(s.g=e+"."+s.g),Ot(s,s.u);else{var g=v.location;s=g.protocol,e=e?e+"."+g.hostname:g.hostname,g=+g.port;const y=new Q(null);s&&Dt(y,s),e&&(y.g=e),g&&Ot(y,g),n&&(y.h=n),s=y}return n=t.G,e=t.wa,n&&e&&D(s,n,e),D(s,"VER",t.ka),jt(t,s),s}function zn(t,e,n){if(e&&!t.L)throw Error("Can't create secondary domain capable XhrIo object.");return e=t.Aa&&!t.ma?new M(new Te({ab:n})):new M(t.ma),e.Fa(t.L),e}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function qn(){}i=qn.prototype,i.ra=function(){},i.qa=function(){},i.pa=function(){},i.oa=function(){},i.isActive=function(){return!0},i.Ka=function(){};function Qt(){}Qt.prototype.g=function(t,e){return new U(t,e)};function U(t,e){N.call(this),this.g=new Pn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.sa&&(t?t["X-WebChannel-Client-Profile"]=e.sa:t={"X-WebChannel-Client-Profile":e.sa}),this.g.U=t,(t=e&&e.Qb)&&!h(t)&&(this.g.u=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!h(e)&&(this.g.G=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new yt(this)}A(U,N),U.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},U.prototype.close=function(){De(this.g)},U.prototype.o=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=de(t),t=n);e.i.push(new Ki(e.Ya++,t)),e.I==3&&Yt(e)},U.prototype.N=function(){this.g.l=null,delete this.j,De(this.g),delete this.g,U.Z.N.call(this)};function Wn(t){me.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}A(Wn,me);function Xn(){ye.call(this),this.status=1}A(Xn,ye);function yt(t){this.g=t}A(yt,qn),yt.prototype.ra=function(){H(this.g,"a")},yt.prototype.qa=function(t){H(this.g,new Wn(t))},yt.prototype.pa=function(t){H(this.g,new Xn)},yt.prototype.oa=function(){H(this.g,"b")},Qt.prototype.createWebChannel=Qt.prototype.g,U.prototype.send=U.prototype.o,U.prototype.open=U.prototype.m,U.prototype.close=U.prototype.close,Mo=function(){return new Qt},Ro=function(){return zt()},Oo=ot,Do={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},qt.NO_ERROR=0,qt.TIMEOUT=8,qt.HTTP_ERROR=6,_o=qt,ln.COMPLETE="complete",To=ln,rn.EventType=St,St.OPEN="a",St.CLOSE="b",St.ERROR="c",St.MESSAGE="d",N.prototype.listen=N.prototype.J,Ao=rn,M.prototype.listenOnce=M.prototype.K,M.prototype.getLastError=M.prototype.Ha,M.prototype.getLastErrorCode=M.prototype.ya,M.prototype.getStatus=M.prototype.ca,M.prototype.getResponseJson=M.prototype.La,M.prototype.getResponseText=M.prototype.la,M.prototype.send=M.prototype.ea,M.prototype.setWithCredentials=M.prototype.Fa,Io=M}).apply(typeof ee<"u"?ee:typeof self<"u"?self:typeof window<"u"?window:{});export{ta as A,Po as B,wt as C,Ho as D,$e as E,bt as F,$o as G,Jo as H,So as I,gr as J,Xo as K,Vr as L,Co as M,wr as N,Uo as O,Wo as P,Go as Q,Ko as R,Do as S,Lo as T,Cs as U,Ao as W,Io as X,Ht as _,Ir as a,ui as b,Yo as c,ea as d,je as e,qo as f,Zo as g,Qo as h,Fo as i,O as j,Er as k,xo as l,jo as m,To as n,_o as o,Bo as p,Mo as q,vt as r,Ro as s,Oo as t,No as u,Ar as v,Vo as w,li as x,dr as y,zo as z};
