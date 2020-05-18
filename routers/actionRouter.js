const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();

//Get all actions

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(202).json(actions);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting actions"
      });
    });
});

//Get actions for specific ID

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting action"
      });
    });
});

//Post action to database

router.post("/", (req, res) => {
    db.insert(req.body).then(action => {
      res
        .status(200)
        .json(action)
        .catch(err => {
          res.status(500).json({ message: "Error posting" });
        });
    });
  });
  
  //Update action by id
  
  router.put("/:id", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ error: "Name and Description Required" });
    }
    db.update(req.params.id, req.body)
      .then(action => {
        action
          ? res.status(200).json(action)
          : res.status(404).json({ error: "cannot find that post" });
      })
      .catch(() => {
        res.status(500).json({ errorMessage: "Failed to edit" });
      });
  });
  
  // delete action by ID
  
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(project => {
        res.json(project);
      })
      .catch(() => {
        res.status(500).json;
      });
  });

module.exports = router;