const express = require("express");
const router = express.Router();
const Exchange = require("../models/Exchange");
const Card = require("../models/Card")

// Get all cards open for exchange
router.get("/exchanges", async (req, res, next) => {
    await Card.find({openForExchange : true})
    .then((response) => res.status(200).json(response))
    .catch(error => next(error))
})

// Get all cards of a pokemon card open for exchange
router.get("/exchanges/:tcgId", async(req, res, next) => {
    await Card.find({$and: [{openForExchange : true}, {pokemonTCGId: req.params.tcgId}]}).populate("owner")
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
})

module.exports = router