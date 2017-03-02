var fs = require('fs');

var casper = require("casper").create();

casper.options.waitTimeout = 20000;

var url = 'http://localhost:8000/examples/export-test.html'
var graphFile =  'screenshots/graph.jpg'
var x = require('casper').selectXPath;

casper.on('remote.message', function(message) {
    this.echo('remote message caught: ' + message);
});

var graph = null;

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


/*
            graph = this.evaluate(function() {
                var imgUrl = document.querySelector('img').getAttribute('src');
                return __utils__.getBase64(imgUrl);
            });
*/

            this.captureSelector('screenshots/selector.jpg', 'body', { format: "jpeg", quality: 100 });
            casper.capture('screenshots/chart.png');


        }, function() {
            this.log('No chart image ever appeared');
            casper.capture('screenshots/error.png');
        });

/*
        graph = this.evaluate(function() {
            var imgUrl = document.querySelector('a#DownloadChart').getAttribute('href');
            return __utils__.getBase64(imgUrl);
        });
*/

    }, function() {
        this.log('No chart element ever appeared');
        this.click('a#DownloadChart', 'a');
        casper.capture('screenshots/error.png');
    });

});


casper.run(function() {

/*
    try {
        fs.write(graphFile, graph, 'b');
    } catch(e) {
        console.log(e);
    }
*/

    this.echo("All Done").exit();
    // this.echo(graph).exit();
});
