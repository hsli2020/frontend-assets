var dd = {};

(function ($) {
	$(function () {

		//スキップ
		if(location.href.indexOf("?skip")>=0) dd.SKIP = true;

		//ソーシャルへのリンク
		dd.socialLink();

		//グリッドの補助
		dd.gridAssist( $(".siteFooter") )
		dd.gridAssist( $(".siteHeader") )


		//シーンの切り替え
		var sceneSwitcher = new dd.SceneSwitcher();
	})
})(jQuery);



/* -------------------------------------------------------------------------------------

	ソーシャルへのリンク

 ------------------------------------------------------------------------------------- */
dd.socialLink = function(){
	var url = 'http://4dd.jp';
	var text = 'FOURDIGIT DESIGN Inc. | フォーデジットデザインはウェブ制作を通して、価値の高いものづくりを提供します。';
//	$(".social.fb a").attr("href", "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url));
	$(".social.tw a").attr("href", "https://twitter.com/intent/tweet?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(text));
}



/* -------------------------------------------------------------------------------------

 シーンの切り替え

 ------------------------------------------------------------------------------------- */

dd.SceneSwitcher = okb.EventDispatcher.extend({

	__construct: function () {
		var me = this;

		//cast
		me.isFirst = true;
		me.$container = $(".ajaxContainer");
		me.$sizeChecker = $(".sizeChecker");
		me.currentConte;
		me.canvasLayer = new dd.CanvasLayer();//canvas チェック
		me.loading = new dd.Loading();
		me.white = new dd.ContentWhite();
		me.header = new dd.Header();
		me.$gnavBtns = $(".gnav li a, .sp-gnav li a");

		//各pathNameごとのクラス一覧
		me.SceneData = [
			{ path:"\/",				cl:dd.SceneIndex },
			{ path:"\/service",			cl:dd.SceneService },
			{ path:"\/projects",		cl:dd.SceneProjects },
			{ path:"\/projects\/.+",	cl:dd.SceneProjectsDetail },
			{ path:"\/about",			cl:dd.SceneAbout },
			{ path:"\/contact",			cl:dd.SceneContact },
			{ path:"\/join",			cl:dd.SceneJoin },
            { path:"\/blog",			cl:dd.SceneBlog }
		];
//		me.NoCacheList = ["/contact"];
		me.NoCacheList = [];
		me.cacheHtmlIdx = {};
		me.cacheTitleIdx = {};
		me.scrollAmountWhenLeave = {};

		//pushState 使えるかチェック
		me.pushAvailable = (typeof window.history.pushState === 'function');

		if(!dd.noCanvas) {
			_ctrl.$body.delegate("a", "click", function(e){

				//ボタンの遷移をpushStateの通知で上書き
				var href = $(this).attr("href");
				var target = $(this).attr("target");

				if(me.isCtrlPressing) return;
				if(href.indexOf("#")==0 || href==="" || href.indexOf("javascript")>=0 || target=="_blank") return;
				e.preventDefault();

				//スクロール量を覚えておく
				me.scrollAmountWhenLeave[me.pathName] = _ctrl.scrollTop;

				if(me.pushAvailable) {
					var ok = me._pageChanged(href);
					if(ok) window.history.pushState(null, null, href);
				} else {
					location.href = href;
				}
			});

			//cmdキー押してたら
			me.isCtrlPressing = false;
			_ctrl.$body.on('keydown', function(e){
				if(e.keyCode == 91) me.isCtrlPressing = true;
			})
			_ctrl.$body.on('keyup', function(e){
				if(e.keyCode == 91) me.isCtrlPressing = false;
			})
		}

		//リサイズ
		_ctrl.bind(_ctrl.EV_RESIZE, function(e){
			dd.SP = (me.$sizeChecker.css("display")!="none");
			if(me.currentConte) {
				me.currentConte.doResize();
			}
		})
		//スクロール
		_ctrl.bind(_ctrl.EV_SCROLL, function(e){
			if(me.currentConte) {
				me.currentConte.doScroll();
			}
		})

		//初期のコンテンツ表示
		$(window).load(function(){
			setTimeout(function(){
				me._init();
			}, 100);
		});
		setTimeout(function(){
			me._init();
		}, 3000);
	},

	_init:function(){
		var me = this;
		if(me.isInited) return;
		me.isInited = true;

		if(me.pushAvailable) {
			window.addEventListener('popstate', function(event) {
				me._pageChanged(location.pathname, true);
			},false );
			me._pageChanged(location.pathname);//ffなどで一発目が呼ばれない対策
		} else {
			me._pageChanged(location.pathname);
		}
	},

	_pageChanged:function(pathName, fromPop){
		var me = this;

		var isFirst = me.isFirst;
		me.isFirst = false;

		//pathNameを整形
		var pathArr = pathName.split("/");
		var i, len = pathArr.length
		for (i = len-1; i >= 0; i--) {
			var p = pathArr[i];
			if(p.indexOf(".")>=0 || p=="" || !p) pathArr.splice(i, 1);
		}
		var pathName = "/"+pathArr.join("/");
		if(pathName==me.pathName) return false;//2度呼ばれ対策
		me.pathName = pathName;

		//header閉じる
		me.header.closeSPMenu();

		//pathNameをもとにシーンのクラスを決定
		var i, len = me.SceneData.length;
		var sceneClass = dd.SceneBase;
		for (i = len-1; i >= 0; i--) {
			var obj = me.SceneData[i];
			var reg = new RegExp(obj["path"]);
			if(pathName.match(reg)) {
				sceneClass = obj["cl"];
				break;
			}
		}

		//グロナビのカレント表示
		me.$gnavBtns.each(function(){
			var $btn = $(this);
			var href = $btn.attr("href");
			if(href.indexOf("http")>=0) return;
			$btn.removeClass("ac");
			if(href=="/") {
				if(pathName=="/") $btn.addClass("ac");
			} else {
				href = href.split('/')[1];
				if(pathName.indexOf(href)>=0) $btn.addClass("ac");
			}
		})


		//
		me.fromPop = fromPop;

		//ロード
		if(me.currentXHR) me.currentXHR.abort();
		if(me.loadWaitID) clearTimeout(me.loadWaitID);
		if(isFirst) {
			//最初のとき
			me.header.switchStyle(pathName, true);
			me.loading.switchShow(true);
			setTimeout(function(){
				me._switchContent(null, sceneClass, pathName, true, isFirst);
			}, 200);
			me.cacheTitleIdx[pathName] = document.title;
		} else {
			//ロード開始
			if(me.NoCacheList.indexOf(pathName)>=0 || !me.cacheHtmlIdx[pathName]) {
				me.loading.switchShow(true);
				me.currentXHR = $.ajax({
					url: pathName,
					cache: false,
					dataType: 'html',
					success: function(html){
						me.white.switchShow(true, true);
						me.loadWaitID = setTimeout(function(){
							//title変更
							var title = html.split("<title>")[1].split("</title>")[0];
							document.title = title;
							me.cacheTitleIdx[pathName] = title;
							//コンテンツ部分を取得
							html = html.split("<!-- ###AJAX START### -->")[1].split("<!-- ###AJAX END### -->")[0]
							me._switchContent(html, sceneClass, pathName, true, isFirst);
						}, 300 );
					}
				});
			}
			//キャッシュから
			else if(me.cacheHtmlIdx[pathName]) {
				if(me.cacheTitleIdx[pathName]) document.title = me.cacheTitleIdx[pathName];
				if(me.fromPop) {
					me._switchContent(me.cacheHtmlIdx[pathName], sceneClass, pathName, false, isFirst);
				} else {
					me.white.switchShow(true, true, true, function(){
						me._switchContent(me.cacheHtmlIdx[pathName], sceneClass, pathName, false, isFirst);
					});
				}
			}
		}

		return true;////////
	},


	_switchContent:function(html, sceneClass, pathName, withWait, isFirst) {
		var me = this;
        var m_pat = /\/blog\/.+/;
        if(m_pat.test(pathName)){
//            isFirst = false;
            withWait = false;
        }
		//remove
		if(me.currentConte) {
			me.currentConte.destroy();
			me.currentConte = null;
			me.$container.empty();
		}
		//add
		if(html) me.$container.html(html);
		me.cacheHtmlIdx[pathName] = me.$container.html();
		me.currentConte = new sceneClass(me.$container.find(".content"), pathName);
		me.currentConte.doResize();
		me.currentConte.doScroll();
		dd.contentInit( me.currentConte.$, me.pathName );

		//表示
		if(withWait) {
			//グリッド表示
			setTimeout(function(){
				me.canvasLayer.startGridAnime(isFirst);
			}, 0);

			//画像のロード待ち
			var imgWaitTime = dd.SKIP? 0: 1200;
			if(dd.noCanvas) imgWaitTime = 0;
			me.loadWaitID = setTimeout(function(){
				//show!
				me._show(pathName, true, isFirst);
			},  imgWaitTime);
		} else {
			//show!
			me._show(pathName, false, isFirst);
		}

		//スクロール位置を戻す
		if(!dd.SKIP) {
			setTimeout(function(){
				var ts = 0;
				if(me.fromPop && me.scrollAmountWhenLeave[me.pathName]) {
					ts = me.scrollAmountWhenLeave[me.pathName];
				}
				me.scrollAmountWhenLeave[me.pathName] = 0;
				_ctrl.$html_body.scrollTop(ts);
			}, 0);
		}

		//google analytics
		_GA.trackPage(me.pathName);
	},

	_show:function(pathName, withAnime, isFirst){
		var me = this;
		me.loading.switchShow(false);
		me.currentConte.show(withAnime);
		me.white.switchShow(false);
		me.header.switchStyle(pathName, isFirst);

		//カルーセル
		$('.slider').each(function() { $(this).liquidSlider({'dontHideNextBack':true}); });
	}

});


/* -------------------------------------------------------------------------------------

	ローディング

 ------------------------------------------------------------------------------------- */

dd.Loading = Class.extend({

	__construct: function() {
		var me = this;

		//loading
		me.isLoadingShow = true;
		me.$ = $(".contentLoading");
	},

	switchShow:function(isShow){
		var me = this;
		if(isShow==me.isLoadingShow) return;
		me.isLoadingShow = isShow;

		if(isShow) me.$.removeClass("hide");
		else me.$.addClass("hide");
	}

});


/* -------------------------------------------------------------------------------------

	コンテンツのカバーホワイト

 ------------------------------------------------------------------------------------- */
dd.ContentWhite = Class.extend({

	__construct: function() {
		var me = this;
		me.$ = $(".contentWhite");
	},

	switchShow:function(isShow, withAnime, isShort, callback){
		var me = this;
		if(isShow==me.isCoverShow) return;
		me.isCoverShow = isShow;

		if(isShow) {
			//色を変更
			if(isShort) me.$.addClass("short");
			else me.$.removeClass("short");

			//キャンバスを手前に
			_ctrl.$body.removeClass("whiteHide");
			//show
			var time = withAnime? 300: 0;
			if(isShort) time *= 0.75;
			time = Math.round(time);
			me.$.stop().css({
				"visibility":"visible"
			}).animate({
				"opacity": 1
			}, time, "easeInOutQuad", function(){
				if(callback) callback();//////
			} );
		} else {
			//hide
			if(!_ctrl.touchDevice) {
				var time = dd.SKIP? 0: 900;
				if(isShort) time *= 0.6;
				time = Math.round(time);
				me.$.stop().animate({
					"opacity": 0
				}, time, "easeInOutQuart", function(){
					me.$.css({
						"visibility":"hidden"
					})
					//キャンバスを背面に
					_ctrl.$body.addClass("whiteHide");
					//最初だったらカバーと前面キャンバスをヘッダーの背面に移動
					if(!me.$.hasClass("loaded")) {
						_ctrl.$body.addClass("firstLoaded");
					}
					//
					if(callback) callback();///////
				});
			} else {
				//モバイル端末のみ
				_ctrl.$body.addClass("firstLoaded");
				setTimeout(function(){
					me.$.css("opacity", 0);
					setTimeout(function(){
						me.$.remove();
					}, 900)
				}, 300)
			}
		}
	}

});


/* -------------------------------------------------------------------------------------

	ヘッダー

 ------------------------------------------------------------------------------------- */
dd.Header = Class.extend({

	__construct: function() {
		var me = this;

		me.$ = $(".siteHeader");
		me.c_logo_wh = new okb.ui.Cast( me.$.find(".logo.white") );
		me.c_logo_bk = new okb.ui.Cast( me.$.find(".logo.black") );
		me.c_logo_top = new okb.ui.Cast( me.$.find(".logo.top") );
		me.c_gnav_wh = new okb.ui.Cast( me.$.find(".gnav.white") );
		me.c_gnav_bk = new okb.ui.Cast( me.$.find(".gnav.black") );

		//指定したパスのとき白くする
		me.pathForWhiteArr = ["/service", "/projects", "/about", "/contact"];
		//指定したパスのとき黒くする
		me.pathForBlackArr = ["/projects/housees", "/blog", "/blog/.*"];

		//タッチデバイス
		me.isSPMenuOpen = false;
		me.$page = $(".page");
		me.$pageInr = $(".pageInr");
		me.$contentArea = $(".contentArea");
		me.$.find(".knob").on('touchstart click', function(e){
			e.preventDefault();
			e.stopPropagation();
			me._toggleSPMenu();
		})
	},


	_toggleSPMenu:function(){
		var me = this;

		me.isSPMenuOpen = !me.isSPMenuOpen;
		if(me.isSPMenuOpen) {
			me.$pageInr.addClass("open");
			me.$contentArea.on('touchend click', function(e){
				e.preventDefault();
				e.stopPropagation();
				me._toggleSPMenu();
			});
		}
		else {
			me.$pageInr.removeClass("open");
			me.$contentArea.off('touchend click');
		}
	},

	closeSPMenu:function(){
		var me = this;
		if(me.isSPMenuOpen) me._toggleSPMenu();
	},

	switchStyle:function(pathName, isFirst){
		var me = this;

		var isTop = (pathName=="/");
		var isWhite = false;
		var i, len = me.pathForWhiteArr.length;
		var j, len2 = me.pathForBlackArr.length;
		for (i = 0; i < len; i++) {
			var path = me.pathForWhiteArr[i];
			if(pathName.indexOf(path)==0) isWhite = true;
		}
		for (j = 0; j < len2; j++) {
			var path = me.pathForBlackArr[j];
			if(pathName.indexOf(path)==0) isWhite = false;
		}
        var m_pat = /\/blog\/.+/;
        if(m_pat.test(pathName))isWhite = false;

		if (isWhite) me.$page.removeClass('darkHeader');
		else me.$page.addClass('darkHeader');

		var time = isFirst? 0: 1200;
		var time_top = isFirst? 0: 500;

		//ロゴ
		if(isTop) {
			me.c_logo_wh.castHide(time_top);
			me.c_logo_bk.castHide(time_top);
			me.c_logo_top.castShow(time_top);
		} else {
			if(isWhite) {
				me.c_logo_wh.castShow(time);
				me.c_logo_bk.castHide(time);
			} else {
				me.c_logo_wh.castHide(time);
				me.c_logo_bk.castShow(time);
			}
			me.c_logo_top.castHide(time_top);
		}

		//gnav
		if(isWhite) {
			me.c_gnav_wh.castShow(time);
			me.c_gnav_bk.castHide(time);
		} else {
			me.c_gnav_wh.castHide(time);
			me.c_gnav_bk.castShow(time);
		}
	}

});


/* -------------------------------------------------------------------------------------

 キャンバス

 ------------------------------------------------------------------------------------- */
dd.CanvasLayer = Class.extend({

	__construct: function($me, pathName) {
		var me = this;

		me.$ = $me;

		//cast
		me.$back = $(".canvasLayerBack");
		me.$fore = $(".canvasLayerFore");
		me.canvasBack = $("#canvasBack")[0];
		me.canvasFore = $("#canvasFore")[0];
		me.$offsetTester = $(".offsetTester");

		//backは最初隠しておく
		me.$back.addClass("hide");


		//canvas サポートチェック
		if(me.canvasBack && me.canvasBack.getContext) {
			me.hasCanvas = true;
		} else {
			me.hasCanvas = false;
		}
		if(dd.SKIP) me.hasCanvas = false;
		if(_ctrl.touchDevice) me.hasCanvas = false;
		if(!me.hasCanvas) {
			dd.noCanvas = true;
			me.$back.remove();
			me.$fore.remove();
			return;
		}


		//stage
		me.stageBack = new createjs.Stage( me.canvasBack );
		me.stageFore = new createjs.Stage( me.canvasFore );

		//resize
		me._resized = function(){
			if(!me.hasCanvas) return;
//			me.sw = _ctrl.innerWidth;
			me.sw = _ctrl.clientW;
			me.sh = _ctrl.innerHeight;
			me.sw2 = me.sw >> 1;
			me.sh2 = me.sh >> 1;

			me.canvasBack.width = me.sw;
			me.canvasBack.height = me.sh;
			me.canvasFore.width = me.sw;
			me.canvasFore.height = me.sh;
		}
		me._scrolled = function(){
			if(!me.hasCanvas) return;
			me._resized();
		}
		_ctrl.bind(_ctrl.EV_RESIZE, function(e){
			me._resized();
		});
		_ctrl.bind(_ctrl.EV_SCROLL, function(e){
			me._scrolled();
		});


		//ボタンのオーバー
		if(!_ctrl.touchDevice) {
			_ctrl.$body.on('mouseenter', '.wBtn', function(){
				var $this = $(this);
				me._mouseOver($this);
			});
		}


		/*  start!
		 --------------------------------------------------*/
		me.isBackShow = true;
		me.isForeShow = true;
		me._resized();
		window.tick = function(){
			me._update();
		}
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(window);
		me._update();
	},

	_update:function(){
		var me = this;
		if(me.isBackShow) me.stageBack.update();
		if(me.isForeShow) me.stageFore.update();
	},



	_mouseOver:function($target){
		var me = this;

		var bounds = me._getBounds($target);
		if($target.hasClass("wBtn")) {
			var inset = 5;
			bounds.x += inset;
			bounds.y += inset;
			bounds.w -= inset*2 +1;
			bounds.h -= inset*2 +1;
		}

		var isWhite = $target.hasClass("wh");
		me._drawFringe(0, bounds, "x", false, true, isWhite);
		me._drawFringe(0, bounds, "y", false, true, isWhite);

		//
		if(me.$back.hasClass("hide")) {
			me.$back.removeClass("hide");
			me.isBackShow = true;
		}
		me.$back.css("top", _ctrl.scrollTop);
		if(me.backHideID) clearTimeout(me.backHideID);
		me.backHideID = setTimeout(function(){
			me.$back.addClass("hide");
			me.isBackShow = false;
		}, 1000);
	},


	_digDomNode:function(arr, $par){
		var me = this;

		if($par.css("display")=="none" || $par.css("visibility")=="hidden") return;

		if($par.find(">").length==0 || $par.hasClass("minNode")) {
			me.$targetArr.push($par)
		} else {
			$par.find(">").each(function(){
				me._digDomNode( arr, $(this) );
			})
		}
	},


	startGridAnime:function(isFirst){
		var me = this;
		if(!me.hasCanvas) return;
		if(dd.SKIP) return;


		setTimeout(function(){

			var $content = $(".content");
			var baseX = me.$offsetTester.offset().left;

			//DOMの最小構成要素を拾う
			me.$targetArr = [];
//			if(isFirst) me._digDomNode( me.$targetArr, $(".siteHeader") );
			me._digDomNode( me.$targetArr, $content );

			//boudsをチェック
			_ctrl.trigger(_ctrl.EV_RESIZE);
			setTimeout(function(){
				var i, len = me.$targetArr.length;
				var bottomY = _ctrl.scrollTop + me.sh;
				for (i = 0; i < len; i++) {
					var $t = me.$targetArr[i];
					var bounds = me._getBounds($t);
					if(bounds.y>bottomY) continue;
					var dx = bounds.x - baseX;
					if( Math.abs(dx)< 20 ) {
						bounds.x -= dx;
						bounds.w += dx;
					}
					me._drawLines(i, bounds);
				}

				//show & hide
				me.isForeShow = true;
				me.$fore.removeClass("hide");
				if(me.showID) clearTimeout(me.showID);
				me.showID = setTimeout(function(){
					me.$fore.addClass("hide");
					me.isForeShow = false;
				}, 4000 )
			}, 0);

		}, 0)
	},

	_getBounds:function($t){
		var me = this;
		var x = $t.offset().left;
		var y = $t.offset().top;
		var w = $t.width();
		var h = $t.height();
		var paddL = parseInt( $t.css("padding-left") );
		var paddR = parseInt( $t.css("padding-right") );
		var paddT = parseInt( $t.css("padding-top") );
		var paddB = parseInt( $t.css("padding-bottom") );
		x += paddL;
		y += paddT;
		y -= _ctrl.scrollTop;
		return { x:x, y:y, w:w, h:h };
	},

	_drawLines:function(ind, bounds){
		var me = this;

		me._drawFringe(ind, bounds, "x");
		me._drawFringe(ind, bounds, "y");
		me._drawFringe(ind, bounds, "x", true);
		me._drawFringe(ind, bounds, "y", true);
//		me._drawGrid(ind, bounds, "x");
		me._drawGrid(ind, bounds, "y");
		me._drawBeta(ind, bounds);

	},

	_drawFringe:function(ind, bounds, axis, isSolid, isMouseOver, isWhite){
		var me = this;

		if(bounds.w==0) return;

		var i, len = 4;
		var overRatio = Math.min(1, bounds.w/(me.sw/3) );
		var overlap = Math.round( 6 + 14 * overRatio );
		if(isMouseOver) overlap *= 6;
		var overlap2 = overlap*0.5;
		var zure = 6;
		var zure2 = zure*0.5;
		if(isSolid) {
			len = 2;
			overlap = overlap2 = 0;
			zure = zure2 = 0;
		}
		if(isMouseOver) {
			zure = zure2 = 0;
		}
		for (i = 0; i < len; i++) {
			var x = bounds.x;
			var y = bounds.y;
			var w = bounds.w;
			var h = bounds.h;
			if(!isSolid && !isMouseOver && Math.random()<0.2) continue;//間引きする
			var ov = Math.round( Math.random() * overlap );
//			if(isMouseOver) ov = overlap;
			if(axis=="x") {
				if(i%2==0) y += h;
				h = 1;
				x -= ov;
				w += ov*2;
				y += Math.round( Math.random() * zure - zure2 );
			} else {
				if(i%2==0) x += w;
				w = 1;
				y -= ov;
				h += ov*2;
				x += Math.round( Math.random() * zure - zure2 );
			}

			//境界外は除外
			if(axis=="x"){
				if(y<10) return;
			} else {
				if(x<10 || x>me.sw-10) return;
			}

			var clr = "#666";
			if(isMouseOver) {
				clr = isWhite? "#fff": "#666";
			}
			var shape = me._getline(x, y, w, h, clr, isMouseOver);
			if(!isSolid) {
				shape.alpha = 0.1 + Math.random()*0.2;
				var delay = Math.random()*600;
				if(isMouseOver) {
					shape.alpha = 0.15 + Math.random()*0.15;
					if(!isWhite) shape.alpha *= 0.5;
					delay = Math.random()*200;
				}
				var waitTime = isMouseOver? 200: 300;
				me._showBySize(shape, axis, delay, waitTime, isMouseOver);
			} else {
				shape.alpha = 0.6;
				var delay = 300 + Math.random()*200;
				me._showBySize(shape, axis, delay, 1500);
			}
		}
	},

	_drawGrid:function(ind, bounds, axis){
		var me = this;

		var i, len = 2;
		for (i = 0; i < len; i++) {
			var x = bounds.x;
			var y = bounds.y;
			var w = bounds.w;
			var h = bounds.h;
			if(axis=="x") {
				if(i%2==0) y += h;
				x = 0;
				w = me.sw;
				h = 1;
			} else {
				if(i%2==0) x += w;
				y = 0;
				h = me.sw;
				w = 1;
			}
			var shape = me._getline(x, y, w, h, "#ccc");
			shape.alpha = 0.4;
			me._showByAlpha(shape, i*90);
		}
	},

	_drawBeta:function(ind, bounds){
		var me = this;

		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.w;
		var h = bounds.h;

		if(w>me.sw*0.9) return;//coverは書かない

		var shape = me._getline(x, y, w, h, "#ccc");
		var ta = 0.3;
		shape.alpha = 0;
		var waitTime = 0;
		createjs.Tween.get(shape)
			.wait(ind*60)
			.to({alpha:ta}, 400, createjs.Ease.quadInOut)
			.wait(waitTime)
			.to({alpha:0}, 1200, createjs.Ease.quadInOut)
			.call(function(){
				shape.parent.removeChild(shape);
			});
	},

	_showBySize:function(shape, axis, delay, waitTime, isMouseOver) {
		var me = this;
		var isRev = Math.random()<0.5;
		var tx = shape.x;
		var ty = shape.y;
		if(axis=="x") {
			if(isRev) shape.x += shape.w;
			shape.scaleX = 0;
		} else {
			if(isRev) shape.y += shape.h;
			shape.
				scaleY = 0;
		}
		var ix = shape.x;
		var iy = shape.y;
		createjs.Tween.get(shape)
			.wait(delay)
			.to({scaleX:1, scaleY:1, x:tx, y:ty}, 300, (!isMouseOver? createjs.Ease.quadInOut: createjs.Ease.quadOut) )
			.wait(waitTime)
//			.to({scaleX:0, scaleY:0, x:ix, y:iy}, 600, createjs.Ease.quadInOut)
			.to({alpha:0}, 600, createjs.Ease.quadInOut)
			.call(function(){
				shape.parent.removeChild(shape);
			});
	},

	_showByAlpha:function(shape, delay) {
		var me = this;
		var ta = shape.alpha;
		shape.alpha = 0;
		var waitTime = 1200;
		createjs.Tween.get(shape)
			.wait(delay)
			.to({alpha:ta}, 400, createjs.Ease.quadInOut)
			.wait(waitTime)
			.to({alpha:0}, 900, createjs.Ease.quadInOut)
			.call(function(){
				shape.parent.removeChild(shape);
			});
	},

	_getline:function(x, y, w, h, clr, appendBack){
		var me = this;

		clr = clr || "#000";

		var shape = new createjs.Shape();
		shape.x = x;
		shape.y = y;
		var g = shape.graphics;
		g.clear();
		g.beginFill( clr );
		g.drawRect(0, 0, w, h);
		g.endFill();
		if(!appendBack) me.stageFore.addChild(shape);
		else me.stageBack.addChild(shape);

		//widthとheightを持たせておく
		shape.w = w;
		shape.h = h;

		return shape;
	}


});


/* -------------------------------------------------------------------------------------

	各シーンのベース

 ------------------------------------------------------------------------------------- */
dd.SceneBase = Class.extend({

	__construct: function($me, pathName) {
		var me = this;

		me.$ = $me;
		me.pathName = pathName;
	},

	show:function(withAnime){
		var me = this;

	},

	doResize: function(){
		var me = this;
	},

	doScroll: function(){
		var me = this;
	},

	destroy:function(){
		var me = this;
		me.$ = null;
	}

});



/* -------------------------------------------------------------------------------------

 コンテンツの初期化処理

 ------------------------------------------------------------------------------------- */

dd.contentInit = function($content, pathName){

	//cover画像
//	$content.find(".cover").each(function(index){
//		var $cover = $(this);
//		var $pic = $cover.find(".pic");
//		var $img = $pic.find("img");
//		if($img.length==0) return;
//		$img.remove();
//		$pic.css("background-image", "url("+$img.attr("src")+")");
//	})


	//すでにbindされているclickイベントをunbind
	$(".gaBtn, .commonPop").unbind();


	/* GA Event */
	$(".gaBtn").bind("click", function(e){
		var category = $(this).attr("data-category") || "";
		var action = $(this).attr("data-action") || "open";
		var label = $(this).attr("data-label") || pathName.substr(1);
		//trace('category:'+category);
		//trace('action:'+action);
		//trace('label:'+label);
		_GA.trackEvent(category, action, label);
	});
	
	$(".mokuji a").unbind();
	$(".mokuji a").bind("click", function(e){
		e.preventDefault();
		var targetID = $(this).attr("href");
		var $target = $(targetID);
		var y = $target.offset().top;
		var c = $("body").scrollTop();
		var t = Math.abs(y-c) / 2500;
		t = t>1? 1 : t<0.3? 0.3 : t;
		$('html,body').animate({ scrollTop: y }, t*1000, "easeOutQuad");
		
	});
	
	
	// ISS
	$(".contactPop").each(function(num) {
		$(this).on("click", function(e) {
			e.preventDefault();
			var win = $.popWindow(this.href, null, {width: 900, height: 600});
			(function(win) {
				var openTime = (new Date()).getTime();
				var id = setInterval(function() {
					try {
						if(win == null || win.closed) {
							clearInterval(id);
							if((new Date()).getTime() - openTime > 10000) issv("trigger", "event", "popclose");
						}
					} catch(e) {}
				}, 500);
			})(win);
		});
	});
	
	
	//グリッドレイアウトの補助
	dd.gridAssist($content);

	//ポップアップリンクに置換
	$(".commonPop").easyPop();
}


/* -------------------------------------------------------------------------------------

 グリッドレイアウトの補助

 ------------------------------------------------------------------------------------- */
dd.gridAssist = function($area){
	var numStrArr = "one two three four five six seven eight nine ten".split(" ");
	$area.find(".grid").each(function(){
		var $grid = $(this);

		var colNum = 2;
		if($grid.hasClass("grid1")) colNum = 1;
		if($grid.hasClass("grid2")) colNum = 2;
		if($grid.hasClass("grid3")) colNum = 3;
		if($grid.hasClass("grid4")) colNum = 4;
		if($grid.hasClass("grid5")) colNum = 25;

		//grid-tiling（足りない分埋める）
		if($grid.hasClass("grid-tiling")) {
			var $cols = $(">.col", this);
			if($cols.length%colNum!=0) {
				var i, len = colNum - $cols.length%colNum;
				for (i = 0; i < len; i++) {
					$($cols[0]).clone().html("").removeClass("odd").addClass("empty").appendTo($grid);
				}
			}
		}

		//grid にnum,oddをふる
		$(">.col", this).each(function(index){
			var $col = $(this);
			var numClass = numStrArr[index];
			if(!$col.hasClass(numClass)) $col.addClass(numClass);
			if(index%colNum==0) $col.addClass("odd");
			if((index+1)%colNum==0) $col.addClass("even");
		})
	})
}
