const { Schema, model } = require('mongoose');

const ProdutsSchema = Schema({
    productName: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    url: {
        type: String,
        require: true
    },

    tags: {
        type: [String],
        require: true
    },

    userId: {
        type: isObjectId,
        require: true
    },

    createdAt: {
        type: Date,
        require: true
    },

    updatedAt: {
        type: Date,
        require: true
    },
});

module.exports = model('Products', ProdutsSchema);