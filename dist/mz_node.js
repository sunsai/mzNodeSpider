"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var u in e)Object.prototype.hasOwnProperty.call(e,u)&&(r[u]=e[u]);return r.default=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _getCourse=require("./getCourse"),_getCourse2=_interopRequireDefault(_getCourse),_config=require("./config"),config=_interopRequireWildcard(_config),course_ulrs=process.argv.slice(2);console.log("course  url is:"+course_ulrs.toString()),course_ulrs.length>0&&(0,_getCourse2.default)(course_ulrs);