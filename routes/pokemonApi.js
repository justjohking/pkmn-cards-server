const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/pokemonApi/all", async (req, res, next) => {

    await axios
    .get(`https://api.pokemontcg.io/v2/cards?api_key=${process.env.API_KEY}`)
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch(error => res.status(500).json(error))
})

router.get("/pokemonApi/all/:page", async (req, res, next) => {
    // await axios
    // .get(`https://api.pokemontcg.io/v2/cards?page=${req.params.page}&pageSize=40`)
    // .then((response) => res.status(200).json(response.data))

    await axios
    .get(`https://api.pokemontcg.io/v2/cards?page=${req.params.page}&pageSize=40?api_key=${process.env.API_KEY}`)
    .then((response) => res.status(200).json(response.data))
})

router.get("/pokemonApi/:id", async (req, res, next) => {
    await axios
    .get(`https://api.pokemontcg.io/v2/cards/${req.params.id}?api_key=${process.env.API_KEY}`)
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch(error => res.status(500).json(error))

    // await axios
    // .get(`https://api.pokemontcg.io/v2/cards/${req.params.id}`)
    // .then((response) => {
    //     res.status(200).json(response.data)
    // })
    // .catch(error => res.status(500).json(error))
})

module.exports = router;

