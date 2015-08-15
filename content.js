chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {

      var html = document.body.innerHTML;

      var emojisURL = chrome.extension.getURL('emojis.json');

      $.getJSON(emojisURL, function(data) {
        var name;

        for (var i = 0 ; i < data.length; i++) {
          name = data[i].name;

          // name = name.replace(/\+/, '').split(' ').join('|');
          name = name.split(' ')[0];

          var pattern = new RegExp(name, "ig");

          html.replace(pattern, data[i].emoji);
        }

        document.body.innerHTML = html;
      });
    }
  });
