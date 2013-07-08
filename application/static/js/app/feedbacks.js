define(['can','can/util/fixture','app/models/feedback','utils','i18n','jquery','bootstrap'], function (can,Fixture,Feedback,utils,i18n,$) {
	'use strict';
    var exports = {};
//    var FEEDBACKS = [
//      {
//        id: 1,
//        email: "test@test.com",
//        content: "this is the content.",
//        propose_type: 1,
//        created_at: "2008-01-03",
//        vote_count: 1,
//        has_voted: 0
//      },
//      {
//        id: 2,
//        email: "test1@test.com",
//        content: "this is the content2.",
//        propose_type: 2,
//        created_at: "2009-02-03",
//        vote_count: 35,
//        has_voted: 0
//      },
//      {
//        id: 3,
//        email: "test3@test.com",
//        content: "this is the content3.",
//        propose_type: 1,
//        created_at: "2009-12-03",
//        vote_count: 22,
//        has_voted: 1
//      },
//      {
//        id: 4,
//        email: "test4@test.com",
//        content: "this is the content4.",
//        propose_type: 3,
//        created_at: "2008-01-03",
//        vote_count: 1,
//        has_voted: 0
//      }
//    ];

//    Fixture('GET /feedbacks', function(){
//      return FEEDBACKS;
//    });

//    var id= 4;
//    Fixture("POST /feedbacks", function(){
//         utils.log_info("POST", "feedback");
//      return {id: (id++)}
//    });

//    Fixture("PUT /feedbacks/{id}", function(){
//        utils.log_info("PUT", "feedback");
//      return {};
//    });
//
//    Fixture("DELETE /feedbacks/{id}", function(){
//      return {};
//    });

      /**
    * Control of feedbacks
    * @private
    * @author dorajistyle
    * @param {string} target
       * @name feedback#Feedbacks
     * @constructor
    */
    var Feedbacks = can.Control({

      init: function(){
          utils.log_info("#feedbacks router","initialize")
      },
      show: function(json_object){
        this.element.html(can.view('/static/views/list.mustache', {
          json_object: json_object
        }));
      },
      /**
       * Destroy a feedback when click remove button.
       * @function
       * @memberof feedback#Feedbacks
       */
      '.remove click': function(el, ev){
          ev.preventDefault();
          ev.stopPropagation();
          var item = el.closest('.item');
          utils.log_info("remove",item.data('feedback'));
          Feedback.findOne({id: item.data('id')},function(feedback){
             feedback.destroy(function(xhr){
                 utils.log_info("destroy",JSON.stringify(xhr));
                 if(xhr.is_destroyed) {
                    utils.show_success_msg(i18n.t("destroyed"));
                    var active_tab = $("#proposal_tab").find('.active');
                    $(active_tab).removeClass("active");
                    $(active_tab.find('a')).click();
                 }
             });
          });
      }
    });
    var feedbacks = new Feedbacks("#proposal-app");
    exports.feedbacks = Feedbacks;

         /**
      * Control for new propose
      * @private
      * @author dorajistyle
      * @param {string} target
      * @name feedback#Create
      * @constructor
      */
    var Create = can.Control({


       init: function(el){
          utils.log_debug("create",el);
       },
       show: function(){
           this.feedback = new Feedback();
           this.element.html(can.view("/static/views/propose.mustache",{
               feedback: this.feedback
           }));
       },
       'submit': function(el,ev){
         ev.preventDefault();
         ev.stopPropagation();
         utils.log_debug('# save','save clicked');
         this.createFeedback();
         return false;
       },
       '#pp_buttons_radio .btn click': function(button,ev){
            ev.preventDefault();
            $('#propose_type').val(button.attr('value'));
            var categoryId = button.attr('value');
            var textMessage = "";
            if (categoryId == 1) {
              textMessage = i18n.t("feedback.textPlaceholder.web");
            } else if (categoryId == 2) {
              textMessage = i18n.t("feedback.textPlaceholder.mobile");
            } else if (categoryId == 3) {
              textMessage = i18n.t("feedback.textPlaceholder.development");
            } else {
              textMessage = i18n.t("feedback.textPlaceholder.etc");
            }
            $('#content').attr('placeholder', textMessage);
       },
       /**
        * Validate a form.
        * @memberof feedback#Create
        */
       validation: function(){
          utils.log_debug('#feedback_form submit','submitted validation');
          var email_format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
          var email = $('input[name=email]').val();
          var content = $('textarea[name=content]').val();
          if (email.trim() == "" || email.search(email_format) == -1) {
              utils.show_warning_msg(i18n.t("validation.email"));
              $('input[name=email]').focus();
              return false;
          } else if (content.trim() == "") {
              utils.show_warning_msg(i18n.t("validation.content"));
              $('textarea[name=content]').focus();
              return false;
          } else if (!$("#agreement").is(":checked")) {
              utils.show_warning_msg(i18n.t("validation.agreement"));
              return false;
          }
           return true;
       },
       createFeedback: function(){
          if(this.validation()){
              var form = this.element.find('form');
              var values = can.deparam(form.serialize());
              var $form = $(form);
              if(!$form.data("submitted")) {
                  $form.data("submitted",true);
                  this.element.find('.save').attr('disabled','disabled');
                  utils.log_debug("createFeedback",values);
                  this.feedback.attr(values).save(function(){
                    can.route.attr("route","");
                  });
              }
          }
       }
    });
    var create = new Create('#proposal-app');
    exports.create = Create;
      /**
      * Control for feedback list tab
      * @private
      * @author dorajistyle
      * @param {string} target
       * @name feedback#Tab
       * @constructor
      */
    var Tab = can.Control({
        defaults: {}
    },{
       init: function() {
         utils.log_info("#proposal_tab","Tab initialized");
         $('#proposal_tab').tab();
         this.refresh();
       },
       refresh: function() {
         var $proposal_tab = $('#proposal_tab');
         $($proposal_tab.find('li:first')).removeClass("active");
         $($proposal_tab.find('a:first')).click();
       },
          /**
           * paginate of feedbacks.
           * @param el
           * @param ev
           * @memberof feedback#Tab
           */
       ".more_btn click": function(el,ev) {
            ev.preventDefault();
            var $more,next_page,tab_name;
            $more = $(ev.target);
            next_page = $more.data('page');
            tab_name = $more.data('tab');
            utils.log_debug("more next_page",next_page);
            var xhr = utils.find_by_ajax_url_only('/tab/'+tab_name+'/'+next_page+'/');
            xhr.done(function ( data ) {
                utils.log_debug("more_btn",JSON.stringify(data.feedbacks));
                $('#more_feedbacks').append($('<div/>').html(
                  can.view("/static/views/feedback.mustache",{
                   feedbacks: data.feedbacks
                  })
                ));
                if(data.has_next) {
                   $more.data('page',data.next_page)
                } else {
                   $($('#tabs').find('.more')).replaceWith('<span/>');
                }
            });
       },
          /**
           * handling feedback vote.
           * @param el
           * @param ev
           * @returns {boolean}
           * @memberof feedback#Tab
           */
       ".vote click": function(el,ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var $target,xhr;
            $target = $(ev.target);
            if(el.hasClass('disabled')){
                utils.log_debug("vote_item","disabled - "+el.closest('.item').data('id'));
                return false;
            }
            xhr = utils.send_by_ajax_url_only('/vote/'+el.closest('.item').data('id')+'/');
            xhr.done(function ( data ) {
              utils.log_debug("vote_item",JSON.stringify(data));
              var vote_count,feedback_id,$item,$counter;
              vote_count = data['vote_count'];
              feedback_id = data['feedback_id'];
              $item = $('#item_'+feedback_id);
              $counter = $('#counter_'+feedback_id);
              $counter.html(vote_count);
              $item.addClass('disabled');
              $item.removeClass('btn-warning');
              utils.show_success_msg(i18n.t("vote.success"));
            });
      },
          /**
           * feedback tab handler.
           * @param el
           * @param ev
           * @memberof feedback#Tab
           */
      "#proposal_tab a click": function(el,ev) {
          ev.preventDefault();
          ev.stopPropagation();
          utils.log_info("proposal_tab",$(ev.target).attr('href'));
          var tab,$tab;
          tab = $(ev.target).attr('href');
          var is_active_tab = $(ev.target.parentNode).hasClass("active");
          if(!is_active_tab) {
              utils.log_info("tab active",is_active_tab);
              $($('#tabs').find('.tab-pane')).html('');
              $tab = $(tab);
              $tab.load('/tab/'+tab.replace('#','')+'/1/', function(data){
              utils.log_info(tab,JSON.stringify(JSON.parse(data)));
                $tab.html(can.view('/static/views/feedbacks.mustache', {
                  json_object: JSON.parse(data)
                }));
               });
              $('#proposal_tab a[href="'+tab+'"]').tab('show');
          }
      }
    });
    var tab = new Tab("#proposal-app");
    exports.tab = Tab;
    /**
      * Router for feedbacks.
      * @author dorajistyle
      * @param {string} target
       * @function Router
      * @name feedback#Router
     * @constructor
    */

    var Router = can.Control({
        defaults: {}
      }, {
        init: function() {
             console.log('router');
        },
        "route" : function(){
            console.log("home");
            can.when(Feedback.findAll()).then(function(json_object){
                  feedbacks.show(json_object);
                  tab.refresh();
              }
            );
        },
        'new_propose route': function() {
            can.when(Autentication.findAll()).then(function(json_object){
               utils.log_debug("auth",JSON.stringify(json_object));
                    create.show();
            });
        }
    });

	exports.router = Router;
    return exports;
});
