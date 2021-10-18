const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: [true, 'A recipe has to have a name'], unique: true },
  date: { type: Date, default: Date.now },
  time: { type: Number, required: [true, 'A recipe has to have the time'] },
  image: { type: String, required: [true, 'A recipe has to have an image'] },
  difficulty: { type: String, required: [true, 'A recipe has to have a difficulty'] },
  // ingredients: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Ingredient',
  //   },
  // ],
  calories: { type: Number, required: [true, 'A recipe has to have calories'] },
  protein: { type: Number, required: [true, 'A recipe has to have protein'] },
  fat: { type: Number, required: [true, 'A recipe has to have fat'] },
  carbohydrates: { type: Number, required: [true, 'A recipe has to have carbohydrates'] },
  preparation: { type: String, required: [true, 'A recipe has to have preparation text'] },
  category: { type: String, required: [true, 'A recipe has to have category'] },
});

const ingredientSchema = new Schema({
  ingredient: { type: String },
  quantity: { type: Number, required: [true, 'The quantity of ingredient is required'] },
  quantityType: { type: String, required: [true, 'The quantity type of ingredient is required'] },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

const recipe = new Recipe({
  name: 'Kurczak z indyka',
  time: '15',
  image: 'url/img.svg',
  difficulty: 'easy',
  // ingredients: [
  //   { ingredient: 'sos', quantity: 200, quantityType: 'g' },
  //   { ingredient: 'sałata', quantity: 1, quantityType: 'sztuka' },
  //   { ingredient: 'kura', quantity: 500, quantityType: 'g' },
  // ],
  calories: 435,
  protein: 23,
  fat: 342,
  carbohydrates: 85,
  preparation: 'Text jak przygotować kurczaka.',
  category: 'lunch',
});



module.exports = Recipe;
