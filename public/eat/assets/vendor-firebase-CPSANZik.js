import{c as It,g as Dp}from"./vendor-charts-D2EBPNwo.js";var ev={},N={},za={},Pr={},J={},sl={};Object.defineProperty(sl,"__esModule",{value:!0});sl.getDefaultsFromPostinstall=()=>{};var Dd={};Object.defineProperty(J,"__esModule",{value:!0});var tv=sl;/**
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
 */const _a={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const kp=function(n,e){if(!n)throw Np(e)},Np=function(n){return new Error("Firebase Database ("+_a.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Vp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},nv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ol={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,l=u?n[i+2]:0,d=s>>2,p=(s&3)<<4|c>>4;let m=(c&15)<<2|l>>6,y=l&63;u||(y=64,o||(m=64)),r.push(t[d],t[p],t[m],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):nv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||l==null||p==null)throw new Op;const m=s<<2|c>>4;if(r.push(m),l!==64){const y=c<<4&240|l>>2;if(r.push(y),p!==64){const R=l<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};let Op=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}};const Lp=function(n){const e=Vp(n);return ol.encodeByteArray(e,!0)},_u=function(n){return Lp(n).replace(/\./g,"")},ya=function(n){try{return ol.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function rv(n){return al(void 0,n)}function al(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!iv(t)||(n[t]=al(n[t],e[t]));return n}function iv(n){return n!=="__proto__"}/**
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
 */function xp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof It<"u")return It;throw new Error("Unable to locate global object.")}/**
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
 */const sv=()=>xp().__FIREBASE_DEFAULTS__,ov=()=>{if(typeof process>"u"||typeof Dd>"u")return;const n=Dd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},av=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ya(n[1]);return e&&JSON.parse(e)},ro=()=>{try{return tv.getDefaultsFromPostinstall()||sv()||ov()||av()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Mp=n=>{var e,t;return(t=(e=ro())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},cv=n=>{const e=Mp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},uv=()=>{var n;return(n=ro())===null||n===void 0?void 0:n.config},lv=n=>{var e;return(e=ro())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */let Fp=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};/**
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
 */function Up(n){return n.endsWith(".cloudworkstations.dev")}async function hv(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function dv(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[_u(JSON.stringify(t)),_u(JSON.stringify(o)),""].join(".")}const As={};function fv(){const n={prod:[],emulator:[]};for(const e of Object.keys(As))As[e]?n.emulator.push(e):n.prod.push(e);return n}function pv(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let kd=!1;function mv(n,e){if(typeof window>"u"||typeof document>"u"||!Up(window.location.host)||As[n]===e||As[n]||kd)return;As[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=fv().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,y){m.setAttribute("width","24"),m.setAttribute("id",y),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function l(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{kd=!0,o()},m}function d(m,y){m.setAttribute("id",y),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=pv(r),y=t("text"),R=document.getElementById(y)||document.createElement("span"),C=t("learnmore"),k=document.getElementById(C)||document.createElement("a"),F=t("preprendIcon"),Q=document.getElementById(F)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const K=m.element;c(K),d(k,C);const ne=l();u(Q,F),K.append(Q,R,k,ne),document.body.appendChild(K)}s?(R.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function io(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gv(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(io())}function Bp(){var n;const e=(n=ro())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(It.process)==="[object process]"}catch{return!1}}function _v(){return typeof window<"u"||jp()}function jp(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function yv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Iv(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function vv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ev(){return io().indexOf("Electron/")>=0}function Tv(){const n=io();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function wv(){return io().indexOf("MSAppHost/")>=0}function Av(){return _a.NODE_CLIENT===!0||_a.NODE_ADMIN===!0}function bv(){return!Bp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Sv(){try{return typeof indexedDB=="object"}catch{return!1}}function Pv(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function Rv(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Cv="FirebaseError";let qp=class $p extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Cv,Object.setPrototypeOf(this,$p.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wp.prototype.create)}},Wp=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Dv(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new qp(i,c,r)}};function Dv(n,e){return n.replace(kv,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const kv=/\{\$([^}]+)}/g;/**
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
 */function yu(n){return JSON.parse(n)}function Nv(n){return JSON.stringify(n)}/**
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
 */const so=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=yu(ya(s[0])||""),t=yu(ya(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},Vv=function(n){const e=so(n).claims,t=Math.floor(new Date().getTime()/1e3);let r=0,i=0;return typeof e=="object"&&(e.hasOwnProperty("nbf")?r=e.nbf:e.hasOwnProperty("iat")&&(r=e.iat),e.hasOwnProperty("exp")?i=e.exp:i=r+86400),!!t&&!!r&&!!i&&t>=r&&t<=i},Ov=function(n){const e=so(n).claims;return typeof e=="object"&&e.hasOwnProperty("iat")?e.iat:null},Lv=function(n){const e=so(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},xv=function(n){const e=so(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Mv(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Fv(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Uv(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Bv(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function zp(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Nd(s)&&Nd(o)){if(!zp(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Nd(n){return n!==null&&typeof n=="object"}/**
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
 */function jv(n,e=2e3){const t=new Fp;return setTimeout(()=>t.reject("timeout!"),e),n.then(t.resolve,t.reject),t.promise}/**
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
 */function qv(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function $v(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Wv(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
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
 */let zv=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)r[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(m<<1|m>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4],l,d;for(let p=0;p<80;p++){p<40?p<20?(l=c^s&(o^c),d=1518500249):(l=s^o^c,d=1859775393):p<60?(l=s&o|c&(s|o),d=2400959708):(l=s^o^c,d=3395469782);const m=(i<<5|i>>>27)+l+u+d+r[p]&4294967295;u=c,c=o,o=(s<<30|s>>>2)&4294967295,s=i,i=m}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}};function Gv(n,e){const t=new Kv(n,e);return t.subscribe.bind(t)}let Kv=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Qv(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Xc),i.error===void 0&&(i.error=Xc),i.complete===void 0&&(i.complete=Xc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Hv(n,e){return(...t)=>{Promise.resolve(!0).then(()=>{n(...t)}).catch(r=>{e&&e(r)})}}function Qv(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Xc(){}/**
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
 */const Jv=function(n,e,t,r){let i;if(r<e?i="at least "+e:r>t&&(i=t===0?"none":"no more than "+t),i){const s=n+" failed: Was called with "+r+(r===1?" argument.":" arguments.")+" Expects "+i+".";throw new Error(s)}};function Ga(n,e){return`${n} failed: ${e} argument `}function Yv(n,e,t){if(!(t&&!e)&&typeof e!="string")throw new Error(Ga(n,"namespace")+"must be a valid firebase namespace.")}function Xv(n,e,t,r){if(!(r&&!t)&&typeof t!="function")throw new Error(Ga(n,e)+"must be a valid function.")}function Zv(n,e,t,r){if(!(r&&!t)&&(typeof t!="object"||t===null))throw new Error(Ga(n,e)+"must be a valid context object.")}/**
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
 */const eE=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,kp(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},tE=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
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
 */const nE=1e3,rE=2,Gp=4*60*60*1e3,Kp=.5;function iE(n,e=nE,t=rE){const r=e*Math.pow(t,n),i=Math.round(Kp*r*(Math.random()-.5)*2);return Math.min(Gp,r+i)}/**
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
 */function sE(n){return Number.isFinite(n)?n+oE(n):`${n}`}function oE(n){n=Math.abs(n);const e=n%100;if(e>=10&&e<=20)return"th";const t=n%10;return t===1?"st":t===2?"nd":t===3?"rd":"th"}/**
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
 */function aE(n){return n&&n._delegate?n._delegate:n}J.CONSTANTS=_a;J.DecodeBase64StringError=Op;J.Deferred=Fp;J.ErrorFactory=Wp;J.FirebaseError=qp;J.MAX_VALUE_MILLIS=Gp;J.RANDOM_FACTOR=Kp;J.Sha1=zv;J.areCookiesEnabled=Rv;J.assert=kp;J.assertionError=Np;J.async=Hv;J.base64=ol;J.base64Decode=ya;J.base64Encode=Lp;J.base64urlEncodeWithoutPadding=_u;J.calculateBackoffMillis=iE;J.contains=Mv;J.createMockUserToken=dv;J.createSubscribe=Gv;J.decode=so;J.deepCopy=rv;J.deepEqual=zp;J.deepExtend=al;J.errorPrefix=Ga;J.extractQuerystring=Wv;J.getDefaultAppConfig=uv;J.getDefaultEmulatorHost=Mp;J.getDefaultEmulatorHostnameAndPort=cv;J.getDefaults=ro;J.getExperimentalSetting=lv;J.getGlobal=xp;J.getModularInstance=aE;J.getUA=io;J.isAdmin=xv;J.isBrowser=_v;J.isBrowserExtension=Iv;J.isCloudWorkstation=Up;J.isCloudflareWorker=yv;J.isElectron=Ev;J.isEmpty=Uv;J.isIE=Tv;J.isIndexedDBAvailable=Sv;J.isMobileCordova=gv;J.isNode=Bp;J.isNodeSdk=Av;J.isReactNative=vv;J.isSafari=bv;J.isUWP=wv;J.isValidFormat=Lv;J.isValidTimestamp=Vv;J.isWebWorker=jp;J.issuedAtTime=Ov;J.jsonEval=yu;J.map=Bv;J.ordinal=sE;J.pingServer=hv;J.promiseWithTimeout=jv;J.querystring=qv;J.querystringDecode=$v;J.safeGet=Fv;J.stringLength=tE;J.stringToByteArray=eE;J.stringify=Nv;J.updateEmulatorBanner=mv;J.validateArgCount=Jv;J.validateCallback=Xv;J.validateContextObject=Zv;J.validateIndexedDBOpenable=Pv;J.validateNamespace=Yv;Object.defineProperty(Pr,"__esModule",{value:!0});var cE=J;class uE{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const sr="[DEFAULT]";/**
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
 */class Hp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new cE.Deferred;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(hE(e))try{this.getOrInitializeService({instanceIdentifier:sr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=sr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sr){return this.instances.has(e)}getOptions(e=sr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:lE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sr){return this.component?this.component.multipleInstances?e:sr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function lE(n){return n===sr?void 0:n}function hE(n){return n.instantiationMode==="EAGER"}/**
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
 */class dE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Hp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}Pr.Component=uE;Pr.ComponentContainer=dE;Pr.Provider=Hp;var Ka={};(function(n){Object.defineProperty(n,"__esModule",{value:!0});/**
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
 */const e=[];n.LogLevel=void 0,function(l){l[l.DEBUG=0]="DEBUG",l[l.VERBOSE=1]="VERBOSE",l[l.INFO=2]="INFO",l[l.WARN=3]="WARN",l[l.ERROR=4]="ERROR",l[l.SILENT=5]="SILENT"}(n.LogLevel||(n.LogLevel={}));const t={debug:n.LogLevel.DEBUG,verbose:n.LogLevel.VERBOSE,info:n.LogLevel.INFO,warn:n.LogLevel.WARN,error:n.LogLevel.ERROR,silent:n.LogLevel.SILENT},r=n.LogLevel.INFO,i={[n.LogLevel.DEBUG]:"log",[n.LogLevel.VERBOSE]:"log",[n.LogLevel.INFO]:"info",[n.LogLevel.WARN]:"warn",[n.LogLevel.ERROR]:"error"},s=(l,d,...p)=>{if(d<l.logLevel)return;const m=new Date().toISOString(),y=i[d];if(y)console[y](`[${m}]  ${l.name}:`,...p);else throw new Error(`Attempted to log a message with an invalid logType (value: ${d})`)};class o{constructor(d){this.name=d,this._logLevel=r,this._logHandler=s,this._userLogHandler=null,e.push(this)}get logLevel(){return this._logLevel}set logLevel(d){if(!(d in n.LogLevel))throw new TypeError(`Invalid value "${d}" assigned to \`logLevel\``);this._logLevel=d}setLogLevel(d){this._logLevel=typeof d=="string"?t[d]:d}get logHandler(){return this._logHandler}set logHandler(d){if(typeof d!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=d}get userLogHandler(){return this._userLogHandler}set userLogHandler(d){this._userLogHandler=d}debug(...d){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.DEBUG,...d),this._logHandler(this,n.LogLevel.DEBUG,...d)}log(...d){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.VERBOSE,...d),this._logHandler(this,n.LogLevel.VERBOSE,...d)}info(...d){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.INFO,...d),this._logHandler(this,n.LogLevel.INFO,...d)}warn(...d){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.WARN,...d),this._logHandler(this,n.LogLevel.WARN,...d)}error(...d){this._userLogHandler&&this._userLogHandler(this,n.LogLevel.ERROR,...d),this._logHandler(this,n.LogLevel.ERROR,...d)}}function c(l){e.forEach(d=>{d.setLogLevel(l)})}function u(l,d){for(const p of e){let m=null;d&&d.level&&(m=t[d.level]),l===null?p.userLogHandler=null:p.userLogHandler=(y,R,...C)=>{const k=C.map(F=>{if(F==null)return null;if(typeof F=="string")return F;if(typeof F=="number"||typeof F=="boolean")return F.toString();if(F instanceof Error)return F.message;try{return JSON.stringify(F)}catch{return null}}).filter(F=>F).join(" ");R>=(m??y.logLevel)&&l({level:n.LogLevel[R].toLowerCase(),message:k,args:C,type:y.name})}}}n.Logger=o,n.setLogLevel=c,n.setUserLogHandler=u})(Ka);var H={},cl={};Object.defineProperty(cl,"__esModule",{value:!0});cl.getDefaultsFromPostinstall=()=>{};var Vd={};Object.defineProperty(H,"__esModule",{value:!0});var fE=cl;/**
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
 */const Ia={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const Qp=function(n,e){if(!n)throw Jp(e)},Jp=function(n){return new Error("Firebase Database ("+Ia.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Yp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},pE=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ul={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,l=u?n[i+2]:0,d=s>>2,p=(s&3)<<4|c>>4;let m=(c&15)<<2|l>>6,y=l&63;u||(y=64,o||(m=64)),r.push(t[d],t[p],t[m],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Yp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):pE(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||l==null||p==null)throw new Xp;const m=s<<2|c>>4;if(r.push(m),l!==64){const y=c<<4&240|l>>2;if(r.push(y),p!==64){const R=l<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Xp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zp=function(n){const e=Yp(n);return ul.encodeByteArray(e,!0)},Iu=function(n){return Zp(n).replace(/\./g,"")},va=function(n){try{return ul.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function mE(n){return ll(void 0,n)}function ll(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!gE(t)||(n[t]=ll(n[t],e[t]));return n}function gE(n){return n!=="__proto__"}/**
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
 */function em(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof It<"u")return It;throw new Error("Unable to locate global object.")}/**
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
 */const _E=()=>em().__FIREBASE_DEFAULTS__,yE=()=>{if(typeof process>"u"||typeof Vd>"u")return;const n=Vd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},IE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&va(n[1]);return e&&JSON.parse(e)},oo=()=>{try{return fE.getDefaultsFromPostinstall()||_E()||yE()||IE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},tm=n=>{var e,t;return(t=(e=oo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},vE=n=>{const e=tm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},EE=()=>{var n;return(n=oo())===null||n===void 0?void 0:n.config},TE=n=>{var e;return(e=oo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class nm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function rm(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wE(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function AE(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Iu(JSON.stringify(t)),Iu(JSON.stringify(o)),""].join(".")}const bs={};function bE(){const n={prod:[],emulator:[]};for(const e of Object.keys(bs))bs[e]?n.emulator.push(e):n.prod.push(e);return n}function SE(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Od=!1;function PE(n,e){if(typeof window>"u"||typeof document>"u"||!rm(window.location.host)||bs[n]===e||bs[n]||Od)return;bs[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=bE().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,y){m.setAttribute("width","24"),m.setAttribute("id",y),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function l(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{Od=!0,o()},m}function d(m,y){m.setAttribute("id",y),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=SE(r),y=t("text"),R=document.getElementById(y)||document.createElement("span"),C=t("learnmore"),k=document.getElementById(C)||document.createElement("a"),F=t("preprendIcon"),Q=document.getElementById(F)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const K=m.element;c(K),d(k,C);const ne=l();u(Q,F),K.append(Q,R,k,ne),document.body.appendChild(K)}s?(R.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function ao(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function RE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ao())}function hl(){var n;const e=(n=oo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(It.process)==="[object process]"}catch{return!1}}function CE(){return typeof window<"u"||im()}function im(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function DE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function NE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function VE(){return ao().indexOf("Electron/")>=0}function OE(){const n=ao();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function LE(){return ao().indexOf("MSAppHost/")>=0}function xE(){return Ia.NODE_CLIENT===!0||Ia.NODE_ADMIN===!0}function ME(){return!hl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function FE(){return!hl()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function UE(){try{return typeof indexedDB=="object"}catch{return!1}}function BE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function jE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const qE="FirebaseError";class Ha extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qE,Object.setPrototypeOf(this,Ha.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,sm.prototype.create)}}class sm{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?$E(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Ha(i,c,r)}}function $E(n,e){return n.replace(WE,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const WE=/\{\$([^}]+)}/g;/**
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
 */function vu(n){return JSON.parse(n)}function zE(n){return JSON.stringify(n)}/**
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
 */const co=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=vu(va(s[0])||""),t=vu(va(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},GE=function(n){const e=co(n).claims,t=Math.floor(new Date().getTime()/1e3);let r=0,i=0;return typeof e=="object"&&(e.hasOwnProperty("nbf")?r=e.nbf:e.hasOwnProperty("iat")&&(r=e.iat),e.hasOwnProperty("exp")?i=e.exp:i=r+86400),!!t&&!!r&&!!i&&t>=r&&t<=i},KE=function(n){const e=co(n).claims;return typeof e=="object"&&e.hasOwnProperty("iat")?e.iat:null},HE=function(n){const e=co(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},QE=function(n){const e=co(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function JE(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function YE(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function XE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ZE(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function om(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Ld(s)&&Ld(o)){if(!om(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Ld(n){return n!==null&&typeof n=="object"}/**
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
 */function eT(n,e=2e3){const t=new nm;return setTimeout(()=>t.reject("timeout!"),e),n.then(t.resolve,t.reject),t.promise}/**
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
 */function tT(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function nT(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function rT(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
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
 */class iT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)r[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(m<<1|m>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4],l,d;for(let p=0;p<80;p++){p<40?p<20?(l=c^s&(o^c),d=1518500249):(l=s^o^c,d=1859775393):p<60?(l=s&o|c&(s|o),d=2400959708):(l=s^o^c,d=3395469782);const m=(i<<5|i>>>27)+l+u+d+r[p]&4294967295;u=c,c=o,o=(s<<30|s>>>2)&4294967295,s=i,i=m}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function sT(n,e){const t=new oT(n,e);return t.subscribe.bind(t)}class oT{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");cT(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Zc),i.error===void 0&&(i.error=Zc),i.complete===void 0&&(i.complete=Zc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function aT(n,e){return(...t)=>{Promise.resolve(!0).then(()=>{n(...t)}).catch(r=>{e&&e(r)})}}function cT(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Zc(){}/**
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
 */const uT=function(n,e,t,r){let i;if(r<e?i="at least "+e:r>t&&(i=t===0?"none":"no more than "+t),i){const s=n+" failed: Was called with "+r+(r===1?" argument.":" arguments.")+" Expects "+i+".";throw new Error(s)}};function Qa(n,e){return`${n} failed: ${e} argument `}function lT(n,e,t){if(!(t&&!e)&&typeof e!="string")throw new Error(Qa(n,"namespace")+"must be a valid firebase namespace.")}function hT(n,e,t,r){if(!(r&&!t)&&typeof t!="function")throw new Error(Qa(n,e)+"must be a valid function.")}function dT(n,e,t,r){if(!(r&&!t)&&(typeof t!="object"||t===null))throw new Error(Qa(n,e)+"must be a valid context object.")}/**
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
 */const fT=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,Qp(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},pT=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
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
 */const mT=1e3,gT=2,am=4*60*60*1e3,cm=.5;function _T(n,e=mT,t=gT){const r=e*Math.pow(t,n),i=Math.round(cm*r*(Math.random()-.5)*2);return Math.min(am,r+i)}/**
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
 */function yT(n){return Number.isFinite(n)?n+IT(n):`${n}`}function IT(n){n=Math.abs(n);const e=n%100;if(e>=10&&e<=20)return"th";const t=n%10;return t===1?"st":t===2?"nd":t===3?"rd":"th"}/**
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
 */function vT(n){return n&&n._delegate?n._delegate:n}H.CONSTANTS=Ia;H.DecodeBase64StringError=Xp;H.Deferred=nm;H.ErrorFactory=sm;H.FirebaseError=Ha;H.MAX_VALUE_MILLIS=am;H.RANDOM_FACTOR=cm;H.Sha1=iT;H.areCookiesEnabled=jE;H.assert=Qp;H.assertionError=Jp;H.async=aT;H.base64=ul;H.base64Decode=va;H.base64Encode=Zp;H.base64urlEncodeWithoutPadding=Iu;H.calculateBackoffMillis=_T;H.contains=JE;H.createMockUserToken=AE;H.createSubscribe=sT;H.decode=co;H.deepCopy=mE;H.deepEqual=om;H.deepExtend=ll;H.errorPrefix=Qa;H.extractQuerystring=rT;H.getDefaultAppConfig=EE;H.getDefaultEmulatorHost=tm;H.getDefaultEmulatorHostnameAndPort=vE;H.getDefaults=oo;H.getExperimentalSetting=TE;H.getGlobal=em;H.getModularInstance=vT;H.getUA=ao;H.isAdmin=QE;H.isBrowser=CE;H.isBrowserExtension=kE;H.isCloudWorkstation=rm;H.isCloudflareWorker=DE;H.isElectron=VE;H.isEmpty=XE;H.isIE=OE;H.isIndexedDBAvailable=UE;H.isMobileCordova=RE;H.isNode=hl;H.isNodeSdk=xE;H.isReactNative=NE;H.isSafari=ME;H.isSafariOrWebkit=FE;H.isUWP=LE;H.isValidFormat=HE;H.isValidTimestamp=GE;H.isWebWorker=im;H.issuedAtTime=KE;H.jsonEval=vu;H.map=ZE;H.ordinal=yT;H.pingServer=wE;H.promiseWithTimeout=eT;H.querystring=tT;H.querystringDecode=nT;H.safeGet=YE;H.stringLength=pT;H.stringToByteArray=fT;H.stringify=zE;H.updateEmulatorBanner=PE;H.validateArgCount=uT;H.validateCallback=hT;H.validateContextObject=dT;H.validateIndexedDBOpenable=BE;H.validateNamespace=lT;const ET=(n,e)=>e.some(t=>n instanceof t);let xd,Md;function TT(){return xd||(xd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wT(){return Md||(Md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const um=new WeakMap,Eu=new WeakMap,lm=new WeakMap,eu=new WeakMap,dl=new WeakMap;function AT(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Ft(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&um.set(t,n)}).catch(()=>{}),dl.set(e,n),e}function bT(n){if(Eu.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Eu.set(n,e)}let Tu={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Eu.get(n);if(e==="objectStoreNames")return n.objectStoreNames||lm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ST(n){Tu=n(Tu)}function PT(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(sa(this),e,...t);return lm.set(r,e.sort?e.sort():[e]),Ft(r)}:wT().includes(n)?function(...e){return n.apply(sa(this),e),Ft(um.get(this))}:function(...e){return Ft(n.apply(sa(this),e))}}function RT(n){return typeof n=="function"?PT(n):(n instanceof IDBTransaction&&bT(n),ET(n,TT())?new Proxy(n,Tu):n)}function Ft(n){if(n instanceof IDBRequest)return AT(n);if(eu.has(n))return eu.get(n);const e=RT(n);return e!==n&&(eu.set(n,e),dl.set(e,n)),e}const sa=n=>dl.get(n);function CT(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=Ft(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Ft(o.result),u.oldVersion,u.newVersion,Ft(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}function DT(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",r=>e(r.oldVersion,r)),Ft(t).then(()=>{})}const kT=["get","getKey","getAll","getAllKeys","count"],NT=["put","add","delete","clear"],tu=new Map;function Fd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(tu.get(e))return tu.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=NT.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||kT.includes(t)))return;const s=async function(o,...c){const u=this.transaction(o,i?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&u.done]))[0]};return tu.set(e,s),s}ST(n=>({...n,get:(e,t,r)=>Fd(e,t)||n.get(e,t,r),has:(e,t)=>!!Fd(e,t)||n.has(e,t)}));const VT=Object.freeze(Object.defineProperty({__proto__:null,deleteDB:DT,openDB:CT,unwrap:sa,wrap:Ft},Symbol.toStringTag,{value:"Module"})),OT=Dp(VT);(function(n){Object.defineProperty(n,"__esModule",{value:!0});var e=Pr,t=Ka,r=H,i=OT;/**
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
 */class s{constructor(L){this.container=L}getPlatformInfoString(){return this.container.getProviders().map(M=>{if(o(M)){const ee=M.getImmediate();return`${ee.library}/${ee.version}`}else return null}).filter(M=>M).join(" ")}}function o(z){const L=z.getComponent();return(L==null?void 0:L.type)==="VERSION"}const c="@firebase/app",u="0.13.2";/**
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
 */const l=new t.Logger("@firebase/app"),d="@firebase/app-compat",p="@firebase/analytics-compat",m="@firebase/analytics",y="@firebase/app-check-compat",R="@firebase/app-check",C="@firebase/auth",k="@firebase/auth-compat",F="@firebase/database",Q="@firebase/data-connect",K="@firebase/database-compat",ne="@firebase/functions",he="@firebase/functions-compat",re="@firebase/installations",E="@firebase/installations-compat",_="@firebase/messaging",v="@firebase/messaging-compat",T="@firebase/performance",w="@firebase/performance-compat",S="@firebase/remote-config",I="@firebase/remote-config-compat",wt="@firebase/storage",Qn="@firebase/storage-compat",Oc="@firebase/firestore",Jn="@firebase/ai",Yn="@firebase/firestore-compat",Gi="firebase",Co="11.10.0";/**
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
 */const Xn="[DEFAULT]",Ct={[c]:"fire-core",[d]:"fire-core-compat",[m]:"fire-analytics",[p]:"fire-analytics-compat",[R]:"fire-app-check",[y]:"fire-app-check-compat",[C]:"fire-auth",[k]:"fire-auth-compat",[F]:"fire-rtdb",[Q]:"fire-data-connect",[K]:"fire-rtdb-compat",[ne]:"fire-fn",[he]:"fire-fn-compat",[re]:"fire-iid",[E]:"fire-iid-compat",[_]:"fire-fcm",[v]:"fire-fcm-compat",[T]:"fire-perf",[w]:"fire-perf-compat",[S]:"fire-rc",[I]:"fire-rc-compat",[wt]:"fire-gcs",[Qn]:"fire-gcs-compat",[Oc]:"fire-fst",[Yn]:"fire-fst-compat",[Jn]:"fire-vertex","fire-js":"fire-js",[Gi]:"fire-js-all"};/**
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
 */const Te=new Map,dn=new Map,yt=new Map;function Ki(z,L){try{z.container.addComponent(L)}catch(M){l.debug(`Component ${L.name} failed to register with FirebaseApp ${z.name}`,M)}}function Or(z,L){z.container.addOrOverwriteComponent(L)}function Lr(z){const L=z.name;if(yt.has(L))return l.debug(`There were multiple attempts to register component ${L}.`),!1;yt.set(L,z);for(const M of Te.values())Ki(M,z);for(const M of dn.values())Ki(M,z);return!0}function Do(z,L){const M=z.container.getProvider("heartbeat").getImmediate({optional:!0});return M&&M.triggerHeartbeat(),z.container.getProvider(L)}function xr(z,L,M=Xn){Do(z,L).clearInstance(M)}function Zn(z){return z.options!==void 0}function Hi(z){return z==null?!1:z.settings!==void 0}function Qi(){yt.clear()}/**
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
 */const Ji={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xe=new r.ErrorFactory("app","Firebase",Ji);/**
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
 */class Yi{constructor(L,M,ee){this._isDeleted=!1,this._options=Object.assign({},L),this._config=Object.assign({},M),this._name=M.name,this._automaticDataCollectionEnabled=M.automaticDataCollectionEnabled,this._container=ee,this.container.addComponent(new e.Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(L){this.checkDestroyed(),this._automaticDataCollectionEnabled=L}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(L){this._isDeleted=L}checkDestroyed(){if(this.isDeleted)throw Xe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */function ko(z,L){const M=r.base64Decode(z.split(".")[1]);if(M===null){console.error(`FirebaseServerApp ${L} is invalid: second part could not be parsed.`);return}if(JSON.parse(M).exp===void 0){console.error(`FirebaseServerApp ${L} is invalid: expiration claim could not be parsed`);return}const ae=JSON.parse(M).exp*1e3,ie=new Date().getTime();ae-ie<=0&&console.error(`FirebaseServerApp ${L} is invalid: the token has expired.`)}class Lc extends Yi{constructor(L,M,ee,ae){const ie=M.automaticDataCollectionEnabled!==void 0?M.automaticDataCollectionEnabled:!0,ke={name:ee,automaticDataCollectionEnabled:ie};if(L.apiKey!==void 0)super(L,ke,ae);else{const $e=L;super($e.options,ke,ae)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:ie},M),this._serverConfig.authIdToken&&ko(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&ko(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,M.releaseOnDeref=void 0,fn(c,u,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(L){this.isDeleted||(this._refCount++,L!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(L,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Fr(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw Xe.create("server-app-deleted")}}/**
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
 */const No=Co;function Mr(z,L={}){let M=z;typeof L!="object"&&(L={name:L});const ee=Object.assign({name:Xn,automaticDataCollectionEnabled:!0},L),ae=ee.name;if(typeof ae!="string"||!ae)throw Xe.create("bad-app-name",{appName:String(ae)});if(M||(M=r.getDefaultAppConfig()),!M)throw Xe.create("no-options");const ie=Te.get(ae);if(ie){if(r.deepEqual(M,ie.options)&&r.deepEqual(ee,ie.config))return ie;throw Xe.create("duplicate-app",{appName:ae})}const ke=new e.ComponentContainer(ae);for(const At of yt.values())ke.addComponent(At);const $e=new Yi(M,ee,ke);return Te.set(ae,$e),$e}function Vo(z,L){if(r.isBrowser()&&!r.isWebWorker())throw Xe.create("invalid-server-app-environment");L.automaticDataCollectionEnabled===void 0&&(L.automaticDataCollectionEnabled=!0);let M;Zn(z)?M=z.options:M=z;const ee=Object.assign(Object.assign({},L),M);ee.releaseOnDeref!==void 0&&delete ee.releaseOnDeref;const ae=is=>[...is].reduce((Uc,gn)=>Math.imul(31,Uc)+gn.charCodeAt(0)|0,0);if(L.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw Xe.create("finalization-registry-not-supported",{});const ie=""+ae(JSON.stringify(ee)),ke=dn.get(ie);if(ke)return ke.incRefCount(L.releaseOnDeref),ke;const $e=new e.ComponentContainer(ie);for(const is of yt.values())$e.addComponent(is);const At=new Lc(M,L,ie,$e);return dn.set(ie,At),At}function xc(z=Xn){const L=Te.get(z);if(!L&&z===Xn&&r.getDefaultAppConfig())return Mr();if(!L)throw Xe.create("no-app",{appName:z});return L}function Xi(){return Array.from(Te.values())}async function Fr(z){let L=!1;const M=z.name;Te.has(M)?(L=!0,Te.delete(M)):dn.has(M)&&z.decRefCount()<=0&&(dn.delete(M),L=!0),L&&(await Promise.all(z.container.getProviders().map(ee=>ee.delete())),z.isDeleted=!0)}function fn(z,L,M){var ee;let ae=(ee=Ct[z])!==null&&ee!==void 0?ee:z;M&&(ae+=`-${M}`);const ie=ae.match(/\s|\//),ke=L.match(/\s|\//);if(ie||ke){const $e=[`Unable to register library "${ae}" with version "${L}":`];ie&&$e.push(`library name "${ae}" contains illegal characters (whitespace or "/")`),ie&&ke&&$e.push("and"),ke&&$e.push(`version name "${L}" contains illegal characters (whitespace or "/")`),l.warn($e.join(" "));return}Lr(new e.Component(`${ae}-version`,()=>({library:ae,version:L}),"VERSION"))}function qe(z,L){if(z!==null&&typeof z!="function")throw Xe.create("invalid-log-argument");t.setUserLogHandler(z,L)}function He(z){t.setLogLevel(z)}/**
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
 */const Ur="firebase-heartbeat-database",Oo=1,pn="firebase-heartbeat-store";let Zi=null;function mn(){return Zi||(Zi=i.openDB(Ur,Oo,{upgrade:(z,L)=>{switch(L){case 0:try{z.createObjectStore(pn)}catch(M){console.warn(M)}}}}).catch(z=>{throw Xe.create("idb-open",{originalErrorMessage:z.message})})),Zi}async function Lo(z){try{const M=(await mn()).transaction(pn),ee=await M.objectStore(pn).get(Br(z));return await M.done,ee}catch(L){if(L instanceof r.FirebaseError)l.warn(L.message);else{const M=Xe.create("idb-get",{originalErrorMessage:L==null?void 0:L.message});l.warn(M.message)}}}async function es(z,L){try{const ee=(await mn()).transaction(pn,"readwrite");await ee.objectStore(pn).put(L,Br(z)),await ee.done}catch(M){if(M instanceof r.FirebaseError)l.warn(M.message);else{const ee=Xe.create("idb-set",{originalErrorMessage:M==null?void 0:M.message});l.warn(ee.message)}}}function Br(z){return`${z.name}!${z.options.appId}`}/**
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
 */const Mc=1024,Fc=30;class ts{constructor(L){this.container=L,this._heartbeatsCache=null;const M=this.container.getProvider("app").getImmediate();this._storage=new er(M),this._heartbeatsCachePromise=this._storage.read().then(ee=>(this._heartbeatsCache=ee,ee))}async triggerHeartbeat(){var L,M;try{const ae=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),ie=ns();if(((L=this._heartbeatsCache)===null||L===void 0?void 0:L.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((M=this._heartbeatsCache)===null||M===void 0?void 0:M.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===ie||this._heartbeatsCache.heartbeats.some(ke=>ke.date===ie))return;if(this._heartbeatsCache.heartbeats.push({date:ie,agent:ae}),this._heartbeatsCache.heartbeats.length>Fc){const ke=rs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(ke,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(ee){l.warn(ee)}}async getHeartbeatsHeader(){var L;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((L=this._heartbeatsCache)===null||L===void 0?void 0:L.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const M=ns(),{heartbeatsToSend:ee,unsentEntries:ae}=xo(this._heartbeatsCache.heartbeats),ie=r.base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:ee}));return this._heartbeatsCache.lastSentHeartbeatDate=M,ae.length>0?(this._heartbeatsCache.heartbeats=ae,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),ie}catch(M){return l.warn(M),""}}}function ns(){return new Date().toISOString().substring(0,10)}function xo(z,L=Mc){const M=[];let ee=z.slice();for(const ae of z){const ie=M.find(ke=>ke.agent===ae.agent);if(ie){if(ie.dates.push(ae.date),jr(M)>L){ie.dates.pop();break}}else if(M.push({agent:ae.agent,dates:[ae.date]}),jr(M)>L){M.pop();break}ee=ee.slice(1)}return{heartbeatsToSend:M,unsentEntries:ee}}class er{constructor(L){this.app=L,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return r.isIndexedDBAvailable()?r.validateIndexedDBOpenable().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const M=await Lo(this.app);return M!=null&&M.heartbeats?M:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(L){var M;if(await this._canUseIndexedDBPromise){const ae=await this.read();return es(this.app,{lastSentHeartbeatDate:(M=L.lastSentHeartbeatDate)!==null&&M!==void 0?M:ae.lastSentHeartbeatDate,heartbeats:L.heartbeats})}else return}async add(L){var M;if(await this._canUseIndexedDBPromise){const ae=await this.read();return es(this.app,{lastSentHeartbeatDate:(M=L.lastSentHeartbeatDate)!==null&&M!==void 0?M:ae.lastSentHeartbeatDate,heartbeats:[...ae.heartbeats,...L.heartbeats]})}else return}}function jr(z){return r.base64urlEncodeWithoutPadding(JSON.stringify({version:2,heartbeats:z})).length}function rs(z){if(z.length===0)return-1;let L=0,M=z[0].date;for(let ee=1;ee<z.length;ee++)z[ee].date<M&&(M=z[ee].date,L=ee);return L}/**
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
 */function Wt(z){Lr(new e.Component("platform-logger",L=>new s(L),"PRIVATE")),Lr(new e.Component("heartbeat",L=>new ts(L),"PRIVATE")),fn(c,u,z),fn(c,u,"cjs2017"),fn("fire-js","")}Wt("node"),Object.defineProperty(n,"FirebaseError",{enumerable:!0,get:function(){return r.FirebaseError}}),n.SDK_VERSION=No,n._DEFAULT_ENTRY_NAME=Xn,n._addComponent=Ki,n._addOrOverwriteComponent=Or,n._apps=Te,n._clearComponents=Qi,n._components=yt,n._getProvider=Do,n._isFirebaseApp=Zn,n._isFirebaseServerApp=Hi,n._registerComponent=Lr,n._removeServiceInstance=xr,n._serverApps=dn,n.deleteApp=Fr,n.getApp=xc,n.getApps=Xi,n.initializeApp=Mr,n.initializeServerApp=Vo,n.onLog=qe,n.registerVersion=fn,n.setLogLevel=He})(za);var wu={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function v(){}v.prototype=_.prototype,E.D=_.prototype,E.prototype=new v,E.prototype.constructor=E,E.C=function(T,w,S){for(var I=Array(arguments.length-2),wt=2;wt<arguments.length;wt++)I[wt-2]=arguments[wt];return _.prototype[w].apply(T,I)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,v){v||(v=0);var T=Array(16);if(typeof _=="string")for(var w=0;16>w;++w)T[w]=_.charCodeAt(v++)|_.charCodeAt(v++)<<8|_.charCodeAt(v++)<<16|_.charCodeAt(v++)<<24;else for(w=0;16>w;++w)T[w]=_[v++]|_[v++]<<8|_[v++]<<16|_[v++]<<24;_=E.g[0],v=E.g[1],w=E.g[2];var S=E.g[3],I=_+(S^v&(w^S))+T[0]+3614090360&4294967295;_=v+(I<<7&4294967295|I>>>25),I=S+(w^_&(v^w))+T[1]+3905402710&4294967295,S=_+(I<<12&4294967295|I>>>20),I=w+(v^S&(_^v))+T[2]+606105819&4294967295,w=S+(I<<17&4294967295|I>>>15),I=v+(_^w&(S^_))+T[3]+3250441966&4294967295,v=w+(I<<22&4294967295|I>>>10),I=_+(S^v&(w^S))+T[4]+4118548399&4294967295,_=v+(I<<7&4294967295|I>>>25),I=S+(w^_&(v^w))+T[5]+1200080426&4294967295,S=_+(I<<12&4294967295|I>>>20),I=w+(v^S&(_^v))+T[6]+2821735955&4294967295,w=S+(I<<17&4294967295|I>>>15),I=v+(_^w&(S^_))+T[7]+4249261313&4294967295,v=w+(I<<22&4294967295|I>>>10),I=_+(S^v&(w^S))+T[8]+1770035416&4294967295,_=v+(I<<7&4294967295|I>>>25),I=S+(w^_&(v^w))+T[9]+2336552879&4294967295,S=_+(I<<12&4294967295|I>>>20),I=w+(v^S&(_^v))+T[10]+4294925233&4294967295,w=S+(I<<17&4294967295|I>>>15),I=v+(_^w&(S^_))+T[11]+2304563134&4294967295,v=w+(I<<22&4294967295|I>>>10),I=_+(S^v&(w^S))+T[12]+1804603682&4294967295,_=v+(I<<7&4294967295|I>>>25),I=S+(w^_&(v^w))+T[13]+4254626195&4294967295,S=_+(I<<12&4294967295|I>>>20),I=w+(v^S&(_^v))+T[14]+2792965006&4294967295,w=S+(I<<17&4294967295|I>>>15),I=v+(_^w&(S^_))+T[15]+1236535329&4294967295,v=w+(I<<22&4294967295|I>>>10),I=_+(w^S&(v^w))+T[1]+4129170786&4294967295,_=v+(I<<5&4294967295|I>>>27),I=S+(v^w&(_^v))+T[6]+3225465664&4294967295,S=_+(I<<9&4294967295|I>>>23),I=w+(_^v&(S^_))+T[11]+643717713&4294967295,w=S+(I<<14&4294967295|I>>>18),I=v+(S^_&(w^S))+T[0]+3921069994&4294967295,v=w+(I<<20&4294967295|I>>>12),I=_+(w^S&(v^w))+T[5]+3593408605&4294967295,_=v+(I<<5&4294967295|I>>>27),I=S+(v^w&(_^v))+T[10]+38016083&4294967295,S=_+(I<<9&4294967295|I>>>23),I=w+(_^v&(S^_))+T[15]+3634488961&4294967295,w=S+(I<<14&4294967295|I>>>18),I=v+(S^_&(w^S))+T[4]+3889429448&4294967295,v=w+(I<<20&4294967295|I>>>12),I=_+(w^S&(v^w))+T[9]+568446438&4294967295,_=v+(I<<5&4294967295|I>>>27),I=S+(v^w&(_^v))+T[14]+3275163606&4294967295,S=_+(I<<9&4294967295|I>>>23),I=w+(_^v&(S^_))+T[3]+4107603335&4294967295,w=S+(I<<14&4294967295|I>>>18),I=v+(S^_&(w^S))+T[8]+1163531501&4294967295,v=w+(I<<20&4294967295|I>>>12),I=_+(w^S&(v^w))+T[13]+2850285829&4294967295,_=v+(I<<5&4294967295|I>>>27),I=S+(v^w&(_^v))+T[2]+4243563512&4294967295,S=_+(I<<9&4294967295|I>>>23),I=w+(_^v&(S^_))+T[7]+1735328473&4294967295,w=S+(I<<14&4294967295|I>>>18),I=v+(S^_&(w^S))+T[12]+2368359562&4294967295,v=w+(I<<20&4294967295|I>>>12),I=_+(v^w^S)+T[5]+4294588738&4294967295,_=v+(I<<4&4294967295|I>>>28),I=S+(_^v^w)+T[8]+2272392833&4294967295,S=_+(I<<11&4294967295|I>>>21),I=w+(S^_^v)+T[11]+1839030562&4294967295,w=S+(I<<16&4294967295|I>>>16),I=v+(w^S^_)+T[14]+4259657740&4294967295,v=w+(I<<23&4294967295|I>>>9),I=_+(v^w^S)+T[1]+2763975236&4294967295,_=v+(I<<4&4294967295|I>>>28),I=S+(_^v^w)+T[4]+1272893353&4294967295,S=_+(I<<11&4294967295|I>>>21),I=w+(S^_^v)+T[7]+4139469664&4294967295,w=S+(I<<16&4294967295|I>>>16),I=v+(w^S^_)+T[10]+3200236656&4294967295,v=w+(I<<23&4294967295|I>>>9),I=_+(v^w^S)+T[13]+681279174&4294967295,_=v+(I<<4&4294967295|I>>>28),I=S+(_^v^w)+T[0]+3936430074&4294967295,S=_+(I<<11&4294967295|I>>>21),I=w+(S^_^v)+T[3]+3572445317&4294967295,w=S+(I<<16&4294967295|I>>>16),I=v+(w^S^_)+T[6]+76029189&4294967295,v=w+(I<<23&4294967295|I>>>9),I=_+(v^w^S)+T[9]+3654602809&4294967295,_=v+(I<<4&4294967295|I>>>28),I=S+(_^v^w)+T[12]+3873151461&4294967295,S=_+(I<<11&4294967295|I>>>21),I=w+(S^_^v)+T[15]+530742520&4294967295,w=S+(I<<16&4294967295|I>>>16),I=v+(w^S^_)+T[2]+3299628645&4294967295,v=w+(I<<23&4294967295|I>>>9),I=_+(w^(v|~S))+T[0]+4096336452&4294967295,_=v+(I<<6&4294967295|I>>>26),I=S+(v^(_|~w))+T[7]+1126891415&4294967295,S=_+(I<<10&4294967295|I>>>22),I=w+(_^(S|~v))+T[14]+2878612391&4294967295,w=S+(I<<15&4294967295|I>>>17),I=v+(S^(w|~_))+T[5]+4237533241&4294967295,v=w+(I<<21&4294967295|I>>>11),I=_+(w^(v|~S))+T[12]+1700485571&4294967295,_=v+(I<<6&4294967295|I>>>26),I=S+(v^(_|~w))+T[3]+2399980690&4294967295,S=_+(I<<10&4294967295|I>>>22),I=w+(_^(S|~v))+T[10]+4293915773&4294967295,w=S+(I<<15&4294967295|I>>>17),I=v+(S^(w|~_))+T[1]+2240044497&4294967295,v=w+(I<<21&4294967295|I>>>11),I=_+(w^(v|~S))+T[8]+1873313359&4294967295,_=v+(I<<6&4294967295|I>>>26),I=S+(v^(_|~w))+T[15]+4264355552&4294967295,S=_+(I<<10&4294967295|I>>>22),I=w+(_^(S|~v))+T[6]+2734768916&4294967295,w=S+(I<<15&4294967295|I>>>17),I=v+(S^(w|~_))+T[13]+1309151649&4294967295,v=w+(I<<21&4294967295|I>>>11),I=_+(w^(v|~S))+T[4]+4149444226&4294967295,_=v+(I<<6&4294967295|I>>>26),I=S+(v^(_|~w))+T[11]+3174756917&4294967295,S=_+(I<<10&4294967295|I>>>22),I=w+(_^(S|~v))+T[2]+718787259&4294967295,w=S+(I<<15&4294967295|I>>>17),I=v+(S^(w|~_))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(w+(I<<21&4294967295|I>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+S&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var v=_-this.blockSize,T=this.B,w=this.h,S=0;S<_;){if(w==0)for(;S<=v;)i(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(T[w++]=E.charCodeAt(S++),w==this.blockSize){i(this,T),w=0;break}}else for(;S<_;)if(T[w++]=E[S++],w==this.blockSize){i(this,T),w=0;break}}this.h=w,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var v=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=v&255,v/=256;for(this.u(E),E=Array(16),_=v=0;4>_;++_)for(var T=0;32>T;T+=8)E[v++]=this.g[_]>>>T&255;return E};function s(E,_){var v=c;return Object.prototype.hasOwnProperty.call(v,E)?v[E]:v[E]=_(E)}function o(E,_){this.h=_;for(var v=[],T=!0,w=E.length-1;0<=w;w--){var S=E[w]|0;T&&S==_||(v[w]=S,T=!1)}this.g=v}var c={};function u(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return k(l(-E));for(var _=[],v=1,T=0;E>=v;T++)_[T]=E/v|0,v*=4294967296;return new o(_,0)}function d(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return k(d(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=l(Math.pow(_,8)),T=p,w=0;w<E.length;w+=8){var S=Math.min(8,E.length-w),I=parseInt(E.substring(w,w+S),_);8>S?(S=l(Math.pow(_,S)),T=T.j(S).add(l(I))):(T=T.j(v),T=T.add(l(I)))}return T}var p=u(0),m=u(1),y=u(16777216);n=o.prototype,n.m=function(){if(C(this))return-k(this).m();for(var E=0,_=1,v=0;v<this.g.length;v++){var T=this.i(v);E+=(0<=T?T:4294967296+T)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(R(this))return"0";if(C(this))return"-"+k(this).toString(E);for(var _=l(Math.pow(E,6)),v=this,T="";;){var w=ne(v,_).g;v=F(v,w.j(_));var S=((0<v.g.length?v.g[0]:v.h)>>>0).toString(E);if(v=w,R(v))return S+T;for(;6>S.length;)S="0"+S;T=S+T}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function R(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function C(E){return E.h==-1}n.l=function(E){return E=F(this,E),C(E)?-1:R(E)?0:1};function k(E){for(var _=E.g.length,v=[],T=0;T<_;T++)v[T]=~E.g[T];return new o(v,~E.h).add(m)}n.abs=function(){return C(this)?k(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],T=0,w=0;w<=_;w++){var S=T+(this.i(w)&65535)+(E.i(w)&65535),I=(S>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);T=I>>>16,S&=65535,I&=65535,v[w]=I<<16|S}return new o(v,v[v.length-1]&-2147483648?-1:0)};function F(E,_){return E.add(k(_))}n.j=function(E){if(R(this)||R(E))return p;if(C(this))return C(E)?k(this).j(k(E)):k(k(this).j(E));if(C(E))return k(this.j(k(E)));if(0>this.l(y)&&0>E.l(y))return l(this.m()*E.m());for(var _=this.g.length+E.g.length,v=[],T=0;T<2*_;T++)v[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<E.g.length;w++){var S=this.i(T)>>>16,I=this.i(T)&65535,wt=E.i(w)>>>16,Qn=E.i(w)&65535;v[2*T+2*w]+=I*Qn,Q(v,2*T+2*w),v[2*T+2*w+1]+=S*Qn,Q(v,2*T+2*w+1),v[2*T+2*w+1]+=I*wt,Q(v,2*T+2*w+1),v[2*T+2*w+2]+=S*wt,Q(v,2*T+2*w+2)}for(T=0;T<_;T++)v[T]=v[2*T+1]<<16|v[2*T];for(T=_;T<2*_;T++)v[T]=0;return new o(v,0)};function Q(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function K(E,_){this.g=E,this.h=_}function ne(E,_){if(R(_))throw Error("division by zero");if(R(E))return new K(p,p);if(C(E))return _=ne(k(E),_),new K(k(_.g),k(_.h));if(C(_))return _=ne(E,k(_)),new K(k(_.g),_.h);if(30<E.g.length){if(C(E)||C(_))throw Error("slowDivide_ only works with positive integers.");for(var v=m,T=_;0>=T.l(E);)v=he(v),T=he(T);var w=re(v,1),S=re(T,1);for(T=re(T,2),v=re(v,2);!R(T);){var I=S.add(T);0>=I.l(E)&&(w=w.add(v),S=I),T=re(T,1),v=re(v,1)}return _=F(E,w.j(_)),new K(w,_)}for(w=p;0<=E.l(_);){for(v=Math.max(1,Math.floor(E.m()/_.m())),T=Math.ceil(Math.log(v)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),S=l(v),I=S.j(_);C(I)||0<I.l(E);)v-=T,S=l(v),I=S.j(_);R(S)&&(S=m),w=w.add(S),E=F(E,I)}return new K(w,E)}n.A=function(E){return ne(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],T=0;T<_;T++)v[T]=this.i(T)&E.i(T);return new o(v,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],T=0;T<_;T++)v[T]=this.i(T)|E.i(T);return new o(v,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],T=0;T<_;T++)v[T]=this.i(T)^E.i(T);return new o(v,this.h^E.h)};function he(E){for(var _=E.g.length+1,v=[],T=0;T<_;T++)v[T]=E.i(T)<<1|E.i(T-1)>>>31;return new o(v,E.h)}function re(E,_){var v=_>>5;_%=32;for(var T=E.g.length-v,w=[],S=0;S<T;S++)w[S]=0<_?E.i(S+v)>>>_|E.i(S+v+1)<<32-_:E.i(S+v);return new o(w,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,wu.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,wu.Integer=o}).apply(typeof It<"u"?It:typeof self<"u"?self:typeof window<"u"?window:{});var Dt={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof It=="object"&&It];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in f))break e;f=f[b]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function s(a,h){a instanceof String&&(a+="");var f=0,g=!1,b={next:function(){if(!g&&f<a.length){var D=f++;return{value:h(D,a[D]),done:!1}}return g=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}i("Array.prototype.values",function(a){return a||function(){return s(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,f){return a.call.apply(a.bind,arguments)}function p(a,h,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,g),a.apply(h,b)}}return function(){return a.apply(h,arguments)}}function m(a,h,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,m.apply(null,arguments)}function y(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function R(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,b,D){for(var G=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)G[ve-2]=arguments[ve];return h.prototype[b].apply(g,G)}}function C(a){const h=a.length;if(0<h){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function k(a,h){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(u(g)){const b=a.length||0,D=g.length||0;a.length=b+D;for(let G=0;G<D;G++)a[b+G]=g[G]}else a.push(g)}}class F{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function Q(a){return/^[\s\xa0]*$/.test(a)}function K(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function ne(a){return ne[" "](a),a}ne[" "]=function(){};var he=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function re(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function E(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function _(a){const h={};for(const f in a)h[f]=a[f];return h}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,h){let f,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(f in g)a[f]=g[f];for(let D=0;D<v.length;D++)f=v[D],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function w(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function S(a){c.setTimeout(()=>{throw a},0)}function I(){var a=Gi;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class wt{constructor(){this.h=this.g=null}add(h,f){const g=Qn.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var Qn=new F(()=>new Oc,a=>a.reset());class Oc{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Jn,Yn=!1,Gi=new wt,Co=()=>{const a=c.Promise.resolve(void 0);Jn=()=>{a.then(Xn)}};var Xn=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(f){S(f)}var h=Qn;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Yn=!1};function Ct(){this.s=this.s,this.C=this.C}Ct.prototype.s=!1,Ct.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ct.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Te(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Te.prototype.h=function(){this.defaultPrevented=!0};var dn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,h),c.removeEventListener("test",f,h)}catch{}return a}();function yt(a,h){if(Te.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(he){e:{try{ne(h.nodeName);var b=!0;break e}catch{}b=!1}b||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ki[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&yt.aa.h.call(this)}}R(yt,Te);var Ki={2:"touch",3:"pen",4:"mouse"};yt.prototype.h=function(){yt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Or="closure_listenable_"+(1e6*Math.random()|0),Lr=0;function Do(a,h,f,g,b){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=b,this.key=++Lr,this.da=this.fa=!1}function xr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Zn(a){this.src=a,this.g={},this.h=0}Zn.prototype.add=function(a,h,f,g,b){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var G=Qi(a,h,g,b);return-1<G?(h=a[G],f||(h.fa=!1)):(h=new Do(h,this.src,D,!!g,b),h.fa=f,a.push(h)),h};function Hi(a,h){var f=h.type;if(f in a.g){var g=a.g[f],b=Array.prototype.indexOf.call(g,h,void 0),D;(D=0<=b)&&Array.prototype.splice.call(g,b,1),D&&(xr(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Qi(a,h,f,g){for(var b=0;b<a.length;++b){var D=a[b];if(!D.da&&D.listener==h&&D.capture==!!f&&D.ha==g)return b}return-1}var Ji="closure_lm_"+(1e6*Math.random()|0),Xe={};function Yi(a,h,f,g,b){if(Array.isArray(h)){for(var D=0;D<h.length;D++)Yi(a,h[D],f,g,b);return null}return f=fn(f),a&&a[Or]?a.K(h,f,l(g)?!!g.capture:!1,b):ko(a,h,f,!1,g,b)}function ko(a,h,f,g,b,D){if(!h)throw Error("Invalid event type");var G=l(b)?!!b.capture:!!b,ve=Xi(a);if(ve||(a[Ji]=ve=new Zn(a)),f=ve.add(h,f,g,G,D),f.proxy)return f;if(g=Lc(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)dn||(b=G),b===void 0&&(b=!1),a.addEventListener(h.toString(),g,b);else if(a.attachEvent)a.attachEvent(Vo(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Lc(){function a(f){return h.call(a.src,a.listener,f)}const h=xc;return a}function No(a,h,f,g,b){if(Array.isArray(h))for(var D=0;D<h.length;D++)No(a,h[D],f,g,b);else g=l(g)?!!g.capture:!!g,f=fn(f),a&&a[Or]?(a=a.i,h=String(h).toString(),h in a.g&&(D=a.g[h],f=Qi(D,f,g,b),-1<f&&(xr(D[f]),Array.prototype.splice.call(D,f,1),D.length==0&&(delete a.g[h],a.h--)))):a&&(a=Xi(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Qi(h,f,g,b)),(f=-1<a?h[a]:null)&&Mr(f))}function Mr(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Or])Hi(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(Vo(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=Xi(h))?(Hi(f,a),f.h==0&&(f.src=null,h[Ji]=null)):xr(a)}}}function Vo(a){return a in Xe?Xe[a]:Xe[a]="on"+a}function xc(a,h){if(a.da)a=!0;else{h=new yt(h,this);var f=a.listener,g=a.ha||a.src;a.fa&&Mr(a),a=f.call(g,h)}return a}function Xi(a){return a=a[Ji],a instanceof Zn?a:null}var Fr="__closure_events_fn_"+(1e9*Math.random()>>>0);function fn(a){return typeof a=="function"?a:(a[Fr]||(a[Fr]=function(h){return a.handleEvent(h)}),a[Fr])}function qe(){Ct.call(this),this.i=new Zn(this),this.M=this,this.F=null}R(qe,Ct),qe.prototype[Or]=!0,qe.prototype.removeEventListener=function(a,h,f,g){No(this,a,h,f,g)};function He(a,h){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new Te(h,a);else if(h instanceof Te)h.target=h.target||a;else{var b=h;h=new Te(g,a),T(h,b)}if(b=!0,f)for(var D=f.length-1;0<=D;D--){var G=h.g=f[D];b=Ur(G,g,!0,h)&&b}if(G=h.g=a,b=Ur(G,g,!0,h)&&b,b=Ur(G,g,!1,h)&&b,f)for(D=0;D<f.length;D++)G=h.g=f[D],b=Ur(G,g,!1,h)&&b}qe.prototype.N=function(){if(qe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],g=0;g<f.length;g++)xr(f[g]);delete a.g[h],a.h--}}this.F=null},qe.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},qe.prototype.L=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function Ur(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var b=!0,D=0;D<h.length;++D){var G=h[D];if(G&&!G.da&&G.capture==f){var ve=G.listener,Qe=G.ha||G.src;G.fa&&Hi(a.i,G),b=ve.call(Qe,g)!==!1&&b}}return b&&!g.defaultPrevented}function Oo(a,h,f){if(typeof a=="function")f&&(a=m(a,f));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function pn(a){a.g=Oo(()=>{a.g=null,a.i&&(a.i=!1,pn(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Zi extends Ct{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:pn(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function mn(a){Ct.call(this),this.h=a,this.g={}}R(mn,Ct);var Lo=[];function es(a){re(a.g,function(h,f){this.g.hasOwnProperty(f)&&Mr(h)},a),a.g={}}mn.prototype.N=function(){mn.aa.N.call(this),es(this)},mn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Br=c.JSON.stringify,Mc=c.JSON.parse,Fc=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function ts(){}ts.prototype.h=null;function ns(a){return a.h||(a.h=a.i())}function xo(){}var er={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function jr(){Te.call(this,"d")}R(jr,Te);function rs(){Te.call(this,"c")}R(rs,Te);var Wt={},z=null;function L(){return z=z||new qe}Wt.La="serverreachability";function M(a){Te.call(this,Wt.La,a)}R(M,Te);function ee(a){const h=L();He(h,new M(h))}Wt.STAT_EVENT="statevent";function ae(a,h){Te.call(this,Wt.STAT_EVENT,a),this.stat=h}R(ae,Te);function ie(a){const h=L();He(h,new ae(h,a))}Wt.Ma="timingevent";function ke(a,h){Te.call(this,Wt.Ma,a),this.size=h}R(ke,Te);function $e(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function At(){this.g=!0}At.prototype.xa=function(){this.g=!1};function is(a,h,f,g,b,D){a.info(function(){if(a.g)if(D)for(var G="",ve=D.split("&"),Qe=0;Qe<ve.length;Qe++){var pe=ve[Qe].split("=");if(1<pe.length){var Ze=pe[0];pe=pe[1];var et=Ze.split("_");G=2<=et.length&&et[1]=="type"?G+(Ze+"="+pe+"&"):G+(Ze+"=redacted&")}}else G=null;else G=D;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+h+`
`+f+`
`+G})}function Uc(a,h,f,g,b,D,G){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+h+`
`+f+`
`+D+" "+G})}function gn(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+OI(a,f)+(g?" "+g:"")})}function VI(a,h){a.info(function(){return"TIMEOUT: "+h})}At.prototype.info=function(){};function OI(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var b=g[1];if(Array.isArray(b)&&!(1>b.length)){var D=b[0];if(D!="noop"&&D!="stop"&&D!="close")for(var G=1;G<b.length;G++)b[G]=""}}}}return Br(f)}catch{return h}}var Mo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},zh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Bc;function Fo(){}R(Fo,ts),Fo.prototype.g=function(){return new XMLHttpRequest},Fo.prototype.i=function(){return{}},Bc=new Fo;function _n(a,h,f,g){this.j=a,this.i=h,this.l=f,this.R=g||1,this.U=new mn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Gh}function Gh(){this.i=null,this.g="",this.h=!1}var Kh={},jc={};function qc(a,h,f){a.L=1,a.v=qo(zt(h)),a.m=f,a.P=!0,Hh(a,null)}function Hh(a,h){a.F=Date.now(),Uo(a),a.A=zt(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),cd(f.i,"t",g),a.C=0,f=a.j.J,a.h=new Gh,a.g=Sd(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Zi(m(a.Y,a,a.g),a.O)),h=a.U,f=a.g,g=a.ca;var b="readystatechange";Array.isArray(b)||(b&&(Lo[0]=b.toString()),b=Lo);for(var D=0;D<b.length;D++){var G=Yi(f,b[D],g||h.handleEvent,!1,h.h||h);if(!G)break;h.g[G.key]=G}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),ee(),is(a.i,a.u,a.A,a.l,a.R,a.m)}_n.prototype.ca=function(a){a=a.target;const h=this.M;h&&Gt(a)==3?h.j():this.Y(a)},_n.prototype.Y=function(a){try{if(a==this.g)e:{const et=Gt(this.g);var h=this.g.Ba();const Wr=this.g.Z();if(!(3>et)&&(et!=3||this.g&&(this.h.h||this.g.oa()||md(this.g)))){this.J||et!=4||h==7||(h==8||0>=Wr?ee(3):ee(2)),$c(this);var f=this.g.Z();this.X=f;t:if(Qh(this)){var g=md(this.g);a="";var b=g.length,D=Gt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tr(this),ss(this);var G="";break t}this.h.i=new c.TextDecoder}for(h=0;h<b;h++)this.h.h=!0,a+=this.h.i.decode(g[h],{stream:!(D&&h==b-1)});g.length=0,this.h.g+=a,this.C=0,G=this.h.g}else G=this.g.oa();if(this.o=f==200,Uc(this.i,this.u,this.A,this.l,this.R,et,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,Qe=this.g;if((ve=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(ve)){var pe=ve;break t}}pe=null}if(f=pe)gn(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Wc(this,f);else{this.o=!1,this.s=3,ie(12),tr(this),ss(this);break e}}if(this.P){f=!0;let bt;for(;!this.J&&this.C<G.length;)if(bt=LI(this,G),bt==jc){et==4&&(this.s=4,ie(14),f=!1),gn(this.i,this.l,null,"[Incomplete Response]");break}else if(bt==Kh){this.s=4,ie(15),gn(this.i,this.l,G,"[Invalid Chunk]"),f=!1;break}else gn(this.i,this.l,bt,null),Wc(this,bt);if(Qh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),et!=4||G.length!=0||this.h.h||(this.s=1,ie(16),f=!1),this.o=this.o&&f,!f)gn(this.i,this.l,G,"[Invalid Chunked Response]"),tr(this),ss(this);else if(0<G.length&&!this.W){this.W=!0;var Ze=this.j;Ze.g==this&&Ze.ba&&!Ze.M&&(Ze.j.info("Great, no buffering proxy detected. Bytes received: "+G.length),Jc(Ze),Ze.M=!0,ie(11))}}else gn(this.i,this.l,G,null),Wc(this,G);et==4&&tr(this),this.o&&!this.J&&(et==4?Td(this.j,this):(this.o=!1,Uo(this)))}else XI(this.g),f==400&&0<G.indexOf("Unknown SID")?(this.s=3,ie(12)):(this.s=0,ie(13)),tr(this),ss(this)}}}catch{}finally{}};function Qh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function LI(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?jc:(f=Number(h.substring(f,g)),isNaN(f)?Kh:(g+=1,g+f>h.length?jc:(h=h.slice(g,g+f),a.C=g+f,h)))}_n.prototype.cancel=function(){this.J=!0,tr(this)};function Uo(a){a.S=Date.now()+a.I,Jh(a,a.I)}function Jh(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=$e(m(a.ba,a),h)}function $c(a){a.B&&(c.clearTimeout(a.B),a.B=null)}_n.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(VI(this.i,this.A),this.L!=2&&(ee(),ie(17)),tr(this),this.s=2,ss(this)):Jh(this,this.S-a)};function ss(a){a.j.G==0||a.J||Td(a.j,a)}function tr(a){$c(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,es(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Wc(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||zc(f.h,a))){if(!a.K&&zc(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)Ko(f),zo(f);else break e;Qc(f),ie(18)}}else f.za=b[1],0<f.za-f.T&&37500>b[2]&&f.F&&f.v==0&&!f.C&&(f.C=$e(m(f.Za,f),6e3));if(1>=Zh(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else rr(f,11)}else if((a.K||f.g==a)&&Ko(f),!Q(h))for(b=f.Da.g.parse(h),h=0;h<b.length;h++){let pe=b[h];if(f.T=pe[0],pe=pe[1],f.G==2)if(pe[0]=="c"){f.K=pe[1],f.ia=pe[2];const Ze=pe[3];Ze!=null&&(f.la=Ze,f.j.info("VER="+f.la));const et=pe[4];et!=null&&(f.Aa=et,f.j.info("SVER="+f.Aa));const Wr=pe[5];Wr!=null&&typeof Wr=="number"&&0<Wr&&(g=1.5*Wr,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const bt=a.g;if(bt){const Qo=bt.g?bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qo){var D=g.h;D.g||Qo.indexOf("spdy")==-1&&Qo.indexOf("quic")==-1&&Qo.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Gc(D,D.h),D.h=null))}if(g.D){const Yc=bt.g?bt.g.getResponseHeader("X-HTTP-Session-Id"):null;Yc&&(g.ya=Yc,we(g.I,g.D,Yc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var G=a;if(g.qa=bd(g,g.J?g.ia:null,g.W),G.K){ed(g.h,G);var ve=G,Qe=g.L;Qe&&(ve.I=Qe),ve.B&&($c(ve),Uo(ve)),g.g=G}else vd(g);0<f.i.length&&Go(f)}else pe[0]!="stop"&&pe[0]!="close"||rr(f,7);else f.G==3&&(pe[0]=="stop"||pe[0]=="close"?pe[0]=="stop"?rr(f,7):Hc(f):pe[0]!="noop"&&f.l&&f.l.ta(pe),f.v=0)}}ee(4)}catch{}}var xI=class{constructor(a,h){this.g=a,this.map=h}};function Yh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Xh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Zh(a){return a.h?1:a.g?a.g.size:0}function zc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Gc(a,h){a.g?a.g.add(h):a.h=h}function ed(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Yh.prototype.cancel=function(){if(this.i=td(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function td(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return C(a.i)}function MI(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],f=a.length,g=0;g<f;g++)h.push(a[g]);return h}h=[],f=0;for(g in a)h[f++]=a[g];return h}function FI(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const g in a)h[f++]=g;return h}}}function nd(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=FI(a),g=MI(a),b=g.length,D=0;D<b;D++)h.call(void 0,g[D],f&&f[D],a)}var rd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function UI(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),b=null;if(0<=g){var D=a[f].substring(0,g);b=a[f].substring(g+1)}else D=a[f];h(D,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function nr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof nr){this.h=a.h,Bo(this,a.j),this.o=a.o,this.g=a.g,jo(this,a.s),this.l=a.l;var h=a.i,f=new cs;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),id(this,f),this.m=a.m}else a&&(h=String(a).match(rd))?(this.h=!1,Bo(this,h[1]||"",!0),this.o=os(h[2]||""),this.g=os(h[3]||"",!0),jo(this,h[4]),this.l=os(h[5]||"",!0),id(this,h[6]||"",!0),this.m=os(h[7]||"")):(this.h=!1,this.i=new cs(null,this.h))}nr.prototype.toString=function(){var a=[],h=this.j;h&&a.push(as(h,sd,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(as(h,sd,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(as(f,f.charAt(0)=="/"?qI:jI,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",as(f,WI)),a.join("")};function zt(a){return new nr(a)}function Bo(a,h,f){a.j=f?os(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function jo(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function id(a,h,f){h instanceof cs?(a.i=h,zI(a.i,a.h)):(f||(h=as(h,$I)),a.i=new cs(h,a.h))}function we(a,h,f){a.i.set(h,f)}function qo(a){return we(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function os(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function as(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,BI),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function BI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var sd=/[#\/\?@]/g,jI=/[#\?:]/g,qI=/[#\?]/g,$I=/[#\?@]/g,WI=/#/g;function cs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function yn(a){a.g||(a.g=new Map,a.h=0,a.i&&UI(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=cs.prototype,n.add=function(a,h){yn(this),this.i=null,a=qr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function od(a,h){yn(a),h=qr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function ad(a,h){return yn(a),h=qr(a,h),a.g.has(h)}n.forEach=function(a,h){yn(this),this.g.forEach(function(f,g){f.forEach(function(b){a.call(h,b,g,this)},this)},this)},n.na=function(){yn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let g=0;g<h.length;g++){const b=a[g];for(let D=0;D<b.length;D++)f.push(h[g])}return f},n.V=function(a){yn(this);let h=[];if(typeof a=="string")ad(this,a)&&(h=h.concat(this.g.get(qr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},n.set=function(a,h){return yn(this),this.i=null,a=qr(this,a),ad(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function cd(a,h,f){od(a,h),0<f.length&&(a.i=null,a.g.set(qr(a,h),C(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var g=h[f];const D=encodeURIComponent(String(g)),G=this.V(g);for(g=0;g<G.length;g++){var b=D;G[g]!==""&&(b+="="+encodeURIComponent(String(G[g]))),a.push(b)}}return this.i=a.join("&")};function qr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function zI(a,h){h&&!a.j&&(yn(a),a.i=null,a.g.forEach(function(f,g){var b=g.toLowerCase();g!=b&&(od(this,g),cd(this,b,f))},a)),a.j=h}function GI(a,h){const f=new At;if(c.Image){const g=new Image;g.onload=y(In,f,"TestLoadImage: loaded",!0,h,g),g.onerror=y(In,f,"TestLoadImage: error",!1,h,g),g.onabort=y(In,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=y(In,f,"TestLoadImage: timeout",!1,h,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function KI(a,h){const f=new At,g=new AbortController,b=setTimeout(()=>{g.abort(),In(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(b),D.ok?In(f,"TestPingServer: ok",!0,h):In(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(b),In(f,"TestPingServer: error",!1,h)})}function In(a,h,f,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(f)}catch{}}function HI(){this.g=new Fc}function QI(a,h,f){const g=f||"";try{nd(a,function(b,D){let G=b;l(b)&&(G=Br(b)),h.push(g+D+"="+encodeURIComponent(G))})}catch(b){throw h.push(g+"type="+encodeURIComponent("_badmap")),b}}function us(a){this.l=a.Ub||null,this.j=a.eb||!1}R(us,ts),us.prototype.g=function(){return new $o(this.l,this.j)},us.prototype.i=function(a){return function(){return a}}({});function $o(a,h){qe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R($o,qe),n=$o.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,hs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ls(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,hs(this)),this.g&&(this.readyState=3,hs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ud(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function ud(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ls(this):hs(this),this.readyState==3&&ud(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,ls(this))},n.Qa=function(a){this.g&&(this.response=a,ls(this))},n.ga=function(){this.g&&ls(this)};function ls(a){a.readyState=4,a.l=null,a.j=null,a.v=null,hs(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function hs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($o.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ld(a){let h="";return re(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function Kc(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=ld(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):we(a,h,f))}function Oe(a){qe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(Oe,qe);var JI=/^https?$/i,YI=["POST","PUT"];n=Oe.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Bc.g(),this.v=this.o?ns(this.o):ns(Bc),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(D){hd(this,D);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)f.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())f.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(D=>D.toLowerCase()=="content-type"),b=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(YI,h,void 0))||g||b||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,G]of f)this.g.setRequestHeader(D,G);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{pd(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){hd(this,D)}};function hd(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,dd(a),Wo(a)}function dd(a){a.A||(a.A=!0,He(a,"complete"),He(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,He(this,"complete"),He(this,"abort"),Wo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Wo(this,!0)),Oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?fd(this):this.bb())},n.bb=function(){fd(this)};function fd(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Gt(a)!=4||a.Z()!=2)){if(a.u&&Gt(a)==4)Oo(a.Ea,0,a);else if(He(a,"readystatechange"),Gt(a)==4){a.h=!1;try{const G=a.Z();e:switch(G){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=G===0){var b=String(a.D).match(rd)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),g=!JI.test(b?b.toLowerCase():"")}f=g}if(f)He(a,"complete"),He(a,"success");else{a.m=6;try{var D=2<Gt(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",dd(a)}}finally{Wo(a)}}}}function Wo(a,h){if(a.g){pd(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||He(a,"ready");try{f.onreadystatechange=g}catch{}}}function pd(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Gt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Gt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Mc(h)}};function md(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function XI(a){const h={};a=(a.g&&2<=Gt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(Q(a[g]))continue;var f=w(a[g]);const b=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const D=h[b]||[];h[b]=D,D.push(f)}E(h,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ds(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function gd(a){this.Aa=0,this.i=[],this.j=new At,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ds("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ds("baseRetryDelayMs",5e3,a),this.cb=ds("retryDelaySeedMs",1e4,a),this.Wa=ds("forwardChannelMaxRetries",2,a),this.wa=ds("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Yh(a&&a.concurrentRequestLimit),this.Da=new HI,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=gd.prototype,n.la=8,n.G=1,n.connect=function(a,h,f,g){ie(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=bd(this,null,this.W),Go(this)};function Hc(a){if(_d(a),a.G==3){var h=a.U++,f=zt(a.I);if(we(f,"SID",a.K),we(f,"RID",h),we(f,"TYPE","terminate"),fs(a,f),h=new _n(a,a.j,h),h.L=2,h.v=qo(zt(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=h.v,f=!0),f||(h.g=Sd(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Uo(h)}Ad(a)}function zo(a){a.g&&(Jc(a),a.g.cancel(),a.g=null)}function _d(a){zo(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ko(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Go(a){if(!Xh(a.h)&&!a.s){a.s=!0;var h=a.Ga;Jn||Co(),Yn||(Jn(),Yn=!0),Gi.add(h,a),a.B=0}}function ZI(a,h){return Zh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=$e(m(a.Ga,a,h),wd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const b=new _n(this,this.j,a);let D=this.o;if(this.S&&(D?(D=_(D),T(D,this.S)):D=this.S),this.m!==null||this.O||(b.H=D,D=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Id(this,b,h),f=zt(this.I),we(f,"RID",a),we(f,"CVER",22),this.D&&we(f,"X-HTTP-Session-Id",this.D),fs(this,f),D&&(this.O?h="headers="+encodeURIComponent(String(ld(D)))+"&"+h:this.m&&Kc(f,this.m,D)),Gc(this.h,b),this.Ua&&we(f,"TYPE","init"),this.P?(we(f,"$req",h),we(f,"SID","null"),b.T=!0,qc(b,f,null)):qc(b,f,h),this.G=2}}else this.G==3&&(a?yd(this,a):this.i.length==0||Xh(this.h)||yd(this))};function yd(a,h){var f;h?f=h.l:f=a.U++;const g=zt(a.I);we(g,"SID",a.K),we(g,"RID",f),we(g,"AID",a.T),fs(a,g),a.m&&a.o&&Kc(g,a.m,a.o),f=new _n(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Id(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Gc(a.h,f),qc(f,g,h)}function fs(a,h){a.H&&re(a.H,function(f,g){we(h,g,f)}),a.l&&nd({},function(f,g){we(h,g,f)})}function Id(a,h,f){f=Math.min(a.i.length,f);var g=a.l?m(a.l.Na,a.l,a):null;e:{var b=a.i;let D=-1;for(;;){const G=["count="+f];D==-1?0<f?(D=b[0].g,G.push("ofs="+D)):D=0:G.push("ofs="+D);let ve=!0;for(let Qe=0;Qe<f;Qe++){let pe=b[Qe].g;const Ze=b[Qe].map;if(pe-=D,0>pe)D=Math.max(0,b[Qe].g-100),ve=!1;else try{QI(Ze,G,"req"+pe+"_")}catch{g&&g(Ze)}}if(ve){g=G.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,g}function vd(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Jn||Co(),Yn||(Jn(),Yn=!0),Gi.add(h,a),a.v=0}}function Qc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=$e(m(a.Fa,a),wd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Ed(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=$e(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ie(10),zo(this),Ed(this))};function Jc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Ed(a){a.g=new _n(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=zt(a.qa);we(h,"RID","rpc"),we(h,"SID",a.K),we(h,"AID",a.T),we(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&we(h,"TO",a.ja),we(h,"TYPE","xmlhttp"),fs(a,h),a.m&&a.o&&Kc(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=qo(zt(h)),f.m=null,f.P=!0,Hh(f,a)}n.Za=function(){this.C!=null&&(this.C=null,zo(this),Qc(this),ie(19))};function Ko(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Td(a,h){var f=null;if(a.g==h){Ko(a),Jc(a),a.g=null;var g=2}else if(zc(a.h,h))f=h.D,ed(a.h,h),g=1;else return;if(a.G!=0){if(h.o)if(g==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var b=a.B;g=L(),He(g,new ke(g,f)),Go(a)}else vd(a);else if(b=h.s,b==3||b==0&&0<h.X||!(g==1&&ZI(a,h)||g==2&&Qc(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),b){case 1:rr(a,5);break;case 4:rr(a,10);break;case 3:rr(a,6);break;default:rr(a,2)}}}function wd(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function rr(a,h){if(a.j.info("Error code "+h),h==2){var f=m(a.fb,a),g=a.Xa;const b=!g;g=new nr(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Bo(g,"https"),qo(g),b?GI(g.toString(),f):KI(g.toString(),f)}else ie(2);a.G=0,a.l&&a.l.sa(h),Ad(a),_d(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ie(2)):(this.j.info("Failed to ping google.com"),ie(1))};function Ad(a){if(a.G=0,a.ka=[],a.l){const h=td(a.h);(h.length!=0||a.i.length!=0)&&(k(a.ka,h),k(a.ka,a.i),a.h.i.length=0,C(a.i),a.i.length=0),a.l.ra()}}function bd(a,h,f){var g=f instanceof nr?zt(f):new nr(f);if(g.g!="")h&&(g.g=h+"."+g.g),jo(g,g.s);else{var b=c.location;g=b.protocol,h=h?h+"."+b.hostname:b.hostname,b=+b.port;var D=new nr(null);g&&Bo(D,g),h&&(D.g=h),b&&jo(D,b),f&&(D.l=f),g=D}return f=a.D,h=a.ya,f&&h&&we(g,f,h),we(g,"VER",a.la),fs(a,g),g}function Sd(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Oe(new us({eb:f})):new Oe(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Pd(){}n=Pd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ho(){}Ho.prototype.g=function(a,h){return new mt(a,h)};function mt(a,h){qe.call(this),this.g=new gd(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!Q(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!Q(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new $r(this)}R(mt,qe),mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},mt.prototype.close=function(){Hc(this.g)},mt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Br(a),a=f);h.i.push(new xI(h.Ya++,a)),h.G==3&&Go(h)},mt.prototype.N=function(){this.g.l=null,delete this.j,Hc(this.g),delete this.g,mt.aa.N.call(this)};function Rd(a){jr.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}R(Rd,jr);function Cd(){rs.call(this),this.status=1}R(Cd,rs);function $r(a){this.g=a}R($r,Pd),$r.prototype.ua=function(){He(this.g,"a")},$r.prototype.ta=function(a){He(this.g,new Rd(a))},$r.prototype.sa=function(a){He(this.g,new Cd)},$r.prototype.ra=function(){He(this.g,"b")},Ho.prototype.createWebChannel=Ho.prototype.g,mt.prototype.send=mt.prototype.o,mt.prototype.open=mt.prototype.m,mt.prototype.close=mt.prototype.close,Dt.createWebChannelTransport=function(){return new Ho},Dt.getStatEventTarget=function(){return L()},Dt.Event=Wt,Dt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Mo.NO_ERROR=0,Mo.TIMEOUT=8,Mo.HTTP_ERROR=6,Dt.ErrorCode=Mo,zh.COMPLETE="complete",Dt.EventType=zh,xo.EventType=er,er.OPEN="a",er.CLOSE="b",er.ERROR="c",er.MESSAGE="d",qe.prototype.listen=qe.prototype.K,Dt.WebChannel=xo,Dt.FetchXmlHttpFactory=us,Oe.prototype.listenOnce=Oe.prototype.L,Oe.prototype.getLastError=Oe.prototype.Ka,Oe.prototype.getLastErrorCode=Oe.prototype.Ba,Oe.prototype.getStatus=Oe.prototype.Z,Oe.prototype.getResponseJson=Oe.prototype.Oa,Oe.prototype.getResponseText=Oe.prototype.oa,Oe.prototype.send=Oe.prototype.ea,Oe.prototype.setWithCredentials=Oe.prototype.Ha,Dt.XhrIo=Oe}).apply(typeof It<"u"?It:typeof self<"u"?self:typeof window<"u"?window:{});Object.defineProperty(N,"__esModule",{value:!0});var Yt=za,LT=Pr,Vt=Ka,oe=H,Rn=wu,ct=Dt;const Ud="@firebase/firestore",Bd="4.8.0";/**
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
 */class ze{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ze.UNAUTHENTICATED=new ze(null),ze.GOOGLE_CREDENTIALS=new ze("google-credentials-uid"),ze.FIRST_PARTY=new ze("first-party-uid"),ze.MOCK_USER=new ze("mock-user");/**
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
 */let Di="11.10.0";/**
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
 */const Nn=new Vt.Logger("@firebase/firestore");function Yr(){return Nn.logLevel}function xT(n){Nn.setLogLevel(n)}function x(n,...e){if(Nn.logLevel<=Vt.LogLevel.DEBUG){const t=e.map(fl);Nn.debug(`Firestore (${Di}): ${n}`,...t)}}function Le(n,...e){if(Nn.logLevel<=Vt.LogLevel.ERROR){const t=e.map(fl);Nn.error(`Firestore (${Di}): ${n}`,...t)}}function ot(n,...e){if(Nn.logLevel<=Vt.LogLevel.WARN){const t=e.map(fl);Nn.warn(`Firestore (${Di}): ${n}`,...t)}}function fl(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function Y(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,hm(n,r,t)}function hm(n,e,t){let r=`FIRESTORE (${Di}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Le(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||hm(e,i,r)}function MT(n,e){n||Y(57014,e)}function W(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends oe.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ge{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class dm{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ze.UNAUTHENTICATED))}shutdown(){}}class FT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class UT{constructor(e){this.t=e,this.currentUser=ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new Ge;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ge,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ge)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new dm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new ze(e)}}class BT{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ze.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class jT{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new BT(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Au{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qT{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Yt._isFirebaseServerApp(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);const r=s=>{s.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Au(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Au(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class $T{getToken(){return Promise.resolve(new Au(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function WT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
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
 */function pl(){return new TextEncoder}/**
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
 */class Ja{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=WT(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function bu(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return te(r,i);{const s=pl(),o=zT(s.encode(jd(n,t)),s.encode(jd(e,t)));return o!==0?o:te(r,i)}}t+=r>65535?2:1}return te(n.length,e.length)}function jd(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function zT(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return te(n[t],e[t]);return te(n.length,e.length)}function oi(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function pm(n){return n+"\0"}/**
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
 */const Su="__name__";class kt{constructor(e,t,r){t===void 0?t=0:t>e.length&&Y(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Y(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return kt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof kt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=kt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return te(e.length,t.length)}static compareSegments(e,t){const r=kt.isNumericId(e),i=kt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?kt.extractNumericId(e).compare(kt.extractNumericId(t)):bu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Rn.Integer.fromString(e.substring(4,e.length-2))}}class ce extends kt{construct(e,t,r){return new ce(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new ce(t)}static emptyPath(){return new ce([])}}const GT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends kt{construct(e,t,r){return new be(e,t,r)}static isValidIdentifier(e){return GT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Su}static keyField(){return new be([Su])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
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
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ce.fromString(e))}static fromName(e){return new $(ce.fromString(e).popFirst(5))}static empty(){return new $(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ce(e.slice()))}}/**
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
 */function ml(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function mm(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function qd(n){if(!$.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function $d(n){if($.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function gm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ya(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Y(12329,{type:typeof n})}function ue(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ya(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function _m(n,e){if(e<=0)throw new V(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function Ue(n,e){const t={typeString:n};return e&&(t.value=e),t}function Rr(n,e){if(!gm(n))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const Wd=-62135596800,zd=1e6;class me{static now(){return me.fromMillis(Date.now())}static fromDate(e){return me.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*zd);return new me(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Wd)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/zd}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Rr(e,me._jsonSchema))return new me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}me._jsonSchemaVersion="firestore/timestamp/1.0",me._jsonSchema={type:Ue("string",me._jsonSchemaVersion),seconds:Ue("number"),nanoseconds:Ue("number")};/**
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
 */class Z{static fromTimestamp(e){return new Z(e)}static min(){return new Z(new me(0,0))}static max(){return new Z(new me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ai=-1;class ci{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Pu(n){return n.fields.find(e=>e.kind===2)}function or(n){return n.fields.filter(e=>e.kind!==2)}function KT(n,e){let t=te(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=HT(n.fields[r],e.fields[r]),t!==0)return t;return te(n.fields.length,e.fields.length)}ci.UNKNOWN_ID=-1;class pr{constructor(e,t){this.fieldPath=e,this.kind=t}}function HT(n,e){const t=be.comparator(n.fieldPath,e.fieldPath);return t!==0?t:te(n.kind,e.kind)}class ui{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ui(0,_t.min())}}function ym(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new me(t+1,0):new me(t,r));return new _t(i,$.empty(),e)}function Im(n){return new _t(n.readTime,n.key,ai)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t(Z.min(),$.empty(),ai)}static max(){return new _t(Z.max(),$.empty(),ai)}}function gl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
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
 */const vm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Em{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Bn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==vm)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Y(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,r)=>{t(e)})}static reject(e){return new A((t,r)=>{r(e)})}static waitFor(e){return new A((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>r(u))}),o=!0,s===i&&t()})}static or(e){let t=A.resolve(!1);for(const r of e)t=t.next(i=>i?A.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new A((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let u=0;u<s;u++){const l=u;t(e[l]).next(d=>{o[l]=d,++c,c===s&&r(o)},d=>i(d))}})}static doWhile(e,t){return new A((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
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
 */const gt="SimpleDb";class Xa{static open(e,t,r,i){try{return new Xa(t,e.transaction(i,r))}catch(s){throw new Ss(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ge,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Ss(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const i=_l(r.target.error);this.S.reject(new Ss(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(x(gt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new JT(t)}}class Ut{static delete(e){return x(gt,"Removing database:",e),cr(oe.getGlobal().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!oe.isIndexedDBAvailable())return!1;if(Ut.F())return!0;const e=oe.getUA(),t=Ut.M(e),r=0<t&&t<10,i=Tm(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.B=r,this.L=null,Ut.M(oe.getUA())===12.2&&Le("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(x(gt,"Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Ss(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new V(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new V(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ss(e,o))},i.onupgradeneeded=s=>{x(gt,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;if(this.L!==null&&this.L!==s.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${s.oldVersion}, event.newVersion=${s.newVersion}, db.version=${o.version}`);this.B.q(o,i.transaction,s.oldVersion,this.version).next(()=>{x(gt,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{const r=t.target;this.L=r.version},{passive:!0})),this.db.addEventListener("versionchange",t=>{var r;t.newVersion===null&&(ot('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(r=this.databaseDeletedListener)===null||r===void 0||r.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(e){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=e}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.k(e);const c=Xa.open(this.db,e,s?"readonly":"readwrite",r),u=i(c).next(l=>(c.v(),l)).catch(l=>(c.abort(l),A.reject(l))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(x(gt,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Tm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class QT{constructor(e){this.$=e,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(e){this.$=e}done(){this.U=!0}G(e){this.K=e}delete(){return cr(this.$.delete())}}class Ss extends V{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function jn(n){return n.name==="IndexedDbTransactionError"}class JT{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(x(gt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(x(gt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),cr(r)}add(e){return x(gt,"ADD",this.store.name,e,e),cr(this.store.add(e))}get(e){return cr(this.store.get(e)).next(t=>(t===void 0&&(t=null),x(gt,"GET",this.store.name,e,t),t))}delete(e){return x(gt,"DELETE",this.store.name,e),cr(this.store.delete(e))}count(){return x(gt,"COUNT",this.store.name),cr(this.store.count())}j(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new A((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{const s=this.cursor(r),o=[];return this.J(s,(c,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new A((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}Y(e,t){x(gt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Z=!1;const i=this.cursor(r);return this.J(i,(s,o,c)=>c.delete())}X(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.J(i,t)}ee(e){const t=this.cursor({});return new A((r,i)=>{t.onerror=s=>{const o=_l(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():r()}):r()}})}J(e,t){const r=[];return new A((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const u=new QT(c),l=t(c.primaryKey,c.value,u);if(l instanceof A){const d=l.catch(p=>(u.done(),A.reject(p)));r.push(d)}u.isDone?i():u.W===null?c.continue():c.continue(u.W)}}).next(()=>A.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Z?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function cr(n){return new A((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=_l(r.target.error);t(i)}})}let Gd=!1;function _l(n){const e=Ut.M(oe.getUA());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new V("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Gd||(Gd=!0,setTimeout(()=>{throw r},0)),r}}return n}const Ps="IndexBackfiller";class YT{constructor(e,t){this.asyncQueue=e,this.te=t,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(e){x(Ps,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.te.re();x(Ps,`Documents written: ${t}`)}catch(t){jn(t)?x(Ps,"Ignoring IndexedDB error during index backfill: ",t):await Bn(t)}await this.ne(6e4)})}}class XT{constructor(e,t){this.localStore=e,this.persistence=t}async re(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.ie(t,e))}ie(e,t){const r=new Set;let i=t,s=!0;return A.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return x(Ps,`Processing collection: ${o}`),this.se(e,o,i).next(c=>{i-=c,r.add(o)});s=!1})).next(()=>t-i)}se(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.oe(i,s)).next(c=>(x(Ps,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}oe(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=Im(s);gl(o,r)>0&&(r=o)}),new _t(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class lt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}lt.ue=-1;/**
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
 */const Cn=-1;function uo(n){return n==null}function js(n){return n===0&&1/n==-1/0}function wm(n){return typeof n=="number"&&Number.isInteger(n)&&!js(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Ea="";function rt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Kd(e)),e=ZT(n.get(t),e);return Kd(e)}function ZT(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Ea:t+="";break;default:t+=s}}return t}function Kd(n){return n+Ea+""}function Ot(n){const e=n.length;if(X(e>=2,64408,{path:n}),e===2)return X(n.charAt(0)===Ea&&n.charAt(1)==="",56145,{path:n}),ce.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(Ea,s);switch((o<0||o>t)&&Y(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(s,o);let u;i.length===0?u=c:(i+=c,u=i,i=""),r.push(u);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:Y(61167,{path:n})}s=o+2}return new ce(r)}/**
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
 */const ar="remoteDocuments",lo="owner",zr="owner",qs="mutationQueues",ew="userId",St="mutations",Hd="batchId",dr="userMutationsIndex",Qd=["userId","batchId"];/**
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
 */function oa(n,e){return[n,rt(e)]}function Am(n,e,t){return[n,rt(e),t]}const tw={},li="documentMutations",Ta="remoteDocumentsV14",nw=["prefixPath","collectionGroup","readTime","documentId"],aa="documentKeyIndex",rw=["prefixPath","collectionGroup","documentId"],bm="collectionGroupIndex",iw=["collectionGroup","readTime","prefixPath","documentId"],$s="remoteDocumentGlobal",Ru="remoteDocumentGlobalKey",hi="targets",Sm="queryTargetsIndex",sw=["canonicalId","targetId"],di="targetDocuments",ow=["targetId","path"],yl="documentTargetsIndex",aw=["path","targetId"],wa="targetGlobalKey",mr="targetGlobal",Ws="collectionParents",cw=["collectionId","parent"],fi="clientMetadata",uw="clientId",Za="bundles",lw="bundleId",ec="namedQueries",hw="name",Il="indexConfiguration",dw="indexId",Cu="collectionGroupIndex",fw="collectionGroup",Rs="indexState",pw=["indexId","uid"],Pm="sequenceNumberIndex",mw=["uid","sequenceNumber"],Cs="indexEntries",gw=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Rm="documentKeyIndex",_w=["indexId","uid","orderedDocumentKey"],tc="documentOverlays",yw=["userId","collectionPath","documentId"],Du="collectionPathOverlayIndex",Iw=["userId","collectionPath","largestBatchId"],Cm="collectionGroupOverlayIndex",vw=["userId","collectionGroup","largestBatchId"],vl="globals",Ew="name",Dm=[qs,St,li,ar,hi,lo,mr,di,fi,$s,Ws,Za,ec],Tw=[...Dm,tc],km=[qs,St,li,Ta,hi,lo,mr,di,fi,$s,Ws,Za,ec,tc],Nm=km,El=[...Nm,Il,Rs,Cs],ww=El,Vm=[...El,vl],Aw=Vm;/**
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
 */class ku extends Em{constructor(e,t){super(),this.ce=e,this.currentSequenceNumber=t}}function je(n,e){const t=W(n);return Ut.N(t.ce,e)}/**
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
 */function Jd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function qn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Om(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Lm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ee{constructor(e,t){this.comparator=e,this.root=t||Je.EMPTY}insert(e,t){return new Ee(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Je.BLACK,null,null))}remove(e){return new Ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Je.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Jo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Jo(this.root,e,this.comparator,!1)}getReverseIterator(){return new Jo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Jo(this.root,e,this.comparator,!0)}}class Jo{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Je{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Je.RED,this.left=i??Je.EMPTY,this.right=s??Je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Je(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Je.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Y(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Y(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Y(27949);return e+(this.isRed()?0:1)}}Je.EMPTY=null,Je.RED=!0,Je.BLACK=!1;Je.EMPTY=new class{constructor(){this.size=0}get key(){throw Y(57766)}get value(){throw Y(16141)}get color(){throw Y(16727)}get left(){throw Y(29726)}get right(){throw Y(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Je(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ye{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Yd(this.data.getIterator())}getIteratorFrom(e){return new Yd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class Yd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Gr(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class ht{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new ht([])}unionWith(e){let t=new ye(be.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ht(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return oi(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class xm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function bw(){return typeof atob<"u"}/**
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
 */class Ne{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new xm("Invalid base64 string: "+s):s}}(e);return new Ne(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ne(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ne.EMPTY_BYTE_STRING=new Ne("");const Sw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nn(n){if(X(!!n,39018),typeof n=="string"){let e=0;const t=Sw.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Re(n.seconds),nanos:Re(n.nanos)}}function Re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function rn(n){return typeof n=="string"?Ne.fromBase64String(n):Ne.fromUint8Array(n)}/**
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
 */const Mm="server_timestamp",Fm="__type__",Um="__previous_value__",Bm="__local_write_time__";function nc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Fm])===null||t===void 0?void 0:t.stringValue)===Mm}function rc(n){const e=n.mapValue.fields[Um];return nc(e)?rc(e):e}function zs(n){const e=nn(n.mapValue.fields[Bm].timestampValue);return new me(e.seconds,e.nanos)}/**
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
 */class Pw{constructor(e,t,r,i,s,o,c,u,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d}}const Gs="(default)";class Vn{constructor(e,t){this.projectId=e,this.database=t||Gs}static empty(){return new Vn("","")}get isDefaultDatabase(){return this.database===Gs}isEqual(e){return e instanceof Vn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Tl="__type__",jm="__max__",Sn={mapValue:{fields:{__type__:{stringValue:jm}}}},wl="__vector__",pi="value",ca={nullValue:"NULL_VALUE"};function On(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?nc(n)?4:qm(n)?9007199254740991:ic(n)?10:11:Y(28295,{value:n})}function jt(n,e){if(n===e)return!0;const t=On(n);if(t!==On(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return zs(n).isEqual(zs(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=nn(i.timestampValue),c=nn(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return rn(i.bytesValue).isEqual(rn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Re(i.geoPointValue.latitude)===Re(s.geoPointValue.latitude)&&Re(i.geoPointValue.longitude)===Re(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Re(i.integerValue)===Re(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Re(i.doubleValue),c=Re(s.doubleValue);return o===c?js(o)===js(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return oi(n.arrayValue.values||[],e.arrayValue.values||[],jt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Jd(o)!==Jd(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!jt(o[u],c[u])))return!1;return!0}(n,e);default:return Y(52216,{left:n})}}function Ks(n,e){return(n.values||[]).find(t=>jt(t,e))!==void 0}function Ln(n,e){if(n===e)return 0;const t=On(n),r=On(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=Re(s.integerValue||s.doubleValue),u=Re(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Xd(n.timestampValue,e.timestampValue);case 4:return Xd(zs(n),zs(e));case 5:return bu(n.stringValue,e.stringValue);case 6:return function(s,o){const c=rn(s),u=rn(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=te(c[l],u[l]);if(d!==0)return d}return te(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=te(Re(s.latitude),Re(o.latitude));return c!==0?c:te(Re(s.longitude),Re(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Zd(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,l,d;const p=s.fields||{},m=o.fields||{},y=(c=p[pi])===null||c===void 0?void 0:c.arrayValue,R=(u=m[pi])===null||u===void 0?void 0:u.arrayValue,C=te(((l=y==null?void 0:y.values)===null||l===void 0?void 0:l.length)||0,((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0);return C!==0?C:Zd(y,R)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Sn.mapValue&&o===Sn.mapValue)return 0;if(s===Sn.mapValue)return 1;if(o===Sn.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const m=bu(u[p],d[p]);if(m!==0)return m;const y=Ln(c[u[p]],l[d[p]]);if(y!==0)return y}return te(u.length,d.length)}(n.mapValue,e.mapValue);default:throw Y(23264,{le:t})}}function Xd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=nn(n),r=nn(e),i=te(t.seconds,r.seconds);return i!==0?i:te(t.nanos,r.nanos)}function Zd(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Ln(t[i],r[i]);if(s)return s}return te(t.length,r.length)}function mi(n){return Nu(n)}function Nu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=nn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return rn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Nu(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Nu(t.fields[o])}`;return i+"}"}(n.mapValue):Y(61005,{value:n})}function ua(n){switch(On(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=rc(n);return e?16+ua(e):16;case 5:return 2*n.stringValue.length;case 6:return rn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+ua(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return qn(r.fields,(s,o)=>{i+=s.length+ua(o)}),i}(n.mapValue);default:throw Y(13486,{value:n})}}function yr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Vu(n){return!!n&&"integerValue"in n}function Hs(n){return!!n&&"arrayValue"in n}function ef(n){return!!n&&"nullValue"in n}function tf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function la(n){return!!n&&"mapValue"in n}function ic(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Tl])===null||t===void 0?void 0:t.stringValue)===wl}function Ds(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return qn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ds(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ds(n.arrayValue.values[t]);return e}return Object.assign({},n)}function qm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===jm}const $m={mapValue:{fields:{[Tl]:{stringValue:wl},[pi]:{arrayValue:{}}}}};function Rw(n){return"nullValue"in n?ca:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?yr(Vn.empty(),$.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ic(n)?$m:{mapValue:{}}:Y(35942,{value:n})}function Cw(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?yr(Vn.empty(),$.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?$m:"mapValue"in n?ic(n)?{mapValue:{}}:Sn:Y(61959,{value:n})}function nf(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function rf(n,e){const t=Ln(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class Ye{constructor(e){this.value=e}static empty(){return new Ye({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!la(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ds(t)}setAll(e){let t=be.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Ds(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());la(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];la(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){qn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Ye(Ds(this.value))}}function Wm(n){const e=[];return qn(n.fields,(t,r)=>{const i=new be([t]);if(la(r)){const s=Wm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new ht(e)}/**
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
 */class Ae{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Ae(e,0,Z.min(),Z.min(),Z.min(),Ye.empty(),0)}static newFoundDocument(e,t,r,i){return new Ae(e,1,t,Z.min(),r,i,0)}static newNoDocument(e,t){return new Ae(e,2,t,Z.min(),Z.min(),Ye.empty(),0)}static newUnknownDocument(e,t){return new Ae(e,3,t,Z.min(),Z.min(),Ye.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ye.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ye.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class xn{constructor(e,t){this.position=e,this.inclusive=t}}function sf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=$.comparator($.fromName(o.referenceValue),t.key):r=Ln(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function of(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!jt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Qs{constructor(e,t="asc"){this.field=e,this.dir=t}}function Dw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class zm{}class le extends zm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new kw(e,t,r):t==="array-contains"?new Ow(e,r):t==="in"?new Ym(e,r):t==="not-in"?new Lw(e,r):t==="array-contains-any"?new xw(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Nw(e,r):new Vw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ln(t,this.value)):t!==null&&On(this.value)===On(t)&&this.matchesComparison(Ln(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ge extends zm{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ge(e,t)}matches(e){return gi(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function gi(n){return n.op==="and"}function Ou(n){return n.op==="or"}function Al(n){return Gm(n)&&gi(n)}function Gm(n){for(const e of n.filters)if(e instanceof ge)return!1;return!0}function Lu(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+mi(n.value);if(Al(n))return n.filters.map(e=>Lu(e)).join(",");{const e=n.filters.map(t=>Lu(t)).join(",");return`${n.op}(${e})`}}function Km(n,e){return n instanceof le?function(r,i){return i instanceof le&&r.op===i.op&&r.field.isEqual(i.field)&&jt(r.value,i.value)}(n,e):n instanceof ge?function(r,i){return i instanceof ge&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Km(o,i.filters[c]),!0):!1}(n,e):void Y(19439)}function Hm(n,e){const t=n.filters.concat(e);return ge.create(t,n.op)}function Qm(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${mi(t.value)}`}(n):n instanceof ge?function(t){return t.op.toString()+" {"+t.getFilters().map(Qm).join(" ,")+"}"}(n):"Filter"}class kw extends le{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class Nw extends le{constructor(e,t){super(e,"in",t),this.keys=Jm("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Vw extends le{constructor(e,t){super(e,"not-in",t),this.keys=Jm("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Jm(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class Ow extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Hs(t)&&Ks(t.arrayValue,this.value)}}class Ym extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ks(this.value.arrayValue,t)}}class Lw extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ks(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ks(this.value.arrayValue,t)}}class xw extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Hs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ks(this.value.arrayValue,r))}}/**
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
 */class Mw{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Pe=null}}function xu(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Mw(n,e,t,r,i,s,o)}function Ir(n){const e=W(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Lu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),uo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>mi(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>mi(r)).join(",")),e.Pe=t}return e.Pe}function ho(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Dw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Km(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!of(n.startAt,e.startAt)&&of(n.endAt,e.endAt)}function Aa(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function ba(n,e){return n.filters.filter(t=>t instanceof le&&t.field.isEqual(e))}function af(n,e,t){let r=ca,i=!0;for(const s of ba(n,e)){let o=ca,c=!0;switch(s.op){case"<":case"<=":o=Rw(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=ca}nf({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];nf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function cf(n,e,t){let r=Sn,i=!0;for(const s of ba(n,e)){let o=Sn,c=!0;switch(s.op){case">=":case">":o=Cw(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Sn}rf({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];rf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
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
 */class on{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Xm(n,e,t,r,i,s,o,c){return new on(n,e,t,r,i,s,o,c)}function ki(n){return new on(n)}function uf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function bl(n){return n.collectionGroup!==null}function ti(n){const e=W(n);if(e.Te===null){e.Te=[];const t=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ye(be.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Qs(s,r))}),t.has(be.keyField().canonicalString())||e.Te.push(new Qs(be.keyField(),r))}return e.Te}function it(n){const e=W(n);return e.Ie||(e.Ie=eg(e,ti(n))),e.Ie}function Zm(n){const e=W(n);return e.de||(e.de=eg(e,n.explicitOrderBy)),e.de}function eg(n,e){if(n.limitType==="F")return xu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Qs(i.field,s)});const t=n.endAt?new xn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new xn(n.startAt.position,n.startAt.inclusive):null;return xu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Mu(n,e){const t=n.filters.concat([e]);return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Sa(n,e,t){return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function fo(n,e){return ho(it(n),it(e))&&n.limitType===e.limitType}function tg(n){return`${Ir(it(n))}|lt:${n.limitType}`}function Xr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Qm(i)).join(", ")}]`),uo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>mi(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>mi(i)).join(",")),`Target(${r})`}(it(n))}; limitType=${n.limitType})`}function po(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):$.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of ti(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,u){const l=sf(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,ti(r),i)||r.endAt&&!function(o,c,u){const l=sf(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,ti(r),i))}(n,e)}function ng(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function rg(n){return(e,t)=>{let r=!1;for(const i of ti(n)){const s=Fw(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Fw(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(s,o,c){const u=o.data.field(s),l=c.data.field(s);return u!==null&&l!==null?Ln(u,l):Y(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Y(19790,{direction:n.dir})}}/**
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
 */class an{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){qn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Lm(this.inner)}size(){return this.innerSize}}/**
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
 */const Uw=new Ee($.comparator);function dt(){return Uw}const ig=new Ee($.comparator);function vs(...n){let e=ig;for(const t of n)e=e.insert(t.key,t);return e}function sg(n){let e=ig;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Lt(){return ks()}function og(){return ks()}function ks(){return new an(n=>n.toString(),(n,e)=>n.isEqual(e))}const Bw=new Ee($.comparator),jw=new ye($.comparator);function se(...n){let e=jw;for(const t of n)e=e.add(t);return e}const qw=new ye(te);function Sl(){return qw}/**
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
 */function Pl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:js(e)?"-0":e}}function ag(n){return{integerValue:""+n}}function cg(n,e){return wm(e)?ag(e):Pl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class sc{constructor(){this._=void 0}}function $w(n,e,t){return n instanceof _i?function(i,s){const o={fields:{[Fm]:{stringValue:Mm},[Bm]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&nc(s)&&(s=rc(s)),s&&(o.fields[Um]=s),{mapValue:o}}(t,e):n instanceof vr?lg(n,e):n instanceof Er?hg(n,e):function(i,s){const o=ug(i,s),c=lf(o)+lf(i.Ee);return Vu(o)&&Vu(i.Ee)?ag(c):Pl(i.serializer,c)}(n,e)}function Ww(n,e,t){return n instanceof vr?lg(n,e):n instanceof Er?hg(n,e):t}function ug(n,e){return n instanceof yi?function(r){return Vu(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class _i extends sc{}class vr extends sc{constructor(e){super(),this.elements=e}}function lg(n,e){const t=dg(e);for(const r of n.elements)t.some(i=>jt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Er extends sc{constructor(e){super(),this.elements=e}}function hg(n,e){let t=dg(e);for(const r of n.elements)t=t.filter(i=>!jt(i,r));return{arrayValue:{values:t}}}class yi extends sc{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function lf(n){return Re(n.integerValue||n.doubleValue)}function dg(n){return Hs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class mo{constructor(e,t){this.field=e,this.transform=t}}function zw(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof vr&&i instanceof vr||r instanceof Er&&i instanceof Er?oi(r.elements,i.elements,jt):r instanceof yi&&i instanceof yi?jt(r.Ee,i.Ee):r instanceof _i&&i instanceof _i}(n.transform,e.transform)}class Gw{constructor(e,t){this.version=e,this.transformResults=t}}class Ce{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ce}static exists(e){return new Ce(void 0,e)}static updateTime(e){return new Ce(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ha(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class oc{}function fg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Vi(n.key,Ce.none()):new Ni(n.key,n.data,Ce.none());{const t=n.data,r=Ye.empty();let i=new ye(be.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new cn(n.key,r,new ht(i.toArray()),Ce.none())}}function Kw(n,e,t){n instanceof Ni?function(i,s,o){const c=i.value.clone(),u=df(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof cn?function(i,s,o){if(!ha(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=df(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(pg(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Ns(n,e,t,r){return n instanceof Ni?function(s,o,c,u){if(!ha(s.precondition,o))return c;const l=s.value.clone(),d=ff(s.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof cn?function(s,o,c,u){if(!ha(s.precondition,o))return c;const l=ff(s.fieldTransforms,u,o),d=o.data;return d.setAll(pg(s)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,o,c){return ha(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function Hw(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=ug(r.transform,i||null);s!=null&&(t===null&&(t=Ye.empty()),t.set(r.field,s))}return t||null}function hf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&oi(r,i,(s,o)=>zw(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ni extends oc{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class cn extends oc{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function pg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function df(n,e,t){const r=new Map;X(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,Ww(o,c,t[i]))}return r}function ff(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,$w(s,o,e))}return r}class Vi extends oc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Rl extends oc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Cl{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Kw(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ns(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ns(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=og();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const u=fg(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&oi(this.mutations,e.mutations,(t,r)=>hf(t,r))&&oi(this.baseMutations,e.baseMutations,(t,r)=>hf(t,r))}}class Dl{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return Bw}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Dl(e,t,r,i)}}/**
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
 */class kl{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class mg{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
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
 */class Qw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Me,de;function gg(n){switch(n){case P.OK:return Y(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return Y(15467,{code:n})}}function _g(n){if(n===void 0)return Le("GRPC error has no .code"),P.UNKNOWN;switch(n){case Me.OK:return P.OK;case Me.CANCELLED:return P.CANCELLED;case Me.UNKNOWN:return P.UNKNOWN;case Me.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Me.INTERNAL:return P.INTERNAL;case Me.UNAVAILABLE:return P.UNAVAILABLE;case Me.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Me.NOT_FOUND:return P.NOT_FOUND;case Me.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Me.ABORTED:return P.ABORTED;case Me.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Me.DATA_LOSS:return P.DATA_LOSS;default:return Y(39323,{code:n})}}(de=Me||(Me={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
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
 */let Pa=null;/**
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
 */const Jw=new Rn.Integer([4294967295,4294967295],0);function pf(n){const e=pl().encode(n),t=new Rn.Md5;return t.update(e),new Uint8Array(t.digest())}function mf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Rn.Integer([t,r],0),new Rn.Integer([i,s],0)]}class Nl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Es(`Invalid padding: ${t}`);if(r<0)throw new Es(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Es(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Es(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Rn.Integer.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(Rn.Integer.fromNumber(r)));return i.compare(Jw)===1&&(i=new Rn.Integer([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=pf(e),[r,i]=mf(t);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);if(!this.ye(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Nl(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.fe===0)return;const t=pf(e),[r,i]=mf(t);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);this.we(o)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Es extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class go{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,_o.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new go(Z.min(),i,new Ee(te),dt(),se())}}class _o{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new _o(r,t,se(),se(),se())}}/**
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
 */class da{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}}class yg{constructor(e,t){this.targetId=e,this.De=t}}class Ig{constructor(e,t,r=Ne.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class gf{constructor(){this.ve=0,this.Ce=_f(),this.Fe=Ne.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=se(),t=se(),r=se();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:Y(38017,{changeType:s})}}),new _o(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=_f()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Yw{constructor(e){this.We=e,this.Ge=new Map,this.ze=dt(),this.je=Yo(),this.Je=Yo(),this.He=new Ee(te)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:Y(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,r=e.De.count,i=this.st(t);if(i){const s=i.target;if(Aa(s))if(r===0){const o=new $(s.path);this.Xe(t,o,Ae.newNoDocument(o,Z.min()))}else X(r===1,20013,{expectedCount:r});else{const o=this.ot(t);if(o!==r){const c=this._t(e),u=c?this.ut(c,e,o):1;if(u!==0){this.rt(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,l)}Pa==null||Pa.ct(function(d,p,m,y,R){var C,k,F,Q,K,ne;const he={localCacheCount:d,existenceFilterCount:p.count,databaseId:m.database,projectId:m.projectId},re=p.unchangedNames;return re&&(he.bloomFilter={applied:R===0,hashCount:(C=re==null?void 0:re.hashCount)!==null&&C!==void 0?C:0,bitmapLength:(Q=(F=(k=re==null?void 0:re.bits)===null||k===void 0?void 0:k.bitmap)===null||F===void 0?void 0:F.length)!==null&&Q!==void 0?Q:0,padding:(ne=(K=re==null?void 0:re.bits)===null||K===void 0?void 0:K.padding)!==null&&ne!==void 0?ne:0,mightContain:E=>{var _;return(_=y==null?void 0:y.mightContain(E))!==null&&_!==void 0&&_}}),he}(o,e.De,this.We.lt(),c,u))}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=rn(r).toUint8Array()}catch(u){if(u instanceof xm)return ot("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Nl(o,i,s)}catch(u){return ot(u instanceof Es?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.We.lt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,s,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((s,o)=>{const c=this.st(o);if(c){if(s.current&&Aa(c.target)){const u=new $(c.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,Ae.newNoDocument(u,e))}s.Ne&&(t.set(o,s.Le()),s.ke())}});let r=se();this.Je.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{const l=this.st(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ze.forEach((s,o)=>o.setReadTime(e));const i=new go(e,t,this.He,this.ze,r);return this.ze=dt(),this.je=Yo(),this.Je=Yo(),this.He=new Ee(te),i}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new gf,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new ye(te),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new ye(te),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new gf),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Yo(){return new Ee($.comparator)}function _f(){return new Ee($.comparator)}const Xw={asc:"ASCENDING",desc:"DESCENDING"},Zw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},eA={and:"AND",or:"OR"};class tA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Fu(n,e){return n.useProto3Json||uo(e)?e:{value:e}}function Ii(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function nA(n,e){return Ii(n,e.toTimestamp())}function xe(n){return X(!!n,49232),Z.fromTimestamp(function(t){const r=nn(t);return new me(r.seconds,r.nanos)}(n))}function Vl(n,e){return Uu(n,e).canonicalString()}function Uu(n,e){const t=function(i){return new ce(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Eg(n){const e=ce.fromString(n);return X(Dg(e),10190,{key:e.toString()}),e}function Js(n,e){return Vl(n.databaseId,e.path)}function Bt(n,e){const t=Eg(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(Ag(t))}function Tg(n,e){return Vl(n.databaseId,e)}function wg(n){const e=Eg(n);return e.length===4?ce.emptyPath():Ag(e)}function Bu(n){return new ce(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ag(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function yf(n,e,t){return{name:Js(n,e),fields:t.value.mapValue.fields}}function ac(n,e,t){const r=Bt(n,e.name),i=xe(e.updateTime),s=e.createTime?xe(e.createTime):Z.min(),o=new Ye({mapValue:{fields:e.fields}}),c=Ae.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function rA(n,e){return"found"in e?function(r,i){X(!!i.found,43571),i.found.name,i.found.updateTime;const s=Bt(r,i.found.name),o=xe(i.found.updateTime),c=i.found.createTime?xe(i.found.createTime):Z.min(),u=new Ye({mapValue:{fields:i.found.fields}});return Ae.newFoundDocument(s,o,c,u)}(n,e):"missing"in e?function(r,i){X(!!i.missing,3894),X(!!i.readTime,22933);const s=Bt(r,i.missing),o=xe(i.readTime);return Ae.newNoDocument(s,o)}(n,e):Y(7234,{result:e})}function iA(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Y(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(l,d){return l.useProto3Json?(X(d===void 0||typeof d=="string",58123),Ne.fromBase64String(d||"")):(X(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ne.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){const d=l.code===void 0?P.UNKNOWN:_g(l.code);return new V(d,l.message||"")}(o);t=new Ig(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Bt(n,r.document.name),s=xe(r.document.updateTime),o=r.document.createTime?xe(r.document.createTime):Z.min(),c=new Ye({mapValue:{fields:r.document.fields}}),u=Ae.newFoundDocument(i,s,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new da(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Bt(n,r.document),s=r.readTime?xe(r.readTime):Z.min(),o=Ae.newNoDocument(i,s),c=r.removedTargetIds||[];t=new da([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Bt(n,r.document),s=r.removedTargetIds||[];t=new da([],s,i,null)}else{if(!("filter"in e))return Y(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new Qw(i,s),c=r.targetId;t=new yg(c,o)}}return t}function Ys(n,e){let t;if(e instanceof Ni)t={update:yf(n,e.key,e.value)};else if(e instanceof Vi)t={delete:Js(n,e.key)};else if(e instanceof cn)t={update:yf(n,e.key,e.data),updateMask:lA(e.fieldMask)};else{if(!(e instanceof Rl))return Y(16599,{Rt:e.type});t={verify:Js(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof _i)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof vr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Er)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof yi)return{fieldPath:o.field.canonicalString(),increment:c.Ee};throw Y(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:nA(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:Y(27497)}(n,e.precondition)),t}function ju(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Ce.updateTime(xe(s.updateTime)):s.exists!==void 0?Ce.exists(s.exists):Ce.none()}(e.currentDocument):Ce.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let u=null;if("setToServerValue"in c)X(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new _i;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new vr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new Er(d)}else"increment"in c?u=new yi(o,c.increment):Y(16584,{proto:c});const l=be.fromServerFormat(c.fieldPath);return new mo(l,u)}(n,i)):[];if(e.update){e.update.name;const i=Bt(n,e.update.name),s=new Ye({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const l=u.fieldPaths||[];return new ht(l.map(d=>be.fromServerFormat(d)))}(e.updateMask);return new cn(i,s,o,t,r)}return new Ni(i,s,t,r)}if(e.delete){const i=Bt(n,e.delete);return new Vi(i,t)}if(e.verify){const i=Bt(n,e.verify);return new Rl(i,t)}return Y(1463,{proto:e})}function sA(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map(t=>function(i,s){let o=i.updateTime?xe(i.updateTime):xe(s);return o.isEqual(Z.min())&&(o=xe(s)),new Gw(o,i.transformResults||[])}(t,e))):[]}function bg(n,e){return{documents:[Tg(n,e.path)]}}function cc(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tg(n,i);const s=function(l){if(l.length!==0)return Cg(ge.create(l,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(l){if(l.length!==0)return l.map(d=>function(m){return{field:An(m.field),direction:aA(m.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Fu(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{Vt:t,parent:i}}function Sg(n,e,t,r){const{Vt:i,parent:s}=cc(n,e),o={},c=[];let u=0;return t.forEach(l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:An(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:An(l.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:i.structuredQuery},parent:i.parent},ft:o,parent:s}}function Pg(n){let e=wg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){X(r===1,65062);const d=t.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];t.where&&(s=function(p){const m=Rg(p);return m instanceof ge&&Al(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(R){return new Qs(Zr(R.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,uo(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(p){const m=!!p.before,y=p.values||[];return new xn(y,m)}(t.startAt));let l=null;return t.endAt&&(l=function(p){const m=!p.before,y=p.values||[];return new xn(y,m)}(t.endAt)),Xm(e,i,o,s,c,"F",u,l)}function oA(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Rg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Zr(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Zr(t.unaryFilter.field);return le.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Zr(t.unaryFilter.field);return le.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Zr(t.unaryFilter.field);return le.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Y(61313);default:return Y(60726)}}(n):n.fieldFilter!==void 0?function(t){return le.create(Zr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Y(58110);default:return Y(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ge.create(t.compositeFilter.filters.map(r=>Rg(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return Y(1026)}}(t.compositeFilter.op))}(n):Y(30097,{filter:n})}function aA(n){return Xw[n]}function cA(n){return Zw[n]}function uA(n){return eA[n]}function An(n){return{fieldPath:n.canonicalString()}}function Zr(n){return be.fromServerFormat(n.fieldPath)}function Cg(n){return n instanceof le?function(t){if(t.op==="=="){if(tf(t.value))return{unaryFilter:{field:An(t.field),op:"IS_NAN"}};if(ef(t.value))return{unaryFilter:{field:An(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(tf(t.value))return{unaryFilter:{field:An(t.field),op:"IS_NOT_NAN"}};if(ef(t.value))return{unaryFilter:{field:An(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:An(t.field),op:cA(t.op),value:t.value}}}(n):n instanceof ge?function(t){const r=t.getFilters().map(i=>Cg(i));return r.length===1?r[0]:{compositeFilter:{op:uA(t.op),filters:r}}}(n):Y(54877,{filter:n})}function lA(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Dg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Xt{constructor(e,t,r,i,s=Z.min(),o=Z.min(),c=Ne.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Xt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class kg{constructor(e){this.gt=e}}function hA(n,e){let t;if(e.document)t=ac(n.gt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=$.fromSegments(e.noDocument.path),i=wr(e.noDocument.readTime);t=Ae.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return Y(56709);{const r=$.fromSegments(e.unknownDocument.path),i=wr(e.unknownDocument.version);t=Ae.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new me(i[0],i[1]);return Z.fromTimestamp(s)}(e.readTime)),t}function If(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ra(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:Js(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Ii(s,o.version.toTimestamp()),createTime:Ii(s,o.createTime.toTimestamp())}}(n.gt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Tr(e.version)};else{if(!e.isUnknownDocument())return Y(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Tr(e.version)}}return r}function Ra(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Tr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function wr(n){const e=new me(n.seconds,n.nanoseconds);return Z.fromTimestamp(e)}function ur(n,e){const t=(e.baseMutations||[]).map(s=>ju(n.gt,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>ju(n.gt,s)),i=me.fromMillis(e.localWriteTimeMs);return new Cl(e.batchId,i,t,r)}function Ts(n){const e=wr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?wr(n.lastLimboFreeSnapshotVersion):Z.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){const o=s.documents.length;return X(o===1,1966,{count:o}),it(ki(wg(s.documents[0])))}(n.query):function(s){return it(Pg(s))}(n.query),new Xt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ne.fromBase64String(n.resumeToken))}function Ng(n,e){const t=Tr(e.snapshotVersion),r=Tr(e.lastLimboFreeSnapshotVersion);let i;i=Aa(e.target)?bg(n.gt,e.target):cc(n.gt,e.target).Vt;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ir(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function uc(n){const e=Pg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Sa(e,e.limit,"L"):e}function nu(n,e){return new kl(e.largestBatchId,ju(n.gt,e.overlayMutation))}function vf(n,e){const t=e.path.lastSegment();return[n,rt(e.path.popLast()),t]}function Ef(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Tr(r.readTime),documentKey:rt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class dA{getBundleMetadata(e,t){return Tf(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:wr(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return Tf(e).put(function(i){return{bundleId:i.id,createTime:Tr(xe(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return wf(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:uc(s.bundledQuery),readTime:wr(s.readTime)}}(r)})}saveNamedQuery(e,t){return wf(e).put(function(i){return{name:i.name,readTime:Tr(xe(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Tf(n){return je(n,Za)}function wf(n){return je(n,ec)}/**
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
 */class lc{constructor(e,t){this.serializer=e,this.userId=t}static yt(e,t){const r=t.uid||"";return new lc(e,r)}getOverlay(e,t){return ps(e).get(vf(this.userId,t)).next(r=>r?nu(this.serializer,r):null)}getOverlays(e,t){const r=Lt();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const c=new kl(t,o);i.push(this.wt(e,c))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(rt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(ps(e).Y(Du,c))}),A.waitFor(s)}getOverlaysForCollection(e,t,r){const i=Lt(),s=rt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return ps(e).j(Du,o).next(c=>{for(const u of c){const l=nu(this.serializer,u);i.set(l.getKey(),l)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=Lt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ps(e).X({index:Cm,range:c},(u,l,d)=>{const p=nu(this.serializer,l);s.size()<i||p.largestBatchId===o?(s.set(p.getKey(),p),o=p.largestBatchId):d.done()}).next(()=>s)}wt(e,t){return ps(e).put(function(i,s,o){const[c,u,l]=vf(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ys(i.gt,o.mutation)}}(this.serializer,this.userId,t))}}function ps(n){return je(n,tc)}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class fA{St(e){return je(e,vl)}getSessionToken(e){return this.St(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ne.fromUint8Array(r):Ne.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class lr{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(Re(e.integerValue));else if("doubleValue"in e){const r=Re(e.doubleValue);isNaN(r)?this.Ct(t,13):(this.Ct(t,15),js(r)?t.Ft(0):t.Ft(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ct(t,20),typeof r=="string"&&(r=nn(r)),t.Mt(`${r.seconds||""}`),t.Ft(r.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(rn(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ct(t,45),t.Ft(r.latitude||0),t.Ft(r.longitude||0)}else"mapValue"in e?qm(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):ic(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):Y(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){const r=e.fields||{};this.Ct(t,55);for(const i of Object.keys(r))this.xt(i,t),this.Dt(r[i],t)}Lt(e,t){var r,i;const s=e.fields||{};this.Ct(t,53);const o=pi,c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(Re(c)),this.xt(o,t),this.Dt(s[o],t)}qt(e,t){const r=e.values||[];this.Ct(t,50);for(const i of r)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),$.fromName(e).path.forEach(r=>{this.Ct(t,60),this.$t(r,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}}lr.Ut=new lr;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=255;function pA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Af(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=pA(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class mA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Wt(r.value),r=t.next();this.Gt()}zt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.jt(r.value),r=t.next();this.Jt()}Ht(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Wt(r);else if(r<2048)this.Wt(960|r>>>6),this.Wt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Wt(480|r>>>12),this.Wt(128|63&r>>>6),this.Wt(128|63&r);else{const i=t.codePointAt(0);this.Wt(240|i>>>18),this.Wt(128|63&i>>>12),this.Wt(128|63&i>>>6),this.Wt(128|63&i)}}this.Gt()}Yt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.jt(r);else if(r<2048)this.jt(960|r>>>6),this.jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.jt(480|r>>>12),this.jt(128|63&r>>>6),this.jt(128|63&r);else{const i=t.codePointAt(0);this.jt(240|i>>>18),this.jt(128|63&i>>>12),this.jt(128|63&i>>>6),this.jt(128|63&i)}}this.Jt()}Zt(e){const t=this.Xt(e),r=Af(t);this.en(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}tn(e){const t=this.Xt(e),r=Af(t);this.en(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}nn(){this.rn(Kr),this.rn(255)}sn(){this._n(Kr),this._n(255)}reset(){this.position=0}seed(e){this.en(e.length),this.buffer.set(e,this.position),this.position+=e.length}an(){return this.buffer.slice(0,this.position)}Xt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Wt(e){const t=255&e;t===0?(this.rn(0),this.rn(255)):t===Kr?(this.rn(Kr),this.rn(0)):this.rn(t)}jt(e){const t=255&e;t===0?(this._n(0),this._n(255)):t===Kr?(this._n(Kr),this._n(0)):this._n(e)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(e){this.en(1),this.buffer[this.position++]=e}_n(e){this.en(1),this.buffer[this.position++]=~e}en(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class gA{constructor(e){this.un=e}Nt(e){this.un.Kt(e)}Mt(e){this.un.Ht(e)}Ft(e){this.un.Zt(e)}vt(){this.un.nn()}}class _A{constructor(e){this.un=e}Nt(e){this.un.zt(e)}Mt(e){this.un.Yt(e)}Ft(e){this.un.tn(e)}vt(){this.un.sn()}}class ms{constructor(){this.un=new mA,this.cn=new gA(this.un),this.ln=new _A(this.un)}seed(e){this.un.seed(e)}hn(e){return e===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}}/**
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
 */class hr{constructor(e,t,r,i){this.Pn=e,this.Tn=t,this.In=r,this.dn=i}En(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.dn,0),t!==e?r.set([0],this.dn.length):++r[r.length-1],new hr(this.Pn,this.Tn,this.In,r)}An(e,t,r){return{indexId:this.Pn,uid:e,arrayValue:fa(this.In),directionalValue:fa(this.dn),orderedDocumentKey:fa(t),documentKey:r.path.toArray()}}Rn(e,t,r){const i=this.An(e,t,r);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function vn(n,e){let t=n.Pn-e.Pn;return t!==0?t:(t=bf(n.In,e.In),t!==0?t:(t=bf(n.dn,e.dn),t!==0?t:$.comparator(n.Tn,e.Tn)))}function bf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function fa(n){return oe.isSafariOrWebkit()?function(t){let r="";for(let i=0;i<t.length;i++)r+=String.fromCharCode(t[i]);return r}(n):n}function Sf(n){return typeof n!="string"?n:function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(n)}class Pf{constructor(e){this.Vn=new ye((t,r)=>be.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.mn=e.orderBy,this.fn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.fn.push(r)}}get gn(){return this.Vn.size>1}pn(e){if(X(e.collectionGroup===this.collectionId,49279),this.gn)return!1;const t=Pu(e);if(t!==void 0&&!this.yn(t))return!1;const r=or(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.yn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!i.has(c.field.canonicalString())){const u=r[s];if(!this.wn(c,u)||!this.Sn(this.mn[o++],u))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.mn.length||!this.Sn(this.mn[o++],c))return!1}return!0}bn(){if(this.gn)return null;let e=new ye(be.comparator);const t=[];for(const r of this.fn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new pr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new pr(r.field,0))}for(const r of this.mn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new pr(r.field,r.dir==="asc"?0:1)));return new ci(ci.UNKNOWN_ID,this.collectionId,t,ui.empty())}yn(e){for(const t of this.fn)if(this.wn(t,e))return!0;return!1}wn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}Sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Vg(n){var e,t;if(X(n instanceof le||n instanceof ge,20012),n instanceof le){if(n instanceof Ym){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>le.create(n.field,"==",s)))||[];return ge.create(i,"or")}return n}const r=n.filters.map(i=>Vg(i));return ge.create(r,n.op)}function yA(n){if(n.getFilters().length===0)return[];const e=Wu(Vg(n));return X(Og(e),7391),qu(e)||$u(e)?[e]:e.getFilters()}function qu(n){return n instanceof le}function $u(n){return n instanceof ge&&Al(n)}function Og(n){return qu(n)||$u(n)||function(t){if(t instanceof ge&&Ou(t)){for(const r of t.getFilters())if(!qu(r)&&!$u(r))return!1;return!0}return!1}(n)}function Wu(n){if(X(n instanceof le||n instanceof ge,34018),n instanceof le)return n;if(n.filters.length===1)return Wu(n.filters[0]);const e=n.filters.map(r=>Wu(r));let t=ge.create(e,n.op);return t=Ca(t),Og(t)?t:(X(t instanceof ge,64498),X(gi(t),40251),X(t.filters.length>1,57927),t.filters.reduce((r,i)=>Ol(r,i)))}function Ol(n,e){let t;return X(n instanceof le||n instanceof ge,38388),X(e instanceof le||e instanceof ge,25473),t=n instanceof le?e instanceof le?function(i,s){return ge.create([i,s],"and")}(n,e):Rf(n,e):e instanceof le?Rf(e,n):function(i,s){if(X(i.filters.length>0&&s.filters.length>0,48005),gi(i)&&gi(s))return Hm(i,s.getFilters());const o=Ou(i)?i:s,c=Ou(i)?s:i,u=o.filters.map(l=>Ol(l,c));return ge.create(u,"or")}(n,e),Ca(t)}function Rf(n,e){if(gi(e))return Hm(e,n.getFilters());{const t=e.filters.map(r=>Ol(n,r));return ge.create(t,"or")}}function Ca(n){if(X(n instanceof le||n instanceof ge,11850),n instanceof le)return n;const e=n.getFilters();if(e.length===1)return Ca(e[0]);if(Gm(n))return n;const t=e.map(i=>Ca(i)),r=[];return t.forEach(i=>{i instanceof le?r.push(i):i instanceof ge&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ge.create(r,n.op)}/**
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
 */class IA{constructor(){this.Dn=new Ll}addToCollectionParentIndex(e,t){return this.Dn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(_t.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Ll{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ye(ce.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ye(ce.comparator)).toArray()}}/**
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
 */const Cf="IndexedDbIndexManager",Xo=new Uint8Array(0);class vA{constructor(e,t){this.databaseId=t,this.vn=new Ll,this.Cn=new an(r=>Ir(r),(r,i)=>ho(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const s={collectionId:r,parent:rt(i)};return Df(e).put(s)}return A.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[pm(t),""],!1,!0);return Df(e).j(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(Ot(o.parent))}return r})}addFieldIndex(e,t){const r=gs(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Qr(e);return s.next(c=>{o.put(Ef(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=gs(e),i=Qr(e),s=Hr(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=gs(e),r=Hr(e),i=Qr(e);return t.Y().next(()=>r.Y()).next(()=>i.Y())}createTargetIndexes(e,t){return A.forEach(this.Fn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new Pf(r).bn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=Hr(e);let i=!0;const s=new Map;return A.forEach(this.Fn(t),o=>this.Mn(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=se();const c=[];return A.forEach(s,(u,l)=>{x(Cf,`Using index ${function(K){return`id=${K.indexId}|cg=${K.collectionGroup}|f=${K.fields.map(ne=>`${ne.fieldPath}:${ne.kind}`).join(",")}`}(u)} to execute ${Ir(t)}`);const d=function(K,ne){const he=Pu(ne);if(he===void 0)return null;for(const re of ba(K,he.fieldPath))switch(re.op){case"array-contains-any":return re.value.arrayValue.values||[];case"array-contains":return[re.value]}return null}(l,u),p=function(K,ne){const he=new Map;for(const re of or(ne))for(const E of ba(K,re.fieldPath))switch(E.op){case"==":case"in":he.set(re.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return he.set(re.fieldPath.canonicalString(),E.value),Array.from(he.values())}return null}(l,u),m=function(K,ne){const he=[];let re=!0;for(const E of or(ne)){const _=E.kind===0?af(K,E.fieldPath,K.startAt):cf(K,E.fieldPath,K.startAt);he.push(_.value),re&&(re=_.inclusive)}return new xn(he,re)}(l,u),y=function(K,ne){const he=[];let re=!0;for(const E of or(ne)){const _=E.kind===0?cf(K,E.fieldPath,K.endAt):af(K,E.fieldPath,K.endAt);he.push(_.value),re&&(re=_.inclusive)}return new xn(he,re)}(l,u),R=this.xn(u,l,m),C=this.xn(u,l,y),k=this.On(u,l,p),F=this.Nn(u.indexId,d,R,m.inclusive,C,y.inclusive,k);return A.forEach(F,Q=>r.H(Q,t.limit).next(K=>{K.forEach(ne=>{const he=$.fromSegments(ne.documentKey);o.has(he)||(o=o.add(he),c.push(he))})}))}).next(()=>c)}return A.resolve(null)})}Fn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=yA(ge.create(e.filters,"and")).map(r=>xu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}Nn(e,t,r,i,s,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,s.length),l=u/(t!=null?t.length:1),d=[];for(let p=0;p<u;++p){const m=t?this.Bn(t[p/l]):Xo,y=this.Ln(e,m,r[p%l],i),R=this.kn(e,m,s[p%l],o),C=c.map(k=>this.Ln(e,m,k,!0));d.push(...this.createRange(y,R,C))}return d}Ln(e,t,r,i){const s=new hr(e,$.empty(),t,r);return i?s:s.En()}kn(e,t,r,i){const s=new hr(e,$.empty(),t,r);return i?s.En():s}Mn(e,t){const r=new Pf(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)r.pn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let r=2;const i=this.Fn(t);return A.forEach(i,s=>this.Mn(e,s).next(o=>{o?r!==0&&o.fields.length<function(u){let l=new ye(be.comparator),d=!1;for(const p of u.filters)for(const m of p.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?d=!0:l=l.add(m.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(d?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}qn(e,t){const r=new ms;for(const i of or(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.hn(i.kind);lr.Ut.bt(s,o)}return r.an()}Bn(e){const t=new ms;return lr.Ut.bt(e,t.hn(0)),t.an()}Qn(e,t){const r=new ms;return lr.Ut.bt(yr(this.databaseId,t),r.hn(function(s){const o=or(s);return o.length===0?0:o[o.length-1].kind}(e))),r.an()}On(e,t,r){if(r===null)return[];let i=[];i.push(new ms);let s=0;for(const o of or(e)){const c=r[s++];for(const u of i)if(this.$n(t,o.fieldPath)&&Hs(c))i=this.Un(i,o,c);else{const l=u.hn(o.kind);lr.Ut.bt(c,l)}}return this.Kn(i)}xn(e,t,r){return this.On(e,t,r.position)}Kn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].an();return t}Un(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const u=new ms;u.seed(c.an()),lr.Ut.bt(o,u.hn(t.kind)),s.push(u)}return s}$n(e,t){return!!e.filters.find(r=>r instanceof le&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=gs(e),i=Qr(e);return(t?r.j(Cu,IDBKeyRange.bound(t,t)):r.j()).next(s=>{const o=[];return A.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{o.push(function(d,p){const m=p?new ui(p.sequenceNumber,new _t(wr(p.readTime),new $(Ot(p.documentKey)),p.largestBatchId)):ui.empty(),y=d.fields.map(([R,C])=>new pr(be.fromServerFormat(R),C));return new ci(d.indexId,d.collectionGroup,y,m)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:te(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=gs(e),s=Qr(e);return this.Wn(e).next(o=>i.j(Cu,IDBKeyRange.bound(t,t)).next(c=>A.forEach(c,u=>s.put(Ef(u.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return A.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),A.forEach(c,u=>this.Gn(e,i,u).next(l=>{const d=this.zn(s,u);return l.isEqual(d)?A.resolve():this.jn(e,s,u,l,d)}))))})}Jn(e,t,r,i){return Hr(e).put(i.An(this.uid,this.Qn(r,t.key),t.key))}Hn(e,t,r,i){return Hr(e).delete(i.Rn(this.uid,this.Qn(r,t.key),t.key))}Gn(e,t,r){const i=Hr(e);let s=new ye(vn);return i.X({index:Rm,range:IDBKeyRange.only([r.indexId,this.uid,fa(this.Qn(r,t))])},(o,c)=>{s=s.add(new hr(r.indexId,t,Sf(c.arrayValue),Sf(c.directionalValue)))}).next(()=>s)}zn(e,t){let r=new ye(vn);const i=this.qn(t,e);if(i==null)return r;const s=Pu(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Hs(o))for(const c of o.arrayValue.values||[])r=r.add(new hr(t.indexId,e.key,this.Bn(c),i))}else r=r.add(new hr(t.indexId,e.key,Xo,i));return r}jn(e,t,r,i,s){x(Cf,"Updating index entries for document '%s'",t.key);const o=[];return function(u,l,d,p,m){const y=u.getIterator(),R=l.getIterator();let C=Gr(y),k=Gr(R);for(;C||k;){let F=!1,Q=!1;if(C&&k){const K=d(C,k);K<0?Q=!0:K>0&&(F=!0)}else C!=null?Q=!0:F=!0;F?(p(k),k=Gr(R)):Q?(m(C),C=Gr(y)):(C=Gr(y),k=Gr(R))}}(i,s,vn,c=>{o.push(this.Jn(e,t,r,c))},c=>{o.push(this.Hn(e,t,r,c))}),A.waitFor(o)}Wn(e){let t=1;return Qr(e).X({index:Pm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,c)=>vn(o,c)).filter((o,c,u)=>!c||vn(o,u[c-1])!==0);const i=[];i.push(e);for(const o of r){const c=vn(o,e),u=vn(o,t);if(c===0)i[0]=e.En();else if(c>0&&u<0)i.push(o),i.push(o.En());else if(u>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Yn(i[o],i[o+1]))return[];const c=i[o].Rn(this.uid,Xo,$.empty()),u=i[o+1].Rn(this.uid,Xo,$.empty());s.push(IDBKeyRange.bound(c,u))}return s}Yn(e,t){return vn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(kf)}getMinOffset(e,t){return A.mapArray(this.Fn(t),r=>this.Mn(e,r).next(i=>i||Y(44426))).next(kf)}}function Df(n){return je(n,Ws)}function Hr(n){return je(n,Cs)}function gs(n){return je(n,Il)}function Qr(n){return je(n,Rs)}function kf(n){X(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;gl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new _t(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const Nf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Lg=41943040;class nt{static withCacheSize(e){return new nt(e,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */function xg(n,e,t){const r=n.store(St),i=n.store(li),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.X({range:o},(d,p,m)=>(c++,m.delete()));s.push(u.next(()=>{X(c===1,47070,{batchId:t.batchId})}));const l=[];for(const d of t.mutations){const p=Am(e,d.key.path,t.batchId);s.push(i.delete(p)),l.push(d.key)}return A.waitFor(s).next(()=>l)}function Da(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw Y(14731);e=n.noDocument}return JSON.stringify(e).length}/**
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
 */nt.DEFAULT_COLLECTION_PERCENTILE=10,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nt.DEFAULT=new nt(Lg,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nt.DISABLED=new nt(-1,0,0);class hc{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Zn={}}static yt(e,t,r,i){X(e.uid!=="",64387);const s=e.isAuthenticated()?e.uid:"";return new hc(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return En(e).X({index:dr,range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=ei(e),o=En(e);return o.add({}).next(c=>{X(typeof c=="number",49019);const u=new Cl(c,t,r,i),l=function(y,R,C){const k=C.baseMutations.map(Q=>Ys(y.gt,Q)),F=C.mutations.map(Q=>Ys(y.gt,Q));return{userId:R,batchId:C.batchId,localWriteTimeMs:C.localWriteTime.toMillis(),baseMutations:k,mutations:F}}(this.serializer,this.userId,u),d=[];let p=new ye((m,y)=>te(m.canonicalString(),y.canonicalString()));for(const m of i){const y=Am(this.userId,m.key.path,c);p=p.add(m.key.path.popLast()),d.push(o.put(l)),d.push(s.put(y,tw))}return p.forEach(m=>{d.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),A.waitFor(d).next(()=>u)})}lookupMutationBatch(e,t){return En(e).get(t).next(r=>r?(X(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),ur(this.serializer,r)):null)}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Zn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return En(e).X({index:dr,range:i},(o,c,u)=>{c.userId===this.userId&&(X(c.batchId>=r,47524,{er:r}),s=ur(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Cn;return En(e).X({index:dr,range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Cn],[this.userId,Number.POSITIVE_INFINITY]);return En(e).j(dr,t).next(r=>r.map(i=>ur(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=oa(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return ei(e).X({range:i},(o,c,u)=>{const[l,d,p]=o,m=Ot(d);if(l===this.userId&&t.path.isEqual(m))return En(e).get(p).next(y=>{if(!y)throw Y(61480,{tr:o,batchId:p});X(y.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:y.userId,batchId:p}),s.push(ur(this.serializer,y))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(te);const i=[];return t.forEach(s=>{const o=oa(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=ei(e).X({range:c},(l,d,p)=>{const[m,y,R]=l,C=Ot(y);m===this.userId&&s.path.isEqual(C)?r=r.add(R):p.done()});i.push(u)}),A.waitFor(i).next(()=>this.nr(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=oa(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new ye(te);return ei(e).X({range:o},(u,l,d)=>{const[p,m,y]=u,R=Ot(m);p===this.userId&&r.isPrefixOf(R)?R.length===i&&(c=c.add(y)):d.done()}).next(()=>this.nr(e,c))}nr(e,t){const r=[],i=[];return t.forEach(s=>{i.push(En(e).get(s).next(o=>{if(o===null)throw Y(35274,{batchId:s});X(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:s}),r.push(ur(this.serializer,o))}))}),A.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return xg(e.ce,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.rr(t.batchId)}),A.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}rr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ei(e).X({range:r},(s,o,c)=>{if(s[0]===this.userId){const u=Ot(s[1]);i.push(u)}else c.done()}).next(()=>{X(i.length===0,56720,{ir:i.map(s=>s.canonicalString())})})})}containsKey(e,t){return Mg(e,this.userId,t)}sr(e){return Fg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Cn,lastStreamToken:""})}}function Mg(n,e,t){const r=oa(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return ei(n).X({range:s,Z:!0},(c,u,l)=>{const[d,p,m]=c;d===e&&p===i&&(o=!0),l.done()}).next(()=>o)}function En(n){return je(n,St)}function ei(n){return je(n,li)}function Fg(n){return je(n,qs)}/**
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
 */class Ar{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Ar(0)}static ur(){return new Ar(-1)}}/**
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
 */class EA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.cr(e).next(t=>{const r=new Ar(t.highestTargetId);return t.highestTargetId=r.next(),this.lr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.cr(e).next(t=>Z.fromTimestamp(new me(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.cr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.cr(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.lr(e,i)))}addTargetData(e,t){return this.hr(e,t).next(()=>this.cr(e).next(r=>(r.targetCount+=1,this.Pr(t,r),this.lr(e,r))))}updateTargetData(e,t){return this.hr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Jr(e).delete(t.targetId)).next(()=>this.cr(e)).next(r=>(X(r.targetCount>0,8065),r.targetCount-=1,this.lr(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Jr(e).X((o,c)=>{const u=Ts(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Jr(e).X((r,i)=>{const s=Ts(i);t(s)})}cr(e){return Vf(e).get(wa).next(t=>(X(t!==null,2888),t))}lr(e,t){return Vf(e).put(wa,t)}hr(e,t){return Jr(e).put(Ng(this.serializer,t))}Pr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.cr(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Ir(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Jr(e).X({range:i,index:Sm},(o,c,u)=>{const l=Ts(c);ho(t,l.target)&&(s=l,u.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=bn(e);return t.forEach(o=>{const c=rt(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))}),A.waitFor(i)}removeMatchingKeys(e,t,r){const i=bn(e);return A.forEach(t,s=>{const o=rt(s.path);return A.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=bn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=bn(e);let s=se();return i.X({range:r,Z:!0},(o,c,u)=>{const l=Ot(o[1]),d=new $(l);s=s.add(d)}).next(()=>s)}containsKey(e,t){const r=rt(t.path),i=IDBKeyRange.bound([r],[pm(r)],!1,!0);let s=0;return bn(e).X({index:yl,Z:!0,range:i},([o,c],u,l)=>{o!==0&&(s++,l.done())}).next(()=>s>0)}Et(e,t){return Jr(e).get(t).next(r=>r?Ts(r):null)}}function Jr(n){return je(n,hi)}function Vf(n){return je(n,mr)}function bn(n){return je(n,di)}/**
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
 */const Of="LruGarbageCollector",Ug=1048576;function Lf([n,e],[t,r]){const i=te(n,t);return i===0?te(e,r):i}class TA{constructor(e){this.Tr=e,this.buffer=new ye(Lf),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Lf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Bg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){x(Of,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jn(t)?x(Of,"Ignoring IndexedDB error during garbage collection: ",t):await Bn(t)}await this.Rr(3e5)})}}class wA{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return A.resolve(lt.ue);const r=new TA(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Nf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Nf):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(l=Date.now(),Yr()<=Vt.LogLevel.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function jg(n,e){return new wA(n,e)}/**
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
 */class AA{constructor(e,t){this.db=e,this.garbageCollector=jg(this,t)}mr(e){const t=this.yr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}gr(e,t){return this.wr(e,(r,i)=>t(i))}addReference(e,t,r){return Zo(e,r)}removeReference(e,t,r){return Zo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Zo(e,t)}Sr(e,t){return function(i,s){let o=!1;return Fg(i).ee(c=>Mg(i,c,s).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.wr(e,(o,c)=>{if(c<=t){const u=this.Sr(e,o).next(l=>{if(!l)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,Z.min()),bn(e).delete(function(p){return[0,rt(p.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Zo(e,t)}wr(e,t){const r=bn(e);let i,s=lt.ue;return r.X({index:yl},([o,c],{path:u,sequenceNumber:l})=>{o===0?(s!==lt.ue&&t(new $(Ot(i)),s),s=l,i=u):s=lt.ue}).next(()=>{s!==lt.ue&&t(new $(Ot(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Zo(n,e){return bn(n).put(function(r,i){return{targetId:0,path:rt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
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
 */class qg{constructor(){this.changes=new an(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class bA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return ir(e).put(r)}removeEntry(e,t,r){return ir(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ra(o),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.br(e,r)))}getEntry(e,t){let r=Ae.newInvalidDocument(t);return ir(e).X({index:aa,range:IDBKeyRange.only(_s(t))},(i,s)=>{r=this.Dr(t,s)}).next(()=>r)}vr(e,t){let r={size:0,document:Ae.newInvalidDocument(t)};return ir(e).X({index:aa,range:IDBKeyRange.only(_s(t))},(i,s)=>{r={document:this.Dr(t,s),size:Da(s)}}).next(()=>r)}getEntries(e,t){let r=dt();return this.Cr(e,t,(i,s)=>{const o=this.Dr(i,s);r=r.insert(i,o)}).next(()=>r)}Fr(e,t){let r=dt(),i=new Ee($.comparator);return this.Cr(e,t,(s,o)=>{const c=this.Dr(s,o);r=r.insert(s,c),i=i.insert(s,Da(o))}).next(()=>({documents:r,Mr:i}))}Cr(e,t,r){if(t.isEmpty())return A.resolve();let i=new ye(Ff);t.forEach(u=>i=i.add(u));const s=IDBKeyRange.bound(_s(i.first()),_s(i.last())),o=i.getIterator();let c=o.getNext();return ir(e).X({index:aa,range:s},(u,l,d)=>{const p=$.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&Ff(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.G(_s(c)):d.done()}).next(()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ra(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return ir(e).j(IDBKeyRange.bound(c,u,!0)).next(l=>{s==null||s.incrementDocumentReadCount(l.length);let d=dt();for(const p of l){const m=this.Dr($.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);m.isFoundDocument()&&(po(t,m)||i.has(m.key))&&(d=d.insert(m.key,m))}return d})}getAllFromCollectionGroup(e,t,r,i){let s=dt();const o=Mf(t,r),c=Mf(t,_t.max());return ir(e).X({index:bm,range:IDBKeyRange.bound(o,c,!0)},(u,l,d)=>{const p=this.Dr($.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);s=s.insert(p.key,p),s.size===i&&d.done()}).next(()=>s)}newChangeBuffer(e){return new SA(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return xf(e).get(Ru).next(t=>(X(!!t,20021),t))}br(e,t){return xf(e).put(Ru,t)}Dr(e,t){if(t){const r=hA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(Z.min())))return r}return Ae.newInvalidDocument(e)}}function $g(n){return new bA(n)}class SA extends qg{constructor(e,t){super(),this.Or=e,this.trackRemovals=t,this.Nr=new an(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new ye((s,o)=>te(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.Nr.get(s);if(t.push(this.Or.removeEntry(e,s,c.readTime)),o.isValidDocument()){const u=If(this.Or.serializer,o);i=i.add(s.path.popLast());const l=Da(u);r+=l-c.size,t.push(this.Or.addEntry(e,s,u))}else if(r-=c.size,this.trackRemovals){const u=If(this.Or.serializer,o.convertToNoDocument(Z.min()));t.push(this.Or.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.Or.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Or.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.Or.vr(e,t).next(r=>(this.Nr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Or.Fr(e,t).next(({documents:r,Mr:i})=>(i.forEach((s,o)=>{this.Nr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function xf(n){return je(n,$s)}function ir(n){return je(n,Ta)}function _s(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Mf(n,e){const t=e.documentKey.path.toArray();return[n,Ra(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Ff(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=te(t[s],r[s]),i)return i;return i=te(t.length,r.length),i||(i=te(t[t.length-2],r[r.length-2]),i||te(t[t.length-1],r[r.length-1]))}/**
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
 *//**
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
 */class PA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Wg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Ns(r.mutation,i,ht.empty(),me.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const i=Lt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=vs();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Lt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=dt();const o=ks(),c=function(){return ks()}();return t.forEach((u,l)=>{const d=r.get(l.key);i.has(l.key)&&(d===void 0||d.mutation instanceof cn)?s=s.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Ns(d.mutation,l,d.mutation.getFieldMask(),me.now())):o.set(l.key,ht.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((l,d)=>o.set(l,d)),t.forEach((l,d)=>{var p;return c.set(l,new PA(d,(p=o.get(l))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=ks();let i=new Ee((o,c)=>o-c),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||ht.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(i.get(c.batchId)||se()).add(u);i=i.insert(c.batchId,p)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=og();d.forEach(m=>{if(!s.has(m)){const y=fg(t.get(m),r.get(m));y!==null&&p.set(m,y),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return A.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return $.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):bl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):A.resolve(Lt());let c=ai,u=s;return o.next(l=>A.forEach(l,(d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(d)?A.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{u=u.insert(d,m)}))).next(()=>this.populateOverlays(e,l,s)).next(()=>this.computeViews(e,u,l,se())).next(d=>({batchId:c,changes:sg(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let i=vs();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=vs();return this.indexManager.getCollectionParents(e,s).next(c=>A.forEach(c,u=>{const l=function(p,m){return new on(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,Ae.newInvalidDocument(d)))});let c=vs();return o.forEach((u,l)=>{const d=s.get(u);d!==void 0&&Ns(d.mutation,l,ht.empty(),me.now()),po(t,l)&&(c=c.insert(u,l))}),c})}}/**
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
 */class RA{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return A.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:xe(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:uc(i.bundledQuery),readTime:xe(i.readTime)}}(t)),A.resolve()}}/**
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
 */class CA{constructor(){this.overlays=new Ee($.comparator),this.kr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Lt();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),A.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){const i=Lt(),s=t.length+1,o=new $(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ee((l,d)=>l-d);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=s.get(l.largestBatchId);d===null&&(d=Lt(),s=s.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=Lt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,d)=>c.set(l,d)),!(c.size()>=i)););return A.resolve(c)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new kl(t,r));let s=this.kr.get(t);s===void 0&&(s=se(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class DA{constructor(){this.sessionToken=Ne.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
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
 */class xl{constructor(){this.qr=new ye(We.Qr),this.$r=new ye(We.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new We(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new We(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new $(new ce([])),r=new We(t,e),i=new We(t,e+1),s=[];return this.$r.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new $(new ce([])),r=new We(t,e),i=new We(t,e+1);let s=se();return this.$r.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new We(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class We{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return $.comparator(e.key,t.key)||te(e.Hr,t.Hr)}static Ur(e,t){return te(e.Hr,t.Hr)||$.comparator(e.key,t.key)}}/**
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
 */class kA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new ye(We.Qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Cl(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Yr=this.Yr.add(new We(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Cn:this.er-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new We(t,0),i=new We(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],o=>{const c=this.Zr(o.Hr);s.push(c)}),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(te);return t.forEach(i=>{const s=new We(i,0),o=new We(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,o],c=>{r=r.add(c.Hr)})}),A.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;$.isDocumentKey(s)||(s=s.child(""));const o=new We(new $(s),0);let c=new ye(te);return this.Yr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(c=c.add(u.Hr)),!0)},o),A.resolve(this.ei(c))}ei(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){X(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return A.forEach(t.mutations,i=>{const s=new We(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new We(t,0),i=this.Yr.firstAfterOrEqual(r);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class NA{constructor(e){this.ni=e,this.docs=function(){return new Ee($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():Ae.newInvalidDocument(t))}getEntries(e,t){let r=dt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ae.newInvalidDocument(i))}),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=dt();const o=t.path,c=new $(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||gl(Im(d),r)<=0||(i.has(d.key)||po(t,d))&&(s=s.insert(d.key,d.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,r,i){Y(9500)}ri(e,t){return A.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new VA(this)}getSize(e){return A.resolve(this.size)}}class VA extends qg{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),A.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class OA{constructor(e){this.persistence=e,this.ii=new an(t=>Ir(t),ho),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.si=0,this.oi=new xl,this.targetCount=0,this._i=Ar.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),A.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Ar(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.hr(t),A.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ii.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),A.waitFor(s).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.oi.containsKey(t))}}/**
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
 */class Ml{constructor(e,t){this.ai={},this.overlays={},this.ui=new lt(0),this.ci=!1,this.ci=!0,this.li=new DA,this.referenceDelegate=e(this),this.hi=new OA(this),this.indexManager=new IA,this.remoteDocumentCache=function(i){return new NA(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new kg(t),this.Ti=new RA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new CA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new kA(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const i=new LA(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return A.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class LA extends Em{constructor(e){super(),this.currentSequenceNumber=e}}class dc{constructor(e){this.persistence=e,this.Ai=new xl,this.Ri=null}static Vi(e){return new dc(e)}get mi(){if(this.Ri)return this.Ri;throw Y(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.mi,r=>{const i=$.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,Z.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return A.or([()=>A.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class ka{constructor(e,t){this.persistence=e,this.gi=new an(r=>rt(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=jg(this,t)}static Vi(e,t){return new ka(e,t)}Ii(){}di(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return A.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?A.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Z.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),A.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ua(e.data.value)),t}Sr(e,t,r){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return A.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class xA{constructor(e){this.serializer=e}q(e,t,r,i){const s=new Xa("createOrUpgrade",t);r<1&&i>=1&&(function(u){u.createObjectStore(lo)}(e),function(u){u.createObjectStore(qs,{keyPath:ew}),u.createObjectStore(St,{keyPath:Hd,autoIncrement:!0}).createIndex(dr,Qd,{unique:!0}),u.createObjectStore(li)}(e),Uf(e),function(u){u.createObjectStore(ar)}(e));let o=A.resolve();return r<3&&i>=3&&(r!==0&&(function(u){u.deleteObjectStore(di),u.deleteObjectStore(hi),u.deleteObjectStore(mr)}(e),Uf(e)),o=o.next(()=>function(u){const l=u.store(mr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Z.min().toTimestamp(),targetCount:0};return l.put(wa,d)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(u,l){return l.store(St).j().next(p=>{u.deleteObjectStore(St),u.createObjectStore(St,{keyPath:Hd,autoIncrement:!0}).createIndex(dr,Qd,{unique:!0});const m=l.store(St),y=p.map(R=>m.put(R));return A.waitFor(y)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore(fi,{keyPath:uw})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.pi(s))),r<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore($s)}(e),this.yi(s)))),r<7&&i>=7&&(o=o.next(()=>this.wi(s))),r<8&&i>=8&&(o=o.next(()=>this.Si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.bi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Za,{keyPath:lw})})(e),function(u){u.createObjectStore(ec,{keyPath:hw})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(u){const l=u.createObjectStore(tc,{keyPath:yw});l.createIndex(Du,Iw,{unique:!1}),l.createIndex(Cm,vw,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(u){const l=u.createObjectStore(Ta,{keyPath:nw});l.createIndex(aa,rw),l.createIndex(bm,iw)}(e)).next(()=>this.Di(e,s)).next(()=>e.deleteObjectStore(ar))),r<14&&i>=14&&(o=o.next(()=>this.Ci(e,s))),r<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore(Il,{keyPath:dw,autoIncrement:!0}).createIndex(Cu,fw,{unique:!1}),u.createObjectStore(Rs,{keyPath:pw}).createIndex(Pm,mw,{unique:!1}),u.createObjectStore(Cs,{keyPath:gw}).createIndex(Rm,_w,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore(Rs).clear()}).next(()=>{t.objectStore(Cs).clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(vl,{keyPath:Ew})})(e)})),r<18&&i>=18&&oe.isSafariOrWebkit()&&(o=o.next(()=>{t.objectStore(Rs).clear()}).next(()=>{t.objectStore(Cs).clear()})),o}yi(e){let t=0;return e.store(ar).X((r,i)=>{t+=Da(i)}).next(()=>{const r={byteSize:t};return e.store($s).put(Ru,r)})}pi(e){const t=e.store(qs),r=e.store(St);return t.j().next(i=>A.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,Cn],[s.userId,s.lastAcknowledgedBatchId]);return r.j(dr,o).next(c=>A.forEach(c,u=>{X(u.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=ur(this.serializer,u);return xg(e,s.userId,l).next(()=>{})}))}))}wi(e){const t=e.store(di),r=e.store(ar);return e.store(mr).get(wa).next(i=>{const s=[];return r.X((o,c)=>{const u=new ce(o),l=function(p){return[0,rt(p)]}(u);s.push(t.get(l).next(d=>d?A.resolve():(p=>t.put({targetId:0,path:rt(p),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(s))})}Si(e,t){e.createObjectStore(Ws,{keyPath:cw});const r=t.store(Ws),i=new Ll,s=o=>{if(i.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:rt(u)})}};return t.store(ar).X({Z:!0},(o,c)=>{const u=new ce(o);return s(u.popLast())}).next(()=>t.store(li).X({Z:!0},([o,c,u],l)=>{const d=Ot(c);return s(d.popLast())}))}bi(e){const t=e.store(hi);return t.X((r,i)=>{const s=Ts(i),o=Ng(this.serializer,s);return t.put(o)})}Di(e,t){const r=t.store(ar),i=[];return r.X((s,o)=>{const c=t.store(Ta),u=function(p){return p.document?new $(ce.fromString(p.document.name).popFirst(5)):p.noDocument?$.fromSegments(p.noDocument.path):p.unknownDocument?$.fromSegments(p.unknownDocument.path):Y(36783)}(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(l))}).next(()=>A.waitFor(i))}Ci(e,t){const r=t.store(St),i=$g(this.serializer),s=new Ml(dc.Vi,this.serializer.gt);return r.j().next(o=>{const c=new Map;return o.forEach(u=>{var l;let d=(l=c.get(u.userId))!==null&&l!==void 0?l:se();ur(this.serializer,u).keys().forEach(p=>d=d.add(p)),c.set(u.userId,d)}),A.forEach(c,(u,l)=>{const d=new ze(l),p=lc.yt(this.serializer,d),m=s.getIndexManager(d),y=hc.yt(d,this.serializer,m,s.referenceDelegate);return new Wg(i,y,p,m).recalculateAndSaveOverlaysForDocumentKeys(new ku(t,lt.ue),u).next()})})}}function Uf(n){n.createObjectStore(di,{keyPath:ow}).createIndex(yl,aw,{unique:!0}),n.createObjectStore(hi,{keyPath:"targetId"}).createIndex(Sm,sw,{unique:!0}),n.createObjectStore(mr)}const Tn="IndexedDbPersistence",ru=18e5,iu=5e3,su="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",zg="main";class Fl{constructor(e,t,r,i,s,o,c,u,l,d,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Fi=s,this.window=o,this.document=c,this.Mi=l,this.xi=d,this.Oi=p,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=m=>Promise.resolve(),!Fl.C())throw new V(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new AA(this,i),this.Qi=t+zg,this.serializer=new kg(u),this.$i=new Ut(this.Qi,this.Oi,new xA(this.serializer)),this.li=new fA,this.hi=new EA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=$g(this.serializer),this.Ti=new dA,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&Le(Tn,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,su);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.hi.getHighestSequenceNumber(e))}).then(e=>{this.ui=new lt(e,this.Mi)}).then(()=>{this.ci=!0}).catch(e=>(this.$i&&this.$i.close(),Promise.reject(e)))}ji(e){return this.qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.$i.setDatabaseDeletedListener(e)}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ea(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(e).next(t=>{t||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Yi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(jn(e))return x(Tn,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x(Tn,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Fi.enqueueRetryable(()=>this.qi(e)),this.isPrimary=e})}Ji(e){return ys(e).get(zr).next(t=>A.resolve(this.Xi(t)))}es(e){return ea(e).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,ru)){this.ki=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=je(t,fi);return r.j().next(i=>{const s=this.rs(i,ru),o=i.filter(c=>s.indexOf(c)===-1);return A.forEach(o,c=>r.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.ss(t.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.xi?A.resolve(!0):ys(e).get(zr).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,iu)&&!this._s(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,su);return!1}}return!(!this.networkEnabled||!this.inForeground)||ea(e).j().next(r=>this.rs(r,iu).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&x(Tn,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[lo,fi],e=>{const t=new ku(e,lt.ue);return this.Yi(t).next(()=>this.es(t))}),this.$i.close(),this.hs()}rs(e,t){return e.filter(r=>this.ns(r.updateTimeMs,t)&&!this._s(r.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",e=>ea(e).j().next(t=>this.rs(t,ru).map(r=>r.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(e,t){return hc.yt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new vA(e,this.serializer.gt.databaseId)}getDocumentOverlayCache(e){return lc.yt(this.serializer,e)}getBundleCache(){return this.Ti}runTransaction(e,t,r){x(Tn,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===18?Aw:u===17?Vm:u===16?ww:u===15?El:u===14?Nm:u===13?km:u===12?Tw:u===11?Dm:void Y(60245)}(this.Oi);let o;return this.$i.runTransaction(e,i,s,c=>(o=new ku(c,this.ui?this.ui.next():lt.ue),t==="readwrite-primary"?this.Ji(o).next(u=>!!u||this.Hi(o)).next(u=>{if(!u)throw Le(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new V(P.FAILED_PRECONDITION,vm);return r(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ts(o).next(()=>r(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ts(e){return ys(e).get(zr).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,iu)&&!this._s(t.ownerId)&&!this.Xi(t)&&!(this.xi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new V(P.FAILED_PRECONDITION,su)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ys(e).put(zr,t)}static C(){return Ut.C()}Yi(e){const t=ys(e);return t.get(zr).next(r=>this.Xi(r)?(x(Tn,"Releasing primary lease."),t.delete(zr)):A.resolve())}ns(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Le(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ni=()=>{this.us();const t=/(?:Version|Mobile)\/1[456]/;oe.isSafari()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(e){var t;try{const r=((t=this.Ui)===null||t===void 0?void 0:t.getItem(this.ss(e)))!==null;return x(Tn,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Le(Tn,"Failed to get zombied client id.",r),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(e){Le("Failed to set zombie client id.",e)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ys(n){return je(n,lo)}function ea(n){return je(n,fi)}function Ul(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Bl{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=se(),i=se();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Bl(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class MA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Gg{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return oe.isSafari()?8:Tm(oe.getUA())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ps(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new MA;return this.ws(e,t,o).next(c=>{if(s.result=c,this.Rs)return this.Ss(e,t,o,c.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Yr()<=Vt.LogLevel.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Xr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Yr()<=Vt.LogLevel.DEBUG&&x("QueryEngine","Query:",Xr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Yr()<=Vt.LogLevel.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Xr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,it(t))):A.resolve())}ps(e,t){if(uf(t))return A.resolve(null);let r=it(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Sa(t,null,"F"),r=it(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.gs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const l=this.bs(t,c);return this.Ds(t,l,o,u.readTime)?this.ps(e,Sa(t,null,"F")):this.vs(e,l,t,u)}))})))}ys(e,t,r,i){return uf(t)||i.isEqual(Z.min())?A.resolve(null):this.gs.getDocuments(e,r).next(s=>{const o=this.bs(t,s);return this.Ds(t,o,r,i)?A.resolve(null):(Yr()<=Vt.LogLevel.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Xr(t)),this.vs(e,o,t,ym(i,ai)).next(c=>c))})}bs(e,t){let r=new ye(rg(e));return t.forEach((i,s)=>{po(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Yr()<=Vt.LogLevel.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Xr(t)),this.gs.getDocumentsMatchingQuery(e,t,_t.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */const jl="LocalStore",FA=3e8;class UA{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new Ee(te),this.Ms=new an(s=>Ir(s),ho),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Wg(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Kg(n,e,t,r){return new UA(n,e,t,r)}async function Hg(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let u=se();for(const l of i){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of s){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Bs:l,removedBatchIds:o,addedBatchIds:c}))})})}function BA(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,u,l,d){const p=l.batch,m=p.keys();let y=A.resolve();return m.forEach(R=>{y=y.next(()=>d.getEntry(u,R)).next(C=>{const k=l.docVersions.get(R);X(k!==null,48541),C.version.compareTo(k)<0&&(p.applyToRemoteDocument(C,l),C.isValidDocument()&&(C.setReadTime(l.commitVersion),d.addEntry(C)))})}),y.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=se();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Qg(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function jA(n,e){const t=W(n),r=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const c=[];e.targetChanges.forEach((d,p)=>{const m=i.get(p);if(!m)return;c.push(t.hi.removeMatchingKeys(s,d.removedDocuments,p).next(()=>t.hi.addMatchingKeys(s,d.addedDocuments,p)));let y=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?y=y.withResumeToken(Ne.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):d.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(d.resumeToken,r)),i=i.insert(p,y),function(C,k,F){return C.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=FA?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0}(m,y,d)&&c.push(t.hi.updateTargetData(s,y))});let u=dt(),l=se();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,d))}),c.push(Jg(s,o,e.documentUpdates).next(d=>{u=d.Ls,l=d.ks})),!r.isEqual(Z.min())){const d=t.hi.getLastRemoteSnapshotVersion(s).next(p=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(d)}return A.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,l)).next(()=>u)}).then(s=>(t.Fs=i,s))}function Jg(n,e,t){let r=se(),i=se();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=dt();return t.forEach((c,u)=>{const l=s.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):x(jl,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function qA(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Cn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function vi(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,A.resolve(i)):t.hi.allocateTargetId(r).next(o=>(i=new Xt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Ei(n,e,t){const r=W(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!jn(o))throw o;x(jl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function Na(n,e,t){const r=W(n);let i=Z.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,d){const p=W(u),m=p.Ms.get(d);return m!==void 0?A.resolve(p.Fs.get(m)):p.hi.getTargetData(l,d)}(r,o,it(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:Z.min(),t?s:se())).next(c=>(Zg(r,ng(e),c),{documents:c,qs:s})))}function Yg(n,e){const t=W(n),r=W(t.hi),i=t.Fs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.Et(s,e).next(o=>o?o.target:null))}function Xg(n,e){const t=W(n),r=t.xs.get(e)||Z.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.Os.getAllFromCollectionGroup(i,e,ym(r,ai),Number.MAX_SAFE_INTEGER)).then(i=>(Zg(t,e,i),i))}function Zg(n,e,t){let r=n.xs.get(e)||Z.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}async function $A(n,e,t,r){const i=W(n);let s=se(),o=dt();for(const l of t){const d=e.Qs(l.metadata.name);l.document&&(s=s.add(d));const p=e.$s(l);p.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,p)}const c=i.Os.newChangeBuffer({trackRemovals:!0}),u=await vi(i,function(d){return it(ki(ce.fromString(`__bundle__/docs/${d}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",l=>Jg(l,c,o).next(d=>(c.apply(l),d)).next(d=>i.hi.removeMatchingKeysForTargetId(l,u.targetId).next(()=>i.hi.addMatchingKeys(l,s,u.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(l,d.Ls,d.ks)).next(()=>d.Ls)))}async function WA(n,e,t=se()){const r=await vi(n,it(uc(e.bundledQuery))),i=W(n);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=xe(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Ti.saveNamedQuery(s,e);const c=r.withResumeToken(Ne.EMPTY_BYTE_STRING,o);return i.Fs=i.Fs.insert(c.targetId,c),i.hi.updateTargetData(s,c).next(()=>i.hi.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.hi.addMatchingKeys(s,t,r.targetId)).next(()=>i.Ti.saveNamedQuery(s,e))})}/**
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
 */const e_="firestore_clients";function Bf(n,e){return`${e_}_${n}_${e}`}const t_="firestore_mutations";function jf(n,e,t){let r=`${t_}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const n_="firestore_targets";function ou(n,e){return`${n_}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const Nt="SharedClientState";class Va{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Ks(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new V(i.error.code,i.error.message))),o?new Va(e,t,i.state,s):(Le(Nt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Vs{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Ks(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new V(r.error.code,r.error.message))),s?new Vs(e,r.state,i):(Le(Nt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Oa{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ks(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Sl();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=wm(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Oa(e,s):(Le(Nt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class ql{constructor(e,t){this.clientId=e,this.onlineState=t}static Ks(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new ql(t.clientId,t.onlineState):(Le(Nt,`Failed to parse online state: ${e}`),null)}}class zu{constructor(){this.activeTargetIds=Sl()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class au{constructor(e,t,r,i,s){this.window=e,this.Fi=t,this.persistenceKey=r,this.js=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Js=this.Hs.bind(this),this.Ys=new Ee(te),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=Bf(this.persistenceKey,this.js),this.eo=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ys=this.Ys.insert(this.js,new zu),this.no=new RegExp(`^${e_}_${o}_([^_]*)$`),this.ro=new RegExp(`^${t_}_${o}_(\\d+)(?:_(.*))?$`),this.io=new RegExp(`^${n_}_${o}_(\\d+)$`),this.so=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.oo=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Js)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ps();for(const r of e){if(r===this.js)continue;const i=this.getItem(Bf(this.persistenceKey,r));if(i){const s=Oa.Ks(r,i);s&&(this.Ys=this.Ys.insert(s.clientId,s))}}this._o();const t=this.storage.getItem(this.so);if(t){const r=this.ao(t);r&&this.uo(r)}for(const r of this.Zs)this.Hs(r);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.eo,JSON.stringify(e))}getAllActiveQueryTargets(){return this.co(this.Ys)}isActiveQueryTarget(e){let t=!1;return this.Ys.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.lo(e,"pending")}updateMutationState(e,t,r){this.lo(e,t,r),this.ho(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(ou(this.persistenceKey,e));if(i){const s=Vs.Ks(e,i);s&&(r=s.state)}}return t&&this.Po.Gs(e),this._o(),r}removeLocalQueryTarget(e){this.Po.zs(e),this._o()}isLocalQueryTarget(e){return this.Po.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(ou(this.persistenceKey,e))}updateQueryState(e,t,r){this.To(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.ho(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Io(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return x(Nt,"READ",e,t),t}setItem(e,t){x(Nt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){x(Nt,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(x(Nt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Le("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Fi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.no.test(t.key)){if(t.newValue==null){const r=this.Ao(t.key);return this.Ro(r,null)}{const r=this.Vo(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.mo(t.key,t.newValue);if(r)return this.fo(r)}}else if(this.io.test(t.key)){if(t.newValue!==null){const r=this.po(t.key,t.newValue);if(r)return this.yo(r)}}else if(t.key===this.so){if(t.newValue!==null){const r=this.ao(t.newValue);if(r)return this.uo(r)}}else if(t.key===this.eo){const r=function(s){let o=lt.ue;if(s!=null)try{const c=JSON.parse(s);X(typeof c=="number",30636,{wo:s}),o=c}catch(c){Le(Nt,"Failed to read sequence number from WebStorage",c)}return o}(t.newValue);r!==lt.ue&&this.sequenceNumberHandler(r)}else if(t.key===this.oo){const r=this.So(t.newValue);await Promise.all(r.map(i=>this.syncEngine.bo(i)))}}}else this.Zs.push(t)})}}get Po(){return this.Ys.get(this.js)}_o(){this.setItem(this.Xs,this.Po.Ws())}lo(e,t,r){const i=new Va(this.currentUser,e,t,r),s=jf(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Ws())}ho(e){const t=jf(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Io(e){const t={clientId:this.js,onlineState:e};this.storage.setItem(this.so,JSON.stringify(t))}To(e,t,r){const i=ou(this.persistenceKey,e),s=new Vs(e,t,r);this.setItem(i,s.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.oo,t)}Ao(e){const t=this.no.exec(e);return t?t[1]:null}Vo(e,t){const r=this.Ao(e);return Oa.Ks(r,t)}mo(e,t){const r=this.ro.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return Va.Ks(new ze(s),i,t)}po(e,t){const r=this.io.exec(e),i=Number(r[1]);return Vs.Ks(i,t)}ao(e){return ql.Ks(e)}So(e){return JSON.parse(e)}async fo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Do(e.batchId,e.state,e.error);x(Nt,`Ignoring mutation for non-active user ${e.user.uid}`)}yo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Ys.insert(e,t):this.Ys.remove(e),i=this.co(this.Ys),s=this.co(r),o=[],c=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||c.push(u)}),this.syncEngine.Co(o,c).then(()=>{this.Ys=r})}uo(e){this.Ys.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}co(e){let t=Sl();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class r_{constructor(){this.Fo=new zu,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new zu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class zA{xo(e){}shutdown(){}}/**
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
 */const qf="ConnectivityMonitor";class $f{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){x(qf,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){x(qf,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */let ta=null;function Gu(){return ta===null?ta=function(){return 268435456+Math.round(2147483648*Math.random())}():ta++,"0x"+ta.toString(16)}/**
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
 */const cu="RestConnection",GA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class KA{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Gs?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=Gu(),c=this.Go(e,t.toUriEncodedString());x(cu,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);const{host:l}=new URL(c),d=oe.isCloudWorkstation(l);return this.jo(e,c,u,r,d).then(p=>(x(cu,`Received RPC '${e}' ${o}: `,p),p),p=>{throw ot(cu,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p})}Jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Di}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){const r=GA[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class HA{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const tt="WebChannelConnection";class QA extends KA{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){const o=Gu();return new Promise((c,u)=>{const l=new ct.XhrIo;l.setWithCredentials(!0),l.listenOnce(ct.EventType.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ct.ErrorCode.NO_ERROR:const p=l.getResponseJson();x(tt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case ct.ErrorCode.TIMEOUT:x(tt,`RPC '${e}' ${o} timed out`),u(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case ct.ErrorCode.HTTP_ERROR:const m=l.getStatus();if(x(tt,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let y=l.getResponseJson();Array.isArray(y)&&(y=y[0]);const R=y==null?void 0:y.error;if(R&&R.status&&R.message){const C=function(F){const Q=F.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(Q)>=0?Q:P.UNKNOWN}(R.status);u(new V(C,R.message))}else u(new V(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new V(P.UNAVAILABLE,"Connection failed."));break;default:Y(9055,{c_:e,streamId:o,l_:l.getLastErrorCode(),h_:l.getLastError()})}}finally{x(tt,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);x(tt,`RPC '${e}' ${o} sending request:`,i),l.send(t,"POST",d,r,15)})}P_(e,t,r){const i=Gu(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=ct.createWebChannelTransport(),c=ct.getStatEventTarget(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const d=s.join("");x(tt,`Creating RPC '${e}' stream ${i}: ${d}`,u);const p=o.createWebChannel(d,u);this.T_(p);let m=!1,y=!1;const R=new HA({Ho:k=>{y?x(tt,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(m||(x(tt,`Opening RPC '${e}' stream ${i} transport.`),p.open(),m=!0),x(tt,`RPC '${e}' stream ${i} sending:`,k),p.send(k))},Yo:()=>p.close()}),C=(k,F,Q)=>{k.listen(F,K=>{try{Q(K)}catch(ne){setTimeout(()=>{throw ne},0)}})};return C(p,ct.WebChannel.EventType.OPEN,()=>{y||(x(tt,`RPC '${e}' stream ${i} transport opened.`),R.s_())}),C(p,ct.WebChannel.EventType.CLOSE,()=>{y||(y=!0,x(tt,`RPC '${e}' stream ${i} transport closed`),R.__(),this.I_(p))}),C(p,ct.WebChannel.EventType.ERROR,k=>{y||(y=!0,ot(tt,`RPC '${e}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),R.__(new V(P.UNAVAILABLE,"The operation could not be completed")))}),C(p,ct.WebChannel.EventType.MESSAGE,k=>{var F;if(!y){const Q=k.data[0];X(!!Q,16349);const K=Q,ne=(K==null?void 0:K.error)||((F=K[0])===null||F===void 0?void 0:F.error);if(ne){x(tt,`RPC '${e}' stream ${i} received error:`,ne);const he=ne.status;let re=function(v){const T=Me[v];if(T!==void 0)return _g(T)}(he),E=ne.message;re===void 0&&(re=P.INTERNAL,E="Unknown error status: "+he+" with message "+ne.message),y=!0,R.__(new V(re,E)),p.close()}else x(tt,`RPC '${e}' stream ${i} received:`,Q),R.a_(Q)}}),C(c,ct.Event.STAT_EVENT,k=>{k.stat===ct.Stat.PROXY?x(tt,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===ct.Stat.NOPROXY&&x(tt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{R.o_()},0),R}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}/**
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
 *//**
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
 */function i_(){return typeof window<"u"?window:null}function pa(){return typeof document<"u"?document:null}/**
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
 */function Cr(n){return new tA(n,!0)}/**
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
 */class $l{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const Wf="PersistentStream";class s_{constructor(e,t,r,i,s,o,c,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new $l(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Le(t.toString()),Le("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{const i=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return x(Wf,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(x(Wf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class JA extends s_{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=iA(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Z.min():o.readTime?xe(o.readTime):Z.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Bu(this.serializer),t.addTarget=function(s,o){let c;const u=o.target;if(c=Aa(u)?{documents:bg(s,u)}:{query:cc(s,u).Vt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=vg(s,o.resumeToken);const l=Fu(s,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(Z.min())>0){c.readTime=Ii(s,o.snapshotVersion.toTimestamp());const l=Fu(s,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);const r=oA(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Bu(this.serializer),t.removeTarget=e,this.k_(t)}}class YA extends s_{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=sA(e.writeResults,e.commitTime),r=xe(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Bu(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Ys(this.serializer,r))};this.k_(t)}}/**
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
 */class XA{}class ZA extends XA{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,Uu(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(P.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Jo(e,Uu(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class eb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Le(t),this._a=!1):x("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const br="RemoteStore";class tb{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(o=>{r.enqueueAndForget(async()=>{$n(this)&&(x(br,"Restarting streams for network reachability change."),await async function(u){const l=W(u);l.Ia.add(4),await Oi(l),l.Aa.set("Unknown"),l.Ia.delete(4),await yo(l)}(this))})}),this.Aa=new eb(r,i)}}async function yo(n){if($n(n))for(const e of n.da)await e(!0)}async function Oi(n){for(const e of n.da)await e(!1)}function fc(n,e){const t=W(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Gl(t)?zl(t):xi(t).x_()&&Wl(t,e))}function Ti(n,e){const t=W(n),r=xi(t);t.Ta.delete(e),r.x_()&&o_(t,e),t.Ta.size===0&&(r.x_()?r.B_():$n(t)&&t.Aa.set("Unknown"))}function Wl(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}xi(n).H_(e)}function o_(n,e){n.Ra.$e(e),xi(n).Y_(e)}function zl(n){n.Ra=new Yw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),xi(n).start(),n.Aa.aa()}function Gl(n){return $n(n)&&!xi(n).M_()&&n.Ta.size>0}function $n(n){return W(n).Ia.size===0}function a_(n){n.Ra=void 0}async function nb(n){n.Aa.set("Online")}async function rb(n){n.Ta.forEach((e,t)=>{Wl(n,e)})}async function ib(n,e){a_(n),Gl(n)?(n.Aa.la(e),zl(n)):n.Aa.set("Unknown")}async function sb(n,e,t){if(n.Aa.set("Online"),e instanceof Ig&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,e)}catch(r){x(br,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await La(n,r)}else if(e instanceof da?n.Ra.Ye(e):e instanceof yg?n.Ra.it(e):n.Ra.et(e),!t.isEqual(Z.min()))try{const r=await Qg(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.Ra.Pt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const d=s.Ta.get(l);d&&s.Ta.set(l,d.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{const d=s.Ta.get(u);if(!d)return;s.Ta.set(u,d.withResumeToken(Ne.EMPTY_BYTE_STRING,d.snapshotVersion)),o_(s,u);const p=new Xt(d.target,u,l,d.sequenceNumber);Wl(s,p)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){x(br,"Failed to raise snapshot:",r),await La(n,r)}}async function La(n,e,t){if(!jn(e))throw e;n.Ia.add(1),await Oi(n),n.Aa.set("Offline"),t||(t=()=>Qg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x(br,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await yo(n)})}function c_(n,e){return e().catch(t=>La(n,t,e))}async function Li(n){const e=W(n),t=Mn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Cn;for(;ob(e);)try{const i=await qA(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,ab(e,i)}catch(i){await La(e,i)}u_(e)&&l_(e)}function ob(n){return $n(n)&&n.Pa.length<10}function ab(n,e){n.Pa.push(e);const t=Mn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function u_(n){return $n(n)&&!Mn(n).M_()&&n.Pa.length>0}function l_(n){Mn(n).start()}async function cb(n){Mn(n).na()}async function ub(n){const e=Mn(n);for(const t of n.Pa)e.X_(t.mutations)}async function lb(n,e,t){const r=n.Pa.shift(),i=Dl.from(r,e,t);await c_(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Li(n)}async function hb(n,e){e&&Mn(n).Z_&&await async function(r,i){if(function(o){return gg(o)&&o!==P.ABORTED}(i.code)){const s=r.Pa.shift();Mn(r).N_(),await c_(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Li(r)}}(n,e),u_(n)&&l_(n)}async function zf(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),x(br,"RemoteStore received new credentials");const r=$n(t);t.Ia.add(3),await Oi(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await yo(t)}async function Ku(n,e){const t=W(n);e?(t.Ia.delete(2),await yo(t)):e||(t.Ia.add(2),await Oi(t),t.Aa.set("Unknown"))}function xi(n){return n.Va||(n.Va=function(t,r,i){const s=W(t);return s.ia(),new JA(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:nb.bind(null,n),e_:rb.bind(null,n),n_:ib.bind(null,n),J_:sb.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Gl(n)?zl(n):n.Aa.set("Unknown")):(await n.Va.stop(),a_(n))})),n.Va}function Mn(n){return n.ma||(n.ma=function(t,r,i){const s=W(t);return s.ia(),new YA(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:cb.bind(null,n),n_:hb.bind(null,n),ea:ub.bind(null,n),ta:lb.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Li(n)):(await n.ma.stop(),n.Pa.length>0&&(x(br,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class Kl{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Ge,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new Kl(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mi(n,e){if(Le("AsyncQueue",`${e}: ${n}`),jn(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class gr{static emptySet(e){return new gr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=vs(),this.sortedSet=new Ee(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof gr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new gr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Gf{constructor(){this.fa=new Ee($.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):Y(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Sr{constructor(e,t,r,i,s,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Sr(e,t,gr.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class db{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class fb{constructor(){this.queries=Kf(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=W(t),s=i.queries;i.queries=Kf(),s.forEach((o,c)=>{for(const u of c.wa)u.onError(r)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function Kf(){return new an(n=>tg(n),fo)}async function Hl(n,e){const t=W(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new db,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Mi(o,`Initialization of query '${Xr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Jl(t)}async function Ql(n,e){const t=W(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.wa.indexOf(e);o>=0&&(s.wa.splice(o,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function pb(n,e){const t=W(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.wa)c.Ca(i)&&(r=!0);o.ya=i}}r&&Jl(t)}function mb(n,e,t){const r=W(n),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(t);r.queries.delete(e)}function Jl(n){n.Da.forEach(e=>{e.next()})}var Hu,Hf;(Hf=Hu||(Hu={})).Fa="default",Hf.Cache="cache";class Yl{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Sr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Sr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Hu.Cache}}/**
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
 */class h_{constructor(e,t){this.qa=e,this.byteLength=t}Qa(){return"metadata"in this.qa}}/**
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
 */class Qf{constructor(e){this.serializer=e}Qs(e){return Bt(this.serializer,e)}$s(e){return e.metadata.exists?ac(this.serializer,e.document,!1):Ae.newNoDocument(this.Qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return xe(e)}}class Xl{constructor(e,t){this.$a=e,this.serializer=t,this.Ua=[],this.Ka=[],this.collectionGroups=new Set,this.progress=d_(e)}get queries(){return this.Ua}get documents(){return this.Ka}Wa(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.qa.namedQuery)this.Ua.push(e.qa.namedQuery);else if(e.qa.documentMetadata){this.Ka.push({metadata:e.qa.documentMetadata}),e.qa.documentMetadata.exists||++t;const r=ce.fromString(e.qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.qa.document&&(this.Ka[this.Ka.length-1].document=e.qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}Ga(e){const t=new Map,r=new Qf(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Qs(i.metadata.name);for(const o of i.metadata.queries){const c=(t.get(o)||se()).add(s);t.set(o,c)}}return t}async za(e){const t=await $A(e,new Qf(this.serializer),this.Ka,this.$a.id),r=this.Ga(this.documents);for(const i of this.Ua)await WA(e,i,r.get(i.name));return this.progress.taskState="Success",{progress:this.progress,ja:this.collectionGroups,Ja:t}}}function d_(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
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
 */class f_{constructor(e){this.key=e}}class p_{constructor(e){this.key=e}}class m_{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=se(),this.mutatedKeys=se(),this.Xa=rg(e),this.eu=new gr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Gf,i=t?t.eu:this.eu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,p)=>{const m=i.get(d),y=po(this.query,p)?p:null,R=!!m&&this.mutatedKeys.has(m.key),C=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let k=!1;m&&y?m.data.isEqual(y.data)?R!==C&&(r.track({type:3,doc:y}),k=!0):this.iu(m,y)||(r.track({type:2,doc:y}),k=!0,(u&&this.Xa(y,u)>0||l&&this.Xa(y,l)<0)&&(c=!0)):!m&&y?(r.track({type:0,doc:y}),k=!0):m&&!y&&(r.track({type:1,doc:m}),k=!0,(u||l)&&(c=!0)),k&&(y?(o=o.add(y),s=C?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{eu:o,ru:r,Ds:c,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((d,p)=>function(y,R){const C=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y(20277,{At:k})}};return C(y)-C(R)}(d.type,p.type)||this.Xa(d.doc,p.doc)),this.su(r),i=i!=null&&i;const c=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,l=u!==this.Ya;return this.Ya=u,o.length!==0||l?{snapshot:new Sr(this.query,e.eu,s,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Gf,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=se(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new p_(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new f_(r))}),t}uu(e){this.Ha=e.qs,this.Za=se();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Sr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Wn="SyncEngine";class gb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class _b{constructor(e){this.key=e,this.lu=!1}}class yb{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new an(c=>tg(c),fo),this.Tu=new Map,this.Iu=new Set,this.du=new Ee($.comparator),this.Eu=new Map,this.Au=new xl,this.Ru={},this.Vu=new Map,this.mu=Ar.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function Ib(n,e,t=!0){const r=pc(n);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await g_(r,e,t,!0),i}async function vb(n,e){const t=pc(n);await g_(t,e,!0,!1)}async function g_(n,e,t,r){const i=await vi(n.localStore,it(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await Zl(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&fc(n.remoteStore,i),c}async function Zl(n,e,t,r,i){n.gu=(p,m,y)=>async function(C,k,F,Q){let K=k.view.nu(F);K.Ds&&(K=await Na(C.localStore,k.query,!1).then(({documents:E})=>k.view.nu(E,K)));const ne=Q&&Q.targetChanges.get(k.targetId),he=Q&&Q.targetMismatches.get(k.targetId)!=null,re=k.view.applyChanges(K,C.isPrimaryClient,ne,he);return Qu(C,k.targetId,re._u),re.snapshot}(n,p,m,y);const s=await Na(n.localStore,e,!0),o=new m_(e,s.qs),c=o.nu(s.documents),u=_o.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(c,n.isPrimaryClient,u);Qu(n,t,l._u);const d=new gb(e,t,o);return n.Pu.set(e,d),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),l.snapshot}async function Eb(n,e,t){const r=W(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(o=>!fo(o,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ei(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Ti(r.remoteStore,i.targetId),wi(r,i.targetId)}).catch(Bn)):(wi(r,i.targetId),await Ei(r.localStore,i.targetId,!0))}async function Tb(n,e){const t=W(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ti(t.remoteStore,r.targetId))}async function wb(n,e,t){const r=rh(n);try{const i=await function(o,c){const u=W(o),l=me.now(),d=c.reduce((y,R)=>y.add(R.key),se());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",y=>{let R=dt(),C=se();return u.Os.getEntries(y,d).next(k=>{R=k,R.forEach((F,Q)=>{Q.isValidDocument()||(C=C.add(F))})}).next(()=>u.localDocuments.getOverlayedDocuments(y,R)).next(k=>{p=k;const F=[];for(const Q of c){const K=Hw(Q,p.get(Q.key).overlayedDocument);K!=null&&F.push(new cn(Q.key,K,Wm(K.value.mapValue),Ce.exists(!0)))}return u.mutationQueue.addMutationBatch(y,l,F,c)}).next(k=>{m=k;const F=k.applyToLocalDocumentSet(p,C);return u.documentOverlayCache.saveOverlays(y,k.batchId,F)})}).then(()=>({batchId:m.batchId,changes:sg(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let l=o.Ru[o.currentUser.toKey()];l||(l=new Ee(te)),l=l.insert(c,u),o.Ru[o.currentUser.toKey()]=l}(r,i.batchId,t),await un(r,i.changes),await Li(r.remoteStore)}catch(i){const s=Mi(i,"Failed to persist write");t.reject(s)}}async function __(n,e){const t=W(n);try{const r=await jA(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Eu.get(s);o&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?X(o.lu,14607):i.removedDocuments.size>0&&(X(o.lu,42227),o.lu=!1))}),await un(t,r,e)}catch(r){await Bn(r)}}function Jf(n,e,t){const r=W(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach((s,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const u=W(o);u.onlineState=c;let l=!1;u.queries.forEach((d,p)=>{for(const m of p.wa)m.va(c)&&(l=!0)}),l&&Jl(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ab(n,e,t){const r=W(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Eu.get(e),s=i&&i.key;if(s){let o=new Ee($.comparator);o=o.insert(s,Ae.newNoDocument(s,Z.min()));const c=se().add(s),u=new go(Z.min(),new Map,new Ee(te),o,c);await __(r,u),r.du=r.du.remove(s),r.Eu.delete(e),nh(r)}else await Ei(r.localStore,e,!1).then(()=>wi(r,e,t)).catch(Bn)}async function bb(n,e){const t=W(n),r=e.batch.batchId;try{const i=await BA(t.localStore,e);th(t,r,null),eh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await un(t,i)}catch(i){await Bn(i)}}async function Sb(n,e,t){const r=W(n);try{const i=await function(o,c){const u=W(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next(p=>(X(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(l,p))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d)).next(()=>u.localDocuments.getDocuments(l,d))})}(r.localStore,e);th(r,e,t),eh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await un(r,i)}catch(i){await Bn(i)}}async function Pb(n,e){const t=W(n);$n(t.remoteStore)||x(Wn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const c=W(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u))}(t.localStore);if(r===Cn)return void e.resolve();const i=t.Vu.get(r)||[];i.push(e),t.Vu.set(r,i)}catch(r){const i=Mi(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function eh(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function th(n,e,t){const r=W(n);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function wi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||y_(n,r)})}function y_(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ti(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),nh(n))}function Qu(n,e,t){for(const r of t)r instanceof f_?(n.Au.addReference(r.key,e),Rb(n,r)):r instanceof p_?(x(Wn,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||y_(n,r.key)):Y(19791,{yu:r})}function Rb(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(x(Wn,"New document in limbo: "+t),n.Iu.add(r),nh(n))}function nh(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new $(ce.fromString(e)),r=n.mu.next();n.Eu.set(r,new _b(t)),n.du=n.du.insert(t,r),fc(n.remoteStore,new Xt(it(ki(t.path)),r,"TargetPurposeLimboResolution",lt.ue))}}async function un(n,e,t){const r=W(n),i=[],s=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach((c,u)=>{o.push(r.gu(u,e,t).then(l=>{var d;if((l||t)&&r.isPrimaryClient){const p=l?!l.fromCache:(d=t==null?void 0:t.targetChanges.get(u.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(l){i.push(l);const p=Bl.Es(u.targetId,l);s.push(p)}}))}),await Promise.all(o),r.hu.J_(i),await async function(u,l){const d=W(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>A.forEach(l,m=>A.forEach(m.Is,y=>d.persistence.referenceDelegate.addReference(p,m.targetId,y)).next(()=>A.forEach(m.ds,y=>d.persistence.referenceDelegate.removeReference(p,m.targetId,y)))))}catch(p){if(!jn(p))throw p;x(jl,"Failed to update sequence numbers: "+p)}for(const p of l){const m=p.targetId;if(!p.fromCache){const y=d.Fs.get(m),R=y.snapshotVersion,C=y.withLastLimboFreeSnapshotVersion(R);d.Fs=d.Fs.insert(m,C)}}}(r.localStore,s))}async function Cb(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){x(Wn,"User change. New user:",e.toKey());const r=await Hg(t.localStore,e);t.currentUser=e,function(s,o){s.Vu.forEach(c=>{c.forEach(u=>{u.reject(new V(P.CANCELLED,o))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await un(t,r.Bs)}}function Db(n,e){const t=W(n),r=t.Eu.get(e);if(r&&r.lu)return se().add(r.key);{let i=se();const s=t.Tu.get(e);if(!s)return i;for(const o of s){const c=t.Pu.get(o);i=i.unionWith(c.view.tu)}return i}}async function kb(n,e){const t=W(n),r=await Na(t.localStore,e.query,!0),i=e.view.uu(r);return t.isPrimaryClient&&Qu(t,e.targetId,i._u),i}async function Nb(n,e){const t=W(n);return Xg(t.localStore,e).then(r=>un(t,r))}async function Vb(n,e,t,r){const i=W(n),s=await function(c,u){const l=W(c),d=W(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",p=>d.Xn(p,u).next(m=>m?l.localDocuments.getDocuments(p,m):A.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await Li(i.remoteStore):t==="acknowledged"||t==="rejected"?(th(i,e,r||null),eh(i,e),function(c,u){W(W(c).mutationQueue).rr(u)}(i.localStore,e)):Y(6720,"Unknown batchState",{wu:t}),await un(i,s)):x(Wn,"Cannot apply mutation batch with id: "+e)}async function Ob(n,e){const t=W(n);if(pc(t),rh(t),e===!0&&t.fu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await Yf(t,r.toArray());t.fu=!0,await Ku(t.remoteStore,!0);for(const s of i)fc(t.remoteStore,s)}else if(e===!1&&t.fu!==!1){const r=[];let i=Promise.resolve();t.Tu.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(wi(t,o),Ei(t.localStore,o,!0))),Ti(t.remoteStore,o)}),await i,await Yf(t,r),function(o){const c=W(o);c.Eu.forEach((u,l)=>{Ti(c.remoteStore,l)}),c.Au.jr(),c.Eu=new Map,c.du=new Ee($.comparator)}(t),t.fu=!1,await Ku(t.remoteStore,!1)}}async function Yf(n,e,t){const r=W(n),i=[],s=[];for(const o of e){let c;const u=r.Tu.get(o);if(u&&u.length!==0){c=await vi(r.localStore,it(u[0]));for(const l of u){const d=r.Pu.get(l),p=await kb(r,d);p.snapshot&&s.push(p.snapshot)}}else{const l=await Yg(r.localStore,o);c=await vi(r.localStore,l),await Zl(r,I_(l),o,!1,c.resumeToken)}i.push(c)}return r.hu.J_(s),i}function I_(n){return Xm(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function Lb(n){return function(t){return W(W(t).persistence).Ps()}(W(n).localStore)}async function xb(n,e,t,r){const i=W(n);if(i.fu)return void x(Wn,"Ignoring unexpected query state notification.");const s=i.Tu.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await Xg(i.localStore,ng(s[0])),c=go.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ne.EMPTY_BYTE_STRING);await un(i,o,c);break}case"rejected":await Ei(i.localStore,e,!0),wi(i,e,r);break;default:Y(64155,t)}}async function Mb(n,e,t){const r=pc(n);if(r.fu){for(const i of e){if(r.Tu.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){x(Wn,"Adding an already active target "+i);continue}const s=await Yg(r.localStore,i),o=await vi(r.localStore,s);await Zl(r,I_(s),o.targetId,!1,o.resumeToken),fc(r.remoteStore,o)}for(const i of t)r.Tu.has(i)&&await Ei(r.localStore,i,!1).then(()=>{Ti(r.remoteStore,i),wi(r,i)}).catch(Bn)}}function pc(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=__.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Db.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ab.bind(null,e),e.hu.J_=pb.bind(null,e.eventManager),e.hu.pu=mb.bind(null,e.eventManager),e}function rh(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=bb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Sb.bind(null,e),e}function Fb(n,e,t){const r=W(n);(async function(s,o,c){try{const u=await o.getMetadata();if(await function(y,R){const C=W(y),k=xe(R.createTime);return C.persistence.runTransaction("hasNewerBundle","readonly",F=>C.Ti.getBundleMetadata(F,R.id)).then(F=>!!F&&F.createTime.compareTo(k)>=0)}(s.localStore,u))return await o.close(),c._completeWith(function(y){return{taskState:"Success",documentsLoaded:y.totalDocuments,bytesLoaded:y.totalBytes,totalDocuments:y.totalDocuments,totalBytes:y.totalBytes}}(u)),Promise.resolve(new Set);c._updateProgress(d_(u));const l=new Xl(u,o.serializer);let d=await o.Su();for(;d;){const m=await l.Wa(d);m&&c._updateProgress(m),d=await o.Su()}const p=await l.za(s.localStore);return await un(s,p.Ja,void 0),await function(y,R){const C=W(y);return C.persistence.runTransaction("Save bundle","readwrite",k=>C.Ti.saveBundleMetadata(k,R))}(s.localStore,u),c._completeWith(p.progress),Promise.resolve(p.ja)}catch(u){return ot(Wn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class Ai{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Cr(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Kg(this.persistence,new Gg,e.initialUser,this.serializer)}Du(e){return new Ml(dc.Vi,this.serializer)}bu(e){return new r_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ai.provider={build:()=>new Ai};class ih extends Ai{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){X(this.persistence.referenceDelegate instanceof ka,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Bg(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new Ml(r=>ka.Vi(r,t),this.serializer)}}class sh extends Ai{constructor(e,t,r){super(),this.Mu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Mu.initialize(this,e),await rh(this.Mu.syncEngine),await Li(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Kg(this.persistence,new Gg,e.initialUser,this.serializer)}Cu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Bg(r,e.asyncQueue,t)}Fu(e,t){const r=new XT(t,this.persistence);return new YT(e.asyncQueue,r)}Du(e){const t=Ul(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new Fl(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,i_(),pa(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(e){return new r_}}class v_ extends sh{constructor(e,t){super(e,t,!1),this.Mu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Mu.syncEngine;this.sharedClientState instanceof au&&(this.sharedClientState.syncEngine={Do:Vb.bind(null,t),vo:xb.bind(null,t),Co:Mb.bind(null,t),Ps:Lb.bind(null,t),bo:Nb.bind(null,t)},await this.sharedClientState.start()),await this.persistence.ji(async r=>{await Ob(this.Mu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}bu(e){const t=i_();if(!au.C(t))throw new V(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Ul(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new au(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Fn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Cb.bind(null,this.syncEngine),await Ku(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fb}()}createDatastore(e){const t=Cr(e.databaseInfo.databaseId),r=function(s){return new QA(s)}(e.databaseInfo);return function(s,o,c,u){return new ZA(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new tb(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Jf(this.syncEngine,t,0),function(){return $f.C()?new $f:new zA}())}createSyncEngine(e,t){return function(i,s,o,c,u,l,d){const p=new yb(i,s,o,c,u,l);return d&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=W(i);x(br,"RemoteStore shutting down."),s.Ia.add(5),await Oi(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Fn.provider={build:()=>new Fn};function Xf(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 *//**
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
 */class mc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Le("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class Ub{constructor(e,t){this.Nu=e,this.serializer=t,this.metadata=new Ge,this.buffer=new Uint8Array,this.Bu=function(){return new TextDecoder("utf-8")}(),this.Lu().then(r=>{r&&r.Qa()?this.metadata.resolve(r.qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.qa)}`))},r=>this.metadata.reject(r))}close(){return this.Nu.cancel()}async getMetadata(){return this.metadata.promise}async Su(){return await this.getMetadata(),this.Lu()}async Lu(){const e=await this.ku();if(e===null)return null;const t=this.Bu.decode(e),r=Number(t);isNaN(r)&&this.qu(`length string (${t}) is not valid number`);const i=await this.Qu(r);return new h_(JSON.parse(i),e.length+r)}$u(){return this.buffer.findIndex(e=>e===123)}async ku(){for(;this.$u()<0&&!await this.Uu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Qu(e){for(;this.buffer.length<e;)await this.Uu()&&this.qu("Reached the end of bundle when more is expected.");const t=this.Bu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}qu(e){throw this.Nu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Uu(){const e=await this.Nu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class Bb{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.Su();if(!r||!r.Qa())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.qa)}`);this.metadata=r;do r=this.Su(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Ku(){return this.elements}Su(){if(this.cursor===this.bundleData.length)return null;const e=this.ku(),t=this.Qu(e);return new h_(JSON.parse(t),e)}Qu(e){if(this.cursor+e>this.bundleData.length)throw new V(P.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}ku(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */class jb{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new V(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=W(i),c={documents:s.map(p=>Js(o.serializer,p))},u=await o.Jo("BatchGetDocuments",o.serializer.databaseId,ce.emptyPath(),c,s.length),l=new Map;u.forEach(p=>{const m=rA(o.serializer,p);l.set(m.key.toString(),m)});const d=[];return s.forEach(p=>{const m=l.get(p.toString());X(!!m,55234,{key:p}),d.push(m)}),d}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Vi(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const i=$.fromPath(r);this.mutations.push(new Rl(i,this.precondition(i)))}),await async function(r,i){const s=W(r),o={writes:i.map(c=>Ys(s.serializer,c))};await s.Wo("Commit",s.serializer.databaseId,ce.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw Y(50498,{Wu:e.constructor.name});t=Z.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new V(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(Z.min())?Ce.exists(!1):Ce.updateTime(t):Ce.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(Z.min()))throw new V(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ce.updateTime(t)}return Ce.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class qb{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Gu=r.maxAttempts,this.F_=new $l(this.asyncQueue,"transaction_retry")}zu(){this.Gu-=1,this.ju()}ju(){this.F_.g_(async()=>{const e=new jb(this.datastore),t=this.Ju(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.Hu(i)}))}).catch(r=>{this.Hu(r)})})}Ju(e){try{const t=this.updateFunction(e);return!uo(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Hu(e){this.Gu>0&&this.Yu(e)?(this.Gu-=1,this.asyncQueue.enqueueAndForget(()=>(this.ju(),Promise.resolve()))):this.deferred.reject(e)}Yu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!gg(t)}return!1}}/**
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
 */const Un="FirestoreClient";class $b{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ze.UNAUTHENTICATED,this.clientId=Ja.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{x(Un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(x(Un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ge;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Mi(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function uu(n,e){n.asyncQueue.verifyOperationInProgress(),x(Un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Hg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{ot("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{x("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{ot("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function Zf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await oh(n);x(Un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>zf(e.remoteStore,i)),n._onlineComponents=e}async function oh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(Un,"Using user provided OfflineComponentProvider");try{await uu(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ot("Error using user provided cache. Falling back to memory cache: "+t),await uu(n,new Ai)}}else x(Un,"Using default OfflineComponentProvider"),await uu(n,new ih(void 0));return n._offlineComponents}async function gc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(Un,"Using user provided OnlineComponentProvider"),await Zf(n,n._uninitializedComponentsProvider._online)):(x(Un,"Using default OnlineComponentProvider"),await Zf(n,new Fn))),n._onlineComponents}function E_(n){return oh(n).then(e=>e.persistence)}function Fi(n){return oh(n).then(e=>e.localStore)}function T_(n){return gc(n).then(e=>e.remoteStore)}function ah(n){return gc(n).then(e=>e.syncEngine)}function w_(n){return gc(n).then(e=>e.datastore)}async function bi(n){const e=await gc(n),t=e.eventManager;return t.onListen=Ib.bind(null,e.syncEngine),t.onUnlisten=Eb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Tb.bind(null,e.syncEngine),t}function Wb(n){return n.asyncQueue.enqueue(async()=>{const e=await E_(n),t=await T_(n);return e.setNetworkEnabled(!0),function(i){const s=W(i);return s.Ia.delete(0),yo(s)}(t)})}function zb(n){return n.asyncQueue.enqueue(async()=>{const e=await E_(n),t=await T_(n);return e.setNetworkEnabled(!1),async function(i){const s=W(i);s.Ia.add(0),await Oi(s),s.Aa.set("Offline")}(t)})}function Gb(n,e){const t=new Ge;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await function(l,d){const p=W(l);return p.persistence.runTransaction("read document","readonly",m=>p.localDocuments.getDocument(m,d))}(i,s);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new V(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Mi(c,`Failed to get document '${s} from cache`);o.reject(u)}}(await Fi(n),e,t)),t.promise}function A_(n,e,t={}){const r=new Ge;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){const d=new mc({next:m=>{d.Ou(),o.enqueueAndForget(()=>Ql(s,p));const y=m.docs.has(c);!y&&m.fromCache?l.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&m.fromCache&&u&&u.source==="server"?l.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new Yl(ki(c.path),d,{includeMetadataChanges:!0,ka:!0});return Hl(s,p)}(await bi(n),n.asyncQueue,e,t,r)),r.promise}function Kb(n,e){const t=new Ge;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await Na(i,s,!0),u=new m_(s,c.qs),l=u.nu(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Mi(c,`Failed to execute query '${s} against cache`);o.reject(u)}}(await Fi(n),e,t)),t.promise}function b_(n,e,t={}){const r=new Ge;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){const d=new mc({next:m=>{d.Ou(),o.enqueueAndForget(()=>Ql(s,p)),m.fromCache&&u.source==="server"?l.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new Yl(c,d,{includeMetadataChanges:!0,ka:!0});return Hl(s,p)}(await bi(n),n.asyncQueue,e,t,r)),r.promise}function Hb(n,e,t){const r=new Ge;return n.asyncQueue.enqueueAndForget(async()=>{try{const i=await w_(n);r.resolve(async function(o,c,u){var l;const d=W(o),{request:p,ft:m,parent:y}=Sg(d.serializer,Zm(c),u);d.connection.Qo||delete p.parent;const R=(await d.Jo("RunAggregationQuery",d.serializer.databaseId,y,p,1)).filter(k=>!!k.result);X(R.length===1,64727);const C=(l=R[0].result)===null||l===void 0?void 0:l.aggregateFields;return Object.keys(C).reduce((k,F)=>(k[m[F]]=C[F],k),{})}(i,e,t))}catch(i){r.reject(i)}}),r.promise}function Qb(n,e){const t=new mc(e);return n.asyncQueue.enqueueAndForget(async()=>function(i,s){W(i).Da.add(s),s.next()}(await bi(n),t)),()=>{t.Ou(),n.asyncQueue.enqueueAndForget(async()=>function(i,s){W(i).Da.delete(s)}(await bi(n),t))}}function Jb(n,e,t,r){const i=function(o,c){let u;return u=typeof o=="string"?pl().encode(o):o,function(d,p){return new Ub(d,p)}(function(d,p){if(d instanceof Uint8Array)return Xf(d,p);if(d instanceof ArrayBuffer)return Xf(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(u),c)}(t,Cr(e));n.asyncQueue.enqueueAndForget(async()=>{Fb(await ah(n),i,r)})}function Yb(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){const s=W(r);return s.persistence.runTransaction("Get named query","readonly",o=>s.Ti.getNamedQuery(o,i))}(await Fi(n),e))}function S_(n,e){return function(r,i){return new Bb(r,i)}(n,e)}function Xb(n,e){return n.asyncQueue.enqueue(async()=>async function(r,i){const s=W(r),o=s.indexManager,c=[];return s.persistence.runTransaction("Configure indexes","readwrite",u=>o.getFieldIndexes(u).next(l=>function(p,m,y,R,C){p=[...p],m=[...m],p.sort(y),m.sort(y);const k=p.length,F=m.length;let Q=0,K=0;for(;Q<F&&K<k;){const ne=y(p[K],m[Q]);ne<0?C(p[K++]):ne>0?R(m[Q++]):(Q++,K++)}for(;Q<F;)R(m[Q++]);for(;K<k;)C(p[K++])}(l,i,KT,d=>{c.push(o.addFieldIndex(u,d))},d=>{c.push(o.deleteFieldIndex(u,d))})).next(()=>A.waitFor(c)))}(await Fi(n),e))}function Zb(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){W(r).Cs.Rs=i}(await Fi(n),e))}function eS(n){return n.asyncQueue.enqueue(async()=>function(t){const r=W(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await Fi(n)))}/**
 * @license
 * Copyright 2023 Google LLC
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
 */function P_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ep=new Map;/**
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
 */const R_="firestore.googleapis.com",tp=!0;class np{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=R_,this.ssl=tp}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:tp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Lg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ug)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=P_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Io{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new np({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new np(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new fm;switch(r.type){case"firstParty":return new jT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ep.get(t);r&&(x("ComponentProvider","Removing Datastore"),ep.delete(t),r.terminate())}(this),Promise.resolve()}}function C_(n,e,t,r={}){var i;n=ue(n,Io);const s=oe.isCloudWorkstation(e),o=n._getSettings(),c=Object.assign(Object.assign({},o),{emulatorOptions:n._getEmulatorOptions()}),u=`${e}:${t}`;s&&(oe.pingServer(`https://${u}`),oe.updateEmulatorBanner("Firestore",!0)),o.host!==R_&&o.host!==u&&ot("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l=Object.assign(Object.assign({},o),{host:u,ssl:s,emulatorOptions:r});if(!oe.deepEqual(l,c)&&(n._setSettings(l),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=ze.MOCK_USER;else{d=oe.createMockUserToken(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ze(m)}n._authCredentials=new FT(new dm(d,p))}}/**
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
 */class Be{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Be(this.firestore,e,this._query)}}class _e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Rr(t,_e._jsonSchema))return new _e(e,r||null,new $(ce.fromString(t.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:Ue("string",_e._jsonSchemaVersion),referencePath:Ue("string")};class Pt extends Be{constructor(e,t,r){super(e,t,ki(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new $(e))}withConverter(e){return new Pt(this.firestore,e,this._path)}}function tS(n,e,...t){if(n=oe.getModularInstance(n),ml("collection","path",e),n instanceof Io){const r=ce.fromString(e,...t);return $d(r),new Pt(n,null,r)}{if(!(n instanceof _e||n instanceof Pt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return $d(r),new Pt(n.firestore,null,r)}}function nS(n,e){if(n=ue(n,Io),ml("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Be(n,null,function(r){return new on(ce.emptyPath(),r)}(e))}function D_(n,e,...t){if(n=oe.getModularInstance(n),arguments.length===1&&(e=Ja.newId()),ml("doc","path",e),n instanceof Io){const r=ce.fromString(e,...t);return qd(r),new _e(n,null,new $(r))}{if(!(n instanceof _e||n instanceof Pt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ce.fromString(e,...t));return qd(r),new _e(n.firestore,n instanceof Pt?n.converter:null,new $(r))}}function rS(n,e){return n=oe.getModularInstance(n),e=oe.getModularInstance(e),(n instanceof _e||n instanceof Pt)&&(e instanceof _e||e instanceof Pt)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function ch(n,e){return n=oe.getModularInstance(n),e=oe.getModularInstance(e),n instanceof Be&&e instanceof Be&&n.firestore===e.firestore&&fo(n._query,e._query)&&n.converter===e.converter}/**
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
 */const rp="AsyncQueue";class ip{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new $l(this,"async_queue_retry"),this.oc=()=>{const r=pa();r&&x(rp,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=pa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=pa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Ge;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!jn(e))throw e;x(rp,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Le("INTERNAL UNHANDLED ERROR: ",sp(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=Kl.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&Y(47125,{hc:sp(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function sp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
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
 */function ni(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class k_{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ge,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const iS=-1;class Ie extends Io{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ip,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ip(e),this._firestoreClient=void 0,await e}}}function sS(n,e,t){t||(t=Gs);const r=Yt._getProvider(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(oe.deepEqual(s,e))return i;throw new V(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new V(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ug)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&oe.isCloudWorkstation(e.host)&&oe.pingServer(e.host),r.initialize({options:e,instanceIdentifier:t})}function oS(n,e){const t=typeof n=="object"?n:Yt.getApp(),r=typeof n=="string"?n:e||Gs,i=Yt._getProvider(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=oe.getDefaultEmulatorHostnameAndPort("firestore");s&&C_(i,...s)}return i}function De(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||N_(n),n._firestoreClient}function N_(n){var e,t,r;const i=n._freezeSettings(),s=function(c,u,l,d){return new Pw(c,u,l,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,P_(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new $b(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}function aS(n,e){ot("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return V_(n,Fn.provider,{build:r=>new sh(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function cS(n){ot("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();V_(n,Fn.provider,{build:t=>new v_(t,e.cacheSizeBytes)})}function V_(n,e,t){if((n=ue(n,Ie))._firestoreClient||n._terminated)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new V(P.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},N_(n)}function uS(n){if(n._initialized&&!n._terminated)throw new V(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ge;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Ut.C())return Promise.resolve();const i=r+zg;await Ut.delete(i)}(Ul(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function lS(n){return function(t){const r=new Ge;return t.asyncQueue.enqueueAndForget(async()=>Pb(await ah(t),r)),r.promise}(De(n=ue(n,Ie)))}function hS(n){return Wb(De(n=ue(n,Ie)))}function dS(n){return zb(De(n=ue(n,Ie)))}function fS(n){return Yt._removeServiceInstance(n.app,"firestore",n._databaseId.database),n._delete()}function Ju(n,e){const t=De(n=ue(n,Ie)),r=new k_;return Jb(t,n._databaseId,e,r),r}function O_(n,e){return Yb(De(n=ue(n,Ie)),e).then(t=>t?new Be(n,null,t.query):null)}/**
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
 *//**
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
 */class Si{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class L_{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class ut{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ut(Ne.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ut(Ne.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Rr(e,ut._jsonSchema))return ut.fromBase64String(e.bytes)}}ut._jsonSchemaVersion="firestore/bytes/1.0",ut._jsonSchema={type:Ue("string",ut._jsonSchemaVersion),bytes:Ue("string")};/**
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
 */class zn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function pS(){return new zn(Su)}/**
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
 */class Gn{constructor(e){this._methodName=e}}/**
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
 */class Rt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Rt._jsonSchemaVersion}}static fromJSON(e){if(Rr(e,Rt._jsonSchema))return new Rt(e.latitude,e.longitude)}}Rt._jsonSchemaVersion="firestore/geoPoint/1.0",Rt._jsonSchema={type:Ue("string",Rt._jsonSchemaVersion),latitude:Ue("number"),longitude:Ue("number")};/**
 * @license
 * Copyright 2024 Google LLC
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
 */class Et{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Et._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Rr(e,Et._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Et(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Et._jsonSchemaVersion="firestore/vectorValue/1.0",Et._jsonSchema={type:Ue("string",Et._jsonSchemaVersion),vectorValues:Ue("object")};/**
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
 */const mS=/^__.*__$/;class gS{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new cn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ni(e,this.data,t,this.fieldTransforms)}}class x_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new cn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function M_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y(40011,{Ec:n})}}class _c{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new _c(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return xa(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(M_(this.Ec)&&mS.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class _S{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Cr(e)}Dc(e,t,r,i=!1){return new _c({Ec:e,methodName:t,bc:r,path:be.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Dr(n){const e=n._freezeSettings(),t=Cr(n._databaseId);return new _S(n._databaseId,!!e.ignoreUndefinedProperties,t)}function yc(n,e,t,r,i,s={}){const o=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);mh("Data must be an object, but it was:",o,r);const c=B_(r,o);let u,l;if(s.merge)u=new ht(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const m=Xs(e,p,t);if(!o.contains(m))throw new V(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);q_(d,m)||d.push(m)}u=new ht(d),l=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,l=o.fieldTransforms;return new gS(new Ye(c),u,l)}class vo extends Gn{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof vo}}function F_(n,e,t){return new _c({Ec:3,bc:e.settings.bc,methodName:n._methodName,mc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class uh extends Gn{_toFieldTransform(e){return new mo(e.path,new _i)}isEqual(e){return e instanceof uh}}class lh extends Gn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=F_(this,e,!0),r=this.vc.map(s=>kr(s,t)),i=new vr(r);return new mo(e.path,i)}isEqual(e){return e instanceof lh&&oe.deepEqual(this.vc,e.vc)}}class hh extends Gn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=F_(this,e,!0),r=this.vc.map(s=>kr(s,t)),i=new Er(r);return new mo(e.path,i)}isEqual(e){return e instanceof hh&&oe.deepEqual(this.vc,e.vc)}}class dh extends Gn{constructor(e,t){super(e),this.Cc=t}_toFieldTransform(e){const t=new yi(e.serializer,cg(e.serializer,this.Cc));return new mo(e.path,t)}isEqual(e){return e instanceof dh&&this.Cc===e.Cc}}function fh(n,e,t,r){const i=n.Dc(1,e,t);mh("Data must be an object, but it was:",i,r);const s=[],o=Ye.empty();qn(r,(u,l)=>{const d=Ic(e,u,t);l=oe.getModularInstance(l);const p=i.gc(d);if(l instanceof vo)s.push(d);else{const m=kr(l,p);m!=null&&(s.push(d),o.set(d,m))}});const c=new ht(s);return new x_(o,c,i.fieldTransforms)}function ph(n,e,t,r,i,s){const o=n.Dc(1,e,t),c=[Xs(e,r,t)],u=[i];if(s.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)c.push(Xs(e,s[m])),u.push(s[m+1]);const l=[],d=Ye.empty();for(let m=c.length-1;m>=0;--m)if(!q_(l,c[m])){const y=c[m];let R=u[m];R=oe.getModularInstance(R);const C=o.gc(y);if(R instanceof vo)l.push(y);else{const k=kr(R,C);k!=null&&(l.push(y),d.set(y,k))}}const p=new ht(l);return new x_(d,p,o.fieldTransforms)}function U_(n,e,t,r=!1){return kr(t,n.Dc(r?4:3,e))}function kr(n,e){if(j_(n=oe.getModularInstance(n)))return mh("Unsupported field value:",e,n),B_(n,e);if(n instanceof Gn)return function(r,i){if(!M_(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let u=kr(c,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=oe.getModularInstance(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return cg(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=me.fromDate(r);return{timestampValue:Ii(i.serializer,s)}}if(r instanceof me){const s=new me(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ii(i.serializer,s)}}if(r instanceof Rt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ut)return{bytesValue:vg(i.serializer,r._byteString)};if(r instanceof _e){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Vl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Et)return function(o,c){return{mapValue:{fields:{[Tl]:{stringValue:wl},[pi]:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.wc("VectorValues must only contain numeric values.");return Pl(c.serializer,l)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${Ya(r)}`)}(n,e)}function B_(n,e){const t={};return Lm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qn(n,(r,i)=>{const s=kr(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function j_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof me||n instanceof Rt||n instanceof ut||n instanceof _e||n instanceof Gn||n instanceof Et)}function mh(n,e,t){if(!j_(t)||!gm(t)){const r=Ya(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function Xs(n,e,t){if((e=oe.getModularInstance(e))instanceof zn)return e._internalPath;if(typeof e=="string")return Ic(n,e);throw xa("Field path arguments must be of type string or ",n,!1,void 0,t)}const yS=new RegExp("[~\\*/\\[\\]]");function Ic(n,e,t){if(e.search(yS)>=0)throw xa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new zn(...e.split("."))._internalPath}catch{throw xa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function xa(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new V(P.INVALID_ARGUMENT,c+n+u)}function q_(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Zs{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new IS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(vc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class IS extends Zs{data(){return super.data()}}function vc(n,e){return typeof e=="string"?Ic(n,e):e instanceof zn?e._internalPath:e._delegate._internalPath}/**
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
 */function $_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gh{}class Ui extends gh{}function vS(n,e,...t){let r=[];e instanceof gh&&r.push(e),r=r.concat(t),function(s){const o=s.filter(u=>u instanceof Nr).length,c=s.filter(u=>u instanceof Bi).length;if(o>1||o>0&&c>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Bi extends Ui{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Bi(e,t,r)}_apply(e){const t=this._parse(e);return z_(e._query,t),new Be(e.firestore,e.converter,Mu(e._query,t))}_parse(e){const t=Dr(e.firestore);return function(s,o,c,u,l,d,p){let m;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){ap(p,d);const R=[];for(const C of p)R.push(op(u,s,C));m={arrayValue:{values:R}}}else m=op(u,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||ap(p,d),m=U_(c,o,p,d==="in"||d==="not-in");return le.create(l,d,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ES(n,e,t){const r=e,i=vc("where",n);return Bi._create(i,r,t)}class Nr extends gh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Nr(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ge.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const u of c)z_(o,u),o=Mu(o,u)}(e._query,t),new Be(e.firestore,e.converter,Mu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function TS(...n){return n.forEach(e=>G_("or",e)),Nr._create("or",n)}function wS(...n){return n.forEach(e=>G_("and",e)),Nr._create("and",n)}class Ec extends Ui{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ec(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Qs(s,o)}(e._query,this._field,this._direction);return new Be(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new on(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function AS(n,e="asc"){const t=e,r=vc("orderBy",n);return Ec._create(r,t)}class Eo extends Ui{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Eo(e,t,r)}_apply(e){return new Be(e.firestore,e.converter,Sa(e._query,this._limit,this._limitType))}}function bS(n){return _m("limit",n),Eo._create("limit",n,"F")}function SS(n){return _m("limitToLast",n),Eo._create("limitToLast",n,"L")}class To extends Ui{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new To(e,t,r)}_apply(e){const t=W_(e,this.type,this._docOrFields,this._inclusive);return new Be(e.firestore,e.converter,function(i,s){return new on(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function PS(...n){return To._create("startAt",n,!0)}function RS(...n){return To._create("startAfter",n,!1)}class wo extends Ui{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new wo(e,t,r)}_apply(e){const t=W_(e,this.type,this._docOrFields,this._inclusive);return new Be(e.firestore,e.converter,function(i,s){return new on(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function CS(...n){return wo._create("endBefore",n,!1)}function DS(...n){return wo._create("endAt",n,!0)}function W_(n,e,t,r){if(t[0]=oe.getModularInstance(t[0]),t[0]instanceof Zs)return function(s,o,c,u,l){if(!u)throw new V(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of ti(s))if(p.field.isKeyField())d.push(yr(o,u.key));else{const m=u.data.field(p.field);if(nc(m))throw new V(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const y=p.field.canonicalString();throw new V(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${y}' (used as the orderBy) does not exist.`)}d.push(m)}return new xn(d,l)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Dr(n.firestore);return function(o,c,u,l,d,p){const m=o.explicitOrderBy;if(d.length>m.length)throw new V(P.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const y=[];for(let R=0;R<d.length;R++){const C=d[R];if(m[R].field.isKeyField()){if(typeof C!="string")throw new V(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof C}`);if(!bl(o)&&C.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${C}' contains a slash.`);const k=o.path.child(ce.fromString(C));if(!$.isDocumentKey(k))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${k}' is not because it contains an odd number of segments.`);const F=new $(k);y.push(yr(c,F))}else{const k=U_(u,l,C);y.push(k)}}return new xn(y,p)}(n._query,n.firestore._databaseId,i,e,t,r)}}function op(n,e,t){if(typeof(t=oe.getModularInstance(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!bl(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ce.fromString(t));if(!$.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return yr(n,new $(r))}if(t instanceof _e)return yr(n,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ya(t)}.`)}function ap(n,e){if(!Array.isArray(n)||n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function z_(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function G_(n,e){if(!(e instanceof Bi||e instanceof Nr))throw new V(P.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class _h{convertValue(e,t="none"){switch(On(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Y(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return qn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[pi].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Re(o.doubleValue));return new Et(s)}convertGeoPoint(e){return new Rt(Re(e.latitude),Re(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=rc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(zs(e));default:return null}}convertTimestamp(e){const t=nn(e);return new me(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ce.fromString(e);X(Dg(r),9688,{name:e});const i=new Vn(r.get(1),r.get(3)),s=new $(r.popFirst(5));return i.isEqual(t)||Le(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Tc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class yh extends _h{constructor(e){super(),this.firestore=e}convertBytes(e){return new ut(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}/**
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
 */function kS(n){return new Si("sum",Xs("sum",n))}function NS(n){return new Si("avg",Xs("average",n))}function K_(){return new Si("count")}function VS(n,e){var t,r;return n instanceof Si&&e instanceof Si&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function OS(n,e){return ch(n.query,e.query)&&oe.deepEqual(n.data(),e.data())}/**
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
 *//**
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
 */const H_="NOT SUPPORTED";class Zt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ft extends Zs{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Os(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(vc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ft._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function LS(n,e,t){if(Rr(e,ft._jsonSchema)){if(e.bundle===H_)throw new V(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Cr(n._databaseId),i=S_(e.bundle,r),s=i.Ku(),o=new Xl(i.getMetadata(),r);for(const d of s)o.Wa(d);const c=o.documents;if(c.length!==1)throw new V(P.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=ac(r,c[0].document),l=new $(ce.fromString(e.bundleName));return new ft(n,new yh(n),l,u,new Zt(!1,!1),t||null)}}ft._jsonSchemaVersion="firestore/documentSnapshot/1.0",ft._jsonSchema={type:Ue("string",ft._jsonSchemaVersion),bundleSource:Ue("string","DocumentSnapshot"),bundleName:Ue("string"),bundle:Ue("string")};class Os extends ft{data(e={}){return super.data(e)}}class pt{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Zt(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Os(this._firestore,this._userDataWriter,r.key,r,new Zt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const u=new Os(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Zt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new Os(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Zt(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:MS(c.type),doc:u,oldIndex:l,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=pt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ja.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function xS(n,e,t){if(Rr(e,pt._jsonSchema)){if(e.bundle===H_)throw new V(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Cr(n._databaseId),i=S_(e.bundle,r),s=i.Ku(),o=new Xl(i.getMetadata(),r);for(const m of s)o.Wa(m);if(o.queries.length!==1)throw new V(P.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=uc(o.queries[0].bundledQuery),u=o.documents;let l=new gr;u.map(m=>{const y=ac(r,m.document);l=l.add(y)});const d=Sr.fromInitialDocuments(c,l,se(),!1,!1),p=new Be(n,t||null,c);return new pt(n,new yh(n),p,d)}}function MS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y(61501,{type:n})}}function FS(n,e){return n instanceof ft&&e instanceof ft?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof pt&&e instanceof pt&&n._firestore===e._firestore&&ch(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */function US(n){n=ue(n,_e);const e=ue(n.firestore,Ie);return A_(De(e),n._key).then(t=>Ih(e,n,t))}pt._jsonSchemaVersion="firestore/querySnapshot/1.0",pt._jsonSchema={type:Ue("string",pt._jsonSchemaVersion),bundleSource:Ue("string","QuerySnapshot"),bundleName:Ue("string"),bundle:Ue("string")};class Kn extends _h{constructor(e){super(),this.firestore=e}convertBytes(e){return new ut(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new _e(this.firestore,null,t)}}function BS(n){n=ue(n,_e);const e=ue(n.firestore,Ie),t=De(e),r=new Kn(e);return Gb(t,n._key).then(i=>new ft(e,r,n._key,i,new Zt(i!==null&&i.hasLocalMutations,!0),n.converter))}function jS(n){n=ue(n,_e);const e=ue(n.firestore,Ie);return A_(De(e),n._key,{source:"server"}).then(t=>Ih(e,n,t))}function qS(n){n=ue(n,Be);const e=ue(n.firestore,Ie),t=De(e),r=new Kn(e);return $_(n._query),b_(t,n._query).then(i=>new pt(e,r,n,i))}function $S(n){n=ue(n,Be);const e=ue(n.firestore,Ie),t=De(e),r=new Kn(e);return Kb(t,n._query).then(i=>new pt(e,r,n,i))}function WS(n){n=ue(n,Be);const e=ue(n.firestore,Ie),t=De(e),r=new Kn(e);return b_(t,n._query,{source:"server"}).then(i=>new pt(e,r,n,i))}function zS(n,e,t){n=ue(n,_e);const r=ue(n.firestore,Ie),i=Tc(n.converter,e,t);return ji(r,[yc(Dr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ce.none())])}function GS(n,e,t,...r){n=ue(n,_e);const i=ue(n.firestore,Ie),s=Dr(i);let o;return o=typeof(e=oe.getModularInstance(e))=="string"||e instanceof zn?ph(s,"updateDoc",n._key,e,t,r):fh(s,"updateDoc",n._key,e),ji(i,[o.toMutation(n._key,Ce.exists(!0))])}function KS(n){return ji(ue(n.firestore,Ie),[new Vi(n._key,Ce.none())])}function HS(n,e){const t=ue(n.firestore,Ie),r=D_(n),i=Tc(n.converter,e);return ji(t,[yc(Dr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Ce.exists(!1))]).then(()=>r)}function Yu(n,...e){var t,r,i;n=oe.getModularInstance(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||ni(e[o])||(s=e[o++]);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(ni(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let u,l,d;if(n instanceof _e)l=ue(n.firestore,Ie),d=ki(n._key.path),u={next:p=>{e[o]&&e[o](Ih(l,n,p))},error:e[o+1],complete:e[o+2]};else{const p=ue(n,Be);l=ue(p.firestore,Ie),d=p._query;const m=new Kn(l);u={next:y=>{e[o]&&e[o](new pt(l,m,p,y))},error:e[o+1],complete:e[o+2]},$_(n._query)}return function(m,y,R,C){const k=new mc(C),F=new Yl(y,k,R);return m.asyncQueue.enqueueAndForget(async()=>Hl(await bi(m),F)),()=>{k.Ou(),m.asyncQueue.enqueueAndForget(async()=>Ql(await bi(m),F))}}(De(l),d,c,u)}function QS(n,e,...t){const r=oe.getModularInstance(n),i=function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const p of d){if(!(p in u)){l.error=`snapshotJson missing required field: ${p}`;break}const m=u[p];if(typeof m!="string"){l.error=`snapshotJson field '${p}' must be a string.`;break}if(m.length===0){l.error=`snapshotJson field '${p}' cannot be an empty string.`;break}p==="bundle"?l.bundle=m:p==="bundleName"?l.bundleName=m:p==="bundleSource"&&(l.bundleSource=m)}return l}(e);if(i.error)throw new V(P.INVALID_ARGUMENT,i.error);let s,o=0;if(typeof t[o]!="object"||ni(t[o])||(s=t[o++]),i.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&ni(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,p,m,y){let R,C=!1;return Ju(l,d.bundle).then(()=>O_(l,d.bundleName)).then(F=>{F&&!C&&(y&&F.withConverter(y),R=Yu(F,p||{},m))}).catch(F=>(m.error&&m.error(F),()=>{})),()=>{C||(C=!0,R&&R())}}(r,i,s,c,t[o])}if(i.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&ni(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return function(l,d,p,m,y){let R,C=!1;return Ju(l,d.bundle).then(()=>{if(!C){const F=new _e(l,y||null,$.fromPath(d.bundleName));R=Yu(F,p||{},m)}}).catch(F=>(m.error&&m.error(F),()=>{})),()=>{C||(C=!0,R&&R())}}(r,i,s,c,t[o])}throw new V(P.INVALID_ARGUMENT,`unsupported bundle source: ${i.bundleSource}`)}function JS(n,e){return Qb(De(n=ue(n,Ie)),ni(e)?e:{next:e})}function ji(n,e){return function(r,i){const s=new Ge;return r.asyncQueue.enqueueAndForget(async()=>wb(await ah(r),i,s)),s.promise}(De(n),e)}function Ih(n,e,t){const r=t.docs.get(e._key),i=new Kn(n);return new ft(n,i,e._key,r,new Zt(t.hasPendingWrites,t.fromCache),e.converter)}function YS(n){return Q_(n,{count:K_()})}function Q_(n,e){const t=ue(n.firestore,Ie),r=De(t),i=Om(e,(s,o)=>new mg(o,s.aggregateType,s._internalFieldPath));return Hb(r,n._query,i).then(s=>function(c,u,l){const d=new Kn(c);return new L_(u,d,l)}(t,n,s))}class XS{constructor(e){this.kind="memory",this._onlineComponentProvider=Fn.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider={build:()=>new ih(void 0)}}toJSON(){return{kind:this.kind}}}class ZS{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=J_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class eP{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ai.provider}toJSON(){return{kind:this.kind}}}class tP{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new ih(e)}}toJSON(){return{kind:this.kind}}}function nP(){return new eP}function rP(n){return new tP(n==null?void 0:n.cacheSizeBytes)}function iP(n){return new XS(n)}function sP(n){return new ZS(n)}class oP{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Fn.provider,this._offlineComponentProvider={build:t=>new sh(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class aP{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Fn.provider,this._offlineComponentProvider={build:t=>new v_(t,e==null?void 0:e.cacheSizeBytes)}}}function J_(n){return new oP(n==null?void 0:n.forceOwnership)}function cP(){return new aP}/**
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
 */const uP={maxAttempts:5};/**
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
 */class Y_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Dr(e)}set(e,t,r){this._verifyNotCommitted();const i=Pn(e,this._firestore),s=Tc(i.converter,t,r),o=yc(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Ce.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Pn(e,this._firestore);let o;return o=typeof(t=oe.getModularInstance(t))=="string"||t instanceof zn?ph(this._dataReader,"WriteBatch.update",s._key,t,r,i):fh(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Ce.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Pn(e,this._firestore);return this._mutations=this._mutations.concat(new Vi(t._key,Ce.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Pn(n,e){if((n=oe.getModularInstance(n)).firestore!==e)throw new V(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class lP{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Dr(e)}get(e){const t=Pn(e,this._firestore),r=new yh(this._firestore);return this._transaction.lookup([t._key]).then(i=>{if(!i||i.length!==1)return Y(24041);const s=i[0];if(s.isFoundDocument())return new Zs(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new Zs(this._firestore,r,t._key,null,t.converter);throw Y(18433,{doc:s})})}set(e,t,r){const i=Pn(e,this._firestore),s=Tc(i.converter,t,r),o=yc(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,t,r,...i){const s=Pn(e,this._firestore);let o;return o=typeof(t=oe.getModularInstance(t))=="string"||t instanceof zn?ph(this._dataReader,"Transaction.update",s._key,t,r,i):fh(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,o),this}delete(e){const t=Pn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
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
 */class X_ extends lP{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Pn(e,this._firestore),r=new Kn(this._firestore);return super.get(e).then(i=>new ft(this._firestore,r,t._key,i._document,new Zt(!1,!1),t.converter))}}function hP(n,e,t){n=ue(n,Ie);const r=Object.assign(Object.assign({},uP),t);return function(s){if(s.maxAttempts<1)throw new V(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,c){const u=new Ge;return s.asyncQueue.enqueueAndForget(async()=>{const l=await w_(s);new qb(s.asyncQueue,l,c,o,u).zu()}),u.promise}(De(n),i=>e(new X_(n,i)),r)}/**
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
 */function dP(){return new vo("deleteField")}function fP(){return new uh("serverTimestamp")}function pP(...n){return new lh("arrayUnion",n)}function mP(...n){return new hh("arrayRemove",n)}function gP(n){return new dh("increment",n)}function _P(n){return new Et(n)}/**
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
 */function yP(n){return De(n=ue(n,Ie)),new Y_(n,e=>ji(n,e))}/**
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
 */function IP(n,e){const t=De(n=ue(n,Ie));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return ot("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(s){const o=typeof s=="string"?function(l){try{return JSON.parse(l)}catch(d){throw new V(P.INVALID_ARGUMENT,"Failed to parse JSON: "+(d==null?void 0:d.message))}}(s):s,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=cp(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const p of u.fields){const m=Ic("setIndexConfiguration",cp(p,"fieldPath"));p.arrayConfig==="CONTAINS"?d.push(new pr(m,2)):p.order==="ASCENDING"?d.push(new pr(m,0)):p.order==="DESCENDING"&&d.push(new pr(m,1))}c.push(new ci(ci.UNKNOWN_ID,l,d,ui.empty()))}return c}(e);return Xb(t,r)}function cp(n,e){if(typeof n[e]!="string")throw new V(P.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class Z_{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function vP(n){var e;n=ue(n,Ie);const t=up.get(n);if(t)return t;if(((e=De(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new Z_(n);return up.set(n,r),r}function EP(n){ey(n,!0)}function TP(n){ey(n,!1)}function wP(n){eS(De(n._firestore)).then(e=>x("deleting all persistent cache indexes succeeded")).catch(e=>ot("deleting all persistent cache indexes failed",e))}function ey(n,e){Zb(De(n._firestore),e).then(t=>x(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>ot(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const up=new WeakMap;/**
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
 */function AP(n){var e;const t=(e=De(ue(n.firestore,Ie))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:cc(t,it(n._query)).Vt}function bP(n,e){var t;const r=Om(e,(s,o)=>new mg(o,s.aggregateType,s._internalFieldPath)),i=(t=De(ue(n.firestore,Ie))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:Sg(i,Zm(n._query),r,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class SP{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return vh.instance.onExistenceFilterMismatch(e)}}class vh{constructor(){this.Fc=new Map}static get instance(){return na||(na=new vh,function(t){if(Pa)throw new Error("a TestingHooksSpi instance is already set");Pa=t}(na)),na}ct(e){this.Fc.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Fc;return r.set(t,e),()=>r.delete(t)}}let na=null;(function(e,t=!0){(function(i){Di=i})(Yt.SDK_VERSION),Yt._registerComponent(new LT.Component("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new Ie(new UT(r.getProvider("auth-internal")),new qT(o,r.getProvider("app-check-internal")),function(l,d){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vn(l.options.projectId,d)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Yt.registerVersion(Ud,Bd,e),Yt.registerVersion(Ud,Bd,"cjs2017")})();N.AbstractUserDataWriter=_h;N.AggregateField=Si;N.AggregateQuerySnapshot=L_;N.Bytes=ut;N.CACHE_SIZE_UNLIMITED=iS;N.CollectionReference=Pt;N.DocumentReference=_e;N.DocumentSnapshot=ft;N.FieldPath=zn;N.FieldValue=Gn;N.Firestore=Ie;N.FirestoreError=V;N.GeoPoint=Rt;N.LoadBundleTask=k_;N.PersistentCacheIndexManager=Z_;N.Query=Be;N.QueryCompositeFilterConstraint=Nr;N.QueryConstraint=Ui;N.QueryDocumentSnapshot=Os;N.QueryEndAtConstraint=wo;N.QueryFieldFilterConstraint=Bi;N.QueryLimitConstraint=Eo;N.QueryOrderByConstraint=Ec;N.QuerySnapshot=pt;N.QueryStartAtConstraint=To;N.SnapshotMetadata=Zt;N.Timestamp=me;N.Transaction=X_;N.VectorValue=Et;N.WriteBatch=Y_;N._AutoId=Ja;N._ByteString=Ne;N._DatabaseId=Vn;N._DocumentKey=$;N._EmptyAppCheckTokenProvider=$T;N._EmptyAuthCredentialsProvider=fm;N._FieldPath=be;N._TestingHooks=SP;N._cast=ue;N._debugAssert=MT;N._internalAggregationQueryToProtoRunAggregationQueryRequest=bP;N._internalQueryToProtoQueryTarget=AP;N._isBase64Available=bw;N._logWarn=ot;N._validateIsNotUsedTogether=mm;N.addDoc=HS;N.aggregateFieldEqual=VS;N.aggregateQuerySnapshotEqual=OS;N.and=wS;N.arrayRemove=mP;N.arrayUnion=pP;N.average=NS;N.clearIndexedDbPersistence=uS;N.collection=tS;N.collectionGroup=nS;N.connectFirestoreEmulator=C_;N.count=K_;N.deleteAllPersistentCacheIndexes=wP;N.deleteDoc=KS;N.deleteField=dP;N.disableNetwork=dS;N.disablePersistentCacheIndexAutoCreation=TP;N.doc=D_;N.documentId=pS;N.documentSnapshotFromJSON=LS;N.enableIndexedDbPersistence=aS;N.enableMultiTabIndexedDbPersistence=cS;N.enableNetwork=hS;N.enablePersistentCacheIndexAutoCreation=EP;N.endAt=DS;N.endBefore=CS;N.ensureFirestoreConfigured=De;N.executeWrite=ji;N.getAggregateFromServer=Q_;N.getCountFromServer=YS;N.getDoc=US;N.getDocFromCache=BS;N.getDocFromServer=jS;N.getDocs=qS;N.getDocsFromCache=$S;N.getDocsFromServer=WS;N.getFirestore=oS;N.getPersistentCacheIndexManager=vP;N.increment=gP;N.initializeFirestore=sS;N.limit=bS;N.limitToLast=SS;N.loadBundle=Ju;N.memoryEagerGarbageCollector=nP;N.memoryLocalCache=iP;N.memoryLruGarbageCollector=rP;N.namedQuery=O_;N.onSnapshot=Yu;N.onSnapshotResume=QS;N.onSnapshotsInSync=JS;N.or=TS;N.orderBy=AS;N.persistentLocalCache=sP;N.persistentMultipleTabManager=cP;N.persistentSingleTabManager=J_;N.query=vS;N.queryEqual=ch;N.querySnapshotFromJSON=xS;N.refEqual=rS;N.runTransaction=hP;N.serverTimestamp=fP;N.setDoc=zS;N.setIndexConfiguration=IP;N.setLogLevel=xT;N.snapshotEqual=FS;N.startAfter=RS;N.startAt=PS;N.sum=kS;N.terminate=fS;N.updateDoc=GS;N.vector=_P;N.waitForPendingWrites=lS;N.where=ES;N.writeBatch=yP;(function(n){Object.defineProperty(n,"__esModule",{value:!0});var e=N;Object.keys(e).forEach(function(t){t!=="default"&&!n.hasOwnProperty(t)&&Object.defineProperty(n,t,{enumerable:!0,get:function(){return e[t]}})})})(ev);var PP={};(function(n){Object.defineProperty(n,"__esModule",{value:!0});var e=za,t="firebase",r="11.10.0";/**
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
 */e.registerVersion(t,r,"app"),Object.keys(e).forEach(function(i){i!=="default"&&!n.hasOwnProperty(i)&&Object.defineProperty(n,i,{enumerable:!0,get:function(){return e[i]}})})})(PP);var RP={},j={},O={},Xu=function(n,e){return Xu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])},Xu(n,e)};function ty(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Xu(n,e);function t(){this.constructor=n}n.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var Ma=function(){return Ma=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++){t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},Ma.apply(this,arguments)};function ny(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function ry(n,e,t,r){var i=arguments.length,s=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,r);else for(var c=n.length-1;c>=0;c--)(o=n[c])&&(s=(i<3?o(s):i>3?o(e,t,s):o(e,t))||s);return i>3&&s&&Object.defineProperty(e,t,s),s}function iy(n,e){return function(t,r){e(t,r,n)}}function sy(n,e,t,r,i,s){function o(F){if(F!==void 0&&typeof F!="function")throw new TypeError("Function expected");return F}for(var c=r.kind,u=c==="getter"?"get":c==="setter"?"set":"value",l=!e&&n?r.static?n:n.prototype:null,d=e||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),p,m=!1,y=t.length-1;y>=0;y--){var R={};for(var C in r)R[C]=C==="access"?{}:r[C];for(var C in r.access)R.access[C]=r.access[C];R.addInitializer=function(F){if(m)throw new TypeError("Cannot add initializers after decoration has completed");s.push(o(F||null))};var k=(0,t[y])(c==="accessor"?{get:d.get,set:d.set}:d[u],R);if(c==="accessor"){if(k===void 0)continue;if(k===null||typeof k!="object")throw new TypeError("Object expected");(p=o(k.get))&&(d.get=p),(p=o(k.set))&&(d.set=p),(p=o(k.init))&&i.unshift(p)}else(p=o(k))&&(c==="field"?i.unshift(p):d[u]=p)}l&&Object.defineProperty(l,r.name,d),m=!0}function oy(n,e,t){for(var r=arguments.length>2,i=0;i<e.length;i++)t=r?e[i].call(n,t):e[i].call(n);return r?t:void 0}function ay(n){return typeof n=="symbol"?n:"".concat(n)}function cy(n,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(n,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function uy(n,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(n,e)}function ly(n,e,t,r){function i(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function c(d){try{l(r.next(d))}catch(p){o(p)}}function u(d){try{l(r.throw(d))}catch(p){o(p)}}function l(d){d.done?s(d.value):i(d.value).then(c,u)}l((r=r.apply(n,e||[])).next())})}function hy(n,e){var t={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=c(0),o.throw=c(1),o.return=c(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(l){return function(d){return u([l,d])}}function u(l){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(t=0)),t;)try{if(r=1,i&&(s=l[0]&2?i.return:l[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,l[1])).done)return s;switch(i=0,s&&(l=[l[0]&2,s.value]),l[0]){case 0:case 1:s=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,i=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(s=t.trys,!(s=s.length>0&&s[s.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!s||l[1]>s[0]&&l[1]<s[3])){t.label=l[1];break}if(l[0]===6&&t.label<s[1]){t.label=s[1],s=l;break}if(s&&t.label<s[2]){t.label=s[2],t.ops.push(l);break}s[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(n,t)}catch(d){l=[6,d],i=0}finally{r=s=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}var wc=Object.create?function(n,e,t,r){r===void 0&&(r=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(n,r,i)}:function(n,e,t,r){r===void 0&&(r=t),n[r]=e[t]};function dy(n,e){for(var t in n)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&wc(e,n,t)}function Fa(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],r=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Eh(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var r=t.call(n),i,s=[],o;try{for(;(e===void 0||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(c){o={error:c}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(o)throw o.error}}return s}function fy(){for(var n=[],e=0;e<arguments.length;e++)n=n.concat(Eh(arguments[e]));return n}function py(){for(var n=0,e=0,t=arguments.length;e<t;e++)n+=arguments[e].length;for(var r=Array(n),i=0,e=0;e<t;e++)for(var s=arguments[e],o=0,c=s.length;o<c;o++,i++)r[i]=s[o];return r}function my(n,e,t){if(t||arguments.length===2)for(var r=0,i=e.length,s;r<i;r++)(s||!(r in e))&&(s||(s=Array.prototype.slice.call(e,0,r)),s[r]=e[r]);return n.concat(s||Array.prototype.slice.call(e))}function Pi(n){return this instanceof Pi?(this.v=n,this):new Pi(n)}function gy(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(n,e||[]),i,s=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),c("next"),c("throw"),c("return",o),i[Symbol.asyncIterator]=function(){return this},i;function o(y){return function(R){return Promise.resolve(R).then(y,p)}}function c(y,R){r[y]&&(i[y]=function(C){return new Promise(function(k,F){s.push([y,C,k,F])>1||u(y,C)})},R&&(i[y]=R(i[y])))}function u(y,R){try{l(r[y](R))}catch(C){m(s[0][3],C)}}function l(y){y.value instanceof Pi?Promise.resolve(y.value.v).then(d,p):m(s[0][2],y)}function d(y){u("next",y)}function p(y){u("throw",y)}function m(y,R){y(R),s.shift(),s.length&&u(s[0][0],s[0][1])}}function _y(n){var e,t;return e={},r("next"),r("throw",function(i){throw i}),r("return"),e[Symbol.iterator]=function(){return this},e;function r(i,s){e[i]=n[i]?function(o){return(t=!t)?{value:Pi(n[i](o)),done:!1}:s?s(o):o}:s}}function yy(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof Fa=="function"?Fa(n):n[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(s){t[s]=n[s]&&function(o){return new Promise(function(c,u){o=n[s](o),i(c,u,o.done,o.value)})}}function i(s,o,c,u){Promise.resolve(u).then(function(l){s({value:l,done:c})},o)}}function Iy(n,e){return Object.defineProperty?Object.defineProperty(n,"raw",{value:e}):n.raw=e,n}var CP=Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e},Zu=function(n){return Zu=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t},Zu(n)};function vy(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var t=Zu(n),r=0;r<t.length;r++)t[r]!=="default"&&wc(e,n,t[r]);return CP(e,n),e}function Ey(n){return n&&n.__esModule?n:{default:n}}function Ty(n,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(n):r?r.value:e.get(n)}function wy(n,e,t,r,i){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?n!==e||!i:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?i.call(n,t):i?i.value=t:e.set(n,t),t}function Ay(n,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof n=="function"?e===n:n.has(e)}function by(n,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var r,i;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");r=e[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");r=e[Symbol.dispose],t&&(i=r)}if(typeof r!="function")throw new TypeError("Object not disposable.");i&&(r=function(){try{i.call(this)}catch(s){return Promise.reject(s)}}),n.stack.push({value:e,dispose:r,async:t})}else t&&n.stack.push({async:!0});return e}var DP=typeof SuppressedError=="function"?SuppressedError:function(n,e,t){var r=new Error(t);return r.name="SuppressedError",r.error=n,r.suppressed=e,r};function Sy(n){function e(s){n.error=n.hasError?new DP(s,n.error,"An error was suppressed during disposal."):s,n.hasError=!0}var t,r=0;function i(){for(;t=n.stack.pop();)try{if(!t.async&&r===1)return r=0,n.stack.push(t),Promise.resolve().then(i);if(t.dispose){var s=t.dispose.call(t.value);if(t.async)return r|=2,Promise.resolve(s).then(i,function(o){return e(o),i()})}else r|=1}catch(o){e(o)}if(r===1)return n.hasError?Promise.reject(n.error):Promise.resolve();if(n.hasError)throw n.error}return i()}function Py(n,e){return typeof n=="string"&&/^\.\.?\//.test(n)?n.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,r,i,s,o){return r?e?".jsx":".js":i&&(!s||!o)?t:i+s+"."+o.toLowerCase()+"js"}):n}const kP={__extends:ty,__assign:Ma,__rest:ny,__decorate:ry,__param:iy,__esDecorate:sy,__runInitializers:oy,__propKey:ay,__setFunctionName:cy,__metadata:uy,__awaiter:ly,__generator:hy,__createBinding:wc,__exportStar:dy,__values:Fa,__read:Eh,__spread:fy,__spreadArrays:py,__spreadArray:my,__await:Pi,__asyncGenerator:gy,__asyncDelegator:_y,__asyncValues:yy,__makeTemplateObject:Iy,__importStar:vy,__importDefault:Ey,__classPrivateFieldGet:Ty,__classPrivateFieldSet:wy,__classPrivateFieldIn:Ay,__addDisposableResource:by,__disposeResources:Sy,__rewriteRelativeImportExtension:Py},NP=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:by,get __assign(){return Ma},__asyncDelegator:_y,__asyncGenerator:gy,__asyncValues:yy,__await:Pi,__awaiter:ly,__classPrivateFieldGet:Ty,__classPrivateFieldIn:Ay,__classPrivateFieldSet:wy,__createBinding:wc,__decorate:ry,__disposeResources:Sy,__esDecorate:sy,__exportStar:dy,__extends:ty,__generator:hy,__importDefault:Ey,__importStar:vy,__makeTemplateObject:Iy,__metadata:uy,__param:iy,__propKey:ay,__read:Eh,__rest:ny,__rewriteRelativeImportExtension:Py,__runInitializers:oy,__setFunctionName:cy,__spread:fy,__spreadArray:my,__spreadArrays:py,__values:Fa,default:kP},Symbol.toStringTag,{value:"Module"})),VP=Dp(NP);var fe=za,U=H,Th=Ka,wh=VP,lp=Pr;/**
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
 */const OP={PHONE:"phone",TOTP:"totp"},LP={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},xP={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},MP={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},FP={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function UP(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function Ry(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const BP=UP,Cy=Ry,Dy=new U.ErrorFactory("auth","Firebase",Ry()),jP={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"};/**
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
 */const Ua=new Th.Logger("@firebase/auth");function qP(n,...e){Ua.logLevel<=Th.LogLevel.WARN&&Ua.warn(`Auth (${fe.SDK_VERSION}): ${n}`,...e)}function ma(n,...e){Ua.logLevel<=Th.LogLevel.ERROR&&Ua.error(`Auth (${fe.SDK_VERSION}): ${n}`,...e)}/**
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
 */function at(n,...e){throw bh(n,...e)}function st(n,...e){return bh(n,...e)}function Ah(n,e,t){const r=Object.assign(Object.assign({},Cy()),{[e]:t});return new U.ErrorFactory("auth","Firebase",r).create(e,{appName:n.name})}function Ke(n){return Ah(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function qi(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&at(n,"argument-error"),Ah(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function bh(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Dy.create(n,...e)}function B(n,e,...t){if(!n)throw bh(e,...t)}function xt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ma(e),new Error(e)}function qt(n,e){n||xt(e)}/**
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
 */function eo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Sh(){return hp()==="http:"||hp()==="https:"}function hp(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function $P(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Sh()||U.isBrowserExtension()||"connection"in navigator)?navigator.onLine:!0}function WP(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ao{constructor(e,t){this.shortDelay=e,this.longDelay=t,qt(t>e,"Short delay should be less than long delay!"),this.isMobile=U.isMobileCordova()||U.isReactNative()}get(){return $P()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ph(n,e){qt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Rh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const zP={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const GP=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],KP=new Ao(3e4,6e4);function Se(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Pe(n,e,t,r,i={}){return ky(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=U.querystring(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l=Object.assign({method:e,headers:u},s);return U.isCloudflareWorker()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&U.isCloudWorkstation(n.emulatorConfig.host)&&(l.credentials="include"),Rh.fetch()(await Ny(n,n.config.apiHost,t,c),l)})}async function ky(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},zP),e);try{const i=new QP(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ws(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ws(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ws(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ws(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ah(n,d,l);at(n,d)}}catch(i){if(i instanceof U.FirebaseError)throw i;at(n,"network-request-failed",{message:String(i)})}}async function ln(n,e,t,r,i={}){const s=await Pe(n,e,t,r,i);return"mfaPendingCredential"in s&&at(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Ny(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?Ph(n.config,i):`${n.config.apiScheme}://${i}`;return GP.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function HP(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class QP{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(st(this.auth,"network-request-failed")),KP.get())})}}function ws(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=st(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */function dp(n){return n!==void 0&&n.getResponse!==void 0}function fp(n){return n!==void 0&&n.enterprise!==void 0}class Vy{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return HP(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function JP(n){return(await Pe(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Oy(n,e){return Pe(n,"GET","/v2/recaptchaConfig",Se(n,e))}/**
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
 */async function YP(n,e){return Pe(n,"POST","/v1/accounts:delete",e)}async function XP(n,e){return Pe(n,"POST","/v1/accounts:update",e)}async function Ba(n,e){return Pe(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ls(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
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
 */function ZP(n,e=!1){return U.getModularInstance(n).getIdToken(e)}async function Ly(n,e=!1){const t=U.getModularInstance(n),r=await t.getIdToken(e),i=Ac(r);B(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ls(lu(i.auth_time)),issuedAtTime:Ls(lu(i.iat)),expirationTime:Ls(lu(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function lu(n){return Number(n)*1e3}function Ac(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ma("JWT malformed, contained fewer than 3 sections"),null;try{const i=U.base64Decode(t);return i?JSON.parse(i):(ma("Failed to decode base64 JWT payload"),null)}catch(i){return ma("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function pp(n){const e=Ac(n);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function sn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof U.FirebaseError&&eR(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function eR({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class tR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class el{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ls(this.lastLoginAt),this.creationTime=Ls(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function to(n){var e;const t=n.auth,r=await n.getIdToken(),i=await sn(n,Ba(t,{idToken:r}));B(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?My(s.providerUserInfo):[],c=nR(n.providerData,o),u=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),d=u?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new el(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function xy(n){const e=U.getModularInstance(n);await to(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function nR(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function My(n){return n.map(e=>{var{providerId:t}=e,r=wh.__rest(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function rR(n,e){const t=await ky(n,{},async()=>{const r=U.querystring({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await Ny(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&U.isCloudWorkstation(n.emulatorConfig.host)&&(u.credentials="include"),Rh.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function iR(n,e){return Pe(n,"POST","/v2/accounts:revokeToken",Se(n,e))}/**
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
 */class ri{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pp(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){B(e.length!==0,"internal-error");const t=pp(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await rR(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new ri;return r&&(B(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(B(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(B(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ri,this.toJSON())}_performRefresh(){return xt("not implemented")}}/**
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
 */function wn(n,e){B(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class vt{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=wh.__rest(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new el(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await sn(this,this.stsTokenManager.getToken(this.auth,e));return B(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ly(this,e)}reload(){return xy(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new vt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await to(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(fe._isFirebaseServerApp(this.auth.app))return Promise.reject(Ke(this.auth));const e=await this.getIdToken();return await sn(this,YP(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,u,l,d;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,y=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,R=(o=t.photoURL)!==null&&o!==void 0?o:void 0,C=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,F=(l=t.createdAt)!==null&&l!==void 0?l:void 0,Q=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:K,emailVerified:ne,isAnonymous:he,providerData:re,stsTokenManager:E}=t;B(K&&E,e,"internal-error");const _=ri.fromJSON(this.name,E);B(typeof K=="string",e,"internal-error"),wn(p,e.name),wn(m,e.name),B(typeof ne=="boolean",e,"internal-error"),B(typeof he=="boolean",e,"internal-error"),wn(y,e.name),wn(R,e.name),wn(C,e.name),wn(k,e.name),wn(F,e.name),wn(Q,e.name);const v=new vt({uid:K,auth:e,email:m,emailVerified:ne,displayName:p,isAnonymous:he,photoURL:R,phoneNumber:y,tenantId:C,stsTokenManager:_,createdAt:F,lastLoginAt:Q});return re&&Array.isArray(re)&&(v.providerData=re.map(T=>Object.assign({},T))),k&&(v._redirectEventId=k),v}static async _fromIdTokenResponse(e,t,r=!1){const i=new ri;i.updateFromServerResponse(t);const s=new vt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await to(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];B(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?My(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new ri;c.updateFromIdToken(r);const u=new vt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new el(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,l),u}}/**
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
 */const mp=new Map;function Mt(n){qt(n instanceof Function,"Expected a class definition");let e=mp.get(n);return e?(qt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,mp.set(n,e),e)}/**
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
 */class Fy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fy.type="NONE";const tl=Fy;/**
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
 */function xs(n,e,t){return`firebase:${n}:${e}:${t}`}class ii{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=xs(this.userKey,i.apiKey,s),this.fullPersistenceKey=xs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ba(this.auth,{idToken:e}).catch(()=>{});return t?vt._fromGetAccountInfoResponse(this.auth,t,e):null}return vt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new ii(Mt(tl),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||Mt(tl);const o=xs(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const m=await Ba(e,{idToken:d}).catch(()=>{});if(!m)break;p=await vt._fromGetAccountInfoResponse(e,m,d)}else p=vt._fromJSON(e,d);l!==s&&(c=p),s=l;break}}catch{}const u=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new ii(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new ii(s,e,r))}}/**
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
 */function gp(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Uy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($y(e))return"Blackberry";if(Wy(e))return"Webos";if(By(e))return"Safari";if((e.includes("chrome/")||jy(e))&&!e.includes("edge/"))return"Chrome";if(Ch(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Uy(n=U.getUA()){return/firefox\//i.test(n)}function By(n=U.getUA()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jy(n=U.getUA()){return/crios\//i.test(n)}function qy(n=U.getUA()){return/iemobile/i.test(n)}function Ch(n=U.getUA()){return/android/i.test(n)}function $y(n=U.getUA()){return/blackberry/i.test(n)}function Wy(n=U.getUA()){return/webos/i.test(n)}function bc(n=U.getUA()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function sR(n=U.getUA()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(n)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(n)}function oR(n=U.getUA()){var e;return bc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function aR(){return U.isIE()&&document.documentMode===10}function zy(n=U.getUA()){return bc(n)||Ch(n)||Wy(n)||$y(n)||/windows phone/i.test(n)||qy(n)}/**
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
 */function Dh(n,e=[]){let t;switch(n){case"Browser":t=gp(U.getUA());break;case"Worker":t=`${gp(U.getUA())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fe.SDK_VERSION}/${r}`}/**
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
 */class cR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const u=e(s);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */async function uR(n,e={}){return Pe(n,"GET","/v2/passwordPolicy",Se(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
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
 */const lR=6;class hR{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:lR,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Gy{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _p(this),this.idTokenSubscription=new _p(this),this.beforeStateQueue=new cR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dy,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Mt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await ii.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ba(this,{idToken:e}),r=await vt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(fe._isFirebaseServerApp(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await to(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=WP()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(fe._isFirebaseServerApp(this.app))return Promise.reject(Ke(this));const t=e?U.getModularInstance(e):null;return t&&B(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return fe._isFirebaseServerApp(this.app)?Promise.reject(Ke(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return fe._isFirebaseServerApp(this.app)?Promise.reject(Ke(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await uR(this),t=new hR(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new U.ErrorFactory("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await iR(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Mt(e)||this._popupRedirectResolver;B(t,this,"argument-error"),this.redirectPersistenceManager=await ii.create(this,[Mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(fe._isFirebaseServerApp(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&qP(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ve(n){return U.getModularInstance(n)}class _p{constructor(e){this.auth=e,this.observer=null,this.addObserver=U.createSubscribe(t=>this.observer=t)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let bo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function dR(n){bo=n}function kh(n){return bo.loadJS(n)}function fR(){return bo.recaptchaV2Script}function pR(){return bo.recaptchaEnterpriseScript}function mR(){return bo.gapiScript}function Ky(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const gR=500,_R=6e4,ra=1e12;class yR{constructor(e){this.auth=e,this.counter=ra,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new ER(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||ra;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||ra;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||ra;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class IR{constructor(){this.enterprise=new vR}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class vR{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ER{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;B(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=TR(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},_R)},gR))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function TR(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const wR="recaptcha-enterprise",Ms="NO_RECAPTCHA";class Hy{constructor(e){this.type=wR,this.auth=Ve(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{Oy(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new Vy(u);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){const u=window.grecaptcha;fp(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(Ms)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new IR().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&fp(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=pR();u.length!==0&&(u+=c),kh(u).then(()=>{i(c,s,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function Is(n,e,t,r=!1,i=!1){const s=new Hy(n);let o;if(i)o=Ms;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Dn(n,e,t,r,i){var s,o;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const c=await Is(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Is(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((o=n._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("PHONE_PROVIDER")){const c=await Is(n,e,t);return r(n,c).catch(async u=>{var l;if(((l=n._getRecaptchaConfig())===null||l===void 0?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(u.code==="auth/missing-recaptcha-token"||u.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const d=await Is(n,e,t,!1,!0);return r(n,d)}return Promise.reject(u)})}else{const c=await Is(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function Qy(n){const e=Ve(n),t=await Oy(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Vy(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Hy(e).verify()}/**
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
 */function Jy(n,e){const t=fe._getProvider(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(U.deepEqual(s,e??{}))return i;at(i,"already-initialized")}return t.initialize({options:e})}function AR(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Mt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Yy(n,e,t){const r=Ve(n);B(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=Xy(e),{host:o,port:c}=bR(e),u=c===null?"":`:${c}`,l={url:`${s}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){B(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),B(U.deepEqual(l,r.config.emulator)&&U.deepEqual(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,U.isCloudWorkstation(o)?(U.pingServer(`${s}//${o}${u}`),U.updateEmulatorBanner("Auth",!0)):i||SR()}function Xy(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bR(n){const e=Xy(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:yp(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:yp(o)}}}function yp(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function SR(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class $i{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return xt("not implemented")}_getIdTokenResponse(e){return xt("not implemented")}_linkToIdToken(e,t){return xt("not implemented")}_getReauthenticationResolver(e){return xt("not implemented")}}/**
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
 */async function Zy(n,e){return Pe(n,"POST","/v1/accounts:resetPassword",Se(n,e))}async function PR(n,e){return Pe(n,"POST","/v1/accounts:update",e)}async function RR(n,e){return Pe(n,"POST","/v1/accounts:signUp",e)}async function CR(n,e){return Pe(n,"POST","/v1/accounts:update",Se(n,e))}/**
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
 */async function DR(n,e){return ln(n,"POST","/v1/accounts:signInWithPassword",Se(n,e))}async function Sc(n,e){return Pe(n,"POST","/v1/accounts:sendOobCode",Se(n,e))}async function kR(n,e){return Sc(n,e)}async function NR(n,e){return Sc(n,e)}async function VR(n,e){return Sc(n,e)}async function OR(n,e){return Sc(n,e)}/**
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
 */async function LR(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",Se(n,e))}async function xR(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",Se(n,e))}/**
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
 */class Ri extends $i{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Ri(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ri(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Dn(e,t,"signInWithPassword",DR,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return LR(e,{email:this._email,oobCode:this._password});default:at(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Dn(e,r,"signUpPassword",RR,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return xR(e,{idToken:t,email:this._email,oobCode:this._password});default:at(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function tn(n,e){return ln(n,"POST","/v1/accounts:signInWithIdp",Se(n,e))}/**
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
 */const MR="http://localhost";class $t extends $i{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new $t(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):at("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=wh.__rest(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new $t(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return tn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,tn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tn(e,t)}buildRequest(){const e={requestUri:MR,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=U.querystring(t)}return e}}/**
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
 */async function Ip(n,e){return Pe(n,"POST","/v1/accounts:sendVerificationCode",Se(n,e))}async function FR(n,e){return ln(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,e))}async function UR(n,e){const t=await ln(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,e));if(t.temporaryProof)throw ws(n,"account-exists-with-different-credential",t);return t}const BR={USER_NOT_FOUND:"user-not-found"};async function jR(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return ln(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,t),BR)}/**
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
 */class kn extends $i{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new kn({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new kn({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return FR(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return UR(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return jR(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new kn({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
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
 */function qR(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $R(n){const e=U.querystringDecode(U.extractQuerystring(n)).link,t=e?U.querystringDecode(U.extractQuerystring(e)).deep_link_id:null,r=U.querystringDecode(U.extractQuerystring(n)).deep_link_id;return(r?U.querystringDecode(U.extractQuerystring(r)).link:null)||r||t||e||n}class Wi{constructor(e){var t,r,i,s,o,c;const u=U.querystringDecode(U.extractQuerystring(e)),l=(t=u.apiKey)!==null&&t!==void 0?t:null,d=(r=u.oobCode)!==null&&r!==void 0?r:null,p=qR((i=u.mode)!==null&&i!==void 0?i:null);B(l&&d&&p,"argument-error"),this.apiKey=l,this.operation=p,this.code=d,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.lang)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=$R(e);try{return new Wi(t)}catch{return null}}}function WR(n){return Wi.parseLink(n)}/**
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
 */class Hn{constructor(){this.providerId=Hn.PROVIDER_ID}static credential(e,t){return Ri._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Wi.parseLink(t);return B(r,"argument-error"),Ri._fromEmailAndCode(e,r.code,r.tenantId)}}Hn.PROVIDER_ID="password";Hn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Hn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class hn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class zi extends hn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Fs extends zi{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return B("providerId"in t&&"signInMethod"in t,"argument-error"),$t._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return B(e.idToken||e.accessToken,"argument-error"),$t._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Fs.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Fs.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:c}=e;if(!r&&!i&&!t&&!s||!c)return null;try{return new Fs(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
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
 */class Kt extends zi{constructor(){super("facebook.com")}static credential(e){return $t._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kt.PROVIDER_ID="facebook.com";/**
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
 */class Ht extends zi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return $t._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ht.credential(t,r)}catch{return null}}}Ht.GOOGLE_SIGN_IN_METHOD="google.com";Ht.PROVIDER_ID="google.com";/**
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
 */class Qt extends zi{constructor(){super("github.com")}static credential(e){return $t._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qt.credential(e.oauthAccessToken)}catch{return null}}}Qt.GITHUB_SIGN_IN_METHOD="github.com";Qt.PROVIDER_ID="github.com";/**
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
 */const zR="http://localhost";class Ci extends $i{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return tn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,tn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tn(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new Ci(r,s)}static _create(e,t){return new Ci(e,t)}buildRequest(){return{requestUri:zR,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const GR="saml.";class ja extends hn{constructor(e){B(e.startsWith(GR),"argument-error"),super(e)}static credentialFromResult(e){return ja.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return ja.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Ci.fromJSON(e);return B(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return Ci._create(r,t)}catch{return null}}}/**
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
 */class Jt extends zi{constructor(){super("twitter.com")}static credential(e,t){return $t._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Jt.credential(t,r)}catch{return null}}}Jt.TWITTER_SIGN_IN_METHOD="twitter.com";Jt.PROVIDER_ID="twitter.com";/**
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
 */async function eI(n,e){return ln(n,"POST","/v1/accounts:signUp",Se(n,e))}/**
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
 */class Tt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await vt._fromIdTokenResponse(e,r,i),o=vp(r);return new Tt({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=vp(r);return new Tt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function vp(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function KR(n){var e;if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const t=Ve(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Tt({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await eI(t,{returnSecureToken:!0}),i=await Tt._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
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
 */class qa extends U.FirebaseError{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,qa.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new qa(e,t,r,i)}}function tI(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?qa._fromErrorAndOperation(n,s,e,r):s})}/**
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
 */function nI(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function HR(n,e){const t=U.getModularInstance(n);await Pc(!0,t,e);const{providerUserInfo:r}=await XP(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=nI(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Nh(n,e,t=!1){const r=await sn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Tt._forOperation(n,"link",r)}async function Pc(n,e,t){await to(e);const r=nI(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";B(r.has(t)===n,e.auth,i)}/**
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
 */async function rI(n,e,t=!1){const{auth:r}=n;if(fe._isFirebaseServerApp(r.app))return Promise.reject(Ke(r));const i="reauthenticate";try{const s=await sn(n,tI(r,i,e,n),t);B(s.idToken,r,"internal-error");const o=Ac(s.idToken);B(o,r,"internal-error");const{sub:c}=o;return B(n.uid===c,r,"user-mismatch"),Tt._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&at(r,"user-mismatch"),s}}/**
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
 */async function iI(n,e,t=!1){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r="signIn",i=await tI(n,r,e),s=await Tt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Rc(n,e){return iI(Ve(n),e)}async function sI(n,e){const t=U.getModularInstance(n);return await Pc(!1,t,e.providerId),Nh(t,e)}async function oI(n,e){return rI(U.getModularInstance(n),e)}/**
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
 */async function QR(n,e){return ln(n,"POST","/v1/accounts:signInWithCustomToken",Se(n,e))}/**
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
 */async function JR(n,e){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const t=Ve(n),r=await QR(t,{token:e,returnSecureToken:!0}),i=await Tt._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
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
 */class So{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Vh._fromServerResponse(e,t):"totpInfo"in t?Oh._fromServerResponse(e,t):at(e,"internal-error")}}class Vh extends So{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Vh(t)}}class Oh extends So{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Oh(t)}}/**
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
 */function Cc(n,e,t){var r;B(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),B(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),B(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(B(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(B(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function Lh(n){const e=Ve(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function YR(n,e,t){const r=Ve(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Cc(r,i,t),await Dn(r,i,"getOobCode",NR,"EMAIL_PASSWORD_PROVIDER")}async function XR(n,e,t){await Zy(U.getModularInstance(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lh(n),r})}async function ZR(n,e){await CR(U.getModularInstance(n),{oobCode:e})}async function aI(n,e){const t=U.getModularInstance(n),r=await Zy(t,{oobCode:e}),i=r.requestType;switch(B(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":B(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":B(r.mfaInfo,t,"internal-error");default:B(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=So._fromServerResponse(Ve(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function eC(n,e){const{data:t}=await aI(U.getModularInstance(n),e);return t.email}async function tC(n,e,t){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r=Ve(n),o=await Dn(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eI,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Lh(n),u}),c=await Tt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function nC(n,e,t){return fe._isFirebaseServerApp(n.app)?Promise.reject(Ke(n)):Rc(U.getModularInstance(n),Hn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lh(n),r})}/**
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
 */async function rC(n,e,t){const r=Ve(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,c){B(c.handleCodeInApp,r,"argument-error"),c&&Cc(r,o,c)}s(i,t),await Dn(r,i,"getOobCode",VR,"EMAIL_PASSWORD_PROVIDER")}function iC(n,e){const t=Wi.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function sC(n,e,t){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r=U.getModularInstance(n),i=Hn.credentialWithLink(e,t||eo());return B(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Rc(r,i)}/**
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
 */async function oC(n,e){return Pe(n,"POST","/v1/accounts:createAuthUri",Se(n,e))}/**
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
 */async function aC(n,e){const t=Sh()?eo():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await oC(U.getModularInstance(n),r);return i||[]}async function cC(n,e){const t=U.getModularInstance(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Cc(t.auth,i,e);const{email:s}=await kR(t.auth,i);s!==n.email&&await n.reload()}async function uC(n,e,t){const r=U.getModularInstance(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Cc(r.auth,s,t);const{email:o}=await OR(r.auth,s);o!==n.email&&await n.reload()}/**
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
 */async function lC(n,e){return Pe(n,"POST","/v1/accounts:update",e)}/**
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
 */async function hC(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=U.getModularInstance(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await sn(r,lC(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function dC(n,e){const t=U.getModularInstance(n);return fe._isFirebaseServerApp(t.auth.app)?Promise.reject(Ke(t.auth)):cI(t,e,null)}function fC(n,e){return cI(U.getModularInstance(n),null,e)}async function cI(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await sn(n,PR(r,s));await n._updateTokensIfNecessary(o,!0)}/**
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
 */function pC(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const o=(t=(e=Ac(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const c=o!=="anonymous"&&o!=="custom"?o:null;return new si(s,c)}}if(!r)return null;switch(r){case"facebook.com":return new mC(s,i);case"github.com":return new gC(s,i);case"google.com":return new _C(s,i);case"twitter.com":return new yC(s,i,n.screenName||null);case"custom":case"anonymous":return new si(s,null);default:return new si(s,r,i)}}class si{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class uI extends si{constructor(e,t,r,i){super(e,t,r),this.username=i}}class mC extends si{constructor(e,t){super(e,"facebook.com",t)}}class gC extends uI{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class _C extends si{constructor(e,t){super(e,"google.com",t)}}class yC extends uI{constructor(e,t,r){super(e,"twitter.com",t,r)}}function IC(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:pC(t)}/**
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
 */function vC(n,e){return U.getModularInstance(n).setPersistence(e)}function EC(n){return Qy(n)}async function TC(n,e){return Ve(n).validatePassword(e)}function lI(n,e,t,r){return U.getModularInstance(n).onIdTokenChanged(e,t,r)}function hI(n,e,t){return U.getModularInstance(n).beforeAuthStateChanged(e,t)}function wC(n,e,t,r){return U.getModularInstance(n).onAuthStateChanged(e,t,r)}function AC(n){U.getModularInstance(n).useDeviceLanguage()}function bC(n,e){return U.getModularInstance(n).updateCurrentUser(e)}function SC(n){return U.getModularInstance(n).signOut()}function PC(n,e){return Ve(n).revokeAccessToken(e)}async function RC(n){return U.getModularInstance(n).delete()}/**
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
 */class fr{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new fr("enroll",e,t)}static _fromMfaPendingCredential(e){return new fr("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,r;if(e!=null&&e.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return fr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return fr._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class xh{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=Ve(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(c=>So._fromServerResponse(r,c));B(i.mfaPendingCredential,r,"internal-error");const o=fr._fromMfaPendingCredential(i.mfaPendingCredential);return new xh(o,s,async c=>{const u=await c._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const l=Object.assign(Object.assign({},i),{idToken:u.idToken,refreshToken:u.refreshToken});switch(t.operationType){case"signIn":const d=await Tt._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(d.user),d;case"reauthenticate":return B(t.user,r,"internal-error"),Tt._forOperation(t.user,t.operationType,l);default:at(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function CC(n,e){var t;const r=U.getModularInstance(n),i=e;return B(e.customData.operationType,r,"argument-error"),B((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,r,"argument-error"),xh._fromError(r,i)}/**
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
 */function Ep(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:start",Se(n,e))}function DC(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",Se(n,e))}function kC(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:start",Se(n,e))}function NC(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",Se(n,e))}function VC(n,e){return Pe(n,"POST","/v2/accounts/mfaEnrollment:withdraw",Se(n,e))}class Mh{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>So._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Mh(e)}async getSession(){return fr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await sn(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await sn(this.user,VC(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const hu=new WeakMap;function OC(n){const e=U.getModularInstance(n);return hu.has(e)||hu.set(e,Mh._fromUser(e)),hu.get(e)}const $a="__sak";/**
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
 */class dI{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem($a,"1"),this.storage.removeItem($a),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const LC=1e3,xC=10;class fI extends dI{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);aR()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,xC):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},LC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}fI.type="LOCAL";const pI=fI;/**
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
 */const MC=1e3;function du(n){var e,t;const r=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp(`${r}=([^;]+)`);return(t=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}function fu(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}class mI{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=fu(e);if(window.cookieStore){const r=await window.cookieStore.get(t);return r==null?void 0:r.value}return du(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;const r=fu(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const r=fu(e);if(window.cookieStore){const c=l=>{const d=l.changed.find(m=>m.name===r);d&&t(d.value),l.deleted.find(m=>m.name===r)&&t(null)},u=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,u),window.cookieStore.addEventListener("change",c)}let i=du(r);const s=setInterval(()=>{const c=du(r);c!==i&&(t(c),i=c)},MC),o=()=>clearInterval(s);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){const r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}}mI.type="COOKIE";const FC=mI;/**
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
 */class gI extends dI{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gI.type="SESSION";const Fh=gI;/**
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
 */function UC(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Dc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Dc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async l=>l(t.origin,s)),u=await UC(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Dc.receivers=[];/**
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
 */function Po(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class BC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{const l=Po("",20);i.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(m.data.response);break;default:clearTimeout(d),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Fe(){return window}function jC(n){Fe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function Uh(){return typeof Fe().WorkerGlobalScope<"u"&&typeof Fe().importScripts=="function"}async function qC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $C(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function WC(){return Uh()?self:null}/**
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
 */const _I="firebaseLocalStorageDb",zC=1,Wa="firebaseLocalStorage",yI="fbase_key";class Ro{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function kc(n,e){return n.transaction([Wa],e?"readwrite":"readonly").objectStore(Wa)}function GC(){const n=indexedDB.deleteDatabase(_I);return new Ro(n).toPromise()}function nl(){const n=indexedDB.open(_I,zC);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Wa,{keyPath:yI})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Wa)?e(r):(r.close(),await GC(),e(await nl()))})})}async function Tp(n,e,t){const r=kc(n,!0).put({[yI]:e,value:t});return new Ro(r).toPromise()}async function KC(n,e){const t=kc(n,!1).get(e),r=await new Ro(t).toPromise();return r===void 0?null:r.value}function wp(n,e){const t=kc(n,!0).delete(e);return new Ro(t).toPromise()}const HC=800,QC=3;class II{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await nl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>QC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Uh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Dc._getInstance(WC()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await qC(),!this.activeServiceWorker)return;this.sender=new BC(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$C()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await nl();return await Tp(e,$a,"1"),await wp(e,$a),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Tp(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>KC(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wp(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=kc(i,!1).getAll();return new Ro(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),HC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}II.type="LOCAL";const vI=II;/**
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
 */function Ap(n,e){return Pe(n,"POST","/v2/accounts/mfaSignIn:start",Se(n,e))}function JC(n,e){return Pe(n,"POST","/v2/accounts/mfaSignIn:finalize",Se(n,e))}function YC(n,e){return Pe(n,"POST","/v2/accounts/mfaSignIn:finalize",Se(n,e))}/**
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
 */const pu=Ky("rcb"),XC=new Ao(3e4,6e4);class ZC{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Fe().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return B(e0(t),e,"argument-error"),this.shouldResolveImmediately(t)&&dp(Fe().grecaptcha)?Promise.resolve(Fe().grecaptcha):new Promise((r,i)=>{const s=Fe().setTimeout(()=>{i(st(e,"network-request-failed"))},XC.get());Fe()[pu]=()=>{Fe().clearTimeout(s),delete Fe()[pu];const c=Fe().grecaptcha;if(!c||!dp(c)){i(st(e,"internal-error"));return}const u=c.render;c.render=(l,d)=>{const p=u(l,d);return this.counter++,p},this.hostLanguage=t,r(c)};const o=`${fR()}?${U.querystring({onload:pu,render:"explicit",hl:t})}`;kh(o).catch(()=>{clearTimeout(s),i(st(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=Fe().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function e0(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class t0{async load(e){return new yR(e)}clearedOneInstance(){}}/**
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
 */const Us="recaptcha",n0={theme:"light",type:"image"};class r0{constructor(e,t,r=Object.assign({},n0)){this.parameters=r,this.type=Us,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Ve(e),this.isInvisible=this.parameters.size==="invisible",B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;B(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new t0:new ZC,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){B(!this.parameters.sitekey,this.auth,"argument-error"),B(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),B(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=Fe()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){B(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){B(Sh()&&!Uh(),this.auth,"internal-error"),await i0(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await JP(this.auth);B(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return B(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function i0(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class Bh{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=kn._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function s0(n,e,t){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r=Ve(n),i=await Nc(r,e,U.getModularInstance(t));return new Bh(i,s=>Rc(r,s))}async function o0(n,e,t){const r=U.getModularInstance(n);await Pc(!1,r,"phone");const i=await Nc(r.auth,e,U.getModularInstance(t));return new Bh(i,s=>sI(r,s))}async function a0(n,e,t){const r=U.getModularInstance(n);if(fe._isFirebaseServerApp(r.auth.app))return Promise.reject(Ke(r.auth));const i=await Nc(r.auth,e,U.getModularInstance(t));return new Bh(i,s=>oI(r,s))}async function Nc(n,e,t){var r;if(!n._getRecaptchaConfig())try{await Qy(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){B(s.type==="enroll",n,"internal-error");const o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Dn(n,o,"mfaSmsEnrollment",async(d,p)=>{if(p.phoneEnrollmentInfo.captchaResponse===Ms){B((t==null?void 0:t.type)===Us,d,"argument-error");const m=await mu(d,p,t);return Ep(d,m)}return Ep(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneSessionInfo.sessionInfo}else{B(s.type==="signin",n,"internal-error");const o=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;B(o,n,"missing-multi-factor-info");const c={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Dn(n,c,"mfaSmsSignIn",async(p,m)=>{if(m.phoneSignInInfo.captchaResponse===Ms){B((t==null?void 0:t.type)===Us,p,"argument-error");const y=await mu(p,m,t);return Ap(p,y)}return Ap(p,m)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Dn(n,s,"sendVerificationCode",async(l,d)=>{if(d.captchaResponse===Ms){B((t==null?void 0:t.type)===Us,l,"argument-error");const p=await mu(l,d,t);return Ip(l,p)}return Ip(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t==null||t._reset()}}async function c0(n,e){const t=U.getModularInstance(n);if(fe._isFirebaseServerApp(t.auth.app))return Promise.reject(Ke(t.auth));await Nh(t,e)}async function mu(n,e,t){B(t.type===Us,n,"argument-error");const r=await t.verify();B(typeof r=="string",n,"argument-error");const i=Object.assign({},e);if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
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
 */class _r{constructor(e){this.providerId=_r.PROVIDER_ID,this.auth=Ve(e)}verifyPhoneNumber(e,t){return Nc(this.auth,e,U.getModularInstance(t))}static credential(e,t){return kn._fromVerification(e,t)}static credentialFromResult(e){const t=e;return _r.credentialFromTaggedObject(t)}static credentialFromError(e){return _r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?kn._fromTokenResponse(t,r):null}}_r.PROVIDER_ID="phone";_r.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function Vr(n,e){return e?Mt(e):(B(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class jh extends $i{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function u0(n){return iI(n.auth,new jh(n),n.bypassAuthState)}function l0(n){const{auth:e,user:t}=n;return B(t,e,"internal-error"),rI(t,new jh(n),n.bypassAuthState)}async function h0(n){const{auth:e,user:t}=n;return B(t,e,"internal-error"),Nh(t,new jh(n),n.bypassAuthState)}/**
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
 */class EI{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return u0;case"linkViaPopup":case"linkViaRedirect":return h0;case"reauthViaPopup":case"reauthViaRedirect":return l0;default:at(this.auth,"internal-error")}}resolve(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const d0=new Ao(2e3,1e4);async function f0(n,e,t){if(fe._isFirebaseServerApp(n.app))return Promise.reject(st(n,"operation-not-supported-in-this-environment"));const r=Ve(n);qi(n,e,hn);const i=Vr(r,t);return new en(r,"signInViaPopup",e,i).executeNotNull()}async function p0(n,e,t){const r=U.getModularInstance(n);if(fe._isFirebaseServerApp(r.auth.app))return Promise.reject(st(r.auth,"operation-not-supported-in-this-environment"));qi(r.auth,e,hn);const i=Vr(r.auth,t);return new en(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function m0(n,e,t){const r=U.getModularInstance(n);qi(r.auth,e,hn);const i=Vr(r.auth,t);return new en(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class en extends EI{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,en.currentPopupAction&&en.currentPopupAction.cancel(),en.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){qt(this.filter.length===1,"Popup operations only handle one event");const e=Po();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(st(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(st(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,en.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(st(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,d0.get())};e()}}en.currentPopupAction=null;/**
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
 */const g0="pendingRedirect",Bs=new Map;class _0 extends EI{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Bs.get(this.auth._key());if(!e){try{const r=await y0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Bs.set(this.auth._key(),e)}return this.bypassAuthState||Bs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function y0(n,e){const t=AI(e),r=wI(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function qh(n,e){return wI(n)._set(AI(e),"true")}function I0(){Bs.clear()}function TI(n,e){Bs.set(n._key(),e)}function wI(n){return Mt(n._redirectPersistence)}function AI(n){return xs(g0,n.config.apiKey,n.name)}/**
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
 */function v0(n,e,t){return E0(n,e,t)}async function E0(n,e,t){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r=Ve(n);qi(n,e,hn),await r._initializationPromise;const i=Vr(r,t);return await qh(i,r),i._openRedirect(r,e,"signInViaRedirect")}function T0(n,e,t){return w0(n,e,t)}async function w0(n,e,t){const r=U.getModularInstance(n);if(qi(r.auth,e,hn),fe._isFirebaseServerApp(r.auth.app))return Promise.reject(Ke(r.auth));await r.auth._initializationPromise;const i=Vr(r.auth,t);await qh(i,r.auth);const s=await bI(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function A0(n,e,t){return b0(n,e,t)}async function b0(n,e,t){const r=U.getModularInstance(n);qi(r.auth,e,hn),await r.auth._initializationPromise;const i=Vr(r.auth,t);await Pc(!1,r,e.providerId),await qh(i,r.auth);const s=await bI(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function S0(n,e){return await Ve(n)._initializationPromise,$h(n,e,!1)}async function $h(n,e,t=!1){if(fe._isFirebaseServerApp(n.app))return Promise.reject(Ke(n));const r=Ve(n),i=Vr(r,e),o=await new _0(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function bI(n){const e=Po(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const P0=10*60*1e3;class SI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!R0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!PI(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(st(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=P0&&this.cachedEventUids.clear(),this.cachedEventUids.has(bp(e))}saveEventToCache(e){this.cachedEventUids.add(bp(e)),this.lastProcessedEventTime=Date.now()}}function bp(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function PI({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function R0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return PI(n);default:return!1}}/**
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
 */async function RI(n,e={}){return Pe(n,"GET","/v1/projects",e)}/**
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
 */const C0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,D0=/^https?/;async function k0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await RI(n);for(const t of e)try{if(N0(t))return}catch{}at(n,"unauthorized-domain")}function N0(n){const e=eo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!D0.test(t))return!1;if(C0.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const V0=new Ao(3e4,6e4);function Sp(){const n=Fe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function O0(n){return new Promise((e,t)=>{var r,i,s;function o(){Sp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Sp(),t(st(n,"network-request-failed"))},timeout:V0.get()})}if(!((i=(r=Fe().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Fe().gapi)===null||s===void 0)&&s.load)o();else{const c=Ky("iframefcb");return Fe()[c]=()=>{gapi.load?o():t(st(n,"network-request-failed"))},kh(`${mR()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ga=null,e})}let ga=null;function L0(n){return ga=ga||O0(n),ga}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const x0=new Ao(5e3,15e3),M0="__/auth/iframe",F0="emulator/auth/iframe",U0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},B0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function j0(n){const e=n.config;B(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ph(e,F0):`https://${n.config.authDomain}/${M0}`,r={apiKey:e.apiKey,appName:n.name,v:fe.SDK_VERSION},i=B0.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${U.querystring(r).slice(1)}`}async function q0(n){const e=await L0(n),t=Fe().gapi;return B(t,n,"internal-error"),e.open({where:document.body,url:j0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:U0,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=st(n,"network-request-failed"),c=Fe().setTimeout(()=>{s(o)},x0.get());function u(){Fe().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const $0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},W0=500,z0=600,G0="_blank",K0="http://localhost";class rl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function H0(n,e,t,r=W0,i=z0){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},$0),{width:r.toString(),height:i.toString(),top:s,left:o}),l=U.getUA().toLowerCase();t&&(c=jy(l)?G0:t),Uy(l)&&(e=e||K0,u.scrollbars="yes");const d=Object.entries(u).reduce((m,[y,R])=>`${m}${y}=${R},`,"");if(oR(l)&&c!=="_self")return Q0(e||"",c),new rl(null);const p=window.open(e||"",c,d);B(p,n,"popup-blocked");try{p.focus()}catch{}return new rl(p)}function Q0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const J0="__/auth/handler",Y0="emulator/auth/handler",X0=encodeURIComponent("fac");async function il(n,e,t,r,i,s){B(n.config.authDomain,n,"auth-domain-config-required"),B(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fe.SDK_VERSION,eventId:i};if(e instanceof hn){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",U.isEmpty(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(s||{}))o[d]=p}if(e instanceof zi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${X0}=${encodeURIComponent(u)}`:"";return`${Z0(n)}?${U.querystring(c).slice(1)}${l}`}function Z0({config:n}){return n.emulator?Ph(n,Y0):`https://${n.authDomain}/${J0}`}/**
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
 */const gu="webStorageSupport";class eD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fh,this._completeRedirectFn=$h,this._overrideRedirectResult=TI}async _openPopup(e,t,r,i){var s;qt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await il(e,t,r,eo(),i);return H0(e,o,Po())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await il(e,t,r,eo(),i);return jC(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(qt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await q0(e),r=new SI(e);return t.register("authEvent",i=>(B(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(gu,{type:gu},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[gu];o!==void 0&&t(!!o),at(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=k0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zy()||By()||bc()}}const CI=eD;class DI{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return xt("unexpected MultiFactorSessionType")}}}class Wh extends DI{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Wh(e)}_finalizeEnroll(e,t,r){return DC(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return JC(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class kI{constructor(){}static assertion(e){return Wh._fromCredential(e)}}kI.FACTOR_ID="phone";class NI{static assertionForEnrollment(e,t){return no._fromSecret(e,t)}static assertionForSignIn(e,t){return no._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const r=e;B(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await kC(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Vc._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}}NI.FACTOR_ID="totp";class no extends DI{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new no(t,void 0,e)}static _fromEnrollmentId(e,t){return new no(t,e)}async _finalizeEnroll(e,t,r){return B(typeof this.secret<"u",e,"argument-error"),NC(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){B(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return YC(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class Vc{constructor(e,t,r,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Vc(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ia(e)||ia(t))&&(i=!0),i&&(ia(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ia(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function ia(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var Pp="@firebase/auth",Rp="1.10.8";/**
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
 */class tD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function nD(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rD(n){fe._registerComponent(new lp.Component("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dh(n)},l=new Gy(r,i,s,u);return AR(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),fe._registerComponent(new lp.Component("auth-internal",e=>{const t=Ve(e.getProvider("auth").getImmediate());return(r=>new tD(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),fe.registerVersion(Pp,Rp,nD(n)),fe.registerVersion(Pp,Rp,"cjs2017")}/**
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
 */const iD=5*60,sD=U.getExperimentalSetting("authIdTokenMaxAge")||iD;let Cp=null;const oD=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>sD)return;const i=t==null?void 0:t.token;Cp!==i&&(Cp=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function aD(n=fe.getApp()){const e=fe._getProvider(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Jy(n,{popupRedirectResolver:CI,persistence:[vI,pI,Fh]}),r=U.getExperimentalSetting("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=oD(s.toString());hI(t,o,()=>o(t.currentUser)),lI(t,c=>o(c))}}const i=U.getDefaultEmulatorHost("auth");return i&&Yy(t,`http://${i}`),t}function cD(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}dR({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=st("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",cD().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rD("Browser");O.AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY=jP;O.ActionCodeOperation=FP;O.ActionCodeURL=Wi;O.AuthCredential=$i;O.AuthEventManager=SI;O.AuthImpl=Gy;O.AuthPopup=rl;O.EmailAuthCredential=Ri;O.EmailAuthProvider=Hn;O.FacebookAuthProvider=Kt;O.FactorId=OP;O.FetchProvider=Rh;O.GithubAuthProvider=Qt;O.GoogleAuthProvider=Ht;O.OAuthCredential=$t;O.OAuthProvider=Fs;O.OperationType=MP;O.PhoneAuthCredential=kn;O.PhoneAuthProvider=_r;O.PhoneMultiFactorGenerator=kI;O.ProviderId=LP;O.RecaptchaVerifier=r0;O.SAMLAuthCredential=Ci;O.SAMLAuthProvider=ja;O.SignInMethod=xP;O.TotpMultiFactorGenerator=NI;O.TotpSecret=Vc;O.TwitterAuthProvider=Jt;O.UserImpl=vt;O._assert=B;O._castAuth=Ve;O._clearRedirectOutcomes=I0;O._createError=st;O._fail=at;O._generateEventId=Po;O._getClientVersion=Dh;O._getInstance=Mt;O._getProjectConfig=RI;O._getRedirectResult=$h;O._getRedirectUrl=il;O._isAndroid=Ch;O._isIOS=bc;O._isIOS7Or8=sR;O._overrideRedirectResult=TI;O._persistenceKeyName=xs;O.applyActionCode=ZR;O.beforeAuthStateChanged=hI;O.browserCookiePersistence=FC;O.browserLocalPersistence=pI;O.browserPopupRedirectResolver=CI;O.browserSessionPersistence=Fh;O.checkActionCode=aI;O.confirmPasswordReset=XR;O.connectAuthEmulator=Yy;O.createUserWithEmailAndPassword=tC;O.debugAssert=qt;O.debugErrorMap=BP;O.deleteUser=RC;O.fetchSignInMethodsForEmail=aC;O.getAdditionalUserInfo=IC;O.getAuth=aD;O.getIdToken=ZP;O.getIdTokenResult=Ly;O.getMultiFactorResolver=CC;O.getRedirectResult=S0;O.inMemoryPersistence=tl;O.indexedDBLocalPersistence=vI;O.initializeAuth=Jy;O.initializeRecaptchaConfig=EC;O.isSignInWithEmailLink=iC;O.linkWithCredential=sI;O.linkWithPhoneNumber=o0;O.linkWithPopup=m0;O.linkWithRedirect=A0;O.multiFactor=OC;O.onAuthStateChanged=wC;O.onIdTokenChanged=lI;O.parseActionCodeURL=WR;O.prodErrorMap=Cy;O.reauthenticateWithCredential=oI;O.reauthenticateWithPhoneNumber=a0;O.reauthenticateWithPopup=p0;O.reauthenticateWithRedirect=T0;O.reload=xy;O.revokeAccessToken=PC;O.sendEmailVerification=cC;O.sendPasswordResetEmail=YR;O.sendSignInLinkToEmail=rC;O.setPersistence=vC;O.signInAnonymously=KR;O.signInWithCredential=Rc;O.signInWithCustomToken=JR;O.signInWithEmailAndPassword=nC;O.signInWithEmailLink=sC;O.signInWithPhoneNumber=s0;O.signInWithPopup=f0;O.signInWithRedirect=v0;O.signOut=SC;O.unlink=HR;O.updateCurrentUser=bC;O.updateEmail=dC;O.updatePassword=fC;O.updatePhoneNumber=c0;O.updateProfile=hC;O.useDeviceLanguage=AC;O.validatePassword=TC;O.verifyBeforeUpdateEmail=uC;O.verifyPasswordResetCode=eC;Object.defineProperty(j,"__esModule",{value:!0});var q=O;j.ActionCodeOperation=q.ActionCodeOperation;j.ActionCodeURL=q.ActionCodeURL;j.AuthCredential=q.AuthCredential;j.AuthErrorCodes=q.AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY;j.EmailAuthCredential=q.EmailAuthCredential;j.EmailAuthProvider=q.EmailAuthProvider;j.FacebookAuthProvider=q.FacebookAuthProvider;j.FactorId=q.FactorId;j.GithubAuthProvider=q.GithubAuthProvider;j.GoogleAuthProvider=q.GoogleAuthProvider;j.OAuthCredential=q.OAuthCredential;j.OAuthProvider=q.OAuthProvider;j.OperationType=q.OperationType;j.PhoneAuthCredential=q.PhoneAuthCredential;j.PhoneAuthProvider=q.PhoneAuthProvider;j.PhoneMultiFactorGenerator=q.PhoneMultiFactorGenerator;j.ProviderId=q.ProviderId;j.RecaptchaVerifier=q.RecaptchaVerifier;j.SAMLAuthProvider=q.SAMLAuthProvider;j.SignInMethod=q.SignInMethod;j.TotpMultiFactorGenerator=q.TotpMultiFactorGenerator;j.TotpSecret=q.TotpSecret;j.TwitterAuthProvider=q.TwitterAuthProvider;j.applyActionCode=q.applyActionCode;j.beforeAuthStateChanged=q.beforeAuthStateChanged;j.browserCookiePersistence=q.browserCookiePersistence;j.browserLocalPersistence=q.browserLocalPersistence;j.browserPopupRedirectResolver=q.browserPopupRedirectResolver;j.browserSessionPersistence=q.browserSessionPersistence;j.checkActionCode=q.checkActionCode;j.confirmPasswordReset=q.confirmPasswordReset;j.connectAuthEmulator=q.connectAuthEmulator;j.createUserWithEmailAndPassword=q.createUserWithEmailAndPassword;j.debugErrorMap=q.debugErrorMap;j.deleteUser=q.deleteUser;j.fetchSignInMethodsForEmail=q.fetchSignInMethodsForEmail;j.getAdditionalUserInfo=q.getAdditionalUserInfo;j.getAuth=q.getAuth;j.getIdToken=q.getIdToken;j.getIdTokenResult=q.getIdTokenResult;j.getMultiFactorResolver=q.getMultiFactorResolver;j.getRedirectResult=q.getRedirectResult;j.inMemoryPersistence=q.inMemoryPersistence;j.indexedDBLocalPersistence=q.indexedDBLocalPersistence;j.initializeAuth=q.initializeAuth;j.initializeRecaptchaConfig=q.initializeRecaptchaConfig;j.isSignInWithEmailLink=q.isSignInWithEmailLink;j.linkWithCredential=q.linkWithCredential;j.linkWithPhoneNumber=q.linkWithPhoneNumber;j.linkWithPopup=q.linkWithPopup;j.linkWithRedirect=q.linkWithRedirect;j.multiFactor=q.multiFactor;j.onAuthStateChanged=q.onAuthStateChanged;j.onIdTokenChanged=q.onIdTokenChanged;j.parseActionCodeURL=q.parseActionCodeURL;j.prodErrorMap=q.prodErrorMap;j.reauthenticateWithCredential=q.reauthenticateWithCredential;j.reauthenticateWithPhoneNumber=q.reauthenticateWithPhoneNumber;j.reauthenticateWithPopup=q.reauthenticateWithPopup;j.reauthenticateWithRedirect=q.reauthenticateWithRedirect;j.reload=q.reload;j.revokeAccessToken=q.revokeAccessToken;j.sendEmailVerification=q.sendEmailVerification;j.sendPasswordResetEmail=q.sendPasswordResetEmail;j.sendSignInLinkToEmail=q.sendSignInLinkToEmail;j.setPersistence=q.setPersistence;j.signInAnonymously=q.signInAnonymously;j.signInWithCredential=q.signInWithCredential;j.signInWithCustomToken=q.signInWithCustomToken;j.signInWithEmailAndPassword=q.signInWithEmailAndPassword;j.signInWithEmailLink=q.signInWithEmailLink;j.signInWithPhoneNumber=q.signInWithPhoneNumber;j.signInWithPopup=q.signInWithPopup;j.signInWithRedirect=q.signInWithRedirect;j.signOut=q.signOut;j.unlink=q.unlink;j.updateCurrentUser=q.updateCurrentUser;j.updateEmail=q.updateEmail;j.updatePassword=q.updatePassword;j.updatePhoneNumber=q.updatePhoneNumber;j.updateProfile=q.updateProfile;j.useDeviceLanguage=q.useDeviceLanguage;j.validatePassword=q.validatePassword;j.verifyBeforeUpdateEmail=q.verifyBeforeUpdateEmail;j.verifyPasswordResetCode=q.verifyPasswordResetCode;(function(n){Object.defineProperty(n,"__esModule",{value:!0});var e=j;Object.keys(e).forEach(function(t){t!=="default"&&!n.hasOwnProperty(t)&&Object.defineProperty(n,t,{enumerable:!0,get:function(){return e[t]}})})})(RP);export{Ka as a,za as b,Pr as c,OT as d,RP as e,ev as f,PP as g,H as i,VP as r};
