window.mjd = {};

mjd.transitionEnd = function(obj, callBack) {
    if (typeof obj !== 'object') return;

    obj.addEventListener('transitionEnd', callBack);
    obj.addEventListener('webkitTransitionEnd', callBack);
};

mjd.tap = function(obj, callBack) {
    if (typeof obj !== 'object') return;

    var startTime = 0,
        endTime = 0,
        isMove = false;

    obj.addEventListener('touchstart', function(e) {
        startTime = Date.now();
    });

    obj.addEventListener('touchmove', function(e) {
        isMove = true;
    });

    obj.addEventListener('touchend', function(e) {
        endY = Date.now();
        var distanceTime = endY - startTime;

        if (distanceTime < 200 && !isMove) {
            if (callBack) callBack(e);
        } else {
            isMove = false;
        }
    });
};

mjd.addTransition = function addTransition(obj) {
    obj.style.transition = 'all 0.2s linear';
    obj.style.webkitTransition = 'all 0.2s linear';
};

mjd.removeTransition = function removeTransition(obj) {
    obj.style.transition = 'none';
    obj.style.webkitTransition = 'none';
};

mjd.changeTranslateY = function changeTranslateY(obj, y) {
    obj.style.transform = 'translateY(' + y + 'px)';
    obj.style.webkitTransform = 'translateY(' + y + 'px)';
};

mjd.changeTanslateX = function changeTanslateX(obj, x) {
    imageBox.style.transform = 'translate(' + x + 'px)';
    imageBox.style.webkitTransform = 'translate(' + x + 'px)';
};
