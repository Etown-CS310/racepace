"use strict";

(function () {



    function init() {
        document.getElementById("selectChar").addEventListener('click', submitRequest);
    }

    function submitRequest() {
        const activeItem = document.querySelector('.carousel-item.active');
        const characterData = activeItem.getAttribute('data-character');

        fetch('/character', { method: "POST", body: characterData })
        .then(checkStatus)
        .then(resp => resp.text())
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
        console.log("Response:", responseText);
    }

    function handleError(error) {
        console.error("Check out the Network tab for the response details!", error);
    }

    init();

});