"use strict";

const express = require("express");
const multer= require("multer");
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app= express();
const port= process.env.PORT || 8080;
const db_path='racepace.db';

//telling the server where the web files come from
app.use(express.static("webdocs"));
app.use(multer().none());

app.get('/hello',(req,res) => {
    res.type('text').send("RacePaceComingSoon");
});

app.post('/login',async function (req,res){
    let Authentic;
    const userInfo=await getUserInfo(req.body.username,req.body.password);
    if(userInfo.length==1){
        Authentic=1;
    }
    else{
        Authentic=0;
    }
    res.type('json').send({'Verified':Authentic});
});

app.post('/register',async function(req,res) {
    const success=await insertUser(req.body.username,req.body.password);
    res.json({'Success':success});
});

async function insertUser(username,password){
    const userInfo=await getUserInfo(username,password);
    if(userInfo.length==1)
        return 0;
    const db = await getDBConnection();
    const sql= "insert into users(username,password) values (?,?);";
    
    db.run(sql,[username,password]);
    return 1;
}

async function getUserInfo(username,password){
    const db = await getDBConnection();
    const sql="select * from users where username= ? and password = ?;";
    return db.all(sql,[username,password]);
}

async function getDBConnection(){
    const db = await sqlite.open({
        filename:db_path,
        driver:sqlite3.Database
    });
    return db;
}

app.listen(port);
console.log("server started on http://localhost:"+port);