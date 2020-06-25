/**
 * @author nki2 / http://nki2.jp/
 * @author okb
 * @revision 4
 */


function newClass(classObj, superClass) {
	if(!classObj) classObj = {};
	if(typeof classObj.__construct !== "function") classObj.__construct = function() {};
	var f = classObj.__construct;
	f.extend = function(classObj) { return newClass(classObj, this); }
	
	if(superClass) {
		for(var i in superClass.prototype) f.prototype[i] = superClass.prototype[i];
		classObj.__super = superClass.prototype;
	}
	
	for(var j in classObj) {
		if(superClass && typeof classObj[j] == "function") {
			f.prototype[j] = (function(func, superClass) {
				return function() {
					var tmpSuper = this.__super;
					this.__super = superClass.prototype;
					var result = func.apply(this, arguments);
					this.__super = tmpSuper;
					return result;
				};
			})(classObj[j], superClass);
		} else {
			f.prototype[j] = classObj[j];
		}
	}
	return f;
}

var Class = newClass({});




var trace = function(a) {
	try {
		console.log(a);
	} catch(e) {}
};



if(!Array.indexOf){
	Array.prototype.indexOf = function(object){
		for(var i = 0; i < this.length; i++){
			if(this[i] == object){return i;break;}
		}
		return -1;
	};
}


