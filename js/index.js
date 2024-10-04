"use strict";

(function(){

window.addEventListener('load',init);

function init(){
    let loginButton=document.getElementById("loginButton");
    loginButton.addEventListener("click",login);
}

function login(){
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    if(username=="root" & password==""){
        location.href ="menu.html";
    }
    else{
        document.getElementById("logErr").innerText="Invalid Username or Password";
        document.getElementById("regBlurb").classList.remove("hidden");
    }

}











}());