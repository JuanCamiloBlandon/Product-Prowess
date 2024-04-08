const { response } = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Comments = require('../models/Comments');
const Products = require('../models/Products');
const secret = process.env.SECRET;

const createComment = async (req, res = response) => {
    const { content, productId } = req.body;
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
        const decoded = jwt.verify(token, secret);
        const idUser = decoded.id;

        let existingProduct;
        try {
            existingProduct = await Products.findById(productId);
        } catch (error) {
            // Handle the error if the product is not found
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product to be commented on does not exist'
                }
            });
        }

        if (!existingProduct) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product to be commented on does not exist'
                }
            });
        }

        const userIdObject = new mongoose.Types.ObjectId(idUser);
        const createdAt = new Date();
        const updatedAt = new Date();

        const comment = new Comments({ productId, userId: userIdObject, content, createdAt, updatedAt });
        await comment.save();

        res.status(200).json({
            ok: true,
            error: {
                message: 'successfully created comment'
            }
        });
    } catch (error) {
        return res.status(403).json({
            ok: false,
            error: {
                message: 'Invalid Token'
            }
        });
    }
};

module.exports = {
    createComment
};
