const multer = require("multer");
const path = require("path");

// configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// filtro de imagens
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isValid = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValid) cb(null, true);
  else cb(new Error("Arquivo precisa ser imagem"));
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
