let express = require('express');
let router = express.Router();
let db = require('../services/database');

router.post('/startDataBase', (req, res, next) => {
    let account_option = parseInt(req.query.account_option, 10);
    let account;

    if (account_option === 1) {
        account = 'st69414.us-east-2';
    } else if (account_option === 2) {
        account = 'link2';
    } else {
        account = 'link3';
    }

    let username = req.body.username;
    let password = req.body.password;

    db.initialize(account, username, password)
        .then(() => {
            res.send('Database initialized successfully.');
        })
        .catch((error) => {
            next(error); // Pass the error to the error handling middleware
        });
});

router.get('/getDataBase', (req, res, next) => {
    return res.send('This is the getDataBase controller!');
});

router.get('/getTable', (req, res, next) => {
    return res.send('This is the getTable controller!');
});

module.exports = router;
