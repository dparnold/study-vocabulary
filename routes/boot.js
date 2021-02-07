var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  results = [
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
    {
      header: "VW",
      body: "Golf 5",
      days: "3",
    },
    {
      header: "BMW",
      body: "i3",
      days: "4",
    },
    {
      header: "Mercedes",
      body: "C-Klasse Coupe?",
      days: "4",
    },
  ];
  res.render('boot', { "results": results, "title": "hallo" });
});

module.exports = router;
