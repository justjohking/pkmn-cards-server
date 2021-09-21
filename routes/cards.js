const express = require("express");
const { json } = require("express");
const router = express.Router();
const Card = require("../models/Card");
const ObjectId = require('mongoose').Types.ObjectId;
const Auction = require("../models/Auction")


// GET ALL THE CARDS OF THE USER
router.get("/user/cards", async (req, res, next) => {
    try {
      const allCards = await Card.find({owner: req.session.currentUser._id}).sort({pokemonTCGId: 1});
      res.status(200).json(allCards)
    } catch (error) { next(error) }
})
  
//Get one of the user's card
router.get("/user/cards/:id", async (req, res, next) => {
  try {
    const oneCard = await Card.findById(req.params.id);
    res.status(200).json(oneCard)
  } catch (error) { next(error) }
})

// Get all the users' versions of one card
router.get("/user/cards/tcg/:tcgID", async (req, res, next) => {
  try {
    const oneCard = await Card.find({$and: [{pokemonTCGId : req.params.tcgID}, {owner: req.session.currentUser._id}]});
    res.status(200).json(oneCard)
  }
  catch (error) {next(error)}
})

// Add a card
router.post("/user/cards/add", async (req, res, next) => {
  try {
    const newCard = req.body;
    newCard.owner = req.session.currentUser._id
    const dbRes = await Card.create(newCard);
    res.status(201).json(dbRes);
  } catch (error) { next(error) }
})

// Update the information of one of the user's card (either condition or price)
router.patch("/user/cards/:id/update", async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.status(200).json(updatedCard);
  } catch (error) { next(error) }
})

router.delete("/user/cards/:id/delete", async (req, res, next) => {
    try {
      await Card.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted")
    } catch (error) { next(error)}
})



// NOT IN THE APIHANDLER
router.get("/cards", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    res.status(200).json(allCards)
  } catch (error) { next(error) }
})




//Get all the cards of an collection
router.get("/user/collection/:collection", async (req, res, next) => {
  try {
    const foundCollection = await Collection.find({$and : [{type: req.params.collection}, {owner: ObjectId(req.session.currentUser._id)}]});
    res.status(200).json(foundCollection);
  } catch (error) {console.error(error)}
})

router.patch("/user/collection/:collection", async (req, res, next) => {
  try{
    const dbRes = await Collection.findOneAndUpdate({$and : [{type: req.params.collection}, {owner: req.session.currentUser._id}]}, req.body, {new : true});
    res.status(200).json(dbRes)
  }
  catch (error) {next(error)}
})




module.exports = router;