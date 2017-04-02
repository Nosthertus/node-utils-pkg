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
 * Check if a value is Number
 * 
 * @param  {Any}  	 int Value to check if is integer
 * @return {Boolean}     Wheter the value is number or not
 */
module.exports.isNumber = function(int){
	return Object.prototype.toString.call(int) == "[object Number]";
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
 * Check if a value is String
 * 
 * @param  {Any}  	 str Value to check if is string
 * @return {Boolean}     Wheter the value is string or not
 */
module.exports.isString = function(str){
	return Object.prototype.toString.call(str) == "[object String]";
};

/**
 * Check if a value is Boolean
 * 
 * @param  {Any}     bool Value to check if is boolean
 * @return {Boolean}      Whether the value is boolean or not
 */
module.exports.isBoolean = function(bool){
	return Object.prototype.toString.call(bool) == "[object Boolean]";
};

/**
 * Checks if the value is function
 * 
 * @param  {Any}     fnc Value to check if is function
 * @return {Boolean}     Whether the value is function or not
 */
module.exports.isFunction = function(fnc){
	return typeof fnc == "function";
};

/**
 * Checks if both values have the same value structure
 * 
 * @param  {Any}     obj1 The first value to make the comparison
 * @param  {Anu}     obj2 The second value used for the comparison with the first
 * @return {Boolean}      Whether both values have exactly the same structure
 */
module.exports.isEqual = function(obj1, obj2){
	var self = this;

	// Check if one of the values is not undefined/null type
	if((typeof obj1 == "undefined" || typeof obj2 == "undefied") || (obj1 == null || obj2 == null)){
		return false;
	}

	// Check if both values have the same length
	// return false if length differ
	else if(Object.keys(obj1).length != Object.keys(obj2).length){
		return false;
	}

	else{
		var prop1 = Object.prototype.toString.call(obj1);
		var prop2 = Object.prototype.toString.call(obj2);

		// Check if both values are the same object type
		// retur false if both are differents
		if(prop1 != prop2){
			return false;
		}

		// Check deep objects if both values are object type of Array or Object
		else if(prop1 == "[object Array]" || prop1 == "[object Object]"){
			for(p in obj1){
				// return false if the second object does not contain the same
				// property/element as the first object
				if(typeof obj2[p] === "undefined"){
					return false;
				}

				else{
					var prototype1 = Object.prototype.toString.call(obj1[p]);
					var prototype2 = Object.prototype.toString.call(obj2[p]);

					// return false if both object property/element are different
					if(prototype1 != prototype2){
						return false;
					}

					// do recursive call if both property/array value are object or array
					else if(prototype1 == "[object Array]" || prototype1 == "[object Object]"){
						return self.isEqual(obj1[p], obj2[p]);
					}

					// return false if both simple values are not the same
					else if(obj1[p] != obj2[p]){
						return false;
					}
				}
			}
		}

		// Return the result of value comparison if both values are simple values
		else{
			return obj1 == obj2;
		}
	}

	return true;
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
 * @param  {Array|Object|Integer}   obj     Array/Object/Integer to make iteration
 * @param  {Function} 		        cb      Function with index, value and function to continue
 * @param  {Function}               finish  Function when iteration finishes
 */
module.exports.each = function(obj, cb, finish){
	var pkg = this; //Define this for inner functions use
	var keys = pkg.isNumber(obj) ? obj : pkg.getIndexObject(obj); //If paramter is number, set value number
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
		// Iterate over a number if passed value is number
		if(pkg.isNumber(obj) && obj > count){
			cb(count + 1, next);
		}

		// Iterate over an object if passed value is Array or Object
		else if(keys.length > count){
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

	else if(value == null){
		return true;
	}

	else if(this.isNumber(value) && Number.isNaN(value)){
		return true;
	}

	else{
		return false;
	}
}

/**
 * Merges properties of 2 objects
 * 
 * @param  {Object} obj1 The object for mergin properties
 * @param  {Object} obj2 The object for mergin properties
 * @throws {Error}  If   One of the parameters is not an object
 * @return {Object}      The object with new merged property values
 */
module.exports.merge = function(obj1, obj2){
	if(!this.isObject(obj1) || !this.isObject(obj1)){
		throw new Error("Parameter must be an object");
	}

	var obj = {};

	for(prop in obj1){
		obj[prop] = obj1[prop];
	}

	for(prop in obj2){
		obj[prop] = obj2[prop];
	}

	return obj;
}