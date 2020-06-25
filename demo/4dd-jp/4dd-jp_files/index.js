
dd.SceneIndex = dd.SceneBase.extend({

	__construct: function ($me, pathName) {
		this.__super.__construct.apply(this, arguments)
		var me = this;

		me.$mainBlock = me.$.find(".block-main");

		//other works を4つ
		var $workList = $(".works-list");
		$workList.find("li").each(function(index){ if (index > 3) $(this).remove(); });
	},

	show:function(withAnime){
		var me = this;
		this.__super.show.apply(this, arguments);

		//メイン画像のアニメーション
		if(withAnime) {
//			me.$mainCoverPic = me.$.find(".cover-main .pic");
//			me.$mainCoverPic
//				.css("opacity", 0)
//				.delay(1200)
//				.animate({"opacity": 1}, 900, "easeInOutQuad");
		}
	},

	doResize: function(){
		var me = this;
		this.__super.doResize.apply(this, arguments)

		var w = _ctrl.clientW;
		var h = _ctrl.innerHeight;
		var max = (w>h)? 135: 100;
		var bottomH = Math.max(max, h*0.15);
		var picH = h-bottomH;
		me.$mainBlock.find(".cover").css("height", picH);
		me.$mainBlock.find(".bottom").css("height", bottomH);

		//メンバー写真のリサイズ
		var ratio = 360/1600;
		var th = _ctrl.clientW * ratio;
		$(".cover-members").css("height", th);
	},

	doScroll: function(){
		var me = this;
		this.__super.doScroll.apply(this, arguments)
	},

	destroy:function(){
		var me = this;
		this.__super.destroy.apply(this, arguments)
	}

});
