const express = require('express');
const router = express.Router();
const db = require('../db/models/index');
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");

router.use(function timeLog(req, res, next) {
    console.log('login at ', Date.now())
    next()
})

router.post('/login', async (req, res) => {
    const User = db.sequelize.models.User;
    const keys = Object.keys(req.body);
    const uuid = uuidv4();
    const hash = CryptoJS.SHA256(uuid);

    console.log(keys);    

    User.findOrCreate({
        where: { username: req.body[keys[0]] },
        defaults: {
            username: req.body[keys[0]],
            userid: hash.toString(CryptoJS.enc.Hex)
        }
    }).then(([user, created]) => {
        if (created) {
            res.json({
                enable: true,
                userid: uuid
            })
        }
        else {  
            res.json({
                enable: false
            })
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500)
    })
})

module.exports = router;
