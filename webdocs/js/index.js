"use strict";

(function(){
//let url='http://localhost:8080/';
let url='https://34.47.21.233/';

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
    let formData=new FormData();
    formData.append('username',document.getElementById("username").value);
    formData.append('password',document.getElementById("password").value);
    //console.log(formData);
    
    fetch(url+"login",{ method:"POST",body:formData})
    .then(function(response){
        if(response.ok)
            return response;
        else
            return "Network Error: could not verify street cred";
    })
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        if(json.Verified){
            location.href ="menu.html";
        }
        else{
            document.getElementById("logErr").innerText="Invalid Username or Password";
            document.getElementById("regBlurb").classList.remove("hidden");
        }
    })
    .catch(console.log)
    ;

}
function register(){
    let passwords=document.getElementsByClassName("regPassword");
    if(passwords[0].value=="")
        document.getElementById("regErr").innerText="Password Cannot be blank";
    else if(passwords[0].value==passwords[1].value){
        // send a post request to the server to add a user
        let regForm=new FormData(document.getElementById('register'));
        fetch(url+"register",{method:"POST",body:regForm})
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                return "Network Error: could not register internet sucks roflol";
        })
        .then((json)=>{
            if(json.Success){
                location.href ="index.html";
            }
            else{
                document.getElementById("regErr").innerText="Registration Error Please get good lol";
            }
        })
        .catch(console.log)
        ;
    }
    else
        document.getElementById("regErr").innerText="Passwords Must Match";
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