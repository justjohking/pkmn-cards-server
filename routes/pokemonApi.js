const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/pokemonApi/all", async (req, res, next) => {

    await axios
    .get(`https://api.pokemontcg.io/v2/cards?api_key=${process.env.API_KEY}`)
    .then((response) => {
        res.status(200).json(response.data.data)
    })
    .catch(error => res.status(500).json(error))
})

// router.get("/pokemonAPi/loadByPage")

router.get("/pokemonApi/:id", async (req, res, next) => {
    await axios
    .get(`https://api.pokemontcg.io/v2/cards/${req.params.id}?api_key=${process.env.API_KEY}`)
    .then((response) => {
        res.status(200).json(response.data.data)
    })
    .catch(error => res.status(500).json(error))
})

module.exports = router;

