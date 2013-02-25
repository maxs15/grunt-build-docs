
/**
@module test-doc/client
*/


(function() {

  define(["requireconfig"], function(rconfig) {
    var Cube;
    return Cube = (function() {
      /**
      		This is the description for my class.
      		@class Cube
      		@constructor
      */

      function Cube() {
        console.log("ok!");
      }

      /**
      		Funtion to calculate cube height
      		@method method1
      		@param {number} Number to operate on
      		@return {number} Cube of input
      */


      Cube.prototype.calculateHeight = function() {};

      /**
      		Funtion to calculate cube size
      		@method method2
      		@param {number} Number to operate on
      		@return {number} Cube of input
      */


      Cube.prototype.calculateSize = function() {};

      return Cube;

    })();
  });

}).call(this);
