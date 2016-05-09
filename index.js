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
 * Check if value is Object
 * 
 * @param  {Any}     obj  Variable passed
 * @return {Boolean}      Whether if is object or not
 */
module.exports.isObject = function(obj){
	return Object.prototype.toString.call(obj) == "[object Object]";
}