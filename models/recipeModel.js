const mongoose = require('mongoose');
const slugify = require('slugify')

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: [true, 'A recipe has to have a name'], unique: true },
  slug: String,
  date: { type: Date, default: Date.now },
  time: { type: Number, required: [true, 'A recipe has to have the time'] },
  image: { type: String, required: [true, 'A recipe has to have an image'] },
  difficulty: { type: String, required: [true, 'A recipe has to have a difficulty'] },
  ingredients: Array,
  calories: { type: Number, required: [true, 'A recipe has to have calories'] },
  protein: { type: Number, required: [true, 'A recipe has to have protein'] },
  fat: { type: Number, required: [true, 'A recipe has to have fat'] },
  carbohydrates: { type: Number, required: [true, 'A recipe has to have carbohydrates'] },
  preparation: { type: String, required: [true, 'A recipe has to have preparation text'] },
  category: { type: String, required: [true, 'A recipe has to have category'] },
});

recipeSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})



const Recipe = mongoose.model('Recipe', recipeSchema);

// (async function() {
//   const docs = await Recipe.find();
//   docs.forEach(async doc => {
//     const slugString = slugify(doc.name, {lower: true});
//     await Recipe.updateOne({_id: doc._id}, { $set: {slug: slugString}});
// })
// })()

module.exports = Recipe;
