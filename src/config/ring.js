/*
	<div class="ring"></div>

	new Ring({
		selector: '.ring',
		w: 100,
		R: 40,
		sW: 8,
		sColor: '#ffbb00',
		fColor: '#fff',
		bgColor: '#e5e5e5',
		percent: 100,
		speed: 0,
		delay: 0
	});
*/
import $ from './jquery.min.js'
var Raphael = require('webpack-raphael')
var Ring = function(config) {
    var defaultConfig = {
        selector: '.ring',
        w: 100,
        R: 40,
        sW: 8,
        sColor: '#ffbb00',
        fColor: '#fff',
        bgColor: '#e5e5e5',
        percent: 0,
        speed: 1000,
        delay: 0
    }
    this.config = $.extend({}, defaultConfig, config);
    this.ele = $(this.config.selector);
    this.init();
}
Ring.prototype = {
    init: function() {
        var self = this;
        var w = self.config.w;
        var sW = self.config.sW;
        var R = self.config.R;
        this.ele.each(function() {
            var paper = Raphael(this, w, w);
            paper.customAttributes.arc = function(percent, R) {

                var d = 270 * percent / 100; //角度
                var a = Math.PI * 2 * percent / 100 * 3 / 4; //弧度
                var x = w / 2 + R * Math.cos(Math.PI * 5 / 4 - a);
                var y = w / 2 - R * Math.sin(Math.PI * 5 / 4 - a);
                var path;
                if (percent === 100) {
                    path = [
                        ["M", w / 2 + R * Math.cos(Math.PI * 5 / 4), w / 2 - R * Math.sin(Math.PI * 5 / 4)],
                        ["A", R, R, 0, 1, 1, w / 2 + R * Math.cos(Math.PI * 5 / 4 - Math.PI * 3 / 2), w / 2 - R * Math.sin(Math.PI * 5 / 4 - Math.PI * 3 / 2)]
                    ]
                } else {
                    path = [
                        ["M", w / 2 + R * Math.cos(Math.PI * 5 / 4), w / 2 - R * Math.sin(Math.PI * 5 / 4)],
                        ["A", R, R, 0, +(d > 180), 1, x, y]
                    ]
                }
                return {
                    path: path
                }
            }
            var f = paper.path().attr({
                'stroke': self.config.bgColor,
                "stroke-width": sW,
                'fill': self.config.fColor,
                arc: [100, R]
            });
            var g = paper.path().attr({
                    'stroke': self.config.sColor,
                    "stroke-width": sW
                })
                .attr({
                    arc: [0.01, R]
                });
            if (self.config.percent > 0) {
                setTimeout(function() {
                    g.animate({
                        arc: [self.config.percent, R]
                    }, self.config.speed, "linear")
                }, self.config.delay);
            } else {
                g.hide();
            }
        });
    }
}

export default Ring
