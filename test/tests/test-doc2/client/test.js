
/**
@module test-doc2/client
*/


(function() {

  define(["requireconfig"], function(rconfig) {
    var Test;
    return Test = (function() {
      /**
      		This is the description for my class.
      		@class Test
      		@constructor
      */

      function Test() {
        console.log("ok!");
      }

      /**
      		Funtion to calculate nothing
      		@method method1
      		@param {number} Number to operate on
      		@return {number} Cube of input
      */


      Test.prototype.method1 = function() {};

      /**
      		Funtion to calculate really nothing
      		@method method2
      		@param {number} Number to operate on
      		@return {number} Cube of input
      */


      Test.prototype.method2 = function() {};

      return Test;

    })();
  });

}).call(this);
