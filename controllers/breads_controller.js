const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");

// INDEX
breads.get("/", (req, res) => {
  console.log(Bread);

  Bread.find().then((foundBreads) => {
    console.log(foundBreads);
    res.render("index", {
      breads: foundBreads,
      title: "Index Page",
    });
  });
});

// NEW
breads.get("/new", (req, res) => {
  res.render("new");
});

// EDIT
breads.get("/:id/edit", (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render("edit", {
        bread: foundBread,
        id: req.params.id,
      });
    });

});

// SHOW
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id).then((foundBread) => {
    res.render("Show", { bread: foundBread, id: req.params.id });
  });
});

// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }

  if (req.body.hasGluten == "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      console.log('updatedBread', updatedBread);
      res.redirect(`/breads/${req.params.id}`);
    });
});

// DELETE
breads.delete("/:id", (req, res) => {
  console.log("did this do anything");
  Bread.findByIdAndDelete(req.params.id);
  Bread.splice(req.params.id, 1);
  res.status(303).redirect("/breads");
});

module.exports = breads;
