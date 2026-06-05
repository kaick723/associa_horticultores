const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },

  images: [{ type: String }],
  mainImage: { type: String, default: "" },

  inStock: { type: Boolean, default: true },

  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },

  active: {
    type: Boolean,
    default: true,
  },

  category: { type: String, default: "Hortaliças" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
