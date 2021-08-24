const express = require("express");
const Bid = require("../models/Bid");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const Card = require("../models/Card")


router.get('/bids', requireAuth, (req, res, next) => {
    Card.find({onSale: true})
        .then((foundBids) => {
            res.status(200).json(foundBids)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/bids/create/', requireAuth, (req, res, next) => {
    const bid = req.body
    bid.seller = req.session.currentUser._id

    Bid.create(bid)
        .then((createdBid) => {
            res.status(201).json(createdBid)
        })
        .catch((err) => {
            console.log(err)
            res.status.status(500).json(err)
        })
})

router.get('/bids/:id', requireAuth, (req, res, next) => {
    Bid.findById(req.params.id).populate("buyer").then((foundBid) => {
        res.status(200).json(foundBid)
    }).catch((err) => {
        console.log((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    })
})

router.patch('/bids/:id', requireAuth, (req, res, next) => {
    const bid = req.body
    bid.buyer = req.session.currentUser._id
    Bid.findByIdAndUpdate(req.params.id, bid, {new: true})
        .then((updatedBid) => {
            res.status(200).json(updatedBid)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.delete('/bids/:id', requireAuth, (req, res, next) => {
    Bid.findByIdAndDelete(req.params.id)
    .then(deletedDocument => {
        res.status(200).json(deletedDocument)
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router;