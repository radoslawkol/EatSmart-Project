const Article = require('../models/articleModel');
const AppError = require('../utlis/appError');

exports.createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getArticle = async (req, res, next) => {
  try {
    console.log(req.params)
    const article = await Article.findOne({ slug: req.params.slug }).exec()

    if (!article) {
      return next(AppError('No article find with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'not found',
      message: err.message,
    });
  }
};
exports.getAllArticles = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    let query = Article.find(JSON.parse(queryStr));

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

    const articles = await query;

    res.status(200).json({
      status: 'success',
      results: articles.length,
      data: {
        articles,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'not found',
      message: err.message,
    });
  }
};
