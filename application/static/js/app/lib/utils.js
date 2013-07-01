define(['jquery','loglevel','i18n'],function($,log,i18n){
    /**
     * A set for general purpose utilities.
     * @author dorajistyle
     * @module utils
    */

    //noinspection GjsLint
    return {
         /**
         * @param {string} name of param.
         * @returns {string} return param value.
         * @example <caption>
          * var lang =utils.getParam('lang');
          * </caption>
         */
        getParam: function(param_name){
        var value = new RegExp('[\\?&]' + param_name + '=([^&#]*)').exec(window.location.href);
        return value != null ? value[1] : undefined;
        },
        /**
         * Enable javascript logger.
         * @private
         */
        enable_log: function() {
          log.enableAll();
        },
        /**
         * Disable javascript logger.
         * @private
         */
        disable_log: function() {
          log.disableAll();
        },
        /**
         * information log.
         * @param method
         * @param msg
         */
        log_info: function(method,msg){
          log.info(method+" : ", msg);
        },
        /**
         * debug log.
         * @param method
         * @param msg
         */
        log_debug: function(method,msg){
          log.debug(method+" : ", msg);
        },
        /**
         * show message popup.
         * @param msg
         * @param type
         */
        show_message: function(msg,type) {
            $msg_box = $('#message_'+type);
            $msg_box.html(msg);
            $msg_box.fadeIn(200).removeClass('hidden').delay(400).fadeOut(700);
        },
        /**
         * show warning message.
         * @param msg
         */
        show_warning_msg: function(msg) {
            this.show_message(msg,"alert-warning");
        },
        /**
         * show error message.
         * @param msg
         */
        show_error_msg: function(msg) {
            this.show_message(msg,"alert-error");
        },
        /**
         * show info message.
         * @param msg
         */
        show_info_msg: function(msg) {
            this.show_message(msg,"alert-info");
        },
        /**
         * show success message.
         * @param msg
         */
        show_success_msg: function(msg) {
            this.show_message(msg,"alert-success");
        },
        /**
         * send data by ajax
         * @param url
         * @param data
         * @param method [GET|POST]
         * @returns {*}
         */
        send_by_ajax: function(url,data,method) {
            xhr = $.ajax({url: url,dataType: 'json', data:  data, type: method});
            var utils = this;
            xhr.fail(function ( data ) {
                utils.show_error_msg(i18n.t("ajax.fail"));
            });
            return xhr;
        },
        /**
         * send data by ajax with POST method
         * @param url
         * @returns {*}
         */
        send_by_ajax_url_only: function(url) {
            return this.send_by_ajax(url,'','POST');
        },
        /**
         * send data by ajax with GET method
         * @param url
         * @returns {*}
         */
        find_by_ajax_url_only: function(url) {
            return this.send_by_ajax(url,'','GET');
        },
        /**
         * Sum x and y
         * @param x
         * @param y
         * @returns {*}
         */
        sum: function(x,y) {
            return x+y;
        }
    };
});


