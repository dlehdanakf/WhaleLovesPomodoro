!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=299)}({115:function(t,e,r){var n=r(300);t.exports=function(t,e){if("*"===t)return!0;var r=0===t.indexOf("*.")||0===t.indexOf("*/"),o=t.split("/"),s=o.shift(),a="/"+o.join("/");r&&(s=s.substr(2));var i=n.parse(e,!1,!1);return function(t,e,r){if(t===e)return!0;if(r&&e){var n=e.lastIndexOf(t);return n>=0&&n+t.length==e.length}return!1}(s,i.host,r)&&function(t,e){return 0==e.indexOf(t)}(a,i.pathname)}},299:function(t,e,r){"use strict";r.r(e);var n=r(115),o=r.n(n),s={mode:"work",status:"stop",workMode:null,siteMode:null,blockedSiteList:[]};function a(t){"active"!=t&&"run"==s.status&&"work"==s.mode&&"Online"==s.workMode&&chrome.runtime.sendMessage(chrome.runtime.id,JSON.stringify({type:"makeTomatoRotten",data:{message:"장기간 활동흔적이 없습니다.\n집중시간에 자리를 비우시면 안돼요!!  ( ｰ̀εｰ́ )"}}))}chrome.runtime.onMessage.addListener(function(t,e){var r,n=JSON.parse(t),i=n.data;switch(n.type){case"notification":return void function(t,e,r,n){var o=r,s=t,a=e;if(["pomodoro_normal.png","pomodoro_basket.png","pomodoro_rotten.png"].includes(r)||(o="pomodoro_normal.png"),t||(s="Whale loves Pomodoro"),e||(a="뽀모도로 타이머에 새로운 알림이 있습니다."),chrome.notifications.create("tomato-"+Math.random(),{type:"basic",iconUrl:chrome.runtime.getURL("dist/images/"+o),title:s,message:a}),n){var i=new Audio;i.src=chrome.runtime.getURL("./ringtone.mp3"),i.play()}}(i.title,i.message,i.icon);case"updateApplicationStatus":return void function(t){switch(s={mode:t.mode,status:t.status,workMode:t.workMode,siteMode:t.siteMode,blockedSiteList:t.blockedSiteList},status){case"run":return void chrome.idle.onStateChanged.addListener(a);case"pause":case"stop":case"loading":chrome.idle.onStateChanged.removeListener(a)}}(i);case"validateURL":return r=i.link,void("run"==s.status&&"work"==s.mode&&s.blockedSiteList.map(function(t){var e=o()(t,r);(e&&"Blacklist"==s.siteMode||!e&&"Whitelist"==s.siteMode)&&chrome.runtime.sendMessage(chrome.runtime.id,JSON.stringify({type:"makeTomatoRotten",data:{message:"집중시간인데 금지된 사이트에 접근하셨어요!!! (ᗒᗣᗕ)՞"}}))}))}})},300:function(t,e,r){"use strict";var n=r(301),o=r(303);function s(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}e.parse=b,e.resolve=function(t,e){return b(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?b(t,!1,!0).resolveObject(e):e},e.format=function(t){o.isString(t)&&(t=b(t));return t instanceof s?t.format():s.prototype.format.call(t)},e.Url=s;var a=/^([a-z0-9.+-]+:)/i,i=/:[0-9]*$/,h=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,u=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),c=["'"].concat(u),l=["%","/","?",";","#"].concat(c),f=["/","?","#"],p=/^[+a-z0-9A-Z_-]{0,63}$/,m=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,d={javascript:!0,"javascript:":!0},v={javascript:!0,"javascript:":!0},g={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},y=r(304);function b(t,e,r){if(t&&o.isObject(t)&&t instanceof s)return t;var n=new s;return n.parse(t,e,r),n}s.prototype.parse=function(t,e,r){if(!o.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var s=t.indexOf("?"),i=-1!==s&&s<t.indexOf("#")?"?":"#",u=t.split(i);u[0]=u[0].replace(/\\/g,"/");var b=t=u.join(i);if(b=b.trim(),!r&&1===t.split("#").length){var O=h.exec(b);if(O)return this.path=b,this.href=b,this.pathname=O[1],O[2]?(this.search=O[2],this.query=e?y.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var j=a.exec(b);if(j){var x=(j=j[0]).toLowerCase();this.protocol=x,b=b.substr(j.length)}if(r||j||b.match(/^\/\/[^@\/]+@[^@\/]+/)){var w="//"===b.substr(0,2);!w||j&&v[j]||(b=b.substr(2),this.slashes=!0)}if(!v[j]&&(w||j&&!g[j])){for(var A,C,k=-1,S=0;S<f.length;S++){-1!==(I=b.indexOf(f[S]))&&(-1===k||I<k)&&(k=I)}-1!==(C=-1===k?b.lastIndexOf("@"):b.lastIndexOf("@",k))&&(A=b.slice(0,C),b=b.slice(C+1),this.auth=decodeURIComponent(A)),k=-1;for(S=0;S<l.length;S++){var I;-1!==(I=b.indexOf(l[S]))&&(-1===k||I<k)&&(k=I)}-1===k&&(k=b.length),this.host=b.slice(0,k),b=b.slice(k),this.parseHost(),this.hostname=this.hostname||"";var q="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!q)for(var U=this.hostname.split(/\./),M=(S=0,U.length);S<M;S++){var R=U[S];if(R&&!R.match(p)){for(var L="",P=0,_=R.length;P<_;P++)R.charCodeAt(P)>127?L+="x":L+=R[P];if(!L.match(p)){var N=U.slice(0,S),T=U.slice(S+1),F=R.match(m);F&&(N.push(F[1]),T.unshift(F[2])),T.length&&(b="/"+T.join(".")+b),this.hostname=N.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),q||(this.hostname=n.toASCII(this.hostname));var E=this.port?":"+this.port:"",$=this.hostname||"";this.host=$+E,this.href+=this.host,q&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==b[0]&&(b="/"+b))}if(!d[x])for(S=0,M=c.length;S<M;S++){var z=c[S];if(-1!==b.indexOf(z)){var J=encodeURIComponent(z);J===z&&(J=escape(z)),b=b.split(z).join(J)}}var H=b.indexOf("#");-1!==H&&(this.hash=b.substr(H),b=b.slice(0,H));var K=b.indexOf("?");if(-1!==K?(this.search=b.substr(K),this.query=b.substr(K+1),e&&(this.query=y.parse(this.query)),b=b.slice(0,K)):e&&(this.search="",this.query={}),b&&(this.pathname=b),g[x]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){E=this.pathname||"";var W=this.search||"";this.path=E+W}return this.href=this.format(),this},s.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",r=this.pathname||"",n=this.hash||"",s=!1,a="";this.host?s=t+this.host:this.hostname&&(s=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(s+=":"+this.port)),this.query&&o.isObject(this.query)&&Object.keys(this.query).length&&(a=y.stringify(this.query));var i=this.search||a&&"?"+a||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||g[e])&&!1!==s?(s="//"+(s||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):s||(s=""),n&&"#"!==n.charAt(0)&&(n="#"+n),i&&"?"!==i.charAt(0)&&(i="?"+i),e+s+(r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(i=i.replace("#","%23"))+n},s.prototype.resolve=function(t){return this.resolveObject(b(t,!1,!0)).format()},s.prototype.resolveObject=function(t){if(o.isString(t)){var e=new s;e.parse(t,!1,!0),t=e}for(var r=new s,n=Object.keys(this),a=0;a<n.length;a++){var i=n[a];r[i]=this[i]}if(r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol){for(var h=Object.keys(t),u=0;u<h.length;u++){var c=h[u];"protocol"!==c&&(r[c]=t[c])}return g[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){if(!g[t.protocol]){for(var l=Object.keys(t),f=0;f<l.length;f++){var p=l[f];r[p]=t[p]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||v[t.protocol])r.pathname=t.pathname;else{for(var m=(t.pathname||"").split("/");m.length&&!(t.host=m.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==m[0]&&m.unshift(""),m.length<2&&m.unshift(""),r.pathname=m.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var d=r.pathname||"",y=r.search||"";r.path=d+y}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var b=r.pathname&&"/"===r.pathname.charAt(0),O=t.host||t.pathname&&"/"===t.pathname.charAt(0),j=O||b||r.host&&t.pathname,x=j,w=r.pathname&&r.pathname.split("/")||[],A=(m=t.pathname&&t.pathname.split("/")||[],r.protocol&&!g[r.protocol]);if(A&&(r.hostname="",r.port=null,r.host&&(""===w[0]?w[0]=r.host:w.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===m[0]?m[0]=t.host:m.unshift(t.host)),t.host=null),j=j&&(""===m[0]||""===w[0])),O)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,w=m;else if(m.length)w||(w=[]),w.pop(),w=w.concat(m),r.search=t.search,r.query=t.query;else if(!o.isNullOrUndefined(t.search)){if(A)r.hostname=r.host=w.shift(),(q=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=q.shift(),r.host=r.hostname=q.shift());return r.search=t.search,r.query=t.query,o.isNull(r.pathname)&&o.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!w.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var C=w.slice(-1)[0],k=(r.host||t.host||w.length>1)&&("."===C||".."===C)||""===C,S=0,I=w.length;I>=0;I--)"."===(C=w[I])?w.splice(I,1):".."===C?(w.splice(I,1),S++):S&&(w.splice(I,1),S--);if(!j&&!x)for(;S--;S)w.unshift("..");!j||""===w[0]||w[0]&&"/"===w[0].charAt(0)||w.unshift(""),k&&"/"!==w.join("/").substr(-1)&&w.push("");var q,U=""===w[0]||w[0]&&"/"===w[0].charAt(0);A&&(r.hostname=r.host=U?"":w.length?w.shift():"",(q=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=q.shift(),r.host=r.hostname=q.shift()));return(j=j||r.host&&w.length)&&!U&&w.unshift(""),w.length?r.pathname=w.join("/"):(r.pathname=null,r.path=null),o.isNull(r.pathname)&&o.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},s.prototype.parseHost=function(){var t=this.host,e=i.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},301:function(t,e,r){(function(t,n){var o;/*! https://mths.be/punycode v1.4.1 by @mathias */!function(s){e&&e.nodeType,t&&t.nodeType;var a="object"==typeof n&&n;a.global!==a&&a.window!==a&&a.self;var i,h=2147483647,u=36,c=1,l=26,f=38,p=700,m=72,d=128,v="-",g=/^xn--/,y=/[^\x20-\x7E]/,b=/[\x2E\u3002\uFF0E\uFF61]/g,O={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},j=u-c,x=Math.floor,w=String.fromCharCode;function A(t){throw new RangeError(O[t])}function C(t,e){for(var r=t.length,n=[];r--;)n[r]=e(t[r]);return n}function k(t,e){var r=t.split("@"),n="";return r.length>1&&(n=r[0]+"@",t=r[1]),n+C((t=t.replace(b,".")).split("."),e).join(".")}function S(t){for(var e,r,n=[],o=0,s=t.length;o<s;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<s?56320==(64512&(r=t.charCodeAt(o++)))?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),o--):n.push(e);return n}function I(t){return C(t,function(t){var e="";return t>65535&&(e+=w((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=w(t)}).join("")}function q(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function U(t,e,r){var n=0;for(t=r?x(t/p):t>>1,t+=x(t/e);t>j*l>>1;n+=u)t=x(t/j);return x(n+(j+1)*t/(t+f))}function M(t){var e,r,n,o,s,a,i,f,p,g,y,b=[],O=t.length,j=0,w=d,C=m;for((r=t.lastIndexOf(v))<0&&(r=0),n=0;n<r;++n)t.charCodeAt(n)>=128&&A("not-basic"),b.push(t.charCodeAt(n));for(o=r>0?r+1:0;o<O;){for(s=j,a=1,i=u;o>=O&&A("invalid-input"),((f=(y=t.charCodeAt(o++))-48<10?y-22:y-65<26?y-65:y-97<26?y-97:u)>=u||f>x((h-j)/a))&&A("overflow"),j+=f*a,!(f<(p=i<=C?c:i>=C+l?l:i-C));i+=u)a>x(h/(g=u-p))&&A("overflow"),a*=g;C=U(j-s,e=b.length+1,0==s),x(j/e)>h-w&&A("overflow"),w+=x(j/e),j%=e,b.splice(j++,0,w)}return I(b)}function R(t){var e,r,n,o,s,a,i,f,p,g,y,b,O,j,C,k=[];for(b=(t=S(t)).length,e=d,r=0,s=m,a=0;a<b;++a)(y=t[a])<128&&k.push(w(y));for(n=o=k.length,o&&k.push(v);n<b;){for(i=h,a=0;a<b;++a)(y=t[a])>=e&&y<i&&(i=y);for(i-e>x((h-r)/(O=n+1))&&A("overflow"),r+=(i-e)*O,e=i,a=0;a<b;++a)if((y=t[a])<e&&++r>h&&A("overflow"),y==e){for(f=r,p=u;!(f<(g=p<=s?c:p>=s+l?l:p-s));p+=u)C=f-g,j=u-g,k.push(w(q(g+C%j,0))),f=x(C/j);k.push(w(q(f,0))),s=U(r,O,n==o),r=0,++n}++r,++e}return k.join("")}i={version:"1.4.1",ucs2:{decode:S,encode:I},decode:M,encode:R,toASCII:function(t){return k(t,function(t){return y.test(t)?"xn--"+R(t):t})},toUnicode:function(t){return k(t,function(t){return g.test(t)?M(t.slice(4).toLowerCase()):t})}},void 0===(o=function(){return i}.call(e,r,e,t))||(t.exports=o)}()}).call(this,r(302)(t),r(57))},302:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},303:function(t,e,r){"use strict";t.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}},304:function(t,e,r){"use strict";e.decode=e.parse=r(305),e.encode=e.stringify=r(306)},305:function(t,e,r){"use strict";function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,r,s){e=e||"&",r=r||"=";var a={};if("string"!=typeof t||0===t.length)return a;var i=/\+/g;t=t.split(e);var h=1e3;s&&"number"==typeof s.maxKeys&&(h=s.maxKeys);var u=t.length;h>0&&u>h&&(u=h);for(var c=0;c<u;++c){var l,f,p,m,d=t[c].replace(i,"%20"),v=d.indexOf(r);v>=0?(l=d.substr(0,v),f=d.substr(v+1)):(l=d,f=""),p=decodeURIComponent(l),m=decodeURIComponent(f),n(a,p)?o(a[p])?a[p].push(m):a[p]=[a[p],m]:a[p]=m}return a};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},306:function(t,e,r){"use strict";var n=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,r,i){return e=e||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?s(a(t),function(a){var i=encodeURIComponent(n(a))+r;return o(t[a])?s(t[a],function(t){return i+encodeURIComponent(n(t))}).join(e):i+encodeURIComponent(n(t[a]))}).join(e):i?encodeURIComponent(n(i))+r+encodeURIComponent(n(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function s(t,e){if(t.map)return t.map(e);for(var r=[],n=0;n<t.length;n++)r.push(e(t[n],n));return r}var a=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e}},57:function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r}});