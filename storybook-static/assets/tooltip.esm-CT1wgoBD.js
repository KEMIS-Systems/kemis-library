import{r as d}from"./index-BGsE_GxY.js";import{u as nt,P as rt,C as ot,a as it,b as at,c as lt,E as ut,d as st,e as ct,f as pt,g as q,h as ft,i as dt,j as Te}from"./portal.esm-BU1Y9Kmv.js";import{Z as k,D as h,c as Pe,O as vt}from"./utils.esm-EFZ4im7q.js";function $(){return $=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var c in n)({}).hasOwnProperty.call(n,c)&&(t[c]=n[c])}return t},$.apply(null,arguments)}function T(t){"@babel/helpers - typeof";return T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(o){return typeof o}:function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},T(t)}function mt(t,o){if(T(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var c=n.call(t,o);if(T(c)!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(o==="string"?String:Number)(t)}function yt(t){var o=mt(t,"string");return T(o)=="symbol"?o:o+""}function De(t,o,n){return(o=yt(o))in t?Object.defineProperty(t,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[o]=n,t}function J(t,o){(o==null||o>t.length)&&(o=t.length);for(var n=0,c=Array(o);n<o;n++)c[n]=t[n];return c}function ht(t){if(Array.isArray(t))return J(t)}function bt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Ce(t,o){if(t){if(typeof t=="string")return J(t,o);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(t,o):void 0}}function gt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Et(t){return ht(t)||bt(t)||Ce(t)||gt()}function wt(t){if(Array.isArray(t))return t}function St(t,o){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var c,i,x,S,y=[],w=!0,P=!1;try{if(x=(n=n.call(t)).next,o!==0)for(;!(w=(c=x.call(n)).done)&&(y.push(c.value),y.length!==o);w=!0);}catch(D){P=!0,i=D}finally{try{if(!w&&n.return!=null&&(S=n.return(),Object(S)!==S))return}finally{if(P)throw i}}return y}}function Ot(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(t,o){return wt(t)||St(t,o)||Ce(t,o)||Ot()}var Tt={root:function(o){var n=o.positionState,c=o.classNameState;return Pe("p-tooltip p-component",De({},"p-tooltip-".concat(n),!0),c)},arrow:"p-tooltip-arrow",text:"p-tooltip-text"},xt={arrow:function(o){var n=o.context;return{top:n.bottom?"0":n.right||n.left||!n.right&&!n.left&&!n.top&&!n.bottom?"50%":null,bottom:n.top?"0":null,left:n.right||!n.right&&!n.left&&!n.top&&!n.bottom?"0":n.top||n.bottom?"50%":null,right:n.left?"0":null}}},Pt=`
@layer primereact {
    .p-tooltip {
        position: absolute;
        padding: .25em .5rem;
        /* #3687: Tooltip prevent scrollbar flickering */
        top: -9999px;
        left: -9999px;
    }
    
    .p-tooltip.p-tooltip-right,
    .p-tooltip.p-tooltip-left {
        padding: 0 .25rem;
    }
    
    .p-tooltip.p-tooltip-top,
    .p-tooltip.p-tooltip-bottom {
        padding:.25em 0;
    }
    
    .p-tooltip .p-tooltip-text {
       white-space: pre-line;
       word-break: break-word;
    }
    
    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    
    .p-tooltip-right .p-tooltip-arrow {
        top: 50%;
        left: 0;
        margin-top: -.25rem;
        border-width: .25em .25em .25em 0;
    }
    
    .p-tooltip-left .p-tooltip-arrow {
        top: 50%;
        right: 0;
        margin-top: -.25rem;
        border-width: .25em 0 .25em .25rem;
    }
    
    .p-tooltip.p-tooltip-top {
        padding: .25em 0;
    }
    
    .p-tooltip-top .p-tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: .25em .25em 0;
    }
    
    .p-tooltip-bottom .p-tooltip-arrow {
        top: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: 0 .25em .25rem;
    }

    .p-tooltip-target-wrapper {
        display: inline-flex;
    }
}
`,W=ot.extend({defaultProps:{__TYPE:"Tooltip",appendTo:null,at:null,autoHide:!0,autoZIndex:!0,baseZIndex:0,className:null,closeOnEscape:!1,content:null,disabled:!1,event:null,hideDelay:0,hideEvent:"mouseleave",id:null,mouseTrack:!1,mouseTrackLeft:5,mouseTrackTop:5,my:null,onBeforeHide:null,onBeforeShow:null,onHide:null,onShow:null,position:"right",showDelay:0,showEvent:"mouseenter",showOnDisabled:!1,style:null,target:null,updateDelay:0,children:void 0},css:{classes:Tt,styles:Pt,inlineStyles:xt}});function xe(t,o){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);o&&(c=c.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,c)}return n}function Dt(t){for(var o=1;o<arguments.length;o++){var n=arguments[o]!=null?arguments[o]:{};o%2?xe(Object(n),!0).forEach(function(c){De(t,c,n[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):xe(Object(n)).forEach(function(c){Object.defineProperty(t,c,Object.getOwnPropertyDescriptor(n,c))})}return t}var Ct=d.memo(d.forwardRef(function(t,o){var n=nt(),c=d.useContext(rt),i=W.getProps(t,c),x=d.useState(!1),S=O(x,2),y=S[0],w=S[1],P=d.useState(i.position||"right"),D=O(P,2),E=D[0],B=D[1],Re=d.useState(""),Q=O(Re,2),U=Q[0],ee=Q[1],je=d.useState(!1),te=O(je,2),Ie=te[0],ne=te[1],re=y&&i.closeOnEscape,Le=it("tooltip",re),oe={props:i,state:{visible:y,position:E,className:U},context:{right:E==="right",left:E==="left",top:E==="top",bottom:E==="bottom"}},C=W.setMetaData(oe),Z=C.ptm,F=C.cx,Ae=C.sx,Me=C.isUnstyled;at(W.css.styles,Me,{name:"tooltip"}),lt({callback:function(){b()},when:re,priority:[ut.TOOLTIP,Le]});var p=d.useRef(null),R=d.useRef(null),f=d.useRef(null),j=d.useRef(null),I=d.useRef(!0),ie=d.useRef({}),ae=d.useRef(null),Ne=st({listener:function(e){!h.isTouchDevice()&&b(e)}}),le=O(Ne,2),He=le[0],_e=le[1],ke=ct({target:f.current,listener:function(e){b(e)},when:y}),ue=O(ke,2),We=ue[0],$e=ue[1],Be=function(e){return!(i.content||v(e,"tooltip"))},Ue=function(e){return!(i.content||v(e,"tooltip")||i.children)},K=function(e){return v(e,"mousetrack")||i.mouseTrack},se=function(e){return v(e,"disabled")==="true"||pe(e,"disabled")||i.disabled},ce=function(e){return v(e,"showondisabled")||i.showOnDisabled},L=function(){return v(f.current,"autohide")||i.autoHide},v=function(e,r){return pe(e,"data-pr-".concat(r))?e.getAttribute("data-pr-".concat(r)):null},pe=function(e,r){return e&&e.hasAttribute(r)},fe=function(e){var r=[v(e,"showevent")||i.showEvent],s=[v(e,"hideevent")||i.hideEvent];if(K(e))r=["mousemove"],s=["mouseleave"];else{var l=v(e,"event")||i.event;l==="focus"&&(r=["focus"],s=["blur"]),l==="both"&&(r=["focus","mouseenter"],s=Ie?["blur"]:["mouseleave","blur"])}return{showEvents:r,hideEvents:s}},de=function(e){return v(e,"position")||E},Ze=function(e){var r=v(e,"mousetracktop")||i.mouseTrackTop,s=v(e,"mousetrackleft")||i.mouseTrackLeft;return{top:r,left:s}},ve=function(e,r){if(R.current){var s=v(e,"tooltip")||i.content;s?(R.current.innerHTML="",R.current.appendChild(document.createTextNode(s)),r()):i.children&&r()}},me=function(e){ve(f.current,function(){var r=ae.current,s=r.pageX,l=r.pageY;i.autoZIndex&&!k.get(p.current)&&k.set("tooltip",p.current,c&&c.autoZIndex||Te.autoZIndex,i.baseZIndex||c&&c.zIndex.tooltip||Te.zIndex.tooltip),p.current.style.left="",p.current.style.top="",L()&&(p.current.style.pointerEvents="none");var u=K(f.current)||e==="mouse";(u&&!j.current||u)&&(j.current={width:h.getOuterWidth(p.current),height:h.getOuterHeight(p.current)}),ye(f.current,{x:s,y:l},e)})},A=function(e){e.type&&e.type==="focus"&&ne(!0),f.current=e.currentTarget;var r=se(f.current),s=Ue(ce(f.current)&&r?f.current.firstChild:f.current);if(!(s||r))if(ae.current=e,y)M("updateDelay",me);else{var l=N(i.onBeforeShow,{originalEvent:e,target:f.current});l&&M("showDelay",function(){w(!0),N(i.onShow,{originalEvent:e,target:f.current})})}},b=function(e){if(e&&e.type==="blur"&&ne(!1),be(),y){var r=N(i.onBeforeHide,{originalEvent:e,target:f.current});r&&M("hideDelay",function(){!L()&&I.current===!1||(k.clear(p.current),h.removeClass(p.current,"p-tooltip-active"),w(!1),N(i.onHide,{originalEvent:e,target:f.current}))})}else!i.onBeforeHide&&!he("hideDelay")&&w(!1)},ye=function(e,r,s){var l=0,u=0,m=s||E;if((K(e)||m=="mouse")&&r){var g={width:h.getOuterWidth(p.current),height:h.getOuterHeight(p.current)};l=r.x,u=r.y;var we=Ze(e),H=we.top,_=we.left;switch(m){case"left":l=l-(g.width+_),u=u-(g.height/2-H);break;case"right":case"mouse":l=l+_,u=u-(g.height/2-H);break;case"top":l=l-(g.width/2-_),u=u-(g.height+H);break;case"bottom":l=l-(g.width/2-_),u=u+H;break}l<=0||j.current.width>g.width?(p.current.style.left="0px",p.current.style.right=window.innerWidth-g.width-l+"px"):(p.current.style.right="",p.current.style.left=l+"px"),p.current.style.top=u+"px",h.addClass(p.current,"p-tooltip-active")}else{var G=h.findCollisionPosition(m),Je=v(e,"my")||i.my||G.my,Qe=v(e,"at")||i.at||G.at;p.current.style.padding="0px",h.flipfitCollision(p.current,e,Je,Qe,function(z){var Se=z.at,V=Se.x,et=Se.y,tt=z.my.x,Oe=i.at?V!=="center"&&V!==tt?V:et:z.at["".concat(G.axis)];p.current.style.padding="",B(Oe),Fe(Oe),h.addClass(p.current,"p-tooltip-active")})}},Fe=function(e){if(p.current){var r=getComputedStyle(p.current);e==="left"?p.current.style.left=parseFloat(r.left)-parseFloat(r.paddingLeft)*2+"px":e==="top"&&(p.current.style.top=parseFloat(r.top)-parseFloat(r.paddingTop)*2+"px")}},Ke=function(){L()||(I.current=!1)},Ye=function(e){L()||(I.current=!0,b(e))},Xe=function(e){if(e){var r=fe(e),s=r.showEvents,l=r.hideEvents,u=ge(e);s.forEach(function(m){return u==null?void 0:u.addEventListener(m,A)}),l.forEach(function(m){return u==null?void 0:u.addEventListener(m,b)})}},Ge=function(e){if(e){var r=fe(e),s=r.showEvents,l=r.hideEvents,u=ge(e);s.forEach(function(m){return u==null?void 0:u.removeEventListener(m,A)}),l.forEach(function(m){return u==null?void 0:u.removeEventListener(m,b)})}},he=function(e){return v(f.current,e.toLowerCase())||i[e]},M=function(e,r){be();var s=he(e);s?ie.current["".concat(e)]=setTimeout(function(){return r()},s):r()},N=function(e){if(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),l=1;l<r;l++)s[l-1]=arguments[l];var u=e.apply(void 0,s);return u===void 0&&(u=!0),u}return!0},be=function(){Object.values(ie.current).forEach(function(e){return clearTimeout(e)})},ge=function(e){if(e){if(ce(e)){if(!e.hasWrapper){var r=document.createElement("div"),s=e.nodeName==="INPUT";return s?h.addMultipleClasses(r,"p-tooltip-target-wrapper p-inputwrapper"):h.addClass(r,"p-tooltip-target-wrapper"),e.parentNode.insertBefore(r,e),r.appendChild(e),e.hasWrapper=!0,r}return e.parentElement}else if(e.hasWrapper){var l;(l=e.parentElement).replaceWith.apply(l,Et(e.parentElement.childNodes)),delete e.hasWrapper}return e}return null},ze=function(e){X(e),Y(e)},Y=function(e){Ee(e||i.target,Xe)},X=function(e){Ee(e||i.target,Ge)},Ee=function(e,r){if(e=vt.getRefElement(e),e)if(h.isElement(e))r(e);else{var s=function(u){var m=h.find(document,u);m.forEach(function(g){r(g)})};e instanceof Array?e.forEach(function(l){s(l)}):s(e)}};pt(function(){y&&f.current&&se(f.current)&&b()}),q(function(){return Y(),function(){X()}},[A,b,i.target]),q(function(){if(y){var a=de(f.current),e=v(f.current,"classname");a!==E&&B(a),e!==U&&ee(e),me(a),He(),We()}else B(i.position||"right"),ee(""),f.current=null,j.current=null,I.current=!0;return function(){_e(),$e()}},[y]),q(function(){var a=de(f.current);y&&a!=="mouse"&&M("updateDelay",function(){ve(f.current,function(){ye(f.current)})})},[i.content]),ft(function(){b(),k.clear(p.current)}),d.useImperativeHandle(o,function(){return{props:i,updateTargetEvents:ze,loadTargetEvents:Y,unloadTargetEvents:X,show:A,hide:b,getElement:function(){return p.current},getTarget:function(){return f.current}}});var Ve=function(){var e=Be(f.current),r=n({id:i.id,className:Pe(i.className,F("root",{positionState:E,classNameState:U})),style:i.style,role:"tooltip","aria-hidden":y,onMouseEnter:function(m){return Ke()},onMouseLeave:function(m){return Ye(m)}},W.getOtherProps(i),Z("root")),s=n({className:F("arrow"),style:Ae("arrow",Dt({},oe))},Z("arrow")),l=n({className:F("text")},Z("text"));return d.createElement("div",$({ref:p},r),d.createElement("div",s),d.createElement("div",$({ref:R},l),e&&i.children))};if(y){var qe=Ve();return d.createElement(dt,{element:qe,appendTo:i.appendTo,visible:!0})}return null}));Ct.displayName="Tooltip";export{Ct as T};
