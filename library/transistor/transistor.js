"use strict";
(function ( window, module ) {

	if ( window.define && window.define.amd ) {
		define(module)
	} else { 

		var current_scripts, this_script, module_name

		current_scripts     = document.getElementsByTagName("script")
		this_script         = current_scripts[current_scripts.length-1]
		module_name         = this_script.getAttribute("data-module-name") || "transistor"
		window[module_name] = module
	}
})( 
	window,
	{

		define : { 
			allow   : "*",
			require : [
				"maker",
				"pretty",
				"bowtie"
			]
		},

		make : function ( what ) {
			var layer_order, definition, node_to_parent_map, control_map
			definition  = what || window.transistor
			layer_order = [
				this.library.pretty,
				this.library.maker
			]
			node_to_parent_map = this.call_layer({
				with   : definition,
				layer  : layer_order,
				method : "create"
			})
			control_map = this.call_layer({
				with   : node_to_parent_map,
				layer  : layer_order.slice(0).reverse(),
				method : "refine",
			})
			return this.library.bowtie.make({
				body           : this.library.maker.join_parent_to_node_map_by_parent_and_return_base_node({
					map : node_to_parent_map 
				}),
				control_map    : control_map,
				node_to_parent : node_to_parent_map

			})
		},

		call_layer : function ( call ) {
			
			call.at = call.at || 0
			if ( call.at >= call.layer.length ) { 
				return call.with
			} else {
				return this.call_layer({
					layer  : call.layer,
					at     : call.at + 1,
					method : call.method,
					with   : call.layer[call.at][call.method]( call.with )
				})
			}
		}
	}
)