const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', peopleController.getAll);
router.get('/:id', peopleController.getSingle);

router.post('/', isAuthenticated, peopleController.createPerson);
router.put('/:id', isAuthenticated, peopleController.updatePerson);
router.delete('/:id', isAuthenticated, peopleController.deletePerson);


module.exports = router;