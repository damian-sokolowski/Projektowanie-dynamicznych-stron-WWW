$(document).ready(function(){
    var overColor = '';
    buildTable();

    $('#rangeRow, #rangeCol, #colorTop, #colorBottom').change(function(){
        buildTable();
    });

    $( document ).on('mouseover', 'td', function () {
        overColor = $(this).css('background-color');
        $(this).css({'background-color': $(this).css('color'), 'color': overColor});
    });

    $( document ).on('mouseout', 'td', function () {
        $(this).css({'color': $(this).css('background-color'), 'background-color': overColor});
    });

    $( document ).on('click', 'td', function () {
        $('#right').css('background-color', overColor);
    });
});

var buildTable = function() {
    var col = $('#rangeCol').val();
    var row = $('#rangeRow').val();
    var colorTop = $('#colorTop').val();
    var colorBottom = $('#colorBottom').val();
    var bgColorArray = bgColor(colorTop, colorBottom, col, row);
    var k = 0;
    var table = '';
    for (var i = 0; i <= row-1; i++) {
        table += '<tr>';
        for (var j = 0; j <= col-1; j++) {
            table += '<td style="background-color: rgb(' +
                bgColorArray[0][i] + ', ' + bgColorArray[1][j] + ', ' + bgColorArray[2][k] + ')">' +
                'rgb(' + bgColorArray[0][i] + ', ' + bgColorArray[1][j] + ', ' + bgColorArray[2][k] + ')' +
                '</td>';
            k += 1;
        }
        table += '</tr>';
    }
    $('table').html(table);
}

var bgColor = function(colorTop, colorBottom, col, row) {
    var colorT = [ parseInt(colorTop.slice(1,3), 16), parseInt(colorTop.slice(3,5), 16), parseInt(colorTop.slice(5,7), 16) ];
    var colorB = [ parseInt(colorBottom.slice(1,3), 16), parseInt(colorBottom.slice(3,5), 16), parseInt(colorBottom.slice(5,7), 16) ];
    var colorTmp = [ (colorT[0] - colorB[0])/(row-1), (colorT[1] - colorB[1])/(col-1) ];
    var colorRow = [];
    var colorCol = [];
    var colorBlue = [];
    var blueTmp = (colorB[2]-colorT[2]) / (col * row - 1);

    for (var i = 0; i <= row-1; i++) {
        colorRow.push(parseInt(colorT[0] - colorTmp[0] * i));
        for (var j = 0; j <= col-1; j++) {
            if ( col > colorCol.length ) {
                colorCol.push(parseInt(colorT[1] - colorTmp[1] * j));
            }
            colorBlue.push(parseInt(colorT[2] + (blueTmp * (i+1) * (j+1) - blueTmp)));
        }
    }

    return [colorRow, colorCol, colorBlue];
}