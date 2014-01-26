/* Backbone Input: Scroll
 * Source: https://github.com/backbone-input/scroll
 *
 * Created by Makis Tracend (@tracend)
 * (c) by [Makesites.org](http://makesites.org)
 *
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone, APP) {

	"use strict";

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;
	// save existing options/params
	var options = (View.prototype.options instanceof Object) ? View.prototype.options : {};
	var params = (View.prototype.params instanceof Backbone.Model) ? View.prototype.params : new Backbone.Model();
	// defaults
	params.set({
		scroll: {
				top : 0,
				height : 0,
				max : 0
			}
	});

	var Scroll = View.extend({

		options : _.extend({}, options, {
			monitorScroll: false
		}),

		params: params,

		events: {

		},

		initialize : function(){

			_.bindAll(this, "_scroll");

			if( this.options.monitorScroll ){
				// support common scroll if available
				if( window.c != "undefined" && window.c.scroll != "undefined" ){
					window.c.scroll(this._scroll);
				} else {
					$(window).scroll(this._scroll);
				}
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

			this.params.set({
				scroll: {
					top : scrollTop,
					height : scrollHeight,
					middle : scrollTop + ($(window).height()/2),
					max : maxScroll
				}
			});
			// update views
			// this conflicts with Backbone.State
			//this.trigger("scroll");
			// convention:
			if(typeof this.onScroll == "function") this.onScroll( e );
			// debug:
			//console.log("scrollTop", scrollTop);
			//console.log("scrollHeight", scrollHeight);
			//console.log("middle", this.pos.middle);
			//console.log("maxScroll", maxScroll);
		}


	});


	// fallbacks
	if( _.isUndefined( Backbone.Input ) ) Backbone.Input = {};
	Backbone.Input.Scroll = Scroll;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
			// Expose as module.exports in loaders that implement CommonJS module pattern.
			module.exports = Scroll;
	} else {
			// Register as a named AMD module, used in Require.js
			if ( typeof define === "function" && define.amd ) {
					define( "backbone.input.scroll", [], function () { return Scroll; } );
			}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
			if( isAPP ){
				// update APP namespace
				APP.Input = APP.Input || {};
				APP.Input.Scroll = Backbone.Input.Scroll;
				// update APP view
				APP.View = Scroll;
				window.APP = APP;
			} else {
				// replacing default view
				Backbone.View = Scroll;
				window.Backbone = Backbone;
				//return Backbone;
			}
	}

})(this.jQuery, this._, this.Backbone, this.APP);