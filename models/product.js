// modules =================================================
var mongoose = require('../db/connection');
var Schema   = mongoose.Schema;
// create model ============================================
var ProductSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  img_url: {type: String, required: true},
  price: {type: Number, required: true},
});
// expose model ============================================
module.exports = mongoose.model('Product', ProductSchema);
