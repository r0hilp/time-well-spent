var minutes = 0;
var seconds = 0;
var activationTimer;
var windowChangeTimer;
var updateTimer;
var url = "";
var domain = "";
var timers = [];

// clears all timers
function clearTimers()
{
	for (var i = 0; i < 100000; i++)
	{
		clearInterval(i);
	}
}

// runs update on tab and given timer
function runUpdate(tab)
{
	url = tab.url;
	url = url.replace(/^https?:\/\//,'');
    url = url.replace("www.", "");
    domain = url.split("/")[0];
    var total_sec;
    chrome.storage.local.get(domain, function(data){
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
				console.log("Set " + domain + " to " + total_sec + " seconds FOR REALS");
				return;
			});
		};
    	var timer = setInterval(1, function(){updateTime()}, 1000);
	});
};

chrome.windows.onFocusChanged.addListener(function(windowId){
		console.log("Focused to " + windowId);
		if(windowId == chrome.windows.WINDOW_ID_NONE)
		{
			clearTimers();
			return;
		}
		else
		{
			clearTimers();
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				tab = tabs[0];
				if(tab.status != "complete")
				{
					return;
				}

				runUpdate(tab);
			});

		}
		return;
	}
); 


chrome.tabs.onActivated.addListener(function(activeInfo) {
	clearTimers();
    chrome.tabs.get(activeInfo.tabId, function(tab) {
    	if(tab.status != "complete")
		{
			return;
		}
    	runUpdate(tab);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	clearTimers();
    if(tab.status != "complete")
    {
    	return;
    }
	runUpdate(tab);
});

