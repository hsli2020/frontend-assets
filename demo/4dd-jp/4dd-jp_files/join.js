dd.SceneJoin = dd.SceneBase.extend({
	__construct: function ($me, pathName) {
		this.__super.__construct.apply(this, arguments)
		var me = this;

		me.$mainBlock = me.$.find(".block-main");

		//メインビジュアル上の文章を枠外に出す（SP表示時）
		var $spMainTextArea = $('<div class="spMainTextArea wrap">');
		$spMainTextArea.append(me.$mainBlock.find('.desc').clone()).append(me.$mainBlock.find('.linkList').clone());
		me.$mainBlock.after($spMainTextArea);
	},

	show:function(withAnime){
		var me = this;
		this.__super.show.apply(this, arguments)
	},

	doResize: function(){
		var me = this;
		this.__super.doResize.apply(this, arguments)

		//main cover
//		var w = _ctrl.innerWidth;
//		var h = _ctrl.innerHeight;
//		var picH = h*0.75;
//		var minRatio = 1110/1600;
//		var ratio = picH/w;
//		if(ratio<minRatio) picH = w * minRatio;
//		me.$mainBlock.find(".cover").css("height", picH);
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
