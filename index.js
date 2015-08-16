'use strict';

var cheerio = require('cheerio'),
    request = require('superagent'),
    forEach = require('lodash.forEach'),
    fs = require('fs');

request
  .get('http://apps.timwhitlock.info/emoji/tables/unicode')
  .end(function(err, data) {

    var $ = cheerio.load(data.text);

    var column = $('.android'),
        name = $('.name');

    var imgs = [],
        emojis = [],
        titles = [];

    column.each(function(idx, elem) {
      if (elem.children.length !== 0) {
        imgs.push(elem.children[0].data);
      }
    });

    name.each(function(idx, elem) {
      var title,
          titleWords;

      if (elem.children.length !== 0) {
        title = elem.children[0].data;

        titleWords = title.split(' ');

        forEach(titleWords, function(word) {

          if (titles.indexOf(word) === -1 || titleWords.length === 1) {

            if (word.length === 1) {
              emojis.push({
                name: title,
                emoji: imgs[idx]
              });

              titles.push(word);
              return false;
            }

            emojis.push({
              name: word,
              emoji: imgs[idx]
            });

            titles.push(word);
            return false;
          }
        });
      }
    });

    fs.writeFileSync('emojis.json', JSON.stringify(emojis, null, '\t'));
  });




