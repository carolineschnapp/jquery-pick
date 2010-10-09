/*
 * Pick (for jQuery)
 * version: 1.0 (10/07/2010)
 * @requires any version of jQuery
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2010, 2010 Caroline Hill [ mllegeorgesand@gmail.com ]
 *
 * Usage:
 *
 *  jQuery(document).ready(function() {
 *    jQuery('#gallery li').pick(6);
 *  })
 *
 *  The above will randomly pick 6 elements from the wrapped set, and
 *  remove others from the document.
 *
 *  What is returned is the wrapped set of picked elements.
 *  The removed elements are no longer in that set.
 *
 *  Ex:
 *
 *  var how_many = jQuery('#gallery li').pick(6).size(); // Will return 6.
 *
 */

(function( $ ){
  $.fn.pick = function(how_many) {
    
    var how_many = how_many || 4;
  
    // Picking random numbers without repeating. 
    var index_array = [];
    var original_obj_size = this.size();
    for (var i=0; i<original_obj_size; i++) {
      index_array.push(i);
    }
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [rev. #1]
    var shuffle = function(v) {
      for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
      return v;
    };
    var new_index_array = shuffle(index_array).slice(0,how_many);
    
    // Ditching unpicked elements and removing those from the returned set.
    return this.each(function(i) {
       if ($.inArray(i,new_index_array) === -1) {
          $(this).remove();
       }
    }).filter(function() {
      if (this.parentNode === null) {
        return false;
      }
      else {
        return true;
      }
    });

  };
})( jQuery );