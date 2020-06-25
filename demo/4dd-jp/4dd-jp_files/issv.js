(function($, undefined) {
	"use strict";
	
	//----------------------------------------------------------------------------------------------------
	// config
	var ver = "1.0";
	var namespace = "co.issv.object";
	var cname = "_issv";
	var ctest = "_issv_test";
	var urljquery = "//issv.co/libs/jquery/1.11.1/jquery.min.js";
	var urlcss = "//issv.co/issv.css";
	var urlcheck = "//issv.co/check/";
	var durOpenDelay = 1000;
	var durCloseAnimation = 500;
	var issv;
	
	
	//----------------------------------------------------------------------------------------------------
	// functions
	function log(params) {
		//console.log(params);
	}
	
	function loadScript(src, onload) {
		var e = document.createElement("script");
		if(onload) e.onload = onload;
		e.async = true;
		e.src = src;
		var h = document.getElementsByTagName("head")[0];
		h.appendChild(e);
	}
	
	function loadStyle(src, onload) {
		var e = document.createElement("link");
		if(onload) e.onload = onload;
		e.rel = "stylesheet";
		e.type = "text/css";
		e.href = src;
		var h = document.getElementsByTagName("head")[0];
		h.appendChild(e);
	}
	
	function getCookie(key) {
		var cookies = document.cookie;
		var idx = {};
		//cookies.split("; ").forEach(function(val) {
		//	var arr = val.split("=");
		//	idx[arr.shift()] = arr.join("=");
		//});
		var cookieArr = cookies.split("; ");
		for(var i = 0, len = cookieArr.length; i < len; i++) {
			var arr = cookieArr[i].split("=");
			idx[arr.shift()] = arr.join("=");
		}
		if(idx[key]) {
			return idx[key];
		} else {
			return null;
		}
	}
	
	function setCookie(key, value, path, validityms) {
		var arr = [(key + "=" + value)];
		if(path != undefined) arr.push("path=" + path);
		if(validityms != undefined) arr.push("expires=" + (new Date((new Date()).getTime() + validityms).toUTCString()));
		document.cookie = arr.join("; ");
	}
	
	function genId(len) {
		len = len || 8;
		var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var plen = pool.length;
		var str = "";
		for(var i = 0; i < len; i++) str += pool.charAt((Math.random() * plen * 1000) % plen);
		return str;
	}
	
	function genCid() {
		return genId(32);
	}
	
	
	//----------------------------------------------------------------------------------------------------
	// Issv
	var Issv = function(iid, cid, options) {
		this.iid = iid;
		this.cid = cid;
		this.p = location.pathname;
		this.tm = getCookie(ctest) == "1";
		this._options = options || {};
		this._options.onInit = this._options.onInit || function(data) {};
		this._options.onOpen = this._options.onOpen || function(data) {};
		this._options.onComplete = this._options.onComplete || function(data) {};
		this._options.onClose = this._options.onClose || function(data, isComplete) {};
		if(this._options.closeDelay == undefined) this._options.closeDelay = 2000;
	};
	Issv.TRIGGER_PAGE	= "page";
	Issv.TRIGGER_EVENT	= "event";
	Issv.ON_SCROLL		= "scroll";
	Issv.ON_DURATION	= "duration";
	Issv.TEST_BEGIN		= "begin";
	Issv.TEST_END		= "end";
	Issv.TEST_STATUS	= "status";
	Issv.TEST_OPEN		= "open";
	Issv.prototype.iid = null;
	Issv.prototype.cid = null;
	Issv.prototype.p = null;
	Issv.prototype.tm = false;
	Issv.prototype._view = null;
	Issv.prototype._options = {};
	Issv.prototype.trigger = function(args) {
		var t = args.shift();
		if(t == Issv.TRIGGER_PAGE) {
			this.triggerPage(args[0], args[1]);
		} else if(t == Issv.TRIGGER_EVENT) {
			this.triggerEvent(args[0], args[1]);
		}
	};
	Issv.prototype.on = function(args) {
		var t = args.shift();
		if(t == Issv.ON_SCROLL) {
			this.onScroll(args[0], args[1], args[2]);
		} else if(t == Issv.ON_DURATION) {
			this.onDuration(args[0], args[1], args[2]);
		}
	};
	Issv.prototype.off = function(args) {
		var t = args.shift();
		if(t == Issv.ON_SCROLL) {
			this.offScroll(args[0]);
		} else if(t == Issv.ON_DURATION) {
			this.offDuration(args[0]);
		}
	};
	Issv.prototype.set = function(args) {
		var t = args.shift();
		this._options[t] = args[0];
	};
	Issv.prototype.test = function(args) {
		var t = args.shift();
		if(t == Issv.TEST_BEGIN) {
			this.testBegin();
		} else if(t == Issv.TEST_END) {
			this.testEnd();
		} else if(t == Issv.TEST_STATUS) {
			this.testStatus(args[0]);
		} else if(t == Issv.TEST_OPEN) {
			this.testOpen(args[0]);
		}
	};
	Issv.prototype.testBegin = function() {
		this.tm = true;
		setCookie(ctest, "1", "/", 365 * 24 * 60 * 60 * 1000);
	};
	Issv.prototype.testEnd = function() {
		this.tm = false;
		setCookie(ctest, "", "/", -365 * 24 * 60 * 60 * 1000);
	};
	Issv.prototype.testStatus = function(callback) {
		callback(this.tm);
	};
	Issv.prototype.testOpen = function(name, options) {
		this._query("test", {tr: name}, options);
	};
	Issv.prototype.triggerPage = function(path, options) {
		if(path) this.p = path;
		this._query("page", {}, options);
	};
	Issv.prototype.triggerEvent = function(name, options) {
		this._query("event", {ev: name}, options);
	};
	Issv.prototype.onScrollIdx = {};
	Issv.prototype.onScroll = function(name, ratio, options) {
		var me = this;
		ratio = ratio || 1;
		me.onScrollIdx[name] = function(e) {
			if(window.scrollY / (document.body.scrollHeight - $(window).height()) >= ratio) {
				me.triggerEvent(name, options);
				me.offScroll(name);
			}
		};
		if(document.body.scrollHeight > $(window).height()) {
			$(document).on("scroll", me.onScrollIdx[name]);
		}
	};
	Issv.prototype.offScroll = function(name) {
		var me = this;
		if(me.onScrollIdx[name]) {
			$(document).off("scroll", me.onScrollIdx[name]);
		}
	};
	Issv.prototype.onDurationIdx = {};
	Issv.prototype.onDuration = function(name, duration, options) {
		var me = this;
		duration = duration || 10;
		me.onDurationIdx[name] = setTimeout(function() {
			me.triggerEvent(name, options);
		}, duration * 1000);
	};
	Issv.prototype.offDuration = function(name) {
		var me = this;
		if(me.onDurationIdx[name]) {
			clearTimeout(me.onDurationIdx[name]);
		}
	};
	Issv.prototype._query = function(type, data, options) {
		var me = this;
		
		options = options || {};
		for(var i in me._options) {
			if(options[i] == undefined) options[i] = me._options[i];
		}
		
		if(me._view) return false;
		
		data = data || {};
		data.v = ver;
		data.iid = this.iid;
		data.cid = this.cid;
		data.t = type;
		data.p = this.p;
		data.z = (new Date()).getTimezoneOffset();
		if(me.tm) data.tm = "1";
		
		$.ajax(urlcheck, {
			data: data,
			dataType: "jsonp",
			success: function(data, textStatus, jqXHR) {
				if(data && data.href) me._show(data, options);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// do nothing
			}
		});
	};
	Issv.prototype._show = function(data, options) {
		var me = this;
		if(me._view) return false;
		me._view = new View(data);
		me._view.onInit = function(data) {
			if(typeof options.onInit == "function") options.onInit(data);
		};
		me._view.onOpen = function(data) {
			if(typeof options.onOpen == "function") options.onOpen(data);
		};
		me._view.onComplete = function(data) {
			if(typeof options.onComplete == "function") options.onComplete(data);
			if(options.closeDelay >= 0) {
				setTimeout(function() {
					me._view.close();
				}, options.closeDelay);
			}
		};
		me._view.onClose = function(data, isComplete) {
			if(typeof options.onClose == "function") options.onClose(data, isComplete);
		};
		me._view.onDestroy = function() {
			me._view = null;
		};
		me._view.load();
	};
	
	
	//----------------------------------------------------------------------------------------------------
	// View
	var View = function(data) {
		this._data = data;
		this._build();
	};
	View.TYPE_FLOATING	= "floating";
	View.TYPE_TAB		= "tab";
	View.TYPE_BANNER	= "banner";
	View.CSS = {
		ids: {
			panel	: "issv-panel",
			label	: "issv-label"
		},
		classes: {
			panelTypeFloating	: "issv-type-floating",
			panelTypeTab		: "issv-type-tab",
			panelTypeBanner		: "issv-type-banner",
			btnOpen				: "issv-btn-open",
			btnClose			: "issv-btn-close",
			layout: {
				left			: "issv-layout-left",
				right			: "issv-layout-right",
				top				: "issv-layout-top",
				bottom			: "issv-layout-bottom",
				full			: "issv-layout-full"
			},
			status: {
				open			: "issv-status-open",
				closed			: "issv-status-closed",
				done			: "issv-status-done"
			}
		}
	};
	View.prototype._data = null;
	View.prototype._$panel = null;
	View.prototype._$iframe = null;
	View.prototype._$label = null;
	View.prototype._isOpen = false;
	View.prototype._isComplete = false;
	View.prototype._submits = 0;
	View.prototype.onInit = function(data) {};
	View.prototype.onOpen = function(data) {};
	View.prototype.onComplete = function(data) {};
	View.prototype.onClose = function(data, isComplete) {};
	View.prototype.onDestroy = function() {};
	View.prototype._build = function() {
		var me = this;
		var $body = $("body");
		
		// force to tab if mobile
		if($(window).width() <= 420) me._data.type = View.TYPE_TAB;
		
		// panel
		me._$panel = $("<div><a href='#'></a><iframe /></div>");
		me._$panel.attr("id", View.CSS.ids.panel);
		me._$iframe = me._$panel.find("iframe");
		$body.append(me._$panel);
		
		// label
		me._$label = $body.find("#" + View.CSS.ids.label);
		
		// set type
		if(me._data.type == View.TYPE_FLOATING) {
			me._$panel.addClass(View.CSS.classes.panelTypeFloating);
		} else {
			if(me._data.type == View.TYPE_BANNER && me._$label.length > 0) {
				me._$panel.addClass(View.CSS.classes.panelTypeBanner);
				me._$label.addClass(View.CSS.classes.panelTypeBanner);
			} else {
				me._data.type = View.TYPE_TAB;
				me._$panel.addClass(View.CSS.classes.panelTypeTab);
				me._$label = $("<div></div>").attr("id", View.CSS.ids.label)
					.addClass(View.CSS.classes.panelTypeTab);
				$body.append(me._$label);
			}
			
			var $open = $("<a href='#' />")
				.addClass(View.CSS.classes.btnOpen)
				.text(me._data.description)
				.on("click", function(e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					me.open();
				});
			if(me._data.image && me._data.image != "") {
				$open.prepend($("<img/ >").attr("src", me._data.image));
			}
			me._$label.append($open);
			if(me._data.type == View.TYPE_TAB) {
				var $close = $("<a href='#' />")
					.addClass(View.CSS.classes.btnClose)
					.on("click", function(e) {
						e.preventDefault();
						e.stopImmediatePropagation();
						me.labelClose();
						setTimeout(function() {
							me._destroy();
						}, durCloseAnimation);
					});
				me._$label.append($close);
			}
		}
		
		// close btn
		me._$panel.find("a")
			.addClass(View.CSS.classes.btnClose)
			.on("click", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				me.close();
			});
		
		// panel layout & label position
		if(me._data["panel-layout"]) {
			var layout = me._data["panel-layout"].toLowerCase();
			me._$panel.addClass(View.CSS.classes.layout[layout]);
			$body.addClass(View.CSS.classes.layout[layout]);
			var position = me._data["label-position"].toLowerCase();
			me._$label.addClass(View.CSS.classes.layout[position.indexOf("right") > -1 ? "right" : "left"]);
			me._$label.addClass(View.CSS.classes.layout[position.indexOf("top") > -1 ? "top" : "bottom"]);
		}
		
		//
		$(window).on("message", me._messageHdl);
	};
	View.prototype._destroy = function() {
		var me = this;
		me.onDestroy();
		$(window).off("message", me._messageHdl);
		$("body").removeClass([View.CSS.classes.layout.left, View.CSS.classes.layout.right, View.CSS.classes.layout.full].join(" "));
		me._$label.remove();
		me._$panel.remove();
		me._$iframe = null;
	};
	View.prototype._messageHdl = function(e) {
		var me = issv._view;
		var message = e.originalEvent.data;
		if(e.originalEvent.source == me._$iframe[0].contentWindow) {
			if(message == "initialize") {
			} else if(message == "submit") {
				me._submits++;
			} else if(message == "complete") {
				if(me._submits <= 0) {
					me._destroy();
				} else {
					me._isComplete = true;
					me.onComplete(me._data);
				}
			} else if(message == "expired" || message == "notfound") {
				me._destroy();
			}
		}
	};
	View.prototype.load = function() {
		var me = this;
		me._$iframe.one("load", function(e) {
			me.init();
		});
		me._$iframe.attr("src", me._data.href);
	};
	View.prototype.init = function() {
		var me = this;
		me.onInit(me._data);
		if(me._data.type == View.TYPE_BANNER) {
			me.labelOpen();
		} else if(me._data.type == View.TYPE_FLOATING) {
			setTimeout(function() { me.open(); }, durOpenDelay);
		} else {
			setTimeout(function() { me.labelOpen(); }, durOpenDelay);
		}
	};
	View.prototype.labelOpen = function() {
		var me = this;
		me._$label.addClass(View.CSS.classes.status.open);
	};
	View.prototype.labelClose = function() {
		var me = this;
		me._$label.removeClass(View.CSS.classes.status.open).addClass(View.CSS.classes.status.done);
	};
	View.prototype.open = function() {
		var me = this;
		if(me._isOpen) return false;
		me._isOpen = true;
		me._$panel.addClass(View.CSS.classes.status.open);
		$("body").addClass(View.CSS.classes.status.open);
		me.labelClose();
		me.onOpen(me._data);
		return true;
	};
	View.prototype.close = function() {
		var me = this;
		if(!me._isOpen) return false;
		me._$panel.removeClass(View.CSS.classes.status.open);
		$("body").removeClass(View.CSS.classes.status.open);
		setTimeout(function() {
			me._isOpen = false;
			me.onClose(me._data, me._isComplete);
			me._destroy();
		}, durCloseAnimation);
		return true;
	};
	
	
	//----------------------------------------------------------------------------------------------------
	// load & init
	var init = function() {
		try {
			var cid = getCookie(cname);
			if(cid == null) cid = genCid();
			setCookie(cname, cid, "/", 90 * 24 * 60 * 60 * 1000);
			
			var name = window[namespace];
			var temp = window[name].a || [];
			var func = window[name] = function() {
				var args = [];
				for(var i = 0, len = arguments.length; i < len; i++) args.push(arguments[i]);
				var c = args.shift();
				if(c == "init") {
					issv = new Issv(args[0], cid, args[1]);
				} else if(c == "trigger") {
					if(issv) issv.trigger(args);
				} else if(c == "on") {
					if(issv) issv.on(args);
				} else if(c == "off") {
					if(issv) issv.off(args);
				} else if(c == "set") {
					if(issv) issv.set(args);
				} else if(c == "load") {
					if(args.length == 2 && args[0] == "style") loadStyle(args[1]);
				} else if(c == "test") {
					if(issv) issv.test(args);
				}
			};
			//temp.forEach(function(val) { func.apply(this, val); });
			for(var i = 0, len = temp.length; i < len; i++) {
				func.apply(this, temp[i]);
			}
		} catch(e) {
			log(e);
		}
	};
	loadStyle(urlcss);
	if($ && $.fn && parseFloat($.fn.jquery) >= 1.9) {
		init();
	} else {
		loadScript(urljquery, function() {
			$ = jQuery.noConflict(true);
			init();
		});
	}
})(window.jQuery);