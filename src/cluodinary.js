const cloudinary = require("cloudinary");
const { Router } = require("express");

const cloudRouter = Router();

const audioConfig = {
  resource_type: "video",
  chunk_size: 6000000,
  eager_async: true,
};

cloudRouter.get("/test", (req, res) => {
  res.json({
    ok: true,
  });
});

cloudRouter.post("/upload", async (req, res) => {
  
  // Obtener el aarchivo desde el front (ruta local de usuario)

  // Subir el archivo
  try {
    let response = await cloudinary.v2.uploader.upload(
      "We_Are_The_Champions.m4a",
      audioConfig
    );
    // Guardar en mongo
    res.json({
      ok: true,
      msg: response.secure_url,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: error,
    });
  }
});


module.exports = cloudRouter;


//config
const cloudinary = require('cloudinary');
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});