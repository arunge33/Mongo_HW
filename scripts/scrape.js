var axios = require("axios");
var express = require("express");
var cheerio = require("cheerio");

var Scrape = function(req, res) {
  //app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("article h2").each(function(i, element) {
        var result = {};

        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");
        result.summary = $(this).parent();

        console.log(result.title);
        console.log(result.link);
        console.log(result.summary);

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });

      res.send("Scrape Complete");
    });
  //});
}

module.exports = Scrape;
