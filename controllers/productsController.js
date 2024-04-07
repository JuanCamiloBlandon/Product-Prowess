const { response } = require('express');
const User = require('../models/Products');
const jwt = require('jsonwebtoken');
const Products = require('../models/Products');
const mongoose = require('mongoose');

const createProduct = async (req, res = response) => {
    const { productName, description, url, tags} = req.body;
    let token = req.headers.authorization;
    const secret = process.env.SECRET;
    let idUser = null;

    if (!token){
        return res.status(401).json({
          ok: false,
          error: {
            message: 'Missing Token'
          }
        });
    }

    token = token.split(' ')[1];

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                ok: false,
                error: {
                    message: 'Invalid Token'
                }
            });
        }
        idUser = decoded.id;
    });

    const existingProduct = await Products.findOne({ productName, userId: idUser });

    if (existingProduct) {
        return res.status(400).json({
          ok: false,
          error: {
            message: 'Product already exists'
          }
        });
      }

    const userIdObject = new mongoose.Types.ObjectId(idUser);
    const createdAt = new Date();
    const updatedAt = new Date();

    product = new Products({ productName, description, url, tags, userId: userIdObject, createdAt, updatedAt });
    await product.save();

    res.status(200).json({
        ok: true,
        error: {
            message: 'successfully created product'
        }
    });
   
};

module.exports = {
    createProduct
};
