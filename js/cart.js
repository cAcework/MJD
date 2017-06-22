/**
 * Created by superguan on 17/6/19.
 */

delProduct();
function delProduct() {
    var delAll = document.querySelectorAll(".delete");
    var panel = document.querySelector(".panel");
    var panelBox = panel.children[0];

    var cancel = panelBox.children[1];

    var up = null;

    // console.log(panelBox);
    //添加tap事件
    for (var i = 0, len = delAll.length; i < len; i++) {
        (function (index) {
            var del = delAll[index];

            mjd.tap(del, function () {
                up = del.firstElementChild;
                //修改锚点/定位点
                up.style.stransition = "all 4s ease";
                up.style.transformOrigin = "0px 5px";
                up.style.transform = "rotateZ(-45deg)";
                // 4.动画出现
                // 4.1 面板出现
                panel.style.display = "block";
                panelBox.class = "panelBox clearfix jump";
            });
        })(i)
    }
//  点击取消按钮
    mjd.tap(cancel, function () {
        // 1 面板消失
        panel.style.display = "none";
        panelBox.class = "panelBox clearfix";

        up.style.transform = "none";

    });


    //单选框

    var checkBoxs = document.querySelectorAll(".checkBox");
    // console.log(checkBoxs);

    for (var j = 0, len = checkBoxs.length; j < len; j++) {
        (function (index) {
            mjd.tap(checkBoxs[index], function (e) {
                var check = e.target;
                // console.log(check);
                // hasAttribute()  hasAttribute()
                if (check.hasAttribute("checked")) {
                    //移除属性
                    check.removeAttribute("checked");
                } else {
                    check.setAttribute("checked", "");
                }
            });
        })(j)

    }


}