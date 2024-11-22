"use strict";

const express = require("express");
const multer= require("multer");
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//require("crypto").randomBytes(35).toString("hex")
const jwtSecret= process.env.JWTSecret || '918dd9b3078e95382697d991cc346325faef7c7aa94c942c0039f248213a2b0d8d3085';
const app= express();
const port= process.env.PORT || 8080;
const db_path='racepace.db';

//telling the server where the web files come from
app.use(express.static("webdocs"));
app.use(multer().none());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/register',async function(req,res) {
    const password_cipher=await bcrypt.hash(req.body.password,10)
    const success=await insertUser(req.body.username,password_cipher);
    res.json({'Success':success});
});

app.post('/login',async function (req,res){
    const userInfo=await getUserInfo(req.body.username);
    if(userInfo){
    const result = await bcrypt.compare(req.body.password,userInfo[0].password);
    //console.log(userInfo[0].password);
    if(userInfo.length==1 && result){
        
        const maxAge= 1 * 24 * 60 * 60;
        const token = jwt.sign(
            {"login":true,"username":req.body.username},
                jwtSecret,
                {expiresIn:maxAge}
        );
        res.cookie('jwt',token,{'maxAge':maxAge*1000,httpOnly:true});
        res.status(200).type('json').send({'Verified':1});
    }
    else{
        res.status(401).type('json').send({'Verified':0});
    }
    }
    else{
        res.status(401).type('json').send({'Verified':0});
    }
});

app.get('/getUserStatus',async function(req,res){
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken)=>{
            const login_status = decodedToken.login;
            if(login_status){
                res.status(200).type('text').send("you did it");
            }
            else
                res.sendFile(__dirname+"/webdocs/index.html");
        });
    }
    else
        res.sendFile(__dirname+"/webdocs/index.html");
    
});

app.post('/character', async function (req, res) {
    let token=req.cookies.jwt;
    if(token){
        jwt.verify(token,jwtSecret,async (err,decodedCookie)=>{
            let username=decodedCookie.username;
            let character = req.body.character;
            updateCharacter(character,username);
            res.type("json").send({'char':character});
        });
    }
    else
        res.status(401).json({"char":"you not logged in lol"});
});

app.get('/reqChar',async function(req,res){
    let token=req.cookies.jwt;
    if(token){
        jwt.verify(token,jwtSecret,async (err,decodedCookie)=>{
            let username=decodedCookie.username;
            const userInfo = await getUserInfo(username);
            const char= await getCharacterInfo(userInfo[0].character_id);
            //console.log(userInfo,char);
            res.status(200).json({"character": char[0].character_name});
        });
    }
    else
        res.status(401).json({'character':'jakob',msg:"you not logged in lol"});
});

async function insertUser(username,password){
    const userInfo=await getUserInfo(username);
    if(userInfo.length==1)
        return 0;
    const db = await getDBConnection();
    const sql= "insert into users(username,password) values (?,?);";
    
    db.run(sql,[username,password]);
    return 1;
}

async function getUserInfo(username){
    const db = await getDBConnection();
    const sql="select * from users where username= ?;";
    return db.all(sql,[username]);
}

async function getCharacterInfo(character_id){
    const db = await getDBConnection();
    const sql='select * from characters where character_id=?;';
    return db.all(sql,[character_id]);
}

async function getDBConnection(){
    const db = await sqlite.open({
        filename:db_path,
        driver:sqlite3.Database
    });
    return db;
}

async function updateCharacter(character,username){
    const db = await getDBConnection();
    let sql = 'select * from characters where character_name=?;';
    let char_id= await db.all(sql,[character]);
    char_id=char_id[0]['character_id'];
    sql='update users set character_id=? where username=?;';
    await db.run(sql,[char_id,username]);
}

app.listen(port);
console.log("server started on http://localhost:"+port);