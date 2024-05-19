const { response } = require('express');
const Follow = require('../models/followsModel');
const Products = require('../models/productsModel');
const followService = require('../../application/services/followService');
const { verifyToken } = require('./tokenController');
const secret = process.env.SECRET;


const createFollow = async (req, res = response) => {
    const {followedUserId} = req.body;
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

        const followData = {followedUserId};
        const newFollow = await followService.createFollow(followData, idUser);

        res.status(200).json({
            ok: true,
            msg: 'Successfully follow',
            Follow: {
                id: newFollow.id, userId: newFollow.userId, followedUserId: newFollow.followedUserId
              }
        });
    } catch (error) {
        if (error.message === 'Error: You are already following this user') {
            return res.status(409).json({
                ok: false,
                error: {
                    message: 'You are already following this user'
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

const deleteFollow = async (req, res = response) => {
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

        const followData = {followedUserId};
        const newunFollow = await followService.deleteFollow(followData, idUser);

        res.status(200).json({
            ok: true,
            msg: 'Successfully delete unfollow',
            Follow: {
                id: newunFollow.id, userId: newunFollow.userId, followedUserId: newunFollow.followedUserId
              }
        });
    } catch (error) {
        if (error.message === 'Error: You are not currently following this person') {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'You are not currently following this person'
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

const getFollowers = async (req, res = response) => {
    const followedUserId = req.params.id;
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

        const followers = await Follow.find({ followedUserId: followedUserId }).populate('userId');
        followers.map(follow => follow.userId);

        res.status(200).json({
            ok: true,
            msg: {
                followers
              }
        });
    } catch (error) {
        if (error.message === 'Error: You are not currently following this person') {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'You are not currently following this person'
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
}

const getFollowings = async (req, res = response) => {
    const followUserId = req.params.id;
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

        const followings = await Follow.find({ userId: followUserId }).populate('followedUserId');
        followings.map(follow => follow.userId);

        res.status(200).json({
            ok: true,
            msg: {
                followings
              }
        });
    } catch (error) {
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
}


module.exports = {
    createFollow,
    deleteFollow,
    getFollowers,
    getFollowings
};