const { response } = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { verifyToken } = require('./tokenController');
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
        const idUser = await verifyToken(token, secret);

        let existingProduct;
        try {
            existingProduct = await Products.findById(productId);
        } catch (error) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product to be commented on does not exist'
                }
            });
        }

    
        const createdAt = new Date();
        const updatedAt = new Date();
        try {
            const comment = new Comments({ productId, userId: idUser, content, createdAt, updatedAt });
            await comment.save();
        } catch (error) {
            console.log(error)
        }
        

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
