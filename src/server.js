'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

const { checkJwt } = require("./auth/checkjwt");
const listingsRoutes = require("./Routes/listingRoutes");
const usersRoutes = require("./Routes/userRoutes");
const newsRoutes = require("./Routes/newsRoutes");
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', homeHandler);
app.get('/user', checkJwt, userHandler);
app.use('/api', listingsRoutes,usersRoutes,newsRoutes );


app.use('*', notFoundHandler);
app.use(errorHandler);


function homeHandler(request, response){
  response.status(200).json({
    'title':'Ravenmoore Valley server Home'});
}

// get permissions on req.user.permissions this is how we will asign acl

function userHandler(request, response){
  console.log(request.user)
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