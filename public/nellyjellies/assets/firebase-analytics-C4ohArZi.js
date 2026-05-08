import{r as W,_ as j,W as B}from"./capacitor-BtboXTJC.js";import{L as Y,_ as D,C as S,r as P,E as K,g as b,i as q,a as H,v as V,c as R,F as Z,b as k,d as J,e as Q,f as X}from"./firebase-core-BMRhKEjK.js";/**
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
 */const I="analytics",ee="firebase_id",te="origin",ne=60*1e3,ie="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",E="https://www.googletagmanager.com/gtag/js";/**
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
 */const d=new Y("@firebase/analytics");/**
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
 */const ae={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},u=new K("analytics","Analytics",ae);/**
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
 */function se(e){if(!e.startsWith(E)){const t=u.create("invalid-gtag-resource",{gtagURL:e});return d.warn(t.message),""}return e}function x(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function re(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function oe(e,t){const n=re("firebase-js-sdk-policy",{createScriptURL:se}),i=document.createElement("script"),a=`${E}?l=${e}&id=${t}`;i.src=n?n==null?void 0:n.createScriptURL(a):a,i.async=!0,document.head.appendChild(i)}function ce(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function le(e,t,n,i,a,s){const r=i[a];try{if(r)await t[r];else{const c=(await x(n)).find(l=>l.measurementId===a);c&&await t[c.appId]}}catch(o){d.error(o)}e("config",a,s)}async function de(e,t,n,i,a){try{let s=[];if(a&&a.send_to){let r=a.send_to;Array.isArray(r)||(r=[r]);const o=await x(n);for(const c of r){const l=o.find(f=>f.measurementId===c),m=l&&t[l.appId];if(m)s.push(m);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",i,a||{})}catch(s){d.error(s)}}function ue(e,t,n,i){async function a(s,...r){try{if(s==="event"){const[o,c]=r;await de(e,t,n,o,c)}else if(s==="config"){const[o,c]=r;await le(e,t,n,i,o,c)}else if(s==="consent"){const[o,c]=r;e("consent",o,c)}else if(s==="get"){const[o,c,l]=r;e("get",o,c,l)}else if(s==="set"){const[o]=r;e("set",o)}else e(s,...r)}catch(o){d.error(o)}}return a}function fe(e,t,n,i,a){let s=function(...r){window[i].push(arguments)};return window[a]&&typeof window[a]=="function"&&(s=window[a]),window[a]=ue(s,e,t,n),{gtagCore:s,wrappedGtag:window[a]}}function me(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(E)&&n.src.includes(e))return n;return null}/**
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
 */const pe=30,he=1e3;class ge{constructor(t={},n=he){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const N=new ge;function ye(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function we(e){var r;const{appId:t,apiKey:n}=e,i={method:"GET",headers:ye(n)},a=ie.replace("{app-id}",t),s=await fetch(a,i);if(s.status!==200&&s.status!==304){let o="";try{const c=await s.json();(r=c.error)!=null&&r.message&&(o=c.error.message)}catch{}throw u.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function be(e,t=N,n){const{appId:i,apiKey:a,measurementId:s}=e.options;if(!i)throw u.create("no-app-id");if(!a){if(s)return{measurementId:s,appId:i};throw u.create("no-api-key")}const r=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new ve;return setTimeout(async()=>{o.abort()},ne),z({appId:i,apiKey:a,measurementId:s},r,o,t)}async function z(e,{throttleEndTimeMillis:t,backoffCount:n},i,a=N){var o;const{appId:s,measurementId:r}=e;try{await Ie(i,t)}catch(c){if(r)return d.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${r} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:s,measurementId:r};throw c}try{const c=await we(e);return a.deleteThrottleMetadata(s),c}catch(c){const l=c;if(!Ae(l)){if(a.deleteThrottleMetadata(s),r)return d.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${r} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:s,measurementId:r};throw c}const m=Number((o=l==null?void 0:l.customData)==null?void 0:o.httpStatus)===503?R(n,a.intervalMillis,pe):R(n,a.intervalMillis),f={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return a.setThrottleMetadata(s,f),d.debug(`Calling attemptFetch again in ${m} millis`),z(e,f,i,a)}}function Ie(e,t){return new Promise((n,i)=>{const a=Math.max(t-Date.now(),0),s=setTimeout(n,a);e.addEventListener(()=>{clearTimeout(s),i(u.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Ae(e){if(!(e instanceof Z)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class ve{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function _e(e,t,n,i,a){if(a&&a.global){e("event",n,i);return}else{const s=await t,r={...i,send_to:s};e("event",n,r)}}async function Te(e,t,n,i){{const a=await t;e("config",a,{update:!0,user_id:n})}}async function Ee(e,t,n,i){if(i&&i.global){const a={};for(const s of Object.keys(n))a[`user_properties.${s}`]=n[s];return e("set",a),Promise.resolve()}else{const a=await t;e("config",a,{update:!0,user_properties:n})}}async function De(e,t){const n=await e;window[`ga-disable-${n}`]=!t}let v;function U(e){v=e}/**
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
 */async function Se(){if(H())try{await V()}catch(e){return d.warn(u.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return d.warn(u.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Pe(e,t,n,i,a,s,r){const o=be(e);o.then(p=>{n[p.measurementId]=p.appId,e.options.measurementId&&p.measurementId!==e.options.measurementId&&d.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>d.error(p)),t.push(o);const c=Se().then(p=>{if(p)return i.getId()}),[l,m]=await Promise.all([o,c]);me(s)||oe(s,l.measurementId),v&&(a("consent","default",v),U(void 0)),a("js",new Date);const f=(r==null?void 0:r.config)??{};return f[te]="firebase",f.update=!0,m!=null&&(f[ee]=m),a("config",l.measurementId,f),l.measurementId}/**
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
 */class Re{constructor(t){this.app=t}_delete(){return delete g[this.app.options.appId],Promise.resolve()}}let g={},F=[];const O={};let A="dataLayer",Fe="gtag",C,y,M=!1;function Oe(){const e=[];if(q()&&e.push("This is a browser extension environment."),X()||e.push("Cookies are not available."),e.length>0){const t=e.map((i,a)=>`(${a+1}) ${i}`).join(" "),n=u.create("invalid-analytics-context",{errorInfo:t});d.warn(n.message)}}function Ce(e,t,n){Oe();const i=e.options.appId;if(!i)throw u.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)d.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw u.create("no-api-key");if(g[i]!=null)throw u.create("already-exists",{id:i});if(!M){ce(A);const{wrappedGtag:s,gtagCore:r}=fe(g,F,O,A,Fe);y=s,C=r,M=!0}return g[i]=Pe(e,F,O,t,C,A,n),new Re(e)}function w(e=J()){e=b(e);const t=k(e,I);return t.isInitialized()?t.getImmediate():Me(e)}function Me(e,t={}){const n=k(e,I);if(n.isInitialized()){const a=n.getImmediate();if(Q(t,n.getOptions()))return a;throw u.create("already-initialized")}return n.initialize({options:t})}function Le(e,t,n){e=b(e),Te(y,g[e.app.options.appId],t).catch(i=>d.error(i))}function G(e,t,n){e=b(e),Ee(y,g[e.app.options.appId],t,n).catch(i=>d.error(i))}function $e(e,t){e=b(e),De(g[e.app.options.appId],t).catch(n=>d.error(n))}function _(e,t,n,i){e=b(e),_e(y,g[e.app.options.appId],t,n,i).catch(a=>d.error(a))}function ke(e){y?y("consent","update",e):U(e)}const L="@firebase/analytics",$="0.10.19";function xe(){D(new S(I,(t,{options:n})=>{const i=t.getProvider("app").getImmediate(),a=t.getProvider("installations-internal").getImmediate();return Ce(i,a,n)},"PUBLIC")),D(new S("analytics-internal",e,"PRIVATE")),P(L,$),P(L,$,"esm2020");function e(t){try{const n=t.getProvider(I).getImmediate();return{logEvent:(i,a,s)=>_(n,i,a,s),setUserProperties:(i,a)=>G(n,i,a)}}catch(n){throw u.create("interop-component-reg-failed",{reason:n})}}}xe();var h;(function(e){e.AdPersonalization="AD_PERSONALIZATION",e.AdStorage="AD_STORAGE",e.AdUserData="AD_USER_DATA",e.AnalyticsStorage="ANALYTICS_STORAGE",e.FunctionalityStorage="FUNCTIONALITY_STORAGE",e.PersonalizationStorage="PERSONALIZATION_STORAGE"})(h||(h={}));var T;(function(e){e.Granted="GRANTED",e.Denied="DENIED"})(T||(T={}));const We=W("FirebaseAnalytics",{web:()=>j(()=>Promise.resolve().then(()=>ze),void 0,import.meta.url).then(e=>new e.FirebaseAnalyticsWeb)});class Ne extends B{async getAppInstanceId(){throw this.unimplemented("Not implemented on web.")}async setConsent(t){const n=t.status===T.Granted?"granted":"denied",i={};switch(t.type){case h.AdPersonalization:i.ad_personalization=n;break;case h.AdStorage:i.ad_storage=n;break;case h.AdUserData:i.ad_user_data=n;break;case h.AnalyticsStorage:i.analytics_storage=n;break;case h.FunctionalityStorage:i.functionality_storage=n;break;case h.PersonalizationStorage:i.personalization_storage=n;break}ke(i)}async setUserId(t){const n=w();Le(n,t.userId)}async setUserProperty(t){const n=w();G(n,{[t.key]:t.value})}async setCurrentScreen(t){const n=w();_(n,"screen_view",{firebase_screen:t.screenName||void 0,firebase_screen_class:t.screenClassOverride||void 0})}async logEvent(t){const n=w();_(n,t.name,t.params)}async logTransaction(t){throw this.unimplemented("Not implemented on web.")}async setSessionTimeoutDuration(t){throw this.unimplemented("Not implemented on web.")}async setEnabled(t){const n=w();$e(n,t.enabled)}async isEnabled(){return{enabled:window["ga-disable-analyticsId"]===!0}}async resetAnalyticsData(){throw this.unimplemented("Not implemented on web.")}async initiateOnDeviceConversionMeasurementWithEmailAddress(t){throw this.unimplemented("Not implemented on web.")}async initiateOnDeviceConversionMeasurementWithPhoneNumber(t){throw this.unimplemented("Not implemented on web.")}async initiateOnDeviceConversionMeasurementWithHashedEmailAddress(t){throw this.unimplemented("Not implemented on web.")}async initiateOnDeviceConversionMeasurementWithHashedPhoneNumber(t){throw this.unimplemented("Not implemented on web.")}}const ze=Object.freeze(Object.defineProperty({__proto__:null,FirebaseAnalyticsWeb:Ne},Symbol.toStringTag,{value:"Module"}));export{We as F,G as a,w as g,_ as l,Le as s};
