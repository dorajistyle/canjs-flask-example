require.config({
  "baseUrl": "/static/js",
  "paths": {
      "utils": "app/lib/utils",
      "loglevel": "vendor/loglevel.min",
      "bootstrap": [
          '//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min',
          "vendor/bootstrap"
      ],
      "jquery": [
          "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min",
          "vendor/jquery-1.9.1.min"
      ],
      "can": "vendor/can",
      "i18n": "vendor/i18next.amd.withJQuery-1.6.3.min",
      shim: {
          "bootstrap": {
              deps: ["jquery"],
              exports: "$.fn.popover"
          },
          "utils": {
              deps: ["jquery"],
              exports: "$.fn.popover"
          },
          enforceDefine: true
      }
    }
});
/**
 * @requires jquery
 * @requires util
 * @requires i18n
 * @requires can
 * @requires app/feedbacks
 * @requires can/view/mustache
 * @requires bootstrap
 */
require(['jquery', 'utils', 'i18n','can', 'app/feedbacks','bootstrap', 'can/view/mustache'],
	function ($, utils, i18n, can, Feedbacks) {
		'use strict';
        var lang =utils.getParam('lang');
        var i18n_option = {debug: true,resGetPath: 'static/locales/__lng__/__ns__.json'};
        lang != undefined
          ? i18n_option.lng = lang
          : i18n_option.lng = "en";
        utils.enable_log();
//        utils.disable_log();
        can.when(i18n.init(i18n_option)).then(function (){
        can.route.ready(false);

		// View helper for pluralizing strings
		can.Mustache.registerHelper('feedbackPlural', function (str, attr) {
			return str + (attr.call(this.feedbacks) !== 1 ? 's' : '');
		});

        can.Mustache.registerHelper('i18n', function(str, options){
            return i18n != undefined
                ? i18n.t(str)
                : str;
          });

        new Feedbacks.router(document);

		can.route.ready(true);
       });
});
