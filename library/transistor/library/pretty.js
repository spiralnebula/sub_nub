(function ( window, module ) {

	if ( window.define && window.define.amd ) {
		define(module)
	} else { 

		var current_scripts, this_script, module_name

		current_scripts     = document.getElementsByTagName("script")
		this_script         = current_scripts[current_scripts.length-1]
		module_name         = this_script.getAttribute("data-module-name") || "pretty"
		window[module_name] = module
	}
})( 
	window,
	{
		define : {
			require : [
				"pretty_keywords_to_parent_map"
			],
			allow : "*"
		},

		refine : function ( what ) { 
			return what
		},

		create : function ( what ) {
			var keyword, definition
			definition = {
				type      : what.type || "div",
				attribute : {},
				property  : {},
				style     : {}
			}

			for ( keyword in what ) {
				
				if ( keyword.match("data-") !== null ) { 
					definition["attribute"][keyword] = what[keyword]
				}

				if ( this.library.pretty_keywords_to_parent_map.map.hasOwnProperty( keyword ) ) { 
					var keyword_map
					keyword_map = this.library.pretty_keywords_to_parent_map.map[keyword]
					definition[keyword_map.parent][keyword_map.property] = what[keyword]
				}

				if ( keyword === "mark_as" ) {
					definition.mark_as = what[keyword]
				}
				
				if ( keyword === "child" ) { 
					definition.child = this.translate_many({
						child : what[keyword] 
					})
				}

			}

			return definition
		},

		translate_many : function ( translate ) {

			translate.at   = translate.at   || 0
			translate.into = translate.into || []

			if ( translate.at >= translate.child.length ) {
				return translate.into
			} else {
				return this.translate_many({ 
					at    : translate.at + 1,
					into  : translate.into.concat(this.create( translate.child[translate.at] )),
					child : translate.child.slice(0)
				})
			}
		}
	}
)