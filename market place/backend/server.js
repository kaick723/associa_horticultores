// ------------------- Importações ------------------- //
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

require("./db");

const Product = require("./models/product");
const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ================== MULTER ==================
const storage = multer.memoryStorage();

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "horticultores" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Apenas imagens são permitidas"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ------------------- Rota raiz ------------------- //
app.get("/", (req, res) => {
  res.send("API do Marketplace Agro 🌱");
});

// ------------------- Rotas ------------------- //
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

// ================== PRODUTOS ================== //

// ✅ CRIAR PRODUTO
app.post("/products", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files?.length
      ? await Promise.all(
          req.files.map((file) => uploadToCloudinary(file.buffer))
        )
      : [];

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,

      quantity: Number(req.body.quantity) || 0,
      active: req.body.active === "false" ? false : true,

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
    res.status(400).json({ error: err.message });
  }
});

// ✅ LISTAR PRODUTOS
app.get("/products", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const filter = isAdmin
      ? {}
      : {
          active: true,
          quantity: { $gt: 0 },
        };

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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

    let newImages = product.images || [];

    if (req.body.imagesToKeep) {
      newImages = Array.isArray(req.body.imagesToKeep)
        ? req.body.imagesToKeep
        : [req.body.imagesToKeep];
    }

    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      newImages = [...newImages, ...uploadedImages];
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;

    product.price =
      req.body.price !== undefined
        ? Number(req.body.price)
        : product.price;

    product.category = req.body.category ?? product.category;

    product.quantity =
      req.body.quantity !== undefined
        ? Number(req.body.quantity)
        : product.quantity;

    if (req.body.active !== undefined) {
      product.active =
        req.body.active === "true" ||
        req.body.active === true;
    }

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
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETAR PRODUTO
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json({ message: "Produto deletado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Iniciar servidor ------------------- //
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
