const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { Spot } = require('../../db/models');


const router = express.Router();


router.get('/all', asyncHandler(async(req, res) => {
    const listings = await Spot.findAll()
    return res.json({listings})
}))


module.exports = router
