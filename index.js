/**
 * Check if value is Array
 * 
 * @param  {Any}     arr  Variable passed
 * @return {Boolean}      Whether if is array or not
 */
module.exports.isArray = function(arr){
	return Object.prototype.toString.call(arr) == "[object Array]";
}

/**
 * Check if a value is inside an Array
 * 
 * @param  {Array} 		  arr Array where to find the value
 * @param  {String|Array} val Value to check if is in array
 * @return {Boolean}     	  Whether the value/values are found in the array
 */
module.exports.inArray = function(arr, val){
	if(this.isArray(val)){
		var matched = 0;

		for (var i = 0; i < val.length; i++) {
			if(this.inArray(arr, val[i]))
				matched++;
		}

		return matched == val.length;
	}

	return arr.indexOf(val) > -1;
}

/**
 * Check if a value is Number
 * 
 * @param  {Any}  	 int Value to check if is integer
 * @return {Boolean}     Wheter the value is number or not
 */
module.exports.isNumber = function(int){
	return Object.prototype.toString.call(int) == "[object Number]";
}

/**
 * Check if value is Object
 * 
 * @param  {Any}     obj  Variable passed
 * @return {Boolean}      Whether if is object or not
 */
module.exports.isObject = function(obj){
	return Object.prototype.toString.call(obj) == "[object Object]";
}

/**
 * Check if a value is String
 * 
 * @param  {Any}  	 str Value to check if is string
 * @return {Boolean}     Wheter the value is string or not
 */
module.exports.isString = function(str){
	return Object.prototype.toString.call(str) == "[object String]";
}