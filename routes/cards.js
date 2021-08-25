const express = require("express");
const { json } = require("express");
const router = express.Router();
const Card = require("../models/Card");
const ObjectId = require('mongoose').Types.ObjectId;
const Bid = require("../models/Bid")


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

  // Get all the users' versions of one card
  router.get("/me/cards/all/:apiId", async (req, res, next) => {
    try {
      const oneCard = await Card.find({$and: [{pokemonTCGId : req.params.apiId}, {owner: req.session.currentUser._id}]});
      res.status(200).json(oneCard)
    }
    catch (error) {next(error)}
  })
  
  // Add a card to the user's general collection
  router.post("/me/cards/add", async (req, res, next) => {
    try {
      const newCard = req.body;
      newCard.owner = req.session.currentUser._id
      const dbRes = await Card.create(newCard);
      res.status(201).json(dbRes);
    } catch (error) { next(error) }
  })
  
  // Update the information of one of the user's card (either condition or price)
  router.patch("/me/cards/:id/edit", async (req, res, next) => {
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

  //Get all the cards of an collection
  router.get("/me/collection/:collection", async (req, res, next) => {
    try {
      const foundCollection = await Collection.find({$and : [{type: req.params.collection}, {owner: ObjectId(req.session.currentUser._id)}]});
      res.status(200).json(foundCollection);
    } catch (error) {console.error(error)}
  })

  router.patch("/me/collection/:collection", async (req, res, next) => {
    try{
      const dbRes = await Collection.findOneAndUpdate({$and : [{type: req.params.collection}, {owner: req.session.currentUser._id}]}, req.body, {new : true});
      res.status(200).json(dbRes)
    }
    catch (error) {next(error)}
  })

  router.get('/collection/:type', async (req, res, next) => {
    try {
      const collec = await Collection.find({type: req.params.type}).populate("cards")
      const cards = collec.reduce((acc,curr) => {
        return [...acc,...curr.cards]
      }, []);
      res.status(200).json(cards)
    }catch(error) {console.error(error)}
  })

  router.post('/collection', async (req, res, next) => {
    try {
      console.log("hello")
      const created = await Collection.create(req.body)
      res.status(201).json(created)
    }catch (error) { console.error(error)}
  })

  router.get('/cards/bids/:id', async (req, res, next) => {
    try {
      const card = await Card.find({$and:[{pokemonTCGId: req.params.id}, {onSale: true}]}).populate("owner").populate("bid")
      res.status(200).json(card)
    } catch (error) {console.log(error)}
  })


  router.get('/profile/auctions', async (req, res, next) => {
    await Bid.find({$and: [{seller: req.session.currentUser._id}, { "buyer" : { "$exists" : true } }]}).populate("item")
    .then(response => res.status(200).json(response))
    .catch(error => next(error))
  })

module.exports = router;