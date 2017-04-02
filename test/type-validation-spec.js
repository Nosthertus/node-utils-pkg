var utils = require("../index.js");
var expect = require("expect");

describe("type validation", function(){
	it("should correctly validate array", function(){
		expect(utils.isArray([])).toBe(true);
		expect(utils.isArray(true)).toBe(false);
	});

	it("should correctly validate number", function(){
		expect(utils.isNumber(1)).toBe(true);
		expect(utils.isNumber("1")).toBe(false);
	});

	it("should correctly validate JSON string", function(){
		expect(utils.isJSON('{"name":"nost","email":"nosthertus@gmail.com"}')).toBe(true);
		expect(utils.isJSON({})).toBe(false);
	});

	it("should correctly validate object", function(){
		expect(utils.isObject({})).toBe(true);
		expect(utils.isObject([])).toBe(false);
	});

	it("should correctly validate string", function(){
		expect(utils.isString("Hello world")).toBe(true);
		expect(utils.isString(2)).toBe(false);
	});

	it("should correctly validate boolean", function(){
		expect(utils.isBoolean(true)).toBe(true);
		expect(utils.isBoolean("true")).toBe(false);
	});

	it("should correctly validate function value", function(){
		expect(utils.isFunction(function(){})).toBe(true);
		expect(utils.isFunction("function")).toBe(false);
	});

	it("should correctly validate object structure equality", function(){
		var obj1 = {
			name: "nosthertus",
			languages: ["english", "spanish"]
		};

		var obj2 = {
			name: "nosthertus",
			languages: ["english", "spanish"]
		};

		var obj3 = "nosthertus";

		expect(utils.isEqual([], [])).toBe(true);
		expect(utils.isEqual(obj1, obj2)).toBe(true);
		expect(utils.isEqual(obj1, obj3)).toBe(false);
		expect(utils.isEqual(obj1, null)).toBe(false);
	});
})