const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Products']
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200). json(products);
    }); 

};

const getSingle = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200). json(products);
    }); 
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const product = {
        productName: req.body.productName,
        brand: req.body.brand,
        amount: req.body.amount,
        price: req.body.price
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(201).send(response);
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.');
    }
};
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const product = {
        productName: req.body.productName,
        brand: req.body.brand,
        amount: req.body.amount,
        price: req.body.price
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId}, product);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.');
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId});
    if (response.deletedCount > 0) {
        res.status(204). send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};