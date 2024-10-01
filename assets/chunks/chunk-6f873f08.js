import{r as t,c as I,d as l,k as R,a as N,u as h,R as A,e as D}from"./chunk-1f3639a1.js";function tr(r){return Array.isArray(r)?r:[r]}var H=Object.defineProperty,T=Object.defineProperties,V=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,S=(r,o,e)=>o in r?H(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e,b=(r,o)=>{for(var e in o||(o={}))z.call(o,e)&&S(r,e,o[e]);if(k)for(var e of k(o))B.call(o,e)&&S(r,e,o[e]);return r},w=(r,o)=>T(r,V(o));const s={xs:t(30),sm:t(36),md:t(42),lg:t(50),xl:t(60)},L=["default","filled","unstyled"];function M({theme:r,variant:o}){return L.includes(o)?o==="default"?{border:`${t(1)} solid ${r.colorScheme==="dark"?r.colors.dark[4]:r.colors.gray[4]}`,backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.white,transition:"border-color 100ms ease","&:focus, &:focus-within":r.focusRingStyles.inputStyles(r)}:o==="filled"?{border:`${t(1)} solid transparent`,backgroundColor:r.colorScheme==="dark"?r.colors.dark[5]:r.colors.gray[1],"&:focus, &:focus-within":r.focusRingStyles.inputStyles(r)}:{borderWidth:0,color:r.colorScheme==="dark"?r.colors.dark[0]:r.black,backgroundColor:"transparent",minHeight:t(28),outline:0,"&:focus, &:focus-within":{outline:"none",borderColor:"transparent"},"&:disabled":{backgroundColor:"transparent","&:focus, &:focus-within":{outline:"none",borderColor:"transparent"}}}:null}var U=I((r,{multiline:o,radius:e,invalid:a,rightSectionWidth:i,withRightSection:d,iconWidth:p,offsetBottom:g,offsetTop:_,pointer:v},{variant:c,size:n})=>{const u=r.fn.variant({variant:"filled",color:"red"}).background,f=c==="default"||c==="filled"?{minHeight:l({size:n,sizes:s}),paddingLeft:`calc(${l({size:n,sizes:s})}  / 3)`,paddingRight:d?i||l({size:n,sizes:s}):`calc(${l({size:n,sizes:s})}  / 3)`,borderRadius:r.fn.radius(e)}:c==="unstyled"&&d?{paddingRight:i||l({size:n,sizes:s})}:null;return{wrapper:{position:"relative",marginTop:_?`calc(${r.spacing.xs} / 2)`:void 0,marginBottom:g?`calc(${r.spacing.xs} / 2)`:void 0,"&:has(input:disabled)":{"& .mantine-Input-rightSection":{display:"none"}}},input:w(b(b(w(b({},r.fn.fontStyles()),{height:o?c==="unstyled"?void 0:"auto":l({size:n,sizes:s}),WebkitTapHighlightColor:"transparent",lineHeight:o?r.lineHeight:`calc(${l({size:n,sizes:s})} - ${t(2)})`,appearance:"none",resize:"none",boxSizing:"border-box",fontSize:l({size:n,sizes:r.fontSizes}),width:"100%",color:r.colorScheme==="dark"?r.colors.dark[0]:r.black,display:"block",textAlign:"left",cursor:v?"pointer":void 0}),M({theme:r,variant:c})),f),{"&:disabled, &[data-disabled]":{backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.colors.gray[1],color:r.colors.dark[2],opacity:.6,cursor:"not-allowed",pointerEvents:"none","&::placeholder":{color:r.colors.dark[2]}},"&[data-invalid]":{color:u,borderColor:u,"&::placeholder":{opacity:1,color:u}},"&[data-with-icon]":{paddingLeft:typeof p=="number"?t(p):l({size:n,sizes:s})},"&::placeholder":w(b({},r.fn.placeholderStyles()),{opacity:1}),"&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration":{appearance:"none"},"&[type=number]":{MozAppearance:"textfield"}}),icon:{pointerEvents:"none",position:"absolute",zIndex:1,left:0,top:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",width:p?t(p):l({size:n,sizes:s}),color:a?r.colors.red[r.colorScheme==="dark"?6:7]:r.colorScheme==="dark"?r.colors.dark[2]:r.colors.gray[5]},rightSection:{position:"absolute",top:0,bottom:0,right:0,display:"flex",alignItems:"center",justifyContent:"center",width:i||l({size:n,sizes:s})}}});const nr=U;var Z=Object.defineProperty,q=Object.defineProperties,F=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,P=(r,o,e)=>o in r?Z(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e,$=(r,o)=>{for(var e in o||(o={}))G.call(o,e)&&P(r,e,o[e]);if(O)for(var e of O(o))J.call(o,e)&&P(r,e,o[e]);return r},m=(r,o)=>q(r,F(o));const K=R({"from, to":{opacity:.4},"50%":{opacity:1}});var Q=I((r,{height:o,width:e,radius:a,circle:i,animate:d})=>({root:{height:t(o),width:i?t(o):t(e),borderRadius:i?t(o):r.fn.radius(a),position:"relative",WebkitTransform:"translateZ(0)"},visible:{overflow:"hidden","&::before":m($({},r.fn.cover(0)),{content:'""',background:r.colorScheme==="dark"?r.colors.dark[7]:r.white,zIndex:10}),"&::after":m($({},r.fn.cover(0)),{content:'""',background:r.colorScheme==="dark"?r.colors.dark[4]:r.colors.gray[3],animation:d?`${K} 1500ms linear infinite`:"none",zIndex:11})}}));const X=Q;var Y=Object.defineProperty,y=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,x=(r,o,e)=>o in r?Y(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e,W=(r,o)=>{for(var e in o||(o={}))j.call(o,e)&&x(r,e,o[e]);if(y)for(var e of y(o))C.call(o,e)&&x(r,e,o[e]);return r},rr=(r,o)=>{var e={};for(var a in r)j.call(r,a)&&o.indexOf(a)<0&&(e[a]=r[a]);if(r!=null&&y)for(var a of y(r))o.indexOf(a)<0&&C.call(r,a)&&(e[a]=r[a]);return e};const or={height:"auto",width:"100%",visible:!0,animate:!0},er=N.forwardRef((r,o)=>{const e=h("Skeleton",or,r),{height:a,width:i,visible:d,animate:p,className:g,circle:_,radius:v,unstyled:c,variant:n}=e,u=rr(e,["height","width","visible","animate","className","circle","radius","unstyled","variant"]),{classes:f,cx:E}=X({height:a,width:i,circle:_,radius:v,animate:p},{name:"Skeleton",unstyled:c,variant:n});return A.createElement(D,W({className:E(f.root,{[f.visible]:d},g),ref:o},u))});er.displayName="@mantine/core/Skeleton";export{er as S,tr as p,s,nr as u};