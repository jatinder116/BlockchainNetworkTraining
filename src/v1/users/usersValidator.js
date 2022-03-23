const User = require('./usersModel');
const { check, validationResult } = require('express-validator');


class UsersValidator {

    static result(req, res, next) {
        console.log('HERERE');
        const errors = validationResult(req);
        // console.log(result);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json(errors.array());
        }
        next();
    }

    static addValidation =
        [
            check('email').custom(value => {
                return User.find({ 'email': value }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('E-mail already in use');
                    }
                })
            })
        ]

    static editValidation =
        [
            check('email').custom((value, { req }) => {
                return User.find(
                    {
                        'email': value,
                        '_id': {
                            $ne: req.params.id
                        }
                    })
                    .then(user => {
                        if (user.length > 0) {
                            return Promise.reject('E-mail already in use');
                        }
                    })
            })
        ]

    static resetPasswordValidation =
    [
        check('password').notEmpty().withMessage('Name cannot be empty!').bail()
        .isLength({ min:8, max:12 }).withMessage('Password length should be 8 to 12 chars long').bail(),
        check('confirm-password').custom((value, {req}) => {
            console.log(value, req.body.password);
            if(req.body.password != value){
                throw new Error('Confirm pw should be same as password.')
            }
            return true;
        })
    ]
}


module.exports = UsersValidator;