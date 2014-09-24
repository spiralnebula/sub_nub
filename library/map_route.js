(function ( window, module ) {

	if ( window.define && window.define.amd ) {
		define(module)
	} else { 

		var current_scripts, this_script, module_name

		current_scripts     = document.getElementsByTagName("script")
		this_script         = current_scripts[current_scripts.length-1]
		module_name         = this_script.getAttribute("data-module-name") || module.define.name
		window[module_name] = module
	}
})( 
	window,
	{
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
						var node_to_pass
						node_to_pass = ( loop.indexed.class_name ? 
							convert.node.children[loop.index].children[2] : 
							convert.node.children[loop.index].children[1]
						)
						loop.into[loop.indexed.name] = {
							node  : node_to_pass,
							child : self.convert_map_into_node_map({
								map  : loop.indexed.list,
								node : node_to_pass
							})
						}
					} else {
						loop.into[loop.indexed.name] = {}
					}

					return loop.into
				}
			})
		},

		get_value_of_nested_object_based_on_route : function ( get ) {

			if ( get.route.length > 0 ) {
				return this.get_value_of_nested_object_based_on_route({
					route  : get.route.slice( 1 ),
					object : get.object[get.route[0]]
				})
			} else {
				return get.object
			}
		},

		is_given_name_a_child_of_the_last_member_of_route : function ( what ) { 
			var true_route, member
			true_route = what.route.slice(0).join("#subnubsplit#child#subnubsplit#").split("#subnubsplit#")
			member     = this.get_value_of_nested_object_based_on_route({
				object : what.map,
				route  : true_route
			})
			
			return ( 
				member.constructor === Object  &&
				member.hasOwnProperty("child") &&
				member.child.hasOwnProperty( what.name )
			)
		},

		is_given_name_a_sibling_of_the_last_member_of_route : function ( what ) {
			var true_route, siblings
			true_route = what.route.slice(0, what.route.length-1 ).join("#subnubsplit#child#subnubsplit#").split("#subnubsplit#")
			siblings   = this.get_value_of_nested_object_based_on_route({
				object : what.map,
				route  : true_route.concat("child")
			})
			return siblings.hasOwnProperty( what.name )
		}
	}
)