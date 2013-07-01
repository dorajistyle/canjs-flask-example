/*global define*/
define(['can/util/library', 'can/model'], function (can, Model) {
    'use strict';

 /**
      * Feedback related
      * @author dorajistyle
      * @namespace feedback
 */

    /**
     * Feedback model.
     *  @constructor
      * @type {*}
     * @name feedback#Feedback
     */
    var Feedback = Model({
          findAll: 'GET /feedbacks',
          findOne: 'GET /feedbacks/{id}',
          create:  'POST /feedbacks',
          update:  'PUT /feedbacks/{id}',
          destroy: 'DELETE /feedbacks/{id}'
    },{
    });
   Feedback.List = Model.List({
        filter: function(propose_type){
            this.attr('length');
            var feedbacks = new Feedback.List([]);
            this.each(function(feedback, i){
                if(feedback.propose_type === propose_type){
                    feedbacks.push(feedback);
                }
            });
            return feedbacks
        },
        count: function(propose_type){
            return this.filter(propose_type).length;
        }
    });
    return Feedback;
});
