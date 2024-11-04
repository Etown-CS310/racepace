"use strict";

const express = require("express");
const multer= require("multer");
const app= express();
const port= process.env.PORT | 8080;

//telling the server where the web files come from
app.use(express.static("webdocs"));
app.use(multer().none());

app.get('/hello',(req,res) => {
    res.type('text').send("RacePaceComingSoon");
});

app.post('/login',async function (req,res){
    let Authentic;
    if(req.body.username=='root' && req.body.password==''){
        Authentic=1;
    }
    else{
        Authentic=0;
    }
    res.type('json').send({'Verified':Authentic});
});

app.listen(port);
console.log("server started on http://localhost:"+port);