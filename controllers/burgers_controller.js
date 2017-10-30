var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");
//this will have host our routes
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "name"
  ], [  
    req.body.name
  ], function(result) {
    res.json({id: result.insertId});
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id= " + req.params.id;
  console.log("condition",condition);
  console.log(req.body)
  var changes = "devour = " + req.body.devour 
  burger.update(changes, condition, function(result) {
    console.log(result);
    if(result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;