(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],[,,,,,,function(e,t,a){e.exports=a.p+"static/media/skyClear.82e74c51.svg"},function(e,t,a){e.exports=a.p+"static/media/skyClearNight.9b4212b8.svg"},function(e,t,a){e.exports=a.p+"static/media/rain.6e343b68.svg"},function(e,t,a){e.exports=a.p+"static/media/rainNight.8f7efdf5.svg"},function(e,t,a){e.exports=a.p+"static/media/showerRain.d6f51fa8.svg"},function(e,t,a){e.exports=a.p+"static/media/fewClouds.36915a3a.svg"},function(e,t,a){e.exports=a.p+"static/media/fewCloudsNight.3abe0a8b.svg"},function(e,t,a){e.exports=a.p+"static/media/clouds.63473ede.svg"},function(e,t,a){e.exports=a.p+"static/media/thunderstorm.c352a1ea.svg"},function(e,t,a){e.exports=a.p+"static/media/snow.619a0c2b.svg"},function(e,t,a){e.exports=a.p+"static/media/mist.ce32e208.svg"},,,function(e,t,a){e.exports=a(26)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(2),i=a.n(c),s=(a(24),a(1)),o=(a(25),a(3)),l=a(4),u=a(18),m=r.a.createContext();function d(e){var t=e.label,a=Object(u.a)(e,["label"]);return r.a.createElement("label",{className:"radio"},r.a.createElement("input",Object.assign({type:"radio",name:"units"},a)),t)}function f(e){localStorage.setItem("settings",JSON.stringify(e))}function v(e){var t=e.children,a=function(e){var t=JSON.parse(localStorage.getItem("settings"));return t||(f(e),e)}({units:"metric",location:"Cairo,EG"}),c=Object(n.useState)(a),i=Object(s.a)(c,2),o=i[0],l=function(e){return function(t){e(t),f(t)}}(i[1]);return r.a.createElement(m.Provider,{value:{settings:o,updateSettings:l}},t)}var h=function(){var e=Object(n.useContext)(m),t=e.settings,a=e.updateSettings,c=t.units,i=t.location;return r.a.createElement("div",null,r.a.createElement("form",{onChange:function(e){return function(e,t,a){var n=e.target.name,r=e.target.value;t(Object(l.a)(Object(l.a)({},a),{},Object(o.a)({},n,r)))}(e,a,t)}},r.a.createElement("div",{className:"field"},r.a.createElement("label",{className:"label"},"Units"),r.a.createElement("div",{className:"control"},r.a.createElement(d,{label:"C (metric)",value:"metric",defaultChecked:"metric"===c}),r.a.createElement(d,{label:"F (imperial)",value:"imperial",defaultChecked:"imperial"===c}))),r.a.createElement("div",{className:"field"},r.a.createElement("label",{className:"label"},"Location"),r.a.createElement("div",{className:"control"},r.a.createElement("input",{className:"input",name:"location",type:"text",placeholder:"Weather location",defaultValue:i})))))};function g(){var e=Object(n.useContext)(m).settings.location;return r.a.createElement("div",null,r.a.createElement("h4",{className:"has-text-centered is-family-sans-serif is-size-4 has-text-dark"},e))}function p(e){var t=e.digits,a=e.children;return r.a.createElement("div",{className:"column"},r.a.createElement("h1",{style:{fontSize:"6rem"}},t," ",a))}var E=function(){var e=Object(n.useState)(new Date),t=Object(s.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){var e=setInterval((function(){return c(new Date)}),1e3);return function(){clearInterval(e)}}),[]),r.a.createElement("section",null,r.a.createElement("div",{className:"columns has-text-centered is-family-sans-serif"},r.a.createElement(p,{digits:a.getHours()}),r.a.createElement(p,{digits:a.getMinutes()}),r.a.createElement(p,{digits:a.getSeconds()})))};function b(){return r.a.createElement("section",null,r.a.createElement("div",{className:"has-text-centered is-family-sans-serif is-size-5 mb-3 mt-3"},r.a.createElement("h2",{className:"has-text-dark"},(new Date).toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"}))))}function w(e){var t=e.setIsModalShown,a=document.getElementById("settings");return i.a.createPortal(r.a.createElement("div",{className:"modal is-active"},r.a.createElement("div",{className:"modal-background"}),r.a.createElement("div",{className:"modal-card"},r.a.createElement("header",{className:"modal-card-head"},r.a.createElement("p",{className:"modal-card-title"},"Settings"),r.a.createElement("button",{className:"delete","aria-label":"close",onClick:function(){return t(!1)}})),r.a.createElement("section",{className:"modal-card-body"},r.a.createElement(h,null)))),a)}function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function y(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var x=r.a.createElement("path",{d:"M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"}),O=function(e){var t=e.svgRef,a=e.title,n=y(e,["svgRef","title"]);return r.a.createElement("svg",N({width:24,height:24,viewBox:"0 0 24 24",ref:t},n),a?r.a.createElement("title",null,a):null,x)},j=r.a.forwardRef((function(e,t){return r.a.createElement(O,N({svgRef:t},e))}));a.p;function S(e){var t=e.setIsModalShown;return r.a.createElement("nav",{className:"navbar",role:"navigation","aria-label":"main navigation"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement("span",{className:"navbar-item",style:{cursor:"pointer",fill:"#CCCCCC",width:"4 rem"},onClick:function(){return t(!0)}},r.a.createElement(j,null))))}function k(e,t){var a="https://api.openweathermap.org/data/2.5/".concat(e,"?"),n=Object.entries(t).reduce((function(e,t){return e.concat(t[0],"=",t[1],"&")}),"");return a.concat(n)}var C="4b1ca1786a17f5e1dd0cff314c7bd99f";function I(e){var t=e.minTemperature,a=e.maxTemperature,n=e.day,c=e.describtion,i=e.icon;t=parseInt(t),a=parseInt(a);return r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"container is-family-sans-serif has-text-centered"},r.a.createElement("figure",{className:"image is-64x64",style:{margin:"auto"}},r.a.createElement("img",{src:i,alt:c})),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"columns"},r.a.createElement("h1",{className:"column is-size-4 has-text-weight-medium"},t),r.a.createElement("h1",{className:"column is-size-4 has-text-weight-medium has-text-grey"},a)),r.a.createElement("h3",{className:"has-text-weight-light is-size-3"},n))))}var z=a(6),W=a.n(z),R=a(7),D=a.n(R),M=a(8),P=a.n(M),B=a(9),T=a.n(B),A=a(10),L=a.n(A),J=a(11),U=a.n(J),G=a(12),q=a.n(G),H=a(13),_=a.n(H),F=a(14),V=a.n(F),$=a(15),K=a.n($),Q=a(16),X=a.n(Q);function Y(){var e=(new Date).getHours();return e>6&&e<20}function Z(e,t,a){return e>=t&&e<a}function ee(e,t){return Z(e,200,300)?V.a:Z(e,300,500)?Y()||t?P.a:T.a:Z(e,500,600)?L.a:Z(e,600,700)?K.a:Z(e,700,800)?X.a:800===e?Y()||t?W.a:D.a:Z(e,801,803)?Y()||t?U.a:q.a:_.a}function te(e){var t=e.units,a=e.location,c=Object(n.useState)([]),i=Object(s.a)(c,2),o=i[0],l=i[1];return Object(n.useEffect)((function(){var e=k("forecast",{q:a,units:t,appid:C}),n=[];fetch(e).then((function(e){return e.json()})).then((function(e){for(var t=e.list,a=t[0],r=function(e,r){var c=t.find((function(e){return e.dt>=a.dt+r}));c&&n.push(c)},c=0,i=a.dt;c<=4;i=86400*c,c++)r(0,i);l(n)})).catch((function(){}))}),[t,a]),o.map((function(e){return r.a.createElement(I,{key:e.dt,maxTemperature:e.main.temp_max,minTemperature:e.main.temp_min,describtion:e.weather[0].description,icon:ee(e.weather[0].id,!0),day:(t=e.dt,new Date(1e3*t).toLocaleDateString("en-GB",{weekday:"long"}))});var t}))}var ae=a(17),ne=function e(t,a,n,r){Object(ae.a)(this,e),this.temperature=t,this.description=a,this.icon=n,this.day=r};function re(e){var t=e.units,a=e.location,c=Object(n.useState)(new ne),i=Object(s.a)(c,2),o=i[0],l=i[1];return Object(n.useEffect)((function(){var e=k("weather",{q:a,units:t,appid:C});fetch(e).then((function(e){return e.json()})).then((function(e){var t=parseInt(e.main.temp),a=e.weather[0].description,n=ee(e.weather[0].id);l(new ne(t,a,n,"Now"))})).catch((function(){}))}),[t,a]),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"has-text-centered is-family-sans-serif"},r.a.createElement("figure",{className:"image is-128x128 mb-2",style:{margin:"auto"}},r.a.createElement("img",{src:o.icon,alt:o.describtion})),r.a.createElement("h1",{className:"is-size-3 has-text-weight-bold"},o.temperature),r.a.createElement("h3",{className:"has-text-weight-light is-size-2"},o.day)))}function ce(){var e=Object(n.useContext)(m).settings,t=e.units,a=e.location.replace(/\s/g,"");return r.a.createElement("section",null,r.a.createElement("div",{className:"columns is-vcentered is-centered mb-2"},r.a.createElement(re,{units:t,location:a}),r.a.createElement(te,{units:t,location:a})))}var ie=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],c=t[1];return r.a.createElement(v,null,r.a.createElement(S,{setIsModalShown:c}),r.a.createElement("div",{className:"container"},r.a.createElement(E,null),r.a.createElement(b,null),r.a.createElement(ce,null),r.a.createElement(g,null),a&&r.a.createElement(w,{setIsModalShown:c})))},se=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function oe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}document.body.style.backgroundColor="#fffff",i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ie,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/weather",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/weather","/service-worker.js");se?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):oe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):oe(t,e)}))}}()}],[[19,1,2]]]);
//# sourceMappingURL=main.cd0c0e3c.chunk.js.map