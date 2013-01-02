var webdriverjs = require("webdriverjs");
var client = webdriverjs.remote({
    desiredCapabilities:{
        browserName:"firefox"
    }});
  
client
    .init()
    .url("http://www.google.com")
    .getTitle(function(t){ console.log(t)})
    .end();