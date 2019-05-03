'use strict';
var dataSheet = []
window.googleCallback = function(data) {
    var entry = data.feed.entry;
    var columns = 9;
    for (var i = columns, lengEntry = entry.length; i < lengEntry; i += columns) {
        var rows = []; 
        for (var j = 0; j < columns; j++) {
            rows.push(entry[i + j] ? entry[i + j].content.$t : '')
        }
        dataSheet.push(rows);
    }
}
function network() {
	var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
	var network = performance.getEntries() || {};
	return network;
}
var net = network().filter(function(d) {
    return d.name.indexOf('googleCallback') > 0;
});
var version = net[0].name;
version = version.substring(version.indexOf('?v=') + 3,version.length);

var head = document.getElementsByTagName('head')[0];

var sheetId = '1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0';
var sheetIndex = '1'
var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/' + sheetId + '/' + sheetIndex + '/public/full?alt=json&callback=googleCallback';
var scriptSheet = document.createElement('script');
scriptSheet.src = sheetUrl;
head.appendChild(scriptSheet);

var scriptMain = document.createElement('script');
scriptMain.src = 'assets/js/main.js?v=' + version;
scriptMain.defer = true;
scriptMain.async = true;
head.appendChild(scriptMain);

var scriptWeb = document.createElement('script');
scriptWeb.src = 'assets/js/webcomponent.js?v=' + version;
scriptWeb.defer = true;
scriptWeb.async = true;
head.appendChild(scriptWeb);

var linkCanonical = document.createElement('link');
linkCanonical.setAttribute('rel', 'canonical');
linkCanonical.setAttribute('href', location.protocol + '//' + location.host + location.pathname);
head.appendChild(linkCanonical);
