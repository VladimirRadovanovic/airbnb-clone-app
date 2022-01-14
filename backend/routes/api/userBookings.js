const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');


const { handleValidationErrors } = require('../../utils/validation');
const {Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

// 'api/user/bookings/new'

const router = express.Router();

const bookingsValidator = [
    check('startDate')
    .exists({checkFalsy: true})
    .withMessage('Please select a start date')
    .isAfter()
    .withMessage('Date can not be todays date, or a past date.'),
    check('endDate')
    .exists({checkFalsy: true})
    .withMessage('Please select the end date')
    .isAfter()
    .withMessage('Date can not be todays date, or a past date.'),

    handleValidationErrors
]

router.post('/new',
bookingsValidator,
requireAuth,
asyncHandler(async(req,res) => {
    const { id } = req.user;
    const {
        listingId,
        startDate,
        endDate
    } = req.body

    const booking = await Booking.build({
        spotId: listingId,
        startDate,
        endDate,
        userId: id
    })

    await booking.save()
    return res.json({booking})
}))



module.exports = router
