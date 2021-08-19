const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    

    pokemonTCGId: String,
    owner: {type: Schema.Types.ObjectId, ref:"User"},
    cardState: {
        type: String,
        enum: ["Mint", "Near Mint", "Bad", "Add More"]
    },
 

    price: Number,


})

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;