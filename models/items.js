const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const Items = model("Items", itemsSchema);
module.exports = Items;
