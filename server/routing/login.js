const express = require('express');
const router = express.Router();
const db = require('../db/models/index');


router.use(function timeLog(req, res, next) {
    console.log('login at ', Date.now())
    next()
})

router.post('/login', async (req, res) => {
    console.log(req.ip);
    const User = db.sequelize.models.User;
    const key = Object.keys(req.body)[0];
    
    // const [user, created] = await User.findOrCreate({
    //     where: { username: req.body[key] },
    //     defaults: {
    //         username: req.body[key]
    //     }
    // });

    User.findOrCreate({
        where: { username: req.body[key] },
        defaults: {
            username: req.body[key]
        }
    }).then(([user, created]) => {
        if (created) {
            res.json({
                enable: true,
                id: user.id
            })
        }
        else  {
            res.json({enable: false})
        }
    })
    // if (created) {
    //     res.json({enable: true})
    // }
    // else {
    //     res.json({enable: false})
    // }
})

module.exports = router;
