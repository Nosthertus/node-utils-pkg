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
 * Check if value is Object
 * 
 * @param  {Any}     obj  Variable passed
 * @return {Boolean}      Whether if is object or not
 */
module.exports.isObject = function(obj){
	return Object.prototype.toString.call(obj) == "[object Object]";
}