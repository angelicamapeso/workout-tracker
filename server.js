const express = require('express');

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

//start server
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}.`);
});
