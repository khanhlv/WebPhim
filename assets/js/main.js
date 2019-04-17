$(document).ready(function(){

    // Home
    fetchDataSheet("1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0", "1", function(data) {
        makeData(data, "home");
    });

    // Top
    fetchDataSheet("1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0", "2", function(data) {
        makeData(data, "top");
    });
    
    function fetchDataSheet(sheetId, sheetIndex, callback) {
        var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/' + sheetId + '/' + sheetIndex + '/public/full?alt=json';
        
        $.getJSON(sheetUrl, function(data){
            var entry = data.feed.entry;
            var data = [];
            var columns = 6;
            for (var i = columns, lengEntry = entry.length; i < lengEntry; i += columns) {
                var rows = []; 
                for (var j = 0; j < columns; j++) {
                    rows.push(entry[i + j] ? entry[i + j].content.$t : '')
                }
                data.push(rows);
            }

            callback(data);
        });
    }

    function makeData(data,key) {
        var items = $('.list-items');
        if (key == 'home') {
            $('.list-items').empty();
            items = $('.list-items');
        } else {
            $('.list-items-top').empty();
            items = $('.list-items-top');
        }

        for (var i = 0, lengData = data.length; i < lengData; i++) {
            var html = '';
            
            if (key == 'home') {
                html += '<div class="col-md-3">';
            } else {
                html += '<div class="col-md-12">';
            }

            html +=    '        <div class="box">';
            html +=    '           <a href="' + data[i][4] + '" alt="' + data[i][1] + '" title="' + data[i][1] + '">';
            
            if (key == 'home') {
                html +=    '                <div class="box-img-left" style="background-image: url(' + data[i][2] + ');"></div>';
            } else {
                html +=    '                <div class="box-img-right" style="background-image: url(' + data[i][2] + ');"></div>';
            }

            if (key == 'home') {
                html +=    '                <div class="text-title">' + data[i][1] + '</div>';
            } else {
                html +=    '                <div class="text-title mb-10">' + data[i][1] + '</div>';
            }

            if (data[i][5] != 'N/A')
            {
                html +=    '                <div class="text-summary">' + data[i][5] + '</div>';
            }
            
            html +=    '            </a>';
            html +=    '        </div>';
            html +=    '    </div>';

            items.append(html);
        }
    }
  });