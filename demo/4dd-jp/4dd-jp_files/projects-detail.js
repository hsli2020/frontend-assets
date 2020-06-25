
dd.SceneProjectsDetail = dd.SceneBase.extend({

	__construct: function ($me, pathName) {
		this.__super.__construct.apply(this, arguments)
		var me = this;


		//other works を4つランダム表示
		var $workList = $(".works-list");
		var $arr = [];
		$workList.find("li").each(function(){
			$arr.push( $(this) );
		})
		$arr.sort(function(a,b){ return Math.random()<0.5? 1: -1; })
		var i, len = $arr.length;
		for (i = 0; i < len; i++) {
			if(i<4) $workList.append($arr[i]);
			else $arr[i].remove();
		}


		//「学んだこと」にクラスをつける
		me.$.membersVoiceList = $('.members-voice-list');
		me.$.membersVoiceListLi = me.$.membersVoiceList.find('li');
		me.$.membersVoiceMainText = me.$.membersVoiceListLi.find('.voice');
		me.$.membersVoiceListLi.each(function(index){ $(this).addClass('box'+(index+1)); });
		
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


		/*  説明文の所
		--------------------------------------------------*/
		me.$.blockCaseNoteInner = $('.block-case_note .wrap');
		me.$.outline = me.$.blockCaseNoteInner.find('.outline');
		me.$.caseCreditWrapper = me.$.blockCaseNoteInner.find('.case-credit-wrapper');
		var w = _ctrl.clientW;

		if(700 <= w && w < 1240) me.$.blockCaseNoteInner.css('height',Math.max(me.$.outline.height(),me.$.caseCreditWrapper.height()));
		else me.$.blockCaseNoteInner.css('height','');


		/*　メンバーのコメントのところ
		--------------------------------------------------*/
		var boxMaxHeight;
		//var colNum = Math.floor( me.$.membersVoiceList.width() / me.$.membersVoiceListLi.eq(0).width() );
		var colNum = (700 <= w && w < 1240)? 2: (1240 <= w)? 4: 1; //カラム数

		//unitの高さをリセットする
		me.$.membersVoiceMainText.css('height','');

		//1カラムの時はこれ以降実行しない
		if (colNum == 1) return;

		//揃える
		me.$.membersVoiceListLi.each(function(index){
			var $thisUnit = $(this).find('.voice');

			//最左カラムの時、値をリセットする
			if (index%colNum==0) boxMaxHeight = 0;

			//行内のunitの最大の高さを取る
			boxMaxHeight = Math.max(boxMaxHeight, $thisUnit.height());

			//最右カラムの時、行内のunitの高さを揃える
			if (index%colNum == colNum-1 || index == me.$.membersVoiceListLi.length - 1) {
				var len = (index%colNum == colNum-1)? colNum: (me.$.membersVoiceListLi.length - 1)%colNum;
				for (var j=0; j<len; j++) me.$.membersVoiceMainText.eq(index-j).css('height',boxMaxHeight);
			}
		});
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
