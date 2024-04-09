const { response } = require('express');
const jwt = require('jsonwebtoken');
const Products = require('../models/Products');
const {verifyToken} = require('./tokenController');
const mongoose = require('mongoose');
const secret = process.env.SECRET;

const createProduct = async (req, res = response) => {
    const { productName, description, url, tags} = req.body;
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

module.exports = {
    createProduct
};
