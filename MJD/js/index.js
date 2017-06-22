window.onload = function() {
    banner();

    changeNavBg();

    secondKill();
};

//轮播图
function banner() {
    var banner = document.getElementsByClassName('jd_banner')[0];

    var bannerW = banner.offsetWidth;

    var imageBox = banner.getElementsByTagName('ul')[0];

    var pointBox = banner.getElementsByTagName('ol')[0];

    var allPoints = pointBox.children;


    //添加过渡效果
    function addTransition() {
        imageBox.style.transition = 'all 0.2s ease';

        imageBox.style.webkitTransition = 'all 0.2 ease';
    }

    //移除过度效果
    function removeTransition() {
        imageBox.style.transition = 'none';

        imageBox.style.webkitTransition = 'none';
    }

    //改变translateX
    function changeTanslateX(x) {
        imageBox.style.transform = 'translate(' + x + 'px)';
        imageBox.style.webkitTransform = 'translate(' + x + 'px)';
    }

    var index = 1;
    var timer = setInterval(scrollImage, 1000);

    function scrollImage() {
        index++;
        addTransition(imageBox);
        changeTanslateX(-index * bannerW);
    }

    //添加结束监听
    mjd.transitionEnd(imageBox, function(e) {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        // 清除过度
        removeTransition();
        // 重新设置值
        changeTanslateX(-index * bannerW);

        // 原点滚动
        setPoint();
    });

    function setPoint() {
        for (var i = 0, len = allPoints.length; i < len; i++) {
            allPoints[i].className = '';
        }
        allPoints[index - 1].className = 'current';
    }

    var startX = 0,
        endX = 0,
        distanceX = 0;

    imageBox.addEventListener('touchstart', function(e) {
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function(e) {
        e.preventDefault();

        endX = e.touches[0].clientX;

        distanceX = startX - endX;

        removeTransition();

        changeTanslateX(-index * bannerW + distanceX);
    });

    imageBox.addEventListener('touchend', function(e) {
        if (Math.abs(distanceX) > bannerW / 3 && (endX != 0)) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
        }

        addTransition();

        changeTanslateX(-index * bannerW);

        timer = setInterval(scrollImage, 1000);

        startX = 0, endX = 0, distanceX = 0;
    });
}

function secondKill() {
    var secTime = document.getElementsByClassName('product_timer')[0];
    var allSpan = secTime.children;

    var time = 8 * 60 * 60,
        timer = null;

    var timer = setInterval(function() {
        time--;

        if (time <= 0) {
            clearInterval(timer);
        }

        var h = Math.floor(time / (60 * 60));
        var m = Math.floor(time % (60 * 60) / 60);
        var s = Math.floor(time % 60);

        allSpan[0].innerHTML = h >= 10 ? parseInt(h / 10) : 0;
        allSpan[1].innerHTML = h % 10;

        allSpan[3].innerHTML = m >= 10 ? Math.floor(m / 10) : 0;
        allSpan[4].innerHTML = m % 10;

        allSpan[6].innerHTML = s >= 10 ? Math.floor(s / 10) : 0;
        allSpan[7].innerHTML = s % 10;
    }, 1000);
}

function changeNavBg() {
    var nav = document.getElementsByClassName('jd_header_box')[0];
    // console.log(nav);

    var bannerH = document.getElementsByClassName('jd_banner')[0].offsetHeight;
    // console.log(bannerH)
    var opc = 0;

    window.onscroll = function() {
        var scrollTop = document.body.scrollTop;
        if (scrollTop < bannerH) {
            opc = scrollTop / bannerH * 0.8;
        } else {
            opc = 0.8;
        }
        nav.style.background = 'rgba(201, 21, 35, ' + opc + ')';
    };

}
