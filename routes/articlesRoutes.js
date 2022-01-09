const express = require('express');
const articlesController = require('./../controllers/articlesController');

const router = express.Router();

router.route('/').get(articlesController.getAllArticles).post(articlesController.createArticle);
router.route('/:slug').get(articlesController.getArticle);

module.exports = router;
