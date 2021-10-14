'use strict';

require('dotenv').config();




// start up DB for the server to access
// const mongoose = require('mongoose');
// const options = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// }

// mongoose.connect(process.env.MONGODB_URI, options);



// start the server file

require('./src/server').start(process.env.PORT || 3001);