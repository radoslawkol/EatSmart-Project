const express = require('express');
const recipeController = require('./../controllers/recipeController');

const router = express.Router();

router.route('/').post(recipeController.createRecipe).get(recipeController.getAllRecipes);
router.route('/:slug').get(recipeController.getRecipe);

module.exports = router;
