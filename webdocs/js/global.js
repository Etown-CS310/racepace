/*
The Purpose of this file is to load the navbar for all of the pages(potintially)
and to enforce that the player be logged in.



*/

(function(){
    window.addEventListener('load',includeHTML);
    function includeHTML() {
        let elmnt, file, xhttp;
          /*search for elements with a certain atrribute:*/
          elmnt=document.getElementById("includeNav");
          file = elmnt.getAttribute("navFile");
          
            /* Make an HTTP request using the attribute value as the file name: */
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                // Remove the attribute, and call this function once more: 
              }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            //return;
          }
  
      
})();