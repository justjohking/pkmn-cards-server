const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({

  
  sellerItem: [{
      type: Schema.Types.Mixed,
      enum: [{Type: Schema.Types.ObjectId, ref: 'Card'}, Number],
  }],
  buyerItem: [{
    type: Schema.Types.Mixed,
    enum: [{Type: Schema.Types.ObjectId, ref: 'Card'}, Number],
}],
  seller: {type: Schema.Types.ObjectId, ref: 'User'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User'},
  status: { type: String, enum: ["pending", "completed"] }
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;