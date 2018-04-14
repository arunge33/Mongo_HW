var axios = require("axios");
var cheerio = require("cheerio");

//fetch models
var db = require("../models");

var Fetch = function(){

}

//save items to db
module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      //parse title, link, summary to article h2 elements.
      $("article h2").each(function(i, element) {
        var result = {};

        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");
        result.summary = $(this).parent();

        //data check
        console.log(result.title);
        console.log(result.link);
        console.log(result.summary);

        //create a new article
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
      //shoot your loot + sanity check
      res.send("Scrape Complete");
    });
  });
}
