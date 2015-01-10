var minutes = 0;
var seconds = 0;
var timer = setInterval(function(){}, 1000);
var url = "";
var domain = "";

chrome.windows.onFocusChanged.addListener(function(windowId){
		console.log("Focused to " + windowId);
		if(windowId == chrome.windows.WINDOW_ID_NONE)
		{
			clearInterval(timer);
			return;
		}
		else
		{
			clearInterval(timer);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				tab = tabs[0];
				url = tab.url;
		    	url = url.replace(/^https?:\/\//,'');
			    url = url.replace("www.", "");
			    domain = url.split("/")[0];
			    chrome.storage.local.get(domain, function(data){
			    	var total_sec;
			    	if(data.hasOwnProperty(domain))
			    	{
			    		total_sec = data[domain];
			    	}
			    	else
			    	{
			    		total_sec = 0;
			    	}

			    	function updateTime() {
						total_sec = total_sec+1;
						var dataObj = {};
						dataObj[domain] = total_sec;
						chrome.storage.local.set(dataObj, function(){
							//console.log("Set " + domain + " to " + total_sec + " seconds FOR REALS");
							return;
						})
					};

					timer = setInterval(function () {updateTime()}, 1000);

			    });

			});
		}
		return;
	}
); 


chrome.tabs.onActivated.addListener(function(activeInfo) {
	clearInterval(timer); 
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    	url = tab.url;
    	url = url.replace(/^https?:\/\//,'');
	    url = url.replace("www.", "");
	    domain = url.split("/")[0];
	    chrome.storage.local.get(domain, function(data){
	    	var total_sec;
	    	if(data.hasOwnProperty(domain))
	    	{
	    		total_sec = data[domain];
	    	}
	    	else
	    	{
	    		total_sec = 0;
	    	}

	    	function updateTime() {
				total_sec = total_sec+1;
				var dataObj = {};
				dataObj[domain] = total_sec;
				chrome.storage.local.set(dataObj, function(){
					//console.log("Set " + domain + " to " + total_sec + " seconds FOR REALS");
					return;
				})
			};

			timer = setInterval(function () {updateTime()}, 1000);

	    });
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    clearInterval(timer); 
    if(changeInfo.status != "complete")
    {
    	return;
    }
	url = tab.url;
	url = url.replace(/^https?:\/\//,'');
    url = url.replace("www.", "");
    domain = url.split("/")[0];
    chrome.storage.local.get(domain, function(data){
    	var total_sec;
    	if(data.hasOwnProperty(domain))
    	{
    		total_sec = data[domain];
    	}
    	else
    	{
    		total_sec = 0;
    	}

    	function updateTime() {
			total_sec = total_sec+1;
			var dataObj = {};
			dataObj[domain] = total_sec;
			chrome.storage.local.set(dataObj, function(){
				//console.log("Set " + domain + " to " + total_sec + " seconds FOR REALS");
				return;
			})
		};

		timer = setInterval(function () {updateTime()}, 1000);

    });
});

