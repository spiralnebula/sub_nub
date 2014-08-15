define({

	define : { 
		allow : "*"
	},

	copy : function (copy) {
		if ( copy.what.constructor === Array && copy.object_array ) {
			return this.index_loop({
				array   : copy.what,
				else_do : function (loop) {
					return loop.into.concat(loop.indexed)
				}
			})
		}
		if (copy.what.constructor === Array) {
			return copy.what.slice(0)
		}
		if (copy.what.constructor === Object) {
			return this.homomorph({
				object : copy.what,
				with   : function (member) {
					return member.value
				}
			})
		}
		return copy.what
	},
	// should fix null detection
	homomorph : function (what) {
		var set, with_function
		set           = ( what.set === "array" ? [] : {} )
		with_function = function (member) {
			return member.value
		}
		for ( var property in what.object ) {
			if ( what.object.hasOwnProperty(property) ) {

				var new_value = what.object[property]

				if ( what.object[property].constructor === Object )
					new_value = this.homomorph({
						object : what.object[property],
						with   : with_function
					})

				if ( what.object[property].constructor === Array )
					new_value = what.object[property].slice(0)

				if ( set.constructor === Array )
					set = set.concat(what.with.call({}, {
						value         : new_value,
						property_name : property,
						set           : set,
					}))
				
				if ( set.constructor === Object )
					set[property] = what.with.call({}, {
						value         : new_value,
						property_name : property,
						set           : set,
					})
			}
		}
		return set
	},

	monomorph : function (what) {
		var set, homomorph_function, with_function
		set                = what.first_object
		homomorph_function = function (member) {
			return member.value
		}
		with_function      = what.with || function (detail) {
			return detail.value
		}

		for ( var property in what.second_object ) {
			if ( what.second_object.hasOwnProperty(property) ) {

				var new_value = what.second_object[property]

				if ( what.second_object[property].constructor === Object )
					new_value = this.homomorph({
						object : what.second_object[property],
						with   : homomorph_function
					})

				if ( what.second_object[property].constructor === Array )
					new_value = what.second_object[property].slice(0)

				what.first_object[property] = with_function.call({}, {
					set           : set,
					property_name : property,
					value         : new_value
				})
			}
		}
		return set
	},

	epimorph_array : function (loop) {
		return this.index_loop({
			array   : loop.array,
			else_do : function (index_loop) {
				if ( loop.by_index  && loop.exclude && loop.exclude.indexOf(index_loop.index)   < 0  ||
					!loop.by_index && loop.exclude && loop.exclude.indexOf(index_loop.indexed) < 0  ||
					loop.by_index  && loop.include && loop.include.indexOf(index_loop.index) > -1 ||
					!loop.by_index && loop.include && loop.include.indexOf(index_loop.indexed) > -1
				) {
					return index_loop.into.concat(index_loop.indexed)
				} else {
					return index_loop.into
				}
			}
		})
	},

	index_loop : function (loop) {
		var self = this
		return this.index_loop_base({
			array    : loop.array,
			start_at : loop.start_at || 0,
			into     : this.replace_with_default({ what : loop.into, default : [] }),
			if_done  : loop.if_done  || function (base_loop) {
				return base_loop.into
			},
			else_do : function (base_loop) {
				return {
					array    : self.copy({ what : base_loop.array }),
					into     : loop.else_do({
						array   : self.copy({ what : base_loop.array }),
						index   : base_loop.start_at,
						into    : base_loop.into,
						indexed : self.copy({
							what : base_loop.array[base_loop.start_at]
						})
					}),
					start_at : base_loop.start_at + 1,
					if_done  : base_loop.if_done,
					else_do  : base_loop.else_do
				}
			}
		})
	},

	index_loop_base : function (loop) {
		if ( loop.start_at >= loop.array.length ) {
			return loop.if_done(loop)
		} else {
			return this.index_loop_base(loop.else_do({
				array    : this.copy({ what : loop.array }),
				start_at : loop.start_at,
				into     : loop.into,
				if_done  : loop.if_done,
				else_do  : loop.else_do
			}))
		}
	},

	index_loop_number : function (loop) {
		if ( loop.start_at >= loop.of_times ) {
			return loop.if_done(loop)
		} else {
			return this.index_loop_number(loop.else_do({
				of_times : loop.of_times,
				start_at : loop.start_at,
				into     : loop.into,
				if_done  : loop.if_done,
				else_do  : loop.else_do
			}))
		}
	},

	pop_loop : function (loop) {
		return this.pop_loop_base({
			array   : loop.array,
			into    : loop.into    || [],
			if_done : loop.if_done || function (base_loop) {
				return base_loop.into
			},
			else_do : function (base_loop) {
				var index = base_loop.array.length-1
				return {
					array : base_loop.array.slice(0,index),
					into  : loop.else_do({
						array : base_loop.array.slice(0),
						into  : base_loop.into,
						index : index,
					}),
					if_done : base_loop.if_done,
					else_do : base_loop.else_do,
				}
			}
		})
	},

	pop_loop_base : function (loop) {
		if ( loop.array.length < 1 ) {
			return loop.if_done(loop)
		} else {
			return this.pop_loop_base(loop.else_do(loop))
		}
	},

	replace_with_default : function (replace) {
		if ( replace.what === undefined )
			return replace.default
		else
			return replace.what
	},
	// someting that construct a list rom something
})