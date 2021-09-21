const express = require("express");
const Auction = require("../models/Auction");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const Card = require("../models/Card")

// Find all cards on sale
router.get('/auctions', requireAuth, (req, res, next) => {
    Card.find({onSale: true})
    .then((foundAuctions) => {
        res.status(200).json(foundAuctions)
    })
    .catch((error) => {next(error)})
})

// Get one auction
router.get('/auctions/:id', requireAuth, (req, res, next) => {
    Auction.findById(req.params.id).populate("buyer")
    .then((foundAuction) => {
        res.status(200).json(foundAuction)
    })
    .catch((error) => {next(error)})
})

//Update an Auction (when placing a bid)
router.patch('/auctions/:id', requireAuth, (req, res, next) => {
    const bid = req.body
    bid.buyer = req.session.currentUser._id

    Auction.findByIdAndUpdate(req.params.id, bid, {new: true})
    .then((updatedAuction) => {
        res.status(200).json(updatedAuction)
    })
    .catch((error) => {next(error)})
})

// Create an auction
router.post('/user/auctions/create', requireAuth, (req, res, next) => {
    const auction = req.body;
    auction.seller = req.session.currentUser._id;

    Auction.create(auction)
    .then((createdAuction) => {
        res.status(201).json(createdAuction)
    })
    .catch((error) => {next(error)})
})

router.delete('/user/auctions/:id/delete', requireAuth, (req, res, next) => {
    Auction.findByIdAndDelete(req.params.id)
    .then(deletedDocument => {
        res.status(200).json(deletedDocument)
    })
    .catch((error) => {next(error)})
})

router.delete('/user/auctions/:id/deleteByItem', requireAuth, (req, res, next) => {
    Auction.findOneAndDelete({item: req.params.id})
    .then(() => { res.status(200).json("deleted") })
    .catch((error) => {next(error)})
})

router.get('/user/auctions', requireAuth, (req, res, next) => {
    Auction.find({$and: [{seller: req.session.currentUser._id}, { "buyer" : { "$exists" : true } }]})
      .populate("item")
      .then((foundAuction => {
        res.status(200).json(foundAuction)
      }))
      .catch((error) => {next(error)})
})

// Get all AUCTIONS for a TCGCard
router.get('/auctions/:tcgId', async (req, res, next) => {
try {
    const card = await Card.find({$and:[{pokemonTCGId: req.params.tcgId}, {onSale: true}]}).populate("owner").populate("bid")
    res.status(200).json(card)
} 
catch (error) {next(error)}
})


module.exports = router;