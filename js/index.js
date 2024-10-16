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
    let passwords=document.getElementsByClassName("regPassword");
    if(passwords[0].value==""){
        document.getElementById("regErr").innerText="Password cannot be blank";
    }
    else if(passwords[0].value==passwords[1].value){
        location.href ="menu.html";
    }
    else{
        document.getElementById("regErr").innerText="Passwords Must Match";
    }
    
}

function showRegistration(){
    document.getElementById("logBox").classList.add("hidden");
    let regBox=document.getElementById("regBox");
    regBox.classList.remove("hidden");
    regBox.classList.add("regBox");
    document.getElementById("login").innerText="register";
}

function showLogin(){
    let regBox=document.getElementById("regBox");
    regBox.classList.remove("regBox");
    regBox.classList.add("hidden");
    document.getElementById("logBox").classList.remove("hidden");
    document.getElementById("login").innerText="login";
}







}());