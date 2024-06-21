let express = require('express');
let router = express.Router();
let db = require('../services/database')

router.post('/startDataBase', (req, res, next) => {
    let account_option = req.query.account_option;
    let account;
    if (account_option === 1)
        account = 'link1';
    else if (account_option === 2)
        account = 'link2';
    else
        account = 'link3';

    let username = req.body.username;
    let password = req.body.password;

    db.initialize(account, username, password);
});

router.get('/getDataBase', (req, res, next) => {
    return res.send('This is the controller!');
});

router.get('/getTable', (req, res, next) => {
    return res.send('This is the controller!');
});

module.exports = router;
