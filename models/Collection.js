const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({

  cards: [ {type: Schema.Types.ObjectId, ref: 'Card'} ],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  type: [{type: String, enum:['Owned', 'Sell', 'Buy', 'Exchange']}],

});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
