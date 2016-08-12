/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/cheerio/cheerio.d.ts" />
'use strict'

import get_courses from './getCourse';
import * as config from './config';

let course_ulrs = process.argv.slice(2);
console.log('course  url is:' + course_ulrs.toString());

if (course_ulrs.length > 0) get_courses(course_ulrs)


