"use strict";
define({
	define : {
		allow : "*"
	},
	make   : function ( what ) {
		var self = this
		return {
			body   : what.body,
			get    : function ( mark ) { 
				if ( what.control_map.marked.hasOwnProperty(mark) ) { 
					return self.make({
						control_map : what.control_map,
						body        : what.control_map.marked[mark].body
					})
				} else { 
					console.warn("There is no mark inside the node called "+ what )
				}
			},
			append : function ( what ) {
				what.appendChild( this.body )
			}
		}
	}
})