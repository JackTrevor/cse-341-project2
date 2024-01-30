const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => 
    //#swagger.tags=['Hello Jackson']
    {res.send('Hello Jackson')
});

router.use('/products', require('./products'));

module.exports = router;