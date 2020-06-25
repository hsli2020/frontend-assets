
dd.SceneService = dd.SceneBase.extend({

	__construct: function ($me, pathName) {
		this.__super.__construct.apply(this, arguments)
		var me = this;

		me.$mainBlock = me.$.find(".block-main");


		//アンカー
		$(".anchors a").each(function(){
			var $target = me.$.find( $(this).attr("href") );
			$(this).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				var ts = $target.offset().top;
				_ctrl.$html_body.stop().animate({"scrollTop":ts}, 900, "easeInOutQuart")
			})
		})
	},

	show:function(withAnime){
		var me = this;
		this.__super.show.apply(this, arguments)
	},

	doResize: function(){
		var me = this;
		this.__super.doResize.apply(this, arguments)

//		var w = _ctrl.clientW;
		var h = _ctrl.innerHeight;
		var bottomH = Math.max(100, Math.min(130, h*0.21) );
//		var picH = h-bottomH;
//		var txtH = me.$mainBlock.find(".wrap .inr").height();
//		if(dd.SP) txtH += 120;
//		else txtH *= 1.32;
//		if(picH<txtH) picH = txtH;
//		me.$mainBlock.find(".cover").css("height", picH);
		me.$mainBlock.find(".bottom").css("height", bottomH);
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
