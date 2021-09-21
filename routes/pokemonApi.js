const express = require("express");
const router = express.Router();
const axios = require("axios");
const pokemon = require('pokemontcgsdk')
pokemon.configure({apiKey: process.env.API_KEY});

router.get("/pokemonApi/all", async (req, res, next) => {
    pokemon.card.all()
    .then((cards) => { res.status(200).json(cards) })
    .catch(error => res.status(500).json(error))
})

router.get("/pokemonApi/all/:page", async (req, res, next) => {
    pokemon.card.where({ pageSize: 40, page: req.params.page})
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
})

router.get("/pokemonApi/:id", async (req, res, next) => {
    pokemon.card.find(req.params.id)
    .then(card => {res.status(200).json(card)})
    .catch(error => console.log(error))
})

// Search by name
router.get("/pokemonApi/search/:name/:page", async (req, res, next) => {
    await pokemon.card.where({ q: `name:${req.params.name}*`, pageSize: 40, page: req.params.page})
    .then(results => { res.status(200).json(results)})
    .catch(error => next(error))
})


// NOT IN THE APIHANDLER

router.get("/pokemonApi/search/type", async (req, res, next) => {
    await pokemon.type.all().then(response => res.status(200).json(response))
    .catch(error => next(error))
})

router.get("/pokemonApi/search/:type", async (req, res, next) => {
    await pokemon.card.where({ q : `type:${req.params.type}`})
})
module.exports = router;

