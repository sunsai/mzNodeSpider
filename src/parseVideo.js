/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/cheerio/cheerio.d.ts" />
'use strict'
const request = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

import * as config  from './config';
import down from './down';

let parseVideo = (cobjs) => {
    async.mapLimit(cobjs, 5, (turl, callback) => {
        console.log('enter ' + turl);
        request.get(turl)
            .set(config.headers)
            .end((err, res) => {
                if (err) callback(null, { success: 'no', href: null, title: bull });
                let $ = cheerio.load(res.text);
                let title = $('title').text().trim();
                title = title.substring(0, title.indexOf('-'));
                let href = $('source').attr('src');
                callback(null, { success: 'ok', href: href, title: title });
            });
    }, (err, result) => {
        result.forEach(item => down(item));
    });
}
export default parseVideo;