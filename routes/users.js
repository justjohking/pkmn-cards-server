const express = require("express");
const User = require("../models/User");
const Bid = require('../models/Bid')
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/profile", requireAuth, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err)
    });
  
  
});

router.get('/profile/bids', requireAuth, (req, res, next) => {
  Bid.find({$and: [{seller: req.session.currentUser._id}, { "buyer" : { "$exists" : true } }]})
    .populate("item")
    .then((foundBid => {
      res.status(200).json(foundBid)
    }))
    .catch(err => {
      console.log(err)
    })
})

router.patch("/profile/edit", requireAuth, async (req, res, next) => {
  const id = req.session.currentUser._id

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ message: "id is not valid"})
  }

  const toUpdate = req.body;

  try {
    const updated = await User.findByIdAndUpdate(id, toUpdate, {
      new: true,
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }

});

router.delete('/profile/delete', requireAuth, async (req, res, next) => {
  const id = req.session.currentUser._id

  try {
    User.findByIdAndDelete(id)
    return res.status(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }

})

module.exports = router;
