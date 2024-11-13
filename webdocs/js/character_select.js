"use strict";

(function () {
    
    window.addEventListener('load',init);
    const BASE_URL='http://localhost:8080';

    function init() {
        document.getElementById("selectChar").addEventListener('click', submitRequest);
    }

    function submitRequest() {
        const activeItem = document.querySelector('.carousel-item.active');
        const characterData = activeItem.getAttribute('data-character');
        let formData=new FormData();
        formData.append('character',characterData);
        fetch(BASE_URL+'/character', { method: "POST", body: formData })
        .then(checkStatus)
        .then(function(response){return response.json();})
        .then(showResponse) 
        .catch(handleError);
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function showResponse(responseText) {
        console.log(responseText.char);
    }

    function handleError(error) {
        console.error("Check out the Network tab for the response details!", error);
    }

})();