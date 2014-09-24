
var module, made
module = window.transistor_base
made   = module.create({
	type  : "div",
	child : [
		{
			type    : "div",
			mark_as : "some:name",
			get_data : function () { 
				return "some crap"
			}
		}
	],
})

describe("create", function() {
	it("returns the expected value type", function() {
		expect( made.node.nodeName ).toEqual( "DIV" )
		expect( typeof made.mark ).toEqual("object")
		expect( typeof made.mark.name ).toBe( "undefined" )
		expect( typeof made.append_to ).toEqual( "function" )
		expect( typeof made.jump_to ).toEqual( "function" )
	})
	it("jump to works properly", function() {
		expect(made.jump_to({
			mark : "some:name",
			type : "data"
		})).toEqual("some crap")
	})
})	