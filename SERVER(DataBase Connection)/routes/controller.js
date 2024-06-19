let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    return res.send('Welcome to the database!');
});

module.exports = router;
