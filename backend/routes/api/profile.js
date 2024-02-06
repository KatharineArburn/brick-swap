const router = require('express').Router();

const { requireAuth } = require('../../utils/auth');
const { User, Lego, Tag, Message, MessageStatus, Wishlist, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// Get user lego sets
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

// Get user inbox
router.get('/:userId/inbox', requireAuth, async (req, res) => {
    const { userId } = req.params;

    const recipientId = userId

    const inbox = await Message.findAll({
        where: {
            recipientId
        },
        include: {
            model: MessageStatus,
            attributes: ["messageId", "userId", "isRead"]
        },

        attributes: [
            "senderId",
            "recipientId",
            "message"
        ],
        group: ['Message.id'],
        raw:true,
    });
    res.json({Inbox: inbox})
})

// Get user outbox
router.get('/:userId/outbox', requireAuth, async (req, res) => {
    const { userId } = req.params;

    const senderId = userId

    const outbox = await Message.findAll({
        where: {
            senderId
        },
        include: {
            model: MessageStatus,
            attributes: ["messageId", "userId", "isRead"]
        },

        attributes: [
            "senderId",
            "recipientId",
            "message"
        ],
        group: ['Message.id'],
        raw:true,
    });
    res.json({Outbox: outbox})
})

const validateMessage = [
    check('message')
        .exists({checkFalsy: true})
        .withMessage('Name of set is required'),
    handleValidationErrors
]

// Send new message
router.post('/:userId/outbox', requireAuth, validateMessage, async (req, res, next) => {
    const senderId = req.user.id;
    const { recipientId, message } = req.body

    const newMessage = await Message.create({
        senderId,
        recipientId,
        message
    })

    res.status(201)
    res.json(newMessage)
});

// Delete message thread
router.delete('/:messageId', requireAuth, async (req, res, next) => {
    const messageId = req.params;

    const existingMessage = await Message.findByPk(messageId)

    if (!existingMessage) {
        return res.status(404).json({
            message: "Message couldn't be found",
        });
    }

    if (existingMessage.recipientId === req.user.id) {

        const result = await Message.destroy({where: { id: messageId } });

        res.json({"message": "Message successfully deleted"})
    } else {
        return res.status(403).json({
            message: "Message must belong to current user"
        })
    }
})
module.exports = router
