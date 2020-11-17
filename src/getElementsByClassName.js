// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// You should use document.body, element.childNodes, and element.classList

//Input: Class Name
/*
var htmlStrings = [
  '<div class="targetClassName"></div>',
  '<div class="otherClassName targetClassName"></div>',
  '<div><div class="targetClassName"></div></div>',
  '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
  '<div><div></div><div><div class="targetClassName"></div></div></div>',
  '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
  '<div><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></div>'
];

//Output: Array of nodes with the className

// Constraints: Nothing specifc.

// Edge cases: None

// High level strategy
  // Access nodes in the DOM using document.body
  // Iterate over nodes
  // Base case: Node has no children according to element.childNodes
  // Recursive case: Node does have children according to element.childNodes
  // Create result array
  // Check against element.classList and include all nodes in result array that have the provided class name

  // Arugments:
    // class name
    // document body variable
    //

// Pseudocode

// If only one argument has been passed in
  // Assign document.body to variable nodes (needs to be an array-like object)
// Else if there are multiple arguments
  // Assign first argument to className
  // Assign second argument to nodes (needs to be an array-like object)

// Create result array
// Iterate over nodes
  // Base case
  // If current node has no children
    // Create classFound variable and assign false
    // Iterate over class list of current node
      // If current node has class name of className
        // Change classFound to true
    // If classFound is true
      // Add current node to result array
  // Recursive case
  // If current node has children
    // Create classFound variable and assign false
    // Iterate over class list of current node
      // If current node has class name of className
        // Change classFound to true
    // If classFound is true
      // Add current node to result array
    // Call getElementsByClassName on current node and add result to our result array (concat)
// Return result array
*/

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var nodes;
  if (arguments.length === 1) {
    nodes = [document.body];
  } else {
    nodes = arguments[1];
  }
  var result = [];
  for (var i = 0; i < nodes.length; i++) {
    if (!nodes[i].hasChildNodes()) {
      var classFound = false;
      if (nodes[i].classList) {
        nodes[i].classList.forEach(function(currentClass) {
          if (currentClass === className) {
            classFound = true;
          }
        });
      }
      if (classFound) {
        result.push(nodes[i]);
      }
    }
    if (nodes[i].hasChildNodes()) {
      var classFound = false;
      if (nodes[i].classList) {
        nodes[i].classList.forEach(function(currentClass) {
          if (currentClass === className) {
            classFound = true;
          }
        });
      }
      if (classFound) {
        result.push(nodes[i]);
      }
      result = result.concat(getElementsByClassName(className, nodes[i].childNodes));
    }
  }
  return result;
};
