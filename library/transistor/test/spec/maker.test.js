var module, parent_node_map
module          = window.maker
parent_node_map = module.split_definition_into_parent_node_map({
	definition : {
		type  : "div",
		child : [
			{
				type  : "span",
			},
			{
				type  : "section",
				child : [
					{
						type  : "input",
					},
					{
						type  : "span",
						child : [
							{
								type : "article"
							}
						]
					},
				]
			},
		]
	}
})

describe("create", function() {
	it("makes one basic node", function() {
		var node
		node = module.create({
			type  : "div",
			style : {
				"display" : "none",
				"color"   : "#fff"
			},
			property  : { 
				"textContent" : "text"
			},
			attribute : { 
				"data-custom" : "some",
				"value"       : "some"
			}
		})
		expect(node.getAttribute("data-custom")).toEqual("some")
		expect(node.getAttribute("value")).toEqual("some")
		expect(node.textContent).toEqual("text")
		expect(node.style.display).toEqual("none")
		expect(node.style.color).toEqual("rgb(255, 255, 255)")
	})
})

describe("split definition into parent node map", function() {
	it("does exactly that", function() {
		expect(parent_node_map[0].parent).toBe(false)
		expect(parent_node_map[1].node.nodeName).toEqual("SPAN")
		expect(parent_node_map[2].node.nodeName).toEqual("SECTION")
		expect(parent_node_map[2].parent.nodeName).toEqual("DIV")
		expect(parent_node_map[3].node.nodeName).toEqual("INPUT")
		expect(parent_node_map[3].parent.nodeName).toEqual("SECTION")
		expect(parent_node_map[4].node.nodeName).toEqual("SPAN")
		expect(parent_node_map[4].parent.nodeName).toEqual("SECTION")
		expect(parent_node_map[5].node.nodeName).toEqual("ARTICLE")
		expect(parent_node_map[5].parent.nodeName).toEqual("SPAN")
	})	
})

describe("join parent to node map by parent and return base node", function() {
	it("does that for some reason", function() {
		var node
		node = module.join_parent_to_node_map_by_parent_and_return_base_node({
			map : parent_node_map 
		})
		expect(node.children[0].nodeName).toEqual("SPAN")
		// console.log( node )
	})
})