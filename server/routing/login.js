const express = require('express');
const router = express.Router();
const db = require('../db/models/index');
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");

router.use(function timeLog(req, res, next) {
    console.log('login at ', Date.now())
    next()
})

router.post('/login', (req, res) => {
    console.log(req.body);
    const User = db.sequelize.models.User;
    const key = Object.keys(req.body)[0];
    const uuid = uuidv4();
    const hash = CryptoJS.SHA256(uuid);

    User.findOrCreate({
        where: { username: req.body[key] },
        defaults: {
            username: req.body[key],
            userid: hash.toString(CryptoJS.enc.Hex)
        }
    }).then(([user, created]) => {
        if (created) {
            res.json({
                enable: true,
                userid: uuid
            })
        }
        else  {
            res.json({enable: false})
        }
    })
    .catch((err) => {
        console.error(`error message : ${err}`);
    })
})

module.exports = router;
