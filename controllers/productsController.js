const { response } = require('express');
const jwt = require('jsonwebtoken');
const Products = require('../models/Products');
const Users = require('../models/User');
const Comments = require('../models/Comments');
const { verifyToken } = require('./tokenController');
const { getCommentsByIdProduct } = require('./commentsController');
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

        const existingProduct = await Products.findOne({productName, userId: idUser});

        if (existingProduct) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Product already exists'
                }
            });
        }

        const createdAt = new Date();
        const updatedAt = new Date();

        const product = new Products({ productName, description, url, tags, userId: idUser, createdAt, updatedAt });
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
    const { productName, description } = req.body;
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
        console.log(productId)
        console.log(idUser)

        const existingProduct = await Products.findOne({_id:productId, userId: idUser});

        if (!existingProduct) {
            return res.status(403).json({
                ok: false,
                error: {
                    message: 'The product you want to modify is not in your product list'
                }
            });
        }

        const updatedAt = new Date();

        existingProduct.updatedAt = updatedAt;
        existingProduct.productName = productName;
        existingProduct.description = description;

        await existingProduct.save();

        res.json({
            ok: true,
            msg: {
                message: 'Successfully update product'
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

const deleteProduct = async (req, res = response) => {
    const productId = req.params.id;
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

        const existingProduct = await Products.findOne({_id:productId, userId: idUser});

        if (!existingProduct) {
            return res.status(403).json({
                ok: false,
                error: {
                    message: 'The product you want to delete is not in your product list'
                }
            });
        }

        await Products.deleteOne({_id: productId});

        res.json({
            ok: true,
            msg: {
                message: 'Successfully delete product'
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

const searchProductById = async (req, res = response) => {
    const productId = req.params.id;
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

        const existingProduct = await Products.findOne({_id:productId});

        if (!existingProduct) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product you are trying to search for does not exist'
                }
            });
        }

        const user = await Users.findOne({_id:idUser});
        const comments = await getCommentsByIdProduct(productId);

        res.json({
            ok: true,
            msg: {
                _id: existingProduct._id,
                productName: existingProduct.productName,
                ByPublic: user.username,
                description: existingProduct.description,
                url: existingProduct.url,
                tags: existingProduct.tags,
                createdAt: existingProduct.createdAt,
                comments: comments
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

const searchProductsByTagOrName = async (req, res = response) => {
    const { searchKey } = req.query; // Obtener el parámetro de búsqueda desde la URL

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

        const products = await Products.find({
            $or: [
                { tags: { $in: [searchKey] } }, // Buscar por etiqueta
                { productName: { $regex: searchKey, $options: 'i' } } // Buscar por nombre (ignorando mayúsculas y minúsculas)
            ]
        });

        if (!products || products.length === 0) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'No products found matching the search criteria'
                }
            });
        }

        res.json({
            ok: true,
            msg: {
                products: products
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
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductById,
    searchProductsByTagOrName
};
