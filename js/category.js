/**
 * Created by superguan on 17/6/18.
 */

/**
 * 左侧菜单栏
 */
leftMenu();

function leftMenu() {
    //获取标签
    var listBox = document.querySelector(".list_left");
    var oul = listBox.children[0];

    //2、添加touch事件
    var startY = 0, endY = 0, distanceY = 0;
    var currentY = 0;   //当前的Y值 记录ul的Y值
    //最大值  最小值
    var maxY = 0;
    var minY = listBox.offsetHeight - oul.offsetHeight;//-508
    var tempY = 0;
    //缓冲距离
    var buffer = 150;
    // console.log(minY);
    oul.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    oul.addEventListener("touchmove", function (e) {
        endY = e.touches[0].clientY;
        distanceY = endY - startY;
        tempY = distanceY + currentY;

        //判断 最大 最小 值
        if (tempY <= (maxY + buffer) && tempY >= (minY - buffer)) {
            removeTransition(oul);
            //移动ul
            translateY(oul, tempY);
        }
    });
    oul.addEventListener("touchend", function (e) {
        // 1.判断临界值
        if (tempY >= maxY) {
            currentY = maxY;
        } else if (tempY <= minY) {
            currentY = minY;
        } else {
            // 记录当前的Y值
            currentY = tempY;
        }
        //添加过度
        transition(oul);
        //移动
        translateY(oul, currentY)
    });


    //3、点击改变颜色
    var list = oul.children;
    mjd.tap(oul, function (e) {
        //移除所有的current类名
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].className = "";
            //添加索引
            list[i].index = i;
        }
        //设置当前的类名
        //e.target  获取当前点击的元素
        var li = e.target.parentNode;
        li.className = "current";

        //3.2 当点击的时候  计算oul偏移量
        var scrollTop = -li.index * li.offsetHeight;
        if (scrollTop > minY) {
            currentY = scrollTop;
        } else {
            currentY = minY;
        }
        transition(oul);
        translateY(oul, currentY);



        //4 模拟网络数据
        var rightBox = document.querySelector(".list_right");
        rightBox.style.opacity = 0;
        setTimeout(function () {
            rightBox.style.opacity = 1;
            console.log("--------");
        }, 200)
    });

}