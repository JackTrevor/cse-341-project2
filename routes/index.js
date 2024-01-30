const router = require('express').Router();

router.get('/', (req, res) => 
    //#swagger.tags=['Hello Jackson']
    {res.send('Hello Jackson')
});

module.exports = router;