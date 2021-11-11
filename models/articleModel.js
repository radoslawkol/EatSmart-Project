const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: String,
  date: { type: Date, default: Date.now },
  headerImg: { type: String, required: true },
  description: { type: String, required: true },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
