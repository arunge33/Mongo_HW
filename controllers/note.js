var axios = require("axios");
var cheerio = require("cheerio");

//fetch models
var db = require("../models");

module.exports = function(app) {
  // Save and update notes associated to article id
  app.post("/articles/:id", function(req, res) {
    // create new note and relay through db
    db.Note.create(req.body)
      .then(function(dbNote) {
        // Update new notes that are already associated with Article id
        return db.Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          note: dbNote._id
        }, {
          new: true
        });
      })
      .then(function(dbArticle) {
        //If true, respond
        res.json(dbArticle);
      })
      .catch(function(err) {
        //else, notify
        res.json(err);
      });
  });
}
