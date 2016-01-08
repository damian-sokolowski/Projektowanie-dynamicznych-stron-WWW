$(document).ready(function() {
    var clicked = 0;
    var imgElementsOrder = getContainerImg().elementsOrder();
    var empty = imgElementsOrder.length - 1;
    scramble(imgElementsOrder);

    $(document).on('click', 'img', function () {
        var tmp = empty;
        empty = $(this).move(empty);
        if (tmp !== empty) {
            clicked += 1;
        }
        if ($(imgElementsOrder).divImgElementsOrder(getContainerImg().elementsOrder())) {
            $('#win').css('display', 'block');
            $('#empty').html('Kliknięto: ' + clicked + ' razy');
        }
    });

    $(document).on('click', '#scramble', function () {
        clicked = 0;
        empty = imgElementsOrder.length - 1;
        $('#empty').html('');
        scramble(imgElementsOrder);
    });
});

$.fn.move = function(empty) {
    var clickedElement = this.parent()[0].outerHTML;
    var containerImg = getContainerImg().elementsOrder();
    if (clickedElement  === containerImg[empty - 1]) {
        empty = changeElements(containerImg, empty, - 1);
    } else if (clickedElement  === containerImg[empty + 1]) {
        empty = changeElements(containerImg, empty, + 1);
    } else if (clickedElement  === containerImg[empty - 4]) {
        empty = changeElements(containerImg, empty, - 4);
    } else if (clickedElement  === containerImg[empty + 4]) {
        empty = changeElements(containerImg, empty, + 4);
    }
    return empty;
};

var changeElements = function(containerImg, empty, shift) {
    var tmp = containerImg[empty + shift];
    containerImg[empty + shift] = containerImg[empty];
    containerImg[empty] = tmp;
    var imgDiv = getContainerImg();
    imgDiv.html("");
    for (var i = 0; i <= containerImg.length - 1; i++) {
        imgDiv.append(containerImg[i] + '\n');
    }

    return empty + shift;
}


var scramble = function(imgElementsOrder) {
    var containerImg = getContainerImg();
    $('#win').css('display', 'none');
    var imgCount = imgElementsOrder.length - 1;
    var order = randomArr(imgCount);
    containerImg.html("");
    for (var i = 0; i <= imgCount - 1; i++) {
        containerImg.append(imgElementsOrder[order[i]] + '\n');
    }
    containerImg.append(imgElementsOrder[imgCount]);
};

$.fn.elementsOrder = function () {
    return this.html().replace(/( ){2,}/g, '').trim().split('\n');
};

$.fn.divImgElementsOrder = function(elementToCompare) {
    if (this.length !== elementToCompare.length) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== elementToCompare[i]) {
            return false;
        }
    }
    return true;
};

var  getContainerImg = function() {
    return $('.containerImg');
}

var randomArr = function(size) {
    var arr = [];
    while(arr.length < size){
        var randomNumber = Math.ceil(Math.random()*size) - 1;
        var found=false;
        for(var i=0;i<arr.length;i++){
            if(arr[i] === randomNumber){
                found=true;
                break
            }
        }
        if(!found)
            arr[arr.length]=randomNumber;
    }
    return arr;
}