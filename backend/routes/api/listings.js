const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { Spot, User } = require('../../db/models');


const router = express.Router();

// include model Image with this probably
router.get('/all', asyncHandler(async(req, res) => {
    const listings = await Spot.findAll({
        include: {
            model: User,
            // as: 'user'
    }
    })
    return res.json({listings})
}))


module.exports = router
