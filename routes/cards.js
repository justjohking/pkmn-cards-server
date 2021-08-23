const express = require("express");
const { json } = require("express");
const router = express.Router();
const Card = require("../models/Card");
const Collection = require("../models/Collection");
const ObjectId = require('mongoose').Types.ObjectId;


// GET ALL THE CARDS OF THE USER
router.get("/me/cards", async (req, res, next) => {
    try {
      const allCards = await Card.find({owner: req.session.currentUser._id});
      res.status(200).json(allCards)
    } catch (error) { next(error) }
  })
  
  //Get one of the user's card
  router.get("/me/cards/:id", async (req, res, next) => {
    try {
      const oneCard = await Card.findById(req.params.id);
      res.status(200).json(oneCard)
    } catch (error) { next(error) }
  })
  
  // Add a card to the user's general collection
  router.post("/me/cards/add/", async (req, res, next) => {
    try {
      const newCard = req.body;
      newCard.owner = req.session.currentUser._id
      const dbRes = await Card.create(newCard);
      res.status(201).json(dbRes);
    } catch (error) { next(error) }
  })
  
  // Update the information of one of the user's card (either condition or price)
  router.patch("/me/cards/:id/edit/", async (req, res, next) => {
    try {
      const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {new : true});
      res.status(200).json(updatedCard);
    } catch (error) { next(error) }
  })

  router.delete("/me/cards/:id/delete", async (req, res, next) => {
      try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted")
      } catch (error) { next(error)}
  })

  router.get("/me/collection/:type", async (req, res, next) => {
    try {
      const foundCollection = await Collection.find({$and : [{type: req.params.type}, {owner: ObjectId(req.session.currentUser._id)}]});
      res.status(200).json(foundCollection);
    } catch (error) {console.error(error)}
  })

  // FIND A PARTICULAR COLLECTION
  router.patch("/me/collection/:type", async (req, res, next) => {
    // console.log(typeof req.session.currentUser._id) // ==> string
    // console.log(typeof req.params.type) // ==> string

    try{
      await Collection.findOneAndUpdate({$and : [{type: req.params.type}, {owner: ObjectId(req.session.currentUser._id)}]}, req.body, {new : true});
      res.status(200).json(req.body)
    }
    catch (error) {next(error)}
  })

module.exports = router;