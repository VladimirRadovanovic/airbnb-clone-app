const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { Spot } = require('../../db/models');


const router = express.Router();

// add validation for listings create/update. Use the sam one!!

const listingValidator = [
    check('title')
    .exists({checkFalsy: true})
    .withMessage('Please provide a title.')
    .isLength({min:4, max: 150 })
    .withMessage('Input for title should be between 4 and 150 characters long.'),
    check('bedrooms')
    .isInt({min: 0, max: 50})
    .withMessage('Bedrooms must be a number from 0 to 50.')
    .exists({checkFalsy: true})
    .withMessage('Please enter number of bedrooms.'),
    check('bathrooms')
    .isInt({min: 0, max: 50})
    .withMessage('Bathrooms must be a number from 0 to 50.')
    .exists({checkFalsy: true})
    .withMessage('Please enter number of bathrooms.'),
    check('address')
    .exists({checkFalsy: true})
    .withMessage('Address is required.')
    .isLength({min:3, max: 150 })
    .withMessage('Input for address should be between 3 and 150 characters long.'),
    check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required.')
    .isLength({min:2, max: 100 })
    .withMessage('Input for city should be between 2 and 100 characters long.'),
    check('state')
    .isLength({max: 50 })
    .withMessage('Input for state should not be more than 50 characters long.'),
    check('zipCode')
    .exists({checkFalsy: true})
    .withMessage('ZIP Code is required.')
    .isLength({min:3, max: 25 })
    .withMessage('Input for zip code should be between 3 and 25 characters long.'),
    check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required.')
    .isLength({min:3, max: 100 })
    .withMessage('Input for country should be between 3 and 100 characters long.'),
    check('price')
    .isInt({min: 5, max: 100000})
    .withMessage('Price must be between $5.00 and $100,000.00')
    .exists({checkFalsy: true})
    .withMessage('Please enter price per night.'),
    check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required.')
    .isLength({min:4, max: 500 })
    .withMessage('Description should be between 4 and 500 characters long.'),

    handleValidationErrors
];

// create listing route
router.post('/new',listingValidator, requireAuth, asyncHandler(async (req, res) => {

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


    // price = Number(price.slice(1))
    // state = state[0]

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
