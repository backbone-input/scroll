	var params = (View.prototype.params instanceof Backbone.Model) ? View.prototype.params : new Backbone.Model();
	// defaults
	params.set({
		scroll: {
				top : 0,
				height : 0,
				max : 0
			}
	});
