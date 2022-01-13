const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const {Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");

// 'api/user/bookings/new'

const router = express.Router();

router.post('/new',
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
