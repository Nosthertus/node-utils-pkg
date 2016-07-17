/**
 * Check if value is Array
 * 
 * @param  {Any}     arr  Variable passed
 * @return {Boolean}      Whether if is array or not
 */
module.exports.isArray = function(arr){
	return Object.prototype.toString.call(arr) == "[object Array]";
};

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
};


/**
 * Check if a value is a valid JSON string
 * 
 * @param  {Any}  	 json The value to check if is JSON string
 * @return {Boolean}      Wheter the value is valid JSON string
 */
module.exports.isJSON = function(json){
	if(this.isString(json)){
		try{
			JSON.parse(json);
		}
		catch(e){
			return false;
		}

		return true;
	}

	return false;
}

/**
 * Check if a value is Number
 * 
 * @param  {Any}  	 int Value to check if is integer
 * @return {Boolean}     Wheter the value is number or not
 */
module.exports.isNumber = function(int){
	return Object.prototype.toString.call(int) == "[object Number]";
};

/**
 * Check if value is Object
 * 
 * @param  {Any}     obj  Variable passed
 * @return {Boolean}      Whether if is object or not
 */
module.exports.isObject = function(obj){
	return Object.prototype.toString.call(obj) == "[object Object]";
};

/**
 * Check if a value exists as key object
 * 
 * @param  {Object} 	  obj Object to find the keys
 * @param  {String|Array} key Key value to check if is in object
 * @return {Boolean}     	  Wheter the value is found
 */
module.exports.inKeyObject = function(obj, key){
	if(this.isArray(key)){
		var arr = [];

		for(k in obj)
			arr.push(k);

		return this.inArray(arr, key);
	};

	return obj.hasOwnProperty(key);
};

/**
 * Get all index values inside an Array/Object and returns an array
 * 
 * @param  {Object|Array} obj The Array/Object to gather index values
 * @return {Array}      	  The list of all index values found
 */
module.exports.getIndexObject = Object.keys || function(obj){
	var arr = [];

	for(k in obj){
		arr.push(k);
	}

	return arr;
};

/**
 * Change the key name in an object
 * 
 * @param  {Object}  obj   The object where to make the change
 * @param  {String}  oldp  The key name to change in object
 * @param  {String}  newp  The new key name to replace
 * @param  {Boolean} alter Whether alter the object itself
 * @return {Object}        If alter is present, then returns the new object
 */
module.exports.changeKeyName = function(obj, oldp, newp, alter){
	if(this.isObject(obj)){
		if(alter){
			obj[newp] = obj[oldp];
			delete obj[oldp];

			return obj;
		}

		else{
			var newobj = obj;
			newobj[newp] = obj[oldp];
			delete newobj[oldp];

			return newobj;
		}
	}
}

/**
 * Check if a value is String
 * 
 * @param  {Any}  	 str Value to check if is string
 * @return {Boolean}     Wheter the value is string or not
 */
module.exports.isString = function(str){
	return Object.prototype.toString.call(str) == "[object String]";
};

/**
 * Transforms array into string
 * 
 * @param  {Array}  arr Array to transform
 * @param  {String} spr Optional: value separator for each element
 * @return {String}     Array stringified
 */
module.exports.arrayToString = function(arr, spr){
	if(spr){
		return arr.join(spr);
	}

	return arr.join(" ");
}

/**
 * Iterates array or object synchronously
 * 
 * @param  {Array|Object}   obj     Array/Object to make iteration
 * @param  {Function} 		cb      Function with index, value and function to continue
 * @param  {Function}       finish  Function when iteration finishes
 */
module.exports.each = function(obj, cb, finish){
	var pkg = this; //Define this for inner functions use
	var keys = pkg.getIndexObject(obj);
	var count = 0;
	var index;
	var done = false;

	function getKey(){
		if(pkg.isArray(obj)){
			index = count;
		}

		if(pkg.isObject(obj)){
			index = keys[count];
		}
	}

	function iterate(){
		if(keys.length > count){
			getKey();
			cb(index, obj[index], next);
		}

		else{
			if(finish)
				finish();

			return true;
		}
	}

	function next(){
		count++;
		iterate();
	}

	iterate();
}

/**
 * Checks if a value is falsy
 * 
 * @param  {Any}     value Value to check
 * @return {Boolean}       Whether is falsy or not
 */
module.exports.isFalsy = function(value){
	if(value == false){
		return true;
	}

	if(value == null){
		return true;
	}

	else{
		return false;
	}
}