const CoustomError = require("../utils/errorClass");
const { uploadOnCloudinary } = require("../uploads/cloudinary");
const imageSchema = require("../models/imageModel");
const fs = require("fs");
const axios = require("axios");
const { promisify } = require("util");
const { Buffer } = require("buffer");
const { resolve } = require("path");


//this function is used to convert base364Data into image url
async function saveImageFromBase64(base64Data, outputPath) {
  try {
    // Decode Base64 data to binary buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Write binary buffer to file
    await promisify(fs.writeFile)(outputPath, buffer);

    return outputPath;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
exports.removeBackground = async (req, res, next) => {
  try {
    const imagePath = req.file?.path;
    console.log(imagePath);
    const imageUrl = await uploadOnCloudinary(imagePath);
    if (!imageUrl.secure_url) {
      return next(new CoustomError("invalid image url", 400));
    }
    const outputPath = resolve(__dirname, "image.png");

    const response = await axios.post(
      "https://api.pebblely.com/remove-background/v1/",
      {
        image: imageUrl.secure_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Pebblely-Access-Token": "451c93e1-bd6b-4b90-9375-37fd46501959",
        },
      }
    );

    if (!response.status === 200) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const processedImage = response.data;
    const base64Image = processedImage.data;

    const img = await saveImageFromBase64(base64Image, outputPath);
    console.log("my img" + img);

    res.status(200).json({ success: true, data: processedImage });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json(err.message);
  }
};
exports.createImage = async (req, res, next) => {
  try {
    const { description, style_color } = req.body;
    console.log(description, "description");
    console.log(req.file, "in try block");
    // Get image path from request (assuming you're using file upload middleware)
    const imagePath = req.file?.path;
    
    const imageUrl = await uploadOnCloudinary(imagePath);
    // console.log(imageUrl);

    // Remove background
    const removeBackgroundResponse = await axios.post(
      "https://api.pebblely.com/remove-background/v1/",
      {
        image: imageUrl?.secure_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // "X-Pebblely-Access-Token": process.env.ACCESS_TOKEN,
          "X-Pebblely-Access-Token":process.env.ACCESS_TOKEN
        },
      }
    );

    // Processed image data
    const processedImage = removeBackgroundResponse.data;
    const base64Image = processedImage.data;

    // Create image
    const createImageResponse = await axios.post(
      "https://api.pebblely.com/create-background/v2/",
      {
        images: [base64Image],
        theme: "Surprise me",
        description: description,
        style_color: style_color ? style_color : "None",
        transforms: [
          {
            scale_x: 1,
            scale_y: 1,
            x: 0,
            y: 0,
            angle: 0,
          },
        ],
        autoresize: true,
        height:1024,
        width:1024
      },
      {
        headers: {
          "Content-Type": "application/json",
          // "X-Pebblely-Access-Token": process.env.ACCESS_TOKEN,
          "X-Pebblely-Access-Token":process.env.ACCESS_TOKEN
        },
      }
    );

    // Save processed image to file
    const createProcessImg = createImageResponse.data;
    const base64CreateImage = createProcessImg.data;
    const outputPath = resolve(__dirname, "image.png"); // Adjust the output path as necessary
    await saveImageFromBase64(base64CreateImage, outputPath);

    // Upload image to Cloudinary
    const createImageOnCloudinary = await uploadOnCloudinary(outputPath);
    console.log(createImageOnCloudinary.secure_url);

    // Save image URL to database
    await imageSchema.create({ imageUrl: createImageOnCloudinary.secure_url });

    res.status(200).json({ success: true, data: createImageResponse.data });
  } catch (err) {
    console.error("Error:"+ err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.getImages = async (req, res, next) => {
  try {
    const images = await imageSchema.find();
    if (images.length === 0) {
      return next(new CoustomError("No image found", 400));
    }
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
