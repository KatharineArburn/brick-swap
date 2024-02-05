const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Lego, Tag, Message, Wishlist, Follow, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params

    const legoSets = await Lego.findAll({
        where: {
            userId
        },
        include: {
            model: Tag,
            attributes: []
        },

        attributes: [
            "id",
            "userId",
            "name",
            "itemNumber",
            "pieces",
            "ages",
            "theme",
            "status",
            "image",
            "createdAt",
            "updatedAt"
        ],
        group: ['Lego.id'],
        raw:true,
    });
    res.json({Lego: legoSets})
});

module.exports = router
