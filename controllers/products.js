const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Products']
        const result = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Products']
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });
        if (!result) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        //#swagger.tags=['Products']
        const { productName, brand, amount, price } = req.body;
        if (!productName || !brand || !amount || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const product = {
            productName,
            brand,
            amount,
            price
        };
        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Product created successfully', productId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the product' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        //#swagger.tags=['Products']
        const productId = new ObjectId(req.params.id);
        const { productName, brand, amount, price } = req.body;
        const product = {
            productName,
            brand,
            amount,
            price
        };
        const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        //#swagger.tags=['Products']
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};
