import{s as _,g as l,a as u,o as s,b as c,c as f,l as v,d as E,e as h,f as x,h as y,i as m}from"../chunks/chunk-8870c9e9.js";import{_ as t}from"../chunks/chunk-7cb7fa48.js";const n={},P={},L={},C={},F=[],p={},R=!0,b=[],O={onBeforeRoute:null,onPrerenderStart:null},w=Object.assign({"/pages/index/index.page.tsx":()=>t(()=>import("./pages_index_index.page.458475cb.js"),["assets/entries/pages_index_index.page.458475cb.js","assets/chunks/chunk-1f3639a1.js","assets/chunks/chunk-5f9ea4bd.js","assets/chunks/chunk-6f873f08.js"]),"/pages/japan/@pref_code.page.tsx":()=>t(()=>import("./pages_japan_-pref_code.page.a0872a24.js"),["assets/entries/pages_japan_-pref_code.page.a0872a24.js","assets/chunks/chunk-1f3639a1.js","assets/chunks/chunk-c9f09a50.js","assets/chunks/chunk-6f873f08.js","assets/chunks/chunk-4bdcce55.js","assets/chunks/chunk-7cb7fa48.js"]),"/pages/world/@country_code.page.tsx":()=>t(()=>import("./pages_world_-country_code.page.7c79533b.js"),["assets/entries/pages_world_-country_code.page.7c79533b.js","assets/chunks/chunk-1f3639a1.js","assets/chunks/chunk-c9f09a50.js","assets/chunks/chunk-6f873f08.js","assets/chunks/chunk-4bdcce55.js","assets/chunks/chunk-7cb7fa48.js","assets/chunks/chunk-7a5279b2.js"])}),A={...w};n[".page"]=A;const I=Object.assign({"/renderer/_default.page.client.tsx":()=>t(()=>import("./renderer_default.page.client.d507229f.js"),["assets/entries/renderer_default.page.client.d507229f.js","assets/chunks/chunk-1f3639a1.js","assets/chunks/chunk-5f9ea4bd.js","assets/chunks/chunk-4bdcce55.js","assets/chunks/chunk-7a5279b2.js"])}),S={...I};n[".page.client"]=S;const T=Object.assign({"/pages/index/index.page.server.tsx":()=>t(()=>import("./pages_index_index.page.server.extractAssets.4ed993c7.js"),[]),"/pages/japan/@pref_code.page.server.tsx":()=>t(()=>import("./pages_japan_-pref_code.page.server.extractAssets.4ed993c7.js"),[]),"/pages/world/@country_code.page.server.tsx":()=>t(()=>import("./pages_world_-country_code.page.server.extractAssets.4ed993c7.js"),[]),"/renderer/_default.page.server.tsx":()=>t(()=>import("./renderer_default.page.server.extractAssets.ed77219c.js").then(e=>e._),[])}),j={...T};p[".page.server"]=j;const z=Object.freeze(Object.defineProperty({__proto__:null,isGeneratedFile:R,neverLoaded:p,pageConfigGlobal:O,pageConfigs:b,pageFilesEager:P,pageFilesExportNamesEager:C,pageFilesExportNamesLazy:L,pageFilesLazy:n,pageFilesList:F},Symbol.toStringTag,{value:"Module"}));_(z);const d=l({withoutHash:!0});async function H(){const e=u();return s(e,{isHydration:!0,isBackwardNavigation:null,_hasPageContextFromClient:!1}),s(e,await V(e._pageId)),D(),e}function D(){const e=l({withoutHash:!0});c(d===e,`The URL was manipulated before the hydration finished ('${d}' to '${e}'). Ensure the hydration has finished before manipulating the URL. Consider using the onHydrationEnd() hook.`)}async function V(e){const r={},{pageFilesAll:o,pageConfigs:i}=await f(!0);return s(r,{_pageFilesAll:o,_pageConfigs:i}),s(r,await v(o,i,e)),o.filter(a=>a.fileType!==".page.server").forEach(a=>{var g;E(!((g=a.fileExports)!=null&&g.onBeforeRender),`export { onBeforeRender } of ${a.filePath} is loaded in the browser but never executed (because you are using Server-side Routing). In order to reduce the size of you browser-side JavaScript, define onBeforeRender() in a .page.server.js file instead, see https://vite-plugin-ssr.com/onBeforeRender-isomorphic#server-routing`,{onlyOnce:!0})}),r}h();const B=!0;x(B);U();async function U(){var r,o;const e=await H();await y(e,!1),m(e,"onHydrationEnd"),await((o=(r=e.exports).onHydrationEnd)==null?void 0:o.call(r,e))}