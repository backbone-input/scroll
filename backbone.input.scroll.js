/*
 * Backbone Input: Scroll
 * - monitor scroll in your views
 * 
 * Created by: Makis Tracend (@tracend)
 * (c) Makesites.org
 * 
 * Released under the MIT License
 * 
 */
(function (factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone', 'underscore', 'jquery'], factory);
    } else {
        // Browser globals
        factory(Backbone, _, $);
    }
}(function (Backbone, _, $) {

    "use strict";
	
	// fallbacks
	if( _.isUndefined( Backbone.Input ) ) Backbone.Input = {};
	
	// conditioning the existance of the Backbone APP()
	var View = ( APP ) ? APP.View : Backbone.View;
	
    _.extend(View.prototype, {
        options : _.extend({}, View.prototype.options, {
            scrolling : false
        }), 
		
        pos : new Backbone.Model({
			top : 0,
			height : 0,
			max : 0
		}), 
		
        events: {
            
        }, 
		
		initialize : function(){
			
			_.bindAll(this, "_scroll");
			
			if( this.options.scrolling ){
				$(window).scroll(this._scroll);
				//$(window).bind("touchmove", this._scroll); // is this overkill?
			}
			return View.prototype.initialize.apply(this, arguments);
		}, 
		
		_scroll : function( e ){
			
			// Firefox/IE scroll the html tag instead :P
			// could also use: $(document).scrollTop() //returns scroll position from top of document
			var scrollTop = $("body").scrollTop() ||$("html").scrollTop() || 0
          	, scrollHeight = $(document).height()
          	, maxScroll = scrollHeight - $(this.el).height()
			
			this.pos.set({
				top : scrollTop,
				height : scrollHeight,
				middle : scrollTop + ($(window).height()/2),
				max : maxScroll
			});
			// update views
			this.trigger("scroll");
			//console.log("scrollTop", scrollTop);
			//console.log("scrollHeight", scrollHeight);
			//console.log("middle", this.pos.middle);
			//console.log("maxScroll", maxScroll);
		}
    	
    
    });

    return Backbone;
}));