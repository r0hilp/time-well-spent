chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    	var url = tab.url;
    	url = url.replace(/^https?:\/\//,'');
    	url = url.replace("www.", "");
    	var domain = url.split("/")[0];
    	console.log("Switched to " + domain);
    	var loaded = new Date();
    	var myVar=setInterval(function () {myTimer()}, 1000);

    	function myTimer() {
    		var d = new Date();
    		var diff = Math.abs(d - loaded);
    		var seconds = Math.floor(diff/1000);
    		var minutes = Math.floor(seconds/60);
    		seconds = ('0' + (seconds%60).toString()).slice(-2);
    		console.log("You have been on " + domain + " for " + minutes + ":" + seconds);
		};
    });
});

