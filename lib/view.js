	// save existing options/params
	var options = (View.prototype.options instanceof Object) ? View.prototype.options : {};

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
				if( typeof window.c != "undefined" && typeof window.c.scroll != "undefined" ){
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