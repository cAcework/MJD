window.mjd = {};
mjd.transitonEnd = function (obj, callBack) {
    obj.addEventListener('transitionend', function (e) {
        if (callBack) {
            callBack(e);
        }
    });
    obj.addEventListener('webkitTransitionEnd', function (e) {
        if (callBack) {
            callBack(e);
        }
    });
};

mjd.tap = function (obj, callBack) {
    var startTime = 0;
    // 默认没有移动 false代表没有移动 true代表移动了
    var isMove = false;

    obj.addEventListener('touchstart', function () {
        // 获取时间戳
        startTime = Date.now();
    });
    obj.addEventListener('touchmove', function () {
        isMove = true;
    });
    obj.addEventListener('touchend', function (e) {
        var endTime = Date.now();
        var del = endTime - startTime;
        if (del <= 200 && isMove == false) {
            if (callBack) callBack(e);
        }
        // 重置值
        isMove = false;
        startTime = 0;
    });
};


//公共方法抽取
/**
 * 移动 X 方向距离
 * @param obj  要移动的对象
 * @param x
 */
function translateX(obj, x) {
    obj.style.transform = "translateX(" + x + "px)";
    obj.style.webkitTransform = "translateX(" + x + "px)";
}

/**
 * 移动 Y 方向距离
 * @param obj  要移动的对象
 * @param y
 */
function translateY(obj, y) {
    obj.style.transform = "translateY(" + y + "px)";
    obj.style.webkitTransform = "translateY(" + y + "px)";
}

/**
 *添加过度动画
 * @param obj 要添加过度动画的对象
 */
function transition(obj) {
    obj.style.transition = "all 0.3s ease";
    obj.style.webkitTtransition = "all 0.3s ease";
}

/**
 * 移除过度动画
 * @param obj
 */
function removeTransition(obj) {
    obj.style.transition = "none";
    obj.style.webkitTtransition = "none";
}

