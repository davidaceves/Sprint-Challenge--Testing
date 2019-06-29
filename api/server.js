const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.get('/games', (req, res) => {
    Games.getAll()
        .then(games => {
            res.status(200).json(games);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = server;