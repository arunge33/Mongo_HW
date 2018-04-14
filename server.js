//reqs.
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



//connect
var PORT = process.env.PORT || 3000;

//establish express
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//establish handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api/api-routes.js")(app);
require("./routes/view/view-routes.js")(app);
app.use(routes);

//establish async query capacity with .then syntax
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

//Serve
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
