const { response } = require('express');
const jwt = require('jsonwebtoken');
const Products = require('../models/Products');
const { verifyToken } = require('./tokenController');
const mongoose = require('mongoose');
const secret = process.env.SECRET;

const createProduct = async (req, res = response) => {
    const { productName, description, url, tags } = req.body;
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'Missing Token'
            }
        });
    }

    try {
        token = token.split(' ')[1];
        const idUser = await verifyToken(token, secret);

        const existingProduct = await Products.findOne({ productName, userId: idUser });

        if (existingProduct) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Product already exists'
                }
            });
        }

        const userIdObject = mongoose.Types.ObjectId.createFromTime(idUser);
        const createdAt = new Date();
        const updatedAt = new Date();

        const product = new Products({ productName, description, url, tags, userId: userIdObject, createdAt, updatedAt });
        await product.save();

        return res.status(200).json({
            ok: true,
            error: {
                message: 'Successfully created product'
            }
        });
    } catch (error) {
        return res.status(403).json({
            ok: false,
            error: {
                message: error.message
            }
        });
    }
};

const updateProduct = async (req, res = response) => {
    const productId = req.params.id;
    const { productName } = req.body;
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'Missing Token'
            }
        });
    }

    try {
        token = token.split(' ')[1];

        const decodedPorductId = await verifyToken(token, secret);

        if (productId !== decodedPorductId) {
            return res.status(403).json({
                ok: false,
                error: {
                    message: 'The Token does not match the product ID'
                }
            });
        }

        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'Product not found'
                }
            });
        }

        Products.updatedAt = new Data();

        Products.productName = productName;

        await Products.save();

        res.json({
            ok: true,
            msg: {
                productName: Products.productName
            }
        });


    } catch (error) {
        return res.status(403).json({
            ok: false,
            error: {
              message: error.message,
              token
            }
          });
    }
};


module.exports = {
    createProduct,
    updateProduct
};
