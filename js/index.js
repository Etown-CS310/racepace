"use strict";

(function(){

window.addEventListener('load',init);

function init(){
    let loginButton=document.getElementById("loginButton");
    loginButton.addEventListener("click",login);
    document.getElementById("showReg").addEventListener("click",showRegistration);
    document.getElementById("showLog").addEventListener("click",showLogin);
    document.getElementById("regButton").addEventListener("click",register);
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
function register(){
    location.href ="menu.html";
}

function showRegistration(){
    document.getElementById("logBox").classList.add("hidden");
    document.getElementById("regBox").classList.remove("hidden");
    document.getElementById("login").innerText="register";
}

function showLogin(){
    document.getElementById("regBox").classList.add("hidden");
    document.getElementById("logBox").classList.remove("hidden");
    document.getElementById("login").innerText="login";
}







}());