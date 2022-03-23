var express = require('express');
const User = require('./../users/usersModel');
const {check, validationResult} = require('express-validator');
const dashboardController = require('./DashboardController');
const dashboard = new dashboardController();
var router = express.Router();

router.get('/', async (req, res, next) => {
    const countUsers = await dashboard.countUsers();
    res.render('dashboard/dashboard', {"data": countUsers});
});

module.exports = router;
