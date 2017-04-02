# node-utils-pkg
[![Build Status](https://travis-ci.org/Nosthertus/node-utils-pkg.svg?branch=master)](https://travis-ci.org/Nosthertus/node-utils-pkg)

Utility package for Node.js

## Installation
```bash
$ npm install utils-pkg --save
```
## Usage
```Javascript
var utils = require("utils-pkg");
```
## Documentation
**.isArray(Value)** => Boolean

Checks if the given value is Array
function calls **Object.prototype**
```Javascript
utils.isArray([1, 2, 3]); // Returns true
utils.isArray(true);      // Returns false
```

* * *

**.isNumber(Value)** => Boolean

Checks if the given value is Number type

function calls **Object.prototype**
```Javascript
utils.isNumber(1);        // Returns true
utils.isNumber(1.2);      // Returns true
utils.isNumber("2");      // Returns false
```

* * *

**.isJSON(Value)** => Boolean

Check if the given value is a valid JSON

Function tries to parse the value, in case the parsing failes the function will return false
```Javascript
var jsonString = '{"name":"nost","email":"nosthertus@gmail.com"}';

utils.isJSON(jsonString);  // Returns true
utils.isJSON({});          // Returns false
```

* * *

**.isObject(Value)** => Boolean

Checks if the given value is Object

function calls **Object.prototype**
```Javascript
utils.isObject({});       // Returns true
utils.isObject([]);       // Returns false
```

* * *

**.isString(Value)** => Boolean

Checks if the given value is String

function calls **Object.prototype**
```Javascript
utils.isString("Hello world");  //Returns true
utils.isString(2);              //Returns false
```

* * *

**.isBoolean(Value)** => Boolean

Checks if the given value is Boolean

function calls **Object.prototype**
```Javascript
utils.isBoolean("true");         //Returns false
utils.isBoolean(true);           //Returns true
utils.isBoolean(false);          //Returns true
```

* * *

**.isFunction(Value)** => Boolean

Checks if the given value is function

```Javascript
var func = function(){};

utils.isFunction(true);         //Returns false
utils.isFunction(func);         //Returns true
utils.isFunction(function(){}); //Returns true
utils.isFunction("function");   //Returns false
```

* * *

**.isEqual(Any, Any)** => Boolean

Compares both values structure.

PS: it does not compare null and undefined values

```Javascript
var obj1 = {
	name: "nosthertus",
	languages: ["english", "spanish"]
};

var obj2 = {
	name: "nosthertus",
	languages: ["english", "spanish"]
};

var obj3 = "nosthertus";

utils.isEqual([], []]);      //Returns true
utils.isEqual(obj1, obj2);   //Returns true
utils.isEqual(obj1, obj3);   //Returns false
utils.isEqual(obj1, null);   //Returns false
```

* * *

**.inArray(Array, [String | Array])** => Boolean

Checks if a value is inside an Array
in case if the value to look is also an array, the function will return true if all elements from the value are found
```Javascript
var arr = ["a", "b", "c", "d"];

utils.inArray(arr, "a");         // Returns true
utils.inArray(arr, 2);           // Returns false
utils.inArray(arr, ["a", "c"]);  // Returns true
utils.inArray(arr, ["a", "e"]);  // Returns false
```

* * *

**.inKeyObject(Object, [String | Array])** => Boolean

Check if the given object has the property name as the given String

if the second parameter is an Array, it will turn all propertys into array and call **inArray()**
```Javascript
var obj = {
	name: "nost",
	email: "nosthertus@gmail.com"
};

utils.inKeyObject(obj, "name");             //Returns true
utils.inKeyObject(obj, ["name", "email"]);  //Returns true
utils.inKeyObject(obj, ["name", "age"]);    //Returns false
```

* * *

**.getIndexObject(Object)** => Array

Gathers all properties from the object

function calls **Object.keys**
```Javascript
var obj = {
	name: "nost",
	email: "nosthertus@gmail.com"
};

utils.getIndexObject(obj);  //Returns ["name", "email"]
```

* * *

**.changeKeyName([Object], oldKey[String], newKey[String], [Boolean])** => Object

Change the key name in an object
If 4th parameter is present, the function will alter the Object

```Javascript
var obj = {
	name: "nost",
	email: "nosthertus@gmail.com"
};

utils.changeKeyName(obj, "name", "nickName");  //Returns {nickName: "nost", email: "nosthertus@gmail.com"}

utils.changeKeyName(obj, "name", "nickName", true); //Object is altered
console.log(obj);  //{nickName: "nost", email: "nosthertus@gmail.com"}
```

* * *

**.arrayToString(Array, *Optional String[Separator])** => String

Turns array into string separated by separator

if no separator is given, the array will be separated by space
```Javascript
utils.arrayToString(["Hello", "World"]);       //Returns "Hello World"
utils.arrayToString(["Hello", "World"], ",");  //Returns "Hello,World"
```

* * *

**.each(Array | Object | Integer, fn[Callback iterator], *Optional fn[Callback finish])**

Iterates each element of the Array|Object or iterates over a number in case the passed value is Integer, this is not synchronous but it can simulate synchronous iterations with callbacks

**Callback iterator** has 3 parameters in case the value is Object/Array:
- **index**  => The current index iteration, if Object then it's property
- **value**  => The value of the current intex, if Object then it's property's value
- **next()** => Function that continues for the next iteration

**Note:** if passed value is integer, only **index** and **next()** are available, **index** is the current count

**Callback finish** function will be called once all the iterations are done
```Javascript
var obj = {
	name: "nosthertus",
	age: 23,
	email: "nosthertus@gmail.com"
};

var arr = ["hello", "world"];

var iteration = function(index, value, next){
	//log the current index and value
    console.log(index);  //if obj => "name"         if arr => 0
    console.log(value);  //if obj => "nosthertus"   if arr => "hello"

	//Continue to iteration after 1 second
    setTimeout(function(){
   		next(); //if there are no more elements to iterate, exit to finish()
    }, 1000);
};

var finish = function(){
	console.log("Iteration is finished");
};

utils.each(obj, iteration, finish); //Iteration function for obj Object
utils.each(arr, iteration, finish); //Iteration function for arr Array

//For integer case
utils.each(100, function(count, next){
	console.log(count);

	setTimeout(function(){
		next();
	}, 100);
}, function(){
	console.log("Count completed");
});
```

* * *

**.isFalsy(Value [Any])** => Boolean

Checks if a value is falsy

Check for Mozilla's Falsy glossary [Here](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
```Javascript
utils.isFalsy(false);       //Returns true
utils.isFalsy(null);        //Returns true
utils.isFalsy(undefined);   //Returns true
utils.isFalsy(0);           //Returns true
utils.isFalsy(NaN);         //Returns true
utils.isFalsy('');          //Returns true
utils.isFalsy("");          //Returns true
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits
Oscar Reyes [Nosthertus]
## License
[MIT](https://github.com/Nosthertus/node-playlist-extractor/blob/master/LICENSE.md)