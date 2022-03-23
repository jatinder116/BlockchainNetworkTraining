var express = require('express');
const User = require('./usersModel');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const usersController = require('./UsersController');
const users = new usersController();
const userValidator = require('./usersValidator');

// const sendEmail = require('./../../../helper/sendMail');
// const mail = new sendEmail();


router.get('/resetPassword/:id', async (req, res, next) => {
    // console.log('', req.params.id);
    const checkUser = await User.findById(req.params.id);
    if (!checkUser) return res.send("User doesn't exists!");
    res.render('login/passwordResetForm', { "id": req.params.id });
});

router.post('/passwordReset/:id', userValidator.resetPasswordValidation, userValidator.result, async (req, res, next) => {
    try {
        const resetPw = await users.resetPw(req);
        console.log('RESET PW', resetPw);
        // res.redirect('/login');
        res.status(200).json({ 'url': '/login' });
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/list/:page?', async (req, res, next) => {
    const getUsers = await users.getUsers(req.params.page);
    const countUsers = await User.count();
    const current_page = req.params.page ? req.params.page : 1;
    const total_pages = Math.ceil(countUsers / 5);
    res.render('users/listusers', {
        "data": getUsers,
        "total_pages": total_pages, 
        "current_page": current_page, 
        "prev_page": current_page == 1 ? 0 : (+current_page- (+1)), 
        "next_page": current_page == total_pages ? 0 : (+current_page+ (+1))
    });
});

router.get('/add', function (req, res, next) {
    res.render('users/add');
});

router.post('/adduser', userValidator.addValidation, userValidator.result, async (req, res, next) => {
    try {
        const addedUser = await users.addUser(req);
        res.status(200).json({ 'url': '/users/list' });
    } catch (err) {
        console.log('ADD ROUTE', err);
    }
});


router.get('/edit/:id', async (req, res, next) => {
    try {
        const editUser = await users.showEditUserForm(req.params.id);
        res.render('users/edit', { "user": editUser[0] });
    }
    catch (err) {
        console.log('edit form err', err);
    }
});

router.post('/editUser/:id', userValidator.editValidation, userValidator.result, async (req, res, next) => {
    try {
        const editedUser = await users.editUser(req);
        res.status(200).json({ 'url': '/users/list' });
    }
    catch (err) {
        console.log('USER EDIT ERROR', err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const deletedUser = await users.deleteUser(req);
        res.status(200).redirect('/users/list');
    }
    catch (err) {
        console.log('DELETE ERRR', err);
    }
});

module.exports = router;
