'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {

    var emojisURL = chrome.extension.getURL('emojis.json');

    var emojisJSON = pegasus(emojisURL);

    var html = document.body.innerHTML;

    var htmlTextMatches = html.match(/>.*?</gi).filter(function(elem) {
      return /\w/.test(elem) && elem !== '><';
    }).join('☃');

    var diff = htmlTextMatches.split('☃');

    emojisJSON.then(function(data) {
      var name;

      for (var i = 0 ; i < data.length; i++) {
        name = data[i].name;

        name = name.split(' ')[0];

        var patt = new RegExp(name, 'ig');

        htmlTextMatches = htmlTextMatches.replace(patt, emojiSpan(name, data[i].emoji));
      }

      htmlTextMatches.split('☃').forEach(function(elem, idx) {
        if (elem !== diff[idx]) {
          html = html.replace(diff[idx], elem);
        }
      });

      document.body.innerHTML = html;
    });
  }
});

function emojiSpan(name, emoji) {
  return '<span title="' + name.toLowerCase() + '">' + emoji + '</span>';
}
