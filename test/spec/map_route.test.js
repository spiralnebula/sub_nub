var module
module = window.map_route

describe("map route", function() {
	
	describe("get value of nested object based on path", function() {
		it("does what is says on the tin", function() {
			expect(module.get_value_of_nested_object_based_on_route({
				route  : ["first", "first second", "second first"],
				object : { 
					"first" : { 
						"first first" : "some",
						"first second" : { 
							"second first" : [1,2,3]
						}
					}
				}
			})).toEqual([1,2,3])
		})
	})

	describe("is given name a sibling of the last member of route", function() {
		
		var map = { 
			"where" : {
				"child" : {
					"some" : {
						"child" : { 
							"are"  : "some",
							"some" : "123"
						}
					}
				}
			}
		}

		it("finds a sibling in the same route branch", function() {
			expect(module.is_given_name_a_sibling_of_the_last_member_of_route({
				name  : "some",
				route : ["where", "some", "are" ],
				map   : map
			})).toBe(true)
		})
	})
})