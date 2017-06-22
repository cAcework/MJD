/**
 * Created by wenya on 2017/4/26.
 */
deleProduct();

function deleProduct() {
    // 1.获取标签
    var panel = document.querySelector('.panel');
    // 面板内容
    var panel_content = document.querySelector('.panel_content');
    // 底部面板
    var panel_footer = panel_content.querySelector('.panel_footer');
    // 垃圾桶
    var trashs = document.getElementsByClassName('cart_detail_deal_right');
    // 取消按钮
    var cancel = panel_footer.children[0];

    // 选择按钮
    var cart_checkBox = document.getElementsByClassName('cart_checkBox');


    // 2.监听点击
    // 2.1 垃圾盖
    var up = null;
    for(var i = 0; i<trashs.length; i++){
        (function (index) {
            mjd.tap(trashs[index],function () {
               // alert('点击了第' + index + '个垃圾桶');
                // 1.获取垃圾盖
                up = trashs[index].firstElementChild;

                // 2.设置过度效果
                up.style.transition = 'all 0.2s ease';
                up.style.webkitTransition = 'all 0.2s ease';

                // 3.修改锚点
                up.style.transformOrigin = '0 5px';
                up.style.webkitTransformOrigin = '0 5px';

                // 4.旋转
                up.style.transform = 'rotate(-45deg)';
                up.style.webkitTransform = 'rotate(-45deg)';


                // 5.让面板出现
                panel.style.display = 'block';
                // 动画效果
                panel_content.className = 'panel_content jump';
            });
        })(i);
    }

    // 3.点击取消按钮
    mjd.tap(cancel,function () {
        // 3.1 面板消失
        panel.style.display = 'none';
        // 3.2 垃圾桶盖子盖上
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
    });


    // 4.选择按钮
    for(var i = 0; i<cart_checkBox.length; i++){
        mjd.tap(cart_checkBox[i],function (e) {
            var a = e.target;
            if (a.hasAttribute('checked')){
                a.removeAttribute('checked');
            }else {
                a.setAttribute('checked','');
            }
        });
    }
}