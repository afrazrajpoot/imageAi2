const express = require("express")
const router = express.Router()
const { removeBackground, createImage, getImages } = require("../controllers/imageGen")
const { upload } = require("../middeleware/multer")
router.route("/removeBackground").post(upload.single("imageUrl"),removeBackground)
router.route("/createImage").post(upload.single("imageUrl"),createImage)
router.route('/getImages').get(getImages)
module.exports = router