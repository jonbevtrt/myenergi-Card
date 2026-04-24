function e(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",$=m.reactiveElementPolyfillSupport,y=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),v={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&h(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,$?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=e=>e,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,M="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,L=`<${P}>`,k=document,N=()=>k.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,H="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,R=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,I=/"/g,D=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),F=W(1),Z=W(2),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,Q=k.createTreeWalker(k,129);function J(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let a,l,h=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===z?"!--"===l[1]?o=T:void 0!==l[1]?o=R:void 0!==l[2]?(D.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=s??z,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?I:B):o===I||o===B?o=j:o===T||o===R?o=z:(o=j,s=void 0);const d=o===j&&e[t+1].startsWith("/>")?" ":"";n+=o===z?i+L:h>=0?(r.push(a),i.slice(0,h)+M+i.slice(h)+C+d):i+C+(-2===h?t:d)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Y{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[l,h]=K(e,t);if(this.el=Y.createElement(l,i),Q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Q.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(M)){const t=h[n++],i=r.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?re:"?"===o[1]?se:"@"===o[1]?ne:ie}),r.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(D.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],N()),Q.nextNode(),a.push({type:2,index:++s});r.append(e[t],N())}}}else if(8===r.nodeType)if(r.data===P)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)a.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===V)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??k).importNode(t,!0);Q.currentNode=r;let s=Q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new te(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new oe(s,this,e)),this._$AV.push(t),a=i[++o]}n!==a?.index&&(s=Q.nextNode(),n++)}return Q.currentNode=k,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),O(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Y(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new te(this.O(N()),this.O(N()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(void 0===s)e=X(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const r=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=X(this,r[i+o],t,o),a===V&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===q?e=q:e!==q&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ne extends ie{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===V)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae=x.litHtmlPolyfillSupport;ae?.(Y,te),(x.litHtmlVersions??=[]).push("3.3.2");const le=globalThis;let he=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new te(t.insertBefore(N(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};he._$litElement$=!0,he.finalized=!0,le.litElementHydrateSupport?.({LitElement:he});const ce=le.litElementPolyfillSupport;ce?.({LitElement:he}),(le.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},ue=(e=pe,t,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function me(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return me({...e,state:!0,attribute:!1})}const fe=1;class $e{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const ye=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends $e{constructor(e){if(super(e),e.type!==fe||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return V}}),_e="myenergi-card",be="myenergi-card-editor",ve=200,we=220,xe=36,Ae={home:270,grid:330,solar:30,eddi:90,zappi:150,libbi:210},Ee={home:{name:"Home",icon:"mdi:home-variant-outline",color:"var(--myenergi-magenta)"},grid:{name:"Grid",icon:"mdi:transmission-tower",color:"var(--myenergi-orange)"},solar:{name:"Solar",icon:"mdi:solar-panel",color:"var(--myenergi-green)"},libbi:{name:"LIBBI",icon:"mdi:battery-high",color:"var(--myenergi-orange)"},zappi:{name:"ZAPPI",icon:"mdi:car-electric-outline",color:"var(--myenergi-grey)"},eddi:{name:"EDDI",icon:"mdi:water-boiler",color:"var(--myenergi-red)"}};function Se(e,t){if(e&&t)return e.states[t]}function Me(e){if(!e)return NaN;const t=e.state;if(null==t)return NaN;if("unknown"===t||"unavailable"===t||""===t)return NaN;const i=Number(t);return Number.isFinite(i)?i:NaN}function Ce(e){const t=Me(e);if(Number.isFinite(t))return t>=0&&t<=1?Math.round(100*t):t>=0&&t<=100?Math.round(t):void 0}function Pe(e,t,i,r){const s=r*Math.PI/180;return{x:e+i*Math.cos(s),y:t+i*Math.sin(s)}}function Le(e,t,i,r,s){const n=i-e,o=r-t,a=Math.hypot(n,o)||1;return{x:e+n/a*s,y:t+o/a*s}}function ke(e,t){return Number.isFinite(e)?Math.abs(e)<t?0:e:0}const Ne=o`
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
    stroke: none;
  }

  .animated-chevron {
    /* SMIL animateMotion drives position; a subtle CSS fade-in/out
       gives the same "breathing" pulse as the myenergi app. */
    animation: chevron-pulse 1.8s ease-in-out infinite;
  }

  @keyframes chevron-pulse {
    0%,
    100% {
      opacity: 0.15;
    }
    50% {
      opacity: 1;
    }
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
`;function Oe(e,t,i,r){return Z`
    <g
      transform=${`translate(${t} ${i})`}
      fill="none"
      stroke=${r}
      stroke-width=${1.9}
      stroke-linecap="round"
      stroke-linejoin="round"
    >${e}</g>
  `}function Ue(e,t,i,r){switch(e){case"home":return Oe(Z`
    <path d="M -10 -2 L 0 -12 L 10 -2 L 10 10 L -10 10 Z" />
    <path d="M -4 4 Q 0 7 4 4" />
  `,t,i,r);case"grid":return Oe(Z`
    <path d="M -10 -12 L 10 -12" />
    <path d="M -8 -8 L 8 -8" />
    <path d="M -10 -12 L 0 0 L 10 -12" />
    <path d="M 10 -12 L 0 0 L -10 -12" />
    <path d="M 0 0 L -10 12" />
    <path d="M 0 0 L 10 12" />
    <path d="M -6 4 L 6 4" />
  `,t,i,r);case"libbi":return Oe(Z`
    <rect x="-7" y="-12" width="14" height="24" rx="2.5" />
    <rect x="-3" y="-14.5" width="6" height="2.5" rx="0.8" fill="currentColor" stroke="none" />
    <line x1="-4" y1="-5" x2="4" y2="-5" />
    <line x1="-4" y1="0" x2="4" y2="0" />
    <line x1="-4" y1="5" x2="4" y2="5" />
  `,t,i,r);case"solar":return Oe(Z`
    <path d="M -12 -6 L 12 -6 L 10 6 L -10 6 Z" />
    <line x1="-11" y1="0" x2="11" y2="0" />
    <line x1="-4" y1="-6" x2="-6" y2="6" />
    <line x1="4" y1="-6" x2="6" y2="6" />
    <line x1="0" y1="6" x2="0" y2="10" />
    <line x1="-4" y1="10" x2="4" y2="10" />
  `,t,i,r);case"zappi":return Oe(Z`
    <path d="M -12 3 L -10 -2 Q -8 -6 -4 -6 L 4 -6 Q 8 -6 10 -2 L 12 3 L 12 7 L -12 7 Z" />
    <circle cx="-6" cy="7" r="2.5" />
    <circle cx="6" cy="7" r="2.5" />
    <path d="M -4 -6 L -2 -1 L 2 -1 L 4 -6" />
  `,t,i,r);case"eddi":return Oe(Z`
    <rect x="-7" y="-11" width="14" height="22" rx="2" />
    <line x1="-7" y1="-4" x2="7" y2="-4" />
    <path d="M -5 2 Q -2.5 0 0 2 T 5 2" />
    <path d="M -5 6 Q -2.5 4 0 6 T 5 6" />
  `,t,i,r)}}console.info("%c myenergi-card %c v0.1.0 ","color:#fff;background:#2ecc71;font-weight:700;border-radius:3px 0 0 3px;padding:2px 6px;","color:#2ecc71;background:#0b0d10;border-radius:0 3px 3px 0;padding:2px 6px;"),window.customCards=window.customCards||[],window.customCards.push({type:_e,name:"myenergi Card",description:"Hexagonal power-flow visualisation for myenergi devices (Zappi, Eddi, Libbi, Harvi) in the style of the official myenergi app.",preview:!0,documentationURL:"https://github.com/"});let He=class extends he{static async getConfigElement(){return await Promise.resolve().then(function(){return Ze}),document.createElement(be)}static getStubConfig(){return{type:`custom:${_e}`,title:"myenergi",grid:{power:""},solar:{power:""},home:{power:""},libbi:{power:"",soc:""},zappi:{power:"",plug:""},eddi:{power:""}}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e}}getCardSize(){return 6}render(){if(!this._config||!this.hass)return q;const e=this._config.power_unit??"kW",t=this._config.flow_threshold??.05,i=this._buildNodes(t),r=this._readEcoScore(),s=!1!==this._config.show_footer,n=!1===this._config.title?void 0:this._config.title??"myenergi";return F`
      <ha-card>
        ${void 0!==n?F`
              <div class="header">
                <ha-icon icon="mdi:menu"></ha-icon>
                <div class="title">${n}</div>
              </div>
            `:q}

        <div class="diagram-wrap">
          <svg
            class="diagram"
            viewBox="0 0 ${400} ${400}"
            preserveAspectRatio="xMidYMid meet"
            aria-label="myenergi power flow"
          >
            ${i.map(e=>this._renderLine(e))}
            ${this._renderCenter(r)}
            ${i.map(t=>this._renderNode(t,e))}
          </svg>
        </div>

        ${s?this._renderFooter():q}
      </ha-card>
    `}_readPower(e){if(!e?.power)return{value:0,available:!1};const t=Se(this.hass,e.power);if(!t)return{value:0,available:!1};const i=function(e){const t=Me(e);if(!Number.isFinite(t))return NaN;const i=(e?.attributes?.unit_of_measurement??"").toString();return/^mw$/i.test(i)?1e3*t:/^kw$/i.test(i)?t:(/^w$/i.test(i),t/1e3)}(t);if(!Number.isFinite(i))return{value:0,available:!1};return{value:e.invert?-i:i,available:!0}}_readEcoScore(){const e=this._config?.eco_score;if(!e)return;const t=Me(Se(this.hass,e));return Number.isFinite(t)?t>=0&&t<=1?Math.round(100*t):t>=0&&t<=100?Math.round(t):void 0:void 0}_computeHomeFallback(e){const t=Math.max(0,e.solar),i=Math.max(0,e.grid),r=Math.max(0,-e.grid),s=t+i+Math.max(0,e.libbi)-r-Math.max(0,-e.libbi)-Math.max(0,e.zappi)-Math.max(0,e.eddi);return Math.max(0,s)}_buildNodes(e){const t=this._config,i=["home","grid","solar","libbi","zappi","eddi"],r={home:this._readPower(t.home),grid:this._readPower(t.grid),solar:this._readPower(t.solar),libbi:this._readPower(t.libbi),zappi:this._readPower(t.zappi),eddi:this._readPower(t.eddi)};if(!r.home.available){const e=Object.fromEntries(i.map(e=>[e,r[e].value]));(r.grid.available||r.solar.available||r.libbi.available||r.zappi.available||r.eddi.available)&&(r.home={value:this._computeHomeFallback(e),available:!0})}t.power_unit;const s=[];for(const n of i){const i=t[n]??void 0,o=Boolean(i?.power);if("home"!==n&&!o)continue;if("home"===n&&!r.home.available)continue;const a=Ee[n],{value:l,available:h}=r[n],c=ke(l,e);let d="none";0!==c&&(d=this._flowForSlot(n,c));const p=Ae[n],u=Pe(ve,we,135,p),m=Pe(ve,we,189,p),g=m.x<ve-4?"end":m.x>ve+4?"start":"middle";let f=a.color;const $=i?.icon??a.icon;let y,_;if("libbi"===n){const e=t.libbi;_=Ce(Se(this.hass,e?.soc)),f=c>0?"var(--myenergi-orange)":c<0?"var(--myenergi-green)":"var(--myenergi-orange)",y=c>0?"play":c<0?"charging":"pause"}else if("zappi"===n){const e=t.zappi,i=Se(this.hass,e?.plug)?.state,r=Se(this.hass,e?.status)?.state;(i?!["off","unplugged","disconnected","unavailable","unknown"].includes(String(i).toLowerCase()):0!==c)?c>0?(f="var(--myenergi-green)",y=/boost/i.test(String(r))?"bolt":"play"):f="var(--myenergi-grey)":(f="var(--myenergi-grey)",y="plug-off")}else"grid"===n&&(f=c>0?"var(--myenergi-orange)":"var(--myenergi-green)");s.push({slot:n,x:u.x,y:u.y,labelX:m.x,labelY:m.y,labelAnchor:g,name:i?.name??a.name,icon:$,color:f,power:c,displayPower:Math.abs(c),available:h,flow:d,badge:y,soc:_})}return s}_flowForSlot(e,t){switch(e){case"solar":return t>0?"in":"none";case"home":case"eddi":return t>0?"out":"none";case"grid":case"libbi":return t>0?"in":"out";case"zappi":return t>0?"out":"in";default:return"none"}}_renderLine(e){const t=Le(ve,we,e.x,e.y,42),i=Le(e.x,e.y,ve,we,xe);let r=q;if("none"!==e.flow){const s="in"===e.flow?i:t,n="in"===e.flow?t:i,o=`flow-${e.slot}`,a=1.8,l=3;r=Z`
        <path
          id=${o}
          d=${`M ${s.x} ${s.y} L ${n.x} ${n.y}`}
          fill="none"
          stroke="none"
        />
        ${Array.from({length:l}).map((e,t)=>Z`
            <path
              d="M -4 -4 L 4 0 L -4 4 Z"
              class="chevron animated-chevron"
            >
              <animateMotion
                dur=${`${a}s`}
                repeatCount="indefinite"
                rotate="auto"
                begin=${`${-t*a/l}s`}
              >
                <mpath href=${`#${o}`} />
              </animateMotion>
            </path>
          `)}
      `}return Z`
      <g>
        <line
          class="line"
          x1=${t.x}
          y1=${t.y}
          x2=${i.x}
          y2=${i.y}
        />
        ${r}
      </g>
    `}_renderCenter(e){const t=void 0!==e?`${e}%`:"";return Z`
      <g>
        <circle
          class="node-bg"
          cx=${ve}
          cy=${we}
          r=${42}
          stroke="var(--myenergi-green)"
        />
        ${i=ve,r=we-(void 0!==e?10:0),s="var(--myenergi-green)",Z`
    <g
      transform=${`translate(${i} ${r})`}
      fill=${s}
      stroke=${s}
      stroke-width="1"
      stroke-linejoin="round"
    >
      <path d="M 10 -9 C 2 -10 -8 -6 -9 4 C -9 9 -6 10 -2 9 C 8 7 10 -1 10 -9 Z" />
      <path d="M -8 9 L 6 -6" stroke="var(--myenergi-bg)" stroke-width="1.4" fill="none" stroke-linecap="round" />
    </g>
  `}
        ${void 0!==e?Z`<text class="center-label" x=${ve} y=${we+14}>${t}</text>`:q}
      </g>
    `;var i,r,s}_renderNode(e,t){const i=ye({dim:!e.available}),r=e.available?function(e,t,i=1){if(!Number.isFinite(e))return"—";const r=Math.abs(e);return"W"===t||r<1?`${Math.round(1e3*r)} W`:`${r.toFixed(i)} kW`}(e.displayPower,t):"—",s=this._shouldShowName(e),n=e.y<=we+1,o=n?e.y-xe-6:e.y+xe+6+10,a=n?o-14:o+14;return Z`
      <g class=${i}>
        <title>${e.name} – ${r}</title>

        ${s?Z`<text
                class="node-label"
                x=${e.x}
                y=${a}
                fill=${e.color}
              >${e.name}</text>`:q}

        <text
          class="node-value"
          x=${e.x}
          y=${o}
          fill=${e.color}
        >${r}</text>

        <circle
          class="node-bg"
          cx=${e.x}
          cy=${e.y}
          r=${xe}
          stroke=${e.color}
        />
        ${this._renderBatteryFill(e)}
        ${this._renderNodeIcon(e)}
        ${this._renderBadge(e)}
      </g>
    `}_renderNodeIcon(e){const t=this._config?.[e.slot],i=t?.icon;return i&&/^mdi:/i.test(i)?this._renderIcon(i,e.x,e.y,28,e.color):Ue(e.slot,e.x,e.y,e.color)}_shouldShowName(e){const t=this._config;if(!t)return!1;const i=t[e.slot];return void 0!==i?.name?Boolean(i.name):"libbi"===e.slot}_renderBatteryFill(e){if("libbi"!==e.slot||void 0===e.soc)return q;const t=Math.max(0,Math.min(100,e.soc))/100*30*2,i=e.y+30-t,r=`clip-${e.slot}`;return Z`
      <defs>
        <clipPath id=${r}>
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
        clip-path=${`url(#${r})`}
      />
    `}_renderIcon(e,t,i,r,s){return Z`
      <foreignObject
        x=${t-r/2}
        y=${i-r/2}
        width=${r}
        height=${r}
        style="overflow: visible;"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style=${`\n            width:${r}px;\n            height:${r}px;\n            display:flex;\n            align-items:center;\n            justify-content:center;\n            color:${s};\n          `}
        >
          <ha-icon
            icon=${e}
            style=${`--mdc-icon-size:${r}px;color:${s};`}
          ></ha-icon>
        </div>
      </foreignObject>
    `}_renderBadge(e){if(!e.badge)return q;const t=e.x+27,i=e.y-27,r="plug-off"===e.badge;return Z`
      <g>
        <circle
          cx=${t}
          cy=${i}
          r=${9}
          fill=${r?"var(--myenergi-blue)":"var(--myenergi-bg)"}
          stroke=${r?"var(--myenergi-blue)":"var(--myenergi-fg)"}
          stroke-width=${r?0:1}
        />
        ${this._renderBadgeGlyph(e.badge,t,i)}
      </g>
    `}_renderBadgeGlyph(e,t,i){switch(e){case"play":return Z`<path d=${`M ${t-2.5} ${i-3.5} L ${t+3.5} ${i} L ${t-2.5} ${i+3.5} Z`} fill="var(--myenergi-fg)" />`;case"pause":return Z`
          <rect x=${t-3} y=${i-3} width="2" height="6" fill="var(--myenergi-fg)" />
          <rect x=${t+1} y=${i-3} width="2" height="6" fill="var(--myenergi-fg)" />
        `;case"charging":case"bolt":return Z`<path d=${`M ${t-1} ${i-4} L ${t+3} ${i-1} L ${t} ${i-1} L ${t+2} ${i+4} L ${t-3} ${i+1} L ${t} ${i+1} Z`} fill="var(--myenergi-fg)" />`;default:return Z`
          <g fill="none" stroke="var(--myenergi-fg)" stroke-width="1.2" stroke-linecap="round">
            <path d=${`M ${t-3.5} ${i-1} L ${t-1.5} ${i-3} M ${t-1.5} ${i-3} L ${t+1} ${i-.5} L ${t-1} ${i+1.5} L ${t-3.5} ${i-1} Z`} />
            <line x1=${t-4} y1=${i+4} x2=${t+4} y2=${i-4} stroke="var(--myenergi-fg)" stroke-width="1.4" />
          </g>
        `}}_renderFooter(){return F`
      <div class="footer">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M 2 3 L 6 3 L 8 8 L 10 3 L 14 3 L 10 13 L 6 13 Z"
            fill="var(--myenergi-green)"
          />
        </svg>
        <span>myenergi</span>
      </div>
    `}};He.styles=Ne,e([me({attribute:!1})],He.prototype,"hass",void 0),e([ge()],He.prototype,"_config",void 0),He=e([de(_e)],He);const ze=["sensor","input_number"],Te=e=>({entity:{multiple:!1,include_entities:void 0,filter:{domain:e}}}),Re=(e=[])=>[{name:"",type:"grid",schema:[{name:"power",selector:Te(ze)},{name:"name",selector:{text:{}}}]},...e,{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}}},{name:"invert",selector:{boolean:{}}}]}],je=[{name:"",type:"grid",schema:[{name:"title",selector:{text:{}}},{name:"eco_score",selector:Te(["sensor","input_number"])}]},{name:"",type:"grid",schema:[{name:"power_unit",selector:{select:{mode:"dropdown",options:[{value:"kW",label:"kW"},{value:"W",label:"W"}]}}},{name:"flow_threshold",selector:(Be=0,Ie=.01,De="kW",{number:{min:Be,step:Ie,unit_of_measurement:De,mode:"box"}})}]},{name:"show_footer",selector:{boolean:{}}},{name:"grid",type:"expandable",title:"Grid",icon:"mdi:transmission-tower",schema:Re()},{name:"solar",type:"expandable",title:"Solar",icon:"mdi:solar-panel",schema:Re()},{name:"home",type:"expandable",title:"Home",icon:"mdi:home-variant-outline",schema:Re()},{name:"libbi",type:"expandable",title:"Libbi (Battery)",icon:"mdi:battery-high",schema:Re([{name:"",type:"grid",schema:[{name:"soc",selector:Te(["sensor","input_number"])}]}])},{name:"zappi",type:"expandable",title:"Zappi (EV Charger)",icon:"mdi:car-electric-outline",schema:Re([{name:"",type:"grid",schema:[{name:"plug",selector:Te(["binary_sensor","input_boolean","switch"])},{name:"status",selector:Te(["sensor","input_select","input_text"])}]}])},{name:"eddi",type:"expandable",title:"Eddi (Hot Water)",icon:"mdi:water-boiler",schema:Re()}];var Be,Ie,De;const We={title:"Title",eco_score:"Eco score entity",power_unit:"Power unit",flow_threshold:"Flow threshold (kW)",show_footer:"Show footer",power:"Power entity",name:"Name",icon:"Icon (optional)",invert:"Invert sign",soc:"State of charge entity",plug:"Plug state entity",status:"Status entity",grid:"Grid",solar:"Solar",home:"Home",libbi:"Libbi (Battery)",zappi:"Zappi (EV Charger)",eddi:"Eddi (Hot Water)"};let Fe=class extends he{constructor(){super(...arguments),this._computeLabel=e=>We[e.name]??e.name,this._onValueChanged=e=>{if(e.stopPropagation(),!this._config)return;const t=e.detail.value,i={type:this._config.type};"string"==typeof t.title&&""!==t.title.trim()&&(i.title=t.title),t.eco_score&&(i.eco_score=t.eco_score),t.power_unit&&"kW"!==t.power_unit&&(i.power_unit=t.power_unit),"number"==typeof t.flow_threshold&&Number.isFinite(t.flow_threshold)&&.05!==t.flow_threshold&&(i.flow_threshold=t.flow_threshold),!1===t.show_footer&&(i.show_footer=!1);for(const e of["grid","solar","home","libbi","zappi","eddi"]){const r=t[e]??{},s={};for(const[e,t]of Object.entries(r))null!=t&&""!==t&&("invert"===e&&!1===t||(s[e]=t));Object.keys(s).length>0&&(i[e]=s)}this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}}setConfig(e){this._config={...e}}render(){if(!this.hass||!this._config)return q;const e=this._toFormData(this._config);return F`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${je}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._onValueChanged}
      ></ha-form>
    `}_toFormData(e){const t={title:"string"==typeof e.title?e.title:"",eco_score:e.eco_score??"",power_unit:e.power_unit??"kW",flow_threshold:e.flow_threshold??.05,show_footer:!1!==e.show_footer};for(const i of["grid","solar","home","libbi","zappi","eddi"])t[i]={...e[i]??{}};return t}};Fe.styles=o`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `,e([me({attribute:!1})],Fe.prototype,"hass",void 0),e([ge()],Fe.prototype,"_config",void 0),Fe=e([de(be)],Fe);var Ze=Object.freeze({__proto__:null,get MyenergiCardEditor(){return Fe}});export{He as MyenergiCard};
//# sourceMappingURL=myenergi-card.js.map
