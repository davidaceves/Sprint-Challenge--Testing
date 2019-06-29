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

server.post("/games", (req, res) => {
  const { title, genre } = req.body;

  if (!genre || !title) {
    res.status(422).json({
      message: "Missing title or genre."
    });
    return;
  }
  Games.insert(req.body)
    .then(game => {
      res.status(201).json(game);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
