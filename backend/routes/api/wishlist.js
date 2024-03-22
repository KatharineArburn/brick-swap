const router = require('express').Router();

const { Lego, Wishlist, sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

// Get user wishlist
router.get('/:userId', async (req, res, next) =>{
    const { userId } = req.params

    const wishlist = await Wishlist.findAll({
        include: {
            model: Lego,
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
            ]
            // attributes: ['name', 'itemNumber', 'pieces', 'status', 'image']
            // attributes: []
        },
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

        return res.json(wishlist)

});



module.exports = router
