'use strict';
function fetchDataSheet(sheetId, sheetIndex, callback) {
    var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/' + sheetId + '/' + sheetIndex + '/public/full?alt=json';
    
    $.getJSON(sheetUrl, function(data){
        var entry = data.feed.entry;
        var data = [];
        var columns = 9;
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

function makeData(data, key, items) {
    items.empty();
   
    for (var i = 0, lengData = data.length; i < lengData; i++) {
        var html = '';
        
        if (key == 'home') {
            html += '<div class="col-md-3">';
        } else {
            html += '<div class="col-md-12">';
        }

        html +=    '        <div class="box">';
        html +=    '           <a target="_blank" href="detail.html?meta=' + data[i][0] + '" alt="' + data[i][1] + '" title="' + data[i][1] + '">';
        
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

        if (data[i][5] != 'N/A' && key == 'home')
        {
            html +=    '                <div class="text-summary">' + data[i][5] + '</div>';
        }
        
        html +=    '            </a>';
        html +=    '        </div>';
        html +=    '    </div>';

        items.append(html);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getValueQuery(key) {
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams) {
        return getParameterByName(key)
    }
    
    return urlParams.get(key);
}



function detailContent() {
    var meta = getValueQuery('meta');

    fetchDataSheet("1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0", "1", function(data) {
        var item = data.filter(function(d) {
            return d[0] === meta;
        })[0];

        $('.content-detail').empty();
        
        if (item) {
            var template = `
                <h2 class="mb-15 text-center text-uppercase" style="color:#f9005a">${item[1] == 'N/A' ? '' : item[1]}</h3>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center">
                            <img src="${item[6] == 'N/A' ? item[2] : item[6]}">
                            <div class="watching">
                                <a target="_blank" title="Xem phim ${item[1] == 'N/A' ? '' : item[1]}" alt="Xem phim ${item[1] == 'N/A' ? '' : item[1]}" href="${item[4] == 'N/A' ? '' : item[4]}" class="watching"><button type="button" class="btn btn-watching">Xem online</button></a>
                                <a target="_blank" title="Tải phim ${item[1] == 'N/A' ? '' : item[1]}" alt="Xem phim ${item[1] == 'N/A' ? '' : item[1]}" href="${item[4] == 'N/A' ? '' : item[4]}" class="download"><button type="button" class="btn btn-download">Tải về</button></a>
                            </div>	
                        </div>
                        <div class="text-center mt-20">
                            ${item[3] == 'N/A' ? '' : item[3]}
                        </div>
                    </div>
                </div>
            `;

            $('.content-detail').append(template);
            $('title').html(item[1] == 'N/A' ? '' : item[1] + ' | PhimNetClub')
        } else {
            $('.content-detail').html("<h2 style='color: #8a2be2' class='text-center'>Không tìm thấy thông tin phim</h2>")
        }
    });
}

$(document).ready(function() {
    if ($('.home-page').length > 0) {
        fetchDataSheet("1NXqQKdHCIgs19Vhy8M2Aq4tuj8CKNLABJXekGdOAiL0", "1", function(data) {
            makeData(data, "home", $('.list-items'));
        });
    }

    if ($('.detail-page').length > 0) {
        detailContent();
    }
    
});

