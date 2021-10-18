const Recipe = require('./../models/recipeModel');

exports.createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();

    res.status(200).json({
      status: 'success',
      results: allRecipes.length,
      data: {
        allRecipes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'not found',
      message: err.message,
    });
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;

    const recipe = await Recipe.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'not found',
      message: err.message,
    });
  }
};
