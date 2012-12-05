var casper = require('casper').create();
casper.start('http://google.com', function() {
    // selector capture
    console.log(this.captureBase64('png', '#lga'));
    // clipRect capture
    console.log(this.captureBase64('png', {
        top: 0,
        left: 0,
        width: 320,
        height: 200
    }));
    // whole page capture
    console.log(this.captureBase64('png'));
});

casper.run();