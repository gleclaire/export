var fs = require('fs');

var casper = require("casper").create();

casper.options.waitTimeout = 20000;

var url = 'http://localhost:8000/examples/export-dataloader.html'
var graphFile =  'screenshots/dataloader.jpg'http

casper.on('remote.message', function(message) {
    this.echo('remote message caught: ' + message);
});

// casper.start(url);
casper.start(url, function() {
    this.page.paperSize = {
        width: '8.5in',
        height: '11in',
        orientation: 'portrait',
        border: '0.5in'
    };

    casper.capture('screenshots/start.png');


    this.waitUntilVisible('a#DownloadChart', function() {
        this.click('a#DownloadChart');

        this.page.paperSize = {
            width: '8.5in',
            height: '11in',
            orientation: 'portrait',
            border: '0.5in'
        };

        this.waitUntilVisible('img', function() {

            this.echo("Saving Image.......");

            this.captureSelector(graphFile, 'body', { format: "jpeg", quality: 100 });

        }, function() {
            this.log('No chart image ever appeared');
            casper.capture('screenshots/error.png');
        });

    }, function() {
        this.log('No chart element ever appeared');
        this.click('a#DownloadChart', 'a');
        casper.capture('screenshots/error.png');
    });

});

casper.run(function() {

    this.echo("All Done").exit();
});
