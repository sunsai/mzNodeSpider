/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
'use strict';

const http = require('http');
const request = require('superagent');
const fs = require('fs');
const async = require('async');
const progress = require('progress');

const url = require('url');
import * as config  from './config';

let down = (video) => {

    let {remote, filename} = { remote: video.href, filename: video.title + '.mp4' };
    let ws = fs.createWriteStream(config.saveDir + filename);/**/
    let options = {
        host: url.parse(remote).host,
        port: 80,
        path: url.parse(remote).pathname
    };

    ws.on('error', (err) => {
        console.log('write error - %s', err.message);
    });

    var req = request.get(remote)
        .end((err, res) => {
            if (err) throw err;
            let totalLen = parseInt(res.headers['content-length']);
            var bar = new progress('  downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: totalLen
            });

            res.on('data', data => {
                bar.tick(data.length);
                ws.write(data);
            }).on('end', () => {
                ws.end();
                console.log(filename + ' downloaded to ');
            }).on('error', err => { throw err })
        })
}
export default down;

