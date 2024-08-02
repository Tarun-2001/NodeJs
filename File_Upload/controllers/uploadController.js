const path = require("path");
const MetaError = require("../../Jobs_2.0/errors/MetaError");
const asyncWrapper = require("../../Jobs_2.0/middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { STATUS_CODES } = require("http");
const cloudinary = require('cloudinary').v2
const file = require('fs')
const uploadProductImageLocal = asyncWrapper(async (req, res) => {
  if (!req.files) throw new MetaError.BadRequest("Please Provide Image File");
  const image = req.files.image;
  if (!image.mimetype.startsWith("image")) {
    throw new MetaError.BadRequest("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (image.size > maxSize) {
    throw new MetaError.BadRequest("Please upload image smaller 1MB");
  }

  const imagePath = path.join(__dirname,"../public/uploads/" + `${image.name}`);
  await image.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: { src: `/uploads/${image.name}` } });
});

const uploadProductImage = asyncWrapper(async (req,res)=>{

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,
        folder:'file-upload'
    })

    file.unlinkSync(req.files.image.tempFilePath) 
    res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
})

module.exports = { uploadProductImageLocal,uploadProductImage };
