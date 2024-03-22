const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const legoRouter = require('./lego.js');
const profileRouter = require('./profile.js');
const tagRouter = require('./tag.js');
const wishlistRouter = require('./wishlist.js')



const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/lego', legoRouter);
router.use('/profile', profileRouter);
router.use('/tag', tagRouter);
router.use('/wishlist', wishlistRouter)

module.exports = router;
