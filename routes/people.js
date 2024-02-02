const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');

router.get('/', peopleController.getAll);

router.get('/:id', peopleController.getSingle);

router.post('/', peopleController.createPerson);

router.put('/:id', peopleController.updatePerson);

router.delete('/:id', peopleController.deletePerson);


module.exports = router;