/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){o[n]||(o[n]=!0,e.migrateWarnings.push(n),t.console&&console.warn&&!e.migrateMute&&(console.warn("JQMIGRATE: "+n),e.migrateTrace&&console.trace&&console.trace()))}function a(t,a,o,i){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(i),o},set:function(e){r(i),o=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=o}var o={};e.migrateWarnings=[],!e.migrateMute&&t.console&&console.log&&console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){o={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var i=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",i||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,o,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(i?a in i:e.isFunction(e.fn[a])))?e(t)[a](o):("type"===a&&o!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,o=e.prop(t,r);return o===!0||"boolean"!=typeof o&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,o))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;e.fn.init=function(t,n,a){var o;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(o=y.exec(t))&&o[1]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(e.trim(t),n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,o,i=this[0];return!i||"events"!==t||1!==arguments.length||(a=e.data(i,t),o=e._data(i,t),a!==n&&a!==o||o===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),o)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,o,i){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),o)for(c=function(e){return!e.type||j.test(e.type)?i?i.push(e.parentNode?e.parentNode.removeChild(e):e):o.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(o.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,C=e.fn.live,S=e.fn.die,T="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",M=RegExp("\\b(?:"+T+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,o){e!==document&&M.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,o)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,o=t.guid||e.guid++,i=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%i;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=o;a.length>i;)a[i++].guid=o;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),C?C.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),S?S.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||M.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(T.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);

jQuery.extend(
{	
	url: function(arg, url) {
		var _ls = url || window.location.toString();

		if(_ls.substring(0,2) === '//') _ls = 'http:' + _ls;
		else if(_ls.split('://').length === 1) _ls = 'http://' + _ls;

		url = _ls.split('/');
		var _l = {auth:''}, host = url[2].split('@');

		if(host.length === 1) host = host[0].split(':');
		else{ _l.auth = host[0]; host = host[1].split(':'); }

		_l.protocol=url[0], _l.hostname=host[0], _l.port=(host[1]||'80'), _l.pathname='/' + url.slice(3, url.length).join('/').split('?')[0].split('#')[0];
		var _p = _l.pathname;
		if(_p.split('.').length === 1 && _p[_p.length-1] !== '/') _p += '/';
		var _h = _l.hostname, _hs = _h.split('.'), _ps = _p.split('/');

		if(!arg) return _ls;
		else if(arg === 'hostname') return _h;
		else if(arg === 'domain') return _hs.slice(-2).join('.');
		else if(arg === 'tld') return _hs.slice(-1).join('.');
		else if(arg === 'sub') return _hs.slice(0, _hs.length - 2).join('.');
		else if(arg === 'port') return _l.port || '80';
		else if(arg === 'protocol') return _l.protocol.split(':')[0];
		else if(arg === 'auth') return _l.auth;
		else if(arg === 'user') return _l.auth.split(':')[0];
		else if(arg === 'pass') return _l.auth.split(':')[1] || '';
		else if(arg === 'path') return _p;
		else if(arg[0] === '.')
		{
			arg = arg.substring(1);
			if($.isNumeric(arg)) {arg = parseInt(arg); return _hs[arg < 0 ? _hs.length + arg : arg-1] || ''; }
		}
		else if($.isNumeric(arg)){ arg = parseInt(arg); return _ps[arg < 0 ? _ps.length - 1 + arg : arg] || ''; }
		else if(arg === 'file') return _ps.slice(-1)[0];
		else if(arg === 'filename') return _ps.slice(-1)[0].split('.')[0];
		else if(arg === 'fileext') return _ps.slice(-1)[0].split('.')[1] || '';
		else if(arg[0] === '?' || arg[0] === '#')
		{
			var params = _ls, param = null;

			if(arg[0] === '?') params = (params.split('?')[1] || '').split('#')[0];
			else if(arg[0] === '#') params = (params.split('#')[1] || '');

			if(!arg[1]) return params;

			arg = arg.substring(1);
			params = params.split('&');

			for(var i=0,ii=params.length; i<ii; i++)
			{
				param = params[i].split('=');
				if(param[0] === arg) return param[1];
			}
		}

		return '';
	}
});


/**
* DD_belatedPNG: Adds IE6 support: PNG images for CSS background-image and HTML <IMG/>.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_belatedPNG/
* Version: 0.0.8a
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* DD_belatedPNG.fix('.png_bg'); // argument is a CSS selector
* DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement
**/

/*
PLEASE READ:
Absolutely everything in this script is SILLY.  I know this.  IE's rendering of certain pixels doesn't make sense, so neither does this code!
*/

/**
* jquery.belatedPNG: Adds IE6/7/8 support: PNG images for CSS background-image and HTML <IMG/>.
* Author: Kazunori Ninomiya
* Email: Kazunori.Ninomiya@gmail.com
* Version: 0.0.4
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* $('.png_bg').fixPng();
**/

(function($) {
	var doc = document;
	var DD_belatedPNG = {
		ns: 'DD_belatedPNG',
		imgSize: {},
		delay: 10,
		nodesFixed: 0,
		createVmlNameSpace: function () {
			if (doc.namespaces && !doc.namespaces[this.ns]) {
				doc.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');
			}
		},
		createVmlStyleSheet: function () {
			var screenStyleSheet, printStyleSheet;
			screenStyleSheet = doc.createElement('style');
			screenStyleSheet.setAttribute('media', 'screen');
			doc.documentElement.firstChild.insertBefore(screenStyleSheet, doc.documentElement.firstChild.firstChild);
			if (screenStyleSheet.styleSheet) {
				var selector = !doc.documentMode || doc.documentMode < 8
					? this.ns + '\\:*' : this.ns + '\\:shape, ' + this.ns + '\\:fill';
				screenStyleSheet = screenStyleSheet.styleSheet;
				screenStyleSheet.addRule(selector, 'behavior:url(#default#VML);');
				screenStyleSheet.addRule(this.ns + '\\:shape', 'position:absolute;');
				screenStyleSheet.addRule('img.' + this.ns + '_sizeFinder', [
					'behavior:none',
					'border:none',
					'position:absolute',
					'z-index:-1',
					'top:-10000px',
					'visibility:hidden'
				].join(';'));
				this.screenStyleSheet = screenStyleSheet;
				printStyleSheet = doc.createElement('style');
				printStyleSheet.setAttribute('media', 'print');
				doc.documentElement.firstChild.insertBefore(printStyleSheet, doc.documentElement.firstChild.firstChild);
				printStyleSheet = printStyleSheet.styleSheet;
				printStyleSheet.addRule(selector, 'display: none !important;');
				printStyleSheet.addRule('img.' + this.ns + '_sizeFinder', 'display: none !important;');
			}
		},
		readPropertyChange: function () {
			var el, display, v;
			el = event.srcElement;
			if (!el.vmlInitiated) {
				return;
			}
			var propName = event.propertyName;
			if (propName.search('background') != -1 || propName.search('border') != -1) {
				DD_belatedPNG.applyVML(el);
			}
			if (propName == 'style.display') {
				display = (el.currentStyle.display == 'none') ? 'none' : 'block';
				for (v in el.vml) {
					if (el.vml.hasOwnProperty(v)) {
						el.vml[v].shape.style.display = display;
					}
				}
			}
			if (propName.search('filter') != -1) {
				DD_belatedPNG.vmlOpacity(el);
			}
		},
		vmlOpacity: function (el) {
			if (el.currentStyle.filter.search('lpha') != -1) {
				var trans = el.currentStyle.filter;
				trans = parseInt(trans.substring(trans.lastIndexOf('=') + 1,
												 trans.lastIndexOf(')')), 10) / 100;
				el.vml.color.shape.style.filter = el.currentStyle.filter;
				el.vml.image.fill.opacity = trans;
			}
		},
		handlePseudoHover: function (el) {
			setTimeout(function () {
				DD_belatedPNG.applyVML(el);
			}, 1);
		},
		applyVML: function (el) {
			el.runtimeStyle.cssText = '';
			this.vmlFill(el);
			this.vmlOffsets(el);
			this.vmlOpacity(el);
			if (el.isImg) {
				this.copyImageBorders(el);
			}
		},
		attachHandlers: function (el) {
			var self, handlers, handler, moreForAs, a, h;
			self = this;
			handlers = {resize: 'vmlOffsets', move: 'vmlOffsets'};
			if (el.nodeName == 'A') {
				moreForAs = {
					mouseleave: 'handlePseudoHover',
					mouseenter: 'handlePseudoHover',
					focus: 'handlePseudoHover',
					blur: 'handlePseudoHover'
				};
				for (a in moreForAs) {			
					if (moreForAs.hasOwnProperty(a)) {
						handlers[a] = moreForAs[a];
					}
				}
			}
			for (h in handlers) {
				if (handlers.hasOwnProperty(h)) {
					handler = function () {
						self[handlers[h]](el);
					};
					el.attachEvent('on' + h, handler);
				}
			}
			el.attachEvent('onpropertychange', this.readPropertyChange);
		},
		giveLayout: function (el) {
			el.style.zoom = 1;
			if (el.currentStyle.position == 'static') {
				el.style.position = 'relative';
			}
		},
		copyImageBorders: function (el) {
			var styles, s;
			styles = {
				'borderStyle': true,
				'borderWidth': true,
				'borderColor': true
			};
			for (s in styles) {
				if (styles.hasOwnProperty(s)) {
					el.vml.color.shape.style[s] = el.currentStyle[s];
				}
			}
		},
		vmlFill: function (el) {
			if (!el.currentStyle) {
				return;
			}
			else {
				var elStyle, noImg, lib, v, img, imgLoaded;
				elStyle = el.currentStyle;
			}
			for (v in el.vml) {
				if (el.vml.hasOwnProperty(v)) {
					el.vml[v].shape.style.zIndex = elStyle.zIndex;
				}
			}
			el.runtimeStyle.backgroundColor = '';
			el.runtimeStyle.backgroundImage = '';
			noImg = true;
			if (elStyle.backgroundImage != 'none' || el.isImg) {
				if (!el.isImg) {
					el.vmlBg = elStyle.backgroundImage;
					el.vmlBg = el.vmlBg.substr(5, el.vmlBg.lastIndexOf('")')-5);
				}
				else {
					el.vmlBg = el.src;
				}
				lib = this;
				if (!lib.imgSize[el.vmlBg]) {
					img = doc.createElement('img');
					lib.imgSize[el.vmlBg] = img;
					img.className = lib.ns + '_sizeFinder';
					img.runtimeStyle.cssText = [
						'behavior:none',
						'position:absolute',
						'left:-10000px',
						'top:-10000px',
						'border:none',
						'margin:0',
						'padding:0'
					].join(';');
					imgLoaded = function () {
						this.width = this.offsetWidth;
						this.height = this.offsetHeight;
						lib.vmlOffsets(el);
					};
					img.attachEvent('onload', imgLoaded);
					img.src = el.vmlBg;
					img.removeAttribute('width');
					img.removeAttribute('height');
					doc.body.insertBefore(img, doc.body.firstChild);
				}
				el.vml.image.fill.src = el.vmlBg;
				noImg = false;
			}
			el.vml.image.fill.on = !noImg;
			el.vml.image.fill.color = 'none';
			el.vml.color.shape.style.backgroundColor = elStyle.backgroundColor;
			el.runtimeStyle.backgroundImage = 'none';
			el.runtimeStyle.backgroundColor = 'transparent';
		},
		vmlOffsets: function (el) {
			var thisStyle, size, fudge, makeVisible, bg, bgR, dC, altC, b, c, v;
			thisStyle = el.currentStyle;
			size = {
				'W':el.clientWidth+1,
				'H':el.clientHeight+1,
				'w':this.imgSize[el.vmlBg].width,
				'h':this.imgSize[el.vmlBg].height,
				'L':el.offsetLeft, 'T':el.offsetTop,
				'bLW':el.clientLeft,
				'bTW':el.clientTop
			};
			fudge = (size.L + size.bLW == 1) ? 1 : 0;
			makeVisible = function (vml, l, t, w, h, o) {
				vml.coordsize = w+','+h;
				vml.coordorigin = o+','+o;
				vml.path = 'm0,0l'+w+',0l'+w+','+h+'l0,'+h+' xe';
				vml.style.width = w + 'px';
				vml.style.height = h + 'px';
				vml.style.left = l + 'px';
				vml.style.top = t + 'px';
			};
			makeVisible(el.vml.color.shape,
						(size.L + (el.isImg ? 0 : size.bLW)),
						(size.T + (el.isImg ? 0 : size.bTW)),
						(size.W-1), (size.H-1), 0);
			makeVisible(el.vml.image.shape,
						(size.L + size.bLW),
						(size.T + size.bTW),
						(size.W), (size.H), 1);
			bg = {'X':0, 'Y':0};
			if (el.isImg) {
				bg.X = parseInt(thisStyle.paddingLeft, 10) + 1;
				bg.Y = parseInt(thisStyle.paddingTop, 10) + 1;
			}
			else {
				for (b in bg) {
					if (bg.hasOwnProperty(b)) {
						this.figurePercentage(bg, size, b, thisStyle['backgroundPosition'+b]);
					}
				}
			}
			el.vml.image.fill.position = (bg.X/size.W) + ',' + (bg.Y/size.H);
			bgR = thisStyle.backgroundRepeat;
			dC = {'T':1, 'R':size.W+fudge, 'B':size.H, 'L':1+fudge};
			altC = { 'X': {'b1': 'L', 'b2': 'R', 'd': 'W'}, 'Y': {'b1': 'T', 'b2': 'B', 'd': 'H'} };
			if (bgR != 'repeat') {
				c = {'T':(bg.Y), 'R':(bg.X+size.w), 'B':(bg.Y+size.h), 'L':(bg.X)};
				if (bgR.search('repeat-') != -1) {
					v = bgR.split('repeat-')[1].toUpperCase();
					c[altC[v].b1] = 1;
					c[altC[v].b2] = size[altC[v].d];
				}
				if (c.B > size.H) {
					c.B = size.H;
				}
				el.vml.image.shape.style.clip = 'rect('+c.T+'px '+(c.R+fudge)+'px '+c.B+'px '+(c.L+fudge)+'px)';
			}
			else {
				el.vml.image.shape.style.clip = 'rect('+dC.T+'px '+dC.R+'px '+dC.B+'px '+dC.L+'px)';
			}
		},
		figurePercentage: function (bg, size, axis, position) {
			var horizontal, fraction;
			fraction = true;
			horizontal = (axis == 'X');
			switch(position) {
				case 'left':
				case 'top':
					bg[axis] = 0;
					break;
				case 'center':
					bg[axis] = 0.5;
					break;
				case 'right':
				case 'bottom':
					bg[axis] = 1;
					break;
				default:
					position.search('%') != -1
						? bg[axis] = parseInt(position, 10) / 100
						: fraction = false;
			}
			bg[axis] = Math.ceil(fraction ? ((size[horizontal?'W': 'H'] * bg[axis])
				- (size[horizontal?'w': 'h'] * bg[axis])) : parseInt(position, 10));
			if (bg[axis] % 2 === 0) {
				bg[axis]++;
			}
			return bg[axis];
		},
		fixPng: function (el) {
			var lib, els, nodeStr, v, e;
			if (el.nodeName == 'BODY' || el.nodeName == 'TD' || el.nodeName == 'TR') {
				return;
			}
			el.isImg = false;
			if (el.nodeName == 'IMG') {
				if(el.src.toLowerCase().search(/\.png$/) != -1) {
					el.isImg = true;
					el.style.visibility = 'hidden';
				}
				else {
					return;
				}
			}
			else if (el.currentStyle.backgroundImage.toLowerCase().search('.png') == -1) {
				return;
			}
			lib = DD_belatedPNG;
			el.vml = {color: {}, image: {}};
			els = {shape: {}, fill: {}};
			for (v in el.vml) {
				if (el.vml.hasOwnProperty(v)) {
					for (e in els) {
						if (els.hasOwnProperty(e)) {
							nodeStr = lib.ns + ':' + e;
							el.vml[v][e] = doc.createElement(nodeStr);
						}
					}
					el.vml[v].shape.stroked = false;
					if (el.nodeName == 'IMG') {
						var width  = el.width / 96 * 72;
						var height = el.height / 96 * 72;
						el.vml[v].fill.type = 'tile';
						el.vml[v].fill.size = width + 'pt,' + height + 'pt';
					}
					else if (el.currentStyle) {
						var elStyle = el.currentStyle;
						if (elStyle.backgroundImage != 'none') {
							var vmlBg = elStyle.backgroundImage;
							var img = doc.createElement("img");
							img.src = vmlBg.substr(5, vmlBg.lastIndexOf('")')-5);
							var run = img.runtimeStyle;
							var mem = { w: run.width, h: run.height };
							run.width  = 'auto';
							run.height = 'auto';
							w = img.width;
							h = img.height;
							run.width  = mem.w;
							run.height = mem.h;
							var width  = w / 96 * 72;
							var height = h / 96 * 72;
							el.vml[v].fill.type = 'tile';
							el.vml[v].fill.aspect = 'atleast';
							el.vml[v].fill.size = width + 'pt,' + height + 'pt';
						}
					}
					el.vml[v].shape.appendChild(el.vml[v].fill);
					el.parentNode.insertBefore(el.vml[v].shape, el);
				}
			}
			el.vml.image.shape.fillcolor = 'none';
			el.vml.color.fill.on = false;
			lib.attachHandlers(el);
			lib.giveLayout(el);
			lib.giveLayout(el.offsetParent);
			el.vmlInitiated = true;
			lib.applyVML(el);
		}
	};
	try {
		doc.execCommand("BackgroundImageCache", false, true);
	} catch(r) {}
	DD_belatedPNG.createVmlNameSpace();
	DD_belatedPNG.createVmlStyleSheet();
	
	$.extend($.fn, {
		fixPng: function() {
			if ([,] != 0) { // IE6/7/8
				$.each(this, function() {
					DD_belatedPNG.fixPng(this);
				});
			}
			return this;
		}
	});
})(jQuery);

/*
 * jquery-auto-height.js
 *
 * Copyright (c) 2010 Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Since:   2010-04-19
 * Update:  2010-07-02
 * version: 0.03
 * Comment: 
 *
 * jQuery 1.2 later
 * 
 */

 (function($){
    $.fn.autoHeight = function(options){
        var op = $.extend({
        
            column  : 0,
            clear   : 0,
            height  : 'minHeight',
            reset   : '',
            descend : function descend (a,b){ return b-a; }
        
        },options || {}); // optionsに値があれば上書きする

        var self = $(this);
        var n = 0,
            hMax,
            hList = new Array(),
            hListLine = new Array();
            hListLine[n] = 0;

        // 要素の高さを取得
        self.each(function(i){
            if (op.reset == 'reset') {
                $(this).removeAttr('style');
            }
            var h = $(this).height();
            hList[i] = h;
            if (op.column > 1) {
                // op.columnごとの最大値を格納していく
                if (h > hListLine[n]) {
                    hListLine[n] = h;
                }
                if ( (i > 0) && (((i+1) % op.column) == 0) ) {
                    n++;
                    hListLine[n] = 0;
                };
            }
        });

        // 取得した高さの数値を降順に並べ替え
        hList = hList.sort(op.descend);
        hMax = hList[0];
        
        // 高さの最大値を要素に適用
        var browser = $.browser.version;
        if (op.column > 1) {
            for (var j=0; j<hListLine.length; j++) {
                for (var k=0; k<op.column; k++) {
                    if (browser == '6.0') {
                        self.eq(j*op.column+k).height(hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    } else {
                        self.eq(j*op.column+k).css(op.height,hListLine[j]);
                        if (k == 0 && op.clear != 0) self.eq(j*op.column+k).css('clear','both');
                    }
                }
            }
        } else {
            if (browser == '6.0') {
                self.height(hMax);
            } else {
                self.css(op.height,hMax);
            }
        }
    };
})(jQuery);




(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return $.quoteString(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=$.toJSON(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){return eval('('+src+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};})(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  "use strict";

  $.transit = {
    version: "0.1.3",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  // You can access this in jQuery's `$.support.transition`.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  $.extend($.support, support);

  var eventNames = {
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default': 'ease',
    'in':       'ease-in',
    'out':      'ease-out',
    'in-out':   'ease-in-out',
    'snap':     'cubic-bezier(0,1,.5,1)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks.transform = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform');
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // ## 'transformOrigin' CSS hook
  // Allows the use for `transformOrigin` to define where scaling and rotation
  // is pivoted.
  //
  //     $("#hello").css({ transformOrigin: '0 0' });
  //
  $.cssHooks.transformOrigin = {
    get: function(elem) {
      return elem.style[support.transformOrigin];
    },
    set: function(elem, value) {
      elem.style[support.transformOrigin] = value;
    }
  };

  // ## 'transition' CSS hook
  // Allows you to use the `transition` property in CSS.
  //
  //     $("#hello").css({ transition: 'all 0 ease 0' }); 
  //
  $.cssHooks.transition = {
    get: function(elem) {
      return elem.style[support.transition];
    },
    set: function(elem, value) {
      elem.style[support.transition] = value;
    }
  };

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null) { this._translateX = unit(x, 'px'); }
        if (y !== null) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof properties.easing !== 'undefined') {
      easing = properties.easing;
      delete properties.easing;
    }

    if (typeof properties.duration !== 'undefined') {
      duration = properties.duration;
      delete properties.duration;
    }

    if (typeof properties.complete !== 'undefined') {
      callback = properties.complete;
      delete properties.complete;
    }

    if (typeof properties.queue !== 'undefined') {
      queue = properties.queue;
      delete properties.queue;
    }

    if (typeof properties.delay !== 'undefined') {
      delay = properties.delay;
      delete properties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(properties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(properties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      self.each(function() {
        if (i > 0) {
          this.style[support.transition] = transitionValue;
        }
        $(this).css(properties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
      var i = 0;

      // Durations that are too slow will get transitions mixed up.
      // (Tested on Mac/FF 7.0.1)
      if ((support.transition === 'MozTransition') && (i < 25)) { i = 25; }

      window.setTimeout(function() { run(next); }, i);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transform') || new Transform();
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transform') || new Transform();
        t.setFromString(prop, value);

        $(elem).css({ transform: t });
      }
    };
  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  //     toMS('fast')   //=> '400ms'
  //     toMS(10)       //=> '10ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow for string durations like 'fast'.
    if ($.fx.speeds[i]) { i = $.fx.speeds[i]; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;
})(jQuery);


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);


/*!
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */

// Script: jScrollPane - cross browser customisable scrollbars
//
// *Version: 2.0.0beta11, Last updated: 2011-07-04*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// Source       - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.js
// (Minified)   - http://github.com/vitch/jScrollPane/raw/master/script/jquery.jscrollpane.min.js
//
// About: License
//
// Copyright (c) 2011 Kelvin Luck
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue. 
//
// jQuery Versions - tested in 1.4.2+ - reported to work in 1.3.x
// Browsers Tested - Firefox 3.6.8, Safari 5, Opera 10.6, Chrome 5.0, IE 6, 7, 8
//
// About: Release History
//
// 2.0.0beta11 - (in progress) 
// 2.0.0beta10 - (2011-04-17) cleaner required size calculation, improved keyboard support, stickToBottom/Left, other small fixes
// 2.0.0beta9 - (2011-01-31) new API methods, bug fixes and correct keyboard support for FF/OSX
// 2.0.0beta8 - (2011-01-29) touchscreen support, improved keyboard support
// 2.0.0beta7 - (2011-01-23) scroll speed consistent (thanks Aivo Paas)
// 2.0.0beta6 - (2010-12-07) scrollToElement horizontal support
// 2.0.0beta5 - (2010-10-18) jQuery 1.4.3 support, various bug fixes
// 2.0.0beta4 - (2010-09-17) clickOnTrack support, bug fixes
// 2.0.0beta3 - (2010-08-27) Horizontal mousewheel, mwheelIntent, keyboard support, bug fixes
// 2.0.0beta2 - (2010-08-21) Bug fixes
// 2.0.0beta1 - (2010-08-17) Rewrite to follow modern best practices and enable horizontal scrolling, initially hidden
//							 elements and dynamically sized elements.
// 1.x - (2006-12-31 - 2010-07-31) Initial version, hosted at googlecode, deprecated

(function($,window,undefined){

	$.fn.jScrollPane = function(settings)
	{
		// JScrollPane "class" - public methods are available through $('selector').data('jsp')
		function JScrollPane(elem, s)
		{
			var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
				percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY,
				verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition,
				verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
				horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight,
				reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth,
				wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
				originalElement = elem.clone(false, false).empty(),
				mwEvent = $.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';

			originalPadding = elem.css('paddingTop') + ' ' +
								elem.css('paddingRight') + ' ' +
								elem.css('paddingBottom') + ' ' +
								elem.css('paddingLeft');
			originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
										(parseInt(elem.css('paddingRight'), 10) || 0);

			function initialise(s)
			{

				var /*firstChild, lastChild, */isMaintainingPositon, lastContentX, lastContentY,
						hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
						maintainAtBottom = false, maintainAtRight = false;

				settings = s;

				if (pane === undefined) {
					originalScrollTop = elem.scrollTop();
					originalScrollLeft = elem.scrollLeft();

					elem.css(
						{
							overflow: 'hidden',
							padding: 0
						}
					);
					// TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
					// come back to it later and check once it is unhidden...
					paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					paneHeight = elem.innerHeight();

					elem.width(paneWidth);
					
					pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
					container = $('<div class="jspContainer" />')
						.css({
							'width': paneWidth + 'px',
							'height': paneHeight + 'px'
						}
					).append(pane).appendTo(elem);

					/*
					// Move any margins from the first and last children up to the container so they can still
					// collapse with neighbouring elements as they would before jScrollPane 
					firstChild = pane.find(':first-child');
					lastChild = pane.find(':last-child');
					elem.css(
						{
							'margin-top': firstChild.css('margin-top'),
							'margin-bottom': lastChild.css('margin-bottom')
						}
					);
					firstChild.css('margin-top', 0);
					lastChild.css('margin-bottom', 0);
					*/
				} else {
					elem.css('width', '');

					maintainAtBottom = settings.stickToBottom && isCloseToBottom();
					maintainAtRight  = settings.stickToRight  && isCloseToRight();

					hasContainingSpaceChanged = elem.innerWidth() + originalPaddingTotalWidth != paneWidth || elem.outerHeight() != paneHeight;

					if (hasContainingSpaceChanged) {
						paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
						paneHeight = elem.innerHeight();
						container.css({
							width: paneWidth + 'px',
							height: paneHeight + 'px'
						});
					}

					// If nothing changed since last check...
					if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
						elem.width(paneWidth);
						return;
					}
					previousContentWidth = contentWidth;
					
					pane.css('width', '');
					elem.width(paneWidth);

					container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
				}

				pane.css('overflow', 'auto');
				if (s.contentWidth) {
					contentWidth = s.contentWidth;
				} else {
					contentWidth = pane[0].scrollWidth;
				}
				contentHeight = pane[0].scrollHeight;
				pane.css('overflow', '');

				percentInViewH = contentWidth / paneWidth;
				percentInViewV = contentHeight / paneHeight;
				isScrollableV = percentInViewV > 1;

				isScrollableH = percentInViewH > 1;

				//console.log(paneWidth, paneHeight, contentWidth, contentHeight, percentInViewH, percentInViewV, isScrollableH, isScrollableV);

				if (!(isScrollableH || isScrollableV)) {
					elem.removeClass('jspScrollable');
					pane.css({
						top: 0,
						width: container.width() - originalPaddingTotalWidth
					});
					removeMousewheel();
					removeFocusHandler();
					removeKeyboardNav();
					removeClickOnTrack();
					unhijackInternalLinks();
				} else {
					elem.addClass('jspScrollable');

					isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
					if (isMaintainingPositon) {
						lastContentX = contentPositionX();
						lastContentY = contentPositionY();
					}

					initialiseVerticalScroll();
					initialiseHorizontalScroll();
					resizeScrollbars();

					if (isMaintainingPositon) {
						scrollToX(maintainAtRight  ? (contentWidth  - paneWidth ) : lastContentX, false);
						scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
					}

					initFocusHandler();
					initMousewheel();
					initTouch();
					
					if (settings.enableKeyboardNavigation) {
						initKeyboardNav();
					}
					if (settings.clickOnTrack) {
						initClickOnTrack();
					}
					
					observeHash();
					if (settings.hijackInternalLinks) {
						hijackInternalLinks();
					}
				}

				if (settings.autoReinitialise && !reinitialiseInterval) {
					reinitialiseInterval = setInterval(
						function()
						{
							initialise(settings);
						},
						settings.autoReinitialiseDelay
					);
				} else if (!settings.autoReinitialise && reinitialiseInterval) {
					clearInterval(reinitialiseInterval);
				}

				originalScrollTop && elem.scrollTop(0) && scrollToY(originalScrollTop, false);
				originalScrollLeft && elem.scrollLeft(0) && scrollToX(originalScrollLeft, false);

				elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
			}

			function initialiseVerticalScroll()
			{
				if (isScrollableV) {

					container.append(
						$('<div class="jspVerticalBar" />').append(
							$('<div class="jspCap jspCapTop" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragTop" />'),
									$('<div class="jspDragBottom" />')
								)
							),
							$('<div class="jspCap jspCapBottom" />')
						)
					);

					verticalBar = container.find('>.jspVerticalBar');
					verticalTrack = verticalBar.find('>.jspTrack');
					verticalDrag = verticalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowUp = $('<a class="jspArrow jspArrowUp" />').bind(
							'mousedown.jsp', getArrowScroll(0, -1)
						).bind('click.jsp', nil);
						arrowDown = $('<a class="jspArrow jspArrowDown" />').bind(
							'mousedown.jsp', getArrowScroll(0, 1)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowUp.bind('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
							arrowDown.bind('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
						}

						appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
					}

					verticalTrackHeight = paneHeight;
					container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
						function()
						{
							verticalTrackHeight -= $(this).outerHeight();
						}
					);


					verticalDrag.hover(
						function()
						{
							verticalDrag.addClass('jspHover');
						},
						function()
						{
							verticalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							verticalDrag.addClass('jspActive');

							var startY = e.pageY - verticalDrag.position().top;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragY(e.pageY - startY, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					sizeVerticalScrollbar();
				}
			}

			function sizeVerticalScrollbar()
			{
				verticalTrack.height(verticalTrackHeight + 'px');
				verticalDragPosition = 0;
				scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

				// Make the pane thinner to allow for the vertical scrollbar
				pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

				// Add margin to the left of the pane if scrollbars are on that side (to position
				// the scrollbar on the left or right set it's left or right property in CSS)
				try {
					if (verticalBar.position().left === 0) {
						pane.css('margin-left', scrollbarWidth + 'px');
					}
				} catch (err) {
				}
			}

			function initialiseHorizontalScroll()
			{
				if (isScrollableH) {

					container.append(
						$('<div class="jspHorizontalBar" />').append(
							$('<div class="jspCap jspCapLeft" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragLeft" />'),
									$('<div class="jspDragRight" />')
								)
							),
							$('<div class="jspCap jspCapRight" />')
						)
					);

					horizontalBar = container.find('>.jspHorizontalBar');
					horizontalTrack = horizontalBar.find('>.jspTrack');
					horizontalDrag = horizontalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowLeft = $('<a class="jspArrow jspArrowLeft" />').bind(
							'mousedown.jsp', getArrowScroll(-1, 0)
						).bind('click.jsp', nil);
						arrowRight = $('<a class="jspArrow jspArrowRight" />').bind(
							'mousedown.jsp', getArrowScroll(1, 0)
						).bind('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowLeft.bind('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
							arrowRight.bind('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
						}
						appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
					}

					horizontalDrag.hover(
						function()
						{
							horizontalDrag.addClass('jspHover');
						},
						function()
						{
							horizontalDrag.removeClass('jspHover');
						}
					).bind(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').bind('dragstart.jsp selectstart.jsp', nil);

							horizontalDrag.addClass('jspActive');

							var startX = e.pageX - horizontalDrag.position().left;

							$('html').bind(
								'mousemove.jsp',
								function(e)
								{
									positionDragX(e.pageX - startX, false);
								}
							).bind('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						}
					);
					horizontalTrackWidth = container.innerWidth();
					sizeHorizontalScrollbar();
				}
			}

			function sizeHorizontalScrollbar()
			{
				container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(
					function()
					{
						horizontalTrackWidth -= $(this).outerWidth();
					}
				);

				horizontalTrack.width(horizontalTrackWidth + 'px');
				horizontalDragPosition = 0;
			}

			function resizeScrollbars()
			{
				if (isScrollableH && isScrollableV) {
					var horizontalTrackHeight = horizontalTrack.outerHeight(),
						verticalTrackWidth = verticalTrack.outerWidth();
					verticalTrackHeight -= horizontalTrackHeight;
					$(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(
						function()
						{
							horizontalTrackWidth += $(this).outerWidth();
						}
					);
					horizontalTrackWidth -= verticalTrackWidth;
					paneHeight -= verticalTrackWidth;
					paneWidth -= horizontalTrackHeight;
					horizontalTrack.parent().append(
						$('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px')
					);
					sizeVerticalScrollbar();
					sizeHorizontalScrollbar();
				}
				// reflow content
				if (isScrollableH) {
					pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
				}
				contentHeight = pane.outerHeight();
				percentInViewV = contentHeight / paneHeight;

				if (isScrollableH) {
					horizontalDragWidth = Math.ceil(1 / percentInViewH * horizontalTrackWidth);
					if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
						horizontalDragWidth = settings.horizontalDragMaxWidth;
					} else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
						horizontalDragWidth = settings.horizontalDragMinWidth;
					}
					horizontalDrag.width(horizontalDragWidth + 'px');
					dragMaxX = horizontalTrackWidth - horizontalDragWidth;
					_positionDragX(horizontalDragPosition); // To update the state for the arrow buttons
				}
				if (isScrollableV) {
					verticalDragHeight = Math.ceil(1 / percentInViewV * verticalTrackHeight);
					if (verticalDragHeight > settings.verticalDragMaxHeight) {
						verticalDragHeight = settings.verticalDragMaxHeight;
					} else if (verticalDragHeight < settings.verticalDragMinHeight) {
						verticalDragHeight = settings.verticalDragMinHeight;
					}
					verticalDrag.height(verticalDragHeight + 'px');
					dragMaxY = verticalTrackHeight - verticalDragHeight;
					_positionDragY(verticalDragPosition); // To update the state for the arrow buttons
				}
			}

			function appendArrows(ele, p, a1, a2)
			{
				var p1 = "before", p2 = "after", aTemp;
				
				// Sniff for mac... Is there a better way to determine whether the arrows would naturally appear
				// at the top or the bottom of the bar?
				if (p == "os") {
					p = /Mac/.test(navigator.platform) ? "after" : "split";
				}
				if (p == p1) {
					p2 = p;
				} else if (p == p2) {
					p1 = p;
					aTemp = a1;
					a1 = a2;
					a2 = aTemp;
				}

				ele[p1](a1)[p2](a2);
			}

			function getArrowScroll(dirX, dirY, ele)
			{
				return function()
				{
					arrowScroll(dirX, dirY, this, ele);
					this.blur();
					return false;
				};
			}

			function arrowScroll(dirX, dirY, arrow, ele)
			{
				arrow = $(arrow).addClass('jspActive');

				var eve,
					scrollTimeout,
					isFirst = true,
					doScroll = function()
					{
						if (dirX !== 0) {
							jsp.scrollByX(dirX * settings.arrowButtonSpeed);
						}
						if (dirY !== 0) {
							jsp.scrollByY(dirY * settings.arrowButtonSpeed);
						}
						scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
						isFirst = false;
					};

				doScroll();

				eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
				ele = ele || $('html');
				ele.bind(
					eve,
					function()
					{
						arrow.removeClass('jspActive');
						scrollTimeout && clearTimeout(scrollTimeout);
						scrollTimeout = null;
						ele.unbind(eve);
					}
				);
			}

			function initClickOnTrack()
			{
				removeClickOnTrack();
				if (isScrollableV) {
					verticalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageY - offset.top - verticalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageY - offset.top - verticalDragHeight / 2,
											contentDragY = paneHeight * settings.scrollPagePercent,
											dragY = dragMaxY * contentDragY / (contentHeight - paneHeight);
										if (direction < 0) {
											if (verticalDragPosition - dragY > pos) {
												jsp.scrollByY(-contentDragY);
											} else {
												positionDragY(pos);
											}
										} else if (direction > 0) {
											if (verticalDragPosition + dragY < pos) {
												jsp.scrollByY(contentDragY);
											} else {
												positionDragY(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
				
				if (isScrollableH) {
					horizontalTrack.bind(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageX - offset.left - horizontalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageX - offset.left - horizontalDragWidth / 2,
											contentDragX = paneWidth * settings.scrollPagePercent,
											dragX = dragMaxX * contentDragX / (contentWidth - paneWidth);
										if (direction < 0) {
											if (horizontalDragPosition - dragX > pos) {
												jsp.scrollByX(-contentDragX);
											} else {
												positionDragX(pos);
											}
										} else if (direction > 0) {
											if (horizontalDragPosition + dragX < pos) {
												jsp.scrollByX(contentDragX);
											} else {
												positionDragX(pos);
											}
										} else {
											cancelClick();
											return;
										}
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									},
									cancelClick = function()
									{
										scrollTimeout && clearTimeout(scrollTimeout);
										scrollTimeout = null;
										$(document).unbind('mouseup.jsp', cancelClick);
									};
								doScroll();
								$(document).bind('mouseup.jsp', cancelClick);
								return false;
							}
						}
					);
				}
			}

			function removeClickOnTrack()
			{
				if (horizontalTrack) {
					horizontalTrack.unbind('mousedown.jsp');
				}
				if (verticalTrack) {
					verticalTrack.unbind('mousedown.jsp');
				}
			}

			function cancelDrag()
			{
				$('html').unbind('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

				if (verticalDrag) {
					verticalDrag.removeClass('jspActive');
				}
				if (horizontalDrag) {
					horizontalDrag.removeClass('jspActive');
				}
			}

			function positionDragY(destY, animate)
			{
				if (!isScrollableV) {
					return;
				}
				if (destY < 0) {
					destY = 0;
				} else if (destY > dragMaxY) {
					destY = dragMaxY;
				}

				// can't just check if(animate) because false is a valid value that could be passed in...
				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(verticalDrag, 'top', destY,	_positionDragY);
				} else {
					verticalDrag.css('top', destY);
					_positionDragY(destY);
				}

			}

			function _positionDragY(destY)
			{
				if (destY === undefined) {
					destY = verticalDrag.position().top;
				}

				container.scrollTop(0);
				verticalDragPosition = destY;

				var isAtTop = verticalDragPosition === 0,
					isAtBottom = verticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled * (contentHeight - paneHeight);

				if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
					wasAtTop = isAtTop;
					wasAtBottom = isAtBottom;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateVerticalArrows(isAtTop, isAtBottom);
				pane.css('top', destTop);
				elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
			}

			function positionDragX(destX, animate)
			{
				if (!isScrollableH) {
					return;
				}
				if (destX < 0) {
					destX = 0;
				} else if (destX > dragMaxX) {
					destX = dragMaxX;
				}

				if (animate === undefined) {
					animate = settings.animateScroll;
				}
				if (animate) {
					jsp.animate(horizontalDrag, 'left', destX,	_positionDragX);
				} else {
					horizontalDrag.css('left', destX);
					_positionDragX(destX);
				}
			}

			function _positionDragX(destX)
			{
				if (destX === undefined) {
					destX = horizontalDrag.position().left;
				}

				container.scrollTop(0);
				horizontalDragPosition = destX;

				var isAtLeft = horizontalDragPosition === 0,
					isAtRight = horizontalDragPosition == dragMaxX,
					percentScrolled = destX / dragMaxX,
					destLeft = -percentScrolled * (contentWidth - paneWidth);

				if (wasAtLeft != isAtLeft || wasAtRight != isAtRight) {
					wasAtLeft = isAtLeft;
					wasAtRight = isAtRight;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				}
				
				updateHorizontalArrows(isAtLeft, isAtRight);
				pane.css('left', destLeft);
				elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
			}

			function updateVerticalArrows(isAtTop, isAtBottom)
			{
				if (settings.showArrows) {
					arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
					arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function updateHorizontalArrows(isAtLeft, isAtRight)
			{
				if (settings.showArrows) {
					arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
					arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
				}
			}

			function scrollToY(destY, animate)
			{
				var percentScrolled = destY / (contentHeight - paneHeight);
				positionDragY(percentScrolled * dragMaxY, animate);
			}

			function scrollToX(destX, animate)
			{
				var percentScrolled = destX / (contentWidth - paneWidth);
				positionDragX(percentScrolled * dragMaxX, animate);
			}

			function scrollToElement(ele, stickToTop, animate)
			{
				var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;

				// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
				// errors from the lookup...
				try {
					e = $(ele);
				} catch (err) {
					return;
				}
				eleHeight = e.outerHeight();
				eleWidth= e.outerWidth();

				container.scrollTop(0);
				container.scrollLeft(0);
				
				// loop through parents adding the offset top of any elements that are relatively positioned between
				// the focused element and the jspPane so we can get the true distance from the top
				// of the focused element to the top of the scrollpane...
				while (!e.is('.jspPane')) {
					eleTop += e.position().top;
					eleLeft += e.position().left;
					e = e.offsetParent();
					if (/^body|html$/i.test(e[0].nodeName)) {
						// we ended up too high in the document structure. Quit!
						return;
					}
				}

				viewportTop = contentPositionY();
				maxVisibleEleTop = viewportTop + paneHeight;
				if (eleTop < viewportTop || stickToTop) { // element is above viewport
					destY = eleTop - settings.verticalGutter;
				} else if (eleTop + eleHeight > maxVisibleEleTop) { // element is below viewport
					destY = eleTop - paneHeight + eleHeight + settings.verticalGutter;
				}
				if (destY) {
					scrollToY(destY, animate);
				}
				
				viewportLeft = contentPositionX();
	            maxVisibleEleLeft = viewportLeft + paneWidth;
	            if (eleLeft < viewportLeft || stickToTop) { // element is to the left of viewport
	                destX = eleLeft - settings.horizontalGutter;
	            } else if (eleLeft + eleWidth > maxVisibleEleLeft) { // element is to the right viewport
	                destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
	            }
	            if (destX) {
	                scrollToX(destX, animate);
	            }

			}

			function contentPositionX()
			{
				return -pane.position().left;
			}

			function contentPositionY()
			{
				return -pane.position().top;
			}

			function isCloseToBottom()
			{
				var scrollableHeight = contentHeight - paneHeight;
				return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
			}

			function isCloseToRight()
			{
				var scrollableWidth = contentWidth - paneWidth;
				return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
			}

			function initMousewheel()
			{
				container.unbind(mwEvent).bind(
					mwEvent,
					function (event, delta, deltaX, deltaY) {
						var dX = horizontalDragPosition, dY = verticalDragPosition;
						jsp.scrollBy(deltaX * settings.mouseWheelSpeed, -deltaY * settings.mouseWheelSpeed, false);
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				);
			}

			function removeMousewheel()
			{
				container.unbind(mwEvent);
			}

			function nil()
			{
				return false;
			}

			function initFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp').bind(
					'focus.jsp',
					function(e)
					{
						scrollToElement(e.target, false);
					}
				);
			}

			function removeFocusHandler()
			{
				pane.find(':input,a').unbind('focus.jsp');
			}
			
			function initKeyboardNav()
			{
				var keyDown, elementHasScrolled, validParents = [];
				isScrollableH && validParents.push(horizontalBar[0]);
				isScrollableV && validParents.push(verticalBar[0]);
				
				// IE also focuses elements that don't have tabindex set.
				pane.focus(
					function()
					{
						elem.focus();
					}
				);
				
				elem.attr('tabindex', 0)
					.unbind('keydown.jsp keypress.jsp')
					.bind(
						'keydown.jsp',
						function(e)
						{
							if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
								return;
							}
							var dX = horizontalDragPosition, dY = verticalDragPosition;
							switch(e.keyCode) {
								case 40: // down
								case 38: // up
								case 34: // page down
								case 32: // space
								case 33: // page up
								case 39: // right
								case 37: // left
									keyDown = e.keyCode;
									keyDownHandler();
									break;
								case 35: // end
									scrollToY(contentHeight - paneHeight);
									keyDown = null;
									break;
								case 36: // home
									scrollToY(0);
									keyDown = null;
									break;
							}

							elementHasScrolled = e.keyCode == keyDown && dX != horizontalDragPosition || dY != verticalDragPosition;
							return !elementHasScrolled;
						}
					).bind(
						'keypress.jsp', // For FF/ OSX so that we can cancel the repeat key presses if the JSP scrolls...
						function(e)
						{
							if (e.keyCode == keyDown) {
								keyDownHandler();
							}
							return !elementHasScrolled;
						}
					);
				
				if (settings.hideFocus) {
					elem.css('outline', 'none');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', true);
					}
				} else {
					elem.css('outline', '');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', false);
					}
				}
				
				function keyDownHandler()
				{
					var dX = horizontalDragPosition, dY = verticalDragPosition;
					switch(keyDown) {
						case 40: // down
							jsp.scrollByY(settings.keyboardSpeed, false);
							break;
						case 38: // up
							jsp.scrollByY(-settings.keyboardSpeed, false);
							break;
						case 34: // page down
						case 32: // space
							jsp.scrollByY(paneHeight * settings.scrollPagePercent, false);
							break;
						case 33: // page up
							jsp.scrollByY(-paneHeight * settings.scrollPagePercent, false);
							break;
						case 39: // right
							jsp.scrollByX(settings.keyboardSpeed, false);
							break;
						case 37: // left
							jsp.scrollByX(-settings.keyboardSpeed, false);
							break;
					}

					elementHasScrolled = dX != horizontalDragPosition || dY != verticalDragPosition;
					return elementHasScrolled;
				}
			}
			
			function removeKeyboardNav()
			{
				elem.attr('tabindex', '-1')
					.removeAttr('tabindex')
					.unbind('keydown.jsp keypress.jsp');
			}

			function observeHash()
			{
				if (location.hash && location.hash.length > 1) {
					var e,
						retryInt,
						hash = escape(location.hash) // hash must be escaped to prevent XSS
						;
					try {
						e = $(hash);
					} catch (err) {
						return;
					}

					if (e.length && pane.find(hash)) {
						// nasty workaround but it appears to take a little while before the hash has done its thing
						// to the rendered page so we just wait until the container's scrollTop has been messed up.
						if (container.scrollTop() === 0) {
							retryInt = setInterval(
								function()
								{
									if (container.scrollTop() > 0) {
										scrollToElement(hash, true);
										$(document).scrollTop(container.position().top);
										clearInterval(retryInt);
									}
								},
								50
							);
						} else {
							scrollToElement(hash, true);
							$(document).scrollTop(container.position().top);
						}
					}
				}
			}

			function unhijackInternalLinks()
			{
				$('a.jspHijack').unbind('click.jsp-hijack').removeClass('jspHijack');
			}

			function hijackInternalLinks()
			{
				unhijackInternalLinks();
				$('a[href^=#]').addClass('jspHijack').bind(
					'click.jsp-hijack',
					function()
					{
						var uriParts = this.href.split('#'), hash;
						if (uriParts.length > 1) {
							hash = uriParts[1];
							if (hash.length > 0 && pane.find('#' + hash).length > 0) {
								scrollToElement('#' + hash, true);
								// Need to return false otherwise things mess up... Would be nice to maybe also scroll
								// the window to the top of the scrollpane?
								return false;
							}
						}
					}
				);
			}
			
			// Init touch on iPad, iPhone, iPod, Android
			function initTouch()
			{
				var startX,
					startY,
					touchStartX,
					touchStartY,
					moved,
					moving = false;
  
				container.unbind('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').bind(
					'touchstart.jsp',
					function(e)
					{
						var touch = e.originalEvent.touches[0];
						startX = contentPositionX();
						startY = contentPositionY();
						touchStartX = touch.pageX;
						touchStartY = touch.pageY;
						moved = false;
						moving = true;
					}
				).bind(
					'touchmove.jsp',
					function(ev)
					{
						if(!moving) {
							return;
						}
						
						var touchPos = ev.originalEvent.touches[0],
							dX = horizontalDragPosition, dY = verticalDragPosition;
						
						jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);
						
						moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
						
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					}
				).bind(
					'touchend.jsp',
					function(e)
					{
						moving = false;
						/*if(moved) {
							return false;
						}*/
					}
				).bind(
					'click.jsp-touchclick',
					function(e)
					{
						if(moved) {
							moved = false;
							return false;
						}
					}
				);
			}
			
			function destroy(){
				var currentY = contentPositionY(),
					currentX = contentPositionX();
				elem.removeClass('jspScrollable').unbind('.jsp');
				elem.replaceWith(originalElement.append(pane.children()));
				originalElement.scrollTop(currentY);
				originalElement.scrollLeft(currentX);
			}

			// Public API
			$.extend(
				jsp,
				{
					// Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
					// was initialised). The settings object which is passed in will override any settings from the
					// previous time it was initialised - if you don't pass any settings then the ones from the previous
					// initialisation will be used.
					reinitialise: function(s)
					{
						s = $.extend({}, settings, s);
						initialise(s);
					},
					// Scrolls the specified element (a jQuery object, DOM node or jQuery selector string) into view so
					// that it can be seen within the viewport. If stickToTop is true then the element will appear at
					// the top of the viewport, if it is false then the viewport will scroll as little as possible to
					// show the element. You can also specify if you want animation to occur. If you don't provide this
					// argument then the animateScroll value from the settings object is used instead.
					scrollToElement: function(ele, stickToTop, animate)
					{
						scrollToElement(ele, stickToTop, animate);
					},
					// Scrolls the pane so that the specified co-ordinates within the content are at the top left
					// of the viewport. animate is optional and if not passed then the value of animateScroll from
					// the settings object this jScrollPane was initialised with is used.
					scrollTo: function(destX, destY, animate)
					{
						scrollToX(destX, animate);
						scrollToY(destY, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the left of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToX: function(destX, animate)
					{
						scrollToX(destX, animate);
					},
					// Scrolls the pane so that the specified co-ordinate within the content is at the top of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToY: function(destY, animate)
					{
						scrollToY(destY, animate);
					},
					// Scrolls the pane to the specified percentage of its maximum horizontal scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentX: function(destPercentX, animate)
					{
						scrollToX(destPercentX * (contentWidth - paneWidth), animate);
					},
					// Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentY: function(destPercentY, animate)
					{
						scrollToY(destPercentY * (contentHeight - paneHeight), animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollBy: function(deltaX, deltaY, animate)
					{
						jsp.scrollByX(deltaX, animate);
						jsp.scrollByY(deltaY, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByX: function(deltaX, animate)
					{
						var destX = contentPositionX() + Math[deltaX<0 ? 'floor' : 'ceil'](deltaX),
							percentScrolled = destX / (contentWidth - paneWidth);
						positionDragX(percentScrolled * dragMaxX, animate);
					},
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByY: function(deltaY, animate)
					{
						var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
							percentScrolled = destY / (contentHeight - paneHeight);
						positionDragY(percentScrolled * dragMaxY, animate);
					},
					// Positions the horizontal drag at the specified x position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragX: function(x, animate)
					{
						positionDragX(x, animate);
					},
					// Positions the vertical drag at the specified y position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragY: function(y, animate)
					{
						positionDragY(y, animate);
					},
					// This method is called when jScrollPane is trying to animate to a new position. You can override
					// it if you want to provide advanced animation functionality. It is passed the following arguments:
					//  * ele          - the element whose position is being animated
					//  * prop         - the property that is being animated
					//  * value        - the value it's being animated to
					//  * stepCallback - a function that you must execute each time you update the value of the property
					// You can use the default implementation (below) as a starting point for your own implementation.
					animate: function(ele, prop, value, stepCallback)
					{
						var params = {};
						params[prop] = value;
						ele.animate(
							params,
							{
								'duration'	: settings.animateDuration,
								'easing'	: settings.animateEase,
								'queue'		: false,
								'step'		: stepCallback
							}
						);
					},
					// Returns the current x position of the viewport with regards to the content pane.
					getContentPositionX: function()
					{
						return contentPositionX();
					},
					// Returns the current y position of the viewport with regards to the content pane.
					getContentPositionY: function()
					{
						return contentPositionY();
					},
					// Returns the width of the content within the scroll pane.
					getContentWidth: function()
					{
						return contentWidth;
					},
					// Returns the height of the content within the scroll pane.
					getContentHeight: function()
					{
						return contentHeight;
					},
					// Returns the horizontal position of the viewport within the pane content.
					getPercentScrolledX: function()
					{
						return contentPositionX() / (contentWidth - paneWidth);
					},
					// Returns the vertical position of the viewport within the pane content.
					getPercentScrolledY: function()
					{
						return contentPositionY() / (contentHeight - paneHeight);
					},
					// Returns whether or not this scrollpane has a horizontal scrollbar.
					getIsScrollableH: function()
					{
						return isScrollableH;
					},
					// Returns whether or not this scrollpane has a vertical scrollbar.
					getIsScrollableV: function()
					{
						return isScrollableV;
					},
					// Gets a reference to the content pane. It is important that you use this method if you want to
					// edit the content of your jScrollPane as if you access the element directly then you may have some
					// problems (as your original element has had additional elements for the scrollbars etc added into
					// it).
					getContentPane: function()
					{
						return pane;
					},
					// Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
					// animateScroll value from settings is used instead.
					scrollToBottom: function(animate)
					{
						positionDragY(dragMaxY, animate);
					},
					// Hijacks the links on the page which link to content inside the scrollpane. If you have changed
					// the content of your page (e.g. via AJAX) and want to make sure any new anchor links to the
					// contents of your scroll pane will work then call this function.
					hijackInternalLinks: function()
					{
						hijackInternalLinks();
					},
					// Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
					// initialised.
					destroy: function()
					{
							destroy();
					}
				}
			);
			
			initialise(s);
		}

		// Pluginifying code...
		settings = $.extend({}, $.fn.jScrollPane.defaults, settings);
		
		// Apply default speed
		$.each(['mouseWheelSpeed', 'arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
			settings[this] = settings[this] || settings.speed;
		});

		return this.each(
			function()
			{
				var elem = $(this), jspApi = elem.data('jsp');
				if (jspApi) {
					jspApi.reinitialise(settings);
				} else {
					jspApi = new JScrollPane(elem, settings);
					elem.data('jsp', jspApi);
				}
			}
		);
	};

	$.fn.jScrollPane.defaults = {
		showArrows					: false,
		maintainPosition			: true,
		stickToBottom				: false,
		stickToRight				: false,
		clickOnTrack				: true,
		autoReinitialise			: false,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		horizontalDragMinWidth		: 0,
		horizontalDragMaxWidth		: 99999,
		contentWidth				: undefined,
		animateScroll				: false,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: false,
		verticalGutter				: 4,
		horizontalGutter			: 4,
		mouseWheelSpeed				: 0,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		horizontalArrowPositions	: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: .8		// Percent of visible area scrolled when pageUp/Down or track area pressed
	};

})(jQuery,this);



/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);


/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


/*
 * Special event for image load events
 * Needed because some browsers does not trigger the event on cached images.

 * MIT License
 * Paul Irish     | @paul_irish | www.paulirish.com
 * Andree Hansson | @peolanha   | www.andreehansson.se
 * 2010.
 *
 * Usage:
 * $(images).bind('imgLoad', function (e) {
 *   // Do stuff on load
 * });
 *
 * Note that you can bind the 'error' event on data uri images, this will trigger when
 * data uri images isn't supported.
 *
 * Tested in:
 * FF 3+
 * IE 6-8
 * Chromium 5-6
 * Opera 9-10
 */


(function ($) {
	$.event.special.imgLoad = {
		add: function (hollaback) {
			var src = this.src;
			if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
				// Image is already complete, fire the hollaback (fixes browser issues were cached
				// images isn't triggering the load event)
				if ( this.complete || this.readyState === 4 ) {
					hollaback.handler.apply(this);
				}
				
				else {
					$(this).bind('load', hollaback.handler);
				}
			}
		}
	};
}(jQuery));

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

/**
 * @name util.js
 * @fileOverview
 * @version 1.1
 * @author <a href="mailto:imai@4digit.jp">Kotaro Imai</a> @ <a href="http://hokypoky.info">HOKYPOKY.</a>
 * @description
 * <p>JavaScript Utility Library</p>
 * <p>(c) FOURDIGIT Inc. Licensed <a href="http://ja.wikipedia.org/wiki/GNU_General_Public_License">GNU General Public License</a>.</p>
 */
if(!Fourdigit) {
  /**
   * @namespace Fourdigit
   * @description
   * <p>namespace:Fourdigit</p>
   * <p>これは他のクラスなどと名前がかぶらないようにするためのものです。</p>
   */
  var Fourdigit = {}
}
(function($) {
  /**
   * @class Utility Core Class
   * @description
   * <p>FOURDIGIT Inc jQuery Plugins Core Class</p>
   * <p>ここは内部的に利用する関数が主です。</p>
   */
  Fourdigit.core = $.extend(
  /** @lends Fourdigit.core */
  {
    /**
     * 基準JS(id)のbasePathを返す
     * @function
     * @param {String}  id 基準となるJSファイルのid名
     * @param {String}  delimiter セパレートする文字列
     * @return {String}
     * @example
     * basePath("jqueryJS","common/js"); -> return path to jqueryJS(default)
     */
    /*
    basePath : (function (id,delimiter) {
      var _id = (id ? id : "JqueryJS");
      var _delimiter = (delimiter ? delimiter : "common/js");
      return document.getElementById(_id).src.split(_delimiter)[0];
    })(),
    */
    
    /**
     * userAgentをbodyのクラスとして追加する
     * @function
     */
    addClassUA : function() {
      var ua = navigator.userAgent.toLowerCase();
      var _os = (
        /(x11|linux)/.test(ua)?  "linux":
        /mac/.test(ua)?      "mac":
        /win/.test(ua)?      "win":
        ""
      )
      if(_os != "") $("body").addClass(_os);
      var _browser = (
        $.browser.safari?  "safari":
        $.browser.msie?  "msie":
        $.browser.opera?  "opera":
        $.browser.mozilla?  "mozilla":
        ""
      )
      if(_browser != "") $("body").addClass(_browser);
      if(_browser == "msie") {
        var _version = (
          $.browser.version == "5.0"? "ie50":
          $.browser.version == "5.5"? "ie55":
          $.browser.version == "6.0"? "ie6":
          $.browser.version == "7.0"? "ie7":
          $.browser.version == "8.0"? "ie8":
          ""
        )
        if(_version != "") $("body").addClass(_version);
      }
    },
    /**
     * 対象のリンクをポップアップする
     * @function
     * @param {String}  src ポップアップ先のURL
     * @param {String}  windowName ウィンドウ名
     * @param {Boolean}  status メニューバーの有無
     */
    popWindow: function(src,windowName,status) {
      var _href    = (src ? src : "");
      var _isPop    = (status != null);
      var _windowName = (windowName ? windowName : "");
      if(_isPop){
        var _features = "";
        status.width?    _features += ",width="+Math.min(status.width, screen.availWidth):"";
        status.height?    _features += ",height="+Math.min(status.height, screen.availHeight-50):"";
        status.left?    _features += ",left="+status.left:"";
        status.top?      _features += ",top="+status.top:"";
        status.menubar?    _features += ",menubar="+status.menubar:
                  _features += ",menubar=no";
        status.toolbar?    _features += ",toolbar="+status.toolbar:
                  _features += ",toolbar=no";
        status.location?  _features += ",location="+status.location:
                  _features += ",location=no";
        status.status?    _features += ",status="+status.status:
                  _features += ",location=no";
        status.resizable?  _features += ",resizable="+status.resizable:
                  _features += ",resizable=yes";
        status.scrollbars?  _features += ",scrollbars="+status.scrollbars:
                  _features += ",scrollbars=yes";
        _features = _features.replace(/^,/,"");
      }
      return window.open(_href, _windowName, _features != "" ? _features : null);
    },
    /**
     * easyOver用イベントハンドラクラス
     * @class
     */
    easyOver: {
      /**
       * mouseover時のハンドラ
       * @function
       * @param {Event}  マウスオーバーイベント
       */
      mouseoverHandler: function (e) {
        this.src = $(this).data("ov_src");
        $(this).enablePNG();
      },
      /**
       * mouseout時のハンドラ
       * @function
       * @param {Event}  マウスオーバーイベント
       */
      mouseoutHandler: function (e) {
        this.src = $(this).data("df_src");
      },
      /**
       * click時のハンドラ
       * @function
       * @param {Event}  マウスクリックイベント
       */
      clickHandler: function (e) {
        this.src = $(this).data("on_src");
        $(this).enablePNG();
      }
    },
    /**
     * 要素の高さを最大値に揃える
     * @function
     */
    heightline: function(expr) {
      var maxHeight = 0;
      $(expr)
        .each(function() {
          maxHeight = Math.max(maxHeight, $(this).height())
        })
        .height(maxHeight)
      ;
    },
    /**
     * status
     * @class
     * @description
     * <p>動的にステータスをつける拡張</p>
     */
    status: {
      /**
       * hover時に .hoverクラスをつける
       * @function
       * @param {String}  expr selectorexpr
       * @param {String}  _class 付与するクラス
       */
      hover: function(expr, _class) {
        if(typeof value != 'undefined') _class = "hover";
        $(expr)
          .live("mouseover",function(){
            $(this).addClass(_class);
          })
          .live("mouseout",function(){
            $(this).removeClass(_class);
          })
        ;
      },
      /**
       * 子要素の一番最初にクラスをつける
       * @function
       * @param {String}  expr selectorexpr
       * @param {String}  _class 付与するクラス
       */
      first: function(expr, _class) {
        if(typeof value != 'undefined') _class = "first";
        $(expr).each(function(){
          $(this).find(">:first").addClass(_class);
        });
      },
      /**
       * 子要素の一番最後にクラスをつける
       * @function
       * @param {String}  expr selectorexpr
       * @param {String}  _class 付与するクラス
       */
      last: function(expr, _class) {
        if(typeof value != 'undefined') _class = "last";
        $(expr).each(function(){
          $(this).find(">:last").addClass(_class);
        });
      }
    }
  });
  /**
   * @class Utility Utility Class
   * @description
   * <p>FOURDIGIT Inc jQuery Plugins Utility Class</p>
   * <p>ここはjQueryオブジェクトに対して機能追加されるプラグイン関数部分です。</p>
   */
  Fourdigit.util = $.fn.extend(
  /** @lends Fourdigit.util */
  {
    
    /**
     * 対象要素のイメージをオーバーした際に画像のパスをfname.extからfname_ov.extにする
     * @function
     * @return {jQuery}  jQueryオブジェクトを返すのでそのままチェーンします。
     * @example
     * jQuery("img.ahover, .ahoverArea img").easyOver();
     */
    easyOver: function(hasOn){
      var preImgArrOv = new Array();
      var preImgArrOn = new Array();
      var $imggrp = this;
      $imggrp
        .each(function(){
          var $this = $(this);
          var src = this.src;
          var isov = src.substring(0,src.lastIndexOf('.'));
          if( !/_(ov|on|off)$/.test(isov) ) {
            var ftype = src.substring(src.lastIndexOf('.'), src.length);
            var df_src = src;
            var ov_src = src.replace(ftype, '_ov'+ftype);
            preImgArrOv.push(new Image());
            preImgArrOv[preImgArrOv.length-1].src = ov_src;
            
            $this
              .data({
                df_src: df_src,
                ov_src: ov_src,
                on_src: ov_src
              });
              if(hasOn){
                var on_src = src.replace(ftype, '_on'+ftype);
                preImgArrOn.push(new Image());
                preImgArrOn[preImgArrOn.length-1].src = on_src;
                $this.data("on_src", on_src );
              }
            $this
              .bind("mouseover", $.easyOver.mouseoverHandler)
              .bind("mouseout", $.easyOver.mouseoutHandler)
              .bind("mouseon", function(){
                $imggrp
                  .each(function(){
                    $(this).attr("src", $(this).data("df_src"));
                  })
                  .bind("mouseover", $.easyOver.mouseoverHandler)
                  .bind("mouseout", $.easyOver.mouseoutHandler)
              })
              .bind("mouseon", $.easyOver.clickHandler)
              .bind("mouseon", function(){
                //$this.removeEasyOver()
              })
              .bind("click", function(){
                //$this.trigger("mouseon");
              })
            .end();
            
          }
        })
      ;
      return this;
    },
    /**
     * 対象要素のイメージのeasyOverを削除
     * @function
     * @return {jQuery}  jQueryオブジェクトを返すのでそのままチェーンします。
     * @example
     * jQuery("#trigger").click(function(){
     *   jQuery(this).find("img.ahover").removeEasyOver()
     * });
     */
    removeEasyOver: function (){
      this.each(function(){
        $(this)
          .unbind("mouseover",$.easyOver.mouseoverHandler)
          .unbind("mouseout",$.easyOver.mouseoutHandler)
        .end();
      });
      return this;
    },
    /**
     * 対象要素のリンクをポップアップにする
     * @function
     * @return {jQuery}  jQueryオブジェクトを返すのでそのままチェーンします。
     * @example
     * jQuery("a.commonPop").easyPop();
     * <strong>HTML</strong>
     * きちんとした定義
     * &lt;a href="someLink" class="commonPop" target="_blank" rel="width:500,height:300"%gt;SOME LINK%lt;a%gt;
     * 略 - widthとheightしか指定できません
     * &lt;a href="someLink" class="commonPop" target="_blank" rel="500,300"%gt;SOME LINK%lt;a%gt;
     */
    easyPop: function(){
      this.each(function(){
        this.target = "";
        var rel = {};
        if(!/:/.test(this.rel)){
          var relArr = this.rel.split(",");
          if(relArr[1]){
            rel["width"] = relArr[0];
            rel["height"] = relArr[1];
          }else{
            rel["width"] = relArr[0];
            rel["height"] = relArr[0];          
          }
        }else{
          if(!this.rel) {
            rel = { width : "750", height : "800" }
          }else{
            var relArr = this.rel.split(",");
            if(this.rel.split(":")){
              for (var i = 0; i < relArr.length; i++) {
                var _key = relArr[i].split(":")[0];
                var _val = relArr[i].split(":")[1];
                rel[_key] = _val;
              }
            }
          }        
        }
        $(this).click(function(){
          var wname = (rel["wname"]? rel["wname"]: "");
          $.popWindow(this.href,wname,rel);
          return false;
        });
      })
      return this;
    },
    
    /**
     * 対象要素がページないリンクだった場合、イージングでスクロールするようにする
     * @function
     * @return {jQuery} jQueryオブジェクトを返すのでそのままチェーンします。
     * @example
     * jQuery("a[href*=#]").smoothScroll();
     */
    smoothScroll: function (speed) {
        var lh = decodeURIComponent(location.href);
        var pagePath = /\?/.test(lh)? lh.split('?')[0]: /#/.test(lh)? lh.split('#')[0]: lh;
        var scrollInt;
        this.each(function(){
          var th = decodeURIComponent(this.href);
          var actX, actY, tarY = 0, tarX = 0;
          speed = parseInt(!speed? 6: speed == "fast"? 3: speed == "normal"? 6: speed == "slow"? 12: speed);
          var setScroll = function (tarX,tarY,anc) {
            actX += (tarX - actX) / speed;
            actY += (tarY - actY) / speed;
            if(Math.abs(tarX - actX) < 1 && Math.abs(tarY - actY) < 1) {
              clearInterval(scrollInt);
              location.hash = "#"+anc;
              scrollTo(Math.round(tarX), Math.round(tarY));
            } else {
              scrollTo(Math.round(actX), Math.round(actY));
            }
          };
          var anc = th.split('#')[1];
          if(!anc) return;
          if( /#/.test(th)  && th.match(pagePath) && $('#'+anc)[0] ){
            $(this).click(function (){
              var tarObj = $('#'+anc);
              tarX = ($(document).width() > tarObj.position().left + $(window).width())
                  ? tarObj.position().left
                  : $(document).width() - $(window).width();
              tarY = ($(document).height() > tarObj.position().top + $(window).height())
                  ? tarObj.position().top
                  : $(document).height() - $(window).height();
              actX = $(document).scrollLeft();
              actY = $(document).scrollTop();
              clearInterval(scrollInt);
              scrollInt = setInterval(function(){setScroll(tarX,tarY,anc)}, 20);
              return false;
            });
          }
        });
        //stop when mousewheel
        var wheel = function () {clearInterval(scrollInt);}
        if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
        window.onmousewheel = document.onmousewheel = wheel;
        return this;
    },
    
    /**
     * 対象要素をスクロールに追従するようにする(CSSでabsoluteにしている必要あり)
     * @function
     * @param {String}  stopper  スクロールを止める要素のid名
     * @param {Number|String}  speed  スクロールのスピード。
     * @return {jQuery}  jQueryオブジェクトを返すのでそのままチェーンします。
     * @example
     * jQuery("#fix").fixPosition();  // normalと同じ
     * jQuery("#fix").fixPosition("slow");
     * jQuery("#fix").fixPosition("normal");
     * jQuery("#fix").fixPosition("fast");
     * jQuery("#fix").fixPosition(12);  // slowと同じ
     * jQuery("#fix").fixPosition(6);  // normalと同じ
     * jQuery("#fix").fixPosition(3);  // fastと同じ
     * jQuery("#fix").fixPosition(100);  // すごく遅いのでオススメしない
     */
    fixPosition: function (stopper,speed) {
      speed = (!speed? 6: speed == "fast"? 3:  speed == "normal"? 6: speed == "slow"? 12: speed);
      var fixScrollTop     = function () { return $(document).scrollTop()};
      var fixScrollBottom  = function () { return $(document).scrollTop()+$(document).height()};
      this.each(function(){
        var obj = this;
        var offsetY    = function(){ return $(obj).offset().top };
        var posY    = function(){ return $(obj).position().top };
        var boxHeight  = $(obj).height();
        var topLimit  = posY();
        var bottomLimit;
        var fix_idle  = 10;
        var intervalID;
        var easeScroll = function (stopper) {
          if (fix_idle <= 0) {
            var bottom = offsetY() + boxHeight;
            var tar = Math.max(fixScrollTop(), topLimit);
            if ( stopper && ( tar + boxHeight ) > bottomLimit ) {
              tar =  bottomLimit - boxHeight;
            }
            var nPos = (tar - offsetY()) / speed + posY();
            obj.style.top = nPos + 'px';
          } else {fix_idle--; }
        };
        if(document.getElementById(stopper)){
          var stopObj = document.getElementById(stopper);
          bottomLimit = $(stopObj).position().top;
          intervalID = setInterval(function(){easeScroll("stopper")}, 20);
        }else {
          intervalID = setInterval(function(){easeScroll()}, 20);
        }
        document.onscroll = function() { fix_idle = 10; }
      });
      return this;
    }
  });

	$(function() {

		//bodyのクラスにブラウザ情報を追加
		$.addClassUA();

		//easyOverのターゲット設定
		$("img.ahover, .ahoverArea img").easyOver();

		//PNG有効化 (jquery.belatedPNG.jsの読み込みが必要)
		$(".png").each(function(){ $(this).fixPng(); })

		//ポップアップリンクに置換
		$(".commonPop").easyPop();

		//アンカーリンクをスムージング
		$(".smoothScroll").smoothScroll();

		//対象の要素をスクロールに追従するようにする
//		$("#fixBox").fixPosition("stopperID", "normal");

		//heightline
		$(".separator").each(function(){ $(this).heightline(".box");  });

	});

})(jQuery);

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);


/* Modernizr 2.6.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/*
 * jQuery liquid-slider
 *
 * Copyright (c) 2012 kenjiokabe
 */

$.fn.liquidSlider = function(option){

	var auto = option["auto"] || false;
	var autoInterval = option["autoInterval"] || 5000;
	var dontHideNextBack = option["dontHideNextBack"] || false;

	$(this).each(function(){


		var $me = $(this);
		var $body = $("body");
		var $outer = $(".slider_outer", $me);
		var $inner = $(".slider_inner", $me);
		var $cols = $(".slider_col", $me);
		var inner = $inner[0];
		var $paging = $(".paging", $me);
		var $tpl_pagingBtn = $paging.children().remove();
		var $next = $(".next", $me);
		var $back = $(".back", $me);

		var hasTransform = Modernizr.csstransforms3d;

		var easingIdx = {
			"easeInOutQuart": "0.770, 0.000, 0.175, 1.000",
			"easeOutQuart": "0.165, 0.840, 0.440, 1.000"
		}

		var _page = -1;
		var _perPage = 0;
		var _maxPage = 0;

		var autoID;


		$me.css("visibility", "visible")

		//get cols
		var $colsArr = [];
		$cols.each(function(index){
			var $col = $(this);
			$colsArr.push($col);
		})
		var $topCol = $colsArr[0];

		//move inner
		var moveInner = function(time, easing, offset){
			time = time || 0;
			easing = easing || "easeInOutQuart";
			offset = offset || 0;
			var tx = -_page*_sw+offset
			$inner.stop();
			if(hasTransform) {
				if(time==0) {
					inner.style.MozTransition = inner.style.webkitTransition = "all 0ms"
				} else {
					inner.style.MozTransition = inner.style.webkitTransition = "all " + time + "ms cubic-bezier("+ easingIdx[easing] +")";
				}
				inner.style.MozTransform = inner.style.webkitTransform = 'translate3d(' + tx + 'px,0,0)';
			} else {
				if(time==0) {
					$inner.css({ "left":tx+"px" })
				} else {
					$inner.animate({ "left":tx+"px" }, time, easing)
				}
			}
		}

		//switchPage
		var switchPage = function(page, perPage, easing){
			if(perPage===undefined) perPage = _perPage;
			if(_page==page && _perPage==perPage) return;
			if(page<0 || page>=_maxPage) return;

			easing = easing || "easeInOutQuart";
			//paging
			if(_perPage!=perPage) {
				$paging.html("")
				var i, len = _maxPage;
				for (i = 0; i < len; i++) {
					var $pagingBtn = $tpl_pagingBtn.clone().appendTo( $paging );
					$pagingBtn = ($pagingBtn.find("a").length==0)? $pagingBtn: $pagingBtn.find("a");
					$pagingBtn[0].num = i;
					if(page==i) $pagingBtn.addClass("on")
				}

				$paging.add($next).add($back).css("visibility", _maxPage==1? "hidden": "visible" );
			}
			if(_page!=page) {
				$paging.find("a").each(function(index){
					var $this = $(this);
					if(index==page) {
						if(!$this.hasClass("on")) $this.addClass("on")
					} else {
						$this.removeClass("on");
					}
				})
			}
			if(!dontHideNextBack) {
				$back.css("visibility", (page==-1 || page==0)? "hidden": "visible" );
				$next.css("visibility", (page==-1 || page==_maxPage-1)? "hidden": "visible" );
			}

			_page = page;
			_perPage = perPage;

			moveInner(500, easing)

			//auto
			startAuto();
		}
		var stopAuto = function(){
			if(auto) {
				if(autoID) clearTimeout(autoID);
			}
		}
		var startAuto = function(){
			if(auto) {
				if(autoID) clearTimeout(autoID);
				autoID = setTimeout(function(){
					goNext();
				}, autoInterval)
			}
		}
		var goNext = function(){
			var p = _page + 1;
			if(p>=_maxPage) p = 0;
			switchPage( p );
		}
		var goBack = function(){
			var p = _page - 1;
			if(p<0) p = _maxPage-1;
			switchPage( p );
		}

		//resized
		var _sw, _w;
		var resized = function(e){
			_sw = $outer.width();
			_w = $topCol.width() + parseInt($topCol.css("padding-left"), 10)// + parseInt($topCol.css("padding-right"), 10);// + parseInt($topCol.css("padding-left"), 10) + parseInt($topCol.css("padding-right"), 10);

			//page
			var ind = _page * _perPage;
			var perPage = Math.floor( (_sw+5)/_w );
			var page = Math.floor( ind/perPage );
			_maxPage = Math.ceil( $colsArr.length / perPage );

			//position / height
			var i, len = $colsArr.length;
			var _nextX = 0;
			var maxH = 0;
			for (i = 0; i < len; i++) {
				var $col = $colsArr[i];
				if( (i+1)%perPage==0 ) _nextX += (_sw-_w*perPage);//一番右のやつの辻褄合わせ
				$col.css({
					"left": _nextX+"px"
				})
				_nextX += _w;
				maxH = Math.max(maxH, $col.height());
			}

			//move
			moveInner();

			//me - height
			$outer.css("height", maxH+"px")

			//
			switchPage(page, perPage);
		}
		$(window).bind("load resize", function(e){
			resized(e);
		})
		resized(null);


		//paging
		$paging.delegate("a", "click", function(e){
			e.preventDefault()
			switchPage(this.num)
		})

		//next / back
		$next.click(function(e){
			e.preventDefault();
			goNext();
		})
		$back.click(function(e){
			e.preventDefault();
			goBack();
		})



		//bind drag
		var startX = 0;
		var preX = 0;
		var offsetX = 0;
		var distX = 0;
		var isMoved;
		var touchStart = function(e) {
//		e.preventDefault();
			startX = preX = e.originalEvent.touches[0].pageX;
			isMoved = false;
			offsetX = distX = 0
			$body.bind("touchmove", touchMove);
			$body.bind("touchend", touchEnd);
			stopAuto();
		}
		var touchMove = function(e) {
			// ensure swiping with one touch and not pinching
			if(e.originalEvent.touches.length > 1) return;

			var mx = e.originalEvent.touches[0].pageX;
			distX = mx - preX;
			preX = mx;
			offsetX = mx - startX;
			if( (_page==0&&offsetX>0) || (_page==_maxPage-1&&offsetX<0)) offsetX*= 0.3;
			moveInner(0, null, offsetX);
			if(Math.abs(offsetX)>10) isMoved = true;
			if(isMoved) {
				e.preventDefault();
				e.stopPropagation()
			}
		}
		var touchEnd = function(e) {
			if(isMoved) {
				e.preventDefault();
				e.stopPropagation();
				isMoved = false;
			}
			$body.unbind("touchmove", touchMove);
			$body.unbind("touchend", touchEnd);

			var per = Math.abs( offsetX / _sw );
			var per_dx = Math.abs( distX / _sw );
			if(per_dx>0.04) per = 1;//速くドラッグ
			if(offsetX*distX<0) per = 0;//逆方向
			var p = _page + (offsetX>0? -1: +1);
			if( per<0.25 || p<0 || p>=_maxPage) {
				moveInner(300, "easeOutQuart", 0);
			} else {
				switchPage(p, null, "easeOutQuart")
			}
			startAuto();
		}
		$inner.bind("touchstart", touchStart);


	})
}



/*
 * jQuery flexSwipe
 *
 * Copyright (c) 2012 kenjiokabe
 */

$.fn.flexSwipe = function(option){

	option = option || {};
	var snap = option["snap"] || false;//true or false
	var inifinite = option["inifinite"] || false;//true or false
	var initNum = option["initNum"] || 0;
	var autoPlay = option["autoPlay"] || false;

	var DURATION_TIME = 700;

	$(this).each(function(){

		var $body = $("body");
		var $window = $(window);

		//
		var has3D = Modernizr.csstransforms3d;
		if(_ctrl.ie) has3D = false;
		var transitionName = _ctrl.ff? "-moz-transition": "-webkit-transition";
		var transformName = _ctrl.ff? "-moz-transform": "-webkit-transform";

		/*  cast
		 --------------------------------------------------*/
		var $me = $(this);
		var $area = $(".area", $me);
		var $base = $(".base", $me);
		var $mover = $(".mover", $me).css(transformName, "translate3d(0px, 0px, 0px)");
		var $btNext = $(".btNext", $me);
		var $btBack = $(".btBack", $me);
		var $cols = $("li", $mover);
		var $topCol = $("li:nth-child(1)", $mover);
		var $switchBts = $(".switchBts", $me);
		var $switchBtLi;

		var colNum = $cols.length;


		/*  init
		 --------------------------------------------------*/
		var areaW,baseX,colW,totalW,perPage,maxX,minX;
		var currentPage = 0;

		//infinite
		var realBaseX = 0;
		var idealHoseiX = 0;

		var resized = function(){
			areaW = $area.width();
			if(_ctrl.ie678) areaW  = 700;
			$("li", $mover).css({
				'width':areaW,
				'height':'auto'
			});
			baseX = parseInt( $base.css('left') || 0, 10 );
			colW = areaW //$topCol.width()
				+  parseInt( $topCol.css("padding-left")||0, 10 )
				+  parseInt( $topCol.css("padding-right")||0, 10 )
				+  parseInt( $topCol.css("margin-left")||0, 10 )
				+  parseInt( $topCol.css("margin-right")||0, 10 );
			totalW = colW * colNum;
			perPage = Math.ceil( (areaW-10) / colW );
			maxX = 0;
			minX = -(totalW-colW);
			$mover.css('width',colW*colNum*3);

			//infinite
			realBaseX = 0;
			idealHoseiX = 0;
			realBaseX -= totalW;

			//move
			currentPage = currentPage%colNum;
			var tx = currentPage * -colW;
			moveTo(tx, 0, "easeOutQuart", true);
		}
		$(window).bind('resize',resized);
		resized();
		setTimeout(resized,1);

		// add switchBt
		for(i=0; i<colNum; i++){
			$switchBts.append('<li><a href="#"></a></li>');

			if(i==colNum-1){
				$switchBtLi = $switchBts.find('li');

				$switchBtLi.each(function(index){
					$(this).find('a').bind('click',function(e){
						e.preventDefault();
						switchPage(Math.floor(currentPage/colNum)*colNum+index,false);
					});
				});
			}
		}

		var isSliderActive = true;
		if(colNum<=perPage) isSliderActive = false;
		if(!isSliderActive) {
			$btNext.add($btBack).css("visibility", "hidden");
			return;
		}

		$cols.clone().appendTo($mover);
		$cols.clone().appendTo($mover);
		realBaseX -= totalW;


		/*  move
		 --------------------------------------------------*/
		var currentX = -1;
		var currentTransition;
		var easingIdx = {
			"swing": "0.02, 0.01, 0.47, 1.000",
			"easeOutQuad": "0.250, 0.460, 0.450, 0.940",
			"easeOutQuart": "0.165, 0.840, 0.440, 1.000",
			"easeInOutQuad": "0.455, 0.030, 0.515, 0.955",
			"easeInOutQuart": "0.770, 0.000, 0.175, 1.000"
		}
		var nextBackID;
		function moveTo(tx, time, easingType, forced) {
			if(!isDragging) {}
			if(currentX==tx && !forced) return;

			time = time || 0;
			easingType = easingType||"easeOutQuart";

			var delay = 1;

			if(time>0){
				var idealMaxX = (maxX-idealHoseiX)+areaW;
				var idealMinX = (minX-idealHoseiX)-areaW;
				if(tx>idealMaxX) {
					idealHoseiX -= totalW;
					realBaseX -= totalW;
					setTransform( currentX+realBaseX );
					delay = _ctrl.ff?33:1;
				}else if(tx<idealMinX) {
					idealHoseiX += totalW;
					realBaseX += totalW;
					setTransform( currentX+realBaseX );
					delay = _ctrl.ff?33:1;
				}
			}
			setTimeout(function(){
				setTransform( tx+realBaseX, time, easingType );
			}, delay);

			currentX = tx;
		}
		var realX;
		function setTransform(tx, time, easingType){
			realX = tx;
			time = time || 0;
			if(has3D) {
				var transition = (time==0)? "none": "all "+time+"ms cubic-bezier("+easingIdx[easingType]+")";
				if(transition!=currentTransition) $mover.css(transitionName, transition);
				currentTransition = transition;
				$mover.css(transformName, "translate3d("+tx+"px, 0px, 0px)");
			} else {
				$mover.animate({"left": tx}, time, easingType);
			}
		}


		/*  enterframe
		 --------------------------------------------------*/
		setInterval(function(){
			if(isDragging) {
				var distMX = mx - preMX;
				if(accelMX*distMX<0) accelMX = 0;
				accelMX *= 0.4;
				accelMX += distMX;
				preMX = mx;
				offsetMX = mx - startMX;
				var tx = sx + offsetMX;
				if(!inifinite) {
					if(tx<minX) tx = minX + (tx-minX)*0.6;
					if(tx>maxX) tx = maxX + (tx-maxX)*0.6;
				}
				moveTo( tx );
			}
		}, 33);


		/*  switchPage
		 --------------------------------------------------*/
		var moving = false;

		function switchPage(page, isByDrag){
			if(!moving){
				moving = (isByDrag)?false:true;

				currentPage = page;
				//start moving
				$switchBtLi.eq(currentPage%colNum).addClass('selected').siblings().removeClass('selected');

				//move
				var tx = page * -colW;
//				moveTo(tx, DURATION_TIME, isByDrag? "easeOutQuart": "swing");
				moveTo(tx, DURATION_TIME, 'easeOutQuart');

				//end moving
				setTimeout(function(){ moving = false; },DURATION_TIME);
			}
		}
		function goNext(){
			var page = currentPage+perPage;
			switchPage(page);
		}
		function goback(){
			var page = currentPage-perPage;
			switchPage(page);
		}


		/*  autoPlay
		 --------------------------------------------------*/
		if (autoPlay) {
			var autoPlayTimer;
			var iSOnmouse = false;

			$switchBtLi.bind('mouseover',function(){
				iSOnmouse = true;
			}).bind('mouseout',function(){
					iSOnmouse = false;
					resetAutoPlay();
				});

			var resetAutoPlay = function(){
				clearTimeout(autoPlayTimer);

				autoPlayTimer = setTimeout(function(){
					if(iSOnmouse)	return;
					else goNext();
				},6000);
			}
		}


		/*  bind drag
		 --------------------------------------------------*/
		var sx = 0;
		var mx = 0;
		var startMX = 0;
		var preMX = 0;
		var accelMX = 0;
		var offsetMX = 0;
		var isMoved;
		var isDragging = false;
		var touchStart = function(e) {
			isDragging = true;
			isMoved = false;
			startMX = preMX = mx = e.originalEvent.touches[0].pageX;
			sx = currentX;
			accelMX = 0;

			$body.bind("touchmove", touchMove);
			$body.bind("touchend", touchEnd);
		}
		var touchMove = function(e) {
			if(e.originalEvent.touches.length > 1) return;// ensure swiping with one touch and not pinching

			mx = e.originalEvent.touches[0].pageX;
			var ox = mx - startMX;

			if(Math.abs(ox)>10) isMoved = true;
			if(isMoved) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
		var touchEnd = function(e) {
			isDragging = false;
			if(isMoved) {
				e.preventDefault();
				e.stopPropagation();
				isMoved = false;
			}

			var page = currentPage;
			var sw = $window.width();
			if( Math.abs(accelMX)>30 ) {
				if(accelMX>0) page-=perPage;
				else page+=perPage;
			} else if( Math.abs(offsetMX) > sw*0.35 ) {
				if(offsetMX>0 && accelMX>0) page-=perPage;
				else if(offsetMX<0 && accelMX<0) page+=perPage;
			}
			switchPage(page, true);

			$body.unbind("touchmove", touchMove);
			$body.unbind("touchend", touchEnd);
		}
		$base.bind("touchstart", touchStart);


		/*  next : back
		 --------------------------------------------------*/
		$btNext.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			goNext();
		})
		$btBack.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			goback();
		})
		if(document.ontouchstart !== undefined) {
			$btNext.bind("touchstart", function(e){
				e.preventDefault();
				e.stopPropagation();
				goNext();
			})
			$btBack.bind("touchstart", function(e){
				e.preventDefault();
				e.stopPropagation();
				goback();
			})
		}


		/*  API
		 --------------------------------------------------*/
		$me.data("flexSwipe-api", { switchPage: switchPage });


		/*  start!!
		 --------------------------------------------------*/
		moveTo(0);
		switchPage(initNum, true);
	})

	return this;
}

/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/

var createJSOK = (function(){
	var ua = navigator.userAgent;
	if(ua.indexOf("MSIE 6")>=0) return false;
	if(ua.indexOf("MSIE 7")>=0) return false;
	if(ua.indexOf("MSIE 8")>=0) return false;
	return true;
})();


if(createJSOK){

this.createjs=this.createjs||{};(function(){var c=function(){throw"UID cannot be instantiated";};c._nextID=0;c.get=function(){return c._nextID++};createjs.UID=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype;c.initialize=function(b){b.addEventListener=a.addEventListener;b.removeEventListener=a.removeEventListener;b.removeAllEventListeners=a.removeAllEventListeners;b.hasEventListener=a.hasEventListener;b.dispatchEvent=a.dispatchEvent};a._listeners=null;a.initialize=function(){};a.addEventListener=function(b,g){var d=this._listeners;d?this.removeEventListener(b,g):d=this._listeners={};var a=d[b];a||(a=d[b]=[]);a.push(g);return g};a.removeEventListener=
function(b,g){var d=this._listeners;if(d){var a=d[b];if(a)for(var c=0,f=a.length;c<f;c++)if(a[c]==g){1==f?delete d[b]:a.splice(c,1);break}}};a.removeAllEventListeners=function(b){b?this._listeners&&delete this._listeners[b]:this._listeners=null};a.dispatchEvent=function(b,g){var d=!1,a=this._listeners;if(b&&a){"string"==typeof b&&(b={type:b});b.target=g||this;a=a[b.type];if(!a)return d;for(var a=a.slice(),c=0,f=a.length;c<f;c++){var h=a[c];h instanceof Function?d=d||h.apply(null,[b]):h.handleEvent&&
(d=d||h.handleEvent(b))}}return!!d};a.hasEventListener=function(b){var g=this._listeners;return!(!g||!g[b])};a.toString=function(){return"[EventDispatcher]"};createjs.EventDispatcher=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Ticker cannot be instantiated.";};c.useRAF=!1;c.addEventListener=null;c.removeEventListener=null;c.removeAllEventListeners=null;c.dispatchEvent=null;c.hasEventListener=null;c._listeners=null;createjs.EventDispatcher.initialize(c);c._listeners=null;c._pauseable=null;c._paused=!1;c._inited=!1;c._startTime=0;c._pausedTime=0;c._ticks=0;c._pausedTicks=0;c._interval=50;c._lastTime=0;c._times=null;c._tickTimes=null;c._rafActive=!1;c._timeoutID=null;c.addListener=function(b,
g){null!=b&&(c.removeListener(b),c._pauseable[c._listeners.length]=null==g?!0:g,c._listeners.push(b))};c.init=function(){c._inited=!0;c._times=[];c._tickTimes=[];c._pauseable=[];c._listeners=[];c._times.push(c._lastTime=c._startTime=c._getTime());c.setInterval(c._interval)};c.removeListener=function(b){var g=c._listeners;g&&(b=g.indexOf(b),-1!=b&&(g.splice(b,1),c._pauseable.splice(b,1)))};c.removeAllListeners=function(){c._listeners=[];c._pauseable=[]};c.setInterval=function(b){c._interval=b;c._inited&&
c._setupTick()};c.getInterval=function(){return c._interval};c.setFPS=function(b){c.setInterval(1E3/b)};c.getFPS=function(){return 1E3/c._interval};c.getMeasuredFPS=function(b){if(2>c._times.length)return-1;null==b&&(b=c.getFPS()|0);b=Math.min(c._times.length-1,b);return 1E3/((c._times[0]-c._times[b])/b)};c.setPaused=function(b){c._paused=b};c.getPaused=function(){return c._paused};c.getTime=function(b){return c._getTime()-c._startTime-(b?c._pausedTime:0)};c.getTicks=function(b){return c._ticks-(b?
c._pausedTicks:0)};c._handleAF=function(){c._rafActive=!1;c._setupTick();c._getTime()-c._lastTime>=0.97*(c._interval-1)&&c._tick()};c._handleTimeout=function(){c.timeoutID=null;c._setupTick();c._tick()};c._setupTick=function(){if(!(c._rafActive||null!=c.timeoutID)){if(c.useRAF){var b=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(b){b(c._handleAF);c._rafActive=!0;return}}c.timeoutID=
setTimeout(c._handleTimeout,c._interval)}};c._tick=function(){var b=c._getTime();c._ticks++;var g=b-c._lastTime,d=c._paused;d&&(c._pausedTicks++,c._pausedTime+=g);c._lastTime=b;for(var a=c._pauseable,e=c._listeners.slice(),f=e?e.length:0,h=0;h<f;h++){var k=e[h];null==k||d&&a[h]||(k.tick?k.tick(g,d):k instanceof Function&&k(g,d))}c.dispatchEvent({type:"tick",paused:d,delta:g,time:b,runTime:b-c._pausedTime});for(c._tickTimes.unshift(c._getTime()-b);100<c._tickTimes.length;)c._tickTimes.pop();for(c._times.unshift(b);100<
c._times.length;)c._times.pop()};var a=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);c._getTime=function(){return a&&a.call(performance)||(new Date).getTime()};c.init();createjs.Ticker=c})();this.createjs=this.createjs||{};
(function(){var c=function(b,g,d,a,c,f,h,k,m){this.initialize(b,g,d,a,c,f,h,k,m)},a=c.prototype;a.stageX=0;a.stageY=0;a.rawX=0;a.rawY=0;a.type=null;a.nativeEvent=null;a.onMouseMove=null;a.onMouseUp=null;a.target=null;a.pointerID=0;a.primary=!1;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.initialize=function(b,g,d,a,c,f,h,k,m){this.type=b;this.stageX=g;this.stageY=
d;this.target=a;this.nativeEvent=c;this.pointerID=f;this.primary=h;this.rawX=null==k?g:k;this.rawY=null==m?d:m};a.clone=function(){return new c(this.type,this.stageX,this.stageY,this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)};a.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"};createjs.MouseEvent=c})();this.createjs=this.createjs||{};
(function(){var c=function(b,g,d,a,c,f){this.initialize(b,g,d,a,c,f)},a=c.prototype;c.identity=null;c.DEG_TO_RAD=Math.PI/180;a.a=1;a.b=0;a.c=0;a.d=1;a.tx=0;a.ty=0;a.alpha=1;a.shadow=null;a.compositeOperation=null;a.initialize=function(b,g,d,a,c,f){null!=b&&(this.a=b);this.b=g||0;this.c=d||0;null!=a&&(this.d=a);this.tx=c||0;this.ty=f||0;return this};a.prepend=function(b,g,d,a,c,f){var h=this.tx;if(1!=b||0!=g||0!=d||1!=a){var k=this.a,m=this.c;this.a=k*b+this.b*d;this.b=k*g+this.b*a;this.c=m*b+this.d*
d;this.d=m*g+this.d*a}this.tx=h*b+this.ty*d+c;this.ty=h*g+this.ty*a+f;return this};a.append=function(b,g,d,a,c,f){var h=this.a,k=this.b,m=this.c,p=this.d;this.a=b*h+g*m;this.b=b*k+g*p;this.c=d*h+a*m;this.d=d*k+a*p;this.tx=c*h+f*m+this.tx;this.ty=c*k+f*p+this.ty;return this};a.prependMatrix=function(b){this.prepend(b.a,b.b,b.c,b.d,b.tx,b.ty);this.prependProperties(b.alpha,b.shadow,b.compositeOperation);return this};a.appendMatrix=function(b){this.append(b.a,b.b,b.c,b.d,b.tx,b.ty);this.appendProperties(b.alpha,
b.shadow,b.compositeOperation);return this};a.prependTransform=function(b,g,d,a,e,f,h,k,m){if(e%360){var p=e*c.DEG_TO_RAD;e=Math.cos(p);p=Math.sin(p)}else e=1,p=0;if(k||m)this.tx-=k,this.ty-=m;f||h?(f*=c.DEG_TO_RAD,h*=c.DEG_TO_RAD,this.prepend(e*d,p*d,-p*a,e*a,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(f),Math.cos(f),b,g)):this.prepend(e*d,p*d,-p*a,e*a,b,g);return this};a.appendTransform=function(b,g,d,a,e,f,h,k,m){if(e%360){var p=e*c.DEG_TO_RAD;e=Math.cos(p);p=Math.sin(p)}else e=1,p=0;f||
h?(f*=c.DEG_TO_RAD,h*=c.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(f),Math.cos(f),b,g),this.append(e*d,p*d,-p*a,e*a,0,0)):this.append(e*d,p*d,-p*a,e*a,b,g);if(k||m)this.tx-=k*this.a+m*this.c,this.ty-=k*this.b+m*this.d;return this};a.rotate=function(b){var g=Math.cos(b);b=Math.sin(b);var d=this.a,a=this.c,c=this.tx;this.a=d*g-this.b*b;this.b=d*b+this.b*g;this.c=a*g-this.d*b;this.d=a*b+this.d*g;this.tx=c*g-this.ty*b;this.ty=c*b+this.ty*g;return this};a.skew=function(b,g){b*=c.DEG_TO_RAD;
g*=c.DEG_TO_RAD;this.append(Math.cos(g),Math.sin(g),-Math.sin(b),Math.cos(b),0,0);return this};a.scale=function(b,g){this.a*=b;this.d*=g;this.tx*=b;this.ty*=g;return this};a.translate=function(b,g){this.tx+=b;this.ty+=g;return this};a.identity=function(){this.alpha=this.a=this.d=1;this.b=this.c=this.tx=this.ty=0;this.shadow=this.compositeOperation=null;return this};a.invert=function(){var b=this.a,g=this.b,d=this.c,a=this.d,c=this.tx,f=b*a-g*d;this.a=a/f;this.b=-g/f;this.c=-d/f;this.d=b/f;this.tx=
(d*this.ty-a*c)/f;this.ty=-(b*this.ty-g*c)/f;return this};a.isIdentity=function(){return 0==this.tx&&0==this.ty&&1==this.a&&0==this.b&&0==this.c&&1==this.d};a.decompose=function(b){null==b&&(b={});b.x=this.tx;b.y=this.ty;b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b);b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var g=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a);g==d?(b.rotation=d/c.DEG_TO_RAD,0>this.a&&0<=this.d&&(b.rotation+=0>=b.rotation?180:-180),b.skewX=b.skewY=0):(b.skewX=g/c.DEG_TO_RAD,
b.skewY=d/c.DEG_TO_RAD);return b};a.reinitialize=function(b,g,d,a,c,f,h,k,m){this.initialize(b,g,d,a,c,f);this.alpha=h||1;this.shadow=k;this.compositeOperation=m;return this};a.appendProperties=function(b,g,d){this.alpha*=b;this.shadow=g||this.shadow;this.compositeOperation=d||this.compositeOperation;return this};a.prependProperties=function(b,g,d){this.alpha*=b;this.shadow=this.shadow||g;this.compositeOperation=this.compositeOperation||d;return this};a.clone=function(){var b=new c(this.a,this.b,
this.c,this.d,this.tx,this.ty);b.shadow=this.shadow;b.alpha=this.alpha;b.compositeOperation=this.compositeOperation;return b};a.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"};c.identity=new c(1,0,0,1,0,0);createjs.Matrix2D=c})();this.createjs=this.createjs||{};(function(){var c=function(b,g){this.initialize(b,g)},a=c.prototype;a.x=0;a.y=0;a.initialize=function(b,g){this.x=null==b?0:b;this.y=null==g?0:g};a.clone=function(){return new c(this.x,this.y)};a.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"};createjs.Point=c})();this.createjs=this.createjs||{};(function(){var c=function(b,g,d,a){this.initialize(b,g,d,a)},a=c.prototype;a.x=0;a.y=0;a.width=0;a.height=0;a.initialize=function(b,g,d,a){this.x=null==b?0:b;this.y=null==g?0:g;this.width=null==d?0:d;this.height=null==a?0:a};a.clone=function(){return new c(this.x,this.y,this.width,this.height)};a.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"};createjs.Rectangle=c})();this.createjs=this.createjs||{};
(function(){var c=function(b,g,d,a,c,f,h){this.initialize(b,g,d,a,c,f,h)},a=c.prototype;a.target=null;a.overLabel=null;a.outLabel=null;a.downLabel=null;a.play=!1;a._isPressed=!1;a._isOver=!1;a.initialize=function(b,g,d,a,c,f,h){b.addEventListener&&(this.target=b,b.cursor="pointer",this.overLabel=null==d?"over":d,this.outLabel=null==g?"out":g,this.downLabel=null==a?"down":a,this.play=c,this.setEnabled(!0),this.handleEvent({}),f&&(h&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(h)),b.hitArea=f))};
a.setEnabled=function(b){var g=this.target;b?(g.addEventListener("mouseover",this),g.addEventListener("mouseout",this),g.addEventListener("mousedown",this)):(g.removeEventListener("mouseover",this),g.removeEventListener("mouseout",this),g.removeEventListener("mousedown",this))};a.toString=function(){return"[ButtonHelper]"};a.handleEvent=function(b){var g=this.target,d=b.type;"mousedown"==d?(b.addEventListener("mouseup",this),this._isPressed=!0,b=this.downLabel):"mouseup"==d?(this._isPressed=!1,b=
this._isOver?this.overLabel:this.outLabel):"mouseover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel);this.play?g.gotoAndPlay&&g.gotoAndPlay(b):g.gotoAndStop&&g.gotoAndStop(b)};createjs.ButtonHelper=c})();this.createjs=this.createjs||{};(function(){var c=function(b,g,d,a){this.initialize(b,g,d,a)},a=c.prototype;c.identity=null;a.color=null;a.offsetX=0;a.offsetY=0;a.blur=0;a.initialize=function(b,g,d,a){this.color=b;this.offsetX=g;this.offsetY=d;this.blur=a};a.toString=function(){return"[Shadow]"};a.clone=function(){return new c(this.color,this.offsetX,this.offsetY,this.blur)};c.identity=new c("transparent",0,0,0);createjs.Shadow=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype;a.complete=!0;a.onComplete=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a._animations=null;a._frames=null;a._images=null;a._data=null;a._loadCount=0;a._frameHeight=0;a._frameWidth=0;a._numFrames=0;a._regX=0;a._regY=0;a.initialize=function(b){var g,d,a;if(null!=b){if(b.images&&0<(d=b.images.length)){a=
this._images=[];for(g=0;g<d;g++){var c=b.images[g];if("string"==typeof c){var f=c,c=new Image;c.src=f}a.push(c);!c.getContext&&!c.complete&&(this._loadCount++,this.complete=!1,function(b){c.onload=function(){b._handleImageLoad()}}(this))}}if(null!=b.frames)if(b.frames instanceof Array){this._frames=[];a=b.frames;g=0;for(d=a.length;g<d;g++)f=a[g],this._frames.push({image:this._images[f[4]?f[4]:0],rect:new createjs.Rectangle(f[0],f[1],f[2],f[3]),regX:f[5]||0,regY:f[6]||0})}else d=b.frames,this._frameWidth=
d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(null!=(d=b.animations)){this._animations=[];this._data={};for(var h in d){b={name:h};f=d[h];if("number"==typeof f)a=b.frames=[f];else if(f instanceof Array)if(1==f.length)b.frames=[f[0]];else{b.frequency=f[3];b.next=f[2];a=b.frames=[];for(g=f[0];g<=f[1];g++)a.push(g)}else b.frequency=f.frequency,b.next=f.next,g=f.frames,a=b.frames="number"==typeof g?[g]:
g.slice(0);b.next=2>a.length||!1==b.next?null:null==b.next||!0==b.next?h:b.next;b.frequency||(b.frequency=1);this._animations.push(h);this._data[h]=b}}}};a.getNumFrames=function(b){if(null==b)return this._frames?this._frames.length:this._numFrames;b=this._data[b];return null==b?0:b.frames.length};a.getAnimations=function(){return this._animations.slice(0)};a.getAnimation=function(b){return this._data[b]};a.getFrame=function(b){var g;return this.complete&&this._frames&&(g=this._frames[b])?g:null};
a.getFrameBounds=function(b){return(b=this.getFrame(b))?new createjs.Rectangle(-b.regX,-b.regY,b.rect.width,b.rect.height):null};a.toString=function(){return"[SpriteSheet]"};a.clone=function(){var b=new c;b.complete=this.complete;b._animations=this._animations;b._frames=this._frames;b._images=this._images;b._data=this._data;b._frameHeight=this._frameHeight;b._frameWidth=this._frameWidth;b._numFrames=this._numFrames;b._loadCount=this._loadCount;return b};a._handleImageLoad=function(){0==--this._loadCount&&
(this._calculateFrames(),this.complete=!0,this.onComplete&&this.onComplete(),this.dispatchEvent("complete"))};a._calculateFrames=function(){if(!(this._frames||0==this._frameWidth)){this._frames=[];for(var b=0,g=this._frameWidth,d=this._frameHeight,a=0,c=this._images;a<c.length;a++){for(var f=c[a],h=(f.width+1)/g|0,k=(f.height+1)/d|0,k=0<this._numFrames?Math.min(this._numFrames-b,h*k):h*k,m=0;m<k;m++)this._frames.push({image:f,rect:new createjs.Rectangle(m%h*g,(m/h|0)*d,g,d),regX:this._regX,regY:this._regY});
b+=k}this._numFrames=b}};createjs.SpriteSheet=c})();this.createjs=this.createjs||{};
(function(){function c(b,d,a){this.f=b;this.params=d;this.path=null==a?!0:a}c.prototype.exec=function(b){this.f.apply(b,this.params)};var a=function(){this.initialize()},b=a.prototype;a.getRGB=function(b,d,a,c){null!=b&&null==a&&(c=d,a=b&255,d=b>>8&255,b=b>>16&255);return null==c?"rgb("+b+","+d+","+a+")":"rgba("+b+","+d+","+a+","+c+")"};a.getHSL=function(b,d,a,c){return null==c?"hsl("+b%360+","+d+"%,"+a+"%)":"hsla("+b%360+","+d+"%,"+a+"%,"+c+")"};a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,
K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,"0":52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};a.STROKE_CAPS_MAP=["butt","round","square"];a.STROKE_JOINTS_MAP=["miter","round","bevel"];a._ctx=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");a.beginCmd=new c(a._ctx.beginPath,
[],!1);a.fillCmd=new c(a._ctx.fill,[],!1);a.strokeCmd=new c(a._ctx.stroke,[],!1);b._strokeInstructions=null;b._strokeStyleInstructions=null;b._ignoreScaleStroke=!1;b._fillInstructions=null;b._instructions=null;b._oldInstructions=null;b._activeInstructions=null;b._active=!1;b._dirty=!1;b.initialize=function(){this.clear();this._ctx=a._ctx};b.isEmpty=function(){return!(this._instructions.length||this._oldInstructions.length||this._activeInstructions.length)};b.draw=function(b){this._dirty&&this._updateInstructions();
for(var d=this._instructions,a=0,c=d.length;a<c;a++)d[a].exec(b)};b.drawAsPath=function(b){this._dirty&&this._updateInstructions();for(var d,a=this._instructions,c=0,f=a.length;c<f;c++)((d=a[c]).path||0==c)&&d.exec(b)};b.moveTo=function(b,d){this._activeInstructions.push(new c(this._ctx.moveTo,[b,d]));return this};b.lineTo=function(b,d){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.lineTo,[b,d]));return this};b.arcTo=function(b,d,a,e,f){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.arcTo,
[b,d,a,e,f]));return this};b.arc=function(b,d,a,e,f,h){this._dirty=this._active=!0;null==h&&(h=!1);this._activeInstructions.push(new c(this._ctx.arc,[b,d,a,e,f,h]));return this};b.quadraticCurveTo=function(b,d,a,e){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.quadraticCurveTo,[b,d,a,e]));return this};b.bezierCurveTo=function(b,d,a,e,f,h){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.bezierCurveTo,[b,d,a,e,f,h]));return this};b.rect=function(b,
d,a,e){this._dirty=this._active=!0;this._activeInstructions.push(new c(this._ctx.rect,[b,d,a,e]));return this};b.closePath=function(){this._active&&(this._dirty=!0,this._activeInstructions.push(new c(this._ctx.closePath,[])));return this};b.clear=function(){this._instructions=[];this._oldInstructions=[];this._activeInstructions=[];this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=null;this._active=this._dirty=!1;return this};b.beginFill=function(b){this._active&&this._newPath();
this._fillInstructions=b?[new c(this._setProp,["fillStyle",b],!1),a.fillCmd]:null;return this};b.beginLinearGradientFill=function(b,d,j,e,f,h){this._active&&this._newPath();j=this._ctx.createLinearGradient(j,e,f,h);e=0;for(f=b.length;e<f;e++)j.addColorStop(d[e],b[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",j],!1),a.fillCmd];return this};b.beginRadialGradientFill=function(b,d,j,e,f,h,k,m){this._active&&this._newPath();j=this._ctx.createRadialGradient(j,e,f,h,k,m);e=0;for(f=b.length;e<
f;e++)j.addColorStop(d[e],b[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",j],!1),a.fillCmd];return this};b.beginBitmapFill=function(b,d,j){this._active&&this._newPath();b=this._ctx.createPattern(b,d||"");b=new c(this._setProp,["fillStyle",b],!1);this._fillInstructions=j?[b,new c(this._ctx.save,[],!1),new c(this._ctx.transform,[j.a,j.b,j.c,j.d,j.tx,j.ty],!1),a.fillCmd,new c(this._ctx.restore,[],!1)]:[b,a.fillCmd];return this};b.endFill=function(){return this.beginFill()};b.setStrokeStyle=
function(b,d,j,e,f){this._active&&this._newPath();this._strokeStyleInstructions=[new c(this._setProp,["lineWidth",null==b?"1":b],!1),new c(this._setProp,["lineCap",null==d?"butt":isNaN(d)?d:a.STROKE_CAPS_MAP[d]],!1),new c(this._setProp,["lineJoin",null==j?"miter":isNaN(j)?j:a.STROKE_JOINTS_MAP[j]],!1),new c(this._setProp,["miterLimit",null==e?"10":e],!1)];this._ignoreScaleStroke=f;return this};b.beginStroke=function(b){this._active&&this._newPath();this._strokeInstructions=b?[new c(this._setProp,
["strokeStyle",b],!1)]:null;return this};b.beginLinearGradientStroke=function(b,d,a,e,f,h){this._active&&this._newPath();a=this._ctx.createLinearGradient(a,e,f,h);e=0;for(f=b.length;e<f;e++)a.addColorStop(d[e],b[e]);this._strokeInstructions=[new c(this._setProp,["strokeStyle",a],!1)];return this};b.beginRadialGradientStroke=function(b,d,a,e,f,h,k,m){this._active&&this._newPath();a=this._ctx.createRadialGradient(a,e,f,h,k,m);e=0;for(f=b.length;e<f;e++)a.addColorStop(d[e],b[e]);this._strokeInstructions=
[new c(this._setProp,["strokeStyle",a],!1)];return this};b.beginBitmapStroke=function(b,d){this._active&&this._newPath();var a=this._ctx.createPattern(b,d||"");this._strokeInstructions=[new c(this._setProp,["strokeStyle",a],!1)];return this};b.endStroke=function(){this.beginStroke();return this};b.curveTo=b.quadraticCurveTo;b.drawRect=b.rect;b.drawRoundRect=function(b,d,a,c,f){this.drawRoundRectComplex(b,d,a,c,f,f,f,f);return this};b.drawRoundRectComplex=function(b,d,a,e,f,h,k,m){var p=(a<e?a:e)/
2,q=0,s=0,t=0,u=0;0>f&&(f*=q=-1);f>p&&(f=p);0>h&&(h*=s=-1);h>p&&(h=p);0>k&&(k*=t=-1);k>p&&(k=p);0>m&&(m*=u=-1);m>p&&(m=p);this._dirty=this._active=!0;var p=this._ctx.arcTo,r=this._ctx.lineTo;this._activeInstructions.push(new c(this._ctx.moveTo,[b+a-h,d]),new c(p,[b+a+h*s,d-h*s,b+a,d+h,h]),new c(r,[b+a,d+e-k]),new c(p,[b+a+k*t,d+e+k*t,b+a-k,d+e,k]),new c(r,[b+m,d+e]),new c(p,[b-m*u,d+e+m*u,b,d+e-m,m]),new c(r,[b,d+f]),new c(p,[b-f*q,d-f*q,b+f,d,f]),new c(this._ctx.closePath));return this};b.drawCircle=
function(b,d,a){this.arc(b,d,a,0,2*Math.PI);return this};b.drawEllipse=function(b,d,a,e){this._dirty=this._active=!0;var f=0.5522848*(a/2),h=0.5522848*(e/2),k=b+a,m=d+e;a=b+a/2;e=d+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[b,e]),new c(this._ctx.bezierCurveTo,[b,e-h,a-f,d,a,d]),new c(this._ctx.bezierCurveTo,[a+f,d,k,e-h,k,e]),new c(this._ctx.bezierCurveTo,[k,e+h,a+f,m,a,m]),new c(this._ctx.bezierCurveTo,[a-f,m,b,e+h,b,e]));return this};b.drawPolyStar=function(b,d,a,e,f,h){this._dirty=
this._active=!0;null==f&&(f=0);f=1-f;h=null==h?0:h/(180/Math.PI);var k=Math.PI/e;this._activeInstructions.push(new c(this._ctx.moveTo,[b+Math.cos(h)*a,d+Math.sin(h)*a]));for(var m=0;m<e;m++)h+=k,1!=f&&this._activeInstructions.push(new c(this._ctx.lineTo,[b+Math.cos(h)*a*f,d+Math.sin(h)*a*f])),h+=k,this._activeInstructions.push(new c(this._ctx.lineTo,[b+Math.cos(h)*a,d+Math.sin(h)*a]));return this};b.decodePath=function(b){for(var d=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,
this.closePath],c=[2,2,4,6,0],e=0,f=b.length,h=[],k=0,m=0,p=a.BASE_64;e<f;){var q=b.charAt(e),s=p[q],t=s>>3,u=d[t];if(!u||s&3)throw"bad path data (@"+e+"): "+q;q=c[t];t||(k=m=0);h.length=0;e++;s=(s>>2&1)+2;for(t=0;t<q;t++){var r=p[b.charAt(e)],v=r>>5?-1:1,r=(r&31)<<6|p[b.charAt(e+1)];3==s&&(r=r<<6|p[b.charAt(e+2)]);r=v*r/10;t%2?k=r+=k:m=r+=m;h[t]=r;e+=s}u.apply(this,h)}return this};b.clone=function(){var b=new a;b._instructions=this._instructions.slice();b._activeInstructions=this._activeInstructions.slice();
b._oldInstructions=this._oldInstructions.slice();this._fillInstructions&&(b._fillInstructions=this._fillInstructions.slice());this._strokeInstructions&&(b._strokeInstructions=this._strokeInstructions.slice());this._strokeStyleInstructions&&(b._strokeStyleInstructions=this._strokeStyleInstructions.slice());b._active=this._active;b._dirty=this._dirty;return b};b.toString=function(){return"[Graphics]"};b.mt=b.moveTo;b.lt=b.lineTo;b.at=b.arcTo;b.bt=b.bezierCurveTo;b.qt=b.quadraticCurveTo;b.a=b.arc;b.r=
b.rect;b.cp=b.closePath;b.c=b.clear;b.f=b.beginFill;b.lf=b.beginLinearGradientFill;b.rf=b.beginRadialGradientFill;b.bf=b.beginBitmapFill;b.ef=b.endFill;b.ss=b.setStrokeStyle;b.s=b.beginStroke;b.ls=b.beginLinearGradientStroke;b.rs=b.beginRadialGradientStroke;b.bs=b.beginBitmapStroke;b.es=b.endStroke;b.dr=b.drawRect;b.rr=b.drawRoundRect;b.rc=b.drawRoundRectComplex;b.dc=b.drawCircle;b.de=b.drawEllipse;b.dp=b.drawPolyStar;b.p=b.decodePath;b._updateInstructions=function(){this._instructions=this._oldInstructions.slice();
this._instructions.push(a.beginCmd);this._instructions.push.apply(this._instructions,this._activeInstructions);this._fillInstructions&&this._instructions.push.apply(this._instructions,this._fillInstructions);this._strokeInstructions&&(this._strokeStyleInstructions&&this._instructions.push.apply(this._instructions,this._strokeStyleInstructions),this._instructions.push.apply(this._instructions,this._strokeInstructions),this._ignoreScaleStroke?this._instructions.push(new c(this._ctx.save,[],!1),new c(this._ctx.setTransform,
[1,0,0,1,0,0],!1),a.strokeCmd,new c(this._ctx.restore,[],!1)):this._instructions.push(a.strokeCmd))};b._newPath=function(){this._dirty&&this._updateInstructions();this._oldInstructions=this._instructions;this._activeInstructions=[];this._active=this._dirty=!1};b._setProp=function(b,a){this[b]=a};createjs.Graphics=a})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype;c.suppressCrossDomainErrors=!1;c._hitTestCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._hitTestCanvas.width=c._hitTestCanvas.height=1;c._hitTestContext=c._hitTestCanvas.getContext("2d");c._nextCacheID=1;a.alpha=1;a.cacheCanvas=null;a.id=-1;a.mouseEnabled=!0;a.name=null;a.parent=null;a.regX=0;a.regY=0;a.rotation=0;a.scaleX=1;a.scaleY=1;a.skewX=0;a.skewY=0;a.shadow=null;a.visible=!0;a.x=0;a.y=0;a.compositeOperation=
null;a.snapToPixel=!1;a.onPress=null;a.onClick=null;a.onDoubleClick=null;a.onMouseOver=null;a.onMouseOut=null;a.onTick=null;a.filters=null;a.cacheID=0;a.mask=null;a.hitArea=null;a.cursor=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a._cacheOffsetX=0;a._cacheOffsetY=0;a._cacheScale=1;a._cacheDataURLID=0;a._cacheDataURL=null;a._matrix=null;a.initialize=function(){this.id=
createjs.UID.get();this._matrix=new createjs.Matrix2D};a.isVisible=function(){return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY))};a.draw=function(b,a){var d=this.cacheCanvas;if(a||!d)return!1;var c=this._cacheScale;b.drawImage(d,this._cacheOffsetX,this._cacheOffsetY,d.width/c,d.height/c);return!0};a.updateContext=function(b){var a,d=this.mask;d&&(d.graphics&&!d.graphics.isEmpty())&&(a=d.getMatrix(d._matrix),b.transform(a.a,a.b,a.c,a.d,a.tx,a.ty),d.graphics.drawAsPath(b),b.clip(),
a.invert(),b.transform(a.a,a.b,a.c,a.d,a.tx,a.ty));a=this._matrix.identity().appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY);createjs.Stage._snapToPixelEnabled&&this.snapToPixel?b.transform(a.a,a.b,a.c,a.d,a.tx+0.5|0,a.ty+0.5|0):b.transform(a.a,a.b,a.c,a.d,a.tx,a.ty);b.globalAlpha*=this.alpha;this.compositeOperation&&(b.globalCompositeOperation=this.compositeOperation);this.shadow&&this._applyShadow(b,this.shadow)};a.cache=function(b,
a,d,c,e){e=e||1;this.cacheCanvas||(this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));this.cacheCanvas.width=Math.ceil(d*e);this.cacheCanvas.height=Math.ceil(c*e);this._cacheOffsetX=b;this._cacheOffsetY=a;this._cacheScale=e||1;this.updateCache()};a.updateCache=function(b){var a=this.cacheCanvas,d=this._cacheScale,j=this._cacheOffsetX*d,e=this._cacheOffsetY*d;if(!a)throw"cache() must be called before updateCache()";var f=a.getContext("2d");f.save();b||
f.clearRect(0,0,a.width,a.height);f.globalCompositeOperation=b;f.setTransform(d,0,0,d,-j,-e);this.draw(f,!0);this._applyFilters();f.restore();this.cacheID=c._nextCacheID++};a.uncache=function(){this._cacheDataURL=this.cacheCanvas=null;this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0;this._cacheScale=1};a.getCacheDataURL=function(){if(!this.cacheCanvas)return null;this.cacheID!=this._cacheDataURLID&&(this._cacheDataURL=this.cacheCanvas.toDataURL());return this._cacheDataURL};a.getStage=function(){for(var b=
this;b.parent;)b=b.parent;return b instanceof createjs.Stage?b:null};a.localToGlobal=function(b,a){var d=this.getConcatenatedMatrix(this._matrix);if(null==d)return null;d.append(1,0,0,1,b,a);return new createjs.Point(d.tx,d.ty)};a.globalToLocal=function(b,a){var d=this.getConcatenatedMatrix(this._matrix);if(null==d)return null;d.invert();d.append(1,0,0,1,b,a);return new createjs.Point(d.tx,d.ty)};a.localToLocal=function(b,a,d){b=this.localToGlobal(b,a);return d.globalToLocal(b.x,b.y)};a.setTransform=
function(b,a,d,c,e,f,h,k,m){this.x=b||0;this.y=a||0;this.scaleX=null==d?1:d;this.scaleY=null==c?1:c;this.rotation=e||0;this.skewX=f||0;this.skewY=h||0;this.regX=k||0;this.regY=m||0;return this};a.getMatrix=function(b){return(b?b.identity():new createjs.Matrix2D).appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY).appendProperties(this.alpha,this.shadow,this.compositeOperation)};a.getConcatenatedMatrix=function(b){b?b.identity():b=new createjs.Matrix2D;
for(var a=this;null!=a;)b.prependTransform(a.x,a.y,a.scaleX,a.scaleY,a.rotation,a.skewX,a.skewY,a.regX,a.regY).prependProperties(a.alpha,a.shadow,a.compositeOperation),a=a.parent;return b};a.hitTest=function(b,a){var d=c._hitTestContext,j=c._hitTestCanvas;d.setTransform(1,0,0,1,-b,-a);this.draw(d);d=this._testHit(d);j.width=0;j.width=1;return d};a.set=function(b){for(var a in b)this[a]=b[a];return this};a.clone=function(){var b=new c;this.cloneProps(b);return b};a.toString=function(){return"[DisplayObject (name="+
this.name+")]"};a.cloneProps=function(b){b.alpha=this.alpha;b.name=this.name;b.regX=this.regX;b.regY=this.regY;b.rotation=this.rotation;b.scaleX=this.scaleX;b.scaleY=this.scaleY;b.shadow=this.shadow;b.skewX=this.skewX;b.skewY=this.skewY;b.visible=this.visible;b.x=this.x;b.y=this.y;b.mouseEnabled=this.mouseEnabled;b.compositeOperation=this.compositeOperation;this.cacheCanvas&&(b.cacheCanvas=this.cacheCanvas.cloneNode(!0),b.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0,
0,this.cacheCanvas.width,this.cacheCanvas.height),0,0))};a._applyShadow=function(b,a){a=a||Shadow.identity;b.shadowColor=a.color;b.shadowOffsetX=a.offsetX;b.shadowOffsetY=a.offsetY;b.shadowBlur=a.blur};a._tick=function(b){this.onTick&&this.onTick.apply(this,b);var a=this._listeners;a&&a.tick&&this.dispatchEvent({type:"tick",params:b})};a._testHit=function(b){try{var a=1<b.getImageData(0,0,1,1).data[3]}catch(d){if(!c.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
}return a};a._applyFilters=function(){if(this.filters&&0!=this.filters.length&&this.cacheCanvas)for(var b=this.filters.length,a=this.cacheCanvas.getContext("2d"),d=this.cacheCanvas.width,c=this.cacheCanvas.height,e=0;e<b;e++)this.filters[e].applyFilter(a,0,0,d,c)};a._hasMouseHandler=function(b){var a=this._listeners;return!!(b&1&&(this.onPress||this.onClick||this.onDoubleClick||a&&(this.hasEventListener("mousedown")||this.hasEventListener("click")||this.hasEventListener("dblclick")))||b&2&&(this.onMouseOver||
this.onMouseOut||this.cursor||a&&(this.hasEventListener("mouseover")||this.hasEventListener("mouseout"))))};createjs.DisplayObject=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype=new createjs.DisplayObject;a.children=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(){this.DisplayObject_initialize();this.children=[]};a.isVisible=function(){var b=this.cacheCanvas||this.children.length;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&b))};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return!0;for(var d=this.children.slice(0),c=0,e=d.length;c<
e;c++){var f=d[c];f.isVisible()&&(b.save(),f.updateContext(b),f.draw(b),b.restore())}return!0};a.addChild=function(b){if(null==b)return b;var a=arguments.length;if(1<a){for(var d=0;d<a;d++)this.addChild(arguments[d]);return arguments[a-1]}b.parent&&b.parent.removeChild(b);b.parent=this;this.children.push(b);return b};a.addChildAt=function(b,a){var d=arguments.length,c=arguments[d-1];if(0>c||c>this.children.length)return arguments[d-2];if(2<d){for(var e=0;e<d-1;e++)this.addChildAt(arguments[e],c+e);
return arguments[d-2]}b.parent&&b.parent.removeChild(b);b.parent=this;this.children.splice(a,0,b);return b};a.removeChild=function(b){var a=arguments.length;if(1<a){for(var d=!0,c=0;c<a;c++)d=d&&this.removeChild(arguments[c]);return d}return this.removeChildAt(this.children.indexOf(b))};a.removeChildAt=function(b){var a=arguments.length;if(1<a){for(var d=[],c=0;c<a;c++)d[c]=arguments[c];d.sort(function(b,a){return a-b});for(var e=!0,c=0;c<a;c++)e=e&&this.removeChildAt(d[c]);return e}if(0>b||b>this.children.length-
1)return!1;if(a=this.children[b])a.parent=null;this.children.splice(b,1);return!0};a.removeAllChildren=function(){for(var b=this.children;b.length;)b.pop().parent=null};a.getChildAt=function(b){return this.children[b]};a.getChildByName=function(b){for(var a=this.children,d=0,c=a.length;d<c;d++)if(a[d].name==b)return a[d];return null};a.sortChildren=function(b){this.children.sort(b)};a.getChildIndex=function(b){return this.children.indexOf(b)};a.getNumChildren=function(){return this.children.length};
a.swapChildrenAt=function(b,a){var d=this.children,c=d[b],e=d[a];c&&e&&(d[b]=e,d[a]=c)};a.swapChildren=function(b,a){for(var d=this.children,c,e,f=0,h=d.length;f<h&&!(d[f]==b&&(c=f),d[f]==a&&(e=f),null!=c&&null!=e);f++);f!=h&&(d[c]=a,d[e]=b)};a.setChildIndex=function(b,a){var d=this.children,c=d.length;if(!(b.parent!=this||0>a||a>=c)){for(var e=0;e<c&&d[e]!=b;e++);e==c||e==a||(d.splice(e,1),a<e&&a--,d.splice(a,0,b))}};a.contains=function(b){for(;b;){if(b==this)return!0;b=b.parent}return!1};a.hitTest=
function(b,a){return null!=this.getObjectUnderPoint(b,a)};a.getObjectsUnderPoint=function(b,a){var d=[],c=this.localToGlobal(b,a);this._getObjectsUnderPoint(c.x,c.y,d);return d};a.getObjectUnderPoint=function(b,a){var d=this.localToGlobal(b,a);return this._getObjectsUnderPoint(d.x,d.y)};a.clone=function(b){var a=new c;this.cloneProps(a);if(b)for(var d=a.children=[],j=0,e=this.children.length;j<e;j++){var f=this.children[j].clone(b);f.parent=a;d.push(f)}return a};a.toString=function(){return"[Container (name="+
this.name+")]"};a.DisplayObject__tick=a._tick;a._tick=function(b){for(var a=this.children.length-1;0<=a;a--){var d=this.children[a];d._tick&&d._tick(b)}this.DisplayObject__tick(b)};a._getObjectsUnderPoint=function(b,a,d,j){var e=createjs.DisplayObject._hitTestContext,f=createjs.DisplayObject._hitTestCanvas,h=this._matrix,k=this._hasMouseHandler(j);if(!this.hitArea&&(this.cacheCanvas&&k)&&(this.getConcatenatedMatrix(h),e.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-a),e.globalAlpha=h.alpha,this.draw(e),
this._testHit(e)))return f.width=0,f.width=1,this;for(var m=this.children.length-1;0<=m;m--){var p=this.children[m],q=p.hitArea;if(p.visible&&!(!q&&!p.isVisible()||j&&!p.mouseEnabled)){var s=j&&p._hasMouseHandler(j);if(p instanceof c&&(!q||!s))if(k){if(p=p._getObjectsUnderPoint(b,a))return this}else{if(p=p._getObjectsUnderPoint(b,a,d,j),!d&&p)return p}else if(!j||k||s)if(p.getConcatenatedMatrix(h),q&&(h.appendTransform(q.x,q.y,q.scaleX,q.scaleY,q.rotation,q.skewX,q.skewY,q.regX,q.regY),h.alpha=q.alpha),
e.globalAlpha=h.alpha,e.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-a),(q||p).draw(e),this._testHit(e)){f.width=0;f.width=1;if(k)return this;if(d)d.push(p);else return p}}}return null};createjs.Container=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype=new createjs.Container;c._snapToPixelEnabled=!1;a.autoClear=!0;a.canvas=null;a.mouseX=0;a.mouseY=0;a.onMouseMove=null;a.onMouseUp=null;a.onMouseDown=null;a.snapToPixelEnabled=!1;a.mouseInBounds=!1;a.tickOnUpdate=!0;a.mouseMoveOutside=!1;a._pointerData=null;a._pointerCount=0;a._primaryPointerID=null;a._mouseOverIntervalID=null;a.Container_initialize=a.initialize;a.initialize=function(b){this.Container_initialize();this.canvas="string"==
typeof b?document.getElementById(b):b;this._pointerData={};this.enableDOMEvents(!0)};a.update=function(){if(this.canvas){this.autoClear&&this.clear();c._snapToPixelEnabled=this.snapToPixelEnabled;this.tickOnUpdate&&this._tick(arguments.length?arguments:null);var b=this.canvas.getContext("2d");b.save();this.updateContext(b);this.draw(b,!1);b.restore()}};a.tick=a.update;a.handleEvent=function(b){"tick"==b.type&&this.update(b)};a.clear=function(){if(this.canvas){var b=this.canvas.getContext("2d");b.setTransform(1,
0,0,1,0,0);b.clearRect(0,0,this.canvas.width,this.canvas.height)}};a.toDataURL=function(b,a){a||(a="image/png");var d=this.canvas.getContext("2d"),c=this.canvas.width,e=this.canvas.height,f;if(b){f=d.getImageData(0,0,c,e);var h=d.globalCompositeOperation;d.globalCompositeOperation="destination-over";d.fillStyle=b;d.fillRect(0,0,c,e)}var k=this.canvas.toDataURL(a);b&&(d.clearRect(0,0,c,e),d.putImageData(f,0,0),d.globalCompositeOperation=h);return k};a.enableMouseOver=function(b){this._mouseOverIntervalID&&
(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null);if(null==b)b=20;else if(0>=b)return;var a=this;this._mouseOverIntervalID=setInterval(function(){a._testMouseOver()},1E3/Math.min(50,b))};a.enableDOMEvents=function(b){null==b&&(b=!0);var a,d=this._eventListeners;if(!b&&d){for(a in d)b=d[a],b.t.removeEventListener(a,b.f);this._eventListeners=null}else if(b&&!d){b=window.addEventListener?window:document;var c=this,d=this._eventListeners={};d.mouseup={t:b,f:function(b){c._handleMouseUp(b)}};
d.mousemove={t:b,f:function(b){c._handleMouseMove(b)}};d.dblclick={t:b,f:function(b){c._handleDoubleClick(b)}};(b=this.canvas)&&(d.mousedown={t:b,f:function(b){c._handleMouseDown(b)}});for(a in d)b=d[a],b.t.addEventListener(a,b.f)}};a.clone=function(){var b=new c(null);this.cloneProps(b);return b};a.toString=function(){return"[Stage (name="+this.name+")]"};a._getPointerData=function(b){var a=this._pointerData[b];a||(a=this._pointerData[b]={x:0,y:0},null==this._primaryPointerID&&(this._primaryPointerID=
b));return a};a._handleMouseMove=function(b){b||(b=window.event);this._handlePointerMove(-1,b,b.pageX,b.pageY)};a._handlePointerMove=function(b,a,d,c){if(this.canvas){var e=this._getPointerData(b),f=e.inBounds;this._updatePointerPosition(b,d,c);if(f||e.inBounds||this.mouseMoveOutside){if(this.onMouseMove||this.hasEventListener("stagemousemove"))d=new createjs.MouseEvent("stagemousemove",e.x,e.y,this,a,b,b==this._primaryPointerID,e.rawX,e.rawY),this.onMouseMove&&this.onMouseMove(d),this.dispatchEvent(d);
if((c=e.event)&&(c.onMouseMove||c.hasEventListener("mousemove")))d=new createjs.MouseEvent("mousemove",e.x,e.y,c.target,a,b,b==this._primaryPointerID,e.rawX,e.rawY),c.onMouseMove&&c.onMouseMove(d),c.dispatchEvent(d,c.target)}}};a._updatePointerPosition=function(b,a,d){var c=this._getElementRect(this.canvas);a-=c.left;d-=c.top;var e=this.canvas.width,f=this.canvas.height;a/=(c.right-c.left)/e;d/=(c.bottom-c.top)/f;c=this._getPointerData(b);(c.inBounds=0<=a&&0<=d&&a<=e-1&&d<=f-1)?(c.x=a,c.y=d):this.mouseMoveOutside&&
(c.x=0>a?0:a>e-1?e-1:a,c.y=0>d?0:d>f-1?f-1:d);c.rawX=a;c.rawY=d;b==this._primaryPointerID&&(this.mouseX=c.x,this.mouseY=c.y,this.mouseInBounds=c.inBounds)};a._getElementRect=function(b){var a;try{a=b.getBoundingClientRect()}catch(d){a={top:b.offsetTop,left:b.offsetLeft,width:b.offsetWidth,height:b.offsetHeight}}var c=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||
0),f=window.getComputedStyle?getComputedStyle(b):b.currentStyle;b=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth);var h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),k=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),f=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:a.left+c+b,right:a.right+c-k,top:a.top+e+h,bottom:a.bottom+e-f}};a._handleMouseUp=function(b){this._handlePointerUp(-1,b,!1)};a._handlePointerUp=function(b,a,d){var c=this._getPointerData(b),e;if(this.onMouseMove||
this.hasEventListener("stagemouseup"))e=new createjs.MouseEvent("stagemouseup",c.x,c.y,this,a,b,b==this._primaryPointerID,c.rawX,c.rawY),this.onMouseUp&&this.onMouseUp(e),this.dispatchEvent(e);var f=c.event;if(f&&(f.onMouseUp||f.hasEventListener("mouseup")))e=new createjs.MouseEvent("mouseup",c.x,c.y,f.target,a,b,b==this._primaryPointerID,c.rawX,c.rawY),f.onMouseUp&&f.onMouseUp(e),f.dispatchEvent(e,f.target);if((f=c.target)&&(f.onClick||f.hasEventListener("click"))&&this._getObjectsUnderPoint(c.x,
c.y,null,!0,this._mouseOverIntervalID?3:1)==f)e=new createjs.MouseEvent("click",c.x,c.y,f,a,b,b==this._primaryPointerID,c.rawX,c.rawY),f.onClick&&f.onClick(e),f.dispatchEvent(e);d?(b==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[b]):c.event=c.target=null};a._handleMouseDown=function(b){this._handlePointerDown(-1,b,!1)};a._handlePointerDown=function(b,a,d,c){var e=this._getPointerData(b);null!=c&&this._updatePointerPosition(b,d,c);if(this.onMouseDown||this.hasEventListener("stagemousedown"))d=
new createjs.MouseEvent("stagemousedown",e.x,e.y,this,a,b,b==this._primaryPointerID,e.rawX,e.rawY),this.onMouseDown&&this.onMouseDown(d),this.dispatchEvent(d);if(c=this._getObjectsUnderPoint(e.x,e.y,null,this._mouseOverIntervalID?3:1))if(e.target=c,c.onPress||c.hasEventListener("mousedown"))if(d=new createjs.MouseEvent("mousedown",e.x,e.y,c,a,b,b==this._primaryPointerID,e.rawX,e.rawY),c.onPress&&c.onPress(d),c.dispatchEvent(d),d.onMouseMove||d.onMouseUp||d.hasEventListener("mousemove")||d.hasEventListener("mouseup"))e.event=
d};a._testMouseOver=function(){if(-1==this._primaryPointerID&&!(this.mouseX==this._mouseOverX&&this.mouseY==this._mouseOverY&&this.mouseInBounds)){var b=null;this.mouseInBounds&&(b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,3),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var a=this._mouseOverTarget;if(a!=b){var d=this._getPointerData(-1);if(a&&(a.onMouseOut||a.hasEventListener("mouseout"))){var c=new createjs.MouseEvent("mouseout",d.x,d.y,a,null,-1,d.rawX,d.rawY);a.onMouseOut&&
a.onMouseOut(c);a.dispatchEvent(c)}a&&(this.canvas.style.cursor="");if(b&&(b.onMouseOver||b.hasEventListener("mouseover")))c=new createjs.MouseEvent("mouseover",d.x,d.y,b,null,-1,d.rawX,d.rawY),b.onMouseOver&&b.onMouseOver(c),b.dispatchEvent(c);b&&(this.canvas.style.cursor=b.cursor||"");this._mouseOverTarget=b}}};a._handleDoubleClick=function(b){var a=this._getPointerData(-1),d=this._getObjectsUnderPoint(a.x,a.y,null,this._mouseOverIntervalID?3:1);if(d&&(d.onDoubleClick||d.hasEventListener("dblclick")))evt=
new createjs.MouseEvent("dblclick",a.x,a.y,d,b,-1,!0,a.rawX,a.rawY),d.onDoubleClick&&d.onDoubleClick(evt),d.dispatchEvent(evt)};createjs.Stage=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype=new createjs.DisplayObject;a.image=null;a.snapToPixel=!0;a.sourceRect=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){this.DisplayObject_initialize();"string"==typeof b?(this.image=new Image,this.image.src=b):this.image=b};a.isVisible=function(){var b=this.cacheCanvas||this.image&&(this.image.complete||this.image.getContext||2<=this.image.readyState);return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&
b))};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return!0;var d=this.sourceRect;d?b.drawImage(this.image,d.x,d.y,d.width,d.height,0,0,d.width,d.height):b.drawImage(this.image,0,0);return!0};a.clone=function(){var b=new c(this.image);this.sourceRect&&(b.sourceRect=this.sourceRect.clone());this.cloneProps(b);return b};a.toString=function(){return"[Bitmap (name="+this.name+")]"};createjs.Bitmap=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype=new createjs.DisplayObject;a.onAnimationEnd=null;a.currentFrame=-1;a.currentAnimation=null;a.paused=!0;a.spriteSheet=null;a.snapToPixel=!0;a.offset=0;a.currentAnimationFrame=0;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a._advanceCount=0;a._animation=null;a.DisplayObject_initialize=a.initialize;a.initialize=
function(b){this.DisplayObject_initialize();this.spriteSheet=b};a.isVisible=function(){var b=this.cacheCanvas||this.spriteSheet.complete&&0<=this.currentFrame;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&b))};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return!0;this._normalizeFrame();var d=this.spriteSheet.getFrame(this.currentFrame);if(d){var c=d.rect;b.drawImage(d.image,c.x,c.y,c.width,c.height,-d.regX,-d.regY,c.width,c.height);return!0}};
a.play=function(){this.paused=!1};a.stop=function(){this.paused=!0};a.gotoAndPlay=function(b){this.paused=!1;this._goto(b)};a.gotoAndStop=function(b){this.paused=!0;this._goto(b)};a.advance=function(){this._animation?this.currentAnimationFrame++:this.currentFrame++;this._normalizeFrame()};a.getBounds=function(){return this.spriteSheet.getFrameBounds(this.currentFrame)};a.clone=function(){var b=new c(this.spriteSheet);this.cloneProps(b);return b};a.toString=function(){return"[BitmapAnimation (name="+
this.name+")]"};a.DisplayObject__tick=a._tick;a._tick=function(b){var a=this._animation?this._animation.frequency:1;!this.paused&&0==(++this._advanceCount+this.offset)%a&&this.advance();this.DisplayObject__tick(b)};a._normalizeFrame=function(){var b=this._animation,a=this.currentFrame,d=this.paused,c;if(b)if(c=b.frames.length,this.currentAnimationFrame>=c){var e=b.next;this._dispatchAnimationEnd(b,a,d,e,c-1)||(e?this._goto(e):(this.paused=!0,this.currentAnimationFrame=b.frames.length-1,this.currentFrame=
b.frames[this.currentAnimationFrame]))}else this.currentFrame=b.frames[this.currentAnimationFrame];else c=this.spriteSheet.getNumFrames(),a>=c&&!this._dispatchAnimationEnd(b,a,d,c-1)&&(this.currentFrame=0)};a._dispatchAnimationEnd=function(b,a,d,c,e){var f=b?b.name:null;this.onAnimationEnd&&this.onAnimationEnd(this,f,c);this.dispatchEvent({type:"animationend",name:f,next:c});!d&&this.paused&&(this.currentAnimationFrame=e);return this.paused!=d||this._animation!=b||this.currentFrame!=a};a.DisplayObject_cloneProps=
a.cloneProps;a.cloneProps=function(b){this.DisplayObject_cloneProps(b);b.onAnimationEnd=this.onAnimationEnd;b.currentFrame=this.currentFrame;b.currentAnimation=this.currentAnimation;b.paused=this.paused;b.offset=this.offset;b._animation=this._animation;b.currentAnimationFrame=this.currentAnimationFrame};a._goto=function(b){if(isNaN(b)){var a=this.spriteSheet.getAnimation(b);a&&(this.currentAnimationFrame=0,this._animation=a,this.currentAnimation=b,this._normalizeFrame())}else this.currentAnimation=
this._animation=null,this.currentFrame=b};createjs.BitmapAnimation=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype=new createjs.DisplayObject;a.graphics=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){this.DisplayObject_initialize();this.graphics=b?b:new createjs.Graphics};a.isVisible=function(){var b=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&b))};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return!0;this.graphics.draw(b);
return!0};a.clone=function(b){b=new c(b&&this.graphics?this.graphics.clone():this.graphics);this.cloneProps(b);return b};a.toString=function(){return"[Shape (name="+this.name+")]"};createjs.Shape=c})();this.createjs=this.createjs||{};
(function(){var c=function(b,a,d){this.initialize(b,a,d)},a=c.prototype=new createjs.DisplayObject;c._workingContext=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");a.text="";a.font=null;a.color="#000";a.textAlign="left";a.textBaseline="top";a.maxWidth=null;a.outline=!1;a.lineHeight=0;a.lineWidth=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b,a,d){this.DisplayObject_initialize();this.text=b;this.font=a;this.color=d?d:"#000"};
a.isVisible=function(){var b=this.cacheCanvas||null!=this.text&&""!==this.text;return!(!this.visible||!(0<this.alpha&&0!=this.scaleX&&0!=this.scaleY&&b))};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return!0;this.outline?b.strokeStyle=this.color:b.fillStyle=this.color;b.font=this.font;b.textAlign=this.textAlign||"start";b.textBaseline=this.textBaseline||"alphabetic";this._drawText(b);return!0};a.getMeasuredWidth=function(){return this._getWorkingContext().measureText(this.text).width};
a.getMeasuredLineHeight=function(){return 1.2*this._getWorkingContext().measureText("M").width};a.getMeasuredHeight=function(){return this._drawText()*(this.lineHeight||this.getMeasuredLineHeight())};a.clone=function(){var b=new c(this.text,this.font,this.color);this.cloneProps(b);return b};a.toString=function(){return"[Text (text="+(20<this.text.length?this.text.substr(0,17)+"...":this.text)+")]"};a.DisplayObject_cloneProps=a.cloneProps;a.cloneProps=function(b){this.DisplayObject_cloneProps(b);b.textAlign=
this.textAlign;b.textBaseline=this.textBaseline;b.maxWidth=this.maxWidth;b.outline=this.outline;b.lineHeight=this.lineHeight;b.lineWidth=this.lineWidth};a._getWorkingContext=function(){var b=c._workingContext;b.font=this.font;b.textAlign=this.textAlign||"start";b.textBaseline=this.textBaseline||"alphabetic";return b};a._drawText=function(b){var a=!!b;a||(b=this._getWorkingContext());for(var d=String(this.text).split(/(?:\r\n|\r|\n)/),c=this.lineHeight||this.getMeasuredLineHeight(),e=0,f=0,h=d.length;f<
h;f++){var k=b.measureText(d[f]).width;if(null==this.lineWidth||k<this.lineWidth)a&&this._drawTextLine(b,d[f],e*c);else{for(var k=d[f].split(/(\s)/),m=k[0],p=1,q=k.length;p<q;p+=2)b.measureText(m+k[p]+k[p+1]).width>this.lineWidth?(a&&this._drawTextLine(b,m,e*c),e++,m=k[p+1]):m+=k[p]+k[p+1];a&&this._drawTextLine(b,m,e*c)}e++}return e};a._drawTextLine=function(b,a,d){this.outline?b.strokeText(a,0,d,this.maxWidth||65535):b.fillText(a,0,d,this.maxWidth||65535)};createjs.Text=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"SpriteSheetUtils cannot be instantiated";};c._workingCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._workingContext=c._workingCanvas.getContext("2d");c.addFlippedFrames=function(a,b,g,d){if(b||g||d){var j=0;b&&c._flip(a,++j,!0,!1);g&&c._flip(a,++j,!1,!0);d&&c._flip(a,++j,!0,!0)}};c.extractFrame=function(a,b){isNaN(b)&&(b=a.getAnimation(b).frames[0]);var g=a.getFrame(b);if(!g)return null;var d=g.rect,j=c._workingCanvas;j.width=
d.width;j.height=d.height;c._workingContext.drawImage(g.image,d.x,d.y,d.width,d.height,0,0,d.width,d.height);g=new Image;g.src=j.toDataURL("image/png");return g};c.mergeAlpha=function(a,b,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));c.width=Math.max(b.width,a.width);c.height=Math.max(b.height,a.height);var d=c.getContext("2d");d.save();d.drawImage(a,0,0);d.globalCompositeOperation="destination-in";d.drawImage(b,0,0);d.restore();return c};c._flip=function(a,
b,g,d){for(var j=a._images,e=c._workingCanvas,f=c._workingContext,h=j.length/b,k=0;k<h;k++){var m=j[k];m.__tmp=k;e.width=0;e.width=m.width;e.height=m.height;f.setTransform(g?-1:1,0,0,d?-1:1,g?m.width:0,d?m.height:0);f.drawImage(m,0,0);var p=new Image;p.src=e.toDataURL("image/png");p.width=m.width;p.height=m.height;j.push(p)}f=a._frames;e=f.length/b;for(k=0;k<e;k++){var m=f[k],q=m.rect.clone(),p=j[m.image.__tmp+h*b],s={image:p,rect:q,regX:m.regX,regY:m.regY};g&&(q.x=p.width-q.x-q.width,s.regX=q.width-
m.regX);d&&(q.y=p.height-q.y-q.height,s.regY=q.height-m.regY);f.push(s)}g="_"+(g?"h":"")+(d?"v":"");d=a._animations;a=a._data;j=d.length/b;for(k=0;k<j;k++){f=d[k];m=a[f];h={name:f+g,frequency:m.frequency,next:m.next,frames:[]};m.next&&(h.next+=g);f=m.frames;m=0;for(p=f.length;m<p;m++)h.frames.push(f[m]+e*b);a[h.name]=h;d.push(h.name)}};createjs.SpriteSheetUtils=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype;c.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions";c.ERR_RUNNING="a build is already running";a.maxWidth=2048;a.maxHeight=2048;a.spriteSheet=null;a.scale=1;a.padding=1;a.timeSlice=0.3;a.progress=-1;a.onComplete=null;a.onProgress=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a._frames=
null;a._animations=null;a._data=null;a._nextFrameIndex=0;a._index=0;a._timerID=null;a._scale=1;a.initialize=function(){this._frames=[];this._animations={}};a.addFrame=function(b,a,d,j,e,f){if(this._data)throw c.ERR_RUNNING;a=a||b.bounds||b.nominalBounds;!a&&b.getBounds&&(a=b.getBounds());if(!a)return null;d=d||1;return this._frames.push({source:b,sourceRect:a,scale:d,funct:j,params:e,scope:f,index:this._frames.length,height:a.height*d})-1};a.addAnimation=function(b,a,d,j){if(this._data)throw c.ERR_RUNNING;
this._animations[b]={frames:a,next:d,frequency:j}};a.addMovieClip=function(b,a,d){if(this._data)throw c.ERR_RUNNING;var j=b.frameBounds,e=a||b.bounds||b.nominalBounds;!e&&b.getBounds&&(e=b.getBounds());if(!e&&!j)return null;a=this._frames.length;for(var f=b.timeline.duration,h=0;h<f;h++)this.addFrame(b,j&&j[h]?j[h]:e,d,function(b){var a=this.actionsEnabled;this.actionsEnabled=!1;this.gotoAndStop(b);this.actionsEnabled=a},[h],b);h=b.timeline._labels;b=[];for(var k in h)b.push({index:h[k],label:k});
if(b.length){b.sort(function(b,a){return b.index-a.index});h=0;for(k=b.length;h<k;h++){d=b[h].label;for(var j=a+(h==k-1?f:b[h+1].index),e=[],m=a+b[h].index;m<j;m++)e.push(m);this.addAnimation(d,e,!0)}}};a.build=function(){if(this._data)throw c.ERR_RUNNING;for(this._startBuild();this._drawNext(););this._endBuild();return this.spriteSheet};a.buildAsync=function(b){if(this._data)throw c.ERR_RUNNING;this.timeSlice=b;this._startBuild();var a=this;this._timerID=setTimeout(function(){a._run()},50-50*Math.max(0.01,
Math.min(0.99,this.timeSlice||0.3)))};a.stopAsync=function(){clearTimeout(this._timerID);this._data=null};a.clone=function(){throw"SpriteSheetBuilder cannot be cloned.";};a.toString=function(){return"[SpriteSheetBuilder]"};a._startBuild=function(){var b=this.padding||0;this.progress=0;this.spriteSheet=null;this._index=0;this._scale=this.scale;var a=[];this._data={images:[],frames:a,animations:this._animations};var d=this._frames.slice();d.sort(function(b,a){return b.height<=a.height?-1:1});if(d[d.length-
1].height+2*b>this.maxHeight)throw c.ERR_DIMENSIONS;for(var j=0,e=0,f=0;d.length;){var h=this._fillRow(d,j,f,a,b);h.w>e&&(e=h.w);j+=h.h;if(!h.h||!d.length){var k=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");k.width=this._getSize(e,this.maxWidth);k.height=this._getSize(j,this.maxHeight);this._data.images[f]=k;h.h||(e=j=0,f++)}}};a._getSize=function(b,a){for(var d=4;Math.pow(2,++d)<b;);return Math.min(a,Math.pow(2,d))};a._fillRow=function(b,a,d,j,e){var f=this.maxWidth,
h=this.maxHeight;a+=e;for(var h=h-a,k=e,m=0,p=b.length-1;0<=p;p--){var q=b[p],s=this._scale*q.scale,t=q.sourceRect,u=q.source,r=Math.floor(s*t.x-e),v=Math.floor(s*t.y-e),w=Math.ceil(s*t.height+2*e),t=Math.ceil(s*t.width+2*e);if(t>f)throw c.ERR_DIMENSIONS;w>h||k+t>f||(q.img=d,q.rect=new createjs.Rectangle(k,a,t,w),m=m||w,b.splice(p,1),j[q.index]=[k,a,t,w,d,Math.round(-r+s*u.regX-e),Math.round(-v+s*u.regY-e)],k+=t)}return{w:k,h:m}};a._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data);
this._data=null;this.progress=1;this.onComplete&&this.onComplete(this);this.dispatchEvent("complete")};a._run=function(){for(var b=50*Math.max(0.01,Math.min(0.99,this.timeSlice||0.3)),a=(new Date).getTime()+b,d=!1;a>(new Date).getTime();)if(!this._drawNext()){d=!0;break}if(d)this._endBuild();else{var c=this;this._timerID=setTimeout(function(){c._run()},50-b)}b=this.progress=this._index/this._frames.length;this.onProgress&&this.onProgress(this,b);this.dispatchEvent({type:"progress",progress:b})};a._drawNext=
function(){var b=this._frames[this._index],a=b.scale*this._scale,d=b.rect,c=b.sourceRect,e=this._data.images[b.img].getContext("2d");b.funct&&b.funct.apply(b.scope,b.params);e.save();e.beginPath();e.rect(d.x,d.y,d.width,d.height);e.clip();e.translate(Math.ceil(d.x-c.x*a),Math.ceil(d.y-c.y*a));e.scale(a,a);b.source.draw(e);e.restore();return++this._index<this._frames.length};createjs.SpriteSheetBuilder=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.initialize(b)},a=c.prototype=new createjs.DisplayObject;a.htmlElement=null;a._oldMtx=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){"string"==typeof b&&(b=document.getElementById(b));this.DisplayObject_initialize();this.mouseEnabled=!1;this.htmlElement=b;b=b.style;b.position="absolute";b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%"};a.isVisible=function(){return null!=this.htmlElement};
a.draw=function(){if(null!=this.htmlElement){var b=this.getConcatenatedMatrix(this._matrix),a=this.htmlElement.style;if(this.visible)a.visibility="visible";else return!0;var d=this._oldMtx||{};d.alpha!=b.alpha&&(a.opacity=""+b.alpha,d.alpha=b.alpha);if(d.tx!=b.tx||d.ty!=b.ty||d.a!=b.a||d.b!=b.b||d.c!=b.c||d.d!=b.d)a.transform=a.WebkitTransform=a.OTransform=a.msTransform=["matrix("+b.a,b.b,b.c,b.d,b.tx+0.5|0,(b.ty+0.5|0)+")"].join(),a.MozTransform=["matrix("+b.a,b.b,b.c,b.d,(b.tx+0.5|0)+"px",(b.ty+
0.5|0)+"px)"].join(),this._oldMtx=b.clone();return!0}};a.cache=function(){};a.uncache=function(){};a.updateCache=function(){};a.hitTest=function(){};a.localToGlobal=function(){};a.globalToLocal=function(){};a.localToLocal=function(){};a.clone=function(){throw"DOMElement cannot be cloned.";};a.toString=function(){return"[DOMElement (name="+this.name+")]"};a.DisplayObject__tick=a._tick;a._tick=function(b){this.htmlElement.style.visibility="hidden";this.DisplayObject__tick(b)};createjs.DOMElement=c})();this.createjs=this.createjs||{};(function(){var c=function(){this.initialize()},a=c.prototype;a.initialize=function(){};a.getBounds=function(){return new createjs.Rectangle(0,0,0,0)};a.applyFilter=function(){};a.toString=function(){return"[Filter]"};a.clone=function(){return new c};createjs.Filter=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Touch cannot be instantiated";};c.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled};c.enable=function(a,b,g){if(!a||!a.canvas||!c.isSupported())return!1;a.__touch={pointers:{},multitouch:!b,preventDefault:!g,count:0};"ontouchstart"in window?c._IOS_enable(a):window.navigator.msPointerEnabled&&c._IE_enable(a);return!0};c.disable=function(a){a&&("ontouchstart"in window?c._IOS_disable(a):window.navigator.msPointerEnabled&&c._IE_disable(a))};
c._IOS_enable=function(a){var b=a.canvas,g=a.__touch.f=function(b){c._IOS_handleEvent(a,b)};b.addEventListener("touchstart",g,!1);b.addEventListener("touchmove",g,!1);b.addEventListener("touchend",g,!1);b.addEventListener("touchcancel",g,!1)};c._IOS_disable=function(a){var b=a.canvas;b&&(a=a.__touch.f,b.removeEventListener("touchstart",a,!1),b.removeEventListener("touchmove",a,!1),b.removeEventListener("touchend",a,!1),b.removeEventListener("touchcancel",a,!1))};c._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&
b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,j=0,e=c.length;j<e;j++){var f=c[j],h=f.identifier;f.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,f.pageX,f.pageY):"touchmove"==d?this._handleMove(a,h,b,f.pageX,f.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}};c._IE_enable=function(a){var b=a.canvas,g=a.__touch.f=function(b){c._IE_handleEvent(a,b)};b.addEventListener("MSPointerDown",g,!1);window.addEventListener("MSPointerMove",g,!1);window.addEventListener("MSPointerUp",
g,!1);window.addEventListener("MSPointerCancel",g,!1);a.__touch.preventDefault&&(b.style.msTouchAction="none");a.__touch.activeIDs={}};c._IE_disable=function(a){var b=a.__touch.f;window.removeEventListener("MSPointerMove",b,!1);window.removeEventListener("MSPointerUp",b,!1);window.removeEventListener("MSPointerCancel",b,!1);a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)};c._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,
d=b.pointerId,j=a.__touch.activeIDs;if("MSPointerDown"==c)b.srcElement==a.canvas&&(j[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY));else if(j[d])if("MSPointerMove"==c)this._handleMove(a,d,b,b.pageX,b.pageY);else if("MSPointerUp"==c||"MSPointerCancel"==c)delete j[d],this._handleEnd(a,d,b)}};c._handleStart=function(a,b,c,d,j){var e=a.__touch;if(e.multitouch||!e.count){var f=e.pointers;f[b]||(f[b]=!0,e.count++,a._handlePointerDown(b,c,d,j))}};c._handleMove=function(a,b,c,d,j){a.__touch.pointers[b]&&
a._handlePointerMove(b,c,d,j)};c._handleEnd=function(a,b,c){var d=a.__touch,j=d.pointers;j[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete j[b])};createjs.Touch=c})();(function(){var c=this.createjs=this.createjs||{},c=c.EaselJS=c.EaselJS||{};c.version="2013.02.12";c.buildDate="Tue, 12 Feb 2013 21:34:28 GMT"})();this.createjs=this.createjs||{};
(function(){var c=function(b,a,d){this.initialize(b,a,d)},a=c.prototype;c.NONE=0;c.LOOP=1;c.REVERSE=2;c.IGNORE={};c._tweens=[];c._plugins={};c.get=function(b,a,d,j){j&&c.removeTweens(b);return new c(b,a,d)};c.tick=function(b,a){for(var d=c._tweens.slice(),j=d.length-1;0<=j;j--){var e=d[j];a&&!e.ignoreGlobalPause||e._paused||e.tick(e._useTicks?1:b)}};createjs.Ticker&&createjs.Ticker.addListener(c,!1);c.removeTweens=function(b){if(b.tweenjs_count){for(var a=c._tweens,d=a.length-1;0<=d;d--)a[d]._target==
b&&(a[d]._paused=!0,a.splice(d,1));b.tweenjs_count=0}};c.hasActiveTweens=function(b){return b?b.tweenjs_count:c._tweens&&c._tweens.length};c.installPlugin=function(b,a){var d=b.priority;null==d&&(b.priority=d=0);for(var j=0,e=a.length,f=c._plugins;j<e;j++){var h=a[j];if(f[h]){for(var k=f[h],m=0,p=k.length;m<p&&!(d<k[m].priority);m++);f[h].splice(m,0,b)}else f[h]=[b]}};c._register=function(b,a){var d=b._target;a?(d&&(d.tweenjs_count=d.tweenjs_count?d.tweenjs_count+1:1),c._tweens.push(b)):(d&&d.tweenjs_count--,
d=c._tweens.indexOf(b),-1!=d&&c._tweens.splice(d,1))};a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.ignoreGlobalPause=!1;a.loop=!1;a.duration=0;a.pluginData=null;a.onChange=null;a.change=null;a.target=null;a.position=null;a._paused=!1;a._curQueueProps=null;a._initQueueProps=null;a._steps=null;a._actions=null;a._prevPosition=0;a._stepPosition=0;a._prevPos=-1;a._target=
null;a._useTicks=!1;a.initialize=function(b,a,d){this.target=this._target=b;a&&(this._useTicks=a.useTicks,this.ignoreGlobalPause=a.ignoreGlobalPause,this.loop=a.loop,this.onChange=a.onChange,a.override&&c.removeTweens(b));this.pluginData=d||{};this._curQueueProps={};this._initQueueProps={};this._steps=[];this._actions=[];a&&a.paused?this._paused=!0:c._register(this,!0);a&&null!=a.position&&this.setPosition(a.position,c.NONE)};a.wait=function(b){if(null==b||0>=b)return this;var a=this._cloneProps(this._curQueueProps);
return this._addStep({d:b,p0:a,e:this._linearEase,p1:a})};a.to=function(b,a,d){if(isNaN(a)||0>a)a=0;return this._addStep({d:a||0,p0:this._cloneProps(this._curQueueProps),e:d,p1:this._cloneProps(this._appendQueueProps(b))})};a.call=function(b,a,d){return this._addAction({f:b,p:a?a:[this],o:d?d:this._target})};a.set=function(b,a){return this._addAction({f:this._set,o:this,p:[b,a?a:this._target]})};a.play=function(b){return this.call(b.setPaused,[!1],b)};a.pause=function(b){b||(b=this);return this.call(b.setPaused,
[!0],b)};a.setPosition=function(b,a){0>b&&(b=0);null==a&&(a=1);var d=b,c=!1;d>=this.duration&&(this.loop?d%=this.duration:(d=this.duration,c=!0));if(d==this._prevPos)return c;var e=this._prevPos;this.position=this._prevPos=d;this._prevPosition=b;if(this._target)if(c)this._updateTargetProps(null,1);else if(0<this._steps.length){for(var f=0,h=this._steps.length;f<h&&!(this._steps[f].t>d);f++);f=this._steps[f-1];this._updateTargetProps(f,(this._stepPosition=d-f.t)/f.d)}0!=a&&0<this._actions.length&&
(this._useTicks?this._runActions(d,d):1==a&&d<e?(e!=this.duration&&this._runActions(e,this.duration),this._runActions(0,d,!0)):this._runActions(e,d));c&&this.setPaused(!0);this.onChange&&this.onChange(this);this.dispatchEvent("change");return c};a.tick=function(b){this._paused||this.setPosition(this._prevPosition+b)};a.setPaused=function(b){this._paused=!!b;c._register(this,!b);return this};a.w=a.wait;a.t=a.to;a.c=a.call;a.s=a.set;a.toString=function(){return"[Tween]"};a.clone=function(){throw"Tween can not be cloned.";
};a._updateTargetProps=function(b,a){var d,j,e,f;!b&&1==a?d=j=this._curQueueProps:(b.e&&(a=b.e(a,0,1,1)),d=b.p0,j=b.p1);for(n in this._initQueueProps){if(null==(e=d[n]))d[n]=e=this._initQueueProps[n];if(null==(f=j[n]))j[n]=f=e;e=e==f||0==a||1==a||"number"!=typeof e?1==a?f:e:e+(f-e)*a;var h=!1;if(f=c._plugins[n])for(var k=0,m=f.length;k<m;k++){var p=f[k].tween(this,n,e,d,j,a,!!b&&d==j,!b);p==c.IGNORE?h=!0:e=p}h||(this._target[n]=e)}};a._runActions=function(a,c,d){var j=a,e=c,f=-1,h=this._actions.length,
k=1;a>c&&(j=c,e=a,f=h,h=k=-1);for(;(f+=k)!=h;){c=this._actions[f];var m=c.t;(m==e||m>j&&m<e||d&&m==a)&&c.f.apply(c.o,c.p)}};a._appendQueueProps=function(a){var g,d,j,e,f,h;for(h in a){if(void 0===this._initQueueProps[h]){d=this._target[h];if(g=c._plugins[h]){j=0;for(e=g.length;j<e;j++)d=g[j].init(this,h,d)}this._initQueueProps[h]=void 0===d?null:d}else d=this._curQueueProps[h];if(g=c._plugins[h]){f=f||{};j=0;for(e=g.length;j<e;j++)g[j].step&&g[j].step(this,h,d,a[h],f)}this._curQueueProps[h]=a[h]}f&&
this._appendQueueProps(f);return this._curQueueProps};a._cloneProps=function(a){var c={},d;for(d in a)c[d]=a[d];return c};a._addStep=function(a){0<a.d&&(this._steps.push(a),a.t=this.duration,this.duration+=a.d);return this};a._addAction=function(a){a.t=this.duration;this._actions.push(a);return this};a._set=function(a,c){for(var d in a)c[d]=a[d]};createjs.Tween=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,c,d){this.initialize(a,c,d)},a=c.prototype;a.ignoreGlobalPause=!1;a.duration=0;a.loop=!1;a.onChange=null;a.position=null;a._paused=!1;a._tweens=null;a._labels=null;a._prevPosition=0;a._prevPos=-1;a._useTicks=!1;a.initialize=function(a,c,d){this._tweens=[];d&&(this._useTicks=d.useTicks,this.loop=d.loop,this.ignoreGlobalPause=d.ignoreGlobalPause,this.onChange=d.onChange);a&&this.addTween.apply(this,a);this.setLabels(c);d&&d.paused?this._paused=!0:createjs.Tween._register(this,
!0);d&&null!=d.position&&this.setPosition(d.position,createjs.Tween.NONE)};a.addTween=function(a){var c=arguments.length;if(1<c){for(var d=0;d<c;d++)this.addTween(arguments[d]);return arguments[0]}if(0==c)return null;this.removeTween(a);this._tweens.push(a);a.setPaused(!0);a._paused=!1;a._useTicks=this._useTicks;a.duration>this.duration&&(this.duration=a.duration);0<=this._prevPos&&a.setPosition(this._prevPos,createjs.Tween.NONE);return a};a.removeTween=function(a){var c=arguments.length;if(1<c){for(var d=
!0,j=0;j<c;j++)d=d&&this.removeTween(arguments[j]);return d}if(0==c)return!1;c=this._tweens.indexOf(a);return-1!=c?(this._tweens.splice(c,1),a.duration>=this.duration&&this.updateDuration(),!0):!1};a.addLabel=function(a,c){this._labels[a]=c};a.setLabels=function(a){this._labels=a?a:{}};a.gotoAndPlay=function(a){this.setPaused(!1);this._goto(a)};a.gotoAndStop=function(a){this.setPaused(!0);this._goto(a)};a.setPosition=function(a,c){0>a&&(a=0);var d=this.loop?a%this.duration:a,j=!this.loop&&a>=this.duration;
if(d==this._prevPos)return j;this._prevPosition=a;this.position=this._prevPos=d;for(var e=0,f=this._tweens.length;e<f;e++)if(this._tweens[e].setPosition(d,c),d!=this._prevPos)return!1;j&&this.setPaused(!0);this.onChange&&this.onChange(this);return j};a.setPaused=function(a){this._paused=!!a;createjs.Tween._register(this,!a)};a.updateDuration=function(){for(var a=this.duration=0,c=this._tweens.length;a<c;a++)tween=this._tweens[a],tween.duration>this.duration&&(this.duration=tween.duration)};a.tick=
function(a){this.setPosition(this._prevPosition+a)};a.resolve=function(a){var c=parseFloat(a);isNaN(c)&&(c=this._labels[a]);return c};a.toString=function(){return"[Timeline]"};a.clone=function(){throw"Timeline can not be cloned.";};a._goto=function(a){a=this.resolve(a);null!=a&&this.setPosition(a)};createjs.Timeline=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Ease cannot be instantiated.";};c.linear=function(a){return a};c.none=c.linear;c.get=function(a){-1>a&&(a=-1);1<a&&(a=1);return function(b){return 0==a?b:0>a?b*(b*-a+1+a):b*((2-b)*a+(1-a))}};c.getPowIn=function(a){return function(b){return Math.pow(b,a)}};c.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}};c.getPowInOut=function(a){return function(b){return 1>(b*=2)?0.5*Math.pow(b,a):1-0.5*Math.abs(Math.pow(2-b,a))}};c.quadIn=c.getPowIn(2);c.quadOut=
c.getPowOut(2);c.quadInOut=c.getPowInOut(2);c.cubicIn=c.getPowIn(3);c.cubicOut=c.getPowOut(3);c.cubicInOut=c.getPowInOut(3);c.quartIn=c.getPowIn(4);c.quartOut=c.getPowOut(4);c.quartInOut=c.getPowInOut(4);c.quintIn=c.getPowIn(5);c.quintOut=c.getPowOut(5);c.quintInOut=c.getPowInOut(5);c.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)};c.sineOut=function(a){return Math.sin(a*Math.PI/2)};c.sineInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};c.getBackIn=function(a){return function(b){return b*
b*((a+1)*b-a)}};c.backIn=c.getBackIn(1.7);c.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}};c.backOut=c.getBackOut(1.7);c.getBackInOut=function(a){a*=1.525;return function(b){return 1>(b*=2)?0.5*b*b*((a+1)*b-a):0.5*((b-=2)*b*((a+1)*b+a)+2)}};c.backInOut=c.getBackInOut(1.7);c.circIn=function(a){return-(Math.sqrt(1-a*a)-1)};c.circOut=function(a){return Math.sqrt(1- --a*a)};c.circInOut=function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)};c.bounceIn=
function(a){return 1-c.bounceOut(1-a)};c.bounceOut=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};c.bounceInOut=function(a){return 0.5>a?0.5*c.bounceIn(2*a):0.5*c.bounceOut(2*a-1)+0.5};c.getElasticIn=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var j=b/c*Math.asin(1/a);return-(a*Math.pow(2,10*(d-=1))*Math.sin((d-j)*c/b))}};c.elasticIn=c.getElasticIn(1,0.3);c.getElasticOut=
function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var j=b/c*Math.asin(1/a);return a*Math.pow(2,-10*d)*Math.sin((d-j)*c/b)+1}};c.elasticOut=c.getElasticOut(1,0.3);c.getElasticInOut=function(a,b){var c=2*Math.PI;return function(d){var j=b/c*Math.asin(1/a);return 1>(d*=2)?-0.5*a*Math.pow(2,10*(d-=1))*Math.sin((d-j)*c/b):0.5*a*Math.pow(2,-10*(d-=1))*Math.sin((d-j)*c/b)+1}};c.elasticInOut=c.getElasticInOut(1,0.3*1.5);createjs.Ease=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"MotionGuidePlugin cannot be instantiated.";};c.priority=0;c.install=function(){createjs.Tween.installPlugin(c,["guide","x","y","rotation"]);return createjs.Tween.IGNORE};c.init=function(a,b,c){a=a.target;a.hasOwnProperty("x")||(a.x=0);a.hasOwnProperty("y")||(a.y=0);a.hasOwnProperty("rotation")||(a.rotation=0);return"guide"==b?null:c};c.step=function(a,b,g,d,j){if("guide"!=b)return d;var e;d.hasOwnProperty("path")||(d.path=[]);a=d.path;d.hasOwnProperty("end")||(d.end=
1);d.hasOwnProperty("start")||(d.start=g&&g.hasOwnProperty("end")&&g.path===a?g.end:0);if(d.hasOwnProperty("_segments")&&d._length)return d;g=a.length;if(6<=g&&0==(g-2)%4){d._segments=[];d._length=0;for(b=2;b<g;b+=4){for(var f=a[b-2],h=a[b-1],k=a[b+0],m=a[b+1],p=a[b+2],q=a[b+3],s=f,t=h,u,r,v=0,w=[],y=1;10>=y;y++){r=y/10;var x=1-r;u=x*x*f+2*x*r*k+r*r*p;r=x*x*h+2*x*r*m+r*r*q;v+=w[w.push(Math.sqrt((e=u-s)*e+(e=r-t)*e))-1];s=u;t=r}d._segments.push(v);d._segments.push(w);d._length+=v}}else throw"invalid 'path' data, please see documentation for valid paths";
e=d.orient;d.orient=!1;c.calc(d,d.end,j);d.orient=e;return d};c.tween=function(a,b,g,d,j,e,f){j=j.guide;if(void 0==j||j===d.guide)return g;j.lastRatio!=e&&(c.calc(j,(j.end-j.start)*(f?j.end:e)+j.start,a.target),j.orient&&(a.target.rotation+=d.rotation||0),j.lastRatio=e);return!j.orient&&"rotation"==b?g:a.target[b]};c.calc=function(a,b,g){void 0==a._segments&&c.validate(a);void 0==g&&(g={x:0,y:0,rotation:0});var d=a._segments,j=a.path,e=a._length*b,f=d.length-2;for(b=0;e>d[b]&&b<f;)e-=d[b],b+=2;for(var d=
d[b+1],h=0,f=d.length-1;e>d[h]&&h<f;)e-=d[h],h++;e=h/++f+e/(f*d[h]);b=2*b+2;f=1-e;g.x=f*f*j[b-2]+2*f*e*j[b+0]+e*e*j[b+2];g.y=f*f*j[b-1]+2*f*e*j[b+1]+e*e*j[b+3];a.orient&&(g.rotation=57.2957795*Math.atan2((j[b+1]-j[b-1])*f+(j[b+3]-j[b+1])*e,(j[b+0]-j[b-2])*f+(j[b+2]-j[b+0])*e));return g};createjs.MotionGuidePlugin=c})();(function(){var c=this.createjs=this.createjs||{},c=c.TweenJS=c.TweenJS||{};c.version="2013.02.12";c.buildDate="Tue, 12 Feb 2013 21:34:28 GMT"})();this.createjs=this.createjs||{};
(function(){function c(){throw"Sound cannot be instantiated";}function a(a,b){this.init(a,b)}function b(){}c.DELIMITER="|";c.AUDIO_TIMEOUT=8E3;c.INTERRUPT_ANY="any";c.INTERRUPT_EARLY="early";c.INTERRUPT_LATE="late";c.INTERRUPT_NONE="none";c.PLAY_INITED="playInited";c.PLAY_SUCCEEDED="playSucceeded";c.PLAY_INTERRUPTED="playInterrupted";c.PLAY_FINISHED="playFinished";c.PLAY_FAILED="playFailed";c.SUPPORTED_EXTENSIONS="mp3 ogg mpeg wav m4a mp4 aiff wma mid".split(" ");c.EXTENSION_MAP={m4a:"mp4"};c.FILE_PATTERN=
/(\w+:\/{2})?((?:\w+\.){2}\w+)?(\/?[\S]+\/|\/)?([\w\-%\.]+)(?:\.)(\w+)?(\?\S+)?/i;c.defaultInterruptBehavior=c.INTERRUPT_NONE;c.lastId=0;c.activePlugin=null;c.pluginsRegistered=!1;c.masterVolume=1;c.masterMute=!1;c.instances=[];c.idHash={};c.preloadHash={};c.defaultSoundInstance=null;c.addEventListener=null;c.removeEventListener=null;c.removeAllEventListeners=null;c.dispatchEvent=null;c.hasEventListener=null;c._listeners=null;createjs.EventDispatcher.initialize(c);c.onLoadComplete=null;c.sendLoadComplete=
function(a){if(c.preloadHash[a])for(var b=0,g=c.preloadHash[a].length;b<g;b++){var f=c.preloadHash[a][b],f={target:this,type:"loadComplete",src:f.src,id:f.id,data:f.data};c.preloadHash[a][b]=!0;c.onLoadComplete&&c.onLoadComplete(f);c.dispatchEvent(f)}};c.getPreloadHandlers=function(){return{callback:createjs.proxy(c.initLoad,c),types:["sound"],extensions:c.SUPPORTED_EXTENSIONS}};c.registerPlugin=function(a){c.pluginsRegistered=!0;return null==a?!1:a.isSupported()?(c.activePlugin=new a,!0):!1};c.registerPlugins=
function(a){for(var b=0,g=a.length;b<g;b++)if(c.registerPlugin(a[b]))return!0;return!1};c.initializeDefaultPlugins=function(){return null!=c.activePlugin?!0:c.pluginsRegistered?!1:c.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1};c.isReady=function(){return null!=c.activePlugin};c.getCapabilities=function(){return null==c.activePlugin?null:c.activePlugin.capabilities};c.getCapability=function(a){return null==c.activePlugin?null:c.activePlugin.capabilities[a]};c.initLoad=
function(a,b,g,f){a=c.registerSound(a,g,f,!1);return null==a?!1:a};c.registerSound=function(b,g,e,f){if(!c.initializeDefaultPlugins())return!1;b instanceof Object&&(b=b.src,g=b.id,e=b.data);var h=c.parsePath(b,"sound",g,e);if(null==h)return!1;null!=g&&(c.idHash[g]=h.src);var k=null;null!=e&&(isNaN(e.channels)?isNaN(e)||(k=parseInt(e)):k=parseInt(e.channels));var m=c.activePlugin.register(h.src,k);null!=m&&(null!=m.numChannels&&(k=m.numChannels),a.create(h.src,k),null==e||!isNaN(e)?e=h.data=k||a.maxPerChannel():
e.channels=h.data.channels=k||a.maxPerChannel(),null!=m.tag?h.tag=m.tag:m.src&&(h.src=m.src),null!=m.completeHandler&&(h.completeHandler=m.completeHandler),h.type=m.type);!1!=f&&(c.preloadHash[h.src]||(c.preloadHash[h.src]=[]),c.preloadHash[h.src].push({src:b,id:g,data:e}),1==c.preloadHash[h.src].length&&c.activePlugin.preload(h.src,m));return h};c.registerManifest=function(a){for(var b=[],c=0,g=a.length;c<g;c++)b[c]=createjs.Sound.registerSound(a[c].src,a[c].id,a[c].data,a[c].preload);return b};
c.loadComplete=function(a){var b=c.parsePath(a,"sound");a=b?c.getSrcById(b.src):c.getSrcById(a);return!0==c.preloadHash[a][0]};c.parsePath=function(a,b,g,f){a=a.split(c.DELIMITER);b={type:b||"sound",id:g,data:f};g=c.getCapabilities();f=0;for(var h=a.length;f<h;f++){var k=a[f],m=k.match(c.FILE_PATTERN);if(null==m)return!1;var p=m[4],m=m[5];if(g[m]&&-1<c.SUPPORTED_EXTENSIONS.indexOf(m))return b.name=p,b.src=k,b.extension=m,b}return null};c.play=function(a,b,g,f,h,k,m){a=c.createInstance(a);c.playInstance(a,
b,g,f,h,k,m)||a.playFailed();return a};c.createInstance=function(b){if(!c.initializeDefaultPlugins())return c.defaultSoundInstance;var g=c.parsePath(b,"sound");b=g?c.getSrcById(g.src):c.getSrcById(b);var g=b.lastIndexOf("."),e=b.slice(g+1);-1!=g&&-1<c.SUPPORTED_EXTENSIONS.indexOf(e)?(a.create(b),b=c.activePlugin.create(b)):b=c.defaultSoundInstance;b.uniqueId=c.lastId++;return b};c.setVolume=function(a){if(null==Number(a))return!1;a=Math.max(0,Math.min(1,a));c.masterVolume=a;if(!this.activePlugin||
!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var b=this.instances,g=0,f=b.length;g<f;g++)b[g].setMasterVolume(a)};c.getVolume=function(){return c.masterVolume};c.mute=function(a){this.masterMute=a;if(!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this.instances,c=0,g=b.length;c<g;c++)b[c].setMasterMute(a)};c.setMute=function(a){if(null==a||void 0==a)return!1;this.masterMute=a;if(!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=
this.instances,c=0,g=b.length;c<g;c++)b[c].setMasterMute(a);return!0};c.getMute=function(){return this.masterMute};c.stop=function(){for(var a=this.instances,b=a.length;0<b;b--)a[b-1].stop()};c.playInstance=function(a,b,g,f,h,k,m){b=b||c.defaultInterruptBehavior;null==g&&(g=0);null==f&&(f=a.getPosition());null==h&&(h=0);null==k&&(k=a.getVolume());null==m&&(m=a.getPan());if(0==g){if(!c.beginPlaying(a,b,f,h,k,m))return!1}else g=setTimeout(function(){c.beginPlaying(a,b,f,h,k,m)},g),a.delayTimeoutId=
g;this.instances.push(a);return!0};c.beginPlaying=function(b,c,g,f,h,k){return!a.add(b,c)?!1:!b.beginPlaying(g,f,h,k)?(b=this.instances.indexOf(b),-1<b&&this.instances.splice(b,1),!1):!0};c.getSrcById=function(a){return null==c.idHash||null==c.idHash[a]?a:c.idHash[a]};c.playFinished=function(b){a.remove(b);b=this.instances.indexOf(b);-1<b&&this.instances.splice(b,1)};c.proxy=function(a,b){return function(){return a.apply(b,arguments)}};createjs.Sound=c;createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,
2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}};a.channels={};a.create=function(b,c){return null==a.get(b)?(a.channels[b]=new a(b,c),!0):!1};a.add=function(b,c){var g=a.get(b.src);return null==g?!1:g.add(b,c)};a.remove=function(b){var c=a.get(b.src);if(null==c)return!1;c.remove(b);return!0};a.maxPerChannel=function(){return g.maxDefault};a.get=function(b){return a.channels[b]};var g=a.prototype={src:null,max:null,maxDefault:100,length:0,init:function(a,b){this.src=
a;this.max=b||this.maxDefault;-1==this.max&&this.max==this.maxDefault;this.instances=[]},get:function(a){return this.instances[a]},add:function(a,b){if(!this.getSlot(b,a))return!1;this.instances.push(a);this.length++;return!0},remove:function(a){a=this.instances.indexOf(a);if(-1==a)return!1;this.instances.splice(a,1);this.length--;return!0},getSlot:function(a){for(var b,g,f=0,h=this.max;f<h;f++){b=this.get(f);if(null==b)return!0;if(!(a==c.INTERRUPT_NONE&&b.playState!=c.PLAY_FINISHED))if(0==f)g=b;
else if(b.playState==c.PLAY_FINISHED||b==c.PLAY_INTERRUPTED||b==c.PLAY_FAILED)g=b;else if(a==c.INTERRUPT_EARLY&&b.getPosition()<g.getPosition()||a==c.INTERRUPT_LATE&&b.getPosition()>g.getPosition())g=b}return null!=g?(g.interrupt(),this.remove(g),!0):!1},toString:function(){return"[Sound SoundChannel]"}};c.defaultSoundInstance=new function(){this.isDefault=!0;this.addEventListener=this.removeEventListener=this.removeAllEventListener=this.dispatchEvent=this.hasEventListener=this._listeners=this.interrupt=
this.playFailed=this.pause=this.resume=this.play=this.beginPlaying=this.cleanUp=this.stop=this.setMasterVolume=this.setVolume=this.mute=this.setMute=this.getMute=this.setPan=this.getPosition=this.setPosition=function(){return!1};this.getVolume=this.getPan=this.getDuration=function(){return 0};this.playState=c.PLAY_FAILED;this.toString=function(){return"[Sound Default Sound Instance]"}};b.init=function(){var a=navigator.userAgent;b.isFirefox=-1<a.indexOf("Firefox");b.isOpera=null!=window.opera;b.isChrome=
-1<a.indexOf("Chrome");b.isIOS=-1<a.indexOf("iPod")||-1<a.indexOf("iPhone")||-1<a.indexOf("iPad");b.isAndroid=-1<a.indexOf("Android");b.isBlackberry=-1<a.indexOf("Blackberry")};b.init();createjs.Sound.BrowserDetect=b})();this.createjs=this.createjs||{};
(function(){function c(){this.init()}function a(a,b){this.init(a,b)}function b(a,b){this.init(a,b)}c.capabilities=null;c.isSupported=function(){if("file:"==location.protocol)return!1;c.generateCapabilities();return null==c.context?!1:!0};c.generateCapabilities=function(){if(null==c.capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(window.webkitAudioContext)c.context=new webkitAudioContext;else if(window.AudioContext)c.context=new AudioContext;else return null;
c.capabilities={panning:!0,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,j=createjs.Sound.EXTENSION_MAP,e=0,f=b.length;e<f;e++){var h=b[e],k=j[h]||h;c.capabilities[h]="no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)||"no"!=a.canPlayType("audio/"+k)&&""!=a.canPlayType("audio/"+k)}2>c.context.destination.numberOfChannels&&(c.capabilities.panning=!1);c.dynamicsCompressorNode=c.context.createDynamicsCompressor();c.dynamicsCompressorNode.connect(c.context.destination);
c.gainNode=c.context.createGainNode();c.gainNode.connect(c.dynamicsCompressorNode)}};c.prototype={capabilities:null,volume:1,context:null,dynamicsCompressorNode:null,gainNode:null,arrayBuffers:null,init:function(){this.capabilities=c.capabilities;this.arrayBuffers={};this.context=c.context;this.gainNode=c.gainNode;this.dynamicsCompressorNode=c.dynamicsCompressorNode},register:function(a){this.arrayBuffers[a]=!0;return{tag:new b(a,this)}},isPreloadStarted:function(a){return null!=this.arrayBuffers[a]},
isPreloadComplete:function(a){return!(null==this.arrayBuffers[a]||!0==this.arrayBuffers[a])},removeFromPreload:function(a){delete this.arrayBuffers[a]},addPreloadResults:function(a,b){this.arrayBuffers[a]=b},handlePreloadComplete:function(){createjs.Sound.sendLoadComplete(this.src)},preload:function(a){this.arrayBuffers[a]=!0;a=new b(a,this);a.onload=this.handlePreloadComplete;a.load()},create:function(b){this.isPreloadStarted(b)||this.preload(b);return new a(b,this)},setVolume:function(a){this.volume=
a;this.updateVolume();return!0},updateVolume:function(){var a=createjs.Sound.masterMute?0:this.volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},getVolume:function(){return this.volume},setMute:function(){this.updateVolume();return!0},toString:function(){return"[WebAudioPlugin]"}};createjs.WebAudioPlugin=c;a.prototype={src:null,uniqueId:-1,playState:null,owner:null,offset:0,delay:0,volume:1,pan:0,duration:0,remainingLoops:0,delayTimeoutId:null,soundCompleteTimeout:null,panNode:null,
gainNode:null,sourceNode:null,muted:!1,paused:!1,startTime:0,addEventListener:null,removeEventListener:null,removeAllEventListeners:null,dispatchEvent:null,hasEventListener:null,_listeners:null,endedHandler:null,readyHandler:null,stalledHandler:null,onReady:null,onPlaySucceeded:null,onPlayInterrupted:null,onPlayFailed:null,onComplete:null,onLoop:null,sendEvent:function(a){this.dispatchEvent({target:this,type:a})},init:function(a,b){this.owner=b;this.src=a;this.panNode=this.owner.context.createPanner();
this.gainNode=this.owner.context.createGainNode();this.gainNode.connect(this.panNode);this.owner.isPreloadComplete(this.src)&&(this.duration=1E3*this.owner.arrayBuffers[this.src].duration);this.endedHandler=createjs.proxy(this.handleSoundComplete,this);this.readyHandler=createjs.proxy(this.handleSoundReady,this);this.stalledHandler=createjs.proxy(this.handleSoundStalled,this)},cleanUp:function(){this.sourceNode&&this.sourceNode.playbackState!=this.sourceNode.UNSCHEDULED_STATE&&(this.sourceNode.noteOff(0),
this.sourceNode=null);0!=this.panNode.numberOfOutputs&&this.panNode.disconnect(0);clearTimeout(this.delayTimeoutId);clearTimeout(this.soundCompleteTimeout);null!=window.createjs&&createjs.Sound.playFinished(this)},interrupt:function(){this.playState=createjs.Sound.PLAY_INTERRUPTED;if(this.onPlayInterrupted)this.onPlayInterrupted(this);this.sendEvent("interrupted");this.cleanUp();this.paused=!1},handleSoundStalled:function(){if(null!=this.onPlayFailed)this.onPlayFailed(this);this.sendEvent("failed")},
handleSoundReady:function(){null!=window.createjs&&(this.offset>this.getDuration()?this.playFailed():(0>this.offset&&(this.offset=0),this.playState=createjs.Sound.PLAY_SUCCEEDED,this.paused=!1,this.panNode.connect(this.owner.gainNode),this.sourceNode=this.owner.context.createBufferSource(),this.sourceNode.buffer=this.owner.arrayBuffers[this.src],this.duration=1E3*this.owner.arrayBuffers[this.src].duration,this.sourceNode.connect(this.gainNode),this.soundCompleteTimeout=setTimeout(this.endedHandler,
1E3*(this.sourceNode.buffer.duration-this.offset)),this.startTime=this.owner.context.currentTime-this.offset,this.sourceNode.noteGrainOn(0,this.offset,this.sourceNode.buffer.duration-this.offset)))},play:function(a,b,c,e,f,h){this.cleanUp();createjs.Sound.playInstance(this,a,b,c,e,f,h)},beginPlaying:function(a,b,c,e){if(null!=window.createjs&&this.src){this.offset=a/1E3;this.remainingLoops=b;this.setVolume(c);this.setPan(e);if(this.owner.isPreloadComplete(this.src))return this.handleSoundReady(null),
this.onPlaySucceeded&&this.onPlaySucceeded(this),this.sendEvent("succeeded"),1;this.playFailed()}},pause:function(){return!this.paused&&this.playState==createjs.Sound.PLAY_SUCCEEDED?(this.paused=!0,this.offset=this.owner.context.currentTime-this.startTime,this.sourceNode.noteOff(0),0!=this.panNode.numberOfOutputs&&this.panNode.disconnect(),clearTimeout(this.delayTimeoutId),clearTimeout(this.soundCompleteTimeout),!0):!1},resume:function(){if(!this.paused)return!1;this.handleSoundReady(null);return!0},
stop:function(){this.playState=createjs.Sound.PLAY_FINISHED;this.cleanUp();this.offset=0;return!0},setVolume:function(a){if(null==Number(a))return!1;this.volume=a=Math.max(0,Math.min(1,a));this.updateVolume();return!0},updateVolume:function(){var a=this.muted?0:this.volume;return a!=this.gainNode.gain.value?(this.gainNode.gain.value=a,!0):!1},getVolume:function(){return this.volume},mute:function(a){this.muted=a;this.updateVolume();return!0},setMute:function(a){if(null==a||void 0==a)return!1;this.muted=
a;this.updateVolume();return!0},getMute:function(){return this.muted},setPan:function(a){if(this.owner.capabilities.panning)this.panNode.setPosition(a,0,-0.5),this.pan=a;else return!1},getPan:function(){return this.pan},getPosition:function(){return 1E3*(this.paused||null==this.sourceNode?this.offset:this.owner.context.currentTime-this.startTime)},setPosition:function(a){this.offset=a/1E3;this.sourceNode&&this.sourceNode.playbackState!=this.sourceNode.UNSCHEDULED_STATE&&(this.sourceNode.noteOff(0),
clearTimeout(this.soundCompleteTimeout));!this.paused&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&this.handleSoundReady(null);return!0},getDuration:function(){return this.duration},handleSoundComplete:function(){this.offset=0;if(0!=this.remainingLoops){this.remainingLoops--;this.handleSoundReady(null);if(null!=this.onLoop)this.onLoop(this);this.sendEvent("loop")}else if(null!=window.createjs){this.playState=createjs.Sound.PLAY_FINISHED;if(null!=this.onComplete)this.onComplete(this);this.sendEvent("complete");
this.cleanUp()}},playFailed:function(){if(null!=window.createjs){this.playState=createjs.Sound.PLAY_FAILED;if(null!=this.onPlayFailed)this.onPlayFailed(this);this.sendEvent("failed");this.cleanUp()}},toString:function(){return"[WebAudioPlugin SoundInstance]"}};createjs.EventDispatcher.initialize(a.prototype);b.prototype={request:null,owner:null,progress:-1,src:null,result:null,onload:null,onprogress:null,onError:null,init:function(a,b){this.src=a;this.owner=b},load:function(a){null!=a&&(this.src=
a);this.request=new XMLHttpRequest;this.request.open("GET",this.src,!0);this.request.responseType="arraybuffer";this.request.onload=createjs.proxy(this.handleLoad,this);this.request.onError=createjs.proxy(this.handleError,this);this.request.onprogress=createjs.proxy(this.handleProgress,this);this.request.send()},handleProgress:function(a,b){this.progress=a/b;if(null!=this.onprogress)this.onprogress({loaded:a,total:b,progress:this.progress})},handleLoad:function(){c.context.decodeAudioData(this.request.response,
createjs.proxy(this.handleAudioDecoded,this),createjs.proxy(this.handleError,this))},handleAudioDecoded:function(a){this.progress=1;this.result=a;this.owner.addPreloadResults(this.src,this.result);this.onload&&this.onload()},handleError:function(a){this.owner.removeFromPreload(this.src);this.onerror&&this.onerror(a)},toString:function(){return"[WebAudioPlugin WebAudioLoader]"}}})();this.createjs=this.createjs||{};
(function(){function c(){this.init()}function a(a,b){this.init(a,b)}function b(a,b){this.init(a,b)}function g(a){this.init(a)}c.MAX_INSTANCES=30;c.capabilities=null;c.AUDIO_READY="canplaythrough";c.AUDIO_ENDED="ended";c.AUDIO_ERROR="error";c.AUDIO_STALLED="stalled";c.isSupported=function(){if(createjs.Sound.BrowserDetect.isIOS)return!1;c.generateCapabilities();return null==c.tag||null==c.capabilities?!1:!0};c.generateCapabilities=function(){if(null==c.capabilities){var a=c.tag=document.createElement("audio");
if(null==a.canPlayType)return null;c.capabilities={panning:!0,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,g=createjs.Sound.EXTENSION_MAP,f=0,h=b.length;f<h;f++){var k=b[f],m=g[k]||k;c.capabilities[k]="no"!=a.canPlayType("audio/"+k)&&""!=a.canPlayType("audio/"+k)||"no"!=a.canPlayType("audio/"+m)&&""!=a.canPlayType("audio/"+m)}}};c.prototype={capabilities:null,audioSources:null,defaultNumChannels:2,init:function(){this.capabilities=c.capabilities;this.audioSources={}},register:function(a,
b){this.audioSources[a]=!0;for(var c=g.get(a),f,h=b||this.defaultNumChannels,k=0;k<h;k++)f=this.createTag(a),c.add(f);return{tag:f,numChannels:h}},createTag:function(a){var b=document.createElement("audio");b.autoplay=!1;b.preload="none";b.src=a;return b},create:function(b){if(!this.isPreloadStarted(b)){var c=g.get(b),e=this.createTag(b);c.add(e);this.preload(b,{tag:e})}return new a(b,this)},isPreloadStarted:function(a){return null!=this.audioSources[a]},preload:function(a,c){this.audioSources[a]=
!0;new b(a,c.tag)},toString:function(){return"[HTMLAudioPlugin]"}};createjs.HTMLAudioPlugin=c;a.prototype={src:null,uniqueId:-1,playState:null,owner:null,loaded:!1,offset:0,delay:0,volume:1,pan:0,duration:0,remainingLoops:0,delayTimeoutId:null,tag:null,muted:!1,paused:!1,addEventListener:null,removeEventListener:null,removeAllEventListeners:null,dispatchEvent:null,hasEventListener:null,_listeners:null,onComplete:null,onLoop:null,onReady:null,onPlayFailed:null,onPlayInterrupted:null,onPlaySucceeded:null,
endedHandler:null,readyHandler:null,stalledHandler:null,init:function(a,b){this.src=a;this.owner=b;this.endedHandler=createjs.proxy(this.handleSoundComplete,this);this.readyHandler=createjs.proxy(this.handleSoundReady,this);this.stalledHandler=createjs.proxy(this.handleSoundStalled,this)},sendEvent:function(a){this.dispatchEvent({target:this,type:a})},cleanUp:function(){var a=this.tag;if(null!=a){a.pause();try{a.currentTime=0}catch(b){}a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED,this.endedHandler,
!1);a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,!1);g.setInstance(this.src,a);this.tag=null}clearTimeout(this.delayTimeoutId);null!=window.createjs&&createjs.Sound.playFinished(this)},interrupt:function(){if(null!=this.tag){this.playState=createjs.Sound.PLAY_INTERRUPTED;if(this.onPlayInterrupted)this.onPlayInterrupted(this);this.sendEvent("interrupted");this.cleanUp();this.paused=!1}},play:function(a,b,c,g,h,k){this.cleanUp();createjs.Sound.playInstance(this,a,b,c,
g,h,k)},beginPlaying:function(a,b,c){if(null==window.createjs)return-1;var f=this.tag=g.getInstance(this.src);if(null==f)return this.playFailed(),-1;this.duration=1E3*this.tag.duration;f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED,this.endedHandler,!1);this.offset=a;this.volume=c;this.updateVolume();this.remainingLoops=b;4!==f.readyState?(f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,!1),f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED,this.stalledHandler,
!1),f.load()):this.handleSoundReady(null);this.onPlaySucceeded&&this.onPlaySucceeded(this);this.sendEvent("succeeded");return 1},handleSoundStalled:function(){if(null!=this.onPlayFailed)this.onPlayFailed(this);this.sendEvent("failed");this.cleanUp()},handleSoundReady:function(){null!=window.createjs&&(this.playState=createjs.Sound.PLAY_SUCCEEDED,this.paused=!1,this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY,this.readyHandler,!1),this.offset>=this.getDuration()?this.playFailed():
(0<this.offset&&(this.tag.currentTime=0.0010*this.offset),-1==this.remainingLoops&&(this.tag.loop=!0),this.tag.play()))},pause:function(){return!this.paused&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&null!=this.tag?(this.paused=!0,this.tag.pause(),clearTimeout(this.delayTimeoutId),!0):!1},resume:function(){if(!this.paused||null==this.tag)return!1;this.paused=!1;this.tag.play();return!0},stop:function(){this.offset=0;this.pause();this.playState=createjs.Sound.PLAY_FINISHED;this.cleanUp();return!0},
setMasterVolume:function(){this.updateVolume();return!0},setVolume:function(a){if(null==Number(a))return!1;this.volume=a=Math.max(0,Math.min(1,a));this.updateVolume();return!0},updateVolume:function(){if(null!=this.tag){var a=this.muted||createjs.Sound.masterMute?0:this.volume*createjs.Sound.masterVolume;a!=this.tag.volume&&(this.tag.volume=a);return!0}return!1},getVolume:function(){return this.volume},mute:function(a){this.muted=a;this.updateVolume();return!0},setMasterMute:function(){this.updateVolume();
return!0},setMute:function(a){if(null==a||void 0==a)return!1;this.muted=a;this.updateVolume();return!0},getMute:function(){return this.muted},setPan:function(){return!1},getPan:function(){return 0},getPosition:function(){return null==this.tag?this.offset:1E3*this.tag.currentTime},setPosition:function(a){if(null==this.tag)this.offset=a;else try{this.tag.currentTime=0.0010*a}catch(b){return!1}return!0},getDuration:function(){return this.duration},handleSoundComplete:function(){this.offset=0;if(0!=this.remainingLoops){this.remainingLoops--;
this.tag.play();if(null!=this.onLoop)this.onLoop(this);this.sendEvent("loop")}else if(null!=window.createjs){this.playState=createjs.Sound.PLAY_FINISHED;if(null!=this.onComplete)this.onComplete(this);this.sendEvent("complete");this.cleanUp()}},playFailed:function(){if(null!=window.createjs){this.playState=createjs.Sound.PLAY_FAILED;if(null!=this.onPlayFailed)this.onPlayFailed(this);this.sendEvent("failed");this.cleanUp()}},toString:function(){return"[HTMLAudioPlugin SoundInstance]"}};createjs.EventDispatcher.initialize(a.prototype);
b.prototype={src:null,tag:null,preloadTimer:null,loadedHandler:null,init:function(a,b){this.src=a;this.tag=b;this.preloadTimer=setInterval(createjs.proxy(this.preloadTick,this),200);this.loadedHandler=createjs.proxy(this.sendLoadedEvent,this);this.tag.addEventListener&&this.tag.addEventListener("canplaythrough",this.loadedHandler);this.tag.onreadystatechange=createjs.proxy(this.sendLoadedEvent,this);this.tag.preload="auto";this.tag.src=a;this.tag.load()},preloadTick:function(){var a=this.tag.buffered,
b=this.tag.duration;0<a.length&&a.end(0)>=b-1&&this.handleTagLoaded()},handleTagLoaded:function(){clearInterval(this.preloadTimer)},sendLoadedEvent:function(){this.tag.removeEventListener&&this.tag.removeEventListener("canplaythrough",this.loadedHandler);this.tag.onreadystatechange=null;createjs.Sound.sendLoadComplete(this.src)},toString:function(){return"[HTMLAudioPlugin HTMLAudioLoader]"}};g.tags={};g.get=function(a){var b=g.tags[a];null==b&&(b=g.tags[a]=new g(a));return b};g.getInstance=function(a){a=
g.tags[a];return null==a?null:a.get()};g.setInstance=function(a,b){var c=g.tags[a];return null==c?null:c.set(b)};g.prototype={src:null,length:0,available:0,tags:null,init:function(a){this.src=a;this.tags=[]},add:function(a){this.tags.push(a);this.length++;this.available++},get:function(){if(0==this.tags.length)return null;this.available=this.tags.length;var a=this.tags.pop();null==a.parentNode&&document.body.appendChild(a);return a},set:function(a){-1==this.tags.indexOf(a)&&this.tags.push(a);this.available=
this.tags.length},toString:function(){return"[HTMLAudioPlugin TagPool]"}}})();this.createjs=this.createjs||{};
(function(){var c=function(){this.init()};c.prototype={};var a=c.prototype;c.FILE_PATTERN=/(\w+:\/{2})?((?:\w+\.){2}\w+)?(\/?[\S]+\/|\/)?([\w\-%\.]+)(?:\.)(\w+)?(\?\S+)?/i;a.loaded=!1;a.canceled=!1;a.progress=0;a._item=null;a.onProgress=null;a.onLoadStart=null;a.onComplete=null;a.onError=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.getItem=function(){return this._item};
a.init=function(){};a.load=function(){};a.close=function(){};a._sendLoadStart=function(){this._isCanceled()||(this.onLoadStart&&this.onLoadStart({target:this}),this.dispatchEvent("loadStart"))};a._sendProgress=function(a){if(!this._isCanceled()){var c=null;if("number"==typeof a)this.progress=a,c={loaded:this.progress,total:1};else if(c=a,this.progress=a.loaded/a.total,isNaN(this.progress)||Infinity==this.progress)this.progress=0;c.target=this;c.type="progress";this.onProgress&&this.onProgress(c);
this.dispatchEvent(c)}};a._sendComplete=function(){this._isCanceled()||(this.onComplete&&this.onComplete({target:this}),this.dispatchEvent("complete"))};a._sendError=function(a){this._isCanceled()||(null==a&&(a={}),a.target=this,a.type="error",this.onError&&this.onError(a),this.dispatchEvent(a))};a._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1};a._parseURI=function(a){return!a?null:a.match(c.FILE_PATTERN)};a.toString=function(){return"[PreloadJS AbstractLoader]"};createjs.AbstractLoader=
c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;c.LOAD_TIMEOUT=8E3;c.BINARY="binary";c.CSS="css";c.IMAGE="image";c.JAVASCRIPT="javascript";c.JSON="json";c.SOUND="sound";c.SVG="svg";c.TEXT="text";c.XML="xml";a.useXHR=!0;a.stopOnError=!1;a.maintainScriptOrder=!0;a.next=null;a.onFileLoad=null;a.onFileProgress=null;a._typeCallbacks=null;a._extensionCallbacks=null;a._loadStartWasDispatched=!1;a._maxConnections=1;a._currentlyLoadingScript=null;a._currentLoads=null;
a._loadQueue=null;a._loadQueueBackup=null;a._loadItemsById=null;a._loadItemsBySrc=null;a._loadedResults=null;a._loadedRawResults=null;a._numItems=0;a._numItemsLoaded=0;a._scriptOrder=null;a._loadedScripts=null;a.init=function(a){this._numItems=this._numItemsLoaded=0;this._loadStartWasDispatched=this._paused=!1;this._currentLoads=[];this._loadQueue=[];this._loadQueueBackup=[];this._scriptOrder=[];this._loadedScripts=[];this._loadItemsById={};this._loadItemsBySrc={};this._loadedResults={};this._loadedRawResults=
{};this._typeCallbacks={};this._extensionCallbacks={};this.setUseXHR(a)};a.setUseXHR=function(a){return this.useXHR=!1!=a&&null!=window.XMLHttpRequest};a.removeAll=function(){this.remove()};a.remove=function(a){var b=null;a&&!(a instanceof Array)?b=[a]:a&&(b=a);a=!1;if(b){for(;b.length;){for(var c=b.pop(),e=this.getResult(c),f=this._loadQueue.length-1;0<=f;f--)if(h=this._loadQueue[f].getItem(),h.id==c||h.src==c){this._loadQueue.splice(f,1)[0].cancel();break}for(f=this._loadQueueBackup.length-1;0<=
f;f--)if(h=this._loadQueueBackup[f].getItem(),h.id==c||h.src==c){this._loadQueueBackup.splice(f,1)[0].cancel();break}if(e)delete this._loadItemsById[e.id],delete this._loadItemsBySrc[e.src],this._disposeItem(e);else for(var f=this._currentLoads.length-1;0<=f;f--){var h=this._currentLoads[f].getItem();if(h.id==c||h.src==c){this._currentLoads.splice(f,1)[0].cancel();a=!0;break}}}a&&this._loadNext()}else{this.close();for(c in this._loadItemsById)this._disposeItem(this._loadItemsById[c]);this.initialize(this.useXHR)}};
a.reset=function(){this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);a=[];i=0;for(l=this._loadQueueBackup.length;i<l;i++)a.push(this._loadQueueBackup[i].getItem());this.loadManifest(a,!1)};c.isBinary=function(a){switch(a){case createjs.LoadQueue.IMAGE:case createjs.LoadQueue.BINARY:return!0;default:return!1}};a.installPlugin=function(a){if(!(null==a||null==a.getPreloadHandlers)){a=a.getPreloadHandlers();if(null!=a.types)for(var b=0,c=a.types.length;b<c;b++)this._typeCallbacks[a.types[b]]=
a.callback;if(null!=a.extensions){b=0;for(c=a.extensions.length;b<c;b++)this._extensionCallbacks[a.extensions[b]]=a.callback}}};a.setMaxConnections=function(a){this._maxConnections=a;this._paused||this._loadNext()};a.loadFile=function(a,b){null==a?this._sendError({text:"PRELOAD_NO_FILE"}):(this._addItem(a),!1!==b&&this.setPaused(!1))};a.loadManifest=function(a,b){var c=null;if(a instanceof Array){if(0==a.length){this._sendError({text:"PRELOAD_MANIFEST_EMPTY"});return}c=a}else{if(null==a){this._sendError({text:"PRELOAD_MANIFEST_NULL"});
return}c=[a]}for(var e=0,f=c.length;e<f;e++)this._addItem(c[e]);!1!==b&&this.setPaused(!1)};a.load=function(){this.setPaused(!1)};a.getItem=function(a){return this._loadItemsById[a]||this._loadItemsBySrc[a]};a.getResult=function(a,b){var c=this._loadItemsById[a]||this._loadItemsBySrc[a];if(null==c)return null;c=c.id;return b&&this._loadedRawResults[c]?this._loadedRawResults[c]:this._loadedResults[c]};a.setPaused=function(a){(this._paused=a)||this._loadNext()};a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();
this._scriptOrder.length=0;this._loadedScripts.length=0;this.loadStartWasDispatched=!1};a._addItem=function(a){a=this._createLoadItem(a);if(null!=a){var b=this._createLoader(a);null!=b&&(this._loadQueue.push(b),this._loadQueueBackup.push(b),this._numItems++,this._updateProgress(),this.maintainScriptOrder&&(a.type==createjs.LoadQueue.JAVASCRIPT&&b instanceof createjs.XHRLoader)&&(this._scriptOrder.push(a),this._loadedScripts.push(null)))}};a._createLoadItem=function(a){var b=null;switch(typeof a){case "string":b=
{src:a};break;case "object":b=window.HTMLAudioElement&&a instanceof HTMLAudioElement?{tag:a,src:b.tag.src,type:createjs.LoadQueue.SOUND}:a}a=this._parseURI(b.src);null!=a&&(b.ext=a[5]);null==b.type&&(b.type=this._getTypeByExtension(b.ext));null==b.tag&&(b.tag=this._createTag(b.type));if(null==b.id||""==b.id)b.id=b.src;if(a=this._typeCallbacks[b.type]||this._extensionCallbacks[b.ext]){a=a(b.src,b.type,b.id,b.data);if(!1===a)return null;!0!==a&&(null!=a.src&&(b.src=a.src),null!=a.id&&(b.id=a.id),null!=
a.tag&&a.tag.load instanceof Function&&(b.tag=a.tag),null!=a.completeHandler&&(b.completeHandler=a.completeHandler));a.type&&(b.type=a.type);a=this._parseURI(b.src);null!=a&&(b.ext=a[5])}this._loadItemsById[b.id]=b;return this._loadItemsBySrc[b.src]=b};a._createLoader=function(a){var b=this.useXHR;switch(a.type){case createjs.LoadQueue.JSON:case createjs.LoadQueue.XML:case createjs.LoadQueue.TEXT:b=!0;break;case createjs.LoadQueue.SOUND:b=!1}return b?new createjs.XHRLoader(a):new createjs.TagLoader(a)};
a._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0);this._numItems==this._numItemsLoaded&&(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load());for(var a=0,b=this._loadQueue.length;a<b&&!(this._currentLoads.length>=this._maxConnections);a++){var c=this._loadQueue[a];if(this.maintainScriptOrder&&c instanceof createjs.TagLoader&&c.getItem().type==createjs.LoadQueue.JAVASCRIPT){if(this._currentlyLoadingScript)continue;
this._currentlyLoadingScript=!0}this._loadQueue.splice(a,1);this._loadItem(c);a--;b--}}};a._loadItem=function(a){a.addEventListener("progress",createjs.proxy(this._handleProgress,this));a.addEventListener("complete",createjs.proxy(this._handleFileComplete,this));a.addEventListener("error",createjs.proxy(this._handleFileError,this));this._currentLoads.push(a);a.load()};a._handleFileError=function(a){var b=a.target;this._numItemsLoaded++;this._updateProgress();a={item:b.getItem()};this._sendError(a);
this.stopOnError||(this._removeLoadItem(b),this._loadNext())};a._handleFileComplete=function(a){a=a.target;var b=a.getItem();this._loadedResults[b.id]=a.getResult();a instanceof createjs.XHRLoader&&(this._loadedRawResults[b.id]=a.getResult(!0));this._removeLoadItem(a);if(this.maintainScriptOrder&&b.type==createjs.LoadQueue.JAVASCRIPT)if(a instanceof createjs.TagLoader)this._currentlyLoadingScript=!1;else{this._loadedScripts[this._scriptOrder.indexOf(b)]=b;this._checkScriptLoadOrder(a);return}this._processFinishedLoad(b)};
a._processFinishedLoad=function(a){this._numItemsLoaded++;this._updateProgress();this._sendFileComplete(a);this._loadNext()};a._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,b=0;b<a;b++){var c=this._loadedScripts[b];if(null===c)break;!0!==c&&(this._processFinishedLoad(c),this._loadedScripts[b]=!0,b--,a--)}};a._removeLoadItem=function(a){for(var b=this._currentLoads.length,c=0;c<b;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}};a._handleProgress=function(a){a=
a.target;this._sendFileProgress(a.getItem(),a.progress);this._updateProgress()};a._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,b=this._numItems-this._numItemsLoaded;if(0<b){for(var c=0,e=0,f=this._currentLoads.length;e<f;e++)c+=this._currentLoads[e].progress;a+=c/b*(b/this._numItems)}this._sendProgress(a)};a._disposeItem=function(a){delete this._loadedResults[a.id];delete this._loadedRawResults[a.id];delete this._loadItemsById[a.id];delete this._loadItemsBySrc[a.src]};a._createTag=
function(a){var b=null;switch(a){case createjs.LoadQueue.IMAGE:return document.createElement("img");case createjs.LoadQueue.SOUND:return b=document.createElement("audio"),b.autoplay=!1,b;case createjs.LoadQueue.JAVASCRIPT:return b=document.createElement("script"),b.type="text/javascript",b;case createjs.LoadQueue.CSS:return b=this.useXHR?document.createElement("style"):document.createElement("link"),b.rel="stylesheet",b.type="text/css",b;case createjs.LoadQueue.SVG:return this.useXHR?b=document.createElement("svg"):
(b=document.createElement("object"),b.type="image/svg+xml"),b}return null};a._getTypeByExtension=function(a){switch(a){case "jpeg":case "jpg":case "gif":case "png":case "webp":case "bmp":return createjs.LoadQueue.IMAGE;case "ogg":case "mp3":case "wav":return createjs.LoadQueue.SOUND;case "json":return createjs.LoadQueue.JSON;case "xml":return createjs.LoadQueue.XML;case "css":return createjs.LoadQueue.CSS;case "js":return createjs.LoadQueue.JAVASCRIPT;case "svg":return createjs.LoadQueue.SVG;default:return createjs.LoadQueue.TEXT}};
a._sendFileProgress=function(a,b){if(this._isCanceled())this._cleanUp();else{var c={target:this,type:"fileprogress",progress:b,loaded:b,total:1,item:a};this.onFileProgress&&this.onFileProgress(c);this.dispatchEvent(c)}};a._sendFileComplete=function(a){if(!this._isCanceled()){var b={target:this,type:"fileload",item:a,result:this._loadedResults[a.id],rawResult:this._loadedRawResults[a.id]};a.completeHandler&&a.completeHandler(b);this.onFileLoad&&this.onFileLoad(b);this.dispatchEvent(b)}};a.toString=
function(){return"[PreloadJS LoadQueue]"};createjs.proxy=function(a,b){return function(){return a.apply(b,arguments)}};createjs.LoadQueue=c;createjs.proxy||(createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}});var b=function(){};b.init=function(){var a=navigator.userAgent;b.isFirefox=-1<a.indexOf("Firefox");b.isOpera=null!=window.opera;b.isChrome=-1<a.indexOf("Chrome");b.isIOS=-1<a.indexOf("iPod")||
-1<a.indexOf("iPhone")||-1<a.indexOf("iPad")};b.init();createjs.LoadQueue.BrowserDetect=b;Array.prototype.indexOf||(Array.prototype.indexOf=function(a){if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if(0===c)return-1;var e=0;1<arguments.length&&(e=Number(arguments[1]),e!=e?e=0:0!=e&&(Infinity!=e&&-Infinity!=e)&&(e=(0<e||-1)*Math.floor(Math.abs(e))));if(e>=c)return-1;for(e=0<=e?e:Math.max(c-Math.abs(e),0);e<c;e++)if(e in b&&b[e]===a)return e;return-1})})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._loadTimeout=null;a._tagCompleteProxy=null;a._isAudio=!1;a._tag=null;a.init=function(a){this._item=a;this._tag=a.tag;this._isAudio=window.HTMLAudioElement&&a.tag instanceof HTMLAudioElement;this._tagCompleteProxy=createjs.proxy(this._handleLoad,this)};a.getResult=function(){return this._tag};a.cancel=function(){this.canceled=!0;this._clean();this.getItem()};a.load=function(){var a=this._item,c=this._tag;clearTimeout(this._loadTimeout);
this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT);this._isAudio&&(c.src=null,c.preload="auto");c.onerror=createjs.proxy(this._handleError,this);this._isAudio?(c.onstalled=createjs.proxy(this._handleStalled,this),c.addEventListener("canplaythrough",this._tagCompleteProxy,!1)):(c.onload=createjs.proxy(this._handleLoad,this),c.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this));switch(a.type){case createjs.LoadQueue.CSS:c.href=a.src;
break;case createjs.LoadQueue.SVG:c.data=a.src;break;default:c.src=a.src}if(a.type==createjs.LoadQueue.SVG||a.type==createjs.LoadQueue.JAVASCRIPT||a.type==createjs.LoadQueue.CSS)(document.body||document.getElementsByTagName("body")[0]).appendChild(c);null!=c.load&&c.load()};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._handleStalled=function(){};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);
"loaded"==this.getItem().tag.readyState&&this._handleLoad()};a._handleLoad=function(){if(!this._isCanceled()){var a=this.getItem(),c=a.tag;this.loaded||this.isAudio&&4!==c.readyState||(this.loaded=!0,a.type==createjs.LoadQueue.SVG&&(document.body||document.getElementsByTagName("body")[0]).removeChild(c),this._clean(),this._sendComplete())}};a._clean=function(){clearTimeout(this._loadTimeout);var a=this.getItem().tag;a.onload=null;a.removeEventListener&&a.removeEventListener("canplaythrough",this._tagCompleteProxy,
!1);a.onstalled=null;a.onprogress=null;a.onerror=null;a.parentNode&&a.parentNode.removeChild(a)};a.toString=function(){return"[PreloadJS TagLoader]"};createjs.TagLoader=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._request=null;a._loadTimeout=null;a._xhrLevel=1;a._response=null;a._rawResponse=null;a.init=function(a){this._item=a;this._createXHR(a)};a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response};a.cancel=function(){this.canceled=!0;this._clean();this._request.abort()};a.load=function(){if(null==this._request)this._handleError();else{this._request.onloadstart=createjs.proxy(this._handleLoadStart,
this);this._request.onprogress=createjs.proxy(this._handleProgress,this);this._request.onabort=createjs.proxy(this._handleAbort,this);this._request.onerror=createjs.proxy(this._handleError,this);this._request.ontimeout=createjs.proxy(this._handleTimeout,this);1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT));this._request.onload=createjs.proxy(this._handleLoad,this);this._request.onreadystatechange&&(this._request.onreadystatechange=
this._handleReadyStateChange(this));try{this._request.send()}catch(a){this._sendError({source:a})}}};a._handleProgress=function(a){0<a.loaded&&0==a.total||this._sendProgress({loaded:a.loaded,total:a.total})};a._handleLoadStart=function(){clearTimeout(this._loadTimeout);this._sendLoadStart()};a._handleAbort=function(){this._clean();this._sendError()};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()};a._handleLoad=
function(){this.loaded||(this.loaded=!0,this._checkError()?(this._response=this._getResponse(),this._clean(),this._generateTag()&&this._sendComplete()):this._handleError())};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._checkError=function(){switch(parseInt(this._request.status)){case 404:case 0:return!1}return!0};a._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=
this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(c){}return null};a._createXHR=function(a){var c=document.createElement("a");c.href=a.src;var d=document.createElement("a");d.href=location.href;c=""!=c.hostname&&(c.port!=d.port||c.protocol!=d.protocol||c.hostname!=d.hostname);d=null;if(c&&window.XDomainRequest)d=new XDomainRequest;else if(window.XMLHttpRequest)d=new XMLHttpRequest;else try{d=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(j){try{d=
new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){try{d=new ActiveXObject("Msxml2.XMLHTTP")}catch(f){return!1}}}a.type==createjs.LoadQueue.TEXT&&d.overrideMimeType&&d.overrideMimeType("text/plain; charset=x-user-defined");this._xhrLevel="string"===typeof d.responseType?2:1;d.open("GET",a.src,!0);c&&(d instanceof XMLHttpRequest&&1==this._xhrLevel)&&d.setRequestHeader("Origin",location.origin);createjs.LoadQueue.isBinary(a.type)&&(d.responseType="arraybuffer");this._request=d;return!0};a._clean=function(){clearTimeout(this._loadTimeout);
var a=this._request;a.onloadstart=null;a.onprogress=null;a.onabort=null;a.onerror=null;a.onload=null;a.ontimeout=null;a.onloadend=null;a.onreadystatechange=null};a._generateTag=function(){var a=this._item.tag;switch(this._item.type){case createjs.LoadQueue.IMAGE:return a.onload=createjs.proxy(this._handleTagReady,this),a.src=this._item.src,this._rawResponse=this._response,this._response=a,!1;case createjs.LoadQueue.JAVASCRIPT:a=document.createElement("script");this._rawResponse=a.text=this._response;
this._response=a;break;case createjs.LoadQueue.CSS:document.getElementsByTagName("head")[0].appendChild(a);if(a.styleSheet)a.styleSheet.cssText=this._response;else{var c=document.createTextNode(this._response);a.appendChild(c)}this._rawResponse=this._response;this._response=a;break;case createjs.LoadQueue.XML:this._response=c=this._parseXML(this._response,"text/xml");break;case createjs.LoadQueue.SVG:c=this._parseXML(this._response,"image/svg+xml");this._rawResponse=this._response;a.appendChild(c.documentElement);
this._response=a;break;case createjs.LoadQueue.JSON:try{eval("json="+this._response)}catch(d){break}this._rawResponse=this._response;this._response={}}return!0};a._parseXML=function(a,c){var d=null;window.DOMParser?d=(new DOMParser).parseFromString(a,c):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async=!1,d.loadXML(a));return d};a._handleTagReady=function(){this._sendComplete()};a.toString=function(){return"[PreloadJS XHRLoader]"};createjs.XHRLoader=c})();


}