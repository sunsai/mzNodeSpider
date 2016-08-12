/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/cheerio/cheerio.d.ts" />
'use strict'
let request = require('superagent');
let cheerio = require('cheerio');
const async = require('async');
const url = require('url');
const config = require('./config');
const _ = require('lodash');

import parseVideo from './parseVideo';

let get_courses = class_urls => {
    async.mapLimit(class_urls, 2, (cl, callback) => {
        // console.log('enter :' + cl);
        request.get(cl)
            .set(config.headers)
            .end((err, res) => {
                // console.log('handler ' + cl);
                if (err) {
                    callback(null, Object.assing({ title: '', href: cl }, { success: 'no', err: err, data: null }));
                } else {
                    let $ = cheerio.load(res.text);
                    let item_course_url = [];
                    let title = $('div.fl.vlesson-infoR h1').text();
                    // console.log(title);
                    $('ul.lesson-lists a').each(function () {
                        item_course_url.push(url.resolve(config.base_url, $(this).attr('href')))
                    });
                    callback(null, Object.assign({ title: title, href: cl }, { success: 'ok', err: null, data: item_course_url }));
                }
            })
    }, (err, resulst) => {
        if (err) {
            console.log(err);
        } else {
            let frevs = resulst.filter(item => item.success == 'ok').map(item => item.data)
            parseVideo(_.flatten(frevs));
        }
    });

}
export default get_courses;
