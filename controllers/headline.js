var axios = require("axios");
var cheerio = require("cheerio");

//fetch models
var db = require("../models");

module.exports = function(app) {

  // establish route for getting all articles from the db
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        console.log("Heres your scrappings, sucka" + dbArticle);
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // parses article data by :id
  app.get("/articles/:id", function(req, res) {
    // matches query to db
    db.Article.findOne({
        _id: req.params.id
      })
      // populate all notes associated with the id
      .populate("note")
      .then(function(dbArticle) {
        // If true, respond
        res.json(dbArticle);
      })
      .catch(function(err) {
        // else, notify
        res.json(err);
      });
  });
}
