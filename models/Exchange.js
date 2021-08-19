const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({

  
  sellerItem: {
      card: [{Type: Schema.Types.ObjectId, ref: 'Card'}],
      price: String,
  },

  buyerItem: {
    card: [{Type: Schema.Types.ObjectId, ref: 'Card'}],
    price: String,
   },

  seller: {type: Schema.Types.ObjectId, ref: 'User'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User'},
  status: { type: String, enum: ["pending", "completed"] }

});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;