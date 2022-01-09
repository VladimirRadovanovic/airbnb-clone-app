const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { Spot } = require('../../db/models');


const router = express.Router();

// add validation for listings create/update. Use the sam one!!

// create listing route
router.post('/new', requireAuth, asyncHandler(async (req, res) => {

    const { id } = req.user;
    let {
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
    //     state[0],
    //     zipCode,
    //     country,
    //     Number(price.slice(1)),
    //     bedrooms,
    //     bathrooms,
    //     description,
    //     id)

    price = Number(price.slice(1))
    state = state[0]

    const spot = Spot.build({
        title,
        address,
        city,
        state,
        zipCode,
        country,
        price,
        bedrooms,
        bathrooms,
        description,
        hostId: id
    })

    await spot.save()
    return res.json({spot})
}))



module.exports = router
