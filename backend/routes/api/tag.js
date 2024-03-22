const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Lego, Tag, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateTags = [
    check ('tag')
        .notEmpty()
        .withMessage('Tag text is required'),
    handleValidationErrors
]

// Update tags
router.put('/:tagId', requireAuth, validateTags, async (req, res, next) => {
    const userId = req.user.id
    const { tagId } = req.params;

    const { legoId, tag } = req.body;

    const existingTag = await Tag.findByPk(tagId)
    console.log("EXISTING TAG", existingTag)
    const currentTag = await Tag.findAll({where: {id: tagId, userId}})

    if (!existingTag) {
        return res.status(404).json({
            message: "Tags couldn't be found",
        });
    }

    if (existingTag.userId !== userId) {
        return res.status(403).json({
            message: "Tags must belong to current user",
        });
    } else if (currentTag) {
        const updatedTag = await Tag.findByPk(tagId);

        updatedTag.legoId = legoId;
        updatedTag.tag = tag;

        await updatedTag.save()

        res.json(updatedTag)
    }
})

// Delete Tags

router.delete('/:tagId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const { tagId } = req.params;

    const existingTag = await Tag.findByPk(tagId)

    if (!existingTag) {
        return res.status(404).json({
            message: "Tags couldn't be found",
        });
    }

    const currentTag = await Tag.findAll({where: {id: tagId, userId}})

    if (currentTag.length === 1) {
        const result = await Tag.destroy({where: { id: tagId } });
        res.json({"message": "Tag deleted"})
    } else {
        return res.status(403).json({
            message: "Tags must belong to current user",
        });
    }
})

module.exports = router
