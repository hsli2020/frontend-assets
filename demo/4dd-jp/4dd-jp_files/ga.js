
/* ------------------------------------------------------------------------------------------------------

Google  Analrytics

------------------------------------------------------------------------------------------------------ */


<!-- util functions -->
var _GA = {
	trackPage: function(page){
		if(page) ga('send', 'pageview',{'page':page});
		else ga('send', 'pageview');

//		trace("_trackPage: "+page)
		
		// ISS
		if(page) issv("trigger", "page", page);
		else issv("trigger", "page");
	},
	trackEvent: function(category, action, label,opt_value){
		ga('send', 'event', category, action,{'eventLabel':label, 'eventValue':(opt_value?opt_value:1), 'nonInteraction':1});
		
//		trace("_trackEvent: "+[category, action, label].join(", "))
	}
};



<!-- Google Analytics Tracking Code -->
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-2734986-17', '4dd.jp');
  ga('require', 'displayfeatures');
  ga('set', 'dimension1', '216.165.201.174');
  
//  ga('send', 'pageview');

// ISS
(function(a,z,e,r,t,y,u){
a["co.issv.object"]=t;a[t]=a[t]||function(){(a[t].a=a[t].a||[]).push(arguments)};
y=z.createElement(e);y.async=true;y.src=r;
u=z.getElementsByTagName(e)[0];u.parentNode.insertBefore(y,u);
})(window,document,"script","//issv.co/issv.js","issv");
issv("init", "IID-1-vvPCYskN8TVj");
issv("set", "onInit", function(data) {
	ga('send', 'event', 'iss-test', 'init', data.name, {'nonInteraction':1});
});
issv("set", "onOpen", function(data) {
	ga('send', 'event', 'iss-test', 'open', data.name, {'nonInteraction':1});
});
issv("set", "onComplete", function(data) {
	ga('send', 'event', 'iss-test', 'complete', data.name, {'nonInteraction':1});
});


var c = document.cookie.split(";");
var clist = {};
for(var i=0; i<c.length; i++){
	var s = c[i].split("=");
	clist[s[0]] = s[1];
}
ga('set', 'dimension2', clist["__utma"]);




(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF3NH6');





window._pt_lt = new Date().getTime();
  window._pt_sp_2 = [];
  _pt_sp_2.push('setAccount,2839d457');
  var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
  
  (function() {
	var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
	atag.src = _protocol + 'js.ptengine.jp/pta.js';
	var stag = document.createElement('script'); stag.type = 'text/javascript'; stag.async = true;
	stag.src = _protocol + 'js.ptengine.jp/pts.js';
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(atag, s);s.parentNode.insertBefore(stag, s);
  })();