
dd.SceneAbout = dd.SceneBase.extend({

	__construct: function ($me, pathName) {
		this.__super.__construct.apply(this, arguments)
		var me = this;

		//main cover
		me.$mainBlock = me.$.find(".block-main");

		//map
		me._showMap();
	},

	_showMap:function(){
		var me = this;

		/*  map
		--------------------------------------------------*/
		lat = 35.661823;
		lng = 139.705538;
		me.zoom = 17;
		var zoom = me.zoom;

		/* js map */
		me.myLatlng = new google.maps.LatLng(lat, lng);
		var mapOptions = {
			center: me.myLatlng,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: false,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		me.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		//pin
		if(!_ctrl.ie) {
			var pinSrc = location.origin + $("#pin img").attr("src");
			var markerPin = new google.maps.Marker({
				position: me.myLatlng,
				map: me.map,
				icon: new google.maps.MarkerImage(
					pinSrc,                     // url
					new google.maps.Size(200,50), // size
					new google.maps.Point(0,0),  // origin
					new google.maps.Point(100,50) // anchor
				)
			});
		} else {
			var marker = new google.maps.Marker({
				position: me.myLatlng,
				map: me.map
			});
		}

	},

	show:function(withAnime){
		var me = this;
		this.__super.show.apply(this, arguments)
	},

	doResize: function(){
		var me = this;
		this.__super.doResize.apply(this, arguments);

		//resize map
		if(me.resizeID) clearTimeout(me.resizeID);
		me.resizeID = setTimeout(function(){

			//move
			me.map.panTo( me.myLatlng );

			//zoom
			var zoom = me.zoom;
			if(_ctrl.scrollW<900) zoom -= 1;
			if(_ctrl.scrollW<600) zoom-= 2;
			me.map.setZoom(zoom);

		}, 200);


		//main cover
//		var w = _ctrl.innerWidth;
//		var h = _ctrl.innerHeight;
//		var picH = h*0.75;
//		var minRatio = 500/1600;
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

