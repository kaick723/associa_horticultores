const mongoose = require("mongoose");
const Product = require("./models/Product");
require("./db"); // conecta ao MongoDB

async function runTest() {
  try {
    console.log("Iniciando teste...");

    // Criar produto de teste
    const prod = new Product({
      name: "Teste Milho",
      description: "Produto de teste simples",
      price: 15.5
    });

    await prod.save();
    console.log("✅ Produto criado:", prod);

    // Listar todos os produtos
    const produtos = await Product.find();
    console.log("📦 Produtos no banco:", produtos);

    // Atualizar produto
    const updated = await Product.findByIdAndUpdate(prod._id, { price: 20.0 }, { new: true });
    console.log("✏️ Produto atualizado:", updated);

    // Deletar produto
    await Product.findByIdAndDelete(prod._id);
    console.log("🗑️ Produto deletado");

    console.log("✅ Teste finalizado com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro no teste:", err);
    process.exit(1);
  }
}

runTest();
