document.addEventListener('DOMContentLoaded', function () {
	var loaded = new Date();
	console.log(loaded.toLocaleTimeString());
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	url = url.replace(/^https?:\/\//,'');
    	url = url.replace("www.", "");
    	var domain = url.split("/")[0];
    	$("#current-url").html(domain);

    	var myVar=setInterval(function () {myTimer()}, 1000);

    	function myTimer() {
    		var d = new Date();
    		var diff = Math.abs(d - loaded);
    		var seconds = Math.floor(diff/1000);
    		var minutes = Math.floor(seconds/60);
    		seconds = ('0' + (seconds%60).toString()).slice(-2);
    		$("#current-url").html(domain + " " + minutes + ":" + seconds);
		};
	});

});

