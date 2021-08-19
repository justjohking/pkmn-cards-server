const express = require("express");
const axios = require("axios");
const { json } = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    axios
    .get("https://api.pokemontcg.io/v2/cards")
    .then((response) => res.json(response.data))
    .catch((error) => next(error))
})

module.exports = router;