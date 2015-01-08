var minutes = 0;
var seconds = 0;
var myVar = setInterval(function(){}, 1000);
var url = "";
var domain = "";

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    chrome.storage.local.get(domain, function(data)
	{
    	if(chrome.runtime.lastError)
    	{
        /* error */

        return;
    	}
    	console.log(data);
    	//data = data + parseInt(minutes)*60;
    	//data = data + parseInt(seconds);
    	var new_data = parseInt(minutes)*60 + parseInt(seconds);
    	chrome.storage.local.set({domain: new_data}, function(){
    		console.log("Set " + domain + " to " + new_data + " seconds");
	    	clearInterval(myVar);
	    	minutes = 0;
	    	seconds = 0;
	    	url = tab.url;
	    	url = url.replace(/^https?:\/\//,'');
	    	url = url.replace("www.", "");
	    	domain = url.split("/")[0];
	    	console.log("Switched to " + url);
	    	var loaded = new Date();
	    	myVar=setInterval(function () {myTimer()}, 1000);

	    	function myTimer() {
	    		var d = new Date();
	    		var diff = Math.abs(d - loaded);
	    		seconds = Math.floor(diff/1000);
	    		minutes = Math.floor(seconds/60);
	    		seconds = ('0' + (seconds%60).toString()).slice(-2);
	    		console.log("You have been on " + url + " for " + minutes + ":" + seconds);
			};
    	});
	});

    });
});

