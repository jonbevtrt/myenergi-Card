function e(e,t,i,s){var r,o=arguments.length,n=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",$=g.reactiveElementPolyfillSupport,y=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&h(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=s;const o=r.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(void 0!==e){const o=this.constructor;if(!1===s&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??v)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,$?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=e=>e,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,M=`<${k}>`,N=document,O=()=>N.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,z=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,F=/"/g,I=/^(?:script|style|textarea|title)$/i,D=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=D(1),V=D(2),Z=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,J=N.createTreeWalker(N,129);function K(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=H;for(let t=0;t<i;t++){const i=e[t];let a,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=T:void 0!==l[1]?n=z:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=r??H,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?F:B):n===F||n===B?n=j:n===T||n===z?n=H:(n=j,r=void 0);const d=n===j&&e[t+1].startsWith("/>")?" ":"";o+=n===H?i+M:h>=0?(s.push(a),i.slice(0,h)+P+i.slice(h)+C+d):i+C+(-2===h?t:d)}return[K(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class X{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const n=e.length-1,a=this.parts,[l,h]=Y(e,t);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(P)){const t=h[o++],i=s.getAttribute(e).split(C),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?se:"?"===n[1]?re:"@"===n[1]?oe:ie}),s.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(e));if(I.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),J.nextNode(),a.push({type:2,index:++r});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)a.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===Z)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,s)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??N).importNode(t,!0);J.currentNode=s;let r=J.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new te(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new ne(r,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(r=J.nextNode(),o++)}return J.currentNode=N,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),U(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new ee(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new te(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(void 0===r)e=Q(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==Z,o&&(this._$AH=e);else{const s=e;let n,a;for(e=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],t,n),a===Z&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===q?e=q:e!==q&&(e+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class re extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class oe extends ie{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===Z)return;const i=this._$AH,s=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=x.litHtmlPolyfillSupport;ae?.(X,te),(x.litHtmlVersions??=[]).push("3.3.2");const le=globalThis;let he=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new te(t.insertBefore(O(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};he._$litElement$=!0,he.finalized=!0,le.litElementHydrateSupport?.({LitElement:he});const ce=le.litElementPolyfillSupport;ce?.({LitElement:he}),(le.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v},ue=(e=pe,t,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,r,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];t.call(this,i),this.requestUpdate(s,r,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ge(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function fe(e){return ge({...e,state:!0,attribute:!1})}const me=1;class $e{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const ye=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends $e{constructor(e){if(super(e),e.type!==me||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const s=!!t[e];s===this.st.has(e)||this.nt?.has(e)||(s?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return Z}}),_e="myenergi-card",ve="myenergi-card-editor",be=200,we=220,xe=36,Ae={home:270,grid:330,solar:30,eddi:90,zappi:150,libbi:210},Se={home:{name:"Home",icon:"mdi:home-variant-outline",color:"var(--myenergi-magenta)"},grid:{name:"Grid",icon:"mdi:transmission-tower",color:"var(--myenergi-orange)"},solar:{name:"Solar",icon:"mdi:solar-panel",color:"var(--myenergi-green)"},libbi:{name:"LIBBI",icon:"mdi:battery-high",color:"var(--myenergi-orange)"},zappi:{name:"ZAPPI",icon:"mdi:car-electric-outline",color:"var(--myenergi-grey)"},eddi:{name:"EDDI",icon:"mdi:water-boiler",color:"var(--myenergi-red)"}};function Ee(e,t){if(e&&t)return e.states[t]}function Pe(e){if(!e)return NaN;const t=e.state;if(null==t)return NaN;if("unknown"===t||"unavailable"===t||""===t)return NaN;const i=Number(t);return Number.isFinite(i)?i:NaN}function Ce(e){const t=Pe(e);if(Number.isFinite(t))return t>=0&&t<=1?Math.round(100*t):t>=0&&t<=100?Math.round(t):void 0}function ke(e,t,i,s){const r=s*Math.PI/180;return{x:e+i*Math.cos(r),y:t+i*Math.sin(r)}}function Me(e,t,i,s,r){const o=i-e,n=s-t,a=Math.hypot(o,n)||1;return{x:e+o/a*r,y:t+n/a*r}}function Ne(e,t){return Number.isFinite(e)?Math.abs(e)<t?0:e:0}const Oe=n`
  :host {
    --myenergi-green: #2ecc71;
    --myenergi-orange: #f39c12;
    --myenergi-red: #e74c3c;
    --myenergi-magenta: #c71585;
    --myenergi-blue: #3498db;
    --myenergi-grey: #555c66;
    --myenergi-bg: #0b0d10;
    --myenergi-fg: #ffffff;
    --myenergi-dim: rgba(255, 255, 255, 0.55);
    --myenergi-line: rgba(255, 255, 255, 0.15);
    display: block;
  }

  ha-card {
    background: var(--myenergi-bg);
    color: var(--myenergi-fg);
    overflow: hidden;
    padding: 0;
    position: relative;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 16px 4px 16px;
    font-size: 18px;
    font-weight: 400;
    color: var(--myenergi-fg);
  }

  .header ha-icon {
    --mdc-icon-size: 22px;
    color: var(--myenergi-fg);
    opacity: 0.9;
  }

  .header .title {
    flex: 1;
  }

  .diagram-wrap {
    padding: 0 12px 4px 12px;
  }

  svg.diagram {
    width: 100%;
    height: auto;
    display: block;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0 14px 0;
    color: var(--myenergi-dim);
    font-size: 13px;
    letter-spacing: 0.02em;
    gap: 6px;
  }

  .footer svg {
    height: 14px;
    width: auto;
  }

  /* SVG element styles */
  .line {
    stroke: var(--myenergi-line);
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
  }

  .chevron {
    fill: var(--myenergi-green);
  }

  .node-bg {
    fill: var(--myenergi-bg);
    stroke-width: 3;
  }

  .node-label,
  .node-value {
    font-family: var(--primary-font-family, 'Roboto', 'Noto', sans-serif);
    font-weight: 500;
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .node-label {
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .node-value {
    font-size: 14px;
  }

  .center-label {
    fill: var(--myenergi-fg);
    font-size: 20px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    font-family: var(--primary-font-family, 'Roboto', 'Noto', sans-serif);
  }

  .dim {
    opacity: 0.45;
  }

  .badge-bg {
    fill: var(--myenergi-blue);
  }

  @media (prefers-reduced-motion: reduce) {
    .animated-chevron {
      animation: none !important;
      display: none;
    }
  }
`;console.info("%c myenergi-card %c v0.1.0 ","color:#fff;background:#2ecc71;font-weight:700;border-radius:3px 0 0 3px;padding:2px 6px;","color:#2ecc71;background:#0b0d10;border-radius:0 3px 3px 0;padding:2px 6px;"),window.customCards=window.customCards||[],window.customCards.push({type:_e,name:"myenergi Card",description:"Hexagonal power-flow visualisation for myenergi devices (Zappi, Eddi, Libbi, Harvi) in the style of the official myenergi app.",preview:!0,documentationURL:"https://github.com/"});let Ue=class extends he{static async getConfigElement(){return await Promise.resolve().then(function(){return Te}),document.createElement(ve)}static getStubConfig(){return{type:`custom:${_e}`,title:"myenergi",grid:{power:""},solar:{power:""},home:{power:""},libbi:{power:"",soc:""},zappi:{power:"",plug:""},eddi:{power:""}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}getCardSize(){return 6}render(){if(!this._config||!this.hass)return q;const e=this._config.power_unit??"kW",t=this._config.flow_threshold??.05,i=this._buildNodes(t),s=this._readEcoScore(),r=!1!==this._config.show_footer,o=!1===this._config.title?void 0:this._config.title??"myenergi";return W`
      <ha-card>
        ${void 0!==o?W`
              <div class="header">
                <ha-icon icon="mdi:menu"></ha-icon>
                <div class="title">${o}</div>
              </div>
            `:q}

        <div class="diagram-wrap">
          <svg
            class="diagram"
            viewBox="0 0 ${400} ${400}"
            preserveAspectRatio="xMidYMid meet"
            aria-label="myenergi power flow"
          >
            <defs>
              <symbol id="me-chevron" viewBox="-6 -6 12 12" overflow="visible">
                <path d="M-3 -4 L3 0 L-3 4 Z" class="chevron" />
              </symbol>
            </defs>

            ${i.map(e=>this._renderLine(e))}
            ${this._renderCenter(s)}
            ${i.map(t=>this._renderNode(t,e))}
          </svg>
        </div>

        ${r?this._renderFooter():q}
      </ha-card>
    `}_readPower(e){if(!e?.power)return{value:0,available:!1};const t=Ee(this.hass,e.power);if(!t)return{value:0,available:!1};const i=function(e){const t=Pe(e);if(!Number.isFinite(t))return NaN;const i=(e?.attributes?.unit_of_measurement??"").toString();return/^mw$/i.test(i)?1e3*t:/^kw$/i.test(i)?t:(/^w$/i.test(i),t/1e3)}(t);if(!Number.isFinite(i))return{value:0,available:!1};return{value:e.invert?-i:i,available:!0}}_readEcoScore(){const e=this._config?.eco_score;if(!e)return;const t=Pe(Ee(this.hass,e));return Number.isFinite(t)?t>=0&&t<=1?Math.round(100*t):t>=0&&t<=100?Math.round(t):void 0:void 0}_computeHomeFallback(e){const t=Math.max(0,e.solar),i=Math.max(0,e.grid),s=Math.max(0,-e.grid),r=t+i+Math.max(0,e.libbi)-s-Math.max(0,-e.libbi)-Math.max(0,e.zappi)-Math.max(0,e.eddi);return Math.max(0,r)}_buildNodes(e){const t=this._config,i=["home","grid","solar","libbi","zappi","eddi"],s={home:this._readPower(t.home),grid:this._readPower(t.grid),solar:this._readPower(t.solar),libbi:this._readPower(t.libbi),zappi:this._readPower(t.zappi),eddi:this._readPower(t.eddi)};if(!s.home.available){const e=Object.fromEntries(i.map(e=>[e,s[e].value]));(s.grid.available||s.solar.available||s.libbi.available||s.zappi.available||s.eddi.available)&&(s.home={value:this._computeHomeFallback(e),available:!0})}t.power_unit;const r=[];for(const o of i){const i=t[o]??void 0,n=Boolean(i?.power);if("home"!==o&&!n)continue;if("home"===o&&!s.home.available)continue;const a=Se[o],{value:l,available:h}=s[o],c=Ne(l,e);let d="none";0!==c&&(d=this._flowForSlot(o,c));const p=Ae[o],u=ke(be,we,135,p),g=ke(be,we,189,p),f=g.x<be-4?"end":g.x>be+4?"start":"middle";let m,$,y=a.color,_=i?.icon??a.icon;if("libbi"===o){const e=t.libbi;$=Ce(Ee(this.hass,e?.soc)),_=this._batteryIcon($),y=c>0?"var(--myenergi-orange)":c<0?"var(--myenergi-green)":"var(--myenergi-orange)",m=c>0?"play":c<0?"charging":"pause"}else if("zappi"===o){const e=t.zappi,i=Ee(this.hass,e?.plug)?.state,s=Ee(this.hass,e?.status)?.state;(i?!["off","unplugged","disconnected","unavailable","unknown"].includes(String(i).toLowerCase()):0!==c)?c>0?(y="var(--myenergi-green)",m=/boost/i.test(String(s))?"bolt":"play"):y="var(--myenergi-grey)":(y="var(--myenergi-grey)",m="plug-off")}else"grid"===o&&(y=c>0?"var(--myenergi-orange)":"var(--myenergi-green)");r.push({slot:o,x:u.x,y:u.y,labelX:g.x,labelY:g.y,labelAnchor:f,name:i?.name??a.name,icon:_,color:y,power:c,displayPower:Math.abs(c),available:h,flow:d,badge:m,soc:$})}return r}_flowForSlot(e,t){switch(e){case"solar":return t>0?"in":"none";case"home":case"eddi":return t>0?"out":"none";case"grid":case"libbi":return t>0?"in":"out";case"zappi":return t>0?"out":"in";default:return"none"}}_batteryIcon(e){return void 0===e||e>=95?"mdi:battery":e>=80?"mdi:battery-90":e>=65?"mdi:battery-70":e>=50?"mdi:battery-50":e>=35?"mdi:battery-30":e>=15?"mdi:battery-20":"mdi:battery-10"}_renderLine(e){const t=Me(be,we,e.x,e.y,42),i=Me(e.x,e.y,be,we,xe),s=[];if("none"!==e.flow){const r="in"===e.flow?i:t,o="in"===e.flow?t:i,n=`flow-${e.slot}`;s.push(V`
        <path
          id=${n}
          d=${`M ${r.x} ${r.y} L ${o.x} ${o.y}`}
          fill="none"
          stroke="none"
        />
        ${[0,.33,.66].map(e=>V`
            <use href="#me-chevron" class="animated-chevron">
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                begin=${-1.8*e+"s"}
              >
                <mpath href=${`#${n}`} />
              </animateMotion>
            </use>
          `)}
      `)}return V`
      <g>
        <line
          class="line"
          x1=${t.x}
          y1=${t.y}
          x2=${i.x}
          y2=${i.y}
        />
        ${s}
      </g>
    `}_renderCenter(e){const t=void 0!==e?`${e}%`:"";return V`
      <g>
        <circle
          class="node-bg"
          cx=${be}
          cy=${we}
          r=${42}
          stroke="var(--myenergi-green)"
        />
        ${this._renderIcon("mdi:leaf",be,we-(void 0!==e?12:0),24,"var(--myenergi-green)")}
        ${void 0!==e?V`<text class="center-label" x=${be} y=${we+14}>${t}</text>`:q}
      </g>
    `}_renderNode(e,t){const i=ye({dim:!e.available}),s=e.available?function(e,t,i=1){if(!Number.isFinite(e))return"—";const s=Math.abs(e);return"W"===t||s<1?`${Math.round(1e3*s)} W`:`${s.toFixed(i)} kW`}(e.displayPower,t):"—",r=this._shouldShowName(e),o=e.y<=we+1,n=o?e.y-xe-6:e.y+xe+6+10,a=o?n-14:n+14;return V`
      <g class=${i}>
        <title>${e.name} – ${s}</title>

        ${r?V`<text
                class="node-label"
                x=${e.x}
                y=${a}
                fill=${e.color}
              >${e.name}</text>`:q}

        <text
          class="node-value"
          x=${e.x}
          y=${n}
          fill=${e.color}
        >${s}</text>

        <circle
          class="node-bg"
          cx=${e.x}
          cy=${e.y}
          r=${xe}
          stroke=${e.color}
        />
        ${this._renderBatteryFill(e)}
        ${this._renderIcon(e.icon,e.x,e.y,28,e.color)}
        ${this._renderBadge(e)}
      </g>
    `}_shouldShowName(e){const t=this._config;if(!t)return!1;const i=t[e.slot];return void 0!==i?.name?Boolean(i.name):"libbi"===e.slot}_renderBatteryFill(e){if("libbi"!==e.slot||void 0===e.soc)return q;const t=Math.max(0,Math.min(100,e.soc))/100*30*2,i=e.y+30-t,s=`clip-${e.slot}`;return V`
      <defs>
        <clipPath id=${s}>
          <circle cx=${e.x} cy=${e.y} r=${30} />
        </clipPath>
      </defs>
      <rect
        x=${e.x-30}
        y=${i}
        width=${60}
        height=${t}
        fill=${e.color}
        opacity="0.14"
        clip-path=${`url(#${s})`}
      />
    `}_renderIcon(e,t,i,s,r){return V`
      <foreignObject
        x=${t-s/2}
        y=${i-s/2}
        width=${s}
        height=${s}
        style="overflow: visible;"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style=${`\n            width:${s}px;\n            height:${s}px;\n            display:flex;\n            align-items:center;\n            justify-content:center;\n            color:${r};\n          `}
        >
          <ha-icon
            icon=${e}
            style=${`--mdc-icon-size:${s}px;color:${r};`}
          ></ha-icon>
        </div>
      </foreignObject>
    `}_renderBadge(e){if(!e.badge)return q;const t=e.x+27,i=e.y-27,s="plug-off"===e.badge;return V`
      <g>
        <circle
          cx=${t}
          cy=${i}
          r=${9}
          fill=${s?"var(--myenergi-blue)":"var(--myenergi-bg)"}
          stroke=${s?"var(--myenergi-blue)":"var(--myenergi-fg)"}
          stroke-width=${s?0:1}
        />
        ${this._renderBadgeGlyph(e.badge,t,i)}
      </g>
    `}_renderBadgeGlyph(e,t,i){switch(e){case"play":return V`<path d=${`M ${t-2.5} ${i-3.5} L ${t+3.5} ${i} L ${t-2.5} ${i+3.5} Z`} fill="var(--myenergi-fg)" />`;case"pause":return V`
          <rect x=${t-3} y=${i-3} width="2" height="6" fill="var(--myenergi-fg)" />
          <rect x=${t+1} y=${i-3} width="2" height="6" fill="var(--myenergi-fg)" />
        `;case"charging":case"bolt":return V`<path d=${`M ${t-1} ${i-4} L ${t+3} ${i-1} L ${t} ${i-1} L ${t+2} ${i+4} L ${t-3} ${i+1} L ${t} ${i+1} Z`} fill="var(--myenergi-fg)" />`;default:return V`
          <g fill="none" stroke="var(--myenergi-fg)" stroke-width="1.2" stroke-linecap="round">
            <path d=${`M ${t-3.5} ${i-1} L ${t-1.5} ${i-3} M ${t-1.5} ${i-3} L ${t+1} ${i-.5} L ${t-1} ${i+1.5} L ${t-3.5} ${i-1} Z`} />
            <line x1=${t-4} y1=${i+4} x2=${t+4} y2=${i-4} stroke="var(--myenergi-fg)" stroke-width="1.4" />
          </g>
        `}}_renderFooter(){return W`
      <div class="footer">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M 2 3 L 6 3 L 8 8 L 10 3 L 14 3 L 10 13 L 6 13 Z"
            fill="var(--myenergi-green)"
          />
        </svg>
        <span>myenergi</span>
      </div>
    `}};Ue.styles=Oe,e([ge({attribute:!1})],Ue.prototype,"hass",void 0),e([fe()],Ue.prototype,"_config",void 0),Ue=e([de(_e)],Ue);const Le=["sensor","input_number"],Re=[{slot:"grid",label:"Grid",extraFields:[]},{slot:"solar",label:"Solar",extraFields:[]},{slot:"home",label:"Home",extraFields:[]},{slot:"libbi",label:"Libbi (Battery)",extraFields:[{key:"soc",label:"State of charge",domains:["sensor"]}]},{slot:"zappi",label:"Zappi (EV Charger)",extraFields:[{key:"plug",label:"Plug state",domains:["binary_sensor","input_boolean","switch"]},{key:"status",label:"Status",domains:["sensor","input_select","input_text"]}]},{slot:"eddi",label:"Eddi (Hot Water)",extraFields:[]}];let He=class extends he{setConfig(e){this._config={...e}}render(){return this.hass&&this._config?W`
      <div class="section">
        <h3>General</h3>
        <div class="row">
          <ha-textfield
            label="Title"
            .value=${this._titleValue()}
            @input=${e=>this._updateTitle(e.target.value)}
          ></ha-textfield>
          ${this._entityPicker("eco_score","Eco score entity",["sensor"])}
        </div>
        <div class="row">
          <ha-select
            label="Power unit"
            .value=${this._config.power_unit??"kW"}
            @selected=${e=>{const t=e.detail.value;t&&this._updateRoot({power_unit:t})}}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="W">W</mwc-list-item>
          </ha-select>
          <ha-textfield
            label="Flow threshold (kW)"
            type="number"
            step="0.01"
            .value=${String(this._config.flow_threshold??.05)}
            @input=${e=>{const t=Number(e.target.value);this._updateRoot({flow_threshold:Number.isFinite(t)?t:void 0})}}
          ></ha-textfield>
        </div>
        <div class="row">
          <ha-formfield label="Show footer">
            <ha-switch
              .checked=${!1!==this._config.show_footer}
              @change=${e=>this._updateRoot({show_footer:e.target.checked})}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>

      ${Re.map(e=>this._renderSlot(e))}
    `:q}_renderSlot(e){const t=this._config?.[e.slot]??{};return W`
      <div class="section">
        <h3>${e.label}</h3>
        <div class="row">
          ${this._slotEntityPicker(e.slot,"power","Power entity",Le)}
          <ha-textfield
            label="Name"
            .value=${String(t.name??"")}
            @input=${t=>this._updateSlot(e.slot,{name:t.target.value||void 0})}
          ></ha-textfield>
        </div>
        ${e.extraFields.length?W`
              <div class="row">
                ${e.extraFields.map(t=>this._slotEntityPicker(e.slot,t.key,t.label,t.domains))}
              </div>
            `:q}
        <div class="row">
          <ha-formfield label="Invert sign">
            <ha-switch
              .checked=${Boolean(t.invert)}
              @change=${t=>this._updateSlot(e.slot,{invert:t.target.checked||void 0})}
            ></ha-switch>
          </ha-formfield>
          <ha-textfield
            label="Icon (optional)"
            .value=${String(t.icon??"")}
            placeholder="mdi:home"
            @input=${t=>this._updateSlot(e.slot,{icon:t.target.value||void 0})}
          ></ha-textfield>
        </div>
      </div>
    `}_titleValue(){const e=this._config?.title;return!1===e?"":e??""}_updateTitle(e){this._updateRoot({title:e||void 0})}_entityPicker(e,t,i){return W`
      <ha-entity-picker
        .hass=${this.hass}
        label=${t}
        .value=${this._config?.[e]??""}
        allow-custom-entity
        .includeDomains=${i}
        @value-changed=${t=>{const i=t.detail.value;this._updateRoot({[e]:i||void 0})}}
      ></ha-entity-picker>
    `}_slotEntityPicker(e,t,i,s){const r=(this._config?.[e]??{})[t]??"";return W`
      <ha-entity-picker
        .hass=${this.hass}
        label=${i}
        .value=${r}
        allow-custom-entity
        .includeDomains=${s}
        @value-changed=${i=>{const s=i.detail.value;this._updateSlot(e,{[t]:s||void 0})}}
      ></ha-entity-picker>
    `}_updateRoot(e){if(!this._config)return;const t={...this._config,...e};for(const e of Object.keys(t))void 0===t[e]&&delete t[e];this._config=t,this._emitChange()}_updateSlot(e,t){if(!this._config)return;const i={...this._config[e]??{},...t};for(const e of Object.keys(i))void 0!==i[e]&&""!==i[e]||delete i[e];const s={...this._config};0===Object.keys(i).length?delete s[e]:s[e]=i,this._config=s,this._emitChange()}_emitChange(){this._config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};He.styles=n`
    :host {
      display: block;
    }
    .section {
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .section h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }
    .row.full {
      grid-template-columns: 1fr;
    }
    ha-textfield,
    ha-entity-picker,
    ha-icon-picker,
    ha-select,
    ha-formfield {
      width: 100%;
    }
  `,e([ge({attribute:!1})],He.prototype,"hass",void 0),e([fe()],He.prototype,"_config",void 0),He=e([de(ve)],He);var Te=Object.freeze({__proto__:null,get MyenergiCardEditor(){return He}});export{Ue as MyenergiCard};
//# sourceMappingURL=myenergi-card.js.map
