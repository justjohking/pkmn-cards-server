const express = require("express");
const Bid = require("../models/Bid");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();


router.get('/bids', requireAuth, (req, res, next) => {
    Bid.find()
        .then((foundBids) => {
            res.status(200).json(foundBids)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/bids/create', requireAuth, (req, res, next) => {
    Bid.create(req.body)
        .then((createdBid) => {
            res.status(201).json(createdBid)
        })
        .catch((err) => {
            console.log(err)
            res.status.status(500).json(err)
        })
})

router.get('/bids/:id', requireAuth, (req, res, next) => {
    Bid.findById(req.params.id).then((foundBid) => {
        res.status(200).json(foundBid)
    }).catch((err) => {
        console.log((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    })
})
module.exports = router;