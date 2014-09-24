"use strict";
(function ( window, module ) {

	if ( window.define && window.define.amd ) {
		define(module)
	} else { 

		var current_scripts, this_script, module_name

		current_scripts     = document.getElementsByTagName("script")
		this_script         = current_scripts[current_scripts.length-1]
		module_name         = this_script.getAttribute("data-module-name") || "maker"
		window[module_name] = module
	}
})( 
	window,
	{

		define : {
			allow : "*",
		},

		refine : function ( what ) {
			return {
				marked : this.merge_two_arrays_into_object(this.create_marked_as_map({
					map  : what,
					into : {
						key  : [],
						value : []
					}
				}))
			}
		},

		create_marked_as_map : function ( marked ) { 
			
			marked.at = marked.at || 0

			if ( marked.at >= marked.map.length ) { 
				return marked.into
			} else {
				return this.create_marked_as_map({
					at   : marked.at + 1,
					map  : marked.map,
					into : {
						key  : marked.into.key.concat(( 
							marked.map[marked.at].definition.mark_as ? 
								marked.map[marked.at].definition.mark_as : 
								[] 
						)),
						value : marked.into.value.concat((
							marked.map[marked.at].definition.mark_as ?
								this.define_mark_as( marked.map[marked.at] ): 
								[]
						))
					}
				})
			}
		},

		define_mark_as : function ( define ) { 
			return {
				body : define.node
			}
		},

		create : function ( what ) {
			var parent_to_node
			parent_to_node = this.split_definition_into_parent_node_map({
				definition : what
			})
			return parent_to_node
		},

		make_node : function ( node ) {
			
			var body
			body = document.createElement( node.type )
			
			if ( node.style ) {
				for ( var property in node.style ) {
					body.style[property] = node.style[property]
				}
			}

			if ( node.attribute ) {
				for ( var attribute in node.attribute ) {
					body.setAttribute(attribute, node.attribute[attribute] )
				}
			}

			if ( node.property ) {
				for ( var property in node.property ) {
					body[property] = node.property[property]
				}
			}

			return body
		},

		split_definition_into_parent_node_map : function ( split ) {

			split.at         = split.at     || 0
			split.into       = split.into   || []
			split.parent     = split.parent || false
			split.definition = [].concat( split.definition )

			if ( split.at >= split.definition.length ) { 
				return split.into
			} else { 
				var into, definition, parent_to_node, node
				definition     = split.definition.slice(split.at, split.at+1)[0]
				into           = []
				node           = this.make_node( definition )
				parent_to_node = {
					parent     : split.parent,
					node       : node,
					definition : {
						type      : definition.type,
						attribute : definition.attribute,
						property  : definition.property,
						style     : definition.style,
						mark_as   : definition.mark_as || false
					}
				}
				if ( definition.child ) {
					into = this.split_definition_into_parent_node_map({
						parent     : node,
						definition : definition.child
					})
				}
				return this.split_definition_into_parent_node_map({
					at         : split.at + 1,
					into       : split.into.concat(parent_to_node, into),
					definition : split.definition,
					parent     : split.parent
				})
			}
		},

		join_parent_to_node_map_by_parent_and_return_base_node : function ( join ) { 
			
			join.at = ( join.at === undefined ? 1 : join.at )
			if ( join.at >= join.map.length ) {
				return join.map[0].node
			} else {
				var indexed
				indexed = join.map.slice( join.at, join.at + 1 )[0]
				indexed.parent.appendChild( indexed.node )
				return this.join_parent_to_node_map_by_parent_and_return_base_node({
					at  : join.at + 1,
					map : join.map.slice(0),
				})
			}
		},

		merge_two_arrays_into_object : function ( merge ) {
			
			merge.at     = merge.at     || 0
			merge.object = merge.object || {}
			
			if ( merge.at >= merge.key.length ) { 
				return merge.object
			} else { 
				
				var object
				object                            = merge.object
				merge.object[merge.key[merge.at]] = merge.value[merge.at]

				return this.merge_two_arrays_into_object({
					key    : merge.key.slice(0),
					value  : merge.value.slice(0),
					at     : merge.at + 1,
					object : object
				})
			}
		}
	}		
)