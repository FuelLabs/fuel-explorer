try{
(()=>{var pt=__STORYBOOK_ADDONS__,{addons:R,types:X,mockChannel:dt}=__STORYBOOK_ADDONS__;var gt=__STORYBOOK_COMPONENTS__,{A:ht,ActionBar:bt,AddonPanel:yt,Badge:St,Bar:_t,Blockquote:Et,Button:Tt,ClipboardCode:vt,Code:Ot,DL:Rt,Div:Ct,DocumentWrapper:xt,ErrorFormatter:Ft,FlexBar:Pt,Form:wt,H1:It,H2:kt,H3:At,H4:Dt,H5:Bt,H6:Nt,HR:Lt,IconButton:Q,IconButtonSkeleton:Ht,Icons:J,Img:jt,LI:Mt,Link:Yt,ListItem:Gt,Loader:zt,OL:Wt,P:Ut,Placeholder:$t,Pre:Kt,ResetWrapper:qt,ScrollArea:Xt,Separator:Qt,Spaced:Jt,Span:Zt,StorybookIcon:Vt,StorybookLogo:er,Symbols:tr,SyntaxHighlighter:rr,TT:ar,TabBar:or,TabButton:nr,TabWrapper:sr,Table:ir,Tabs:lr,TabsState:pr,TooltipLinkList:dr,TooltipMessage:ur,TooltipNote:fr,UL:cr,WithTooltip:mr,WithTooltipPure:gr,Zoom:hr,codeCommon:br,components:yr,createCopyToClipboardFunction:Sr,getStoryHref:_r,icons:Er,interleaveSeparators:Tr,nameSpaceClassNames:vr,resetComponents:Or,withReset:Rr}=__STORYBOOK_COMPONENTS__;var wr=__STORYBOOK_CORE_EVENTS__,{CHANNEL_CREATED:Ir,CONFIG_ERROR:kr,CURRENT_STORY_WAS_SET:Ar,DOCS_PREPARED:Dr,DOCS_RENDERED:Br,FORCE_REMOUNT:Nr,FORCE_RE_RENDER:Z,GLOBALS_UPDATED:Lr,IGNORED_EXCEPTION:Hr,NAVIGATE_URL:jr,PLAY_FUNCTION_THREW_EXCEPTION:Mr,PRELOAD_ENTRIES:Yr,PREVIEW_BUILDER_PROGRESS:Gr,PREVIEW_KEYDOWN:zr,REGISTER_SUBSCRIPTION:Wr,REQUEST_WHATS_NEW_DATA:Ur,RESET_STORY_ARGS:$r,RESULT_WHATS_NEW_DATA:Kr,SELECT_STORY:qr,SET_CONFIG:Xr,SET_CURRENT_STORY:Qr,SET_GLOBALS:Jr,SET_INDEX:Zr,SET_STORIES:Vr,SET_WHATS_NEW_CACHE:ea,SHARED_STATE_CHANGED:ta,SHARED_STATE_SET:ra,STORIES_COLLAPSE_ALL:aa,STORIES_EXPAND_ALL:oa,STORY_ARGS_UPDATED:na,STORY_CHANGED:sa,STORY_ERRORED:ia,STORY_INDEX_INVALIDATED:la,STORY_MISSING:pa,STORY_PREPARED:da,STORY_RENDERED:ua,STORY_RENDER_PHASE_CHANGED:fa,STORY_SPECIFIED:ca,STORY_THREW_EXCEPTION:ma,STORY_UNCHANGED:ga,TELEMETRY_ERROR:ha,TOGGLE_WHATS_NEW_NOTIFICATIONS:ba,UPDATE_GLOBALS:ya,UPDATE_QUERY_PARAMS:Sa,UPDATE_STORY_ARGS:_a}=__STORYBOOK_CORE_EVENTS__;var Ra=__STORYBOOK_API__,{ActiveTabs:Ca,Consumer:xa,ManagerContext:Fa,Provider:Pa,addons:wa,combineParameters:Ia,controlOrMetaKey:ka,controlOrMetaSymbol:Aa,eventMatchesShortcut:Da,eventToShortcut:Ba,isMacLike:Na,isShortcutTaken:La,keyToSymbol:Ha,merge:ja,mockChannel:Ma,optionOrAltSymbol:Ya,shortcutMatchesShortcut:Ga,shortcutToHumanString:za,types:Wa,useAddonState:V,useArgTypes:Ua,useArgs:$a,useChannel:Ka,useGlobalTypes:qa,useGlobals:Xa,useParameter:Qa,useSharedState:Ja,useStoryPrepared:Za,useStorybookApi:Va,useStorybookState:eo}=__STORYBOOK_API__;var no=__STORYBOOK_THEMING__,{CacheProvider:so,ClassNames:io,Global:lo,ThemeProvider:po,background:uo,color:fo,convert:co,create:mo,createCache:go,createGlobal:ho,createReset:bo,css:yo,darken:So,ensure:_o,ignoreSsrWarning:Eo,isPropValid:To,jsx:vo,keyframes:Oo,lighten:Ro,styled:Co,themes:D,typography:xo,useTheme:Fo,withTheme:Po}=__STORYBOOK_THEMING__;var ee=(()=>{let e;return typeof window<"u"?e=window:typeof globalThis<"u"?e=globalThis:typeof window<"u"?e=window:typeof self<"u"?e=self:e={},e})();var Ho=__STORYBOOK_CLIENT_LOGGER__,{deprecate:jo,logger:te,once:Mo,pretty:Yo}=__STORYBOOK_CLIENT_LOGGER__;function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},S.apply(this,arguments)}function fe(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e,t){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,a){return r.__proto__=a,r},_(e,t)}function ce(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,_(e,t)}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},M(e)}function me(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function ge(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function C(e,t,r){return ge()?C=Reflect.construct.bind():C=function(a,o,n){var s=[null];s.push.apply(s,o);var l=Function.bind.apply(a,s),p=new l;return n&&_(p,n.prototype),p},C.apply(null,arguments)}function Y(e){var t=typeof Map=="function"?new Map:void 0;return Y=function(r){if(r===null||!me(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(r))return t.get(r);t.set(r,a)}function a(){return C(r,arguments,M(this).constructor)}return a.prototype=Object.create(r.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),_(a,r)},Y(e)}var he={1:`Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,2:`Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,3:`Passed an incorrect argument to a color function, please pass a string representation of a color.

`,4:`Couldn't generate valid rgb string from %s, it returned %s.

`,5:`Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,6:`Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,7:`Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,8:`Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,9:`Please provide a number of steps to the modularScale helper.

`,10:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,11:`Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,12:`Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,13:`Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,14:`Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,15:`Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,16:`You must provide a template to this method.

`,17:`You passed an unsupported selector state to this method.

`,18:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,19:`fromSize and toSize must be provided as stringified numbers with the same units.

`,20:`expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,21:"expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",22:"expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",23:`fontFace expects a name of a font-family.

`,24:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,25:`fontFace expects localFonts to be an array.

`,26:`fontFace expects fileFormats to be an array.

`,27:`radialGradient requries at least 2 color-stops to properly render.

`,28:`Please supply a filename to retinaImage() as the first argument.

`,29:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,30:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",31:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,32:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,33:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,34:`borderRadius expects a radius value as a string or number as the second argument.

`,35:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,36:`Property must be a string value.

`,37:`Syntax Error at %s.

`,38:`Formula contains a function that needs parentheses at %s.

`,39:`Formula is missing closing parenthesis at %s.

`,40:`Formula has too many closing parentheses at %s.

`,41:`All values in a formula must have the same unit or be unitless.

`,42:`Please provide a number of steps to the modularScale helper.

`,43:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,44:`Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,45:`Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,46:`Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,47:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,48:`fromSize and toSize must be provided as stringified numbers with the same units.

`,49:`Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,50:`Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,51:`Expects the first argument object to have the properties prop, fromSize, and toSize.

`,52:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,53:`fontFace expects localFonts to be an array.

`,54:`fontFace expects fileFormats to be an array.

`,55:`fontFace expects a name of a font-family.

`,56:`linearGradient requries at least 2 color-stops to properly render.

`,57:`radialGradient requries at least 2 color-stops to properly render.

`,58:`Please supply a filename to retinaImage() as the first argument.

`,59:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,60:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",61:`Property must be a string value.

`,62:`borderRadius expects a radius value as a string or number as the second argument.

`,63:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,64:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,65:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,66:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,67:`You must provide a template to this method.

`,68:`You passed an unsupported selector state to this method.

`,69:`Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,70:`Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,71:`Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,72:`Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,73:`Please provide a valid CSS variable.

`,74:`CSS variable not found and no default was provided.

`,75:`important requires a valid style object, got a %s instead.

`,76:`fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,77:`remToPx expects a value in "rem" but you provided it in "%s".

`,78:`base must be set in "px" or "%" but you set it in "%s".
`};function be(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=t[0],o=[],n;for(n=1;n<t.length;n+=1)o.push(t[n]);return o.forEach(function(s){a=a.replace(/%[a-z]/,s)}),a}var m=function(e){ce(t,e);function t(r){for(var a,o=arguments.length,n=new Array(o>1?o-1:0),s=1;s<o;s++)n[s-1]=arguments[s];return a=e.call(this,be.apply(void 0,[he[r]].concat(n)))||this,fe(a)}return t}(Y(Error));function B(e){return Math.round(e*255)}function ye(e,t,r){return B(e)+","+B(t)+","+B(r)}function E(e,t,r,a){if(a===void 0&&(a=ye),t===0)return a(r,r,r);var o=(e%360+360)%360/60,n=(1-Math.abs(2*r-1))*t,s=n*(1-Math.abs(o%2-1)),l=0,p=0,c=0;o>=0&&o<1?(l=n,p=s):o>=1&&o<2?(l=s,p=n):o>=2&&o<3?(p=n,c=s):o>=3&&o<4?(p=s,c=n):o>=4&&o<5?(l=s,c=n):o>=5&&o<6&&(l=n,c=s);var b=r-n/2,y=l+b,g=p+b,A=c+b;return a(y,g,A)}var re={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function Se(e){if(typeof e!="string")return e;var t=e.toLowerCase();return re[t]?"#"+re[t]:e}var _e=/^#[a-fA-F0-9]{6}$/,Ee=/^#[a-fA-F0-9]{8}$/,Te=/^#[a-fA-F0-9]{3}$/,ve=/^#[a-fA-F0-9]{4}$/,N=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,Oe=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,Re=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,Ce=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function w(e){if(typeof e!="string")throw new m(3);var t=Se(e);if(t.match(_e))return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16)};if(t.match(Ee)){var r=parseFloat((parseInt(""+t[7]+t[8],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16),alpha:r}}if(t.match(Te))return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16)};if(t.match(ve)){var a=parseFloat((parseInt(""+t[4]+t[4],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16),alpha:a}}var o=N.exec(t);if(o)return{red:parseInt(""+o[1],10),green:parseInt(""+o[2],10),blue:parseInt(""+o[3],10)};var n=Oe.exec(t.substring(0,50));if(n)return{red:parseInt(""+n[1],10),green:parseInt(""+n[2],10),blue:parseInt(""+n[3],10),alpha:parseFloat(""+n[4])>1?parseFloat(""+n[4])/100:parseFloat(""+n[4])};var s=Re.exec(t);if(s){var l=parseInt(""+s[1],10),p=parseInt(""+s[2],10)/100,c=parseInt(""+s[3],10)/100,b="rgb("+E(l,p,c)+")",y=N.exec(b);if(!y)throw new m(4,t,b);return{red:parseInt(""+y[1],10),green:parseInt(""+y[2],10),blue:parseInt(""+y[3],10)}}var g=Ce.exec(t.substring(0,50));if(g){var A=parseInt(""+g[1],10),de=parseInt(""+g[2],10)/100,ue=parseInt(""+g[3],10)/100,q="rgb("+E(A,de,ue)+")",O=N.exec(q);if(!O)throw new m(4,t,q);return{red:parseInt(""+O[1],10),green:parseInt(""+O[2],10),blue:parseInt(""+O[3],10),alpha:parseFloat(""+g[4])>1?parseFloat(""+g[4])/100:parseFloat(""+g[4])}}throw new m(5)}function xe(e){var t=e.red/255,r=e.green/255,a=e.blue/255,o=Math.max(t,r,a),n=Math.min(t,r,a),s=(o+n)/2;if(o===n)return e.alpha!==void 0?{hue:0,saturation:0,lightness:s,alpha:e.alpha}:{hue:0,saturation:0,lightness:s};var l,p=o-n,c=s>.5?p/(2-o-n):p/(o+n);switch(o){case t:l=(r-a)/p+(r<a?6:0);break;case r:l=(a-t)/p+2;break;default:l=(t-r)/p+4;break}return l*=60,e.alpha!==void 0?{hue:l,saturation:c,lightness:s,alpha:e.alpha}:{hue:l,saturation:c,lightness:s}}function ne(e){return xe(w(e))}var Fe=function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},G=Fe;function h(e){var t=e.toString(16);return t.length===1?"0"+t:t}function L(e){return h(Math.round(e*255))}function Pe(e,t,r){return G("#"+L(e)+L(t)+L(r))}function F(e,t,r){return E(e,t,r,Pe)}function we(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return F(e,t,r);if(typeof e=="object"&&t===void 0&&r===void 0)return F(e.hue,e.saturation,e.lightness);throw new m(1)}function Ie(e,t,r,a){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof a=="number")return a>=1?F(e,t,r):"rgba("+E(e,t,r)+","+a+")";if(typeof e=="object"&&t===void 0&&r===void 0&&a===void 0)return e.alpha>=1?F(e.hue,e.saturation,e.lightness):"rgba("+E(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new m(2)}function z(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return G("#"+h(e)+h(t)+h(r));if(typeof e=="object"&&t===void 0&&r===void 0)return G("#"+h(e.red)+h(e.green)+h(e.blue));throw new m(6)}function T(e,t,r,a){if(typeof e=="string"&&typeof t=="number"){var o=w(e);return"rgba("+o.red+","+o.green+","+o.blue+","+t+")"}else{if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof a=="number")return a>=1?z(e,t,r):"rgba("+e+","+t+","+r+","+a+")";if(typeof e=="object"&&t===void 0&&r===void 0&&a===void 0)return e.alpha>=1?z(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")"}throw new m(7)}var ke=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Ae=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},De=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Be=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"};function se(e){if(typeof e!="object")throw new m(8);if(Ae(e))return T(e);if(ke(e))return z(e);if(Be(e))return Ie(e);if(De(e))return we(e);throw new m(8)}function ie(e,t,r){return function(){var a=r.concat(Array.prototype.slice.call(arguments));return a.length>=t?e.apply(this,a):ie(e,t,a)}}function I(e){return ie(e,e.length,[])}function k(e,t,r){return Math.max(e,Math.min(t,r))}function Ne(e,t){if(t==="transparent")return t;var r=ne(t);return se(S({},r,{lightness:k(0,1,r.lightness-parseFloat(e))}))}var Le=I(Ne),He=Le;function je(e,t){if(t==="transparent")return t;var r=ne(t);return se(S({},r,{lightness:k(0,1,r.lightness+parseFloat(e))}))}var Me=I(je),Ye=Me;function Ge(e,t){if(t==="transparent")return t;var r=w(t),a=typeof r.alpha=="number"?r.alpha:1,o=S({},r,{alpha:k(0,1,(a*100+parseFloat(e)*100)/100)});return T(o)}var qo=I(Ge);function ze(e,t){if(t==="transparent")return t;var r=w(t),a=typeof r.alpha=="number"?r.alpha:1,o=S({},r,{alpha:k(0,1,+(a*100-parseFloat(e)*100).toFixed(2)/100)});return T(o)}var We=I(ze),Ue=We,i={primary:"#FF4785",secondary:"#029CFD",tertiary:"#FAFBFC",ancillary:"#22a699",orange:"#FC521F",gold:"#FFAE00",green:"#66BF3C",seafoam:"#37D5D3",purple:"#6F2CAC",ultraviolet:"#2A0481",lightest:"#FFFFFF",lighter:"#F7FAFC",light:"#EEF3F6",mediumlight:"#ECF4F9",medium:"#D9E8F2",mediumdark:"#73828C",dark:"#5C6870",darker:"#454E54",darkest:"#2E3438",border:"hsla(203, 50%, 30%, 0.15)",positive:"#66BF3C",negative:"#FF4400",warning:"#E69D00",critical:"#FFFFFF",defaultText:"#2E3438",inverseText:"#FFFFFF",positiveText:"#448028",negativeText:"#D43900",warningText:"#A15C20"},ae={app:"#F6F9FC",bar:i.lightest,content:i.lightest,preview:i.lightest,gridCellSize:10,hoverable:Ue(.9,i.secondary),positive:"#E1FFD4",negative:"#FEDED2",warning:"#FFF5CF",critical:"#FF4400"},P={fonts:{base:['"Nunito Sans"',"-apple-system",'".SFNSText-Regular"','"San Francisco"',"BlinkMacSystemFont",'"Segoe UI"','"Helvetica Neue"',"Helvetica","Arial","sans-serif"].join(", "),mono:["ui-monospace","Menlo","Monaco",'"Roboto Mono"','"Oxygen Mono"','"Ubuntu Monospace"','"Source Code Pro"','"Droid Sans Mono"','"Courier New"',"monospace"].join(", ")},weight:{regular:400,bold:700},size:{s1:12,s2:14,s3:16,m1:20,m2:24,m3:28,l1:32,l2:40,l3:48,code:90}},$e={base:"light",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:ae.app,appContentBg:i.lightest,appPreviewBg:i.lightest,appBorderColor:i.border,appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:i.darkest,textInverseColor:i.lightest,textMutedColor:i.dark,barTextColor:i.mediumdark,barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:i.lightest,buttonBg:ae.app,buttonBorder:i.medium,booleanBg:i.mediumlight,booleanSelectedBg:i.lightest,inputBg:i.lightest,inputBorder:i.border,inputTextColor:i.darkest,inputBorderRadius:4},oe=$e,Ke={base:"dark",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:"#222425",appContentBg:"#1B1C1D",appPreviewBg:i.lightest,appBorderColor:"rgba(255,255,255,.1)",appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:"#C9CDCF",textInverseColor:"#222425",textMutedColor:"#798186",barTextColor:"#798186",barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:"#292C2E",buttonBg:"#222425",buttonBorder:"rgba(255,255,255,.1)",booleanBg:"#222425",booleanSelectedBg:"#2E3438",inputBg:"#1B1C1D",inputBorder:"rgba(255,255,255,.1)",inputTextColor:i.lightest,inputBorderRadius:4},qe=Ke,{window:H}=ee;var Xe=e=>typeof e!="string"?(te.warn(`Color passed to theme object should be a string. Instead ${e}(${typeof e}) was passed.`),!1):!0,Qe=e=>!/(gradient|var|calc)/.test(e),Je=(e,t)=>e==="darken"?T(`${He(1,t)}`,.95):e==="lighten"?T(`${Ye(1,t)}`,.95):t,le=e=>t=>{if(!Xe(t)||!Qe(t))return t;try{return Je(e,t)}catch{return t}},Xo=le("lighten"),Qo=le("darken"),Ze=()=>!H||!H.matchMedia?"light":H.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",x={light:oe,dark:qe,normal:oe},j=Ze(),W=(e={base:j},t)=>{let r={...x[j],...x[e.base]||{},...e,base:x[e.base]?e.base:j};return{...t,...r,barSelectedColor:e.barSelectedColor||r.colorSecondary}};var v=__REACT__,{Children:sn,Component:ln,Fragment:pn,Profiler:dn,PureComponent:un,StrictMode:fn,Suspense:cn,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:mn,cloneElement:gn,createContext:hn,createElement:bn,createFactory:yn,createRef:Sn,forwardRef:_n,isValidElement:En,lazy:Tn,memo:vn,useCallback:On,useContext:Rn,useDebugValue:Cn,useEffect:xn,useImperativeHandle:Fn,useLayoutEffect:Pn,useMemo:wn,useReducer:In,useRef:kn,useState:An,version:Dn}=__REACT__;var K="theme-addon",Ve=`${K}/tool`,U="fuel-ui-theme",$="#00E182",et="https://assets-global.website-files.com/62e273f312d561347ce33306/6400d0b82c501d62b75963ff_Fuel%20New.png",pe=W({base:"dark",brandTitle:"Fuel",brandUrl:"https://fuel.sh",brandImage:et,colorPrimary:$,colorSecondary:$,barSelectedColor:$}),tt={...D.light,...pe},rt={...D.dark,...pe,appBg:"#101010",barBg:"#151515"};R.register(K,e=>{R.add(Ve,{title:"Toggle theme",type:X.TOOL,match:({viewMode:t})=>t==="story"||t==="docs",render:()=>{let t=localStorage.getItem(U),[r,a]=V(K,t),o=r==="dark";return v.useEffect(()=>{localStorage.setItem(U,r),e.setOptions({theme:o?rt:tt});let n=document.getElementById("storybook-preview-iframe"),s=n.contentDocument||n.contentWindow?.document;r==="dark"?(s.documentElement.setAttribute("style","color-scheme: dark;"),s.documentElement.classList.add("dark-theme"),s.documentElement.classList.remove("light-theme")):(s.documentElement.setAttribute("style","color-scheme: light;"),s.documentElement.classList.add("light-theme"),s.documentElement.classList.remove("dark-theme")),R.getChannel().emit(Z)},[r]),v.useEffect(()=>{function n(){a(localStorage.getItem(U))}return window.addEventListener("storage",n),()=>{window.removeEventListener("storage",n)}},[]),v.createElement(Q,{key:"theme",placeholder:"Toggle theme",title:"Toggle theme",onClick:()=>{a(t==="light"?"dark":"light")}},v.createElement(J,{icon:o?"moon":"sun"}))}})});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
