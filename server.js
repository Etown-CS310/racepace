"use strict";

const express = require("express");
//const multer= require("multer");
const app= express();
const port= process.env.PORT | 8080;

//telling the server where the web files come from
app.use(express.static("webdocs"));

app.listen(port);
console.log("server started on http://localhost:"+port);