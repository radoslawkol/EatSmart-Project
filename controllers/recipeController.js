const AppError = require('./../utlis/appError');
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
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    let query = Recipe.find(JSON.parse(queryStr));

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    if (req.query.page) {
      const limit = +req.query.limit;
      query = query.skip(req.query.page * limit).limit(limit);
    }

    const recipes = await query;

    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: {
        recipes,
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
    const name = req.params.id;
    const convertDishName = name.replaceAll('-', ' ');

    // const recipe = await Recipe.findById(id);
    const recipe = await Recipe.find({
      name: `${convertDishName[0].toUpperCase() + convertDishName.slice(1)}`,
    });

    if (!recipe) {
      return next(new AppError('No recipe found with that ID!', 404));
    }
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
