const factory = require("./handlersFactory");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");


exports.uploadProductImages = uploadMixOfImages([
    {
        name: "imageCover",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]);

const fs = require("fs");
const path = require("path");

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
    const uploadDir = path.join(__dirname, "../uploads/product");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log("req.body =>", req.body);
    console.log("req.files =>", req.files);

    // 1- Image processing for imageCover
    if (req.files.imageCover) {
        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

        await sharp(req.files.imageCover[0].buffer).resize(2000, 1333).toFormat("jpeg").jpeg({ quality: 95 }).toFile(path.join(uploadDir, imageCoverFileName));

        req.body.imageCover = imageCoverFileName;
    }

    // 2- Image processing for other images
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                await sharp(img.buffer).resize(2000, 1333).toFormat("jpeg").jpeg({ quality: 95 }).toFile(path.join(uploadDir, imageName));

                req.body.images.push(imageName);
            }),
        );
    }

    next(); // مهم أن يوضع هنا حتى لو ما في images
});


// exports.resizeProductImages = asyncHandler(async (req, res, next) => {
//     const fs = require("fs");
//     const path = require("path");

//     const uploadDir = path.join(__dirname, "../uploads/product");
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     console.log("req.body =>", req.body);
//     console.log("req.files =>", req.files); 
//     // console.log(req.files);
//     //1- Image processing for imageCover
//     if (req.files.imageCover) {
//         const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

//         await sharp(req.files.imageCover[0].buffer).resize(2000, 1333).toFormat("jpeg").jpeg({ quality: 95 }).toFile(`uploads/product/${imageCoverFileName}`);

//         // Save image into our db
//         req.body.imageCover = imageCoverFileName;
//     }
//     //2- Image processing for images
//     if (req.files.images) {
//         req.body.images = [];
//         await Promise.all(
//             req.files.images.map(async (img, index) => {
//                 const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

//                 await sharp(img.buffer).resize(2000, 1333).toFormat("jpeg").jpeg({ quality: 95 }).toFile(`uploads/product/${imageName}`);

//                 // Save image into our db
//                 req.body.images.push(imageName);
//             }),
//         );

//         next();
//     }
// });

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);
