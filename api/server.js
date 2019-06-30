const express = require("express");

const Games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/games", (req, res) => {
  Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/games", async (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    res.status(422).send({
      message: "Please enter a title and genre."
    });
    return;
  }
  try {
    await Games.insert(req.body).then(req => {
      res.status(201).send(req);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = server;
