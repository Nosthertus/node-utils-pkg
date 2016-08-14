var expect = require("expect");
var utils = require("../index.js");

describe("check existance", function(){
	it("should exist specific value in array", function(){
		var arr = ["a", "b", "c"];

		expect(utils.inArray(arr, "b")).toBe(true);
		expect(utils.inArray(arr, "d")).toBe(false);
	});

	it("should exists all provided values in array", function(){
		var arr = ["a", "b", "c"];

		expect(utils.inArray(arr, ["a", "c"])).toBe(true);
		expect(utils.inArray(arr, ["a", "e"])).toBe(false);
	});

	it("should exists specific value as key object", function(){
		var obj = {
			key: "value",
			length: 2
		};

		expect(utils.inKeyObject(obj, "key")).toBe(true);
		expect(utils.inKeyObject(obj, "method")).toBe(false);
	});

	it("should exists group of values as keys object", function(){
		var obj = {
			key: "value",
			length: 2
		};

		expect(utils.inKeyObject(obj, ["key", "length"])).toBe(true);
		expect(utils.inKeyObject(obj, ["method", "key"])).toBe(false);
	});
});

describe("check functionality", function(){
	it("should return a list of keys object", function(){
		var obj = {
			key: "value",
			length: 2
		};
		
		expect(utils.getIndexObject(obj)).toBeA("array");
	});

	it("should return new object with key name modified", function(){
		var obj = {
			key: "value",
			length: 2
		};
		
		expect(utils.changeKeyName(obj, "key", "prop")).toIncludeKey("prop");
	});

	it("should alter object with key name modified", function(){
		var obj = {
			key: "value",
			length: 2
		};
		
		utils.changeKeyName(obj, "key", "prop", true);

		expect(obj).toIncludeKey("prop");
	});

	it("should turn array into string", function(){
		expect(utils.arrayToString(["Hello", "World"])).toBe("Hello World");
	});

	it("should turn array into string with separator provided", function(){
		expect(utils.arrayToString(["Hello", "World"], ",")).toBe("Hello,World");
	});

	it("should verify falsy value", function(){
		expect(utils.isFalsy(false)).toBe(true);
		expect(utils.isFalsy(null)).toBe(true);
		expect(utils.isFalsy(undefined)).toBe(true);
		expect(utils.isFalsy(0)).toBe(true);
		expect(utils.isFalsy(NaN)).toBe(true);
		expect(utils.isFalsy('')).toBe(true);
		expect(utils.isFalsy("")).toBe(true);
	});
});

describe("check iteration", function(){
	it("should iterate array", function(done){
		var iterated = false;

		var each = {
			iterate: function(index, value, next){
				iterated = true;
				next();
			},
			finished: function(){
				expect(iterated).toBe(true);
				done();
			}
		};

		utils.each([1,2,3,4], each.iterate, each.finished);
	});

	it("should iterate object", function(done){
		var iterated = false;

		var each = {
			iterate: function(index, value, next){
				iterated = true;
				next();
			},
			finished: function(){
				expect(iterated).toBe(true);
				done();
			}
		};

		var obj = {
			key: "value",
			length: 3,
			freezed: false
		};

		utils.each(obj, each.iterate, each.finished);
	});

	it("should iterate number", function(done){
		var iterated = false;

		var each = {
			iterate: function(value, next){
				iterated = true;
				next();
			},
			finished: function(){
				expect(iterated).toBe(true);
				done();
			}
		};

		utils.each(5, each.iterate, each.finished);
	});
});