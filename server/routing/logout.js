const express = require('express');
const router = express.Router();
const db = require('../db/models/index');


router.use(function timeLog(req, res, next) {
    console.log('logout at ', Date.now())
    next()
})

router.delete('/logout', (req, res) => {
    const User = db.sequelize.models.User;
    const key = Object.keys(req.body)[0];
    
    User.destroy({
        where: { username: req.body[key] },
    });
    res.send('delete');
})

module.exports = router;
