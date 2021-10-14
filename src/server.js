'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

const { checkJwt } = require("./auth/checkjwt");


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', homeHandler);
app.get('/user', checkJwt, userHandler)

function homeHandler(request, response){
  response.status(200).json({
    'title':'Ravenmoore Valley server Home'});
}

function userHandler(request, response){
  response.status(200).json({
    'title':'secured user page'});
}


module.exports ={
  server: app,
  start: port => {
    if(!port){throw new Error('Missing start port!!');}
    app.listen(port, ()=> console.log(`Ravenmoore valley community server is up on ${port}`));
  },
};