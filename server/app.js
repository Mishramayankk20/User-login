const https = require("https");
const fs = require('fs')
const path = require('path')
const express = require('express');
const bodyParser =require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const mysql = require('mysql');
//const withAuth = require('./server/routes/middleware');
const app = express();
require('dotenv').config();


app.use(cors({
    credentials: true,
    origin : ["http://localhost:3000"]
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(withAuth);
app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
  
    return next();
  
  });
const port = process.env.PORT || 5000;



const routes = require('./server/routes/user');

app.use('/',routes);

app.listen(port,()=>console.log(`secure server on port ${port}`))
//app.listen(port,()=>console.log(`listening on port ${port}`));