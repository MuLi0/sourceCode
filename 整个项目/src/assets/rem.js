/* rem.js，简单版本的移动端适配方案，根据不同的业务，有不同的实现
   但是它们的思路，都大同小异，我在这就写我自己熟悉的方式了
 */
; (function (win) {
    // 先拿到document文档对象
    let doc = win.document;
    // 接下来，拿到<html>元素，documentElement，它是整个文档节点树的根节点
    let docEl = doc.documentElement;
    // console.log( docEl )

    // 接下来拿到meta标签
    let metaEl = doc.querySelector('meta[name="viewport"]')
    // 强制设置meta标签的属性
    // viewport-fit=cover，页面占满整个屏幕
    metaEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no viewport-fit=cover')

    // 设备像素比，在本方案之中，用不到dpr，只是看看
    let dpr = win.devicePixelRatio;
    // console.log( dpr )

    function refreshRem() {
        let _width = docEl.getBoundingClientRect().width;
        // console.log( _width )

        // 判断客户端的类型、型号
        let ua = navigator.userAgent.toLocaleLowerCase();
        // console.log(/ipad/.test(ua)) //false

        // 判断是手机？还是ipad？在实际工作中，要写非常多的判断条件，但思路都一样
        if (!/ipad/.test(ua)) {
            // 为什么是750呢？因为dpr的值是2，而浏览器模拟器的宽度是375
            if (_width > 750) {
                _width = 750;
            }

            // <html>标签的样式，就是字体大小，它的值只是提供一个标杆
            // 就是让其它的样式的值，以它为基准，进行计算
            docEl.style.fontSize = _width / 10 + 'px';
            // rem是全部的长度都是，相对于根元素(<html>元素)的样式的大小
            // 通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem
            // 此时<html>标签的样式的字体大小，就是37.5px
            // 那么1rem，就等于37.5px那么大
        }

    }
    // refreshRem()

    let tid;
    // 当页面大小改变时
    win.addEventListener("resize", function () {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300);
    }, false);

    // 当页面加载时触发
    // 有二种情况：1、直接加载；2、从缓存之中加载
    win.addEventListener("pageshow", function (e) {
        // console.log(e.persisted)
        // 它有一个属性：persisted，是一个Boolean值
        // 页面第一次加载时，是false;
        // 如果是从缓存之中加载，那么是true
        if (e.persisted) {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300);
        }
    }, false)

})(window)

// 现在这个 移动端的适配方案，也只是适合咱们这个项目实例
// 实际工作中，还是要根据自身的业务需要，来综合的编写移动端的适合方案
// 但无论它怎么复杂，它们的思路都一样。