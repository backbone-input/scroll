/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Homepage: {{homepage}}
 *
 * @author {{author}}
 * Initiated by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license {{#license licenses}}{{/license}}
 */

(function($, _, Backbone, APP) {

	"use strict";

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;



{{{lib}}}



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