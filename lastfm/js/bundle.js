!function(e){function t(o){if(r[o])return r[o].exports;var a=r[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(){$("body").prepend('<div class="alert alert-danger" role="alert"><span style="font-weight:bold;">Ad Blocker detected! </span>this app needs to do some calls to Last.fm server and the adblocker, obviously, is blocking it so in order to make it runs properly, you have to <span style="font-weight:bold;">disable your adblocker.</span></div>')}function i(){$("input[value=Save]").css("visibility","visible"),window.loading.finish()}function n(e){var t=[];return e.match(/\d+\*\d+/)?t=e.split("*"):e.match(/\d+x\d+/)&&(t=e.split("x")),{rows:t[0],columns:t[1]}}var s=r(1),l=o(s),u=r(5).drawCollage,c=r(4);$("input[value=Save]").bind("click",function(){var e=document.querySelector(".canvas");e.toBlob?e.toBlob(function(e){saveAs(e,"collage.png")}):window.location=e.toDataURL("image/jpeg",1)}),"undefined"==typeof fuckAdBlock?a():fuckAdBlock.onDetected(a),$($("input[type=button]")[0]).bind("click",function(){window.loading=c.showLoading(),$("input[value=Save]").css("visibility","hidden"),window.setTimeout(function(){loading.updateLoadingHtml('<p style="color:white;">We are - still - working on your collage. You\'ve got a good taste by the way. ;-)</p><div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>')},5100),window.setTimeout(function(){loading.updateLoadingHtml('<p style="color:white;">Still loading don\'t worry fam. Be pateint.</p><div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>')},15e3);var e=$("form").serializeArray(),t=e[0].value,r=e[1].value,o=n(e[2].value),a=new l["default"](t);"weeklyalbumchart"==r?a.getWeeklyAlbums(o.rows,o.columns,function(e,t,r){try{u(e,t,r)}catch(o){i()}}):a.getTopAlbums(o.rows,o.columns,r,function(e,t,r){try{u(e,t,r)}catch(o){i()}})})},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),n=r(2),s=o(n),l=r(3),u=r(4),c=function(){function e(t){a(this,e),this.username=t,this.UserAlbumsArray=[]}return i(e,[{key:"getTopAlbums",value:function(e,t,r,o){var a=this,i="https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user="+this.username+"&api_key="+l.api_key+"&period="+r+"&limit="+e*t+"&format=json";try{$.getJSON(i,function(i){try{if(i.error)throw new Error("Wrong username.");var n=a,l=[];if(e*t>i.topalbums.album.length)throw new Error("You have "+i.topalbums.album.length+" albums which is fewer than the size your requested "+e+"x"+t);for(var c=0;c<e*t;c++){var d=new s["default"](i.topalbums.album[c].artist.name,i.topalbums.album[c].name);a.UserAlbumsArray.push(d),l.push(d.getAlbumImage(i.topalbums.album[c].image[3]["#text"]))}$.when.apply($,l).done(function(){o(e,t,n.UserAlbumsArray)}).fail(function(){try{throw new Error("Somg images/image didn't load. Press Generate again")}catch(a){n.getTopAlbums(e,t,r,o),u.showError(a)}})}catch(m){u.showError(m)}}).fail(function(){try{throw new Error("Connection error.")}catch(e){u.showError(e)}})}catch(n){u.showError(n)}}},{key:"getWeeklyAlbums",value:function(e,t,r){var o=this,a="https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user="+this.username+"&api_key="+l.api_key+"&format=json";this.size=e*l.image_size*(t*l.image_size);try{$.getJSON(a,function(a){try{if(a.error)throw new Error("Wrong username.");var i=o,n=[];if(e*t>a.weeklyalbumchart.album.length)throw new Error("You have "+a.weeklyalbumchart.album.length+" album which is fewer than the size you requested "+e+"x"+t);for(var l=0;l<e*t;l++){var c=new s["default"](a.weeklyalbumchart.album[l].artist["#text"],a.weeklyalbumchart.album[l].name);o.UserAlbumsArray.push(c),n.push(c.getAlbumImage())}$.when.apply($,n).done(function(){r(e,t,i.UserAlbumsArray)}).fail(function(){try{throw new Error("Some images/image didn't load. Press Generate again.")}catch(o){i.getWeeklyAlbums(e,t,r),u.showError(o)}})}catch(d){u.showError(d)}}).fail(function(){try{throw new Error("Connection error.")}catch(e){u.showError(e)}})}catch(i){u.showError(i)}}},{key:"username",get:function(){return this._username},set:function(e){this._username=e}}]),e}();t["default"]=c},function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),n=r(3),s=function(){function e(t,r,a){o(this,e),this.artist=t,this.name=r,a&&(this.image=a)}return i(e,[{key:"getAlbumImage",value:function(e){var t=this,r=new Image;if(r.crossOrigin="anonymous",e){var o=this;return $.Deferred(function(t){r.onload=function(){o._image=r,t.resolve(o._image)},r.onerror=function(){t.reject()},r.src=e}).promise()}var o,i=function(){var e="https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+n.api_key+"&artist="+window.encodeURIComponent(t.artist)+"&album="+window.encodeURIComponent(t.name)+"&format=json";return o=t,{v:$.Deferred(function(t){$.getJSON(e,function(e){if(e.album.image[3]["#text"].length<=0){var a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQMAAABDsxw2AAAAA1BMVEX///+nxBvIAAAAIklEQVRo3u3BMQEAAADCoPVPbQo/oAAAAAAAAAAAAAAAeBkttAAB/+kJawAAAABJRU5ErkJggg==";r.src=a,o._image=r,t.resolve(o._image)}else r.onload=function(){o._image=r,t.resolve(o._image)},r.onerror=function(){t.reject()},r.src=e.album.image[3]["#text"]})}).promise()}}();if("object"===("undefined"==typeof i?"undefined":a(i)))return i.v}},{key:"artist",get:function(){return this._artist},set:function(e){this._artist=e}},{key:"image",get:function(){return this._image},set:function(e){if("string"==typeof e){var t=new Image;t.src=e,this._image=t}else this._image=e}},{key:"name",set:function(e){this._name=e},get:function(){return this._name}}]),e}();t["default"]=s},function(e,t){"use strict";var r={api_key:"926f6ac421e0a673d09735dd68918d2c",image_size:300};e.exports=r},function(e,t){"use strict";var r={showError:function(e){window.loading.finish(),$("body").prepend('<div class="alert alert-danger" role="alert"><span style="font-weight:bold;">'+e+"</span></div>")},showLoading:function(){return pleaseWait({backgroundColor:"#DC4037",loadingHtml:'<p style="color:white;">We are working on your collage.</p><div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>'})}};e.exports=r},function(e,t,r){"use strict";var o=r(3),a={drawCollage:function(e,t,r){var a=document.querySelector("canvas"),i=a.getContext("2d");a.width=t*o.image_size,a.height=e*o.image_size,i.clearRect(0,0,a.width,a.height);var n=0,s=0,l=0,u=e*o.image_size*(t*o.image_size),c=parseInt(a.width),d=18,m="px Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New";for(i.font=d+m,i.strokeStyle="black",i.fillStyle="white";u;){if(c>=o.image_size){var f=parseInt(i.measureText(r[l].name).width),h=parseInt(i.measureText(r[l].artist).width);for(i.drawImage(r[l].image,n,s);f>o.image_size;){i.font=d--+m;var f=parseInt(i.measureText(r[l].name).width)}for(i.strokeText(r[l].name,n,s+20),i.fillText(r[l].name,n,s+20),i.font=d+m;h>o.image_size;){i.font=d--+m;var h=parseInt(i.measureText(r[l].artist).width)}i.strokeText(r[l].artist,n,s+40),i.fillText(r[l].artist,n,s+40),n+=o.image_size,c-=o.image_size,l++}else s+=o.image_size,n=0,c=parseInt(a.width);d=18,i.font=d+m,u-=o.image_size}}};e.exports=a}]);