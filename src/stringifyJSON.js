// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// Inputs:
// var stringifiableObjects = [
//   9,
//   null,
//   true,
//   false,
//   'Hello world',
//   [],
//   [8],
//   ['hi'],
//   [8, 'hi'],
//   [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
//   [8, [[], 3, 4]],
//   [[[['foo']]]],
//   {},
//   {'a': 'apple'},
//   {'foo': true, 'bar': false, 'baz': null},
//   {'boolean, true': true, 'boolean, false': false, 'null': null },
//   // basic nesting
//   {'a': {'b': 'c'}},
//   {'a': ['b', 'c']},
//   [{'a': 'b'}, {'c': 'd'}],
//   {'a': [], 'c': {}, 'b': true}
// ];

// used for stringifyJSON spec
// hint: JSON does not allow you to stringify functions or
// undefined values, so you should skip those key/value pairs.
// unstringifiableValues = [
//   {
//     'functions': function() {},
//     'undefined': undefined
//   }
// ];

// Outputs:
// '[9,null,true,false,"Hello world",[],[8],["hi"],[8,"hi"],[1,0,-1,-0.3,0.3,1343.32,3345,0.00011999999999999999],[8,[[],3,4]],[[[["foo"]]]],{},{"a":"apple"},{"foo":true,"bar":false,"baz":null},{"boolean, true":true,"boolean, false":false,"null":null},{"a":{"b":"c"}},{"a":["b","c"]},[{"a":"b"},{"c":"d"}],{"a":[],"c":{},"b":true}]'

// '[{}]'
/*
// Contraints:
// Can't use built-in stringify method

// Edge cases:
// Unstringifiable values

//High level Strategy:
  // Base case is single value element
  // Recursive case would be a 2 D element to get to single element value


//Pseudocode

  // Create result variable

  //Base Case
  // If array element is a number, null, boolean
    // return element as a string
    // Otherwise
      // if element is a string return element with  ""

  //Recursive Case
  //If element is an Array
    // Add "[" to result string
    // Iterate over elements
      // Pass the current value back into stringifyJSON
        // Add result to our result variable
      // If last element in current array "]" to result string
      // Otherwise if not last element in current array add "," to result string

  // If element is an Object
    // Add "{" to result string
    // Iterate over properties
      // If key is 'functions' or 'undefined'
        // Do nothing
      // Otherwise
        // Add " and key and " and : to result string
        // Pass the current value back into stringifyJSON
          // Add result to our result variable
      // If last property in current object "}" to result string
      // Otherwise if not last property in current object add "," to result string

*/

var stringifyJSON = function(obj) {

  var result = '';

  if (typeof obj === 'number') {
    return obj.toString();
  }

  if (obj === null) {
    return 'null';
  }

  if (obj === true) {
    return 'true';
  }

  if (obj === false) {
    return 'false';
  }

  if (typeof obj === 'string') {
    return `"${obj}"`;
  }


  if (Array.isArray(obj)) {
    result += '[';
    obj.forEach(function(value, index, array) {
      result += stringifyJSON(value);
      if (index !== array.length - 1) {
        result += ',';
      }
    });
    result += ']';
  }

  if (!Array.isArray(obj)) {
    result += '{';
    var objLengthCounter = 0;
    for (var key in obj) {
      if (key === 'functions' || key === 'undefined') {
        continue;
      } else {
        result += `"${key}":`;
      }
      result += stringifyJSON(obj[key]);
      objLengthCounter += 1;
      if (Object.keys(obj).length > objLengthCounter) {
        result += ',';
      }
    }
    result += '}';
  }

  return result;
};
