const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Lego, Tag, LegoTag, Message, Wishlist, Follow, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/', async (req, res, next) => {

    const lego = await Lego.findAll({
        include: {
            model: Lego,
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
        group: ['Lego.id']
    });

    return res.json({Lego: lego});

});

router.get(':legoId', async (req, res) => {
    const { legoId } = req.params;

    const lego = await Lego.findByPk( legoId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Tag,
                attributes: ['id', 'name']
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
        data.Tag = lego.Tag

        return res.json(data)
    }

});

const validateLegoSet = [
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Name of set is required'),
    check('itemNumber')
        .exists({checkFalsy: true})
        .withMessage('itemNumber of set is required'),
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

router.post('/', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const {name, itemNumber, pieces, ages, theme, image} = req.body

    const newLego = await Lego.create({
        id,
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

router.put('/:legoId', requireAuth, validateLegoSet, async (req, res, next) => {
    const { legoId } = req.params;

    const {name, itemNumber, pieces, ages, theme, image} = req.body

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
        updatedLego.image = image;

        await updatedLego.save()

        res.json(updatedLego)
    } else {
        return res.status(403).json({
            message: "Lego set must belong to current user"
        })
    }
})

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
