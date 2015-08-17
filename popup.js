'use strict';

function emojiSpan(name, emoji) {
  return '<span title="' + name.toLowerCase() + '">' + emoji + '</span>';
}

function execKeepDOM() {
	chrome.extension.getBackgroundPage().console.log('log');
	//chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

	
	
    var emojisURL = chrome.extension.getURL('emojis.json');

    var emojisJSON = pegasus(emojisURL);
    var html = document.body.innerHTML;

    chrome.extension.getBackgroundPage().console.log(html);
	
    var htmlTextMatches = html.match(/>.*?</gi).filter(function(elem) {
      return /\w/.test(elem) && elem !== '><';
    }).join('☃');

    var diff = htmlTextMatches.split('☃');

    emojisJSON.then(function(data) {

    	chrome.extension.getBackgroundPage().console.log('emos in');
      var name;

      for (var i = 0 ; i < data.length; i++) {
//      	chrome.extension.getBackgroundPage().console.log(i+"/"+data.length);
        name = data[i].name;

        name = name.split(' ')[0];

        var patt = new RegExp(name, 'ig');

        htmlTextMatches = htmlTextMatches.replace(patt, emojiSpan(name, data[i].emoji));
      }
	 chrome.extension.getBackgroundPage().console.log('loop done');
      htmlTextMatches.split('☃').forEach(function(elem, idx) {
        if (elem !== diff[idx]) {
          html = html.replace(diff[idx], elem);
        }
      });

      document.body.innerHTML = html;
      console.log("done");
    });

    chrome.extension.getBackgroundPage().console.log('working');
}

document.getElementById('keepDOM').addEventListener('click', execKeepDOM);