var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');

exports.movie = function (url, callback) {
    request({url, encoding: null}, function (err, response, body) {
        body = iconv.decode(body, 'gbk');
        var $ = cheerio.load(body);
        var movies = [];
        $('.keyword .list-title').each(function () {
            var $me = $(this);
            var movie = {
                name: $me.text(),
                url: $me.attr('href')
            };
            debug(`读到电影:${movie.name}`);
            movies.push(movie);
        });
        // console.log(movies);
        callback(err, movies);
    })
};
// exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function () {
//
// });


