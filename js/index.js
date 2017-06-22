// JavaScript Document
window.onload = function () {
    //1. 调用导航变色
    changeNavColor();
    //2. 调用轮播图
    banner();
    //3. 倒计时
    secondKill();
};
/**
 * 刷新页面(解决banner的bug)
 */
window.onresize = function () {
    window.location.reload();
};

/**
 * 导航变色
 */
function changeNavColor() {
    //获取标签
    var headerBox = document.querySelector(".jd_header_box");
    var banner = document.querySelector("#banner");
    //当滚动页面的时候
    window.onscroll = function () {
        //获取滚动的值
        var scrollTop = document.body.scrollTop;

        //计算比例
        var opc = scrollTop / banner.offsetHeight * 0.8;

        //判断 临界值
        if (opc > 0.8) {
            opc = 0.8
        }
        //设置透明度
        headerBox.style.background = "rgba(201, 21, 35, " + opc + ")";
    };
}

/**
 * 轮播图
 */

function banner() {
    //1 获取标签
    var banner = document.querySelector("#banner");
    //banner的宽度
    var bannerW = banner.offsetWidth;
    var oul = banner.children[0];

    // console.log(oul, bannerW);  验证上述数据是否获取到

    //定义全局索引
    var index = 1;

    //设置定时器
    var timer = setInterval(scrollImage, 1200);

    //自动轮播
    function scrollImage() {
        index++;
        //添加过度
        // oul.style.transition = "all 0.3s ease";
        transition(oul);
        //添加移动
        // oul.style.transform = "translate(" + (-index * bannerW) + "px)";
        translateX(oul, (-index * bannerW));
    }
    //过度效果结束
    oul.addEventListener("transitionend", function () {
        // console.log("过度玩乐")
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        //移除过度效果
        // oul.style.transition = "none";
        removeTransition(oul);
        //平移
        // oul.style.transform = "translate(" + (-index * bannerW) + "px)";
        translateX(oul, (-index * bannerW));
        //调用指示器
        setPoint();
    });

    //3.指示器
    var ol = banner.children[1];
    var allPoint = ol.children;
    //指示器方法
    function setPoint() {
        //清除
        for (var i = 0, len = allPoint.length; i < len; i++) {
            allPoint[i].className = "";
        }
        //添加当前的索引的 li 的类
        allPoint[index - 1].className = "current";
    }

    //4.Touch事件事件
    //初始位置
    var startX = 0;
    //结束位置
    var endX = 0;
    //移动的距离
    var distanceX = 0;

    oul.addEventListener("touchstart", function (e) {
        // console.log("anxia");
        //4.1 清空定时器
        clearInterval(timer);
        //获取起始位置的值
        startX = e.touches[0].clientX;

    });
    oul.addEventListener("touchmove", function (e) {
        //清除默认滚动
        e.preventDefault();

        //获取结束位置的距离
        endX = e.touches[0].clientX;
        endX = e.touches[0].clientX;

        //计算移动的X的距离
        distanceX = endX - startX;
        //移除过度
        // removeTransition(oul);

        //移动
        translateX(oul, -index * bannerW + distanceX);
    });
    oul.addEventListener("touchend", function (e) {
        // console.log("taiqi");
        //判断要不要跳转到下一页
        if (Math.abs(distanceX) >= bannerW / 3) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
        }
        //移动
        transition(oul);
        translateX(oul, -index * bannerW);
        //开启定时器
        timer  = setInterval(scrollImage, 1200);

        // 5.清空数据
        startX = 0;
        endX = 0;
        distanceX = 0;
    });

}

/**
 * 秒杀
 */

function secondKill() {
    var spans = document.querySelector(".product_timer").children;

    var time = 8 * 60 * 60;//转化为秒

    //添加定时器
    var timer = setInterval(function () {
        time--;
        if (time < 0) {
            clearInterval(timer)
        }

        var h = parseInt(time / (60 * 60));
        var m = parseInt(time / 60 % 60);
        var s = time % 60;

        spans[0].innerHTML = h >= 10 ? parseInt(h / 10) : 0;
        spans[1].innerHTML = h % 10 + "";

        spans[3].innerHTML = m >= 10 ? parseInt(m / 10) : 0;
        spans[4].innerHTML = m % 10 + "";

        spans[6].innerHTML = s >= 10 ? parseInt(s / 10) : 0;
        spans[7].innerHTML = s % 10 + "";

    }, 1000);

}












