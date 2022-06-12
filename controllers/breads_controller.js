const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require('../models/baker.js');
const breadSeedData = require('../models/bread_seed.js');

// INDEX
breads.get("/", async (req, res) => {
  const foundBakers = await Baker.find();
  const foundBreads = await Bread.find();

  res.render("index", {
    breads: foundBreads,
    bakers: foundBakers,
    title: "Index Page",
  });
});

// NEW
breads.get("/new", (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    });
});

// EDIT
breads.get("/:id/edit", async (req, res) => {
  let bakers;
  await Baker.find()
    .then(foundBakers => {
      bakers = foundBakers
    });

  let bread;
  await Bread.findById(req.params.id)
    .then(foundBread => {
      bread = foundBread;
    });

  res.render("edit", {
    bread,
    id: req.params.id,
    bakers,
  });
});

// DATA/SEED
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeedData)
    .then(res.redirect('/breads'));
});

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})


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
