import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df6xdobui",
  api_key: "599536686624548",
  api_secret: "8NSo6Yrj3jnkKLFkTT6edMwK8HY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "house",
  },
});

const uploadCloud = multer({ storage });

export { uploadCloud };
