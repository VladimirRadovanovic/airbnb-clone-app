const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const userListingsRouter = require('./userListings.js')
const listingsRouter = require('./listings')
const userBookingsRouter = require('./userBookings')


router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/user/listings', userListingsRouter)
router.use('/listings', listingsRouter)
router.use('/user/bookings', userBookingsRouter)

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });




module.exports = router;
