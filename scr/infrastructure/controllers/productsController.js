const { response } = require('express');
const Products = require('../models/productsModel');
const Users = require('../models/usersModel');
const productService = require('../../application/services/productService');
const { verifyToken } = require('./tokenController');
const { returnCommentsByIdProduct } = require('./commentsController');
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

        const productData = { productName, description, url, tags };
        const newProduct = await productService.createProduct(productData, idUser);

        res.status(200).json({
            ok: true,
            msg: 'Successfully created product'
        });
    } catch (error) {
        if (error.message === 'Error: Product already exists') {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'Product already exists'
                }
            });
        }
        if (error.message === 'Invalid Token') {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Invalid Token'
                }
            });
        }
        res.status(500).json({
            ok: false,
            error: {
                message: 'Something went wrong, please contact the admin'
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

        const userId = await verifyToken(token, secret);

        const productData = {productName, description};
        const updatedProduct = await productService.updateProduct(productData, productId, userId);

        res.status(200).json({
            ok: true,
            msg: {
                message: 'Successfully update product'
            }
        });


    } catch (error) {
        if (error.message === 'Error: The product you want to modify is not in your product list') {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product you want to modify is not in your product list'
                }
            });
        }
        
        if (error.message === 'Invalid Token') {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Invalid Token'
                }
            });
        }
        console.log(error.message)
        res.status(500).json({
            ok: false,
            error: {
                message: 'Something went wrong, please contact the admin',
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
        const userId = await verifyToken(token, secret);
        const deleteProduct = await productService.deleteProduct(productId, userId);

        res.status(200).json({
            ok: true,
            msg: {
                message: 'Successfully delete product'
            }
        });


    } catch (error) {
        console.log(error)
        if (error.message === 'Error: The product you want to delete is not in your product list') {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product you want to delete is not in your product list'
                }
            });
        }
        if (error.message === 'Invalid Token') {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Invalid Token'
                }
            });
        }
        res.status(500).json({
            ok: false,
            error: {
                message: 'Something went wrong, please contact the admin',
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

        const existingProduct = await Products.findOne({ _id: productId });

        if (!existingProduct) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product you are trying to search for does not exist'
                }
            });
        }

        const user = await Users.findOne({ _id: idUser });
        const comments = await returnCommentsByIdProduct(productId);

        res.json({
            ok: true,
            msg: {
                _id: existingProduct._id,
                productName: existingProduct.productName,
                publishedBy: user.username,
                description: existingProduct.description,
                url: existingProduct.url,
                tags: existingProduct.tags,
                rateAverage: existingProduct.rateAverage,
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
    const { searchKey } = req.query;

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
        let products = ""
        if(!isNaN(searchKey)){
            products = await Products.find ({rateAverage: searchKey})
        }else{
            products = await Products.find({
                $or: [
                    { tags: { $in: [searchKey] } },
                    { productName: searchKey }, 
                ]
            });
        }


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

const searchRateAverageByProductId = async (req, res = response) => {
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

        const existingProduct = await Products.findOne({ _id: productId });

        if (!existingProduct) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'The product you are trying to search for does not exist'
                }
            });
        }

        res.json({
            ok: true,
            msg: {
                rateAverage: existingProduct.rateAverage
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
    searchProductsByTagOrName,
    searchRateAverageByProductId
};