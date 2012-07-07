/* jQuery.LocalScroll by Ariel Flesler */

;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

/* jQuery.ScrollTo by Ariel Flesler */

;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* CrossSlide by Tobia Conforto */

(function(){var d=jQuery,a=(d.fn.startAnimation?"startAnimation":"animate"),c="pause plugin missing.";function e(h){for(var g=1;g<arguments.length;g++){h=h.replace(new RegExp("\\{"+(g-1)+"}","g"),arguments[g])}return h}function f(){arguments[0]="CrossSlide: "+arguments[0];throw new Error(e.apply(null,arguments))}function b(i){var g=1;var h=i.replace(/^\s*|\s*$/g,"").split(/\s+/);if(h.length>3){throw new Error()}if(h[0]=="center"){if(h.length==1){h=["center","center"]}else{if(h.length==2&&h[1].match(/^[\d.]+x$/i)){h=["center","center",h[1]]}}}if(h.length==3){g=parseFloat(h[2].match(/^([\d.]+)x$/i)[1])}var j=h[0]+" "+h[1];if(j=="left top"||j=="top left"){return{xrel:0,yrel:0,zoom:g}}if(j=="left center"||j=="center left"){return{xrel:0,yrel:0.5,zoom:g}}if(j=="left bottom"||j=="bottom left"){return{xrel:0,yrel:1,zoom:g}}if(j=="center top"||j=="top center"){return{xrel:0.5,yrel:0,zoom:g}}if(j=="center center"){return{xrel:0.5,yrel:0.5,zoom:g}}if(j=="center bottom"||j=="bottom center"){return{xrel:0.5,yrel:1,zoom:g}}if(j=="right top"||j=="top right"){return{xrel:1,yrel:0,zoom:g}}if(j=="right center"||j=="center right"){return{xrel:1,yrel:0.5,zoom:g}}if(j=="right bottom"||j=="bottom right"){return{xrel:1,yrel:1,zoom:g}}return{xrel:parseInt(h[0].match(/^(\d+)%$/)[1])/100,yrel:parseInt(h[1].match(/^(\d+)%$/)[1])/100,zoom:g}}d.fn.crossSlide=function(i,k,l){var g=this,j=this.width(),h=this.height();if(g.length!=1){f("crossSlide() must be called on exactly 1 element")}g.get(0).crossSlideArgs=[i,k,l];k=d.map(k,function(m){return d.extend({},m)});if(!i.easing){i.easing=i.variant?"swing":"linear"}if(!l){l=function(){}}(function(o){var m=0;function n(q,p){p.onload=function(r){m++;k[q].width=p.width;k[q].height=p.height;if(m==k.length){o()}};p.src=k[q].src;if(q+1<k.length){n(q+1,new Image())}}n(0,new Image())})(function(){if(!i.fade){f("missing fade parameter.")}if(i.speed&&i.sleep){f("you cannot set both speed and sleep at the same time.")}var A=Math.round(i.fade*1000);if(i.sleep){var z=Math.round(i.sleep*1000)}if(i.speed){var o=i.speed/1000,v=Math.round(A*o)}g.empty().css({overflow:"hidden",padding:0});if(!/^(absolute|relative|fixed)$/.test(g.css("position"))){g.css({position:"relative"})}if(!g.width()||!g.height()){f("container element does not have its own width and height")}if(i.shuffle){k.sort(function(){return Math.random()-0.5})}for(var t=0;t<k.length;++t){var m=k[t];if(!m.src){f("missing src parameter in picture {0}.",t+1)}if(o){switch(m.dir){case"up":m.from={xrel:0.5,yrel:0,zoom:1};m.to={xrel:0.5,yrel:1,zoom:1};var x=m.height-h-2*v;break;case"down":m.from={xrel:0.5,yrel:1,zoom:1};m.to={xrel:0.5,yrel:0,zoom:1};var x=m.height-h-2*v;break;case"left":m.from={xrel:0,yrel:0.5,zoom:1};m.to={xrel:1,yrel:0.5,zoom:1};var x=m.width-j-2*v;break;case"right":m.from={xrel:1,yrel:0.5,zoom:1};m.to={xrel:0,yrel:0.5,zoom:1};var x=m.width-j-2*v;break;default:f("missing or malformed dir parameter in picture {0}.",t+1)}if(x<=0){f("impossible animation: either picture {0} is too small or div is too large or fade duration too long.",t+1)}m.time_ms=Math.round(x/o)}else{if(!z){if(!m.from||!m.to||!m.time){f("missing either speed/sleep option, or from/to/time params in picture {0}.",t+1)}try{m.from=b(m.from)}catch(w){f('malformed "from" parameter in picture {0}.',t+1)}try{m.to=b(m.to)}catch(w){f('malformed "to" parameter in picture {0}.',t+1)}if(!m.time){f('missing "time" parameter in picture {0}.',t+1)}m.time_ms=Math.round(m.time*1000)}}if(m.from){d.each([m.from,m.to],function(p,C){C.width=Math.round(m.width*C.zoom);C.height=Math.round(m.height*C.zoom);C.left=Math.round((j-C.width)*C.xrel);C.top=Math.round((h-C.height)*C.yrel)})}var s,y;y=s=d(e('<img src="{0}"/>',m.src));if(m.href){y=d(e('<a href="{0}"></a>',m.href)).append(s)}if(m.onclick){y.click(m.onclick)}if(m.alt){s.attr("alt",m.alt)}if(m.rel){y.attr("rel",m.rel)}if(m.href&&m.target){y.attr("target",m.target)}y.appendTo(g)}delete o;function n(D,C){var E=[0,A/(D.time_ms+2*A),1-A/(D.time_ms+2*A),1][C];return{left:Math.round(D.from.left+E*(D.to.left-D.from.left)),top:Math.round(D.from.top+E*(D.to.top-D.from.top)),width:Math.round(D.from.width+E*(D.to.width-D.from.width)),height:Math.round(D.from.height+E*(D.to.height-D.from.height))}}var u=g.find("img").css({position:"absolute",visibility:"hidden",top:0,left:0,border:0});u.eq(0).css({visibility:"visible"});if(!z){u.eq(0).css(n(k[0],i.variant?0:1))}var B=i.loop;function q(O,p){if(O%2==0){if(z){var E=O/2,S=(E-1+k.length)%k.length,P=u.eq(E),M=u.eq(S);var L=function(){l(E,P.get(0));M.css("visibility","hidden");setTimeout(p,z)}}else{var H=O/2,S=(H-1+k.length)%k.length,R=u.eq(H),M=u.eq(S),F=k[H].time_ms,N=n(k[H],i.variant?3:2);var L=function(){l(H,R.get(0));M.css("visibility","hidden");R[a](N,F,i.easing,p)}}}else{var D=Math.floor(O/2),G=Math.ceil(O/2)%k.length,Q=u.eq(D),C=u.eq(G),T={},K={visibility:"visible"},J={};if(G>D){K.opacity=0;J.opacity=1;if(i.doubleFade){T.opacity=0}}else{T.opacity=0;if(i.doubleFade){K.opacity=0;J.opacity=1}}if(!z){d.extend(K,n(k[G],0));if(!i.variant){d.extend(T,n(k[D],3));d.extend(J,n(k[G],1))}}if(d.isEmptyObject(J)){var L=function(){l(G,C.get(0),D,Q.get(0));C.css(K);Q[a](T,A,"linear",p)}}else{if(d.isEmptyObject(T)){var L=function(){l(G,C.get(0),D,Q.get(0));C.css(K);C[a](J,A,"linear",p)}}else{var L=function(){l(G,C.get(0),D,Q.get(0));C.css(K);C[a](J,A,"linear");Q[a](T,A,"linear",p)}}}}if(i.loop&&O==k.length*2-2){var I=L;L=function(){if(--B){I()}}}if(O>0){return q(O-1,L)}else{return L}}var r=q(k.length*2-1,function(){return r()});r()});return g};d.fn.crossSlideFreeze=function(){this.find("img").stop()};d.fn.crossSlideStop=function(){this.find("img").stop().remove()};d.fn.crossSlideRestart=function(){this.find("img").stop().remove();d.fn.crossSlide.apply(this,this.get(0).crossSlideArgs)};d.fn.crossSlidePause=function(){if(!d.fn.pause){f(c)}this.find("img").pause()};d.fn.crossSlideResume=function(){if(!d.fn.pause){f(c)}this.find("img").resume()}})();