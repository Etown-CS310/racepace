"use strict";

(function(){
   window.addEventListener("load", init);
   


   function init() {
      window.addEventListener("click", character);
      window.addEventListener("click", im_ready);

   }

   function im_ready() {
 // redirect to play
   let url_ready = 'im_ready.html';
   window.location.href = url_ready;
   }

   function character() {
 // redirect to character selection
   let url_char = 'character.html';
   window.location.href = url_char;      
   }
    
})();