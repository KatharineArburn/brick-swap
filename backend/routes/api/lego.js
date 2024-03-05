const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Lego, Tag, Wishlist, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all lego sets - Landing Page
router.get('/', async (req, res, next) => {

    const lego = await Lego.findAll({
        include: {
            model: Tag,
            // attributes: ['id', 'tag0', 'tag1', 'tag2', 'tag3', 'tag4', 'userId', 'legoId']
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
    // console.log("LEGO", lego)
    return res.json({Lego: lego});

});

// Get lego set details
router.get('/:legoId', async (req, res) => {
    const { legoId } = req.params;

    const lego = await Lego.findByPk( legoId, {
        include: [
            // {
            //     model: Tag,
            //     attributes: ['id', 'name', 'userId', 'legoId'],
            // },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                include:[Tag]
            }
        ]
    });

    if (!lego) {
        return res.status(404).json({
            message: "Lego set couldn't be found",
        });
    } else {
        const data = {
            id: lego.id,
            userId: lego.userId,
            name: lego.name,
            itemNumber: lego.itemNumber,
            pieces: lego.pieces,
            ages: lego.ages,
            theme: lego.theme,
            status: lego.status,
            image: lego.image,
            createdAt: lego.createdAt,
            updatedAt: lego.updatedAt
        }

        data.User = lego.User
        // data.Tag = lego.Tag
        // console.log("DATA", data)
        return res.json(data)
    }

});

const validateLegoSet = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Name of set is required'),
    check('itemNumber')
        .exists({checkFalsy: true})
        .withMessage('Set number of set is required'),
    check('pieces')
        .exists({checkFalsy: true})
        .isFloat({min: 10})
        .withMessage('Number of pieces is required'),
    check('ages')
        .exists({checkFalsy: true})
        .withMessage('Suggested age is required'),
    check('theme')
        .exists({checkFalsy: true})
        .withMessage('Theme of set is required'),
    handleValidationErrors
]

// Create new Lego set
router.post('/', requireAuth, validateLegoSet, async (req, res, next) => {
    const userId = req.user.id;
    const {name, itemNumber, pieces, ages, theme, status, image} = req.body

    const newLego = await Lego.create({
        userId,
        name,
        itemNumber,
        pieces,
        ages,
        theme,
        status,
        image
    })

    res.status(201)
    res.json(newLego)
});

// Update Lego set
router.put('/:legoId', requireAuth, validateLegoSet, async (req, res, next) => {
    const { legoId } = req.params;

    const {name, itemNumber, pieces, ages, theme, status, image} = req.body

    const existingLego = await Lego.findByPk(legoId)

    if(!existingLego) {
        return res.status(404).json({
            message: "Lego Set couldn't be found",
        });
    }

    if (existingLego.userId === req.user.id) {
        const updatedLego = await Lego.findByPk(legoId);

        updatedLego.name = name;
        updatedLego.itemNumber = itemNumber;
        updatedLego.pieces = pieces;
        updatedLego.ages = ages;
        updatedLego.theme = theme;
        updatedLego.status = status;
        updatedLego.image = image;

        await updatedLego.save()

        res.json(updatedLego)
    } else {
        return res.status(403).json({
            message: "Lego set must belong to current user"
        })
    }
})

// Delete a lego set
router.delete('/:legoId', requireAuth, async (req, res, next) => {

    const { legoId } = req.params;

    const existingLego = await Lego.findByPk(legoId)

    if(!existingLego) {
        return res.status(404).json({
            message: "Lego Set couldn't be found",
        });
    }

    if (existingLego.userId === req.user.id) {

        const result = await Lego.destroy({where: { id: legoId } });

        res.json({"message": "Lego set successfully deleted"})
    } else {
        return res.status(403).json({
            message: "Lego set must belong to current user"
        })
    }
})

// Get lego tags
router.get('/:legoId/tags', async (req, res) => {
    const { legoId } = req.params

    const existingLego = await Lego.findByPk(legoId)

    if(!existingLego) {
        return res.status(404).json({
            message: "Lego Set couldn't be found",
        });
    } else {
        const legoTags = await Tag.findAll({
            where: { legoId: legoId},
        })

        return res.json({Tags: legoTags})
    }
})

const validateTags = [
    check ('tag0')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Tag text is required'),
    handleValidationErrors
]

// Create lego tags
router.post('/:legoId/tags', requireAuth, validateTags, async (req, res, next) => {

    const userId = req.user.id
    const { legoId, tag0, tag1, tag2, tag3, tag4 } = req.body

    const existingLego = await Lego.findByPk(legoId)

    if(!existingLego) {
        return res.status(404).json({
            message: "Lego Set couldn't be found",
        });
    }

    const existingTag = await Tag.findAll({ where: { userId, legoId }})

    if (existingTag.length >= 1) {
        return res.status(500).json({
            message: "Tag already exists for this lego set"
        });
    } else {
        const newTag = await Tag.create({
            userId,
            legoId,
            tag0,
            tag1,
            tag2,
            tag3,
            tag4
        })

        res.status(201)
        return res.json(newTag)
    }
})

// Add set to user wishlist
router.post('/:legoId/wishlist', requireAuth, async (req, res, next) => {
    const { legoId } = req.params;
    const userId = req.user.id;

    const onWishlist = await Wishlist.findByPk(legoId)

    if (onWishlist) {
        if (onWishlist.userId === req.user.id) {

            const result = await Wishlist.destroy({where: { id: legoId } });

            res.json({"message": "Lego set successfully removed from wishlist"})
        }
    } else {
        const addToWishlist = await Wishlist.create({
            legoId,
            userId,
        })

        res.status(201)
        res.json(addToWishlist)
    }

})

module.exports = router
