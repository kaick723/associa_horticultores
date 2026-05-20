// ------------------- Importações ------------------- //
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("./db"); // conecta ao MongoDB

const Product = require("./models/product");
const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// ------------------- Configuração ------------------- //
const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 URL BASE DO SERVIDOR
const BASE_URL =
  process.env.BASE_URL ||
  `http://localhost:${PORT}`;

// 🔥 CORS
app.use(cors());

app.use(express.json());

// ================== GARANTE PASTA UPLOADS ==================
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ================== MULTER (UPLOAD) ==================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ✅ filtro de imagem
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// 🔥 SERVIR IMAGENS
app.use("/uploads", express.static(uploadDir));

// ------------------- Rota raiz ------------------- //
app.get("/", (req, res) => {
  res.send("API do Marketplace Agro 🌱");
});

// ------------------- Rotas ------------------- //
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

// ================== CRUD DE PRODUTOS ================== //

// ✅ CRIAR PRODUTO
app.post("/products", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths =
      req.files?.map(
        (file) => `${BASE_URL}/uploads/${file.filename}`
      ) || [];

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      inStock:
        req.body.inStock === "true" ||
        req.body.inStock === true,

      images: imagePaths,
      mainImage: imagePaths[0] || "",
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err);

    res.status(400).json({
      error: err.message,
    });
  }
});

// ✅ LISTAR TODOS
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ✅ BUSCAR POR ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ✅ ATUALIZAR PRODUTO
app.put("/products/:id", upload.array("images", 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    // ================== NOVAS IMAGENS ==================
    let newImages = product.images || [];

    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map(
        (file) => `${BASE_URL}/uploads/${file.filename}`
      );

      newImages = [...newImages, ...uploadedImages];
    }

    // ================== ATUALIZA CAMPOS ==================
    product.name = req.body.name ?? product.name;

    product.description =
      req.body.description ?? product.description;

    product.price = req.body.price
      ? Number(req.body.price)
      : product.price;

    product.category =
      req.body.category ?? product.category;

    if (req.body.inStock !== undefined) {
      product.inStock =
        req.body.inStock === "true" ||
        req.body.inStock === true;
    }

    product.images = newImages;

    product.mainImage = newImages[0] || "";

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err);

    res.status(400).json({
      error: err.message,
    });
  }
});

// ✅ DELETAR
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json({
      message: "Produto deletado",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ------------------- Iniciar servidor ------------------- //
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
