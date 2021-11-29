const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: [true, 'A recipe has to have a name'], unique: true },
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

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
