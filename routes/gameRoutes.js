const express = require('express');
const router = express.Router();
const gameService = require('../services/gameService');

// GET all games function
router.get('/', async function(req, res, next) {
    try {
        res.json(await gameService.getAll());
    }
    catch(err) {
        console.error(`Error while getting data, ${err.message}`);
        next(err);
    }
});

// GET single game by id
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await gameService.get(req.params.id))
    }
    catch(err) {
        console.error(`Error while getting data, ${err.message}`);
        next(err);
    }
});

// POST new game
router.post('/', async function(req, res, next) {
    try {
        res.json(await gameService.create(req.body));
    }
    catch(err) {
        console.error(`Error while adding game, ${err.message}`);
        next(err);
    }
});

// UPDATE game entry
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await gameService.update(req.params.id, req.body))
    }
    catch(err) {
        console.error(`Error updating game entry, ${err.message}`);
        next(err);
    }
});

// DELETE game entry
router.delete(':id', async function(req, res, next) {
    try {
        res.json(await gameService.remove(req.params.id))
    }
    catch(err) {
        console.error(`Error removing game from database, ${err.message}`);
        next(err);
    }
});

module.exports = router;