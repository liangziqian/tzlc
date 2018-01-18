/**
 * Created by Administrator on 2016/5/5.
 */
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };


    /*viewport*/
    const viewport = doc.querySelector('meta[name=viewport]')
    if (win.devicePixelRatio == 1) {

        viewport.setAttribute('content', 'width=device-width,initial-scale=1,user-scalable=no');
    }
    if (win.devicePixelRatio >= 2) {
        viewport.setAttribute('content', 'width=device-width,initial-scale=0.5,user-scalable=no');
        // viewport.setAttribute('content', 'width=device-width,initial-scale=0.33333,user-scalable=no');
    }
    // if (win.devicePixelRatio == 3) {
    //     viewport.setAttribute('content', 'width=device-width,initial-scale=0.33333,user-scalable=no');
    // }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
