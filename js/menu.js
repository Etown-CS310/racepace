"use strict";

(function(){
   window.addEventListener("load", init);
   


   function init() {
      let ready = document.getElementById("ready");
      let character = document.getElementById("charsel");

      character.addEventListener("click", characterfunc);
      ready.addEventListener("click", im_ready);

   }

   function im_ready() {
 // redirect to play
   window.location.href = '../menu_page/im_ready.html';
   }

   function characterfunc() {
 // redirect to character selection
   window.location.href = '../menu_page/character.html';      
   }
    
})();