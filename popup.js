'use strict';

function emojiSpan(name, emoji) {
  return '<span title="' + name.toLowerCase() + '">' + emoji + '</span>';
}

function execKeepDOM() {
 console.log(chrome.tabs);
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log("resp");
  });
});

}

document.getElementById('keepDOM').addEventListener('click', execKeepDOM);