var express = require('express');
var router = express.Router();
const User = require('./../users/usersModel');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login-form');
});

router.post('/loginuser',[
        check('username').custom((value, {req}) => {
            return User.find({ 'email' : value, 'password' : req.body.password}).then(user => {
                console.log('USR', user.length);
                if (user.length == 0) {
                  return Promise.reject("Invalid credentials");
                }
            })
        })
    ],
    function(req, res, next) {
        const errors = validationResult(req);
                if(!errors.isEmpty()){
                    console.log('err', errors.array());
                    return res.status(400).json(errors.array())
                }
    const token = jwt.sign({ pw : req.body.password ,email : req.body.username }, process.env.JWT_SECRET);
    console.log(token);
    res.status(200).json({
        status :'success', token: 'token', url: '/dashboard'
    })
});

// router.post('/',[
//     check('username').custom((value, {req}) => {
//         // console.log('VALUE', req.body.password);
//         return User.find({ 'email' : value, 'password' : req.body.password}).then(user => {
//             console.log('USR', user.length);
//             if (user.length == 0) {
//               return Promise.reject("Invalid credentials");
//             }
//         })
//     })
// ], async (req, res, next) => {
//     const errors = validationResult(req);
//         if(!errors.isEmpty()){
//             // console.log('err', errors.array());
//             return res.send('here');
//         }
//     // const countUsers = await dashboard.countUsers();
//     res.status(200).json({
//         success, token
//     })
//     // res.redirect('/dashboard');
// });

module.exports = router;
