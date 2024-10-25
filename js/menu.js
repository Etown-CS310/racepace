"use strict";

(function(){
   window.addEventListener("load", init);
   


   function init() {
      let ready = document.getElementById("ready");
      let character = document.getElementById("charsel");
      //let play_button = document.getElementById("play_button");

      character.addEventListener("click", characterfunc);
      ready.addEventListener("click", im_ready);
      //play_button.addEventListener("click", playfunc);

   }

   function im_ready() {
 // redirect to play
   window.location.href = '../menu_page/game2_page.html';
   }

   function characterfunc() {
 // redirect to character selection
   window.location.href = '../menu_page/character.html';      
   }
/*
   function playfunc() {
 // redirect to the game
    window.location.href = 'game_page.html';
   }*/
    
})();