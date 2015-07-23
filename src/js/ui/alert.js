/*!
 * 警告框
 * tommyshao <jinhong.shao@frontpay.cn>
 * Reference bootstrap.alert.js
 * API:
 *      $(element).on('closed.ui.alert', function(e, obj){});
 */

+(function($) {
    'use strict';

    var dismiss = '[data-dismiss="alert"],.alert.with-close em';

    // 构造函数
    // ===============
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
    };

    Alert.VERSION = '1.0.0';

    // 动画过渡时间
    Alert.TRANSITION_DURATION = 150;

    // 关闭
    // ===============
    Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $(this).attr('data-target');

        if (!selector) { // a[href=#test]关闭 id为test的alert
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        var $parent = $(selector);

        if(e) e.preventDefault();

        if(!$parent.length) {
            $parent = $this.closest('.alert');
        }

        $parent.trigger(e = $.Event('close.ui.alert'));

        if(e.isDefaultPrevented()) return;

        $parent.removeClass('in');

        function removeElement() {
            $parent.detach().trigger('closed.ui.alert', e, $parent).remove();
        }

        if($.support.transition && $parent.hasClass('fade')) { // css3
            $parent.one('uiTransitionEnd', removeElement)
                   .emulateTransitionEnd(Alert.TRANSITION_DURATION)
        } else {
            $parent.fadeOut(Alert.TRANSITION_DURATION, removeElement)
        }
    };


    // 插件定义
    //======================
    function Plugin(option) {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.alert');

            if(!data) $this.data('ui.alert', (data = new Alert(this)));
            if(typeof option == 'string') data[option].call($(this));
        })
    }


    // jQuery 插件扩展
    $.fn.dropdown = Plugin;
    $.fn.dropdown.Constructor = Alert;

    // 元素插件绑定
    // ====================
    $(document).on('click.ui.alert', dismiss, Alert.prototype.close)

})( jQuery );
