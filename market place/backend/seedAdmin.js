// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");
require("./db"); // conecta ao MongoDB

const username = "admin";   // usuário que você quer
const password = "1234";    // senha que você quer

async function createAdmin() {
  try {
    // Deleta se já existir
    await Admin.findOneAndDelete({ username });

    // Cria hash da senha
    const hash = await bcrypt.hash(password, 10);

    // Cria novo admin
    const admin = new Admin({ username, password: hash });
    await admin.save();

    console.log(`✅ Admin '${username}' criado com sucesso!`);
    process.exit(0); // finaliza script
  } catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  }
}

createAdmin();
