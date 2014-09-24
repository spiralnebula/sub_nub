
var module, made
module         = window.transistor_abstract
module.library = {
	transistor_keywords_to_parent_map : window.transistor_keywords_to_parent_map
}

describe("translate", function() {
	it("does basic translation", function() {
		expect(module.translate({
			"class" : "some class",
			"text"  : "some text here"
		})).toEqual({
			type : "div",
			attribute : {
				"class" : "some class"
			},
			property : { 
				"textContent" : "some text here"
			},
			style : {},
		})
	})
	it("does advanced style translation", function() {
		expect(module.translate({
			"display"          : "block",
			"background-color" : "red",
			"top"              : "100px"
		})).toEqual({
			type      : "div",
			attribute : {},
			property  : {},
			style     : {
				display         : "block",
				backgroundColor : "red",
				top             : "100px"
			}
		})
	})

	it("recognises data-* type keywords as attributes", function() {
		expect(module.translate({
			"data-some" : "some some",
			"data-sss"  : "some sumo som"
		})).toEqual({
			type      : "div",
			attribute : {
				"data-some" : "some some",
				"data-sss"  : "some sumo som"
			},
			property  : {},
			style     : {}
		})
	})

	it("has children", function() {
		expect(module.translate({
			child : [
				{
					type               : "input",
					"background-color" : "some some"
				}
			]
		})).toEqual({
			type  : "div",
			attribute : {},
			property  : {},
			style     : {},
			child : [
				{
					type      : "input",
					attribute : {},
					property  : {},
					style : {
						backgroundColor : "some some"
					}
				}
			]
		})	
	})
})