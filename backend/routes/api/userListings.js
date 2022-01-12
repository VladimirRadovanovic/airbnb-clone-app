const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { Spot, User, Image } = require('../../db/models');
const { multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3')


const router = express.Router();

// add validation for listings create/update. Use the sam one!!

const listingValidator = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
        .isLength({ min: 4, max: 150 })
        .withMessage('Input for title should be between 4 and 150 characters long.'),
    check('bedrooms')
        .isInt({ min: 0, max: 50 })
        .withMessage('Bedrooms must be a number from 0 to 50.')
        .exists({ checkFalsy: true })
        .withMessage('Please enter number of bedrooms.'),
    check('bathrooms')
        .isInt({ min: 0, max: 50 })
        .withMessage('Bathrooms must be a number from 0 to 50.')
        .exists({ checkFalsy: true })
        .withMessage('Please enter number of bathrooms.'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Input for address should be between 3 and 150 characters long.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required.')
        .isLength({ min: 2, max: 100 })
        .withMessage('Input for city should be between 2 and 100 characters long.'),
    check('state')
        .isLength({ max: 50 })
        .withMessage('Input for state should not be more than 50 characters long.'),
    check('zipCode')
        .exists({ checkFalsy: true })
        .withMessage('ZIP Code is required.')
        .isLength({ min: 3, max: 25 })
        .withMessage('Input for zip code should be between 3 and 25 characters long.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Input for country should be between 3 and 100 characters long.'),
    check('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .exists({ checkFalsy: true })
        .withMessage('Please enter price per night.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.')
        .isLength({ min: 4, max: 500 })
        .withMessage('Description should be between 4 and 500 characters long.'),

    handleValidationErrors
];

// create listing route
router.post('/new',
    multipleMulterUpload('images'),
    listingValidator,
    requireAuth,
    asyncHandler(async (req, res) => {

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
            //could be req.file
            console.log(req.files, 'files multiple!!!!!!!!!!')
            console.log(req.file, 'file Single!!!!!!!!!!')
        const listingImagesUrl = await multiplePublicFileUpload(req.files)


        // price = Number(price.slice(1))
        // state = state[0]

        const user = await User.findByPk(id)

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
        // spot.user = user

        listingImagesUrl.forEach(listingImageUrl => {
            if (!listingImageUrl) listingImageUrl === null
            const image = await Image.build({
                imageUrl: listingImageUrl,
                spotId: spot.id
            })
            await image.save()
        })
        // i thing i will have to include the images with the spot
        const images = await Image.findAll({
            where: {
                spotId: spot.id
            }
        })
        return res.json({ spot, user, images })
    }))

// get user listings route
// include model images wit this.probably
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.user
    const spots = await Spot.findAll({

        where: {
            hostId: id,
        },
        include: {
            model: User,
            // as: 'user'
        }
    })




    return res.json({ spots })
}))

router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.body

    const listing = await Spot.findByPk(id)

    await listing.destroy()
    return res.json({ message: 'Deleted' })
}))

router.put('/update', requireAuth, listingValidator, asyncHandler(async (req, res) => {
    const { id } = req.user

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
        description,
        spotId
    } = req.body



    const spot = await Spot.findByPk(spotId)
    const user = await User.findByPk(id)

    console.log(user, 'user in update ********************')

    await spot.update({
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
    })

    return res.json({ spot, user })
}))



module.exports = router
