const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['People']
        const result = await mongodb.getDatabase().db().collection('people').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['People']
        const personId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('people').findOne({ _id: personId });
        if (!result) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPerson = async (req, res) => {
    try {
        //#swagger.tags=['People']
        const { firstName, lastName, age, salary } = req.body;
        if (!firstName || !lastName || !age || !salary) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const person = {
            firstName,
            lastName,
            age,
            salary
        };
        const response = await mongodb.getDatabase().db().collection('people').insertOne(person);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Person created successfully', personId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the person' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePerson = async (req, res) => {
    try {
        //#swagger.tags=['People']
        const personId = new ObjectId(req.params.id);
        const { firstName, lastName, age, salary } = req.body;
        const person = {
            firstName,
            lastName,
            age,
            salary
        };
        const response = await mongodb.getDatabase().db().collection('people').replaceOne({ _id: personId }, person);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePerson = async (req, res) => {
    try {
        //#swagger.tags=['People']
        const personId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('people').deleteOne({ _id: personId });
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
    createPerson,
    updatePerson,
    deletePerson
};
