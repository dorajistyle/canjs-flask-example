require.config({
    baseUrl: 'js',
    paths: {
      "utils": "app/lib/utils",
      "util": "app/lib/util",
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

require(['i18n','utils'],
	function (i18n,utils) {
        var lang =utils.getParam('lang');
        var i18n_option = {debug: true,resGetPath: 'static/locales/__lng__/__ns__.json'};
        lang != undefined
          ? i18n_option.lng = lang
          : i18n_option.lng = "en";
        i18n.init(i18n_option);
        console.log(i18n.t("app"));
});
