const log = require('npmlog');

log.level = "info";

Object.defineProperty(log, "heading", {get: ()=> {return new Date().toUTCString()}});
log.headingStyle = {bg:"", fg:"white"};

module.exports = log;