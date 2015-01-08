document.addEventListener('DOMContentLoaded', function () {
	console.log("HI");
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	console.log(url);
    	$("#current-url").html(url);
	});
});
