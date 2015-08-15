'use strict';

var cheerio = require('cheerio'),
    request = require('superagent'),
    fs = require('fs');

request
  .get('http://apps.timwhitlock.info/emoji/tables/unicode')
  .end(function(err, data) {

    var $ = cheerio.load(data.text);

    var column = $('.android'),
        name = $('.name');

    var imgs = [],
        emojis = [];

    column.each(function(idx, elem) {
      if (elem.children.length !== 0) {
        imgs.push(elem.children[0].data);
      }
    });

    name.each(function(idx, elem) {
      if (elem.children.length !== 0) {
        emojis.push({
          name: elem.children[0].data,
          emoji: imgs[idx]
        });
      }
    });

    fs.writeFileSync('emojis.json', JSON.stringify(emojis));

    // var emojis = [];
    // var appleColumn = document.querySelectorAll('.android');

    // for (var i = 0; i < appleColumn.length; i += 1) {
    //     if (appleColumn[i].innerHTML !== '') {
    //         emojis.push(appleColumn[i].innerHTML);
    //     }
    // }

    // console.log(emojis);
  });
