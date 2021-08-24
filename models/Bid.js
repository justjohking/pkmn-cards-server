const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    item: {type: Schema.Types.ObjectId, ref: 'Card'},
    initialPrice: Number,
    currentBid: Number,
    previousBid: Number,
    startDate: Date,
    endDate: Date,
    status: {type: String, enum: ["ongoing", "completed"]}
})

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;

