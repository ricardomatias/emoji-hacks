'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {

    var emojisURL = chrome.extension.getURL('emojis.json');

    // Get JSON file with emojis
    var emojisJSON = pegasus(emojisURL);

    var html = document.body.innerHTML;

    // Grab all the displayed text
    var htmlTextMatches = html.match(/>.*?</gi).filter(function(elem) {
      return /\w/.test(elem) && elem !== '><';
    }).join('☃');

    // Keep the original text to later compare with
    var diff = htmlTextMatches.split('☃');

    var emojis = [];

    emojisJSON.then(function(data) {
      var name;

      data.forEach(function(elem) {
        name = elem.name;

        name = name.split(' ')[0];

        var patt = new RegExp(name, 'ig');

        if (patt.test(htmlTextMatches)) {
          htmlTextMatches = htmlTextMatches.replace(patt, elem.emoji);

          // Keep track of the emojis that will be added
          emojis.push(elem);
        }
      });

      // Compare with the original matches to see which element changed
      // and replace it with the emoji
      htmlTextMatches.split('☃').forEach(function(elem, idx) {
        if (elem !== diff[idx]) {
          html = html.replace(diff[idx], elem);
        }
      });

      // replace the emojis with emojis wrapped with tags
      // this way we will not replace the inserted tags with some emoji
      emojis.forEach(function(elem) {
        var patt = new RegExp(elem.emoji, 'ig');

        html = html.replace(patt, emojiSpan(elem.name, elem.emoji));
      });

      document.body.innerHTML = html;
    });
  }
});

function emojiSpan(name, emoji) {
  return '<span title="' + name.toLowerCase() + '" class="emoji-hacks">' + emoji + '</span>';
}
