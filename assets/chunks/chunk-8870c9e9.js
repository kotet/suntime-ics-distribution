function $e(){return!(typeof process>"u"||!process.cwd||!process.versions||typeof process.versions.node>"u"||!process.release||process.release.name!=="node")}function V(e,t){let n;{var r=Error.stackTraceLimit;Error.stackTraceLimit=1/0,n=new Error(e),Error.stackTraceLimit=r}return $e()&&(n.stack=we(n.stack,t)),n}function we(e,t){if(!e)return e;const n=ve(e);let r=0;return n.filter(s=>s.includes(" (internal/")||s.includes(" (node:internal")?!1:r<t&&Se(s)?(r++,!1):!0).join(`
`)}function Se(e){return e.startsWith("    at ")}function ve(e){return e.split(/\r?\n/)}function I(e,t){const n=globalThis.__vite_plugin_ssr=globalThis.__vite_plugin_ssr||{};return n[e]=n[e]||t}function w(e){return typeof e=="object"&&e!==null}function U(e){return Array.from(new Set(e))}const $=I("assertPackageInstances.ts",{instances:[],alreadyLogged:new Set}),ie="The client runtime of Server Routing as well as the client runtime of Client Routing are both being loaded. Make sure they aren't loaded both at the same time for a given page. See https://vite-plugin-ssr.com/client-runtimes-conflict",B="Two vite-plugin-ssr client runtime instances are being loaded. Make sure your client-side bundles don't include vite-plugin-ssr twice. (In order to reduce the size of your client-side JavaScript bundles.)";function H(){{const e=U($.instances);Re(e.length<=1,`Both vite-plugin-ssr@${e[0]} and vite-plugin-ssr@${e[1]} loaded. Only one version should be loaded.`)}$.checkSingleInstance&&$.instances.length>1&&_(!1,B,{onlyOnce:!0,showStackTrace:!0})}function Bt(e){_($.isClientRouting!==!0,ie,{onlyOnce:!0,showStackTrace:!0}),_($.isClientRouting===void 0,B,{onlyOnce:!0,showStackTrace:!0}),$.isClientRouting=!1,e&&($.checkSingleInstance=!0),H()}function Ht(e){_($.isClientRouting!==!1,ie,{onlyOnce:!0,showStackTrace:!0}),_($.isClientRouting===void 0,B,{onlyOnce:!0,showStackTrace:!0}),$.isClientRouting=!0,e&&($.checkSingleInstance=!0),H()}function be(e){$.instances.push(e),H()}function Re(e,t){if(e)return;const n=`[vite-plugin-ssr][Wrong Usage] ${t}`;throw new Error(n)}function _(e,t,{onlyOnce:n,showStackTrace:r}){if(e)return;const i=`[vite-plugin-ssr][Warning] ${t}`;if(n){const{alreadyLogged:s}=$,a=n===!0?i:n;if(s.has(a))return;s.add(a)}console.warn(r?new Error(i):i)}const Pe="0.4.142",P={projectName:"vite-plugin-ssr",projectVersion:Pe,npmPackageName:"vite-plugin-ssr",githubRepository:"https://github.com/brillout/vite-plugin-ssr"};be(P.projectVersion);const p=new Proxy({},{get:(e,t)=>n=>t==="code"?`\`${n}\``:t==="string"?`'${n}'`:n}),y=I("utils/assert.ts",{alreadyLogged:new Set,logger(e,t){t==="info"?console.log(e):console.warn(e)},showStackTraceList:new WeakSet}),Te=`[${P.npmPackageName}]`,xe=`[${P.npmPackageName}@${P.projectVersion}]`,G=2;function o(e,t){var a;if(e)return;const n=(()=>{if(!t)return null;const l=typeof t=="string"?t:JSON.stringify(t);return p.dim(`Debug info (for ${P.projectName} maintainers; you can ignore this): ${l}`)})(),r=`${P.githubRepository}/issues/new`;let i=[`You stumbled upon a bug in ${P.projectName}'s source code.`,`Go to ${p.blue(r)} and copy-paste this error; a maintainer will fix the bug (usually under 24 hours).`,n].filter(Boolean).join(" ");i=L(i),i=W(i,"Bug"),i=j(i,!0);const s=V(i,G);throw(a=y.onBeforeLog)==null||a.call(y),s}function h(e,t,{showStackTrace:n}={}){var i;if(e)return;t=L(t),t=W(t,"Wrong Usage"),t=j(t);const r=V(t,G);throw n&&y.showStackTraceList.add(r),(i=y.onBeforeLog)==null||i.call(y),r}function Ie(e){return e=L(e),e=W(e,"Error"),e=j(e),V(e,G)}function T(e,t,{onlyOnce:n,showStackTrace:r}){var i;if(!e){if(t=L(t),t=W(t,"Warning"),t=j(t),n){const{alreadyLogged:s}=y,a=n===!0?t:n;if(s.has(a))return;s.add(a)}if((i=y.onBeforeLog)==null||i.call(y),r){const s=new Error(t);y.showStackTraceList.add(s),y.logger(s,"warn")}else y.logger(t,"warn")}}function Gt(e,t,{onlyOnce:n}){var r;if(!e){if(t=L(t),t=j(t),n){const{alreadyLogged:i}=y,s=t;if(i.has(s))return;i.add(s)}(r=y.onBeforeLog)==null||r.call(y),y.logger(t,"info")}}function W(e,t){let n=`[${t}]`;const r=t==="Warning"?"yellow":"red";return n=p.bold(p[r](n)),`${n}${e}`}function L(e){return e.startsWith("[")?e:` ${e}`}function j(e,t=!1){return`${t?xe:Te}${e}`}function M(){return typeof window<"u"&&typeof window.scrollY=="number"}const O=I("utils/assertRouterType.ts",{});function Mt(){se(_e()),O.isClientRouting=!0}function _e(){return O.isClientRouting!==!1}function Jt(){se(O.isClientRouting!==!0),O.isClientRouting=!1}function se(e){h(M(),`${p.cyan("import { something } from 'vite-plugin-ssr/client/router'")} is forbidden on the server-side`,{showStackTrace:!0}),T(e,"You shouldn't `import { something } from 'vite-plugin-ssr/client/router'` when using Server Routing. The 'vite-plugin-ssr/client/router' utilities work only with Client Routing. In particular, don't `import { navigate }` nor `import { prefetch }` as they unnecessarily bloat your client-side bundle sizes.",{showStackTrace:!0,onlyOnce:!0})}const Le=["js","ts","cjs","cts","mjs","mts","jsx","tsx","cjsx","ctsx","mjsx","mtsx"],oe=["vue","svelte","marko","md","mdx"],je=[...Le,...oe];function ae(e){const t=je.some(n=>e.endsWith("."+n));return o(!Ce(e)||t),t}function Ce(e){return/\.(c|m)?(j|t)sx?$/.test(e)}function Oe(e){return oe.some(t=>e.endsWith("."+t))}function k(e,t,n){return typeof e=="string"?K(e.split(""),t,n).join(""):K(e,t,n)}function K(e,t,n){const r=[];let i=t>=0?t:e.length+t;o(i>=0&&i<=e.length);let s=n>=0?n:e.length+n;for(o(s>=0&&s<=e.length);!(i===s||(i===e.length&&(i=0),i===s));){const a=e[i];o(a!==void 0),r.push(a),i++}return r}const le=["http://","https://","tauri://"];function ce(e){return le.some(t=>e.startsWith(t))||e.startsWith("/")||e.startsWith(".")||e.startsWith("?")||e.startsWith("#")||e===""}function Yt(e,t){o(t.includes(" but ")),h(typeof e=="string",`${t} should be a string`),!ce(e)&&(!e.startsWith("/")&&!e.includes(":")?h(!1,`${t} is ${p.cyan(e)} and it should be /${p.cyan(e)} instead (URL pathnames should start with a leading slash)`):h(!1,`${t} isn't a valid URL`))}function ke(e,t){o(ce(e)),o(t.startsWith("/"));const[n,...r]=e.split("#");o(n!==void 0);const i=["",...r].join("#")||null;o(i===null||i.startsWith("#"));const s=i===null?"":D(i.slice(1)),[a,...l]=n.split("?");o(a!==void 0);const c=["",...l].join("?")||null;o(c===null||c.startsWith("?"));const u={},g={};Array.from(new URLSearchParams(c||"")).forEach(([b,q])=>{u[b]=q,g[b]=[...g[b]||[],q]});const{origin:f,pathname:S}=We(a,t);o(f===null||f===D(f)),o(S.startsWith("/")),o(f===null||e.startsWith(f));const d=a.slice((f||"").length);Ve(e,f,d,c,i);let{pathname:E,hasBaseServer:v}=Ne(S,t);return E=Fe(E),o(E.startsWith("/")),{origin:f,pathname:E,pathnameOriginal:d,hasBaseServer:v,search:u,searchAll:g,searchOriginal:c,hash:s,hashOriginal:i}}function D(e){try{return decodeURIComponent(e)}catch{}try{return decodeURI(e)}catch{}return e}function Fe(e){return e=e.split("/").map(t=>D(t).split("/").join("%2F")).join("/"),e=e.replace(/\s/g,""),e}function We(e,t){var n;{const{origin:r,pathname:i}=Q(e);if(r)return{origin:r,pathname:i};o(i===e)}if(e.startsWith("/"))return{origin:null,pathname:e};{const r=typeof window<"u"&&((n=window==null?void 0:window.document)==null?void 0:n.baseURI)||t,i=Ae(e,r);return Q(i)}}function Q(e){if(le.some(t=>e.startsWith(t))){const[t,n,r,...i]=e.split("/"),s=[t,n,r].join("/"),a=["",...i].join("/")||"/";return{origin:s,pathname:a}}else return{pathname:e,origin:null}}function Ae(e,t){const n=t.split("/"),r=e.split("/");let i=t.endsWith("/");e.startsWith(".")&&n.pop();for(const a in r){const l=r[a];l==""&&a==="0"||l!="."&&(l==".."?n.pop():(i=!1,n.push(l)))}let s=n.join("/");return i&&!s.endsWith("/")&&(s+="/"),s}function De(e){o(e.startsWith("/")),o(!e.includes("?")),o(!e.includes("#"))}function Ne(e,t){De(e),o(ze(t));let n=e;if(o(n.startsWith("/")),o(t.startsWith("/")),t==="/")return{pathname:e,hasBaseServer:!0};let r=t;return t.endsWith("/")&&n===k(t,0,-1)&&(r=k(t,0,-1),o(n===r)),n.startsWith(r)?(o(n.startsWith("/")||n.startsWith("http")),o(n.startsWith(r)),n=n.slice(r.length),n.startsWith("/")||(n="/"+n),o(n.startsWith("/")),{pathname:n,hasBaseServer:!0}):{pathname:e,hasBaseServer:!1}}function ze(e){return e.startsWith("/")}function Ve(e,t,n,r,i){const s=Ue(t,n,r,i);o(e===s)}function Ue(e,t,n,r){return`${e||""}${t}${n||""}${r||""}`}function J(e,t){Object.defineProperties(e,Object.getOwnPropertyDescriptors(t))}function Y(e){return e instanceof Function||typeof e=="function"}function qt(e){return(t,n)=>{const r=e(t),i=e(n);return r===i?0:r>i?-1:1}}function Be(e){return(t,n)=>{const r=e(t),i=e(n);if(o([!0,!1,null].includes(r)),o([!0,!1,null].includes(i)),r===i)return 0;if(r===!0||i===!1)return-1;if(i===!0||r===!1)return 1;o(!1)}}function He(e){return Be(t=>{const n=e(t);return n===null?null:!n})}function m(e,t,n="unknown"){if(!w(e))return!1;if(!(t in e))return n==="undefined";if(n==="unknown")return!0;const r=e[t];return n==="array"?Array.isArray(r):n==="object"?w(r):n==="string[]"?Array.isArray(r)&&r.every(i=>typeof i=="string"):n==="function"?Y(r):Array.isArray(n)?typeof r=="string"&&n.includes(r):n==="null"?r===null:n==="undefined"?r===void 0:n==="true"?r===!0:n==="false"?r===!1:typeof r===n}function Ge(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0}const Me=e=>e!=null;function ue(e){const t=n=>`Not a posix path: ${n}`;o(e!==null,t("null")),o(typeof e=="string",t(`typeof path === ${JSON.stringify(typeof e)}`)),o(e!=="",t("(empty string)")),o(e),o(!e.includes("\\"),t(e))}const Je=["$$registrations","_rerender_only"],Ye=[".md",".mdx"];function qe(e,t){Ke(e,t,!0)}function Ke(e,t,n){const i=Object.keys(e).filter(l=>!Je.includes(l)),s=i.filter(l=>l!=="default"),a=i.includes("default");if(s.length===0){if(a)return;o(i.length===0),h(!1,`${t} doesn't export any value, but it should have a ${p.cyan("export default")} instead`)}else if(!Ye.some(l=>t.endsWith(l)))if(n)s.forEach(l=>{T(s.length===0,`${t} should only have a default export: move ${p.cyan(`export { ${l} }`)} to +config.h.js or its own +${s}.js`,{onlyOnce:!0})});else{const l=s.join(", ");T(s.length===0,`${t} replace ${p.cyan(`export { ${l} }`)} with ${p.cyan(`export default { ${l} }`)}`,{onlyOnce:!0})}}function Qe(e){return[null,void 0].includes(e)?String(e):["undefined","boolean","number","string"].includes(typeof e)?JSON.stringify(e):null}const Xe=["clientRouting"];function Ze(e){Xe.forEach(t=>{if(o(e.fileExports),!(t in e.fileExports))return;const n=`The value of \`${t}\` is only allowed to be \`true\`.`;h(e.fileExports[t]!==!1,`${e.filePath} has \`export { ${t} }\` with the value \`false\` which is prohibited: remove \`export { ${t} }\` instead. (${n})`),h(e.fileExports[t]===!0,`${e.filePath} has \`export { ${t} }\` with a forbidden value. ${n}`)})}const fe=["render","clientRouting","prerender","doNotPrerender"];function et(e,t){h(!fe.includes(e),`${t} has \`export default { ${e} }\` which is prohibited, use \`export { ${e} }\` instead.`)}function tt(e){let t="",n="",[r,...i]=e;return r?r==="*"?(o(i.length===0),"export *"):(r==="default"?t="export default":(t="export",i=[r,...i]),i.forEach(a=>{t=`${t} { ${a}`,n=` }${n}`}),t+n):null}function Kt(e,t,n){const r=de(e,t);if(r===null)return null;const{value:i,definedAtInfo:s}=r;return n&&nt(i,n,t,s),{value:i}}function Qt(e,t){const n=de(e,t);o(n);const{definedAtInfo:r}=n;return o(r),r}function de(e,t){const n=e.configValues[t];if(!n)return null;const{value:r,definedAtInfo:i}=n;return r===null?null:{value:r,definedAtInfo:i}}function Xt(e,t){const n=t.find(r=>r.pageId===e);return o(t.length>0),o(n),n}function nt(e,t,n,r){o(e!==null);const i=typeof e;if(i===t)return;const s=Qe(e),a=s!==null?`value ${p.cyan(s)}`:`type ${p.cyan(i)}`,l=ge(n,{definedAtInfo:r},!0);h(!1,`${l} has an invalid ${a}: is should be a ${p.cyan(t)} instead`)}function ge(e,{definedAtInfo:t},n,r){let i=`${n?"Config":"config"} ${p.cyan(e)}`;return t!==null&&(i=`${i} defined at ${rt(t,r)}`),i}function rt(e,t){const{filePath:n,fileExportPath:r}=e;let i=n;const s=tt(r);return s&&(i=`${i} > ${p.cyan(s)}`),t&&(i=`${i} > (${p.blue(t)})`),i}function it(e,t){const n={},r={},i={};e.forEach(l=>{st(l).forEach(({exportName:u,exportValue:g,isFromDefaultExport:f})=>{o(u!=="default"),i[u]=i[u]??[],i[u].push({exportValue:g,exportSource:`${l.filePath} > ${f?`\`export default { ${u} }\``:`\`export { ${u} }\``}`,filePath:l.filePath,_filePath:l.filePath,_fileType:l.fileType,_isFromDefaultExport:f})})}),t&&Object.entries(t.configValues).forEach(([l,c])=>{const{value:u,definedAtInfo:g}=c;let f=null;g&&(f=g.filePath);const S=ge(l,c,!0);r[l]=r[l]??u,n[l]=n[l]??[],o(n[l].length===0),n[l].push({configValue:u,configDefinedAt:S,configDefinedByFile:f});const d=l;i[d]=i[d]??[],i[d].push({exportValue:u,exportSource:S,filePath:f,_filePath:f,_fileType:null,_isFromDefaultExport:null})});const s=ot(),a={};return Object.entries(i).forEach(([l,c])=>{c.forEach(({exportValue:u,_fileType:g,_isFromDefaultExport:f})=>{a[l]=a[l]??u,g===".page"&&!f&&(l in s||(s[l]=u))})}),o(!("default"in a)),o(!("default"in i)),{config:r,configEntries:n,exports:a,exportsAll:i,pageExports:s}}function st(e){const{filePath:t,fileExports:n}=e;o(n),o(ae(t));const r=[];return Object.entries(n).sort(He(([i])=>i==="default")).forEach(([i,s])=>{let a=i==="default";if(a)if(Oe(t))i="Page";else{h(w(s),`The ${p.cyan("export default")} of ${t} should be an object.`),Object.entries(s).forEach(([l,c])=>{et(l,t),r.push({exportName:l,exportValue:c,isFromDefaultExport:a})});return}r.push({exportName:i,exportValue:s,isFromDefaultExport:a})}),r.forEach(({exportName:i,isFromDefaultExport:s})=>{o(!(s&&fe.includes(i)))}),r}function ot(){return new Proxy({},{get(...e){return M()||T(!1,"`pageContext.pageExports` is outdated. Use `pageContext.exports` instead, see https://vite-plugin-ssr.com/exports",{onlyOnce:!0,showStackTrace:!0}),Reflect.get(...e)}})}function at(e){const t=".page.",n=k(e.split(t),0,-1).join(t);return o(!n.includes("\\")),n}function x(e){ue(e)}function Zt(e,t){if(t.length>0){const r=t.filter(i=>i.isErrorPage);return r.length===0?null:(h(r.length===1,"Only one error page can be defined"),r[0].pageId)}const n=U(e.map(({pageId:r})=>r).filter(r=>A(r)));if(h(n.length<=1,`Only one _error.page.js is allowed, but found several: ${n.join(" ")}`),n.length>0){const r=n[0];return o(r),r}return null}function A(e,t){return o(!e.includes("\\")),e.includes("/_error")}function lt(e,t){if(t.length>0){const n=t.find(r=>r.pageId===e);return o(n),n.isErrorPage}else return A(e)}const ct=[".page",".page.server",".page.route",".page.client",".css"];function ut(e){if(ue(e),e.endsWith(".css"))return".css";o(ae(e),e);const n=e.split("/").slice(-1)[0].split("."),r=n.slice(-3)[0],i=n.slice(-2)[0];if(i==="page")return".page";if(o(r==="page",e),i==="server")return".page.server";if(i==="client")return".page.client";if(i==="route")return".page.route";o(!1,e)}function he(e){const t=s=>i.pageId===s||i.isDefaultPageFile&&(X(i.filePath)||ft(s,i.filePath)),n=ut(e),i={filePath:e,fileType:n,isEnv:s=>{if(o(n!==".page.route"),s==="CLIENT_ONLY")return n===".page.client"||n===".css";if(s==="SERVER_ONLY")return n===".page.server";if(s==="CLIENT_AND_SERVER")return n===".page";o(!1)},isRelevant:t,isDefaultPageFile:N(e),isRendererPageFile:n!==".css"&&N(e)&&X(e),isErrorPageFile:A(e),pageId:at(e)};return i}function N(e){return x(e),A(e)?!1:e.includes("/_default")}function X(e){return x(e),e.includes("/renderer/")}function ft(e,t){x(e),x(t),o(!e.endsWith("/")),o(!t.endsWith("/")),o(N(t));const n=k(t.split("/"),0,-1).filter(r=>r!=="_default").join("/");return e.startsWith(n)}function dt(e){o(Array.isArray(e)),e.forEach(t=>{o(w(t)),o(m(t,"pageId","string")),o(m(t,"routeFilesystem"))})}function gt(e){o(e),o(m(e,"onBeforeRoute")),o(m(e,"onPrerenderStart"))}function ht(e){o(m(e,"isGeneratedFile")),o(e.isGeneratedFile!==!1,"vite-plugin-ssr was re-installed(/re-built). Restart your app."),o(e.isGeneratedFile===!0,`\`isGeneratedFile === ${e.isGeneratedFile}\``),o(m(e,"pageFilesLazy","object")),o(m(e,"pageFilesEager","object")),o(m(e,"pageFilesExportNamesLazy","object")),o(m(e,"pageFilesExportNamesEager","object")),o(m(e.pageFilesLazy,".page")),o(m(e.pageFilesLazy,".page.client")||m(e.pageFilesLazy,".page.server")),o(m(e,"pageFilesList","string[]")),o(m(e,"pageConfigs")),o(m(e,"pageConfigGlobal"));const{pageConfigs:t,pageConfigGlobal:n}=e;dt(t),gt(n);const r={};C(e.pageFilesLazy).forEach(({filePath:s,pageFile:a,globValue:l})=>{a=r[s]=r[s]??a;const c=l;Z(c),a.loadFile=async()=>{"fileExports"in a||(a.fileExports=await c(),Ze(a))}}),C(e.pageFilesExportNamesLazy).forEach(({filePath:s,pageFile:a,globValue:l})=>{a=r[s]=r[s]??a;const c=l;Z(c),a.loadExportNames=async()=>{if(!("exportNames"in a)){const u=await c();h("exportNames"in u,"You seem to be using Vite 2 but the latest vite-plugin-ssr versions only work with Vite 3"),o(m(u,"exportNames","string[]"),a.filePath),a.exportNames=u.exportNames}}}),C(e.pageFilesEager).forEach(({filePath:s,pageFile:a,globValue:l})=>{a=r[s]=r[s]??a;const c=l;o(w(c)),a.fileExports=c}),C(e.pageFilesExportNamesEager).forEach(({filePath:s,pageFile:a,globValue:l})=>{a=r[s]=r[s]??a;const c=l;o(w(c)),o(m(c,"exportNames","string[]"),a.filePath),a.exportNames=c.exportNames}),e.pageFilesList.forEach(s=>{r[s]=r[s]??he(s)});const i=Object.values(r);return i.forEach(({filePath:s})=>{o(!s.includes("\\"))}),{pageFiles:i,pageConfigs:t,pageConfigGlobal:n}}function C(e){const t=[];return Object.entries(e).forEach(([n,r])=>{o(ct.includes(n)),o(w(r)),Object.entries(r).forEach(([i,s])=>{const a=he(i);o(a.fileType===n),t.push({filePath:i,pageFile:a,globValue:s})})}),t}function Z(e){o(Y(e))}const R=I("setPageFiles.ts",{});function en(e){const{pageFiles:t,pageConfigs:n,pageConfigGlobal:r}=ht(e);R.pageFilesAll=t,R.pageConfigs=n,R.pageConfigGlobal=r}async function tn(e,t){e?(o(!R.pageFilesGetter),o(t===void 0)):(o(R.pageFilesGetter),o(typeof t=="boolean"),(!R.pageFilesAll||!t)&&await R.pageFilesGetter());const{pageFilesAll:n,pageConfigs:r,pageConfigGlobal:i}=R;o(n&&r&&i);const s=pt(n,r);return{pageFilesAll:n,allPageIds:s,pageConfigs:r,pageConfigGlobal:i}}function pt(e,t){const n=e.filter(({isDefaultPageFile:s})=>!s).map(({pageId:s})=>s),r=U(n),i=t.map(s=>s.pageId);return[...r,...i]}function mt(e,t){return pe(e,t,!0)}function nn(e,t){return pe(e,t,!1)}function pe(e,t,n){const r=n?"CLIENT_ONLY":"SERVER_ONLY",i=e.filter(d=>d.isRelevant(t)&&d.fileType!==".page.route").sort(yt(n,t)),s=d=>{const E=i.filter(b=>b.pageId===t&&b.isEnv(d?"CLIENT_AND_SERVER":r));h(E.length<=1,`Merge the following files into a single file: ${E.map(b=>b.filePath).join(" ")}`);const v=E[0];return o(v===void 0||!v.isDefaultPageFile),v},a=s(!1),l=s(!0),c=d=>i.filter(E=>E.isRendererPageFile&&E.isEnv(d?"CLIENT_AND_SERVER":r))[0],u=c(!1),g=c(!0),f=i.filter(d=>d.isDefaultPageFile&&!d.isRendererPageFile&&(d.isEnv(r)||d.isEnv("CLIENT_AND_SERVER")));return[a,l,...f,u,g].filter(Me)}function yt(e,t){const n=e?"CLIENT_ONLY":"SERVER_ONLY",r=-1,i=1,s=0;return(a,l)=>{if(!a.isDefaultPageFile&&l.isDefaultPageFile)return r;if(!l.isDefaultPageFile&&a.isDefaultPageFile)return i;{const c=a.isRendererPageFile,u=l.isRendererPageFile;if(!c&&u)return r;if(!u&&c)return i;o(c===u)}{const c=ee(t,a.filePath),u=ee(t,l.filePath);if(c<u)return r;if(u<c)return i;o(c===u)}{if(a.isEnv(n)&&l.isEnv("CLIENT_AND_SERVER"))return r;if(l.isEnv(n)&&a.isEnv("CLIENT_AND_SERVER"))return i}return s}}function ee(e,t){x(e),x(t);let n=0;for(;n<e.length&&n<t.length&&e[n]===t[n];n++);const r=e.slice(n),i=t.slice(n),s=r.split("/").length,a=i.split("/").length;return s+a}function Et(){o(M())}function $t(){Et()}function te(e){const t=e/1e3;if(t<120){const n=ne(t);return`${n} second${re(n)}`}{const n=t/60,r=ne(n);return`${r} minute${re(r)}`}}function ne(e){let t=e.toFixed(1);return t.endsWith(".0")&&(t=t.slice(0,-2)),t}function re(e){return e==="1"?"":"s"}const wt=I("utils/executeHook.ts",{userHookErrors:new Map});function St(e,t,n){const{timeoutErr:r,timeoutWarn:i}=vt(t);let s,a;const l=new Promise((f,S)=>{s=d=>{c(),f(d)},a=d=>{c(),S(d)}}),c=()=>{clearTimeout(u),clearTimeout(g)},u=setTimeout(()=>{T(!1,`The ${t}() hook defined by ${n} is taking more than ${te(i)}`,{onlyOnce:!1})},i),g=setTimeout(()=>{const f=Ie(`Hook timeout: the ${t}() hook defined by ${n} didn't finish after ${te(r)}`);a(f)},r);return(async()=>{try{const f=await e();s(f)}catch(f){w(f)&&wt.userHookErrors.set(f,{hookName:t,hookFilePath:n}),a(f)}})(),l}function vt(e){return e==="onBeforeRoute"?{timeoutErr:5*1e3,timeoutWarn:1*1e3}:e==="onBeforePrerender"?{timeoutErr:10*60*1e3,timeoutWarn:30*1e3}:{timeoutErr:40*1e3,timeoutWarn:4*1e3}}function rn(e){const t=window.location.href,{searchOriginal:n,hashOriginal:r,pathname:i}=ke(t,"/");let s;return e!=null&&e.withoutHash?s=`${i}${n||""}`:s=`${i}${n||""}${r||""}`,o(s.startsWith("/")),s}$t();const bt=[{is:e=>e===void 0,match:e=>e==="!undefined",serialize:()=>"!undefined",deserialize:()=>{}},{is:e=>e===1/0,match:e=>e==="!Infinity",serialize:()=>"!Infinity",deserialize:()=>1/0},{is:e=>e===-1/0,match:e=>e==="!-Infinity",serialize:()=>"!-Infinity",deserialize:()=>-1/0},{is:e=>typeof e=="number"&&isNaN(e),match:e=>e==="!NaN",serialize:()=>"!NaN",deserialize:()=>NaN},{is:e=>e instanceof Date,match:e=>e.startsWith("!Date:"),serialize:e=>"!Date:"+e.toISOString(),deserialize:e=>new Date(e.slice(6))},{is:e=>typeof e=="bigint",match:e=>e.startsWith("!BigInt:"),serialize:e=>"!BigInt:"+e.toString(),deserialize:e=>{if(typeof BigInt>"u")throw new Error("Your JavaScript environement does not support BigInt. Consider adding a polyfill.");return BigInt(e.slice(8))}},{is:e=>e instanceof RegExp,match:e=>e.startsWith("!RegExp:"),serialize:e=>"!RegExp:"+e.toString(),deserialize:e=>{e=e.slice(8);const t=e.match(/\/(.*)\/(.*)?/),n=t[1],r=t[2];return new RegExp(n,r)}},{is:e=>e instanceof Map,match:e=>e.startsWith("!Map:"),serialize:(e,t)=>"!Map:"+t(Array.from(e.entries())),deserialize:(e,t)=>new Map(t(e.slice(5)))},{is:e=>e instanceof Set,match:e=>e.startsWith("!Set:"),serialize:(e,t)=>"!Set:"+t(Array.from(e.values())),deserialize:(e,t)=>new Set(t(e.slice(5)))},{is:e=>typeof e=="string"&&e.startsWith("!"),match:e=>e.startsWith("!"),serialize:e=>"!"+e,deserialize:e=>e.slice(1)}];function me(e){const t=JSON.parse(e);return ye(t)}function ye(e){return typeof e=="string"?Rt(e):(typeof e=="object"&&e!==null&&Object.entries(e).forEach(([t,n])=>{e[t]=ye(n)}),e)}function Rt(e){for(const{match:t,deserialize:n}of bt)if(t(e))return n(e,me);return e}function sn(){const e="vite-plugin-ssr_pageContext",t=document.getElementById(e);h(t,`The element #${e} (which vite-plugin-ssr automatically injects into the HTML) is missing from the DOM. This may happen if your HTML is malformed. Make sure your HTML isn't malformed, and make sure you don't remove #${e} from the HTML nor from the DOM.`);const n=t.textContent;o(n);const r=me(n);return o(m(r,"_pageId","string")),J(r,{_hasPageContextFromServer:!0}),r}function z(e,t){if(!(t in e.exports))return null;const n=e.exports[t],r=e.exportsAll[t][0];if(o(r.exportValue===n),n===null)return null;const i=r.exportSource;return Pt(n,{hookName:t,hookFilePath:i}),{hookFn:n,hookName:t,hookFilePath:i}}function on(e,t){z(e,t)}function Pt(e,{hookName:t,hookFilePath:n}){o(t&&n),o(!t.endsWith(")")),h(Y(e),`hook ${t}() defined by ${n} should be a function`)}function Tt(e){const t=Object.entries(e);for(const n in e)delete e[n];t.sort(([n],[r])=>Ge(n,r)).forEach(([n,r])=>{e[n]=r})}function xt(e){It(e),_t(e)}function It(e){lt(e._pageId,e._pageConfigs)&&o(m(e,"is404","boolean"))}function _t(e){if(e.is404===void 0||e.is404===null)return;const t=e.pageProps||{};if(!w(t)){T(!1,"pageContext.pageProps should be an object",{showStackTrace:!0,onlyOnce:!0});return}t.is404=t.is404||e.is404,e.pageProps=t}const Lt="not-serializable",F=I("getPageContextProxyForUser.ts",{});function jt(e){return o([!0,!1].includes(e._hasPageContextFromServer)),o([!0,!1].includes(e._hasPageContextFromClient)),new Proxy(e,{get(t,n){const r=e[n],i=JSON.stringify(n);return h(r!==Lt,`pageContext[${i}] couldn't be serialized and, therefore, is missing on the client-side. Check the server logs for more information.`),Ct(e,n,`pageContext[${i}] isn't available on the client-side because ${i} is missing in passToClient, see https://vite-plugin-ssr.com/passToClient`),r}})}function Ct(e,t,n){F.prev===t||F.prev==="__v_raw"||(Ft(t),!(t in e)&&(kt(t)||e._hasPageContextFromServer&&!e._hasPageContextFromClient&&h(!1,n)))}const Ot=["then","toJSON"];function kt(e){return!!(Ot.includes(e)||typeof e=="symbol"||typeof e!="string"||e.startsWith("__v_"))}function Ft(e){F.prev=e,window.setTimeout(()=>{F.prev=void 0},0)}function Wt(e,t){if(t){const i=e;o([!0,!1].includes(i.isHydration)),o([!0,!1,null].includes(i.isBackwardNavigation))}else{const i=e;o(i.isHydration===!0),o(i.isBackwardNavigation===null)}o("config"in e),o("configEntries"in e),o("exports"in e),o("exportsAll"in e),o("pageExports"in e),o(w(e.pageExports));const n=e.exports.Page;J(e,{Page:n}),At(e),Tt(e);const r=jt(e);return xt(e),r}function At(e){Object.entries(e).forEach(([t,n])=>{delete e[t],e[t]=n})}function Dt(e,t){const n=e.filter(i=>i.pageId===t);return o(n.length<=1),n[0]??null}async function Nt(e,t){if(e.isLoaded&&!t)return e;const n=await e.loadConfigValuesAll(),r=(i,s,a,l)=>{e.configValues[i]={value:s,definedAtInfo:{filePath:a,fileExportPath:[l]}},zt(s,i,a)};return n.forEach(i=>{if(i.isPlusFile){const{importFileExports:s,importFilePath:a}=i;i.configName!=="client"&&qe(s,a),Object.entries(s).forEach(([l,c])=>{const u=l!=="default",g=u?l:i.configName;u&&g in e.configValues||r(g,c,a,l)})}else{const{configName:s,importFilePath:a,importFileExportValue:l,importFileExportName:c}=i;r(s,l,a,c)}}),J(e,{isLoaded:!0}),e}function zt(e,t,n){o(!n.includes("+config.")),h(e!==null,`Set ${p.cyan(t)} to ${p.cyan("null")} in a +config.h.js file instead of ${n}`)}const Ee="__whileFetchingAssets";async function an(e,t,n){const r=mt(e,n),i=Dt(t,n);let s;const a=!1;try{s=(await Promise.all([i&&Nt(i,a),...r.map(E=>{var v;return(v=E.loadFile)==null?void 0:v.call(E)})]))[0]}catch(d){throw Vt(d)&&Object.assign(d,{[Ee]:!0}),d}const{config:l,configEntries:c,exports:u,exportsAll:g,pageExports:f}=it(r,s);return{config:l,configEntries:c,exports:u,exportsAll:g,pageExports:f,_pageFilesLoaded:r}}function ln(e){return e?e[Ee]===!0:!1}function Vt(e){return e instanceof Error?["Failed to fetch dynamically imported module","error loading dynamically imported module","Importing a module script failed","error resolving module specifier","failed to resolve module"].some(n=>e.message.toLowerCase().includes(n.toLowerCase())):!1}async function cn(e,t){const n=Wt(e,t);let r=null,i;r=z(e,"render"),i="render";{const l=z(e,"onRenderClient");l&&(r=l,i="onRenderClient")}if(!r){const l=Ut(e);if(e._pageConfigs.length>0)h(!1,`No onRenderClient() hook defined for URL '${l}', but it's needed, see https://vite-plugin-ssr.com/onRenderClient`);else{const c=e._pageFilesLoaded.filter(g=>g.fileType===".page.client");let u;c.length===0?u="No file `*.page.client.*` found for URL "+l:u="One of the following files should export a `render()` hook: "+c.map(g=>g.filePath).join(" "),h(!1,u)}}o(r);const s=r.hookFn;o(i);const a=await St(()=>s(n),i,r.hookFilePath);h(a===void 0,`The ${i}() hook defined by ${r.hookFilePath} isn't allowed to return a value`)}function Ut(e){let t;try{t=e.urlPathname??e.urlOriginal}catch{}return t=t??window.location.href,t}export{k as A,z as B,St as C,Gt as D,Zt as E,Wt as F,Xt as G,Kt as H,me as I,Ie as J,Qt as K,rt as L,A as M,ze as N,mt as O,Dt as P,ce as Q,_e as R,ln as S,Ht as T,sn as a,h as b,tn as c,T as d,Jt as e,Bt as f,rn as g,cn as h,on as i,Y as j,Et as k,an as l,Mt as m,w as n,J as o,I as p,nn as q,o as r,en as s,M as t,ke as u,p as v,Be as w,qt as x,m as y,Yt as z};
