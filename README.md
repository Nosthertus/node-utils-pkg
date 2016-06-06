# node-utils-pkg
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

**.isJSON(Value)** => Boolean

Check if the given value is a valid JSON

Function tries to parse the value, in case the parsing failes the function will return false
```Javascript
var jsonString = '{"name":"nost","email":"nosthertus@gmail.com"}';

utils.isJSON(jsonString);  // Returns true
utils.isJSON({});          // Returns false
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

**.isObject(Value)** => Boolean

Checks if the given value is Object

function calls **Object.prototype**
```Javascript
utils.isObject({});       // Returns true
utils.isObject([]);       // Returns false
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

**.isString(Value)** => Boolean

Checks if the given value is String

function calls **Object.prototype**
```Javascript
utils.isString("Hello world");  //Returns true
utils.isString(2);              //Returns false
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

**.each(Array | Object, fn[Callback iterator], *Optional fn[Callback finish])**

Iterates each element of the Array|Object, this is not synchronous but it can simulate synchronous iterations with callbacks

**Callback iterator** has 3 parameters:
- **index**  => The current index iteration, if Object then it's property
- **value**  => The value of the current intex, if Object then it's property's value
- **next()** => Function that continues for the next iteration

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