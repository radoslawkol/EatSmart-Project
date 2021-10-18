const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: { type: Date, default: Date.now },
  headerImg: String,
  description: String,
});

const Article = mongoose.model('Article', articleSchema);
