const express = require('express');
const mongoose = require('mongoose');

//set port
const PORT = process.env.PORT || 3000;

//create express app
const app = express();

//parsing url encoded strings
app.use(express.urlencoded({ extended: true }));
//paring json
app.use(express.json());

//set static assets
app.use(express.static('public'));

//HTML Routes
app.use(require('./routes/html-routes.js'));
//API Routes
app.use('/api', require('./routes/api-routes.js'));

//connect to database
mongoose
  .connect('mongodb://localhost/workout', {
    //to fix deprecation warnings
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    //start server
    app.listen(PORT, () => {
      console.log(`App running on port: ${PORT}.`);
    });
  });
