function execKeepDOM() {
 	//console.log(chrome.tabs);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {message: "keep"}, function(response) {
	    console.log("keep");
	  });
	});
}

function execBrakeDOM() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {message: "brake"}, function(response) {
	    console.log("brake");
	  });
	});
}

document.getElementById('keepDOM').addEventListener('click', execKeepDOM);
document.getElementById('brakeDOM').addEventListener('click', execBrakeDOM);