document.addEventListener('DOMContentLoaded', function () {
	/*
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
	});*/
	chrome.storage.local.get(null, function(all) {

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            url = url.replace(/^https?:\/\//,'');
            url = url.replace("www.", "");
            var domain = url.split("/")[0];
            var total_sec;
            var hours;
            var minutes;
            var seconds;
            if(all.hasOwnProperty(domain))
            {
                total_sec = parseInt(all[domain], 10); // don't forget the second param
            }
            else
            {
                total_sec = 0;
            }
            var myVar=setInterval(function () {myTimer()}, 1000);
            
            function myTimer() {
                total_sec += 1;
                var hours   = Math.floor(total_sec / 3600);
                var minutes = Math.floor((total_sec - (hours * 3600)) / 60);
                var seconds = total_sec - (hours * 3600) - (minutes * 60);
                if (hours   < 10) {hours   = "0"+hours;}
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                var time = hours+'h'+minutes+'m'+seconds+'s';
                $("#current-url").html("<p>You have spent a total of " + time + " on " + domain + ".</p>");
            };
        });
	});

});