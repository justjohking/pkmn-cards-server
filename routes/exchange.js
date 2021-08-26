const express = require("express");
const router = express.Router();
const Exchange = require("../models/Exchange");
const Card = require("../models/Card")

// Get all cards open for exchange
router.get("/exchanges", async (req, res, next) => {
    await Card.find({$and: [{openForExchange : true}/*, {owner: {$ne: req.session.currentUser_id}}*/]})
    .then((response) => res.status(200).json(response))
    .catch(error => next(error))
})

// Get all cards of a pokemon card open for exchange
router.get("/exchanges/:tcgId", async(req, res, next) => {
    await Card.find({$and: [{openForExchange : true}, {pokemonTCGId: req.params.tcgId}]}).populate("owner")
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
})

router.get("/profile/exchanges", async (req, res, next) => {
    await Exchange.find({seller: req.session.currentUser._id}).populate("sellerItem").populate("buyerItem")
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
})

router.post("/profile/exchanges/create", async (req,res,next) => {
    const exchange = req.body;
    exchange.buyer = req.session.currentUser._id;
    await Exchange.create(exchange)
    .then(response => res.status(201).json(response))
    .catch(error => next(error))
})

// delete an exchange (offer) 
router.delete("/profile/exchanges/:id", async (req, res, next) => {
    await Exchange.findByIdAndDelete(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
})

//get the exchange offer initiated by the user and over one particular item
router.get("/profile/exchanges/:id", async (req, res, next) => {
    await Exchange.find({buyer: req.session.currentUser._id}, {sellerItem: req.params.id})
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
})

module.exports = router