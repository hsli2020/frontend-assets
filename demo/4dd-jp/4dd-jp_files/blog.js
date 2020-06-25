
dd.SceneBlog = dd.SceneBase.extend({

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
		
		// ISS
		issv("on", "scroll", "maxscroll", 0.9);
	},

	show:function(withAnime){
		var me = this;
		this.__super.show.apply(this, arguments)
	},

	doResize: function(){
        var me = this;
        this.__super.doResize.apply(this, arguments)
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
