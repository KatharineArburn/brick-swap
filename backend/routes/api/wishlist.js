const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Wishlist, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get user wishlist
router.get('/:userId', async (req, res, next) =>{
    const { userId } = req.params

    const wishlist = await Wishlist.findAll({
        where: {
            userId
        },
        attributes: [
            'id',
            'userId',
            'legoId'
        ],
        group: ['Wishlist.id'],
        raw:true,
    });
    return res.json({Wishlist: wishlist})
});



module.exports = router
