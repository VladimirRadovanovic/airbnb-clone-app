const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { Listing } = require('../../db/models');


const router = express.Router();

// add validation for listings create/update. Use the sam one!!


router.post('/new', requireAuth, asyncHandler(async(req, res) => {
    console.log('inRoute***********')
    const { id } = req.user;
    const {
        title,
        address,
        city,
        state,
        zipCode,
        country,
        price,
        bedrooms,
        bathrooms,
        description
    } = req.body

    // console.log(
    //     title,
    //     address,
    //     city,
    //     state,
    //     zipCode,
    //     country,
    //     Number(price.slice(1)),
    //     bedrooms,
    //     bathrooms,
    //     description,
    //     id)
}))



module.exports = router
