const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../sequelize');
const { QueryTypes } = require('../sequelize');

const Comment = require('../models/Comment');
const CommentModerate = require('../models/CommentModerate');
const User = require('../models/User');


exports.getAllComment = (req, res, next) => {
    Comment.findAll({
        where: {
            id_post: req.params.id_post,
            id_comment: {
                [Op.notIn]: sequelize.literal(`(SELECT id_comment FROM comments_moderate)`)
            }
        },
        include: [{
            model: User,
            attributes: ['firstname', 'lastname', 'service', 'avatar']
        }],
        order: [['createdAt', 'ASC']]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    Comment.create({
        id_post: req.params.id_post,
        id_user: req.body.id_user,
        comment: req.body.comment
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch((error) => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    Comment.update({
        comment: req.body.comment
    }, {
        where: {
            id_comment: req.params.id_comment
        }
    })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id_comment: req.params.id_comment
        }
    })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch((error) => res.status(500).json({ error }));
};

exports.moderateComment = (req, res, next) => {
    if (req.body.moderate) {
        CommentModerate.create({
            id_comment: req.params.id_comment
        })
            .then(() => res.status(201).json({ message: 'Commentaire modéré !' }))
            .catch((error) => res.status(500).json({ error }));
    } else {
        CommentModerate.destroy({
            where: {
                id_comment: req.params.id_comment
            }
        })
            .then(() => res.status(200).json({ message: 'Modération du commentaire supprimée !' }))
            .catch((error) => res.status(500).json({ error }));
    };
};