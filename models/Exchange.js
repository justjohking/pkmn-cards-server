const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({

  sellerItem: {type: Schema.Types.ObjectId, ref: 'Card'},
  buyerItem: [ {type: Schema.Types.ObjectId, ref: 'Card'} ],
  seller: {type: Schema.Types.ObjectId, ref: 'User'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User'},
  status: { type: String, enum: ["pending", "completed"] }
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;