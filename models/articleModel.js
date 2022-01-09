const mongoose = require('mongoose');
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  slug: String,
  author: String,
  date: { type: Date, default: Date.now },
  headerImg: { type: String, required: true },
  headerImgAlt: { type: String, required: true },
  description: { type: String, required: true },
  descriptionHTML: { type: String, required: true },
});

articleSchema.pre('save', function(next) {
  this.slug = slugify(this.title, {lower: true})
  next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
