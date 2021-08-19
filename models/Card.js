const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    
    id: String,
    name: String,
    supertype: String,
    subtype: [ String ],
    level: String,
    hp: String,
    
    cardState: {
        type: String,
        enum: ["Mint", "Near Mint", "Bad", "Add More"]
    },

    types: [ String ],
    
    attacks: [{
        name: String,
        cost: [ String ],
        convertedEnergyCost: Number,
        damage: String,
        text:String,
    }],
    
    weaknesses: [{
        type: String,
        value: String
    }],

    resistances: [{
        type: String,
        value: String
    }],

    retreatCost: [ String ],

    convertedRetreatCost: [ String ],

    set: {
        id: String,
        name: String,
        series: String,
        printedTotal: Number,
        total: Number,
        legalities: {
            unlimited: String
        },
        ptcgoCode: String,
        releaseDate: String,
        updatedAt: String,
        images: {
            symbol: String,
            logo: String
        }

    },

    number: String,
    artist: String,
    rarity: String,
    nationalPokedexNumbers: [ String ],

    legalities: {
        unlimited: String,
    },

    images: {
        small: String,
        large: String
    },

    cardmarket: {
        url: String,
        updatedAt: String,
        prices: {
            averageSellPrice: Number,
            lowPrice: Number,
            trendPrice: Number,
            suggestedPrice: Number,
            reverseHoloSell: Number,
            reverseHoloLow: Number,
            reverseHoloTrend: Number,
            lowPricesExPlus: Number,
            avg1: Number,
            avg7: Number,
            avg30: Number,
            reverseHoloAvg1: Number,
            reverseHoloAvg7: Number,
            reverseHoloAvg30: Number,
        }
    }
})

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;