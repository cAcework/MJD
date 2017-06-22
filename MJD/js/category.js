window.onload = function() {
    showNav();

    slideLeft();
};

function slideLeft() {
    var category_left = document.getElementsByClassName('category_left')[0];
    var oUl = category_left.children[0];
    var childH = oUl.offsetHeight;
    var parentH = category_left.offsetHeight;

    var startY = 0,
        endY = 0,
        moveY = 0,
        currentY = 0,
        distanceY = 0,
        buffer = 100,
        maxY = 0,
        minY = -(childH - parentH);

    oUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, false);

    oUl.addEventListener('touchmove', function(e) {
        e.preventDefault();

        endY = e.touches[0].clientY;
        moveY = startY - endY;

        distanceY = currentY - moveY;

        if (distanceY < (maxY + buffer) && distanceY > (minY - buffer)) {
            mjd.removeTransition(oUl);
            mjd.changeTranslateY(oUl, distanceY);
        }
    }, false);

    oUl.addEventListener('touchend', function(e) {
        if (distanceY > maxY) {
            currentY = maxY;

            mjd.addTransition(oUl);
            mjd.changeTranslateY(oUl, currentY);
        } else if (distanceY < minY) {
            currentY = minY;

            mjd.addTransition(oUl);

            mjd.changeTranslateY(oUl, currentY);
        } else {
            currentY = distanceY;
        }
    }, false);

    mjd.tap(oUl, function(e) {
        var list = e.target.parentNode;

        var listArr = oUl.children;

        for (var i = 0, len = listArr.length; i < len; i++) {
            listArr[i].className = '';
            listArr[i].index = i;
        }

        list.className = 'current';

        var distance = -(list.index * list.offsetHeight);

        if (distance > minY) {
            mjd.addTransition(oUl);
            mjd.changeTranslateY(oUl, distance);
            currentY = distance;
        } else {
            mjd.changeTranslateY(oUl, minY);
            currentY = minY;
        }

        var category_right = document.getElementsByClassName('category_right')[0];

        category_right.style.opacity = 0;

        setTimeout(function() {
            category_right.style.opacity = 1;
        }, 200);
    });
}

function showNav() {
    var header = document.getElementsByClassName('header')[0];

    var menu = document.getElementsByClassName('icon_menu')[0];

    var nav = document.getElementsByClassName('nav')[0];

    var category_main = document.getElementsByClassName('category_main')[0];

    mjd.tap(menu, function(e) {
        if (nav.style.display == 'none') {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }

        category_main.style.paddingTop = nav.offsetHeight + header.offsetHeight + 'px';
    });
}
