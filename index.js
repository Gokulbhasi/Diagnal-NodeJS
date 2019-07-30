const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const Log = require("./startup/logging");
Log.error();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);

// const Films = require("./model/filmsModel");
// const jsonData = require("./data.json");

//insert jsonData

// Films.collection.insert(jsonData, (err, docs) => {
//   if (err) {
//     return console.error(err);
//   } else {
//     console.log("added");
//   }
// });

//configuration
//debug("Application Name: " + config.get("name")); //export NODE_ENV=production // DEBUG=app:startup nodemon index.js //

const port = process.env.PORT || 3000;
app.listen(port, () => Log.logger.info(`listening to ${port}`));
