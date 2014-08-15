define({
	define : {
		allow   : "*",
		require : [
			"morphism"
		]
	},

	parse_route : function ( route ) {

		var new_level

		new_level = this.get_the_value_out_of_an_object_based_on_array({
			array  : this.format_route_for_node_list_traversal( route.current ),
			object : route.map
		})
		new_level = ( new_level === false ? route.map : new_level )

		if ( this.is_object_empty(new_level) ) {
			return this.parse_route({
				map     : route.map,
				current : route.current.slice(0, route.current.length-1),
				new     : route.new
			})
		} else {
			
			if ( ( new_level.child && new_level.child.hasOwnProperty( route.new ) ) || 
				 new_level.hasOwnProperty( route.new ) 
			) {
				return route.current.concat( route.new )
			} 

			if ( route.current.length === 1 ) {
				return route.current
			}

			return this.parse_route({
				map     : route.map,
				current : route.current.slice(0, route.current.length-1),
				new     : route.new
			})
		}
	},

	get_nodes_to_show_and_hide_for_the_routing : function ( route ) {
		return { 
			show : this.get_nodes_for_route_from_map({
				current   : route.current,
				node_list : [],
				map       : route.map
			}),
			hide : this.get_node_difference_from_two_routes({
				current : route.current,
				old     : route.old,
				map     : route.map
			})
		}
	},

	get_node_difference_from_two_routes : function ( route ) {
		return this.library.morphism.epimorph_array({
			array   : this.get_nodes_for_route_from_map({
				current   : route.old,
				node_list : [],
				map       : route.map
			}),
			exclude : this.get_nodes_for_route_from_map({
				current   : route.current,
				node_list : [],
				map       : route.map
			})
		})
	},

	get_nodes_for_route_from_map : function ( route ) {

		var new_level

		new_level = this.get_the_value_out_of_an_object_based_on_array({
			array  : this.format_route_for_node_list_traversal( route.current ),
			object : route.map
		})
		new_level = ( new_level === false ? route.map : new_level ) 

		if ( route.current.length === 0 ) {
			return route.node_list
		} else {
			return this.get_nodes_for_route_from_map({
				map       : route.map,
				current   : route.current.slice(0, route.current.length-1),
				node_list : ( new_level.node ? [new_level.node].concat( route.node_list ) : route.node_list )
			})
		}
	},

	format_route_for_node_list_traversal : function ( route ) {
		return this.library.morphism.index_loop({
			array   : route,
			else_do : function ( loop ) {
				if ( loop.index === 0 ) {
					return loop.into.concat( loop.indexed )
				} else {
					return loop.into.concat( ["child", loop.indexed] )
				}
			}
		})
	},

	get_the_value_out_of_an_object_based_on_array : function ( the ) {
		return this.library.morphism.index_loop({
			array   : the.array,
			into    : the.object,
			if_done : function ( loop ) {
				return ( loop.array.length === 0 ? false : loop.into )
			},
			else_do : function ( loop ) {
				if ( loop.into.hasOwnProperty( loop.indexed ) ) {
					loop.into = loop.into[loop.indexed]
				} else {
					loop.into = false
				}
				return loop.into
			}
		})
	},

	is_object_empty : function ( object ) {
		var result = this.library.morphism.homomorph({
			object : object,
			set    : "array",
			with   : function (member) {
				return member.value
			}
		})
		return ( result.length === 0 )
	},

	convert_map_into_node_map : function ( convert ) {

		var self
		self = this

		return this.library.morphism.index_loop({
			array   : convert.map,
			into    : {},
			else_do : function ( loop ) {

				if ( loop.indexed.list && loop.indexed.list.length > 0 ) {
					loop.into[loop.indexed.name] = {
						node  : convert.node.children[loop.index].children[1],
						child : self.convert_map_into_node_map({
							map  : loop.indexed.list,
							node : convert.node.children[loop.index].children[1]
						})
					}
				} else {
					loop.into[loop.indexed.name] = {}
				}

				return loop.into
			}
		})
	}
})