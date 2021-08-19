const express = require("express");
const router = express.Router();
const Card = require("../models/Card")


router.get("/", (req, res, next) => {
    /* nothing to render*/
})

// GET ALL THE CARDS IN THE DB
router.get("/cards", async (req, res, next) => {
    try {
      const allCards = await Card.find();
      res.status(200).json(allCards)
    } catch (error) { next(error) }
})

// Get one card
router.get("/user/cards:id", async (req, res, next) => {
    try {
        const oneCard = await Card.findById(req.params.id);
        res.status(200).json(oneCard)
    } catch (error) { next(error) }
})

module.exports = router;