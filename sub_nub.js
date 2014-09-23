define({

	define : {
		allow   : "*",
		require : [
			"morphism",
			"map_route",
			"transistor"
		]
	},

	make : function () {
		return {}
	},

	define_state : function ( define ) { 
		return {
			route : { 
				current : [],
				old     : [],
				node    : {
					show : [],
					hide : []
				}
			}
		}
	},

	define_event : function ( define ) {
		return [
			{
				called       : "enter list",
				that_happens : [
					{
						on   : define.body,
						is   : [ "mouseover" ],
					}
				],
				only_if      : function ( heard ) {
					return ( heard.event.target.getAttribute("data-subnub-list") === "true" )
				}
			},
			{ 
				called       : "enter no list",
				that_happens : [
					{ 
						on : define.body,
						is : [ "mouseover" ]
					}
				],
				only_if      : function ( heard ) { 
					return ( 
						heard.event.target.getAttribute("data-subnub-list") === "false" &&
						heard.state.route.current.length > 1
					)
				}
			},
			{
				called       : "leave",
				that_happens : [
					{
						on   : define.body,
						is   : [ "mouseleave" ],
					}
				],
				only_if      : function (heard) {
					return true
				}
			}
		]
	},

	define_listener : function ( define ) {

		var self, map
		
		self = this
		map  = this.library.map_route.convert_map_into_node_map({
			map  : define.list,
			node : define.body
		})

		return [
			{ 
				for       : "enter no list",
				that_does : function ( heard ) {

					var current_location_name, last_route_location, is_location_name_a_sibling_of_last_location

					current_location_name                       = heard.event.target.getAttribute("data-subnub-name")
					last_route_location                         = heard.state.route.current[heard.state.route.current.length-1]
					is_location_name_a_sibling_of_last_location = self.library.map_route.is_given_name_a_sibling_of_the_last_member_of_route({
						map   : map,
						route : heard.state.route.current,
						name  : current_location_name
					})

					if ( 
						current_location_name !== last_route_location &&
						is_location_name_a_sibling_of_last_location
					) {

						heard.state.route.node = self.library.map_route.get_nodes_to_show_and_hide_for_the_routing({
							old     : heard.state.route.current,
							current : heard.state.route.current.slice( 0, heard.state.route.current.length-1 ),
							map     : map
						})

						self.library.morphism.index_loop({
							array   : heard.state.route.node.hide,
							else_do : function ( loop ) {
								loop.indexed.style.display = "none"
								loop.indexed.previousSibling.setAttribute( "class", define.class_name.item )
								return loop.into.concat( "none" )
							}
						})
					}

					return heard
				}
			},
			{
				for       : "enter list",
				that_does : function ( heard ) {

					if ( 
						heard.event.target.getAttribute("data-first") && 
						heard.state.route.current[0] !== heard.event.target.nextSibling.getAttribute("data-name")
					) {
						var node, softscreen
						softscreen = 
						node       = self.library.map_route.get_nodes_to_show_and_hide_for_the_routing({
							old     : heard.state.route.current,
							current : [],
							map     : map
						})

						self.library.morphism.index_loop({
							array   : node.hide,
							else_do : function ( loop ) {
								loop.indexed.style.display = "none"
								return loop.into.concat( "none" )
							}
						})

						heard.state.route.current = []
					}

					heard.state.route.old     = heard.state.route.current.slice(0)
					heard.state.route.current = self.library.map_route.parse_route({
						map     : map,
						current : heard.state.route.current,
						new     : heard.event.target.nextSibling.getAttribute("data-name")
					})

					return heard
				}
			},
			{
				for       : "enter list",
				that_does : function ( heard ) {

					heard.state.route.node = self.library.map_route.get_nodes_to_show_and_hide_for_the_routing({
						old     : heard.state.route.old,
						current : heard.state.route.current,
						map     : map
					})

					self.library.morphism.index_loop({
						array   : heard.state.route.node.hide,
						else_do : function ( loop ) {
							loop.indexed.style.display = "none"
							loop.indexed.previousSibling.setAttribute( "class", define.class_name.item )
							return loop.into.concat( "none" )
						}
					})

					self.library.morphism.index_loop({
						array   : heard.state.route.node.show,
						else_do : function ( loop ) {
							loop.indexed.style.display = "block"
							if ( loop.index > 0 ) {
								loop.indexed.previousSibling.setAttribute( "class", define.class_name.selected_item )
							}
							return loop.into.concat( "block" )
						}
					})

					return heard
				}
			},
			{
				for       : "leave",
				that_does : function ( heard ) {

					var node = self.library.map_route.get_nodes_to_show_and_hide_for_the_routing({
						old     : heard.state.route.current,
						current : [],
						map     : map
					})

					self.library.morphism.index_loop({
						array   : node.hide,
						else_do : function ( loop ) {
							loop.indexed.style.display = "none"
							if ( loop.index > 0 ) { 
								loop.indexed.previousSibling.setAttribute( "class", define.class_name.item )
							}
							return loop.into.concat( "none" )
						}
					})

					heard.state.route.current = []
					heard.state.route.old     = []
					return heard		
				}
			}
		]
	},

	define_body : function ( define ) { 
		return {
			type    : "div",
			"class" : define.class_name.main,
			child   : this.define_list_children_body({
				list            : define.list,
				class_name      : define.class_name
			})
		}
	},

	define_list_children_body : function (define) {

		var self = this

		return this.library.morphism.index_loop({
			array   : define.list,
			else_do : function ( loop ) {
				var definition, has_list

				has_list   = ( loop.indexed.list && loop.indexed.list.length > 0 )
				definition = {
					"class" : define.class_name.item,
					child   : [
						{
							"type"             : "a",
							"data-subnub-list" : ( has_list ? "true" : "false" ),
							"href"             : loop.indexed.link,
							"data-subnub-name" : loop.indexed.name,
							"target"           : loop.indexed.target || "_self",
							"class"            : (
								loop.indexed.class_name ? 
									loop.indexed.class_name : 
									define.class_name.text 
							),
							"text"  : loop.indexed.name,
						}
					]
				}
				if ( loop.indexed.class_name ) {
					definition.child[0]["data-first"] = "true"
				}
				
				if ( has_list ) {
					definition.child = definition.child.concat({
						type        : "div",
						"class"     : define.class_name.sub,
						"data-sub"  : "true",
						"data-name" : loop.indexed.name,
						display     : "none",
						child       : self.define_list_children_body({
							list       : loop.indexed.list,
							class_name : {
								sub  : define.class_name.sub_sub  || define.class_name.sub,
								item : define.class_name.sub_item || define.class_name.item,
								text : define.class_name.sub_text || define.class_name.text
							}
						})
					})
				}

				return loop.into.concat( definition )
			}
		})
	}	
})