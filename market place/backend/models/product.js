const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },

  // ⭐ AGORA SUPORTA VÁRIAS IMAGENS
  images: [{ type: String }],

  // ⭐ IMAGEM PRINCIPAL
  mainImage: { type: String, default: "" },

  inStock: { type: Boolean, default: true },
  category: { type: String, default: "Hortaliças" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
