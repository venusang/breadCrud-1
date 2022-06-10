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

// DATA/SEED
breads.get('/data/seed', (req, res) => {
  let manyBreads = [
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ];

  Bread.insertMany(manyBreads)
    .then(createdBreads => {
      res.redirect('/breads');
    });
});

// SHOW - THIS ALWAYS GOES AFTER ALL THE OTHER get methods 
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
