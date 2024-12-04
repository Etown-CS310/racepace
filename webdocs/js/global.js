/*
The Purpose of this file is to load the navbar for all of the pages(potintially)
and to enforce that the player be logged in.



*/

(function(){
    window.addEventListener('load',init);

    async function init() {
      await includeHTML();

    }

    function includeHTML() {
        let elmnt, file, xhttp;
          /*search for elements with a certain atrribute:*/
          elmnt=document.getElementById("includeNav");
          file = elmnt.getAttribute("navFile");
          
            /* Make an HTTP request using the attribute value as the file name: */
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  elmnt.innerHTML = this.responseText;
                  document.getElementById("logout").addEventListener("click", logout); // logout function to delete cookie

                }
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                // Remove the attribute, and call this function once more: 
              }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            //return;            


          }

          function logout(){
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        
            window.location.href = "../index.html";
        }
  
      
})();